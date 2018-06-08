const fs = require('fs');
const qs = require('querystring');
const Image = require('../models/ImageSchema.js');
const Tag = require('../models/TagSchema.js');
const util = require('../utilities.js');
const url = require('url');

function addImage(req, res) {
    let queryData = '';
    req.on('data', (data) => {
        queryData += data;
    });

    req.on('end', () => {
        let image = qs.parse(queryData);
        console.log(image);
        
        let tags = image.tagsID.toString().split(',');
        tags.pop();
        image.imageTags = tags;
        Image.create(image).then((imageInfo) => {
            Tag.find().where('_id').in(tags).then((tags) => {
                for (let tag of tags) {
                    tag.images.push(imageInfo._id);
                    tag.save();
                }
            });

            Image.find().then((images) => {
                req.images = images;
                util.renderImages(req, res);
            })
        })
    })
}

function deleteImg(req, res) {
    let id = url.parse(req.url).query.replace('id=', '');
    Image.findById(id).remove((err, data) => {
        if(err){
            console.log(err);
            return;
        }

        Tag.find({images: id}).then((tags) => {
            for (let tag of tags) {
                let index = tag.images.indexOf(id);
                if (index > -1) {
                    tag.images.splice(index, 1);
                }

                tag.save();
            }

            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        })
    })
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
