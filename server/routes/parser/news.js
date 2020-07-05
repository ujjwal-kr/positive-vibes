const express = require('express');
const router = express.Router();

router.get('/technology', async(req, res, next) => {
    res.send('tech')
})

module.exports = router;