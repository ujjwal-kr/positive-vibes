const SessionService = {
    getUser: () => {
        let user = window.sessionStorage.getItem("user")
        user = JSON.parse(user)
        return user
    },

    setUser: (user) => {
        window.sessionStorage.setItem("user", JSON.stringify(user))
        return
    },

    removeUser: () => {
        window.sessionStorage.removeItem("user")
    }
}

export default SessionService;