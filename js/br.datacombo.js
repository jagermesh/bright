// 
// Breeze Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  }

  function BrDataCombo(selector, dataSource, options) {

    var $ = jQuery;
    var _this = this;

    _this.selector = selector;
    _this.dataSource = dataSource;
    _this.options = options || {};
    _this.fields = _this.options.fields || {};
    _this.saveSelection = _this.options.saveSelection || false;
    _this.selectedValueField = _this.options.selectedValueField || null;

    _this.cb = {};

    _this.on = function(event, callback) {
      _this.cb[event] = this.cb[event] || new Array();
      _this.cb[event][this.cb[event].length] = callback;
    }

    function callEvent(event, data) {
      _this.cb[event] = _this.cb[event] || new Array();
      for (i in _this.cb[event]) {
        _this.cb[event][i].call($(_this.selector), data);
      }
    }

    function storageTag(c) {

      return document.location.toString() + ':filter-value:' + $(c).attr('name');
    }

    function render(data) {

      var options = _this.options;

      if (_this.saveSelection) {
        options.selectedValue = br.storage.get(storageTag(_this.selector));
      }

      valueField = options.valueField || 'rowid';
      nameField = options.nameField || 'name';
      hideEmptyValue = options.hideEmptyValue || false;
      levelField = options.levelField || null;
      emptyValue = options.emptyValue || '-- any --';
      selectedValue = options.selectedValue || null;
      selectedValueField = options.selectedValueField || null;
      $(_this.selector).each(function() {
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
        for(i in data) {
          if (!selectedValue && selectedValueField) {
            if (data[i][selectedValueField] == '1') {
              selectedValue = data[i][valueField];
            }
          }
          s = s + '<option value="' + data[i][valueField] + '">';
          if (levelField != null) {
            var margin = (br.toInt(data[i][levelField]) - 1) * 4;
            for(k = 0; k < margin; k++) {
              s = s + '&nbsp;';
            }
          }        
          s = s + data[i][nameField];
          s = s + '</option>';
        }
        $(this).html(s);
        if (!br.isEmpty(selectedValue)) {
          val = selectedValue;
        }
        if (!br.isEmpty(val)) {
          $(this).find('option[value=' + val +']').attr('selected', 'selected');
        }
      });
    
      // _this.dataSource.fillCombo(_this.selector, data, options);
      callEvent('load', data);

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      _this.dataSource.select(filter, function(result) {
        if (result) {
          if (callback) {
            callback.call($(_this.selector), result);
          }
        }
      }, { fields: _this.fields });
    }

    _this.dataSource.on('select', function(data) {
      render(data);
    });

    _this.dataSource.on('insert', function(data) {
  //    insert(data, true);
    });

    _this.dataSource.on('update', function(data) {
  //    $(_this.selector).find('option[value=' + rowid +']').remove();
    });

    _this.dataSource.on('remove', function(rowid) {
      $(_this.selector).find('option[value=' + rowid +']').remove();
      callEvent('change');
    });

    $(_this.selector).change(function() {
      if (_this.saveSelection) {
        br.storage.set(storageTag(this), $(this).val());
      }
      callEvent('change');
    });

  }

}(jQuery, window);


