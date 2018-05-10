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

    _this.options = options || { };

    $('thead', table).css('display', 'block');
    $('tbody', table).css('display', 'block').css('overflow', 'auto');

    $(table).css('border-bottom', '0px');

    var headerCols = $(table).find('thead tr:first th');
    var headerWidths = {};

    var widthsSaved = false;

    function getTableDmensions() {

      var widestCellByInnerWidth = 0;
      var widestCellByOuterWidth = 0;
      var maxInnerWidth = 0;
      var maxOuterWidth = 0;
      var totalInnerWidth = 0;
      var totalOuterWidth = 0;

      table.find('tbody tr:first td').each(function(idx) {
        var innerWidth = $(this).innerWidth();
        var outerWidth = $(this).outerWidth();
        totalInnerWidth += outerWidth;
        totalOuterWidth += outerWidth;
        if (innerWidth > maxInnerWidth) {
          maxInnerWidth = innerWidth;
          widestCellByInnerWidth = idx;
        }
        if (outerWidth > maxOuterWidth) {
          maxOuterWidth = outerWidth;
          widestCellByOuterWidth = idx;
        }
      });

      var tableInnerWidth = $(table).innerWidth();
      var tableOuterWidth = $(table).outerWidth();

      var suggestedInnerWidth = totalInnerWidth - (totalInnerWidth - maxInnerWidth);
      var suggestedOuterWidth = tableOuterWidth - (totalOuterWidth - maxOuterWidth);

      return { widestCellByInnerWidth: widestCellByInnerWidth
             , widestCellByOuterWidth: widestCellByInnerWidth
             , suggestedInnerWidth: suggestedInnerWidth
             , suggestedOuterWidth: suggestedOuterWidth
             };

    }

    function update() {

      var headerCols = $(table).find('thead tr:first th');

      if (_this.options.autoHeight) {
        var windowHeight = $(window).height();
        var tbody        = $('tbody', table);
        var thead        = $('thead', table);
        var tbodyTop     = tbody.offset().top;
        var tbodyHeight  = windowHeight - tbodyTop - 24;
        $(tbody).height(tbodyHeight);
      }

      var bodyCols = $(table).find('tbody tr:first td');

      if (bodyCols.length > 0) {

        if (widthsSaved) {
          headerCols.each(function(idx) {
            $(this).outerWidth(headerWidths[idx]);
          });
        } else {
          headerCols.each(function(idx) {
            headerWidths[idx] = $(this).outerWidth();
          });
          widthsSaved = true;
        }

        var dimensinos = getTableDmensions();

        $(bodyCols[dimensinos.widestCellByOuterWidth]).outerWidth(0);

        bodyCols.each(function(idx) {
          if (idx != dimensinos.widestCellByOuterWidth) {
            var headerCol  = $(headerCols[idx]);
            var outerWidth = $(this).outerWidth();
            var width = Math.max(outerWidth, headerWidths[idx]);
            $(this).outerWidth(width);
            outerWidth = $(this).outerWidth();
            width = Math.max(outerWidth, headerWidths[idx]);
            headerCol.outerWidth(width);
          }
        });

        dimensinos = getTableDmensions();

        $(bodyCols[dimensinos.widestCellByOuterWidth]).outerWidth(dimensinos.suggestedOuterWidth);

        bodyCols.each(function(idx) {
          var headerCol  = $(headerCols[idx]);
          var outerWidth = $(this).outerWidth();
          headerCol.outerWidth(outerWidth);
        });

        $(table).find('img').on('load', function() {
          if (!$(this).data('bright-fixed-table-loaded')) {
            $(this).data('bright-fixed-table-loaded', true);
            _this.update();
          }
        });

      }

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
      _this.update();
    });

    _this.update();

    return this;

  }

  window.br = window.br || {};

  window.br.table = function(selector, options) {
    return new BrTable($(selector), options);
  };

})(jQuery, window);
