const formidable = require('formidable')
const util = require('util')
const Tag = require('mongoose').model('Tag')

function handleCircularRef (req,res) {
  res.writeHead(200,{
    'Content-Type':'application/json'
  })
  const cache = []
  res.write(JSON.stringify(req, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found
            try {
                // If this value does not reference a parent it can be deduped
                return JSON.parse(JSON.stringify(value));
            } catch (error) {
                // discard key if value cannot be deduped
                return;
            }
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
  }))

  res.end()
}

function handleFormFields (req, res) {
  const form = new formidable.IncomingForm
  form.parse(req, (err,fields,files)=>{
    res.writeHead(200,{
      'Content-Type':'text/plain'
    })
   
    res.write('received upload:\n\n')
    res.end(util.inspect({
      fields,
      files
    }))
  })
}


module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
      //handleCircularRef(req, res)
      //hanleFormFields(req, res)
    const form = new formidable.IncomingForm
    form.parse(req, (err,fields,files)=>{
      
      const name = fields.tagName
      Tag.create({
        name,
        images:[]
      }).then(tag => {
        res.writeHead(302,{
          'location':'/'
        })
        res.end()
      }).catch(err=>{
       res.displayError(err)
      })
     
    })

  } else {
    return true
  }
}
