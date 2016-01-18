'use strict';

const fs = require('fs')
const LOGFILE_TRANSACTION = process.env['LOGFILE_TRANSACTION'] || 'logs/transactions.log'

module.exports = {
	transaction(actor, action, receiver, timestampOpt) {
		let timestamp = timestampOpt || new Date()
		let message = [timestamp.valueOf(),
			escapeCommas(String(actor) || ''),
			escapeCommas(String(action) || ''),
			escapeCommas(String(receiver) || '')].join(',')
		fs.appendFile(LOGFILE_TRANSACTION, message + '\n')
	}
}

function escapeCommas(str) {
	return str.replace(/,/g, '\\,')
}