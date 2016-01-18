'use strict';

require('dotenv').load() // :)

let botRunner = require('./bot')

botRunner.register(require('./modules/ping'))