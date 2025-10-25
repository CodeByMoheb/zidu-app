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
