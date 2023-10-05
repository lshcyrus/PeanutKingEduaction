import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CourseContextProvider from './CourseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// CourseContextProvider is a custom component that provides the context to all the child components
// Here, we are wrapping the App component with the CourseContextProvider component, so that whole App.js is going to access the same context
root.render(
  <CourseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CourseContextProvider>
);