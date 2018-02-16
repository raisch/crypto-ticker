'use strict'
/* eslint-env node, es6 */

/**
 * Source module for GDAX Exchange<br/><br/>
 * <div>
 * Provides
 * <ul>
 * <li>a reader that retrieves ticker data from the GDAX API,
 * <li>a pass-thru converter, and
 * <li>a writer that uses console.log to print a colorized ticker.price result.
 * </div>
 *
 * @module
 */

const Source = require('gdax')
const Client = new Source.PublicClient()

/**
 * Custom initialization.
 */
const initializer = function () {
  this.initialized = true
}

/**
 * Reads ticker data from source.
 * @returns {Promise} - Promise of a GDAX_Ticker
 */
const reader = function () {
  return Client.getProductTicker(this.symbol)
}

/**
 * Converts ticker data for use.
 * @param  {GDAX_Ticker} data - ticker data
 * @return {object}
 */
const converter = function (data) {
  // result from GDAX.reader already contains a price string property
  // so just return the unmodified ticker data
  return data
}

/**
 * Writes ticker data
 * @param  {GDAX_Ticker} data
 */
const writer = function (data) {
  const diff = this.lastPrice ? Math.round((data.price - this.lastPrice) * 100) / 100 : 0
  let change = diff.toString()
  if (diff > 0) {
    change = ('+' + change).green
  } else if (diff < 0) {
    change = change.red
  }
  console.log(`${this.symbol}: ${data.price} (${change})`)
}

module.exports = { initializer, reader, converter, writer }

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
