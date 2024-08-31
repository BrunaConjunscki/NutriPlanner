import React from "react";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const menuItems = [
        { name: "Início", path: "/home" },
        { name: "Pacientes", path: "/pacientes" },
        { name: "Anamneses", path: "/anamneses" },
        { name: "Refeições", path: "/refeicoes" },
        { name: "Configurações", path: "/configuracoes" }
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

export default Home;
