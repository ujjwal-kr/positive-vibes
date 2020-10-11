import axios from 'axios';
import URL  from '../url';

const FetchNews = {
        topStories: async function(token) {
            return await axios.get(URL+'news', {
                headers: {'authorization': token}
            });
        }
}

export default FetchNews;