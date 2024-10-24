import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const Topbar = ({ menuItems }) => {
    const location = useLocation(); // Para saber a rota atual
    const navigate = useNavigate(); // Função para navegar entre as rotas

    return (
        <header className="topbar">
            <h2>
                {menuItems.find((item) => item.path === location.pathname)?.name}
            </h2>
            <div className="topbar-icons">
                <FaUserCircle 
                    className="icon" 
                    onClick={() => navigate("/perfil")} 
                    style={{ cursor: "pointer" }}
                /> 
            </div>
        </header>
    );
};

export default Topbar;
