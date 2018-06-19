const usersModule = require('../modules/usersModule');
const homeModule = require('../modules/homeModule');

const auth = require('../infrastructure/auth');

module.exports = (app) => {
    app.use('/', homeModule);

    app.use('/users', usersModule);

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found!')
        res.end()
    })
}
