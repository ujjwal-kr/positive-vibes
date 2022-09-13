const StorageService = {
    getUser: function() {
        let user = window.localStorage.getItem("user")
        user = JSON.parse(user)
        return user
    },

    setUser: function(user) {
        window.localStorage.setItem("user", JSON.stringify(user))
    },

    setToken: (token) => {
        window.localStorage.setItem("token", token)
    },

    getToken: () => {
        return window.localStorage.getItem("token")
    },

    removeToken: () => {
        return window.localStorage.removeItem("token")
    },

    removeUser: function() {
        window.localStorage.removeItem("user")
    }
}

export default StorageService;