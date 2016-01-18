'use strict';

let p = require('../permissions')
let exec = require('child_process').exec

module.exports = {
	command: 'update',
	permissionRequired: p.LEVEL_ADMIN,
	handler(bot, args, msg) {
		exec('git pull');
	},
	desc: "Update the bot."
}