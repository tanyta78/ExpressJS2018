const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let productSchema =new mongoose.Schema({
	name:{type:String, required:true},
	description:{type:String},
	price:{ type:Number, min:0, max:Number.MAX_VALUE, default:0},
	image:{type:String},
	category:{type:ObjectId, ref:'Category'},
	isBougth:{type:Boolean,default:false}
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;