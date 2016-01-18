'use strict';

const permission = require('../permissions')

module.exports = {
	command: 'bench',
	handler(bot, args, msg) {
		bot.sendMessage(msg.chat.id, Date.now().valueOf())
	},
	desc: "Sends the current timestamp.",
	permissionRequired: permission.LEVEL_ADMIN
}