const express = require('express');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

const homeModule = require('./modules/homeModule');
const memeModule = require('./modules/memeModule');

const port = 2323;

const app = express();

app.use('/public', express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUploader());

app.use('/', homeModule);
app.use('/memes', memeModule);

require('./config/mongoConfig')
  .then(() => {
    app.listen(port, () => console.log('Express listening on ' + port));
  })
  .catch(() => {
    console.log('Failed to load DB');
  });