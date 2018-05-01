/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global io */

;(function (window) {

  var instance;

  function BrRabbitMQ(params) {

    var _this = this;
    var subs = [];
    var uid = 1;
    var reregister = false;

    params = params || {};
    params.host = params.host || 'localhost';
    params.port = params.port || 80;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    var socket = io.connect(params.host + ':' + params.port, { secure: true });

    socket.on('connect', function() {
      _this.events.trigger('rmq.log', 'connected');
      _this.events.trigger('rmq.connect');
      subscribe();
    });

    socket.on('disconnect', function() {
      _this.events.trigger('rmq.log', 'disconnected');
      _this.events.trigger('rmq.disconnect');
      for(var i in subs) {
        subs[i].status = 'added';
      }
    });

    socket.on('error', function(data) {
      _this.events.trigger('rmq.log', data);
      _this.events.trigger('rmq.error', data);
    });

    socket.on('RMQ/Message', function (data) {
      _this.events.trigger('rmq.log', data);
      _this.events.trigger('rmq.message', data);
      if (subs[data.uid]) {
        if (subs[data.uid].active) {
          subs[data.uid].callback.call(this, data.data);
        }
      }
    });

    socket.on('RMQ/Subscribed', function (data) {
      _this.events.trigger('rmq.log', 'subscribed', data);
      _this.events.trigger('rmq.subscribed', data);
      if (subs[data.uid]) {
        subs[data.uid].active = true;
      }
    });

    function subscribe() {
      for(var i in subs) {
        var sub = subs[i];
        if (sub.status == 'added') {
          sub.status = 'inprogress';
          socket.emit('RMQ/Subscribe', { uid: sub.uid, exchange: sub.exchange, topic: sub.topic });
        }
      }
    }

    this.subscribe = function(exchange, topic, callback) {
      var sub = { uid: uid++, exchange: exchange, topic: topic, callback: callback, status: 'added' };
      subs[sub.uid] = sub;
      subscribe();
    };

    this.sendMessage = function(exchange, data, topic) {
      socket.emit('RMQ/SendMessage', { exchange: exchange, data: data, topic: topic });
    };

    this.getSocket = function() {
      return socket;
    };

    return this;

  }

  window.br = window.br || {};

  window.br.rabbitMQ = function(params) {
    if (!instance) {
      instance = new BrRabbitMQ(params);
    }
    return instance;
  };

})(window);
