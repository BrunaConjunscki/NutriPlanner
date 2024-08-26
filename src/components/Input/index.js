import React from "react";
import "./styles.css";

const Input = React.forwardRef(({ type, placeholder, value, onChange }, ref) => {
    return (
        <input
            className="input"
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            ref={ref}
        />
    );
});

export default Input;
