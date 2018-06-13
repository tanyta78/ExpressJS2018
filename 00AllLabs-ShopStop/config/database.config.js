const mongoose = require('mongoose');

module.exports = (config)=>{
	mongoose.connect(config.connectionString);

	let database = mongoose.connection;

	database.once('open',(err)=>{
		if(err){
			console.log(err);
			return;
		}

		console.log('Connected to database');
	});

	database.on('error',(err)=>{
		console.log(err);
		return;
	});

	require('../models/Product');
	require('../models/Category');
};