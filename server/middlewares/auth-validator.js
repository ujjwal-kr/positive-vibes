const Validator = require('../Validator/validator')

const ValidateLogin = (req, res, next) => {
    const validationRule = {
        "email": "required",
        "password": "required|string"
    }

    Validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).json({ err: err })
        } else {
            next()
        }
    })
}

const ValidateRegister = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:2",
        "name": "required|string|min:1"
    }

    Validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).json({ err: err })
        } else {
            next()
        }
    })
}

module.exports = { ValidateLogin, ValidateRegister }