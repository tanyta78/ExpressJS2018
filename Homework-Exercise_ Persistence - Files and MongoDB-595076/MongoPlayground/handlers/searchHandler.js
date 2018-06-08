const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');
const Tag = require('../models/Tag');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    let query = req.pathquery;


    var limit = query.Limit === '' ? 0 : Number.parseInt(query.Limit);

    if (query.afterDate === '' && query.beforeDate === '' && query.tagName === 'Write tags separted by ,') {
      Image.find({}).limit(limit).then(images => {
        composeHtmlAndResponse(images, res);
      });
    } else if (query.tagName !== 'Write tags separted by ,') {
      let tags = query.tagName
        .split(/, |,| /)
        .filter(e => e !== '');
      let tagIds = [];

      Tag.find({})
        .where('name')
        .in(tags).then(data => {
          for (const tag of data) {
            tagIds.push(tag.id);
          }

          Image.find()
            .limit(limit)
            .where('tags')
            .in(tagIds)
            .sort({
              creationDate: -1
            })
            .then(images => {
              composeHtmlAndResponse(images, res);
            });
        });
    }
  } else {
    return true;
  }
}

function composeHtmlAndResponse(images, res) {
  let filepath = path.normalize(path.join(__dirname, '../views/results.html'));
  let content = '';
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    for (const image of images) {
      content += `
      <fieldset> <legend>${image.title}:</legend>
        <img src="${image.url}"></img>
        <p>${image.description}<p/>
        <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete</button> 
      </fieldset>`
    }

    if (!content) {
      content = 'No results found';
    }

    let html = data.toString().replace(`<div class='replaceMe'></div>`, content);

    res.end(html);
  });
}