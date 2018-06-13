const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
	carBrand: { type: String, required: true },
	carModel: { type: String, required: true },
	carYear: { type: Number ,required:true,max:2018,min:2000},
	carPoster: { type:String, required: true },
	description: { type: String },
	rented:{type:Boolean,required:true,default:false},
	dateOfCreation:{ type: Date , required:true},
	price: { type: Number }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;