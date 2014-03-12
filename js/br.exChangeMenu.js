/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options) {

    options = options || {};

    var _this = this;
    var menuTemplate = '<div class="dropdown br-ajax-dropdown">'+
                       '  <a href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle not-a br-ex-action-change-menu-menu"><span>{{value}}</span> <b class="caret"></b></a>'+
                       '  <ul class="dropdown-menu" role="menu"></ul>'+
                       '</div>';
    var menuItemTemplate = '<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>';

    $(selector).each(function() {
      var $this = $(this);
      $this.html(br.fetch(menuTemplate, { value: $this.html() }));
      var $menu = $this.find('.br-ex-action-change-menu-menu');
      var $menuElement = $menu.find('span');
      var $ul = $menu.parent().find('ul');
      $this.on('click', '.br-ex-action-change-menu-menu', function() {
        choicesDataSource.select(function(result, response) {
          if (result) {
            $ul.html('');
            for(var i in response) {
              $ul.append(br.fetch(menuItemTemplate, { id: response[i].id, name: response[i].name }));
            }
            if ($menu.is(':visible')) {

            } else {
              $menu.dropdown('toggle');
            }
          }
        });
      });
      $this.on('click', '.br-ex-action-change-menu', function() {
        var rowId = $(this).closest('[data-rowid]').attr('data-rowid');
        var value = $(this).attr('data-value');
        var data = {};
        data[fieldName] = value;
        dataSource.update(rowId, data, function(result, response) {
          if (options.onUpdate) {
            options.onUpdate.call(_this, response, $menuElement);
          }
        });
      });
    });

  }

  window.br = window.br || {};

  window.br.exChangeMenu = function (selector, choicesDataSource, dataSource, fieldName, options) {
    return new BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options);
  }

})(jQuery, window);
