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

    this.options = options || {};
    this.options.noun = this.options.noun || '';

    var $editForm = $(selector);

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
      return $editForm.is(':visible');
    }
    this.isEditMode = function() {
      return !br.isNull(editorRowid);
    }
    this.isInsertMode = function() {
      return br.isNull(editorRowid);
    }
    this.lockEditor = function() {
      $('.action-save', $editForm).addClass('disabled');
    }
    this.unLockEditor = function() {
      $('.action-save', $editForm).removeClass('disabled');
    }
    this.editorConfigure = function(isCopy) {
      if (editorRowid) {
        if (isCopy) {
          $editForm.find('.operation').text('Copy ' + _this.options.noun);
        } else {
          $editForm.find('.operation').text('Edit ' + _this.options.noun);
        }
      } else {
        $editForm.find('.operation').text('Create ' + _this.options.noun);
      }
    }
    this.editorSave = function(andClose, callback) {
      if (br.isFunction(andClose)) {
        callback = andClose;
        andClose = false;
      }
      var data = { };
      var ok = true;
      $editForm.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
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
          } else {
            data[$(this).attr('name')] = val;
          }
        }
      });
      if (ok) {
        if (editorRowid) {
          _this.dataSource.update(editorRowid, data, function(result) {
            if (result) {
              if (andClose) {
                $editForm.modal('hide');
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        } else {
          _this.dataSource.insert(data, function(result, response) {
            if (result) {
              if (andClose) {
                $editForm.modal('hide');
              } else {
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

      $editForm.on('shown', function() {
        var firstInput = $('input,select,textarea', $(this));
        if (firstInput.length > 0) {
          firstInput[0].focus();
        }
        _this.events.trigger('editor.shown');
      });

      $editForm.on('hidden', function() {
        _this.events.trigger('editor.hidden');
      });

      $('.action-save', $editForm).click(function() {
        if (!$(this).hasClass('disabled')) {
          _this.editorSave(true);
        }
      });

      return this;
    }
    this.showEditor = function(rowid, isCopy) {
      editorRowid = rowid;
      _this.editorConfigure(isCopy);
      $editForm.find('input.data-field,select.data-field,textarea.data-field').val('');
      $editForm.find('input.data-field[type=checkbox]').val('1');
      $editForm.find('input.data-field[type=checkbox]').removeAttr('checked');

      $editForm.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      if (editorRowid) {
        _this.dataSource.selectOne(editorRowid, function(result, data) {
          if (result) {
            for(var i in data) {
              $editForm.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
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
            $editForm.modal('show');
          }
        }, { disableEvents: true });
      } else {
        $editForm.find('select.data-field').each(function() {
          if (window.Select2) {
            $(this).select2();
          }
        });
        _this.events.trigger('showEditor');
        $editForm.modal('show');
      }
    }

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  }

})(jQuery, window);
