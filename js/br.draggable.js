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

  function BrDraggable(ctrl, options) {
    const _this = this;

    let dragObject = null;
    let dragHandler = null;
    let pos_y, pos_x, ofs_x, ofs_y;

    _this.options = Object.assign({
      exclude: ['INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON']
    }, options);

    function setPosition(element, left, top) {
      element.style.marginTop = '0px';
      element.style.marginLeft = '0px';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      element.style.right = '';
      element.style.bottom = '';
    }

    function downHandler(e) {
      if (e.button === 0) {
        let target = e.target || e.srcElement;
        let parent = target.parentNode;

        if (target && (_this.options.exclude.indexOf(target.tagName.toUpperCase()) == -1)) {
          if (!parent || (_this.options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) { // img in a
            dragObject = ctrl;

            let pageX = e.pageX || e.touches[0].pageX;
            let pageY = e.pageY || e.touches[0].pageY;

            ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
            ofs_y = dragObject.getBoundingClientRect().top - dragObject.offsetTop;

            pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
            pos_y = pageY - (dragObject.getBoundingClientRect().top + document.body.scrollTop);

            e.preventDefault();
          }
        }
      }
    }

    function moveHandler(e) {
      if (dragObject !== null) {
        let pageX = e.pageX || e.touches[0].pageX;
        let pageY = e.pageY || e.touches[0].pageY;
        let left = pageX - pos_x - ofs_x - document.body.scrollLeft;
        let top = pageY - pos_y - ofs_y - document.body.scrollTop;
        if (top < 0) {
          top = 0;
        }
        if (top > window.innerHeight) {
          top = window.innerHeight - 40;
        }
        if (left < 0) {
          left = 0;
        }

        setPosition(dragObject, left, top);
        if (_this.options.ondrag) {
          _this.options.ondrag.call(e);
        }
      }
    }

    function upHandler() {
      if (dragObject !== null) {
        dragObject = null;
      }
    }

    if (_this.options.handler) {
      dragHandler = ctrl.querySelector(_this.options.handler);
    } else {
      dragHandler = ctrl;
    }

    if (dragHandler) {
      dragHandler.style.cursor = 'move';
      ctrl.style.position = 'fixed';

      if (dragHandler.__br_draggable) {
        return dragHandler.__br_draggable;
      }

      dragHandler.addEventListener('mousedown', function(event) {
        downHandler(event);
      });

      window.addEventListener('mousemove', function(event) {
        moveHandler(event);
      });

      window.addEventListener('mouseup', function() {
        upHandler();
      });

      dragHandler.addEventListener('touchstart', function(event) {
        downHandler(event);
      });

      window.addEventListener('touchmove', function(event) {
        moveHandler(event);
      });

      window.addEventListener('touchend', function() {
        upHandler();
      });

      dragHandler.__br_draggable = _this;
    }

    return _this;
  }

  window.br.draggable = function(selector, options) {
    let result = [];
    $(selector).each(function() {
      result.push(new BrDraggable(this, options));
    });
    if (result.length === 1) {
      return result[0];
    }
    return result;
  };
})(jQuery, window);