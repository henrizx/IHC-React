import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        cpfCnpj: "",
        tipoUsuario: "cliente",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);
        alert(
            isRegister
                ? "Cadastro realizado com sucesso!"
                : "Login efetuado com sucesso!"
        );
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="account-page">
            {/* Botão de voltar no topo - estilo Mercado Livre */}
            <div className="account-top-bar">
                <button className="back-button" onClick={handleBackToHome}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Voltar
                </button>
            </div>

            <div className="account-container">
                <div className="account-box">
                    <div className="account-header">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                            alt="Segurança"
                            className="secure-icon"
                        />
                        <h2>{isRegister ? "Criar Conta" : "Acessar Conta"}</h2>
                        <p className="subtitle">
                            {isRegister
                                ? "Preencha os dados abaixo para começar a vender ou comprar com segurança."
                                : "Faça login com segurança para acessar sua conta."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="account-form">
                        {isRegister && (
                            <>
                                <div className="form-group">
                                    <label>Nome completo</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        placeholder="Seu nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>CPF / CNPJ</label>
                                    <input
                                        type="text"
                                        name="cpfCnpj"
                                        placeholder="Digite seu CPF ou CNPJ"
                                        value={formData.cpfCnpj}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tipo de Usuário</label>
                                    <select
                                        name="tipoUsuario"
                                        value={formData.tipoUsuario}
                                        onChange={handleChange}
                                    >
                                        <option value="cliente">Cliente (Comprador)</option>
                                        <option value="vendedor">Vendedor (Empresa ou Pessoa Física)</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Digite sua senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            {isRegister ? "Cadastrar" : "Entrar"}
                        </button>
                    </form>

                    <p className="toggle-text">
                        {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
                        <span onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? "Faça login" : "Cadastre-se"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}