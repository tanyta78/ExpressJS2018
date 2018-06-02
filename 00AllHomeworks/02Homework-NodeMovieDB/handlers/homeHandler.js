const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname,'../views/home.html')

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile(filePath,'utf8',(err,data)=>{
      if (err) {
        res.writeHead(404,{
          'Content-Type':'text/plain'
        })

        res.end()
        return
      }

      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
