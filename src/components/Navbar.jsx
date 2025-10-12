import { useState } from 'react';
import "../styles/globals.css";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`navbar ${showMenu ? 'show-menu' : ''}`}>
            <div className="header-inner-content">
                <h1 className="logo">LABUBU <span>E-COMMERCE</span></h1>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Produtos</li>
                        <li>Sobre</li>
                        <li>Contato</li>
                        <li>Conta</li>
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
};

export default Navbar;