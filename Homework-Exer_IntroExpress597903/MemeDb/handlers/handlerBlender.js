const homeHandler = require('./homeHandler')
const memeHandler = require('./memeHandler')
const genreHandler = require('./genreHandler')


module.exports = {
    home: homeHandler,
    meme: memeHandler,
    genre: genreHandler
};