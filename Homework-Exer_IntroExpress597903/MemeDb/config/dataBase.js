const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(process.env.MONGOLAB_URI || config.connectionString);

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Connected to db');
    });

    db.on('error', (err) => {
        console.log(err);
    });

};