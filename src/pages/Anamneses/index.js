import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaStethoscope, FaSearch } from "react-icons/fa";
import "./anamneses.css";

const Anamneses = () => {
    const navigate = useNavigate();
    const [anamneses, setAnamneses] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getAnamneses();
    }, []);

    useEffect(() => {
        if (searchText) {
            const timer = setTimeout(() => {
                searchAnamneses(searchText);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestions([]);
        }
    }, [searchText]);

    const getAnamneses = () => {
        setLoading(true);
        axios.get('http://localhost:8000/api/anamneses?limit=4')
            .then(response => {
                setAnamneses(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching anamneses:", error);
                setLoading(false);
                setError("Erro ao carregar modelos de anamnese.");
            });
    };

    const searchAnamneses = (query) => {
        axios.get(`http://localhost:8000/api/anamneses?search=${query}`)
            .then(response => {
                setSuggestions(response.data);
            })
            .catch(error => {
                console.error("Error searching anamneses:", error);
                setError("Erro ao buscar modelos de anamnese.");
            });
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSuggestionClick = (suggestion, event) => {
        event.preventDefault();
        navigate(`/anamnese/${suggestion.id}`);
        setSearchText(suggestion.nome);
        setSuggestions([]);
    };

    const handleCardClick = (id) => {
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
                <div className="content-anamnese">
                    <div className="section-anamneses">
                        <h2 className="section-title">Modelos Anamneses</h2>
                        <div className="section-content">
                            <div className="section-header">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Busque pelo nome da anamnese"
                                        className="search-input"
                                        value={searchText}
                                        onChange={handleSearchChange}
                                        aria-label="Campo de busca de anamneses"
                                    />
                                    <FaSearch className="search-icon" />
                                    {suggestions.length > 0 && (
                                        <div className="suggestions-container">
                                            {suggestions.map(suggestion => (
                                                <div
                                                    key={suggestion.id}
                                                    className="suggestion-item"
                                                    onClick={(event) => handleSuggestionClick(suggestion, event)}
                                                >
                                                    {suggestion.nome}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="buttonHome" onClick={() => navigate('/anamneses/novo')}>
                                    Novo Modelo
                                </button>
                            </div>
                            {loading ? (
                                <p className="card-p">Carregando...</p>
                            ) : (
                                <div className="card-list">
                                    {anamneses.length > 0 ? anamneses.map((anamnese) => (
                                        <div 
                                            key={anamnese.id} 
                                            className="card" 
                                            onClick={() => handleCardClick(anamnese.id)}
                                        >
                                            <div className="card-icon">
                                                <FaStethoscope size={24} color="#4E6033" />
                                            </div>
                                            <div className="card-content">
                                                <p>{anamnese.nome}</p>
                                                <span>{formatDate(anamnese.data_cadastro)}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="card-p">Nenhum modelo encontrado</p>
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default Anamneses;
