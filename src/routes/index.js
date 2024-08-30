// src/routes/index.js
import { Fragment } from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import {connect} from "react-redux";

const RoutesApp = (props) => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/home" element= {props.isLoggedIn ? <Home /> : <Navigate to={'/'} /> } />
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Nova rota */}
                    <Route path="*" element={<Navigate to={'/home'} />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(RoutesApp);
