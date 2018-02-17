'use strict'
/* eslint-env node, es6 */

const EventEmitter = require('events')
const {_, stringify, printTicker} = require('./util')

/**
 * Ten Seconds in millis.
 * @type {number}
 */
const TEN_SECONDS = 10 * 1000

/**
 * Ticker class.
 *
 * @property {string} symbol - symbol to retrieve
 * @property {function} reader - reads data from source
 * @property {function} [converter] - converts source data
 * @property {function} writer - writes result
 * @property {number} [intervalDelay = TEN_SECONDS] - delay (is ms) between API calls to source
 * @property {number} [lastTs = 0] - timestamp of last API read call to source
 *
 * @extends EventEmitter
 */
class Ticker extends EventEmitter {
  /**
   * @constructor
   * @param  {Object} [opts={}]
   */
  constructor (opts = {}) {
    super()

    if (!_.isPlainObject(opts)) {
      throw new Error('opts must be an object')
    }

    this.init(opts)

    if (!_.isNonEmptyString(this.symbol)) {
      throw new Error('requires a symbol')
    }

    if (!_.isPositiveNumber(this.intervalDelay)) {
      throw new Error('requires an intervalDelay')
    }

    /**
     * Event to trigger data retrieval from source.
     * @event Ticker#GetData
     */
    this.on('GetData', this.onGetData)
    /**
     * Event to convert data.
     * @event Ticker#ConvertData
     * @type {object}
     */
    this.on('ConvertData', this.onConvertData)
    /**
     * Event to display data.
     * @event Ticker#WriteData
     * @type {object}
     */
    this.on('WriteData', this.onWriteData)
    /**
     * Event to cleanup.
     * @event Ticker#Complete
     */
    this.on('Complete', this.onComplete)
    /**
     * Event to report errors.
     * @event Ticker#Error
     */
    this.on('Error', this.onError)
  }

  /**
   * Initializes ticker.
   * @param  {object} opts
   * @return {this}
   */
  init (opts) {
    _.merge(this, {
      intervalDelay: TEN_SECONDS,
      lastTs: 0,
      lastPrice: 0,
      writer: printTicker // default
    }, opts)

    if (_.isFunction(this.initializer)) {
      this.initializer = this.initializer.bind(this)
      this.initializer()
    }

    return this
  }

  /**
   * Setter for reader.
   * @param  {function} func - reader func
   */
  set reader (func) {
    if (!_.isFunction(func)) {
      throw new Error('requires a reader function')
    }
    this._reader = func.bind(this)
  }

  /**
   * Reads data from source using this._reader.
   * @return {Promise}
   */
  read () {
    if (!_.isFunction(this._reader)) {
      throw new Error('requires a reader')
    }
    return this._reader()
  }

  /**
   * Setter for converter.
   * @param  {function} func - converter func
   */
  set converter (func) {
    if (!_.isFunction(func)) {
      throw new Error('requires a converter function')
    }
    this._converter = func.bind(this)
  }

  /**
   * Converts data using this._converter.
   * @param  {object} data
   * @return {object}
   */
  convert (data) {
    if (!_.isFunction(this._converter)) {
      return data
    }
    if (!_.isNonEmptyObject(data)) {
      throw new Error('requires data')
    }
    return this._converter(data)
  }

  /**
   * Setter for writer.
   * @param  {function} func - writer func
   */
  set writer (func) {
    if (!_.isFunction(func)) {
      throw new Error('requires a writer function')
    }
    this._writer = func.bind(this)
  }

  /**
   * Writes data using this._writer.
   * @param  {object} data
   */
  write (data) {
    if (!_.isNonEmptyObject(data)) {
      throw new Error('data must be an object')
    }
    if (!_.isFunction(this._writer)) {
      throw new Error('requires a writer')
    }
    this._writer(data)
  }

  /**
   * Prints errors to console.
   * @param  {string} e - error string
   */
  onError (e) {
    console.error(`ERROR: ${e}`)
  }

  /**
   * Retrieves data using this.read.
   * @fires Ticker#Error
   * @fires Ticker#Convert
   */
  onGetData () {
    this.read()
      .then(result => {
        if (!_.isNonEmptyObject(result)) {
          this.emit('Error', `reader did not return expected result: ${stringify(result)}`)
          return
        }
        this.emit('ConvertData', result)
      })
      .catch(e => this.emit('Error', e))
  }

  /**
   * Converts data using this._converter.
   * @param  {object} ticker
   * @emits Error
   * @emits Display
   */
  onConvertData (data) {
    if (!_.isNonEmptyObject(data)) {
      this.emit('Error', 'requires a data object')
      return
    }
    const result = this.convert(data)
    if (!_.isNonEmptyObject(result)) {
      this.emit('Error', 'requires a result object')
      return
    }
    this.emit('WriteData', result)
  }

  /**
   * Writes data using this._writer.
   * @param  {isNonEmptyObject} data
   * @emits Complete
   */
  onWriteData (data) {
    if (!_.isNonEmptyObject(data)) {
      this.emit('Error', 'requires a data object')
      return
    }
    const ts = Date.now()
    data.symbol = this.symbol
    this.write(data)
    this.lastTs = ts
    this.emit('Complete', data)
  }

  /**
   * Performs any post write housekeeping.
   * @param  {object} data
   * @emits Error
   */
  onComplete (data) {
    if (!_.isNonEmptyObject(data)) {
      this.emit('Error', 'requires a data object')
      return
    }
    this.lastPrice = data.price
  }

  /**
   * Reads, converts, writes, and repeats using intervalDelay
   */
  start () {
    this.emit('GetData')
    this.interval = setInterval(() => this.emit('GetData'), this.intervalDelay)
  }
}

module.exports = Ticker
