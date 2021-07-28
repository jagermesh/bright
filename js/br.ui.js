/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* jshint scripturl:true */

;(function ($, window) {

  window.br = window.br || Object.create({});

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
        humane.log(s, { addnCls: 'humane-jackedup-error humane-original-error'
                      , timeout: 5000
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
    options.cssClass = options.cssClass || '';
    options.defaultButton = options.defaultButton || 'confirm';

    let template = `<div class="br-modal-confirm modal ${options.cssClass}" data-backdrop="static" role="dialog">`;

    let checkBoxes = '';
    if (options.checkBoxes) {
      for (let i in options.checkBoxes) {
        let check = options.checkBoxes[i];
        let checked = '';
        if (check.default) {
          checked = 'checked';
        }
        checkBoxes += `<div class="checkbox">
                         <label class="checkbox">
                           <input type="checkbox" class="confirm-checkbox" name="${check.name}" value="1" ${checked}> ${check.title}
                         </label>
                       </div>`;
      }
    }

    template += `<div class="modal-dialog" role="document">
                   <div class="modal-content">
                   <div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>
                   <div class="modal-body" style="overflow-y:auto;">${message} ${checkBoxes}</div>
                   <div class="modal-footer">`;
    if (options.showDontAskMeAgain) {
      const dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
                     <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
                   </label>`;
    }
    if (br.isEmpty(buttons)) {
      const yesTitle = options.yesTitle || br.trn('Yes');
      const yesLink  = options.yesLink || 'javascript:;';
      const target   = (options.yesLink && !options.targetSamePage ? '_blank' : '');
      template += `<a href="${yesLink}" target="${target}" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;${yesTitle}&nbsp;</a>`;
    } else {
      let idx = 0;
      for(let inputName in buttons) {
        template += `<a href="javascript:;" class="btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-default'} action-confirm-close" rel="${inputName}">&nbsp;${buttons[inputName]}&nbsp;</a>`;
        idx++;
      }
    }
    template += `<a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel" rel="cancel">&nbsp;${options.cancelTitle}&nbsp;</a>
                 </div></div></div></div>`;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    let remove = true;

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onShow) {
          options.onShow.call(modal);
        }
        $(this).find('.action-confirm-close').on('click', function() {
          const button = $(this).attr('rel');
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          let checks = Object.create({});
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
          const button = 'cancel';
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
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

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.defaultButton) {
          const btn = $(this).find(`.modal-footer a.btn[rel="${options.defaultButton}"]`);
          if (btn.length > 0) {
            btn.addClass('btn-primary');
          }
        }
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove && options.onCancel) {
          const button = 'cancel';
          const dontAsk = $('input[name="showDontAskMeAgain"]', $(modal)).is(':checked');
          options.onCancel(button, dontAsk);
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

    const buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalError').length > 0) {
      const currentMessage = $('#br_modalError .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalError').off('hide.bs.modal');
      $('#br_modalError').modal('hide');
      $('#br_modalError').remove();
    }

    let template = `<div class="br-modal-error modal" id="br_modalError" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">`;
    if (title !== '') {
      template += `<div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>`;
    }
    template += `<div class="modal-body" style="overflow-y:auto;">${message}</div>
                 <div class="modal-footer" style="background-color:red;">
                   <a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a>
                 </div></div></div></div>`;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          callback.call(this, event);
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

    const buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalInform').length > 0) {
      const currentMessage = $('#br_modalInform .modal-body').html();
      if ((currentMessage.indexOf(message) == -1) && !options.replace) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalInform').off('hide.bs.modal');
      $('#br_modalInform').modal('hide');
      $('#br_modalInform').remove();
    }

    let template = `<div class="br-modal-inform modal" id="br_modalInform" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">`;
    if (title !== '') {
      template += `<div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>`;
    }
    template += `<div class="modal-body" style="overflow-y:auto;">${message}</div>
                 <div class="modal-footer">`;
    if (options.showDontAskMeAgain) {
      let dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
                     <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
                   </label>`;
    }
    template += `<a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a></div></div></div></div>`;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
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
    options.cancelTitle = options.cancelTitle || br.trn('Cancel');
    options.okTitle = options.okTitle || br.trn('Ok');

    let inputs = Object.create({});

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      options.valueRequired = true;
      inputs[fields] = '';
    }

    if (options.onhide) {
      options.onHide = options.onhide;
    }

    let template = `<div class="br-modal-prompt modal" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h3 class="modal-title pull-left">${title}</h3>
                          <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                          <div class="clearfix"></div>
                        </div>
                        <div class="modal-body" style="overflow-y:auto;">`;
    for(let inputLabel in inputs) {
      if (br.isObject(inputs[inputLabel])) {
        let inputId    = (br.isEmpty(inputs[inputLabel].id) ? '' : inputs[inputLabel].id);
        let inputClass = (br.isEmpty(inputs[inputLabel]['class']) ? '' : inputs[inputLabel]['class']) ;
        let inputValue = inputs[inputLabel].value;
        template += `<label>${inputLabel}</label>
                     <input type="text" id="${inputId}" class="span4 ${inputClass}" value="${inputValue}" />`;
      } else {
        let inputClass1 = (options.valueType == 'int' ? ' input-small' : ' justified');
        let inputClass2 = (options.valueRequired ? ' required' : '');
        let inputValue  = inputs[inputLabel];
        template += `<label>${inputLabel}</label>
                     <input type="text" class="form-control ${inputClass1} ${inputClass2}" value="${inputValue}" />`;
      }
    }

    template += `</div>
                 <div class="modal-footer">
                   <a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">${options.okTitle}</a>
                   <a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel btn-outline-secondary">&nbsp;${options.cancelTitle}&nbsp;</a>
                 </div>
               </div>
             </div>
           </div>`;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    let remove = true;

    $(modal).on('keypress', 'input', function(event) {
      if (event.keyCode == 13) {
        $(modal).find('a.action-confirm-close').trigger('click');
      }
    });

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('.action-confirm-close').on('click', function() {
          let results = [];
          let ok = true;
          let notOkField;
          let inputs = [];
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
        $(this).find('.action-confirm-cancel').click(function() {
          remove = false;
          modal.modal('hide');
          if (options.onCancel) {
            options.onCancel();
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
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
        if (remove && options.onCancel) {
          options.onCancel();
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

  let noTemplateEngine = false;

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
    data = data || Object.create({});
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
        } else {
          let t = Handlebars.compile(template);
          return t(data);
        }
      } else {
        return Mustache.render(template, data);
      }
    } else {
      return '';
    }
  };

  let progressCounter = 0;

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

  let progressBar_Total = 0;
  let progressBar_Progress = 0;
  let progressBar_Message = '';

  const progressBarTemplate = `<div id="br_progressBar" class="br-modal-progress modal" style="display:none;z-index:10000;top:30px;margin-top:0px;position:fixed;" data-backdrop="static" role="dialog">
                                 <div class="modal-dialog" role="document">
                                   <div class="modal-content">
                                     <div class="modal-body">
                                       <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">
                                         <tr>
                                           <td><div id="br_progressMessage" style="max-width:440px;max-height:40px;overflow:hidden;text-overflow:ellipsis;"></div></td>
                                           <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>
                                         </tr>
                                       </table>
                                       <div id="br_progressBar_Section" style="display:none;clear:both;">
                                         <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">
                                           <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>
                                         </div>
                                       </div>
                                       <div id="br_progressBarAnimation" style="padding-top:10px;">
                                         <center><img src="${br.brightUrl}images/progress-h.gif" /></center>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>`;


  function fileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' '+['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  let currentProgressType;

  function renderProgress() {
    const p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    if (currentProgressType == 'upload') {
      $('#br_progressStage').text(fileSize(progressBar_Progress) + ' of ' + fileSize(progressBar_Total));
    } else {
      $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
    }
  }

  let backDropCounter = 0;

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
      const pbr = $(progressBarTemplate);
      pbr.data('brAutoSizeConfigured', true);
      if (br.bootstrapVersion == 2) {
        pbr.css('top', '30px');
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
    br.showProgress();
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
    value = value || 1;
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
      const $container = $(this).parent('.br-container');
      let $navBar = $('nav.navbar');
      if ($navBar.length === 0) {
        $navBar = $('div.navbar');
      }
      let initialMarginTop = 0;
      if ($navBar.css('position') != 'static') {
        initialMarginTop = $container.offset().top;
      }
      if (deferred) {
        initialMarginTop = 0;
      }

      $('body').css('overflow', 'hidden');

      function resize() {
        let navBarHeight = 0;
        if ($navBar.length !== 0) {
          navBarHeight = $navBar.height();
        }
        if (deferred) {
          navBarHeight = 0;
        }
        const height = $(window).height() - navBarHeight - initialMarginTop;
        if (height > 0) {
          let marginTop = 0;
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
    const mh = $(window).height() - $(modal).find('.modal-header').outerHeight() - $(modal).find('.modal-footer').outerHeight() - 90;

    $(modal).find('.modal-body').css('max-height', mh + 'px');
    $(modal).find('.modal-body').css('overflow-y', 'auto');
    $(modal).trigger('bs.body.resize');
  };

  function attachBootstrapDatePickers(selector) {
    if ($.fn.bootstrapDatepicker) {
      try {
        $(selector).each(function() {
          $(this).bootstrapDatepicker({
            todayBtn: 'linked',
            clearBtn: true,
            multidate: false,
            autoclose: true,
            todayHighlight: true,
            orientation: ($(this).attr('data-dp-orientation') ? $(this).attr('data-dp-orientation') : 'top')
          }).on('show', function(evt) {
            if (!evt.date) {
              if ($(this).val()) {
                $(this).bootstrapDatepicker('update', $(this).val());
              }
            }
          });
        });
      } catch (error) {
        br.logError(`Can not bind bootstrap date picker: ${error}`);
      }
    }
  }

  function attachBootstrapDateTimePickers(selector) {
    if ($.fn.datetimepicker) {
      try {
        $(selector).each(function() {
          $(this).datetimepicker({
            format: 'mm/dd/yyyy HH:ii P',
            autoclose: true,
            todayBtn: true,
            pickerPosition: 'bottom-left',
            minuteStep: 5,
            showMeridian: true,
            useCurrent: false,
            todayHighlight: false
          }).on('show', function() {
            // $(this).datetimepicker('update', $(this).val());
          });
        });
      } catch (error) {
        br.logError(`Can not bind bootstrap date time picker: ${error}`);
      }
    }
  }

  window.br.attachDatePickers = function (container) {
    if (container) {
      attachBootstrapDatePickers($('input.bootstrap-datepicker', container));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker', container));
    } else {
      attachBootstrapDatePickers($('input.bootstrap-datepicker'));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker'));
    }
  };

  window.br.handleClick = function(control, promise) {
    $(control).addClass('disabled').prop('disabled', true);

    promise.then(function() {
      $(control).removeClass('disabled').prop('disabled', false);
    }).catch(function(error) {
      $(control).removeClass('disabled').prop('disabled', false);
      br.growlError(error);
    });
  };

  window.br.sortTable = function(table, order) {
    function getValuesComparison(a, b, columnIndex, direction) {
      const td1 = $($('td', $(a))[columnIndex]);
      const td2 = $($('td', $(b))[columnIndex]);
      const val1 = td1.attr('data-sort-value') ? td1.attr('data-sort-value') : td1.text().trim().replace(/\%$/, '').replace(/\,/, '');
      const val2 = td2.attr('data-sort-value') ? td2.attr('data-sort-value') : td2.text().trim().replace(/\%$/, '').replace(/\,/, '');
      let val1F = 0;
      let val2F = 0;
      let floatValues = 0;
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
        const tbody = $(this);
        $('tr', tbody).sort(function(a, b) {
          let values = [];
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

  window.br.setValue = function(selector, value, fromBrDataCombo) {

    $(selector).each(function() {
      const element = $(this);
      const dataComboInstance = element.data('BrDataCombo');
      if (dataComboInstance && !fromBrDataCombo) {
        dataComboInstance.val(value);
      } else {
        element.val(value);
        if (br.isEmpty(element.val())) {
          const options = element.find('option');
          let found = false;
          options.each(function() {
            if (!found && ((this.value == value) || (br.isEmpty(this.value) && br.isEmpty(value)))) {
              element.val(this.value);
              found = true;
            }
          });
          if (!found) {
            options.each(function() {
              if (this.getAttribute('selected')) {
                element.val(this.value);
                found = true;
              }
            });
            if (br.isEmpty(element.val())) {
              if (element.attr('multiple') != 'multiple') {
                if (options.length > 0) {
                  element.val(options[0].value);
                }
              }
            }
          }
        }
        if (!fromBrDataCombo) {
          // if (!br.isEmpty(element.val())) {
            if (element.data('select2')) {
              if ((element.attr('multiple') != 'multiple')) {
                // br.log(element);
                element.select2('val', element.val());
              }
            }
          // }
        }
      }
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

    const tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function disableTabbingOnPage(except) {
      // $.each($(tabbableElements), function (idx, item) {
      //   const el = $(item);
      //   if (!el.closest(except).length) {
      //     const tabindex = el.attr('tabindex');
      //     if (tabindex) {
      //       el.attr('data-prev-tabindex', tabindex);
      //     }
      //     el.attr('tabindex', '-1');
      //   }
      // });
    }

    function reEnableTabbingOnPage(except) {
      // $.each($(tabbableElements), function (idx, item) {
      //   const el = $(item);
      //   if (!el.closest(except).length) {
      //     const prevTabindex = el.attr('data-prev-tabindex');
      //     if (prevTabindex) {
      //       el.attr('tabindex', prevTabindex);
      //     } else {
      //       el.removeAttr('tabindex');
      //     }
      //     el.removeAttr('data-prev-tabindex');
      //   }
      // });
    }

    function configureAutosize(control) {
      if (control.data('brAutoSizeConfigured')) {

      } else {
        control.data('brAutoSizeConfigured', 1);
        if (br.bootstrapVersion == 2) {
          control.css('top', '20px');
          control.css('margin-top', '0px');
          control.css('position', 'fixed');
        }
        $(window).on('resize', function(){
          br.resizeModalPopup(control);
        });
      }
    }

    const defaultOpacity = 50;

    $(document).on('shown.bs.modal', function(event) {
      const target = $(event.target);
      if (target.hasClass('modal')) {
        let zindex = br.toInt(target.css('z-index'));
        $('div.modal').each(function() {
          const cthis = $(this);
          if (cthis.is(':visible')) {
            if (!cthis.is(target)) {
              const czindex = br.toInt(cthis.css('z-index'));
              zindex = Math.max(zindex, czindex) + 2;
            }
          }
        });
        target.css('z-index', zindex);
        zindex--;
        $('.modal-backdrop').css('z-index', zindex);
        if ($('.modal-backdrop').length) {
          const opacity = defaultOpacity / $('.modal-backdrop').length;
          $('.modal-backdrop').css({ 'opacity': opacity/100, 'filter': 'alpha(opacity=' + opacity + ')' });
        }
        disableTabbingOnPage(target);
      }
      br.draggable(target, { handler: '.modal-header' });
      if (target.hasClass('modal')) {
        configureAutosize(target);
        br.resizeModalPopup(target);
      }
    });

    $(document).on('hidden.bs.modal', function(event) {
      const target = $(event.target);
      if (target.hasClass('modal')) {
        let modals = [];
        $('div.modal').each(function() {
          if ($(this).is(':visible')) {
            modals.push({ zindex: br.toInt($(this).css('z-index')), modal: $(this) });
          }
        });
        if (modals.length) {
          modals.sort(function compare(a, b) {
            if (a.zindex > b.zindex) {
              return -1;
            } else
            if (a.zindex < b.zindex) {
              return 1;
            }
            return 0;
          });
          const zindex = modals[0].zindex-1;
          $('.modal-backdrop').css('z-index', zindex);
          if ($('.modal-backdrop').length) {
            const opacity = defaultOpacity / $('.modal-backdrop').length;
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
        const detachedMenu = $(this);
        const detachedMenuHolder = detachedMenu.data('detachedMenuHolder');
        const alignRight = detachedMenu.hasClass('br-dropdown-detached-right-aligned');
        const menu = detachedMenu.find('.dropdown-menu');
        const maxHeight = $(window).height() - (detachedMenuHolder.offset().top + detachedMenuHolder.height()) - 30;
        const css = Object.create({
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height(),
          right: (alignRight ? ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width() : detachedMenuHolder.offset().left)
        });
        detachedMenu.css(css);
        menu.css('max-height', `${maxHeight}px`);
        menu.css('overflow-y', `auto`);
      });
    });

    $(document).on('shown.bs.dropdown', function(event) {
      $('.br-dropdown-detached:visible').hide();
      const detachedMenuHolder = $(event.target);
      if (detachedMenuHolder.hasClass('br-dropdown-detachable')) {
        const alignRight = detachedMenuHolder.hasClass('br-dropdown-detachable-right-aligned');
        const menu = $(detachedMenuHolder.find('.dropdown-menu'));
        let detachedMenu = detachedMenuHolder.data('detachedMenu');
        const maxHeight = $(window).height() - (detachedMenuHolder.offset().top + detachedMenuHolder.height()) - 30;
        const css = Object.create({
          position: 'absolute',
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height(),
          right: (alignRight ? ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width() : detachedMenuHolder.offset().left),
        });
        if (detachedMenu) {
          detachedMenu.css(css);
          detachedMenu.addClass('open');
          detachedMenu.show();
        } else
        if (menu.length > 0) {
          detachedMenu = $('<div class="dropdown br-dropdown-detached" style="min-height:1px;"></div>');
          if (alignRight) {
            detachedMenu.addClass('br-dropdown-detached-right-aligned');
          }
          detachedMenu.append(menu.detach());
          detachedMenu.css(css);
          $('body').append(detachedMenu);
          menu.show();

          detachedMenu.data('detachedMenuHolder', detachedMenuHolder);
          detachedMenu.data('detachedMenuWidth', menu.width());
          detachedMenuHolder.data('detachedMenu', detachedMenu);
        }
        menu.css('max-height', `${maxHeight}px`);
        menu.css('overflow-y', `auto`);
      }
    });

  }

  let isAuthorized = true;

  br.setAutorizationState = function(value) {
    isAuthorized = value;
  };

  $(function() {

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
        if (isAuthorized) {
          br.setAutorizationState(false);
          if (br.events.has('authorizationRequired')) {
            br.events.trigger('authorizationRequired');
          } else {
            br.growlError(br.trn('You are trying to run operation which require authorization.'));
          }
        }
      }
    });

    $(document).on('keypress', 'input[data-click-on-enter]', function(event) {
      if (event.keyCode == 13) {
        $($(this).attr('data-click-on-enter')).trigger('click');
      }
    });

    $(document).on('click', '.action-clear-selector-value', function(event) {
      const target = $($(this).attr('data-selector'));
      if (target.length > 0) {
        br.setValue(target, '');
        target.trigger('change');
        if (target.attr('data-click-on-enter')) {
          $(target.attr('data-click-on-enter')).trigger('click');
        }
      }
    });

    br.attachDatePickers();

    enchanceBootstrap();

    if ($('.focused').length > 0) {
      try {
        $('.focused')[0].focus();
      } catch (error) {
      }
    }

    if (!br.isTouchScreen) {
      const disableBounceContainer = $('body').attr('data-disable-bounce-container');
      if (!br.isEmpty(disableBounceContainer)) {
        br.disableBounce($(disableBounceContainer));
      }
    }

    br.initScrollableAreas();

    if (br.bootstrapVersion == 2) {
      $('ul.dropdown-menu [data-toggle=dropdown]').each(function(index, item) {
        item.addEventListener('touchend', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).closest('.dropdown-menu').find('.dropdown-submenu').removeClass('open');
          $(this).parent().addClass('open');
        });
      });
    }

  });

})(jQuery, window);
