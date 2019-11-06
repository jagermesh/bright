/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global WebSocket */

;(function (window) {

  window.br = window.br || Object.create({});

  function BrEventBus(endpointUrl) {

    const _this = this;

    _this.events        = br.eventQueue(_this);
    _this.subscriptions = br.eventQueue(_this);

    _this.clientUIDs = [];
    _this.actions    = {};

    const debugMode = false;
    const reconnectTimeout = 1000;
    const isValid = (endpointUrl && (typeof WebSocket != 'undefined'));

    let webSocket;
    let reconnectsCounter = 0;
    let reconnectTimer;
    let successfulConnections = 0;

    function reconnect() {
      window.clearTimeout(reconnectTimer);
      let timeout = reconnectsCounter*reconnectTimeout;
      if (debugMode && (timeout > 0)) {
        br.log((successfulConnections > 0 ? 're' : '') + 'connecting in ' + timeout + 'ms');
      }
      reconnectTimer = window.setTimeout(function() {
        if (debugMode) {
          br.log((successfulConnections > 0 ? 're' : '') + 'connecting');
        }
        connect();
      }, timeout);
    }

    function subscribe() {
      if (webSocket && (webSocket.readyState == 1) && (_this.subscriptions.getEvents().length > 0)) {
        let message = { action: 'eventBus.subscribe'
                      , data: { events: _this.subscriptions.getEvents() }
                      };
        try {
          webSocket.send(JSON.stringify(message));
        } catch (error) {
          _this.events.trigger('error', error);
        }
      }
    }

    function handleConnectionError(error) {
      if (webSocket) {
        try {
          webSocket.onopen    = null;
          webSocket.onmessage = null;
          webSocket.onclose   = null;
          webSocket.onerror   = null;
          if (webSocket.readyState == 1) {
            webSocket.close();
          }
        } catch (exception) {

        }
        webSocket = null;
      }
      _this.events.trigger('error', error);
      _this.events.trigger('disconnected');
      reconnectsCounter++;
      if (reconnectsCounter > 60) {
        reconnectsCounter = 60;
      }
      reconnect();
    }

    function connect() {
      try {
        webSocket = new WebSocket(endpointUrl);
        webSocket.onopen = function(event) {
          if (debugMode) {
            br.log(event);
          }
          _this.events.trigger('connected');
          reconnectsCounter = 0;
          successfulConnections++;
          subscribe();
        };
        webSocket.onmessage = function (event) {
          if (debugMode) {
            br.log(event);
          }
          try {
            let message = $.parseJSON(event.data);
            if (message.action == 'eventBus.registered') {
              _this.addClientUID(message.clientUID);
              _this.events.trigger('registered', message.clientUID);
            } else
            if (!message.clientUID || (_this.clientUIDs.indexOf('UID:' + message.clientUID) == -1)) {
              _this.subscriptions.trigger(message.action, message.data);
            }
          } catch (exception) {
            br.log(exception);
          }
        };
        webSocket.onclose = function(event) {
          if (debugMode) {
            br.log(event);
          }
          handleConnectionError('Connection closed');
        };
        webSocket.onerror = function(event) {
          if (debugMode) {
            br.log(event);
          }
          handleConnectionError('Connection closed');
        };
      } catch (exception) {
        if (debugMode) {
          br.log('exception');
          br.log(exception);
        }
        handleConnectionError(exception);
      }
    }

    _this.isValid = function() {
      return isValid;
    };

    _this.addClientUID = function(clientUID) {
      this.clientUIDs[this.clientUIDs.length] = 'UID:' + clientUID;
    };

    _this.on = function(event, callback) {
      if (webSocket && (webSocket.readyState == 1) && (event == 'connected')) {
        callback();
      } else {
        _this.events.on(event, callback);
      }
    };

    _this.off = function(event) {
      _this.events.off(event);
    };

    _this.offAll = function(event) {
      _this.events = br.eventQueue(_this);
    };

    _this.subscribe = function(event, callback) {
      _this.subscriptions.on(event, callback);
      subscribe();
    };

    _this.unsubscribe = function(event) {
      _this.subscriptions.off(event);
    };

    _this.unsubscribeAll = function(event) {
      _this.subscriptions.subscribers = {};
    };

    window.setTimeout(function() {
      if (_this.isValid()) {
        reconnect();
      } else {
        _this.events.trigger('error', 'Not configured');
      }
    }, 100);

    return this;

  }

  let eventBus;

  window.br.eventBus = function(endpointUrl) {
    return new BrEventBus(endpointUrl);
  };

})(window);