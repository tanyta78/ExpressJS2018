const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let rentalSchema = new mongoose.Schema({
	car:{type:ObjectId,ref:'Car'},
	renter:{type:ObjectId,ref:'User'},
	rentalDate:{type:Date,required:true},
	days:{type:Number,required:true,min:1}
});

module.exports= mongoose.model('RentalInfo',rentalSchema);