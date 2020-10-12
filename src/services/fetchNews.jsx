import axios from 'axios';
import URL  from '../url';

const FetchNews = {
        topStories: async function(token) {
            return await axios.get(URL+'news', {
                headers: {'authorization': token}
            });
        },

        fetchWithId: async function(id, token) {
            return await axios.get(URL+'news/'+id, {
                headers: {'authorization': token}
            })
        },

        search: async function(term, token) {
            return await axios.get(URL+'search/'+term, {
                headers: {'authorization': token}
            })
        }
}

export default FetchNews;