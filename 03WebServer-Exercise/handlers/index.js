const homePageHandler = require('./homePage')
const faviconHandler = require('./favIcon')
const staticFilesHandler = require('./static-file')
const imagesHandler = require('./images')
let headerHandler = require('./header')

module.exports = [
  headerHandler,
  homePageHandler,
  faviconHandler,
  imagesHandler,
  staticFilesHandler
]
