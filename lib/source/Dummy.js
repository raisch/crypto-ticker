'use strict'
/* eslint-env node, es6 */

/**
 * Example Ticker Source<br/><br/>
 *
 * <div>
 * Providing
 * <ul>
 * <li>a reader that returns a random value between 0.0 and 100.0
 * <li> a converter to convert the result to a usual ticker data type, and
 * <li>a writer that uses console.log to print a colorized ticker.price result.
 * </ul>
 * </div>
 *
 * @module
 */

module.exports = {
  /**
   * Custom initialization (Optional)
   */
  initializer: function () {
    this.intervalDelay = 1000
    this.symbol = 'UNK-USD'
  },

  /**
   * Reads ticker data from source.
   * @return {Promise} - Promise of a Dummy_Result
   */
  reader: function () {
    return new Promise((resolve, reject) => {
      resolve({
        random: Math.random() * 100
      })
    })
  },

  /**
   * Converts source data to useable format.
   * @param  {Dummy_Result} data
   * @return {Dummy_Ticker}
   */
  converter: function (data) {
    return {price: data.random}
  },

  /**
   * Writes result data.
   * @param  {Dummy_Ticker} data
   */
  writer: function (data) {
    const diff = Math.round((data.price - this.lastPrice || 0) * 100) / 100
    let change = diff.toString()
    if (diff > 0) {
      change = change.green
    } else if (diff < 0) {
      change = change.red
    }
    console.log(`${this.symbol}: ${data.price} (${change})`)
  }
}

/**
 * @typedef Dummy_Result
 * @property {number} random
 */

/**
 * @typedef Dummy_Ticker
 * @property {number} price
 */
