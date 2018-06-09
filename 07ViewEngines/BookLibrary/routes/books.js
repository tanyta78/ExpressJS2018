const express = require('express');
const router = express.Router();
const shortid = require('shortid');
//const path=require('path');

const Book = require('../models/Book');

let fieldChecker = obj => {
	for (let prop in obj) {
		if (obj[prop] === '') {
			return true;
		}
	}
};

/* GET viewAllBooks listing. */
router.get('/viewAllBooks', function (req, res, next) {
	Book.find({}).then(booksCollection => {
		booksCollection = booksCollection.sort((a,b)=>b.bookYear-a.bookYear);

		res.render('viewAll', { booksCollection });
	});
});

/*GET addBook */
router.get('/addBook', function (req, res, next) {
	res.render('addBook');
});

/*POST addBook */
router.post('/addBook', function (req, res, next) {
	
	
	let bookObj = req.body;
	/* for file upload if needed
	let fileName = shortid.generate();
	let filePath = `/images/${fileName}.jpg`;
	let bookPath = path.join(__dirname, `../public${filePath}`);
	let file = req.files.bookPoster;

	bookObj.bookPoster = filePath;

	file.mv(bookPath, (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
	*/
	if (fieldChecker(bookObj)) {
		res.render('addBook', { err:true });
	} else {
		Book.create(bookObj).then((newBook) => {
			res.render('addBook', { suc:true });		
		}).catch(()=>{
			res.render('addBook', { err:true });
		});
	}	
});

/* GET getDetails page. */
router.get('/getDetails/:id', (req, res, next) => {
	let targetId = req.params.id;

	Book.findById(targetId).then((foundedMeme) => {
		res.render('details', foundedMeme);
	});
});

module.exports = router;
