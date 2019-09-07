const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const routes = require('./router/routes')

const Authenticate = (req, res, next) => {
  const token = req.headers['x-access-token']
	const verified = jwt.verify(token, secret)
  if(verified) 
    return next()
  else
    res.redirect(route.index)
}

module.exports = Authenticate
