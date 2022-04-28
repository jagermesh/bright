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

  const invokerTemplate = br.compile(`
    <div class="dropdown br-ajax-dropdown">
      <a href="javascript:;" class="br-ex-action-change-menu-menu" style="cursor:pointer;"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a>
    </div>
  `);
  const menuItemTemplateStr = `
    <li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>
  `;
  const menuItemTemplate = br.compile(`
    <li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>
  `);
  const dropDownTemplate = `
    <div class="dropdown br-ajax-dropdown" style="position:absolute;z-index:99999;">
      <a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle br-ex-action-change-menu-menu" style="cursor:pointer;"><span>{{value}}</span> <b class="caret"></b></a>
      <ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul>
    </div>
  `;

  function showDropDownMenu(invoker, items, rowid, menuElement, dataSource, fieldName, options) {
    const dropDown = $(dropDownTemplate);
    const dropDownList = dropDown.find('ul');
    const dropDownMenu = dropDown.find('.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      const value = $(this).attr('data-value');
      let data = {};
      data[fieldName] = value;
      if (options.onClick) {
        options.onClick.call(invoker, dataSource, rowid, data, menuElement);
      } else {
        dataSource.update(rowid, data, function(result, response) {
          if (result) {
            if (options.onUpdate) {
              options.onUpdate.call(invoker, response, menuElement);
            }
          }
        });
      }
    });
    $(document).on('click.dropdown.data-api', function() {
      dropDown.remove();
    });
    dropDownList.html('');
    if (options.allowClear) {
      dropDownList.append(menuItemTemplate({
        id: '',
        name: (options.clearLabel ? options.clearLabel : '--clear--')
      }));
    }
    if (options.onBeforeRenderMenu) {
      options.onBeforeRenderMenu.call(dropDownList, menuItemTemplateStr);
    }
    for (let i = 0, length = items.length; i < length; i++) {
      dropDownList.append(menuItemTemplate({
        id: items[i][options.keyField],
        name: items[i][options.nameField]
      }));
    }
    const invokerItem = invoker.find('.br-ex-action-change-menu-menu');
    const scr = $(window).scrollTop();
    let leftOffset = invoker.offset().left;
    let t = (invokerItem.offset().top + invokerItem.height());
    dropDown.css('top', t + 'px');
    t = t - scr;
    let h = Math.max($(window).height() - t - 20, 100);
    dropDownList.css('max-height', h + 'px');
    $('body').append(dropDown);
    if (options.dropDownPosition === 'left') {
      leftOffset -= dropDownList.width();
    }
    dropDown.css('left', `${leftOffset}px`);
    dropDownMenu.dropdown('toggle');
  }

  function internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    const rowid = el.closest('[data-rowid]').attr('data-rowid');
    const menuElement = invoker.find('span.br-ex-current-value');
    let filter = {
      targetRowid: rowid
    };
    if (options.onSelect) {
      options.onSelect.call(choicesDataSource, filter, rowid, $(el));
    }
    choicesDataSource.select(filter, function(result, response) {
      if (result && (response.length > 0)) {
        showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options);
      }
    });
  }

  function handleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    if (options.onActivate) {
      options.onActivate.call(el, function() {
        internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options);
      });
    } else {
      internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options);
    }
  }

  function setupControl(el, doClick, choicesDataSource, dataSource, fieldName, options) {
    const $this = el;
    if (!$this.data('BrExChangeMenu')) {
      $this.data('BrExChangeMenu', true);
      let value = $this.text().trim();
      if (!options.hideHint) {
        if ((value.length === 0) || (value == '(click to change)')) {
          value = '<span style="color:#AAA;">(click to change)</span>';
        }
      }
      const invoker = $(invokerTemplate({
        value: value
      }));
      if (options.onSetupInvoker) {
        options.onSetupInvoker.call(invoker);
      }
      $this.html(invoker);
      $this.on('click', '.br-ex-action-change-menu-menu', function() {
        handleClick($(this), $this, choicesDataSource, dataSource, fieldName, options);
      });
      if (doClick) {
        handleClick($this.find('.br-ex-action-change-menu-menu'), $this, choicesDataSource, dataSource, fieldName, options);
      }
    }
  }

  function BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options) {
    let settings = Object.assign({
      keyField: 'id',
      nameField: 'name',
      sticky: true,
    }, options);

    if (settings.container) {
      $(settings.container).find(selector).each(function() {
        setupControl($(this), false, choicesDataSource, dataSource, fieldName, settings);
      });
      $(settings.container).on('click', selector, function() {
        setupControl($(this), true, choicesDataSource, dataSource, fieldName, settings);
      });
    } else {
      $(selector).each(function() {
        setupControl($(this), false, choicesDataSource, dataSource, fieldName, settings);
      });

      if (settings.sticky) {
        $(document).on('click', selector, function() {
          setupControl($(this), true, choicesDataSource, dataSource, fieldName, settings);
        });
      }
    }
  }

  window.br.dropDownMenu = function(selector, choicesDataSource, dataSource, fieldName, options) {
    return new BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options);
  };
})(jQuery, window);