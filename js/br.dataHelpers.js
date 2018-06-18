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
            dataObject.load().then(function(response) {
              resolve({ dataObject: dataObject, response: response });
            }).catch(function(error) {
              reject({ dataObject: dataObject, error: error });
            });
          })
        );
      })(dataControls[i]);
    }

    Promise.all(promises).then(function(response) {
      if (typeof callback == 'function') {
        callback(true, response);
      }
    }).catch(function(response) {
      if (typeof callback == 'function') {
        callback(false, response);
      }
    });

  };

})(jQuery, window);
