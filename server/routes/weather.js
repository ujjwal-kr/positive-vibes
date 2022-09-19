const express = require("express")
const router = express.Router();

const {
    default: Axios
} = require('axios')

router.get('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for']
    const agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';
    const url = "https://api.ip8.com/ip/lookup/" + ip;

    try {
        console.log(ip)
        let res = await Axios.get(url, {
            headers: { 'user-agent': agent }
        })
        const city = res.data.details.geoip[0].city.name
        try {
            let finalRes = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84f0c05e16abc57b03ca8fa00b59f78e&units=metric`)
            const temperature = finalRes.data.main.temp
            res.status(200).json({
                temperature
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router