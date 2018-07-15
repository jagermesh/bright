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

  window.br.dataHelpers.before = function(event, dataControls, callback) {

    for(var i = 0; i < dataControls.length; i++) {
      dataControls[i].before(event, callback);
    }

  };

  window.br.dataHelpers.on = function(event, dataControls, callback) {

    for(var i = 0; i < dataControls.length; i++) {
      dataControls[i].on(event, callback);
    }

  };

  window.br.dataHelpers.execute = function(funcToRun, funcToGetTotal, funcToGetParams, extraParams) {

    extraParams = extraParams || {};
    extraParams.title = extraParams.title || '';

    return new Promise(function(resolve, reject) {
      var functionsForExecute = [];
      br.startProgress(funcToGetTotal(), extraParams.title);
      window.setTimeout(function() {
        var params;

        while (!!(params = funcToGetParams())) {
          functionsForExecute.push(funcToRun(params));
        }

        if ((functionsForExecute.length === 0) && extraParams.errorMessage) {
          reject({errorMessage: extraParams.errorMessage});
        }

        Promise.all(functionsForExecute)
               .then(function(data) {
                 br.hideProgress();
                 resolve(data);
               })
               .catch(function(data) {
                 br.hideProgress();
                 reject(data);
               });

      });
    });

  };

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

    return Promise.all(promises).then(function(data) {
      try {
        if (typeof callback == 'function') {
          callback(true, data);
        }
      } catch (error) {
        br.logError('Error: ' + error);
      }
      return data;
    }).catch(function(data) {
      try {
        if (typeof callback == 'function') {
          callback(false, data);
        }
      } catch (error) {
        br.logError('Error: ' + error);
      }
      throw data;
    });

  };

})(jQuery, window);
