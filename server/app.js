const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/positive-vibes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Auth = require('./routes/auth/auth')
const News = require('./routes/parser/news')
const UserMiddleware = require ('./middlewares/userMiddleware')

app.use('/news', UserMiddleware, News)
app.use('/auth', Auth)
app.get('/', (req, res) => {
    res.send("WELCOME TO THE POSITIVE VIBES API")
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


app.listen(4000, (req, res) => {
    console.log('app listening on port 4000!')
})
