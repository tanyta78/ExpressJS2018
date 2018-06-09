const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

/* GET home page. */
router.get('/', function (req, res, next) {
	// to do get books number create models and schemas

	let booksCount = 0;

	Book.find({}).then(books=>{
		console.log(books);
		
		booksCount=books.length;
		res.render('index', { title: 'Book Library', booksCount });
	});
});

module.exports = router;
