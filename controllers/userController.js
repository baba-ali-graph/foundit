const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')
const ERRORS = require("../errors")
let {userValidation} = require('../validate.js')
const displays = require("../displays")
const users = require('../models/user.js')

class UserController {
  constructor(){
  console.log('new instance of user controller created')
  }
  
  async Signup(req,res){
   const user = req.body
   console.log(user)
   let errors = userValidation(user)
   if(errors) res.json({errors,type : ERRORS.validation})
   else {
  	const newUser = new users(user)
    const result = await newUser.save()
    if(result){
      const token = makeToken(removePassword(result),'4h')
      console.log(token)
      res.json({token,auth:true})
    } else {
      res.json({ERRORS:true, type : ERRORS.database})
    }
     
   }
  }

  async  Login(req,res){
    const userInput = req.body
    let errors = validate(userInput)
    if(errors) res.json({ERRORS,type:ERRORS.validation})
    else {
      const userDetails = specifyUserDetails(userInput)
      const existedUser = await users.findOne({[userDetails.which]:userDetails[which]})
      if(existedUser) {
        const verified = verifyPwd(existedUser,userDetails) 
        if(verified){
          const token = makeToken(removePassword(existedUser), '4h')
          res.json({token,auth:true})
        } else {
          res.json({ERRORS:true, type:ERRORS.password})
        }
      } else {
        res.json({ERRORS:true, type:ERRORS.user})
      }
    }
  }
  
  async  deleteAccount(req,res){
    const id  = req.params.id
    const deleted = await users.findOneAndRemove({id:id})
    if(deleted){
      res.json({done:true})
    }else{
      res.json({ERRORS:true, type:ERRORS.operation})
    }
  }
  }
  
    
  function assignUserDisplay(){
   const seed = parseInt(Math.random() * displays.length -1 )
   console.log(users)
   return displays[seed]
  }
  
  function makeToken({id,name,email}, time) {
    return jwt.sign({id,name,email}, config.secret, {expiresIn: time})
  }
  
  function verifyPwd({password},{password : toCheck}) {
    return bcrypt.compareSync(password,toCheck)
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
  
  function checkIfValid(user) {
  	let errors = []
  	checkEmptiness(user,ERRORS)
  }
    
module.exports = UserController
