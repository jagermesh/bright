/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataCombo(selector, dataSource, options) {

    var _this = this;
    var select2Binded = false;
    var currentData = [];

    this.selector = $(selector);

    this.dataSource = dataSource;

    this.options                           = options || {};
    this.options.valueField                = this.options.valueField || 'rowid';
    this.options.nameField                 = this.options.nameField || 'name';
    this.options.levelField                = this.options.levelField || null;
    this.options.selectedValue             = this.options.selectedValue || null;
    this.options.skipTranslate             = this.options.skipTranslate || null;
    this.options.selectedValueField        = this.options.selectedValueField || null;
    this.options.hideEmptyValue            = this.options.hideEmptyValue || (this.selector.attr('multiple') == 'multiple');
    this.options.emptyName                 = this.options.emptyName || '--any--';
    this.options.emptyValue                = this.options.emptyValue || '';
    this.options.allowClear                = this.options.allowClear || false;
    this.options.lookupMode                = this.options.lookupMode || false;
    this.options.fields                    = this.options.fields || {};
    this.options.saveSelection             = this.options.saveSelection || false;
    this.options.saveToSessionStorage      = this.options.saveToSessionStorage || false;
    this.options.lookup_minimumInputLength = this.options.lookup_minimumInputLength || 1;

    if (this.options.skipTranslate) {
      this.selector.addClass('skiptranslate');
    }

    this.loaded = this.options.lookupMode;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname;

    if (this.dataSource) {
      this.storageTag = this.storageTag + ':' + this.dataSource.options.restServiceUrl;
    }

    this.isValid = function() {
      return _this.selector.length > 0;
    };

    this.isLoaded = function() {
      return _this.loaded;
    };

    this.hasOptions = function() {
      return (_this.selector.find('option').length > 0);
    };

    this.optionsAmount = function() {
      return _this.selector.find('option').length;
    };

    this.getFirstAvailableValue = function() {
      var result = null;
      _this.selector.find('option').each(function() {
        if (!br.isEmpty($(this).val())) {
          if (br.isEmpty(result)) {
            result = $(this).val();
          }
        }
      });
      return result;
    };

    function storageTag(c) {
      var result = _this.storageTag;
      result = result + ':filter-value';
      if (!br.isEmpty($(c).attr('id'))) {
        result = result + ':' + $(c).attr('id');
      } else
      if (!br.isEmpty($(c).attr('name'))) {
        result = result + ':' + $(c).attr('name');
      }
      if (!br.isEmpty($(c).attr('data-storage-key'))) {
        result = result + ':' + $(c).attr('data-storage-key');
      }
      return result;
    }

    function getName(data) {
      if (br.isFunction(_this.options.onGetName)) {
        return _this.options.onGetName.call(this, data);
      } else {
        var item = { value: data[_this.options.keyField]
                   , name: data[_this.options.nameField]
                   };
        _this.events.trigger('formatItem', item, data);
        return item.name;
      }
    }

    var requestTimer;

    function switchToSelect2() {
      var selectLimit = 50;

      if (_this.isValid() && window.Select2 && !_this.options.noDecoration && !_this.selector.attr('size')) {
        if (_this.options.lookupMode && select2Binded) {
          return;
        } else {
          var params = {};
          if (_this.options.hideSearchBox) {
            params.minimumResultsForSearch = -1;
          }
          if (_this.options.skipTranslate) {
            params.dropdownCssClass = 'skiptranslate';
          }
          if (_this.options.allowClear) {
            params.allowClear  = _this.options.allowClear;
            params.placeholder = _this.options.emptyName;
          }
          params.dropdownAutoWidth = true;
          params.dropdownCss = { 'max-width': '400px' };
          if (_this.options.lookupMode) {
            params.minimumInputLength = _this.options.lookup_minimumInputLength;
            params.allowClear  = true;
            params.placeholder = _this.options.emptyName;
            params.query = function (query) {
              window.clearTimeout(requestTimer);
              var request = { };
              request.keyword = query.term;
              requestTimer = window.setTimeout(function() {
                if (query.term) {
                  _this.dataSource.select(request, function(result, response) {
                    if (result) {
                      var data = { results: [] };
                      for(var i = 0; i < response.length; i++) {
                        data.results.push({ id:   response[i][_this.options.valueField]
                                          , text: getName(response[i])
                                          });
                      }
                      query.callback(data);
                    }
                  }, { limit: selectLimit
                     , skip: (query.page - 1) * selectLimit
                     }
                  );
                }
              }, 300);
            };
          }
          _this.selector.select2(params);
          select2Binded = true;
        }
      }
    }

    this.selected = function(fieldName) {
      if (br.isArray(currentData)) {
        if (currentData.length > 0) {
          var val = this.val();
          if (!br.isEmpty(val)) {
            for(var i = 0; i < currentData.length; i++) {
              if (br.toInt(currentData[i][_this.options.valueField]) == br.toInt(val)) {
                if (br.isEmpty(fieldName)) {
                  return currentData[i];
                } else {
                  return currentData[i][fieldName];
                }
              }
            }
          }
        }
      }
    };

    this.val = function(value, callback) {
      if (value !== undefined) {
        if (_this.options.saveSelection) {
          if (_this.options.saveToSessionStorage) {
            br.session.set(storageTag(_this.selector), value);
          } else {
            br.storage.set(storageTag(_this.selector), value);
          }
        }
        if (_this.isValid()) {
          _this.selector.val(value);
          switchToSelect2();
          if (_this.options.lookupMode) {
            if (value) {
              var data = { id: value, text: value };
              var request = { rowid: value };
              _this.selector.select2('data', data);
              var options = { disableEvents: true };
              _this.dataSource.events.triggerBefore('selectByRowid', request, options);
              _this.dataSource.select(request, function(result, response) {
                if (result) {
                  if (response.length > 0) {
                    response = response[0];
                    data = { id: response[_this.options.valueField]
                           , text: getName(response)
                           };
                    _this.selector.select2('data', data);
                  }
                }
                if (callback) {
                  callback.call(_this.selector, result, response);
                }
              }, options);
            } else {
              _this.selector.select2('data', null);
              if (callback) {
                callback.call(_this.selector, true, value);
              }
            }
          } else {
            if (callback) {
              callback.call(_this.selector, true, value);
            }
          }
        }
      }
      if (_this.isValid()) {
        var val = _this.selector.val();
        if (val !== null) {
          return val;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };

    this.valOrNull = function() {
      if (_this.isValid()) {
        var val = this.val();
        return br.isEmpty(val) ? null : val;
      } else {
        return undefined;
      }
    };

    this.reset = function(triggerChange) {
      br.storage.remove(storageTag(this.selector));
      br.session.remove(storageTag(this.selector));
      if (_this.isValid()) {
        this.selector.val('');
        if (triggerChange) {
          _this.selector.trigger('change');
        } else {
          switchToSelect2();
        }
      }
    };

    this.selector.on('reset', function() {
      _this.reset();
    });

    function renderRow(data) {
      var s = '';
      if (!br.isEmpty(_this.options.groupField) && br.toInt(data[_this.options.groupField]) > 0) {
        s = s + '<optgroup';
      } else {
        s = s + '<option';
      }
      s = s + ' value="' + data[_this.options.valueField] + '"';
      if (!br.isEmpty(_this.options.disabledField) && br.toInt(data[_this.options.disabledField]) > 0) {
        s = s + ' disabled="disabled"';
      }
      s = s + '>';
      if (!br.isEmpty(_this.options.levelField)) {
        var margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for (var k = 0; k < margin; k++) {
          s = s + '&nbsp;';
        }
      }
      s = s + getName(data);
      if (!br.isEmpty(_this.options.groupField) && br.toInt(data[_this.options.groupField]) > 0) {
        s = s + '</optgroup>';
      } else {
        s = s + '</option>';
      }
      return s;
    }

    function render(data) {

      currentData = data;


      if (!_this.options.lookupMode) {

        if (_this.options.saveSelection) {
          if (_this.options.saveToSessionStorage) {
            _this.options.selectedValue = br.session.get(storageTag(_this.selector));
          } else {
            _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
          }
        }

        _this.selector.each(function() {
          var val = $(this).val();
          if (br.isEmpty(val)) {
            val = $(this).attr('data-value');
            $(this).removeAttr('data-value');
          }
          $(this).html('');

          var s = '';
          var cbObj = {};
          cbObj.data = data;
          if (_this.options.hideEmptyValue || (_this.options.autoSelectSingle && (data.length == 1))) {

          } else {
            cbObj.s = s;
            _this.events.triggerBefore('generateEmptyOption', cbObj, $(this));
            s = cbObj.s;
            if (_this.options.allowClear) {
              s = s + '<option></option>';
            } else {
              s = s + '<option value="' + _this.options.emptyValue + '">' + _this.options.emptyName + '</option>';
            }
          }

          cbObj.s = s;
          _this.events.triggerBefore('generateOptions', cbObj, $(this));
          s = cbObj.s;

          for(var i = 0; i < data.length; i++) {
            s = s + renderRow(data[i]);
            if (br.isEmpty(_this.options.selectedValue) && !br.isEmpty(_this.options.selectedValueField)) {
              var selectedValue = data[i][_this.options.selectedValueField];
              if ((br.isBoolean(selectedValue) && selectedValue) || (br.toInt(selectedValue) == 1)) {
                _this.options.selectedValue = data[i][_this.options.valueField];
              }
            }
          }
          $(this).html(s);

          if (!br.isEmpty(_this.options.selectedValue)) {
            $(this).find('option[value=' + _this.options.selectedValue +']').attr('selected', 'selected');
          } else
          if (!br.isEmpty(val)) {
            if (br.isArray(val)) {
              for (var k = 0; k < val.length; k++) {
                $(this).find('option[value=' + val[k] +']').attr('selected', 'selected');
              }
            } else {
              $(this).find('option[value=' + val +']').attr('selected', 'selected');
            }
          }

        });

      }

    }

    _this.load = _this.reload = function(filter, callback) {

      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }

      return new Promise(function(resolve, reject) {

        var options = { fields: _this.options.fields };

        if (_this.dataSource) {
          if (_this.isValid()) {
            if (_this.options.lookupMode) {
              resolve({ request: {}, options: options, response: []});
              switchToSelect2();
              _this.loaded = true;
              _this.events.trigger('load', []);
            } else {
              _this.dataSource.select(filter, options).then(function(data) {
                resolve(data);
                switchToSelect2();
                _this.loaded = true;
              }).catch(function(data) {
                reject(data);
              });
            }
          } else {
            resolve({ request: {}, options: options, response: []});
            _this.loaded = true;
            _this.events.trigger('load', []);
          }
        }

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

    if (_this.dataSource) {

      _this.dataSource.on('select', function(data) {
        if (_this.isValid()) {
          if (!_this.options.lookupMode) {
            render(data);
          }
          switchToSelect2();
        }
        _this.events.trigger('load', data);
      });

      _this.dataSource.after('insert', function(result, data) {
        if (result && _this.isValid()) {
          if (!_this.options.lookupMode) {
            _this.selector.append($(renderRow(data)));
          }
          switchToSelect2();
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('update', function(result, data) {
        if (result && _this.isValid()) {
          if (!_this.options.lookupMode) {
            if (data[_this.options.valueField]) {
              _this.selector.find('option[value=' + data[_this.options.valueField] +']').text(getName(data));
            }
          }
          switchToSelect2();
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('remove', function(result, data) {
        if (result && _this.isValid()) {
          if (!_this.options.lookupMode) {
            if (data[_this.options.valueField]) {
              _this.selector.find('option[value=' + data[_this.options.valueField] +']').remove();
            }
          }
          switchToSelect2();
        }
        _this.events.trigger('change');
      });

    }

    if (_this.options.saveSelection && (!_this.dataSource || _this.options.lookupMode)) {

      if (_this.options.saveToSessionStorage) {
        _this.options.selectedValue = br.session.get(storageTag(_this.selector));
      } else {
        _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
      }

      if (!br.isEmpty(_this.options.selectedValue)) {
        _this.val(_this.options.selectedValue);
      }

    }

    switchToSelect2();

    _this.selector.on('change', function() {
      if (_this.options.saveSelection) {
        if (_this.options.saveToSessionStorage) {
          br.session.set(storageTag(this), $(this).val());
        } else {
          br.storage.set(storageTag(this), $(this).val());
        }
      }
      _this.events.trigger('change');
      switchToSelect2();
    });

    this.selector.data('BrDataCombo', _this);

  }

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  };

})(jQuery, window);
