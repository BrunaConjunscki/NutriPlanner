import React, { useEffect, useState } from "react";
import { FaEnvelope, FaIdCard, FaUser } from "react-icons/fa";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/BreadCrumb";
import axios from "axios";
import "./perfil.css";

const Loading = () => (
    <div className="loading-overlay">
        <div className="loading-box">
            <p className="loading-text">Carregando</p>
            <div className="spinner"></div> {/* Spinner de carregamento */}
        </div>
    </div>
);

const ProfileCard = ({ nutricionista }) => (
    <div className="profile-card">
        <h3>Informações Pessoais</h3>
        <div className="profile-info">
            <div className="profile-item">
                <FaEnvelope className="profile-icon" />
                <span className="profile-title">E-mail:</span>
                <span>{nutricionista.email}</span>
            </div>
            <div className="profile-item">
                <FaUser className="profile-icon" />
                <span className="profile-title">Nome:</span>
                <span>{nutricionista.nutricionista.nome}</span>
            </div>
            <div className="profile-item">
                <FaIdCard className="profile-icon" />
                <span className="profile-title">CRN:</span>
                <span>{nutricionista.crn || "Não informado"}</span>
            </div>
        </div>
    </div>
);

const Perfil = () => {
    const [nutricionista, setNutricionista] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNutricionista = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user");
                setNutricionista(response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do nutricionista:", error);
                if (error.response) {
                    setError(`Erro na resposta da API: ${error.response.status}`);
                } else if (error.request) {
                    setError("Sem resposta do servidor.");
                } else {
                    setError("Erro ao configurar a requisição.");
                }
            }
        };
        fetchNutricionista();
    }, []);

    if (error) return <p className="error-message">{error}</p>;

    if (!nutricionista) return <Loading />;

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-container">
                <Topbar menuItems={[{ path: "/perfil", name: "Perfil do Nutricionista" }]} />
                <Breadcrumb items={[{ path: "/", name: "Início" }, { name: "Perfil do Nutricionista" }]} />
                <div className="profile-content">
                    <ProfileCard nutricionista={nutricionista} />
                </div>
            </div>
        </div>
    );
};

export default Perfil;
