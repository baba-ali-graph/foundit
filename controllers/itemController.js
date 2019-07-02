
class itemController {
  constructor(itemModel){
  this.items = itemModel
  this.done = true
  }
  
  async  AddItem(req,res){
   const item = withDate(req.body)
   const errors = validate(item)
   if(errors) res.json({error,type : ERROR.validation})
   else {
  	const newItem = new this.items(item)
    const result = await newItem.save()
    if(result){
      res.json(result,this.done)
    } else {
      res.json({error:true, type : ERROR.database})
    }
     
   }
  }
  
  async  editItem(req,res) {
  	const item = req.body
  	const editedItem = await updateParameters(this.items,item)
  	if(editedItem)
  		res.json({editedItem,done: this.done})
  	else
  		res.json({error.true, type: ERROR.database})
  }
  
	 updateParameters(items, edited){
  	return new Promise((resolve,reject) => {
  		const result = await items.findOneAndUpdate({id:edited.id}, edited, {new:true} )
  		if(result) resolve(result)
  		else {
  		const reject(false)
  		}
  	})
  }
  
	async  removeItem(req,res) {
		const id = req.params.id
		const removed = await this.items.findByIdAndRemove({id:id})
		if(removed)
			res.json({done:this.done})
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
}
