'use strict'
/* eslint-env node, es6 */

const Ticker = require('./lib/Ticker')
const source = require('./lib/source/GDAX')
const symbol = 'BTC-USD'

const opts = {symbol, ...source}
const ticker = new Ticker(opts)

ticker.start()
