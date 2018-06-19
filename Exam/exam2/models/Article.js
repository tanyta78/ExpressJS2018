const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new mongoose.Schema({
	isLocked:{type:Boolean,required:true,default:false},
	title: { type: String, required: true },
	creationDate:{ type: Date , required:true, default:Date.now},
	edits:[{type:ObjectId,ref:'Edit'}]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;