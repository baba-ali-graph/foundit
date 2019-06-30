exports.handleResponse = (res,error,data) => 
{
  if(error) res.json({error:error})
  else res.json(data)
}