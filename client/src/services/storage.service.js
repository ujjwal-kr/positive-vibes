const StoreUserService = {
    getUser: () => {
        let user = window.localStorage.getItem("user")
        user = JSON.parse(user)
        return user
    },

    setUser: (user) => {
        window.localStorage.setItem("user", JSON.stringify(user))
        return
    },

    setToken: (token) => {
        window.localStorage.setItem("token", token)
    },

    removeUser: () => {
        window.localStorage.removeItem("user")
    }
}

export default StoreUserService;