import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Sora is the typeface used in the design. Bundled locally, so it works offline.
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';

import './index.css';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';

// A fresh load or refresh always starts at the design notice page; its "Mobile" page opens Get Started.
if (window.location.pathname !== '/design-notice') {
  window.history.replaceState(null, '', '/design-notice');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
