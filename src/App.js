import React from "react";
import RoutesApp from "./routes";
import "./styles/global.css";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "./store/reducer";
import {setAuthenticationHeader} from "./utils/authHeader";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('user_token');
setAuthenticationHeader(token);
if(token) {
    store.dispatch({type: 'ON_LOGGED_IN'});
}

const App = () => {
    return(
        <Provider store={store}>
            <RoutesApp/>
        </Provider>
    )
}

export default App;
