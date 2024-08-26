import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [crm, setCrm] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const { signup } = useAuth();

    const nomeRef = useRef(null);

    useEffect(() => {
        if (nomeRef.current) {
            nomeRef.current.focus();
        }
    }, []);

    const handleSignup = async () => {
        if (!nome || !email || !emailConf || !senha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        } else if (email !== emailConf) {
            setError("Os e-mails não são iguais.");
            return;
        }

        const res = await signup(email, senha);
        if (res) {
            setError(res);
            return;
        }

        setSuccess("Cadastro finalizado com sucesso!");
        setError("");
        setTimeout(() => navigate("/"), 2000); // Redireciona após 2 segundos
    };

    return (
        <div className="signup-container">
            <label className="signup-label">SISTEMA DE CADASTRO</label>
            <div className="signup-content">
                <div className="input-group">
                    <label htmlFor="nome" className="input-label">Nome Completo <span className="required">*</span></label>
                    <Input
                        id="nome"
                        type="text"
                        placeholder="Digite seu Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        ref={nomeRef} // Referência para o campo de nome
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email" className="input-label">E-mail <span className="required">*</span></label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="emailConf" className="input-label">Confirme seu E-mail <span className="required">*</span></label>
                    <Input
                        id="emailConf"
                        type="email"
                        placeholder="Confirme seu E-mail"
                        value={emailConf}
                        onChange={(e) => setEmailConf(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="senha" className="input-label">Senha <span className="required">*</span></label>
                    <div className="signup-password-container">
                        <Input
                            id="senha"
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="signup-password-toggle" 
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="crm" className="input-label">CRM (Opcional)</label>
                    <Input
                        id="crm"
                        type="text"
                        placeholder="Digite seu CRM"
                        value={crm}
                        onChange={(e) => setCrm(e.target.value)}
                    />
                </div>

                {error && <label className="signup-label-error">{error}</label>}
                {success && 
                    <div className="success-message">
                        <span className="success-message-icon">✔️</span>
                        <span>{success}</span>
                    </div>
                }

                <Button className="signup-button" Text="Cadastrar" onClick={handleSignup} />

                <label className="signup-label-signup">
                    Já tem uma conta?
                    <strong className="signup-strong">
                        <Link to="/">&nbsp;Entrar</Link>
                    </strong>
                </label>
            </div>
        </div>
    );
};

export default SignUp;
