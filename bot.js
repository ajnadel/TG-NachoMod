'use strict';

const permission = require('./permissions')
const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = process.env.BOT_TOKEN
const USERNAME = process.env.USERNAME

let bot = new TelegramBot(BOT_TOKEN, {polling: true})
console.log('Bot loaded')

let middlewares = []

let commandMap = new Map()

module.exports = {
	register(payload) { // payload must have `command`, `handler`
		let rawCommand = payload.command
		let command = rawCommand.startsWith('/') ? rawCommand.substring(1) : rawCommand
		let handler = payload.handler

		commandMap.set('/' + command, payload.desc || "No description set for this command.")

		let commandMatcher = commandRegex(command)
		let permissionRequired = payload.permissionRequired || permission.LEVEL_USER

		bot.onText(commandMatcher, (msg, match) => {
			try { // otherwise errors will be swallowed
				let args = parseArgs(msg.text)
				middlewares.forEach(m => m(msg, command, args))

				if (msg.user.permissionLevel < permissionRequired) {
					if (msg.user.unregistered) {
						bot.sendMessage(msg.chat.id, `You must register before using /${command}!\n` + 'Try `/register`.', {parse_mode: 'Markdown'})
						return
					}
					bot.sendMessage(msg.chat.id, `Calm down and check you privilege, ${msg.user.preferredName}!`)
					return
				}

				handler(bot, args, msg, commandMap)
			} catch (e) {
				console.error('ERROR! ', e)
			}
		})

		console.log(`Loaded module '${command}'`)
	},
	middleware(m) { 
		middlewares.push(m) // function(msg, command, args)
		console.log(`Loaded middleware '${m.name}'`) // function have a .name prop!
	}
}

function commandRegex(commandText) {
	return new RegExp('^\\/' + commandText + `(@${USERNAME})?`)
}

function parseArgs(text) {
	let quoteRegex = new RegExp(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
	return text.match(quoteRegex).map((e) => { return e.replace(/(')|(")/g, "")}).slice(1)
}