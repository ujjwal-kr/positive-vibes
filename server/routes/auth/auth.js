const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const KEY = require('../../settings/key');

const UserMiddleware = require('../../middlewares/userMiddleware');

router.post('/register', async(req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user) return res.json({message: "User Exists"});
    await bcrypt.genSalt(10, async (err, salt) => {
        await bcrypt.hash(data.password, salt, async (err, hash) => {
            if (err) return next(err)
            data.password = hash;
            const user = await User.create(data).catch(e => {
                res.json({message: e})
            })
            return res.json({user})
        })
    })
})


router.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message: "Didnt find any user"});
    await bcrypt.compare(password, user.password, async (err, correct) => {
        if (err) return console.log(err);
        if (!correct) return res.status(404).json({message: "Didnt find any user"});
        const payload = {
            id: user.id
        }   
        await jwt.sign(payload, KEY, {expiresIn: '7d'}, (err, token) => {
             if(err) return next(err);
             return res.json({ user, token })
        })
    })
})

router.patch('/user/:id', UserMiddleware, async(req, res) => {
    let user = req.body.user;
    if (req.params.id !== user.id) return res.status(403).json({message: "UNAUTHORIZED"});
    user.setting = req.body.setting;
    user.save();
    res.json({message: "Canged settings to" + req.body.setting})
})

module.exports = router;