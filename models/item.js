const {Schema, model} = require('mongoose')

const itemSchema = Schema({
  id : String,
  name : String,
  description : String,
  locationFound : String,
  datePosted : Date,
  dateFound : Date
})

module.exports = model('items',itemSchema)
