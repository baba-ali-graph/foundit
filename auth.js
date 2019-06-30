const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const routes = require('./router/routes')

const Authenticate = (req, res, next) => {
  const token = extractToken(req)
	const verified = jwt.verify(token, secret)
  if(verified) 
    return next()
  else
    res.redirect(route.index)
}

const extractToken = ({headers},x) =>  x ?  headers['x-access-token'] : headers['Authorization'][0] 

module.exports = Authenticate