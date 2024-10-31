import React from "react";
import { Link } from "react-router-dom";
import "./breadCrumb.css";

const Breadcrumb = ({ items }) => (
    <nav className="breadcrumb">
        {items.map((item, index) => (
            <span key={index} className="breadcrumb-item">
                {item.path ? (
                    <Link to={item.path}>{item.name}</Link>
                ) : (
                    <span>{item.name}</span>
                )}
                {index < items.length - 1 && " > "}
            </span>
        ))}
    </nav>
);

export default Breadcrumb;
