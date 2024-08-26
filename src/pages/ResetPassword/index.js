import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './styles.css';

const ResetPassword = () => {
    const { token } = useParams(); // Obtenha o token da URL
    const { resetPassword } = useAuth();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem.");
            return;
        }

        const res = await resetPassword(token, password);
        if (res) {
            setMessage("Senha redefinida com sucesso. Você pode fazer login agora.");
        } else {
            setMessage("Ocorreu um erro. Por favor, tente novamente.");
        }
    };

    return (
        <div className="container">
            <label className="label">Redefinir Senha</label>
            <div className="content">
                <Input
                    type="password"
                    placeholder="Nova Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Nova Senha"
                />
                <Input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-label="Confirmar Senha"
                />

                <Button 
                    Text="Redefinir Senha" 
                    onClick={handleResetPassword}
                />

                <label className="label-message">{message}</label>
            </div>
        </div>
    );
};

export default ResetPassword;
