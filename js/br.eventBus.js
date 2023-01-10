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

  window.br.ebsCache = window.br.ebsCache || new Map();

  class BrEventBus {
    constructor(endpointUrl) {
      const _this = this;

      _this.endpointUrl = endpointUrl;

      _this.isValid = (_this.endpointUrl && (typeof WebSocket != 'undefined'));

      _this.debugMode = false;
      _this.reconnectTimeout = 1000;
      _this.reconnectsCounter = 0;
      _this.webSocket = null;
      _this.reconnectTimer = null;
      _this.keepAliveTimer = null;
      _this.successfulConnections = 0;
      _this.clientUID = '';
      _this.knownClientUIDs = [];
      _this.userInfo = {};

      _this.events = br.eventQueue(_this);
      _this.subscriptions = br.eventQueue(_this);
      _this.spaces = br.eventQueue(_this);

      window.setTimeout(function() {
        if (_this.isValid) {
          _this.reconnect();
        } else {
          _this.events.trigger('error', 'Not configured');
        }
      }, 100);
    }

    reconnect() {
      const _this = this;

      window.clearTimeout(_this.reconnectTimer);

      let timeout = _this.reconnectsCounter * _this.reconnectTimeout;
      if (_this.debugMode && (timeout > 0)) {
        br.log(`${(_this.successfulConnections > 0 ? 're' : '')}connecting in ${timeout}ms`);
      }
      _this.reconnectTimer = window.setTimeout(function() {
        if (_this.debugMode) {
          br.log(`${(_this.successfulConnections > 0 ? 're' : '')}connecting`);
        }
        _this.connect();
      }, timeout);
    }

    publishSubscriptions() {
      if (this.webSocket && (this.webSocket.readyState == 1) && (this.subscriptions.getEvents().length > 0)) {
        let message = {
          action: 'eventBus.subscribe',
          data: {
            events: this.subscriptions.getEvents(),
            spaces: this.spaces.getEvents(),
            userInfo: this.userInfo
          }
        };
        try {
          this.webSocket.send(JSON.stringify(message));
        } catch (error) {
          this.events.trigger('error', error);
        }
      }
    }

    handleConnectionError(error) {
      if (this.webSocket) {
        try {
          this.webSocket.onopen = null;
          this.webSocket.onmessage = null;
          this.webSocket.onclose = null;
          this.webSocket.onerror = null;
          if (this.webSocket.readyState == 1) {
            this.webSocket.close();
          }
        } catch (exception) {
          //
        }
        this.webSocket = null;
      }
      this.events.trigger('error', error);
      this.events.trigger('disconnected');
      this.reconnectsCounter++;
      if (this.reconnectsCounter > 60) {
        this.reconnectsCounter = 60;
      }
      this.reconnect();
    }

    connectionClosed(event) {
      if (this.debugMode) {
        br.log(event);
      }
      window.clearInterval(this.keepAliveTimer);
      this.handleConnectionError('Connection closed');
    }

    connect() {
      const _this = this;

      try {
        _this.webSocket = new WebSocket(_this.endpointUrl);
        _this.webSocket.onopen = function(event) {
          if (_this.debugMode) {
            br.log(event);
          }
          _this.events.trigger('connected');
          _this.reconnectsCounter = 0;
          _this.successfulConnections++;
          _this.publishSubscriptions();
          _this.keepAliveTimer = window.setInterval(function() {
            _this.webSocket.send('keep-alive');
          }, 59 * 1000);
        };
        _this.webSocket.onmessage = function(event) {
          if (_this.debugMode) {
            br.log(event);
          }
          try {
            let message = $.parseJSON(event.data);
            switch (message.action) {
              case 'eventBus.registered':
                _this.setClientUID(message.clientUID);
                break;
              case 'eventBus.usersList':
                _this.spaces.trigger(message.spaceName, message.data);
                break;
              default:
                if (_this.getClientUID() && (!message.clientUID || !_this.isKnownClientUID(message.clientUID))) {
                  _this.subscriptions.trigger(message.action, message.data);
                }
                break;
            }
          } catch (exception) {
            br.log(exception);
          }
        };
        _this.webSocket.onclose = function(event) {
          _this.connectionClosed(event);
        };
        _this.webSocket.onerror = function(event) {
          _this.connectionClosed(event);
        };
      } catch (exception) {
        if (_this.debugMode) {
          br.log('exception');
          br.log(exception);
        }
        _this.handleConnectionError(exception);
      }
    }

    setClientUID(value) {
      if (value) {
        this.clientUID = value;
        this.knownClientUIDs.push(value);
        if (this.debugMode) {
          br.log('Known clientUIDs', this.knownClientUIDs);
        }
        this.events.trigger('registered', value);
        return;
      }
      this.events.trigger('unregistered');
    }

    getClientUID() {
      return this.clientUID;
    }

    isKnownClientUID(value) {
      return this.knownClientUIDs.indexOf(value) != -1;
    }

    on(event, callback) {
      if ((event == 'connected') && this.webSocket && (this.webSocket.readyState == 1)) {
        callback();
      }
      if ((event == 'registered') && this.clientUID) {
        callback(this.clientUID);
      }
      this.events.on(event, callback);
    }

    off(event) {
      this.events.off(event);
    }

    offAll() {
      this.events = br.eventQueue(this);
    }

    subscribe(event, callback) {
      this.subscriptions.on(event, callback);
      this.publishSubscriptions();
    }

    unsubscribe(event) {
      this.subscriptions.off(event);
    }

    unsubscribeAll() {
      this.subscriptions.subscribers = {};
    }

    joinSpace(spaceName, userInfo, callback) {
      this.userInfo = userInfo;
      this.spaces.on(spaceName, callback);
      this.publishSubscriptions();
    }
  }

  window.br.eventBus = function(endpointUrl) {
    if (window.br.ebsCache.has(endpointUrl)) {
      return window.br.ebsCache.get(endpointUrl);
    } else {
      let ebs = new BrEventBus(endpointUrl);
      window.br.ebsCache.set(endpointUrl, ebs);
      return ebs;
    }
  };
})(window);