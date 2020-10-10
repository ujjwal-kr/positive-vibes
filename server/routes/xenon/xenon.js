const express = require('express');
const router = express.Router();

const {
    default: Axios
} = require('axios')
var convert = require('xml-js');

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"

router.get('/', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss?topstories?hl=en-IN&gl=IN&ceid=IN:en&hl=en-IN', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {
                compact: true
            })
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
})

router.get('/search/:id', async (req, res) => {
    await Axios.get("https://news.google.com/rss/search?q="+ req.params.id, {
        headers: {"User-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"}
    })
    .then(async data => {
        const result = await convert.xml2json(data.data, {compact: true});
        const parsed = JSON.parse(result);
        parsed.rss.channel.item.map(it => {
            it.description = null;
            it.guid = null;
            it.source._attributes = null;
        })
        const final = parsed.rss.channel.item;
        res.json({ final })
    }).catch(e => {
        res.send(e)
    })
});

router.get('/tech', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pKVGlnQVAB?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {
                compact: true
            })
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
});

router.get('/sports', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pKVGlnQVAB?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {compact: true})
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
})

router.get('/health', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {compact: true})
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
});

router.get('/science', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pKVGlnQVAB?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {compact: true})
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
});

router.get('/entertainment', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pKVGlnQVAB?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {compact: true})
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
})

router.get('/india', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRE55YXpBU0FtVnVLQUFQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {compact: true})
            const parsed = JSON.parse(result)
            parsed.rss.channel.item.map(it => {
                it.description = null
                it.guid = null
                it.source._attributes = null
            })
            const final = parsed.rss.channel.item
            res.json({final})
        }).catch(e => {
            return e
        })
})

module.exports = router;
