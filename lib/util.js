'use strict'
/* eslint-env node, es6 */

const _ = require('lodash')
const stringify = require('json-stringify-safe')

require('colors') // extends String

_.mixin({
  isNonEmptyObject: o => _.isPlainObject(o) && !_.isEmpty(o),
  isNonEmptyArray: a => _.isArray(a) && !_.isEmpty(a),
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s),
  isPositiveNumber: n => _.isNumber(n) && n > 0
})

module.exports = { _, stringify }
