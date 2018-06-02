const fs = require('fs')

function getContentType (url) {
  const mimes = {
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'html': 'text/html'
  }

  let ext = url.split('.').pop()
  if (typeof (mimes[ext]) !== 'undefined') { return mimes[ext] } else { return 'text/html' }
}

module.exports = (req, res) => {
  if (!req.path.startsWith('/content/')) {
    res.writeHead(401)
    res.write('401 Unauthorized - Check your URL!')
    res.end()
    return
  }
  fs.readFile('.' + req.path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('404 Not Found- Check your URL!')
      res.end()
      return
    }

    res.writeHead(200, {
      'Content-Type': getContentType(req.path)
    })

    res.write(data)
    res.end()
  })
}
