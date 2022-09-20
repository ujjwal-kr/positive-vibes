const SessionService = {
    setNews: (id, news) => {
        return window.sessionStorage.setItem(id, JSON.stringify(news))
    },

    getNews: (id) => {
        return JSON.parse(window.sessionStorage.getItem(id))
    },

    setTemperature: (temperature) => {
        return window.sessionStorage.setItem("temperature", temperature)
    },

    getTemperature: () => {
        return window.sessionStorage.getItem("temperature")
    }
}

export default SessionService;