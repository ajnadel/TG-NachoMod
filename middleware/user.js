'use strict';

const u = require('../users')

module.exports = function userMiddleware(msg, command, args) {
	let user = u.getUserById(msg.from.id)
	if (user) msg.user = user
	else msg.user = u.UNREGISTERED
}