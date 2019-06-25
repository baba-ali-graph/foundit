const {Schema, model} = require('mongoose')

const usersSchema = Schema({
  id : String,
  name : String,
  email : String,
  password : String,
  state : String,
  location : String,
  dateCreated : Date,
  lastSeen : Date
})

module.exports = model('users',usersSchema)