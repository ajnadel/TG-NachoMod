'use strict';

const users = require('../users').users
const logger = require('../logger')
const permission = require('../permissions')

module.exports = {
	command: 'whoami',
	handler(bot, args, msg) {
		let response = `<b>First Name:</b> ${msg.from.first_name}\n`
		response += `<b>Last Name:</b> ${msg.from.last_name || "n/a"}\n`
		response += `<b>Username:</b> ${msg.from.username || "No username specified."}\n`
		response += `<b>ID:</b> ${msg.from.id}\n`
		response += `<b>Permission Level:</b> ${msg.user.permissionLevel}\n`

		if (msg.user.unregistered) {
			response += 'You are not registered. Try <code>/register</code> to get started.'
		} else {
			let user = users[msg.from.id]
			response += `<b>Balance:</b> ${user.balance}\n`
			response += `<i>You ${user.banned?'are':'are not'} banned.</i>`
		}

		logger.transaction(msg.from.id, 'ran whoami')

		bot.sendMessage(msg.chat.id, response, {parse_mode: "HTML"})
	},
	desc: "Sends all the information we have about you.",
	permission: permission.LEVEL_UNREGISTERED
}
