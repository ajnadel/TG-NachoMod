'use strict';

const permission = require('../permissions')

let userTemplate = {
	userId: null,
	username: null,
	preferredName: '',
	balance: 0,
	permissionLevel: permission.LEVEL_USER,
	ignored: false
}

module.exports = function userFactory() {
	return Object.assign({}, userTemplate)
}