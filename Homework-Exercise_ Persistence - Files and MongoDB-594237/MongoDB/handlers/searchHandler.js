const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const Image = require('../models/ImageSchema.js');
const Tag = require('../models/TagSchema.js');
const util = require('../utilities.js');

function searchByTag(req, res) {
    let tags = req.tags;
    let tagsID = [];
    Tag.find().where('name').in(tags).then((tags) => {
        tags.forEach(e => tagsID.push(e._id));
        Image.find({imageTags: {"$in" : tagsID} })
            .sort({creationDate: -1})
            .then((images) => {
            req.images = images;
            util.renderImages(req, res);
        })
    })
}

function searchByDate(req, res) {
    let afterDate = Date.parse(req.searchData.afterDate.toString());
    let beforeDate = Date.parse(req.searchData.beforeDate.toString());
    let limit = req.searchData.Limit;
    limit = Number(limit === '' ? '10' : limit);

    Image.find({"creationDate": {"$gte": beforeDate, "$lt": afterDate}})
        .limit(limit)
        .then((images) => {
        req.images = images;
        util.renderImages(req, res);
    })
}

module.exports = (req, res) => {
  if (req.pathname === '/search') {
   let query = url.parse(req.url).query;
   let searchData = qs.parse(query);
   if(searchData.afterDate !== '' || searchData.beforeDate !== ''){
     req.searchData = searchData;
     searchByDate(req, res);
   }
   else if(searchData.tagName !== ''){
     req.tags = searchData.tagName.split(',');
     searchByTag(req, res);
   }
   else{
     Image.find().then((images) => {
       req.images = images;
       util.renderImages(req, res);
     })
   }

  } else {
    return true
  }
}
