const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: {type: String},
    creationDate: {type:Date, default: Date.now},
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]

})

tagSchema.methods.tagName = function() {
    return this.name.toLowerCase();
}

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;