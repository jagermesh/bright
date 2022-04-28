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

  function BrEditable(ctrl, options) {
    const _this = this;

    if (br.isFunction(options)) {
      options = {
        onSave: options
      };
    }

    _this.options = options || {};
    _this.ctrl = $(ctrl);
    _this.editor = null;
    _this.savedWidth = '';

    _this.click = function() {
      const isExternalEditor = (_this.ctrl.attr('data-editable-type') == 'textarea');
      let content = ((typeof _this.ctrl.attr('data-editable') != 'undefined') ? _this.ctrl.attr('data-editable') : _this.ctrl.text());
      if (isExternalEditor) {
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        let fields = {
          value: {
            title: _this.ctrl.attr('title'),
            value: content
          }
        };
        br.prompt('Please enter value', fields, function(values) {
          if (_this.options.onSave) {
            _this.options.onSave.call(_this.ctrl, values[0], 'keyup');
          } else {
            _this.apply(values[0]);
          }
        }, {
          valueType: 'text',
          okTitle: 'Save',
        });
      } else
      if (!_this.activated()) {
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        _this.ctrl.text('');
        _this.editor = $('<input type="text" />');
        _this.editor.addClass('form-control');
        _this.editor.addClass('br-editable-control');
        _this.editor.css({
          'width': '100%',
          'height': '100%',
          'min-height': '30px',
          'min-width': '60px',
          'font-size': _this.ctrl.css('font-size'),
          'font-weight': _this.ctrl.css('font-weight'),
          'box-sizing': '100%',
          '-webkit-box-sizing': 'border-box',
          '-moz-box-sizing': 'border-box',
          '-ms-box-sizing': 'border-box',
          'margin-top': '2px',
          'margin-bottom': '2px'
        });
        if (_this.ctrl.attr('data-editable-style')) {
          _this.editor.attr('style', _this.ctrl.attr('data-editable-style'));
        }
        _this.ctrl.append(_this.editor);
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        _this.editor.val(content);
        _this.editor.on('keydown', function(evt0) {
          if (evt0.keyCode == 9) {
            let value = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'keyup');
            } else {
              _this.apply(value);
            }
            evt0.stopPropagation();
            evt0.preventDefault();
          }
        });
        _this.editor.on('keyup', function(evt0) {
          let value = _this.editor.val();
          switch (evt0.keyCode) {
          case 13:
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'keyup');
            } else {
              _this.apply(value);
            }
            evt0.stopPropagation();
            break;
          case 27:
            _this.cancel();
            evt0.stopPropagation();
            break;
          }
        });
        _this.editor.on('blur', function(evt0) {
          let ok = true;
          if (_this.options.onBlur) {
            ok = _this.options.onBlur.call(_this.ctrl, evt0);
          }
          if (ok) {
            let value = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'blur');
            } else {
              _this.apply(value);
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

    return _this;
  }

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      if ($(selector).hasClass('br-editable-control')) {
        selector = $(selector).parent();
      }
      let instance = $(selector).data('brEditable-editable');
      switch (callback) {
      case 'exists':
        return !!instance;
      case 'get':
      case 'apply':
      case 'save':
      case 'cancel':
      case 'click':
        if (!instance) {
          instance = new BrEditable($(selector), callback);
          $(selector).data('brEditable-editable', instance);
        }
        return instance[callback](value);
      }
    } else {
      $(document).on('click', selector, function(event) {
        let $this = $(this);
        let instance = $this.data('brEditable-editable');
        if (!instance) {
          instance = new BrEditable(this, callback);
          $this.data('brEditable-editable', instance);
        }
        if (instance.options.onActivate) {
          instance.options.onActivate.call(instance.ctrl, function() {
            instance.click(event);
          });
          return;
        }
        if (instance.options.onClick) {
          instance.options.onClick.call(instance.ctrl, event);
          return;
        }
        return instance.click(event);
      });
    }
  };
})(jQuery, window);