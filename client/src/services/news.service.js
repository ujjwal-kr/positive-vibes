import axios from "axios"
import URL from "../url"

const NewsService = {
    topStories: async (token) => {
         return await axios.get(URL+'news', {
            headers: {'authorization': token}
        })
    },


    fetchWithId: async (id, token) => {
        return await axios.get(URL+'news/'+id, {
            headers: {'authorization': token}
        })
    },

    search: async (term, token) => {
        return await axios.get(URL+'news/search/'+term, {
            headers: {'authorization': token}
        })
    }
}

export default NewsService