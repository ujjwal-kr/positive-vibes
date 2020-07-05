const jwt = require('jsonwebtoken');
const KEY = require('../settings/key');

const UserMiddleware = async function (req, res, next) {
    const token = await req.headers.authorization;
    try {
        const decoded = jwt.verify(token, KEY)
        const id = decoded.id;
        req.body.userId = id;
        return next()
    } catch(e) {
        return res.json({message: e})
    }
}

module.exports = UserMiddleware;