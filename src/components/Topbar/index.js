import React from "react";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const Topbar = ({ menuItems }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="topbar">
            <h2>{menuItems.find((item) => item.path === location.pathname)?.name}</h2>
            <div className="topbar-icons">
                <FaCog className="icon" onClick={() => navigate("/configuracoes")} />
                <FaUserCircle className="icon" />
            </div>
        </header>
    );
};

export default Topbar;
