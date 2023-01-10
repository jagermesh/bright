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

  class BrEventQueue {
    constructor(owner) {
      this.subscribers = {};
      this.connections = [];
      this.owner = owner || this;
      this.enabled = true;
    }

    enable() {
      this.enabled = true;
    }

    disable() {
      this.enabled = false;
    }

    subscribe(events, action, func) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        if (!this.subscribers[event]) {
          this.subscribers[event] = {
            on: [],
            pause: [],
            before: [],
            after: []
          };
        }
        this.subscribers[event][action].push(func);
      }
    }

    before(events, func) {
      this.subscribe(events, 'before', func);
    }

    on(events, func) {
      this.subscribe(events, 'on', func);
    }

    pause(events, func) {
      this.subscribe(events, 'pause', func);
    }

    after(events, func) {
      this.subscribe(events, 'after', func);
    }

    off(events) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        delete this.subscribers[event];
      }
    }

    has(event, action) {
      return this.subscribers[event] && (!action || (this.subscribers[event][action].length > 0));
    }

    connectTo(eventQueue) {
      this.connections.push(eventQueue);
    }

    getEvents() {
      let result = [];
      for (let name in this.subscribers) {
        result.push(name);
      }
      return result;
    }

    triggerOne(event, action, args) {
      let result = null;
      let subscribers = this.subscribers[event];
      if (subscribers) {
        let funcs = subscribers[action];
        if (funcs) {
          for (let i = 0, length = funcs.length; i < length; i++) {
            result = funcs[i].apply(this.owner, args);
          }
        }
      }
      return result;
    }

    triggerEventActionWithParams(event, action, params) {
      if (this.enabled) {
        if (event != '*') {
          this.triggerEx('*', action, params);
        }
        let result = this.triggerOne(event, action, params);
        for (let i = 0, length = this.connections.length; i < length; i++) {
          this.connections[i].triggerEx(event, action, params);
        }
        return result;
      }
    }

    triggerBefore(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return this.triggerEventActionWithParams(event, 'before', params);
    }

    trigger(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return this.triggerEventActionWithParams(event, 'on', params);
    }

    triggerPause(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return this.triggerEventActionWithParams(event, 'pause', params);
    }

    triggerAfter(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return this.triggerEventActionWithParams(event, 'after', params);
    }

    triggerCustom(event, action) {
      let params = Array.from(arguments);
      params.splice(0, 2);
      return this.triggerEventActionWithParams(event, action, params);
    }

    triggerEx(event, action, params) {
      return this.triggerEventActionWithParams(event, action, params);
    }
  }

  window.br.eventQueue = function(owner) {
    return new BrEventQueue(owner);
  };
})(window);