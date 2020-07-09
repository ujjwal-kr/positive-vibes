const express = require('express');
const router = express.Router();
const Analyzer = require('./functions/analyzer');
const {
    default: Axios
} = require('axios');
var convert = require('xml-js');

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36";

router.get('/', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss?topstories?hl=en-IN&gl=IN&ceid=IN:en&hl=en-IN', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {
                compact: true
            });
            const parsed = JSON.parse(result);
            parsed.rss.channel.item.map(it => {
                it.description = null;
                it.guid = null;
                it.source._attributes = null;
            })
            const final = parsed.rss.channel.item;
            const resl = await Analyzer(final, req.body.score);
            res.json({resl})
        }).catch(e => {
            return e
        })
});

router.get('/technology', async (req, res, next) => {
    await Axios.get('https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pKVGlnQVAB?hl=en-IN&gl=IN&ceid=IN%3Aen', {
            headers: {"User-agent": UA}
        }).then(async data => {
            const result = await convert.xml2json(data.data, {
                compact: true
            });
            const parsed = JSON.parse(result);
            parsed.rss.channel.item.map(it => {
                it.description = null;
                it.guid = null;
                it.source._attributes = null;
            })
            const final = parsed.rss.channel.item;
            const resl = await Analyzer(final, req.body.score);
            res.json({resl})
        }).catch(e => {
            return e
        })
});

module.exports = router;