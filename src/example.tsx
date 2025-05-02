import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnalyticsProvider, useAnalytics } from './AnalyticsProvider';

// Example component that uses analytics
const ExampleButton: React.FC = () => {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('button_clicked', {
      button_name: 'example-button',
      page_section: 'header'
    });
  };
  
  return (
    <button onClick={handleClick}>
      Track Click
    </button>
  );
};

// Example app using the analytics provider
const ExampleApp: React.FC = () => {
  return (
    <BrowserRouter>
      <AnalyticsProvider 
        endpoint="https://analytics.example.com/api" 
        serviceName="example-app"
        autoTrackPageViews={true}
        customHeaders={{
          'X-API-Key': 'your-api-key-here'
        }}
        onError={(error) => {
          // Custom error handling
          console.error('Analytics error:', error);
        }}
      >
        <div>
          <h1>Example App</h1>
          <ExampleButton />
        </div>
      </AnalyticsProvider>
    </BrowserRouter>
  );
};

export default ExampleApp; 