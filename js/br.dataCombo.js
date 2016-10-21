/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataCombo(selector, dataSource, options) {

    var _this = this;

    this.selector = $(selector);

    this.dataSource = dataSource;

    this.options = options || {};
    this.options.valueField = this.options.valueField || 'rowid';
    this.options.nameField = this.options.nameField || 'name';
    this.options.levelField = this.options.levelField || null;
    this.options.selectedValue = this.options.selectedValue || null;
    this.options.skipTranslate = this.options.skipTranslate || null;
    this.options.selectedValueField = this.options.selectedValueField || null;
    this.options.hideEmptyValue = this.options.hideEmptyValue || (this.selector.attr('multiple') == 'multiple');
    this.options.emptyName = (typeof this.options.emptyName == 'undefined' ? '--any--' : this.options.emptyName);
    this.options.emptyValue = (typeof this.options.emptyValue == 'undefined' ? '' : this.options.emptyValue);
    this.options.allowClear = (typeof this.options.allowClear == 'undefined' ? false : this.options.allowClear);
    this.loaded = false;

    if (this.options.skipTranslate) {
      this.selector.addClass('skiptranslate');
    }

    this.fields = this.options.fields || {};
    this.saveSelection = this.options.saveSelection || false;
    this.saveToSessionStorage = this.options.saveToSessionStorage || false;
    this.selectedValueField = this.options.selectedValueField || null;
    this.noDecoration = this.options.noDecoration;// || (this.selector.attr('multiple') == 'multiple');

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

    function uiSync() {
      if (_this.isValid() && window.Select2 && !_this.noDecoration && !_this.selector.attr('size')) {
        var params = {};
        if (_this.options.skipTranslate) {
          params.dropdownCssClass = 'skiptranslate';
        }
        if (_this.options.allowClear) {
          params.allowClear = _this.options.allowClear;
          params.placeholder = _this.options.emptyName;
        }
        params.dropdownAutoWidth = true;
        _this.selector.select2(params);
      }
    }

    var currentData = [];

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

    this.val = function(value) {
      if (value !== undefined) {
        if (_this.saveSelection) {
          if (_this.saveToSessionStorage) {
            br.session.set(storageTag(_this.selector), value);
          } else {
            br.storage.set(storageTag(_this.selector), value);
          }
        }
        if (_this.isValid()) {
          _this.selector.val(value);
          uiSync();
        }
      }
      if (_this.isValid()) {
        var val =_this.selector.val();
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
          uiSync();
        }
      }
    };

    this.selector.on('reset', function() {
      _this.reset();
    });

    function getName(data) {

      if (br.isFunction(_this.options.onGetName)) {
        return _this.options.onGetName.call(this, data);
      } else {
        return data[_this.options.nameField];
      }

    }

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

      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
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

      uiSync();

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      if (_this.dataSource) {
        if (_this.isValid()) {
          _this.dataSource.select(filter, function(result, response) {
            if (result) {
              if (callback) {
                callback.call(_this.selector, result, response);
              }
              uiSync();
              _this.loaded = true;
            }
          }, { fields: _this.fields });
        } else {
          if (callback) {
            callback.call(_this.selector, true, []);
          }
          _this.loaded = true;
          _this.events.trigger('load', []);
        }
      }
    };

    if (_this.dataSource) {

      _this.dataSource.on('select', function(data) {
        if (_this.isValid()) {
          render(data);
        }
        _this.events.trigger('load', data);
      });

      _this.dataSource.after('insert', function(result, data) {
        if (result && _this.isValid()) {
          _this.selector.append($(renderRow(data)));
          uiSync();
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('update', function(result, data) {
        if (result && _this.isValid()) {
          if (data[_this.options.valueField]) {
            _this.selector.find('option[value=' + data[_this.options.valueField] +']').text(getName(data));
            uiSync();
          }
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('remove', function(result, data) {
        if (result && _this.isValid()) {
          if (data[_this.options.valueField]) {
            _this.selector.find('option[value=' + data[_this.options.valueField] +']').remove();
            uiSync();
          }
        }
        _this.events.trigger('change');
      });

    } else {

      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
          _this.options.selectedValue = br.session.get(storageTag(_this.selector));
        } else {
          _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
        }
        if (!br.isEmpty(_this.options.selectedValue)) {
          _this.val(_this.options.selectedValue);
        }
      }

      uiSync();

    }

    _this.selector.change(function() {
      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
          br.session.set(storageTag(this), $(this).val());
        } else {
          br.storage.set(storageTag(this), $(this).val());
        }
      }
      _this.events.trigger('change');
      uiSync();
    });

  }

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  };

})(jQuery, window);
