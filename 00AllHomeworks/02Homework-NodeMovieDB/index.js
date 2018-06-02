const http = require('http')
const url = require('url')

const handlers = require('./handlers')
const port = 5000

let server = http.createServer((req, res) => {
  req.pathname = url.parse(req.url).pathname

  for (let handler of handlers) {
    if (handler(req, res) !== true) {
      break
    }
  }
})

server.listen(port)

console.log(`Server is running on port ${port}`)
