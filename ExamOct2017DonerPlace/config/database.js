const mongoose = require('mongoose');
//to import different models!!!
const User = require('../models/User');
require('../models/Product');
require('../models/Order');
mongoose.Promise=global.Promise;

module.exports = (config)=>{
	mongoose.connect(
		config.connectionString,err=>{
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