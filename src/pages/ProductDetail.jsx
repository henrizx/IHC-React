import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Products.css";

export default function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const getProductBySlug = (s) => {
        if (s === "relogio-digital-laranja") {
            return {
                title: "Relógio Digital - Laranja",
                image: "/images/exclusive.png",
                price: "R$ 444,32",
                description:
                    "Monitore pressão arterial e frequência cardíaca continuamente com o Huawei Watch D2.",
                rating: "★★★★★",
                images: [
                    "/images/exclusive.png",
                ],
            };
        }
        // padrão: notebook em destaque do header
        return {
            title: "Notebook MSI Intel Core i7 8750H",
            image: "/images/gaming-msi-header.png",
            price: "R$ 5.499,00",
            description:
                "Notebook gamer com Intel Core i7 8750H, 16GB RAM, SSD 500GB e GTX 1050.",
            rating: "★★★★☆",
            images: [
                "/images/gaming-msi-header.png",
            ],
        };
    };

    const product = getProductBySlug(slug);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <>
            <Navbar />
            <main className="contact-page">
                <div className="page-inner-content">
                    <nav className="breadcrumbs" aria-label="Navegação estrutural">
                        <a href="/">Home</a> &gt; <a href="/produtos">Produtos</a> &gt; <span>{product.title}</span>
                    </nav>

                    <div className="product-detail-container">
                        <div className="product-detail-media">
                            <div className="thumbs">
                                {product.images.map((src) => (
                                    <button
                                        key={src}
                                        className={`thumb ${selectedImage === src ? "active" : ""}`}
                                        onClick={() => setSelectedImage(src)}
                                        aria-label="Selecionar imagem"
                                    >
                                        <img src={src} alt="Miniatura do produto" />
                                    </button>
                                ))}
                            </div>
                            <div className="main-image">
                                <img src={selectedImage} alt={product.title} />
                            </div>
                        </div>
                        <aside className="product-detail-info">
                            <h1 className="section-title">{product.title}</h1>
                            <div className="subtitle-underline"></div>

                            <div className="detail-price-box">
                                <p className="product-price">{product.price}</p>
                                <p className="installments">ou 12x sem juros no cartão</p>
                            </div>

                            <p className="product-rating" aria-label={`Avaliação ${product.rating}`}>
                                {product.rating}
                            </p>

                            <ul className="detail-bullets">
                                <li>Tamanho de tela: 15.6"</li>
                                <li>Resolução Full HD 1920x1080</li>
                                <li>120Hz para jogos suaves</li>
                                <li>Processador Intel Core i7 8750H</li>
                            </ul>

                            <p className="product-description">{product.description}</p>

                            <div className="product-detail-actions">
                                <button className="buy-button">Comprar agora</button>
                                <button className="clear-filters-btn" onClick={() => navigate(-1)}>Voltar</button>
                            </div>

                            <div className="purchase-policies">
                                <div className="policy">Devolução grátis por 30 dias</div>
                                <div className="policy">Garantia de fábrica 12 meses</div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}


