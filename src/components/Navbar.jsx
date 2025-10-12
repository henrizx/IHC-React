import { useState } from "react";
import "../styles/globals.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
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
                        <li><Link to="/conta">Conta</Link></li>
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