const Article = require('mongoose').model('Article');
const Edit = require('mongoose').model('Edit');

module.exports = {
	index: (req, res) => {
		Article.find({})
			.sort({ creationDate: -1 })
			.limit(4)
			.populate('edits')
			.then((articles) => {
				if (articles.length >= 1) {
					let featured = articles.shift();
					let words = featured.edits[0].content
						.split(/(\w+)/g)
						.filter(e => e !== ' ')
						.slice(0, 50)
						.join(' ');

					featured.edits[0].content = words;

					let dataObj = {
						featured,
						recent: articles
					};

					console.log(dataObj);
					
					res.render('home/index', dataObj);
				}
			});


	}
};