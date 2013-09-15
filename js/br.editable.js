//
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
//

(function ($, window) {

  function BrEditable(ctrl, saveCallback) {

    var _this = this;
    _this.ctrl = $(ctrl);
    _this.saveCallback = saveCallback;
    _this.editor = null;
    _this.tooltip = null;
    _this.click = function(element, e) {
      if (!_this.activated()) {
        var content = _this.ctrl.text();
        _this.ctrl.data('original-content', content);
        var width = _this.ctrl.innerWidth();
        var height = _this.ctrl.innerHeight();
        _this.ctrl.text('');
        _this.editor = $('<input type="text" />');
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
        _this.editor.val(content);
        _this.ctrl.append(_this.editor);
        _this.ctrl.css('width', width - 10);
        _this.editor.focus();
        _this.editor.attr('data-original-title', 'Press [Enter] to save changes, [Esc] to cancel changes.');
        _this.editor.tooltip({placement: 'bottom', trigger: 'focus'});
        _this.editor.tooltip('show');
        _this.tooltip = _this.editor.data('tooltip');
        $(_this.editor).keyup(function(e) {
          if (e.keyCode == 13) {
            var content = $(this).val();
            if (typeof _this.saveCallback == 'function') {
              _this.editor.tooltip('hide');
              _this.saveCallback.call(_this.ctrl, content);
            } else {
              _this.apply(content);
            }
          }
          if (e.keyCode == 27) {
            _this.cancel();
          }
        });
      }
    }
    _this.activated = function() {
      return _this.editor !== null;
    }
    _this.apply = function(content) {
      _this.tooltip.hide();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.text(content);
    }
    _this.cancel = function() {
      _this.tooltip.hide();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.text(_this.ctrl.data('original-content'));
    }

  }

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      var data = $(selector).data('editable');
      if (data) {
        data[callback](value);
      }
    } else {
      $(selector).live('click', function(e) {
        var $this = $(this)
          , data = $this.data('editable');
        if (!data) {
          $this.data('editable', (data = new BrEditable(this, callback)));
        }
        data.click(e);
      });
    }
  }

})(jQuery, window);
