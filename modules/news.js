'use strict';

let Watcher = require('rss-watcher');
let RSS_LINK = 'http://www.npr.org/rss/rss.php?id=1001'
let newsEnabled = false;
let w = new Watcher(RSS_LINK);

let chatIDs = []

w.on('new article', (a) => {
	if (newsEnabled) {
		chatIDs.forEach((id) => {
			bot.sendMessage(id, "New article: " + a.toString())
		}) //send a message to each chat id
	}
})

w.on("error", (error) => {
	console.log(error)
})

module.exports = {
	command: 'news',
	handler(bot, args, msg) {
		if (!newsEnabled) {
			newsEnabled = true;
			chatIDs.push(msg.chat.id)
			bot.sendMessage(msg.chat.id, "Enabled news")
		} else {
			newsEnabled = false;
			bot.sendMessage(msg.chat.id, "Disabled news")
			chatIDs.splice(chatIDs.indexOf(msg.chat.id), 1)
		}
	}, 
	desc: "Toggles news updates."
}