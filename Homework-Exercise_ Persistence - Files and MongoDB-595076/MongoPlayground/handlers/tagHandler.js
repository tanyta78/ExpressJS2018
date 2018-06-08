const formidable = require('formidable')
const Tag = require('../models/Tag')

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
      let form = new formidable.IncomingForm();
      let tag = {}

      form.parse(req, function (err, fields, files){
          if(err){
            console.log(err);
            return;
          }

          tag.name = fields.tagName.toLocaleLowerCase()

          Tag.create(tag).then(()=>{
            res.writeHead(302, {
              Location: '/'
            })

            res.end()
          })

      })

      

  } else {
    return true
  }
}
