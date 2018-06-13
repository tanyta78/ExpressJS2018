const port = 3000;
const config = require('./config/config');
const database = require('./config/database.config');
const express= require('express');

let app=express();
let env = process.env.NODE_ENV || 'development';

database(config[env]);
require('./config/express')(app,config[env]);
require('./config/routes')(app);

app.listen(port);