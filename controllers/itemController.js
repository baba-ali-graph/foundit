
class itemController {
  constructor(itemModel){
  this.items = itemModel
  this.done = true
  }
  
  async function AddItem(req,res){
   const item = req.body
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
  
  async function editItem(req,res) {
  	const item = req.body
  	const editedItem = await updateParameters(this.items,item)
  	if(editedItem)
  		res.json({editedItem,done: this.done})
  	else
  		res.json({error.true, type: ERROR.database})
  }
  
  function updateParameters(items, edited){
  	return new Promise((resolve,reject) => {
  		const result = await items.findOneAndUpdate({id:edited.id}, edited, {new:true} )
  		if(result) resolve(result)
  		else {
  		const reject(false)
  		}
  	})
  }
  
	async function removeItem(req,res) {
		const id = req.params.id
		const removed = await this.items.findByIdAndRemove({id:id})
		if(removed)
			res.json({done:this.done})
		else
			res.json({error:true, type:ERROR.database})
		
	}
	
	function claimItem() {}
	function setItemDate() {}
  }
}
