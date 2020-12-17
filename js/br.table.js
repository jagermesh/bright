/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrTable(selector, options) {

    const _this = this;

    let initialized = false;

    let table = $(selector);
    let thead = $('thead', table);
    let tbody = $('tbody', table);

    let tableCopy;
    let theadCopy;
    let tbodyCopy;
    let theadColsCopy;
    let tbodyColsCopy;

    let calcDiv;
    let imagesCounter = 0;

    _this.options = options || Object.create({ });

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
        let windowHeight = $(window).height();
        let scrollTop    = $(window).scrollTop() > 0 ? $(window).scrollTop() + 20 : 0;
        let tableTop     = table.offset().top - scrollTop;
        let tbodyHeight  = windowHeight - tableTop - thead.height();
        if (_this.options.debug) {
          tbodyHeight -= 200;
        } else {
          tbodyHeight -= 20;
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
        let c = $(container);
        let v = Math.round(value);
        let e = c.find('span.br-table-debug');
        if (e.length == 0) {
          c.append('<br /><span class="br-table-debug" style="font-size:8px;">' + v + '</span>');
        } else {
          e.text(v);
        }
      }

    }

    function getWidths() {

      let widths = Object.create({});

      theadColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0 };
      });

      tbodyColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx].b = w;
      });

      return widths;

    }

    function createCopy() {

      tableCopy = table.clone();
      let theadCopy = tableCopy[0].getElementsByTagName('thead')[0];
      let tbodyCopy = tableCopy[0].getElementsByTagName('tbody')[0];
      theadColsCopy = $(theadCopy).find('tr:first>th');
      tbodyColsCopy = $(tbodyCopy).find('tr:first>td');

      theadCopy.style.display = '';
      theadCopy.style.overflow = '';
      tbodyCopy.style.display = '';
      tbodyCopy.style.overflow = '';

      theadColsCopy.each(function(idx) {
        this.style.boxSizing = 'border-box';
        this.style.minWidth = '';
        this.style.maxWidth = '';
      });

      tbodyColsCopy.each(function(idx) {
        this.style.boxSizing = 'border-box';
        this.style.minWidth = '';
        this.style.maxWidth = '';
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
        thead.css({ 'display': 'block', 'box-sizing': 'border-box', 'overflow': 'hidden' });
        tbody.css({ 'display': 'block', 'box-sizing': 'border-box', 'overflow': 'auto' });
        table.css({ 'border-bottom': '0px', 'border-left': '0px', 'border-right': '0px' });
        initialized = true;
      }

      if (!tableCopy || !skipCalcDivReloading) {
        createCopy();
      }

      window.setTimeout(function() {

        let widths = getWidths();

        let headerCols = table.find('thead tr:first th');

        headerCols.each(function(idx) {
          let w = widths[idx].h;
          debugValue(this, w);
          this.style.boxSizing = 'border-box';
          this.style.minWidth = w + 'px';
          this.style.maxWidth = w + 'px';
        });

        let bodyCols   = table.find('tbody tr:first>td');

        bodyCols.each(function(idx) {
          let w = widths[idx].b;
          debugValue(this, w);
          this.style.boxSizing = 'border-box';
          this.style.minWidth = w + 'px';
          this.style.maxWidth = w + 'px';
        });

        autosize();

        if (imagesCounter == 0) {
          if (!_this.options.debug) {
            calcDiv.html('');
            tableCopy.remove();
            tableCopy = null;
          }
        }

      });

    }

    let updateTimer, autosizeTimer;

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
      window.clearTimeout(autosizeTimer);
      autosizeTimer = window.setTimeout(function() {
        autosize();
      }, 100);
    });

    _this.update();

    return this;

  }

  window.br.table = function(selector, options) {
    return new BrTable($(selector), options);
  };

})(jQuery, window);
