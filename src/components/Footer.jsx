import "../styles/globals.css";

export default function Footer() {
    return (
        <footer className="gray-background">
            <div className="page-inner-content footer-content">
                <div className="download-options">
                    <p>Baixe nossa aplicação</p>
                    <p>Disponível para Android e iOS</p>
                    <div>
                        <img src="/images/app-store.png" alt="App Store" />
                        <img src="/images/play-store.png" alt="Play Store" />
                    </div>
                </div>

                <div className="logo-footer">
                    <h1 className="logo">
                        LABUBU<span> E-COMMERCE</span>
                    </h1>
                    <p>
                        Acreditamos que enquanto houver vida, há possibilidades — continue
                        tentando.
                    </p>
                </div>

                <div className="links-footer">
                    <h3>Links úteis</h3>
                    <ul>
                        <li>Cupons</li>
                        <li>Políticas</li>
                        <li>Afiliados</li>
                    </ul>
                </div>
            </div>

            <hr className="page-inner-content" />

            <div className="page-inner-content copyright">
                <p>Copyright 2025 - Marcelo Henrique - Todos os direitos reservados</p>
            </div>
        </footer>
    );
}
