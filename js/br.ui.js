/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* jshint scripturl:true */

;(function ($, window) {

  window.br = window.br || {};
  window.br.bootstrapVersion = 0;

  window.br.showError = function(s) {
    alert(s);
  };

  window.br.growlError = function(s, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
            title: br.trn('Error')
          , text: s
          , class_name: 'gritter-red'
          , image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(s, { addnCls     : 'humane-jackedup-error humane-original-error'
                      //, clickToClose: true
                      , timeout     : 5000
                      });
      } else {
        alert(s);
      }
    }
  };

  window.br.showMessage = function(s) {
    if (!br.isEmpty(s)) {
      alert(s);
    }
  };

  window.br.growlMessage = function(s, title, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        if (br.isEmpty(title)) {
          title = ' ';
        }
        $.gritter.add({
            title: title
          , text: s
          , class_name: 'gritter-light'
          , image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(s);
      } else {
        alert(s);
      }
    }
  };

  window.br.panic = function(s) {
    $('.container').html('<div class="row"><div class="span12"><div class="alert alert-error"><h4>' + br.trn('Error') + '!</h4><p>' + s + '</p></div></div></div>');
    throw '';
  };

  window.br.confirm = function(title, message, buttons, callback, options) {

    if (typeof buttons == 'function') {
      options   = callback;
      callback = buttons;
      buttons  = null;
    }
    options = options || {};
    options.cancelTitle = options.cancelTitle || br.trn('Cancel');
    options.onConfirm = options.onConfirm || callback;

    var i;

    var s = '<div class="br-modal-confirm modal';
    if (options.cssClass) {
      s = s + ' ' + options.cssClass;
    }
    s += '">';

    var checkBoxes = '';
    if (options.checkBoxes) {
      for (i in options.checkBoxes) {
        var check = options.checkBoxes[i];
        var checked = '';
        if (check.default) {
          checked = 'checked';
        }
        checkBoxes = checkBoxes + '<div class="checkbox">' +
                                    '<label class="checkbox">' +
                                    '<input type="checkbox" class="confirm-checkbox" name="' + check.name + '" value="1" ' + checked + '> ' +
                                    check.title +
                                    '</label>' +
                                  '</div>';
      }
    }

    s = s + '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">' + message + checkBoxes + '</div>' +
            '<div class="modal-footer">';
    if (options.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    if (br.isEmpty(buttons)) {
      var yesTitle    = options.yesTitle || br.trn('Yes');
      var yesLink     = options.yesLink || 'javascript:;';
      var targetBlank = options.yesLink && !options.targetSamePage;
      s = s + '<a href="' + yesLink + '" ' + (targetBlank ? 'target="_blank"' : '') + ' class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;' + yesTitle + '&nbsp;</a>';
    } else {
      for(i in buttons) {
        s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-close" rel="' + i + '">&nbsp;' + buttons[i] + '&nbsp;</a>';
      }
    }
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel" rel="cancel">&nbsp;' + options.cancelTitle + '&nbsp;</a>';
    s = s + '</div></div></div></div>';

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    var remove = true;

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onShow) {
          options.onShow.call(modal);
        }
        $(this).find('.action-confirm-close').on('click', function() {
          var button = $(this).attr('rel');
          var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          var checks = {};
          $('input.confirm-checkbox').each(function(){
            checks[$(this).attr('name')] = $(this).is(':checked');
          });
          remove = false;
          modal.modal('hide');
          if (options.onConfirm) {
            options.onConfirm.call(this, button, dontAsk, checks);
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
          }
        });
        $(this).find('.action-confirm-cancel').click(function() {
          var button = 'cancel';
          var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          remove = false;
          modal.modal('hide');
          if (options.onCancel) {
            options.onCancel(button, dontAsk);
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
          }
        });
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove) {
          if (options.onCancel) {
            var button = 'cancel';
            var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
            options.onCancel(button, dontAsk);
          }
          modal.remove();
        }
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.defaultButton) {
          var btn = $(this).find('.modal-footer a.btn[rel=' + options.defaultButton + ']');
          if (btn.length > 0) {
            btn[0].focus();
          }
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (remove) {
          modal.remove();
        }
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  window.br.error = function(title, message, callback, options) {

    if (callback) {
      if (typeof callback != 'function') {
        options  = callback;
        callback = null;
      }
    }

    options = options || {};

    var buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalError').length > 0) {
      var currentMessage = $('#br_modalError .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalError').off('hide.bs.modal');
      $('#br_modalError').modal('hide');
      $('#br_modalError').remove();
    }

    var s = '<div class="modal" id="br_modalError" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="overflow-y:auto;">' + message + '</div>' +
            '<div class="modal-footer" style="background-color:red;">';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn(buttonTitle) + '&nbsp;</a><';
    s = s + '/div></div></div></div>';
    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          callback.call(this);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        modal.remove();
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  window.br.inform = function(title, message, callback, options) {

    if (callback) {
      if (typeof callback != 'function') {
        options  = callback;
        callback = null;
      }
    }

    options = options || {};

    var buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalInform').length > 0) {
      var currentMessage = $('#br_modalInform .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalInform').off('hide.bs.modal');
      $('#br_modalInform').modal('hide');
      $('#br_modalInform').remove();
    }

    var s = '<div class="modal" id="br_modalInform" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="overflow-y:auto;">' + message + '</div>' +
            '<div class="modal-footer">';
    if (options.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    s = s +'<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn(buttonTitle) + '&nbsp;</a></div></div></div></div>';

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
        if (callback) {
          callback.call(this, dontAsk);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        modal.remove();
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  window.br.prompt = function(title, fields, callback, options) {

    options = options || {};

    var inputs = {};

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      options.valueRequired = true;
      inputs[fields] = '';
    }

    if (options.onhide) {
      options.onHide = options.onhide;
    }

    var s = '<div class="br-modal-prompt modal" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">';
    for(var i in inputs) {
      if (br.isObject(inputs[i])) {
        s = s + '<label>' + i + '</label>' +
              '<input type="text" ' + (inputs[i].id ? 'id="'+inputs[i].id+'"' : '') + ' class="span4 ' + (br.isEmpty(inputs[i]['class']) ? '' : inputs[i]['class']) + '" value="' + inputs[i].value + '" />';
      } else {
        s = s + '<label>' + i + '</label>' +
                '<input type="text" class="form-control ' + (options.valueType == 'int' ? ' input-small' : ' justified') + (options.valueRequired ? ' required' : '') + ' " value="' + inputs[i] + '" />';
      }
    }

    s = s + '</div>' +
            '<div class="modal-footer">';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm" >Ok</a>';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn('Cancel') + '&nbsp;</a>';
    s = s + '</div></div></div></div>';

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    var remove = true;

    $(modal).on('keypress', 'input', function(event) {
      if (event.keyCode == 13) {
        $(modal).find('a.action-confirm-close').trigger('click');
      }
    });

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('.action-confirm-close').on('click', function() {
          var results = [];
          var ok = true, notOkField;
          var inputs = [];
          $(this).closest('div.modal').find('input[type=text]').each(function() {
            if ($(this).hasClass('required') && br.isEmpty($(this).val())) {
              ok = false;
              notOkField = $(this);
            }
            results.push($(this).val().trim());
            inputs.push($(this));
          });
          if (ok) {
            if (options.onValidate) {
              try {
                options.onValidate.call(this, results);
              } catch (e) {
                ok = false;
                br.growlError(e);
                if (inputs.length == 1) {
                  inputs[0].focus();
                }
              }
            }
            if (ok) {
              remove = false;
              modal.modal('hide');
              if (callback) {
                callback.call(this, results);
              }
              modal.remove();
              if (oldActiveElement) {
                oldActiveElement.focus();
              }
            }
          } else {
            br.growlError('Please enter value');
            notOkField[0].focus();
          }
        });
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('input[type=text]')[0].focus();
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (remove) {
          modal.remove();
        }
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  var noTemplateEngine = false;

  window.br.compile = function(template) {
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
        } else {
          return Handlebars.compile(template);
        }
      } else {
        return function(data) { return Mustache.render(template, data); };
      }
    } else {
      throw 'Empty template';
    }
  };

  window.br.fetch = function(template, data, tags) {
    data = data || {};
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
        } else {
          var t = Handlebars.compile(template);
          return t(data);
        }
      } else {
        return Mustache.render(template, data);
      }
    } else {
      return '';
    }
  };

  var progressCounter = 0;

  window.br.isAJAXInProgress = function() {
    return (progressCounter > 0);
  };

  window.br.showAJAXProgress = function() {
    progressCounter++;
    $('.ajax-in-progress').css('visibility', 'visible');
  };

  window.br.hideAJAXProgress = function() {
    progressCounter--;
    if (progressCounter <= 0) {
      $('.ajax-in-progress').css('visibility', 'hidden');
      progressCounter = 0;
    }
  };

  window.br.jsonEncode = function(data) {
    return JSON.stringify(data);
  };
  window.br.jsonDecode = function(data) {
    try {
      return JSON.parse(data);
    } catch(ex) {
      return null;
    }
  };

  var progressBar_Total = 0, progressBar_Progress = 0, progressBar_Message = '';
  var progressBarTemplate = '<div id="br_progressBar" class="modal" style="display:none;z-index:10000;top:20px;margin-top:0px;position:fixed;" data-backdrop="static">' +
                            '  <div class="modal-dialog">'+
                            '    <div class="modal-content">'+
                            '      <div class="modal-body">' +
                            '        <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">'+
                            '          <tr>'+
                            '            <td><div id="br_progressMessage" style="max-width:440px;max-height:40px;overflow:hidden;text-overflow:ellipsis;"></div></td>' +
                            '            <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>' +
                            '          </tr>' +
                            '        </table>' +
                            '        <div id="br_progressBar_Section" style="display:none;clear:both;">' +
                            '          <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">' +
                            '            <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>' +
                            '          </div>' +
                            '        </div>' +
                            '        <div id="br_progressBarAnimation" style="display1:none;padding-top:10px;">' +
                            '          <center><img src="' + br.brightUrl + 'images/progress-h.gif" /></center>' +
                            '        </div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>';


  function fileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' '+['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  var currentProgressType;

  function renderProgress() {
    var p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    if (currentProgressType == 'upload') {
      $('#br_progressStage').text(fileSize(progressBar_Progress) + ' of ' + fileSize(progressBar_Total));
    } else {
      $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
    }
  }

  var backDropCounter = 0;

  function initBackDrop() {
    if ($('#br_modalBackDrop').length === 0) {
      $('body').append('<div id="br_modalBackDrop" class="modal-backdrop" style="z-index:9999;"></div>');
    }
  }

  function showBackDrop(className) {
    initBackDrop();
    $('#br_modalBackDrop').show();
  }

  function hideBackDrop(className) {
    $('#br_modalBackDrop').hide();
  }

  window.br.startProgress = function(value, message, progressType) {
    currentProgressType = progressType;
    if (!br.isNumber(value)) {
      message = value;
      value = 0;
    }
    progressBar_Total = value;
    progressBar_Progress = 0;
    progressBar_Message = message;
    if ($('#br_progressBar').length === 0) {
      var pbr = $(progressBarTemplate);
      if (br.bootstrapVersion == 2) {
        pbr.css('top', '20px');
        pbr.css('margin-top', '0px');
      }
      $('body').append(pbr);
    }
    if (progressBar_Total > 1) {
      $('#br_progressBar_Section').show();
      $('#br_progressStage').show();
    } else {
      $('#br_progressBar_Section').hide();
      $('#br_progressStage').hide();
    }
    window.br.showProgress();
  };

  window.br.showProgress = function() {
    showBackDrop('progress');
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
    hideBackDrop('progress');
  };

  window.br.incProgress = function(value) {
    if (!value) { value = 1; }
    progressBar_Total += value;
    renderProgress();
  };

  window.br.setProgress = function(value, message) {
    progressBar_Progress = value;
    if (!br.isEmpty(message)) {
      progressBar_Message = message;
    }
    renderProgress();
  };

  window.br.stepProgress = function(step, message) {
    if (br.isNumber(step)) {
      progressBar_Progress += step;
    } else {
      progressBar_Progress++;
      message = step;
    }
    if (!br.isEmpty(message)) {
      progressBar_Message = message;
    }
    renderProgress();
  };

  window.br.initScrollableAreas = function(deferred) {

    $('.br-scrollable').each(function() {
      var $container = $(this).parent('.br-container');
      var $navBar = $('nav.navbar');
      if ($navBar.length === 0) { $navBar = $('div.navbar'); }
      var initialMarginTop = 0;
      if ($navBar.css('position') != 'static') {
        initialMarginTop = $container.offset().top;
      }
      if (deferred) {
        initialMarginTop = 0;
      }

      $('body').css('overflow', 'hidden');

      function resize() {
        var navBarHeight = 0;
        if ($navBar.length !== 0) {
          navBarHeight = $navBar.height();
        }
        if (deferred) {
          navBarHeight = 0;
        }
        var height = $(window).height() - navBarHeight - initialMarginTop;
        if (height > 0) {
          var marginTop = 0;
          if ($navBar.length > 0) {
            if ($navBar.css('position') == 'static') {
              marginTop = initialMarginTop;
            } else {
              marginTop = navBarHeight + initialMarginTop;
            }
          } else {
            marginTop = initialMarginTop;
          }
          $container.css('margin-top', marginTop + 'px');
          $container.css('height', height + 'px');
        }
      }

      $(window).on('resize', function() {
        resize();
      });

      resize();
    });

  };

  window.br.resizeModalPopup = function(modal) {

    var mh = $(window).height() - $(modal).find('.modal-header').outerHeight() - $(modal).find('.modal-footer').outerHeight() - 90;
    $(modal).find('.modal-body').css('max-height', mh + 'px');
    $(modal).find('.modal-body').css('overflow-y', 'auto');

  };

  window.br.enchanceBootstrap = function(el) {

    if ($.ui !== undefined) {
      if (el) {
        $(el).not('.ui-draggable').each(function() {
          if ($(this).find('.modal-header').length > 0) {
            $(this).draggable({ handle: '.modal-header', cursor: 'pointer' }).find('.modal-header').css('cursor', 'move');
          }
        });
      } else {
        $('.modal').not('.ui-draggable').each(function() {
          if ($(this).find('.modal-header').length > 0) {
            $(this).draggable({ handle: '.modal-header', cursor: 'pointer' }).find('.modal-header').css('cursor', 'move');
          }
        });
      }
    }

  };

  function attachjQueryUIDatePickers(selector) {

    if ($.ui !== undefined) {
      $(selector).each(function() {
        if ($(this).attr('data-format')) {
          $(this).datepicker({ dateFormat: $(this).attr('data-format') });
        } else {
          $(this).datepicker({ });
        }
      });
    }

  }

  function attachBootstrapDatePickers(selector) {

    try {
      $(selector).each(function() {
        $(this).bootstrapDatepicker({
          todayBtn: "linked",
          clearBtn: true,
          multidate: false,
          autoclose: true,
          todayHighlight: true
        });
      });
    } catch (e) {
      br.log('[ERROR] bootstrapDatepicker expected but script was not loaded');
    }

  }
  window.br.attachDatePickers = function (container) {

    if (container) {
      attachjQueryUIDatePickers($('input.datepicker', container));
      attachBootstrapDatePickers($('input.bootstrap-datepicker', container));
    } else {
      attachjQueryUIDatePickers($('input.datepicker'));
      attachBootstrapDatePickers($('input.bootstrap-datepicker'));
    }

  };

  window.br.handleClick = function(control, promise) {

    $(control).addClass('disabled').attr('disabled', 'disabled');

    promise.then(function() {
      $(control).removeClass('disabled').removeAttr('disabled');
    }).catch(function(error) {
      $(control).removeClass('disabled').removeAttr('disabled');
      br.growlError(error);
    });

  };

  window.br.sortTable = function(table, order) {

    function getValuesComparison(a, b, columnIndex, direction) {
      var td1 = $($('td', $(a))[columnIndex]);
      var td2 = $($('td', $(b))[columnIndex]);
      var val1 = td1.remove('a').text().trim();
      var val2 = td2.remove('a').text().trim();
      var val1F = 0;
      var val2F = 0;
      var floatValues = 0;
      if (!isNaN(parseFloat(val1)) && isFinite(val1)) {
        val1F = parseFloat(val1);
        floatValues++;
      }
      if (!isNaN(parseFloat(val2)) && isFinite(val2)) {
        val2F = parseFloat(val2);
        floatValues++;
      }
      if (floatValues == 2) {
        return (val1F == val2F ? 0: (val1F > val2F ? direction : direction * -1));
      } else {
        return val1.localeCompare(val2) * direction;
      }
    }

    return new Promise(function(resolve, reject) {
      $('tbody', table).each(function() {
        var tbody = $(this);
        $('tr', tbody).sort(function(a, b) {
          var values = [];
          order.forEach(function(orderCfg) {
            values.push(getValuesComparison(a, b, orderCfg.column, (orderCfg.order == 'asc' ? 1 : -1)));
          });
          return values.reduce(function(result, value) {
            if (result != 0) {
              return result;
            }
            return value;
          }, 0);
        }).each(function() {
          $(tbody).append($(this));
        });
      });
      resolve();
    });

  };

  if (typeof window.Handlebars == 'object') {
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });
  }

  function enchanceBootstrap() {

    var tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function disableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        var el = $(item);
        if (!el.closest(except).length) {
          var tabindex = el.attr('tabindex');
          if (tabindex) {
            el.attr('data-prev-tabindex', tabindex);
          }
          el.attr('tabindex', '-1');
        }
      });
    }

    function reEnableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        var el = $(item);
        if (!el.closest(except).length) {
          var prevTabindex = el.attr('data-prev-tabindex');
          if (prevTabindex) {
            el.attr('tabindex', prevTabindex);
          } else {
            el.removeAttr('tabindex');
          }
          el.removeAttr('data-prev-tabindex');
        }
      });
    }

    function configureAutosize(control) {
      if (control.data('brAutoSizeConfigured')) {

      } else {
        if (br.bootstrapVersion == 2) {
          control.css('top', '20px');
          control.css('margin-top', '0px');
          control.css('position', 'fixed');
        }
        $(window).resize(function(){
          br.resizeModalPopup(control);
        });
        control.data('brAutoSizeConfigured', 1);
      }
    }

    var defaultOpacity = 50;

    $(document).on('shown.bs.modal', function(event) {
      var target = $(event.target);
      if (target.hasClass('modal')) {
        var zindex = br.toInt(target.css('z-index'));
        $('div.modal').each(function() {
          var cthis = $(this);
          if (cthis.is(':visible')) {
            if (!cthis.is(target)) {
              var czindex = br.toInt(cthis.css('z-index'));
              zindex = Math.max(zindex, czindex) + 2;
            }
          }
        });
        target.css('z-index', zindex);
        zindex--;
        $('.modal-backdrop').css('z-index', zindex);
        if ($('.modal-backdrop').length) {
          var opacity = defaultOpacity / $('.modal-backdrop').length;
          $('.modal-backdrop').css({ 'opacity': opacity/100, 'filter': 'alpha(opacity=' + opacity + ')' });
        }
        disableTabbingOnPage(target);
      }
      br.enchanceBootstrap(target);
      if (target.hasClass('modal')) {
        configureAutosize(target);
        br.resizeModalPopup(target);
      }
    });

    $(document).on('hidden.bs.modal', function(event) {
      var target = $(event.target);
      if (target.hasClass('modal')) {
        var modals = [];
        $('div.modal').each(function() {
          if ($(this).is(':visible')) {
            modals.push({ zindex: br.toInt($(this).css('z-index')), modal: $(this) });
          }
        });
        if (modals.length) {
          modals.sort(function compare(a, b) {
            if (a.zindex > b.zindex)
              return -1;
            if (a.zindex < b.zindex)
              return 1;
            return 0;
          });
          var zindex = modals[0].zindex-1;
          $('.modal-backdrop').css('z-index', zindex);
          if ($('.modal-backdrop').length) {
            var opacity = defaultOpacity / $('.modal-backdrop').length;
            $('.modal-backdrop').css({ 'opacity': opacity/100, 'filter': 'alpha(opacity=' + opacity + ')' });
          }
        }
        reEnableTabbingOnPage(target);
      }
    });

    $(document).on('click', function(event) {
      $('.br-dropdown-detached:visible').hide();
    });

    $(window).on('resize', function() {
      $('.br-dropdown-detached:visible').each(function() {
        var detachedMenu = $(this);
        var detachedMenuHolder = detachedMenu.data('detachedMenuHolder');
        var alignRight = detachedMenu.hasClass('br-dropdown-detached-right-aligned');
        var menu = detachedMenu.find('.dropdown-menu');
        var css = {
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height()
        };
        if (alignRight) {
          css.right = ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width();
        } else {
          css.left = detachedMenuHolder.offset().left;
        }
        detachedMenu.css(css);
      });
    });

    $(document).on('shown.bs.dropdown', function(event) {
      $('.br-dropdown-detached:visible').hide();
      var target = $(event.target);
      if (target.hasClass('br-dropdown-detachable')) {
        var detachedMenu = target.data('detachedMenu');
        var alignRight = target.hasClass('br-dropdown-detachable-right-aligned');
        var css = {
          position: 'absolute',
          top: target.offset().top + target.height()
        };
        if (detachedMenu) {
          if (alignRight) {
            css.right = ($(window).width() - target.offset().left - target.width()) + detachedMenu.data('detachedMenuWidth');
          } else {
            css.left = target.offset().left;
          }
          detachedMenu.css(css);
          detachedMenu.addClass('open');
          detachedMenu.show();
        } else {
          var menu = $(target.find('.dropdown-menu'));
          if (menu.length) {
            if (alignRight) {
              css.right = ($(window).width() - target.offset().left - target.width()) + menu.width();
            } else {
              css.left = target.offset().left;
            }
            detachedMenu = $('<div class="dropdown br-dropdown-detached" style="min-height:1px;"></div>');
            if (alignRight) {
              detachedMenu.addClass('br-dropdown-detached-right-aligned');
            }
            detachedMenu.append(menu.detach());
            detachedMenu.css(css);
            $('body').append(detachedMenu);
            menu.show();

            detachedMenu.data('detachedMenuHolder', target);
            detachedMenu.data('detachedMenuWidth', menu.width());
            target.data('detachedMenu', detachedMenu);
          }
        }
      }
    });

  }

  $(document).ready(function() {

    var notAuthorized = false;


    if ($.fn['modal']) {
      if ($.fn['modal'].toString().indexOf('bs.modal') == -1) {
        br.bootstrapVersion = 2;
      } else {
        br.bootstrapVersion = 3;
      }
    } else {
      br.bootstrapVersion = 0;
    }

    if (br.bootstrapVersion == 2) {
      $.fn.modal.Constructor.prototype.enforceFocus = function () {};
    }

    $(document).ajaxStart(function() {
      br.showAJAXProgress();
    });

    $(document).ajaxStop(function() {
      br.hideAJAXProgress();
    });

    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
      if (jqXHR.status == 401) {
        if (!notAuthorized) {
          notAuthorized = true;
          br.growlError(br.trn('You are trying to run operation which require authorization.'));
        }
      }
    });

    $(document).on('keypress', 'input[data-click-on-enter]', function(event) {
      if (event.keyCode == 13) {
        $($(this).attr('data-click-on-enter')).trigger('click');
      }
    });

    br.enchanceBootstrap();
    br.attachDatePickers();

    enchanceBootstrap();

    if ($('.focused').length > 0) {
      try { $('.focused')[0].focus(); } catch (ex) { }
    }

    if (!br.isTouchScreen) {
      var disableBounceContainer = $('body').attr('data-disable-bounce-container');
      if (!br.isEmpty(disableBounceContainer)) {
        br.disableBounce($(disableBounceContainer));
      }
    }

    br.initScrollableAreas();

    if (br.bootstrapVersion == 2) {
      $('ul.dropdown-menu [data-toggle=dropdown]').on('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).closest('.dropdown-menu').find('.dropdown-submenu').removeClass('open');
        $(this).parent().addClass('open');
      });
    }

  });

})(jQuery, window);
