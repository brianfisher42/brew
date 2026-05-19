/**
 * index.tsx
 * 
 * Application entry point for the Brewtelligence React app.
 * This file bootstraps the React application by mounting it to the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root DOM element where React will mount the application
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create the React root and render the app in StrictMode
// StrictMode helps identify potential problems by activating additional checks and warnings
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
