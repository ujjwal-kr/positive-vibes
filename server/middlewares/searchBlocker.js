const jwt = require('jsonwebtoken');
const KEY = require('../settings/key');

const SearchBlocker = async (req, res, next) => {
    const token = await req.headers.authorization
    try {
       await jwt.verify(token, KEY)
       return next()
    } catch(e) {
        return res.json({message: "FLAG{YOU_EARNED_IT}"})
    }
}

module.exports = SearchBlocker