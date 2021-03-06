const http = require('http')
const url = require('url')
const handlers = require('./handlers')
const port = 1234

http
  .createServer((req, res) => {
    req.path = url.parse(req.url).pathname

    for (const handler of handlers) {
      let next = handler(req, res)
      if (!next) {
        break
      }
    }
  })
  .listen(port)

console.log(`Server is running on port ${port}`)
