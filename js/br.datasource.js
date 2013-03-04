// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  }

  function BrDataSource(restServiceUrl, options) {

    var $ = jQuery;
    var datasource = this;
    var _this = this;
    var ajaxRequest = null;

    // this.cb = {};
    this.refreshTimeout;
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
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.insert = function(item, callback) {

      request = item;

      try {

        _this.events.triggerBefore('insert', request);

        if (this.options.crossdomain) {
          request.crossdomain = 'put';
        }

        function returnInsert(data) {

          var result;

          if (datasource.options.crossdomain) {
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
          if (typeof callback == 'function') { callback.call(datasource, result, data, request); }

        }

        if (datasource.options.offlineMode) {
          datasource.db.insert(request);
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
                     _this.events.trigger('error', 'insert', jqXHR.responseText);
                     _this.events.triggerAfter('insert', false, jqXHR.responseText, request);
                     if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                   }
                 });
        }

      } catch (error) {
        _this.events.trigger('error', 'insert', error);
        _this.events.triggerAfter('insert', false, error, request);
        if (typeof callback == 'function') { callback.call(datasource, false, error, request); }
      }

    }

    this.update = function(rowid, item, callback) {

      request = item;

      _this.events.triggerBefore('update', rowid, request);

      function returnUpdate(data) {
        var operation = 'update';
        if (data) {
          var res = _this.events.trigger('removeAfterUpdate', item, data);
          if ((res != null) && res) {
            operation = 'remove';
            _this.events.trigger('remove', rowid);
          } else {
            _this.events.trigger('update', data, rowid);
          }
        }
        _this.events.triggerAfter('' + operation, true, data, request);
        _this.events.trigger('change', operation, data);
        if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
      }

      if (datasource.options.offlineMode) {
        datasource.db({rowid: rowid}).update(request);
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
                   _this.events.trigger('error', 'update', jqXHR.responseText);
                   _this.events.triggerAfter('update', false, jqXHR.responseText, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                 }
               });
      }

    }

    this.remove = function(rowid, callback) {

      request = {};

      _this.events.triggerBefore('remove', null, rowid);

      function returnRemove(data) {
        _this.events.trigger('remove', rowid);
        _this.events.triggerAfter('remove', true, data, request);
        _this.events.trigger('change', 'remove', data);
        if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
      }

      if (datasource.options.offlineMode) {
        var data = datasource.db({rowid: rowid}).get();
        datasource.db({rowid: rowid}).remove();
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
                   _this.events.trigger('error', 'remove', jqXHR.responseText);
                   _this.events.triggerAfter('remove', false, jqXHR.responseText, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                 }
               });
      }

    }

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

    }

    this.selectOne = function(rowid, callback, options) {

      return this.select({ rowid: rowid ? rowid : '-' }, callback, options);

    }

    this.select = function(filter, callback, options) {

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

        function handleSuccess(data) {
          if (!disableEvents) {
            _this.events.trigger('select', data);
            _this.events.triggerAfter('select', true, data, request);
          }
          if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
        }

        function handleError(error, response) {
          if (!disableEvents) {
            _this.events.trigger('error', 'select', error);
            _this.events.triggerAfter('select', false, error, request);
          }
          if (typeof callback == 'function') { callback.call(datasource, false, error, request); }
        }

        if (datasource.options.offlineMode) {
          handleSuccess(datasource.db(request).get());
        } else {
          this.ajaxRequest = $.ajax({ type: 'GET'
                                    , data: request
                                    , dataType: 'json'
                                    , url: url + (this.options.authToken ? '?token=' + this.options.authToken : '')
                                    , success: function(response) {
                                        datasource.ajaxRequest = null;
                                        if (response) {
                                          handleSuccess(response);
                                        } else {
                                          handleError('', response);
                                        }
                                      }
                                    , error: function(jqXHR, textStatus, errorThrown) {
                                        datasource.ajaxRequest = null;
                                        var error = (jqXHR.statusText == 'abort') ? '' : (jqXHR.responseText.length == 0 ? 'Server error' : jqXHR.responseText);
                                        handleError(error, jqXHR);
                                      }
                                    });
        }
      } else {
        
      }

    }
    this.requestInProgress = function() {
      return (this.ajaxRequest != null);
    }
    this.abortRequest = function() {
      if (this.ajaxRequest != null) {
        this.ajaxRequest.abort();
      }
    }
    this.invoke = function(method, params, callback) {

      var datasource = this;

      if (typeof params == 'function') {
        request = { };
        callback = params;
      } else {
        request = params;
      }

      _this.events.triggerBefore('' + method, request);

      if (this.options.crossdomain) {
        request.crossdomain = 'post';
      }

      $.ajax({ type: this.options.crossdomain ? 'GET' : 'POST'
             , data: request
             , dataType: this.options.crossdomain ? 'jsonp' : 'json'
             , url: this.options.restServiceUrl + method + (this.options.authToken ? '?token=' + this.options.authToken : '')
             , success: function(response) {
                 if (datasource.options.crossdomain && (typeof response == 'string')) {
                   _this.events.trigger('error', method, response);
                   _this.events.triggerAfter('' + method, false, response, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, response, request); }
                 } else {
                   _this.events.trigger(method, response, params);
                   _this.events.triggerAfter('' + method, true, response, request);
                   if (typeof callback == 'function') { callback.call(datasource, true, response, request); }
                 }
               }
             , error: function(jqXHR, textStatus, errorThrown) {
                 _this.events.trigger('error', method, jqXHR.responseText);
                 _this.events.triggerAfter('' + method, false, jqXHR.responseText, request);
                 if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
               }
             });

    }

    this.fillCombo = function(selector, data, options) {
      options = options || { };
      valueField = options.valueField || 'rowid';
      nameField = options.nameField || 'name';
      hideEmptyValue = options.hideEmptyValue || false;
      emptyValue = options.emptyValue || '-- any --';
      selectedValue = options.selectedValue || null;
      selectedValueField = options.selectedValueField || null;
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
      })
    }

    this.deferredSelect = function(filter, callback, msec) {
      var savedFilter = {}
      for(var i in filter) {
        savedFilter[i] = filter[i];
      }
      msec = msec || this.options.refreshDelay;
      window.clearTimeout(this.refreshTimeout);
      this.refreshTimeout = window.setTimeout(function() {
        datasource.select(savedFilter, callback);
      }, msec);
    }

  }

}(jQuery, window);
