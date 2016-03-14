/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrThread(lazy) {

    var _this = this;

    _this.queue = [];
    _this.workingQueue = [];
    _this.lazy = lazy;

    this.push = function(func) {
      _this.queue.unshift({ func: func });
      _this.wakeup();
    };

    this.done = function(func) {
      _this.workingQueue.pop();
      _this.wakeup();
    };

    this.clear = function(func) {
      _this.queue = [];
      _this.workingQueue = [];
    };

    this.wakeup = function() {
      if ((_this.queue.length > 0) && (_this.workingQueue.length === 0)) {
        var obj = _this.queue.pop();
        _this.workingQueue.push(obj);
        obj.func(function() {
          _this.done();
        });
      }
    };

  }

  window.br = window.br || {};

  window.br.thread = function(lazy) {
    return new BrThread(lazy);
  };

  var executionThread = br.thread(true);

})(window);
