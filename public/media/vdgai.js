exports.name = '/api/media/vdgai';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/gai.json');
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