const homeController = require('../controllers/home-controller');
const booksController = require('../controllers/books-controller');


module.exports = (app) => {
	app.get('/', homeController.getIndex);
	app.get('/books/addBook',booksController.getAddBook);
	app.post('/books/addBook',booksController.postAddBook);
	app.get('/books/viewAllBooks',booksController.getAll);
	app.get('/books/getDetails/:id',booksController.getDetails);
};