'use strict';

module.exports = {
	command: 'ping',
	handler(bot, args, msg) {
		bot.sendMessage(msg.chat.id, 'PONG')
	}
}