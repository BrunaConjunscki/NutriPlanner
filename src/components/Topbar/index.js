import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./topbar.css";

const Topbar = ({ menuItems }) => {
    const location = useLocation(); 
    const navigate = useNavigate();

    const currentMenuItem = menuItems?.find((item) => item.path === location.pathname);

    return (
        <header className="topbar">
            <h2>
                {currentMenuItem ? currentMenuItem.name : 'Título padrão'}
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
