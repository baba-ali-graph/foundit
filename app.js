const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')
const http = require('http')
// const mongoose = require('mongoose')

// const indexRouter = require('./routes/index')
// const usersRouter = require('./routes/users')

const app = express()

// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const server = http.createServer(app)
const port = process.env.PORT || 4900

server.listen(port, () => { console.log('app running on port  ' + port) })