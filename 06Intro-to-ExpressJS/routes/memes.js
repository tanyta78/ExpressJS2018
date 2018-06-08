const express = require('express');
const router = express.Router();
const path = require('path');

const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET addMeme page. */
router
	.get('/addMeme', function (req, res, next) {
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
	let file = req.files.memePoster;
	
	let memeObj = req.body;
	let memePath = path.join(__dirname,`../public/images/${file.name}`);
	
	memeObj.memePath = memePath;

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
	}
	);

});

/* GET viewAll page. */
router.get('/viewAllMemes', function (req, res, next) {
	Meme.find({}).then(memesCollection=>{
		console.log(memesCollection);
		
		res.render('viewAllMemes', { memesCollection});
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

module.exports = router;
