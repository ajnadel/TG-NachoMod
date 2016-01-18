'use strict';

let userTemplate = {
	userId: null,
	username: null,
	preferredName: '',
	balance: 0,
	ignored: false
}

module.exports = function userFactory() {
	return Object.assign({}, userTemplate)
}