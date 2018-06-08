const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;

    database.on('error', (err)=>{
        console.log(err);
    });
    database.once('open', () =>{
        console.log('Connected!');
    });

    require('../models/Image');
    require('../models/Tag');

}