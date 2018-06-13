const mongoose = require('mongoose');

let schema = mongoose.Schema({
    genreName: {type: mongoose.Schema.Types.String, required: true, unique: true},
    memeList: [
        {type: mongoose.Schema.ObjectId, ref: 'meme'}
    ]
});

let Genre = mongoose.model('genre', schema);

module.exports = Genre;