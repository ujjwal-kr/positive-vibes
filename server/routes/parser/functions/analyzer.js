const Sentiment = require('sentiment');

async function analyze(data, score) {
    const sentiment = new Sentiment();
    const final = [];
    console.log(score)
    await data.map(async item => {
        if (await sentiment.analyze(item.title._text).score > score) {
            final.push(item)
        }
    })
    return final
}

module.exports = analyze;