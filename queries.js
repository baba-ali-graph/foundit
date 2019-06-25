const search = async (db, key, dbtype, table) => 
{
 select(dbtype)
  {
    case "MONGODB":
  		const result = await db.find(key)
  		if (result) return result
    	break
    case "MYSQL":
    	const q = `select * from ${table} where id = ${key}`
      const result = await db.query(q)
      if (result) return result
    	break
    default:
    	return null
  }
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











module.exports = { search, modify, delete, add  }