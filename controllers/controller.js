class Controller {
  function handleResponse(res, error, data){
    if(error) res.json({error:err})
    else res.json(data)    
  }
  
  function customError(code){
    switch(code){
        case 1
    }
  }
  function createToken(info){
    const token = jwt.sign(info,config.secret, {expiresIn:'2h'})
    return token
  }
}