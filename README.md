# Analytics Provider

A reusable analytics tracking provider for React applications.

## Installation

```bash
npm install rashik-analytics-provider
# or
yarn add rashik-analytics-provider
```

## Usage

Wrap your application with the AnalyticsProvider:

```jsx
import { AnalyticsProvider } from 'rashik-analytics-provider';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider 
        endpoint="https://your-analytics-api.com/events" 
        serviceName="your-app-name"
      >
        <YourApp />
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
```

Track events in your components:

```jsx
import { useAnalytics } from 'rashik-analytics-provider';

function YourComponent() {
  const { trackEvent } = useAnalytics();
  
  const handleButtonClick = () => {
    trackEvent('button_click', { 
      button_id: 'submit-button',
      page_section: 'checkout'
    });
    
    // Then do something else...
  };
  
  return (
    <button onClick={handleButtonClick}>
      Submit
    </button>
  );
}
```

## Configuration Options

The AnalyticsProvider accepts the following props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| endpoint | string | Yes | The URL of your analytics API endpoint |
| serviceName | string | Yes | Name of your service or application |
| autoTrackPageViews | boolean | No | Automatically track page views (default: true) |
| onError | function | No | Custom error handler for failed API requests |
| customHeaders | object | No | Custom headers to include with API requests |

## Event Structure

Each tracked event includes the following data:

```typescript
{
  service: string;      // Your app/service name
  event: string;        // Event type (e.g., 'page_view', 'button_click')
  path: string;         // Current route path
  referrer: string;     // Document referrer
  user_browser: string; // User agent string
  user_device: string;  // Device type ('desktop', 'mobile', or 'tablet')
  // Plus any additional properties you include
}
```

## License

MIT 