/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataBrowser(entity, options) {

    const _this = this;

    let pagerSetUp = false;
    let headerContainer = 'body';
    let selectionQueue = [];
    let pageNavIsSlider = false;
    let pageSizeIsSlider = false;
    let pagerInitialized = false;

    _this.options = options || Object.create({});
    _this.options.autoLoad = _this.options.autoLoad || false;
    _this.options.defaults = _this.options.defaults || {};
    _this.options.defaults.filtersHidden = _this.options.defaults.filtersHidden || false;
    _this.options.entity = entity;
    _this.options.features = _this.options.features || { editor: true };
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.container = _this.options.selectors.container || '';
    _this.options.selectors.scrollContainer = _this.options.selectors.scrollContainer || '';
    _this.options.pageSizes = _this.options.pageSizes || [20, 50, 100, 200];

    function findNode(selector) {
      if (_this.options.selectors.container !== '') {
        return _this.options.selectors.container + ' ' + selector;
      } else {
        return selector;
      }
    }

    _this.scrollContainer = function() {
      if (_this.options.selectors.container !== '') {
        if (_this.options.selectors.scrollContainer !== '') {
          if (_this.options.selectors.scrollContainer.indexOf('#') === 0) {
             return _this.options.selectors.scrollContainer;
          } else {
            return _this.options.selectors.container + ' ' + _this.options.selectors.scrollContainer;
          }
        } else {
          return _this.options.selectors.container;
        }
      } else {
        return _this.options.selectors.scrollContainer;
      }
    };

    _this.options.selectors.dataTable = findNode(_this.options.selectors.dataTable || '.data-table');
    _this.options.selectors.editForm = _this.options.selectors.editForm || '';

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

    const selActionCRUD = findNode('.action-edit') + ',' + findNode('.action-create') + ',' + findNode('.action-copy');

    if (typeof entity == 'string') {
      if (_this.options.entity.indexOf('/') == -1) {
        _this.dataSource = br.dataSource(br.baseUrl + 'api/' + _this.options.entity + '/');
      } else {
        _this.dataSource = br.dataSource(br.baseUrl + _this.options.entity);
      }
      _this.dataSource.on('error', function(operation, error) {
        br.growlError(error);
      });
    } else {
      _this.dataSource = entity;
    }

    _this.storageTag = _this.options.storageTag ? _this.options.storageTag : document.location.pathname + ':' + _this.dataSource.options.restServiceUrl;

    _this.setStored = function(name, value) {
      br.storage.set(_this.storageTag + 'stored:' + name, value);
    };

    _this.getStored = function(name, defaultValue) {
      return br.storage.get(_this.storageTag + 'stored:' + name, defaultValue);
    };

    _this.defaultLimit = _this.options.limit || 20;
    _this.limit = _this.getStored('pager_PageSize', _this.defaultLimit);
    _this.skip = 0;
    _this.recordsAmount = 0;

    _this.selection = br.flagsHolder();

    _this.countDataSource = br.dataSource(_this.dataSource.options.restServiceUrl);

    if (_this.options.selectors.container !== '') {
      headerContainer = _this.options.selectors.container;
    }

    _this.dataGrid = br.dataGrid( _this.options.selectors.dataTable
                                , _this.options.templates.row
                                , _this.dataSource
                                , { templates: { noData: _this.options.templates.noData, groupRow: _this.options.templates.groupRow }
                                  , selectors: { header: headerContainer, remove: '.action-delete', refreshRow: _this.options.selectors.refreshRow }
                                  , appendInInsert: _this.options.appendInInsert
                                  , defaultOrderAndGroup: _this.options.defaultOrderAndGroup
                                  , fixedHeader: _this.options.fixedHeader
                                  , autoHeight: _this.options.autoHeight
                                  , autoWidth: _this.options.autoWidth
                                  , storageTag: _this.options.storageTag
                                  , storeDataRow: _this.options.storeDataRow
                                  }
                                );

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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
      let filter = br.storage.get(_this.storageTag + 'filter');
      filter = filter || { };
      filter[name] = value;
      br.storage.set(_this.storageTag + 'filter', filter);
    };

    _this.getFilter = function(name, defaultValue) {
      let filter = br.storage.get(_this.storageTag + 'filter', defaultValue);
      filter = filter || { };
      return filter[name];
    };

    _this.reloadRow = function(rowid, callback, options) {
      _this.dataGrid.reloadRow(rowid, callback, options);
    };

    _this.hasRow = function(rowid) {
      return _this.dataGrid.hasRow(rowid);
    };

    _this.removeRow = function(rowid) {
      return _this.dataGrid.removeRow(rowid);
    };

    function deleteQueued() {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        _this.dataSource.remove(rowid, function(result, response) {
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
        br.confirm( 'Delete confirmation'
                  , 'Are you sure you want do delete ' + selectionQueue.length + ' record(s)?'
                  , function() {
                      br.startProgress(selectionQueue.length, 'Deleting...');
                      deleteQueued();
                    }
                  );
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function updateQueued(func) {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        let data = Object.create({});
        func(data);
        _this.dataSource.update(rowid, data, function(result, response) {
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
      params = params || Object.create({});
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

    _this.init = function() {

      if (_this.options.nav) {
        $('.nav-item[rel=' + _this.options.nav + ']').addClass('active');
      }

      _this.dataSource.before('select', function(request, options) {
        request = request || Object.create({});
        if ($(findNode('input.data-filter[name=keyword]')).length > 0) {
          request.keyword = $(findNode('input.data-filter[name=keyword]')).val();
          _this.setFilter('keyword', request.keyword);
        }
        options       = options || {};
        options.skip  = _this.skip;
        options.limit = _this.limit || _this.defaultLimit;
      });

      _this.dataSource.after('remove', function(request, options) {
        if (selectionQueue.length === 0) {
          _this.resetPager();
          _this.updatePager();
        }
        if (_this.dataGrid.isEmpty()) {
          _this.refresh();
        }
      });

      _this.dataSource.after('insert', function(request, options) {
        _this.resetPager();
        _this.updatePager();
      });

      _this.countDataSource.before('select', function(request) {
        if ($(findNode('input.data-filter[name=keyword]')).length > 0) {
          request.keyword = $(findNode('input.data-filter[name=keyword]')).val();
        }
      });

      _this.dataSource.after('select', function(result, response) {
        if (result) {
          if (_this.options.autoLoad) {
            _this.skip = _this.skip + response.length;
          }
        }
        _this.updatePager(true);
        showFiltersDesc();
      });

      // search

      br.modified(findNode('input.data-filter[name=keyword]'), function() {
        const _val = $(this).val();
        $(findNode('input.data-filter[name=keyword]')).each(function() {
          if ($(this).val() != _val) {
            $(this).val(_val);
          }
        });
        if ($(this).hasClass('instant-search')) {
          _this.refreshDeferred();
        }
      });

      br.modified(findNode('input.data-filter') + ',' + findNode('select.data-filter'), function() {
        _this.resetPager();
      });

      br.attachDatePickers();

      if (_this.options.features.editor) {
        let editorOptions = _this.options.editor || { noun: _this.options.noun };
        _this.editor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
        _this.editor.events.connectTo(_this.events);

        $(findNode('.action-create')).show();

        $(document).on('click', selActionCRUD, function() {
          const isCopy = $(this).hasClass('action-copy');
          const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
          _this.editor.show(rowid, isCopy);
        });
      }

      // pager

      $(findNode('a.action-next') + ',' + findNode('a.pager-action-next')).on('click', function() {
        _this.skip += _this.limit;
        _this.refresh({}, null, true);
      });

      $(findNode('a.action-prior') + ',' + findNode('a.pager-action-prior')).on('click', function() {
        _this.skip -= _this.limit;
        if (_this.skip < 0) {
          _this.skip = 0;
        }
        _this.refresh({}, null, true);
      });

      $(findNode('.pager-page-navigation')).on('click', 'a.pager-action-navigate', function() {
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

      $(findNode('.pager-page-size-navigation')).on('click', 'a.pager-action-page-size', function() {
        const value = br.toInt($(this).attr('data-size'));
        _this.limit = value;
        _this.skip = 0;
        _this.setStored('pager_PageNo', _this.skip);
        _this.setStored('pager_PageSize', _this.limit);
        _this.refresh({}, null, true);
      });

      $(findNode('.action-refresh')).click(function() {
        _this.refresh();
      });

      $(findNode('.action-clear-one-filter')).click(function() {
        $(findNode('.data-filter[name=' + $(this).attr('rel') + ']')).val('');
        _this.refresh();
      });

      $(findNode('input.data-filter[name=keyword]')).val(_this.getFilter('keyword'));

      function showFiltersDesc() {

        if ($(findNode('.filters-panel')).is(':visible')) {
          $(findNode('.action-show-hide-filters')).find('span').text('Hide filters');
          $(findNode('.filter-description')).text('');
        } else {
          $(findNode('.action-show-hide-filters')).find('span').text('Show filters');
          let s = '';
          $(findNode('.data-filter')).each(function() {
            const val = $(this).val();
            const title = $(this).attr('title');
            if (val && title) {
              s = s + '/ <strong>' + title + '</strong> ';
              if ($(this).is('select')) {
                s = s + $(this).find('option[value=' + val + ']').text() + ' ';
              } else {
                s = s + val + ' ';
              }

            }
          });
          $(findNode('.filter-description')).html(s);
        }

      }

      function setupFilters(initial) {

        function showHideFilters(initial) {

          if ($(findNode('.filters-panel')).is(':visible')) {
            _this.setStored('filters-hidden', true);
            $(findNode('.filters-panel')).css('display', 'none');
            showFiltersDesc();
            _this.events.trigger('hideFilters');
          } else {
            _this.setStored('filters-hidden', false);
            $(findNode('.filters-panel')).show();
            showFiltersDesc();
            _this.events.trigger('showFilters');
          }

          if (_this.dataGrid.table) {
            _this.dataGrid.table.update();
          }

        }

        $(findNode('.action-show-hide-filters')).on('click', function() {
          showHideFilters();
        });

        $(findNode('.action-reset-filters')).on('click', function () {
          _this.resetFilters();
        });

        if (br.isNull(_this.getStored('filters-hidden'))) {
          _this.setStored('filters-hidden', _this.options.defaults.filtersHidden);
        }

        if (_this.getStored('filters-hidden')) {
          showFiltersDesc();
        } else {
          showHideFilters(initial);
        }

      }

      setupFilters(true);

      function checkAutoLoad() {

        const docsHeight = $(_this.options.selectors.dataTable).height();
        const docsContainerHeight = $(_this.scrollContainer()).height();
        const scrollTop = $(_this.scrollContainer()).scrollTop();

        if (scrollTop + docsContainerHeight > docsHeight) {
          _this.dataGrid.loadMore();
        }

      }

      if (_this.options.autoLoad) {
        $(_this.scrollContainer()).on('scroll', function() {
          checkAutoLoad();
        });
      }

      $(document).on('click', findNode('.action-select-all'), function() {
        _this.selectAll($(this).is(':checked'));
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

      $(document).on('click', findNode('.action-clear-selection'), function() {
        _this.clearSelection();
      });

      $(document).on('click', findNode('.action-delete-selected'), function() {
        _this.deleteSelection();
      });

      _this.dataGrid.before('changeOrder', function() {
        _this.resetPager();
      });

      _this.dataGrid.on('change', function() {
        $(findNode('.action-select-all')).prop('checked', false);
        const selection = _this.selection.get();
        if (selection.length > 0) {
          _this.restoreSelection();
        } else {
          _this.clearSelection();
        }
        _this.events.trigger('change');
        _this.events.triggerAfter('change');
      });

      _this.events.on('selectionChanged', function(count) {
        if (count > 0) {
          $(findNode('.selection-stat')).text(count + ' record(s) selected');
          $(findNode('.selection-stat')).show();
          $(findNode('.action-clear-selection')).show();
        } else {
          $(findNode('.selection-stat')).css('display', 'none');
          $(findNode('.action-clear-selection')).css('display', 'none');
        }
      });

      return this;
    };

    function initPager() {

      if (pagerInitialized) {
        return;
      }

      if ($.fn.slider) {
        $(findNode('.pager-page-slider')).each(function() {
          pageNavIsSlider = true;
          $(this).slider({
              min: 1
            , value: 1
            , change: function(event, ui) {
                const value = $(findNode('.pager-page-slider')).slider('option', 'value');
                if (value > 0) {
                  const newSkip = _this.limit * (value - 1);
                  if (newSkip != _this.skip) {
                    _this.skip = _this.limit * (value - 1);
                    _this.setStored('pager_PageNo', _this.skip);
                    _this.refresh({}, null, true);
                  }
                }
              }
          });
        });

        $(findNode('.pager-page-size-slider')).each(function() {
          pageSizeIsSlider = true;
          $(this).slider({
              min: _this.defaultLimit
            , value: _this.limit
            , max: _this.defaultLimit * 20
            , step: _this.defaultLimit
            , change: function(event, ui) {
                _this.limit = $(findNode('.pager-page-size-slider')).slider('option', 'value');
                _this.setStored('pager_PageSize', _this.limit);
                $(findNode('.pager-page-slider')).slider('option', 'value', 1);
                $(findNode('.pager-page-slider')).slider('option', 'max', Math.ceil(_this.recordsAmount / _this.limit));
                _this.refresh({}, null, true);
              }
          });
        });
      }

      pagerInitialized = true;

    }

    function internalUpdatePager() {

      initPager();

      const totalPages = Math.ceil(_this.recordsAmount / _this.limit);
      const currentPage = Math.ceil(_this.skip / _this.limit) + 1;

      if (pageNavIsSlider) {
        $(findNode('.pager-page-slider')).slider('option', 'max', totalPages);
        $(findNode('.pager-page-slider')).slider('option', 'value', currentPage);
      } else {
        const $pc = $(findNode('.pager-page-navigation'));
        $pc.html('');
        let s = '';
        let f1 = false;
        let f2 = false;
        let r = 5;
        let el = false;
        for(let i = 1; i <= totalPages; i++) {
          if ((i <= r) || ((i > currentPage - r) && (i < currentPage + r)) || (i > (totalPages - r))) {
            if (i == currentPage) {
              s = s + '<strong class="pager-nav-element">' + i+ '</strong>';
            } else {
              el = true;
              s = s + '<a href="javascript:;" class="pager-action-navigate pager-nav-element" data-page="'+ i + '">' + i+ '</a>';
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
      }

      if (pageSizeIsSlider) {

      } else {
        const $pc = $(findNode('.pager-page-size-navigation'));
        $pc.html('');
        let s = '';
        const sizes = _this.options.pageSizes;
        for(let i = 0, length = sizes.length; i < length; i++) {
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
          $(findNode('.pager-page-size-container')).css('display', 'none');
        }
      }

      const min = (_this.skip + 1);
      const max = Math.min(_this.skip + _this.limit, _this.recordsAmount);

      if (_this.recordsAmount > 0) {
        if (_this.recordsAmount > max) {
          $(findNode('.action-next')).show();
          $(findNode('.pager-action-next')).show();
        } else {
          $(findNode('.action-next')).css('display', 'none');
          $(findNode('.pager-action-next')).css('display', 'none');
        }
        if (_this.skip > 0) {
          $(findNode('.action-prior')).show();
          $(findNode('.pager-action-prior')).show();
        } else {
          $(findNode('.action-prior')).css('display', 'none');
          $(findNode('.pager-action-prior')).css('display', 'none');
        }
        $(findNode('.pager-control')).show();
        _this.events.triggerAfter('pager.show');
      } else {
        $(findNode('.pager-control')).css('display', 'none');
        _this.events.triggerAfter('pager.hide');
      }
      $(findNode('.pager-stat')).text('Records ' + min + '-' + max + ' of ' + _this.recordsAmount);
      $(findNode('.pager-page-size')).text(_this.limit + ' records per page');

      pagerSetUp = true;

      if (_this.dataGrid.table) {
        _this.dataGrid.table.update();
      }

    }

    _this.restoreSelection = function(selection) {
      if (!selection) {
        selection = _this.selection.get();
      }
      for(let i = 0, length = selection.length; i < length; i++) {
        _this.selectRow(selection[i], true);
      }
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.clearSelection = function() {
      _this.selection.clear();
      $(findNode('.action-select-row')).prop('checked', false);
      $(findNode('tr.row-selected')).removeClass('row-selected');
      $(findNode('.action-select-all')).prop('checked', false);
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.getSelection = function() {
      return _this.selection.get();
    };

    _this.setSelection = function(selection) {
      if (selection) {
        for(let i = 0, length = selection.length; i < length; i++) {
          _this.selectRow(selection[i], true);
          _this.selection.append(selection[i]);
        }
        _this.events.trigger('selectionChanged', _this.selection.get().length);
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
            $(findNode('.pager-control')).css('display', 'none');
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

    _this.unSelectRow = function(rowid, multiple) {
      const chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
      if (row.length > 0) {
        row.find('.action-select-row').prop('checked', false);
        row.removeClass('row-selected');
      }
      _this.selection.remove(rowid);
      if (!multiple) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    _this.selectRow = function(rowid, multiple) {
      const chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
      if (row.length > 0) {
        row.find('.action-select-row').prop('checked', true);
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

    _this.resetFilters = function() {
      $(findNode('input.data-filter')).val('');
      $(findNode('select.data-filter')).val('');
      $(findNode('select.data-filter')).trigger('reset');
      br.storage.remove(_this.storageTag + 'filter');
      _this.events.trigger('resetFilters');
      br.refresh();
    };

    _this.refreshDeferred = function(filter, callback, doNotResetPager) {

      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {
        internalRefresh(true, filter, function(result, response, request, options) {
          if (result) {
            resolve({ request: request, options: options, response: response });
          } else {
            reject({ request: request, options: options, errorMessage: response });
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

    };

    _this.load = _this.refresh = function(filter, callback, doNotResetPager) {

      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {
        internalRefresh(false, filter, function(result, response, request, options) {
          if (result) {
            resolve({ request: request, options: options, response: response });
          } else {
            reject({ request: request, options: options, errorMessage: response });
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

    };

    return _this.init();

  }

  window.br.dataBrowser = function (entity, options) {
    return new BrDataBrowser(entity, options);
  };

})(jQuery, window);
