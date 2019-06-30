const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')
const ERROR = require("../error.js")
const displays = require("../displays")

class UserController {
  constructor(userModel){
    this.users = userModel
    this.auth = true
  }
  
  async function Signup(req,res){
   const user = req.body
   const errors = validate(user)
   if(errors) res.json({error,type : ERROR.validation})
   else {
  	const newUser = new this.users(user)
    const result = await newUsers.save()
    if(result){
      const token = makeToken(removePassword(result),'4h')
      res.json(token,this.auth)
    } else {
      res.json({error:true, type : ERROR.database})
    }
     
   }
  }

  async function Login(req,res){
    const userInput = req.body
    const errors = validate(userInput)
    if(errors) res.json(error,ERROR.validation)
    else {
      const userDetails = specifyUserDetails(userInput)
      const existedUser = await this.users.findOne({[userDetails.which]:userDetails[which]})
      if(existedUser) {
        const verified = verifyPwd(existedUser,userDetails) 
        if(verified){
          const token = makeToken(removePassword(existedUser), '4h')
          res.json(token,auth)
        } else {
          res.json({error:true, type:ERROR.password})
        }
      } else {
        res.json({error:true, type:ERROR.user})
      }
    }
  }
  
  async function deleteAccount(req,res){
    const id  = req.params.id
    await deleted = await this.users.findOneAndRemove({id:id})
    if(deleted){
      res.json({done:true})
    }else{
      res.json({error:true, type:ERRORS.operation})
    }
  }
  
  function assignUserDisplay(){
   const seed = parseInt(Math.random() * displays.length -1 )
   return displays[seed]
  }
  
  function makeToken({id,name,email}, time) {
    return jwt.sign({id,name,email}, config.secret, {expiresIn: time})
  }
  
  function verifyPwd({password},{password : toCheck}) {
    return bcrypt.compareSync(password,toCheck)_
  }
  
  function specifyUserDetails(details) {
    const field = details.field
    const which = extractEither(field)
    const newUser = {password:details.password}
    newUser[which] = field
    newUser.which = which
    return newUser
  }
  
  function removePassword(user) {
  user.password = null
  return user
  }
  function extractEither({field}){
    if(/@/.test(field))
      return "email"
    else
      return "username"
  }
}
  
  
  
  

  
module.exports = UserController
