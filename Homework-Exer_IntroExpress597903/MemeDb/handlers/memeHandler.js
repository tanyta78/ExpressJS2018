const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

module.exports.addMemeGet = (req, res) => {
    addMeme(req, res)
}

module.exports.addMemePost = (req, res) => {
    addMemeProcess(req, res)
}

module.exports.viewAll = (req, res) => {
    viewAll(req, res)
}

module.exports.getDetails = (req, res) => {
    getDetails(req, res)
}

module.exports.deleteMeme = (req, res) => {
    deleteMeme(req, res)
}

function addMemeProcess(req, res) {
    let meme = req.body;

    let ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'))

    meme.path = '.' + req.file.destination.substr(req.file.destination.indexOf('/public'))
            .concat(req.file.filename)

    meme.status = req.body.status === 'on';

    Meme.create(meme).then((createdMeme) => {
        Genre.findOneAndUpdate(
            {"genreName": meme.genres},
            {"$push": {"memeList": createdMeme._id}},
            function (err, mango) {
                if (err) console.log(err);
            }
        );

        res.redirect('/')
    });
}

function addMeme(req, res) {
    Genre.find({}, (err, allGenres) => {
        res.render('addMeme', {genres: allGenres})
    })
}
function getDetails(req, res) {
    let queryId = req._parsedUrl['query'].substr(3)

    Meme.find({_id: queryId}, (err, foundMeme) => {
        res.render('details', {foundMeme: foundMeme})
    })
}

function viewAll(req, res) {
    Meme.find({}, (err, allMemes) => {
        res.render('viewAll', {memes: allMemes})
    })
}

function deleteMeme(req, res) {
    let memeId = req.body.id

    Meme.remove({_id: memeId}, function (err) {
        if (err) {
            console.log(err);
            res.json({'result': 'fail'});
        }

        res.json({'result': 'success'});
    })
}
