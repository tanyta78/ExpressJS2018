const MONGOOSE = require('mongoose');
MONGOOSE.Promise = global.Promise;

module.exports = (config) => {
	MONGOOSE.connect(config.connectionString);

	let db = MONGOOSE.connection;

	db.once('open', (err) => {
		if (err) {
			console.log(err);
			throw err;
		}

		console.log('MongoDB is ready!');
	});

	require('../models/Role').init();
	require('../models/User').init();

	require('../models/Flight').init();
	require('../models/Seat');
	require('../models/Ticket');
};