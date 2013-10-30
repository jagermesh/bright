//
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
//

(function ($, window) {

  function BrDataEditor(selector, dataSource, options) {

    var _this = this;
    var editorRowid = null;
    var active = false;
    var goodHide = false;

    this.options = options || {};
    this.options.noun = this.options.noun || '';
    this.container = $(selector);
    if (this.options.inputsContainer) {
      this.inputsContainer = $(this.options.inputsContainer);
    } else {
      this.inputsContainer = this.container;
    }

    this.dataSource = dataSource;
    this.dataSource.on('error', function(o, e) {
      br.growlError(e);
    });

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.getEditorRowid = function() {
      return editorRowid;
    }
    this.isActive = function() {
      return _this.container.is(':visible');
    }
    this.isEditMode = function() {
      return !br.isNull(editorRowid);
    }
    this.isInsertMode = function() {
      return br.isNull(editorRowid);
    }
    this.lockEditor = function() {
      $('.action-save', _this.container).addClass('disabled');
    }
    this.unLockEditor = function() {
      $('.action-save', _this.container).removeClass('disabled');
    }
    this.hide = function() {
      goodHide = true;
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      }
    }
    this.editorConfigure = function(isCopy) {
      if (editorRowid) {
        if (isCopy) {
          _this.container.find('.operation').text('Copy ' + _this.options.noun);
        } else {
          _this.container.find('.operation').text('Edit ' + _this.options.noun);
        }
      } else {
        _this.container.find('.operation').text('Create ' + _this.options.noun);
      }
    }
    this.editorSave = function(andClose, callback) {
      if (br.isFunction(andClose)) {
        callback = andClose;
        andClose = false;
      }
      var data = { };
      var ok = true;
      _this.events.triggerBefore('editor.save');
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
        if (ok) {
          var val;
          if ($(this).attr('data-toggle') == 'buttons-radio') {
            val = $(this).find('button.active').val();
          } else
          if ($(this).attr('type') == 'checkbox') {
            if ($(this).is(':checked')) {
              val = 1;
            } else {
              val = 0;
            }
          } else {
            val = $(this).val();
          }
          if ($(this).hasClass('required') && br.isEmpty(val)) {
            var title = $(this).attr('title');
            if (br.isEmpty(title)) {
              title = $(this).prev('label').text();
            }
            br.growlError(title + ' must be filled');
            this.focus();
            ok = false;
          } else
          if (br.isEmpty(val)) {
            data[$(this).attr('name')] = '';
          } else {
            data[$(this).attr('name')] = val;
          }
        }
      });
      if (ok) {
        if (editorRowid) {
          _this.events.trigger('editor.save', 'update', data);
          _this.dataSource.update(editorRowid, data, function(result, response) {
            if (result) {
              if (andClose) {
                goodHide = true;
                if (_this.container.hasClass('modal')) {
                  _this.container.modal('hide');
                }
                _this.events.trigger('hideEditor', true, response);
                _this.events.trigger('editor.hide', true, response);
                if (!_this.container.hasClass('modal')) {
                  br.backToCaller(_this.options.returnUrl, true);
                }
              } else {
                br.growlMessage('Changes saved', 'Success');
                _this.events.trigger('editor.save', true, response);
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        } else {
          _this.events.trigger('editor.save', 'insert', data);
          _this.dataSource.insert(data, function(result, response) {
            if (result) {
              if (andClose) {
                goodHide = true;
                if (_this.container.hasClass('modal')) {
                  _this.container.modal('hide');
                }
                _this.events.trigger('hideEditor', true, response);
                _this.events.trigger('editor.hide', true, response);
                if (!_this.container.hasClass('modal')) {
                  br.backToCaller(_this.options.returnUrl, true);
                }
              } else {
                br.growlMessage('Changes saved', 'Success');
                _this.events.trigger('editor.save', true, response);
                editorRowid = response.rowid;
                _this.editorConfigure(false);
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        }
      }
    }
    this.init = function() {

      if ($.datepicker) {
        $('.datepicker').each(function() {
          $(this).datepicker({ dateFormat: $(this).attr('data-format') });
        });
      }

      _this.container.on('shown', function() {
        var focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', $(this));
        if (focusedInput.length > 0) {
          try { focusedInput[0].focus(); } catch (e) { }
        } else {
          focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', $(this));
          if (focusedInput.length > 0) {
            try { focusedInput[0].focus(); } catch (e) { }
          }
        }
        _this.events.trigger('editor.shown');
      });

      _this.container.on('hide', function() {
        if (goodHide) {

        } else {
          _this.events.trigger('editor.hide', false, editorRowid);
        }
      });

      _this.container.on('hidden', function() {
        if (goodHide) {

        } else {
         _this.events.trigger('editor.hidden', false, editorRowid);
        }
      });

      $('.action-cancel', _this.container).removeAttr('data-dismiss');
      $('.action-cancel', _this.container).click(function() {
        goodHide = true;
        if (_this.container.hasClass('modal')) {
          _this.container.modal('hide');
        }
        _this.events.trigger('hideEditor', false);
        _this.events.trigger('editor.hide', false, editorRowid);
        if (!_this.container.hasClass('modal')) {
          br.backToCaller(_this.options.returnUrl, false);
        }
      });

      $('.action-save', _this.container).click(function() {
        if (!$(this).hasClass('disabled')) {
          _this.editorSave($(this).hasClass('action-close'));
        }
      });

      return this;
    }
    this.showEditor = function(rowid, isCopy) {
      return this.show(rowid, isCopy);
    }
    this.show = function(rowid, isCopy) {
      editorRowid = rowid;
      _this.editorConfigure(isCopy);
      _this.container.find('input.data-field,select.data-field,textarea.data-field').val('');
      _this.container.find('input.data-field[type=checkbox]').val('1');
      _this.container.find('input.data-field[type=checkbox]').removeAttr('checked');

      _this.container.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      if (editorRowid) {
        _this.dataSource.selectOne(editorRowid, function(result, data) {
          if (result) {
            for(var i in data) {
              _this.container.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
                if ($(this).attr('data-toggle') == 'buttons-radio') {
                  $(this).find('button[value=' + data[i] + ']').addClass('active');
                } else
                if ($(this).attr('type') == 'checkbox') {
                  if (data[i] == '1') {
                    $(this).attr('checked', 'checked');
                  }
                } else {
                  $(this).val(data[i]);
                  if ($(this)[0].tagName == 'SELECT') {
                    if (window.Select2) {
                      $(this).select2();
                    }
                  }
                }
              });
            }
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('showEditor', data, isCopy);
            _this.events.trigger('editor.show', data, isCopy);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            }
          }
        }, { disableEvents: true });
      } else {
        _this.container.find('select.data-field').each(function() {
          if (window.Select2) {
            $(this).select2();
          }
        });
        _this.events.trigger('showEditor');
        _this.events.trigger('editor.show');
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        }
      }
      return _this.container;
    }

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  }

})(jQuery, window);
