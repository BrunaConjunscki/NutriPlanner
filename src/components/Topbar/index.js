import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./topbar.css";
import Help from "../Help";
import NovoPacienteModal from "../NovoPacienteModal";

const Topbar = ({ menuItems }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Para saber a rota atual
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const currentMenuItem = menuItems?.find((item) =>
        location.pathname.startsWith(item.path) // Verifica se o caminho atual começa com o caminho definido
    );
    return (
        <header className="topbar">
            <h2>
                {currentMenuItem ? currentMenuItem.name : 'Título padrão'}
            </h2>
            <div className="topbar-icons">
                <FaQuestionCircle
                    className="icon"
                    onClick={() => setIsHelpOpen(true)}
                />
                <FaUserCircle
                    className="icon" 
                    onClick={() => navigate("/perfil")} 
                    style={{ cursor: "pointer" }}
                /> 
            </div>

            {isHelpOpen && (
                <Help
                    isOpen={isHelpOpen}
                    onRequestClose={() => {
                        setIsHelpOpen(false);
                    }}
                    location={location.pathname}
                />
            )}

        </header>
    );
};

export default Topbar;
