const mongoose = require('mongoose')

let catSchema=new mongoose.Schema({
  name:{ type:String, required: true},
  age:{ type: Number, required: true},
  color:{ type: String}
})

catSchema.methods.sayHello = function (){
  return `Hello from ${this.name}`
}

catSchema.virtual('description').get(function(){
  return `Cat ${this.name} is ${this.age} year old`
})

catSchema.path('age').validate(function(){
  return this.age >= 1 && this.age <= 11
},'Age must be between 1 and 11!')

let Cat = mongoose.model('Cat',catSchema)

module.exports = Cat