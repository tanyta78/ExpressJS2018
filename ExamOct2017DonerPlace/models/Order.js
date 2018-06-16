const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
	creator: { type: ObjectId, required: true, ref: 'User' },
	product: { type: ObjectId, required: true, ref: 'Product' },
	dateCreated: { type: Date, default: Date.now },
	toppings: { type: [String], default: [] },
	status:{type:String, enum:['Pending','In Progress','In tranzit','Delivered'],default:'Pending'}
});

module.exports = mongoose.model('Order', orderSchema);