'use strict'
/* eslint-env node, es6 */

/**
 * Bittrex runner for Ticker.
 *
 * @requires module:https://www.npmjs.com/package/axios
 *
 * @module
 */

const axios = require('axios')

/**
 * Exchange printable name.
 * @type {String}
 */
const exchange = 'BITTREX'

/**
 * Exchange Symbol.
 * @type {String}
 */
const symbol = 'USDT-BTC'

module.exports = {
  exchange,
  symbol,

  /**
   * Custom initializer.
   * @method
   */
  initializer: function () {
    this.api_url = `https://bittrex.com/api/v1.1/public/getticker?market=${this.symbol}`
  },

  /**
   * Reader function.
   * @return {Promise} Promise of retrieved data.
   * @method
   */
  reader: function () {
    return axios.get(this.api_url).then(res => {
      // console.log(util.stringify(res.data, null, 2))
      return res.data
    })
  },

  /**
   * Converter function.
   * @param  {Object} data
   * @return {Object}
   * @method
   */
  converter: function (data) {
    return {price: data.result.Last}
  }
}
