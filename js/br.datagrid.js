// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataGrid = function (selector, rowTemplate, dataSource, options) {
    return new BrDataGrid(selector, rowTemplate, dataSource, options);
  }

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var $ = jQuery;
    var _this = this;

    // this.cb = {};
    this.selector = $(selector);
    this.options = options || {};
    this.options.templates = this.options.templates || {};
    this.options.templates.row = $(rowTemplate).html();
    this.options.templates.header = this.options.templates.header ? $(this.options.templates.header).html() : '';
    this.options.templates.footer = this.options.templates.footer ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData = this.options.templates.noData ? $(this.options.templates.noData).html() : '';
    this.options.dataSource = dataSource;
    this.options.headersSelector = this.options.headersSelector || this.selector;
    this.options.footersSelector = this.options.footersSelector || this.selector;
    this.options.selectors = this.options.selectors || {};

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.after('insert', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('update', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('remove', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('select', function(data) { 
      _this.events.trigger('change', data);
    });

    this.renderHeader = function(data) {
      var data = _this.events.trigger('renderHeader', data) || data;
      var result = $(br.fetch(_this.options.templates.header, data));
      return result;
    }

    this.renderFooter = function(data) {
      var data = _this.events.trigger('renderFooter', data) || data;
      var result = $(br.fetch(_this.options.templates.footer, data));
      return result;
    }

    this.renderRow = function(data) {
      var data = _this.events.trigger('renderRow', data) || data;
      var result = $(br.fetch(_this.options.templates.row, data));
      result.data('data-row', data);
      return result;
    }

    this.prepend = function(row) {
      return _this.selector.prepend(row);
    }

    this.append = function(row) {
      return _this.selector.append(row);
    }

    this.addDataRow = function(row) {
      var tableRow = _this.renderRow(row);
      if (_this.options.appendInInsert) {
        _this.append(tableRow);
      } else {
        _this.prepend(tableRow);
      }
      return tableRow;
    }

    this.init = function() {

      function isGridEmpty() {
        return (_this.selector.find('[data-rowid]').length == 0);
      }

      function checkForEmptyGrid() {
        if (isGridEmpty()) {
          _this.selector.html(_this.options.templates.noData);
          _this.events.trigger('nodata');
        }
      }

      if (this.options.dataSource) {

        var dataSource = this.options.dataSource;

        dataSource.before('select', function() {
          _this.selector.html('');
          _this.selector.addClass('progress-big');
        });

        dataSource.after('select', function() {
          _this.selector.removeClass('progress-big');
        });

        dataSource.on('select', function(data) {
          _this.selector.removeClass('progress-big');
          _this.render(data);
        });

        dataSource.after('insert', function(success, response) {
          if (success) {
            if (isGridEmpty()) {
              _this.selector.html(''); // to remove No-Data box
            }
            _this.addDataRow(response);
          }
        });

        dataSource.on('update', function(data) {
          var row = _this.selector.find('[data-rowid=' + data.rowid + ']');
          if (row.length == 1) {
            var ctrl = _this.renderRow(data);
            var s = ctrl.html();
            ctrl.remove();
            if (s.length > 0) {
              $(row[0]).html(s).hide().fadeIn();
              _this.events.trigger('update');
            } else {
              _this.options.dataSource.select();
            }
          } else {
            _this.options.dataSource.select();
          }
        });

        dataSource.on('remove', function(rowid) {
          var row = _this.selector.find('[data-rowid=' + rowid + ']');
          if (row.length > 0) {
            if (br.isTouchScreen()) {
              row.remove();
              checkForEmptyGrid();
              _this.events.trigger('remove');
            } else {
              row.fadeOut(function() {
                $(this).remove();
                checkForEmptyGrid();
                _this.events.trigger('remove');
              });
            }
          } else {
            _this.options.dataSource.select();
          }
        });

        if (this.options.deleteSelector) {
          _this.selector.on('click', this.options.deleteSelector, function() {
            var row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              var rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm( 'Delete confirmation'
                          , 'Are you sure you want delete this record?'
                          , function() {
                              _this.options.dataSource.remove(rowid);
                            }
                          );
              }
            }
          });
        }

      }

    }

    this.render = function(data) {
      if (data) {
        if (_this.options.freeGrid) {
          if (data.headers) {
            for (i in data.headers) {
              if (data.headers[i]) {
                $(_this.options.headersSelector).append(_this.renderHeader(data.headers[i]));
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                $(_this.options.footersSelector).append(_this.renderFooter(data.headers[i]));
              }
            }
          }
          _this.selector.html('');
          $(_this.options.headersSelector).html('');
          $(_this.options.footersSelector).html('');
          if (data.rows) {
            if (data.rows.length == 0) {
              _this.selector.html(this.options.templates.noData);
            } else {
              for (i in data.rows) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    _this.selector.append(_this.renderRow(data.rows[i].row));
                  }
                  if (data.rows[i].header) {
                    $(_this.options.headersSelector).append(_this.renderHeader(data.rows[i].header));
                  }
                  if (data.rows[i].footer) {
                    $(_this.options.footersSelector).append(_this.renderFooter(data.rows[i].footer));
                  }
                }
              }
            }
          } else {
            _this.selector.html(this.options.templates.noData);
          }
        } else {
          _this.selector.html('');
          if (data && (data.length > 0)) {
            for (i in data) {
              if (data[i]) {
                _this.selector.append(_this.renderRow(data[i]));
              }
            }
          } else {
            _this.selector.html(this.options.templates.noData);
          }
        }
      } else {
        _this.selector.html(this.options.templates.noData);
      }
      _this.events.trigger('change', data);
    }

    return this.init();

  }

}(jQuery, window);
