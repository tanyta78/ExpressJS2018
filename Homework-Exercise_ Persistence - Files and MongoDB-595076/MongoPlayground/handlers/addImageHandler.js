const formidable = require('formidable');

const Image = require('../models/Image');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    let image = {};

    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }

      image.url = fields.imageUrl;
      image.description = fields.description;
      image.title = fields.imageTitle;
      image.tags = fields.tagsID.split(',').filter(e => e !== '');

      Image.create(image).then(() => {
        res.writeHead(302, {
          Location: '/'
        });

        res.end();
      }).catch(err => {
        res.writeHead(403, {
          Location: '/'
        });

        res.end();
      });
    });
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    let id = req.pathquery.id;

    Image.findByIdAndRemove(id).then(() => {
      res.writeHead(302, {
        Location: '/'
      });

      res.end();
    });
  } else {
    return true
  }
}