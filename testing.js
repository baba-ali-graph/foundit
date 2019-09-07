class Home {
	constructor(who) {
	this.person = who
	}
	async printPerson() {
		console.log(this.person)
	}
}

const myhome = new Home('AbdulAziz')

myhome.printPerson()
