'use strict';

const fs = require('fs')
const LOGFILE_TRANSACTION = process.env['LOGFILE_TRANSACTION'] || logs/transactions.log

module.exports = {
	transaction(actor, action, receiver, timestampOpt) {
		let timestamp = timestampOpt || new Date()
		let message = [timestamp.valueOf(), escapeCommas(actor), escapeCommas(action), escapeCommas(receiver)].join('\t')
		fs.appendFile(LOGFILE_TRANSACTION, message)
	}
}

function escapeCommas(str) {
	return str.replace(/,/g, '\\,')
}