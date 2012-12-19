// 
// Breeze Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

BrEvents = function(obj) {

  var _this = this;

  this.subscribers = {};
  this.obj = obj || this;

  // var queue = br.storage.get('br.events');

  this.before = function(event, callback) {
    _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
    _this.subscribers[event].before.push(callback);
  }

  this.on = function(event, callback) {
    _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
    _this.subscribers[event].on.push(callback);
  }

  this.after = function(event, callback) {
    _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
    _this.subscribers[event].after.push(callback);
  }

  function trigger(event, pos, args) {

    var result = null;

    var eventSubscribers = _this.subscribers[event];
    if (eventSubscribers) {
      switch(pos) {
        case 'before':
          for (var i in eventSubscribers.before) {
            eventSubscribers.before[i].apply(_this.obj, args);
          }
          break;
        case 'on':
          for (var i in eventSubscribers.on) {
            result = eventSubscribers.on[i].apply(_this.obj, args);
          }
          break;
        case 'after':
          for (var i in eventSubscribers.after) {
            eventSubscribers.after[i].apply(_this.obj, args);
          }
          break;
      }
    }

    return result;

  }

  function triggerEx(event, pos, largs) {

    var args = [];
    for(i = 0; i < largs.length; i++) {
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

!function (window, undefined) {

  window.br = window.br || {};

  window.br.events = new BrEvents();

}(window);
