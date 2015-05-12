/*!
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

  window.br.isiOS = function() {
    var ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)));
  };

  window.br.isAndroid = function() {
    var ua = navigator.userAgent;
    return (/android/i.test(ua));
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

  window.br.openPopup = function(url, w, h) {

    if (w === null) {
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
    }
    if (h === null) {
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
    }
    var left = (screen.width) ? (screen.width-w)/2 : 0;
    var settings = 'height='+h+',width='+w+',top=20,left='+left+',menubar=0,scrollbars=1,resizable=1';
    var win = window.open(url, '_blank', settings);
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
      }, 1000));
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

  /* jshint ignore:start */
  window.br.load = window.br.resourceLoader = function(j){function p(c,a){var g=j.createElement(c),b;for(b in a)a.hasOwnProperty(b)&&g.setAttribute(b,a[b]);return g}function m(c){var a=k[c],b,e;if(a)b=a.callback,e=a.urls,e.shift(),h=0,e.length||(b&&b.call(a.context,a.obj),k[c]=null,n[c].length&&i(c))}function u(){if(!b){var c=navigator.userAgent;b={async:j.createElement("script").async===!0};(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}}function i(c,
    a,g,e,h){var i=function(){m(c)},o=c==="css",f,l,d,q;u();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||b.async||b.gecko||b.opera)n[c].push({urls:a,callback:g,obj:e,context:h});else{f=0;for(l=a.length;f<l;++f)n[c].push({urls:[a[f]],callback:f===l-1?g:null,obj:e,context:h})}if(!k[c]&&(q=k[c]=n[c].shift())){r||(r=j.head||j.getElementsByTagName("head")[0]);a=q.urls;f=0;for(l=a.length;f<l;++f)g=a[f],o?d=b.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(d=p("script",{src:g}),d.async=!1),d.className=
    "lazyload",d.setAttribute("charset","utf-8"),b.ie&&!o?d.onreadystatechange=function(){if(/loaded|complete/.test(d.readyState))d.onreadystatechange=null,i()}:o&&(b.gecko||b.webkit)?b.webkit?(q.urls[f]=d.href,s()):(d.innerHTML='@import "'+g+'";',m("css")):d.onload=d.onerror=i,r.appendChild(d)}}function s(){var c=k.css,a;if(c){for(a=t.length;--a>=0;)if(t[a].href===c.urls[0]){m("css");break}h+=1;c&&(h<200?setTimeout(s,50):m("css"))}}var b,r,k={},h=0,n={css:[],js:[]},t=j.styleSheets;return{css:function(c,
    a,b,e){i("css",c,a,b,e)},js:function(c,a,b,e){i("js",c,a,b,e)}}}(document);
  /* jshint ignore:end */

})(jQuery, window);
