const fs = require('fs')
const Image = require('mongoose').model('Image')
const Tag = require('mongoose').model('Tag')

const qs = require('querystring')

let imageTemplate=(image)=>{
  return `<fieldset id ="${image._id}" >
  <img src="${image.url}"></img>
  <p>${image.description}<p/>
  <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
  </button> 
  </fieldset>` 
}

let getImagesAndResponce = (res, data, params)=>{
  Image.find(params).then(images=>{
    let imageHtml = ''
    for(let img of images){
      imageHtml+= imageTemplate(img) 
    }

    data = data.replace('<div class="replaceMe"></div>',imageHtml)

    res.writeHead(200,{
      'Content-Type':'text/html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    
    fs.readFile('./views/results.html','utf8',(err,data)=>{
      if(err){
        throw err
      }

      const params = {}
      if(req.pathquery.afterDate){}
      if(req.pathquery.beforeDate){}
      if(req.pathquery.Limit){}
      if(req.pathquery.tagName){
        const tags =req.pathquery.tagName.split(',').filter(e=>e.length>0)
        if(tags.length > 0){
          Tag.find({name:{$in: tags}}).then((searchedTags)=>{
           const tagsIds = searchedTags.map(m=>m._id)
           params.tags=tagsIds
           getImagesAndResponce(res, data, params)
          })
        }else{
          getImagesAndResponce(res, data, params)
        }
      }
    })
  } else {
    return true
  }
}
