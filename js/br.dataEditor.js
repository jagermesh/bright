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
      var ctrl = $(this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    this.editorConfigure = function(isCopy) {
      var s = '';
      if (_this.options.title) {
        s = _this.options.title;
      } else
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

    var closeConfirmationTmp;

    this.init = function() {

      if (_this.container.hasClass('modal')) {
        _this.container.attr('data-backdrop', 'static');
        _this.container.on('shown.bs.modal', function() { modalShown($(this)); });
        _this.container.on('hide.bs.modal', function() {
          if (cancelled) {
            cancelled = false;
          } else {
            if (!closeConfirmationTmp) {
              br.resetCloseConfirmation();
            }
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

      $(_this.inputsContainer).on('click', 'div.data-field[data-toggle=buttons-radio],input.data-field[type=checkbox],input.data-field[type=radio]', function() {
        br.confirmClose();
      });

      $(_this.inputsContainer).on('change', 'select.data-field', function() {
        br.confirmClose();
      });

      $(_this.inputsContainer).on('keypress', 'input.data-field,textarea.data-field', function() {
        br.confirmClose();
      });

      return this;

    };

    _this.fillControls = function(data) {
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
              var ckeditorInstance = $(this).data('ckeditorInstance');
              if (ckeditorInstance) {
                ckeditorInstance.setData(data[i], {noSnapshot: true});
              } else {
                var dataComboInstance = $(this).data('BrDataCombo');
                if (dataComboInstance) {
                  dataComboInstance.val(data[i]);
                } else {
                  $(this).val(data[i]);
                }
              }
            }
          });
        }
      }
      if (window.Select2) {
        _this.inputsContainer.find('select.data-field').each(function() {
          $(this).select2();
        });
      }
    };

    this.show = function(rowid, isCopy) {
      closeConfirmationTmp = br.isCloseConfirmationRequired();
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
        var request = { rowid: editorRowid };
        var options = { disableEvents: true };
        _this.events.triggerBefore('editor.loadData', request, options);
        _this.dataSource.selectOne(request, function(result, data) {
          if (result) {
            editorRowData = data;
            _this.events.triggerBefore('editor.show', data, isCopy);
            _this.editorConfigure(isCopy);
            _this.fillControls(data);
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('editor.show', data, isCopy);
            br.attachDatePickers(_this.inputsContainer);
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
        }, options);
      } else {
        _this.events.triggerBefore('editor.show');
        _this.editorConfigure(isCopy);

        _this.inputsContainer.find('input.data-field[type=checkbox]').each(function() {
          if ($(this).attr('data-default-checked')) {
            $(this).attr('checked', 'checked');
          }
        });

        _this.fillControls(defaultValues);
        _this.events.trigger('editor.show', defaultValues);
        br.attachDatePickers(_this.inputsContainer);
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        }
      }
      return _this.container;
    };

    this.hide = this.cancel = function() {
      cancelled = true;
      if (!closeConfirmationTmp) {
        br.resetCloseConfirmation();
      }
      _this.events.trigger('editor.cancel', false, editorRowid);
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      } else {
        _this.events.trigger('editor.hidden', false, editorRowid);
        _this.events.trigger('editor.hide', false, editorRowid);
        br.backToCaller(_this.options.returnUrl, false);
      }
    };

    var saving = false;

    this.save = function(andClose, callback, silent) {
      if (saving) {
        window.setTimeout(function() {
          _this.save(andClose, callback, silent);
        }, 100);
        return;
      } else {
        saving = true;
      }
      try {
        if (br.isFunction(andClose)) {
          callback = andClose;
          silent = callback;
          andClose = false;
        }
        var data = { };
        var errors = [];
        $(this.options.selectors.errorMessage, _this.container).hide();
        _this.events.triggerBefore('editor.save');
        _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
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
              }
            } else {
              val = $(this).val();
            }
            if (!skip) {
              if ($(this).hasClass('required') && br.isEmpty(val) && (!$(this).hasClass('required-edit-only') || _this.isEditMode()) && (!$(this).hasClass('required-insert-only') || _this.isInsertMode())) {
                var title = $(this).attr('title');
                if (br.isEmpty(title)) {
                  title = $(this).prev('label').text();
                }
                if (errors.length === 0) {
                  this.focus();
                }
                errors.push(br.trn('%s must be filled').replace('%s', title));
                ok = false;
              } else
              if (br.isEmpty(val)) {
                data[$(this).attr('name')] = '';
              } else {
                data[$(this).attr('name')] = val;
              }
            }
          }
        });
        if (errors.length > 0) {
          var tmpl;
          if (errors.length == 1) {
            tmpl = '{{#errors}}{{.}}{{/errors}}';
          } else {
            tmpl = br.trn('Please check the following:') + '<br /><ul>{{#errors}}<li>{{.}}</li>{{/errors}}</ul>';
          }
          var error = br.fetch(tmpl, { errors: errors });
          _this.showError(error);
          saving = false;
        } else {
          var op = '';
          var ok = true;
          if (editorRowid) {
            op = 'update';
          } else {
            op = 'insert';
          }
          try {
            _this.events.trigger('editor.save', op, data);
            if (editorRowid) {
              _this.events.triggerBefore('editor.update', data);
              _this.dataSource.update(editorRowid, data, function(result, response) {
                try {
                  if (result) {
                    if (!closeConfirmationTmp) {
                      br.resetCloseConfirmation();
                    }
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
                        var callResponse = { refresh: true };
                        _this.events.trigger('editor.hide', true, response, callResponse);
                        br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                      }
                    } else {
                      if (!_this.options.hideSaveNotification && !silent) {
                        br.growlMessage('Changes saved', 'Success');
                      }
                    }
                    if (callback) {
                      callback.call(this, response);
                    }
                  } else {
                    if (!_this.dataSource.events.has('error')) {
                      _this.showError(response);
                    }
                  }
                } finally {
                  saving = false;
                }
              });
            } else {
              _this.events.triggerBefore('editor.insert', data);
              _this.dataSource.insert(data, function(result, response) {
                try {
                  if (result) {
                    if (!closeConfirmationTmp) {
                      br.resetCloseConfirmation();
                    }
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
                        var callResponse = { refresh: true };
                        _this.events.trigger('editor.hide', true, response, callResponse);
                        br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                      }
                    } else {
                      if (!_this.options.hideSaveNotification && !silent) {
                        br.growlMessage('Changes saved', 'Success');
                      }
                    }
                    if (callback) {
                      callback.call(this, response);
                    }
                  } else {
                    if (!_this.dataSource.events.has('error')) {
                      _this.showError(response);
                    }
                  }
                } finally {
                  saving = false;
                }
              });
            }
          } catch (e) {
            saving = false;
            _this.showError(e.message);
          }
        }
      } catch (e) {
        saving = false;
        throw e;
      }
    };

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };

})(jQuery, window);
