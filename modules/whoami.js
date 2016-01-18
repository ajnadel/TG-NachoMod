'use strict';

module.exports = {
	command: 'whoami',
	handler(bot, args, msg) {
		console.log(msg)
		bot.sendMessage(msg.chat.id, `*First Name:* ${msg.from.first_name}\n*Last Name:* ${msg.from.last_name || "n/a"}\n*Username* ${msg.from.username || "No username specified."}\n*ID:* ${msg.from.id}`, {parse_mode: "Markdown"})
	}
}