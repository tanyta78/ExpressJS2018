const formidable = require('formidable')
const Image = require('mongoose').model('Image')
const ObjectId = require('mongoose').Types.ObjectId

let addImage = (req, res)=>{
  let form = new formidable.IncomingForm()

 form.parse(req,(err,fields,files)=>{
   if(err){
     throw(err)
   }

  //let tags=Array.from(new Set(fields.tagsId.split(','))).filter(t=>t.length !==0) 

  const tags = fields.tagsId.split(',').reduce((p,c,i,a)=>{
    if(p.includes(c)|| c.length === 0){
      return p
    }else{
      p.push(c)
      return p
    }
  },[]).map(ObjectId)
    
   const image={
     url:fields.imageUrl,
     description:fields.description,
     tags
   }

   Image.create(image).then(image=>{
      res.writeHead(302,{
        location:'/'
      })
      res.end()
   }).catch(err=>{
      res.writeHead(500,{
        'Content-Type':'text/plain'
      })
      res.write('500 Server Error')
      res.end()
   })
   
 })
}

let deleteImg = (req, res)=>{
  Image.deleteOne({_id: req.pathquery.id}).then(()=>{
    res.writeHead(302,{
      location:'/'
    })
    res.end()
  }).catch(err=>{
    res.writeHead(500,{
      'Content-Type':'text/plain'
    })
    res.write('500 Server Error')
    res.end()
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
