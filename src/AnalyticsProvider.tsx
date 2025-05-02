import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export interface EventBase {
  service: string;
  event: string;
  path: string;
  referrer: string;
  user_browser: string;
  user_device: string;
}

export interface EventRequest {
  service: string;
  event: string;
  path: string;
  referrer: string;
  user_browser: string;
  user_device: string;
  timestamp?: string;
}

export interface AnalyticsContextType {
  trackEvent: (eventType: string, properties?: Partial<EventBase>) => void;
}

export interface AnalyticsProviderProps {
  children: React.ReactNode;
  endpoint?: string;
  serviceName: string;
  autoTrackPageViews?: boolean;
  onError?: (error: unknown) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = (): AnalyticsContextType => useContext(AnalyticsContext);

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  endpoint = 'https://analytics.rashik.sh/api',
  serviceName,
  autoTrackPageViews = true,
  onError
}) => {
  const location = useLocation();
  
  const trackEvent = (eventType: string, properties: Partial<EventBase> = {}) => {
    try {
      const event: EventRequest = {
        service: serviceName,
        event: eventType,
        path: location?.pathname || '',
        referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
        user_browser: typeof navigator !== 'undefined' ? navigator.userAgent || '' : '',
        user_device: typeof navigator !== 'undefined' ? detectDevice() : 'unknown',
        ...properties,
        timestamp: new Date().toISOString()
      };

      axios.post(endpoint, event)
        .catch((error: unknown) => {
          console.error('Failed to send analytics event', error);
          if (onError) {
            onError(error);
          }
        });
    } catch (error) {
      console.error('Error in trackEvent', error);
      if (onError) {
        onError(error);
      }
    }
  };

  // Simple device detection
  const detectDevice = (): string => {
    if (typeof navigator === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  };

  useEffect(() => {
    if (autoTrackPageViews && location) {
      trackEvent('page_view');
    }
  }, [location?.pathname]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 