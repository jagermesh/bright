/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

  ;(function (window) {

    function BrWebCamera() {

      const _this = this;

      _this.events = br.eventQueue(this);
      _this.before = function(event, callback) { _this.events.before(event, callback); };
      _this.on     = function(event, callback) { _this.events.on(event, callback); };
      _this.after  = function(event, callback) { _this.events.after(event, callback); };

      let elem = document.createElement('canvas');
      let canvasSupported = !!(elem.getContext && elem.getContext('2d'));
      elem.remove();

      _this.isSupported = function() {

        if (canvasSupported && (navigator.userAgent.search(/Chrome/) > -1 || navigator.userAgent.search(/Firefox/) > -1 || navigator.userAgent.search(/Safari/) > -1)) {
          return true;
        } else {
          return false;
        }

      };

      _this.connect = function(webCam) {

        if (_this.isSupported()) {
          try {
            let attempts = 0;

            let requestFrame = function () {
              if (webCam.readyState === webCam.HAVE_ENOUGH_DATA) {
                try {
                  _this.events.trigger('frame', webCam);
                } catch (Error) {

                }
              }
              br.requestAnimationFrame(requestFrame);
            };

            let findVideoSize = function() {
              if (webCam.videoWidth > 0 && webCam.videoHeight > 0) {
                webCam.removeEventListener('loadeddata', readyListener);
                _this.events.trigger('connected', { width: webCam.videoWidth, height: webCam.videoWidth });
                br.requestAnimationFrame(requestFrame);
              } else {
                if (attempts < 10) {
                  attempts++;
                  window.setTimeout(findVideoSize, 200);
                } else {
                  _this.events.trigger('connected', { width: 640, height: 480 });
                  br.requestAnimationFrame(requestFrame);
                }
              }
            };

            let readyListener = function(event) {
              findVideoSize();
            };

            webCam.addEventListener('loadeddata', readyListener);

            $(window).on('unload', function() {
              webCam.pause();
              webCam.src = null;
            });

            br.getUserMedia( { video: true }
                           , function(stream) {
                               webCam.srcObject = stream;
                               webCam.setAttribute('playsinline', true);
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

    let webCamera;

    window.br.webCamera = function(params) {
      if (!webCamera) {
        webCamera = new BrWebCamera(params);
      }
      return webCamera;
    };

  })(window);
