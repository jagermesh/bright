/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var _this = this;

    this.selector = selector;
    this.options = options || {};
    this.options.templates = this.options.templates || {};
    this.options.templates.row = $(rowTemplate).html();
    this.options.templates.groupRow = this.options.templates.groupRow ? $(this.options.templates.groupRow).html() : '';
    this.options.templates.header = this.options.templates.header ? $(this.options.templates.header).html() : '';
    this.options.templates.footer = this.options.templates.footer ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData = this.options.templates.noData ? $(this.options.templates.noData).html() : '';
    this.options.dataSource = dataSource;
    this.options.selectors = this.options.selectors || {};
    this.options.selectors.header = this.options.selectors.header || this.options.headersSelector || this.selector;
    this.options.selectors.footer = this.options.selectors.footer || this.options.footersSelector || this.selector;
    this.options.selectors.remove = this.options.selectors.remove || this.options.deleteSelector  || '.action-delete';

    this.dataSource = this.options.dataSource;
    this.storageTag = document.location.pathname + this.dataSource.options.restServiceUrl;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    var loadingMoreData = false;
    var noMoreData = false;

    this.after('insert', function(data) {
      _this.events.trigger('change', data, 'insert');
      _this.events.triggerAfter('change', data, 'insert');
    });

    this.after('update', function(data) {
      _this.events.trigger('change', data, 'update');
      _this.events.triggerAfter('change', data, 'update');
    });

    this.after('remove', function(data) {
      _this.events.trigger('change', data, 'remove');
      _this.events.triggerAfter('change', data, 'remove');
    });

    this.renderHeader = function(data) {
      data = _this.events.trigger('renderHeader', data) || data;
      return $(br.fetch(_this.options.templates.header, data));
    };

    this.renderFooter = function(data) {
      data = _this.events.trigger('renderFooter', data) || data;
      return $(br.fetch(_this.options.templates.footer, data));
    };

    this.renderRow = function(data) {
      data = _this.events.trigger('renderRow', data) || data;
      var result = $(br.fetch(_this.options.templates.row, data));
      result.data('data-row', data);
      return result;
    };

    this.renderGroupRow = function(data) {
      data = _this.events.trigger('renderGroupRow', data) || data;
      var result = $(br.fetch(_this.options.templates.groupRow, data));
      result.data('data-row', data);
      return result;
    };

    this.prepend = function(row) {
      return $(_this.selector).prepend(row);
    };

    this.append = function(row) {
      return $(_this.selector).append(row);
    };

    this.insertDataRowAfter = function(row, selector) {
      _this.events.triggerBefore('insert', row);
      var tableRow = _this.renderRow(row);
      _this.events.trigger('insert', row, tableRow);
      $(tableRow).insertAfter(selector);
      _this.events.triggerAfter('renderRow', row, tableRow);
      _this.events.triggerAfter('insert', row, tableRow);
      return tableRow;
    };

    this.addDataRow = function(row) {
      _this.events.triggerBefore('insert', row);
      var tableRow = _this.renderRow(row);
      _this.events.trigger('insert', row, tableRow);
      if (_this.options.appendInInsert) {
        _this.append(tableRow);
      } else {
        _this.prepend(tableRow);
      }
      _this.events.triggerAfter('renderRow', row, tableRow);
      _this.events.triggerAfter('insert', row, tableRow);
      return tableRow;
    };

    this.reloadRow = function(rowid) {
      _this.dataSource.selectOne(rowid, function(result, response) {
        if (result) {
          if (_this.refreshRow(response)) {

          } else {
            _this.addDataRow(response);
          }
        }
      }, {disableEvents: true});
    };

    this.refreshRow = function(data) {
      var row = $(_this.selector).find('[data-rowid=' + data.rowid + ']');
      if (row.length == 1) {
        var ctrl = _this.renderRow(data);
        var s = ctrl.html();
        ctrl.remove();
        if (s.length > 0) {
          _this.events.triggerBefore('update', data);
          var $row0 = $(row[0]);
          _this.events.trigger('update', data, $row0);
          $row0.html(s);
          $row0.data('data-row', data);
          _this.events.triggerAfter('update', data, $row0);
          _this.events.triggerAfter('renderRow', row, $row0);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    this.getOrder = function() {
      var order = _this.getOrderAndGroup();
      var result = {};
      if (br.isArray(order)) {
        for(var i = 0; i < order.length; i++) {
          if (order[i].asc) {
            result[order[i].fieldName] = 1;
          } else {
            result[order[i].fieldName] = -1;
          }
        }
      }
      return result;
    };

    this.setOrderAndGroup = function(order) {
      br.storage.set(this.storageTag + 'orderAndGroup', order);
    };

    this.getOrderAndGroup = function() {
      return br.storage.get(this.storageTag + 'orderAndGroup', []);
    };

    this.loadMore = function() {
      if (noMoreData || loadingMoreData) {

      } else {
        loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          loadingMoreData = false;
        }, { loadingMore: true });
      }
    };

    this.init = function() {

      function isGridEmpty() {
        return ($(_this.selector).find('[data-rowid]').length === 0);
      }

      function checkForEmptyGrid() {
        if (isGridEmpty()) {
          _this.events.triggerBefore('nodata');
          $(_this.selector).html(_this.options.templates.noData);
          _this.events.trigger('nodata');
          _this.events.triggerAfter('nodata');
        }
      }

      var order = _this.getOrderAndGroup();
      if (br.isArray(order)) {
        for(i = 0; i < order.length; i++) {
          $('.sortable[data-field="' + order[i].fieldName + '"].' + (order[i].asc ? 'order-asc' : 'order-desc'), $(this.options.selectors.header)).addClass('icon-white').addClass('icon-border');
        }
      }

      $('.sortable', $(_this.options.selectors.header)).each(function() {
        if ($(this).attr('data-sort-order')) {
        } else {
          $(this).attr('data-no-sort-order', true);
        }
      });

      $(this.options.selectors.header).on('click', '.sortable', function() {
        var sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border'));
        if (br.isEmpty($(this).attr('data-sort-order'))) {
          $('.sortable', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border');
        } else {
          $('.sortable[data-no-sort-order]', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border');
        }
        if (sorted) {
          $(this).removeClass('icon-white').removeClass('icon-border');
        } else {
          $(this).siblings('i').removeClass('icon-white').removeClass('icon-border');
          $(this).addClass('icon-white').addClass('icon-border');
        }
        var tmp = [];
        var maxIndex = 0;
        $('.sortable', $(_this.options.selectors.header)).each(function() {
          if ($(this).hasClass('icon-white') || $(this).hasClass('icon-border')) {
            var index = br.isEmpty($(this).attr('data-order-index')) ? maxIndex : br.toInt($(this).attr('data-order-index'));
            maxIndex = index + 1;
            tmp.push({ fieldName: $(this).attr('data-field'), asc: $(this).hasClass('order-asc'), group: $(this).hasClass('group-by'), index: index });
          }
        });
        tmp.sort(function(a, b) {
          if (a.index < b.index) {
            return -1;
          } else
          if (a.index < b.index) {
            return 1;
          } else {
            return 0;
          }
        });
        _this.setOrderAndGroup(tmp);
        _this.events.triggerBefore('changeOrder', tmp);
        _this.dataSource.select();
      });


      if (_this.dataSource) {

        _this.dataSource.before('select', function(request, options) {
          options.order = _this.getOrder();
          if (!loadingMoreData) {
            // $(_this.selector).html('');
            // $(_this.selector).addClass('progress-big');
          }
        });

        _this.dataSource.after('select', function(result, response, request) {
          $(_this.selector).removeClass('progress-big');
          if (result) {
            noMoreData = (response.length === 0);
            _this.render(response, loadingMoreData);
          }
        });

        _this.dataSource.after('insert', function(success, response) {
          if (success) {
            if (isGridEmpty()) {
              $(_this.selector).html(''); // to remove No-Data box
            }
            _this.addDataRow(response);
          }
        });

        _this.dataSource.on('update', function(data) {
          if (_this.refreshRow(data)) {

          } else {
            _this.dataSource.select();
          }
        });

        _this.dataSource.on('remove', function(rowid) {
          var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
          if (row.length > 0) {
            if (br.isTouchScreen()) {
              _this.events.triggerBefore('remove', rowid);
              _this.events.trigger('remove', rowid, row);
              row.remove();
              checkForEmptyGrid();
              _this.events.triggerAfter('remove', rowid, row);
            } else {
              _this.events.triggerBefore('remove', rowid);
              row.fadeOut(function() {
                _this.events.trigger('remove', rowid, $(this));
                $(this).remove();
                _this.events.triggerAfter('remove', rowid, $(this));
                checkForEmptyGrid();
              });
            }
          } else {
            _this.dataSource.select();
          }
        });

        if (this.options.selectors.remove) {
          $(_this.selector).on('click', this.options.selectors.remove, function() {
            var row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              var rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm( 'Delete confirmation'
                          , 'Are you sure you want delete this record?'
                          , function() {
                              _this.dataSource.remove(rowid);
                            }
                          );
              }
            }
          });
        }

      }

    };

    this.render = function(data, loadingMoreData) {
      var $selector = $(_this.selector);
      _this.events.triggerBefore('change', data, 'render');
      if (data) {
        var i, j, k;
        if (!loadingMoreData) {
          $selector.html('');
        }
        if (_this.options.freeGrid) {
          if (data.headers) {
            for (i in data.headers) {
              if (data.headers[i]) {
                $(_this.options.selectors.header).append(_this.renderHeader(data.headers[i]));
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                $(_this.options.selectors.footer).append(_this.renderFooter(data.headers[i]));
              }
            }
          }
          $(_this.options.selectors.header).html('');
          $(_this.options.selectors.footer).html('');
          if (data.rows) {
            if (data.rows.length === 0) {
              $selector.html(this.options.templates.noData);
            } else {
              for (i in data.rows) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    $selector.append(_this.renderRow(data.rows[i].row));
                  }
                  if (data.rows[i].header) {
                    $(_this.options.selectors.header).append(_this.renderHeader(data.rows[i].header));
                  }
                  if (data.rows[i].footer) {
                    $(_this.options.selectors.footer).append(_this.renderFooter(data.rows[i].footer));
                  }
                }
              }
            }
          } else {
            $selector.html(this.options.templates.noData);
          }
        } else {
          if (data && (data.length > 0)) {
            var group = _this.getOrderAndGroup();
            var groupValues = {};
            var groupFieldName = '';
            var $row;
            for (i in data) {
              if (data[i]) {
                if (br.isArray(group)) {
                  for(k = 0; k < group.length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      for(j = k; j < group.length; j++) {
                        groupFieldName = group[j].fieldName;
                        groupValues[groupFieldName] = undefined;
                      }
                      break;
                    }
                  }
                  for(k = 0; k < group.length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      groupValues[groupFieldName] = data[i][groupFieldName];
                      var tmp = data[i];
                      tmp.__groupBy = {};
                      tmp.__groupBy.__field = groupFieldName;
                      tmp.__groupBy.__value = data[i][groupFieldName];
                      tmp.__groupBy[groupFieldName] = true;
                      $selector.append(_this.renderGroupRow(tmp));
                    }
                  }
                }
                $row = _this.renderRow(data[i]);
                $selector.append($row);
                _this.events.triggerAfter('renderRow', data, $row);
              }
            }
          } else
          if (!loadingMoreData) {
            $selector.html(this.options.templates.noData);
          }
        }
      } else {
        $selector.html(this.options.templates.noData);
      }
      _this.events.trigger('change', data, 'render');
      _this.events.triggerAfter('change', data, 'render');
    };

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataGrid = function (selector, rowTemplate, dataSource, options) {
    return new BrDataGrid(selector, rowTemplate, dataSource, options);
  };

})(jQuery, window);
