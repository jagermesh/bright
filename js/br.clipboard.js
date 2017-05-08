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

  var clipboardCallbacks = [];

  window.br.onPaste = function(callback) {
    clipboardCallbacks.push(callback);
  };

  $(document).ready(function() {
    $('body').on('paste', function(evt) {

      var result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      evt = evt.originalEvent;

      function notify(evt, result) {
        br.events.trigger('paste', evt, result);
        for(var i = 0; i < clipboardCallbacks.length; i++) {
          clipboardCallbacks[i].call(evt, result);
        }
      }

      function loadFile(result, file, originalEvt, onerror) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          var parts = /^data[:](.+?)\/(.+?);/.exec(evt.target.result);
          var result_dataType    = 'other';
          var result_dataSubType = 'binary';
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.dataType    = result_dataType;
          result.dataSubType = result_dataSubType;
          result.dataValue   = evt.target.result;
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = evt.target.result;
          notify(originalEvt, result);
        };
        reader.onerror = function(evt) {
          if (onerror) {
            onerror();
          }
        };
        reader.readAsDataURL(file);
      }

      function loadData(result, clipboardData, mediaType, isImage) {
        var data = clipboardData.getData(mediaType);
        if (data && (data.length > 0)) {
          if (isImage) {
            mediaType = 'image/url';
          }
          var parts = /^(.+?)\/(.+?)$/.exec(mediaType);
          var result_dataType    = 'other';
          var result_dataSubType = 'binary';
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.dataType        = result_dataType;
          result.dataSubType     = result_dataSubType;
          result.dataValue       = data;
          if (isImage) {
            result.data[result_dataType] = result.data[result_dataType] || { };
            result.data[result_dataType][result_dataSubType] = data;
          }
          return true;
        }
        return false;
      }

      var items = [];

      function processItems() {
        if (items.length > 0) {
          var item = items.shift();
          loadFile(result, item, evt, function() {
            processItems();
          });
        }
      }

      if (evt.clipboardData) {
        var i;
        for(i = 0; i < evt.clipboardData.types.length; i++) {
          var dataType = evt.clipboardData.types[i];
          var parts = /^(.+?)\/(.+?)$/.exec(dataType);
          var result_dataType    = 'other';
          var result_dataSubType = dataType;
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = evt.clipboardData.getData(dataType);
        }

        var complete = true;
        if (loadData(result, evt.clipboardData, 'public.url', true)) {

        } else
        if (loadData(result, evt.clipboardData, 'text/html')) {
          result.dataValue = result.dataValue.replace(/<(html|body|head|meta|link)[^>]*?>/g, '')
                                             .replace(/<\/(html|body|head|meta|link)[^>]*?>/g, '')
                                             ;
        } else
        if (loadData(result, evt.clipboardData, 'text/plain')) {

        } else {
          if (evt.clipboardData.items && (evt.clipboardData.items.length > 0)) {
            for(i = 0; i < evt.clipboardData.items.length; i++) {
              if (evt.clipboardData.items[i].type.match('image.*')) {
                items.push(evt.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (evt.clipboardData.files && (evt.clipboardData.files.length > 0)) {
            for(i = 0; i < evt.clipboardData.files.length; i++) {
              if (evt.clipboardData.files[i].type.match('image.*')) {
                items.push(evt.clipboardData.files[0]);
              }
            }
          }
          if (items.length > 0) {
            complete = false;
            processItems();
          }
        }

        if (complete) {
          notify(evt, result);
        }

      }
    });
  });

})(jQuery, window);
