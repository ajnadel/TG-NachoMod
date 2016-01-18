'use strict';

const currency = require('./index')
const u = require('../users')

module.exports = {
	command: 'venmo',
	handler(bot, args, msg) {
		let toName = args[0]

		let from = msg.user
		let amount = parseFloat(args[1])

		let result = currency.venmo(from, toName, amount)
		bot.sendMessage(msg.chat.id, result)
	}, 
	desc: "Send money to other people by their username."
}