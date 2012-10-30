// 
// Breeze Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  window.br = window.br || {};

  var baseUrl = '';
  $('script').each(function(i, e) {
    var s = $(e).attr('src');
    if (s) {
      var idx = s.indexOf('breeze/js/breeze.js');
      if (idx > 0) {
        baseUrl = s.substring(0, idx);
        return true;
      }
    }
  });

  window.br.baseUrl = baseUrl;

  window.br.log = function(msg) {
    if (typeof(console) != 'undefined') {
      console.log(msg);
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
        for(i in callbacks) {
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

  function breezeConfirmClose() {
    return br.closeConfirmationMessage;
  }

  window.br.confirmClose = function(message) {
    if (message) {
      br.closeConfirmationMessage = message;
    }

    window.onbeforeunload = breezeConfirmClose;
  }

  window.br.resetCloseConfirmation = function(message) {
    window.onbeforeunload = null;
  }

  window.br.resourceLoader = function(j){function p(c,a){var g=j.createElement(c),b;for(b in a)a.hasOwnProperty(b)&&g.setAttribute(b,a[b]);return g}function m(c){var a=k[c],b,e;if(a)b=a.callback,e=a.urls,e.shift(),h=0,e.length||(b&&b.call(a.context,a.obj),k[c]=null,n[c].length&&i(c))}function u(){if(!b){var c=navigator.userAgent;b={async:j.createElement("script").async===!0};(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}}function i(c,
    a,g,e,h){var i=function(){m(c)},o=c==="css",f,l,d,q;u();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||b.async||b.gecko||b.opera)n[c].push({urls:a,callback:g,obj:e,context:h});else{f=0;for(l=a.length;f<l;++f)n[c].push({urls:[a[f]],callback:f===l-1?g:null,obj:e,context:h})}if(!k[c]&&(q=k[c]=n[c].shift())){r||(r=j.head||j.getElementsByTagName("head")[0]);a=q.urls;f=0;for(l=a.length;f<l;++f)g=a[f],o?d=b.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(d=p("script",{src:g}),d.async=!1),d.className=
    "lazyload",d.setAttribute("charset","utf-8"),b.ie&&!o?d.onreadystatechange=function(){if(/loaded|complete/.test(d.readyState))d.onreadystatechange=null,i()}:o&&(b.gecko||b.webkit)?b.webkit?(q.urls[f]=d.href,s()):(d.innerHTML='@import "'+g+'";',m("css")):d.onload=d.onerror=i,r.appendChild(d)}}function s(){var c=k.css,a;if(c){for(a=t.length;--a>=0;)if(t[a].href===c.urls[0]){m("css");break}h+=1;c&&(h<200?setTimeout(s,50):m("css"))}}var b,r,k={},h=0,n={css:[],js:[]},t=j.styleSheets;return{css:function(c,
    a,b,e){i("css",c,a,b,e)},js:function(c,a,b,e){i("js",c,a,b,e)}}}(this.document);

}(jQuery, window);
