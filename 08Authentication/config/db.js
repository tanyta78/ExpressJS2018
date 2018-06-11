const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (settings)=>{
	mongoose.connect(
		settings.db,{ useMongoClient:true},err=>{
			if(err){
				console.log(err);
				return;
			}
			User.seedAdminUser().then(() => {
				console.log('MongoDb up and running ...');                
			}).catch((reason) => {
				console.log('Something went wrong');
				console.log(reason);
			});
			
		});
};