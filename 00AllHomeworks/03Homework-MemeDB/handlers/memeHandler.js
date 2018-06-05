const fs = require('fs')
const db = require('../config/dataBase')
const qs = require('querystring')
const url = require('url')
const shortid = require('shortid')
const formidable = require('formidable')

const viewAllPath = './views/viewAll.html'
const viewDetailsPath='./views/details.html'
const viewAddMemePath = './views/addMeme.html'

//Utils

let defaultResponse = (res, data)=>{
  res.writeHead(200,{
    'Content-Type':'text/html'
  })
  res.end(data)
}

let memeGenerator = (id,title,memeSrc,description,privacy)=>{
  return {
      id: id,
      title: title,
      memeSrc: memeSrc,
      description: description,
      privacy: privacy,
      dateStamp: Date.now()
  }
}

let viewAll = (req, res)=> {
    fs.readFile(viewAllPath,'utf8', (err, data) => {
    if(err){
        console.log(err)
        return
    }
    

    let sortedDataHtml = db.getDb()
                      .sort((a,b)=>b.dateStamp - a.dateStamp)
                      .filter(m=>m.privacy==='on')
                      .map(meme=> `<div class="meme">
                      <a href="/getDetails?id=${meme.id}">
                      <img class="memePoster" src="${meme.memeSrc}"/>          
             </div>`
            )

    data= data.replace('<div id="replaceMe">{{replaceMe}}</div>',sortedDataHtml)
        
    defaultResponse(res, data)
  })
}

let viewAddMeme = (req, res)=>{
  fs.readFile(viewAddMemePath,'utf8', (err, data) => {
    if(err){
        console.log(err)
        return
    }

    defaultResponse(res, data)

  })
}

let getDetails = (req, res) => {
  let memeId = qs.parse(url.parse(req.url).query).id
  
  let targetedMeme = db.getDb().find(m=> m.id===memeId)
console.log(targetedMeme)
  let fileName=targetedMeme.memeSrc.split('/').pop()
  let fullPath = __dirname+targetedMeme.memeSrc

  let memeInfoHTml=`<div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title  ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
  <button><a href="${targetedMeme.memeSrc}" download=" ${targetedMeme.title}.jpg">Download Meme</a></button>
  </div>`
//download work only in Chrome
    
  fs.readFile(viewDetailsPath,'utf8', (err, data) => {
    if(err){
        console.log(err)
        return
    }
   
    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>',memeInfoHTml)

    defaultResponse(res, data)

  })
}

let addMeme = (req, res)=> {
  let dbLength = db.getDb().length
  let dbPath = `./public/memeStorage/${dbLength/10}`
 
  let fileName = shortid.generate()
  let memePath = dbPath + '/'+fileName+'.jpg'

  fs.access(dbPath, err => {
    if(err){
      fs.mkdirSync(dbPath)
    }  
    let form = new formidable.IncomingForm()
    form.on('error',(err)=>{
      console.log(err)
      return
    }).on('fileBegin',(name, file)=>{    
       file.path = memePath
    })
  
    form.parse(req,(err,fields, files)=> {

      let id = shortid.generate()
      let createMeme = memeGenerator(id,fields.memeTitle,memePath,fields.memeDescription,fields.status)

      db.add(createMeme)
      db.save().then(()=>{
        fs.readFile(viewAddMemePath,(err,data)=>{
          if(err){
            console.log(err)
            return
          }
      
          res.writeHead(200,{
            'Content-Type':'text/html'
          })

          data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>')
          res.write(data)
          res.end()
        })
      })

    })
  })       
}
 
module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
