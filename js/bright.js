/* jshint ignore:start *//*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  window.br = window.br || {};

  window.br.isNumber = function(value) {
    return (
             !isNaN(parseFloat(value)) &&
             isFinite(value)
           );
  };

  window.br.isNull = function(value) {
    return (
             (value === undefined) ||
             (value === null)
           );
  };

  window.br.isEmpty = function(value) {
    return (
             br.isNull(value) ||
             ((typeof value.length != 'undefined') && (value.length === 0)) // Array, String
           );
  };

  window.br.isArray = function (value) {
    return (
             !br.isNull(value) &&
             (Object.prototype.toString.call(value) === '[object Array]')
           );
  };

  window.br.isObject = function (value) {
    return (!br.isEmpty(value) && (typeof value === 'object'));
  };

  window.br.isEmptyObject = function (value) {
    if (br.isObject(value)) {
      var result = true;
      for(var i in value) {
        result = false;
        break;
      }
      return result;
    } else {
      return false;
    }
    return (!br.isEmpty(value) && (typeof value === 'object'));
  };

  window.br.isBoolean = function (value) {
    return (typeof value === 'boolean');
  };

  window.br.isString = function (value) {
    return (typeof value === 'string');
  };

  window.br.isFunction = function (value) {
    return (typeof value === 'function');
  };

  window.br.toString = function (value) {
    if (br.isNull(value)) {
      return '';
    } else {
      return value.toString();
    }
  };

  window.br.split = function (value, delimiter) {
    if (br.isEmpty(value)) {
      return [];
    } else
    if (br.isString(value)) {
      return value.split(delimiter);
    }
  };

  window.br.toInt = function(value) {
    if (br.isString(value)) {
      if (value.length > 0) {
        return parseInt(value, 10);
      }
    } else
    if (br.isNumber(value)) {
      return value;
    }
  };

  window.br.toReal = function(value) {
    if (br.isString(value)) {
      if (value.length > 0) {
        return parseFloat(value);
      } else {
        return 0;
      }
    } else
    if (br.isNumber(value)) {
      return value;
    } else {
      return 0;
    }
  };

})(window);
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

  };

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
    };

    this.set = function(key, value) {
      if (br.isObject(key)) {
        for(var name in key) {
          this.set(name, key[name]);
        }
      } else {
        _storage.setItem(key, _helper.pack(value));
      }
      return this;
    };

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
    };

    this.dec = function(key, increment) {
      var value = this.get(key);
      increment = (br.isNumber(increment) ? increment : 1);
      this.set(key, br.isNumber(value) ? (value - increment) : increment);
      return this;
    };

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
    };

    this.appendUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        this.remove(key, newValue);
        this.append(key, newValue, limit);
      }
      return this;
    };

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
    };

    this.prependUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        this.remove(key, newValue);
        this.prepend(key, newValue, limit);
      }
      return this;
    };

    this.each = function(key, fn) {
      var value = this.get(key);
      if (!br.isArray(value)) {
        value = [];
      }
      for(var i=0; i < value.length; i++) {
        fn.call(this, value[i]);
      }
      return this;
    };

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
    };

    this.takeLast = function(key, defaultValue) {
      return _getLast(key, defaultValue, true);
    };

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
    };

    this.takeFirst = function(key, defaultValue) {
      return _getFirst(key, defaultValue, true);
    };

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
    };

    this.not = function(key) {
      var value = this.get(key);
      if (!br.isBoolean(value)) {
        value = false;
      }
      this.set(key, !value);
      return this;
    };

    this.clear = function() {
      _storage.clear();
      return this;
    };

    this.all = function() {
      var result = {};
      for(var name in _storage) {
        result[name] = this.get(name);
      }
      return result;
    };

    this.remove = function(key, arrayValue) {
      var value = this.get(key);
      if (!br.isEmpty(arrayValue) && br.isArray(value)) {
        var idx = value.indexOf(arrayValue);
        if (idx != -1) {
          value.splice(idx, 1);
        }
        this.set(key, value);
      } else {
        _storage.removeItem(key);
      }
      return this;
    };

    this.indexOf = function(key, arrayValue) {
      var value = this.get(key);
      if (br.isArray(value)) {
        return value.indexOf(arrayValue);
      }
      return -1;
    };

  }

  window.br = window.br || {};

  window.br.storage = new BrStorage(window.localStorage);
  window.br.session = new BrStorage(window.sessionStorage);

})(window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrEventQueue(obj) {

    var _this = this;

    this.subscribers = {};
    this.connections = [];
    this.obj = obj || this;

    this.before = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].before.push(callback);
      }
    };

    this.on = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].on.push(callback);
      }
    };

    this.after = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], before: [], after: [] };
        _this.subscribers[events[i]].after.push(callback);
      }
    };

    this.has = function(eventName) {
      return _this.subscribers.hasOwnProperty(eventName);
    };

    this.connectTo = function(eventQueue) {
      _this.connections.push(eventQueue);
    };

    function trigger(event, pos, args) {

      var result = null;
      var eventSubscribers = _this.subscribers[event];
      var i;

      if (eventSubscribers) {
        switch (pos) {
          case 'before':
            for (i = 0; i < eventSubscribers.before.length; i++) {
              eventSubscribers.before[i].apply(_this.obj, args);
            }
            break;
          case 'on':
            for (i = 0; i < eventSubscribers.on.length; i++) {
              result = eventSubscribers.on[i].apply(_this.obj, args);
            }
            break;
          case 'after':
            for (i = 0; i < eventSubscribers.after.length; i++) {
              eventSubscribers.after[i].apply(_this.obj, args);
            }
            break;
        }
      }

      return result;

    }

    this.triggerEx = function(event, pos, largs) {

      var args = [];
      var i;

      for(i = 0; i < largs.length; i++) {
        args.push(largs[i]);
      }

      if (event != '*') {
        trigger('*', pos, args);
      }

      args.splice(0,1);

      var result = trigger(event, pos, args);

      for (i = 0; i < _this.connections.length; i++) {
        _this.connections[i].triggerEx(event, pos, largs);
      }

      return result;

    };

    this.triggerBefore = function(event) {
      return this.triggerEx(event, 'before', arguments);
    };

    this.trigger = function(event) {
      return this.triggerEx(event, 'on',     arguments);
    };

    this.triggerAfter = function(event) {
      return this.triggerEx(event, 'after',  arguments);
    };

  }

  window.br = window.br || {};

  window.br.eventQueue = function(obj) {
    return new BrEventQueue(obj);
  };

})(window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  window.br = window.br || {};

  window.br.request = new BrRequest();

  function BrRequest() {

    this.continueRoute = true;

    this.get = function(name, defaultValue) {
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

    this.anchor = function(defaultValue) {
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

    this.route = function(path, func) {
      if (this.continueRoute) {
        var l = document.location.toString();
        l = l.replace(/[?].*/, '');
        if (l.search(path) != -1) {
          this.continueRoute = false;
          func.call();
        }
      }
      return this;
    };

  }

})(window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrThread(lazy) {

    var _this = this;

    _this.queue = [];
    _this.workingQueue = [];
    _this.lazy = lazy;

    this.push = function(func) {
      _this.queue.unshift({ func: func });
      if (!_this.lazy) {
        _this.wakeup();
      }
    };

    this.done = function(func) {
      _this.workingQueue.pop();
      _this.wakeup();
    };

    this.clear = function(func) {
      _this.queue = [];
      _this.workingQueue = [];
    };

    this.wakeup = function() {
      if ((_this.queue.length > 0) && (_this.workingQueue.length === 0)) {
        var obj = _this.queue.pop();
        _this.workingQueue.push(obj);
        obj.func(function() {
          _this.done();
        });
      }
    };

  }

  window.br = window.br || {};

  window.br.thread = function(lazy) {
    return new BrThread(lazy);
  };

  var executionThread = br.thread(true);

})(window);
/*
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global console */

