import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaUser, FaEdit } from "react-icons/fa";
import EditarPacienteModal from "../../components/EditarPacienteModal"; 
import "./detalhespacientes.css";

const DetalhesPaciente = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const getPaciente = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/pacientes/${id}`);
                setPaciente(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching paciente:", error);
                setError("Erro ao carregar os detalhes do paciente.");
                setLoading(false);
            }
        };
        getPaciente();
    }, [id]);

    const formatarData = (data) => {
        if (!data) return "";
        const partes = data.split(" ")[0].split("-"); // Ignora o horário
        return `${partes[2]}/${partes[1]}/${partes[0]}`; // Formato: dia/mês/ano
    };

    const handleEditClick = () => {
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    const handleSave = async (updatedPaciente) => {
        try {
            await axios.put(`http://localhost:8000/api/pacientes/${id}`, updatedPaciente);
            setPaciente(updatedPaciente);
            handleCloseModal();
        } catch (error) {
            console.error("Error updating paciente:", error);
            setError("Erro ao atualizar os detalhes do paciente.");
        }
    };

    const menuItems = [
        { name: "Início", path: "/home" },
        { name: "Pacientes", path: "/pacientes" },
        { name: "Anamneses", path: "/anamneses" },
        { name: "Refeições", path: "/refeicoes" },
        { name: "Configurações", path: "/configuracoes" },
    ];

    return (
        <div className="main-container">
            <Sidebar />
            <div className="content-container-detalhes">
                <Topbar menuItems={menuItems} />
                <div className="content-detalhes">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="detalhes-content">
                            <h2 className="detalhes-title">Detalhes do Paciente</h2>
                            <div className="detalhes-card">
                                <div className="card-icon">
                                    <FaUser size={48} color="#4E6033" />
                                </div>
                                <div className="card-info">
                                    <p><strong>Nome:</strong> {paciente.nome}</p>
                                    <p><strong>Data de Nascimento:</strong> {formatarData(paciente.data_nascimento)}</p>
                                    <p><strong>Nome do Responsável:</strong> {paciente.nome_responsavel || 'Não Informado'}</p>
                                    <p><strong>Tipo de Paciente:</strong> {paciente.tipo_paciente}</p>
                                    <p><strong>Gênero Biológico:</strong> {paciente.sexo === 'F' ? 'Feminino': 'Masculino'}</p>
                                    <p><strong>Email:</strong> {paciente.email || 'Não informado'}</p>
                                    <p><strong>Telefone:</strong> {paciente.telefone}</p>
                                    <p><strong>Objetivos:</strong> {paciente.objetivo}</p>
                                    <p><strong>Data de Cadastro:</strong> {formatarData(paciente.data_cadastro)}</p>
                                    
                                </div>
                                <button className="buttonEdit" onClick={handleEditClick}>
                                    <FaEdit /> Editar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {isModalOpen && ( 
                    <EditarPacienteModal
                        paciente={paciente}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(DetalhesPaciente);
