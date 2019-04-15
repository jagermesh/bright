/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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

    _this.options = options || {};
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.save = _this.options.selectors.save || '.action-save';
    _this.options.selectors.cancel = _this.options.selectors.cancel || '.action-cancel';
    _this.options.selectors.errorMessage = _this.options.selectors.errorMessage || '.editor-error-message';
    _this.container = $(selector);
    if (_this.options.inputsContainer) {
      _this.inputsContainer = $(_this.options.inputsContainer);
    } else {
      _this.inputsContainer = _this.container;
    }

    _this.dataSource = dataSource;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.pause  = function(event, callback) { _this.events.pause(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    _this.rowid = function() {
      return editorRowid;
    };

    _this.rowData = function(name) {
      return name ? (editorRowData ? editorRowData[name] : undefined) : editorRowData;
    };

    _this.isActive = function() {
      return _this.container.is(':visible');
    };

    _this.isEditMode = function() {
      return !br.isNull(editorRowid);
    };

    _this.isInsertMode = function() {
      return br.isNull(editorRowid);
    };

    _this.lock = function() {
      $(_this.options.selectors.save, _this.container).addClass('disabled');
    };

    _this.unlock = function() {
      $(_this.options.selectors.save, _this.container).removeClass('disabled');
      br.resetCloseConfirmation();
    };

    _this.showError = function(message) {
      var ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    _this.editorConfigure = function(isCopy) {
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

    function editorShown() {
      var focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', _this.container);
      if (focusedInput.length > 0) {
        try { focusedInput[0].focus(); } catch (e) { }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', _this.container);
        if (focusedInput.length > 0) {
          try { focusedInput[0].focus(); } catch (e) { }
        }
      }
      _this.events.trigger('editor.shown');
      br.resetCloseConfirmation();
    }

    var closeConfirmationTmp;

    function editorHidden(result, response) {
      _this.events.trigger('editor.hidden', result, response);
      br.resetCloseConfirmation();
      if (closeConfirmationTmp) {
        br.confirmClose();
      }
    }

    _this.init = function() {

      if (_this.container.hasClass('modal')) {
        _this.container.on('shown.bs.modal', function(event) {
          if (event.namespace === 'bs.modal') {
            editorShown();
          }
        });
        _this.container.on('hide.bs.modal', function(event) {
          if (event.namespace === 'bs.modal') {
            if (cancelled) {
              cancelled = false;
            } else {
              if (br.isCloseConfirmationRequired()) {
                br.confirm('Changes detected', br.closeConfirmationMessage, function() {
                  _this.cancel();
                });
                return false;
              }
            }
            _this.events.trigger('editor.hide', false, editorRowid);
          }
        });
        _this.container.on('hidden.bs.modal', function(event) {
          if (event.namespace === 'bs.modal') {
            editorHidden(false, editorRowid);
          }
        });
      }

      $(_this.options.selectors.cancel, _this.container).removeAttr('data-dismiss');

      $(_this.options.selectors.cancel, _this.container).click(function() {
        _this.cancel();
      });

      $(_this.options.selectors.save, _this.container).click(function() {
        var btn = $(this);
        if (!btn.hasClass('disabled') && !saving) {
          var andClose = btn.hasClass('action-close') || _this.container.hasClass('modal');
          btn.addClass('disabled');
          internalSave( andClose
                      , function() { btn.removeClass('disabled'); }
                      , function() { btn.removeClass('disabled'); }
                      );
        }
      });

      $(_this.inputsContainer).on('change', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        br.confirmClose();
      });

      $(_this.inputsContainer).on('input', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        br.confirmClose();
      });

      return _this;

    };

    _this.fillDefaults = function() {
      _this.inputsContainer.find('input.data-field[type=checkbox]').each(function() {
        if ($(this).attr('data-default-checked')) {
          $(this).prop('checked', 'checked');
        }
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for(var i in data) {
          _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
            var input = $(this);
            if (input.attr('data-toggle') == 'buttons-radio') {
              var val = br.isNull(data[i]) ? '' : data[i];
              input.find('button[value="' + val + '"]').addClass('active');
            } else
            if (input.attr('type') == 'checkbox') {
              if (br.toInt(data[i]) == 1) {
                input.prop('checked', 'checked');
              } else {
                input.removeAttr('checked');
              }
            } else
            if (input.attr('type') == 'radio') {
              if (br.toInt(data[i]) == br.toInt(input.val())) {
                input.prop('checked', 'checked');
              }
            } else {
              var ckeditorInstance = input.data('ckeditorInstance');
              if (ckeditorInstance) {
                (function(input, ckeditorInstance, data) {
                  ckeditorInstance.setData(data
                    , { noSnapshot: true
                      , callback: function(aa) {
                          if (ckeditorInstance.getData() != data) {
                            // not sure why but setData is not wroking sometimes, so need to run again :(
                            ckeditorInstance.setData(data, { noSnapshot: true });
                          }
                        }
                      });
                })(input, ckeditorInstance, data[i]);
              } else {
                var dataComboInstance = input.data('BrDataCombo');
                if (dataComboInstance) {
                  dataComboInstance.val(data[i]);
                } else {
                  input.val(data[i]);
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

    _this.show = function(rowid, isCopy) {
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
      _this.inputsContainer.find('input.data-field[type!=radio],select.data-field,textarea.data-field').each(function() {
        var dataComboInstance = $(this).data('BrDataCombo');
        if (dataComboInstance) {
          dataComboInstance.val('');
        } else {
          $(this).val('');
        }
      });
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1');
      _this.inputsContainer.find('input.data-field[type=checkbox]').removeAttr('checked');
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      var ctrl = $(_this.options.selectors.errorMessage, _this.container);
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
            } else {
              editorShown();
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
        _this.fillDefaults();
        _this.fillControls(defaultValues);
        _this.events.trigger('editor.show', defaultValues);
        br.attachDatePickers(_this.inputsContainer);
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        } else {
          editorShown();
        }
      }
      return _this.container;
    };

    _this.hide = _this.cancel = function() {
      cancelled = true;
      _this.events.trigger('editor.cancel', false, editorRowid);
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      } else {
        _this.events.trigger('editor.hide', false, editorRowid);
        editorHidden(false, editorHidden);
        br.backToCaller(_this.options.returnUrl, false);
      }
    };

    var saving = false;
    var savingAndClosing = false;

    _this.isSaving = function() {
      return saving;
    };

    _this.isSavingAndClosing = function() {
      return saving && savingAndClosing;
    };

    _this.save = function(andClose, successCallback, errorCallback, silent) {
      if (br.isFunction(andClose)) {
        errorCallback   = successCallback;
        successCallback = andClose;
        andClose        = false;
        // if function invoked with callabacks I'll consider that it msut save silently
        silent          = true;
      }
      if (!br.isFunction(successCallback)) {
        successCallback = null;
      }
      if (!br.isFunction(errorCallback)) {
        errorCallback = null;
      }
      return internalSave(andClose, successCallback, errorCallback, silent);
    };

    function saveContinue(andClose, successCallback, errorCallback, silent, data) {

      savingAndClosing = andClose;

      var op = '';
      var ok = true;
      if (editorRowid) {
        op = 'update';
      } else {
        op = 'insert';
      }
      try {
        var options = {  };
        _this.events.trigger('editor.save', op, data, options);
        if (editorRowid) {
          _this.events.triggerBefore('editor.update', data, options);
          _this.dataSource.update(editorRowid, data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.events.triggerAfter('editor.update', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    var callResponse = { refresh: true };
                    _this.events.trigger('editor.hide', true, response, callResponse);
                    editorHidden(true, response);
                    br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                  }
                } else {
                  if (!_this.options.hideSaveNotification && !silent) {
                    br.growlMessage('Changes saved', 'Success');
                  }
                }
                if (successCallback) {
                  successCallback.call(_this, response);
                }
              } else {
                _this.events.triggerAfter('editor.update', false, response);
                _this.events.triggerAfter('editor.save', false, response, op);
                if (!_this.dataSource.events.has('error')) {
                  _this.showError(response);
                }
                if (errorCallback) {
                  errorCallback.call(_this, data, response);
                }
              }
            } finally {
              saving = false;
            }
          }, options);
        } else {
          _this.events.triggerBefore('editor.insert', data, options);
          _this.dataSource.insert(data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.editorConfigure(false);
                _this.events.triggerAfter('editor.insert', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    var callResponse = { refresh: true };
                    _this.events.trigger('editor.hide', true, response, callResponse);
                    editorHidden(true, response);
                    br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                  }
                } else {
                  if (!_this.options.hideSaveNotification && !silent) {
                    br.growlMessage('Changes saved', 'Success');
                  }
                }
                if (successCallback) {
                  successCallback.call(_this, response);
                }
              } else {
                _this.events.triggerAfter('editor.insert', false, response);
                _this.events.triggerAfter('editor.save', false, response, op);
                if (!_this.dataSource.events.has('error')) {
                  _this.showError(response);
                }
                if (errorCallback) {
                  errorCallback.call(_this, data, response);
                }
              }
            } finally {
              saving = false;
            }
          }, options);
        }
      } catch (error) {
        _this.showError(error.message);
        if (errorCallback) {
          errorCallback.call(_this, data, error.message);
        }
        saving = false;
      }
    }

    function internalSave(andClose, successCallback, errorCallback, silent) {

      if (saving) {
        window.setTimeout(function() {
          internalSave(andClose, successCallback, errorCallback, silent);
        }, 100);
        return;
      } else {
        saving = true;
      }

      var data = { };
      var errors = [];
      try {
        $(_this.options.selectors.errorMessage, _this.container).hide();
        _this.events.triggerBefore('editor.save');
        _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
          var val;
          var skip = false;
          var input = $(this);
          if ((input.attr('readonly') != 'readonly') && (input.attr('disabled') != 'disabled')) {
            if (input.attr('data-toggle') == 'buttons-radio') {
              val = input.find('button.active').val();
            } else
            if (input.attr('type') == 'checkbox') {
              if (input.is(':checked')) {
                val = 1;
              } else {
                val = 0;
              }
            } else
            if (input.attr('type') == 'radio') {
              if (input.is(':checked')) {
                val = input.val();
              } else {
                skip = true;
              }
            } else {
              val = input.val();
            }
            if (!skip) {
              if (input.hasClass('required') && br.isEmpty(val) && (!input.hasClass('required-edit-only') || _this.isEditMode()) && (!input.hasClass('required-insert-only') || _this.isInsertMode())) {
                var title = input.attr('title');
                if (br.isEmpty(title)) {
                  title = input.prev('label').text();
                }
                if (errors.length === 0) {
                  this.focus();
                }
                errors.push(br.trn('%s must be filled').replace('%s', title));
                ok = false;
              } else
              if (br.isEmpty(val)) {
                data[input.attr('name')] = '';
              } else {
                data[input.attr('name')] = val;
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
          if (errorCallback) {
            errorCallback.call(_this, data, error);
          }
          saving = false;
        } else {
          var op = '';
          var ok = true;
          if (editorRowid) {
            op = 'update';
          } else {
            op = 'insert';
          }
          if (_this.events.has('editor.save', 'pause')) {
            _this.events.triggerPause( 'editor.save'
                                     , { continue: function(data) {
                                           saveContinue(andClose, successCallback, errorCallback, silent, data);
                                         }
                                       , cancel: function(error) {
                                           if (errorCallback) {
                                             errorCallback.call(_this, data, error);
                                           }
                                           saving = false;
                                         }
                                       }
                                     , op
                                     , data
                                     );
          } else {
            saveContinue(andClose, successCallback, errorCallback, silent, data);
          }
        }
      } catch (e) {
        if (errorCallback) {
          errorCallback.call(_this, data, e.message);
        }
        saving = false;
        throw e;
      }
    }

    return _this.init();

  }

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };

})(jQuery, window);
