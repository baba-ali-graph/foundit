const search = async (db, key) => 
{
 // select(dbtype)
 //  {
    // case "MONGODB":
  		const result = await db.find(key)
  		if (result) return result
  // 	break
  //   case "MYSQL":
  //   	const q = `select * from ${table ? table : 'users'} where id = ${key}`
  //     const result = await db.query(q)
  //     if (result) return result
  //   	break
  //   default:
  //   	return null
  // }
  return null
}

const modify = async (db, content, key) => 
{
  const retrieved = await db.findById(key)
  for(key in content)
    retrieved[key] = content[key]
  const result = await db.findByIdAndUpdate(key, retrieved, {new : true})
  if (result) return result
  return null
}




const delete = async (db, key) => 
{
	const result = await db.findByIdAndRemove(key)
  if (result) return result
  return null
}

const add = async(db,content,key) => 
{
  const newOne = new db(content)
  const result = await newOne.save() 
}


module.exports = { search, modify, delete, add  }