/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global URL */

;(function (window) {

  window.br = window.br || Object.create({});

  function BrRequest() {

    const _this = this;

    _this.continueRoute = true;
    _this.csrfToken = '';

    if (document) {
      if (document.cookie) {
        var csrfCookieRegexp = document.cookie.match(/Csrf-Token=([\w-]+)/);
        if (csrfCookieRegexp) {
          _this.csrfToken = csrfCookieRegexp[1];
        }
      }
    }

    _this.get = function(name, defaultValue) {
      const parsedUrl = new URL(window.location.href);
      const result = parsedUrl.searchParams.get(name);
      if (br.isNull(result)) {
        return defaultValue;
      }
      return result;
    };

    _this.setGet = function(name, value) {
      const parsedUrl = new URL(window.location.href);
      parsedUrl.searchParams.set(name, value);
      const newHref = parsedUrl.href.replace(parsedUrl.origin, '');
      window.history.replaceState({}, document.title, newHref);
    };

    _this.hash = function(name, defaultValue) {
      let vars = document.location.hash.replace('#', '').split('&');
      let vals = {};
      for (let oneVar of vars) {
        let pair = oneVar.split('=');
        if (pair[0].indexOf('[') != -1) {
          let n = pair[0].substr(0, pair[0].indexOf('['));
          vals[n] = vals[n] || [];
          vals[n].push(window.unescape(pair[1]));
        } else {
          vals[pair[0]] = window.unescape(pair[1]);
        }
      }
      if (name) {
        if (vals.hasOwnProperty(name)) {
          return vals[name];
        }
        return defaultValue;
      } else {
        return vals;
      }
    };

    _this.setHash = function(paramName, paramValue) {
      let params = document.location.hash.replace('#', '').split('&').filter((item) => !!item);
      let values = {};
      params.forEach(function(item) {
        const pairs = item.split('=');
        if (pairs.length == 2) {
          values[pairs[0]] = pairs[1];
        }
      });
      if (br.isObject(paramName)) {
        for(let name in paramName) {
          values[name] = paramName[name];
        }
      } else {
        values[paramName] = paramValue;
      }
      let hash = '#';
      for(let name in values) {
        hash += `${name}=${values[name]}&`;
      }
      document.location.hash = hash;
    };

    _this.anchor = function(defaultValue) {
      let value = document.location.hash.replace('#', '');
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
        let l = document.location.toString();
        l = l.replace(/[?].*/, '');
        if (l.search(path) != -1) {
          _this.continueRoute = false;
          func.call();
        }
      }
      return _this;
    };

  }

  window.br.request = new BrRequest();

})(window);
