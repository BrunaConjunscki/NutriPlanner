import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaIdCard, FaBirthdayCake } from "react-icons/fa";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import "./perfil.css";

const Perfil = () => {
    const [nutricionista, setNutricionista] = useState(null);
    const [error, setError] = useState(null); // Novo estado para erros
    
    useEffect(() => {
        const fetchNutricionista = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/nutricionista');
                if (!response.ok) {
                    throw new Error('Erro na resposta da API'); // Lança um erro se a resposta não for ok
                }
                const data = await response.json();
                setNutricionista(data);
            } catch (error) {
                console.error("Erro ao buscar informações do nutricionista:", error);
                setError("Não foi possível carregar as informações do nutricionista."); // Define mensagem de erro
            }
        };

        fetchNutricionista();
    }, []);

    if (error) {
        return <p>{error}</p>; // Renderiza a mensagem de erro
    }

    if (!nutricionista) {
        return <p>Carregando...</p>; // Renderiza carregando enquanto os dados estão sendo buscados
    }

    return (
        <div className="profile-page">
            <Topbar />
            <div className="profile-container">
                <Sidebar />
                <div className="profile-content">
                    <h2>Perfil do Nutricionista</h2>
                    <div className="profile-card">
                        <h3>Informações Pessoais</h3>
                        <div className="profile-info">
                            <div className="profile-item">
                                <FaIdCard className="profile-icon" /> <span>ID: {nutricionista.id}</span>
                            </div>
                            <div className="profile-item">
                                <FaEnvelope className="profile-icon" /> <span>E-mail: {nutricionista.email}</span>
                            </div>
                            <div className="profile-item">
                                <FaPhone className="profile-icon" /> <span>Telefone: {nutricionista.telefone || "Não informado"}</span>
                            </div>
                            <div className="profile-item">
                                <FaBirthdayCake className="profile-icon" /> <span>Data de Nascimento: {nutricionista.data_nascimento || "Não informada"}</span>
                            </div>
                            <div className="profile-item">
                                <span>Nome: {nutricionista.nome}</span>
                            </div>
                            <div className="profile-item">
                                <span>CRN: {nutricionista.crn || "Não informado"}</span>
                            </div>
                            <div className="profile-item">
                                <span>Especialidade: {nutricionista.especialidade || "Não informada"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
