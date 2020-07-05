const jwt = require('jsonwebtoken');
const KEY = require('../settings/key');
const User = require('../models/userModel');
const scoring = require('../routes/parser/functions/scoreLogic');

const UserMiddleware = async function (req, res, next) {
    const token = await req.headers.authorization;
    try {
        const decoded = jwt.verify(token, KEY)
        const id = decoded.id;
        await User.findById(id, (err, user) => {
            if (err) return res.json({err});
            const score = scoring(user.setting)
            req.body.score = score;
        })
        return next()
    } catch(e) {
        return res.json({message: e})
    }
}

module.exports = UserMiddleware;