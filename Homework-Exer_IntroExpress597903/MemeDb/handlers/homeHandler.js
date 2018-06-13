module.exports.index = (req, res) => {
    if (req.originalUrl === '/' && req.method === 'GET') {
        res.render('home')
    } else {
        return true
    }
}
