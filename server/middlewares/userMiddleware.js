const jwt = require('jsonwebtoken')
const KEY = require('../settings/key')
const User = require('../models/userModel')
const scoring = require('../routes/parser/functions/scoreLogic')

const UserMiddleware = async function (req, res, next) {
    const token = await req.headers.authorization
    try {
        const decoded = jwt.verify(token, KEY)
        const id = decoded.id
        let user = await User.findById(id);
        if (user == null) return res.status(404).json({
            message: "User not found"
         })
         const score  = scoring(user.setting)
         req.body.score = score
         req.body.user = user
        return next()
    } catch(e) {
        req.body.score = 3
        req.body.user = null
        return next()
    }
}

module.exports = UserMiddleware