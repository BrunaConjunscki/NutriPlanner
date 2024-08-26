import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { FaUserCircle, FaCog } from "react-icons/fa";
import "./styles.css";

const Home = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Itens do menu com rotas
    const menuItems = [
        { name: "Início", path: "/home" },
        { name: "Pacientes", path: "/pacientes" },
        { name: "Anamneses", path: "/anamneses" },
        { name: "Refeições", path: "/refeicoes" },
        { name: "Configurações", path: "/configuracoes" }
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
                <Button Text="Sair" onClick={() => [signout(), navigate("/")]}/>
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

export default Home;
