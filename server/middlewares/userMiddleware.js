const UserMiddleware = function (req, res, next) {
    res.json({message: "Hey"})
}

module.exports = UserMiddleware;