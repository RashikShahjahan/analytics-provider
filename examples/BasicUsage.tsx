import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// In a real application, you would import from the installed package
// import { AnalyticsProvider, useAnalytics } from 'rashik-analytics-provider';
// For this example, we're importing from the local source
import { AnalyticsProvider, useAnalytics } from '../src/AnalyticsProvider';

// Example component that uses analytics
const AnalyticsButton = () => {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent('button_click', {
      // Custom properties are added to metadata
      button_type: 'primary',
      user_role: 'visitor',
      interaction_id: '12345'
    });
  };

  return (
    <button 
      onClick={handleClick}
      style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
    >
      Track Click Event
    </button>
  );
};

// Home page component
const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Homepage</h1>
    <p>This page view is automatically tracked.</p>
    <AnalyticsButton />
    <div style={{ marginTop: '20px' }}>
      <Link to="/about">Go to About Page</Link>
    </div>
  </div>
);

// About page component
const AboutPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>About Page</h1>
    <p>This page view is automatically tracked too.</p>
    <div style={{ marginTop: '20px' }}>
      <Link to="/">Back to Homepage</Link>
    </div>
  </div>
);

// Main App with AnalyticsProvider
const App = () => {
  const handleError = (error: unknown) => {
    console.error('Analytics error:', error);
    // You could also send to an error tracking service
  };

  return (
    <BrowserRouter>
      <AnalyticsProvider 
        serviceName="example-app"
        endpoint="https://analytics.rashik.sh/api"
        onError={handleError}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnalyticsProvider>
    </BrowserRouter>
  );
};

export default App; 