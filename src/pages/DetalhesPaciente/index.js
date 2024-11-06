import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaMars, FaUserShield, FaEdit, FaNotesMedical, FaUtensils, FaRuler, FaClipboardList, FaUser, FaPhoneAlt, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import EditarPacienteModal from "../../components/EditarPacienteModal";
import ConsultasModal from "../../components/ConsultasModal";
import AnamneseModal from "../../components/AnamneseModal";
import "./detalhespacientes.css";

const Loading = () => (
    <div className="loading-overlay">
        <div className="loading-box">
            <p className="loading-text">Carregando</p>
            <div className="spinner"></div>
        </div>
    </div>
);

const DetalhesPaciente = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consultaModalOpen, setConsultaModalOpen] = useState(false);
    const [anamneseModalOpen, setAnamneseModalOpen] = useState(false);

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
        const partes = data.split(" ")[0].split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleOpenConsultaModal = () => {
        setConsultaModalOpen(true);
    };

    const handleOpenAnamneseModal = () => {
        setAnamneseModalOpen(true);
    };

    const handleCloseModals = () => {
        setConsultaModalOpen(false);
        setAnamneseModalOpen(false);
        setIsModalOpen(false);
    };

    return (
        <div className="main-container">
            <Sidebar />
            <div className="content-container-detalhes">
                <Topbar menuItems={[{ path: "/paciente", name: "Detalhes do Paciente" }]} />
                
                <nav className="breadcrumb">
                    <Link to="/pacientes" className="breadcrumb-link">Pacientes</Link>
                    <span> / </span>
                    <span className="breadcrumb-current">Detalhes do Paciente</span>
                </nav>

                <div className="content-detalhes">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="detalhes-content">
                            <div className="dados-basicos">
                                <div className="dados-header">
                                    <h3>Dados Básicos</h3>
                                    <button className="buttonEdit" onClick={handleEditClick}>
                                        <FaEdit /> Editar
                                    </button>
                                </div>
                                <div className="dados-info">
                                    <div className="dados-item"><FaUser className="icon-style"/><strong>Nome Completo: </strong> {paciente.nome}</div>
                                    <div className="dados-item"><FaBirthdayCake className="icon-style"/><strong>Data de Nascimento: </strong> {formatarData(paciente.data_nascimento)}</div>
                                    {paciente.nome_responsavel && (
                                        <div className="dados-item"><FaUserShield className="icon-style"/> <strong>Nome do Responsável: </strong> {paciente.nome_responsavel}</div>
                                    )}
                                    <div className="dados-item"><FaPhoneAlt className="icon-style"/><strong>Telefone: </strong> {paciente.telefone}</div>
                                    <div className="dados-item"><FaMars className="icon-style"/><strong>Gênero Biológico: </strong> {paciente.sexo === 'F' ? 'Feminino' : 'Masculino'}</div>
                                    <div className="dados-item"><FaClipboardList className="icon-style"/><strong>Tipo de Paciente: </strong> {paciente.tipo_paciente}</div>
                                    <div className="dados-item"><FaUtensils className="icon-style"/><strong>Objetivos: </strong> {paciente.objetivo}</div>
                                    {paciente.email && (
                                        <div className="dados-item"><FaEnvelope className="icon-style"/><strong>Email: </strong> {paciente.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="consulta-secao">
                                <h3>Opções de Consulta</h3>
                                <div className="consulta-opcoes">
                                    <div className="consulta-item" onClick={handleOpenConsultaModal}><FaNotesMedical size={32} /> Consultas</div>
                                    <div className="consulta-item" onClick={handleOpenAnamneseModal}><FaClipboardList size={32} /> Anamnese</div>
                                    <div className="consulta-item" onClick={() => navigate('/antropometria')}><FaRuler size={32} /> Antropometria</div>
                                    <div className="consulta-item" onClick={() => navigate('/refeicoes')}><FaUtensils size={32} /> Refeições</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modais */}
                {isModalOpen && (
                    <EditarPacienteModal
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModals}
                        paciente={paciente}
                        onSave={(updatedPaciente) => {
                            setPaciente(updatedPaciente);
                            handleCloseModals();
                        }}
                    />
                )}
                {consultaModalOpen && 
                    <ConsultasModal 
                    isOpen={consultaModalOpen}
                    onClose={handleCloseModals} 
                    pacienteId={id} />}
                {anamneseModalOpen && <AnamneseModal onClose={handleCloseModals} />}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(DetalhesPaciente);
