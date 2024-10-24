import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import Anamneses from "../pages/Anamneses";
import { connect } from "react-redux";
import Pacientes from "../pages/Pacientes";
import Refeicoes from "../pages/Refeicoes";
import Perfil from "../pages/Perfil";

const RoutesApp = (props) => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/home" element={props.isLoggedIn ? <Home /> : <Navigate to={'/'} />} />
                    <Route path="/" element={props.isLoggedIn ? <Navigate to={'/home'} /> : <SignIn />} />
                    <Route path="/signup" element={props.isLoggedIn ? <Navigate to={'/home'} /> : <SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/anamneses" element={props.isLoggedIn ? <Anamneses /> : <Navigate to={'/'} />} />
                    <Route path="/pacientes" element={props.isLoggedIn ? <Pacientes /> : <Navigate to={'/'} />} />
                    <Route path="/refeicoes" element={props.isLoggedIn ? <Refeicoes /> : <Navigate to={'/'} />} />
                    <Route path="/perfil" element={props.isLoggedIn ? <Perfil /> : <Navigate to={'/'} />} />
                    <Route path="*" element={<Navigate to={'/home'} />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

export default connect(mapStateToProps, null)(RoutesApp);
