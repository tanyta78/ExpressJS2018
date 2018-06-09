const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = (settings) => {
	mongoose.connect(
		settings.db, err => {
			if (err) {
				console.log(err);
				return;
			}
			console.log('Connection to db is successful!');
		});
};