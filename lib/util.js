'use strict'
/* eslint-env node, es6 */

/**
 * Utilities
 *
 * @requires colors
 *
 * @module
 */

const _ = require('lodash')
const stringify = require('json-stringify-safe')

require('colors') // extends String

_.mixin({
  isNonEmptyObject: o => _.isPlainObject(o) && !_.isEmpty(o),
  isNonEmptyArray: a => _.isArray(a) && !_.isEmpty(a),
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s),
  isPositiveNumber: n => _.isNumber(n) && n > 0
})

/**
 * Prints colorized Ticker data to console.<br/><br/>
 * <div>
 * Expects to be bound to an instance of Ticker
 * </div>
 * @method
 * @param  {object} data
 * @property {number} data.price
 * @property {number} this.lastPrice
 * @property {string} this.symbol
 */
const printTicker = function (data) {
  const diff = Math.round((data.price - this.lastPrice || 0) * 100) / 100
  let change = diff.toString()
  if (diff > 0) {
    change = change.green
  } else if (diff < 0) {
    change = change.red
  }
  console.log(`${this.symbol}: ${data.price} (${change})`)
}

/**
 * Exported utilities.
 * @type {Object}
 * @property {object} _ - lodash
 * @property {function} stringify - json-stringify-safe
 * @property {function} printTicker - general ticker printer to console
 */
module.exports = { _, stringify, printTicker }
