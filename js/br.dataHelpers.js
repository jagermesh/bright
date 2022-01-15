/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  window.br.dataHelpers = window.br.dataHelpers || {};

  window.br.dataHelpers.before = function(event, dataControls, callback) {
    for (let i = 0, length = dataControls.length; i < length; i++) {
      dataControls[i].before(event, callback);
    }
  };

  window.br.dataHelpers.on = function(event, dataControls, callback) {
    for (let i = 0, length = dataControls.length; i < length; i++) {
      dataControls[i].on(event, callback);
    }
  };

  function execute(funcToExecute, paramsQueue, extraParams, resolve, reject) {
    let functionsQueue = [];

    while ((functionsQueue.length <= extraParams.workers) && (paramsQueue.length > 0)) {
      functionsQueue.push(funcToExecute(paramsQueue.pop()).then(function() {
        br.stepProgress();
      }));
    }

    Promise.all(functionsQueue).then(function(data) {
        if (paramsQueue.length > 0) {
          execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
        } else {
          br.stepProgress();
          if (!extraParams.doNotHideProgress) {
            br.hideProgress();
          }
          resolve(data);
        }
      })
      .catch(function(data) {
        if (!extraParams.doNotHideProgressOnError) {
          br.hideProgress();
        }
        reject(data);
      });
  }

  window.br.dataHelpers.execute = function(funcToExecute, funcToGetTotal, funcToGetParams, extraParams) {
    extraParams = Object.assign({
      title: '',
      workers: 10
    }, extraParams);

    return new Promise(function(resolve, reject) {
      br.startProgress(funcToGetTotal(), extraParams.title);
      window.setTimeout(function() {
        let paramsQueue = [];
        while (true) {
          let params = funcToGetParams();
          if (params) {
            paramsQueue.push(params);
          } else {
            break;
          }
        }
        execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
      });
    });
  };

  window.br.dataHelpers.load = window.br.dataHelpers.select = function(dataControls, callback) {
    let promises = [];

    for (let i = 0, length = dataControls.length; i < length; i++) {
      (function(dataObject) {
        promises.push(
          new Promise(function(resolve, reject) {
            dataObject.load().then(function(data) {
              resolve({
                dataObject: dataObject,
                data: data
              });
            }).catch(function(data) {
              reject({
                dataObject: dataObject,
                data: data
              });
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