'use strict'
/* eslint-env node, es6 */

/**
 * Source module for GDAX Exchange
 * <br/><br/>
 * <div>
 * Provides
 * <ul>
 * <li>a reader that retrieves ticker data from the GDAX API, and
 * <li>a writer that prints a colorized ticker.price result using console.log.
 * </div>
 *
 * @requires lib/util
 * @requires gdax
 *
 * @module
 */

const util = require('../util')
const Source = require('gdax')

const symbol = 'BTC-USD'

/**
 * Custom initialization.
 */
const initializer = function () {
  this.initialized = true // just a placeholder
  this.client = new Source.PublicClient()
}

/**
 * Reads ticker data from source.
 * @returns {Promise} - Promise of a GDAX_Ticker
 */
const reader = function () {
  return this.client.getProductTicker(this.symbol)
}

/**
 * Writes ticker data.
 * @method
 * @param  {GDAX_Ticker} data
 */
const writer = util.printTicker

module.exports = { symbol, initializer, reader, writer }

/**
 * @typedef {object} GDAX_Ticker
 * @property {string} symbol
 * @property {number} [trade_id]
 * @property {string} price
 * @property {string} [size]
 * @property {string} [bid]
 * @property {string} [ask]
 * @property {string} [volume]
 * @property {string} [time]
 */
