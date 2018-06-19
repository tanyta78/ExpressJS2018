const encryption = require('../utils/encrypting');
const User = require('mongoose').model('User');


module.exports = {
	registerGet: (req, res) => {
		res.render('user/register');
	},
	registerPost: (req, res) => {
		let reqUser = req.body;
		// Add validations!

		let salt = encryption.generateSalt();
		let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

		User.create({
			email: reqUser.email,
			salt: salt,
			hashedPass: hashedPassword
		}).then(user => {
			req.logIn(user, (err, user) => {
				if (err) {
					res.locals.globalError = err;
					res.render('user/register', user);
				}

				res.redirect('/');
			});
		});
	},
	loginGet: (req, res) => {
		res.render('user/login');
	},
	loginPost: (req, res) => {
		let reqUser = req.body;
		User
			.findOne({ email: reqUser.email }).then(user => {
				if (!user) {
					res.locals.globalError = 'Invalid user data';
					res.render('user/login');
					return;
				}

				if (!user.authenticate(reqUser.password)) {
					res.locals.globalError = 'Invalid user data';
					res.render('user/login');
					return;
				}

				req.logIn(user, (err, user) => {
					if (err) {
						res.locals.globalError = err;
						res.render('user/login');
					}

					res.redirect('/');
				});
			});
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
};