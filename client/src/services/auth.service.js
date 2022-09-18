import axios from 'axios';
import URL from '../url';

const AuthService = {
    login: async function (email, password) {
        return await axios.post(URL + 'auth/login', { email, password })
    },

    register: async function (name, email, password) {
        return await axios.post(URL + 'auth/register', { name, email, password })
    },

    checkAuth: async (token) => {
        return await axios.get(URL + "auth/check", {
            headers: { 'authorization': token, 'test': 'test123' }
        })
    }
}

export default AuthService;