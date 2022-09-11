import axios from 'axios';
import URL  from '../url';

const SettingsService = {
    getUserSetting:  (token, user_id) => {
        return axios.get(URL +'auth/setting/' + user_id, {
            headers: {'authorization': token}
        })
    },

    changeSetting:  (token, user_id, setting) => {
        return axios.patch(URL +'auth/user/'+ user_id, {setting: setting}, {
            headers: {'authorization': token}
        })
    }
}

export default SettingsService;