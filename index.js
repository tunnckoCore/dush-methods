/*!
 * dush-methods <https://github.com/tunnckoCore/dush-methods>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

module.exports = function dushMethods () {
  return function dushMethods (app) {
    defineProp(app, 'define', function defineProp_ (prop, value) {
      app.emit('define', prop, value)
      defineProp(app, prop, value)
      return app
    })
    defineProp(app, 'delegate', function delegateProps_ (props) {
      app.emit('delegate', props)
      for (var key in props) {
        app.define(key, props[key])
      }
      return app
    })
  }
}

function defineProp (obj, prop, val) {
  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  })
}
