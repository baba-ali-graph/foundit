exports.userValidation = ({ name="", email="", password="" })  => {
	let errors = []
	name == "" && errors.push("Name field is empty")
	name.length > 20 && errors.push("Name ! Name is too long")
	
	email == "" && errors.push("Email field is empty") ||
	email.indexOf('@') < 1 && errors.push("Email ! Not a valid email")
	
	password == "" && errors.push("Password ! Password field is empty")
	password.length < 10 && errors.push("Password ! password too short")
	
	return errors.length > 0 ? errors : null  
}



