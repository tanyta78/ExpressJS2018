const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUploader = require('express-fileupload');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const indexRouter = require('../routes/index');
const booksRouter = require('../routes/books');


module.exports = (app) => {
	app.engine('hbs', handlebars({
		extname: '.hbs',
		layoutsDir:'views',
		defaultLayout:'layout'
	}));

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hbs');

	app.use(express.json());
	app.use(express.static(path.join(__dirname, '../public')));
	app.use(logger('dev'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(fileUploader());

	app.use('/', indexRouter);
	app.use('/books', booksRouter);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		next(createError(404));
	});

	// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});
};
