import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const SignUp = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConf, setSenhaConf] = useState(""); 
    const [crn, setCrn] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false); 

    const navigate = useNavigate();
    const nomeRef = useRef(null);

    useEffect(() => {
        if (nomeRef.current) {
            nomeRef.current.focus();
        }
    }, []);

    const handleSignup = async () => {
        if (!nome || !email || !senha || !senhaConf) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        } else if (senha !== senhaConf) {
            setError("As senhas não são iguais.");
            return;
        }

        axios.post('http://localhost:8000/api/register', {
            name: nome,
            email: email,
            password: senha,
            password_confirmation: senhaConf,
            crn: crn,
        }).then((response) => {
            if(response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => navigate("/"), 2000);
            } else {
                setError(response.data.message)
            }
        })
        .catch((err) => {
            setError(err.message);
            console.log(err.message);
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <img src="/images/AlimentosLogin.png" alt="Alimentos" className="signup-image" />
            </div>
            <div className="signup-right">
                <div className="signup-content">
                    <img src="/images/NutriPlannerLogo.png" alt="NutriPlanner" className="signup-logo-image" />
                    <h2 className="signup-title">Cadastro</h2>
                    <div className="input-group">
                        <label htmlFor="nome" className="input-label-signup">Nome Completo <span className="required">*</span></label>
                        <Input
                            id="nome"
                            type="text"
                            placeholder="Digite seu Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            ref={nomeRef} 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email" className="input-label-signup">E-mail <span className="required">*</span></label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senha" className="input-label-signup">Senha <span className="required">*</span></label>
                        <div className="password-container">
                            <Input
                                id="senha"
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="senhaConf" className="input-label-signup">Confirme sua Senha <span className="required">*</span></label>
                        <div className="password-container">
                            <Input
                                id="senhaConf"
                                type={showPasswordConf ? "text" : "password"}
                                placeholder="Confirme sua Senha"
                                value={senhaConf}
                                onChange={(e) => setSenhaConf(e.target.value)} 
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPasswordConf(!showPasswordConf)} 
                                aria-label={showPasswordConf ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPasswordConf ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="crn" className="input-label-signup">CRN</label>
                        <Input
                            id="crn"
                            type="text"
                            placeholder="Digite seu CRN"
                            value={crn}
                            onChange={(e) => setCrn(e.target.value)}
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
        </div>
    );
};

export default SignUp;
