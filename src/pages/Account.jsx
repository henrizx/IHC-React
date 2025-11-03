// src/components/Account.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Account.css";
import "./Products.css";

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
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);

        if (isRegister) {
            alert("Cadastro realizado com sucesso!");
            // Aqui você pode fazer o registro real e depois logar
            login({
                nome: formData.nome,
                email: formData.email,
                tipoUsuario: formData.tipoUsuario
            });
            navigate("/");
        } else {
            // Verifica se as credenciais são as específicas
            if (formData.email === "teste@teste.com" && formData.senha === "123456") {
                alert("Login efetuado com sucesso!");

                // Define o usuário no contexto
                login({
                    nome: "Usuário Teste",
                    email: formData.email,
                    tipoUsuario: "cliente"
                });

                navigate("/"); // Redireciona para a home
            } else {
                alert("Credenciais inválidas! Tente novamente.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <main className="contact-page">
                <div className="page-inner-content">
                    <nav className="breadcrumbs" aria-label="Navegação estrutural">
                        <a href="/">Home</a> &gt; <span>Conta</span>
                    </nav>

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
            </main>
            <Footer />
        </>
    );
}