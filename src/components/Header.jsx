import "../styles/globals.css";

export default function Header() {
    return (
        <header>
            <div className="header-inner-content">
                <div className="header-bottom-side">
                    <div className="header-bottom-side-left">
                        <h2>Os melhores produtos da região</h2>
                        <p>
                            Notebook MSI Intel Core i7 8750H 8ª Geração 16GB RAM, SSD 500 GB,
                            GTX 1050 e muito mais.
                        </p>
                        <button>Ver agora →</button>
                    </div>
                    <div className="header-bottom-side-right">
                        <img src="/images/gaming-msi-header.png" alt="Produto destaque" />
                    </div>
                </div>
            </div>
        </header>
    );
}
