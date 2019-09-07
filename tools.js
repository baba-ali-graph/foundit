const fs = require('fs')
exports.dropCertDetails = () => ({
//	key : fs.readFileSync('./Security/server.key'),
	cert : fs.readFileSync('./Security/server.cert') 
	
})
