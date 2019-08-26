/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || Object.create({});

  $(function() {

    function notify(event, result) {

      br.events.trigger('paste', result, event);

    }

    function loadFile(result, file, originalEvent, onError) {

      const reader = new FileReader();

      reader.onload = function(event) {
        const parts = /^data[:](.+?)\/(.+?);/.exec(event.target.result);
        let result_dataType    = 'other';
        let result_dataSubType = 'binary';
        if (parts) {
          result_dataType    = parts[1];
          result_dataSubType = parts[2];
        }
        result.dataType    = result_dataType;
        result.dataSubType = result_dataSubType;
        result.dataValue   = event.target.result;
        result.data[result_dataType] = result.data[result_dataType] || { };
        result.data[result_dataType][result_dataSubType] = event.target.result;
        notify(originalEvent, result);
      };

      reader.onerror = function(event) {
        if (onError) {
          onError.call(event);
        }
      };

      reader.readAsDataURL(file);

    }

    function loadData(result, clipboardData, mediaType, isImage) {

      const data = clipboardData.getData(mediaType);

      if (data && (data.length > 0)) {
        if (isImage) {
          mediaType = 'image/url';
        }
        const parts = /^(.+?)\/(.+?)$/.exec(mediaType);
        let result_dataType    = 'other';
        let result_dataSubType = 'binary';
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

    function processItems(items, result, event) {

      if (items.length > 0) {
        let item = items.shift();
        loadFile(result, item, event, function() {
          processItems(items, result, event);
        });
      }

    }

    $('body').on('paste', function(event) {

      let result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      let items = [];
      let complete = true;

      event = event.originalEvent;

      if (event.clipboardData) {
        for(let i = 0, length = event.clipboardData.types.length; i < length; i++) {
          const dataType = event.clipboardData.types[i];
          const parts = /^(.+?)\/(.+?)$/.exec(dataType);
          let result_dataType    = 'other';
          let result_dataSubType = dataType;
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = event.clipboardData.getData(dataType);
        }

        if (loadData(result, event.clipboardData, 'public.url', true)) {

        } else
        if (loadData(result, event.clipboardData, 'text/html')) {
          result.dataValue = result.dataValue.replace(/<(html|body|head|meta|link)[^>]*?>/g, '')
                                             .replace(/<\/(html|body|head|meta|link)[^>]*?>/g, '');
        } else
        if (loadData(result, event.clipboardData, 'text/plain')) {

        } else {
          if (event.clipboardData.items && (event.clipboardData.items.length > 0)) {
            for(let i = 0, length = event.clipboardData.items.length; i < length; i++) {
              if (event.clipboardData.items[i].type.match('image.*')) {
                items.push(event.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (event.clipboardData.files && (event.clipboardData.files.length > 0)) {
            for(let i = 0, length = event.clipboardData.files.length; i < length; i++) {
              if (event.clipboardData.files[i].type.match('image.*')) {
                items.push(event.clipboardData.files[i]);
              }
            }
          }
          if (items.length > 0) {
            complete = false;
            processItems(items, result, event);
          }
        }

        if (complete) {
          notify(event, result);
        }
      }

    });

  });

})(jQuery, window);
