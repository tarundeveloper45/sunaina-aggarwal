import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import './system.css';
import './media.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// Pre-rendered pages (production) are hydrated; in dev the root is empty so we render fresh.
if (root.hasChildNodes() && !root.innerHTML.includes('<!--app-html-->')) hydrateRoot(root, app);
else createRoot(root).render(app);
