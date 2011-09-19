/*!
 * publisher.js - (c) Ryan Florence 2011
 * github.com/rpflorence/publisher.js
 * MIT License
*/

define(function () {

  var publisher = function (obj){
    var channels = {};
    obj = obj || {};

    // ## publisher method: subscribe
    obj.subscribe = function (channel, handler, context){
      // alternate signatures
      if (channel instanceof Array || channel.toString() == "[object Array]"){
        for (var i = 0, l = channel.length; i < l; i++) this.subscribe(channel[i], handler);
        return;
      }

      if (typeof channel === 'object'){
        for (var key in channel) this.subscribe(key, channel[key]);
        return;
      }

      if (typeof handler === 'object'){
        context = handler;
        handler = context[channel];
      }

      var reference = {
        fn: handler,
        context: (context || obj)
      };

      if (!channels[channel]) channels[channel] = [];

      return ({
        // ## subscription method: attach
        attach: function () {
          channels[channel].push(reference);
          return this;
        },

        // ## subscription method: detach
        detach: function () {
          erase(channels[channel], reference);
          return this;
        }
      }).attach();
    };

    var defaultPattern = /^:/;
    obj.subscriber = function (subscriber, pattern) {
      pattern = pattern || defaultPattern;
      for (var method in subscriber)
        if (method.match(pattern))
          obj.subscribe(method.replace(pattern, ''), subscriber[method], subscriber);
    };

    // ## publisher method: publish
    obj.publish = function (channel){
      if (!channels[channel]) return false;

      var args = [].slice.call(arguments, 1);

      for (var i = 0, l = channels[channel].length; i < l; i++) {
        channels[channel][i].fn.apply(channels[channel][i].context, args);
      }

      return channels[channel];
    };

    return obj;
  };

  publisher.advise = function (obj){

    var befores = {},
        afters = {};

    var wrapBefore = function (method) {
      var previous = obj[method];
      if (!previous) error("Object has no method " + method, obj);
      befores[method] = [];
      obj[method] = function () {
        for (var i = 0, l = befores[method].length, args; i < l; i++){
          args = slice.call(arguments, 0);
          args.unshift(befores[method][i], obj);
          publisher.publish.apply(publisher, args);
        }
        return previous.apply(obj, arguments);
      };
    };

    var wrapAfter = function (method) {
      var previous = obj[method];
      if (!previous) error("Object has no method " + method, obj);
      afters[method] = [];
      obj[method] = function () {
        var returns = previous.apply(obj, arguments);
        for (var i = 0, l = afters[method].length, args; i < l; i++){
          args = slice.call(arguments, 0);
          args.unshift(afters[method][i], obj, returns);
          publisher.publish.apply(publisher, args);
        }
        return returns;
      };
    };

    return {
      before: function (method, channel) {
        if (typeof method !== 'string'){
          for (var i in method) this.before(i, method[i]);
          return this;
        }
        if (!befores[method]) wrapBefore(method);
        befores[method].push(channel);
        return this;
      },

      after: function (method, channel) {
        if (typeof method !== 'string'){
          for (var i in method) this.after(i, method[i]);
          return this;
        }
        if (!afters[method]) wrapAfter(method);
        afters[method].push(channel);
        return this;
      }
    };
  };

  var slice = [].slice;

  var erase = function (arr, item) {
    for (var i = 0, l = arr.length; i < l; i++){
      if (arr[i] === item) arr.splice(i, 1);
    }
  };

  var error = function (msg, obj){
    if (console && console.error){
      console.error(msg, obj);
    } else {
      throw new Error(msg);
    }
  };

  publisher.version = '1.3.0';

  // The publisher function is itself a publisher
  return publisher(publisher);
});
