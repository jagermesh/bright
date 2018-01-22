/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

  ;(function (window) {

    function BrWebCamera() {

      var _this = this;

      _this.events = br.eventQueue(this);
      _this.before = function(event, callback) { _this.events.before(event, callback); };
      _this.on     = function(event, callback) { _this.events.on(event, callback); };
      _this.after  = function(event, callback) { _this.events.after(event, callback); };

      _this.requestAnimationFrame = function(callback, element) {

        var requestAnimationFrame =
          window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          window.oRequestAnimationFrame       ||
          window.msRequestAnimationFrame      ||
          function(callback, element) {
            var currTime = new Date().getTime();
            // var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
              callback();
            }, 500);
            return id;
          };

        return requestAnimationFrame.call(window, callback, element);

      };

      _this.getUserMedia = function(options, success, error) {

        var getUserMedia =
          window.navigator.getUserMedia       ||
          window.navigator.mozGetUserMedia    ||
          window.navigator.webkitGetUserMedia ||
          window.navigator.msGetUserMedia     ||
          function(options, success, error) {
              error();
          };

        return getUserMedia.call(window.navigator, options, success, error);

      };

      var elem = document.createElement('canvas');
      var canvasSupported = !!(elem.getContext && elem.getContext('2d'));
      elem.remove();

      _this.isSupported = function() {

        if (canvasSupported && (navigator.userAgent.search(/Chrome/) > -1 || navigator.userAgent.search(/Firefox/) > -1)) {
          return true;
        } else {
          return false;
        }

      };

      _this.connect = function(webCam) {

        if (_this.isSupported()) {
          try {
            var attempts = 0;

            var requestFrame = function () {
              if (webCam.readyState === webCam.HAVE_ENOUGH_DATA) {
                try {
                  _this.events.trigger('frame', webCam);
                } catch (Error) {

                }
              }
              _this.requestAnimationFrame(requestFrame);
            };

            var findVideoSize = function() {
              if (webCam.videoWidth > 0 && webCam.videoHeight > 0) {
                webCam.removeEventListener('loadeddata', readyListener);
                _this.events.trigger('connected', { width: webCam.videoWidth, height: webCam.videoWidth });
                _this.requestAnimationFrame(requestFrame);
              } else {
                if (attempts < 10) {
                  attempts++;
                  window.setTimeout(findVideoSize, 200);
                } else {
                  _this.events.trigger('connected', { width: 640, height: 480 });
                  _this.requestAnimationFrame(requestFrame);
                }
              }
            };

            var readyListener = function(event) {
              findVideoSize();
            };

            webCam.addEventListener('loadeddata', readyListener);

            $(window).on('unload', function() {
              webCam.pause();
              webCam.src = null;
            });

            _this.getUserMedia( { video: true }
                              , function(stream) {
                                  try {
                                    webCam.src = br.URL.createObjectURL(stream);
                                  } catch (error) {
                                    webCam.src = stream;
                                  }
                                  window.setTimeout(function() {
                                    webCam.play();
                                  }, 500);
                                }
                              , function (error) {
                                  _this.events.trigger('error', error);
                                }
                              );
          } catch (error) {
            _this.events.trigger('error', error);
          }
        } else {
          _this.events.trigger('error', 'Web Camera or Canvas is not supported in your browser');
        }

      };

    }

    window.br = window.br || {};

    var webCamera;

    window.br.webCamera = function(params) {
      if (!webCamera) {
        webCamera = new BrWebCamera(params);
      }
      return webCamera;
    };

  })(window);
