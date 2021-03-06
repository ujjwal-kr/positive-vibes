const jwt = require('jsonwebtoken')
const KEY = require('../settings/key')
const User = require('../models/userModel')
const scoring = require('../routes/parser/functions/scoreLogic')

const UserMiddleware = async function (req, res, next) {
    const token = await req.headers.authorization
    try {
        const decoded = jwt.verify(token, KEY)
        const id = decoded.id
        await User.findById(id, (err, user) => {
            if (user == null) return res.status(404).json({ err: err })
            const score = scoring(user.setting)
            req.body.score = score
            req.body.user = user
        })
        return next()
    } catch(e) {
        req.body.score = 2
        req.body.user = null
        return next()
    }
}

module.exports = UserMiddleware