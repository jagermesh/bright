/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function (window) {

  window.br = window.br || {};

  window.br.request = new BrRequest();

  function BrRequest() {

    var _this = this;

    _this.continueRoute = true;
    _this.csrfToken = '';

    var csrfCookie = '';

    if (document) {
      if (document.cookie) {
        var csrfCookieRegexp = document.cookie.match(/Csrf-Token=([\w-]+)/);
        if (csrfCookieRegexp) {
          _this.csrfToken = csrfCookieRegexp[1];
        }
      }
    }

    _this.get = function(name, defaultValue) {
      var vars = document.location.search.replace('?', '').split('&');
      var vals = {};
      var i;
      for (i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0].indexOf('[') != -1) {
          var n = pair[0].substr(0, pair[0].indexOf('['));
          vals[n] = vals[n] || [];
          vals[n].push(window.unescape(pair[1]));
        } else {
          vals[pair[0]] = window.unescape(pair[1]);
        }
      }
      if (name) {
        for (i in vals) {
          if (i == name) {
            return vals[i];
          }
        }
        return defaultValue;
      } else {
        return vals;
      }
    };

    _this.hash = function(name, defaultValue) {
      var vars = document.location.hash.replace('#', '').split('&');
      var vals = {};
      var i;
      for (i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0].indexOf('[') != -1) {
          var n = pair[0].substr(0, pair[0].indexOf('['));
          vals[n] = vals[n] || [];
          vals[n].push(window.unescape(pair[1]));
        } else {
          vals[pair[0]] = window.unescape(pair[1]);
        }
      }
      if (name) {
        for (i in vals) {
          if (i == name) {
            return vals[i];
          }
        }
        return defaultValue;
      } else {
        return vals;
      }
    };

    _this.anchor = function(defaultValue) {
      var value = document.location.hash.replace('#', '');
      if (value) {
        if (value.length === 0) {
          value = defaultValue;
        }
        value = window.unescape(value);
      } else {
        value = defaultValue;
      }
      return value;
    };

    _this.route = function(path, func) {
      if (_this.continueRoute) {
        var l = document.location.toString();
        l = l.replace(/[?].*/, '');
        if (l.search(path) != -1) {
          _this.continueRoute = false;
          func.call();
        }
      }
      return _this;
    };

  }

})(window);
