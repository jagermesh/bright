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

    s = s + '">'+
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
      $(this).find('.action-confirm-close').click(function() {
        if (params.showDontAskMeAgain) {
          callback.call(dialog, $(this).attr('rel'), $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked'));
        } else {
          callback.call(dialog, $(this).attr('rel'));
        }
        $(dialog).modal('hide');
      });
      $(this).find('.action-confirm-cancel').click(function() {
        if (params.onCancel) {
          params.onCancel.call(dialog);
        }
        $(dialog).modal('hide');
      });
    };
    var onHide = function(e) {
      dialog.remove();
    };
    $(dialog).on('show.bs.modal', onShow);
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal();
  };

  window.br.error = function(title, message, callback) {
    var s = '<div class="modal">' +
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
    $(dialog).modal();
  };

  window.br.inform = function(title, message, callback) {
    var s = '<div class="modal">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-footer"><a href="javascript:;" class="btn btn-default" data-dismiss="modal">&nbsp;' + br.trn('Dismiss') + '&nbsp;</a></div></div></div></div>';
    var dialog = $(s);
    var onHide = function(e) {
      dialog.remove();
      if (callback) {
        callback.call(this);
      }
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal();
  };

  window.br.prompt = function(title, fields, callback, options) {

    options = options || {};
    var s = '<div class="modal">'+
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>' +
            '<div class="modal-body">';

    var inputs = {};

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      inputs[fields] = '';
    }

    for(var i in inputs) {
      if (br.isObject(inputs[i])) {
        s = s + '<label>' + i + '</label>' +
              '<input type="text" ' +
              (inputs[i].id ? 'id="'+inputs[i].id+'"' : '') +
              ' class="span4 ' + (br.isEmpty(inputs[i]['class']) ? '' : inputs[i]['class']) + '"' +
              ' value="' + inputs[i].value + '"' +
              ' data-click-on-enter=".action-confirm-close" />';
      } else {
        s = s + '<label>' + i + '</label>' +
                '<input type="text" class="span4" value="' + inputs[i] + '" data-click-on-enter=".action-confirm-close" />';
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
          $(dialog).modal('hide');
          var results = [];
          $(this).closest('div.modal').find('input[type=text]').each(function() {
            results.push($(this).val());
          });
          callback.call(this, results);
        });
      })
      .on('hide', function(e) {
        dialog.remove();
        if (options.onhide) {
          options.onhide.call(this);
        }
      });
    $(dialog).modal();
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

  var progressBar_Total = 0, progressBar_Progress = 0;
  var progressBarTemplate = '<div id="br_progressBar" class="modal" style="display:none;" data-backdrop="static">' +
                            '  <div class="modal-dialog">'+
                            '    <div class="modal-content">'+
                            '      <div class="modal-header" style="display:none;">' +
                            '        <h3 id="br_progressMessage">Working...</h3>' +
                            '      </div>' +
                            '      <div class="modal-body">' +
                            '        <div class="progress" style="margin-bottom:0px;padding:0px;">' +
                            '          <div id="br_progressBarBar1" class="progress-bar progress active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width:0px;width:0%;background-color:#008cba;border:none;padding:0px;" >' +
                            '            <div id="br_progressBarBar2" class="bar" style="width: 0%;transition:none;-webkit-transition:none;"></div>' +
                            '          </div>' +
                            '        </div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>';

  window.br.startProgress = function(value, message) {
    progressBar_Total = value;
    progressBar_Progress = 0;
    if ($('#br_progressBar').length === 0) {
      $('body').append($(progressBarTemplate));
    }
    if (message) {
      $('#br_progressMessage').text(message);
      $('#br_progressBar .modal-header').show();
    }
    $('#br_progressBarBar1').css('width', '0%');
    $('#br_progressBarBar1').attr('aria-valuenow', '0');
    $('#br_progressBarBar2').css('width', '0%');
    $('#br_progressBar').modal('show');
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
  };

  window.br.showProgress = function() {
    $('#br_progressBar').modal('show');
  };

  window.br.stepProgress = function(step, message) {
    if (br.isNumber(step)) {
      progressBar_Progress += step;
    } else {
      progressBar_Progress++;
      message = step;
    }
    if (!br.isEmpty(message)) {
      $('#br_progressMessage').text(message);
      $('#br_progressBar .modal-header').show();
    }
    var p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBarBar1').css('width', p + '%');
    $('#br_progressBarBar1').attr('aria-valuenow', p);
    $('#br_progressBarBar2').css('width', p + '%');
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

    if ($('.focused').length > 0) {
      try { $('.focused')[0].focus(); } catch (ex) { }
    }

    if (!br.isTouchScreen) {
      var disableBounceContainer = $('body').attr('data-disable-bounce-container');
      if (!br.isEmpty(disableBounceContainer)) {
        br.disableBounce($(disableBounceContainer));
      }
    }

    $('.br-scrollable').each(function() {
      var $container = $(this).parent('.br-container');
      var initialMarginTop = $container.offset().top;

      $('body').css('overflow', 'hidden');

      function resize() {
        var $navBar = $('nav.navbar');
        if ($navBar.length === 0) {
          $navBar = $('div.navbar');
        }
        var navBarHeight = 0;
        if (($navBar.length !== 0) && ($navBar.css('position') != 'static')) {
          navBarHeight = $navBar.height();
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

  });

})(jQuery, window);
