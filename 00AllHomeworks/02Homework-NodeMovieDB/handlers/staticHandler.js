const fs = require('fs')

const allowedStaticFiles = {
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'jpg': 'image/jpg',
  'html': 'text/html',
  'ico':'image/x-icon'
}

let faviconHandler = (req, res)=>{
  fs.readFile('./public/images/favicon.ico',(err,data)=>{
    if(err){
      console.log(err)
      return
    }

    res.writeHead(200,{
      'Content-Type':'image/x-icon'
    })

    res.write(data)
    res.end()
  })
}

let resourceHandler = (req,res)=>{
  fs.readFile('.'+req.pathname,(err,data)=>{
    if(err){
      console.log(err)
      return
    }

    res.writeHead(200,{
      'Content-Type':getContentType(req.pathname)
    })

    res.write(data)
    res.end()
  })
}

let getContentType = (url)=> {
  let ext = url.split('.').pop()
  if (typeof (allowedStaticFiles[ext]) !== 'undefined') { return allowedStaticFiles[ext] } else { return false }
}

module.exports = (req, res) => {
  let isAllowedFileType = getContentType(req.pathname) !== false
  if (req.pathname === '/favicon.ico' && req.method === 'GET') {
      faviconHandler(req, res)   
  } else if (req.pathname.startsWith('/public/') && req.method === 'GET' && isAllowedFileType) {
      resourceHandler(req, res)
  } else {
    return true
  }
}
