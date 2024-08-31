import React, {useEffect, useState} from "react";
import "./styles.css";
import axios from 'axios';
import {connect} from "react-redux";
import {setAuthenticationHeader} from "../../utils/authHeader";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {useLocation, useNavigate} from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        getPacientes();
    }, []);

    const getPacientes = () => {
        axios.get('http://localhost:8000/api/pacientes?limit=3')
            .then(response => {
                setPacientes(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Itens do menu com rotas
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
                    <h3>Bem-vindo à página {menuItems.find((item) => item.path === location.pathname)?.name}!</h3>
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
        onLoggedOut: () => dispatch({type: 'ON_LOGGED_OUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