;(function ($, window) {

  window.br = window.br || {};

  var baseUrl = '';
  var lookFor = ['vendor/jagermesh/bright/js/bright.min.js', 'vendor/jagermesh/bright/js/bright.js', 'bright/js/bright.min.js', 'bright/js/bright.js'];

  if (typeof(window.br.frameworkUrl) == 'undefined') {

  } else {
    lookFor.push(window.br.frameworkUrl);
  }

  $('script').each(function() {
    if (baseUrl === '') {
      var src = $(this).attr('src');
      if (!br.isEmpty(src)) {
        for(var i in lookFor) {
          var idx = src.indexOf(lookFor[i]);
          if (idx != -1) {
            baseUrl = src.substring(0, idx);
          }
        }
      }
    }
  });

  window.br.baseUrl = baseUrl;

  var logStarted = false;

  window.br.log = function(msg) {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      for(var i in arguments) {
        console.log(arguments[i]);
      }
    }
  };

  window.br.isTouchScreen = function() {
    var ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)) || (/Android/i.test(ua)));
  };

  window.br.isMobileDevice = function() {
    var ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)) || (/Android/i.test(ua)));
  };

  window.br.isiOS = function() {
    var ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)));
  };

  window.br.isiPad = function() {
    var ua = navigator.userAgent;
    return (/iPad/i.test(ua));
  };

  window.br.isiPhone = function() {
    var ua = navigator.userAgent;
    return (/iPhone/i.test(ua));
  };

  window.br.isAndroid = function() {
    var ua = navigator.userAgent;
    return (/android/i.test(ua));
  };

  window.br.isIE = function() {
    return /*@cc_on!@*/false || !!document.documentMode; // At least IE6
  };

  window.br.isOpera = function() {
    return !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  };

  window.br.isFirefox = function() {
    return typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
  };

  window.br.isSafari = function() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  };

  window.br.isChrome = function() {
    return !!window.chrome && !br.isOpera();              // Chrome 1+
  };

  window.br.redirect = function(url) {
    if ((url.search(/^\//) == -1) && (url.search(/^http[s]?:\/\//) == -1)) {
      url = this.baseUrl + url;
    }
    document.location = url;
  };

  window.br.refresh = function() {
    document.location.reload();
  };

  function BrTrn() {
    var trn = [];
    this.get = function (phrase) { if (trn[phrase]) { return trn[phrase]; } else { return phrase; } };
    this.set = function (phrase, translation) { trn[phrase] = translation; return this; };
    return this;
  }

  var brTrn = new BrTrn();

  window.br.trn = function(phrase) {
    if (phrase) {
      return brTrn.get(phrase);
    } else {
      return brTrn;
    }
  };

  window.br.preloadImages = function(images) {
    try {
      var div = document.createElement("div");
      var s = div.style;
      s.position = "absolute";
      s.top = s.left = 0;
      s.visibility = "hidden";
      document.body.appendChild(div);
      div.innerHTML = "<img src=\"" + images.join("\" /><img src=\"") + "\" />";
    } catch(e) {
        // Error. Do nothing.
    }
  };

  window.br.randomInt = function(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.br.forHtml = function(text) {
    if (text) {
      text = text.split('<').join('&lt;').split('>').join('&gt;');
    }
    return text;
  };

  window.br.extend = function(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
  };

  window.br.openPage = function(href) {
    var a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  window.br.openPopup = function(url, target) {

    if (!target) {
      target = '_blank';
    }

    var w, h;

    if (screen.width) {
      if (screen.width >= 1280) {
        w = 1000;
      } else
      if (screen.width >= 1024) {
        w = 800;
      } else {
        w = 600;
      }
    }

    if (screen.height) {
      if (screen.height >= 900) {
        h = 700;
      } else
      if (screen.height >= 800) {
        h = 600;
      } else {
        h = 500;
      }
    }

    var left = (screen.width) ? (screen.width-w)/2 : 0;
    var settings = 'height='+h+',width='+w+',top=20,left='+left+',menubar=0,scrollbars=1,resizable=1';
    var win = window.open(url, target, settings);
    if (win) {
      win.focus();
    }

  };

  function handleModified(element, deferred) {
    var listName1 = 'BrModified_Callbacks2';
    var listName2 = 'BrModified_LastCahange2';
    if (deferred) {
      window.clearTimeout(element.data('BrModified_Timeout'));
      listName1 = 'BrModified_Callbacks1';
      listName2 = 'BrModified_LastCahange1';
    }
    if (element.data(listName2) != element.val()) {
      element.data(listName2, element.val());
      var callbacks = element.data(listName1);
      if (callbacks) {
        for(var i in callbacks) {
          callbacks[i].call(element);
        }
      }
    }
  }

  function handleModified1(element) {
    handleModified(element, false);
    if (element.data('BrModified_Callbacks1')) {
      window.clearTimeout(element.data('BrModified_Timeout'));
      element.data('BrModified_Timeout', window.setTimeout(function() {
        handleModified(element, true);
      }, 1500));
    }
  }

  function setupModified(selector, callback, deferred) {
    $(selector).each(function() {
      if (!$(this).data('br-data-change-callbacks')) {
        $(this).data('br-data-change-callbacks', []);
      }
      var listName = 'BrModified_Callbacks2';
      if (deferred) {
        listName = 'BrModified_Callbacks1';
      }
      var callbacks = $(this).data(listName);
      if (callbacks) {

      } else {
        callbacks = [];
      }
      callbacks.push(callback);
      $(this).data(listName, callbacks);
    });
    $(document).on('change', selector, function() {
      handleModified1($(this));
    });
    $(document).on('keyup', selector, function(e) {
      if (e.keyCode == 13) {
        handleModified($(this), false);
        handleModified($(this), true);
      } else
      if ((e.keyCode == 8) || (e.keyCode == 32)  || (e.keyCode == 91) || (e.keyCode == 93) || ((e.keyCode >= 48) && (e.keyCode <= 90)) || ((e.keyCode >= 96) && (e.keyCode <= 111)) || ((e.keyCode >= 186) && (e.keyCode <= 222))) {
        handleModified1($(this));
      }
    });
  }

  window.br.modifiedDeferred = function(selector, callback) {
    setupModified(selector, callback, true);
  };

  window.br.modified = function(selector, callback) {
    setupModified(selector, callback, false);
  };

  window.br.onChange = function(selector, callback) {
    $(selector).on('change', function() {
      callback.call(this);
    });
    $(selector).on('keyup', function(e) {
      if (e.keyCode == 13) {
        callback.call(this);
      } else
      if ((e.keyCode == 8) || (e.keyCode == 32)  || (e.keyCode == 91) || (e.keyCode == 93) || ((e.keyCode >= 48) && (e.keyCode <= 90)) || ((e.keyCode >= 96) && (e.keyCode <= 111)) || ((e.keyCode >= 186) && (e.keyCode <= 222))) {
        callback.call(this);
      }
    });
  };

  window.br.closeConfirmationMessage = 'Some changes have been made. Are you sure you want to close current window?';

  var closeConfirmationRequired = false;
  var windowUnloading = false;

  function brightConfirmClose() {
    if (closeConfirmationRequired) {
      return br.closeConfirmationMessage;
    } else {
      windowUnloading = true;
    }
  }

  $(window).on('beforeunload', function(){
    return brightConfirmClose();
  });

  window.br.isUnloading = function(value) {
    if (typeof value == 'undefined') {
      return windowUnloading;
    } else {
      windowUnloading = value;
    }
  };

  window.br.isCloseConfirmationRequired = function() {
    return closeConfirmationRequired;
  };

  window.br.confirmClose = function(message) {
    if (message) {
      br.closeConfirmationMessage = message;
    }
    closeConfirmationRequired = true;
    br.events.trigger('closeConfirmationRequested');
  };

  window.br.resetCloseConfirmation = function(message) {
    closeConfirmationRequired = false;
    br.events.trigger('closeConfirmationReset');
  };

  window.br.events = br.eventQueue();

  window.br.backToCaller = function(href, refresh) {

    var inPopup = (window.opener !== null);

    // check opener
    if (inPopup) {
      // is opener still exists?
      if (window.opener) {
        if (!window.opener.closed) {
          window.opener.focus();
          try {
            if (refresh) {
              if (window.opener.document) {
                window.opener.document.location.reload();
              }
            }
          } catch (e) {

          }
        }
      }
      window.close();
    } else
    if (br.request.get('caller')) {
      document.location = br.request.get('caller');
    } else {
      document.location = href;
    }

  };

  window.br.disableBounce = function(container) {

    var $container = container;

    $('body').css('overflow', 'hidden');

    function resize() {
      var h = $(window).height();
      $container.css('height', h + 'px');
      $container.css('overflow', 'auto');
    }

    resize();

    $(window).resize(function() {
      resize();
    });

  };

  window.br.getSelection = function() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
      var sel = window.getSelection();
      if (sel.rangeCount) {
          var container = document.createElement("div");
          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
              container.appendChild(sel.getRangeAt(i).cloneContents());
          }
          html = container.innerHTML;
      }
    } else if (typeof document.selection != "undefined") {
      if (document.selection.type == "Text") {
          html = document.selection.createRange().htmlText;
      }
    }
    return html;
  };

  var ctx;

  window.br.beep = function(callback) {

    try {
      var duration = 0.1;
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      if (!ctx) {
        ctx = new AudioContext();
      }
      var osc = ctx.createOscillator();
      osc.type = 0;
      osc.connect(ctx.destination);
      var now = ctx.currentTime;
      if(osc.start) {
        osc.start(now);
        osc.stop(now + duration);
      } else {
        osc.noteOn(now);
        osc.noteOff(now + duration);
      }

      osc.onended = function() {
        if(callback){
          callback();
        }
      };
    } catch (error) {
      br.log(error);
    }

  };

  window.br.do = function(f) {
    f.call();
  };

  /* jshint ignore:start */
  window.br.load = window.br.resourceLoader = function(j){function p(c,a){var g=j.createElement(c),b;for(b in a)a.hasOwnProperty(b)&&g.setAttribute(b,a[b]);return g}function m(c){var a=k[c],b,e;if(a)b=a.callback,e=a.urls,e.shift(),h=0,e.length||(b&&b.call(a.context,a.obj),k[c]=null,n[c].length&&i(c))}function u(){if(!b){var c=navigator.userAgent;b={async:j.createElement("script").async===!0};(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}}function i(c,
    a,g,e,h){var i=function(){m(c)},o=c==="css",f,l,d,q;u();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||b.async||b.gecko||b.opera)n[c].push({urls:a,callback:g,obj:e,context:h});else{f=0;for(l=a.length;f<l;++f)n[c].push({urls:[a[f]],callback:f===l-1?g:null,obj:e,context:h})}if(!k[c]&&(q=k[c]=n[c].shift())){r||(r=j.head||j.getElementsByTagName("head")[0]);a=q.urls;f=0;for(l=a.length;f<l;++f)g=a[f],o?d=b.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(d=p("script",{src:g}),d.async=!1),d.className=
    "lazyload",d.setAttribute("charset","utf-8"),b.ie&&!o?d.onreadystatechange=function(){if(/loaded|complete/.test(d.readyState))d.onreadystatechange=null,i()}:o&&(b.gecko||b.webkit)?b.webkit?(q.urls[f]=d.href,s()):(d.innerHTML='@import "'+g+'";',m("css")):d.onload=d.onerror=i,r.appendChild(d)}}function s(){var c=k.css,a;if(c){for(a=t.length;--a>=0;)if(t[a].href===c.urls[0]){m("css");break}h+=1;c&&(h<200?setTimeout(s,50):m("css"))}}var b,r,k={},h=0,n={css:[],js:[]},t=j.styleSheets;return{css:function(c,
    a,b,e){i("css",c,a,b,e)},js:function(c,a,b,e){i("js",c,a,b,e)}}}(document);
  /* jshint ignore:end */

})(jQuery, window);
/*
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrFlagsHolder(permanent, name) {

    var flags = [];

    this.append = function(id) {
      if (permanent) {
        br.storage.appendUnique(name, id);
      } else
      if (this.isFlagged(id)) {
      } else {
        flags.push(id);
      }
    };

    this.isFlagged = function(id) {
      if (permanent) {
        return (br.storage.indexOf(name, id) != -1);
      } else {
        return (flags.indexOf(id) != -1);
      }
    };

    this.remove = function(id) {
      if (permanent) {
        br.storage.remove(name, id);
      } else {
        var idx = flags.indexOf(id);
        if (idx != -1) {
          flags.splice(idx, 1);
        }
      }
    };

    this.clear = function() {
      this.replace([]);
    };

    this.replace = function(values) {
      if (permanent) {
        return br.storage.set(name, values);
      } else {
        flags = values;
        return flags;
      }
    };

    this.get = function() {
      if (permanent) {
        return br.storage.get(name, []);
      } else {
        return flags;
      }
    };

  }

  window.br = window.br || {};

  window.br.flagsHolder = function (permanent, name) {
    return new BrFlagsHolder(permanent, name);
  };

})(window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

/* global TAFFY */

