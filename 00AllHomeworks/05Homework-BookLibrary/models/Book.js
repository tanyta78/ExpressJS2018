const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
	bookTitle:{type:String, required:true},
	bookYear:{type:String},
	bookPoster:{type:String, required:true},
	bookAuthor:{type:String}
});

module.exports=mongoose.model('Book',bookSchema);