const homeHandler = require('./homeHandler')
const errorHandler = require('./errorHandler')
const staticHandler = require('./staticHandler')
const moviesHandler = require('./movieHandler')
const headerHandler = require('./headerHandler')

module.exports = [
  headerHandler,
  homeHandler,
  moviesHandler,
  staticHandler,
  errorHandler
]
