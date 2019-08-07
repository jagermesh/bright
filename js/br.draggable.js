/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global jQuery */

;(function ($, window) {

  function makeDraggable(ctrl, options) {

    if (ctrl.__br_draggable) {
      return ctrl.__br_draggable;
    }

    var _this = this;

    var dragObject = null;
    var dragHandler = null;

    options = options || {};
    options.exclude = [ 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON' ];

    if (options.handler) {
      dragHandler = ctrl.querySelector(options.handler);
    } else {
      dragHandler = ctrl;
    }

    function setPosition(element, left, top) {
      element.style.marginTop = '0px';
      element.style.marginLeft = '0px';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
    }

    var drg_h, drg_w, pos_y, pos_x, ofs_x, ofs_y;

    ctrl.style.cursor = 'move';
    ctrl.style.position = 'fixed';

    function downHandler(e) {
      var target = e.target || e.srcElement;
      var parent = target.parentNode;

      if (target && (options.exclude.indexOf(target.tagName.toUpperCase()) == -1)) {
        if (!parent || (options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) {  // img in a
          dragObject = ctrl;

          var pageX = e.pageX || e.touches[0].pageX;
          var pageY = e.pageY || e.touches[0].pageY;

          ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
          ofs_y = dragObject.getBoundingClientRect().top  - dragObject.offsetTop;

          pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
          pos_y = pageY - (dragObject.getBoundingClientRect().top  + document.body.scrollTop);

          e.preventDefault();
        }
      }
    }

    function moveHandler(e) {
      if (dragObject !== null) {
        var pageX = e.pageX || e.touches[0].pageX;
        var pageY = e.pageY || e.touches[0].pageY;
        var left = pageX - pos_x - ofs_x - document.body.scrollLeft;
        var top  = pageY - pos_y - ofs_y - document.body.scrollTop;

        setPosition(dragObject, left, top);
        if (options.ondrag) {
          options.ondrag.call(e);
        }
      }
    }

    function upHandler(e) {
      if (dragObject !== null) {
        dragObject = null;
      }
    }

    dragHandler.addEventListener('mousedown', function(e) {
      downHandler(e);
    });

    window.addEventListener('mousemove', function(e) {
      moveHandler(e);
    });

    window.addEventListener('mouseup', function(e) {
      upHandler(e);
    });

    dragHandler.addEventListener('touchstart', function(e) {
      downHandler(e);
    });

    window.addEventListener('touchmove', function(e) {
      moveHandler(e);
    });

    window.addEventListener('touchend', function(e) {
      upHandler(e);
    });

    ctrl.__br_draggable = _this;

    return _this;

  }

  window.br = window.br || {};

  window.br.draggable = function (selector, options) {
    var result = [];
    $(selector).each(function() {
      result.push(makeDraggable(this, options));
    });
    if (result.length === 1) {
      return result[0];
    }
    return result;
  };

})(jQuery, window);
