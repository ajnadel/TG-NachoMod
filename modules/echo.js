'use strict';

module.exports = {
	command: 'echo',
	handler(bot, args, msg) {
		bot.sendMessage(msg.chat.id, args.toString())
	},
	desc: "Sends what you just sent it."
}