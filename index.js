'use strict';

require('dotenv').load() // :)

let botRunner = require('./bot')

botRunner.register(require('./modules/ping'))
botRunner.register(require('./modules/whoami'))
botRunner.register(require('./currency/command'))
botRunner.register(require('./users/register'))
botRunner.register(require('./modules/reddit'))
botRunner.register(require('./modules/bench'))
botRunner.register(require('./modules/clear'))
botRunner.register(require('./modules/help'))
botRunner.register(require('./modules/echo'))