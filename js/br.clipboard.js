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

  var callbacks = [];

  $(document).ready(function() {
    $('body').on('paste', function(evt) {

      var result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      var evt = evt.originalEvent;

      function loadFile(result, file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          var parts = /^data[:](.+?)\/(.+?);/.exec(evt.target.result);
          if (parts) {
            var result_dataType    = parts[1];
            var result_dataSubType = parts[2];
          } else {
            var result_dataType    = 'other';
            var result_dataSubType = 'binary';
          }
          result['dataType']    = result_dataType;
          result['dataSubType'] = result_dataSubType;
          result['dataValue']   = evt.target.result;
          result['data'][result_dataType] = result['data'][result_dataType] || { };
          result['data'][result_dataType][result_dataSubType] = evt.target.result;
          for(var i in callbacks) {
            callbacks[i].call(evt, result);
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
          if (parts) {
            var result_dataType    = parts[1];
            var result_dataSubType = parts[2];
            result['dataType']    = result_dataType;
            result['dataSubType'] = result_dataSubType;
            result['dataValue']   = data;
          }
          if (isImage) {
            result['data'][result_dataType] = result['data'][result_dataType] || { };
            result['data'][result_dataType][result_dataSubType] = data;
          }
          return true;
        }
        return false;
      }

      if (evt.clipboardData) {

        for(var i = 0; i < evt.clipboardData.types.length; i++) {
          var dataType = evt.clipboardData.types[i];
          var parts = /^(.+?)\/(.+?)$/.exec(dataType);
          if (parts) {
            var result_dataType    = parts[1];
            var result_dataSubType = parts[2];
          } else {
            var result_dataType    = 'other';
            var result_dataSubType = dataType;
          }
          result['data'][result_dataType] = result['data'][result_dataType] || { };
          result['data'][result_dataType][result_dataSubType] = evt.clipboardData.getData(dataType);
        }

        var completed = true;

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
            for(var i = 0; i < evt.clipboardData.items.length; i++) {
              if (evt.clipboardData.items[i].type.match('image.*')) {
                completed = false;
                loadFile(result, evt.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (evt.clipboardData.files && (evt.clipboardData.files.length > 0)) {
            for(var i = 0; i < evt.clipboardData.files.length; i++) {
              if (evt.clipboardData.files[i].type.match('image.*')) {
                completed = false;
                loadFile(result, evt.clipboardData.files[0]);
              }
            }
          }
        }

        if (completed) {
          for(var i in callbacks) {
            callbacks[i].call(evt, result);
          }
        }

      }
    });
  });

  window.br.onPaste = function(callback) {
    callbacks.push(callback);
  }

})(jQuery, window);
