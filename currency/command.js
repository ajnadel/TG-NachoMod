'use strict';

const currency = require('./index')
const u = require('../users')

module.exports = {
	command: 'venmo',
	handler(bot, args, msg) {
		let toRaw = args[0]
		let to = u.usersByUsername.get(toRaw) || u.users[toRaw]
		let from = u.users[msg.from.id]
		let amount = parseFloat(args[1])

		let result = currency.venmo(from, to, amount)
		bot.sendMessage(msg.chat.id, result)
	}
}