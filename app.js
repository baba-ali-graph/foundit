const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const auth = require('./auth.js')
const fs = require('fs')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logging = require('morgan')
const https = require('http')
const mongoose = require('mongoose')
const { dropCertDetails }  = require('./tools')
const indexRouter = require('./router/index')
// const usersRouter = require('./router/users')

// CORS options setup
const options = {
	origin: '*'
}



const app = express()
const logFile = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags:'a'})
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors(options))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(logging('combined', {stream : logFile}))
app.use(express.static(path.join(__dirname, 'Assets')))
app.use("/user", auth)
app.use('/', indexRouter);


mongoose.connect("mongodb://localhost/foundit")
.then(() => console.log('connected successfully '))
.catch(() => console.log('could not establish connection to database'))


const server = https.createServer(dropCertDetails(), app)
const port = process.env.PORT || 4900

server.listen(port, () => { console.log('app running on port  ' + port) })
