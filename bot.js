'use strict';

const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = process.env['BOT_TOKEN']
const USERNAME = process.env['USERNAME']

let bot = new TelegramBot(BOT_TOKEN, {polling: true})
console.log('Bot loaded')

// bot.getMe().then()

module.exports = {
	register(payload) { // payload must have `command`, `handler`
		let rawCommand = payload.command
		let command = rawCommand.startsWith('/') ? rawCommand.substring(1) : rawCommand
		let handler = payload.handler

		let commandMatcher = commandRegex(command)
		bot.onText(commandMatcher, (msg, match) => {
			let args = msg.text.split(' ').slice(1)
			handler(bot, args, msg)
		})

		console.log(`Loaded module '${command}'`)
	}
}

function commandRegex(commandText) {
	return new RegExp('^\\/' + commandText + `(@${USERNAME})?`)
}