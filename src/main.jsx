import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./app.css";
import App from "./App.jsx";

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
