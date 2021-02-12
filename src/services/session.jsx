const SessionService = {
    getUser: function() {
        let user = window.sessionStorage.getItem("user")
        user = JSON.parse(user)
        return user
    },

    setUser: function(user) {
        window.sessionStorage.setItem("user", JSON.stringify(user))
        return
    },

    removeUser: function() {
        window.sessionStorage.removeItem("user")
    }
}

export default SessionService;