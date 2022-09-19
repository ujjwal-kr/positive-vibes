const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require("dotenv")

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors());
dotenv.config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to the mongoDB !!!')
}).catch((e) => {
    console.log('Error connecting to mongoDB !!!', e)
})

const Auth = require('./routes/auth/auth')
const News = require('./routes/parser/news')
const Xenon = require('./routes/xenon/xenon')
const Weather = require('./routes/weather')
const UserMiddleware = require('./middlewares/userMiddleware')

app.use('/news', UserMiddleware, News)
app.use('/auth', Auth)
app.use('/xenon', Xenon)
app.use('/weather', Weather)
app.get('/', (req, res) => {
    res.send("WELCOME TO THE POSITIVE VIBES API\n")
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that out!")
})

app.listen(process.env.PORT || 4000, (req, res) => {
    console.log('app listening on port 4000!')
})