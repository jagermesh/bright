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

  window.br.onPaste = function(callback) {

    $(document).ready(function() {
      $('body').on('paste', function(evt) {
        var result = { data: { }, dataType: '', dataSubType: '' };
        evt = evt.originalEvent;
        if (evt.clipboardData) {
          var filesFound = -1;
          for(var i = 0; i < evt.clipboardData.types.length; i++) {
            var dataType = evt.clipboardData.types[i];
            if (dataType == 'Files') {
              filesFound = i;
            } else {
              var data = evt.clipboardData.getData(dataType);
              var parts = /^(.+?)\/(.+?)$/.exec(dataType);
              if (parts) {
                result['dataType'] = parts[1];
                result['dataSubType'] = parts[2];
              } else {
                result['dataType'] = 'text';
                result['dataSubType'] = 'generic';
              }
              result['data'][result['dataType']] = result['data'][result['dataType']] || { };
              result['data'][result['dataType']][result['dataSubType']] = data;
            }
          }
          if (filesFound == -1) {
            return callback(result);
          } else {
            var file, reader;
            var loaded = false;
            file = evt.clipboardData.items[filesFound].getAsFile();
            reader = new FileReader();
            reader.onload = function(evt) {
              var data = evt.target.result;
              var parts = /^data[:](.+?)\/(.+?);/.exec(data);
              if (parts) {
                result['dataType'] = parts[1];
                result['dataSubType'] = parts[2];
              } else {
                result['dataType'] = 'binary';
                result['dataSubType'] = 'generic';
              }
              result['data'][result['dataType']] = result['data'][result['dataType']] || { };
              result['data'][result['dataType']][result['dataSubType']] = data;
              callback(result);
            };
            reader.readAsDataURL(file);
          }
        }
      });
    });

  }

})(jQuery, window);
