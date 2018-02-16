'use strict'
/* eslint-env node, es6 */

/**
 * Example runner for Ticker.
 *
 * @requires module:lib/source/GDAX
 *
 * @module
 */

/**
 * Ticker Class.
 * @type {Ticker}
 */
const Ticker = require('./lib/Ticker')

/**
 * Ticker Source.
 * @type {Object}
 */
const source = require('./lib/source/GDAX')

/**
 * Ticker Symbol.
 * @type {String}
 */
const symbol = 'BTC-USD'

/**
 * Creates and starts a new {@link Ticker} using {symbol, ...source}.
 * @method
 */
function start () {
  const opts = {symbol, ...source}
  const ticker = new Ticker(opts)
  ticker.start()
}

start()
