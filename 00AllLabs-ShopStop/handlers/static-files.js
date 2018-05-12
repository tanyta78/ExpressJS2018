const fs = require('fs')
const path = require('path')
const url = require('url')

function getContentType(url) {
    const mimes = {
        "js": "text/javascript",
        "css": "text/css",
        "json": "application/json",
        "jpeg": "image/jpeg",
        "pdf": "application/pdf"
    };

    let ext = url.split('.').pop();
    if (typeof (mimes[ext]) != "undefined")
        return mimes[ext];
    else
        return "text/html";
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`))

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('Resource not found!')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            })

            //send data and end response
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}