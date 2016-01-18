'use strict';

const logger = require('../logger')

const CURRENCY_NAME = 'dineros'

const u = require('../users')
const users = u.users

module.exports = {
	CURRENCY_NAME,
	venmo(from, toName, amount) {
		let to = u.usersByUsername.get(toName) || u.users[toName]
		if (!to) return `no user ${toName}`

		if (amount <= 0) return `You cannot send <= 0 ${CURRENCY_NAME}`

		if (!from) return 'You don\'t exist! Try /register.'
		if (from.balance < amount) return 'not enough $$'

		from.balance -= amount
		to.balance += amount
		u.triggerSave()

		logger.transaction(from.preferredName,
			`venmo'd ${amount} ${CURRENCY_NAME}`,
			to.preferredName)
		return `venmo'd ${amount} ${CURRENCY_NAME} to ${to.preferredName}`
	}
}