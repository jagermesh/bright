// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

  window.br.isNumber = function(value) {
    return (!isNaN(parseFloat(value)) && isFinite(value));
  }

  window.br.isArray = function (value) {
    return (!br.isNull(value) && (Object.prototype.toString.call(value) === '[object Array]'));
  }

  window.br.isObject = function (value) {
    return (!br.isEmpty(value) && (typeof value == 'object'));
  }

  window.br.isBoolean = function (value) {
    return (typeof value == 'boolean');
  }

  window.br.isString = function (value) {
    return (typeof value == 'string');
  }

  window.br.isFunction = function (value) {
    return (typeof value == 'function');
  }

  window.br.isNull = function(value) {
    return (
             (value === undefined) || 
             (value === null) 
           );
  }

  window.br.isEmpty = function(value) {
    return ( 
             br.isNull(value) || 
             ((typeof value.length != 'undefined') && (value.length == 0)) // Array, String
           );
  }

}(window);// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

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

  var storage = function(storage) {

    var _storage = storage;
    var _this = this;

    this.get = function(key, defaultValue) {
      if (br.isArray(key)) {
        var result = {};
        for(var i in key) {
          result[key[i]] = this.get(key[i]);
        }
      } else {        
        var result = _helper.unpack(_storage.getItem(key));
      }
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    }

    this.set = function(key, value) {
      if (br.isObject(key)) {
        for(name in key) {
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
        var increment = (br.isNumber(increment) ? increment : 1);
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
        var increment = (br.isNumber(increment) ? increment : 1);
        this.set(key, increment);
      }
      return this;
    }

    this.dec = function(key, increment) {
      var increment = (br.isNumber(increment) ? increment : 1);
      var value = this.get(key);
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
          var result = value.pop();
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
          var result = value.shift();
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
      for(name in _storage) {
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

  window.br.storage = new storage(window.localStorage);
  window.br.session = new storage(window.sessionStorage);

}(window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

  window.br.eventQueue = function(obj) {
    return new BrEvents(obj);
  }

  BrEvents = function(obj) {

    var _this = this;

    this.subscribers = {};
    this.obj = obj || this;

    this.before = function(event, callback) {
      _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
      _this.subscribers[event].before.push(callback);
    }

    this.on = function(event, callback) {
      _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
      _this.subscribers[event].on.push(callback);
    }

    this.after = function(event, callback) {
      _this.subscribers[event] = _this.subscribers[event] || { on: [], before: [], after: [] };
      _this.subscribers[event].after.push(callback);
    }

    function trigger(event, pos, args) {

      var result = null;

      var eventSubscribers = _this.subscribers[event];
      if (eventSubscribers) {
        switch(pos) {
          case 'before':
            for (var i in eventSubscribers.before) {
              eventSubscribers.before[i].apply(_this.obj, args);
            }
            break;
          case 'on':
            for (var i in eventSubscribers.on) {
              result = eventSubscribers.on[i].apply(_this.obj, args);
            }
            break;
          case 'after':
            for (var i in eventSubscribers.after) {
              eventSubscribers.after[i].apply(_this.obj, args);
            }
            break;
        }
      }

      return result;

    }

    function triggerEx(event, pos, largs) {

      var args = [];
      for(var i = 0; i < largs.length; i++) {
        args.push(largs[i]);
      }

      if (event != '*') {
        trigger('*', pos, args);
      }

      args.splice(0,1);

      return trigger(event, pos, args);

    }

    this.triggerBefore = function(event) { 
      return triggerEx(event, 'before', arguments); 
    }
    this.trigger = function(event) { 
      return triggerEx(event, 'on',     arguments); 
    }
    this.triggerAfter = function(event) { 
      return triggerEx(event, 'after',  arguments); 
    }

  }

}(window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

  window.br.request = new BrRequest();

  function BrRequest() {

    this.continueRoute = true;
    this.get = function(name, defaultValue) {
      var vars = document.location.search.replace('?', '').split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == name) {
          return unescape(pair[1]);
        }
      }
      return defaultValue;
    };
    this.anchor = function(defaultValue) {
      var value = document.location.hash.replace('#', '');
      if (value.length == 0) {
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
    }

  }

}(window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  var baseUrl = '';
  $('script').each(function(i, e) {
    var s = $(e).attr('src');
    if (s) {
      var idx = s.indexOf('bright/js/bright.js');
      if (idx > 0) {
        baseUrl = s.substring(0, idx);
        return true;
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
    return /iPad/i.test(ua) || /iPhone/i.test(ua) || /Android/i.test(ua);
  };

  window.br.isiOS = function() {
    var ua = navigator.userAgent;
    return /iPad/i.test(ua) || /iPhone/i.test(ua);
  };

  window.br.isAndroid = function() {
    var ua = navigator.userAgent;
    return /android/i.test(ua);
  };

  window.br.redirect = function(url) {
    if ((url.search(/^\//) == -1) && (url.search(/^http[s]?:\/\//) == -1)) {
      url = this.baseUrl + url;
    }
    document.location = url;
  };

  window.br.refresh = function() {
    location.reload();
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
    if (max == undefined) {
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

  window.br.toInt = function(value) {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return parseInt(value);
      }
    } else
    if (typeof value == 'number') {
      return value;
    }
  };

  window.br.toReal = function(value) {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return parseFloat(value);
      }
    } else
    if (typeof value == 'number') {
      return value;
    }
  };

  window.br.openPopup = function(url, w, h) {

    if (w == null) {
      if (screen.width)
        if (screen.width >= 1280)
          w = 1000;
        else
        if (screen.width >= 1024)
          w = 800;
        else
          w = 600;
    }
    if (h == null) {
      if (screen.height)
        if (screen.height >= 900)
          h = 700;
        else
        if (screen.height >= 800)
          h = 600;
        else
          h = 500;
    }
    var left = (screen.width) ? (screen.width-w)/2 : 0;
    var settings = 'height='+h+',width='+w+',top=20,left='+left+',menubar=0,scrollbars=1,resizable=1'
    var win = window.open(url, '_blank', settings)
    if (win) {
      win.focus();
    }

  };

  function handleModified(element, callback) {
    var _this = $(element);
    if (_this.data('br-last-change') != _this.val()) {
      _this.data('br-last-change', _this.val());
      var callbacks = _this.data('br-data-change-callbacks');
      if (callbacks) {
        for(var i in callbacks) {
          callbacks[i].call(_this);
        }
      } else {
        callback.call(_this);
      }
    }
  }

  function setupModified(selector, callback, deferred) {
    $(selector).each(function() {
      if (!$(this).data('br-data-change-callbacks')) {
        $(this).data('br-data-change-callbacks', new Array());
      }
      var callbacks = $(this).data('br-data-change-callbacks');
      callbacks.push(callback);
      $(this).data('br-data-change-callbacks', callbacks);
    });
    $(selector).live('change', function() {
      var $this = $(this);
      if (deferred) {
        window.clearTimeout($this.data('br-modified-timeout'));
        $(this).data('br-modified-timeout', window.setTimeout(function() {
          handleModified($this, callback);
        }, 500));
      } else {
        handleModified($this, callback);
      }
    });
    $(selector).live('keyup', function(e) {
      if ((e.keyCode == 8) || (e.keyCode == 32) || ((e.keyCode >= 48) && (e.keyCode <= 90)) || ((e.keyCode >= 96) && (e.keyCode <= 111)) || ((e.keyCode >= 186) && (e.keyCode <= 222))) {
        var $this = $(this);
        if (deferred) {
          window.clearTimeout($this.data('br-modified-timeout'));
          $(this).data('br-modified-timeout', window.setTimeout(function() {
            handleModified($this, callback);
          }, 500));
        } else {
          handleModified($this, callback);
        }
      }
    });
  }

  window.br.modifiedDeferred = function(selector, callback) {
    setupModified(selector, callback, true);
  }

  window.br.modified = function(selector, callback) {
    setupModified(selector, callback, false);
  }

  window.br.closeConfirmationMessage = 'Some changes have been made. Are you sure you want to close current window?';

  function brightConfirmClose() {
    return br.closeConfirmationMessage;
  }

  window.br.confirmClose = function(message) {
    if (message) {
      br.closeConfirmationMessage = message;
    }

    window.onbeforeunload = brightConfirmClose;
  }

  window.br.resetCloseConfirmation = function(message) {
    window.onbeforeunload = null;
  }

  window.br.load = window.br.resourceLoader = function(j){function p(c,a){var g=j.createElement(c),b;for(b in a)a.hasOwnProperty(b)&&g.setAttribute(b,a[b]);return g}function m(c){var a=k[c],b,e;if(a)b=a.callback,e=a.urls,e.shift(),h=0,e.length||(b&&b.call(a.context,a.obj),k[c]=null,n[c].length&&i(c))}function u(){if(!b){var c=navigator.userAgent;b={async:j.createElement("script").async===!0};(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}}function i(c,
    a,g,e,h){var i=function(){m(c)},o=c==="css",f,l,d,q;u();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||b.async||b.gecko||b.opera)n[c].push({urls:a,callback:g,obj:e,context:h});else{f=0;for(l=a.length;f<l;++f)n[c].push({urls:[a[f]],callback:f===l-1?g:null,obj:e,context:h})}if(!k[c]&&(q=k[c]=n[c].shift())){r||(r=j.head||j.getElementsByTagName("head")[0]);a=q.urls;f=0;for(l=a.length;f<l;++f)g=a[f],o?d=b.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(d=p("script",{src:g}),d.async=!1),d.className=
    "lazyload",d.setAttribute("charset","utf-8"),b.ie&&!o?d.onreadystatechange=function(){if(/loaded|complete/.test(d.readyState))d.onreadystatechange=null,i()}:o&&(b.gecko||b.webkit)?b.webkit?(q.urls[f]=d.href,s()):(d.innerHTML='@import "'+g+'";',m("css")):d.onload=d.onerror=i,r.appendChild(d)}}function s(){var c=k.css,a;if(c){for(a=t.length;--a>=0;)if(t[a].href===c.urls[0]){m("css");break}h+=1;c&&(h<200?setTimeout(s,50):m("css"))}}var b,r,k={},h=0,n={css:[],js:[]},t=j.styleSheets;return{css:function(c,
    a,b,e){i("css",c,a,b,e)},js:function(c,a,b,e){i("js",c,a,b,e)}}}(this.document);

  window.br.events = br.eventQueue();

}(jQuery, window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

  window.br.flagsHolder = function (permanent, name) {
    return new BrFlagsHolder(permanent, name);
  }

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
    }

    this.isFlagged = function(id) {
      if (permanent) {
        return (br.storage.indexOf(name, id) != -1);
      } else {
        return (flags.indexOf(id) != -1);
      }
    }

    this.remove = function(id) {
      if (permanent) {
        br.storage.remove(name, id);
      } else {
        var idx = flags.indexOf(id);
        if (idx != -1) {
          flags.splice(idx, 1);
        }
      }
    }

    this.clear = function() {
      this.replace([]);
    }

    this.replace = function(values) {
      if (permanent) {
        return br.storage.set(name, values);
      } else {
        return (flags = values);
      }
    }

    this.get = function() {
      if (permanent) {
        return br.storage.get(name, []);
      } else {
        return flags;
      }
    }

  }

}(window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  }

  function BrDataSource(restServiceUrl, options) {

    var $ = jQuery;
    var datasource = this;
    var _this = this;
    var ajaxRequest = null;

    // this.cb = {};
    this.refreshTimeout;
    this.name = '-';
    this.options = options || {};
    this.options.restServiceUrl = restServiceUrl;
    this.options.refreshDelay = this.options.refreshDelay || 500;
    if (this.options.restServiceUrl.charAt(this.options.restServiceUrl.length-1) != '/') {
      this.options.restServiceUrl = this.options.restServiceUrl + '/';
    }

    if (this.options.offlineMode) {
      this.db = TAFFY();
      this.db.store('taffy-db-' + name);
    }

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.insert = function(item, callback) {

      request = item;

      try {

        _this.events.triggerBefore('insert', request);

        if (this.options.crossdomain) {
          request.crossdomain = 'put';
        }

        function returnInsert(data) {

          var result;

          if (datasource.options.crossdomain) {
            if (typeof data == 'string') {
              result = false;
              _this.events.trigger('error', 'insert', data.length > 0 ? data : 'Empty response. Was expecting new created records with ROWID.');
            } else {
              result = true;
              _this.events.trigger('insert', data);
            }
          } else {
            if (data) {
              result = true;
              _this.events.trigger('insert', data);
            } else {
              result = false;
              _this.events.trigger('error', 'insert', 'Empty response. Was expecting new created records with ROWID.');
            }
          }
          _this.events.triggerAfter('insert', result, data, request);
          if (result) {
            _this.events.trigger('change', 'insert', data);
          }
          if (typeof callback == 'function') { callback.call(datasource, result, data, request); }

        }

        if (datasource.options.offlineMode) {
          datasource.db.insert(request);
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
                     _this.events.trigger('error', 'insert', jqXHR.responseText);
                     _this.events.triggerAfter('insert', false, jqXHR.responseText, request);
                     if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                   }
                 });
        }

      } catch (error) {
        _this.events.trigger('error', 'insert', error);
        _this.events.triggerAfter('insert', false, error, request);
        if (typeof callback == 'function') { callback.call(datasource, false, error, request); }
      }

    }

    this.update = function(rowid, item, callback) {

      request = item;

      _this.events.triggerBefore('update', rowid, request);

      function returnUpdate(data) {
        var operation = 'update';
        if (data) {
          var res = _this.events.trigger('removeAfterUpdate', item, data);
          if ((res != null) && res) {
            operation = 'remove';
            _this.events.trigger('remove', rowid);
          } else {
            _this.events.trigger('update', data, rowid);
          }
        }
        _this.events.triggerAfter('' + operation, true, data, request);
        _this.events.trigger('change', operation, data);
        if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
      }

      if (datasource.options.offlineMode) {
        datasource.db({rowid: rowid}).update(request);
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
                   _this.events.trigger('error', 'update', jqXHR.responseText);
                   _this.events.triggerAfter('update', false, jqXHR.responseText, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                 }
               });
      }

    }

    this.remove = function(rowid, callback) {

      request = {};

      _this.events.triggerBefore('remove', null, rowid);

      function returnRemove(data) {
        _this.events.trigger('remove', rowid);
        _this.events.triggerAfter('remove', true, data, request);
        _this.events.trigger('change', 'remove', data);
        if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
      }

      if (datasource.options.offlineMode) {
        var data = datasource.db({rowid: rowid}).get();
        datasource.db({rowid: rowid}).remove();
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
                   _this.events.trigger('error', 'remove', jqXHR.responseText);
                   _this.events.triggerAfter('remove', false, jqXHR.responseText, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
                 }
               });
      }

    }

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
      options.result = 'count';

      this.select(newFilter, callback, options);

    }

    this.selectOne = function(rowid, callback, options) {

      return this.select({ rowid: rowid ? rowid : '-' }, callback, options);

    }

    this.select = function(filter, callback, options) {

      var disableEvents = options && options.disableEvents;

      var request = { };
      var requestRowid;

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
      } else
      if (filter) {
        for(var i in filter) {
          if (i != 'rowid') {
            request[i] = filter[i];
          } else {
            requestRowid = filter[i];
          }
        }
      }

      options = options || { };

      var url = this.options.restServiceUrl;
      if (requestRowid) {
        url = url + requestRowid;
      }

      var proceed = true;

      if (!disableEvents) {
        try {
          _this.events.triggerBefore('select', request, options);
        } catch(e) {
          proceed = false;
        }
      }

      if (proceed) {
        if (this.options.limit) {
          request.__limit = this.options.limit;
        }

        if (options && options.skip) {
          request.__skip = options.skip;
        }

        if (options && options.limit) {
          request.__limit = options.limit;
        }

        if (options && options.fields) {
          request.__fields = options.fields;
        }

        if (options && options.order) {
          request.__order = options.order;
        }

        function handleSuccess(data) {
          if (!disableEvents) {
            _this.events.trigger('select', data);
            _this.events.triggerAfter('select', true, data, request);
          }
          if (typeof callback == 'function') { callback.call(datasource, true, data, request); }
        }

        function handleError(error, response) {
          if (!disableEvents) {
            _this.events.trigger('error', 'select', error);
            _this.events.triggerAfter('select', false, error, request);
          }
          if (typeof callback == 'function') { callback.call(datasource, false, error, request); }
        }

        if (datasource.options.offlineMode) {
          handleSuccess(datasource.db(request).get());
        } else {
          this.ajaxRequest = $.ajax({ type: 'GET'
                                    , data: request
                                    , dataType: 'json'
                                    , url: url + (this.options.authToken ? '?token=' + this.options.authToken : '')
                                    , success: function(response) {
                                        datasource.ajaxRequest = null;
                                        if (response) {
                                          handleSuccess(response);
                                        } else {
                                          handleError('', response);
                                        }
                                      }
                                    , error: function(jqXHR, textStatus, errorThrown) {
                                        datasource.ajaxRequest = null;
                                        var error = (jqXHR.statusText == 'abort') ? '' : (jqXHR.responseText.length == 0 ? 'Server error' : jqXHR.responseText);
                                        handleError(error, jqXHR);
                                      }
                                    });
        }
      } else {
        
      }

    }
    this.requestInProgress = function() {
      return (this.ajaxRequest != null);
    }
    this.abortRequest = function() {
      if (this.ajaxRequest != null) {
        this.ajaxRequest.abort();
      }
    }
    this.invoke = function(method, params, callback) {

      var datasource = this;

      if (typeof params == 'function') {
        request = { };
        callback = params;
      } else {
        request = params;
      }

      _this.events.triggerBefore('' + method, request);

      if (this.options.crossdomain) {
        request.crossdomain = 'post';
      }

      $.ajax({ type: this.options.crossdomain ? 'GET' : 'POST'
             , data: request
             , dataType: this.options.crossdomain ? 'jsonp' : 'json'
             , url: this.options.restServiceUrl + method + (this.options.authToken ? '?token=' + this.options.authToken : '')
             , success: function(response) {
                 if (datasource.options.crossdomain && (typeof response == 'string')) {
                   _this.events.trigger('error', method, response);
                   _this.events.triggerAfter('' + method, false, response, request);
                   if (typeof callback == 'function') { callback.call(datasource, false, response, request); }
                 } else {
                   _this.events.trigger(method, response, params);
                   _this.events.triggerAfter('' + method, true, response, request);
                   if (typeof callback == 'function') { callback.call(datasource, true, response, request); }
                 }
               }
             , error: function(jqXHR, textStatus, errorThrown) {
                 _this.events.trigger('error', method, jqXHR.responseText);
                 _this.events.triggerAfter('' + method, false, jqXHR.responseText, request);
                 if (typeof callback == 'function') { callback.call(datasource, false, jqXHR.responseText, request); }
               }
             });

    }

    this.fillCombo = function(selector, data, options) {
      options = options || { };
      valueField = options.valueField || 'rowid';
      nameField = options.nameField || 'name';
      hideEmptyValue = options.hideEmptyValue || false;
      emptyValue = options.emptyValue || '-- any --';
      selectedValue = options.selectedValue || null;
      selectedValueField = options.selectedValueField || null;
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
      })
    }

    this.deferredSelect = function(filter, callback, msec) {
      var savedFilter = {}
      for(var i in filter) {
        savedFilter[i] = filter[i];
      }
      msec = msec || this.options.refreshDelay;
      window.clearTimeout(this.refreshTimeout);
      this.refreshTimeout = window.setTimeout(function() {
        datasource.select(savedFilter, callback);
      }, msec);
    }

  }

}(jQuery, window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataGrid = function (selector, rowTemplate, dataSource, options) {
    return new BrDataGrid(selector, rowTemplate, dataSource, options);
  }

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var $ = jQuery;
    var _this = this;

    // this.cb = {};
    this.selector = $(selector);
    this.options = options || {};
    this.options.templates = this.options.templates || {};
    this.options.templates.row = $(rowTemplate).html();
    this.options.templates.header = this.options.templates.header ? $(this.options.templates.header).html() : '';
    this.options.templates.footer = this.options.templates.footer ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData = this.options.templates.noData ? $(this.options.templates.noData).html() : '';
    this.options.dataSource = dataSource;
    this.options.headersSelector = this.options.headersSelector || this.selector;
    this.options.footersSelector = this.options.footersSelector || this.selector;
    this.options.selectors = this.options.selectors || {};

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.after('insert', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('update', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('remove', function(data) { 
      _this.events.trigger('change', data);
    });

    this.after('select', function(data) { 
      _this.events.trigger('change', data);
    });

    this.renderHeader = function(data) {
      var data = _this.events.trigger('renderHeader', data) || data;
      var result = $(br.fetch(_this.options.templates.header, data));
      return result;
    }

    this.renderFooter = function(data) {
      var data = _this.events.trigger('renderFooter', data) || data;
      var result = $(br.fetch(_this.options.templates.footer, data));
      return result;
    }

    this.renderRow = function(data) {
      var data = _this.events.trigger('renderRow', data) || data;
      var result = $(br.fetch(_this.options.templates.row, data));
      result.data('data-row', data);
      return result;
    }

    this.prepend = function(row) {
      return _this.selector.prepend(row);
    }

    this.append = function(row) {
      return _this.selector.append(row);
    }

    this.addDataRow = function(row) {
      var tableRow = _this.renderRow(row);
      if (_this.options.appendInInsert) {
        _this.append(tableRow);
      } else {
        _this.prepend(tableRow);
      }
      return tableRow;
    }

    this.init = function() {

      function isGridEmpty() {
        return (_this.selector.find('[data-rowid]').length == 0);
      }

      function checkForEmptyGrid() {
        if (isGridEmpty()) {
          _this.selector.html(_this.options.templates.noData);
          _this.events.trigger('nodata');
        }
      }

      if (this.options.dataSource) {

        var dataSource = this.options.dataSource;

        dataSource.before('select', function() {
          _this.selector.html('');
          _this.selector.addClass('progress-big');
        });

        dataSource.after('select', function() {
          _this.selector.removeClass('progress-big');
        });

        dataSource.on('select', function(data) {
          _this.selector.removeClass('progress-big');
          _this.render(data);
        });

        dataSource.after('insert', function(success, response) {
          if (success) {
            if (isGridEmpty()) {
              _this.selector.html(''); // to remove No-Data box
            }
            _this.addDataRow(response);
          }
        });

        dataSource.on('update', function(data) {
          var row = _this.selector.find('[data-rowid=' + data.rowid + ']');
          if (row.length == 1) {
            var ctrl = _this.renderRow(data);
            var s = ctrl.html();
            ctrl.remove();
            if (s.length > 0) {
              $(row[0]).html(s).hide().fadeIn();
              _this.events.trigger('update');
            } else {
              _this.options.dataSource.select();
            }
          } else {
            _this.options.dataSource.select();
          }
        });

        dataSource.on('remove', function(rowid) {
          var row = _this.selector.find('[data-rowid=' + rowid + ']');
          if (row.length > 0) {
            if (br.isTouchScreen()) {
              row.remove();
              checkForEmptyGrid();
              _this.events.trigger('remove');
            } else {
              row.fadeOut(function() {
                $(this).remove();
                checkForEmptyGrid();
                _this.events.trigger('remove');
              });
            }
          } else {
            _this.options.dataSource.select();
          }
        });

        if (this.options.deleteSelector) {
          _this.selector.on('click', this.options.deleteSelector, function() {
            var row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              var rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm( 'Delete confirmation'
                          , 'Are you sure you want delete this record?'
                          , function() {
                              _this.options.dataSource.remove(rowid);
                            }
                          );
              }
            }
          });
        }

      }

    }

    this.render = function(data) {
      if (data) {
        if (_this.options.freeGrid) {
          if (data.headers) {
            for (i in data.headers) {
              if (data.headers[i]) {
                $(_this.options.headersSelector).append(_this.renderHeader(data.headers[i]));
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                $(_this.options.footersSelector).append(_this.renderFooter(data.headers[i]));
              }
            }
          }
          _this.selector.html('');
          $(_this.options.headersSelector).html('');
          $(_this.options.footersSelector).html('');
          if (data.rows) {
            if (data.rows.length == 0) {
              _this.selector.html(this.options.templates.noData);
            } else {
              for (i in data.rows) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    _this.selector.append(_this.renderRow(data.rows[i].row));
                  }
                  if (data.rows[i].header) {
                    $(_this.options.headersSelector).append(_this.renderHeader(data.rows[i].header));
                  }
                  if (data.rows[i].footer) {
                    $(_this.options.footersSelector).append(_this.renderFooter(data.rows[i].footer));
                  }
                }
              }
            }
          } else {
            _this.selector.html(this.options.templates.noData);
          }
        } else {
          _this.selector.html('');
          if (data && (data.length > 0)) {
            for (i in data) {
              if (data[i]) {
                _this.selector.append(_this.renderRow(data[i]));
              }
            }
          } else {
            _this.selector.html(this.options.templates.noData);
          }
        }
      } else {
        _this.selector.html(this.options.templates.noData);
      }
      _this.events.trigger('change', data);
    }

    return this.init();

  }

}(jQuery, window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    return new BrDataCombo(selector, dataSource, options);
  }

  function BrDataCombo(selector, dataSource, options) {

    var $ = jQuery;
    var _this = this;

    this.selector = $(selector);
    this.dataSource = dataSource;
    this.options = options || {};
    this.fields = this.options.fields || {};
    this.saveSelection = this.options.saveSelection || false;
    this.selectedValueField = this.options.selectedValueField || null;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); }
    this.on     = function(event, callback) { this.events.on(event, callback); }
    this.after  = function(event, callback) { this.events.after(event, callback); }

    this.val = function(value) {
      if (value != undefined) {
        $(this.selector).val(value); 
      }
      return $(this.selector).val();
    }

    this.valOrNull = function() {
      var val = this.val();
      return br.isEmpty(val) ? null : val; 
    }

    function storageTag(c) {

      return document.location.toString() + ':filter-value:' + $(c).attr('name');
    }

    function render(data) {

      var options = _this.options;

      if (_this.saveSelection) {
        options.selectedValue = br.storage.get(storageTag(_this.selector));
      }

      valueField = options.valueField || 'rowid';
      nameField = options.nameField || 'name';
      hideEmptyValue = options.hideEmptyValue || false;
      levelField = options.levelField || null;
      emptyValue = options.emptyValue || '-- any --';
      selectedValue = options.selectedValue || null;
      selectedValueField = options.selectedValueField || null;
      _this.selector.each(function() {
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
          s = s + '<option value="' + data[i][valueField] + '">';
          if (levelField != null) {
            var margin = (br.toInt(data[i][levelField]) - 1) * 4;
            for(k = 0; k < margin; k++) {
              s = s + '&nbsp;';
            }
          }        
          s = s + data[i][nameField];
          s = s + '</option>';
        }
        $(this).html(s);
        if (!br.isEmpty(selectedValue)) {
          val = selectedValue;
        }
        if (!br.isEmpty(val)) {
          $(this).find('option[value=' + val +']').attr('selected', 'selected');
        }

      });
    
      _this.events.trigger('load', data);

      if (window.Select2) {
        $(_this.selector).select2();
      }

    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }
      _this.dataSource.select(filter, function(result, response) {
        if (result) {
          if (callback) {
            callback.call(_this.selector, result, response);
          }
          if (window.Select2) {
            $(_this.selector).select2();
          }
        }
      }, { fields: _this.fields });
    }

    _this.dataSource.on('select', function(data) {
      render(data);
    });

    _this.dataSource.on('insert', function(data) {
  //    insert(data, true);
    });

    _this.dataSource.on('update', function(data) {
  //    _this.selector.find('option[value=' + rowid +']').remove();
    });

    _this.dataSource.on('remove', function(rowid) {
      _this.selector.find('option[value=' + rowid +']').remove();
      _this.events.trigger('change');
    });

    _this.selector.change(function() {
      if (_this.saveSelection) {
        br.storage.set(storageTag(this), $(this).val());
      }
      _this.events.trigger('change');
      if (window.Select2) {
        $(this).select2();
      }      
    });

  }

}(jQuery, window);


// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      var data = $(selector).data('editable');
      if (data) {
        data[callback](value);
      }
    } else {
      $(selector).live('click', function(e) {
        var $this = $(this)
          , data = $this.data('editable');
        if (!data) {
          $this.data('editable', (data = new BrEditable(this, callback)));
        }
        data.click(e);
      });
    }
  }

  function BrEditable(ctrl, saveCallback) {

    var _this = this;
    _this.ctrl = $(ctrl);
    _this.saveCallback = saveCallback;
    _this.editor = null;
    _this.tooltip = null;
    _this.click = function(element, e) {
      if (!_this.activated()) {
        var content = _this.ctrl.text();
        _this.ctrl.data('original-content', content);
        var width = _this.ctrl.innerWidth();
        _this.ctrl.text('');
        _this.editor = $('<input type="text" />');
        _this.editor.css('width', '100%');
        _this.editor.css('box-sizing', '100%');
        _this.editor.css('-webkit-box-sizing', 'border-box');
        _this.editor.css('-moz-box-sizing', 'border-box');
        _this.editor.css('-ms-box-sizing', 'border-box');
        _this.editor.css('margin-top', '2px');
        _this.editor.css('margin-bottom', '2px');
        _this.editor.val(content);
        _this.ctrl.append(_this.editor);
        _this.ctrl.css('width', width - 10);
        _this.editor.focus();
        _this.editor.attr('data-original-title', 'Press [Enter] to save changes, [Esc] to cancel changes.');
        _this.editor.tooltip({placement: 'bottom', trigger: 'focus'});
        _this.editor.tooltip('show');
        _this.tooltip = _this.editor.data('tooltip');
        $(_this.editor).keyup(function(e) {
          if (e.keyCode == 13) {
            var content = $(this).val();
            if (typeof _this.saveCallback == 'function') {
              _this.editor.tooltip('hide');
              _this.saveCallback.call(_this.ctrl, content);
            } else {
              _this.apply(content);
            }
          }
          if (e.keyCode == 27) {
            _this.cancel();
          }
        });
      }
    }
    _this.activated = function() {
      return _this.editor != null;
    }
    _this.apply = function(content) {
      _this.tooltip.hide();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.text(content);
    }
    _this.cancel = function() {
      _this.tooltip.hide();
      _this.editor.remove();
      _this.editor = null;
      _this.ctrl.text(_this.ctrl.data('original-content'));
    }

  }

}(jQuery, window);
// 
// Bright Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  window.br.showError = function(s) {
    alert(s);
  };

  window.br.growlError = function(s, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
            title: ' '
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

  window.br.growlMessage = function(s, image) {
    if (!br.isEmpty(s)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
            title: ' '
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
    $('.container').html('<div class="row"><div class="span12"><div class="alert alert-error"><h4>Error!</h4><p>' + s + '</p></div></div></div>');
    throw '';
  }

  window.br.confirm = function(title, message, buttons, callback) {
    var s = '<div class="modal">'+
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>' +
            '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-footer">';
    if (typeof buttons == 'function') {
      callback = buttons;
      s = s + '<a href="javascript:;" class="btn btn-primary action-confirm-close" rel="confirm">Yes</a>';
    } else {
      for(var i in buttons) {
        s = s + '<a href="javascript:;" class="btn action-confirm-close" rel="' + i + '">' + buttons[i] + '</a>';
      }
    }
    s = s + '<a href="javascript:;" class="btn" data-dismiss="modal">&nbsp;Cancel&nbsp;</a>';
    s = s + '</div></div>';
    var dialog = $(s);
    $(dialog)
      .on('show', function(e) {
        $(this).find('.action-confirm-close').click(function() {
          $(dialog).modal('hide');
          callback.call(this, $(this).attr('rel'));
        });
      })
      .on('hide', function(e) {
        dialog.remove();
      });
    $(dialog).modal();
  }

  window.br.inform = function(title, message, callback) {
    var s = '<div class="modal">';
    if (title != '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body">' + message + '</div>' +
            '<div class="modal-footer"><a href="javascript:;" class="btn" data-dismiss="modal">&nbsp;Dismiss&nbsp;</a></div></div>';
    var dialog = $(s);
    $(dialog)
      .on('hide', function(e) {
        if (callback) {
          callback.call(this);
        }
        dialog.remove();
      });
    $(dialog).modal();
  }

  window.br.prompt = function(title, fields, callback, options) {
    options = options || {};
    var s = '<div class="modal">'+
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>' + title + '</h3></div>' +
            '<div class="modal-body">';
    var inputs = {}
    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      inputs[fields] = '';
    }
    for(var i in inputs) {
      s = s + '<label>' + i + '</label>' +
              '<input type="text" class="span4" value="' + inputs[i] + '" data-click-on-enter=".action-confirm-close" />';
    }
    s = s + '</div>' +
            '<div class="modal-footer">';
    s = s + '<a href="javascript:;" class="btn btn-primary action-confirm-close" rel="confirm" >Ok</a>';
    s = s + '<a href="javascript:;" class="btn" data-dismiss="modal">&nbsp;Cancel&nbsp;</a>';
    s = s + '</div></div>';
    var dialog = $(s);
    $(dialog)
      .on('shown', function(e) {
        $(this).find('input[type=text]')[0].focus();
      })
      .on('show', function(e) {
        $(this).find('.action-confirm-close').click(function() {
          $(dialog).modal('hide');
          var results = [];
          $(this).closest('div.modal').find('input[type=text]').each(function() {
            results.push($(this).val());
          });
          callback.call(this, results);
        });
      })
      .on('hide', function(e) {
        dialog.remove();
      });
    $(dialog).modal();
  }

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

  window.br.showAJAXProgress = function() {
    progressCounter++;
    $('.ajax-in-progress').css('visibility', 'visible');
  }

  window.br.hideAJAXProgress = function() {
    progressCounter--;
    if (progressCounter <= 0) {
      $('.ajax-in-progress').css('visibility', 'hidden');
      progressCounter = 0;
    }
  }

  $(document).ready(function() { 

    var notAuthorized = false;

    $('body').ajaxStart(function() { br.showAJAXProgress(); });

    $('body').ajaxStop(function() { br.hideAJAXProgress(); });
    
    $('body').ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
      if (jqXHR.status == 401) {
        if (!notAuthorized) {
          notAuthorized = true;
          br.growlError('You are trying to run operation which require authorization.');
        }
      }
    });

    $('input[data-click-on-enter]').live('keypress', function(e) {
      if (e.keyCode == 13) { $($(this).attr('data-click-on-enter')).trigger('click'); }
    });

    if ($('.focused').length > 0) {
      $('.focused')[0].focus();
    }

  });

}(jQuery, window);
