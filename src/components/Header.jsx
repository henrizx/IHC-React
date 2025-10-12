import "../styles/globals.css";

const Header = () => {
    return (
        <header>
            <div className="header-inner-content">
                <div className="header-bottom-side">
                    <div className="header-bottom-side-left">
                        <h2>Busque os melhores Labubu's da região!</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                        </p>
                        <button>Labubu agora &#8594;</button>
                    </div>
                    <div className="header-bottom-side-right">
                        <img src="/images/gaming-msi-header.png" alt="Labubu Header" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;