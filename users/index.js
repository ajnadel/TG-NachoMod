'use strict';

const fs = require('fs')
const user = require('./user')

const SAVEFILE = __dirname + '/save.json'

let users = getSave()
let usersByUsername = new Map()

// register the server (will overwrite)
registerUser({
	id: 'server',
	first_name: 'Server'
}, { balance: Infinity })
// infinte balance will not serialize, so must be set every time

module.exports = {
	registerUser,
	users,
	triggerSave,
	usersByUsername
}

function registerUser(userObj, properties) {
	let newUser = user()
	newUser.userId = userObj.id
	newUser.username = userObj.username
	newUser.preferredName = userObj.first_name
	if (userObj.last_name) newUser.preferredName += userObj.last_name

	users[newUser.userId] = newUser
	Object.assign(newUser, properties)

	triggerSave()
	indexUsernames()
	return newUser
}

function getSave() {
	if (!fs.existsSync(SAVEFILE)) fs.writeFileSync(SAVEFILE, '')
	let save = fs.readFileSync(SAVEFILE).toString() || '{}'
	return JSON.parse(save)
}

function triggerSave() {
	fs.writeFile(SAVEFILE, JSON.stringify(users))
}

function indexUsernames() {
	Object.keys(users).map(k => users[k]).forEach(u => {
		if (!u.username) return
		usersByUsername.set(u.username, u)
	})
}