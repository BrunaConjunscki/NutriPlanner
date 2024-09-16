import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaUser, FaStethoscope, FaSearch } from "react-icons/fa";
import Input from "../../components/Input";
import NovoPacienteModal from "../../components/NovoPacienteModal";
import "./home.css";

const Home = (props) => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [anamnese, setAnamnese] = useState([]);
    const [searchTextPaciente, setSearchTextPaciente] = useState("");
    const [searchTextAnamnese, setSearchTextAnamnese] = useState("");
    const [suggestionsPaciente, setSuggestionsPaciente] = useState([]);
    const [suggestionsAnamnese, setSuggestionsAnamnese] = useState([]);
    const [loadingPaciente, setLoadingPaciente] = useState(false);
    const [loadingAnamnese, setLoadingAnamnese] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getPacientes();
        getAnamnese();
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

    useEffect(() => {
        if (searchTextAnamnese) {
            const timer = setTimeout(() => {
                searchAnamnese(searchTextAnamnese);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestionsAnamnese([]);
        }
    }, [searchTextAnamnese]);

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

    const getAnamnese = () => {
        setLoadingAnamnese(true);
        axios.get('http://localhost:8000/api/anamneses?limit=4')
            .then(response => {
                setAnamnese(response.data);
                setLoadingAnamnese(false);
            })
            .catch(error => {
                console.error("Error fetching anamnese:", error);
                setLoadingAnamnese(false);
                setError("Erro ao carregar modelos de anamnese.");
            });
    };

    const searchPacientes = (query) => {
        axios.get(`http://localhost:8000/api/pacientes?nome=${query}`)
            .then(response => {
                setSuggestionsPaciente(response.data);
            })
            .catch(error => {
                console.error("Error searching pacientes:", error);
                setError("Erro ao buscar pacientes.");
            });
    };

    const searchAnamnese = (query) => {
        axios.get(`http://localhost:8000/api/anamneses?search=${query}`)
            .then(response => {
                setSuggestionsAnamnese(response.data);
            })
            .catch(error => {
                console.error("Error searching anamnese:", error);
                setError("Erro ao buscar modelos de anamnese.");
            });
    };

    const handleSearchChangePaciente = (event) => {
        setSearchTextPaciente(event.target.value);
    };

    const handleSearchChangeAnamnese = (event) => {
        setSearchTextAnamnese(event.target.value);
    };

    const handleSuggestionClickPaciente = (suggestion, event) => {
        event.preventDefault();
        navigate(`/paciente/${suggestion.id}`);
        setSearchTextPaciente(suggestion.nome);
        setSuggestionsPaciente([]);
    };

    const handleSuggestionClickAnamnese = (suggestion, event) => {
        event.preventDefault();
        navigate(`/anamnese/${suggestion.id}`);
        setSearchTextAnamnese(suggestion.nome);
        setSuggestionsAnamnese([]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleCardClick = (id) => {
        navigate(`/paciente/${id}`);
    };

    const handleCardClickAnamnese = (id) => {
        navigate(`/anamnese/${id}`);
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
                <div className="content-home">
                    {/* Pacientes */}
                    <div className="section">
                        <h2 className="section-title">Pacientes Cadastrados</h2>
                        <div className="section-content">
                            <div className="section-header">
                                <div className="search-container">
                                    <Input
                                        type="text"
                                        placeholder="Busque pelo nome do paciente"
                                        value={searchTextPaciente}
                                        onChange={handleSearchChangePaciente}
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
                                <button className="buttonHome" onClick={() => setIsModalOpen(true)}>
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
                                            <div className="card-icon-home">
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
                    {/* Anamnese */}
                    <div className="section">
                        <h2 className="section-title">Modelos Anamneses</h2>
                        <div className="section-content">
                            <div className="section-header">
                                <div className="search-container">
                                    <Input
                                        type="text"
                                        placeholder="Busque pelo nome da anamnese"
                                        value={searchTextAnamnese}
                                        onChange={handleSearchChangeAnamnese}
                                    />
                                    <FaSearch className="search-icon" />
                                    {suggestionsAnamnese.length > 0 && (
                                        <div className="suggestions-container">
                                            {suggestionsAnamnese.map(suggestion => (
                                                <div
                                                    key={suggestion.id}
                                                    className="suggestion-item"
                                                    onClick={(event) => handleSuggestionClickAnamnese(suggestion, event)}
                                                >
                                                    {suggestion.nome}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="buttonHome" onClick={() => navigate('/anamnese/novo')}>
                                    Nova Anamnese
                                </button>
                            </div>
                            {loadingAnamnese ? (
                                <p className="card-p">Carregando...</p>
                            ) : (
                                <div className="card-list">
                                    {anamnese.length > 0 ? anamnese.map((modelo) => (
                                        <div
                                            key={modelo.id}
                                            className="card"
                                            onClick={() => handleCardClickAnamnese(modelo.id)}
                                        >
                                            <div className="card-icon">
                                                <FaStethoscope size={24} color="#4E6033" />
                                            </div>
                                            <div className="card-content">
                                                <p>{modelo.nome}</p>
                                                <span>{formatDate(modelo.data_cadastro)}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="card-p">Nenhum modelo de anamnese encontrado</p>
                                    )}
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

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Home);
