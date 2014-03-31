/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options) {
    var menuItemTemplate = '<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>';
    var dropDown = $('<div class="dropdown br-ajax-dropdown" style="position:absolute;"><a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle not-a br-ex-action-change-menu-menu"><span>{{value}}</span> <b class="caret"></b></a><ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul></div>');
    dropDownList = dropDown.find('ul');
    dropDownMenu = dropDown.find('a.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      var value = $(this).attr('data-value');
      var data = {};
      data[fieldName] = value;
      dataSource.update(rowid, data, function(result, response) {
        if (options.onUpdate) {
          options.onUpdate.call(invoker, response, menuElement);
        }
      });
      // dropDown.remove();
    });
    $(document).on('click.dropdown.data-api', function() {
      dropDown.remove();
    });
    dropDownList.html('');
    for(var i in response) {
      dropDownList.append(br.fetch(menuItemTemplate, { id: response[i].id, name: response[i].name }));
    }
    dropDown.css('left', invoker.offset().left + 'px');
    var t = (invoker.offset().top + invoker.height());
    dropDown.css('top', t + 'px');
    var h = Math.max($(window).height() - t - 20, 100);
    dropDownList.css('max-height', h + 'px');
    $('body').append(dropDown);
    dropDownMenu.dropdown('toggle');
  }

  function BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options) {

    options = options || {};

    var invokerTemplate = '<div class="dropdown br-ajax-dropdown"><a href="javascript:;" class="not-a br-ex-action-change-menu-menu"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a></div>';

    $(selector).each(function() {
      var $this = $(this);
      if ($this.data('BrExChangeMenu')) {

      } else {
        $this.data('BrExChangeMenu', true);
        var value = $this.html();
        if (value.length == 0) {
          value = '<span style="color:#AAA;">(click to change)</span>';
        }
        $this.html(br.fetch(invokerTemplate, { value: value }));
        $this.on('click', '.br-ex-action-change-menu-menu', function() {
          rowid = $(this).closest('[data-rowid]').attr('data-rowid');
          menuElement = $this.find('span.br-ex-current-value');
          choicesDataSource.select(function(result, response) {
            if (result && (response.length > 0)) {
              showDropDownMenu($this, response, rowid, menuElement, dataSource, fieldName, options);
            }
          });
        });
      }
    });

  }

  window.br = window.br || {};

  window.br.exChangeMenu = function (selector, choicesDataSource, dataSource, fieldName, options) {
    return new BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options);
  }

})(jQuery, window);
