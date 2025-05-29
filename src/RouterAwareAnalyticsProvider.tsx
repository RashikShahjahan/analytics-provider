import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnalyticsProvider, AnalyticsProviderProps, useAnalytics } from './AnalyticsProvider';

/**
 * Router-aware version of AnalyticsProvider that integrates with React Router.
 * This component automatically tracks page views when the route changes.
 * 
 * Usage:
 * ```tsx
 * import { BrowserRouter } from 'react-router-dom';
 * import { RouterAwareAnalyticsProvider } from 'rashik-analytics-provider';
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <RouterAwareAnalyticsProvider serviceName="my-app">
 *         <YourAppComponents />
 *       </RouterAwareAnalyticsProvider>
 *     </BrowserRouter>
 *   );
 * }
 * ```
 */
export const RouterAwareAnalyticsProvider: React.FC<AnalyticsProviderProps> = (props) => {
  const location = useLocation();
  
  // Override the autoTrackPageViews to false since we'll handle it here
  const modifiedProps = {
    ...props,
    autoTrackPageViews: false,
  };
  
  return (
    <AnalyticsProvider {...modifiedProps}>
      <RouterPageTracker autoTrackPageViews={props.autoTrackPageViews} />
      {props.children}
    </AnalyticsProvider>
  );
};

// Internal component to handle page tracking with React Router
const RouterPageTracker: React.FC<{ autoTrackPageViews?: boolean }> = ({ 
  autoTrackPageViews = true 
}) => {
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    if (autoTrackPageViews) {
      trackEvent('page_view');
    }
  }, [location.pathname, autoTrackPageViews, trackEvent]);
  
  return null;
}; 