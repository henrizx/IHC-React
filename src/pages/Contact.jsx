import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Products.css';

const Contato = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: false });

    useEffect(() => {
        // Heurística 1: visibilidade de status do sistema
        if (status.success || status.error) {
            const timer = setTimeout(() => setStatus({ loading: false, success: false, error: false }), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: false });

        // Simulação de envio assíncrono (heurística 1)
        setTimeout(() => {
            const isSuccess = Math.random() > 0.1; // 90% de sucesso
            if (isSuccess) {
                setStatus({ loading: false, success: true, error: false });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ loading: false, success: false, error: true });
            }
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <main id="conteudo" className="contact-page" role="main">
                <div className="page-inner-content">
                    {/* Heurística 3: Breadcrumbs */}
                    <nav className="breadcrumbs" aria-label="Navegação estrutural">
                        <a href="/">Home</a> &gt; <span>Contato</span>
                    </nav>

                    <div className="contact-container">
                        <img src="/vite.svg" alt="Logo do site" className="about-logo" />

                        <h1 className="section-title">Entre em Contato</h1>
                        <div className="subtitle-underline"></div>

                        {/* Heurística 5: Prevenção de erros */}
                        <form onSubmit={handleSubmit} className="contact-form" noValidate>
                            <label htmlFor="name">Nome:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                placeholder="Digite seu nome completo"
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                placeholder="exemplo@email.com"
                            />

                            <label htmlFor="message">Mensagem:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                placeholder="Digite sua mensagem aqui..."
                            ></textarea>

                            <button
                                type="submit"
                                className={`buy-button ${status.loading ? 'disabled' : ''}`}
                                disabled={status.loading}
                            >
                                {status.loading ? 'Enviando...' : 'Enviar Mensagem'}
                            </button>
                        </form>

                        {/* Heurística 1: Feedback do sistema */}
                        {status.success && (
                            <div className="feedback-bar success" role="alert">
                                ✅ Mensagem enviada com sucesso!
                            </div>
                        )}
                        {status.error && (
                            <div className="feedback-bar error" role="alert">
                                ❌ Ocorreu um erro. Tente novamente.
                            </div>
                        )}

                        {/* Heurística 3: Controle do usuário */}
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

export default Contato;
