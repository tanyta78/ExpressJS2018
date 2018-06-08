var express = require('express');
var router = express.Router();

/* GET addMeme page. */
router.get('/addMeme', function(req, res, next) {
	res.render('addMeme');
});

/* GET viewAll page. */
router.get('/viewAllMemes', function(req, res, next) {
	res.render('viewAllMemes',{memesCollection:''});
});

module.exports = router;
