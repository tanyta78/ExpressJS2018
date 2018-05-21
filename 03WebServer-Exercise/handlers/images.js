const fs = require('fs')
const path = require('path')
let qs = require('querystring')
const database = require('../config/database')

module.exports = (req, res) => {
  if (req.path === '/images/add' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../content/add.html'))

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else if (req.path === '/images/add' && req.method === 'POST') {
    let content = ''

    req.on('data', (data) => { content += data })
    // qs do not work!!! WHAT TO DO!!!
    req.on('end', () => {
      let image = qs.parse(content)
      console.log(image)
      // { '------WebKitFormBoundaryH6MUrrxbgkdM8vMx\r\nContent-Disposition: form-data; name': '"name"\r\n\r\nZombie team\r\n------WebKitFormBoundaryH6MUrrxbgkdM8vMx\r\nContent-Disposition: form-data; name="imageUrl"\r\n\r\nhttp://germaniumhq.com/Python_logo_and_wordmark.png\r\n------WebKitFormBoundaryH6MUrrxbgkdM8vMx--\r\n' }
      if (!image.name || !image.imageUrl) {
        res.writeHead(200)
        res.write('Some of the fields are not filled.')
        res.end()
      } else {
        database.images.add(image)
        res.writeHead(302, {
          Location: '/'
        })
        res.end()
      }
    })
  } else if (req.path === '/images/all' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../content/all.html'))

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('404 Not Found!')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      let images = database.images.getAll()

      images.sort((a, b) => {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        return nameA.localeCompare(nameB)
      })

      let content = ''

      for (let image of images) {
        if (!image.hasOwnProperty('private')) {
          content += `<div class="image">
                    <img class="img" src="${image.url}" />
                    <h2>${image.name}</h2>
                    <a href=/images/details/${image.id}>View Details</a>
                    </div>`
        } else {
          content += `<div class="image">
                    <h2>${image.name}</h2>
                    <a href=/images/details/${image.id}>View Details</a>
                    </div>`
        }
      }

      let html = data.toString().replace('{content}', content)

      res.write(html)
      res.end()
    })
  } else if (req.path.startsWith('/images/details') && req.method === 'GET') {
    let content = ''
    let id = Number(req.path.split('/').pop())
    let filePath = path.normalize(path.join(__dirname, '../content/details.html'))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('404 Not Found!')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      let image = database.images.getById(id)

      if (!image.hasOwnProperty('private')) {
        content = `<div class="img-full">
                <h2>${image.name}</h2>
                <a href="${image.url}">Download</a>
                <img src="${image.url}">
                </div>`

        let html = data.toString().replace('{content}', content).replace('{img.id}', image.id)

        res.write(html)
        res.end()
      } else {
        res.write('This image is private!')
        res.end()
      }
    })
  } else {
    return true
  }
}
