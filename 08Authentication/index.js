const env = 'development';

const express = require('express');
const settings = require('./config/settings')[env];
const database = require('./config/db');
const server = require('./config/express');
const routes = require('./config/routes');
const passport = require('./config/passport');

database(settings);

const app = express();

server(app);
routes(app);
passport();

const port = settings.port;

app.listen(port, () => console.log(`Server up and running on port ${port}...`));