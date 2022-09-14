const StorageService = {
    getUser: function() {
        let user = window.localStorage.getItem("user")
        user = JSON.parse(user)
        return user
    },

    setUser: function(user) {
        return window.localStorage.setItem("user", JSON.stringify(user))
    },

    setToken: (token) => {
        return window.localStorage.setItem("token", token)
    },

    getToken: () => {
        return window.localStorage.getItem("token")
    },

    removeToken: () => {
        return window.localStorage.removeItem("token")
    },

    removeUser: function() {
        return window.localStorage.removeItem("user")
    }
}

export default StorageService;