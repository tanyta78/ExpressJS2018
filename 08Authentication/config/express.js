const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const fileUploader = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
	app.engine('hbs', handlebars({
		extname: '.hbs',
		layoutsDir: 'views/layouts',
		defaultLayout: 'main'
	}));

	app.set('view engine', 'hbs');
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(fileUploader());
	app.use(session({
		secret: '!@#$%^',
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		if (req.user) {
			res.locals.currentUser = req.user;
		}

		next();
	});

	app.use(express.static('./static'));
};