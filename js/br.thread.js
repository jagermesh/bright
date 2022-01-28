/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrThread(lazy) {
    const _this = this;

    _this.queue = [];
    _this.workingQueue = [];
    _this.lazy = lazy;

    _this.push = function(func) {
      _this.queue.unshift({
        func: func
      });
      if (!_this.lazy) {
        _this.wakeup();
      }
    };

    _this.done = function() {
      _this.workingQueue.pop();
      _this.wakeup();
    };

    this.clear = function() {
      _this.queue = [];
      _this.workingQueue = [];
    };

    this.wakeup = function() {
      if ((_this.queue.length > 0) && (_this.workingQueue.length === 0)) {
        let obj = _this.queue.pop();
        _this.workingQueue.push(obj);
        obj.func(function() {
          _this.done();
        });
      }
    };
  }

  window.br.thread = function(lazy) {
    return new BrThread(lazy);
  };
})(window);