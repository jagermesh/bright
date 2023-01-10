/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  let baseUrl = '';
  let brightUrl = '';
  let scripts = $('script');
  let logStarted = false;

  for (let i = 0, length = scripts.length; i < length; i++) {
    let src = $(scripts[i]).attr('src');
    if (!br.isEmpty(src)) {
      if (/bright\/.+?[.]js/i.test(src)) {
        let idx = src.indexOf('vendor/');
        if (idx == -1) {
          idx = src.indexOf('bright/');
        }
        if (idx != -1) {
          baseUrl = src.substring(0, idx);
          idx = src.indexOf('bright/');
          brightUrl = src.substring(0, idx) + 'bright/';
          break;
        }
      }
    }
  }

  window.br.baseUrl = baseUrl;
  window.br.brightUrl = brightUrl;
  window.br.popupBlocker = 'unknown';

  window.br.log = function() {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.log.apply(this, arguments);
    }
  };

  window.br.logError = function() {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.error.apply(this, arguments);
    }
  };

  window.br.logWarning = function() {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.warn.apply(this, arguments);
    }
  };

  window.br.isTouchScreen = function() {
    return ('maxTouchPoints' in navigator) ? (navigator.maxTouchPoints > 0 ? true : false) : false;
  };

  window.br.isMobileDevice = function() {
    return br.isTouchScreen() || screen.height <= 768;
  };

  window.br.isiOS = function() {
    return /iPad|iPhone|iPod/.test(navigator.platform);
  };

  window.br.isiPad = function() {
    return /iPad/.test(navigator.platform);
  };

  window.br.isiPhone = function() {
    return /iPhone/.test(navigator.platform);
  };

  window.br.isAndroid = function() {
    return (/Android/i.test(navigator.userAgent));
  };

  window.br.isIE = function() {
    return !!document.documentMode; // At least IE6
  };

  window.br.isOpera = function() {
    return (!!window.opr && !!window.opr.addons) || !!window.opera;
  };

  window.br.isFirefox = function() {
    return typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
  };

  window.br.isSafari = function() {
    return /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
  };

  window.br.isChrome = function() {
    return !!window.chrome && !window.opera;
  };

  window.br.redirectBack = function(defaultHref, params) {
    let refresh = params.refresh ? true : false;
    let whenImpossible = params.whenImpossible;
    let inPopup = (window.opener !== null);
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
            //
          }
        }
      }
      window.close();
    } else {
      let caller = br.isEmpty(br.request.get('caller')) ? null : br.request.get('caller');
      let referrer = br.isEmpty(document.referrer) ? null : (document.referrer.indexOf('login') != -1 ? null : (document.referrer == document.location.toString() ? null : document.referrer));
      let href = br.isEmpty(defaultHref) ? null : defaultHref;
      let redirectHref = (caller ? caller : (href ? href : referrer));
      if (redirectHref) {
        br.redirect(redirectHref);
      } else {
        window.setTimeout(function() {
          if (whenImpossible) {
            whenImpossible(this);
          } else {
            br.error('Oops', 'Sorry, we can not determine where to redirect you from this page, please go there manually :(', function(event) {
              event.preventDefault();
            });
          }
        });
      }
    }
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

  window.br.processArray = function(array, processRowCallback, processCompleteCallback, params) {
    function processQueued(processRowCallback0, processCompleteCallback0, params0) {
      if (array.length > 0) {
        let rowid = array.shift();
        processRowCallback0(rowid, function() {
          if (params0.showProgress) {
            br.stepProgress();
          }
          processQueued(processRowCallback0, processCompleteCallback0, params0);
        });
      } else {
        if (params0.showProgress) {
          br.hideProgress();
        }
        if (processCompleteCallback0) {
          processCompleteCallback0();
        }
      }
    }

    params = params || {};
    if (array.length > 0) {
      if (params.showProgress) {
        br.startProgress(array.length, params.title || '');
      }
      processQueued(processRowCallback, processCompleteCallback, params);
    } else {
      br.growlError('Please select at least one record');
    }
  };

  function BrTrn() {
    let trn = [];
    this.get = function(phrase) {
      if (trn[phrase]) {
        return trn[phrase];
      } else {
        return phrase;
      }
    };
    this.set = function(phrase, translation) {
      trn[phrase] = translation;
      return this;
    };
    return this;
  }

  let brTrn = new BrTrn();

  window.br.trn = function(phrase) {
    if (phrase) {
      return brTrn.get(phrase);
    } else {
      return brTrn;
    }
  };

  window.br.preloadImages = function(images) {
    try {
      let div = document.createElement('div');
      let s = div.style;
      s.position = 'absolute';
      s.top = s.left = 0;
      s.visibility = 'hidden';
      document.body.appendChild(div);
      div.innerHTML = '<img src="' + images.join('" /><img src="') + '" />';
    } catch (e) {
      // Error. Do nothing.
    }
  };

  window.br.randomInt = function(minValue, maxValue) {
    const crypto = window.crypto || window.msCrypto;
    const min = minValue || 0;
    const max = maxValue || 0xFFFFFFF;
    const range = max - min;
    const bitsNeeded = Math.ceil(Math.log2(range));
    const bytesNeeded = Math.ceil(bitsNeeded / 8);
    const mask = Math.pow(2, bitsNeeded) - 1;

    let rval = 0;

    let byteArray = new Uint8Array(bytesNeeded);
    crypto.getRandomValues(byteArray);

    let p = (bytesNeeded - 1) * 8;

    for (let i = 0; i < bytesNeeded; i++) {
      rval += byteArray[i] * Math.pow(2, p);
      p -= 8;
    }

    rval = rval & mask;

    if (rval >= range) {
      return br.randomInt(min, max);
    }

    return min + rval;
  };

  window.br.forHtml = function(text) {
    if (text) {
      text = text.split('<').join('&lt;').split('>').join('&gt;');
    }
    return text;
  };

  window.br.extend = function(Child, Parent) {
    let F = function() {
      // fake
    };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
  };

  function openUrl(href, options) {
    options = options || {};

    let message;
    const target = (options.target ? options.target : '_blank');

    if (options.urlTitle) {
      message = `
        <p>Click below to open link manually</p>
        <p><a target="${target}" class="action-open-link" href="${href}" style="word-wrap: break-word">${options.urlTitle}</a></p>
      `;
    } else {
      message = `
        <p>Click a <a target="${target}" class="action-open-link" href="${href}" style="word-wrap: break-word">here</a> to open link manually</p>
      `;
    }

    message = `
      ${message}
      <p>To eliminate this extra step, we recommend you modify your settings to disable the popup blocker.</p>
    `;

    const dialog = br.inform('You browser is currently blocking popups', message);
    $('.action-open-link', dialog).on('click', function() {
      dialog.modal('hide');
      dialog.remove();
    });
  }

  window.br.openPage = function(href, options) {
    options = options || {};

    if (br.isSafari()) {
      br.openPopup(href, options);
    } else {
      const link = document.createElement('a');
      link.href = href;
      link.target = options.target ? options.target : '_blank';
      link.click();
    }
  };

  window.br.openFile = function(href) {
    const link = document.createElement('a');
    link.href = href;
    link.click();
  };

  window.br.openPopup = function(href, options) {
    if (br.isString(options)) {
      options = {
        target: options
      };
    } else {
      options = options || {};
    }

    options.target = options.target || '_blank';

    if (window.br.popupBlocker == 'active') {
      openUrl(href, options);
    } else {
      let width, height;
      if (screen.width) {
        if (options.fullScreen) {
          width = screen.width;
        } else {
          if (screen.width >= 1280) {
            width = 1000;
          } else
          if (screen.width >= 1024) {
            width = 800;
          } else {
            width = 600;
          }
        }
      }
      if (screen.height) {
        if (options.fullScreen) {
          height = screen.height;
        } else {
          if (screen.height >= 900) {
            height = 700;
          } else
          if (screen.height >= 800) {
            height = 600;
          } else {
            height = 500;
          }
        }
      }
      let left = (screen.width) ? (screen.width - width) / 2 : 0;
      let settings = `height=${height},width=${width},top=20,left=${left},menubar=0,scrollbars=1,resizable=1`;
      let win = window.open(href, options.target, settings);
      if (win) {
        window.br.popupBlocker = 'inactive';
        win.focus();
        return win;
      } else {
        window.br.popupBlocker = 'active';
        openUrl(href, options);
      }
    }
  };

  function handleModified(element, deferred) {
    let listName1 = 'BrModified_Callbacks2';
    let listName2 = 'BrModified_LastCahange2';
    if (deferred) {
      window.clearTimeout(element.data('BrModified_Timeout'));
      listName1 = 'BrModified_Callbacks1';
      listName2 = 'BrModified_LastCahange1';
    }
    if (element.data(listName2) != element.val()) {
      element.data(listName2, element.val());
      let callbacks = element.data(listName1);
      if (callbacks) {
        for (let i = 0, length = callbacks.length; i < length; i++) {
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
      let listName = 'BrModified_Callbacks2';
      if (deferred) {
        listName = 'BrModified_Callbacks1';
      }
      let callbacks = $(this).data(listName) || [];
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
      if (
        (e.keyCode == 8) ||
        (e.keyCode == 32) ||
        (e.keyCode == 91) ||
        (e.keyCode == 93) ||
        ((e.keyCode >= 48) && (e.keyCode <= 90)) ||
        ((e.keyCode >= 96) && (e.keyCode <= 111)) ||
        ((e.keyCode >= 186) && (e.keyCode <= 222))
      ) {
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
      if (
        (e.keyCode == 13) ||
        (e.keyCode == 8) ||
        (e.keyCode == 32) ||
        (e.keyCode == 91) ||
        (e.keyCode == 93) ||
        ((e.keyCode >= 48) && (e.keyCode <= 90)) ||
        ((e.keyCode >= 96) && (e.keyCode <= 111)) ||
        ((e.keyCode >= 186) && (e.keyCode <= 222))
      ) {
        callback.call(this);
      }
    });
  };

  window.br.closeConfirmationMessage = 'Some changes have been made. Are you sure you want to close current window?';

  let closeConfirmationRequired = false;
  let windowUnloading = false;

  function brightConfirmClose() {
    if (closeConfirmationRequired) {
      return br.closeConfirmationMessage;
    } else {
      windowUnloading = true;
    }
  }

  $(window).on('beforeunload', function() {
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

  window.br.events = br.eventQueue();
  window.br.before = function(event, callback) {
    window.br.events.before(event, callback);
  };
  window.br.on = function(event, callback) {
    window.br.events.on(event, callback);
  };
  window.br.after = function(event, callback) {
    window.br.events.after(event, callback);
  };

  window.br.confirmClose = function(message) {
    if (message) {
      br.closeConfirmationMessage = message;
    }
    closeConfirmationRequired = true;
    window.br.events.trigger('closeConfirmationRequested');
  };

  window.br.resetCloseConfirmation = function() {
    closeConfirmationRequired = false;
    window.br.events.trigger('closeConfirmationReset');
  };

  window.br.backToCaller = function(href, refresh) {
    // check opener
    if (window.opener !== null) {
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
            //
          }
        }
      }
      window.close();
    } else
    if (br.request.get('caller')) {
      document.location = br.request.get('caller');
    } else
    if (document.referrer && (document.referrer.indexOf(`${document.location.protocol}//${document.location.host}`) === 0)) {
      if (br.isSafari()) {
        if (history.length > 0) {
          history.back();
          window.setTimeout(function () {
            if (document.location != document.referrer) {
              document.location = document.referrer;
            }
          });
        } else {
          document.location = document.referrer;
        }
      } else {
        window.close();
        window.setTimeout(function () {
          if (document.location != document.referrer) {
            document.location = document.referrer;
          }
        });
      }
    } else {
      document.location = href;
    }
  };

  window.br.disableBounce = function(container) {
    let $container = container;

    $('body').css('overflow', 'hidden');

    function resize() {
      let h = $(window).height();
      $container.css('height', h + 'px');
      $container.css('overflow', 'auto');
    }

    resize();

    $(window).on('resize', function() {
      resize();
    });
  };

  window.br.getSelection = function() {
    let html = '';

    if (typeof window.getSelection != 'undefined') {
      let sel = window.getSelection();
      if (sel.rangeCount) {
        let container = document.createElement('div');
        for (let i = 0, length = sel.rangeCount; i < length; ++i) {
          container.appendChild(sel.getRangeAt(i).cloneContents());
        }
        html = container.innerHTML;
      }
    } else
    if (typeof document.selection != 'undefined') {
      if (document.selection.type == 'Text') {
        html = document.selection.createRange().htmlText;
      }
    }

    return html;
  };

  window.br.do = function(f) {
    f.call();
  };

  /* eslint-disable */
  window.br.load = window.br.resourceLoader = function(j) {
    function p(c, a) {
      var g = j.createElement(c),
        b;
      for (b in a) a.hasOwnProperty(b) && g.setAttribute(b, a[b]);
      return g
    }

    function m(c) {
      var a = k[c],
        b, e;
      if (a) b = a.callback, e = a.urls, e.shift(), h = 0, e.length || (b && b.call(a.context, a.obj), k[c] = null, n[c].length && i(c))
    }

    function u() {
      if (!b) {
        var c = navigator.userAgent;
        b = {
          async: j.createElement("script").async === !0
        };
        (b.webkit = /AppleWebKit\//.test(c)) || (b.ie = /MSIE/.test(c)) || (b.opera = /Opera/.test(c)) || (b.gecko = /Gecko\//.test(c)) || (b.unknown = !0)
      }
    }

    function i(c,
      a, g, e, h) {
      var i = function() {
          m(c)
        },
        o = c === "css",
        f, l, d, q;
      u();
      if (a)
        if (a = typeof a === "string" ? [a] : a.concat(), o || b.async || b.gecko || b.opera) n[c].push({
          urls: a,
          callback: g,
          obj: e,
          context: h
        });
        else {
          f = 0;
          for (l = a.length; f < l; ++f) n[c].push({
            urls: [a[f]],
            callback: f === l - 1 ? g : null,
            obj: e,
            context: h
          })
        }
      if (!k[c] && (q = k[c] = n[c].shift())) {
        r || (r = j.head || j.getElementsByTagName("head")[0]);
        a = q.urls;
        f = 0;
        for (l = a.length; f < l; ++f) g = a[f], o ? d = b.gecko ? p("style") : p("link", {
          href: g,
          rel: "stylesheet"
        }) : (d = p("script", {
          src: g
        }), d.async = !1), d.className =
        "lazyload", d.setAttribute("charset", "utf-8"), b.ie && !o ? d.onreadystatechange = function() {
          if (/loaded|complete/.test(d.readyState)) d.onreadystatechange = null, i()
        } : o && (b.gecko || b.webkit) ? b.webkit ? (q.urls[f] = d.href, s()) : (d.innerHTML = '@import "' + g + '";', m("css")) : d.onload = d.onerror = i, r.appendChild(d)
      }
    }

    function s() {
      var c = k.css,
        a;
      if (c) {
        for (a = t.length; --a >= 0;)
          if (t[a].href === c.urls[0]) {
            m("css");
            break
          }
        h += 1;
        c && (h < 200 ? setTimeout(s, 50) : m("css"))
      }
    }
    var b, r, k = {},
      h = 0,
      n = {
        css: [],
        js: []
      },
      t = j.styleSheets;
    return {
      css: function(c,
        a, b, e) {
        i("css", c, a, b, e)
      },
      js: function(c, a, b, e) {
        i("js", c, a, b, e)
      }
    }
  }(document);
  /* eslint-enable */

  window.br.URL = window.URL || window.webkitURL;

  // Media devices - audio/video

  let lastAnimationFramtTime = 0;

  window.br.requestAnimationFrame = function(callback) {
    let requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback0) {
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16 - (currTime - lastAnimationFramtTime));
        let id = window.setTimeout(function() {
          callback0(currTime + timeToCall);
        }, timeToCall);
        lastAnimationFramtTime = currTime + timeToCall;
        return id;
      };

    return requestAnimationFrame.call(window, callback);
  };

  window.br.cancelAnimationFrame = function(requestID) {
    let cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function(requestID0) {
        window.clearTimeout(requestID0);
      };

    return cancelAnimationFrame.call(window, requestID);
  };

  window.br.getUserMedia = function(constraints, successCallback, errorCallback) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);
    } else {
      let getUserMedia =
        navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.msGetUserMedia ||
        function() {
          errorCallback();
        };

      return getUserMedia.call(window.navigator, constraints, successCallback, errorCallback);
    }
  };

  window.br.getAudioContext = function() {
    let AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    return new AudioContext();
  };

  let beepAudioContext;

  window.br.beep = function(callback) {
    try {
      let duration = 0.1;
      if (!beepAudioContext) {
        beepAudioContext = br.getAudioContext();
      }
      let osc = beepAudioContext.createOscillator();
      osc.type = 0;
      osc.connect(beepAudioContext.destination);
      let now = beepAudioContext.currentTime;
      if (osc.start) {
        osc.start(now);
        osc.stop(now + duration);
      } else {
        osc.noteOn(now);
        osc.noteOff(now + duration);
      }

      osc.onended = function() {
        if (callback) {
          callback();
        }
      };
    } catch (error) {
      br.log(error);
    }
  };

  function triggerErrorEvent(data, event) {
    if (data.reason && (data.reason != 'Script error.')) {
      try {
        let result = window.br.events.trigger('error', data);
        if (result) {
          event.preventDefault();
        }
      } catch (error) {
        // we don't care
      }
    }
  }
  if (window.addEventListener) {
    window.addEventListener('error', function(event) {
      if (event.origin != document.location.origin) {
        return;
      }

      let data = {
        reason: event.message,
        data: null,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? (event.error.stack || event.error.backtrace || event.error.stacktrace) : null,
        location: document.location.toString()
      };

      triggerErrorEvent(data, event);
    });

    window.addEventListener('unhandledrejection', function(event) {
      if (event.target.origin != document.location.origin) {
        return;
      }

      let data = {
        reason: event.reason,
        filename: null,
        lineno: null,
        colno: null,
        stack: null,
        location: document.location.toString()
      };

      window.br.logWarning('Unhandled promise rejection');
      if (data.reason) {
        window.br.logWarning(data.reason);
      }

      triggerErrorEvent(data, event);
    });
  }

  function printObject(obj, eol, prefix) {
    let result = '';

    prefix = prefix ? prefix : '';
    for (let name in obj) {
      if (br.isObject(obj[name])) {
        result += printObject(obj[name], eol, `${prefix}${name}.`);
      } else {
        result += `${prefix}${name}: ${obj[name]}${eol}`;
      }
    }

    return result;
  }

  window.br.setErrorsBeacon = function(url, format) {
    if (navigator.sendBeacon) {
      format = format || 'json';
      br.on('error', function(error) {
        if (!error.filename || (error.filename.indexOf('chrome-extension') !== 0)) {
          let message = '';
          switch (format) {
            case 'html':
              message = printObject(error, '<br />');
              break;
            case 'text':
              message = printObject(error, '\n');
              break;
            default:
              message = JSON.stringify(error);
              break;
          }
          let data = new FormData();
          data.append('error', message);
          navigator.sendBeacon(url, data);
        }
      });
    }
  };
})(jQuery, window);