const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const logger = require('morgan');

const indexRouter = require('./routes/index');
const memesRouter = require('./routes/memes');
const fileUploader = require('express-fileupload');

const app = express();

require('./config/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUploader());

app.use('/', indexRouter);
app.use('/memes', memesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
