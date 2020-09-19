const Sentiment = require('sentiment');
const WORDS = require('./words');

async function analyze(data, score) {
    const sentiment = new Sentiment();
    const final = [];
    const options = {
        extras: WORDS
    }
    await data.map(async item => {
        if (await sentiment.analyze(item.title._text, options).score >= score) {
            final.push(item)
        }
    })
    return final
}

module.exports = analyze;