const fs = require('fs')
const path = require('path')

const placeholder = `<div id="replaceMe">{{replaceMe}}</div> `
// TO DO - NOT USED IN APP
function responseHandler (res, pathname, dynamicContent, contentType) {
  if (!pathname) {
    throw new ReferenceError('Argument pathname could not be undefined')
  }
  pathname = path.join(__dirname, `../${pathname}`)

  if (!contentType) {
    contentType = 'text/html'
  }

  fs.readFile(pathname,"utf8", (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end(`Could not find file with path "${pathname}".`)
      return
    }

    if(dynamicContent){
      data = data.replace(placeholder,dynamicContent.join("")) 
      console.log(dynamicContent.join(""))
      
    }

    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.write(data)
    res.end()
  })
}

module.exports = responseHandler
