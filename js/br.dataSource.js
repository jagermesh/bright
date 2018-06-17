/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataSource(restServiceUrl, options) {

    var _this = this;

    _this.ajaxRequest = null;
    _this.name = '-';
    _this.options = options || {};
    _this.options.restServiceUrl = restServiceUrl;
    _this.options.refreshDelay = _this.options.refreshDelay || 1500;
    if (_this.options.restServiceUrl.charAt(_this.options.restServiceUrl.length-1) != '/') {
      _this.options.restServiceUrl = _this.options.restServiceUrl + '/';
    }

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    _this.clientUID = null;

    var selectOperationCounter = 0;
    var refreshTimeout;

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

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = item;

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'PUT'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , success: function(response) {
                     var result, errorMessage;

                     if (_this.options.crossdomain) {
                       if (typeof response == 'string') {
                         result = false;
                         errorMessage = response.length > 0 ? response : 'Empty response. Was expecting new created records with ROWID.';
                       } else {
                         result = true;
                       }
                     } else {
                       if (response) {
                         result = true;
                       } else {
                         result = false;
                         errorMessage = 'Empty response. Was expecting new created records with ROWID.';
                       }
                     }
                     if (result) {
                       resolve(response);
                     } else {
                       reject(errorMessage);
                     }
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       reject((br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText));
                     }
                   }
                 });

        } catch (errorMessage) {
          if (!disableEvents) {
            _this.events.trigger('error', 'insert', errorMessage);
            _this.events.triggerAfter('insert', false, errorMessage, request);
          }
          reject(errorMessage);
        }

      }).then(function(response) {
        if (!disableEvents) {
          _this.events.trigger('insert', response);
          _this.events.triggerAfter('insert', true, response);
          _this.events.trigger('change', 'insert', response);
        }
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        if (!disableEvents) {
          _this.events.trigger('error', 'insert', errorMessage);
          _this.events.triggerAfter('insert', false, errorMessage);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.update = function(rowid, item, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var operation;

      return new Promise(function(resolve, reject) {

        var request = item;

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , success: function(response) {
                     operation = 'update';
                     if (response) {
                       var res = _this.events.trigger('removeAfterUpdate', item, response);
                       if ((res !== null) && res) {
                         operation = 'remove';
                       }
                     }
                     resolve(response);
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       reject((br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText));
                     }
                   }
                 });

        } catch (errorMessage) {
          reject(errorMessage);
        }

      }).then(function(response) {
        if (!disableEvents) {
          if (operation == 'remove') {
            _this.events.trigger('remove', rowid);
          } else {
             _this.events.trigger('update', response, rowid);
          }
          _this.events.triggerAfter(operation, true, response);
          _this.events.trigger('change', operation, response);
        }
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        if (!disableEvents) {
          _this.events.trigger('error', 'update', errorMessage);
          _this.events.triggerAfter('update', false, errorMessage);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.remove = function(rowid, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = {};

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'DELETE'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , success: function(response) {
                     resolve(response);
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       reject((br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText));
                     }
                   }
                 });

        } catch (errorMessage) {
          br.log(errorMessage);
          if (!disableEvents) {
            _this.events.trigger('error', 'remove', errorMessage);
            _this.events.triggerAfter('remove', false, errorMessage, request);
          }
          reject(errorMessage);
        }

      }).then(function(response) {
        if (!disableEvents) {
          _this.events.trigger('remove', rowid);
          _this.events.triggerAfter('remove', true, response);
          _this.events.trigger('change', 'remove', response);
        }
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        if (!disableEvents) {
          _this.events.trigger('error', 'remove', errorMessage);
          _this.events.triggerAfter('remove', false, errorMessage);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.selectCount = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = { };
      }

      var newFilter = {};
      for(var i in filter) {
        newFilter[i] = filter[i];
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
        filter = { };
      }

      options = options || { };
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
        var savedFilter = {};
        for(var i in filter) {
          savedFilter[i] = filter[i];
        }
        window.clearTimeout(refreshTimeout);
        refreshTimeout = window.setTimeout(function() {
          _this.select(savedFilter).then(resolve, reject);
        }, msec);

      }).then(function(response) {
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.load = _this.select = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = {};
        var requestRowid;

        var selectOne = options && options.selectOne;
        var selectCount = options && options.selectCount;
        var singleRespone = selectOne || selectCount;

        if (selectOne) {
          options.limit = 1;
        }

        if (!br.isEmpty(filter)) {
          if (!br.isNumber(filter) && !br.isObject(filter)) {
            reject('Unacceptable filter parameters');
            return _this;
          } else {
            if (br.isNumber(filter)) {
              filter = { rowid: filter };
            }
            for(var name in filter) {
              if ((name == 'rowid') && selectOne) {
                requestRowid = filter[name];
              } else {
                request[name] = filter[name];
              }
            }
          }
        }

        var url = _this.options.restServiceUrl;
        if (selectOne && requestRowid) {
          url = url + requestRowid;
        }

        var proceed = true;

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          _this.ajaxRequest = $.ajax({ type: 'GET'
                                    , data: request
                                    , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                                    , url: url + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                                    , success: function(response) {
                                        try {
                                          _this.ajaxRequest = null;
                                          if ((_this.options.crossdomain && (typeof response == 'string')) || br.isNull(response)) {
                                            reject('Unknown error');
                                          } else {
                                            if (singleRespone && br.isArray(response)) {
                                              if (response.length > 0) {
                                                response = response[0];
                                              } else {
                                                reject('Record not found');
                                                return;
                                              }
                                            } else
                                            if (!singleRespone && !br.isArray(response)) {
                                              response = [response];
                                            }
                                            if (selectCount) {
                                              response = parseInt(response);
                                            }
                                            resolve(response);
                                          }
                                        } finally {
                                          selectOperationCounter--;
                                        }
                                      }
                                    , error: function(jqXHR, textStatus, errorThrown) {
                                        try {
                                          _this.ajaxRequest = null;
                                          if (!br.isUnloading()) {
                                            reject((br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText));
                                          }
                                        } finally {
                                          selectOperationCounter--;
                                        }
                                      }
                                    });
        }

      }).then(function(response) {
        if (!disableEvents) {
          _this.events.trigger('select', response);
          _this.events.triggerAfter('select', true, response);
        }
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        if (!disableEvents) {
          _this.events.trigger('error', 'select', errorMessage);
          _this.events.triggerAfter('select', false, errorMessage);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.invoke = function(method, params, callback, options) {

      if (typeof params == 'function') {
        options  = callback;
        callback = params;
        params   = {};
      }

      if (callback && (typeof callback != 'function')) {
        options  = callback;
        callback = undefined;
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = params || { };

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

        for(var paramName in request) {
          if (request[paramName] === null) {
            request[paramName] = 'null';
          }
        }

        $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
               , data: request
               , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
               , url: _this.options.restServiceUrl + method + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
               , success: function(response) {
                   if (_this.options.crossdomain && (typeof response == 'string')) {
                     reject(response);
                   } else {
                     resolve(response);
                   }
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (!br.isUnloading()) {
                     reject((br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText));
                   }
                 }
               });

      }).then(function(response) {
        // if (!disableEvents) {
          _this.events.trigger(method, response, params);
          _this.events.triggerAfter(method, true, response);
        // }
        if (typeof callback == 'function') {
          callback.call(_this, true, response);
        }
        return response;
      }).catch(function(errorMessage) {
        // if (!disableEvents) {
          _this.events.trigger('error', method, errorMessage);
          _this.events.triggerAfter(method, false, errorMessage);
        // }
        if (typeof callback == 'function') {
          callback.call(_this, false, errorMessage);
        }
        throw errorMessage;
      });

    };

    _this.fillCombo = function(selector, data, options) {

      options = options || { };

      var valueField = options.valueField || 'rowid';
      var nameField = options.nameField || 'name';
      var hideEmptyValue = options.hideEmptyValue || false;
      var emptyValue = options.emptyValue || '--any--';
      var selectedValue = options.selectedValue || null;
      var selectedValueField = options.selectedValueField || null;

      $(selector).each(function() {
        var val = $(this).val();
        if (br.isEmpty(val)) {
          val = $(this).attr('data-value');
          $(this).removeAttr('data-value');
        }
        $(this).html('');
        var s = '';
        if (!hideEmptyValue) {
          s = s + '<option value="">' + emptyValue + '</option>';
        }
        for(var i in data) {
          if (!selectedValue && selectedValueField) {
            if (data[i][selectedValueField] == '1') {
              selectedValue = data[i][valueField];
            }
          }
          s = s + '<option value="' + data[i][valueField] + '">' + data[i][nameField] + '</option>';
        }
        $(this).html(s);
        if (!br.isEmpty(selectedValue)) {
          val = selectedValue;
        }
        if (!br.isEmpty(val)) {
          $(this).find('option[value=' + val +']').attr('selected', 'selected');
        }
      });

    };

  }

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };

})(jQuery, window);
