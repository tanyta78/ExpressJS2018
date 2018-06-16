const encryption = require('../utils/encrypting');
const User = require('mongoose').model('User');
// const Car = require('mongoose').model('Car');
// const RentalInfo = require('mongoose').model('RentalInfo');


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
			username: reqUser.username,
			firstName: reqUser.firstName,
			lastName: reqUser.lastName,
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
			.findOne({ username: reqUser.username }).then(user => {
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
	},
	// getRentalHistory: (req, res) => {
	// 	let userId = req.params.id;
	// 	console.log(userId);
		
	// 	RentalInfo.find({}).where('renter').equals(userId).populate('car').then((rentalInfos) => {
	// 		let rentals = [];
	// 		for (const rental of rentalInfos) {
	// 			rental.moneyPaid = Number(rental.days) * Number(rental.car.price) ;
	// 			console.log(rental.moneyPaid);
				
	// 			rentals.push(rental);
	// 		}
	// 		res.render('user/profile',{rentals});
	// 	});
		
	//}
};