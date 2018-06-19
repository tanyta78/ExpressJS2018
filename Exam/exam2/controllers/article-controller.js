const Article = require('mongoose').model('Article');
const Edit = require('mongoose').model('Edit');

module.exports = {
	createGet: (req, res) => {
		res.render('article/create');
	},
	createPost: (req, res) => {
		let inputData = req.body;
		//console.log(inputData);
		if (!inputData.title || !inputData.content) {
			res.locals.globalError = 'Invalid article data. Please fill all fields.';
			res.render('article/create', inputData);
		}

		const articleData = {
			isLocked: false,
			title: inputData.title,
			edits: []
		};

		const editData = {
			author: req.user.email,
			dateOfCreation: Date.now(),
			content: inputData.content
		};

		Article.create(articleData).then((article) => {

			editData.article = article;
			Edit.create(editData).then((edit) => {
				article.edits.push(edit);
				article.save().then((editedArticle) => {
					res.render('article/details', editedArticle);
				});

			});

		});

	},
	allGet: (req, res) => {
		Article.find().then((articles) => {
			articles.sort(function (a, b) {
				return a.title > b.title;
			});

			return res.render('article/all', { articles });
		});

	},
	detailsGet: (req, res) => {
		const id = req.params.id;
		Article.findById(id).populate('edits').then((article) => {

			article.recentEdit = article.edits.sort(function (a, b) {
				return a.dateOfCreation < b.dateOfCreation;
			})[0];
			return res.render('article/details', article);
		});


	},
	editGet: (req, res) => {
		const id = req.params.id;
		Article.findById(id).then((article) => {

			return res.render('article/edit', article);
		});
	},
	editPost: (req, res) => {
		let content = req.body.content;

		const articleId = req.params.id;
		const author = req.user.email;

		Article.findById(articleId).then((article) => {
			if (article.isLocked && !req.user.isAdmin) {
				res.locals.globalError = 'You do not have rights to edit this article. Article is locked for edititng';
				res.redirect('/');
				return;
			}
			let editData = {
				content,
				author,
				dateOfCreation: Date.now(),
				article
			};

			Edit.create(editData).then((edit) => {
				article.edits.push(edit);
				article.save().then((editted) => {
					res.render('article/details', editted);

				});
			});
		});


	},
	lockGet: (req, res) => {
		const id = req.params.id;
		Article.findById(id).then((article) => {
			article.isLocked = true;
			article.save().then(() => {
				res.redirect('/');
			});
		});
	},
	unlockGet: (req, res) => {
		const id = req.params.id;
		Article.findById(id).then((article) => {
			article.isLocked = false;
			article.save().then(() => {
				res.redirect('/');
			});
		});
	},
	historyGet: (req, res) => {
		const id = req.params.id;
		Article.findById(id).populate('edits').then((article) => {
			return res.render('article/history', article);
		});
	},
	lastGet: (req, res) => {
		Article.find().populate('edits').then((articles) => {
			let last = articles.sort(function (a, b) {
				return a.creationDate < b.creationDate;
			})[0];
			if (!last) {
				res.globalError='Article not found!';
				res.redirect('/');
				return;
			}
			
			res.render('article/details',last);

		});
	},
	search: (req, res) => {

		let filters = req.body.filters;

		console.log(filters);
		// Article.find({ 'title': { $regex: `.*${filters}.*/i` } }).then((result) => {
		// 	console.log(result);

		// 	res.render('article/searchResult', { result });
		// });
		Article.find({ 'title': { '$regex': `${filters}`, '$options': 'i' } }).then((articles) => {
			console.log(articles);
			res.render('article/searchResult', { filters, articles });
		});

	}
};