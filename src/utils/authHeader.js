import axios from 'axios';

    export function setAuthenticationHeader(token=null) {
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['Accept'] = 'Application/json';
        } else {
            delete axios.defaults.headers.common['Authorization'];
            axios.defaults.headers.common['Accept'] = 'Application/json';
        }
    }