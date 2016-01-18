'use strict';

const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = process.env['BOT_TOKEN']
const USERNAME = process.env['USERNAME']

let bot = new TelegramBot(BOT_TOKEN, {polling: true})
console.log('Bot loaded')

let commandMap = new Map()

module.exports = {
	register(payload) { // payload must have `command`, `handler`
		let rawCommand = payload.command
		let command = rawCommand.startsWith('/') ? rawCommand.substring(1) : rawCommand
		let handler = payload.handler

		commandMap.set('/' + command, payload.desc || "No description set for this command.")

		let commandMatcher = commandRegex(command)
		bot.onText(commandMatcher, (msg, match) => {
			let args = parseArgs(msg.text)
			
			try {
				handler(bot, args, msg, commandMap)
			} catch (e) {
				console.error('ERROR! ', e)
			}
		})

		console.log(`Loaded module '${command}'`)
	}
}

function commandRegex(commandText) {
	return new RegExp('^\\/' + commandText + `(@${USERNAME})?`)
}

function parseArgs(text) {
	let quoteRegex = new RegExp(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
	let val = text.match(quoteRegex).map((e) => { return e.replace(/(')|(")/g, "")}).slice(1)
	console.log(val)
	return val
}