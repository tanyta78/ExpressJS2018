const mongoose = require('mongoose');

let schema = mongoose.Schema({
    memeTitle: {type: mongoose.Schema.Types.String, required: true},
    memeDescription: {type: mongoose.Schema.Types.String},
    path: {type: mongoose.Schema.Types.String, required: true},
    status: {type: mongoose.Schema.Types.Boolean, default: false},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    votes: {type: mongoose.Schema.Types.Number, default: 0}
});

let Meme = mongoose.model('meme', schema);

module.exports = Meme;