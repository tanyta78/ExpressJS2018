const handlers = require('../handlers/handlerBlender');
const multer = require('multer');

let upload = multer({dest: __dirname + '/../public/memeStorage/3/'});

module.exports = (app) => {
    app.get('/', handlers.home.index);

    app.get('/addMeme', handlers.meme.addMemeGet);
    app.post('/addMeme', upload.single('image'), handlers.meme.addMemePost);

    app.get('/viewAllMemes', handlers.meme.viewAll);

    app.get('/getDetails', handlers.meme.getDetails);

    app.get('/addGenre', handlers.genre.addGenreGet);
    app.post('/addGenre', handlers.genre.addGenrePost);

    app.get('/getDetails', handlers.meme.getDetails);

    app.delete('/api/delete', handlers.meme.deleteMeme)
};