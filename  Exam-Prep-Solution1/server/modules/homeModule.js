const router = require('express').Router();

const getHome = (req, res) => {
    res.render('home/index', { message });
};

router
    .get('/', getHome) 

module.exports = router;