/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var _this = this;

    this.selector = selector;

    this.options = options || {};

    this.options.templates          = this.options.templates || {};

    this.options.templates.noData   = this.options.templates.noData || '.data-empty-template';

    this.options.templates.row      = $(rowTemplate).html();
    this.options.templates.groupRow = this.options.templates.groupRow ? $(this.options.templates.groupRow).html() : '';
    this.options.templates.header   = this.options.templates.header   ? $(this.options.templates.header).html() : '';
    this.options.templates.footer   = this.options.templates.footer   ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData   = this.options.templates.noData   ? $(this.options.templates.noData).html() : '';

    this.options.templates.row      = this.options.templates.row      || '';
    this.options.templates.groupRow = this.options.templates.groupRow || '';
    this.options.templates.header   = this.options.templates.header   || '';
    this.options.templates.footer   = this.options.templates.footer   || '';
    this.options.templates.noData   = this.options.templates.noData   || '';

    this.templates = {};

    this.templates.row      = this.options.templates.row.length > 0      ? br.compile(this.options.templates.row)      : function() { return ''; };
    this.templates.groupRow = this.options.templates.groupRow.length > 0 ? br.compile(this.options.templates.groupRow) : function() { return ''; };
    this.templates.header   = this.options.templates.header.length > 0   ? br.compile(this.options.templates.header)   : function() { return ''; };
    this.templates.footer   = this.options.templates.footer.length > 0   ? br.compile(this.options.templates.footer)   : function() { return ''; };
    this.templates.noData   = this.options.templates.noData.length > 0   ? br.compile(this.options.templates.noData)   : function() { return ''; };

    this.options.selectors          = this.options.selectors || {};

    this.options.selectors.header   = this.options.selectors.header || this.options.headersSelector || this.selector;
    this.options.selectors.footer   = this.options.selectors.footer || this.options.footersSelector || this.selector;
    this.options.selectors.remove   = this.options.selectors.remove || this.options.deleteSelector  || '.action-delete';

    this.options.dataSource = dataSource;

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

    this.isDisconnected = function() {
      return disconnected;
    };

    this.disconnectFromDataSource = function() {
      disconnected = true;
    };

    this.reconnectWithDataSource = function() {
      disconnected = false;
    };

    this.renderHeader = function(data, asString) {
      data = _this.events.trigger('renderHeader', data) || data;
      var s = _this.templates.header(data);
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        result.data('data-row', data);
        return result;
      } else {
        return null;
      }
    };

    this.renderFooter = function(data, asString) {
      data = _this.events.trigger('renderFooter', data) || data;
      var s =  _this.templates.footer(data);
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        result.data('data-row', data);
        return result;
      } else {
        return null;
      }
    };

    this.renderRow = function(data, asString) {
      data = _this.events.trigger('renderRow', data) || data;
      var s = _this.templates.row(data).trim();
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        result.data('data-row', data);
        return result;
      } else {
        return null;
      }
    };

    this.renderGroupRow = function(data, asString) {
      data = _this.events.trigger('renderGroupRow', data) || data;
      var s = _this.templates.groupRow(data).trim();
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        result.data('data-row', data);
        return result;
      } else {
        return null;
      }
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

    this.addDataRow = function(row, disableEvents) {
      var tableRow = _this.renderRow(row);
      if (tableRow) {
        _this.events.triggerBefore('insert', row, tableRow);
        _this.events.trigger('insert', row, tableRow);
        if (_this.options.appendInInsert) {
          _this.append(tableRow);
        } else {
          _this.prepend(tableRow);
        }
        if (!disableEvents) {
          _this.events.triggerAfter('renderRow', row, tableRow);
          _this.events.triggerAfter('insert', row, tableRow);
        }
      }
      return tableRow;
    };

    this.hasRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      return (row.length > 0);
    };

    this.reloadRow = function(rowid, callback, options) {
      if (!br.isEmpty(callback)) {
        if (typeof callback != 'function') {
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
          if (typeof callback == 'function') {
            callback.call(_this, response);
          }
        }
      }, options);
    };

    function checkForEmptyGrid() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        $(_this.selector).html(_this.templates.noData());
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      }
    }

    this.removeRow = function(rowid, options) {
      var filter = '[data-rowid=' + rowid + ']';
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      var row = $(_this.selector).find(filter);
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        checkForEmptyGrid();
        _this.events.triggerAfter('remove', rowid, row);
      } else
      if (!_this.options.singleRowMode) {
        _this.dataSource.select();
      }
    };

    _this.load = _this.refresh = function(callback) {

      return new Promise(function(resolve, reject) {

        _this.dataSource.select(function(result, response) {
          if (typeof callback == 'function') {
            callback.call(_this, result, response);
          }
          if (result) {
            resolve(response);
          } else {
            reject(response);
          }
        });

      });

    };

    _this.refreshRow = function(data, options) {
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

    _this.loadMore = function(callback) {
      if (noMoreData || _this.loadingMoreData) {

      } else {
        _this.loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          if (typeof callback == 'function') { callback.call(_this, result, response); }
          _this.loadingMoreData = false;
        }, { loadingMore: true });
      }
    };

    _this.isEmpty = function() {
      return ($(_this.selector).find('[data-rowid]').length === 0);
    };

    _this.getKeys = function(attrName) {
      var result = [];
      if (!attrName) {
        attrName = 'data-rowid';
      }
      $('[' + attrName + ']', $(_this.selector)).each(function() {
        result.push(br.toInt($(this).attr(attrName)));
      });
      return result;
    };

    _this.isOrderConfigured = function() {
      var orderAndGroup = _this.getOrderAndGroup();
      return br.isArray(orderAndGroup) && (orderAndGroup.length > 0);
    };

    function saveOrderAndGroup(orderAndGroup) {
      br.storage.set(_this.storageTag + 'orderAndGroup', orderAndGroup);
      return orderAndGroup;
    }

    function showOrder(orderAndGroup) {
      for(var i = 0; i < orderAndGroup.length; i++) {
        var ctrl = $('.sortable[data-field="' + orderAndGroup[i].fieldName + '"].' + (orderAndGroup[i].asc ? 'order-asc' : 'order-desc'), $(_this.options.selectors.header));
        ctrl.addClass('icon-white').addClass('icon-border').addClass('fa-border');
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

    _this.getOrder = function() {
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

    _this.setOrder = function(order, callback) {
      var orderAndGroup = [];
      for(var name in order) {
        orderAndGroup.push({ fieldName: name, asc: order[name] > 0, group: false, index: orderAndGroup.length });
      }
      _this.setOrderAndGroup(orderAndGroup, callback);
    };

    _this.getOrderAndGroup = function() {
      var result = br.storage.get(_this.storageTag + 'orderAndGroup', []);
      if (br.isEmpty(result) || !br.isArray(result) || (result.length === 0)) {
        if (_this.options.defaultOrderAndGroup) {
          result = _this.options.defaultOrderAndGroup;
        } else {
          result = [];
        }
      }
      return result;
    };

    _this.setOrderAndGroup = function(orderAndGroup, callback) {
      saveOrderAndGroup(orderAndGroup);
      showOrder(orderAndGroup);
      _this.events.triggerBefore('changeOrder', orderAndGroup);
      if (callback) {
        _this.dataSource.select(function(result, response) {
          if (typeof callback == 'function') {
            callback.call(_this, result, response);
          }
        });
      }
      return orderAndGroup;
    };

    _this.init = function() {

      showOrder(_this.getOrderAndGroup());

      $(this.options.selectors.header).on('click', '.sortable', function(event) {
        var sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border') || $(this).hasClass('fa-border'));
        if (!event.metaKey) {
          $('.sortable', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
          $('.br-sort-index', $(_this.options.selectors.header)).remove();
        }
        if (sorted) {
          $(this).removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
        } else {
          $(this).siblings('i').removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
          $(this).addClass('icon-white').addClass('icon-border').addClass('fa-border');
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
        _this.setOrderAndGroup(orderAndGroup, true);
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

          } else
          if (!_this.options.singleRowMode) {
            _this.dataSource.select();
          }
        });

        _this.dataSource.on('remove', function(rowid) {
          _this.removeRow(rowid, _this.options);
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

        if (br.isString(_this.selector)) {
          br.editable(_this.selector + ' .editable', function(content) {
            var $this = $(this);
            var rowid = $this.closest('[data-rowid]').attr('data-rowid');
            var dataField = $this.attr('data-field');
            if (!br.isEmpty(rowid) && !br.isEmpty(dataField)) {
              var data = {};
              data[dataField] = content;
              _this.dataSource.update( rowid
                                     , data
                                     , function(result, response) {
                                         if (result) {
                                           _this.events.trigger('editable.update', $this, content);
                                         }
                                       }
                                     );
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
                tableRow = _this.renderHeader(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.header).append(tableRow);
                }
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                tableRow = _this.renderFooter(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.footer).append(tableRow);
                }
              }
            }
          }
          $(_this.options.selectors.header).html('');
          $(_this.options.selectors.footer).html('');
          if (data.rows) {
            if (data.rows.length === 0) {
              $selector.html(_this.templates.noData());
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
                    tableRow = _this.renderHeader(data.rows[i].header);
                    if (tableRow) {
                      $(_this.options.selectors.header).append(tableRow);
                    }
                  }
                  if (data.rows[i].footer) {
                    tableRow = _this.renderFooter(data.rows[i].footer);
                    if (tableRow) {
                      $(_this.options.selectors.footer).append(tableRow);
                    }
                  }
                }
              }
            }
          } else {
            $selector.html(_this.templates.noData());
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
                      tableRow = _this.renderGroupRow(tmp);
                      if (tableRow) {
                        $selector.append(tableRow);
                        _this.events.triggerAfter('renderGroupRow', data[i], tableRow);
                      }
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
            $selector.html(_this.templates.noData());
          }
        }
      } else {
        $selector.html(_this.templates.noData());
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