;(function ($, window) {

  function BrDataSource(restServiceUrl, options) {

    var _this = this;

    this.ajaxRequest = null;
    this.name = '-';
    this.options = options || {};
    this.options.restServiceUrl = restServiceUrl;
    this.options.refreshDelay = this.options.refreshDelay || 1500;
    if (this.options.restServiceUrl.charAt(this.options.restServiceUrl.length-1) != '/') {
      this.options.restServiceUrl = this.options.restServiceUrl + '/';
    }

    if (this.options.offlineMode) {
      this.db = TAFFY();
      this.db.store('taffy-db-' + this.name);
    }

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.insert = function(item, callback, options) {

      var disableEvents = options && options.disableEvents;

      function returnInsert(data) {

        var result;

        if (_this.options.crossdomain) {
          if (typeof data == 'string') {
            result = false;
            _this.events.trigger('error', 'insert', data.length > 0 ? data : 'Empty response. Was expecting new created records with ROWID.');
          } else {
            result = true;
            if (!disableEvents) {
              _this.events.trigger('insert', data);
            }
          }
        } else {
          if (data) {
            result = true;
            if (!disableEvents) {
              _this.events.trigger('insert', data);
            }
          } else {
            result = false;
            _this.events.trigger('error', 'insert', 'Empty response. Was expecting new created records with ROWID.');
          }
        }
        if (!disableEvents) {
          _this.events.triggerAfter('insert', result, data, request);
          if (result) {
            _this.events.trigger('change', 'insert', data);
          }
        }
        if (typeof callback == 'function') { callback.call(_this, result, data, request); }

      }

      var request = item;

      try {

        _this.events.triggerBefore('insert', request);

        if (this.options.crossdomain) {
          request.crossdomain = 'put';
        }

        if (_this.options.offlineMode) {
          _this.db.insert(request);
          request.rowid = request.___id;
          request.syncState = 'n';
          returnInsert(request);
        } else {
          $.ajax({ type: this.options.crossdomain ? 'GET' : 'PUT'
                 , data: request
                 , dataType: this.options.crossdomain ? 'jsonp' : 'json'
                 , url: this.options.restServiceUrl + (this.options.authToken ? '?token=' + this.options.authToken : '')
                 , success: function(response) {
                     returnInsert(response);
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (br.isUnloading()) {

                     } else {
                       var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       if (!disableEvents) {
                         _this.events.trigger('error', 'insert', errorMessage);
                         _this.events.triggerAfter('insert', false, errorMessage, request);
                       }
                       if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                     }
                   }
                 });
        }

      } catch (error) {
        br.log(error);
        if (!disableEvents) {
          _this.events.trigger('error', 'insert', error);
          _this.events.triggerAfter('insert', false, error, request);
        }
        if (typeof callback == 'function') { callback.call(_this, false, error, request); }
      }

      return this;

    };

    this.update = function(rowid, item, callback, options) {

      var disableEvents = options && options.disableEvents;

      function returnUpdate(data) {
        var operation = 'update';
        if (data) {
          var res = _this.events.trigger('removeAfterUpdate', item, data);
          if ((res !== null) && res) {
            operation = 'remove';
            if (!disableEvents) {
              _this.events.trigger('remove', rowid);
            }
          } else {
            if (!disableEvents) {
              _this.events.trigger('update', data, rowid);
            }
          }
        }
        if (!disableEvents) {
          _this.events.triggerAfter(operation, true, data, request);
          _this.events.trigger('change', operation, data);
        }
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = item;

      if (!disableEvents) {
        _this.events.triggerBefore('update', request, rowid);
      }

      if (_this.options.offlineMode) {
        _this.db({rowid: rowid}).update(request);
        returnUpdate(request);
      } else {
        $.ajax({ type: 'POST'
               , data: request
               , dataType: 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnUpdate(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     if (!disableEvents) {
                       _this.events.trigger('error', 'update', errorMessage);
                       _this.events.triggerAfter('update', false, errorMessage, request);
                     }
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });
      }

      return this;

    };

    this.remove = function(rowid, callback) {

      function returnRemove(data) {
        _this.events.trigger('remove', rowid);
        _this.events.triggerAfter('remove', true, data, request);
        _this.events.trigger('change', 'remove', data);
        if (typeof callback == 'function') { callback.call(_this, true, data, request); }
      }

      var request = {};

      _this.events.triggerBefore('remove', null, rowid);

      if (_this.options.offlineMode) {
        var data = _this.db({rowid: rowid}).get();
        _this.db({rowid: rowid}).remove();
        returnRemove(data);
      } else {
        $.ajax({ type: 'DELETE'
               , data: request
               , dataType: 'json'
               , url: this.options.restServiceUrl + rowid + (this.options.authToken ? '?token=' + this.options.authToken : '')
               , success: function(response) {
                   returnRemove(response);
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (br.isUnloading()) {

                   } else {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     _this.events.trigger('error', 'remove', errorMessage);
                     _this.events.triggerAfter('remove', false, errorMessage, request);
                     if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                   }
                 }
               });
      }

      return this;

    };

    this.selectCount = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
      }

      var newFilter = {};
      for(var i in filter) {
        newFilter[i] = filter[i];
      }
      newFilter.__result = 'count';

      options = options || {};
      options.selectCount = true;

      this.select(newFilter, callback, options);

      return this;

    };

    function handleSelectError(error, request, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectOne = options && options.selectOne;

      if (!disableEvents) {
        _this.events.trigger('error', 'select', error);
        _this.events.triggerAfter('select', false, error, request);
      }
      if (typeof callback == 'function') { callback.call(_this, false, error, request); }
    }

    function handleSelectSuccess(response, request, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectCount = options && options.selectCount;
      var selectOne = options && (options.selectOne || options.selectCount);

      if (selectOne && br.isArray(response)) {
        if (response.length > 0) {
          response = response[0];
        } else {
          handleSelectError('Record not found', request, callback, options);
          return;
        }
      } else
      if (!selectOne && !br.isArray(response)) {
        response = [response];
      }
      if (selectCount) {
        response = parseInt(response);
      }
      if (!disableEvents) {
        _this.events.trigger('select', response);
        _this.events.triggerAfter('select', true, response, request);
      }
      if (typeof callback == 'function') { callback.call(_this, true, response, request); }
    }

    this.selectOne = function(filter, callback, options) {

      if (br.isFunction(filter)) {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };
      options.selectOne = true;
      options.limit = 1;

      if (!br.isEmpty(filter)) {
        if (!br.isNumber(filter) && !br.isObject(filter)) {
          handleSelectError('Unacceptable filter parameters', filter, callback, options);
          return this;
        } else {
          if (br.isNumber(filter)) {
            return this.select({ rowid: filter }, callback, options);
          } else {
            return this.select(filter, callback, options);
          }
        }
      } else {
        return this.select(filter, callback, options);
      }

    };

    this.select = function(filter, callback, options) {

      var request = {};
      var requestRowid;

      if (br.isFunction(filter)) {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;
      var selectOne = options && options.selectOne;

      if (selectOne) {
        options.limit = 1;
      }

      if (!br.isEmpty(filter)) {
        if (!br.isNumber(filter) && !br.isObject(filter)) {
          handleSelectError('Unacceptable filter parameters', filter, callback, options);
          return this;
        } else {
          if (br.isNumber(filter)) {
            filter = { rowid: filter };
          }
          for(var name in filter) {
            if ((name == 'rowid') && selectOne) {
              requestRowid = filter[name];
            } else {
              request[name] = filter[name];
            }
          }
        }
      }

      var url = this.options.restServiceUrl;
      if (selectOne && requestRowid) {
        url = url + requestRowid;
      }

      var proceed = true;

      if (!disableEvents) {
        try {
          _this.events.triggerBefore('select', request, options);
        } catch(e) {
          br.log(e);
          proceed = false;
        }
      }

      if (proceed) {
        if (!br.isEmpty(this.options.limit)) {
          request.__limit = this.options.limit;
        }

        if (options && !br.isEmpty(options.skip)) {
          request.__skip = options.skip;
        }

        if (options && !br.isEmpty(options.limit)) {
          request.__limit = options.limit;
        }

        if (options && options.fields) {
          request.__fields = options.fields;
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (options && options.renderMode) {
          request.__renderMode = options.renderMode;
        }

        if (options && options.order) {
          request.__order = options.order;
        }

        if (options && options.page) {
          request.__page = options.page;
        }

        if (this.options.crossdomain) {
          request.crossdomain = 'get';
        }

        if (_this.options.offlineMode) {
          handleSelectSuccess(_this.db(request).get(), request, callback, options);
        } else {
          this.ajaxRequest = $.ajax({ type: 'GET'
                                    , data: request
                                    , dataType: this.options.crossdomain ? 'jsonp' : 'json'
                                    , url: url + (this.options.authToken ? '?token=' + this.options.authToken : '')
                                    , success: function(response) {
                                        _this.ajaxRequest = null;
                                        if (_this.options.crossdomain && (typeof response == 'string')) {
                                          handleSelectError('Unknown error', request, callback, options);
                                        } else
                                        if (br.isNull(response)) {
                                          handleSelectError('Unknown error', request, callback, options);
                                        } else {
                                          handleSelectSuccess(response, request, callback, options);
                                        }
                                      }
                                    , error: function(jqXHR, textStatus, errorThrown) {
                                        if (br.isUnloading()) {

                                        } else {
                                          _this.ajaxRequest = null;
                                          var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                                          handleSelectError(errorMessage, request, callback, options);
                                        }
                                      }
                                    });
        }
      } else {

      }

      return this;

    };

    this.requestInProgress = function() {

      return (this.ajaxRequest !== null);

    };

    this.abortRequest = function() {

      if (this.ajaxRequest !== null) {
        this.ajaxRequest.abort();
      }
      return this;

    };

    this.invoke = function(method, params, callback) {

      var request = { };

      if (typeof params == 'function') {
        callback = params;
      } else {
        request = params;
      }

      _this.events.triggerBefore(method, request);

      if (this.options.crossdomain) {
        request.crossdomain = 'post';
      }

      $.ajax({ type: this.options.crossdomain ? 'GET' : 'POST'
             , data: request
             , dataType: this.options.crossdomain ? 'jsonp' : 'json'
             , url: this.options.restServiceUrl + method + (this.options.authToken ? '?token=' + this.options.authToken : '')
             , success: function(response) {
                 if (_this.options.crossdomain && (typeof response == 'string')) {
                   _this.events.trigger('error', method, response);
                   _this.events.triggerAfter(method, false, response, request);
                   if (typeof callback == 'function') { callback.call(_this, false, response, request); }
                 } else {
                   _this.events.trigger(method, response, params);
                   _this.events.triggerAfter(method, true, response, request);
                   if (typeof callback == 'function') { callback.call(_this, true, response, request); }
                 }
               }
             , error: function(jqXHR, textStatus, errorThrown) {
                 if (br.isUnloading()) {

                 } else {
                   var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                   _this.events.trigger('error', method, errorMessage);
                   _this.events.triggerAfter(method, false, errorMessage, request);
                   if (typeof callback == 'function') { callback.call(_this, false, errorMessage, request); }
                 }
               }
             });

      return this;

    };

    this.fillCombo = function(selector, data, options) {

      options = options || { };

      var valueField = options.valueField || 'rowid';
      var nameField = options.nameField || 'name';
      var hideEmptyValue = options.hideEmptyValue || false;
      var emptyValue = options.emptyValue || '--any--';
      var selectedValue = options.selectedValue || null;
      var selectedValueField = options.selectedValueField || null;

      $(selector).each(function() {
        var val = $(this).val();
        if (br.isEmpty(val)) {
          val = $(this).attr('data-value');
          $(this).removeAttr('data-value');
        }
        $(this).html('');
        var s = '';
        if (!hideEmptyValue) {
          s = s + '<option value="">' + emptyValue + '</option>';
        }
        for(var i in data) {
          if (!selectedValue && selectedValueField) {
            if (data[i][selectedValueField] == '1') {
              selectedValue = data[i][valueField];
            }
          }
          s = s + '<option value="' + data[i][valueField] + '">' + data[i][nameField] + '</option>';
        }
        $(this).html(s);
        if (!br.isEmpty(selectedValue)) {
          val = selectedValue;
        }
        if (!br.isEmpty(val)) {
          $(this).find('option[value=' + val +']').attr('selected', 'selected');
        }
      });

    };

    var refreshTimeout;

    this.deferredSelect = function(filter, callback, msec) {

      msec = msec || this.options.refreshDelay;
      var savedFilter = {};
      for(var i in filter) {
        savedFilter[i] = filter[i];
      }
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(function() {
        _this.select(savedFilter, callback);
      }, msec);

    };

  }

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var _this = this;

    this.selector = selector;
    this.options = options || {};
    this.options.templates = this.options.templates || {};
    this.options.templates.row = $(rowTemplate).html();
    this.options.templates.groupRow = this.options.templates.groupRow ? $(this.options.templates.groupRow).html() : '';
    this.options.templates.header = this.options.templates.header ? $(this.options.templates.header).html() : '';
    this.options.templates.footer = this.options.templates.footer ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData = this.options.templates.noData ? $(this.options.templates.noData).html() : '';
    this.options.dataSource = dataSource;
    this.options.selectors = this.options.selectors || {};
    this.options.selectors.header = this.options.selectors.header || this.options.headersSelector || this.selector;
    this.options.selectors.footer = this.options.selectors.footer || this.options.footersSelector || this.selector;
    this.options.selectors.remove = this.options.selectors.remove || this.options.deleteSelector  || '.action-delete';

    this.dataSource = this.options.dataSource;
    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname + ':' + this.dataSource.options.restServiceUrl;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    var noMoreData = false;

    _this.loadingMoreData = false;

    this.after('insert', function(data) {
      _this.events.trigger('change', data, 'insert');
      _this.events.triggerAfter('change', data, 'insert');
    });

    this.after('update', function(data) {
      _this.events.trigger('change', data, 'update');
      _this.events.triggerAfter('change', data, 'update');
    });

    this.after('remove', function(data) {
      _this.events.trigger('change', data, 'remove');
      _this.events.triggerAfter('change', data, 'remove');
    });

    var disconnected = false;

    this.setStored = function(name, value) {
      br.storage.set(this.storageTag + 'stored:' + name, value);
    };

    this.getStored = function(name, defaultValue) {
      return br.storage.get(this.storageTag + 'stored:' + name, defaultValue);
    };

    this.disconnectFromDataSource = function() {
      disconnected = true;
    };

    this.reconnectWithDataSource = function() {
      disconnected = false;
    };

    this.renderHeader = function(data) {
      data = _this.events.trigger('renderHeader', data) || data;
      return $(br.fetch(_this.options.templates.header, data));
    };

    this.renderFooter = function(data) {
      data = _this.events.trigger('renderFooter', data) || data;
      return $(br.fetch(_this.options.templates.footer, data));
    };

    this.renderRow = function(data) {
      data = _this.events.trigger('renderRow', data) || data;
      var result = $(br.fetch(_this.options.templates.row, data));
      result.data('data-row', data);
      return result;
    };

    this.renderGroupRow = function(data) {
      data = _this.events.trigger('renderGroupRow', data) || data;
      var result = $(br.fetch(_this.options.templates.groupRow, data));
      result.data('data-row', data);
      return result;
    };

    this.prepend = function(row) {
      return $(_this.selector).prepend(row);
    };

    this.append = function(row) {
      return $(_this.selector).append(row);
    };

    this.insertDataRowAfter = function(row, selector) {
      var tableRow = _this.renderRow(row);
      $(tableRow).insertAfter(selector);
      return tableRow;
    };

    this.addDataRow = function(row) {
      var tableRow = _this.renderRow(row);
      _this.events.triggerBefore('insert', row, tableRow);
      _this.events.trigger('insert', row, tableRow);
      if (_this.options.appendInInsert) {
        _this.append(tableRow);
      } else {
        _this.prepend(tableRow);
      }
      _this.events.triggerAfter('renderRow', row, tableRow);
      _this.events.triggerAfter('insert', row, tableRow);
      return tableRow;
    };

    this.hasRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      return (row.length > 0);
    };

    this.reloadRow = function(rowid, callback, options) {
      if (!br.isEmpty(callback)) {
        if (!br.isFunction(callback)) {
          options = callback;
          callback = null;
        }
      }
      options = options || { };
      options.disableEvents = true;
      _this.dataSource.selectOne(rowid, function(result, response) {
        if (result) {
          if (_this.refreshRow(response, options)) {

          } else {
            if (_this.isEmpty()) {
              $(_this.selector).html('');
            }
            _this.addDataRow(response);
          }
          if (typeof callback == 'function') { callback.call(_this, response); }
        }
      }, options);
    };

    function checkForEmptyGrid() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        $(_this.selector).html(_this.options.templates.noData);
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      }
    }

    this.removeRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        checkForEmptyGrid();
        _this.events.triggerAfter('remove', rowid, row);
      } else {
        _this.dataSource.select();
      }
    };

    this.refresh = function(callback) {
      _this.dataSource.select(function() {
        if (callback) {
          callback();
        }
      });
    };

    this.refreshRow = function(data, options) {
      var filter = '[data-rowid=' + data.rowid + ']';
      if (options && options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      var row = $(_this.selector).find(filter);
      if (row.length > 0) {
        var ctrl = _this.renderRow(data);
        _this.events.triggerBefore('update', data);
        var $row0 = $(row[0]);
        _this.events.trigger('update', data, $row0);
        $row0.replaceWith(ctrl);
        $row0.data('data-row', data);
        _this.events.triggerAfter('renderRow', data, ctrl);
        _this.events.triggerAfter('update', data, ctrl);
        return true;
      } else {
        return false;
      }
    };

    this.getOrder = function() {
      var order = _this.getOrderAndGroup();
      var result = {};
      if (br.isArray(order)) {
        for(var i = 0; i < order.length; i++) {
          if (order[i].asc) {
            result[order[i].fieldName] = 1;
          } else {
            result[order[i].fieldName] = -1;
          }
        }
      }
      return result;
    };

    this.setOrder = function(order) {
      var orderAndGroup = [];
      for(var name in order) {
        orderAndGroup.push({ fieldName: name, asc: order[name] > 0, group: false, index: orderAndGroup.length });
      }
      return order;
    };

    this.setOrderAndGroup = function(order) {
      br.storage.set(this.storageTag + 'orderAndGroup', order);
      return order;
    };

    this.getOrderAndGroup = function() {
      var result = br.storage.get(this.storageTag + 'orderAndGroup', []);
      if (br.isEmpty(result) || !br.isArray(result)) {
        result = [];
      }
      return result;
    };

    this.isOrderConfigured = function() {
      var orderAndGroup = _this.getOrderAndGroup();
      return br.isArray(orderAndGroup) && (orderAndGroup.length > 0);
    };

    this.loadMore = function(callback) {
      if (noMoreData || _this.loadingMoreData) {

      } else {
        _this.loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          if (typeof callback == 'function') { callback.call(_this, result, response); }
          _this.loadingMoreData = false;
        }, { loadingMore: true });
      }
    };

    this.isEmpty = function() {
      return ($(_this.selector).find('[data-rowid]').length === 0);
    };

    this.getKeys = function(attrName) {
      var result = [];
      if (!attrName) {
        attrName = 'data-rowid';
      }
      $('[' + attrName + ']', $(_this.selector)).each(function() {
        result.push(br.toInt($(this).attr(attrName)));
      });
      return result;
    };

    this.init = function() {

      var savedOrder = _this.getOrderAndGroup();
      if (!br.isArray(savedOrder) || (savedOrder.length === 0)) {
        if (_this.options.defaultOrderAndGroup) {
          _this.setOrderAndGroup(_this.options.defaultOrderAndGroup);
        }
      }

      function showOrder(orderAndGroup) {
        for(var i = 0; i < orderAndGroup.length; i++) {
          var ctrl = $('.sortable[data-field="' + orderAndGroup[i].fieldName + '"].' + (orderAndGroup[i].asc ? 'order-asc' : 'order-desc'), $(_this.options.selectors.header));
          ctrl.addClass('icon-white').addClass('icon-border');
          var idx = ctrl.parent().find('div.br-sort-index');
          if (orderAndGroup.length > 1) {
            if (idx.length > 0) {
              idx.text(i + 1);
            } else {
              ctrl.parent().append($('<div class="br-sort-index">' + (i + 1) + '</div>'));
            }
          }
        }
      }

      showOrder(_this.getOrderAndGroup());

      $(this.options.selectors.header).on('click', '.sortable', function(event) {
        var sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border'));
        if (!event.metaKey) {
          $('.sortable', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border');
          $('.br-sort-index', $(_this.options.selectors.header)).remove();
        }
        if (sorted) {
          $(this).removeClass('icon-white').removeClass('icon-border');
        } else {
          $(this).siblings('i').removeClass('icon-white').removeClass('icon-border');
          $(this).addClass('icon-white').addClass('icon-border');
        }
        var orderAndGroup;
        var fieldName = $(this).attr('data-field');
        var newOrder = { fieldName: fieldName, asc: $(this).hasClass('order-asc'), group: $(this).hasClass('group-by') };
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          orderAndGroup = _this.getOrderAndGroup();
          var newOrderAndGroup = [];
          for(var i = 0; i < orderAndGroup.length; i++) {
            if (orderAndGroup[i].fieldName != fieldName) {
              newOrderAndGroup.push(orderAndGroup[i]);
            }
          }
          orderAndGroup = newOrderAndGroup;
        } else {
          orderAndGroup = [];
        }
        if (!sorted) {
          orderAndGroup.push(newOrder);
        }
        showOrder(orderAndGroup);
        _this.setOrderAndGroup(orderAndGroup);
        _this.events.triggerBefore('changeOrder', orderAndGroup);
        _this.dataSource.select();
      });

      if (_this.dataSource) {

        _this.dataSource.before('select', function(request, options) {
          options.order = _this.getOrder();
          if (!_this.loadingMoreData) {
            // $(_this.selector).html('');
            // $(_this.selector).addClass('progress-big');
          }
        });

        _this.dataSource.after('select', function(result, response, request) {
          $(_this.selector).removeClass('progress-big');
          if (result) {
            noMoreData = (response.length === 0);
            if (!disconnected) {
              _this.render(response, _this.loadingMoreData);
            }
          }
        });

        _this.dataSource.after('insert', function(success, response) {
          if (success) {
            if (_this.isEmpty()) {
              $(_this.selector).html(''); // to remove No-Data box
            }
            _this.addDataRow(response);
          }
        });

        _this.dataSource.on('update', function(data) {
          if (_this.refreshRow(data)) {

          } else {
            _this.dataSource.select();
          }
        });

        _this.dataSource.on('remove', function(rowid) {
          _this.removeRow(rowid);
        });

        if (this.options.selectors.remove) {
          $(_this.selector).on('click', this.options.selectors.remove, function() {
            var row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              var rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm( 'Delete confirmation'
                          , 'Are you sure you want to delete this record?'
                          , function() {
                              _this.dataSource.remove(rowid);
                            }
                          );
              }
            }
          });
        }

      }

    };

    this.render = function(data, loadingMoreData) {
      var $selector = $(_this.selector);
      _this.events.triggerBefore('change', data, 'render');
      if (data) {
        var i, j, k;
        if (!loadingMoreData) {
          $selector.html('');
        }
        if (_this.options.freeGrid) {
          data = data[0];
          if (data.headers) {
            for (i in data.headers) {
              if (data.headers[i]) {
                $(_this.options.selectors.header).append(_this.renderHeader(data.headers[i]));
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                $(_this.options.selectors.footer).append(_this.renderFooter(data.headers[i]));
              }
            }
          }
          $(_this.options.selectors.header).html('');
          $(_this.options.selectors.footer).html('');
          if (data.rows) {
            if (data.rows.length === 0) {
              $selector.html(this.options.templates.noData);
            } else {
              for (i in data.rows) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    $selector.append(_this.renderRow(data.rows[i].row));
                  }
                  if (data.rows[i].header) {
                    $(_this.options.selectors.header).append(_this.renderHeader(data.rows[i].header));
                  }
                  if (data.rows[i].footer) {
                    $(_this.options.selectors.footer).append(_this.renderFooter(data.rows[i].footer));
                  }
                }
              }
            }
          } else {
            $selector.html(this.options.templates.noData);
          }
        } else {
          if (data && (data.length > 0)) {
            var group = _this.getOrderAndGroup();
            var groupValues = {};
            var groupFieldName = '';
            var $row;
            for (i in data) {
              if (data[i]) {
                if (br.isArray(group)) {
                  for(k = 0; k < group.length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      for(j = k; j < group.length; j++) {
                        groupFieldName = group[j].fieldName;
                        groupValues[groupFieldName] = undefined;
                      }
                      break;
                    }
                  }
                  for(k = 0; k < group.length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      groupValues[groupFieldName] = data[i][groupFieldName];
                      var tmp = data[i];
                      tmp.__groupBy = {};
                      tmp.__groupBy.__field = groupFieldName;
                      tmp.__groupBy.__value = data[i][groupFieldName];
                      tmp.__groupBy[groupFieldName] = true;
                      $selector.append(_this.renderGroupRow(tmp));
                    }
                  }
                }
                $row = _this.renderRow(data[i]);
                $selector.append($row);
                _this.events.triggerAfter('renderRow', data[i], $row);
              }
            }
          } else
          if (!loadingMoreData) {
            $selector.html(this.options.templates.noData);
          }
        }
      } else {
        $selector.html(this.options.templates.noData);
      }
      _this.events.trigger('change', data, 'render');
      _this.events.triggerAfter('change', data, 'render');
    };

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataGrid = function (selector, rowTemplate, dataSource, options) {
    return new BrDataGrid(selector, rowTemplate, dataSource, options);
  };

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataCombo(selector, dataSource, options) {

    var _this = this;

    this.selector = $(selector);

    this.dataSource = dataSource;

    this.options = options || {};
    this.options.valueField = this.options.valueField || 'rowid';
    this.options.nameField = this.options.nameField || 'name';
    this.options.levelField = this.options.levelField || null;
    this.options.selectedValue = this.options.selectedValue || null;
    this.options.skipTranslate = this.options.skipTranslate || null;
    this.options.selectedValueField = this.options.selectedValueField || null;
    this.options.hideEmptyValue = this.options.hideEmptyValue || (this.selector.attr('multiple') == 'multiple');
    this.options.emptyName = (typeof this.options.emptyName == 'undefined' ? '--any--' : this.options.emptyName);
    this.options.emptyValue = (typeof this.options.emptyValue == 'undefined' ? '' : this.options.emptyValue);
    this.options.allowClear = (typeof this.options.allowClear == 'undefined' ? false : this.options.allowClear);
    this.loaded = false;

    if (this.options.skipTranslate) {
      this.selector.addClass('skiptranslate');
    }

    this.fields = this.options.fields || {};
    this.saveSelection = this.options.saveSelection || false;
    this.saveToSessionStorage = this.options.saveToSessionStorage || false;
    this.selectedValueField = this.options.selectedValueField || null;
    this.noDecoration = this.options.noDecoration;// || (this.selector.attr('multiple') == 'multiple');

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname;

    if (this.dataSource) {
      this.storageTag = this.storageTag + ':' + this.dataSource.options.restServiceUrl;
    }

    this.isValid = function() {
      return _this.selector.length > 0;
    };

    this.isLoaded = function() {
      return _this.loaded;
    };

    this.hasOptions = function() {
      return (_this.selector.find('option').length > 0);
    };

    this.optionsAmount = function() {
      return _this.selector.find('option').length;
    };

    this.getFirstAvailableValue = function() {
      var result = null;
      _this.selector.find('option').each(function() {
        if (!br.isEmpty($(this).val())) {
          if (br.isEmpty(result)) {
            result = $(this).val();
          }
        }
      });
      return result;
    };

    function storageTag(c) {
      var result = _this.storageTag;
      result = result + ':filter-value';
      if (!br.isEmpty($(c).attr('id'))) {
        result = result + ':' + $(c).attr('id');
      } else
      if (!br.isEmpty($(c).attr('name'))) {
        result = result + ':' + $(c).attr('name');
      }
      if (!br.isEmpty($(c).attr('data-storage-key'))) {
        result = result + ':' + $(c).attr('data-storage-key');
      }
      return result;
    }

    function uiSync() {
      if (_this.isValid() && window.Select2 && !_this.noDecoration && !_this.selector.attr('size')) {
        var params = {};
        if (_this.options.skipTranslate) {
          params.dropdownCssClass = 'skiptranslate';
        }
        if (_this.options.allowClear) {
          params.allowClear = _this.options.allowClear;
          params.placeholder = _this.options.emptyName;
        }
        _this.selector.select2(params);
      }
    }

    var currentData = [];

    this.selected = function(fieldName) {
      if (br.isArray(currentData)) {
        if (currentData.length > 0) {
          var val = this.val();
          if (!br.isEmpty(val)) {
            for(var i = 0; i < currentData.length; i++) {
              if (br.toInt(currentData[i][_this.options.valueField]) == br.toInt(val)) {
                if (br.isEmpty(fieldName)) {
                  return currentData[i];
                } else {
                  return currentData[i][fieldName];
                }
              }
            }
          }
        }
      }
    };

    this.val = function(value) {
      if (value !== undefined) {
        if (_this.saveSelection) {
          if (_this.saveToSessionStorage) {
            br.session.set(storageTag(_this.selector), value);
          } else {
            br.storage.set(storageTag(_this.selector), value);
          }
        }
        if (_this.isValid()) {
          _this.selector.val(value);
          uiSync();
        }
      }
      if (_this.isValid()) {
        var val =_this.selector.val();
        if (val !== null) {
          return val;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };

    this.valOrNull = function() {
      if (_this.isValid()) {
        var val = this.val();
        return br.isEmpty(val) ? null : val;
      } else {
        return undefined;
      }
    };

    this.reset = function(triggerChange) {
      br.storage.remove(storageTag(this.selector));
      br.session.remove(storageTag(this.selector));
      if (_this.isValid()) {
        this.selector.val('');
        if (triggerChange) {
          _this.selector.trigger('change');
        } else {
          uiSync();
        }
      }
    };

    this.selector.on('reset', function() {
      _this.reset();
    });

    function getName(data) {

      if (br.isFunction(_this.options.onGetName)) {
        return _this.options.onGetName.call(this, data);
      } else {
        return data[_this.options.nameField];
      }

    }

    function renderRow(data) {

      var s = '';
      if (!br.isEmpty(_this.options.groupField) && br.toInt(data[_this.options.groupField]) > 0) {
        s = s + '<optgroup';
      } else {
        s = s + '<option';
      }
      s = s + ' value="' + data[_this.options.valueField] + '"';
      if (!br.isEmpty(_this.options.disabledField) && br.toInt(data[_this.options.disabledField]) > 0) {
        s = s + ' disabled="disabled"';
      }
      s = s + '>';
      if (!br.isEmpty(_this.options.levelField)) {
        var margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for (var k = 0; k < margin; k++) {
          s = s + '&nbsp;';
        }
      }
      s = s + getName(data);
      if (!br.isEmpty(_this.options.groupField) && br.toInt(data[_this.options.groupField]) > 0) {
        s = s + '</optgroup>';
      } else {
        s = s + '</option>';
      }

      return s;

    }

    function render(data) {

      currentData = data;

      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
          _this.options.selectedValue = br.session.get(storageTag(_this.selector));
        } else {
          _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
        }
      }

      _this.selector.each(function() {
        var val = $(this).val();
        if (br.isEmpty(val)) {
          val = $(this).attr('data-value');
          $(this).removeAttr('data-value');
        }
        $(this).html('');

        var s = '';
        var cbObj = {};
        cbObj.data = data;
        if (_this.options.hideEmptyValue || (_this.options.autoSelectSingle && (data.length == 1))) {

        } else {
          cbObj.s = s;
          _this.events.triggerBefore('generateEmptyOption', cbObj, $(this));
          s = cbObj.s;
          if (_this.options.allowClear) {
            s = s + '<option></option>';
          } else {
            s = s + '<option value="' + _this.options.emptyValue + '">' + _this.options.emptyName + '</option>';
          }
        }

        cbObj.s = s;
        _this.events.triggerBefore('generateOptions', cbObj, $(this));
        s = cbObj.s;

        for(var i = 0; i < data.length; i++) {
          s = s + renderRow(data[i]);
          if (br.isEmpty(_this.options.selectedValue) && !br.isEmpty(_this.options.selectedValueField)) {
            var selectedValue = data[i][_this.options.selectedValueField];
            if ((br.isBoolean(selectedValue) && selectedValue) || (br.toInt(selectedValue) == 1)) {
              _this.options.selectedValue = data[i][_this.options.valueField];
            }
          }
        }
        $(this).html(s);

        if (!br.isEmpty(_this.options.selectedValue)) {
          $(this).find('option[value=' + _this.options.selectedValue +']').attr('selected', 'selected');
        } else
        if (!br.isEmpty(val)) {
          if (br.isArray(val)) {
            for (var k = 0; k < val.length; k++) {
              $(this).find('option[value=' + val[k] +']').attr('selected', 'selected');
            }
          } else {
            $(this).find('option[value=' + val +']').attr('selected', 'selected');
          }
        }

      });

      uiSync();

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      if (_this.dataSource) {
        if (_this.isValid()) {
          _this.dataSource.select(filter, function(result, response) {
            if (result) {
              if (callback) {
                callback.call(_this.selector, result, response);
              }
              uiSync();
              _this.loaded = true;
            }
          }, { fields: _this.fields });
        } else {
          if (callback) {
            callback.call(_this.selector, true, []);
          }
          _this.loaded = true;
          _this.events.trigger('load', []);
        }
      }
    };

    if (_this.dataSource) {

      _this.dataSource.on('select', function(data) {
        if (_this.isValid()) {
          render(data);
        }
        _this.events.trigger('load', data);
      });

      _this.dataSource.after('insert', function(result, data) {
        if (result && _this.isValid()) {
          _this.selector.append($(renderRow(data)));
          uiSync();
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('update', function(result, data) {
        if (result && _this.isValid()) {
          if (data[_this.options.valueField]) {
            _this.selector.find('option[value=' + data[_this.options.valueField] +']').text(getName(data));
            uiSync();
          }
        }
        _this.events.trigger('change');
      });

      _this.dataSource.after('remove', function(result, data) {
        if (result && _this.isValid()) {
          if (data[_this.options.valueField]) {
            _this.selector.find('option[value=' + data[_this.options.valueField] +']').remove();
            uiSync();
          }
        }
        _this.events.trigger('change');
      });

    } else {

      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
          _this.options.selectedValue = br.session.get(storageTag(_this.selector));
        } else {
          _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
        }
        if (!br.isEmpty(_this.options.selectedValue)) {
          _this.val(_this.options.selectedValue);
        }
      }

      uiSync();

    }

    _this.selector.change(function() {
      if (_this.saveSelection) {
        if (_this.saveToSessionStorage) {
          br.session.set(storageTag(this), $(this).val());
        } else {
          br.storage.set(storageTag(this), $(this).val());
        }
      }
      _this.events.trigger('change');
      uiSync();
    });

  }

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  };

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrEditable(ctrl, options) {

    var _this = this;
    _this.ctrl = $(ctrl);
    if (br.isFunction(options)) {
      options = { onSave: options };
    }
    options = options || {};
    _this.options = options;
    _this.options.popover_placement = _this.ctrl.attr('data-popover-placement') || 'bottom';
    _this.editor = null;
    _this.savedWidth = '';
    _this.click = function(element, e) {
      if (!_this.activated()) {
        var content = '';
        if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
          content = _this.ctrl.attr('data-editable');
        } else {
          content = _this.ctrl.text();
        }
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        var width = _this.ctrl.innerWidth();
        var height = _this.ctrl.innerHeight();
        _this.ctrl.text('');
        _this.editor = $('<input type="text" />');
        _this.editor.addClass('form-control');
        _this.editor.css('width', '100%');
        _this.editor.css('height', '100%');
        _this.editor.css('min-height', '30px');
        _this.editor.css('font-size', _this.ctrl.css('font-size'));
        _this.editor.css('font-weight', _this.ctrl.css('font-weight'));
        _this.editor.css('box-sizing', '100%');
        _this.editor.css('-webkit-box-sizing', 'border-box');
        _this.editor.css('-moz-box-sizing', 'border-box');
        _this.editor.css('-ms-box-sizing', 'border-box');
        _this.editor.css('margin-top', '2px');
        _this.editor.css('margin-bottom', '2px');
        if (_this.ctrl.attr('data-editable-style')) {
          _this.editor.attr('style', _this.ctrl.attr('data-editable-style'));
        }
        _this.ctrl.append(_this.editor);
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        _this.editor.val(content);
        _this.ctrl.css('width', width - 10);
        _this.editor.focus();
        $('div.popover').remove();
        if (!_this.options.hideHint) {
          if (_this.options.saveOnLoosingFocus) {
            _this.editor.popover({placement: _this.options.popover_placement, animation: false, trigger: 'manual', content: 'WARNING!!! Changes will be saved after leaving input box, by pressing [Enter], or by pressing [Tab]. Press [Esc] to cancel changes.'});
          } else {
            _this.editor.popover({placement: _this.options.popover_placement, animation: false, trigger: 'manual', content: 'Press [Enter] to save changes, [Esc] to cancel changes.'});
          }
        }
        _this.editor.popover('show');
        if (_this.options.saveOnLoosingFocus) {
          $(_this.editor).on('keydown', function(e) {
            if (e.keyCode == 9) {
              var content = $(this).val();
              $('div.popover').remove();
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              e.preventDefault();
            }
          });
          $(_this.editor).on('blur', function(e) {
            $('div.popover').remove();
            var content = $(this).val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'blur');
            } else {
              _this.apply(content);
            }
          });
        }
        $(_this.editor).on('keyup', function(e) {
          var content = $(this).val();
          switch (e.keyCode) {
            case 13:
              $('div.popover').remove();
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              break;
            case 27:
              $('div.popover').remove();
              _this.cancel();
              e.stopPropagation();
              break;
          }
        });
      }
    };

    _this.activated = function() {
      return _this.editor !== null;
    };

    _this.apply = function(content) {
      $('div.popover').remove();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.html(content);
      if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
        _this.ctrl.attr('data-editable', content);
      }
      _this.ctrl.css('width', '');
    };

    _this.cancel = function() {
      $('div.popover').remove();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.html(_this.ctrl.data('brEditable-original-html'));
      _this.ctrl.css('width', '');
    };

  }

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if ($('#br_editablePopover').length === 0) {
      $('body').append($('<div id="br_editablePopover"></div>'));
    }
    if (typeof callback == 'string') {
      var data = $(selector).data('brEditable-editable');
      if (!data) {
        $(selector).data('brEditable-editable', (data = new BrEditable($(selector), callback)));
      }
      if (data) {
        data[callback](value);
      }
    } else {
      $(document).on('click', selector, function(e) {
        var $this = $(this), data = $this.data('brEditable-editable');
        if (!data) {
          $this.data('brEditable-editable', (data = new BrEditable(this, callback)));
        }
        data.click(e);
      });
    }
  };

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || {};
  window.br.bootstrapVersion = 0;

  window.br.showError = function(s) {
    alert(s);
  };

  window.br.growlError = function(s, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
            title: br.trn('Error')
          , text: s
          , class_name: 'gritter-red'
          , image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(s, { addnCls     : 'humane-jackedup-error humane-original-error'
                      //, clickToClose: true
                      , timeout     : 5000
                      });
      } else {
        alert(s);
      }
    }
  };

  window.br.showMessage = function(s) {
    if (!br.isEmpty(s)) {
      alert(s);
    }
  };

  window.br.growlMessage = function(s, title, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        if (br.isEmpty(title)) {
          title = ' ';
        }
        $.gritter.add({
            title: title
          , text: s
          , class_name: 'gritter-light'
          , image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(s);
      } else {
        alert(s);
      }
    }
  };

  window.br.panic = function(s) {
    $('.container').html('<div class="row"><div class="span12"><div class="alert alert-error"><h4>' + br.trn('Error') + '!</h4><p>' + s + '</p></div></div></div>');
    throw '';
  };

  window.br.confirm = function(title, message, buttons, callback, options) {
    if (typeof buttons == 'function') {
      options   = callback;
      callback = buttons;
      buttons  = null;
    }
    options = options || {};
    options.cancelTitle = options.cancelTitle || br.trn('Cancel');
    var i;

    var s = '<div class="modal modal-autosize';
    if (options.cssClass) {
      s = s + ' ' + options.cssClass;
    }
    s = s + '" id="br_modalConfirm"';
    if (br.bootstrapVersion == 2) {
      // if (br.isMobileDevice()) {
        // s = s + ' style="top:20px;"';
      // } else {
        s = s + ' style="top:20px;margin-top:0px;"';
      // }
    }
    s = s + '>';

    var checkBoxes = '';
    if (options.checkBoxes) {
      for (i in options.checkBoxes) {
        var check = options.checkBoxes[i];
        var checked = '';
        if (check.default) {
          checked = 'checked';
        }
        checkBoxes = checkBoxes + '<div class="checkbox">' +
                                    '<label class="checkbox">' +
                                    '<input type="checkbox" class="confirm-checkbox" name="' + check.name + '" value="1" ' + checked + '> ' +
                                    check.title +
                                    '</label>' +
                                  '</div>';
      }
    }

    s = s + '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">' + message + checkBoxes + '</div>' +
            '<div class="modal-footer">';
    if (options.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    if (br.isEmpty(buttons)) {
      var yesTitle = options.yesTitle || br.trn('Yes');
      s = s + '<a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;' + yesTitle + '&nbsp;</a>';
    } else {
      for(i in buttons) {
        s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-close" rel="' + i + '">&nbsp;' + buttons[i] + '&nbsp;</a>';
      }
    }
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel">&nbsp;' + options.cancelTitle + '&nbsp;</a>';
    s = s + '</div></div></div></div>';
    var dialog = $(s);
    var remove = true;
    var onShow = function(e) {
      if (options.onShow) {
        options.onShow.call(dialog);
      }
      $(this).find('.action-confirm-close').click(function() {
        var button = $(this).attr('rel');
        var dontAsk = $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked');
        var checks = {};
        $('input.confirm-checkbox').each(function(){
          checks[$(this).attr('name')] = $(this).is(':checked');
        });
        remove = false;
        dialog.modal('hide');
        callback(button, dontAsk, checks);
        dialog.remove();
      });
      $(this).find('.action-confirm-cancel').click(function() {
        var button = 'cancel';
        var dontAsk = $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked');
        remove = false;
        dialog.modal('hide');
        if (options.onCancel) {
          options.onCancel(button, dontAsk);
        }
        dialog.remove();
      });
    };
    var onHide = function(e) {
      if (options.onHide) {
        options.onHide.call(this);
      }
      if (remove) {
        dialog.remove();
      }
    };
    $(dialog).on('show.bs.modal', onShow);
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
    br.resizeModalPopup(dialog);
  };

  window.br.error = function(title, message, callback) {
    var s = '<div class="modal modal-autosize" id="br_modalError"';
    if (br.bootstrapVersion == 2) {
      // if (br.isMobileDevice()) {
        // s = s + ' style="top:20px;"';
      // } else {
        s = s + ' style="top:20px;margin-top:0px;"';
      // }
    }
    s = s + '>' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="overflow-y:auto;">' + message + '</div>' +
            '<div class="modal-footer" style="background-color:red;"><a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn('Dismiss') + '&nbsp;</a></div></div></div></div>';
    var dialog = $(s);
    var onHide = function(e) {
      if (callback) {
        callback.call(this);
      }
      dialog.remove();
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
    br.resizeModalPopup(dialog);
  };

  window.br.inform = function(title, message, callback, options) {

    if (callback) {
      if (typeof callback != 'function') {
        options  = callback;
        callback = null;
      }
    }

    options = options || {};
    var buttonTitle = options.buttonTitle || 'Dismiss';

    var s = '<div class="modal modal-autosize" id="br_modalInform"';
    if (br.bootstrapVersion == 2) {
      // if (br.isMobileDevice()) {
        // s = s + ' style="top:20px;"';
      // } else {
        s = s + ' style="top:20px;margin-top:0px;"';
      // }
    }
    s = s + '>' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="overflow-y:auto;">' + message + '</div>' +
            '<div class="modal-footer">';
    if (options.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    s = s +'<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn(buttonTitle) + '&nbsp;</a></div></div></div></div>';
    var dialog = $(s);
    var onHide = function(e) {
      var dontAsk = $('input[name=showDontAskMeAgain]', $(dialog)).is(':checked');
      if (callback) {
        callback.call(this, dontAsk);
      }
      dialog.remove();
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
    br.resizeModalPopup(dialog);
  };

  window.br.prompt = function(title, fields, callback, options) {

    options = options || {};

    var inputs = {};

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      options.valueRequired = true;
      inputs[fields] = '';
    }

    var s = '<div class="modal modal-autosize" id="br_modalPrompt"';
    if (br.bootstrapVersion == 2) {
      // if (br.isMobileDevice()) {
        // s = s + ' style="top:20px;"';
      // } else {
        s = s + ' style="top:20px;margin-top:0px;"';
      // }
    }
    s = s + '>' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">';
    for(var i in inputs) {
      if (br.isObject(inputs[i])) {
        s = s + '<label>' + i + '</label>' +
              '<input type="text" ' + (inputs[i].id ? 'id="'+inputs[i].id+'"' : '') + ' class="span4 ' + (br.isEmpty(inputs[i]['class']) ? '' : inputs[i]['class']) + '" value="' + inputs[i].value + '" data-click-on-enter="#br_modalPrompt .action-confirm-close" />';
      } else {
        s = s + '<label>' + i + '</label>' +
                '<input type="text" class="form-control ' + (options.valueType == 'int' ? ' input-small' : ' justified') + (options.valueRequired ? ' required' : '') + ' " value="' + inputs[i] + '" data-click-on-enter="#br_modalPrompt .action-confirm-close" />';
      }
    }

    s = s + '</div>' +
            '<div class="modal-footer">';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm" >Ok</a>';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn('Cancel') + '&nbsp;</a>';
    s = s + '</div></div></div></div>';
    var dialog = $(s);
    var remove = true;
    $(dialog)
      .on('shown.bs.modal', function(e) {
        $(this).find('input[type=text]')[0].focus();
      })
      .on('show.bs.modal', function(e) {
        $(this).find('.action-confirm-close').click(function() {
          var results = [];
          var ok = true, notOkField;
          var inputs = [];
          $(this).closest('div.modal').find('input[type=text]').each(function() {
            if ($(this).hasClass('required') && br.isEmpty($(this).val())) {
              ok = false;
              notOkField = $(this);
            }
            results.push($(this).val().trim());
            inputs.push($(this));
          });
          if (ok) {
            if (options.onValidate) {
              try {
                options.onValidate.call(this, results);
              } catch (e) {
                ok = false;
                br.growlError(e);
                if (inputs.length == 1) {
                  inputs[0].focus();
                }
              }
            }
            if (ok) {
              remove = false;
              $(dialog).modal('hide');
              callback.call(this, results);
              dialog.remove();
            }
          } else {
            br.growlError('Please enter value');
            notOkField[0].focus();
          }
        });
      });
    var onHide = function(e) {
      if (options.onHide) {
        options.onHide.call(this);
      } else
      if (options.onhide) {
        options.onhide.call(this);
      }
      if (remove) {
        dialog.remove();
      }
    };
    $(dialog).on('hide.bs.modal', onHide);
    $(dialog).modal('show');
    br.enchanceBootstrap(dialog);
    br.resizeModalPopup(dialog);
  };

  var noTemplateEngine = false;

  window.br.fetch = function(template, data, tags) {
    data = data || {};
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          if (!noTemplateEngine) {
            noTemplateEngine = true;
            this.showError('Template engine not found. Please link bright/3rdparty/mustache.js or bright/3rdparty/handlebars.js.');
          }
        } else {
          var t = Handlebars.compile(template);
          return t(data);
        }
      } else {
        return Mustache.render(template, data);
      }
    } else {
      return '';
    }
  };

  var progressCounter = 0;

  window.br.isAJAXInProgress = function() {
    return (progressCounter > 0);
  };

  window.br.showAJAXProgress = function() {
    progressCounter++;
    $('.ajax-in-progress').css('visibility', 'visible');
  };

  window.br.hideAJAXProgress = function() {
    progressCounter--;
    if (progressCounter <= 0) {
      $('.ajax-in-progress').css('visibility', 'hidden');
      progressCounter = 0;
    }
  };

  window.br.jsonEncode = function(data) {
    return JSON.stringify(data);
  };
  window.br.jsonDecode = function(data) {
    try {
      return JSON.parse(data);
    } catch(ex) {
      return null;
    }
  };

  var progressBar_Total = 0, progressBar_Progress = 0, progressBar_Message = '';
  var progressBarTemplate = '<div id="br_progressBar" class="modal" style="display:none;z-index:10000;top:20px;margin-top:0px;" data-backdrop="static">' +
                            '  <div class="modal-dialog">'+
                            '    <div class="modal-content">'+
                            '      <div class="modal-body">' +
                            '        <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">'+
                            '          <tr>'+
                            '            <td id="br_progressMessage"></td>' +
                            '            <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>' +
                            '          </tr>' +
                            '        </table>' +
                            '        <div id="br_progressBar_Section" style="display:none;clear:both;">' +
                            '          <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">' +
                            '            <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>' +
                            '          </div>' +
                            '        </div>' +
                            '        <div id="br_progressBarAnimation" style="display1:none;padding-top:10px;">' +
                            '          <center><img src="' + br.baseUrl + 'bright/images/progress-h.gif" /></center>' +
                            '        </div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>';

  function renderProgress() {
    var p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
  }

  window.br.startProgress = function(value, message) {
    if (!br.isNumber(value)) {
      message = value;
      value = 0;
    }
    progressBar_Total = value;
    progressBar_Progress = 0;
    progressBar_Message = message;
    if ($('#br_progressBar').length === 0) {
      var pbr = $(progressBarTemplate);
      if (br.bootstrapVersion == 2) {
        // if (br.isMobileDevice()) {
          // pbr.css('top', '20px');
        // } else {
          pbr.css('top', '20px');
          pbr.css('margin-top', '0px');
        // }
      }
      $('body').append(pbr);
    }
    if (progressBar_Total > 1) {
      $('#br_progressBar_Section').show();
      $('#br_progressStage').show();
    } else {
      $('#br_progressBar_Section').hide();
      $('#br_progressStage').hide();
    }
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.showProgress = function() {
    $('#br_progressBar').modal('show');
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
  };

  window.br.incProgress = function(value) {
    if (!value) { value = 1; }
    progressBar_Total += value;
    renderProgress();
  };

  window.br.setProgress = function(value, message) {
    progressBar_Progress = value;
    if (!br.isEmpty(message)) {
      progressBar_Message = message;
    }
    renderProgress();
  };

  window.br.stepProgress = function(step, message) {
    if (br.isNumber(step)) {
      progressBar_Progress += step;
    } else {
      progressBar_Progress++;
      message = step;
    }
    if (!br.isEmpty(message)) {
      progressBar_Message = message;
    }
    renderProgress();
  };

  window.br.initScrollableAreas = function(deferred) {

    $('.br-scrollable').each(function() {
      var $container = $(this).parent('.br-container');
      var $navBar = $('nav.navbar');
      if ($navBar.length === 0) { $navBar = $('div.navbar'); }
      var initialMarginTop = 0;
      if ($navBar.css('position') != 'static') {
        initialMarginTop = $container.offset().top;
      }
      if (deferred) {
        initialMarginTop = 0;
      }

      $('body').css('overflow', 'hidden');

      function resize() {
        var navBarHeight = 0;
        if ($navBar.length !== 0) {
          navBarHeight = $navBar.height();
        }
        if (deferred) {
          navBarHeight = 0;
        }
        var height = $(window).height() - navBarHeight - initialMarginTop;
        if (height > 0) {
          var marginTop = 0;
          if ($navBar.length > 0) {
            if ($navBar.css('position') == 'static') {
              marginTop = initialMarginTop;
            } else {
              marginTop = navBarHeight + initialMarginTop;
            }
          } else {
            marginTop = initialMarginTop;
          }
          $container.css('margin-top', marginTop + 'px');
          $container.css('height', height + 'px');
        }
      }

      $(window).on('resize', function() {
        resize();
      });

      resize();
    });

  };

  window.br.resizeModalPopup = function(modal) {

    var mh = $(window).height() - $(modal).find('.modal-header').outerHeight() - $(modal).find('.modal-footer').outerHeight() - 90;
    $(modal).find('.modal-body').css('max-height', mh + 'px');
    $(modal).find('.modal-body').css('overflow-y', 'auto');

  };

  function configureAutosize(control) {
    if ($(control).data('brAutoSizeConfigured')) {

    } else {
      (function(control) {
        if (br.bootstrapVersion == 2) {
          // if (br.isMobileDevice()) {
            // control.css('top', '20px');
          // } else {
            control.css('top', '20px');
            control.css('margin-top', '0px');
          // }
        }
        control.on('shown.bs.modal', function() {
          br.resizeModalPopup(control);
        });
        $(window).resize(function(){
          br.resizeModalPopup(control);
        });
        control.data('brAutoSizeConfigured', 1);
      })($(control));
    }
  }

  window.br.enchanceBootstrap = function(el) {

    if (el) {
      if ($(el).hasClass('modal-autosize')) {
        configureAutosize($(el));
      }
    } else {
      $('div.modal.modal-autosize').each(function() {
        configureAutosize($(this));
      });
    }

    if ($.ui !== undefined) {
      if (el) {
        $(el).not('.ui-draggable').each(function() {
          if ($(this).find('.modal-header').length > 0) {
            $(this).draggable({ handle: '.modal-header', cursor: 'pointer' }).find('.modal-header').css('cursor', 'move');
          }
        });
      } else {
        $('.modal').not('.ui-draggable').each(function() {
          if ($(this).find('.modal-header').length > 0) {
            $(this).draggable({ handle: '.modal-header', cursor: 'pointer' }).find('.modal-header').css('cursor', 'move');
          }
        });
      }
    }

  };

  function attachjQueryUIDatePickers(selector) {

    if ($.ui !== undefined) {
      $(selector).each(function() {
        if ($(this).attr('data-format')) {
          $(this).datepicker({ dateFormat: $(this).attr('data-format') });
        } else {
          $(this).datepicker({ });
        }
      });
    }

  }

  function attachBootstrapDatePickers(selector) {

    try {
      $(selector).each(function() {
        $(this).bootstrapDatepicker({
          todayBtn: "linked",
          clearBtn: true,
          multidate: false,
          autoclose: true,
          todayHighlight: true
        });
      });
    } catch (e) {
      br.log('[ERROR] bootstrapDatepicker expected but script was not loaded');
    }

  }
  window.br.attachDatePickers = function (container) {

    if (container) {
      attachjQueryUIDatePickers($('input.datepicker', container));
      attachBootstrapDatePickers($('input.bootstrap-datepicker', container));
    } else {
      attachjQueryUIDatePickers($('input.datepicker'));
      attachBootstrapDatePickers($('input.bootstrap-datepicker'));
    }

  };

  $(document).ready(function() {

    var notAuthorized = false;

    if ($.fn['modal']) {
      if ($.fn['modal'].toString().indexOf('bs.modal') == -1) {
        br.bootstrapVersion = 2;
      } else {
        br.bootstrapVersion = 3;
      }
    } else {
      br.bootstrapVersion = 0;
    }

    $(document).ajaxStart(function() {
      br.showAJAXProgress();
    });

    $(document).ajaxStop(function() {
      br.hideAJAXProgress();
    });

    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
      if (jqXHR.status == 401) {
        if (!notAuthorized) {
          notAuthorized = true;
          br.growlError(br.trn('You are trying to run operation which require authorization.'));
        }
      }
    });

    $(document).on('keypress', 'input[data-click-on-enter]', function(e) {
      if (e.keyCode == 13) { $($(this).attr('data-click-on-enter')).trigger('click'); }
    });

    br.enchanceBootstrap();
    br.attachDatePickers();

    if ($('.focused').length > 0) {
      try { $('.focused')[0].focus(); } catch (ex) { }
    }

    if (!br.isTouchScreen) {
      var disableBounceContainer = $('body').attr('data-disable-bounce-container');
      if (!br.isEmpty(disableBounceContainer)) {
        br.disableBounce($(disableBounceContainer));
      }
    }

    br.initScrollableAreas();

    if (br.bootstrapVersion == 2) {
      $('ul.dropdown-menu [data-toggle=dropdown]').on('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).closest('.dropdown-menu').find('.dropdown-submenu').removeClass('open');
        $(this).parent().addClass('open');
      });
    }

  });

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || {};

  var callbacks = [];

  $(document).ready(function() {
    $('body').on('paste', function(evt) {

      var result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      evt = evt.originalEvent;

      function loadFile(result, file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          var parts = /^data[:](.+?)\/(.+?);/.exec(evt.target.result);
          var result_dataType    = 'other';
          var result_dataSubType = 'binary';
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.dataType    = result_dataType;
          result.dataSubType = result_dataSubType;
          result.dataValue   = evt.target.result;
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = evt.target.result;
          for(var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(evt, result);
          }
        };
        reader.readAsDataURL(file);
      }

      function loadData(result, clipboardData, mediaType, isImage) {
        var data = clipboardData.getData(mediaType);
        if (data && (data.length > 0)) {
          if (isImage) {
            mediaType = 'image/url';
          }
          var parts = /^(.+?)\/(.+?)$/.exec(mediaType);
          var result_dataType    = 'other';
          var result_dataSubType = 'binary';
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.dataType        = result_dataType;
          result.dataSubType     = result_dataSubType;
          result.dataValue       = data;
          if (isImage) {
            result.data[result_dataType] = result.data[result_dataType] || { };
            result.data[result_dataType][result_dataSubType] = data;
          }
          return true;
        }
        return false;
      }

      if (evt.clipboardData) {
        var i;
        for(i = 0; i < evt.clipboardData.types.length; i++) {
          var dataType = evt.clipboardData.types[i];
          var parts = /^(.+?)\/(.+?)$/.exec(dataType);
          var result_dataType    = 'other';
          var result_dataSubType = dataType;
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = evt.clipboardData.getData(dataType);
        }

        var completed = true;

        if (loadData(result, evt.clipboardData, 'public.url', true)) {

        } else
        if (loadData(result, evt.clipboardData, 'text/html')) {
          result.dataValue = result.dataValue.replace(/<(html|body|head|meta|link)[^>]*?>/g, '')
                                             .replace(/<\/(html|body|head|meta|link)[^>]*?>/g, '')
                                             ;
        } else
        if (loadData(result, evt.clipboardData, 'text/plain')) {

        } else {
          if (evt.clipboardData.items && (evt.clipboardData.items.length > 0)) {
            for(i = 0; i < evt.clipboardData.items.length; i++) {
              if (evt.clipboardData.items[i].type.match('image.*')) {
                completed = false;
                loadFile(result, evt.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (evt.clipboardData.files && (evt.clipboardData.files.length > 0)) {
            for(i = 0; i < evt.clipboardData.files.length; i++) {
              if (evt.clipboardData.files[i].type.match('image.*')) {
                completed = false;
                loadFile(result, evt.clipboardData.files[0]);
              }
            }
          }
        }

        if (completed) {
          for(i in callbacks) {
            callbacks[i].call(evt, result);
          }
        }

      }
    });
  });

  window.br.onPaste = function(callback) {
    callbacks.push(callback);
  };

})(jQuery, window);
/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

/* global io */

;(function (window) {

  var instance;

  function BrRabbitMQ(params) {

    var _this = this;
    var subs = [];
    var uid = 1;
    var reregister = false;

    params = params || {};
    params.host = params.host || 'localhost';
    params.port = params.port || 80;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    var socket = io.connect(params.host + ':' + params.port, { secure: true });

    socket.on('connect', function() {
      _this.events.trigger('rmq.log', 'connected');
      _this.events.trigger('rmq.connect');
      subscribe();
    });

    socket.on('disconnect', function() {
      _this.events.trigger('rmq.log', 'disconnected');
      _this.events.trigger('rmq.disconnect');
      for(var i in subs) {
        subs[i].status = 'added';
      }
    });

    socket.on('error', function(data) {
      _this.events.trigger('rmq.log', data);
      _this.events.trigger('rmq.error', data);
    });

    socket.on('RMQ/Message', function (data) {
      _this.events.trigger('rmq.log', data);
      _this.events.trigger('rmq.message', data);
      if (subs[data.uid]) {
        if (subs[data.uid].active) {
          subs[data.uid].callback.call(this, data.data);
        }
      }
    });

    socket.on('RMQ/Subscribed', function (data) {
      _this.events.trigger('rmq.log', 'subscribed', data);
      _this.events.trigger('rmq.subscribed', data);
      if (subs[data.uid]) {
        subs[data.uid].active = true;
      }
    });

    function subscribe() {
      for(var i in subs) {
        var sub = subs[i];
        if (sub.status == 'added') {
          sub.status = 'inprogress';
          socket.emit('RMQ/Subscribe', { uid: sub.uid, exchange: sub.exchange, topic: sub.topic });
        }
      }
    }

    this.subscribe = function(exchange, topic, callback) {
      var sub = { uid: uid++, exchange: exchange, topic: topic, callback: callback, status: 'added' };
      subs[sub.uid] = sub;
      subscribe();
    };

    this.sendMessage = function(exchange, data, topic) {
      socket.emit('RMQ/SendMessage', { exchange: exchange, data: data, topic: topic });
    };

    this.getSocket = function() {
      return socket;
    };

    return this;

  }

  window.br = window.br || {};

  window.br.rabbitMQ = function(params) {
    if (!instance) {
      instance = new BrRabbitMQ(params);
    }
    return instance;
  };

})(window);
