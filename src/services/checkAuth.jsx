import axios from 'axios';
import URL from '../url';

const CheckAuth = {
    check: async function(token) {
        await axios.get(URL+'auth/check', {
            headers: {'authorization': token}
        });
    }
}

export default CheckAuth;