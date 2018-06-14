const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let productSchema =new mongoose.Schema({
	name:{type:String, required:true},
	description:{type:String,required:true},
	price:{ type:Number, min:0, max:Number.MAX_VALUE, default:0},
	image:{type:String},
	category:{type:ObjectId, ref:'Category',required:true},
	creator:{type:ObjectId, ref:'User',required:true},
	buyer:{type:ObjectId, ref:'User'},
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;