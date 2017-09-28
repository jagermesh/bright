/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrEditable(ctrl, options) {

    var _this = this;
    _this.ctrl = $(ctrl);
    if (br.isFunction(options)) {
      options = { onSave: options };
    }
    _this.options = options || {};
    _this.editor = null;
    _this.savedWidth = '';
    _this.click = function(element, e) {
      if (!_this.activated()) {
        var content = '';
        if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
          content = _this.ctrl.attr('data-editable');
        } else {
          content = _this.ctrl.text();
        }
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        _this.ctrl.text('');
        var isTextarea = (_this.ctrl.attr('data-editable-type') == 'textarea');
        if (isTextarea) {
          _this.editor = $('<textarea rows="3"></textarea>');
        } else {
          _this.editor = $('<input type="text" />');
        }
        _this.editor.addClass('form-control');
        _this.editor.addClass('br-editable-control');
        _this.editor.css('width', '100%');
        _this.editor.css('height', '100%');
        _this.editor.css('min-height', '30px');
        _this.editor.css('font-size', _this.ctrl.css('font-size'));
        _this.editor.css('font-weight', _this.ctrl.css('font-weight'));
        _this.editor.css('box-sizing', '100%');
        _this.editor.css('-webkit-box-sizing', 'border-box');
        _this.editor.css('-moz-box-sizing', 'border-box');
        _this.editor.css('-ms-box-sizing', 'border-box');
        _this.editor.css('margin-top', '2px');
        _this.editor.css('margin-bottom', '2px');
        if (_this.ctrl.attr('data-editable-style')) {
          _this.editor.attr('style', _this.ctrl.attr('data-editable-style'));
        }
        _this.ctrl.append(_this.editor);
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        _this.editor.val(content);
        _this.editor.on('keydown', function(e) {
          if (e.keyCode == 9) {
            var content = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'keyup');
            } else {
              _this.apply(content);
            }
            e.stopPropagation();
            e.preventDefault();
          }
        });
        _this.editor.on('keyup', function(e) {
          var content = _this.editor.val();
          switch (e.keyCode) {
            case 13:
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              break;
            case 27:
              _this.cancel();
              e.stopPropagation();
              break;
          }
        });
        _this.editor.on('blur', function(e) {
          var ok = true;
          if (_this.options.onBlur) {
            ok = _this.options.onBlur.call(_this.ctrl, e);
          }
          if (ok) {
            var content = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'blur');
            } else {
              _this.apply(content);
            }
          }
        });
        _this.editor.focus();
      }
    };

    _this.get = function() {
      return _this;
    };

    _this.activated = function() {
      return _this.editor !== null;
    };

    _this.save = function(content) {
      if (_this.editor) {
        if (content === undefined) {
          content = _this.editor.val();
        }
        if (_this.options.onSave) {
          _this.options.onSave.call(_this.ctrl, content, 'blur');
        } else {
          _this.apply(content);
        }
      }
    };

    _this.apply = function(content) {
      if (_this.editor) {
        if (content === undefined) {
          content = _this.editor.val();
        }
        _this.editor.remove();
        _this.editor = null;
        _this.ctrl.html(content);
        if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
          _this.ctrl.attr('data-editable', content);
        }
        _this.ctrl.css('width', '');
      }
    };

    _this.cancel = function() {
      if (_this.editor) {
        _this.editor.remove();
        _this.editor = null;
        _this.ctrl.html(_this.ctrl.data('brEditable-original-html'));
        _this.ctrl.css('width', '');
      }
    };

  }

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      if ($(selector).hasClass('br-editable-control')) {
        selector = $(selector).parent();
      }
      var data = $(selector).data('brEditable-editable');
      switch (callback) {
        case 'exists':
          if (data) {
            return true;
          } else {
            return false;
          }
          break;
        case 'get':
        case 'apply':
        case 'save':
        case 'cancel':
        case 'click':
          if (!data) {
            $(selector).data('brEditable-editable', (data = new BrEditable($(selector), callback)));
          }
          if (data) {
            return data[callback](value);
          }
          break;
      }
    } else {
      $(document).on('click', selector, function(e) {
        var $this = $(this), data = $this.data('brEditable-editable');
        if (!data) {
          $this.data('brEditable-editable', (data = new BrEditable(this, callback)));
        }
        data.click(e);
      });
    }
  };

})(jQuery, window);
