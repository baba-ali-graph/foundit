const items = require('../models/item')
let done = true

class itemController {
  constructor(itemModel){
  console.log('new instance of item controller created')
  }
  
  async AddItem(req,res){
   const item = withDate(req.body)
   let errors = false
   if(errors) res.json({error,type : ERROR.validation})
   else {
  	const newItem = new items(item)
  	console.log(item)
    const result = await newItem.save()
    if(result){
      res.json({result,done})
    } else {
      res.json({error:true, type : ERROR.database})
    }
   }
  }
  
  async editItem(req,res) {
  	const item = req.body
  	const editedItem = await updateParameters(items,item)
  	if(editedItem)
  		res.json({editedItem,done: done})
  	else
  		res.json({error:true, type: ERROR.database})
  }
  
	async updateParameters(items, edited) {
  	return new Promise( async (resolve,reject) => {
  	const result = await items.findOneAndUpdate({id:edited.id}, edited, {new:true} )
  	if(result) return resolve(result)
  	else {
  	return reject(false)
  		}
  	})
  }
  
	async  removeItem(req,res) {
		const id = req.params.id
		const removed = await items.findByIdAndRemove({id:id})
		if(removed)
			res.json({done})
		else
			res.json({error:true, type:ERROR.database})
		
	}
	
	 simplifyDate(date) {
		const inMilliseconds = date.getTime()
		const inDays = (inMilliseconds/1000*60*60*24)
		if(inDays >=7)
		{
			const inWeeks = parseInt(inDays/7)			
			if(inWeeks >= 4)
			{
				const inMonths = parseInt(inWeeks/4)
					if(inMonths >= 12) 
					{
						const inYears = parseInt(inMonths/12)
							return { ago:inYears, type:'year'}
					}
				return { ago:inMonths, type:'month' }
			}
			return { ago:inWeeks, type:'week' }
		}
		
		return { ago:inDays, type:'days' }	
	}
  }
  
  function withDate(item){
  const _item = item
  _item.date = new Date()
  	return _item
  }
module.exports = itemController
