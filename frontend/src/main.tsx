import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import * as Sentry from "@sentry/react";

// Initialize Sentry before the app renders
Sentry.init({
  dsn: "https://02c008efea5afb429db5f57b44243cb2@o88872.ingest.us.sentry.io/4510789878153216",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: "development",
  debug: true, // Enable debug mode to see what Sentry is doing
});

console.log('Sentry initialized with DSN:', Sentry.getClient()?.getOptions().dsn);

import VoyagerApp from './App'
import { AuthProvider } from './contexts/AuthProvider'
import { CartProvider } from './contexts/CartProvider'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// MSW mock server disabled - using real backend API
// Uncomment below to use mock data instead of real backend
/*
import('../mocks/browser')
  .then(async ({ worker }) => {
    return worker.start()
  })
  .then(() => {
    root.render(
      <AuthProvider>
        <CartProvider>
          <VoyagerApp />
        </CartProvider>
      </AuthProvider>,
    )
  })
*/// Render app directly without MSW
root.render(
  <AuthProvider>
    <CartProvider>
      <VoyagerApp />
    </CartProvider>
  </AuthProvider>,
)