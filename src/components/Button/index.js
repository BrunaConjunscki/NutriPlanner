import React from "react";
import './button.css';

const Button = ({ Text, onClick, Type = "button" }) => {
    return (
        <button className="button" type={Type} onClick={onClick}>
            {Text}
        </button>
    );
};

export default Button;
