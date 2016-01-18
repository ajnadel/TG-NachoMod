'use strict';

module.exports = {
	command: 'clear',
	handler(bot, args, msg) {
		bot.sendMessage(msg.chat.id, `.${'\n'.repeat(80)}.`)
	},
	desc: "Clears screen."
}