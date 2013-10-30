/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  var _helper = {

    pack: function(data) {
      return JSON.stringify(data);
    },

    unpack: function(data) {
      try {
        return JSON.parse(data);
      } catch(ex) {
        return null;
      }
    }

  }

  function BrStorage(storage) {

    var _storage = storage;
    var _this = this;

    this.get = function(key, defaultValue) {
      var result;
      if (br.isArray(key)) {
        result = {};
        for(var i in key) {
          result[key[i]] = this.get(key[i]);
        }
      } else {
        result = _helper.unpack(_storage.getItem(key));
      }
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    }

    this.set = function(key, value) {
      if (br.isObject(key)) {
        for(var name in key) {
          this.set(name, key[name]);
        }
      } else {
        _storage.setItem(key, _helper.pack(value));
      }
      return this;
    }

    this.inc = function(key, increment, glue) {
      var value = this.get(key);
      if (br.isNumber(value)) {
        increment = (br.isNumber(increment) ? increment : 1);
        this.set(key, value + increment);
      } else
      if (br.isString(value)) {
        if (!br.isEmpty(increment)) {
          if (glue === undefined) {
            glue = ', ';
          }
          if (!br.isEmpty(value)) {
            value = value + glue + increment;
          } else {
            value = increment;
          }
          this.set(key, value);
        }
      } else {
        increment = (br.isNumber(increment) ? increment : 1);
        this.set(key, increment);
      }
      return this;
    }

    this.dec = function(key, increment) {
      var value = this.get(key);
      increment = (br.isNumber(increment) ? increment : 1);
      this.set(key, br.isNumber(value) ? (value - increment) : increment);
      return this;
    }

    this.append = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for(var i in newValue) {
            this.append(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while(value.length >= limit) {
              value.shift();
            }
          }
          value.push(newValue);
          this.set(key, value);
        }
      }
      return this;
    }

    this.appendUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        this.remove(key, newValue);
        this.append(key, newValue, limit);
      }
      return this;
    }

    this.prepend = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for(var i in newValue) {
            this.prepend(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while(value.length >= limit) {
              value.pop();
            }
          }
          value.unshift(newValue);
          this.set(key, value);
        }
      }
      return this;
    }

    this.prependUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        this.remove(key, newValue);
        this.prepend(key, newValue, limit);
      }
      return this;
    }

    this.each = function(key, fn) {
      var value = this.get(key);
      if (!br.isArray(value)) {
        value = [];
      }
      for(var i=0; i < value.length; i++) {
        fn.call(this, value[i]);
      }
      return this;
    }

    function _getLast(key, defaultValue, remove) {
      var result = null;
      var value = _this.get(key, defaultValue);
      if (br.isArray(value)) {
        if (value.length > 0) {
          result = value.pop();
          if (remove) {
            _this.set(key, value);
          }
        }
      }
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
   }

    this.getLast = function(key, defaultValue) {
      return _getLast(key, defaultValue, false);
    }

    this.takeLast = function(key, defaultValue) {
      return _getLast(key, defaultValue, true);
    }

    function _getFirst(key, defaultValue, remove) {
      var result = null;
      var value = _this.get(key, defaultValue);
      if (br.isArray(value)) {
        if (value.length > 0) {
          result = value.shift();
          if (remove) {
            _this.set(key, value);
          }
        }
      }
      return br.isEmpty(result) ? (br.isEmpty(defaultValue) ? result : defaultValue) : result;
    }

    this.getFirst = function(key, defaultValue) {
      return _getFirst(key, defaultValue, false);
    }

    this.takeFirst = function(key, defaultValue) {
      return _getFirst(key, defaultValue, true);
    }

    this.extend = function(key, newValue) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isObject(value)) {
          value = {};
        }
        if (br.isObject(newValue)) {
          for(var i in newValue) {
            value[i] = newValue[i];
          }
          this.set(key, value);
        }
      }
      return this;
    }

    this.not = function(key) {
      var value = this.get(key);
      if (!br.isBoolean(value)) {
        value = false;
      }
      this.set(key, !value);
      return this;
    }

    this.clear = function() {
      _storage.clear();
      return this;
    }

    this.all = function() {
      var result = {};
      for(var name in _storage) {
        result[name] = this.get(name);
      }
      return result;
    }

    this.remove = function(key, arrayValue) {
      var value = this.get(key);
      if (!br.isEmpty(arrayValue) && br.isArray(value)) {
        var idx = value.indexOf(arrayValue)
        if (idx != -1) {
          value.splice(idx, 1);
        }
        this.set(key, value);
      } else {
        _storage.removeItem(key);
      }
      return this;
    }

    this.indexOf = function(key, arrayValue) {
      var value = this.get(key);
      if (br.isArray(value)) {
        return value.indexOf(arrayValue)
      }
      return -1;
    }

  }

  window.br = window.br || {};

  window.br.storage = new BrStorage(window.localStorage);
  window.br.session = new BrStorage(window.sessionStorage);

})(window);
