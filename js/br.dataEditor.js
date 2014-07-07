/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataEditor(selector, dataSource, options) {

    var _this = this;
    var editorRowid = null;
    var active = false;
    var goodHide = false;

    this.options = options || {};
    this.options.noun = this.options.noun || '';
    this.options.selectors = this.options.selectors || {};
    this.options.selectors.save = this.options.selectors.save || '.action-save';
    this.options.selectors.cancel = this.options.selectors.cancel || '.action-cancel';
    this.container = $(selector);
    if (this.options.inputsContainer) {
      this.inputsContainer = $(this.options.inputsContainer);
    } else {
      this.inputsContainer = this.container;
    }

    this.dataSource = dataSource;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.rowid = function() {
      return editorRowid;
    };

    this.isActive = function() {
      return _this.container.is(':visible');
    };

    this.isEditMode = function() {
      return !br.isNull(editorRowid);
    };

    this.isInsertMode = function() {
      return br.isNull(editorRowid);
    };

    this.lock = function() {
      $(this.options.selectors.save, _this.container).addClass('disabled');
    };

    this.unlock = function() {
      $(this.options.selectors.save, _this.container).removeClass('disabled');
    };

    this.hide = function() {
      goodHide = true;
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      }
    };

    this.editorConfigure = function(isCopy) {
      var s = '';
      if (editorRowid) {
        if (isCopy) {
          s = 'Copy ' + _this.options.noun;
        } else {
          s = 'Edit ' + _this.options.noun;
          if (!_this.options.hideRowid) {
            s = s + ' (#' + editorRowid + ')';
          }
        }
      } else {
        s = 'Create ' + _this.options.noun;
      }
      _this.container.find('.operation').text(s);
    };

    this.save = function(andClose, callback) {
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
          var skip = false;
          if (($(this).attr('readonly') != 'readonly') && ($(this).attr('disabled') != 'disabled')) {
            if ($(this).attr('data-toggle') == 'buttons-radio') {
              val = $(this).find('button.active').val();
            } else
            if ($(this).attr('type') == 'checkbox') {
              if ($(this).is(':checked')) {
                val = 1;
              } else {
                val = 0;
              }
            } else
            if ($(this).attr('type') == 'radio') {
              if ($(this).is(':checked')) {
                val = $(this).val();
              } else {
                skip = true;
                // val = 0;
              }
            } else {
              val = $(this).val();
            }
            if (!skip) {
              if ($(this).hasClass('required') && br.isEmpty(val) && (!$(this).hasClass('required-edit-only') || _this.isEditMode())) {
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
          }
        }
      });
      if (ok) {
        var op = '';
        if (editorRowid) { op = 'update'; } else { op = 'insert'; }
          try {
            _this.events.trigger('editor.save', op, data);
          } catch (e) {
            br.growlError(e.message);
            ok = false;
          }
      }
      if (ok) {
        if (editorRowid) {
          _this.dataSource.update(editorRowid, data, function(result, response) {
            if (result) {
              br.resetCloseConfirmation();
              _this.events.triggerAfter('editor.update', true, response);
              _this.events.triggerAfter('editor.save', true, response);
              if (andClose) {
                goodHide = true;
                if (_this.container.hasClass('modal')) {
                  _this.container.modal('hide');
                }
                _this.events.trigger('editor.hide', true, response);
                if (!_this.container.hasClass('modal')) {
                  br.backToCaller(_this.options.returnUrl, true);
                }
              } else {
                if (!_this.options.hideSaveNotification) {
                  br.growlMessage('Changes saved', 'Success');
                }
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        } else {
          _this.dataSource.insert(data, function(result, response) {
            if (result) {
              br.resetCloseConfirmation();
              editorRowid = response.rowid;
              _this.editorConfigure(false);
              _this.events.triggerAfter('editor.insert', true, response);
              _this.events.triggerAfter('editor.save', true, response);
              if (andClose) {
                goodHide = true;
                if (_this.container.hasClass('modal')) {
                  _this.container.modal('hide');
                }
                _this.events.trigger('editor.hide', true, response);
                if (!_this.container.hasClass('modal')) {
                  br.backToCaller(_this.options.returnUrl, true);
                }
              } else {
                if (!_this.options.hideSaveNotification) {
                  br.growlMessage('Changes saved', 'Success');
                }
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        }
      }
    };

    this.init = function() {

      if ($.datepicker) {
        $('input.datepicker').each(function() {
          if ($(this).attr('data-format')) {
            $(this).datepicker({ dateFormat: $(this).attr('data-format') });
          } else {
            $(this).datepicker({ });
          }
        });
      }

      if (_this.container.hasClass('modal')) {
        _this.container.attr('data-backdrop', 'static');
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
      }

      $(this.options.selectors.cancel, _this.container).removeAttr('data-dismiss');

      $(this.options.selectors.cancel, _this.container).click(function() {
        _this.cancel();
      });

      $(this.options.selectors.save, _this.container).click(function() {
        if (!$(this).hasClass('disabled')) {
          _this.save($(this).hasClass('action-close') || _this.container.hasClass('modal'));
        }
      });

      $('div.data-field[data-toggle=buttons-radio],input.data-field[type=checkbox],input.data-field[type=radio]', _this.inputsContainer).on('click', function() {
        br.confirmClose();
      });

      $('select.data-field', _this.inputsContainer).on('change', function() {
        br.confirmClose();
      });

      $('input.data-field,textarea.data-field', _this.inputsContainer).on('keypress', function() {
        br.confirmClose();
      });

      return this;
    };

    this.cancel = function() {
      goodHide = true;
      if (_this.container.hasClass('modal')) {
        br.resetCloseConfirmation();
        _this.container.modal('hide');
      }
      _this.events.trigger('editor.hide', false, editorRowid);
      if (!_this.container.hasClass('modal')) {
        br.backToCaller(_this.options.returnUrl, false);
      }
    };

    this.show = function(rowid, isCopy) {
      editorRowid = rowid;
      _this.inputsContainer.find('input.data-field[type!=radio],select.data-field,textarea.data-field').val('');
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1');
      _this.inputsContainer.find('input.data-field[type=checkbox]').removeAttr('checked');
      _this.container.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      if (editorRowid) {
        _this.dataSource.selectOne(editorRowid, function(result, data) {
          if (result) {
            _this.events.triggerBefore('editor.show', data, isCopy);
            _this.editorConfigure(isCopy);
            for(var i in data) {
              /* jshint ignore:start */
              _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
                if ($(this).attr('data-toggle') == 'buttons-radio') {
                  var val = br.isNull(data[i]) ? '' : data[i];
                  $(this).find('button[value="' + val + '"]').addClass('active');
                } else
                if ($(this).attr('type') == 'checkbox') {
                  if (br.toInt(data[i]) == 1) {
                    $(this).attr('checked', 'checked');
                  } else {
                    $(this).removeAttr('checked');
                  }
                } else
                if ($(this).attr('type') == 'radio') {
                  if (br.toInt(data[i]) == br.toInt($(this).val())) {
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
              /* jshint ignore:end */
            }
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('editor.show', data, isCopy);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            }
          } else {
            if (!_this.container.hasClass('modal')) {
              br.backToCaller(_this.options.returnUrl, true);
            } else {
              br.growlError(data);
            }
          }
        }, { disableEvents: true });
      } else {
        _this.events.triggerBefore('editor.show');
        _this.editorConfigure(isCopy);
        _this.inputsContainer.find('select.data-field').each(function() {
          if (window.Select2) {
            $(this).select2();
          }
        });
        _this.events.trigger('editor.show');
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        }
      }
      return _this.container;
    };

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };

})(jQuery, window);
