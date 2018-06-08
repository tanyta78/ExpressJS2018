const qs = require('querystring');
const Tag = require('../models/TagSchema.js');
const fs = require('fs');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let queryData = '';
    req.on('data', (data) => {
      queryData += data;
    });

    req.on('end', () => {
      let tag = qs.parse(queryData);
      Tag.create(tag).then(() => {
          fs.readFile('./views/index.html', (err, data) => {
            if(err){
              console.log(err);
              res.writeHead(404, {
                'Content-Type': 'text/html'
              });

              res.write('<h1>404 Not Found !');
              res.end();
              return;
            }

            let html = '';
            Tag.find().then((tags) => {
                for (let tag of tags) {
                    html += `<div class='tag' id=${tag._id}">${tag.name}</div>`;
                }

                let output = data.toString().replace('<div class=\'replaceMe\'></div>', html);
                res.writeHead(200, {
                  'Content-Type': 'text/html'
                });

                res.write(output);
                res.end();
            })
          })
      })
    })
  } else {
    return true
  }
};
