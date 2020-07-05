const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/userModel');

router.post('/register', async(req, res, next) => {
    const data = req.body;
    const {email} = req.body;
    const user = User.findOne({email})
    if(user) return res.json({message: "User Exists"})
    await bcrypt.genSalt(10, async (err, salt) => {
        await bcrypt.hash(data.password, salt, async (err, hash) => {
            if (err) return next(err)
            data.password = hash;
            try{
                const user = await User.create(data);
                return res.json({user})
            } catch(e) {
                console.log(e)
            }
        })
    })
})

module.exports = router;