/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || {};

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

  window.br.confirm = function(title, message, buttons, callback, params) {
    if (typeof buttons == 'function') {
      params   = callback;
      callback = buttons;
      buttons  = null;
    }
    params = params || {};
    params.cancelTitle = params.cancelTitle || br.trn('Cancel');
    var s = '<div class="modal';
    if (params.cssClass) {
      s = s + ' ' + params.cssClass;
    }

    s = s + '" id="br_modalConfirm">'+
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-footer">';
    if (params.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (params.dontAskMeAgainTitle) ? params.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align: left; float: left;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    if (br.isEmpty(buttons)) {
      s = s + '<a href="javascript:;" class="btn btn-primary action-confirm-close" rel="confirm">&nbsp;' + br.trn('Yes') + '&nbsp;</a>';
    } else {
      for(var i in buttons) {
        s = s + '<a href="javascript:;" class="btn btn-default action-confirm-close" rel="' + i + '">&nbsp;' + buttons[i] + '&nbsp;</a>';
      }
    }
    s = s + '<a href="javascript:;" class="btn btn-default action-confirm-cancel">&nbsp;' + params.cancelTitle + '&nbsp;</a>';
    s = s + '</div></div></div></div>';
    var dialog = $(s);
    var onShow = function(e) {
      if (params.onShow) {
        params.onShow.call(dialog);
      }
      $(this).find('.action-confirm-close').click(function() {
        var button = $(this).attr('rel');
        var dontAsk = $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked');
        dialog.modal('hide');
        callback(button, dontAsk);
      });
      $(this).find('.action-confirm-cancel').click(function() {
        var button = 'cancel';
        var dontAsk = $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked');
        dialog.modal('hide');
        if (params.onCancel) {
          params.onCancel(button, dontAsk);
        }
      });
    };
    var onHide = function(e) {
      dialog.remove();
    };
    $(dialog).on('show.bs.modal', onShow);
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
  };

  window.br.error = function(title, message, callback) {
    var s = '<div class="modal" id="br_modalError">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-footer" style="background-color:red;"><a href="javascript:;" class="btn btn-default" data-dismiss="modal">&nbsp;' + br.trn('Dismiss') + '&nbsp;</a></div></div></div></div>';
    var dialog = $(s);
    var onHide = function(e) {
      dialog.remove();
      if (callback) {
        callback.call(this);
      }
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
  };

  window.br.inform = function(title, message, callback) {
    var s = '<div class="modal" id="br_modalInform" style="top:290px;">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="max-height:500px;">' + message + '</div>' +
            '<div class="modal-footer"><a href="javascript:;" class="btn btn-default" data-dismiss="modal">&nbsp;' + br.trn('Dismiss') + '&nbsp;</a></div></div></div></div>';
    var dialog = $(s);
    var onHide = function(e) {
      dialog.remove();
      if (callback) {
        callback.call(this);
      }
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
  };

  window.br.prompt = function(title, fields, callback, options) {

    options = options || {};

    var inputs = {};

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      inputs[fields] = '';
    }

    var s = '<div class="modal" id="br_modalPrompt">'+
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>' +
            '<div class="modal-body">';
    for(var i in inputs) {
      if (br.isObject(inputs[i])) {
        s = s + '<label>' + i + '</label>' +
              '<input type="text" ' +
              (inputs[i].id ? 'id="'+inputs[i].id+'"' : '') +
              ' class="span4 ' + (br.isEmpty(inputs[i]['class']) ? '' : inputs[i]['class']) + '"' +
              ' value="' + inputs[i].value + '"' +
              ' data-click-on-enter="#br_promptModal .action-confirm-close" />';
      } else {
        s = s + '<label>' + i + '</label>' +
                '<input type="text" class=" ' + (options.valueType == 'int' ? ' input-small' : ' justified') + (options.valueRequired ? ' required' : '') + ' " value="' + inputs[i] + '" data-click-on-enter=".action-confirm-close" />';
      }
    }

    s = s + '</div>' +
            '<div class="modal-footer">';
    s = s + '<a href="javascript:;" class="btn btn-primary action-confirm-close" rel="confirm" >Ok</a>';
    s = s + '<a href="javascript:;" class="btn btn-default" data-dismiss="modal">&nbsp;' + br.trn('Cancel') + '&nbsp;</a>';
    s = s + '</div></div></div></div>';
    var dialog = $(s);
    $(dialog)
      .on('shown', function(e) {
        $(this).find('input[type=text]')[0].focus();
      })
      .on('show', function(e) {
        $(this).find('.action-confirm-close').click(function() {
          var results = [];
          var ok = true, notOkField;
          $(this).closest('div.modal').find('input[type=text]').each(function() {
            if ($(this).hasClass('required') && br.isEmpty($(this).val())) {
              ok = false;
              notOkField = $(this);
            }
            results.push($(this).val());
          });
          if (ok) {
            $(dialog).modal('hide');
            callback.call(this, results);
          } else {
            br.growlError('Please enter value');
            notOkField[0].focus();
          }
        });
      });
    var onHide = function(e) {
      dialog.remove();
      if (options.onhide) {
        options.onhide.call(this);
      }
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
  };

  var noTemplateEngine = false;

  window.br.fetch = function(template, data, tags) {
    data = data || {};
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          if (!noTemplateEngine) {
            noTemplateEngine = true;
            this.showError('Template engine not found. Please link bright/3rdparty/mustache.js or bright/3rdparty/handlebars.js.');
          }
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
  var progressBarTemplate = '<div id="br_progressBar" class="modal" style="display:none;z-index:10000;" data-backdrop="static">' +
                            '  <div class="modal-dialog">'+
                            '    <div class="modal-content">'+
                            '      <div class="modal-body">' +
                            '        <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">'+
                            '          <tr>'+
                            '            <td id="br_progressMessage"></td>' +
                            '            <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>' +
                            '          </tr>' +
                            '        </table>' +
                            '        <div id="br_progressBar_Section" style="display:none;clear:both;">' +
                            '          <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">' +
                            '            <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>' +
                            '          </div>' +
                            '        </div>' +
                            '        <div id="br_progressBarAnimation" style="display1:none;padding-top:10px;">' +
                            '          <center><img src="' + br.baseUrl + 'bright/images/progress-h.gif" /></center>' +
                            '        </div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>';

  function renderProgress() {
    var p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
  }

  window.br.startProgress = function(value, message) {
    if (!br.isNumber(value)) {
      message = value;
      value = 0;
    }
    progressBar_Total = value;
    progressBar_Progress = 0;
    progressBar_Message = message;
    if ($('#br_progressBar').length === 0) {
      $('body').append($(progressBarTemplate));
    }
    if (progressBar_Total > 1) {
      $('#br_progressBar_Section').show();
      $('#br_progressStage').show();
    } else {
      $('#br_progressBar_Section').hide();
      $('#br_progressStage').hide();
    }
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.showProgress = function() {
    $('#br_progressBar').modal('show');
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
  };

  window.br.incProgress = function(value) {
    if (!value) { value = 1; }
    progressBar_Total += value;
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

  function resizeModalPopup(modal) {

    var mh = $(window).height() - $(modal).find('.modal-header').outerHeight() - $(modal).find('.modal-footer').outerHeight() - 90;
    $(modal).find('.modal-body').css('max-height', mh + 'px');

  }

  window.br.enchanceBootstrap = function(el) {

    if (el) {

    } else {
      $('div.modal.modal-autosize').each(function() {
        if ($(this).data('brAutoSizeConfigured')) {

        } else {
          (function(control) {
            control.css('top', '280px');
            control.on('shown.bs.modal', function() {
              resizeModalPopup(control);
            });
            $(window).resize(function(){
              resizeModalPopup(control);
            });
            control.data('brAutoSizeConfigured', 1);
          })($(this));
        }
      });
    }

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

  $(document).ready(function() {

    var notAuthorized = false;

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

    $(document).on('keypress', 'input[data-click-on-enter]', function(e) {
      if (e.keyCode == 13) { $($(this).attr('data-click-on-enter')).trigger('click'); }
    });

    br.enchanceBootstrap();
    br.attachDatePickers();

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

  });

})(jQuery, window);
