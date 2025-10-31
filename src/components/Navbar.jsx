// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import "../styles/globals.css";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
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
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
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