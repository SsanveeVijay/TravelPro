import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM connects React with actual HTML DOM
// createRoot is part of React 18 (improves performance)
const root = ReactDOM.createRoot(document.getElementById('root'));

// StrictMode helps detect potential issues during development
// It does NOT affect production
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);