import "../styles/globals.css";

export default function ExclusiveSection() {
    return (
        <div className="gray-background">
            <div className="header-inner-content">
                <div className="header-bottom-side exclusive-container">
                    <div className="header-bottom-side-left">
                        <h2>Relógio Digital - Laranja</h2>
                        <p>
                            Monitore sua pressão arterial e frequência cardíaca continuamente,
                            até durante o sono, com o novo Huawei Watch D2.
                        </p>
                        <button>Ver agora →</button>
                    </div>
                    <div className="header-bottom-side-right">
                        <img src="/images/exclusive.png" alt="Produto exclusivo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
