const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const auth = require('./auth.js')
const cookieParser = require('cookie-parser')
//const logger = require('morgan')
const http = require('http')
const mongoose = require('mongoose')

const indexRouter = require('./router/index')
// const usersRouter = require('./router/users')

const app = express()

// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'Assets')))
app.use("/user", auth)
app.use('/', indexRouter);
// app.use('/users', usersRouter);

mongoose.connect("mongodb://localhost/foundit")
.then(() => console.log('connected successfully '))
.catch(() => console.log('could not establish connection to database'))

app.get('/illustration', (req,res) => res.download('./Assets/mic.svg'))

const server = http.createServer(app)
const port = process.env.PORT || 4900

server.listen(port, () => { console.log('app running on port  ' + port) })
