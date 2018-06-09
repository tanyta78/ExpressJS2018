const express = require('express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid');

const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET addMeme page. */
router.get('/addMeme', function (req, res, next) {
	Genre.find({}).then(allGenres => {
		let tags = [];

		for (const genre of allGenres) {
			tags.push(genre);
		}

		res.render('addMeme', { tags });
	}).catch(err => console.log(err));

});

/* POST addMeme page. */
router.post('/addMeme', (req, res, next) => {
	let fileName = shortid.generate();
	let memeObj = req.body;
	let filePath = `/images/${fileName}.jpg`;
	let memePath = path.join(__dirname, `../public${filePath}`);
	let file = req.files.memePoster;

	memeObj.memePath = filePath;

	file.mv(memePath, (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});

	Meme.create(memeObj).then((newMeme) => {
		let targetGenre = memeObj.genreSelect;

		Genre.findOne({ genreName: targetGenre }).then((foundGenre) => {
			foundGenre.memeList.push(newMeme._id);
			foundGenre.save().then(() => {
				res.render('addMeme', { status: true });
			});
		});
	});

});

/* GET viewAll page. */
router.get('/viewAllMemes', function (req, res, next) {
	Meme.find({}).then(memesCollection => {
		console.log(memesCollection);

		res.render('viewAllMemes', { memesCollection });
	});

});

/* GET addGenre page. */
router.get('/addGenre', function (req, res, next) {
	res.render('addGenre');
});

/* POST addGenre page. */
router.post('/addGenre', function (req, res, next) {
	let params = req.body;

	Genre.create(params).then(obj => {
		console.log(obj);

		res.render('addGenre', { status: true });
	});
});

/* GET getDetails page. */
router.get('/getDetails/:id', (req, res, next) => {
	let targetId = req.params.id;
	console.log(targetId);

	Meme.findById(targetId).then((foundedMeme) => {

		console.log(foundedMeme);
		let fileName = foundedMeme.memePath.split('/').pop();
		foundedMeme.memeFileName = fileName;

		res.render('viewDetails', foundedMeme);
	});
});

/* GET search page. */
router.get('/searchMeme', function (req, res, next) {
	Genre.find({}).then(allGenres => {
		let tags = [];

		for (const genre of allGenres) {
			tags.push(genre);
		}
		Meme.find({}).then(memesCollection => {
			console.log(memesCollection);

			res.render('searchMeme', { tags, resultMemes: memesCollection });
			
		});

	}).catch(err => console.log(err));

});

/* POST search page results. */
router.post('/searchMeme', function (req, res, next) {
	let searchObj = req.body;
	console.log(searchObj);

	let title = searchObj.memeTitle;
	let selectedGenre = searchObj.genreSelect;

	let resultMemes = [];

	Genre.find({}).then((tags) => {
		Meme.find({})
			.then((memes) => {
				if (selectedGenre !== 'all') {
					let demo = tags.find(x => {
						return x.genreName == selectedGenre;
					});
					let arrSelection = demo.memeList;

					for (let meme of memes) {
						if (arrSelection.indexOf(meme.id) !== -1) {
							resultMemes.push(meme);
						}
					}
				} else {
					resultMemes = memes;
				}

				if (title !== '') {
					resultMemes = resultMemes.filter(elem => {
						if (elem.memeTitle.indexOf(title) !== -1) {
							return elem;
						}
					});
				}
				resultMemes = resultMemes
					.sort((a, b) => {
						return b.dateOfCreation - a.dateOfCreation;
					})
					.filter(meme => {
						return meme.status === 'on';
					});

				console.log(resultMemes);

				res.render('searchMeme', { tags, resultMemes});


			}).catch(err => console.log(err));

	});
});

module.exports = router;
