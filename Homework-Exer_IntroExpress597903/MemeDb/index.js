const HTTP = require('http')
const URL = require('url')
const HANDLERS = require('./handlers/handlerBlender')

const EXPRESS = require('express');

const DB = require('./config/dataBase')
const CONFIG = require('./config/dbConfig')
const ENV = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 2323

let app = EXPRESS();

DB(CONFIG[ENV])

require('./config/express')(app, CONFIG[ENV]);
require('./config/routes')(app);

app.listen(PORT, () => {
    console.log(`listen on port ${2323}`)
});