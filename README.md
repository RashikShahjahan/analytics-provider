# React Analytics Provider for Go Backend

This React Analytics Provider is specifically designed to work with the accompanying Go analytics server.

## Features

- 🔄 Automatic page view tracking
- 📊 Custom event tracking
- 📱 Device detection (mobile, tablet, desktop)
- 🔌 Simple integration with React applications

## Installation

```bash
npm install analytics-provider
```

## Usage

### Basic Setup

Wrap your application with the `AnalyticsProvider`:

```jsx
import { AnalyticsProvider } from 'analytics-provider';

function App() {
  return (
    <AnalyticsProvider 
      serviceName="my-app"
      endpoint="https://analytics.rashik.sh/api" // Default endpoint
    >
      <YourApp />
    </AnalyticsProvider>
  );
}
```

### Tracking Events

```jsx
import { useAnalytics } from 'analytics-provider';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent('button_click', {
      // Optional additional properties
      button_id: 'submit-button',
      action: 'form-submit'
    });
  };

  return (
    <button onClick={handleButtonClick}>
      Submit
    </button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `serviceName` | string | (required) | Identifier for your service/app |
| `endpoint` | string | 'https://analytics.rashik.sh/api' | API endpoint for the Go analytics server |
| `autoTrackPageViews` | boolean | true | Automatically track page views |
| `onError` | function | undefined | Custom error handler |

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
}
```

## License

MIT 