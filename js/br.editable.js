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
    options = options || {};
    _this.options = options;
    _this.options.popover_placement = _this.ctrl.attr('data-popover-placement') || 'bottom';
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
        var width = _this.ctrl.innerWidth();
        var height = _this.ctrl.innerHeight();
        _this.ctrl.text('');
        var isTextarea = (_this.ctrl.attr('data-editable-type') == 'textarea');
        if (isTextarea) {
          _this.editor = $('<textarea rows="3"></textarea>');
        } else {
          _this.editor = $('<input type="text" />');
        }
        _this.editor.addClass('form-control');
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
        // _this.ctrl.css('width', width - 10);
        _this.editor.focus();
        $('div.popover').remove();
        if (!_this.options.hideHint) {
          if (_this.options.saveOnLoosingFocus || isTextarea) {
            if (isTextarea) {
              _this.editor.popover({placement: _this.options.popover_placement, animation: false, trigger: 'manual', content: 'WARNING!!! Changes will be saved after leaving input box or by pressing [Tab]. Press [Esc] to cancel changes.'});
            } else {
              _this.editor.popover({placement: _this.options.popover_placement, animation: false, trigger: 'manual', content: 'WARNING!!! Changes will be saved after leaving input box, by pressing [Enter], or by pressing [Tab]. Press [Esc] to cancel changes.'});
            }
          } else {
            _this.editor.popover({placement: _this.options.popover_placement, animation: false, trigger: 'manual', content: 'Press [Enter] to save changes, [Esc] to cancel changes.'});
          }
        }
        _this.editor.popover('show');
        if (_this.options.saveOnLoosingFocus || isTextarea) {
          $(_this.editor).on('keydown', function(e) {
            if (e.keyCode == 9) {
              var content = $(this).val();
              $('div.popover').remove();
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              e.preventDefault();
            }
          });
          $(_this.editor).on('blur', function(e) {
            $('div.popover').remove();
            var content = $(this).val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'blur');
            } else {
              _this.apply(content);
            }
          });
        }
        $(_this.editor).on('keyup', function(e) {
          var content = $(this).val();
          switch (e.keyCode) {
            case 13:
              $('div.popover').remove();
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              break;
            case 27:
              $('div.popover').remove();
              _this.cancel();
              e.stopPropagation();
              break;
          }
        });
      }
    };

    _this.activated = function() {
      return _this.editor !== null;
    };

    _this.apply = function(content) {
      $('div.popover').remove();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.html(content);
      if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
        _this.ctrl.attr('data-editable', content);
      }
      _this.ctrl.css('width', '');
    };

    _this.cancel = function() {
      $('div.popover').remove();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.html(_this.ctrl.data('brEditable-original-html'));
      _this.ctrl.css('width', '');
    };

  }

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if ($('#br_editablePopover').length === 0) {
      $('body').append($('<div id="br_editablePopover"></div>'));
    }
    if (typeof callback == 'string') {
      var data = $(selector).data('brEditable-editable');
      if (!data) {
        $(selector).data('brEditable-editable', (data = new BrEditable($(selector), callback)));
      }
      if (data) {
        data[callback](value);
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
