const fs = require('fs')
const qs = require('querystring')
const db = require('./../config/dataBase')

let getAddMovieForm = (req, res)=>{
  fs.readFile('./views/addMovie.html',(err,data)=>{
    if(err){
      console.log(err)
      return
    }

    res.writeHead(200,{
      'Content-Type':'text/html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
    let id = 0
    let moviesSorted = db
          .map(m=>{
            m.id=id++
          return m
          })
          .sort((a,b)=> Number(b.movieYear) - Number(a.movieYear))
    let content = ''

    for (const movie of moviesSorted) {
      content += `<div class="movie">
      <a href="/movies/details/${movie.id}">
                <img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"/>
        </a>      
            </div>`
    }
          console.log(content);
          fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('404 not found!')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', content)
            res.write(data)
            res.end()
})
   
  } else if(req.pathname === '/addMovie' && req.method === 'GET'){
      getAddMovieForm(req, res)
  }else if(req.pathname === '/addMovie' && req.method === 'POST'){
    let body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      let movieBody = qs.parse(body)

      let isValidMovieInfo = true
      for (let prop in movieBody) {
        if(movieBody[prop]===''){
          isValidMovieInfo=false
        }
      }

      if(isValidMovieInfo){
        db.push(movieBody)
        fs.readFile('./views/addMovie.html',(err,data)=>{
          if(err){
            console.log(err)
            return
          }
      
          res.writeHead(200,{
            'Content-Type':'text/html'
          })
          data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
          res.write(data)
          res.end()
        })
      }else{
        fs.readFile('./views/addMovie.html',(err,data)=>{
          if(err){
            console.log(err)
            return
          }
      
          res.writeHead(200,{
            'Content-Type':'text/html'
          })
          data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
          res.write(data)
          res.end()
        })
      }
     
      
    })
    
  } else if(req.pathname.startsWith('/movies/details/') && req.method === "GET"){
    let index = req.pathname.substr(req.pathname.lastIndexOf('/')+1)
    let movie = db[index]
    console.log(index)
    fs.readFile('./views/details.html',(err,data)=>{
      if(err){
        console.log(err)
        return
      }
  
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',`<div class="content">
      <img src="${decodeURIComponent(movie.moviePoster)}" alt="" />
      <h3>Title: ${movie.movieTitle}</h3>
      <h3>Year: ${movie.movieYear}</h3>
      <p> Description:${decodeURIComponent(movie.movieDescription)}</p>
      </div>`)
      res.write(data)
      res.end()
    })
  }else {
    return true
  }
}
