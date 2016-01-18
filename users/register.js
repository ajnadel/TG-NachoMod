'use strict';

const u = require('./index')
const users = u.users
const currency = require('../currency')
const logger = require('../logger')

const STARTING_BALANCE = 100

module.exports = {
	command: 'register',
	handler(bot, args, msg) {
		let result = (() => {
			if (msg.from.id in users) return `${users[msg.from.id].preferredName} is already registered!`

			u.registerUser(msg.from, {registeredAt: Date.now(), balance: STARTING_BALANCE})
			logger.transaction('server', 'registered', msg.from.id)
			return `${users[msg.from.id].preferredName} has been registered,
			and given ${STARTING_BALANCE} ${currency.CURRENCY_NAME} to start with!`
		})()
		bot.sendMessage(msg.chat.id, result)
	}
}