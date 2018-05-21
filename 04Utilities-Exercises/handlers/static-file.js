const fs = require('fs')

function getContentType(url) {
    const mimes = {
        "js": "application/javascript",
        "css": "text/css",
        "json": "application/json",
        "jpeg": "image/jpeg",
        "pdf": "application/pdf",
        "html":"text/html"
    };

    let ext = url.split('.').pop();
    if (typeof (mimes[ext]) != "undefined")
        return mimes[ext];
    else
        return "text/html";
}

let validateFileExtension=(path)=>{
    if(path.endsWith('.html')||
    path.endsWith('.css')||
    path.endsWith('.js')||
    path.endsWith('.jpg')){
        return true
    }
    return false
}

module.exports = (req, res) => {
    fs.readFile('.' + req.path, (err, data) => {
        if (err ||
            req.method !=='GET' ||
            !req.path.startsWith('/content/')||
            !validateFileExtension(path)) {
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