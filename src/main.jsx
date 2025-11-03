// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Account from './pages/Account.jsx';
import Sobre from './pages/Sobre.jsx';
import Contato from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import App from './App.jsx';

// Garante carregamento do VLibras mesmo se bloqueado na index.html
function ensureVLibras() {
  try {
    const hasContainer = document.querySelector('[vw]');
    if (!hasContainer) {
      const wrap = document.createElement('div');
      wrap.setAttribute('vw', '');
      wrap.className = 'enabled';
      wrap.innerHTML = `
        <div vw-access-button class="active" aria-label="Ativar tradutor VLibras"></div>
        <div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>
      `;
      document.body.appendChild(wrap);
    }
    const init = () => {
      try { /* eslint-disable no-undef */ new window.VLibras.Widget('https://cdn.vlibras.gov.br/app'); /* eslint-enable */ } catch {}
    };
    if (window.VLibras && window.VLibras.Widget) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.vlibras.gov.br/app/vlibras-plugin.js';
      script.defer = true;
      script.onload = init;
      document.body.appendChild(script);
    }
  } catch {
    // silencioso se não carregar
  }
}

ensureVLibras();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/conta" element={<Account />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/produtos' element={<Products />} />
          <Route path='/produto/:slug' element={<ProductDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);