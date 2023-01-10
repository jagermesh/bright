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

  function BrDataEditor(selector, dataSource, options) {
    const _this = this;

    let editorRowid = null;
    let editorRowData = null;
    let cancelled = false;
    let closeConfirmationTmp;
    let saving = false;
    let savingAndClosing = false;
    let workMode = false;

    _this.options = options || {};
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.save = _this.options.selectors.save || '.action-save';
    _this.options.selectors.cancel = _this.options.selectors.cancel || '.action-cancel';
    _this.options.selectors.errorMessage = _this.options.selectors.errorMessage || '.editor-error-message';

    if (_this.options.inputsContainer) {
      _this.inputsContainer = $(_this.options.inputsContainer);
    } else {
      _this.inputsContainer = $(selector);
    }

    _this.dataSource = dataSource;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.pause = function(event, callback) {
      _this.events.pause(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    _this.getContainer = function() {
      return $(selector);
    };

    _this.container = _this.getContainer();

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
      $('.action-save-related', _this.container).addClass('disabled');
    };

    _this.unlock = function() {
      $(_this.options.selectors.save, _this.container).removeClass('disabled');
      $('.action-save-related', _this.container).removeClass('disabled');
      br.resetCloseConfirmation();
    };

    _this.showError = function(message) {
      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    _this.updateEditorTitle = function() {
      let title = '';
      if (_this.options.title) {
        title = _this.options.title;
      } else
      if (editorRowid) {
        switch (workMode) {
          case 'copy':
            title = `Copy ${_this.options.noun}`;
            break;
          case 'view':
            title = `View ${_this.options.noun}`;
            if (!_this.options.hideRowid) {
              title += ` (#${editorRowid})`;
            }
            break;
          default:
            title = `Edit ${_this.options.noun}`;
            if (!_this.options.hideRowid) {
              title += ` (#${editorRowid})`;
            }
            break;
        }
      } else {
        title = `Create ${_this.options.noun}`;
      }
      let rowName = _this.container.find('input.data-field[name="name"]').val();
      if (rowName) {
        title += ` ${rowName}`;
      }
      _this.container.find('.operation').text(title);
    };

    function editorShown() {
      let focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', _this.container);
      if (focusedInput.length > 0) {
        try {
          focusedInput[0].focus();
        } catch (e) {
          //
        }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', _this.container);
        if (focusedInput.length > 0) {
          try {
            focusedInput[0].focus();
          } catch (e) {
            //
          }
        }
      }
      if ($.fn.bootstrapDatepicker) {
        try {
          $('input.bootstrap-datepicker', _this.container).each(function() {
            $(this).bootstrapDatepicker('update');
          });
        } catch (error) {
          br.logError(error);
        }
      }
      _this.events.trigger('editor.shown');
      br.resetCloseConfirmation();
    }

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
          if ($(event.target).is(_this.container)) {
            editorShown();
          }
        });
        _this.container.on('hide.bs.modal', function(event) {
          if ($(event.target).is(_this.container)) {
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
          if ($(event.target).is(_this.container)) {
            editorHidden(false, editorRowid);
          }
        });
      }

      $(_this.options.selectors.cancel, _this.container).removeAttr('data-dismiss');

      $(_this.options.selectors.cancel, _this.container).click(function() {
        _this.cancel();
      });

      $(_this.options.selectors.save, _this.container).click(function() {
        let btn = $(this);
        if (!btn.hasClass('disabled') && !saving) {
          let andClose = btn.hasClass('action-close') || _this.container.hasClass('modal');
          btn.addClass('disabled');
          internalSave(andClose, function() {
            btn.removeClass('disabled');
          }, function() {
            btn.removeClass('disabled');
          });
        }
      });

      const updateEditorTitle = function(el) {
        if (el.attr('name') == 'name') {
          _this.updateEditorTitle();
        }
        br.confirmClose();
      };

      _this.inputsContainer.on('change', 'select.data-field,input.data-field,textarea.data-field', function() {
        updateEditorTitle($(this));
      });

      _this.inputsContainer.on('input', 'select.data-field,input.data-field,textarea.data-field', function() {
        updateEditorTitle($(this));
      });

      return _this;
    };

    _this.fillDefaults = function() {
      _this.inputsContainer.find('input.data-field[type="checkbox"]').each(function() {
        $(this).prop('checked', !!$(this).attr('data-default-checked'));
      });
      _this.inputsContainer.find('input.data-field,select.data-field').each(function() {
        const this_ = $(this);
        if (this_.attr('data-default') && (!this_.val() || ((this_.attr('type') == 'color') && (this_.val() == '#000000')))) {
          br.setValue(this_, this_.attr('data-default'));
        }
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for (let name in data) {
          _this.inputsContainer.find(`div.data-field[data-toggle="buttons-radio"][name="${name}"],input.data-field[name="${name}"],select.data-field[name="${name}"],textarea.data-field[name="${name}"]`).each(function() {
            let input = $(this);
            if (input.attr('data-toggle') == 'buttons-radio') {
              let val = br.isNull(data[name]) ? '' : data[name];
              input.find(`button[value="${val}"]`).addClass('active');
            } else
            if (input.attr('type') == 'checkbox') {
              input.prop('checked', br.toInt(data[name]) == 1);
            } else
            if (input.attr('type') == 'radio') {
              input.prop('checked', br.toInt(data[name]) == br.toInt(input.val()));
            } else {
              let ckeditorInstance = input.data('ckeditorInstance');
              if (ckeditorInstance) {
                (function(ckeditorInstance0, data0) {
                  ckeditorInstance0.setData(data0, {
                    noSnapshot: true,
                    callback: function() {
                      if (ckeditorInstance0.getData() != data0) {
                        // not sure why but setData is not working sometimes, so need to run again :(
                        ckeditorInstance0.setData(data0, {
                          noSnapshot: true
                        });
                      }
                    }
                  });
                })(ckeditorInstance, data[name]);
              } else {
                br.setValue(input, data[name]);
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

    _this.show = function(rowid, params) {
      let editorParams = Object.assign({
        mode: br.isNumber(rowid) ? 'edit' : 'insert',
        defaults: null,
        params: {}
      }, params);
      workMode = editorParams.mode;
      closeConfirmationTmp = br.isCloseConfirmationRequired();
      editorRowid = br.isNumber(rowid) ? rowid : null;
      editorRowData = br.isObject(rowid) ? rowid : null;
      _this.inputsContainer.find('select.data-field').each(function() {
        br.setValue($(this), '');
      });
      _this.inputsContainer.find('input.data-field:not([type="radio"]):not([type="checkbox"]),textarea.data-field').val('');
      _this.inputsContainer.find('input.data-field[type="checkbox"]').prop('checked', false);
      _this.inputsContainer.find('div.data-field[data-toggle="buttons-radio"]').find('button').removeClass('active');

      _this.inputsContainer.find('textarea.data-field').each(function() {
        let ckeditorInstance = $(this).data('ckeditorInstance');
        let onChangeHandled = $(this).data('onChangeHandled');
        if (ckeditorInstance && !onChangeHandled) {
          $(this).data('onChangeHandled', true);
          ckeditorInstance.on('change', function(e) {
            if (e.editor.checkDirty()) {
              br.confirmClose();
            }
          });
        }
      });

      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (workMode == 'view') {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          $(this).attr('wasAvailable', !$(this).prop('disabled'));
          $(this).prop('readonly', true);
          $(this).prop('disabled', true);
          let ckeditorInstance = $(this).data('ckeditorInstance');
          if (ckeditorInstance) {
            ckeditorInstance.setReadOnly(true);
          }
        });
        $(_this.options.selectors.save, _this.container).hide();
        $('.action-save-related', _this.container).hide();
      } else {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          if ($(this).attr('wasAvailable')) {
            $(this).prop('readonly', false);
            $(this).prop('disabled', false);
            let ckeditorInstance = $(this).data('ckeditorInstance');
            if (ckeditorInstance) {
              ckeditorInstance.setReadOnly(false);
            }
          }
        });
        $(_this.options.selectors.save, _this.container).show();
        $('.action-save-related', _this.container).show();
      }

      if (editorRowid) {
        let dataSourceRequest = {
          rowid: editorRowid
        };
        let dataSourceOptions = {
          disableEvents: true
        };
        _this.events.triggerBefore('editor.loadData', dataSourceRequest, dataSourceOptions);
        _this.dataSource.selectOne(dataSourceRequest, function(result, response) {
          if (result) {
            editorRowData = response;
            _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
            _this.fillControls(editorRowData);
            if (workMode == 'copy') {
              editorRowid = null;
            }
            _this.updateEditorTitle();
            _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
            br.attachDatePickers(_this.inputsContainer);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            } else {
              editorShown();
            }
          } else {
            if (_this.container.hasClass('modal')) {
              _this.showError(editorRowData);
            } else {
              br.backToCaller(_this.options.returnUrl, true);
            }
          }
        }, dataSourceOptions);
      } else {
        _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
        _this.fillDefaults();
        _this.fillControls(editorParams.defaults);
        _this.updateEditorTitle();
        _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
        br.attachDatePickers(_this.inputsContainer);
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        } else {
          editorShown();
        }
      }
      return _this.container;
    };

    _this.cancel = function() {
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

    _this.hide = _this.cancel;

    _this.isSaving = function() {
      return saving;
    };

    _this.isSavingAndClosing = function() {
      return saving && savingAndClosing;
    };

    _this.saveIfInsert = function(successCallback, errorCallback) {
      if (_this.isInsertMode()) {
        _this.save(false, successCallback, errorCallback);
      } else
      if (br.isFunction(successCallback)) {
        successCallback();
      }
    };

    _this.save = function(andClose, successCallback, errorCallback, silent) {
      if (br.isFunction(andClose)) {
        errorCallback = successCallback;
        successCallback = andClose;
        andClose = false;
        // if function invoked with callbacks I'll consider that it must save silently
        silent = true;
      }
      if (workMode == 'view') {
        if (br.isFunction(successCallback)) {
          successCallback();
        }
      } else {
        if (!br.isFunction(successCallback)) {
          successCallback = null;
        }
        if (!br.isFunction(errorCallback)) {
          errorCallback = null;
        }
        return internalSave(andClose, successCallback, errorCallback, silent);
      }
    };

    function saveContinue(andClose, successCallback, errorCallback, silent, data) {
      savingAndClosing = andClose;

      let operation = editorRowid ? 'update' : 'insert';

      try {
        let saveOptions = {};
        _this.events.trigger('editor.save', operation, data, saveOptions);
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
                    let callResponse = {
                      refresh: true
                    };
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
                _this.events.triggerAfter('editor.save', false, response, operation);
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
          }, saveOptions);
        } else {
          _this.events.triggerBefore('editor.insert', data, saveOptions);
          _this.dataSource.insert(data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.updateEditorTitle();
                _this.events.triggerAfter('editor.insert', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    let callResponse = {
                      refresh: true
                    };
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
                _this.events.triggerAfter('editor.save', false, response, operation);
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
          }, saveOptions);
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

      let data = {};
      let errors = [];
      try {
        $(_this.options.selectors.errorMessage, _this.container).hide();
        _this.events.triggerBefore('editor.save');
        _this.inputsContainer.find('div.data-field[data-toggle="buttons-radio"],input.data-field,select.data-field,textarea.data-field').each(function() {
          let val;
          let skip = false;
          let input = $(this);
          let fieldName = input.attr('name');
          let fieldNameMatch = /^(.+?)(\[(.*?)\])$/.exec(fieldName);
          let fieldIsArray = !!fieldNameMatch;
          if ((input.attr('readonly') != 'readonly') && (input.attr('disabled') != 'disabled')) {
            if (input.attr('data-toggle') == 'buttons-radio') {
              val = input.find('button.active').val();
            } else
            if (input.attr('type') == 'checkbox') {
              if (input.is(':checked')) {
                if (input[0].hasAttribute('value')) {
                  val = input.val();
                } else {
                  val = 1;
                }
              } else
              if (!fieldIsArray) {
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
              if (
                input.hasClass('required') &&
                br.isEmpty(val) &&
                (
                  !input.hasClass('required-edit-only') ||
                  _this.isEditMode()
                ) &&
                (
                  !input.hasClass('required-insert-only') ||
                  _this.isInsertMode()
                )
              ) {
                let title = input.attr('title');
                if (br.isEmpty(title)) {
                  title = input.prev('label').text();
                }
                if (errors.length === 0) {
                  this.focus();
                }
                errors.push(br.trn('%s must be filled').replace('%s', title));
              } else {
                if (fieldIsArray) {
                  if (fieldNameMatch[3]) {
                    data[fieldNameMatch[1]] = data[fieldNameMatch[1]] ? data[fieldNameMatch[1]] : {};
                    data[fieldNameMatch[1]][fieldNameMatch[3]] = val;
                  } else
                  if (!br.isEmpty(val)) {
                    data[fieldNameMatch[1]] = data[fieldNameMatch[1]] ? data[fieldNameMatch[1]] : [];
                    data[fieldNameMatch[1]].push(val);
                  }
                } else {
                  data[fieldName] = br.isEmpty(val) ? '' : val;
                }
              }
            }
          }
        });

        if (errors.length > 0) {
          let tmpl = (
            errors.length == 1 ?
              '{{#errors}}{{.}}{{/errors}}' :
              br.trn('Please check the following:') + '<br /><ul>{{#errors}}<li>{{.}}</li>{{/errors}}</ul>'
          );
          let error = br.fetch(tmpl, {
            errors: errors
          });
          _this.showError(error);
          if (errorCallback) {
            errorCallback.call(_this, data, error);
          }
          saving = false;
        } else {
          let operation = editorRowid ? 'update' : 'insert';
          if (_this.events.has('editor.save', 'pause')) {
            _this.events.triggerPause('editor.save', {
              continue: function(data0) {
                saveContinue(andClose, successCallback, errorCallback, silent, data0);
              },
              cancel: function(error) {
                if (errorCallback) {
                  errorCallback.call(_this, data, error);
                }
                saving = false;
              }
            },
            operation,
            data
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

  window.br.dataEditor = function(selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };
})(jQuery, window);