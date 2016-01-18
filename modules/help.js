'use strict';

module.exports = {
	command: 'help',
	handler(bot, args, msg, cmdmap) {
		var text = "";
		cmdmap.forEach((a, b) => {
			text += `*${b}* - ${a}\n`
		}, cmdmap);
		bot.sendMessage(msg.chat.id, text, {parse_mode: "Markdown"})
	},
	desc: "Shows a list of commands."
}