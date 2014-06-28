/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataSource(restServiceUrl, options) {

    var _this = this;

    this.ajaxRequest = null;
    this.name = '-';
    this.options = options || {};
    this.options.restServiceUrl = restServiceUrl;
    this.options.refreshDelay = this.options.refreshDelay || 500;
    if (this.options.restServiceUrl.charAt(this.options.restServiceUrl.length-1) != '/') {
      this.options.restServiceUrl = this.options.restServiceUrl + '/';
    }

    if (this.options.offlineMode) {
      this.db = TAFFY();
      this.db.store('taffy-db-' + name);
    }

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.insert = function(item, callback) {

      function returnInsert(data) {

        var result;

        if (_this.options.crossdomain) {
          if (typeof data == 'string') {
            result = false;
            _this.events.trigger('error', 'insert', data.length > 0 ? data : 'Empty response. Was expecting new created records with ROWID.');
          } else {
            result = true;
            _this.events.trigger('insert', data);
          }
        } else {
          if (data) {
            result = true;
            _this.events.trigger('insert', data);
          } else {
            result = false;
            _this.events.trigger('error', 'insert', 'Empty response. Was expecting new created records with ROWID.');
          }
        }
        _this.events.triggerAfter('insert', result, data, request);
        if (result) {
          _this.events.trigger('change', 'insert', data);
        }
        if (typeof callback == 'function') { callback.call(_this, result, data, request); }

      }

      var request = item;

      try {

        _this.events.triggerBefore('insert', request);

        if (this.options.crossdomain) {
          request.crossdomain = 'put';
        }

        if (_this.options.offlineMode) {
          _this.db.insert(request);
          request.rowid = request.___id;
          request.syncState = 'n';
          returnInsert(request);
        } else {
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
                       _this.events.trigger('error', 'insert', errorMessage);
                       _this.events.triggerAfter('insert', false, errorMessage, request);
                       if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                     }
                   }
                 });
        }

      } catch (error) {
        br.log(error);
        _this.events.trigger('error', 'insert', error);
        _this.events.triggerAfter('insert', false, error, request);
        if (typeof callback == 'function') { callback.call(_this, false, error, request); }
      }

    };

    this.update = function(rowid, item, callback) {

      function returnUpdate(data) {
        var operation = 'update';
        if (data) {
          var res = _this.events.trigger('removeAfterUpdate', item, data);
          if ((res !== null) && res) {
            operation = 'remove';
            _this.events.trigger('remove', rowid);
          } else {
            _this.events.trigger('update', data, rowid);
          }
        }
        _this.events.triggerAfter(operation, true, data, request);
        _this.events.trigger('change', operation, data);
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = item;

      _this.events.triggerBefore('update', request, rowid);

      if (_this.options.offlineMode) {
        _this.db({rowid: rowid}).update(request);
        returnUpdate(request);
      } else {
        $.ajax({ type: 'POST'
               , data: request
               , dataType: 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnUpdate(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     _this.events.trigger('error', 'update', errorMessage);
                     _this.events.triggerAfter('update', false, errorMessage, request);
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });
      }

    };

    this.remove = function(rowid, callback) {

      function returnRemove(data) {
        _this.events.trigger('remove', rowid);
        _this.events.triggerAfter('remove', true, data, request);
        _this.events.trigger('change', 'remove', data);
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = {};

      _this.events.triggerBefore('remove', null, rowid);

      if (_this.options.offlineMode) {
        var data = _this.db({rowid: rowid}).get();
        _this.db({rowid: rowid}).remove();
        returnRemove(data);
      } else {
        $.ajax({ type: 'DELETE'
               , data: request
               , dataType: 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnRemove(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     _this.events.trigger('error', 'remove', errorMessage);
                     _this.events.triggerAfter('remove', false, errorMessage, request);
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });
      }

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
      options.result = 'count';

      this.select(newFilter, callback, options);

    };

    this.selectOne = function(rowid, callback, options) {

      return this.select({ rowid: rowid ? rowid : '-' }, callback, options);

    };

    this.select = function(filter, callback, options) {

      function handleSuccess(data) {
        if (!disableEvents) {
          _this.events.trigger('select', data);
          _this.events.triggerAfter('select', true, data, request);
        }
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      function handleError(error, response) {
        if (!disableEvents) {
          _this.events.trigger('error', 'select', error);
          _this.events.triggerAfter('select', false, error, request);
        }
        if (typeof callback == 'function') { callback.call(_this, false, error, request); }
      }

      var disableEvents = options && options.disableEvents;

      var request = { };
      var requestRowid;

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
      } else
      if (filter) {
        for(var i in filter) {
          if (i != 'rowid') {
            request[i] = filter[i];
          } else {
            requestRowid = filter[i];
          }
        }
      }

      options = options || { };

      var url = this.options.restServiceUrl;
      if (requestRowid) {
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
        if (this.options.limit) {
          request.__limit = this.options.limit;
        }

        if (options && options.skip) {
          request.__skip = options.skip;
        }

        if (options && options.limit) {
          request.__limit = options.limit;
        }

        if (options && options.fields) {
          request.__fields = options.fields;
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

        if (_this.options.offlineMode) {
          handleSuccess(_this.db(request).get());
        } else {
          this.ajaxRequest = $.ajax({ type: 'GET'
                                    , data: request
                                    , dataType: this.options.crossdomain ? 'jsonp' : 'json'
                                    , url: url + (this.options.authToken ? '?token=' + this.options.authToken : '')
                                    , success: function(response) {
                                        _this.ajaxRequest = null;
                                        if (_this.options.crossdomain && (typeof response == 'string')) {
                                          handleError('', response);
                                        } else
                                        if (response) {
                                          handleSuccess(response);
                                        } else {
                                          handleError('', response);
                                        }
                                      }
                                    , error: function(jqXHR, textStatus, errorThrown) {
                                        if (br.isUnloading()) {

                                        } else {
                                          _this.ajaxRequest = null;
                                          var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                                          handleError(errorMessage, jqXHR);
                                        }
                                      }
                                    });
        }
      } else {

      }

    };

    this.requestInProgress = function() {
      return (this.ajaxRequest !== null);
    };

    this.abortRequest = function() {
      if (this.ajaxRequest !== null) {
        this.ajaxRequest.abort();
      }
    };

    this.invoke = function(method, params, callback) {

      var request = { };

      if (typeof params == 'function') {
        callback = params;
      } else {
        request = params;
      }

      _this.events.triggerBefore(method, request);

      if (this.options.crossdomain) {
        request.crossdomain = 'post';
      }

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
