import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./app.css";
import App from "./App.jsx";

// Entry point to the application. The createRoot function
// inserts the <App /> component into the HTML at #root.
createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
