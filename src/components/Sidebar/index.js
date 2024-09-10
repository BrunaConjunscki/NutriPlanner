import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaUtensils, FaStethoscope, FaCog } from "react-icons/fa";
import "./sidebar.css";
import axios from "axios";
import {setAuthenticationHeader} from "../../utils/authHeader";
import {connect} from "react-redux";

const Sidebar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Itens do menu com rotas
    const menuItems = [
        { name: "Início", path: "/home", icon: <FaHome /> },
        { name: "Pacientes", path: "/pacientes", icon: <FaUser /> },
        { name: "Anamneses", path: "/anamneses", icon: <FaStethoscope /> },
        { name: "Refeições", path: "/refeicoes", icon: <FaUtensils /> }
        // { name: "Configurações", path: "/configuracoes", icon: <FaCog /> }
    ];

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout')
            .then(response => {
                if(response.data.success) {
                    localStorage.removeItem('user_token')
                    setAuthenticationHeader();
                    navigate('/')
                    props.onLoggedOut();
                } else {
                    console.log(response.data.message)
                }
            }).catch(error => {
            console.log(error)
        })
    }

    return (
        <aside className="sidebar">
            <div className="logo">
            <img src="/images/NutriPlannerLogo.png" alt="NutriPlanner" className="logo-image" />
            </div>
            <nav className="menu">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        <span className="menu-icon">{item.icon}</span>
                        <span className="menu-text">{item.name}</span>
                    </Link>
                ))}
            </nav>
            <Link
                to="#"
                className="menu-item signout"
                onClick={handleLogout}
            >
                <span className="menu-icon"><FaSignOutAlt /></span>
                <span className="menu-text">Sair</span>
            </Link>
        </aside>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedOut: () => dispatch({type: 'ON_LOGGED_OUT'})
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);

