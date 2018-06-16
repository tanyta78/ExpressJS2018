const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	category: { type: String,enum:['chicken','beef','lamb'], required: [true,'Category is required!'] },
	size:{ type: Number,min:17, max:24, required: true },
	imageUrl:{ type: String, required: true },
	toppings:{ type: [String], default:[] }
});

module.exports = mongoose.model('Product', productSchema);