// src/routes/index.js
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import useAuth from "../hooks/useAuth";

// Verifica se está autenticado; caso contrário, redireciona para o SignIn
const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed ? <Item /> : <SignIn />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/home" element={<Private Item={Home} />} />
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Nova rota */}
                    <Route path="*" element={<SignIn />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default RoutesApp;
