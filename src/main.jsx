// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Account from './pages/Account.jsx';
import Sobre from './pages/Sobre.jsx';
import Contato from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import App from './App.jsx';

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);