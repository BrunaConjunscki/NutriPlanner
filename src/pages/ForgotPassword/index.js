import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import './forgot.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const { resetPassword } = useAuth();

    const emailRef = useRef(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const handleResetPassword = async () => {
        const result = await resetPassword(email);
        setMessage(result || "Instruções de recuperação de senha enviadas para o e-mail fornecido.");
    };

    return (
        <div className="signin-container">
            <div className="signin-left">
                <img src="/images/AlimentosLogin.png" alt="Alimentos" className="signin-image" />
            </div>
            <div className="signin-right">
                <div className="signin-content">
                    <img src="/images/NutriPlannerLogo.png" alt="NutriPlanner" className="signin-logo-image" />
                    <h2 className="signin-title">RECUPERAÇÃO DE SENHA</h2>

                    <div className="input-group">
                        <label className="input-label">Digite seu E-mail</label>
                        <Input
                            type="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email"
                            autoComplete="email"
                            ref={emailRef}
                        />
                    </div>
                    {message && <label className="label-error" aria-live="assertive">{message}</label>}
                    <Button
                        Text="Enviar"
                        onClick={handleResetPassword}
                    />
                    <div className="signin-footer">
                        <Link to="/">Voltar para login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
