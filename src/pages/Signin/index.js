import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import {setAuthenticationHeader} from "../../utils/authHeader";
import {connect} from "react-redux";

const SignIn = (props) => {
    const navigate = useNavigate();
    const emailRef = useRef(null);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
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
            setError("Email inválido");
            return;
        }

        if (senha.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: senha,
        }).then(response => {
            if(response.data.success) {
                localStorage.setItem('user_token', response.data.token);
                setAuthenticationHeader(response.data.token)
                navigate("/home");
                props.onLoggedIn();
            } else {
                setError((response.data.message))
            }
        }).catch(err => {
            console.log(err)
        });


        setLoading(false);
        //
        // if (res) {
        //     setAttempts(prevAttempts => {
        //         const newAttempts = prevAttempts + 1;
        //         if (newAttempts >= 5) {
        //             setLocked(true);
        //             setTimeout(() => setLocked(false), 15 * 60 * 1000); // 15 minutos
        //         }
        //         return newAttempts;
        //     });
        //     setError(res);
        //     return;
        // }
        //
        // setAttempts(0);
        // navigate("/home");
    };


    return (
        <div className="container">
            <label className="label">SISTEMA DE LOGIN</label>
            <div className="content">
                <div className="input-group">
                    <label htmlFor="email" className="input-label">E-mail <span className="required">*</span></label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                        aria-label="Email"
                        autoComplete="email"
                        ref={emailRef}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="senha" className="input-label">Senha <span className="required">*</span></label>
                    <div className="password-container">
                        <Input
                            id="senha"
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua Senha"
                            value={senha}
                            onChange={(e) => [setSenha(e.target.value), setError("")]}
                            aria-label="Senha"
                            autoComplete="current-password"
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

                {error && <label className="label-error" aria-live="assertive">{error}</label>}

                <Button 
                    Text={loading ? <span className="loading-spinner"></span> : "Entrar"} 
                    onClick={handleLogin}
                    disabled={loading}
                />

                <label className="label-signup">
                    Não tem uma conta?
                    <strong className="strong">
                        <Link to="/signup">&nbsp;Registre-se</Link>
                    </strong>
                </label>

                <div className="forgot-password">
                    <Link to="/forgot-password">Esqueceu a senha?</Link>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedIn: () => dispatch({type: 'ON_LOGGED_IN'})
    }
}

export default connect(null, mapDispatchToProps)(SignIn);
