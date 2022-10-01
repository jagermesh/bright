/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataBrowser(entity, settings) {
    const _this = this;

    let pagerSetUp = false;
    let headerContainer = 'body';
    let selectionQueue = [];

    _this.options = Object.assign({}, settings);
    _this.options.autoLoad = _this.options.autoLoad || false;
    _this.options.defaults = _this.options.defaults || {};
    _this.options.entity = entity;
    _this.options.features = _this.options.features || {
      editor: true
    };
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.container = _this.options.selectors.container || '';
    _this.options.selectors.scrollContainer = _this.options.selectors.scrollContainer || '';
    _this.options.pageSizes = _this.options.pageSizes || [20, 50, 100, 200];

    function findNode(selector) {
      if (_this.options.selectors.container !== '') {
        return `${_this.options.selectors.container} ${selector}`;
      } else {
        return selector;
      }
    }

    _this.getContainer = function() {
      if (_this.options.selectors.container !== '') {
        return $(_this.options.selectors.container);
      } else {
        return $('body');
      }
    };

    _this.container = _this.getContainer();

    _this.getScrollContainer = function() {
      if (_this.options.selectors.container !== '') {
        if (_this.options.selectors.scrollContainer !== '') {
          if (_this.options.selectors.scrollContainer.indexOf('#') === 0) {
            return $(_this.options.selectors.scrollContainer);
          } else {
            return $(_this.options.selectors.container + ' ' + _this.options.selectors.scrollContainer);
          }
        } else {
          return $(_this.options.selectors.container);
        }
      } else {
        return $(_this.options.selectors.scrollContainer);
      }
    };

    _this.options.selectors.dataTable = findNode(_this.options.selectors.dataTable || '.data-table');
    _this.options.selectors.editForm = _this.options.selectors.editForm || '';

    _this.getTableContainer = function() {
      return $(_this.options.selectors.dataTable);
    };

    if (_this.options.selectors.editForm === '') {
      if (_this.options.selectors.container === '') {
        _this.options.selectors.editForm = '.data-edit-form';
      } else {
        _this.options.selectors.editForm = _this.options.selectors.container + ' .data-edit-form';
      }
    }

    _this.options.templates = _this.options.templates || {};
    _this.options.templates.row = _this.options.templates.row || _this.options.templates.rowTemplate || '.data-row-template';
    _this.options.templates.groupRow = _this.options.templates.groupRow || '.data-group-row-template';
    _this.options.templates.noData = _this.options.templates.noData || '.data-empty-template';

    const selActionCRUD = `${findNode('.action-edit')},${findNode('.action-view')},${findNode('.action-create')},${findNode('.action-copy')}`;

    if (typeof entity == 'string') {
      if (_this.options.entity.indexOf('/') == -1) {
        _this.dataSource = br.dataSource(`${br.baseUrl}api/${_this.options.entity}/`);
      } else {
        _this.dataSource = br.dataSource(`${br.baseUrl}${_this.options.entity}`);
      }
      _this.dataSource.on('error', function(operation, error) {
        if (error && (error.length > 0)) {
          br.growlError(error);
        }
      });
    } else {
      _this.dataSource = entity;
    }

    _this.storageTag = _this.options.storageTag ? _this.options.storageTag : document.location.pathname + ':' + _this.dataSource.options.restServiceUrl;

    _this.selection = br.flagsHolder();

    _this.countDataSource = br.dataSource(_this.dataSource.options.restServiceUrl);

    if (_this.options.selectors.container !== '') {
      headerContainer = _this.options.selectors.container;
    }

    _this.dataGrid = br.dataGrid(_this.options.selectors.dataTable, _this.options.templates.row, _this.dataSource, {
      templates: {
        noData: _this.options.templates.noData,
        groupRow: _this.options.templates.groupRow
      },
      selectors: {
        header: headerContainer,
        remove: '.action-delete',
        refreshRow: _this.options.selectors.refreshRow
      },
      appendInInsert: _this.options.appendInInsert,
      defaultOrderAndGroup: _this.options.defaultOrderAndGroup,
      fixedHeader: br.isMobileDevice() ? false : _this.options.fixedHeader,
      autoHeight: _this.options.autoHeight,
      autoWidth: _this.options.autoWidth,
      storageTag: _this.options.storageTag,
      storeDataRow: _this.options.storeDataRow
    });

    _this.setStored = function(name, value) {
      _this.dataGrid.setStored(name, value);
    };

    _this.getStored = function(name, defaultValue) {
      return _this.dataGrid.getStored(name, defaultValue);
    };

    _this.resetStored = function(stopPropagation) {
      _this.dataGrid.resetStored(stopPropagation);
      if (!stopPropagation) {
        br.refresh();
      }
    };

    _this.defaultLimit = _this.options.limit || 20;
    _this.limit = _this.getStored('pager_PageSize', _this.defaultLimit);
    _this.skip = 0;
    _this.recordsAmount = 0;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    _this.before = function(operation, callback) {
      _this.dataSource.before(operation, callback);
      _this.countDataSource.before(operation, callback);
    };

    _this.isOrderConfigured = function() {
      return _this.dataGrid.isOrderConfigured();
    };

    _this.getOrder = function() {
      return _this.dataGrid.getOrder();
    };

    _this.setOrder = function(order, callback) {
      return _this.dataGrid.setOrder(order, callback);
    };

    _this.getOrderAndGroup = function() {
      return _this.dataGrid.getOrderAndGroup();
    };

    _this.setOrderAndGroup = function(orderAndGroup, callback) {
      return _this.dataGrid.setOrderAndGroup(orderAndGroup, callback);
    };

    _this.setFilter = function(name, value) {
      _this.dataGrid.setFilter(name, value);
    };

    _this.clearFilter = function(name) {
      _this.dataGrid.clearFilter(name);
    };

    _this.getFilter = function(name, defaultValue) {
      return _this.dataGrid.getFilter(name, defaultValue);
    };

    _this.resetFilters = function(stopPropagation, inPopup) {
      br.setValue(findNode('input.data-filter'), '');
      br.setValue(findNode('select.data-filter'), '');
      $(findNode('input.data-filter')).trigger('reset');
      $(findNode('select.data-filter')).trigger('reset');
      _this.dataGrid.resetFilters(stopPropagation);
      if (!stopPropagation) {
        _this.events.trigger('resetFilters');
        if (br.toInt(inPopup) == 1) {
          _this.refresh();
        } else {
          br.refresh();
        }
      }
    };

    _this.reloadRow = function(rowid, callback, options) {
      _this.dataGrid.reloadRow(rowid, callback, options);
    };

    _this.hasRow = function(rowid, options) {
      return _this.dataGrid.hasRow(rowid, options);
    };

    _this.removeRow = function(rowid) {
      return _this.dataGrid.removeRow(rowid);
    };

    function deleteQueued() {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        _this.dataSource.remove(rowid, function(result) {
          if (result) {
            _this.unSelectRow(rowid);
          }
          br.stepProgress();
          deleteQueued();
        });
      } else {
        br.hideProgress();
      }
    }

    _this.deleteSelection = function() {
      selectionQueue = _this.selection.get().slice(0);
      if (selectionQueue.length > 0) {
        br.confirm('Delete confirmation', `Are you sure you want do delete ${selectionQueue.length} record(s)?`, function() {
          br.startProgress(selectionQueue.length, 'Deleting...');
          deleteQueued();
        });
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function updateQueued(func) {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        let data = {};
        func(data);
        _this.dataSource.update(rowid, data, function(result) {
          if (result) {
            _this.unSelectRow(rowid);
          }
          br.stepProgress();
          updateQueued(func);
        });
      } else {
        br.hideProgress();
      }
    }

    _this.updateSelection = function(func) {
      selectionQueue = _this.selection.get().slice(0);
      if (selectionQueue.length > 0) {
        br.startProgress(selectionQueue.length, 'Updating...');
        updateQueued(func);
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function processQueued(processRowCallback, processCompleteCallback, params) {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        processRowCallback(rowid, function() {
          if (params.showProgress) {
            br.stepProgress();
          }
          processQueued(processRowCallback, processCompleteCallback, params);
        });
      } else {
        if (params.showProgress) {
          br.hideProgress();
        }
        if (processCompleteCallback) {
          processCompleteCallback();
        }
      }
    }

    _this.processSelection = function(processRowCallback, processCompleteCallback, params) {
      params = params || {};
      params.showProgress = params.showProgress || false;
      selectionQueue = _this.selection.get();
      if (selectionQueue.length > 0) {
        if (params.showProgress) {
          br.startProgress(selectionQueue.length, params.title || '');
        }
        processQueued(processRowCallback, processCompleteCallback, params);
      } else {
        br.growlError('Please select at least one record');
      }
    };

    _this.getKeywordFilterControl = function() {
      return $(findNode('input.data-filter[name="keyword"]'));
    }

    _this.init = function() {
      if (_this.options.nav) {
        $(`.nav-item[rel="${_this.options.nav}"]`).addClass('active');
      }

      const keywordControl = _this.getKeywordFilterControl();
      const inputControls = $(findNode('input.data-filter,select.data-filter'));

      _this.dataSource.before('select', function(request, options) {
        request = request || {};
        if (keywordControl.length > 0) {
          request.keyword = keywordControl.val();
          _this.setFilter('keyword', request.keyword);
        }
        options = options || {};
        options.skip = _this.skip;
        options.limit = _this.limit || _this.defaultLimit;
      });

      _this.dataSource.after('remove', function(result) {
        if (result) {
          if (selectionQueue.length === 0) {
            _this.resetPager();
            _this.updatePager();
          }
          if (_this.dataGrid.isEmpty()) {
            _this.refresh();
          }
        }
      });

      _this.dataSource.after('insert', function(result) {
        if (result) {
          _this.resetPager();
          _this.updatePager();
        }
      });

      _this.countDataSource.before('select', function(request) {
        if (keywordControl.length > 0) {
          request.keyword = keywordControl.val();
        }
      });

      _this.dataSource.after('select', function(result, response) {
        if (result) {
          if (_this.options.autoLoad) {
            _this.skip = _this.skip + response.length;
          }
        }
        _this.updatePager(true);
      });

      // search

      inputControls.each(function() {
        if ($(this).parent().hasClass('input-append')) {
          $(this).parent().addClass('data-filter');
          $(this).parent().css({
            display: 'inline-block',
            position: 'relative'
          });
        }
      });

      if (keywordControl.length > 0) {
        br.modified(keywordControl, function() {
          const val = $(this).val();
          keywordControl.each(function() {
            if ($(this).val() != val) {
              $(this).val(val);
            }
          });
          if ($(this).hasClass('instant-search')) {
            _this.refreshDeferred();
          }
        });
      }

      br.modified(findNode('input.data-filter,select.data-filter'), function() {
        const val = $(this).val();
        let container = $(this).parent();
        if (!container.hasClass('input-append')) {
          container = $(this);
        }
        if (br.isEmpty(val)) {
          container.removeClass('br-input-has-value');
        } else {
          container.addClass('br-input-has-value');
        }
        _this.resetPager();
      });

      br.attachDatePickers();

      if (_this.options.features.editor) {
        let container = $(_this.options.selectors.editForm);
        if (container.length > 0) {
          let editorOptions = _this.options.editor || {
            noun: _this.options.noun
          };
          _this.editor = _this.dataEditor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
          _this.editor.events.connectTo(_this.events);

          $(findNode('.action-create')).show();

          $(document).on('click', selActionCRUD, function() {
            const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
            let mode;
            if ($(this).hasClass('action-copy')) {
              mode = 'copy';
            } else
            if ($(this).hasClass('action-view')) {
              mode = 'view';
            } else
            if (rowid) {
              mode = 'edit';
            } else {
              mode = 'insert';
            }
            _this.editor.show(rowid, {
              mode: mode
            });
          });
        }
      }

      // pager

      $(findNode('.action-next') + ',' + findNode('.pager-action-next')).on('click', function() {
        _this.skip += _this.limit;
        _this.refresh({}, null, true);
      });

      $(findNode('.action-prior') + ',' + findNode('.pager-action-prior')).on('click', function() {
        _this.skip -= _this.limit;
        if (_this.skip < 0) {
          _this.skip = 0;
        }
        _this.refresh({}, null, true);
      });

      $(findNode('.pager-page-navigation')).on('click', '.pager-action-navigate', function() {
        const value = br.toInt($(this).attr('data-page'));
        if (value > 0) {
          const newSkip = _this.limit * (value - 1);
          if (newSkip != _this.skip) {
            _this.skip = _this.limit * (value - 1);
            _this.setStored('pager_PageNo', _this.skip);
            _this.refresh({}, null, true);
          }
        }
      });

      $(findNode('.pager-page-size-navigation')).on('click', '.pager-action-page-size', function() {
        const value = br.toInt($(this).attr('data-size'));
        _this.limit = value;
        _this.skip = 0;
        _this.setStored('pager_PageNo', _this.skip);
        _this.setStored('pager_PageSize', _this.limit);
        _this.refresh({}, null, true);
      });

      $(findNode('.action-refresh')).on('click', function() {
        _this.refresh();
      });

      $(findNode('.action-clear-one-filter')).on('click', function() {
        let rel = $(this).attr('rel');
        $(findNode(`.data-filter[name="${rel}"]`)).val('');
        $(findNode(`.data-filter[name="${rel}"]`)).trigger('change');
        _this.refresh();
      });

      if (_this.getFilter('keyword')) {
        $(findNode('input.data-filter[name="keyword"]')).val(_this.getFilter('keyword'));
        br.markInputAsModified($(findNode('input.data-filter[name="keyword"]')));
      }

      $(findNode('.action-reset-filters')).on('click', function() {
        _this.resetFilters(false, $(this).attr('data-in-popup'));
      });

      function checkAutoLoad() {
        const docsHeight = _this.getTableContainer().height();
        const docsContainerHeight = _this.getScrollContainer().height();
        const scrollTop = _this.getScrollContainer().scrollTop();

        if (scrollTop + docsContainerHeight > docsHeight) {
          _this.dataGrid.loadMore();
        }
      }

      if (_this.options.autoLoad) {
        _this.getScrollContainer().on('scroll', function() {
          checkAutoLoad();
        });
      }

      $(document).on('click', findNode('.action-select-all'), function() {
        _this.selectAll($(this).is(':checked'));
      });

      $(document).on('click', findNode('.action-clear-selection'), function() {
        _this.clearSelection();
      });

      $(document).on('click', findNode('.action-delete-selected'), function() {
        _this.deleteSelection();
      });

      $(document).on('click', findNode('.action-select-row'), function() {
        const row = $(this).closest('[data-rowid]');
        const rowid = row.attr('data-rowid');
        const checked = $(this).is(':checked');
        if (checked) {
          _this.selectRow(rowid);
        } else {
          _this.unSelectRow(rowid);
        }
      });

      _this.dataGrid.before('changeOrder', function() {
        _this.resetPager();
      });

      _this.dataGrid.on('change', function() {
        const selection = _this.selection.get();
        if (selection.length > 0) {
          _this.restoreSelection();
        } else {
          _this.clearSelection();
        }
        $(findNode('.action-select-all')).prop('checked', false);
        _this.events.trigger('change');
        _this.events.triggerAfter('change');
      });

      _this.events.on('selectionChanged', function(count) {
        if (count > 0) {
          $(findNode('.selection-count')).text(count);
          $(findNode('.selection-stat')).text(`${count} record(s) selected`);
          $(findNode('.pager-selection-container')).show();
          $(findNode('.action-clear-selection')).show();
          const selection = _this.selection.get();
          let deletable = selection.filter(function(rowid) {
            return $(findNode(`tr[data-rowid="${rowid}"] td .action-delete`)).length > 0;
          });
          if (deletable.length > 0) {
            $(findNode('.action-delete-selected')).show();
          } else {
            $(findNode('.action-delete-selected')).hide();
          }
        } else {
          $(findNode('.selection-count')).text('0');
          $(findNode('.pager-selection-container')).hide();
          $(findNode('.action-clear-selection')).hide();
          $(findNode('.action-delete-selected')).hide();
        }
        $(findNode('a.br-selection-action')).attr('disabled', count == 0);
        $(findNode('button.br-selection-action')).prop('disabled', count == 0);
        $(findNode('a.br-multi-select-action')).attr('disabled', count <= 1);
        $(findNode('button.br-multi-select-action')).prop('disabled', count <= 1);
      });

      return this;
    };

    function internalUpdatePager() {
      if (!_this.dataGrid.isDisconnected()) {
        const totalPages = Math.ceil(_this.recordsAmount / _this.limit);
        const currentPage = Math.ceil(_this.skip / _this.limit) + 1;

        let $pc = $(findNode('.pager-page-navigation'));
        $pc.html('');
        let s = '';
        let f1 = false;
        let f2 = false;
        let r = 3;
        let el = false;
        for (let i = 1; i <= totalPages; i++) {
          if ((i <= r) || ((i > currentPage - r) && (i < currentPage + r)) || (i > (totalPages - r))) {
            if (i == currentPage) {
              s = s + '<strong class="pager-nav-element">' + i + '</strong>';
            } else {
              el = true;
              s = s + '<a href="javascript:;" class="pager-action-navigate pager-nav-element" data-page="' + i + '">' + i + '</a>';
            }
          } else
          if (!f1 && i < currentPage) {
            s = s + '...';
            f1 = true;
          } else
          if (!f2 && i > currentPage) {
            s = s + '...';
            f2 = true;
          }
        }
        if (el) {
          $pc.html(s);
          $(findNode('.pager-nav-element')).show();
        } else {
          $(findNode('.pager-nav-element')).css('display', 'none');
        }

        $pc = $(findNode('.pager-page-size-navigation'));
        $pc.html('');
        s = '';
        const sizes = _this.options.pageSizes;
        for (let i = 0, length = sizes.length; i < length; i++) {
          let size = sizes[i];
          let dsize = size;
          if (size >= _this.recordsAmount) {
            dsize = _this.recordsAmount;
          }
          if (size == _this.limit) {
            s = s + '<strong class="pager-nav-element">' + dsize + '</strong>';
          } else {
            s = s + '<a href="javascript:;" class="pager-action-page-size pager-size-element" data-size="' + size + '">' + dsize + '</a>';
          }
          if (size >= _this.recordsAmount) {
            break;
          }
        }
        if (s.length > 0) {
          $pc.html(s);
          $(findNode('.pager-page-size-container')).show();
        } else {
          $(findNode('.pager-page-size-container')).hide();
        }

        const min = (_this.skip + 1);
        const max = Math.min(_this.skip + _this.limit, _this.recordsAmount);

        if (_this.recordsAmount > 0) {
          if (_this.recordsAmount > max) {
            $(findNode('.action-next')).show();
            $(findNode('.pager-action-next')).show();
          } else {
            $(findNode('.action-next')).hide();
            $(findNode('.pager-action-next')).hide();
          }
          if (_this.skip > 0) {
            $(findNode('.action-prior')).show();
            $(findNode('.pager-action-prior')).show();
          } else {
            $(findNode('.action-prior')).hide();
            $(findNode('.pager-action-prior')).hide();
          }
          _this.showPager();
          _this.events.triggerAfter('pager.show');
        } else {
          _this.hidePager();
          _this.events.triggerAfter('pager.hide');
        }
        $(findNode('.pager-stat')).text('Records ' + min + '-' + max + ' of ' + _this.recordsAmount);
        $(findNode('.pager-page-size')).text(_this.limit + ' records per page');

        pagerSetUp = true;

        if (_this.dataGrid.table) {
          _this.dataGrid.table.update();
        }
      }
    }

    _this.hidePager = function() {
      $(findNode('.pager-pager-container')).hide();
      $(findNode('.pager-page-size-container')).hide();
    };

    _this.showPager = function() {
      $(findNode('.pager-pager-container')).show();
      $(findNode('.pager-page-size-container')).show();
    };

    _this.reset = function() {
      _this.getTableContainer().html('');
      _this.showPager();
    };

    _this.restoreSelection = function(selection) {
      if (!selection) {
        selection = _this.selection.get();
      }
      for (let i = 0, length = selection.length; i < length; i++) {
        _this.selectRow(selection[i], true);
      }
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.clearSelection = function(disableEvents) {
      _this.selection.clear();
      $(findNode('tr.row-selected')).removeClass('row-selected');
      $(findNode('.action-select-row')).prop('checked', false);
      $(findNode('.action-select-all')).prop('checked', false);
      if (!disableEvents) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    _this.getSelection = function() {
      return _this.selection.get();
    };

    _this.setSelection = function(selection, disableEvents) {
      if (selection) {
        for (let i = 0, length = selection.length; i < length; i++) {
          _this.selectRow(selection[i], true);
          _this.selection.append(selection[i]);
        }
        if (!disableEvents) {
          _this.events.trigger('selectionChanged', _this.selection.get().length);
        }
      } else {
        _this.clearSelection(disableEvents);
      }
    };

    let updatePagerTimer;
    let refreshTimer;

    function doUpdatePager() {
      if (_this.dataSource.doingSelect() || _this.countDataSource.doingSelect()) {
        window.clearTimeout(updatePagerTimer);
        updatePagerTimer = window.setTimeout(function() {
          doUpdatePager();
        }, 300);
      } else {
        _this.countDataSource.selectCount(function(success, result) {
          if (success) {
            _this.recordsAmount = result;
            internalUpdatePager();
            _this.events.triggerAfter('recordsCountRetrieved', result);
          } else {
            _this.hidePager();
            _this.events.triggerAfter('pager.hide');
          }
        });
      }
    }

    _this.updatePager = function(force) {
      if (!pagerSetUp || force) {
        window.clearTimeout(updatePagerTimer);
        updatePagerTimer = window.setTimeout(function() {
          doUpdatePager();
        }, 300);
      } else {
        internalUpdatePager();
      }
    };

    _this.unSelectRow = function(rowid, multiple) {
      const chk = _this.getTableContainer().find(`input.action-select-row[value="${rowid}"]`);
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : _this.getTableContainer().find(`tr[data-rowid="${rowid}"]`);
      if (row.length > 0) {
        const action = $(row.find('.action-select-row')[0]);
        action.prop('checked', false);
        row.removeClass('row-selected');
      }
      _this.selection.remove(rowid);
      if (!multiple) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    _this.selectRow = function(rowid, multiple) {
      const chk = _this.getTableContainer().find(`input.action-select-row[value="${rowid}"]`);
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : _this.getTableContainer().find(`tr[data-rowid="${rowid}"]`);
      if (row.length > 0) {
        const action = $(row.find('.action-select-row')[0]);
        action.prop('checked', true);
        row.addClass('row-selected');
        _this.selection.append(rowid);
        if (!multiple) {
          _this.events.trigger('selectionChanged', _this.selection.get().length);
        }
      }
    };

    _this.selectAll = function(checked) {
      $(findNode('.action-select-all')).prop('checked', checked);
      $(findNode('.action-select-row')).each(function() {
        const row = $(this).closest('[data-rowid]');
        const rowid = row.attr('data-rowid');
        if (checked) {
          _this.selectRow(rowid, true);
        } else {
          _this.unSelectRow(rowid, true);
        }
      });
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.isFiltersVisible = function() {
      return $(findNode('.filters-panel')).is(':visible');
    };

    _this.resetPager = function() {
      pagerSetUp = false;
      _this.skip = 0;
    };

    function internalRefresh(deferred, filter, callback) {
      if (deferred) {
        _this.dataSource.selectDeferred(filter, callback);
      } else {
        if (_this.dataSource.doingSelect() || _this.countDataSource.doingSelect()) {
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(function() {
            internalRefresh(false, filter, callback);
          }, 300);
        } else {
          _this.dataSource.select(filter, callback);
        }
      }
    }

    function refresh(deferred, filter, callback, doNotResetPager) {
      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {
        internalRefresh(deferred, filter, function(result, response, request, options) {
          if (result) {
            resolve({
              request: request,
              options: options,
              response: response
            });
          } else {
            reject({
              request: request,
              options: options,
              errorMessage: response
            });
          }
        });
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });
    }

    _this.refreshDeferred = function(filter, callback, doNotResetPager) {
      return refresh(true, filter, callback, doNotResetPager);
    };

    _this.load = _this.refresh = function(filter, callback, doNotResetPager) {
      return refresh(false, filter, callback, doNotResetPager);
    };

    return _this.init();
  }

  window.br.dataBrowser = function(entity, options) {
    return new BrDataBrowser(entity, options);
  };
})(jQuery, window);