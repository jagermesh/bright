/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrTable(selector, options) {

    var _this = this;
    var table = $(selector);
    var thead = $('thead', table);
    var tbody = $('tbody', table);
    var initialized = false;
    var calcDiv;

    _this.options = options || { };

    if (_this.options.debug) {
      calcDiv = $('<div />');
    } else {
      calcDiv = $('<div style="height:0px;overflow:hidden;"/>');
    }
    table.parent().append(calcDiv);

    $(table).css('border-bottom', '0px');

    if (_this.options.autoHeight) {
      table.css('margin-bottom', '0px');
    }

    if (_this.options.autoWidth) {
      thead.on('scroll', function() {
        tbody[0].scrollLeft = thead[0].scrollLeft;
      });
      tbody.on('scroll', function() {
        thead[0].scrollLeft = tbody[0].scrollLeft;
      });
    }

    function autosize() {

      if (_this.options.autoHeight) {
        var windowHeight = $(window).height();
        var tableTop     = table.offset().top;
        var tbodyHeight  = windowHeight - tableTop - thead.height();
        if (_this.options.debug) {
          tbodyHeight -= 200;
        } else {
          tbodyHeight -= 10;
        }
        tbody.height(tbodyHeight);
      }

      if (_this.options.autoWidth) {
        thead.width(table.width());
        tbody.width(table.width());
      }

    }

    function getBorderWidth(el) {

      var result = 0;
      if ($(el).css('border-left-width')) {
        result += br.toInt($(el).css('border-left-width').replace('px', ''));
      }
      if ($(el).css('border-right-width')) {
        result += br.toInt($(el).css('border-right-width').replace('px', ''));
      }
      return result;

    }

    function getPadding(el) {

      var result = 0;
      if ($(el).css('padding-left')) {
        result += br.toInt($(el).css('padding-left').replace('px', ''));
      }
      if ($(el).css('padding-right')) {
        result += br.toInt($(el).css('padding-right').replace('px', ''));
      }
      return result;

    }

    function update() {

      var headerCols = $(table).find('thead tr:first th');
      var bodyCols   = $(table).find('tbody tr:first td');

      var widths = {};

      var tableCopy = table.clone();
      var theadCopy = $('thead', tableCopy);
      var tbodyCopy = $('tbody', tableCopy);
      theadCopy.css('display', '').css('overflow', '');
      tbodyCopy.css('display', '').css('overflow', '');
      var theadColsCopy = theadCopy.find('tr:first th');
      theadColsCopy.each(function(idx) {
        $(this).css('min-width', '');
        $(this).css('max-width', '');
      });
      var tbodyColsCopy = tbodyCopy.find('tr:first td');
      tbodyColsCopy.each(function(idx) {
        $(this).css('min-width', '');
        $(this).css('max-width', '');
      });

      calcDiv.html('');
      calcDiv.append(tableCopy);

      theadColsCopy.each(function(idx) {
        widths[idx] = { h: $(this).outerWidth(), b: 0, m: 0 };
      });

      tbodyColsCopy.each(function(idx) {
        widths[idx].b = $(this).outerWidth();
        widths[idx].m = Math.max(widths[idx].h, widths[idx].b);
      });

      calcDiv.html('');

      headerCols.each(function(idx) {
        $(this).css('min-width', widths[idx].h - getPadding(this) - getBorderWidth(this));
        $(this).css('max-width', widths[idx].h - getPadding(this) - getBorderWidth(this));
      });
      bodyCols.each(function(idx) {
        $(this).css('min-width', widths[idx].b - getPadding(this) - getBorderWidth(this));
        $(this).css('max-width', widths[idx].b - getPadding(this) - getBorderWidth(this));
      });

      if (!initialized) {
        thead.css('display', 'block').css('overflow', 'hidden');
        tbody.css('display', 'block').css('overflow', 'auto');
        initialized = true;
      }

      autosize();

    }

    var updateTimer;

    this.update = function() {
      window.clearTimeout(updateTimer);
      updateTimer = window.setTimeout(function() {
        update();
      }, 100);
    };

    $(window).on('resize', function() {
      _this.update();
    });

    $(window).on('scroll', function() {
      autosize();
    });

    _this.update();

    return this;

  }

  window.br = window.br || {};

  window.br.table = function(selector, options) {
    return new BrTable($(selector), options);
  };

})(jQuery, window);
