exports.name = '/api/media/cosplay';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/cosplay.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length,
            author: 'Wioriz'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}