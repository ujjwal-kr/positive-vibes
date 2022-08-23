import axios from 'axios';
import URL from '../url';

const CheckAuth = {
    check: async function(token) {
        return await axios.get(URL+'auth/check', {
            headers: {'authorization': token}
        });
    }
}

export default CheckAuth;