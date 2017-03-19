/*!
 * dush-methods <https://github.com/tunnckoCore/dush-methods>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var dush = require('dush')
var methods = require('./index')

var emitter = dush().use(methods())

test('should add `.define` and `.delegate` methods to dush', function (done) {
  var app = dush()
  app.use(methods())
  test.strictEqual(typeof app.define, 'function')
  test.strictEqual(typeof app.delegate, 'function')
  done()
})

test('should `.define` property to `app` instance', function (done) {
  emitter.use(methods())
  emitter.define('foo', 123)
  test.strictEqual(emitter.foo, 123)
  done()
})

test('should delegate properties to `app`', function (done) {
  emitter.delegate({
    foo: 'bar',
    qux: 123
  })
  test.strictEqual(emitter.foo, 'bar')
  test.strictEqual(emitter.qux, 123)
  done()
})

test('should emit `define` event on each `.define` call', function (done) {
  var app = dush().use(methods())
  app.on('define', function (prop, val) {
    test.strictEqual(prop, 'foo')
    test.strictEqual(val, 444)
    done()
  })
  app.define('foo', 444)
})

test('should emit `delegate` on `.delegate` call', function (done) {
  emitter.on('delegate', function (obj) {
    test.strictEqual(obj.aaa, 'bbb')
    done()
  })
  emitter.delegate({
    aaa: 'bbb'
  })
})
