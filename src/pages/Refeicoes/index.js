import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaUtensils, FaSearch } from "react-icons/fa";
import "./refeicoes.css";

const Refeicoes = () => {
    const navigate = useNavigate();
    const [refeicoes, setRefeicoes] = useState([]);
    const [searchTextRefeicao, setSearchTextRefeicao] = useState("");
    const [suggestionsRefeicao, setSuggestionsRefeicao] = useState([]);
    const [loadingRefeicao, setLoadingRefeicao] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getRefeicoes();
    }, []);

    useEffect(() => {
        if (searchTextRefeicao) {
            const timer = setTimeout(() => {
                searchRefeicoes(searchTextRefeicao);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestionsRefeicao([]);
        }
    }, [searchTextRefeicao]);

    const getRefeicoes = () => {
        setLoadingRefeicao(true);
        axios.get('http://localhost:8000/api/dieta_template?limit=5')
            .then(response => {
                setRefeicoes(response.data);
                setLoadingRefeicao(false);
            })
            .catch(error => {
                console.error("Error fetching refeições:", error);
                setLoadingRefeicao(false);
                setError("Erro ao carregar refeições.");
            });
    };

    const searchRefeicoes = (query) => {
        axios.get(`http://localhost:8000/api/refeicoes?search=${query}`)
            .then(response => {
                setSuggestionsRefeicao(response.data);
            })
            .catch(error => {
                console.error("Error searching refeições:", error);
                setError("Erro ao buscar refeições.");
            });
    };

    const handleSearchChangeRefeicao = (event) => {
        setSearchTextRefeicao(event.target.value);
    };

    const handleSuggestionClickRefeicao = (suggestion, event) => {
        event.preventDefault();
        navigate(`/refeicao/${suggestion.id}`);
        setSearchTextRefeicao(suggestion.nome);
        setSuggestionsRefeicao([]);
    };

    const handleCardClick = (id) => {
        navigate(`/refeicao/${id}`);
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
                <div className="content-refeicoes">
                    <div className="section">
                        <h2 className="section-title">Refeições Cadastradas</h2>
                        <div className="section-content">
                            <div className="section-header-refeicoes">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Busque pelo nome da refeição"
                                        className="search-input"
                                        value={searchTextRefeicao}
                                        onChange={handleSearchChangeRefeicao}
                                        aria-label="Campo de busca de refeições"
                                    />
                                    <FaSearch className="search-icon-refeicoes" />
                                    {suggestionsRefeicao.length > 0 && (
                                        <div className="suggestions-container">
                                            {suggestionsRefeicao.map(suggestion => (
                                                <div
                                                    key={suggestion.id}
                                                    className="suggestion-item"
                                                    onClick={(event) => handleSuggestionClickRefeicao(suggestion, event)}
                                                >
                                                    {suggestion.nome}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="buttonRefeicoes" onClick={() => navigate('/refeicoes/novo')}>
                                    Nova Refeição
                                </button>
                            </div>
                            {loadingRefeicao ? (
                                <p className="card-p">Carregando...</p>
                            ) : (
                                <div className="card-list">
                                    {refeicoes.length > 0 ? refeicoes.map((refeicao) => (
                                        <div 
                                            key={refeicao.id} 
                                            className="card" 
                                            onClick={() => handleCardClick(refeicao.id)}
                                        >
                                            <div className="card-icon">
                                                <FaUtensils size={24} color="#4E6033" />
                                            </div>
                                            <div className="card-content">
                                                <p>{refeicao.nome}</p>
                                                <span>{formatDate(refeicao.data_cadastro)}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="card-p">Nenhuma refeição encontrada</p>
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

export default Refeicoes;
