const express = require("express");
const router = express.Router();

router.get('/register', async(req, res) => {
    res.json("HEY")
})

module.exports = router;