import React, { useEffect, useState } from "react";
import "./home.css";
import axios from 'axios';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Home = (props) => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    
    useEffect(() => {
        getPacientes();
    }, []);

    const getPacientes = () => {
        axios.get('http://localhost:8000/api/pacientes?limit=3')
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error("Error fetching pacientes:", error);
            });
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
                <div className="content">
                    
                    <div className="section">
                        <div className="section-header">
                            <h2>Pacientes Cadastrados</h2>
                            <Button Text="Novo Paciente" onClick={() => navigate('/pacientes/novo')} />
                        </div>
                        <input type="text" placeholder="Busque pelo nome do paciente" className="search-input" />
                        <div className="card-list">
                            {pacientes.length > 0 ? pacientes.map((paciente) => (
                                <div key={paciente.id} className="card">
                                    <div className="card-icon"></div>
                                    <div className="card-content">
                                        <p>{paciente.nome}</p>
                                        <span>{paciente.dataCadastro}</span>
                                    </div>
                                </div>
                            )) : (
                                <p>Nenhum paciente encontrado.</p>
                            )}
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-header">
                            <h2>Modelos Anamneses</h2>
                            <Button Text="Novo Modelo" onClick={() => navigate('/anamneses/novo')} />
                        </div>
                        <input type="text" placeholder="Busque pelo nome da anamnese" className="search-input" />
                        <div className="card-list">
                            <div className="card">
                                <div className="card-icon"></div>
                                <div className="card-content">
                                    <p>Anamnese Adulto</p>
                                    <span>28 Fevereiro 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedOut: () => dispatch({ type: 'ON_LOGGED_OUT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
