/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global Promise */

;(function ($, window) {

  window.br = window.br || {};

  window.br.dataHelpers = window.br.dataHelpers || {};

  window.br.dataHelpers.load = window.br.dataHelpers.select = function(dataControls, callback) {

    var promises = [];

    for(var i = 0; i < dataControls.length; i++) {
      (function(dataObject) {
        promises.push(
          new Promise(function(resolve, reject) {
            dataObject.load().then(function(data) {
              resolve({ dataObject: dataObject, data: data });
            }).catch(function(data) {
              reject({ dataObject: dataObject, data: data });
            });
          })
        );
      })(dataControls[i]);
    }

    Promise.all(promises).then(function(data) {
      if (typeof callback == 'function') {
        callback(true, data.response);
      }
    }).catch(function(data) {
      if (typeof callback == 'function') {
        callback(false, data.errorMessage);
      }
    });

  };

})(jQuery, window);
