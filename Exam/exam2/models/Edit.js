const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const editSchema = new mongoose.Schema({
	dateOfCreation:{ type: Date , required:true, default:Date.now},
	content: { type: String, required: true },
	author:{type:String,required: true },
	article:{type:ObjectId,ref:'Article'},
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;