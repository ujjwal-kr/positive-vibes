import axios from 'axios';
import URL from '../url';

const Auth = {
    login: async function(email, password) {
        return axios.post(URL+'auth/login', {email, password})
    },

    register: async function(name, email, password) {
        return axios.post(URL+'auth/register', {name, email, password})
    }
}

export default Auth;