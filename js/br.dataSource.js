/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataSource(restServiceUrl, options) {

    const _this = this;

    _this.options = options || Object.create({});
    _this.options.restServiceUrl = restServiceUrl;
    _this.options.restServiceUrlNormalized = restServiceUrl;
    _this.options.refreshDelay = _this.options.refreshDelay || 1500;

    if (!restServiceUrl.match(/[.]json$/) && !restServiceUrl.match(/\/$/)) {
      _this.options.restServiceUrlNormalized = restServiceUrl + '/';
    }

    _this.ajaxRequest = null;
    _this.name = '-';
    _this.clientUID = null;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    let selectOperationCounter = 0;
    let refreshTimeout;
    let requestHeaders = { };

    if (br.request.csrfToken) {
      requestHeaders['X-Csrf-Token'] = br.request.csrfToken;
    }

    _this.getClientUID = function() {

      if (!_this.clientUID) {
        _this.clientUID = Math.round(Math.random() * 100000);
      }

      return _this.clientUID;

    };

    _this.setClientUID = function(clientUID) {

      _this.clientUID = clientUID;

    };


    _this.doingSelect = function() {

      return selectOperationCounter > 0;

    };

    _this.requestInProgress = function() {

      return (_this.ajaxRequest !== null);

    };

    _this.abortRequest = function() {

      if (_this.ajaxRequest !== null) {
        _this.ajaxRequest.abort();
      }

      return this;

    };

    _this.insert = function(item, callback, options) {

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = item;

        try {

          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options);
            _this.events.triggerBefore('insert', request, options);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'put';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          for(let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'PUT'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     let result, errorMessage;
                     if (response) {
                       result = true;
                     } else {
                       result = false;
                       errorMessage = 'Empty response. Was expecting new created records with ROWID.';
                     }
                     if (result) {
                       resolve({request: request, options: options, response: response});
                     } else {
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({request: request, options: options, errorMessage: errorMessage});
        }

      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('insert', data.response, data.request, data.options);
            _this.events.triggerAfter('insert', true, data.response, data.request, data.options);
            _this.events.trigger('change', 'insert', data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'insert', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('insert', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.update = function(rowid, item, callback, options) {

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = item;

        try {

          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options);
            _this.events.triggerBefore('update', request, options, rowid);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'post';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          for(let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     let operation = 'update';
                     if (response) {
                       let res = _this.events.trigger('removeAfterUpdate', item, response);
                       if ((res !== null) && res) {
                         operation = 'remove';
                       }
                     }
                     resolve({operation: operation, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({request: request, options: options, errorMessage: errorMessage});
        }

      }).then(function(data) {
        try {
          try {
            if (!disableEvents) {
              _this.events.trigger(data.operation, data.response, data.request, data.options);
              _this.events.triggerAfter(data.operation, true, data.response, data.request, data.options);
              _this.events.trigger('change', data.operation, data.response, data.request, data.options);
            }
            if (typeof callback == 'function') {
              callback.call(_this, true, data.response, data.request, data.options);
            }
          } catch (error) {
            if (typeof callback == 'function') {
              callback.call(_this, false, error, data.request, data.options);
            }
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'update', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('update', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.remove = function(rowid, callback, options) {

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = Object.create({});

        try {

          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options, rowid);
            _this.events.triggerBefore('remove', request, options, rowid);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'delete';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          for(let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'DELETE'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     resolve({rowid: rowid, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({rowid: rowid, request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({rowid: rowid, request: request, options: options, errorMessage: errorMessage});
        }

      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('remove', data.rowid, data.response, data.request, data.options);
            _this.events.triggerAfter('remove', true, data.response, data.request, data.options);
            _this.events.trigger('change', 'remove', data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'remove', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('remove', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.selectCount = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = Object.create({});
      }

      let newFilter = Object.create({});
      for(let name in filter) {
        newFilter[name] = filter[name];
      }
      newFilter.__result = 'count';

      options = options || {};
      options.selectCount = true;

      return _this.select(newFilter, callback, options);

    };

    _this.selectOne = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = Object.create({});
      }

      options = options || Object.create({});
      options.selectOne = true;
      options.limit = 1;

      if (!br.isEmpty(filter)) {
        if (br.isNumber(filter)) {
          return _this.select({ rowid: filter }, callback, options);
        } else {
          return _this.select(filter, callback, options);
        }
      } else {
        return _this.select(filter, callback, options);
      }

    };

    _this.selectDeferred = _this.deferredSelect = function(filter, callback, msec) {

      return new Promise(function(resolve, reject) {
        msec = msec || _this.options.refreshDelay;
        let savedFilter = Object.create({});
        for(let i in filter) {
          savedFilter[i] = filter[i];
        }
        window.clearTimeout(refreshTimeout);
        refreshTimeout = window.setTimeout(function() {
          _this.select(savedFilter).then(resolve, reject);
        }, msec);
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });

    };


    _this.load = _this.select = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = Object.create({});
      } else
      if ((callback != undefined) && (callback != null) && (typeof callback != 'function')) {
        options = callback;
        callback = null;
      }

      options = options || { };

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = Object.create({});
        let requestRowid;

        let selectOne = options && options.selectOne;
        let selectCount = options && options.selectCount;
        let singleRespone = selectOne || selectCount;

        if (selectOne) {
          options.limit = 1;
        }

        if (!br.isEmpty(filter)) {
          if (!br.isNumber(filter) && !br.isObject(filter)) {
            reject({request: request, options: options, errorMessage: 'Unacceptable filter parameters'});
            return _this;
          } else {
            if (br.isNumber(filter)) {
              filter = { rowid: filter };
            }
            for(let name in filter) {
              if ((name == 'rowid') && selectOne) {
                requestRowid = filter[name];
              } else {
                request[name] = filter[name];
              }
            }
          }
        }

        let url;

        if (selectOne && requestRowid) {
          url = _this.options.restServiceUrlNormalized + requestRowid;
        } else {
          url = _this.options.restServiceUrl;
        }

        let proceed = true;

        if (!disableEvents) {
          try {
            _this.events.triggerBefore('request', request, options);
          } catch(e) {
            br.log(e);
            proceed = false;
          }
          try {
            _this.events.triggerBefore('select', request, options);
          } catch(e) {
            br.log(e);
            proceed = false;
          }
          disableEvents = options && options.disableEvents;
        }

        if (proceed) {
          if (!br.isEmpty(_this.options.limit)) {
            request.__limit = _this.options.limit;
          }

          if (options && !br.isEmpty(options.skip)) {
            request.__skip = options.skip;
          }

          if (options && !br.isEmpty(options.limit)) {
            request.__limit = options.limit;
          }

          if (options && options.fields) {
            request.__fields = options.fields;
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          if (options && options.excludeFields) {
            request.__excludeFields = options.excludeFields;
          }

          if (options && options.renderMode) {
            request.__renderMode = options.renderMode;
          }

          if (options && options.noCalcFields) {
            request.__noCalcFields = options.noCalcFields;
          }

          if (options && options.order) {
            request.__order = options.order;
          }

          if (options && options.page) {
            request.__page = options.page;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'get';
          }

          selectOperationCounter++;

          for(let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          _this.ajaxRequest = $.ajax({ type: 'GET'
                                     , data: request
                                     , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                                     , url: url + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                                     , headers: requestHeaders
                                     , success: function(response) {
                                         try {
                                           _this.ajaxRequest = null;
                                           if (br.isArray(response)) {
                                             for(let i = 0, length = response.length; i < length; i++) {
                                               _this.events.trigger('calcFields', response[i]);
                                             }
                                           }
                                           if (singleRespone && br.isArray(response)) {
                                             if (response.length > 0) {
                                               response = response[0];
                                             } else {
                                               reject({request: request, options: options, errorMessage: 'Record not found'});
                                               return;
                                             }
                                           } else
                                           if (!singleRespone && !br.isArray(response)) {
                                             response = [response];
                                           }
                                           if (selectCount) {
                                             response = parseInt(response);
                                           }
                                           resolve({request: request, options: options, response: response});
                                         } finally {
                                           selectOperationCounter--;
                                         }
                                       }
                                     , error: function(jqXHR, textStatus, errorThrown) {
                                         try {
                                           _this.ajaxRequest = null;
                                           if (!br.isUnloading()) {
                                             var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                                             reject({request: request, options: options, errorMessage: errorMessage});
                                           }
                                         } finally {
                                           selectOperationCounter--;
                                         }
                                       }
                                     });
        }

      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('select', data.response, data.request, data.options);
            data.response = _this.events.triggerAfter('select', true, data.response, data.request, data.options) || data.response;
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'select', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('select', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.invoke = function(method, params, callback, options) {

      if (typeof params == 'function') {
        options  = callback;
        callback = params;
        params   = Object.create({});
      }

      if (callback && (typeof callback != 'function')) {
        options  = callback;
        callback = undefined;
      }

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = params || Object.create({});

        if (!disableEvents) {
          _this.events.triggerBefore('request', request, options);
          _this.events.triggerBefore('invoke', request, options);
          _this.events.triggerBefore(method, request, options);
          disableEvents = options && options.disableEvents;
        }

        if (_this.options.crossdomain) {
          request.crossdomain = 'post';
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (_this.clientUID) {
          request.__clientUID = _this.clientUID;
        }

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        for(let paramName in request) {
          if (request[paramName] === null) {
            request[paramName] = 'null';
          }
        }

        $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
               , data: request
               , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
               , url: _this.options.restServiceUrlNormalized + method + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
               , headers: requestHeaders
               , success: function(response) {
                   resolve({method: method, request: request, options: options, response: response});
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (!br.isUnloading()) {
                     let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     reject({method: method, request: request, options: options, errorMessage: errorMessage});
                   }
                 }
               });

      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger(data.method, data.response, data.request, data.options);
            _this.events.triggerAfter(data.method, true, data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', data.method, data.errorMessage, data.request, data.options);
          _this.events.triggerAfter(data.method, false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

  }

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };

})(jQuery, window);
