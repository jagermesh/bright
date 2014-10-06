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
    var editorRowData = null;
    var active = false;
    var cancelled = false;

    this.options = options || {};
    this.options.noun = this.options.noun || '';
    this.options.selectors = this.options.selectors || {};
    this.options.selectors.save = this.options.selectors.save || '.action-save';
    this.options.selectors.cancel = this.options.selectors.cancel || '.action-cancel';
    this.options.selectors.errorMessage = this.options.selectors.errorMessage || '.editor-error-message';
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

    this.rowData = function() {
      return editorRowData;
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

    this.showError = function(message) {
      alert(message);
      var ctrl = $(this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
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
      $(this.options.selectors.errorMessage, _this.container).hide();
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
                _this.showError(br.trn('%s must be filled').replace('%s', title));
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
            _this.showError(e.message);
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
                if (_this.container.hasClass('modal')) {
                  // _this.events.trigger('editor.hidden', true, response);
                  _this.container.modal('hide');
                  editorRowid = null;
                  editorRowData = null;
                } else {
                  _this.events.trigger('editor.hidden', true, response);
                  _this.events.trigger('editor.hide', true, response);
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
            } else {
              if (!_this.dataSource.events.has('error')) {
                _this.showError(response);
              }
            }
          });
        } else {
          _this.dataSource.insert(data, function(result, response) {
            if (result) {
              br.resetCloseConfirmation();
              editorRowid = response.rowid;
              editorRowData = response;
              _this.editorConfigure(false);
              _this.events.triggerAfter('editor.insert', true, response);
              _this.events.triggerAfter('editor.save', true, response);
              if (andClose) {
                if (_this.container.hasClass('modal')) {
                  // _this.events.trigger('editor.hidden', true, response);
                  _this.container.modal('hide');
                  editorRowid = null;
                  editorRowData = null;
                } else {
                  _this.events.trigger('editor.hidden', true, response);
                  _this.events.trigger('editor.hide', true, response);
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
            } else {
              if (!_this.dataSource.events.has('error')) {
                _this.showError(response);
              }
            }
          });
        }
      }
    };

    function modalShown(form) {
      var focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', form);
      if (focusedInput.length > 0) {
        try { focusedInput[0].focus(); } catch (e) { }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', form);
        if (focusedInput.length > 0) {
          try { focusedInput[0].focus(); } catch (e) { }
        }
      }
      _this.events.trigger('editor.shown');
    }

    this.hide = this.cancel = function() {
      cancelled = true;
      br.resetCloseConfirmation();
      _this.events.trigger('editor.cancel', false, editorRowid);
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      } else {
        _this.events.trigger('editor.hidden', false, editorRowid);
        _this.events.trigger('editor.hide', false, editorRowid);
        br.backToCaller(_this.options.returnUrl, false);
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
        _this.container.on('shown.bs.modal', function() { modalShown($(this)); });
        _this.container.on('hide.bs.modal', function() {
          if (cancelled) {
            cancelled = false;
          } else {
            br.resetCloseConfirmation();
            _this.events.trigger('editor.cancel', false, editorRowid);
          }
          _this.events.trigger('editor.hide', false, editorRowid);
        });
        _this.container.on('hidden.bs.modal', function() { _this.events.trigger('editor.hidden', false, editorRowid); });
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

    function fillControls(data) {
      if (data) {
        for(var i in data) {
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
            }
          });
        }
      }
      if (window.Select2) {
        _this.inputsContainer.find('select.data-field').each(function() {
          $(this).select2();
        });
      }
    }

    this.show = function(rowid, isCopy) {
      editorRowid = null;
      editorRowData = null;
      var defaultValues = null;
      if (br.isNumber(rowid)) {
        editorRowid = rowid;
      } else
      if (br.isObject(rowid)) {
        defaultValues = rowid;
      }
      _this.inputsContainer.find('input.data-field[type!=radio],select.data-field,textarea.data-field').val('');
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1');
      _this.inputsContainer.find('input.data-field[type=checkbox]').removeAttr('checked');
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      var ctrl = $(this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (editorRowid) {
        _this.dataSource.selectOne(editorRowid, function(result, data) {
          if (result) {
            editorRowData = data;
            _this.events.triggerBefore('editor.show', data, isCopy);
            _this.editorConfigure(isCopy);
            fillControls(data);
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('editor.show', data, isCopy);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            }
          } else {
            if (_this.container.hasClass('modal')) {
              _this.showError(data);
            } else {
              br.backToCaller(_this.options.returnUrl, true);
            }
          }
        }, { disableEvents: true });
      } else {
        _this.events.triggerBefore('editor.show');
        _this.editorConfigure(isCopy);
        fillControls(defaultValues);
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
