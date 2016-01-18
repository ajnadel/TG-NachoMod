'use strict';

const fs = require('fs')
const user = require('./user')
const permission = require('../permissions')

const SAVEFILE = __dirname + '/save.json'

let users = getSave() // is obj, not Map, because needs to be serialized
let usersByUsername = new Map()

// register the server (will overwrite)
registerUser({
	id: 'server',
	first_name: 'Server'
}, { balance: Infinity })
// infinte balance will not serialize, so must be set every time

let getUserByUsername = (username) => usersByUsername.get(username.toLowerCase())
let getUserById = (id) => users[id]

let UNREGISTERED = user()
UNREGISTERED.id = 'UNREGISTERED'
UNREGISTERED.preferredName = 'unregistered user'
UNREGISTERED.permissionLevel = permission.LEVEL_IGNORED
UNREGISTERED.unregistered = true

module.exports = {
	getUserByUsername,
	getUserById,
	users,
	usersByUsername,
	registerUser,
	triggerSave,
	UNREGISTERED
}

function registerUser(userObj, properties) {
	let newUser = user()
	newUser.userId = userObj.id
	if (userObj.username) newUser.username = userObj.username.toLowerCase()
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
	// is obj, not Map, because needs to be serialized
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