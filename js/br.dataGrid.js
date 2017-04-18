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
    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname + ':' + this.dataSource.options.restServiceUrl;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    if (this.options.fixedHeader) {
      this.table = br.table($(this.selector).closest('table'), options);
    }

    var noMoreData = false;

    _this.loadingMoreData = false;

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

    this.after('change', function() {
      if (this.table) {
        this.table.update();
      }
    });

    var disconnected = false;

    this.setStored = function(name, value) {
      br.storage.set(this.storageTag + 'stored:' + name, value);
    };

    this.getStored = function(name, defaultValue) {
      return br.storage.get(this.storageTag + 'stored:' + name, defaultValue);
    };

    this.disconnectFromDataSource = function() {
      disconnected = true;
    };

    this.reconnectWithDataSource = function() {
      disconnected = false;
    };

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
      var s = br.fetch(_this.options.templates.row, data);
      s = s.trim();
      if (s.length > 0) {
        var result = $(s);
        result.data('data-row', data);
        return result;
      } else {
        return null;
      }
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
      var tableRow = _this.renderRow(row);
      if (tableRow) {
        $(tableRow).insertAfter(selector);
      }
      return tableRow;
    };

    this.addDataRow = function(row) {
      var tableRow = _this.renderRow(row);
      if (tableRow) {
        _this.events.triggerBefore('insert', row, tableRow);
        _this.events.trigger('insert', row, tableRow);
        if (_this.options.appendInInsert) {
          _this.append(tableRow);
        } else {
          _this.prepend(tableRow);
        }
        _this.events.triggerAfter('renderRow', row, tableRow);
        _this.events.triggerAfter('insert', row, tableRow);
      }
      return tableRow;
    };

    this.hasRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      return (row.length > 0);
    };

    this.reloadRow = function(rowid, callback, options) {
      if (!br.isEmpty(callback)) {
        if (!br.isFunction(callback)) {
          options = callback;
          callback = null;
        }
      }
      options = options || { };
      options.disableEvents = true;
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      var filter;
      if (br.isObject(rowid)) {
        filter = rowid;
      } else {
        filter = { rowid: rowid };
      }
      _this.dataSource.select(filter, function(result, response) {
        if (!result || (response.length === 0)) {
          _this.refresh(callback);
        } else {
          response = response[0];
          if (_this.refreshRow(response, options)) {

          } else {
            if (_this.isEmpty()) {
              $(_this.selector).html('');
            }
            _this.addDataRow(response);
          }
          if (typeof callback == 'function') { callback.call(_this, response); }
        }
      }, options);
    };

    function checkForEmptyGrid() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        $(_this.selector).html(_this.options.templates.noData);
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      }
    }

    this.removeRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        checkForEmptyGrid();
        _this.events.triggerAfter('remove', rowid, row);
      } else {
        _this.dataSource.select();
      }
    };

    this.refresh = function(callback) {
      _this.dataSource.select(function() {
        if (callback) {
          callback();
        }
      });
    };

    this.refreshRow = function(data, options) {
      var filter = '[data-rowid=' + data.rowid + ']';
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      var row = $(_this.selector).find(filter);
      if (row.length > 0) {
        var tableRow = _this.renderRow(data);
        if (tableRow) {
          tableRow.data('data-row', data);
          _this.events.triggerBefore('update', data);
          _this.events.trigger('update', data, row);
          $(row[0]).before(tableRow);
          row.remove();
          _this.events.triggerAfter('renderRow', data, tableRow);
          _this.events.triggerAfter('update', data, tableRow);
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

    this.setOrder = function(order) {
      var orderAndGroup = [];
      for(var name in order) {
        orderAndGroup.push({ fieldName: name, asc: order[name] > 0, group: false, index: orderAndGroup.length });
      }
      return order;
    };

    this.setOrderAndGroup = function(order) {
      br.storage.set(this.storageTag + 'orderAndGroup', order);
      return order;
    };

    this.getOrderAndGroup = function() {
      var result = br.storage.get(this.storageTag + 'orderAndGroup', []);
      if (br.isEmpty(result) || !br.isArray(result)) {
        result = [];
      }
      return result;
    };

    this.isOrderConfigured = function() {
      var orderAndGroup = _this.getOrderAndGroup();
      return br.isArray(orderAndGroup) && (orderAndGroup.length > 0);
    };

    this.loadMore = function(callback) {
      if (noMoreData || _this.loadingMoreData) {

      } else {
        _this.loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          if (typeof callback == 'function') { callback.call(_this, result, response); }
          _this.loadingMoreData = false;
        }, { loadingMore: true });
      }
    };

    this.isEmpty = function() {
      return ($(_this.selector).find('[data-rowid]').length === 0);
    };

    this.getKeys = function(attrName) {
      var result = [];
      if (!attrName) {
        attrName = 'data-rowid';
      }
      $('[' + attrName + ']', $(_this.selector)).each(function() {
        result.push(br.toInt($(this).attr(attrName)));
      });
      return result;
    };

    this.init = function() {

      var savedOrder = _this.getOrderAndGroup();
      if (!br.isArray(savedOrder) || (savedOrder.length === 0)) {
        if (_this.options.defaultOrderAndGroup) {
          _this.setOrderAndGroup(_this.options.defaultOrderAndGroup);
        }
      }

      function showOrder(orderAndGroup) {
        for(var i = 0; i < orderAndGroup.length; i++) {
          var ctrl = $('.sortable[data-field="' + orderAndGroup[i].fieldName + '"].' + (orderAndGroup[i].asc ? 'order-asc' : 'order-desc'), $(_this.options.selectors.header));
          ctrl.addClass('icon-white').addClass('icon-border');
          var idx = ctrl.parent().find('div.br-sort-index');
          if (orderAndGroup.length > 1) {
            if (idx.length > 0) {
              idx.text(i + 1);
            } else {
              ctrl.parent().append($('<div class="br-sort-index">' + (i + 1) + '</div>'));
            }
          }
        }
      }

      showOrder(_this.getOrderAndGroup());

      $(this.options.selectors.header).on('click', '.sortable', function(event) {
        var sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border'));
        if (!event.metaKey) {
          $('.sortable', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border');
          $('.br-sort-index', $(_this.options.selectors.header)).remove();
        }
        if (sorted) {
          $(this).removeClass('icon-white').removeClass('icon-border');
        } else {
          $(this).siblings('i').removeClass('icon-white').removeClass('icon-border');
          $(this).addClass('icon-white').addClass('icon-border');
        }
        var orderAndGroup;
        var fieldName = $(this).attr('data-field');
        var newOrder = { fieldName: fieldName, asc: $(this).hasClass('order-asc'), group: $(this).hasClass('group-by') };
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          orderAndGroup = _this.getOrderAndGroup();
          var newOrderAndGroup = [];
          for(var i = 0; i < orderAndGroup.length; i++) {
            if (orderAndGroup[i].fieldName != fieldName) {
              newOrderAndGroup.push(orderAndGroup[i]);
            }
          }
          orderAndGroup = newOrderAndGroup;
        } else {
          orderAndGroup = [];
        }
        if (!sorted) {
          orderAndGroup.push(newOrder);
        }
        showOrder(orderAndGroup);
        _this.setOrderAndGroup(orderAndGroup);
        _this.events.triggerBefore('changeOrder', orderAndGroup);
        _this.dataSource.select();
      });

      if (_this.dataSource) {

        _this.dataSource.before('select', function(request, options) {
          options.order = _this.getOrder();
          if (!_this.loadingMoreData) {
            // $(_this.selector).html('');
            // $(_this.selector).addClass('progress-big');
          }
        });

        _this.dataSource.after('select', function(result, response, request) {
          $(_this.selector).removeClass('progress-big');
          if (result) {
            noMoreData = (response.length === 0);
            if (!disconnected) {
              _this.render(response, _this.loadingMoreData);
            }
          }
        });

        _this.dataSource.after('insert', function(success, response) {
          if (success) {
            if (_this.isEmpty()) {
              $(_this.selector).html(''); // to remove No-Data box
            }
            _this.addDataRow(response);
          }
        });

        _this.dataSource.on('update', function(data) {
          if (_this.refreshRow(data, _this.options)) {

          } else {
            _this.dataSource.select();
          }
        });

        _this.dataSource.on('remove', function(rowid) {
          _this.removeRow(rowid);
        });

        if (this.options.selectors.remove) {
          $(_this.selector).on('click', this.options.selectors.remove, function() {
            var row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              var rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm( 'Delete confirmation'
                          , 'Are you sure you want to delete this record?'
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
      var tableRow;
      _this.events.triggerBefore('change', data, 'render');
      if (data) {
        var i, j, k;
        if (!loadingMoreData) {
          $selector.html('');
        }
        if (_this.options.freeGrid) {
          data = data[0];
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
                    tableRow = _this.renderRow(data.rows[i].row);
                    if (tableRow) {
                      $selector.append(tableRow);
                    }
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
            for (i = 0; i < data.length; i++) {
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
                tableRow = _this.renderRow(data[i]);
                if (tableRow) {
                  $selector.append(tableRow);
                  _this.events.triggerAfter('renderRow', data[i], tableRow);
                }
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
