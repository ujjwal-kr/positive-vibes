const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const KEY = require('../../settings/key');

const UserMiddleware = require('../../middlewares/userMiddleware');
const {
  ValidateLogin,
  ValidateRegister,
} = require('../../middlewares/auth-validator');

router.post('/register', ValidateRegister, async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    if (await User.findOne({ email: data.email }))
      return res.status(400).json({ message: 'User Exists' });
    const SALT = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, SALT);
    const user = await User.create(data);
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', ValidateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: 'Incorrect credentials' });
    const validate = bcrypt.compareSync(password, user.password);
    if (!validate)
      return res.status(401).json({ message: 'Incorrect credentials' });
    const payload = { id: user.id };
    const token = await jwt.sign(payload, KEY, { expiresIn: '30d' });
    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
});

router.patch('/user/:id', UserMiddleware, async (req, res) => {
  let user = req.body.user;
  if (!user) return res.status(403).json({ message: 'UNAUTHORIZED' });
  if (req.params.id !== user.id)
    return res.status(403).json({ message: 'UNAUTHORIZED' });

  user.setting = req.body.setting;
  user.save();
  res.json({ message: 'Changed settings to ' + req.body.setting });
});

router.get('/check', UserMiddleware, async (req, res) => {
  if (req.body.user == null)
    return res.status(403).json({ message: 'UNAUTHORIZED' });
  return res.status(200).json({ message: 'Looks Alright' });
});

router.get('/setting/:id', UserMiddleware, async (req, res) => {
  let user = req.body.user;
  if (!user) return res.status(403).json({ message: 'UNAUTHORIZED' });
  if (req.params.id !== user.id)
    return res.status(403).json({ message: 'UNAUTHORIZED' });

  return res.json({ setting: user.setting });
});

module.exports = router;
