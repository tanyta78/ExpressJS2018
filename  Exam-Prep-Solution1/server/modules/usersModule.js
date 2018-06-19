const router = require('express').Router();
const passport = require('passport');

const encryption = require('../infrastructure/encryption')
const User = require('../models/User');

const getUserRegister =  (req, res) => {
    res.render('users/register')
};
const postUserRegister = (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
        username: reqUser.username,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        salt: salt,
        hashedPass: hashedPassword
    }).then(user => {
        req.logIn(user, (err, user) => {
            if (err) {
                res.locals.globalError = err
                res.render('users/register', user)
            }

            res.redirect('/')
        })
    })
};

const getUserLogin = (req, res) => {
    res.render('users/login')
};
const postUserLogin = (req, res) => {
    res.redirect('/');
};

const getUserLogout = (req, res) => {
    req.logout()
    res.redirect('/')
};


router
    .get('/login', getUserLogin)
    .post('/login', passport.authenticate('local'), postUserLogin)
    .get('/logout', getUserLogout)
    .get('/register', getUserRegister)
    .post('/register', postUserRegister);

module.exports = router;
