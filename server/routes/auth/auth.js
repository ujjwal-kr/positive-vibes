const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const KEY = require('../../settings/key')

const UserMiddleware = require('../../middlewares/userMiddleware')
const { ValidateLogin, ValidateRegister } = require('../../middlewares/auth-validator')

router.post('/register', ValidateRegister, async(req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const {email} = req.body
    const user = await User.findOne({email})
    if(user) return res.status(400).json({message: "User Exists"})
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
            if (err) return next(err)
            data.password = hash
            const user = await User.create(data).catch(e => {
                res.json({message: e})
            })
            return res.status(201).json({user})
        })
    })
})


router.post('/login', ValidateLogin, async(req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(!user) return res.status(404).json({message: "Didnt find any user"})
    bcrypt.compare(password, user.password, async (err, correct) => {
        if (err) return console.log(err)
        if (!correct) return res.status(404).json({message: "Wrong password"})

        const payload = { id: user.id }   
        jwt.sign(payload, KEY, {expiresIn: '30d'}, (err, token) => {
             if(err) return next(err)
             return res.json({ user, token })
        })
    })
})

router.patch('/user/:id', UserMiddleware, async (req, res) => {
    let user = req.body.user
    if (!user) return res.status(403).json({message: "UNAUTHORIZED"})
    if (req.params.id !== user.id) return res.status(403).json({message: "UNAUTHORIZED"})

    user.setting = req.body.setting
    user.save()
    res.json({message: "Changed settings to " + req.body.setting})
})

router.get('/check', UserMiddleware, async (req, res) => {
    if (req.body.user == null) return res.status(403).json({message: "UNAUTHORIZED"});
    return res.status(200).json({message: "Looks Alright"})
})

router.get('/setting/:id', UserMiddleware, async (req, res) => {
    let user = req.body.user
    if (!user) return res.status(403).json({message: "UNAUTHORIZED"})
    if (req.params.id !== user.id) return res.status(403).json({message: "UNAUTHORIZED"})

    return res.json({ setting: user.setting })
})

module.exports = router