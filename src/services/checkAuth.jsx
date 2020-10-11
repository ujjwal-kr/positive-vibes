import axios from 'axios';

const CheckAuth = {
    check: async function() {
        return await axios.get(URL+'auth')
    }
}

export default CheckAuth;