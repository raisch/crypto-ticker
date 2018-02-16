'use strict'
/* eslint-env node, es6 */

const util = require('../util')

const axios = require('axios')

const symbol = 'USDT-BTC'

module.exports = {
  symbol,

  initializer: function () {
    this.api_url = `https://bittrex.com/api/v1.1/public/getticker?market=${this.symbol}`
  },

  reader: function () {
    return axios.get(this.api_url).then(res => {
      // console.log(util.stringify(res.data, null, 2))
      return res.data
    })
  },

  converter: function (data) {
    return {price: data.result.Last}
  },

  writer: util.printTicker
}
