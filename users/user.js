'use strict'

let userPrototype = {
	userId: '',
	preferredName: '',
	balance: 0,
	ignored: false,
	addMoney(amount) {
		this.money += 
	}
}

module.exports = function userFactory() {
	return Object.create(userPrototype)
}