const SessionService = {
    setNews: (id, news) => {
        return window.sessionStorage.setItem(id, JSON.stringify(news))
    },

    getNews: (id) => {
        return JSON.parse(window.sessionStorage.getItem(id))
    }
}

export default SessionService;