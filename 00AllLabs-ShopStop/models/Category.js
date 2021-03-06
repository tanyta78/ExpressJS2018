const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let categorySchema = new mongoose.Schema({
	name:{type:String,required:true,unique:true},
	creator:{type:ObjectId, ref:'User',required:true},
	products:[{type:ObjectId, ref:'Product'}]
});

let Category = mongoose.model('Category',categorySchema);

module.exports = Category;