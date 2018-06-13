const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')

module.exports = (app, config) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }))

    app.set('view engine', '.hbs');

    app.use(bodyParser.urlencoded({extended: true}));

    app.use((req, res, next) => {
        if (req.url.startsWith('/public')) {
            req.url = req.url.replace('/public', '');
        }

        next();
    }, express.static(
        path.normalize(
            path.join(__dirname, '/../public')
        )
    ));
};