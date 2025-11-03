// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import "../styles/globals.css";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [fontScale, setFontScale] = useState(1);
    const [readerOn, setReaderOn] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleLogout = () => {
        logout();
        setShowUserDropdown(false);
        navigate("/");
    };

    useEffect(() => {
        const root = document.documentElement;
        if (isHighContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }
        root.style.fontSize = `${fontScale * 100}%`;
    }, [isHighContrast, fontScale]);

    const speak = (text) => {
        if (!readerOn) return;
        try {
            const synth = window.speechSynthesis;
            if (!synth) return;
            synth.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'pt-BR';
            synth.speak(utter);
        } catch (e) {
            // falha silenciosa se API não disponível
        }
    };

    useEffect(() => {
        if (!readerOn) return;
        const resolveText = (el) => {
            if (!el) return '';
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                return el.getAttribute('aria-label') || el.placeholder || el.name || '';
            }
            return el.getAttribute('aria-label') || el.innerText || el.textContent || '';
        };
        const handler = (e) => {
            const el = e.target.closest('a,button,[role="button"],label,input,textarea,h1,h2,h3,h4,h5,h6,p,li,span,[aria-label]');
            if (!el) return;
            let text = resolveText(el).trim();
            if (!text) return;
            // evita leitura gigante de containers
            if (text.length > 180) {
                text = text.slice(0, 180) + '...';
            }
            speak(text);
        };
        document.addEventListener('mouseover', handler, true);
        document.addEventListener('focusin', handler, true);
        return () => {
            document.removeEventListener('mouseover', handler, true);
            document.removeEventListener('focusin', handler, true);
            try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch { }
        };
    }, [readerOn]);

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    const handleAccountClick = () => {
        if (user) {
            toggleUserDropdown();
        } else {
            navigate("/conta");
        }
    };

    return (
        <div className={`navbar ${showMenu ? "show-menu" : ""}`}>
            <div className="header-inner-content">
                <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    LABUBU <span>E-COMMERCE</span>
                </h1>
                <nav aria-label="Navegação principal">
                    <ul>
                        <li><a href="/" onMouseEnter={() => speak('Home')} onFocus={() => speak('Home')}>Home</a></li>
                        <li><Link to="/produtos" onMouseEnter={() => speak('Produtos')} onFocus={() => speak('Produtos')}>Produtos</Link></li>
                        <li><Link to="/sobre" onMouseEnter={() => speak('Sobre')} onFocus={() => speak('Sobre')}>Sobre</Link></li>
                        <li><Link to="/contato" onMouseEnter={() => speak('Contato')} onFocus={() => speak('Contato')}>Contato</Link></li>
                        <li className="a11y-controls">
                            <button
                                aria-label="Alternar alto contraste"
                                title="Alto contraste"
                                className="a11y-btn"
                                onClick={() => setIsHighContrast(!isHighContrast)}
                            >
                                C
                            </button>
                            <button className="a11y-btn" aria-label="Diminuir fonte" title="Diminuir fonte" onClick={() => setFontScale(Math.max(0.85, +(fontScale - 0.1).toFixed(2)))}>A-</button>
                            <button className="a11y-btn" aria-label="Aumentar fonte" title="Aumentar fonte" onClick={() => setFontScale(Math.min(1.4, +(fontScale + 0.1).toFixed(2)))}>A+</button>
                            <button className={`a11y-btn ${readerOn ? 'active' : ''}`} aria-pressed={readerOn} aria-label="Alternar leitor de tela por voz" title="Leitor por voz" onClick={() => setReaderOn(!readerOn)}>🔊</button>
                        </li>
                        <li className="user-menu-item">
                            {user ? (
                                <div className="user-dropdown">
                                    <button
                                        className="user-dropdown-toggle"
                                        onClick={toggleUserDropdown}
                                    >
                                        <span className="user-avatar">
                                            {user.nome.split(' ')[0].charAt(0).toUpperCase()}
                                        </span>
                                        <span className="user-name">Olá, {user.nome.split(' ')[0]}</span>
                                        <span className="dropdown-arrow">▼</span>
                                    </button>
                                    {showUserDropdown && (
                                        <div className="user-dropdown-menu">
                                            <div className="dropdown-item user-info">
                                                <strong>{user.nome}</strong>
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <button
                                                className="dropdown-item logout-button"
                                                onClick={handleLogout}
                                            >
                                                <span className="logout-icon">🚪</span>
                                                Sair
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/conta" className="account-link">Conta</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                <div className="nav-icon-container">
                    <img src="/images/cart.png" alt="Carrinho" />
                    <img
                        src="/images/menu.png"
                        alt="Menu"
                        className="menu-button"
                        onClick={() => setShowMenu(!showMenu)}
                    />
                </div>
            </div>
        </div>
    );
}