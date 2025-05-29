# Analytics Provider

A React analytics provider for tracking events and page views.

## Features

- 🔄 Automatic page view tracking
- 📊 Custom event tracking
- 📱 Device detection (mobile, tablet, desktop)
- 🔌 Simple integration with React applications

## Installation

```bash
npm install rashik-analytics-provider
```

## Usage

### Basic Usage (Without React Router)

If you're not using React Router or want to use browser navigation tracking:

```tsx
import { AnalyticsProvider, useAnalytics } from 'rashik-analytics-provider';

function App() {
  return (
    <AnalyticsProvider serviceName="my-app">
      <YourAppComponents />
    </AnalyticsProvider>
  );
}

function SomeComponent() {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('button_click', { button_name: 'header_cta' });
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

### With React Router

If you're using React Router and want automatic route change tracking:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { RouterAwareAnalyticsProvider, useAnalytics } from 'rashik-analytics-provider';

function App() {
  return (
    <BrowserRouter>
      <RouterAwareAnalyticsProvider serviceName="my-app">
        <YourAppComponents />
      </RouterAwareAnalyticsProvider>
    </BrowserRouter>
  );
}
```

## API

### AnalyticsProvider Props

- `serviceName` (required): Name of your service
- `endpoint` (optional): Analytics endpoint URL (defaults to 'https://analytics.rashik.sh/api')
- `autoTrackPageViews` (optional): Whether to automatically track page views (default: true)
- `onError` (optional): Error handler function

### useAnalytics Hook

Returns an object with:
- `trackEvent(eventType: string, properties?: object)`: Function to track custom events

## Troubleshooting

### "useLocation() may be used only in the context of a <Router> component" Error

This error occurs when using the basic `AnalyticsProvider` inside a React Router context. To fix this:

1. **Option 1**: Use `RouterAwareAnalyticsProvider` instead:
   ```tsx
   import { RouterAwareAnalyticsProvider } from 'rashik-analytics-provider';
   
   <BrowserRouter>
     <RouterAwareAnalyticsProvider serviceName="my-app">
       <App />
     </RouterAwareAnalyticsProvider>
   </BrowserRouter>
   ```

2. **Option 2**: Place `AnalyticsProvider` outside the Router:
   ```tsx
   <AnalyticsProvider serviceName="my-app">
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </AnalyticsProvider>
   ```

The `RouterAwareAnalyticsProvider` is specifically designed to work with React Router and will automatically track route changes, while the basic `AnalyticsProvider` uses browser navigation events and works without React Router.

## Go Backend Integration

This provider is designed to work specifically with the Go analytics server that implements the following API endpoints:

- `POST /api` - Records analytics events
- `GET /api` - Retrieves analytics events (with optional filters)

The provider sends events in the format expected by the Go server:

```typescript
interface EventRequest {
  service: string;      // Service/app name
  event: string;        // Event type (e.g., 'page_view', 'button_click')
  path: string;         // Current page path
  referrer: string;     // Referrer URL
  user_browser: string; // User agent string
  user_device: string;  // 'desktop', 'mobile', or 'tablet'
  timestamp?: string;   // ISO timestamp (added automatically)
  metadata?: Record<string, unknown>; // Additional custom properties
}
```

## License

MIT 