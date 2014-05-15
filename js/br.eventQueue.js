/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrEvents(obj) {

    var _this = this;

    this.subscribers = {};
    this.obj = obj || this;

    this.before = function(events, callback) {
      var events = events.split(',');
      for(var i=0;i<events.length;i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].before.push(callback);
      }
    }

    this.on = function(events, callback) {
      var events = events.split(',');
      for(var i=0;i<events.length;i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].on.push(callback);
      }
    }

    this.after = function(events, callback) {
      var events = events.split(',');
      for(var i=0;i<events.length;i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].after.push(callback);
      }
    }

    function trigger(event, pos, args) {

      var result = null;
      var eventSubscribers = _this.subscribers[event];
      var i;

      if (eventSubscribers) {
        switch(pos) {
          case 'before':
            for (var i = 0; i < eventSubscribers.before.length; i++) {
              eventSubscribers.before[i].apply(_this.obj, args);
            }
            break;
          case 'on':
            for (var i = 0; i < eventSubscribers.on.length; i++) {
              result = eventSubscribers.on[i].apply(_this.obj, args);
            }
            break;
          case 'after':
            for (var i = 0; i < eventSubscribers.after.length; i++) {
              eventSubscribers.after[i].apply(_this.obj, args);
            }
            break;
        }
      }

      return result;

    }

    function triggerEx(event, pos, largs) {

      var args = [];
      for(var i = 0; i < largs.length; i++) {
        args.push(largs[i]);
      }

      if (event != '*') {
        trigger('*', pos, args);
      }

      args.splice(0,1);

      return trigger(event, pos, args);

    }

    this.triggerBefore = function(event) {
      return triggerEx(event, 'before', arguments);
    }
    this.trigger = function(event) {
      return triggerEx(event, 'on',     arguments);
    }
    this.triggerAfter = function(event) {
      return triggerEx(event, 'after',  arguments);
    }

  }

  window.br = window.br || {};

  window.br.eventQueue = function(obj) {
    return new BrEvents(obj);
  }

})(window);
