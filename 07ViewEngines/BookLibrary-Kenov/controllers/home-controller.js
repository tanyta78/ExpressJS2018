const Book = require('../data/Book');

module.exports={
	getIndex:(req,res)=>{
		Book
			.count()
			.then(booksCount=>{
				res.render('index',{booksCount,title:'AwesomeLibrary'});
			});
	}
};