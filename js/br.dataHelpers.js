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
      (function(dc) {
        promises.push(
          new Promise(function(resolve, reject) {
            dc.load(function(result, response) {
              if (result) {
                resolve({ dataCombo: dc, response: response });
              } else {
                reject({ dataCombo: dc, response: response });
              }
            });
          })
        );
      })(dataControls[i]);
    }

    Promise.all(promises).then(function(response, ds) { callback(true, response, ds); })
                         .catch(function(response, ds) { callback(false, response, ds); });

  };

})(jQuery, window);
