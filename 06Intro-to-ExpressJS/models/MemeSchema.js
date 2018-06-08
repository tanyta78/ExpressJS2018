const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
	memeName:{type:String, required:true},
	title:{type:String, required:true},
	dateOfCreation:{type:Date, default:Date.now()},
	description:{type:String},

});

module.exports=mongoose.model('Meme',memeSchema);