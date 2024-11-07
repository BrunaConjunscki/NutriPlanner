import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaSearch } from "react-icons/fa";
import "./pacientes.css";
import NovoPacienteModal from "../../components/NovoPacienteModal";

const Pacientes = () => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [searchTextPaciente, setSearchTextPaciente] = useState("");
    const [loadingPaciente, setLoadingPaciente] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getPacientes();
    }, []);

    const getPacientes = async () => {
        setLoadingPaciente(true);
        try {
            const response = await axios.get('http://localhost:8000/api/pacientes?limit=20&page=');
            const sortedPacientes = response.data.sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );
            setPacientes(sortedPacientes);
        } catch (error) {
            console.error("Error fetching pacientes:", error);
            setError("Erro ao carregar pacientes.");
        } finally {
            setLoadingPaciente(false);
        }
    };

    const handleSearchChangePaciente = (event) => {
        setSearchTextPaciente(event.target.value);
    };

    const filteredPacientes = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(searchTextPaciente.toLowerCase())
    );

    const handleCardClick = (id) => {
        navigate(`/paciente/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const menuItems = [
        { name: "Início", path: "/home" },
        { name: "Pacientes", path: "/pacientes" },
        { name: "Anamneses", path: "/anamneses" },
        { name: "Refeições", path: "/refeicoes" },
        { name: "Configurações", path: "/configuracoes" },
    ];

    return (
        <div className="main-container-pacientes">
            <Sidebar />
            <div className="content-container-pacientes">
                <Topbar menuItems={menuItems} />
                <div className="content-pacientes">
                    <div className="section">
                        <div className="section-content-pacientes">
                            <div className="section-header-pacientes">
                                <div className="search-container-pacientes">
                                    <input
                                        type="text"
                                        placeholder="Busque pelo nome do paciente"
                                        className="search-input-pacientes"
                                        value={searchTextPaciente}
                                        onChange={handleSearchChangePaciente}
                                        aria-label="Campo de busca de pacientes"
                                    />
                                    <FaSearch className="search-icon-pacientes" />
                                </div>
                                <button className="buttonPacientes" onClick={() => setIsModalOpen(true)}>
                                    Novo Paciente
                                </button>
                            </div>

                            {loadingPaciente ? (
                                <p className="card-p">Carregando...</p>
                            ) : (
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Data de Cadastro</th>
                                                <th>Objetivo</th>
                                                <th>Tipo de Paciente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPacientes.length > 0 ? (
                                                filteredPacientes.map((paciente) => (
                                                    <tr 
                                                        key={paciente.id} 
                                                        onClick={() => handleCardClick(paciente.id)}
                                                    >
                                                        <td>{paciente.nome}</td>
                                                        <td>{formatDate(paciente.data_cadastro)}</td>
                                                        <td>{paciente.objetivo}</td>
                                                        <td>{paciente.tipo_paciente}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">Nenhum paciente encontrado</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Novo Paciente */}
            {isModalOpen && (
                <NovoPacienteModal
                    isOpen={isModalOpen}
                    onRequestClose={() => {
                        setIsModalOpen(false);
                        getPacientes(); // Atualize a lista de pacientes
                    }}
                />
            )}
        </div>
    );
};

export default Pacientes;
