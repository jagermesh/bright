/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */


(function(window) {
  window.br = window.br || {};

  function BrEventQueue(obj) {
    const _this = this;

    _this.subscribers = {};
    _this.connections = [];
    _this.obj = obj || _this;
    _this.enabled = true;

    _this.enable = function() {
      _this.enabled = true;
    };

    _this.disable = function() {
      _this.enabled = false;
    };

    function subscribe(events, action, func) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        if (!_this.subscribers[event]) {
          _this.subscribers[event] = Object.create({
            on: [],
            pause: [],
            before: [],
            after: []
          });
        }
        _this.subscribers[event][action].push(func);
      }
    }

    _this.before = function(events, func) {
      subscribe(events, 'before', func);
    };

    _this.on = function(events, func) {
      subscribe(events, 'on', func);
    };

    _this.pause = function(events, func) {
      subscribe(events, 'pause', func);
    };

    _this.after = function(events, func) {
      subscribe(events, 'after', func);
    };

    _this.off = function(events) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        delete _this.subscribers[event];
      }
    };

    _this.has = function(event, action) {
      return _this.subscribers[event] && (!action || (_this.subscribers[event][action].length > 0));
    };

    _this.connectTo = function(eventQueue) {
      _this.connections.push(eventQueue);
    };

    _this.getEvents = function() {
      let result = [];
      for (let name in _this.subscribers) {
        result.push(name);
      }
      return result;
    };

    function triggerOne(event, action, args) {
      let result = null;
      let subscribers = _this.subscribers[event];
      if (subscribers) {
        let funcs = subscribers[action];
        if (funcs) {
          for (let i = 0, length = funcs.length; i < length; i++) {
            result = funcs[i].apply(_this.obj, args);
          }
        }
      }
      return result;
    }

    function trigger(event, action, params) {
      if (_this.enabled) {
        if (event != '*') {
          _this.triggerEx('*', action, params);
        }
        let result = triggerOne(event, action, params);
        for (let i = 0, length = _this.connections.length; i < length; i++) {
          _this.connections[i].triggerEx(event, action, params);
        }
        return result;
      }
    }

    _this.triggerBefore = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'before', params);
    };

    _this.trigger = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'on', params);
    };

    _this.triggerPause = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'pause', params);
    };

    _this.triggerAfter = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'after', params);
    };

    _this.triggerCustom = function(event, action) {
      let params = Array.from(arguments);
      params.splice(0, 2);
      return trigger(event, action, params);
    };

    _this.triggerEx = function(event, action, params) {
      return trigger(event, action, params);
    };

    return _this;
  }

  window.br.eventQueue = function(obj) {
    return new BrEventQueue(obj);
  };
})(window);