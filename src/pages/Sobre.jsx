import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Products.css";

const Sobre = () => {
    const navigate = useNavigate();

    return (
        <>
        <Navbar />
        <main className="about-page">
            <div className="page-inner-content">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs" aria-label="Navegação estrutural">
                    <a href="/">Home</a> &gt; <span>Sobre</span>
                </nav>

                <div className="about-container">
                    <img
                        src="/vite.svg" alt="Logo do site" className="about-logo" />
                    <h1 className="section-title">Sobre o Projeto</h1>
                    <div className="subtitle-underline"></div>

                    <section className="about-section">
                        <h2>👨‍💻 Quem Sou</h2>
                        <p>
                            Meu nome é <strong>Marcelo Henrique</strong>, sou desenvolvedor de software com experiência em
                            <strong> Delphi</strong>, <strong>Go</strong>, <strong>C# / .NET</strong>, <strong>Python</strong> e
                            <strong> React</strong>. Tenho foco em desenvolvimento backend, APIs RESTful, sistemas corporativos e
                            soluções integradas com bancos de dados relacionais como
                            <strong> PostgreSQL</strong>, <strong>Oracle</strong>, <strong>SQL Server</strong> e <strong>Firebird</strong>.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>🧠 Objetivo do Projeto</h2>
                        <p>
                            Este projeto foi criado como um <strong>e-commerce experimental</strong> com foco em
                            <strong> boas práticas de UI/UX, responsividade e heurísticas de usabilidade</strong>.
                            Ele demonstra uma estrutura moderna de componentes React e integração de design consistente
                            através de <code>CSS modularizado</code>.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>⚙️ Tecnologias Utilizadas</h2>
                        <ul className="about-list">
                            <li><strong>Frontend:</strong> React + Vite + React Router</li>
                            <li><strong>Estilização:</strong> CSS puro com classes reutilizáveis e heurísticas Nielsen</li>
                            <li><strong>Backend (conceitual):</strong> Go + Docker + PostgreSQL</li>
                            <li><strong>Controle de Versão:</strong> Git</li>
                            <li><strong>Arquitetura:</strong> Componentes funcionais com estados locais e feedback de usuário</li>
                        </ul>
                    </section>

                    <section className="about-section">
                        <h2>💡 Conceitos Aplicados</h2>
                        <ul className="about-list">
                            <li>Heurísticas de usabilidade de Jakob Nielsen</li>
                            <li>Feedback visual (loading, erro, sucesso)</li>
                            <li>Acessibilidade com ARIA e navegação de teclado</li>
                            <li>Design responsivo e limpo</li>
                            <li>Reuso de componentes e padronização de layout</li>
                        </ul>
                    </section>

                    <section className="about-section">
                        <h2>📬 Contato</h2>
                        <p>
                            Caso queira saber mais ou entrar em contato sobre o projeto, acesse a página{" "}
                            <a href="/contato" className="link-highlight">Contato</a>.
                        </p>
                    </section>

                    <button
                        className="clear-filters-btn"
                        onClick={() => navigate(-1)}
                        aria-label="Voltar para a página anterior"
                    >
                        ← Voltar
                    </button>
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default Sobre;
