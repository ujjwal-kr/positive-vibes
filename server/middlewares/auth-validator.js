const Validator = require('../Validator/validator')

const ValidateLogin = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string"
    }

    Validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).json({ err: "Check the fields properly" })
        } else {
            next()
        }
    })
}

const ValidateRegister = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:1",
        "name": "required|string|min:1"
    }

    Validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).json({ err: "Check the fields properly" })
        } else {
            next()
        }
    })
}

module.exports = { ValidateLogin, ValidateRegister }