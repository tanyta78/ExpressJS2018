const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
	bookTitle:{type:String, required:true},
	bookYear:{type: Number, min: -1000, max: 2100},
	bookPoster:{type:String, required:true},
	bookAuthor:{type:String}
});

mongoose.model('Book',bookSchema);

module.exports=mongoose.model('Book');