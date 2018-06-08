const mongoose = require('mongoose');

let memeSchema = new mongoose.Schema({
	memeTitle:{type:String, required:true},
	genreSelect:{type:String, required:true},
	dateOfCreation:{type:Date, default:Date.now()},
	status:{type:String},
	memeDescription:{type:String},
	memePath:{type:String, required:true}
});

module.exports=mongoose.model('Meme',memeSchema);