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

    var initialized = false;

    var table = $(selector);
    var thead = $('thead', table);
    var tbody = $('tbody', table);

    var tableCopy;
    var theadCopy;
    var tbodyCopy;
    var theadColsCopy;
    var tbodyColsCopy;

    var calcDiv;
    var imagesCounter = 0;

    _this.options = options || { };

    if (_this.options.debug) {
      calcDiv = $('<div />');
    } else {
      calcDiv = $('<div style="height:0px;overflow:hidden;"/>');
    }

    table.parent().append(calcDiv);

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

    function debugValue(container, value) {

      if (_this.options.debug) {
        var c = $(container);
        var v = Math.round(value);
        var e = c.find('span.br-table-debug');
        if (e.length == 0) {
          c.append('<br /><span class="br-table-debug">' + v + '</span>');
        } else {
          e.text(v);
        }
      }

    }

    function getWidths() {

      var widths = {};

      theadColsCopy.each(function(idx) {
        var w = $(this)[0].getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0, m: 0 };
      });

      tbodyColsCopy.each(function(idx) {
        var w = $(this)[0].getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0, m: 0 };
      });

      return widths;

    }

    function createCopy() {

      tableCopy = table.clone();
      theadCopy = $('thead', tableCopy);
      tbodyCopy = $('tbody', tableCopy);
      theadColsCopy = theadCopy.find('tr:first th');
      tbodyColsCopy = tbodyCopy.find('tr:first td');

      theadCopy.css('display', '').css('overflow', '');
      tbodyCopy.css('display', '').css('overflow', '');

      theadColsCopy.each(function(idx) {
        var c = $(this);
        c.css('min-width', '').css('max-width', '');
      });

      tbodyColsCopy.each(function(idx) {
        var c = $(this);
        c.css('min-width', '').css('max-width', '');
      });

      calcDiv.html('');
      calcDiv.append(tableCopy);

      imagesCounter = 0;

      $('img', calcDiv).each(function() {
        imagesCounter++;
        this.onload = function() {
          imagesCounter--;
          _this.update(true);
        };
        this.onerror = function() {
          imagesCounter--;
          _this.update(true);
        };
      });

    }

    function update(skipCalcDivReloading) {

      if (!initialized) {
        thead.css({ 'display': 'block', 'overflow': 'hidden' });
        tbody.css({ 'display': 'block', 'overflow': 'auto' });
        table.css({ 'border-bottom': '0px', 'border-left': '0px', 'border-right': '0px' });
        initialized = true;
      }

      if (!tableCopy || !skipCalcDivReloading) {
        createCopy();
      }

      window.setTimeout(function() {

        var widths = getWidths();

        var headerCols = table.find('thead tr:first th');

        headerCols.each(function(idx) {
          var w = widths[idx].h;
          var c = $(this);
          debugValue(c, w);
          c.css({ 'min-width': w, 'max-width': w });
        });

        var bodyCols   = table.find('tbody tr:first td');

        bodyCols.each(function(idx) {
          var w = widths[idx].h;
          var c = $(this);
          debugValue(c, w);
          c.css({ 'min-width': w, 'max-width': w });
        });

        autosize();

        if (imagesCounter == 0) {
          calcDiv.html('');
          tableCopy.remove();
          tableCopy = null;
        }

      });

    }

    var updateTimer;

    _this.update = function(skipCalcDivReloading) {
      window.clearTimeout(updateTimer);
      updateTimer = window.setTimeout(function() {
        update(skipCalcDivReloading);
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
