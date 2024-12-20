import React, { useEffect, useState, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { setAuthenticationHeader } from "../../utils/authHeader";
import { connect } from "react-redux";
import "./signin.css";

const Loading = () => (
    <div className="loading-overlay">
        <div className="loading-box">
            <p className="loading-text">Carregando</p>
            <div className="spinner"></div>
        </div>
    </div>
);

const SignIn = (props) => {
    const navigate = useNavigate();
    const emailRef = useRef(null);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async () => {
        if (locked) {
            setError("Conta temporariamente bloqueada. Tente novamente mais tarde.");
            return;
        }

        if (!email || !senha) {
            setError("Preencha todos os campos");
            return;
        }

        if (!validateEmail(email)) {
            setError("Email ou senha inválido");
            return;
        }

        if (senha.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password: senha,
            });

            if (response.data.success) {
                localStorage.setItem('user_token', response.data.token);
                setAuthenticationHeader(response.data.token);
                navigate("/home");
                props.onLoggedIn();
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.log(err);
            setError("Erro ao tentar fazer login. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="signin-container">
            <div className="signin-left">
                <img src="/images/AlimentosLogin.png" alt="Alimentos" className="signin-image" />
            </div>
            <div className="signin-right">
                <div className="signin-content">
                    <img src="/images/NutriPlannerLogo.png" alt="NutriPlanner" className="signin-logo-image" />
                    <h2 className="signin-title">Entrar</h2>
                    
                    <div className="input-group">
                        <label htmlFor="email" className="input-label-signin">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu Email"
                            value={email}
                            onChange={(e) => [setEmail(e.target.value), setError("")]}
                            aria-label="Email"
                            autoComplete="email"
                            ref={emailRef}
                            className={error ? "input-error" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senha" className="input-label-signin">Senha</label>
                        <div className="password-container">
                            <Input
                                id="senha"
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua Senha"
                                value={senha}
                                onChange={(e) => [setSenha(e.target.value), setError("")]}
                                aria-label="Senha"
                                autoComplete="current-password"
                                className={error ? "input-error" : ""}
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

                    {error && <label className="label-error">{error}</label>}
                    
                    <Button 
                        Text="Entrar" 
                        onClick={handleLogin}
                        disabled={loading}
                    />
                    
                    <div className="signin-footer">
                        <p>Não tem conta? <Link to="/signup">Registrar-se</Link></p>
                        <p><Link to="/forgot-password">Esqueceu a senha?</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedIn: () => dispatch({ type: 'ON_LOGGED_IN' })
    };
};

export default connect(null, mapDispatchToProps)(SignIn);
