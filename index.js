/*!
 * dush-methods <https://github.com/tunnckoCore/dush-methods>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

/**
 * > Plugin for [dush][], [minibase][], [base][] and anything based on them.
 * It adds `.define` and `.delegate` methods on the `app` instance.
 *
 * **Example**
 *
 * ```js
 * const dush = require('dush')
 * const methods = require('dush-methods')
 *
 * const app = dush()
 * app.use(methods())
 *
 * console.log(app.define) // => function
 * console.log(app.delegate) // => function
 * ```
 *
 * @name   methods()
 * @return {Function} a plugin function that should be passed to `.use` method
 * @api public
 */

module.exports = function dushMethods () {
  return function dushMethods (app) {
    /* istanbul ignore next */
    if (app.isRegistered && app.isRegistered('dush-methods')) {
      return
    }

    /**
     * > Add non-enumerable `prop` with a `value`.
     * It also emits a `define` event.
     *
     * **Example**
     *
     * ```js
     * app.define('foo', 123)
     * console.log(app.foo) // => 123
     *
     * app.on('define', (key, value) => {
     *   console.log('key:', key) // => 'key: foo'
     *   console.log('value:', value) // => 'value: 123'
     * })
     *
     * // or inside plugin
     * app.use((app) => {
     *   app.define('hello', (place) => console.log(`Hello ${place}!`))
     * })
     *
     * app.hello('world') // => 'Hello world!'
     * ```
     *
     * @name   .define
     * @param  {String} `prop` a name of the property
     * @param  {any} `value` any type of value
     * @return {Object} instance for chaining
     * @api public
     */

    defineProp(app, 'define', function defineProp_ (prop, value) {
      app.emit('define', prop, value)
      defineProp(app, prop, value)
      return app
    })

    /**
     * > Calls the `.define` method for each property on `props` object.
     * It also emits `delegate` event.
     *
     * **Example**
     *
     * ```js
     * // called two times
     * app.on('define', (key, value) => {
     *   console.log(key) // => `foo`, then `qux`
     *   console.log(value) // => `bar`, then `123`
     * })
     *
     * // called one time
     * app.on('delegate', (props) => {
     *   console.log('props:', props) // => { foo: 'bar', qux: 123 }
     * })
     *
     * app.delegate({
     *   foo: 'bar',
     *   qux: 123
     * })
     * ```
     *
     * @name   .delegate
     * @param  {Object} `props` an object of properties
     * @return {Object} instance for chaining
     * @api public
     */

    defineProp(app, 'delegate', function delegateProps_ (props) {
      app.emit('delegate', props)
      for (var key in props) {
        app.define(key, props[key])
      }
      return app
    })
  }
}

/**
 * > Add non-enumerable `prop` with `val` to an `obj`.
 *
 * @param  {Object} `obj`
 * @param  {String} `prop`
 * @param  {any} `val`
 * @return {Object}
 */

function defineProp (obj, prop, val) {
  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  })
}
