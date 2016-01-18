'use strict';

module.exports = {
	command: 'ping',
	handler: (bot, args, msg) => {
		console.log(msg)
		bot.sendMessage(msg.chat.id, 'PONG')
	}
}