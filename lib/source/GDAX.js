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

const Client = new Source.PublicClient()

/**
 * Custom initialization.
 */
const initializer = function () {
  this.initialized = true // just a placeholder
}

/**
 * Reads ticker data from source.
 * @returns {Promise} - Promise of a GDAX_Ticker
 */
const reader = function () {
  return Client.getProductTicker(this.symbol)
}

/**
 * Writes ticker data.
 * @method
 * @param  {GDAX_Ticker} data
 */
const writer = util.printTicker

module.exports = { initializer, reader, writer }

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
