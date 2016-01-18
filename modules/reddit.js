'use strict';

let request = require('request')

function getSubredditPost(cb, subreddit, sort, t){
	var sort = sort || "";
	var t = t || "";
	request.get(`http://www.reddit.com/r/${subreddit}/${sort}.json?t=${t}`, (e, r, b) => {
		if (!JSON.parse(b).data) {
			return cb(null, "Something went wrong accessing the Reddit API")
		}
		cb(JSON.parse(b).data.children.filter((p) => {
			return !p.data.stickied
		})[0].data)
	})
}

module.exports = {
	command: 'reddit',
	handler(bot, args, msg) {
		let sub = args[0] || ""
		args[1] = args[1] || ""
		let sort = args[1].split('/')[0]
		let t = args[1].split('/')[1] || ''
		getSubredditPost((p, e) => {
			if (e) {
				return bot.sendMessage(msg.chat.id, "Error: " + e, {parse_mode: "Markdown"})
			}
			bot.sendMessage(msg.chat.id, `*${p.title}* - ${p.score} votes\n---\n[${p.url}](${p.url})`, {parse_mode: "Markdown"})
		}, sub, sort, t)
	}
}