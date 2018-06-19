const env = process.env.NODE_ENV ||'development';

const express = require('express');
const settings = require('./config/config')[env];
const database = require('./config/database');
const server = require('./config/express');
const routes = require('./config/routes');
const passport = require('./config/passport');

database(settings);

const app = express();

server(app,settings);
routes(app);
passport();

const port = settings.port;

app.listen(port, () => console.log(`Server up and running on port ${port}...`));
