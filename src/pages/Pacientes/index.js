import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaUser, FaSearch } from "react-icons/fa";
import "./pacientes.css";

const Pacientes = () => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [searchTextPaciente, setSearchTextPaciente] = useState("");
    const [suggestionsPaciente, setSuggestionsPaciente] = useState([]);
    const [loadingPaciente, setLoadingPaciente] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getPacientes();
    }, []);

    useEffect(() => {
        if (searchTextPaciente) {
            const timer = setTimeout(() => {
                searchPacientes(searchTextPaciente);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestionsPaciente([]);
        }
    }, [searchTextPaciente]);

    const getPacientes = () => {
        setLoadingPaciente(true);
        axios.get('http://localhost:8000/api/pacientes?limit=4')
            .then(response => {
                setPacientes(response.data);
                setLoadingPaciente(false);
            })
            .catch(error => {
                console.error("Error fetching pacientes:", error);
                setLoadingPaciente(false);
                setError("Erro ao carregar pacientes.");
            });
    };

    const searchPacientes = (query) => {
        axios.get(`http://localhost:8000/api/pacientes?search=${query}`)
            .then(response => {
                setSuggestionsPaciente(response.data);
            })
            .catch(error => {
                console.error("Error searching pacientes:", error);
                setError("Erro ao buscar pacientes.");
            });
    };

    const handleSearchChangePaciente = (event) => {
        setSearchTextPaciente(event.target.value);
    };

    const handleSuggestionClickPaciente = (suggestion, event) => {
        event.preventDefault();
        navigate(`/paciente/${suggestion.id}`);
        setSearchTextPaciente(suggestion.nome);
        setSuggestionsPaciente([]);
    };

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
        <div className="main-container">
            <Sidebar />
            <div className="content-container">
                <Topbar menuItems={menuItems} />
                <div className="content-pacientes">
                    <div className="section">
                        <h2 className="section-title">Pacientes Cadastrados</h2>
                        <div className="section-content">
                            <div className="section-header">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Busque pelo nome do paciente"
                                        className="search-input"
                                        value={searchTextPaciente}
                                        onChange={handleSearchChangePaciente}
                                        aria-label="Campo de busca de pacientes"
                                    />
                                    <FaSearch className="search-icon" />
                                    {suggestionsPaciente.length > 0 && (
                                        <div className="suggestions-container">
                                            {suggestionsPaciente.map(suggestion => (
                                                <div
                                                    key={suggestion.id}
                                                    className="suggestion-item"
                                                    onClick={(event) => handleSuggestionClickPaciente(suggestion, event)}
                                                >
                                                    {suggestion.nome}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="buttonPacientes" onClick={() => navigate('/pacientes/novo')}>
                                    Novo Paciente
                                </button>
                            </div>
                            {loadingPaciente ? (
                                <p className="card-p">Carregando...</p>
                            ) : (
                                <div className="card-list">
                                    {pacientes.length > 0 ? pacientes.map((paciente) => (
                                        <div 
                                            key={paciente.id} 
                                            className="card" 
                                            onClick={() => handleCardClick(paciente.id)}
                                        >
                                            <div className="card-icon">
                                                <FaUser size={24} color="#4E6033" />
                                            </div>
                                            <div className="card-content">
                                                <p>{paciente.nome}</p>
                                                <span>{formatDate(paciente.data_cadastro)}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="card-p">Nenhum paciente encontrado</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pacientes;
