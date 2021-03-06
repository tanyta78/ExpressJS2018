const mongoose = require('mongoose');
const User = require('../data/User');
const Car = require('../data/Car');
const RentalInfo = require('../data/RentalInfo');

module.exports = (settings)=>{
	mongoose.connect(
		settings.db,err=>{
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