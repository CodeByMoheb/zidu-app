// IN an ASP.NET Core MVC App:
// This file is the entry point for the React client-side application.
// Its server-side equivalent is `Program.cs`.
// In `Program.cs`, you would configure the web server (Kestrel), register services for dependency injection 
// (like a GeminiService), and set up the middleware pipeline (e.g., routing, authentication).
// The `ReactDOM.createRoot(rootElement).render(...)` call is what starts the React app. In MVC, the application
// starts listening for HTTP requests via `app.Run()`.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide preloader after app is mounted
const preloader = document.getElementById('preloader');
if (preloader) {
  // Give it a moment to ensure everything is rendered
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.style.display = 'none', 500);
  }, 200);
}
