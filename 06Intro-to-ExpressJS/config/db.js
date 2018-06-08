const mongoose = require('mongoose');
const path='mongodb://localhost:27017/memesDb2017';

mongoose.Promise=Promise;

module.exports = (()=>{
	mongoose.createConnection(path);

	console.log('Connection to db is successful!');
	
})();

