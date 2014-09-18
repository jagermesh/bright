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
    this.options.selectedValueField = this.options.selectedValueField || null;
    this.options.hideEmptyValue = this.options.hideEmptyValue || (this.selector.attr('multiple') == 'multiple');
    this.options.emptyName = (typeof this.options.emptyName == 'undefined' ? '--any--' : this.options.emptyName);
    this.options.emptyValue = (typeof this.options.emptyValue == 'undefined' ? '' : this.options.emptyValue);
    this.loaded = false;

    this.fields = this.options.fields || {};
    this.saveSelection = this.options.saveSelection || false;
    this.selectedValueField = this.options.selectedValueField || null;
    this.noDecoration = this.options.noDecoration;// || (this.selector.attr('multiple') == 'multiple');

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

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
      var storageKey = $(c).attr('data-storage-key');
      if (br.isEmpty(storageKey)) {
        storageKey = ':';
      }
      return document.location.pathname + ':filter-value:' + $(c).attr('name') + storageKey;
    }

    function uiSync() {
      if (_this.isValid() && window.Select2 && !_this.noDecoration && !_this.selector.attr('size')) {
        _this.selector.select2();
      }
    }

    this.val = function(value) {
      if (value !== undefined) {
        if (_this.saveSelection) {
          br.storage.set(storageTag(_this.selector), value);
        }
        if (_this.isValid()) {
          _this.selector.val(value);
          uiSync();
        }
      }
      if (_this.isValid()) {
        return _this.selector.val();
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

    function renderRow(data) {

      var s = '';
      s = s + '<option value="' + data[_this.options.valueField] + '">';
      if (br.isEmpty(_this.options.levelField)) {

      } else {
        var margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for (var k = 0; k < margin; k++) {
          s = s + '&nbsp;';
        }
      }
      s = s + data[_this.options.nameField];
      s = s + '</option>';

      return s;

    }

    function render(data) {

      if (_this.isValid()) {

        if (_this.saveSelection) {
          _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
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
          if (_this.options.hideEmptyValue) {

          } else {
            cbObj.s = s;
            _this.events.triggerBefore('generateEmptyOption', cbObj, $(this));
            s = cbObj.s;
            s = s + '<option value="' + _this.options.emptyValue + '">' + _this.options.emptyName + '</option>';
          }

          cbObj.s = s;
          _this.events.triggerBefore('generateOptions', cbObj, $(this));
          s = cbObj.s;

          for(var i in data) {
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
          }

        });

        uiSync();
      }

      _this.events.trigger('load', data);

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      if (_this.dataSource) {
        _this.dataSource.select(filter, function(result, response) {
          if (result) {
            if (callback) {
              callback.call(_this.selector, result, response);
            }
            uiSync();
            _this.loaded = true;
          }
        }, { fields: _this.fields });
      }
    };

    if (_this.dataSource) {

      _this.dataSource.on('select', function(data) {
        render(data);
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
            _this.selector.find('option[value=' + data[_this.options.valueField] +']').text(data[_this.options.nameField]);
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
        _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
        if (!br.isEmpty(_this.options.selectedValue)) {
          _this.val(_this.options.selectedValue);
        }
      }

    }

    _this.selector.change(function() {
      if (_this.saveSelection) {
        br.storage.set(storageTag(this), $(this).val());
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
