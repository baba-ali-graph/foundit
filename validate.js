const isEmpty = (content) => {
  const errors = {}
  for(key in content)
  {
    if(content[key] == "")
      errors[key] = `${key} is missing`
  }
  return errors
}

