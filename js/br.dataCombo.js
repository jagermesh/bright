//
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
//

(function ($, window) {

  function BrDataCombo(selector, dataSource, options) {

    var _this = this;

    this.selector = $(selector);
    this.dataSource = dataSource;
    this.options = options || {};
    this.fields = this.options.fields || {};
    this.saveSelection = this.options.saveSelection || false;
    this.selectedValueField = this.options.selectedValueField || null;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.val = function(value) {
      if (value !== undefined) {
        $(this.selector).val(value);
      }
      return $(this.selector).val();
    }

    this.valOrNull = function() {
      var val = this.val();
      return br.isEmpty(val) ? null : val;
    }

    function storageTag(c) {

      return document.location.toString() + ':filter-value:' + $(c).attr('name');
    }

    function render(data) {

      var options = _this.options;

      if (_this.saveSelection) {
        options.selectedValue = br.storage.get(storageTag(_this.selector));
      }

      var valueField = options.valueField || 'rowid';
      var nameField = options.nameField || 'name';
      var hideEmptyValue = options.hideEmptyValue || false;
      var levelField = options.levelField || null;
      var emptyName = (typeof options.emptyName == 'undefined' ? '--any--' : options.emptyName);
      var emptyValue = (typeof options.emptyValue == 'undefined' ? '' : options.emptyValue);
      var selectedValue = options.selectedValue || null;
      var selectedValueField = options.selectedValueField || null;

      _this.selector.each(function() {
        var val = $(this).val();
        if (br.isEmpty(val)) {
          val = $(this).attr('data-value');
          $(this).removeAttr('data-value');
        }
        $(this).html('');
        var s = '';
        if (!hideEmptyValue) {
          s = s + '<option value="' + emptyValue + '">' + emptyName + '</option>';
        }
        for(var i in data) {
          if (!selectedValue && selectedValueField) {
            if (data[i][selectedValueField] == '1') {
              selectedValue = data[i][valueField];
            }
          }
          s = s + '<option value="' + data[i][valueField] + '">';
          if (levelField !== null) {
            var margin = (br.toInt(data[i][levelField]) - 1) * 4;
            for(var k = 0; k < margin; k++) {
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

      _this.events.trigger('load', data);

      if (window.Select2) {
        $(_this.selector).select2();
      }

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      _this.dataSource.select(filter, function(result, response) {
        if (result) {
          if (callback) {
            callback.call(_this.selector, result, response);
          }
          if (window.Select2) {
            $(_this.selector).select2();
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
  //    _this.selector.find('option[value=' + rowid +']').remove();
    });

    _this.dataSource.on('remove', function(rowid) {
      _this.selector.find('option[value=' + rowid +']').remove();
      _this.events.trigger('change');
    });

    _this.selector.change(function() {
      if (_this.saveSelection) {
        br.storage.set(storageTag(this), $(this).val());
      }
      _this.events.trigger('change');
      if (window.Select2) {
        $(this).select2();
      }
    });

  }

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  }

})(jQuery, window);
