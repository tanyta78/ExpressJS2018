const Book = require('../data/Book');

module.exports = {
	getAddBook: (req, res) => {
		res.render('books/addBook');
	},
	postAddBook: (req, res) => {
		let book = req.body;

		if (!book.bookTitle || !book.bookPoster) {
			book.err = true;
			res.render('books/addBook', book);
		}

		Book.create(book).then(() => {
			res.redirect('viewAllBooks');
		});

	},
	getAll: (req, res) => {
		Book.find({}).sort('bookYear').then(booksCollection => {
			res.render('books/viewAll', { booksCollection });
		});
	},
	getDetails: (req, res) => {
		const id = req.params.id;
		Book.findById(id).then(book => {
			console.log(book);
			
			res.render('books/details', book);
		});
	}
};