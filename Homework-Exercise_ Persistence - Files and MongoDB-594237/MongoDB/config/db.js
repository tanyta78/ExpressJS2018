const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectionString = 'mongodb://admin:admin@ds227939.mlab.com:27939/imagesdb';

module.exports = () => {
    mongoose.connect(connectionString);
    let connection = mongoose.connection;

    connection.once('open', (err) => {
        if(err){
            console.log(err);
            return;
        }

        console.log('Connected !');
    });

    connection.on('error', (err) => {
        console.log(err);
    });

    require('../models/ImageSchema.js');
    require('../models/TagSchema.js');
};