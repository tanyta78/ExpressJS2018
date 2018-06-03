
// WITHOUT MONGOOSE
/*const mongodb = require('mongodb')

  let connection = 'mongodb://localhost:27017/pets'
  mongodb
    .MongoClient
    .connect(connection)
    .then(client =>{
      let db = client.db('pets')

      let dogs = db.collection('dogs')

      dogs.insert({
        name:'Blacky',
        age:3,
        color:'white',
        breed:'pudel'
      })

      dogs.find({}).toArray((err, dogs) => console.log(dogs))
    })*/

//MONGOOSE

const mongoose = require('mongoose')
const Cat = require('./models/Cat')


let ownerSchema = new mongoose.Schema({
  firstName:{type:String,required:true},
  lastName:{type:String, required:true},
  cats:[Cat.schema]
})

let Owner = mongoose.model('Owner',ownerSchema)

mongoose
  .connect('mongodb://localhost:27017/cats')
  .then(()=>{
    //creation of cat
      /* 
      let newCat = new Cat({
          name:'Shoshi',
          age:10,
          color:'red'
        })

        newCat.save()
    */
     //creation of owner
      /*
      Cat.find({}).then(cats=>{
        let owner = new Owner({
          firstName:'Petar',
          lastName:'Catman',
          cats
        })
  
        owner.save()
      })
    */
      Cat.find({}).then(cats=>console.log(cats))
      Cat.findOne().then(c=>{
        console.log(c.sayHello())
        console.log(c.description)
      })
      Cat.findOne({name:'Ivan'}).then(c=>{
        c.name = 'Ivan'
        c.save()
      })
      Cat.findByIdAndUpdate("5b1425fb4d01ef4a09867b23",
        {$set: {name:'Pepi'}}).exec()
  })
   