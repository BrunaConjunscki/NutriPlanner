import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaUtensils, FaStethoscope, FaCog } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import "./styles.css";

const Sidebar = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Itens do menu com rotas
    const menuItems = [
        { name: "Início", path: "/home", icon: <FaHome /> },
        { name: "Pacientes", path: "/pacientes", icon: <FaUser /> },
        { name: "Anamneses", path: "/anamneses", icon: <FaStethoscope /> },
        { name: "Refeições", path: "/refeicoes", icon: <FaUtensils /> },
        { name: "Configurações", path: "/configuracoes", icon: <FaCog /> }
    ];

    return (
        <aside className="sidebar">
            <div className="logo">Nutriplanner</div>
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
                onClick={() => [signout(), navigate("/")]}
            >
                <span className="menu-icon"><FaSignOutAlt /></span>
                <span className="menu-text">Sair</span>
            </Link>
        </aside>
    );
};

export default Sidebar;
