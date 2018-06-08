const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    url: {type: String},
    creationDate: {type:Date, default: Date.now},
    description: {type: String},
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
    
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image;