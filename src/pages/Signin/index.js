import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './styles.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const { signin } = useAuth();
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

        await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: senha,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
        })
            .then((response) => response.json())
            .then(data => {
                if(data.success) {
                    localStorage.setItem('user_token', data.token);
                    signin(email, senha);
                    navigate("/home");
                } else {
                    setError((data.message))
                }
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
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

    const handleTeste = async () =>  {
        await fetch('http://localhost:8000/api/teste', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            });
    }

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

export default SignIn;
