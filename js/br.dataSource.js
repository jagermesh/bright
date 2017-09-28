/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

/* global TAFFY */

;(function ($, window) {

  function BrDataSource(restServiceUrl, options) {

    var _this = this;

    this.ajaxRequest = null;
    this.name = '-';
    this.options = options || {};
    this.options.restServiceUrl = restServiceUrl;
    this.options.refreshDelay = this.options.refreshDelay || 1500;
    if (this.options.restServiceUrl.charAt(this.options.restServiceUrl.length-1) != '/') {
      this.options.restServiceUrl = this.options.restServiceUrl + '/';
    }

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    var selectOperationCounter = 0;

    this.insert = function(item, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;

      function returnInsert(data) {

        var result;

        if (_this.options.crossdomain) {
          if (typeof data == 'string') {
            result = false;
            _this.events.trigger('error', 'insert', data.length > 0 ? data : 'Empty response. Was expecting new created records with ROWID.');
          } else {
            result = true;
            if (!disableEvents) {
              _this.events.trigger('insert', data);
            }
          }
        } else {
          if (data) {
            result = true;
            if (!disableEvents) {
              _this.events.trigger('insert', data);
            }
          } else {
            result = false;
            _this.events.trigger('error', 'insert', 'Empty response. Was expecting new created records with ROWID.');
          }
        }
        if (!disableEvents) {
          _this.events.triggerAfter('insert', result, data, request);
          if (result) {
            _this.events.trigger('change', 'insert', data);
          }
        }
        if (typeof callback == 'function') { callback.call(_this, result, data, request); }

      }

      var request = item;

      try {

        if (!disableEvents) {
          _this.events.triggerBefore('insert', request, options);
        }

        if (this.options.crossdomain) {
          request.crossdomain = 'put';
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        // for(var paramName in request) {
        //   if (request[paramName] === null) {
        //     request[paramName] = 'null';
        //   }
        // }

        $.ajax({ type: this.options.crossdomain ? 'GET' : 'PUT'
               , data: request
               , dataType: this.options.crossdomain ? 'jsonp' : 'json'
               , url: this.options.restServiceUrl + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnInsert(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     if (!disableEvents) {
                       _this.events.trigger('error', 'insert', errorMessage);
                       _this.events.triggerAfter('insert', false, errorMessage, request);
                     }
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });

      } catch (errorMessage) {
        br.log(errorMessage);
        if (!disableEvents) {
          _this.events.trigger('error', 'insert', errorMessage);
          _this.events.triggerAfter('insert', false, errorMessage, request);
        }
        if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
      }

      return this;

    };

    this.update = function(rowid, item, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;

      function returnUpdate(data) {
        var operation = 'update';
        if (data) {
          var res = _this.events.trigger('removeAfterUpdate', item, data);
          if ((res !== null) && res) {
            operation = 'remove';
            if (!disableEvents) {
              _this.events.trigger('remove', rowid);
            }
          } else {
            if (!disableEvents) {
              _this.events.trigger('update', data, rowid);
            }
          }
        }
        if (!disableEvents) {
          _this.events.triggerAfter(operation, true, data, request);
          _this.events.trigger('change', operation, data);
        }
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = item;

      try {

        if (!disableEvents) {
          _this.events.triggerBefore('update', request, options, rowid);
          disableEvents = options && options.disableEvents;
        }

        if (this.options.crossdomain) {
          request.crossdomain = 'post';
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        // for(var paramName in request) {
        //   if (request[paramName] === null) {
        //     request[paramName] = 'null';
        //   }
        // }

        $.ajax({ type: this.options.crossdomain ? 'GET' : 'POST'
               , data: request
               , dataType: this.options.crossdomain ? 'jsonp' : 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnUpdate(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     if (!disableEvents) {
                       _this.events.trigger('error', 'update', errorMessage);
                       _this.events.triggerAfter('update', false, errorMessage, request);
                     }
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });

      } catch (errorMessage) {
        br.log(errorMessage);
        if (!disableEvents) {
          _this.events.trigger('error', 'update', errorMessage);
          _this.events.triggerAfter('update', false, errorMessage, request);
        }
        if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
      }

      return this;

    };

    this.remove = function(rowid, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;

      function returnRemove(data) {
        if (!disableEvents) {
          _this.events.trigger('remove', rowid);
          _this.events.triggerAfter('remove', true, data, request);
          _this.events.trigger('change', 'remove', data);
        }
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = {};

      try {

        if (!disableEvents) {
          _this.events.triggerBefore('remove', request, options, rowid);
        }

        if (this.options.crossdomain) {
          request.crossdomain = 'delete';
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        // for(var paramName in request) {
        //   if (request[paramName] === null) {
        //     request[paramName] = 'null';
        //   }
        // }

        $.ajax({ type: this.options.crossdomain ? 'GET' : 'DELETE'
               , data: request
               , dataType: this.options.crossdomain ? 'jsonp' : 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnRemove(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     if (!disableEvents) {
                       _this.events.trigger('error', 'remove', errorMessage);
                       _this.events.triggerAfter('remove', false, errorMessage, request);
                     }
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });

      } catch (errorMessage) {
        br.log(errorMessage);
        if (!disableEvents) {
          _this.events.trigger('error', 'remove', errorMessage);
          _this.events.triggerAfter('remove', false, errorMessage, request);
        }
        if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
      }

      return this;

    };

    this.selectCount = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
      }

      var newFilter = {};
      for(var i in filter) {
        newFilter[i] = filter[i];
      }
      newFilter.__result = 'count';

      options = options || {};
      options.selectCount = true;

      this.select(newFilter, callback, options);

      return this;

    };

    function handleSelectError(error, request, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectOne = options && options.selectOne;

      if (!disableEvents) {
        _this.events.trigger('error', 'select', error);
        _this.events.triggerAfter('select', false, error, request);
      }
      if (typeof callback == 'function') { callback.call(_this, false, error, request); }
    }

    function handleSelectSuccess(response, request, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectCount = options && options.selectCount;
      var selectOne = options && (options.selectOne || options.selectCount);

      if (selectOne && br.isArray(response)) {
        if (response.length > 0) {
          response = response[0];
        } else {
          handleSelectError('Record not found', request, callback, options);
          return;
        }
      } else
      if (!selectOne && !br.isArray(response)) {
        response = [response];
      }
      if (selectCount) {
        response = parseInt(response);
      }
      if (!disableEvents) {
        _this.events.trigger('select', response);
        _this.events.triggerAfter('select', true, response, request);
      }
      if (typeof callback == 'function') { callback.call(_this, true, response, request); }
    }

    this.selectOne = function(filter, callback, options) {

      if (br.isFunction(filter)) {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };
      options.selectOne = true;
      options.limit = 1;

      if (!br.isEmpty(filter)) {
        if (!br.isNumber(filter) && !br.isObject(filter)) {
          handleSelectError('Unacceptable filter parameters', filter, callback, options);
          return this;
        } else {
          if (br.isNumber(filter)) {
            return this.select({ rowid: filter }, callback, options);
          } else {
            return this.select(filter, callback, options);
          }
        }
      } else {
        return this.select(filter, callback, options);
      }

    };

    this.doingSelect = function() {

      return selectOperationCounter > 0;

    };

    this.select = function(filter, callback, options) {

      var request = {};
      var requestRowid;

      if (br.isFunction(filter)) {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectOne = options && options.selectOne;

      if (selectOne) {
        options.limit = 1;
      }

      if (!br.isEmpty(filter)) {
        if (!br.isNumber(filter) && !br.isObject(filter)) {
          handleSelectError('Unacceptable filter parameters', filter, callback, options);
          return this;
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

      var url = this.options.restServiceUrl;
      if (selectOne && requestRowid) {
        url = url + requestRowid;
      }

      var proceed = true;

      if (!disableEvents) {
        try {
          _this.events.triggerBefore('select', request, options);
        } catch(e) {
          br.log(e);
          proceed = false;
        }
      }

      if (proceed) {
        if (!br.isEmpty(this.options.limit)) {
          request.__limit = this.options.limit;
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

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        if (options && options.excludeFields) {
          request.__excludeFields = options.excludeFields;
        }

        if (options && options.renderMode) {
          request.__renderMode = options.renderMode;
        }

        if (options && options.order) {
          request.__order = options.order;
        }

        if (options && options.page) {
          request.__page = options.page;
        }

        if (this.options.crossdomain) {
          request.crossdomain = 'get';
        }

        selectOperationCounter++;

        for(var paramName in request) {
          if (request[paramName] === null) {
            request[paramName] = 'null';
          }
        }

        this.ajaxRequest = $.ajax({ type: 'GET'
                                  , data: request
                                  , dataType: this.options.crossdomain ? 'jsonp' : 'json'
                                  , url: url + (this.options.authToken ? '?token=' + this.options.authToken : '')
                                  , success: function(response) {
                                      try {
                                        _this.ajaxRequest = null;
                                        if (_this.options.crossdomain && (typeof response == 'string')) {
                                          handleSelectError('Unknown error', request, callback, options);
                                        } else
                                        if (br.isNull(response)) {
                                          handleSelectError('Unknown error', request, callback, options);
                                        } else {
                                          handleSelectSuccess(response, request, callback, options);
                                        }
                                      } finally {
                                        selectOperationCounter--;
                                      }
                                    }
                                  , error: function(jqXHR, textStatus, errorThrown) {
                                      try {
                                        if (br.isUnloading()) {

                                        } else {
                                          _this.ajaxRequest = null;
                                          var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                                          handleSelectError(errorMessage, request, callback, options);
                                        }
                                      } finally {
                                        selectOperationCounter--;
                                      }
                                    }
                                  });
      } else {

      }

      return this;

    };

    this.requestInProgress = function() {

      return (this.ajaxRequest !== null);

    };

    this.abortRequest = function() {

      if (this.ajaxRequest !== null) {
        this.ajaxRequest.abort();
      }
      return this;

    };

    this.invoke = function(method, params, callback, options) {

      if (br.isFunction(params)) {
        options  = callback;
        callback = params;
        params   = {};
      }

      if (callback && !br.isFunction(callback)) {
        options  = callback;
        callback = undefined;
      }

      var request = params || { };

      options = options || { };

      _this.events.triggerBefore(method, request);

      if (this.options.crossdomain) {
        request.crossdomain = 'post';
      }

      if (options && options.dataSets) {
        request.__dataSets = options.dataSets;
      }

      if (options && options.clientUID) {
        request.__clientUID = options.clientUID;
      }

      // for(var paramName in request) {
      //   if (request[paramName] === null) {
      //     request[paramName] = 'null';
      //   }
      // }

      $.ajax({ type: this.options.crossdomain ? 'GET' : 'POST'
             , data: request
             , dataType: this.options.crossdomain ? 'jsonp' : 'json'
             , url: this.options.restServiceUrl + method + (this.options.authToken ? '?token=' + this.options.authToken : '')
             , success: function(response) {
                 if (_this.options.crossdomain && (typeof response == 'string')) {
                   _this.events.trigger('error', method, response);
                   _this.events.triggerAfter(method, false, response, request);
                   if (typeof callback == 'function') { callback.call(_this, false, response, request); }
                 } else {
                   _this.events.trigger(method, response, params);
                   _this.events.triggerAfter(method, true, response, request);
                   if (typeof callback == 'function') { callback.call(_this, true, response, request); }
                 }
               }
             , error: function(jqXHR, textStatus, errorThrown) {
                 if (br.isUnloading()) {

                 } else {
                   var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                   _this.events.trigger('error', method, errorMessage);
                   _this.events.triggerAfter(method, false, errorMessage, request);
                   if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                 }
               }
             });

      return this;

    };

    this.fillCombo = function(selector, data, options) {

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

    var refreshTimeout;

    this.deferredSelect = function(filter, callback, msec) {

      msec = msec || this.options.refreshDelay;
      var savedFilter = {};
      for(var i in filter) {
        savedFilter[i] = filter[i];
      }
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(function() {
        _this.select(savedFilter, callback);
      }, msec);

    };

  }

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };

})(jQuery, window);
