import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FaUserCircle, FaCog } from "react-icons/fa";
import "./styles.css";
import axios from 'axios';
import {connect} from "react-redux";
import {setAuthenticationHeader} from "../../utils/authHeader";

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

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout')
            .then(response => {
                if(response.data.success) {
                    localStorage.removeItem('user_token')
                    setAuthenticationHeader();
                    navigate('/login')
                    props.onLoggedOut();
                } else {
                    console.log(response.data.message)
                }
            }).catch(error => {
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
            {/* Menu lateral */}
            <aside className="sidebar">
                <div className="logo">Nutriplanner</div>
                <nav className="menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                {/*<button onclick="handleLogout()">Sair</button>*/}
                <Button Text="Sair" onClick={handleLogout}/>
            </aside>

            {/* Barra superior */}
            <header className="topbar">
                <h2>{menuItems.find((item) => item.path === location.pathname)?.name}</h2>
                <div className="topbar-icons">
                    <FaUserCircle className="icon" />
                    <FaCog className="icon" onClick={() => navigate("/configuracoes")} />
                </div>
            </header>

            {/* Conteúdo da página */}
            <div className="content">
                {/* Miolo vai aqui */}
                <h3>Bem-vindo à página {menuItems.find((item) => item.path === location.pathname)?.name}!</h3>
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
