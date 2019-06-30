const {Schema, model}= require('mongoose')

const messageSchema = Schema({
  id : String,
  content : String,
  date : String,
  userId : {type:String, ref:'user'}
})

module.exports = model('message',messageSchema)