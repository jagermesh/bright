/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrWebCamera() {

    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    const elem = document.createElement('canvas');
    const canvasSupported = !!(elem.getContext && elem.getContext('2d'));
    elem.remove();

    _this.isSupported = function() {
      if (canvasSupported && (navigator.userAgent.search(/Chrome/) > -1 || navigator.userAgent.search(/Firefox/) > -1 || navigator.userAgent.search(/Safari/) > -1)) {
        return true;
      } else {
        return false;
      }
    };

    _this.connect = function(webCam) {
      webCam.setAttribute('playsinline', true);
      webCam.setAttribute('autoplay', true);

      if (_this.isSupported()) {
        try {
          let requestFrame = function() {
            if (webCam.readyState === webCam.HAVE_ENOUGH_DATA) {
              window.setTimeout(function() {
                try {
                  _this.events.trigger('frame', webCam);
                } catch (error) {
                  br.log(error);
                }
                br.requestAnimationFrame(requestFrame);
              });
            }
          };

          br.getUserMedia( { video: true }
                         , function(stream) {
                             webCam.srcObject = stream;
                             webCam.onloadedmetadata = function(event) {
                               _this.events.trigger('connected', { width: webCam.videoWidth, height: webCam.videoHeight });
                               webCam.play();
                               br.requestAnimationFrame(requestFrame);
                             };
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

    _this.disconnect = function(webCam) {
      webCam.pause();
      webCam.srcObject = null;
    };

  }

  let webCamera;

  window.br.webCamera = function(params) {
    if (!webCamera) {
      webCamera = new BrWebCamera(params);
    }
    return webCamera;
  };

})(jQuery, window);
