/*!
  * Bootstrap v4.6.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["exports","jquery","popper.js"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap={},t.jQuery,t.Popper)}(this,(function(t,e,n){"use strict";function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=i(e),a=i(n);function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function l(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function u(t){var e=this,n=!1;return o.default(this).one(d.TRANSITION_END,(function(){n=!0})),setTimeout((function(){n||d.triggerTransitionEnd(e)}),t),this}var d={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=o.default(t).css("transition-duration"),n=o.default(t).css("transition-delay"),i=parseFloat(e),a=parseFloat(n);return i||a?(e=e.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(e)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){o.default(t).trigger("transitionend")},supportsTransitionEnd:function(){return Boolean("transitionend")},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],a=e[i],s=a&&d.isElement(a)?"element":null===(l=a)||"undefined"==typeof l?""+l:{}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(o).test(s))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+o+'".')}var l},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){var e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?d.findShadowRoot(t.parentNode):null},jQueryDetection:function(){if("undefined"==typeof o.default)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=o.default.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||t[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};d.jQueryDetection(),o.default.fn.emulateTransitionEnd=u,o.default.event.special[d.TRANSITION_END]={bindType:"transitionend",delegateType:"transitionend",handle:function(t){if(o.default(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var f="alert",c=o.default.fn[f],h=function(){function t(t){this._element=t}var e=t.prototype;return e.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.dispose=function(){o.default.removeData(this._element,"bs.alert"),this._element=null},e._getRootElement=function(t){var e=d.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=o.default(t).closest(".alert")[0]),n},e._triggerCloseEvent=function(t){var e=o.default.Event("close.bs.alert");return o.default(t).trigger(e),e},e._removeElement=function(t){var e=this;if(o.default(t).removeClass("show"),o.default(t).hasClass("fade")){var n=d.getTransitionDurationFromElement(t);o.default(t).one(d.TRANSITION_END,(function(n){return e._destroyElement(t,n)})).emulateTransitionEnd(n)}else this._destroyElement(t)},e._destroyElement=function(t){o.default(t).detach().trigger("closed.bs.alert").remove()},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this),i=n.data("bs.alert");i||(i=new t(this),n.data("bs.alert",i)),"close"===e&&i[e](this)}))},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();o.default(document).on("click.bs.alert.data-api",'[data-dismiss="alert"]',h._handleDismiss(new h)),o.default.fn[f]=h._jQueryInterface,o.default.fn[f].Constructor=h,o.default.fn[f].noConflict=function(){return o.default.fn[f]=c,h._jQueryInterface};var g=o.default.fn.button,m=function(){function t(t){this._element=t,this.shouldAvoidTriggerChange=!1}var e=t.prototype;return e.toggle=function(){var t=!0,e=!0,n=o.default(this._element).closest('[data-toggle="buttons"]')[0];if(n){var i=this._element.querySelector('input:not([type="hidden"])');if(i){if("radio"===i.type)if(i.checked&&this._element.classList.contains("active"))t=!1;else{var a=n.querySelector(".active");a&&o.default(a).removeClass("active")}t&&("checkbox"!==i.type&&"radio"!==i.type||(i.checked=!this._element.classList.contains("active")),this.shouldAvoidTriggerChange||o.default(i).trigger("change")),i.focus(),e=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains("active")),t&&o.default(this._element).toggleClass("active"))},e.dispose=function(){o.default.removeData(this._element,"bs.button"),this._element=null},t._jQueryInterface=function(e,n){return this.each((function(){var i=o.default(this),a=i.data("bs.button");a||(a=new t(this),i.data("bs.button",a)),a.shouldAvoidTriggerChange=n,"toggle"===e&&a[e]()}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();o.default(document).on("click.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=t.target,n=e;if(o.default(e).hasClass("btn")||(e=o.default(e).closest(".btn")[0]),!e||e.hasAttribute("disabled")||e.classList.contains("disabled"))t.preventDefault();else{var i=e.querySelector('input:not([type="hidden"])');if(i&&(i.hasAttribute("disabled")||i.classList.contains("disabled")))return void t.preventDefault();"INPUT"!==n.tagName&&"LABEL"===e.tagName||m._jQueryInterface.call(o.default(e),"toggle","INPUT"===n.tagName)}})).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=o.default(t.target).closest(".btn")[0];o.default(e).toggleClass("focus",/^focus(in)?$/.test(t.type))})),o.default(window).on("load.bs.button.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')),e=0,n=t.length;e<n;e++){var i=t[e],o=i.querySelector('input:not([type="hidden"])');o.checked||o.hasAttribute("checked")?i.classList.add("active"):i.classList.remove("active")}for(var a=0,s=(t=[].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length;a<s;a++){var l=t[a];"true"===l.getAttribute("aria-pressed")?l.classList.add("active"):l.classList.remove("active")}})),o.default.fn.button=m._jQueryInterface,o.default.fn.button.Constructor=m,o.default.fn.button.noConflict=function(){return o.default.fn.button=g,m._jQueryInterface};var p="carousel",_=".bs.carousel",v=o.default.fn[p],b={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},y={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},E={TOUCH:"touch",PEN:"pen"},w=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(".carousel-indicators"),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e=t.prototype;return e.next=function(){this._isSliding||this._slide("next")},e.nextWhenVisible=function(){var t=o.default(this._element);!document.hidden&&t.is(":visible")&&"hidden"!==t.css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide("prev")},e.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(".carousel-item-next, .carousel-item-prev")&&(d.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(t){var e=this;this._activeElement=this._element.querySelector(".active.carousel-item");var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)o.default(this._element).one("slid.bs.carousel",(function(){return e.to(t)}));else{if(n===t)return this.pause(),void this.cycle();var i=t>n?"next":"prev";this._slide(i,this._items[t])}},e.dispose=function(){o.default(this._element).off(_),o.default.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(t){return t=r({},b,t),d.typeCheckConfig(p,t,y),t},e._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;this.touchDeltaX=0,e>0&&this.prev(),e<0&&this.next()}},e._addEventListeners=function(){var t=this;this._config.keyboard&&o.default(this._element).on("keydown.bs.carousel",(function(e){return t._keydown(e)})),"hover"===this._config.pause&&o.default(this._element).on("mouseenter.bs.carousel",(function(e){return t.pause(e)})).on("mouseleave.bs.carousel",(function(e){return t.cycle(e)})),this._config.touch&&this._addTouchEventListeners()},e._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var e=function(e){t._pointerEvent&&E[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},n=function(e){t._pointerEvent&&E[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout((function(e){return t.cycle(e)}),500+t._config.interval))};o.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel",(function(t){return t.preventDefault()})),this._pointerEvent?(o.default(this._element).on("pointerdown.bs.carousel",(function(t){return e(t)})),o.default(this._element).on("pointerup.bs.carousel",(function(t){return n(t)})),this._element.classList.add("pointer-event")):(o.default(this._element).on("touchstart.bs.carousel",(function(t){return e(t)})),o.default(this._element).on("touchmove.bs.carousel",(function(e){return function(e){e.originalEvent.touches&&e.originalEvent.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)})),o.default(this._element).on("touchend.bs.carousel",(function(t){return n(t)})))}},e._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},e._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(".carousel-item")):[],this._items.indexOf(t)},e._getItemByDirection=function(t,e){var n="next"===t,i="prev"===t,o=this._getItemIndex(e),a=this._items.length-1;if((i&&0===o||n&&o===a)&&!this._config.wrap)return e;var s=(o+("prev"===t?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},e._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(this._element.querySelector(".active.carousel-item")),a=o.default.Event("slide.bs.carousel",{relatedTarget:t,direction:e,from:i,to:n});return o.default(this._element).trigger(a),a},e._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll(".active"));o.default(e).removeClass("active");var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&o.default(n).addClass("active")}},e._updateInterval=function(){var t=this._activeElement||this._element.querySelector(".active.carousel-item");if(t){var e=parseInt(t.getAttribute("data-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}},e._slide=function(t,e){var n,i,a,s=this,l=this._element.querySelector(".active.carousel-item"),r=this._getItemIndex(l),u=e||l&&this._getItemByDirection(t,l),f=this._getItemIndex(u),c=Boolean(this._interval);if("next"===t?(n="carousel-item-left",i="carousel-item-next",a="left"):(n="carousel-item-right",i="carousel-item-prev",a="right"),u&&o.default(u).hasClass("active"))this._isSliding=!1;else if(!this._triggerSlideEvent(u,a).isDefaultPrevented()&&l&&u){this._isSliding=!0,c&&this.pause(),this._setActiveIndicatorElement(u),this._activeElement=u;var h=o.default.Event("slid.bs.carousel",{relatedTarget:u,direction:a,from:r,to:f});if(o.default(this._element).hasClass("slide")){o.default(u).addClass(i),d.reflow(u),o.default(l).addClass(n),o.default(u).addClass(n);var g=d.getTransitionDurationFromElement(l);o.default(l).one(d.TRANSITION_END,(function(){o.default(u).removeClass(n+" "+i).addClass("active"),o.default(l).removeClass("active "+i+" "+n),s._isSliding=!1,setTimeout((function(){return o.default(s._element).trigger(h)}),0)})).emulateTransitionEnd(g)}else o.default(l).removeClass("active"),o.default(u).addClass("active"),this._isSliding=!1,o.default(this._element).trigger(h);c&&this.cycle()}},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this).data("bs.carousel"),i=r({},b,o.default(this).data());"object"==typeof e&&(i=r({},i,e));var a="string"==typeof e?e:i.slide;if(n||(n=new t(this,i),o.default(this).data("bs.carousel",n)),"number"==typeof e)n.to(e);else if("string"==typeof a){if("undefined"==typeof n[a])throw new TypeError('No method named "'+a+'"');n[a]()}else i.interval&&i.ride&&(n.pause(),n.cycle())}))},t._dataApiClickHandler=function(e){var n=d.getSelectorFromElement(this);if(n){var i=o.default(n)[0];if(i&&o.default(i).hasClass("carousel")){var a=r({},o.default(i).data(),o.default(this).data()),s=this.getAttribute("data-slide-to");s&&(a.interval=!1),t._jQueryInterface.call(o.default(i),a),s&&o.default(i).data("bs.carousel").to(s),e.preventDefault()}}},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return b}}]),t}();o.default(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",w._dataApiClickHandler),o.default(window).on("load.bs.carousel.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-ride="carousel"]')),e=0,n=t.length;e<n;e++){var i=o.default(t[e]);w._jQueryInterface.call(i,i.data())}})),o.default.fn[p]=w._jQueryInterface,o.default.fn[p].Constructor=w,o.default.fn[p].noConflict=function(){return o.default.fn[p]=v,w._jQueryInterface};var T="collapse",C=o.default.fn[T],S={toggle:!0,parent:""},N={toggle:"boolean",parent:"(string|element)"},D=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=[].slice.call(document.querySelectorAll('[data-toggle="collapse"]')),i=0,o=n.length;i<o;i++){var a=n[i],s=d.getSelectorFromElement(a),l=[].slice.call(document.querySelectorAll(s)).filter((function(e){return e===t}));null!==s&&l.length>0&&(this._selector=s,this._triggerArray.push(a))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=t.prototype;return e.toggle=function(){o.default(this._element).hasClass("show")?this.hide():this.show()},e.show=function(){var e,n,i=this;if(!this._isTransitioning&&!o.default(this._element).hasClass("show")&&(this._parent&&0===(e=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t){return"string"==typeof i._config.parent?t.getAttribute("data-parent")===i._config.parent:t.classList.contains("collapse")}))).length&&(e=null),!(e&&(n=o.default(e).not(this._selector).data("bs.collapse"))&&n._isTransitioning))){var a=o.default.Event("show.bs.collapse");if(o.default(this._element).trigger(a),!a.isDefaultPrevented()){e&&(t._jQueryInterface.call(o.default(e).not(this._selector),"hide"),n||o.default(e).data("bs.collapse",null));var s=this._getDimension();o.default(this._element).removeClass("collapse").addClass("collapsing"),this._element.style[s]=0,this._triggerArray.length&&o.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded",!0),this.setTransitioning(!0);var l="scroll"+(s[0].toUpperCase()+s.slice(1)),r=d.getTransitionDurationFromElement(this._element);o.default(this._element).one(d.TRANSITION_END,(function(){o.default(i._element).removeClass("collapsing").addClass("collapse show"),i._element.style[s]="",i.setTransitioning(!1),o.default(i._element).trigger("shown.bs.collapse")})).emulateTransitionEnd(r),this._element.style[s]=this._element[l]+"px"}}},e.hide=function(){var t=this;if(!this._isTransitioning&&o.default(this._element).hasClass("show")){var e=o.default.Event("hide.bs.collapse");if(o.default(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",d.reflow(this._element),o.default(this._element).addClass("collapsing").removeClass("collapse show");var i=this._triggerArray.length;if(i>0)for(var a=0;a<i;a++){var s=this._triggerArray[a],l=d.getSelectorFromElement(s);if(null!==l)o.default([].slice.call(document.querySelectorAll(l))).hasClass("show")||o.default(s).addClass("collapsed").attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var r=d.getTransitionDurationFromElement(this._element);o.default(this._element).one(d.TRANSITION_END,(function(){t.setTransitioning(!1),o.default(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")})).emulateTransitionEnd(r)}}},e.setTransitioning=function(t){this._isTransitioning=t},e.dispose=function(){o.default.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(t){return(t=r({},S,t)).toggle=Boolean(t.toggle),d.typeCheckConfig(T,t,N),t},e._getDimension=function(){return o.default(this._element).hasClass("width")?"width":"height"},e._getParent=function(){var e,n=this;d.isElement(this._config.parent)?(e=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(e=this._config.parent[0])):e=document.querySelector(this._config.parent);var i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',a=[].slice.call(e.querySelectorAll(i));return o.default(a).each((function(e,i){n._addAriaAndCollapsedClass(t._getTargetFromElement(i),[i])})),e},e._addAriaAndCollapsedClass=function(t,e){var n=o.default(t).hasClass("show");e.length&&o.default(e).toggleClass("collapsed",!n).attr("aria-expanded",n)},t._getTargetFromElement=function(t){var e=d.getSelectorFromElement(t);return e?document.querySelector(e):null},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this),i=n.data("bs.collapse"),a=r({},S,n.data(),"object"==typeof e&&e?e:{});if(!i&&a.toggle&&"string"==typeof e&&/show|hide/.test(e)&&(a.toggle=!1),i||(i=new t(this,a),n.data("bs.collapse",i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return S}}]),t}();o.default(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',(function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var e=o.default(this),n=d.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(n));o.default(i).each((function(){var t=o.default(this),n=t.data("bs.collapse")?"toggle":e.data();D._jQueryInterface.call(t,n)}))})),o.default.fn[T]=D._jQueryInterface,o.default.fn[T].Constructor=D,o.default.fn[T].noConflict=function(){return o.default.fn[T]=C,D._jQueryInterface};var k="dropdown",A=o.default.fn[k],I=new RegExp("38|40|27"),j={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},O={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},x=function(){function t(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e=t.prototype;return e.toggle=function(){if(!this._element.disabled&&!o.default(this._element).hasClass("disabled")){var e=o.default(this._menu).hasClass("show");t._clearMenus(),e||this.show(!0)}},e.show=function(e){if(void 0===e&&(e=!1),!(this._element.disabled||o.default(this._element).hasClass("disabled")||o.default(this._menu).hasClass("show"))){var n={relatedTarget:this._element},i=o.default.Event("show.bs.dropdown",n),s=t._getParentFromElement(this._element);if(o.default(s).trigger(i),!i.isDefaultPrevented()){if(!this._inNavbar&&e){if("undefined"==typeof a.default)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");var l=this._element;"parent"===this._config.reference?l=s:d.isElement(this._config.reference)&&(l=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(l=this._config.reference[0])),"scrollParent"!==this._config.boundary&&o.default(s).addClass("position-static"),this._popper=new a.default(l,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===o.default(s).closest(".navbar-nav").length&&o.default(document.body).children().on("mouseover",null,o.default.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),o.default(this._menu).toggleClass("show"),o.default(s).toggleClass("show").trigger(o.default.Event("shown.bs.dropdown",n))}}},e.hide=function(){if(!this._element.disabled&&!o.default(this._element).hasClass("disabled")&&o.default(this._menu).hasClass("show")){var e={relatedTarget:this._element},n=o.default.Event("hide.bs.dropdown",e),i=t._getParentFromElement(this._element);o.default(i).trigger(n),n.isDefaultPrevented()||(this._popper&&this._popper.destroy(),o.default(this._menu).toggleClass("show"),o.default(i).toggleClass("show").trigger(o.default.Event("hidden.bs.dropdown",e)))}},e.dispose=function(){o.default.removeData(this._element,"bs.dropdown"),o.default(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},e._addEventListeners=function(){var t=this;o.default(this._element).on("click.bs.dropdown",(function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}))},e._getConfig=function(t){return t=r({},this.constructor.Default,o.default(this._element).data(),t),d.typeCheckConfig(k,t,this.constructor.DefaultType),t},e._getMenuElement=function(){if(!this._menu){var e=t._getParentFromElement(this._element);e&&(this._menu=e.querySelector(".dropdown-menu"))}return this._menu},e._getPlacement=function(){var t=o.default(this._element.parentNode),e="bottom-start";return t.hasClass("dropup")?e=o.default(this._menu).hasClass("dropdown-menu-right")?"top-end":"top-start":t.hasClass("dropright")?e="right-start":t.hasClass("dropleft")?e="left-start":o.default(this._menu).hasClass("dropdown-menu-right")&&(e="bottom-end"),e},e._detectNavbar=function(){return o.default(this._element).closest(".navbar").length>0},e._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},e._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),r({},t,this._config.popperConfig)},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this).data("bs.dropdown");if(n||(n=new t(this,"object"==typeof e?e:null),o.default(this).data("bs.dropdown",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},t._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=[].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')),i=0,a=n.length;i<a;i++){var s=t._getParentFromElement(n[i]),l=o.default(n[i]).data("bs.dropdown"),r={relatedTarget:n[i]};if(e&&"click"===e.type&&(r.clickEvent=e),l){var u=l._menu;if(o.default(s).hasClass("show")&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&o.default.contains(s,e.target))){var d=o.default.Event("hide.bs.dropdown",r);o.default(s).trigger(d),d.isDefaultPrevented()||("ontouchstart"in document.documentElement&&o.default(document.body).children().off("mouseover",null,o.default.noop),n[i].setAttribute("aria-expanded","false"),l._popper&&l._popper.destroy(),o.default(u).removeClass("show"),o.default(s).removeClass("show").trigger(o.default.Event("hidden.bs.dropdown",r)))}}}},t._getParentFromElement=function(t){var e,n=d.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},t._dataApiKeydownHandler=function(e){if(!(/input|textarea/i.test(e.target.tagName)?32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||o.default(e.target).closest(".dropdown-menu").length):!I.test(e.which))&&!this.disabled&&!o.default(this).hasClass("disabled")){var n=t._getParentFromElement(this),i=o.default(n).hasClass("show");if(i||27!==e.which){if(e.preventDefault(),e.stopPropagation(),!i||27===e.which||32===e.which)return 27===e.which&&o.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"),void o.default(this).trigger("click");var a=[].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t){return o.default(t).is(":visible")}));if(0!==a.length){var s=a.indexOf(e.target);38===e.which&&s>0&&s--,40===e.which&&s<a.length-1&&s++,s<0&&(s=0),a[s].focus()}}}},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return j}},{key:"DefaultType",get:function(){return O}}]),t}();o.default(document).on("keydown.bs.dropdown.data-api",'[data-toggle="dropdown"]',x._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api",".dropdown-menu",x._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api",x._clearMenus).on("click.bs.dropdown.data-api",'[data-toggle="dropdown"]',(function(t){t.preventDefault(),t.stopPropagation(),x._jQueryInterface.call(o.default(this),"toggle")})).on("click.bs.dropdown.data-api",".dropdown form",(function(t){t.stopPropagation()})),o.default.fn[k]=x._jQueryInterface,o.default.fn[k].Constructor=x,o.default.fn[k].noConflict=function(){return o.default.fn[k]=A,x._jQueryInterface};var P=o.default.fn.modal,R={backdrop:!0,keyboard:!0,focus:!0,show:!0},L={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},q=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(".modal-dialog"),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var e=t.prototype;return e.toggle=function(t){return this._isShown?this.hide():this.show(t)},e.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){o.default(this._element).hasClass("fade")&&(this._isTransitioning=!0);var n=o.default.Event("show.bs.modal",{relatedTarget:t});o.default(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),o.default(this._element).on("click.dismiss.bs.modal",'[data-dismiss="modal"]',(function(t){return e.hide(t)})),o.default(this._dialog).on("mousedown.dismiss.bs.modal",(function(){o.default(e._element).one("mouseup.dismiss.bs.modal",(function(t){o.default(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return e._showElement(t)})))}},e.hide=function(t){var e=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=o.default.Event("hide.bs.modal");if(o.default(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=o.default(this._element).hasClass("fade");if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),o.default(document).off("focusin.bs.modal"),o.default(this._element).removeClass("show"),o.default(this._element).off("click.dismiss.bs.modal"),o.default(this._dialog).off("mousedown.dismiss.bs.modal"),i){var a=d.getTransitionDurationFromElement(this._element);o.default(this._element).one(d.TRANSITION_END,(function(t){return e._hideModal(t)})).emulateTransitionEnd(a)}else this._hideModal()}}},e.dispose=function(){[window,this._element,this._dialog].forEach((function(t){return o.default(t).off(".bs.modal")})),o.default(document).off("focusin.bs.modal"),o.default.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(t){return t=r({},R,t),d.typeCheckConfig("modal",t,L),t},e._triggerBackdropTransition=function(){var t=this,e=o.default.Event("hidePrevented.bs.modal");if(o.default(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._element.scrollHeight>document.documentElement.clientHeight;n||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static");var i=d.getTransitionDurationFromElement(this._dialog);o.default(this._element).off(d.TRANSITION_END),o.default(this._element).one(d.TRANSITION_END,(function(){t._element.classList.remove("modal-static"),n||o.default(t._element).one(d.TRANSITION_END,(function(){t._element.style.overflowY=""})).emulateTransitionEnd(t._element,i)})).emulateTransitionEnd(i),this._element.focus()}},e._showElement=function(t){var e=this,n=o.default(this._element).hasClass("fade"),i=this._dialog?this._dialog.querySelector(".modal-body"):null;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),o.default(this._dialog).hasClass("modal-dialog-scrollable")&&i?i.scrollTop=0:this._element.scrollTop=0,n&&d.reflow(this._element),o.default(this._element).addClass("show"),this._config.focus&&this._enforceFocus();var a=o.default.Event("shown.bs.modal",{relatedTarget:t}),s=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,o.default(e._element).trigger(a)};if(n){var l=d.getTransitionDurationFromElement(this._dialog);o.default(this._dialog).one(d.TRANSITION_END,s).emulateTransitionEnd(l)}else s()},e._enforceFocus=function(){var t=this;o.default(document).off("focusin.bs.modal").on("focusin.bs.modal",(function(e){document!==e.target&&t._element!==e.target&&0===o.default(t._element).has(e.target).length&&t._element.focus()}))},e._setEscapeEvent=function(){var t=this;this._isShown?o.default(this._element).on("keydown.dismiss.bs.modal",(function(e){t._config.keyboard&&27===e.which?(e.preventDefault(),t.hide()):t._config.keyboard||27!==e.which||t._triggerBackdropTransition()})):this._isShown||o.default(this._element).off("keydown.dismiss.bs.modal")},e._setResizeEvent=function(){var t=this;this._isShown?o.default(window).on("resize.bs.modal",(function(e){return t.handleUpdate(e)})):o.default(window).off("resize.bs.modal")},e._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._showBackdrop((function(){o.default(document.body).removeClass("modal-open"),t._resetAdjustments(),t._resetScrollbar(),o.default(t._element).trigger("hidden.bs.modal")}))},e._removeBackdrop=function(){this._backdrop&&(o.default(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(t){var e=this,n=o.default(this._element).hasClass("fade")?"fade":"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",n&&this._backdrop.classList.add(n),o.default(this._backdrop).appendTo(document.body),o.default(this._element).on("click.dismiss.bs.modal",(function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._triggerBackdropTransition():e.hide())})),n&&d.reflow(this._backdrop),o.default(this._backdrop).addClass("show"),!t)return;if(!n)return void t();var i=d.getTransitionDurationFromElement(this._backdrop);o.default(this._backdrop).one(d.TRANSITION_END,t).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){o.default(this._backdrop).removeClass("show");var a=function(){e._removeBackdrop(),t&&t()};if(o.default(this._element).hasClass("fade")){var s=d.getTransitionDurationFromElement(this._backdrop);o.default(this._backdrop).one(d.TRANSITION_END,a).emulateTransitionEnd(s)}else a()}else t&&t()},e._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(t.left+t.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),n=[].slice.call(document.querySelectorAll(".sticky-top"));o.default(e).each((function(e,n){var i=n.style.paddingRight,a=o.default(n).css("padding-right");o.default(n).data("padding-right",i).css("padding-right",parseFloat(a)+t._scrollbarWidth+"px")})),o.default(n).each((function(e,n){var i=n.style.marginRight,a=o.default(n).css("margin-right");o.default(n).data("margin-right",i).css("margin-right",parseFloat(a)-t._scrollbarWidth+"px")}));var i=document.body.style.paddingRight,a=o.default(document.body).css("padding-right");o.default(document.body).data("padding-right",i).css("padding-right",parseFloat(a)+this._scrollbarWidth+"px")}o.default(document.body).addClass("modal-open")},e._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));o.default(t).each((function(t,e){var n=o.default(e).data("padding-right");o.default(e).removeData("padding-right"),e.style.paddingRight=n||""}));var e=[].slice.call(document.querySelectorAll(".sticky-top"));o.default(e).each((function(t,e){var n=o.default(e).data("margin-right");"undefined"!=typeof n&&o.default(e).css("margin-right",n).removeData("margin-right")}));var n=o.default(document.body).data("padding-right");o.default(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},e._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(e,n){return this.each((function(){var i=o.default(this).data("bs.modal"),a=r({},R,o.default(this).data(),"object"==typeof e&&e?e:{});if(i||(i=new t(this,a),o.default(this).data("bs.modal",i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e](n)}else a.show&&i.show(n)}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return R}}]),t}();o.default(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',(function(t){var e,n=this,i=d.getSelectorFromElement(this);i&&(e=document.querySelector(i));var a=o.default(e).data("bs.modal")?"toggle":r({},o.default(e).data(),o.default(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var s=o.default(e).one("show.bs.modal",(function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",(function(){o.default(n).is(":visible")&&n.focus()}))}));q._jQueryInterface.call(o.default(e),a,this)})),o.default.fn.modal=q._jQueryInterface,o.default.fn.modal.Constructor=q,o.default.fn.modal.noConflict=function(){return o.default.fn.modal=P,q._jQueryInterface};var F=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Q={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},B=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,H=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function U(t,e,n){if(0===t.length)return t;if(n&&"function"==typeof n)return n(t);for(var i=(new window.DOMParser).parseFromString(t,"text/html"),o=Object.keys(e),a=[].slice.call(i.body.querySelectorAll("*")),s=function(t,n){var i=a[t],s=i.nodeName.toLowerCase();if(-1===o.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var l=[].slice.call(i.attributes),r=[].concat(e["*"]||[],e[s]||[]);l.forEach((function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===F.indexOf(n)||Boolean(t.nodeValue.match(B)||t.nodeValue.match(H));for(var i=e.filter((function(t){return t instanceof RegExp})),o=0,a=i.length;o<a;o++)if(n.match(i[o]))return!0;return!1})(t,r)||i.removeAttribute(t.nodeName)}))},l=0,r=a.length;l<r;l++)s(l);return i.body.innerHTML}var M="tooltip",W=o.default.fn[M],V=new RegExp("(^|\\s)bs-tooltip\\S+","g"),z=["sanitize","whiteList","sanitizeFn"],K={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},X={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Y={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",customClass:"",sanitize:!0,sanitizeFn:null,whiteList:Q,popperConfig:null},$={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},J=function(){function t(t,e){if("undefined"==typeof a.default)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var e=t.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=o.default(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),o.default(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(o.default(this.getTipElement()).hasClass("show"))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function(){clearTimeout(this._timeout),o.default.removeData(this.element,this.constructor.DATA_KEY),o.default(this.element).off(this.constructor.EVENT_KEY),o.default(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&o.default(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function(){var t=this;if("none"===o.default(this.element).css("display"))throw new Error("Please use show on visible elements");var e=o.default.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){o.default(this.element).trigger(e);var n=d.findShadowRoot(this.element),i=o.default.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!i)return;var s=this.getTipElement(),l=d.getUID(this.constructor.NAME);s.setAttribute("id",l),this.element.setAttribute("aria-describedby",l),this.setContent(),this.config.animation&&o.default(s).addClass("fade");var r="function"==typeof this.config.placement?this.config.placement.call(this,s,this.element):this.config.placement,u=this._getAttachment(r);this.addAttachmentClass(u);var f=this._getContainer();o.default(s).data(this.constructor.DATA_KEY,this),o.default.contains(this.element.ownerDocument.documentElement,this.tip)||o.default(s).appendTo(f),o.default(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new a.default(this.element,s,this._getPopperConfig(u)),o.default(s).addClass("show"),o.default(s).addClass(this.config.customClass),"ontouchstart"in document.documentElement&&o.default(document.body).children().on("mouseover",null,o.default.noop);var c=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,o.default(t.element).trigger(t.constructor.Event.SHOWN),"out"===e&&t._leave(null,t)};if(o.default(this.tip).hasClass("fade")){var h=d.getTransitionDurationFromElement(this.tip);o.default(this.tip).one(d.TRANSITION_END,c).emulateTransitionEnd(h)}else c()}},e.hide=function(t){var e=this,n=this.getTipElement(),i=o.default.Event(this.constructor.Event.HIDE),a=function(){"show"!==e._hoverState&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),o.default(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(o.default(this.element).trigger(i),!i.isDefaultPrevented()){if(o.default(n).removeClass("show"),"ontouchstart"in document.documentElement&&o.default(document.body).children().off("mouseover",null,o.default.noop),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,o.default(this.tip).hasClass("fade")){var s=d.getTransitionDurationFromElement(n);o.default(n).one(d.TRANSITION_END,a).emulateTransitionEnd(s)}else a();this._hoverState=""}},e.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},e.isWithContent=function(){return Boolean(this.getTitle())},e.addAttachmentClass=function(t){o.default(this.getTipElement()).addClass("bs-tooltip-"+t)},e.getTipElement=function(){return this.tip=this.tip||o.default(this.config.template)[0],this.tip},e.setContent=function(){var t=this.getTipElement();this.setElementContent(o.default(t.querySelectorAll(".tooltip-inner")),this.getTitle()),o.default(t).removeClass("fade show")},e.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=U(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?o.default(e).parent().is(t)||t.empty().append(e):t.text(o.default(e).text())},e.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},e._getPopperConfig=function(t){var e=this;return r({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}},this.config.popperConfig)},e._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},e._getContainer=function(){return!1===this.config.container?document.body:d.isElement(this.config.container)?o.default(this.config.container):o.default(document).find(this.config.container)},e._getAttachment=function(t){return X[t.toUpperCase()]},e._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach((function(e){if("click"===e)o.default(t.element).on(t.constructor.Event.CLICK,t.config.selector,(function(e){return t.toggle(e)}));else if("manual"!==e){var n="hover"===e?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,i="hover"===e?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;o.default(t.element).on(n,t.config.selector,(function(e){return t._enter(e)})).on(i,t.config.selector,(function(e){return t._leave(e)}))}})),this._hideModalHandler=function(){t.element&&t.hide()},o.default(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=r({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||o.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),o.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),o.default(e.getTipElement()).hasClass("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e.config.delay&&e.config.delay.show?e._timeout=setTimeout((function(){"show"===e._hoverState&&e.show()}),e.config.delay.show):e.show())},e._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||o.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),o.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e.config.delay&&e.config.delay.hide?e._timeout=setTimeout((function(){"out"===e._hoverState&&e.hide()}),e.config.delay.hide):e.hide())},e._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},e._getConfig=function(t){var e=o.default(this.element).data();return Object.keys(e).forEach((function(t){-1!==z.indexOf(t)&&delete e[t]})),"number"==typeof(t=r({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),d.typeCheckConfig(M,t,this.constructor.DefaultType),t.sanitize&&(t.template=U(t.template,t.whiteList,t.sanitizeFn)),t},e._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},e._cleanTipClass=function(){var t=o.default(this.getTipElement()),e=t.attr("class").match(V);null!==e&&e.length&&t.removeClass(e.join(""))},e._handlePopperPlacementChange=function(t){this.tip=t.instance.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},e._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(o.default(t).removeClass("fade"),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this),i=n.data("bs.tooltip"),a="object"==typeof e&&e;if((i||!/dispose|hide/.test(e))&&(i||(i=new t(this,a),n.data("bs.tooltip",i)),"string"==typeof e)){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return Y}},{key:"NAME",get:function(){return M}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return $}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return K}}]),t}();o.default.fn[M]=J._jQueryInterface,o.default.fn[M].Constructor=J,o.default.fn[M].noConflict=function(){return o.default.fn[M]=W,J._jQueryInterface};var G="popover",Z=o.default.fn[G],tt=new RegExp("(^|\\s)bs-popover\\S+","g"),et=r({},J.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),nt=r({},J.DefaultType,{content:"(string|element|function)"}),it={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},ot=function(t){var e,n;function i(){return t.apply(this,arguments)||this}n=t,(e=i).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var a=i.prototype;return a.isWithContent=function(){return this.getTitle()||this._getContent()},a.addAttachmentClass=function(t){o.default(this.getTipElement()).addClass("bs-popover-"+t)},a.getTipElement=function(){return this.tip=this.tip||o.default(this.config.template)[0],this.tip},a.setContent=function(){var t=o.default(this.getTipElement());this.setElementContent(t.find(".popover-header"),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(".popover-body"),e),t.removeClass("fade show")},a._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},a._cleanTipClass=function(){var t=o.default(this.getTipElement()),e=t.attr("class").match(tt);null!==e&&e.length>0&&t.removeClass(e.join(""))},i._jQueryInterface=function(t){return this.each((function(){var e=o.default(this).data("bs.popover"),n="object"==typeof t?t:null;if((e||!/dispose|hide/.test(t))&&(e||(e=new i(this,n),o.default(this).data("bs.popover",e)),"string"==typeof t)){if("undefined"==typeof e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},l(i,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return et}},{key:"NAME",get:function(){return G}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return it}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return nt}}]),i}(J);o.default.fn[G]=ot._jQueryInterface,o.default.fn[G].Constructor=ot,o.default.fn[G].noConflict=function(){return o.default.fn[G]=Z,ot._jQueryInterface};var at="scrollspy",st=o.default.fn[at],lt={offset:10,method:"auto",target:""},rt={offset:"number",method:"string",target:"(string|element)"},ut=function(){function t(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" .nav-link,"+this._config.target+" .list-group-item,"+this._config.target+" .dropdown-item",this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,o.default(this._scrollElement).on("scroll.bs.scrollspy",(function(t){return n._process(t)})),this.refresh(),this._process()}var e=t.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?"offset":"position",n="auto"===this._config.method?e:this._config.method,i="position"===n?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(t){var e,a=d.getSelectorFromElement(t);if(a&&(e=document.querySelector(a)),e){var s=e.getBoundingClientRect();if(s.width||s.height)return[o.default(e)[n]().top+i,a]}return null})).filter((function(t){return t})).sort((function(t,e){return t[0]-e[0]})).forEach((function(e){t._offsets.push(e[0]),t._targets.push(e[1])}))},e.dispose=function(){o.default.removeData(this._element,"bs.scrollspy"),o.default(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(t){if("string"!=typeof(t=r({},lt,"object"==typeof t&&t?t:{})).target&&d.isElement(t.target)){var e=o.default(t.target).attr("id");e||(e=d.getUID(at),o.default(t.target).attr("id",e)),t.target="#"+e}return d.typeCheckConfig(at,t,rt),t},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map((function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'})),n=o.default([].slice.call(document.querySelectorAll(e.join(","))));n.hasClass("dropdown-item")?(n.closest(".dropdown").find(".dropdown-toggle").addClass("active"),n.addClass("active")):(n.addClass("active"),n.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),n.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")),o.default(this._scrollElement).trigger("activate.bs.scrollspy",{relatedTarget:t})},e._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(t){return t.classList.contains("active")})).forEach((function(t){return t.classList.remove("active")}))},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this).data("bs.scrollspy");if(n||(n=new t(this,"object"==typeof e&&e),o.default(this).data("bs.scrollspy",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return lt}}]),t}();o.default(window).on("load.bs.scrollspy.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]')),e=t.length;e--;){var n=o.default(t[e]);ut._jQueryInterface.call(n,n.data())}})),o.default.fn[at]=ut._jQueryInterface,o.default.fn[at].Constructor=ut,o.default.fn[at].noConflict=function(){return o.default.fn[at]=st,ut._jQueryInterface};var dt=o.default.fn.tab,ft=function(){function t(t){this._element=t}var e=t.prototype;return e.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&o.default(this._element).hasClass("active")||o.default(this._element).hasClass("disabled"))){var e,n,i=o.default(this._element).closest(".nav, .list-group")[0],a=d.getSelectorFromElement(this._element);if(i){var s="UL"===i.nodeName||"OL"===i.nodeName?"> li > .active":".active";n=(n=o.default.makeArray(o.default(i).find(s)))[n.length-1]}var l=o.default.Event("hide.bs.tab",{relatedTarget:this._element}),r=o.default.Event("show.bs.tab",{relatedTarget:n});if(n&&o.default(n).trigger(l),o.default(this._element).trigger(r),!r.isDefaultPrevented()&&!l.isDefaultPrevented()){a&&(e=document.querySelector(a)),this._activate(this._element,i);var u=function(){var e=o.default.Event("hidden.bs.tab",{relatedTarget:t._element}),i=o.default.Event("shown.bs.tab",{relatedTarget:n});o.default(n).trigger(e),o.default(t._element).trigger(i)};e?this._activate(e,e.parentNode,u):u()}}},e.dispose=function(){o.default.removeData(this._element,"bs.tab"),this._element=null},e._activate=function(t,e,n){var i=this,a=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?o.default(e).children(".active"):o.default(e).find("> li > .active"))[0],s=n&&a&&o.default(a).hasClass("fade"),l=function(){return i._transitionComplete(t,a,n)};if(a&&s){var r=d.getTransitionDurationFromElement(a);o.default(a).removeClass("show").one(d.TRANSITION_END,l).emulateTransitionEnd(r)}else l()},e._transitionComplete=function(t,e,n){if(e){o.default(e).removeClass("active");var i=o.default(e.parentNode).find("> .dropdown-menu .active")[0];i&&o.default(i).removeClass("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(o.default(t).addClass("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),d.reflow(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&o.default(t.parentNode).hasClass("dropdown-menu")){var a=o.default(t).closest(".dropdown")[0];if(a){var s=[].slice.call(a.querySelectorAll(".dropdown-toggle"));o.default(s).addClass("active")}t.setAttribute("aria-expanded",!0)}n&&n()},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this),i=n.data("bs.tab");if(i||(i=new t(this),n.data("bs.tab",i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}}]),t}();o.default(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',(function(t){t.preventDefault(),ft._jQueryInterface.call(o.default(this),"show")})),o.default.fn.tab=ft._jQueryInterface,o.default.fn.tab.Constructor=ft,o.default.fn.tab.noConflict=function(){return o.default.fn.tab=dt,ft._jQueryInterface};var ct=o.default.fn.toast,ht={animation:"boolean",autohide:"boolean",delay:"number"},gt={animation:!0,autohide:!0,delay:500},mt=function(){function t(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var e=t.prototype;return e.show=function(){var t=this,e=o.default.Event("show.bs.toast");if(o.default(this._element).trigger(e),!e.isDefaultPrevented()){this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");var n=function(){t._element.classList.remove("showing"),t._element.classList.add("show"),o.default(t._element).trigger("shown.bs.toast"),t._config.autohide&&(t._timeout=setTimeout((function(){t.hide()}),t._config.delay))};if(this._element.classList.remove("hide"),d.reflow(this._element),this._element.classList.add("showing"),this._config.animation){var i=d.getTransitionDurationFromElement(this._element);o.default(this._element).one(d.TRANSITION_END,n).emulateTransitionEnd(i)}else n()}},e.hide=function(){if(this._element.classList.contains("show")){var t=o.default.Event("hide.bs.toast");o.default(this._element).trigger(t),t.isDefaultPrevented()||this._close()}},e.dispose=function(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),o.default(this._element).off("click.dismiss.bs.toast"),o.default.removeData(this._element,"bs.toast"),this._element=null,this._config=null},e._getConfig=function(t){return t=r({},gt,o.default(this._element).data(),"object"==typeof t&&t?t:{}),d.typeCheckConfig("toast",t,this.constructor.DefaultType),t},e._setListeners=function(){var t=this;o.default(this._element).on("click.dismiss.bs.toast",'[data-dismiss="toast"]',(function(){return t.hide()}))},e._close=function(){var t=this,e=function(){t._element.classList.add("hide"),o.default(t._element).trigger("hidden.bs.toast")};if(this._element.classList.remove("show"),this._config.animation){var n=d.getTransitionDurationFromElement(this._element);o.default(this._element).one(d.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},e._clearTimeout=function(){clearTimeout(this._timeout),this._timeout=null},t._jQueryInterface=function(e){return this.each((function(){var n=o.default(this),i=n.data("bs.toast");if(i||(i=new t(this,"object"==typeof e&&e),n.data("bs.toast",i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e](this)}}))},l(t,null,[{key:"VERSION",get:function(){return"4.6.0"}},{key:"DefaultType",get:function(){return ht}},{key:"Default",get:function(){return gt}}]),t}();o.default.fn.toast=mt._jQueryInterface,o.default.fn.toast.Constructor=mt,o.default.fn.toast.noConflict=function(){return o.default.fn.toast=ct,mt._jQueryInterface},t.Alert=h,t.Button=m,t.Carousel=w,t.Collapse=D,t.Dropdown=x,t.Modal=q,t.Popover=ot,t.Scrollspy=ut,t.Tab=ft,t.Toast=mt,t.Tooltip=J,t.Util=d,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=bootstrap.min.js.map
(function(window) {

  function SmartHint() {
    const _this = this;

    const componentClass = 'smart-hint';
    const styleClass = `${componentClass}-styles`;

    let stylesContainer = document.head.querySelectorAll(`style.${styleClass}`);
    let activeRenderer;

    if (stylesContainer.length === 0) {
      stylesContainer = document.createElement('style');
      stylesContainer.className = styleClass;
      stylesContainer.textContent = `
      .${componentClass}-container {
        position:absolute;
        background-color:black;
        color:white;
        z-index:10000;
        max-width:400px;
        padding: 5px 10px 5px 10px;
        font-size:10pt;
        word-break: break-word;

        border: 1px solid #999;
        border: 1px solid rgba(0,0,0,.2);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        outline: 0;
        -webkit-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -moz-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
      }
      .${componentClass}:hover {
        cursor: pointer;
      }
      .${componentClass}-show {
        transition: opacity 400ms;
        -webkit-transition: opacity 400ms;
        opacity: 1;
      }
      .${componentClass}-hide {
        transition: opacity 800ms;
        -webkit-transition: opacity 800ms;
        opacity: 0;
      }
    `;
      document.head.append(stylesContainer);
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    function checkForHintRenderer(nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];
        if (item.getAttribute && item.getAttribute(`${componentClass}-attached`)) {
          destroyHintRenderer(item);
          break;
        } else
        if (item.childNodes) {
          checkForHintRenderer(item.childNodes);
        }
      }
    }

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if ((mutation.type === 'childList') && (mutation.removedNodes.length > 0)) {
          checkForHintRenderer(mutation.removedNodes);
        }
      });
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true
    });

    function Renderer(selector, event, params) {
      const _this = this;

      let currentTop, currentLeft;

      function saveMousePos(event) {
        const pageX = event.pageX || event.touches[0].pageX;
        const pageY = event.pageY || event.touches[0].pageY;
        currentLeft = pageX;
        currentTop = pageY;
      }

      function reposition() {
        const documentHeight = parseFloat(getComputedStyle(document.body, null).height.replace('px', ''));
        const documentWidth = parseFloat(getComputedStyle(document.body, null).width.replace('px', ''));
        const contentHeight = hintOverlay.offsetHeight;
        const contentWidth = hintOverlay.offsetWidth;
        let deltaTop = 0;
        let deltaLeft = 0;
        if (currentLeft + contentWidth > documentWidth) {
          deltaLeft = contentWidth;
        }
        if (currentTop + contentHeight > documentHeight) {
          deltaTop = contentHeight;
        }
        let newPosition = {
          left: currentLeft - deltaLeft + (deltaLeft > 0 ? -10 : 10),
          top: currentTop - deltaTop + (deltaTop > 0 ? -10 : 10)
        };
        const windowHeight = window.innerHeight;
        const windowScrollTop = window.scrollY;
        let relativeTop = newPosition.top - windowScrollTop;
        if (relativeTop + contentHeight > windowHeight) {
          newPosition.top = newPosition.top - ((relativeTop + contentHeight) - windowHeight) - 10;
        } else
        if (newPosition.top < windowScrollTop) {
          newPosition.top = windowScrollTop + 10;
        }
        hintOverlay.style.left = `${newPosition.left}px`;
        hintOverlay.style.top = `${newPosition.top}px`;
      }

      _this.move = function(event) {
        saveMousePos(event);
        reposition();
      };

      _this.destroy = function() {
        hintOverlay.remove();
      };

      let hintOverlay = document.createElement('div');
      hintOverlay.classList.add(`${componentClass}-container`);
      hintOverlay.classList.add(`${componentClass}-hide`);
      hintOverlay.style.color = params.fgColor;
      hintOverlay.style.backgroundColor = params.bgColor;

      params.beautify(hintOverlay, selector);

      document.body.appendChild(hintOverlay);

      saveMousePos(event);

      params.getContent(selector).then(function(content) {
        if (content) {
          hintOverlay.innerHTML = content;
          reposition();
          hintOverlay.classList.add(`${componentClass}-show`);
          hintOverlay.classList.remove(`${componentClass}-hide`);
        }
      })

      return _this;
    }

    function createHintRenderer(element, event, params) {
      if (!element.classList.contains(componentClass)) {
        element.classList.add(componentClass);
      }
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      activeRenderer = new Renderer(element, event, params);
      element.setAttribute(`${componentClass}-attached`, true);
    }

    function syncHintRenderer(event) {
      if (activeRenderer) {
        activeRenderer.move(event);
      }
    }

    function destroyHintRenderer(element) {
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      if (element) {
        element.removeAttribute(`${componentClass}-attached`);
      }
    }

    function delegate(eventName, selector, handler) {
      document.addEventListener(eventName, function(event) {
        for (let target = event.target; target && target != this; target = target.parentNode) {
          if (target.matches(selector)) {
            handler.call(target, event);
            break;
          }
        }
      }, true);
    }

    _this.attach = function(selector, settings) {
      const params = Object.assign({
        bgColor: 'black',
        fgColor: 'white',
        getContent: function(selector) {
          return new Promise(function(resolve) {
            resolve(selector.getAttribute('data-hint'));
          });
        },
        beautify: function() {
        //
        }
      }, settings);

      delegate('mouseenter', selector, function(event) {
        createHintRenderer(this, event, params)
      });

      delegate('mousemove', selector, function(event) {
        syncHintRenderer(event);
      });

      delegate('mouseleave', selector, function() {
        destroyHintRenderer(this);
      });
    };

    return _this;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = SmartHint; else window.SmartHint = SmartHint;

})(window);

(function(window) {

  function LinkPreviewer() {
    const _this = this;

    const componentClass = 'link-previewer';
    const styleClass = `${componentClass}-styles`;

    let stylesContainer = document.head.querySelectorAll(`style.${styleClass}`);
    let activeRenderer;

    if (stylesContainer.length === 0) {
      stylesContainer = document.createElement('style');
      stylesContainer.className = styleClass;
      stylesContainer.textContent = `
      .${componentClass}-container {
        position:absolute;
        z-index:10000;
        width:400px;
        min-height:200px;

        border: 1px solid #999;
        border: 1px solid rgba(0,0,0,.2);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        outline: 0;
        -webkit-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -moz-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
      }
      .${componentClass}-image-loading {
        padding-top:36px;
        text-align:center;
      }
      .${componentClass}-image-content {
        width:100%;
        padding:5px;
      }
      .${componentClass}-drawing {
      }
      .${componentClass}-text {
        min-height:190px;
        max-height:300px;
        overflow:hidden;
        padding:10px;
      }
      .${componentClass}-html {
        padding:10px;
      }
      .${componentClass}-video {
        width:100%;
      }
      .${componentClass}-unknown-format {
        text-align:center;
        color:black;
        padding:10px;
      }
      .${componentClass}-unknown-format h2 {
        font-size:28px;
        line-height:28px;
        margin-top:34px;
      }
      .${componentClass}-unknown-format h4 {
        font-size:24px;
        line-height:24px;
        margin-top:20px;
      }
      .${componentClass}-show {
        transition: opacity 400ms;
        -webkit-transition: opacity 400ms;
        opacity: 1;
      }
      .${componentClass}-hide {
        transition: opacity 800ms;
        -webkit-transition: opacity 800ms;
        opacity: 0;
      }
    `;
      document.head.append(stylesContainer);
    }

    const previewerOverlayTemplate = `
    <div class="${componentClass}-image-loading" style="display:none;">
      <img src="data:image/gif;base64,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" />
    </div>
    <img class="${componentClass}-image-content ${componentClass}-content" style="display:none;" />
    <div class="${componentClass}-drawing ${componentClass}-content" style="display:none;">
      <canvas class="${componentClass}-drawing-canvas"></canvas>
    </div>
    <pre class="${componentClass}-text ${componentClass}-content" style="display:none;"></pre>
    <div class="${componentClass}-html ${componentClass}-content" style="display:none;"></div>
    <video class="${componentClass}-video ${componentClass}-content" autoplay muted loop style="display:none;"></video>
    <div class="${componentClass}-unknown-format" style="display:none;">
      <h2>Preview not available</h2>
      <h4>Unfortunately we cannot show preview for this file type</h4>
    </div>
  `;

    let cache = {};

    function Renderer(selector, event, params) {
      const _this = this;

      function showContent(newContent) {
        currentContent = newContent;
        reposition();
        currentContent.style.display = '';
        loadingImage.style.display = 'none';
      }

      function renderImage(url) {
        contentImage.src = url;
      }

      function renderVideo(url) {
        contentVideo.src = url;
      }

      function renderText(url) {
        fetch(url, {
          signal
        }).then(function(response) {
          if (response.ok) {
            response.text().then(function(response) {
              contentText.innerText = response;
              showContent(contentText);
            }).catch(function() {
              findRenderer(url, 'unknown');
            });
          } else {
            findRenderer(url, 'unknown');
          }
        }).catch(function(error) {
          findRenderer(url, 'unknown', error);
        });
        window.setTimeout(function() {
          controller.abort();
        }, 10000);
      }

      // function renderHtml(html) {
      //   contentHtml.innerHTML = html;
      //   showContent(contentHtml);
      // }

      function renderPdf(url) {
        window.pdfjsLib.getDocument(url).promise.then(function(pdfObj) {
          if (pdfObj.numPages > 0) {
            const pdfTotalPages = 1;
            for (let pdfCurPage = 1; pdfCurPage <= pdfTotalPages; pdfCurPage++) {
              pdfObj.getPage(pdfCurPage).then(function(page) {
                const desiredWidth = parseFloat(getComputedStyle(previewerOverlay, null).width.replace('px', '')) - 2;
                const viewport = page.getViewport({
                  scale: 1
                });
                const scale = desiredWidth / viewport.width;
                const scaledViewport = page.getViewport({
                  scale: scale
                });
                contentDrawingCanvas.width = scaledViewport.width;
                contentDrawingCanvas.height = scaledViewport.height;
                const renderContext = {
                  canvasContext: contentDrawingContext,
                  viewport: scaledViewport
                };
                page.render(renderContext);
                showContent(contentDrawing);
              });
            }
          } else {
            findRenderer(url, 'unknown');
          }
        }).catch(function() {
          findRenderer(url, 'unknown');
        });
      }

      function findRenderer(url, contentType, error) {
        if (error) {
          if (error.name != 'AbortError') {
            cache[url] = {
              url: url,
              contentType: contentType
            };
          }
        }
        if (contentType.indexOf('image') != -1) {
          renderImage(url);
        } else
        if (contentType.indexOf('video') != -1) {
          renderVideo(url);
        } else
        if (contentType.indexOf('pdf') != -1) {
          renderPdf(url);
        } else
        if (
          (contentType.indexOf('xml') != -1) ||
        (
          (contentType.indexOf('text') != -1) &&
          (contentType.indexOf('html') == -1)
        )
        ) {
          renderText(url);
        } else {
          showContent(unknownFormat);
        }
      }

      function identify(url) {
        let cachedResult = cache[url];
        if (cachedResult) {
          findRenderer(url, cachedResult.contentType);
        } else {
          fetch(url, {
            signal,
            method: 'HEAD'
          }).then(function(response) {
            if (response.ok) {
              findRenderer(url, response.headers.get('content-type'));
            } else {
              findRenderer(url, 'unknown');
            }
          }).catch(function(error) {
            findRenderer(url, 'unknown', error);
          });
          window.setTimeout(function() {
            controller.abort();
          }, 5000);
        }
      }

      function saveMousePos(event) {
        const pageX = event.pageX || event.touches[0].pageX;
        const pageY = event.pageY || event.touches[0].pageY;
        currentLeft = pageX;
        currentTop = pageY;
      }

      function reposition() {
        const documentHeight = parseFloat(getComputedStyle(document.body, null).height.replace('px', ''));
        const documentWidth = parseFloat(getComputedStyle(document.body, null).width.replace('px', ''));
        const contentHeight = previewerOverlay.offsetHeight;
        const contentWidth = previewerOverlay.offsetWidth;
        let deltaTop = 0;
        let deltaLeft = 0;
        if (currentLeft + contentWidth > documentWidth) {
          deltaLeft = contentWidth;
        }
        if (currentTop + contentHeight > documentHeight) {
          deltaTop = contentHeight;
        }
        let newPosition = {
          left: currentLeft - deltaLeft + (deltaLeft > 0 ? -10 : 10),
          top: currentTop - deltaTop + (deltaTop > 0 ? -10 : 10)
        };
        const windowHeight = window.innerHeight;
        const windowScrollTop = window.scrollY;
        const relativeTop = newPosition.top - windowScrollTop;
        if (relativeTop + contentHeight > windowHeight) {
          newPosition.top = newPosition.top - ((relativeTop + contentHeight) - windowHeight) - 10;
        } else
        if (newPosition.top < windowScrollTop) {
          newPosition.top = windowScrollTop + 10;
        }
        previewerOverlay.style.left = `${newPosition.left}px`;
        previewerOverlay.style.top = `${newPosition.top}px`;
      }

      _this.move = function(event) {
        saveMousePos(event);
        reposition();
      };

      _this.destroy = function() {
        controller.abort();
        previewerOverlay.remove();
      };

      let previewerOverlay = document.createElement('div');
      previewerOverlay.classList.add(`${componentClass}-container`);
      previewerOverlay.classList.add(`${componentClass}-hide`);
      previewerOverlay.style.color = params.fgColor;
      previewerOverlay.style.backgroundColor = params.bgColor;
      previewerOverlay.innerHTML = previewerOverlayTemplate;

      params.beautify(previewerOverlay, selector);

      document.body.appendChild(previewerOverlay);

      const contentImage = previewerOverlay.querySelector(`img.${componentClass}-image-content`);
      contentImage.onload = function() {
        showContent(contentImage);
      };
      contentImage.onerror = function() {
        findRenderer(this.src, 'unknown');
      };

      const contentVideo = previewerOverlay.querySelector(`video.${componentClass}-video`);
      contentVideo.onloadedmetadata = function() {
        showContent(contentVideo);
      };
      contentVideo.onerror = function() {
        findRenderer(this.src, 'unknown');
      };

      const contentText = previewerOverlay.querySelector(`pre.${componentClass}-text`);
      // const contentHtml = previewerOverlay.querySelector(`div.${componentClass}-html`);
      const contentDrawing = previewerOverlay.querySelector(`div.${componentClass}-drawing`);
      const contentDrawingCanvas = contentDrawing.querySelector(`canvas.${componentClass}-drawing-canvas`);
      const contentDrawingContext = contentDrawingCanvas.getContext('2d');
      const loadingImage = previewerOverlay.querySelector(`div.${componentClass}-image-loading`);
      const unknownFormat = previewerOverlay.querySelector(`div.${componentClass}-unknown-format`);

      const controller = new AbortController();
      const {
        signal
      } = controller;

      let currentContent = loadingImage;

      let currentTop, currentLeft;

      saveMousePos(event);
      reposition();
      previewerOverlay.classList.add(`${componentClass}-show`);
      previewerOverlay.classList.remove(`${componentClass}-hide`);
      loadingImage.style.display = '';

      identify(selector.getAttribute('href'));

      return _this;
    }

    function createPreviewRenderer(element, event, params) {
      if (!element.classList.contains(componentClass)) {
        element.classList.add(componentClass);
      }
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      activeRenderer = new Renderer(element, event, params);
      element.setAttribute(`${componentClass}-attached`, true);
    }

    function syncPreviewRenderer(event) {
      if (activeRenderer) {
        activeRenderer.move(event);
      }
    }

    function destroyPreviewRenderer(element) {
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      if (element) {
        element.removeAttribute(`${componentClass}-attached`);
      }
    }

    function delegate(eventName, selector, handler) {
      document.addEventListener(eventName, function(event) {
        for (let target = event.target; target && target != this; target = target.parentNode) {
          if (target.matches(selector)) {
            handler.call(target, event);
            break;
          }
        }
      }, true);
    }

    _this.attach = function(selector, settings) {
      selector = selector || 'a';

      const params = Object.assign({
        bgColor: 'white',
        fgColor: 'black',
        beautify: function() {
        //
        }
      }, settings);

      delegate('mouseenter', selector, function(event) {
        createPreviewRenderer(this, event, params)
      });

      delegate('mousemove', selector, function(event) {
        syncPreviewRenderer(event);
      });

      delegate('mouseleave', selector, function() {
        destroyPreviewRenderer(this);
      });
    };

    return _this;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = LinkPreviewer; else window.LinkPreviewer = LinkPreviewer;
})(window);

(function(window) {

  function Flyovers() {
    const _this = this;

    const componentClass = 'flyover';
    const styleClass = `${componentClass}-styles`;
    const DEFAULT_HIDE_AFTER_MS = 5000;

    let stylesContainer = document.head.querySelectorAll(`style.${styleClass}`);

    if (stylesContainer.length === 0) {
      stylesContainer = document.createElement('style');
      stylesContainer.className = styleClass;
      stylesContainer.textContent = `
      .${componentClass}-container {
        position:fixed;
        right: 10px;
        top: 10px;
        width: 320px;
        max-width: 40%;
        z-index:10000;
      }
      .${componentClass}-instance {
        background-color:black;
        color:white;
        padding: 5px 10px 5px 10px;
        font-size:10pt;
        word-break: break-word;
        margin-bottom: 10px;
        border: 1px solid #999;
        border: 1px solid rgba(0,0,0,.2);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        outline: 0;
        -webkit-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -moz-box-shadow: 0 3px 7px rgba(0,0,0,.2);
        box-shadow: 0 3px 7px rgba(0,0,0,.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding-box;
        background-clip: padding-box;
      }
      .${componentClass}:hover {
        cursor: pointer;
      }
      .${componentClass}-close-button {
        float: right;
        font-size:10pt;
        font-weight: bold;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
      }
      .${componentClass}-title {
        font-size: 14pt;
        font-weight: bold;
      }
      .${componentClass}-show {
        transition: opacity 800ms;
        -webkit-transition: opacity 800ms;
        opacity: 1;
      }
      .${componentClass}-hide {
        transition: opacity 4000ms;
        -webkit-transition: opacity 4000ms;
        opacity: 0;
      }
    `;
      document.head.append(stylesContainer);
    }

    let flyoversContainer = document.createElement('div');
    flyoversContainer.classList.add(`${componentClass}-container`);

    document.body.appendChild(flyoversContainer);

    function checkContainerVisibility() {
      if (flyoversContainer.querySelectorAll(`.${componentClass}-instance`).length > 0) {
        flyoversContainer.style.display = '';
      } else {
        flyoversContainer.style.display = 'none';
      }
    }

    function scheduleForRemoval(flyoverOverlay) {
      flyoverOverlay.classList.remove(`${componentClass}-show`);
      flyoverOverlay.classList.add(`${componentClass}-hide`);
      flyoverOverlay.addEventListener('mouseenter', function() {
        flyoverOverlay.classList.add(`${componentClass}-show`);
        flyoverOverlay.classList.remove(`${componentClass}-hide`);
      });
      flyoverOverlay.addEventListener('mouseleave', function() {
        flyoverOverlay.classList.remove(`${componentClass}-show`);
        flyoverOverlay.classList.add(`${componentClass}-hide`);
      });
      let interval = window.setInterval(function() {
        if (window.getComputedStyle(flyoverOverlay).getPropertyValue('opacity') < 0.250) {
          flyoverOverlay.remove();
          checkContainerVisibility();
          window.clearInterval(interval);
        }
      }, 100);
    }

    function createFlyoverOverlay(title, content, settings, overrides) {
      if (content) {
        if (typeof content != 'string') {
          settings = content;
          content = title;
          title = '';
        }
      } else {
        content = title;
        title = '';
      }
      if (!overrides) {
        overrides = {};
      }
      const params = Object.assign({
        bgColor: '#fff',
        fgColor: '#000',
        permanent: false,
        timeout: DEFAULT_HIDE_AFTER_MS,
        beautify: function() {
        //
        }
      }, Object.assign(overrides, settings));

      let flyoverOverlay = document.createElement('div');

      flyoverOverlay.classList.add(`${componentClass}-instance`);
      flyoverOverlay.classList.add(`${componentClass}-hide`);
      flyoverOverlay.style.color = params.fgColor;
      flyoverOverlay.style.backgroundColor = params.bgColor;

      params.beautify(flyoverOverlay);

      flyoversContainer.appendChild(flyoverOverlay);

      checkContainerVisibility();

      let text = `
      <div class="${componentClass}-close-button">&times;</div>
      <div class="${componentClass}-title"></div>
      ${content}
    `;

      flyoverOverlay.innerHTML = text;
      flyoverOverlay.querySelector(`.${componentClass}-title`).innerHTML = title;

      flyoverOverlay.querySelector(`.${componentClass}-close-button`).addEventListener('click', function() {
        flyoverOverlay.remove();
        checkContainerVisibility();
      });

      window.setTimeout(function() {
        flyoverOverlay.classList.add(`${componentClass}-show`);
        flyoverOverlay.classList.remove(`${componentClass}-hide`);

        if (!params.permanent) {
          window.setTimeout(function() {
            scheduleForRemoval(flyoverOverlay)
          }, params.timeout);
        }
      })

      return this;
    }

    _this.showMessage = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings);
    };

    _this.showSuccess = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#fff',
        bgColor: '#198754',
      });
    };

    _this.showError = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#fff',
        bgColor: '#dc3545',
      });
    };

    _this.showWarning = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#000',
        bgColor: '#ffc107',
      });
    };

    _this.showInfo = function(title, content, settings) {
      return createFlyoverOverlay(title, content, settings, {
        fgColor: '#000',
        bgColor: '#0dcaf0',
      });
    };

    return _this;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = Flyovers; else window.Flyovers = Flyovers;

})(window);

/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")exports["Handlebars"]=factory();else root["Handlebars"]=factory()})(this,(function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _handlebarsRuntime=__webpack_require__(2);var _handlebarsRuntime2=_interopRequireDefault(_handlebarsRuntime);var _handlebarsCompilerAst=__webpack_require__(45);var _handlebarsCompilerAst2=_interopRequireDefault(_handlebarsCompilerAst);var _handlebarsCompilerBase=__webpack_require__(46);var _handlebarsCompilerCompiler=__webpack_require__(51);var _handlebarsCompilerJavascriptCompiler=__webpack_require__(52);var _handlebarsCompilerJavascriptCompiler2=_interopRequireDefault(_handlebarsCompilerJavascriptCompiler);var _handlebarsCompilerVisitor=__webpack_require__(49);var _handlebarsCompilerVisitor2=_interopRequireDefault(_handlebarsCompilerVisitor);var _handlebarsNoConflict=__webpack_require__(44);var _handlebarsNoConflict2=_interopRequireDefault(_handlebarsNoConflict);var _create=_handlebarsRuntime2["default"].create;function create(){var hb=_create();hb.compile=function(input,options){return _handlebarsCompilerCompiler.compile(input,options,hb)};hb.precompile=function(input,options){return _handlebarsCompilerCompiler.precompile(input,options,hb)};hb.AST=_handlebarsCompilerAst2["default"];hb.Compiler=_handlebarsCompilerCompiler.Compiler;hb.JavaScriptCompiler=_handlebarsCompilerJavascriptCompiler2["default"];hb.Parser=_handlebarsCompilerBase.parser;hb.parse=_handlebarsCompilerBase.parse;hb.parseWithoutProcessing=_handlebarsCompilerBase.parseWithoutProcessing;return hb}var inst=create();inst.create=create;_handlebarsNoConflict2["default"](inst);inst.Visitor=_handlebarsCompilerVisitor2["default"];inst["default"]=inst;exports["default"]=inst;module.exports=exports["default"]},function(module,exports){"use strict";exports["default"]=function(obj){return obj&&obj.__esModule?obj:{default:obj}};exports.__esModule=true},function(module,exports,__webpack_require__){"use strict";var _interopRequireWildcard=__webpack_require__(3)["default"];var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _handlebarsBase=__webpack_require__(4);var base=_interopRequireWildcard(_handlebarsBase);var _handlebarsSafeString=__webpack_require__(37);var _handlebarsSafeString2=_interopRequireDefault(_handlebarsSafeString);var _handlebarsException=__webpack_require__(6);var _handlebarsException2=_interopRequireDefault(_handlebarsException);var _handlebarsUtils=__webpack_require__(5);var Utils=_interopRequireWildcard(_handlebarsUtils);var _handlebarsRuntime=__webpack_require__(38);var runtime=_interopRequireWildcard(_handlebarsRuntime);var _handlebarsNoConflict=__webpack_require__(44);var _handlebarsNoConflict2=_interopRequireDefault(_handlebarsNoConflict);function create(){var hb=new base.HandlebarsEnvironment;Utils.extend(hb,base);hb.SafeString=_handlebarsSafeString2["default"];hb.Exception=_handlebarsException2["default"];hb.Utils=Utils;hb.escapeExpression=Utils.escapeExpression;hb.VM=runtime;hb.template=function(spec){return runtime.template(spec,hb)};return hb}var inst=create();inst.create=create;_handlebarsNoConflict2["default"](inst);inst["default"]=inst;exports["default"]=inst;module.exports=exports["default"]},function(module,exports){"use strict";exports["default"]=function(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj["default"]=obj;return newObj}};exports.__esModule=true},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.HandlebarsEnvironment=HandlebarsEnvironment;var _utils=__webpack_require__(5);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);var _helpers=__webpack_require__(10);var _decorators=__webpack_require__(30);var _logger=__webpack_require__(32);var _logger2=_interopRequireDefault(_logger);var _internalProtoAccess=__webpack_require__(33);var VERSION="4.7.7";exports.VERSION=VERSION;var COMPILER_REVISION=8;exports.COMPILER_REVISION=COMPILER_REVISION;var LAST_COMPATIBLE_COMPILER_REVISION=7;exports.LAST_COMPATIBLE_COMPILER_REVISION=LAST_COMPATIBLE_COMPILER_REVISION;var REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};exports.REVISION_CHANGES=REVISION_CHANGES;var objectType="[object Object]";function HandlebarsEnvironment(helpers,partials,decorators){this.helpers=helpers||{};this.partials=partials||{};this.decorators=decorators||{};_helpers.registerDefaultHelpers(this);_decorators.registerDefaultDecorators(this)}HandlebarsEnvironment.prototype={constructor:HandlebarsEnvironment,logger:_logger2["default"],log:_logger2["default"].log,registerHelper:function registerHelper(name,fn){if(_utils.toString.call(name)===objectType){if(fn){throw new _exception2["default"]("Arg not supported with multiple helpers")}_utils.extend(this.helpers,name)}else{this.helpers[name]=fn}},unregisterHelper:function unregisterHelper(name){delete this.helpers[name]},registerPartial:function registerPartial(name,partial){if(_utils.toString.call(name)===objectType){_utils.extend(this.partials,name)}else{if(typeof partial==="undefined"){throw new _exception2["default"]('Attempting to register a partial called "'+name+'" as undefined')}this.partials[name]=partial}},unregisterPartial:function unregisterPartial(name){delete this.partials[name]},registerDecorator:function registerDecorator(name,fn){if(_utils.toString.call(name)===objectType){if(fn){throw new _exception2["default"]("Arg not supported with multiple decorators")}_utils.extend(this.decorators,name)}else{this.decorators[name]=fn}},unregisterDecorator:function unregisterDecorator(name){delete this.decorators[name]},resetLoggedPropertyAccesses:function resetLoggedPropertyAccesses(){_internalProtoAccess.resetLoggedProperties()}};var log=_logger2["default"].log;exports.log=log;exports.createFrame=_utils.createFrame;exports.logger=_logger2["default"]},function(module,exports){"use strict";exports.__esModule=true;exports.extend=extend;exports.indexOf=indexOf;exports.escapeExpression=escapeExpression;exports.isEmpty=isEmpty;exports.createFrame=createFrame;exports.blockParams=blockParams;exports.appendContextPath=appendContextPath;var escape={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"};var badChars=/[&<>"'`=]/g,possible=/[&<>"'`=]/;function escapeChar(chr){return escape[chr]}function extend(obj){for(var i=1;i<arguments.length;i++){for(var key in arguments[i]){if(Object.prototype.hasOwnProperty.call(arguments[i],key)){obj[key]=arguments[i][key]}}}return obj}var toString=Object.prototype.toString;exports.toString=toString;var isFunction=function isFunction(value){return typeof value==="function"};if(isFunction(/x/)){exports.isFunction=isFunction=function(value){return typeof value==="function"&&toString.call(value)==="[object Function]"}}exports.isFunction=isFunction;var isArray=Array.isArray||function(value){return value&&typeof value==="object"?toString.call(value)==="[object Array]":false};exports.isArray=isArray;function indexOf(array,value){for(var i=0,len=array.length;i<len;i++){if(array[i]===value){return i}}return-1}function escapeExpression(string){if(typeof string!=="string"){if(string&&string.toHTML){return string.toHTML()}else if(string==null){return""}else if(!string){return string+""}string=""+string}if(!possible.test(string)){return string}return string.replace(badChars,escapeChar)}function isEmpty(value){if(!value&&value!==0){return true}else if(isArray(value)&&value.length===0){return true}else{return false}}function createFrame(object){var frame=extend({},object);frame._parent=object;return frame}function blockParams(params,ids){params.path=ids;return params}function appendContextPath(contextPath,id){return(contextPath?contextPath+".":"")+id}},function(module,exports,__webpack_require__){"use strict";var _Object$defineProperty=__webpack_require__(7)["default"];exports.__esModule=true;var errorProps=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];function Exception(message,node){var loc=node&&node.loc,line=undefined,endLineNumber=undefined,column=undefined,endColumn=undefined;if(loc){line=loc.start.line;endLineNumber=loc.end.line;column=loc.start.column;endColumn=loc.end.column;message+=" - "+line+":"+column}var tmp=Error.prototype.constructor.call(this,message);for(var idx=0;idx<errorProps.length;idx++){this[errorProps[idx]]=tmp[errorProps[idx]]}if(Error.captureStackTrace){Error.captureStackTrace(this,Exception)}try{if(loc){this.lineNumber=line;this.endLineNumber=endLineNumber;if(_Object$defineProperty){Object.defineProperty(this,"column",{value:column,enumerable:true});Object.defineProperty(this,"endColumn",{value:endColumn,enumerable:true})}else{this.column=column;this.endColumn=endColumn}}}catch(nop){}}Exception.prototype=new Error;exports["default"]=Exception;module.exports=exports["default"]},function(module,exports,__webpack_require__){module.exports={default:__webpack_require__(8),__esModule:true}},function(module,exports,__webpack_require__){var $=__webpack_require__(9);module.exports=function defineProperty(it,key,desc){return $.setDesc(it,key,desc)}},function(module,exports){var $Object=Object;module.exports={create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach}},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.registerDefaultHelpers=registerDefaultHelpers;exports.moveHelperToHooks=moveHelperToHooks;var _helpersBlockHelperMissing=__webpack_require__(11);var _helpersBlockHelperMissing2=_interopRequireDefault(_helpersBlockHelperMissing);var _helpersEach=__webpack_require__(12);var _helpersEach2=_interopRequireDefault(_helpersEach);var _helpersHelperMissing=__webpack_require__(25);var _helpersHelperMissing2=_interopRequireDefault(_helpersHelperMissing);var _helpersIf=__webpack_require__(26);var _helpersIf2=_interopRequireDefault(_helpersIf);var _helpersLog=__webpack_require__(27);var _helpersLog2=_interopRequireDefault(_helpersLog);var _helpersLookup=__webpack_require__(28);var _helpersLookup2=_interopRequireDefault(_helpersLookup);var _helpersWith=__webpack_require__(29);var _helpersWith2=_interopRequireDefault(_helpersWith);function registerDefaultHelpers(instance){_helpersBlockHelperMissing2["default"](instance);_helpersEach2["default"](instance);_helpersHelperMissing2["default"](instance);_helpersIf2["default"](instance);_helpersLog2["default"](instance);_helpersLookup2["default"](instance);_helpersWith2["default"](instance)}function moveHelperToHooks(instance,helperName,keepHelper){if(instance.helpers[helperName]){instance.hooks[helperName]=instance.helpers[helperName];if(!keepHelper){delete instance.helpers[helperName]}}}},function(module,exports,__webpack_require__){"use strict";exports.__esModule=true;var _utils=__webpack_require__(5);exports["default"]=function(instance){instance.registerHelper("blockHelperMissing",(function(context,options){var inverse=options.inverse,fn=options.fn;if(context===true){return fn(this)}else if(context===false||context==null){return inverse(this)}else if(_utils.isArray(context)){if(context.length>0){if(options.ids){options.ids=[options.name]}return instance.helpers.each(context,options)}else{return inverse(this)}}else{if(options.data&&options.ids){var data=_utils.createFrame(options.data);data.contextPath=_utils.appendContextPath(options.data.contextPath,options.name);options={data:data}}return fn(context,options)}}))};module.exports=exports["default"]},function(module,exports,__webpack_require__){(function(global){"use strict";var _Object$keys=__webpack_require__(13)["default"];var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _utils=__webpack_require__(5);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);exports["default"]=function(instance){instance.registerHelper("each",(function(context,options){if(!options){throw new _exception2["default"]("Must pass iterator to #each")}var fn=options.fn,inverse=options.inverse,i=0,ret="",data=undefined,contextPath=undefined;if(options.data&&options.ids){contextPath=_utils.appendContextPath(options.data.contextPath,options.ids[0])+"."}if(_utils.isFunction(context)){context=context.call(this)}if(options.data){data=_utils.createFrame(options.data)}function execIteration(field,index,last){if(data){data.key=field;data.index=index;data.first=index===0;data.last=!!last;if(contextPath){data.contextPath=contextPath+field}}ret=ret+fn(context[field],{data:data,blockParams:_utils.blockParams([context[field],field],[contextPath+field,null])})}if(context&&typeof context==="object"){if(_utils.isArray(context)){for(var j=context.length;i<j;i++){if(i in context){execIteration(i,i,i===context.length-1)}}}else if(global.Symbol&&context[global.Symbol.iterator]){var newContext=[];var iterator=context[global.Symbol.iterator]();for(var it=iterator.next();!it.done;it=iterator.next()){newContext.push(it.value)}context=newContext;for(var j=context.length;i<j;i++){execIteration(i,i,i===context.length-1)}}else{(function(){var priorKey=undefined;_Object$keys(context).forEach((function(key){if(priorKey!==undefined){execIteration(priorKey,i-1)}priorKey=key;i++}));if(priorKey!==undefined){execIteration(priorKey,i-1,true)}})()}}if(i===0){ret=inverse(this)}return ret}))};module.exports=exports["default"]}).call(exports,function(){return this}())},function(module,exports,__webpack_require__){module.exports={default:__webpack_require__(14),__esModule:true}},function(module,exports,__webpack_require__){__webpack_require__(15);module.exports=__webpack_require__(21).Object.keys},function(module,exports,__webpack_require__){var toObject=__webpack_require__(16);__webpack_require__(18)("keys",(function($keys){return function keys(it){return $keys(toObject(it))}}))},function(module,exports,__webpack_require__){var defined=__webpack_require__(17);module.exports=function(it){return Object(defined(it))}},function(module,exports){module.exports=function(it){if(it==undefined)throw TypeError("Can't call method on  "+it);return it}},function(module,exports,__webpack_require__){var $export=__webpack_require__(19),core=__webpack_require__(21),fails=__webpack_require__(24);module.exports=function(KEY,exec){var fn=(core.Object||{})[KEY]||Object[KEY],exp={};exp[KEY]=exec(fn);$export($export.S+$export.F*fails((function(){fn(1)})),"Object",exp)}},function(module,exports,__webpack_require__){var global=__webpack_require__(20),core=__webpack_require__(21),ctx=__webpack_require__(22),PROTOTYPE="prototype";var $export=function(type,name,source){var IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,IS_WRAP=type&$export.W,exports=IS_GLOBAL?core:core[name]||(core[name]={}),target=IS_GLOBAL?global:IS_STATIC?global[name]:(global[name]||{})[PROTOTYPE],key,own,out;if(IS_GLOBAL)source=name;for(key in source){own=!IS_FORCED&&target&&key in target;if(own&&key in exports)continue;out=own?target[key]:source[key];exports[key]=IS_GLOBAL&&typeof target[key]!="function"?source[key]:IS_BIND&&own?ctx(out,global):IS_WRAP&&target[key]==out?function(C){var F=function(param){return this instanceof C?new C(param):C(param)};F[PROTOTYPE]=C[PROTOTYPE];return F}(out):IS_PROTO&&typeof out=="function"?ctx(Function.call,out):out;if(IS_PROTO)(exports[PROTOTYPE]||(exports[PROTOTYPE]={}))[key]=out}};$export.F=1;$export.G=2;$export.S=4;$export.P=8;$export.B=16;$export.W=32;module.exports=$export},function(module,exports){var global=module.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();if(typeof __g=="number")__g=global},function(module,exports){var core=module.exports={version:"1.2.6"};if(typeof __e=="number")__e=core},function(module,exports,__webpack_require__){var aFunction=__webpack_require__(23);module.exports=function(fn,that,length){aFunction(fn);if(that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}},function(module,exports){module.exports=function(it){if(typeof it!="function")throw TypeError(it+" is not a function!");return it}},function(module,exports){module.exports=function(exec){try{return!!exec()}catch(e){return true}}},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);exports["default"]=function(instance){instance.registerHelper("helperMissing",(function(){if(arguments.length===1){return undefined}else{throw new _exception2["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}}))};module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _utils=__webpack_require__(5);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);exports["default"]=function(instance){instance.registerHelper("if",(function(conditional,options){if(arguments.length!=2){throw new _exception2["default"]("#if requires exactly one argument")}if(_utils.isFunction(conditional)){conditional=conditional.call(this)}if(!options.hash.includeZero&&!conditional||_utils.isEmpty(conditional)){return options.inverse(this)}else{return options.fn(this)}}));instance.registerHelper("unless",(function(conditional,options){if(arguments.length!=2){throw new _exception2["default"]("#unless requires exactly one argument")}return instance.helpers["if"].call(this,conditional,{fn:options.inverse,inverse:options.fn,hash:options.hash})}))};module.exports=exports["default"]},function(module,exports){"use strict";exports.__esModule=true;exports["default"]=function(instance){instance.registerHelper("log",(function(){var args=[undefined],options=arguments[arguments.length-1];for(var i=0;i<arguments.length-1;i++){args.push(arguments[i])}var level=1;if(options.hash.level!=null){level=options.hash.level}else if(options.data&&options.data.level!=null){level=options.data.level}args[0]=level;instance.log.apply(instance,args)}))};module.exports=exports["default"]},function(module,exports){"use strict";exports.__esModule=true;exports["default"]=function(instance){instance.registerHelper("lookup",(function(obj,field,options){if(!obj){return obj}return options.lookupProperty(obj,field)}))};module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _utils=__webpack_require__(5);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);exports["default"]=function(instance){instance.registerHelper("with",(function(context,options){if(arguments.length!=2){throw new _exception2["default"]("#with requires exactly one argument")}if(_utils.isFunction(context)){context=context.call(this)}var fn=options.fn;if(!_utils.isEmpty(context)){var data=options.data;if(options.data&&options.ids){data=_utils.createFrame(options.data);data.contextPath=_utils.appendContextPath(options.data.contextPath,options.ids[0])}return fn(context,{data:data,blockParams:_utils.blockParams([context],[data&&data.contextPath])})}else{return options.inverse(this)}}))};module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.registerDefaultDecorators=registerDefaultDecorators;var _decoratorsInline=__webpack_require__(31);var _decoratorsInline2=_interopRequireDefault(_decoratorsInline);function registerDefaultDecorators(instance){_decoratorsInline2["default"](instance)}},function(module,exports,__webpack_require__){"use strict";exports.__esModule=true;var _utils=__webpack_require__(5);exports["default"]=function(instance){instance.registerDecorator("inline",(function(fn,props,container,options){var ret=fn;if(!props.partials){props.partials={};ret=function(context,options){var original=container.partials;container.partials=_utils.extend({},original,props.partials);var ret=fn(context,options);container.partials=original;return ret}}props.partials[options.args[0]]=options.fn;return ret}))};module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";exports.__esModule=true;var _utils=__webpack_require__(5);var logger={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function lookupLevel(level){if(typeof level==="string"){var levelMap=_utils.indexOf(logger.methodMap,level.toLowerCase());if(levelMap>=0){level=levelMap}else{level=parseInt(level,10)}}return level},log:function log(level){level=logger.lookupLevel(level);if(typeof console!=="undefined"&&logger.lookupLevel(logger.level)<=level){var method=logger.methodMap[level];if(!console[method]){method="log"}for(var _len=arguments.length,message=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){message[_key-1]=arguments[_key]}console[method].apply(console,message)}}};exports["default"]=logger;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(34)["default"];var _Object$keys=__webpack_require__(13)["default"];var _interopRequireWildcard=__webpack_require__(3)["default"];exports.__esModule=true;exports.createProtoAccessControl=createProtoAccessControl;exports.resultIsAllowed=resultIsAllowed;exports.resetLoggedProperties=resetLoggedProperties;var _createNewLookupObject=__webpack_require__(36);var _logger=__webpack_require__(32);var logger=_interopRequireWildcard(_logger);var loggedProperties=_Object$create(null);function createProtoAccessControl(runtimeOptions){var defaultMethodWhiteList=_Object$create(null);defaultMethodWhiteList["constructor"]=false;defaultMethodWhiteList["__defineGetter__"]=false;defaultMethodWhiteList["__defineSetter__"]=false;defaultMethodWhiteList["__lookupGetter__"]=false;var defaultPropertyWhiteList=_Object$create(null);defaultPropertyWhiteList["__proto__"]=false;return{properties:{whitelist:_createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList,runtimeOptions.allowedProtoProperties),defaultValue:runtimeOptions.allowProtoPropertiesByDefault},methods:{whitelist:_createNewLookupObject.createNewLookupObject(defaultMethodWhiteList,runtimeOptions.allowedProtoMethods),defaultValue:runtimeOptions.allowProtoMethodsByDefault}}}function resultIsAllowed(result,protoAccessControl,propertyName){if(typeof result==="function"){return checkWhiteList(protoAccessControl.methods,propertyName)}else{return checkWhiteList(protoAccessControl.properties,propertyName)}}function checkWhiteList(protoAccessControlForType,propertyName){if(protoAccessControlForType.whitelist[propertyName]!==undefined){return protoAccessControlForType.whitelist[propertyName]===true}if(protoAccessControlForType.defaultValue!==undefined){return protoAccessControlForType.defaultValue}logUnexpecedPropertyAccessOnce(propertyName);return false}function logUnexpecedPropertyAccessOnce(propertyName){if(loggedProperties[propertyName]!==true){loggedProperties[propertyName]=true;logger.log("error",'Handlebars: Access has been denied to resolve the property "'+propertyName+'" because it is not an "own property" of its parent.\n'+"You can add a runtime option to disable the check or this warning:\n"+"See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details")}}function resetLoggedProperties(){_Object$keys(loggedProperties).forEach((function(propertyName){delete loggedProperties[propertyName]}))}},function(module,exports,__webpack_require__){module.exports={default:__webpack_require__(35),__esModule:true}},function(module,exports,__webpack_require__){var $=__webpack_require__(9);module.exports=function create(P,D){return $.create(P,D)}},function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(34)["default"];exports.__esModule=true;exports.createNewLookupObject=createNewLookupObject;var _utils=__webpack_require__(5);function createNewLookupObject(){for(var _len=arguments.length,sources=Array(_len),_key=0;_key<_len;_key++){sources[_key]=arguments[_key]}return _utils.extend.apply(undefined,[_Object$create(null)].concat(sources))}},function(module,exports){"use strict";exports.__esModule=true;function SafeString(string){this.string=string}SafeString.prototype.toString=SafeString.prototype.toHTML=function(){return""+this.string};exports["default"]=SafeString;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _Object$seal=__webpack_require__(39)["default"];var _Object$keys=__webpack_require__(13)["default"];var _interopRequireWildcard=__webpack_require__(3)["default"];var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.checkRevision=checkRevision;exports.template=template;exports.wrapProgram=wrapProgram;exports.resolvePartial=resolvePartial;exports.invokePartial=invokePartial;exports.noop=noop;var _utils=__webpack_require__(5);var Utils=_interopRequireWildcard(_utils);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);var _base=__webpack_require__(4);var _helpers=__webpack_require__(10);var _internalWrapHelper=__webpack_require__(43);var _internalProtoAccess=__webpack_require__(33);function checkRevision(compilerInfo){var compilerRevision=compilerInfo&&compilerInfo[0]||1,currentRevision=_base.COMPILER_REVISION;if(compilerRevision>=_base.LAST_COMPATIBLE_COMPILER_REVISION&&compilerRevision<=_base.COMPILER_REVISION){return}if(compilerRevision<_base.LAST_COMPATIBLE_COMPILER_REVISION){var runtimeVersions=_base.REVISION_CHANGES[currentRevision],compilerVersions=_base.REVISION_CHANGES[compilerRevision];throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. "+"Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").")}else{throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. "+"Please update your runtime to a newer version ("+compilerInfo[1]+").")}}function template(templateSpec,env){if(!env){throw new _exception2["default"]("No environment passed to template")}if(!templateSpec||!templateSpec.main){throw new _exception2["default"]("Unknown template object: "+typeof templateSpec)}templateSpec.main.decorator=templateSpec.main_d;env.VM.checkRevision(templateSpec.compiler);var templateWasPrecompiledWithCompilerV7=templateSpec.compiler&&templateSpec.compiler[0]===7;function invokePartialWrapper(partial,context,options){if(options.hash){context=Utils.extend({},context,options.hash);if(options.ids){options.ids[0]=true}}partial=env.VM.resolvePartial.call(this,partial,context,options);var extendedOptions=Utils.extend({},options,{hooks:this.hooks,protoAccessControl:this.protoAccessControl});var result=env.VM.invokePartial.call(this,partial,context,extendedOptions);if(result==null&&env.compile){options.partials[options.name]=env.compile(partial,templateSpec.compilerOptions,env);result=options.partials[options.name](context,extendedOptions)}if(result!=null){if(options.indent){var lines=result.split("\n");for(var i=0,l=lines.length;i<l;i++){if(!lines[i]&&i+1===l){break}lines[i]=options.indent+lines[i]}result=lines.join("\n")}return result}else{throw new _exception2["default"]("The partial "+options.name+" could not be compiled when running in runtime-only mode")}}var container={strict:function strict(obj,name,loc){if(!obj||!(name in obj)){throw new _exception2["default"]('"'+name+'" not defined in '+obj,{loc:loc})}return container.lookupProperty(obj,name)},lookupProperty:function lookupProperty(parent,propertyName){var result=parent[propertyName];if(result==null){return result}if(Object.prototype.hasOwnProperty.call(parent,propertyName)){return result}if(_internalProtoAccess.resultIsAllowed(result,container.protoAccessControl,propertyName)){return result}return undefined},lookup:function lookup(depths,name){var len=depths.length;for(var i=0;i<len;i++){var result=depths[i]&&container.lookupProperty(depths[i],name);if(result!=null){return depths[i][name]}}},lambda:function lambda(current,context){return typeof current==="function"?current.call(context):current},escapeExpression:Utils.escapeExpression,invokePartial:invokePartialWrapper,fn:function fn(i){var ret=templateSpec[i];ret.decorator=templateSpec[i+"_d"];return ret},programs:[],program:function program(i,data,declaredBlockParams,blockParams,depths){var programWrapper=this.programs[i],fn=this.fn(i);if(data||depths||blockParams||declaredBlockParams){programWrapper=wrapProgram(this,i,fn,data,declaredBlockParams,blockParams,depths)}else if(!programWrapper){programWrapper=this.programs[i]=wrapProgram(this,i,fn)}return programWrapper},data:function data(value,depth){while(value&&depth--){value=value._parent}return value},mergeIfNeeded:function mergeIfNeeded(param,common){var obj=param||common;if(param&&common&&param!==common){obj=Utils.extend({},common,param)}return obj},nullContext:_Object$seal({}),noop:env.VM.noop,compilerInfo:templateSpec.compiler};function ret(context){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var data=options.data;ret._setup(options);if(!options.partial&&templateSpec.useData){data=initData(context,data)}var depths=undefined,blockParams=templateSpec.useBlockParams?[]:undefined;if(templateSpec.useDepths){if(options.depths){depths=context!=options.depths[0]?[context].concat(options.depths):options.depths}else{depths=[context]}}function main(context){return""+templateSpec.main(container,context,container.helpers,container.partials,data,blockParams,depths)}main=executeDecorators(templateSpec.main,main,container,options.depths||[],data,blockParams);return main(context,options)}ret.isTop=true;ret._setup=function(options){if(!options.partial){var mergedHelpers=Utils.extend({},env.helpers,options.helpers);wrapHelpersToPassLookupProperty(mergedHelpers,container);container.helpers=mergedHelpers;if(templateSpec.usePartial){container.partials=container.mergeIfNeeded(options.partials,env.partials)}if(templateSpec.usePartial||templateSpec.useDecorators){container.decorators=Utils.extend({},env.decorators,options.decorators)}container.hooks={};container.protoAccessControl=_internalProtoAccess.createProtoAccessControl(options);var keepHelperInHelpers=options.allowCallsToHelperMissing||templateWasPrecompiledWithCompilerV7;_helpers.moveHelperToHooks(container,"helperMissing",keepHelperInHelpers);_helpers.moveHelperToHooks(container,"blockHelperMissing",keepHelperInHelpers)}else{container.protoAccessControl=options.protoAccessControl;container.helpers=options.helpers;container.partials=options.partials;container.decorators=options.decorators;container.hooks=options.hooks}};ret._child=function(i,data,blockParams,depths){if(templateSpec.useBlockParams&&!blockParams){throw new _exception2["default"]("must pass block params")}if(templateSpec.useDepths&&!depths){throw new _exception2["default"]("must pass parent depths")}return wrapProgram(container,i,templateSpec[i],data,0,blockParams,depths)};return ret}function wrapProgram(container,i,fn,data,declaredBlockParams,blockParams,depths){function prog(context){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var currentDepths=depths;if(depths&&context!=depths[0]&&!(context===container.nullContext&&depths[0]===null)){currentDepths=[context].concat(depths)}return fn(container,context,container.helpers,container.partials,options.data||data,blockParams&&[options.blockParams].concat(blockParams),currentDepths)}prog=executeDecorators(fn,prog,container,depths,data,blockParams);prog.program=i;prog.depth=depths?depths.length:0;prog.blockParams=declaredBlockParams||0;return prog}function resolvePartial(partial,context,options){if(!partial){if(options.name==="@partial-block"){partial=options.data["partial-block"]}else{partial=options.partials[options.name]}}else if(!partial.call&&!options.name){options.name=partial;partial=options.partials[partial]}return partial}function invokePartial(partial,context,options){var currentPartialBlock=options.data&&options.data["partial-block"];options.partial=true;if(options.ids){options.data.contextPath=options.ids[0]||options.data.contextPath}var partialBlock=undefined;if(options.fn&&options.fn!==noop){(function(){options.data=_base.createFrame(options.data);var fn=options.fn;partialBlock=options.data["partial-block"]=function partialBlockWrapper(context){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];options.data=_base.createFrame(options.data);options.data["partial-block"]=currentPartialBlock;return fn(context,options)};if(fn.partials){options.partials=Utils.extend({},options.partials,fn.partials)}})()}if(partial===undefined&&partialBlock){partial=partialBlock}if(partial===undefined){throw new _exception2["default"]("The partial "+options.name+" could not be found")}else if(partial instanceof Function){return partial(context,options)}}function noop(){return""}function initData(context,data){if(!data||!("root"in data)){data=data?_base.createFrame(data):{};data.root=context}return data}function executeDecorators(fn,prog,container,depths,data,blockParams){if(fn.decorator){var props={};prog=fn.decorator(prog,props,container,depths&&depths[0],data,blockParams,depths);Utils.extend(prog,props)}return prog}function wrapHelpersToPassLookupProperty(mergedHelpers,container){_Object$keys(mergedHelpers).forEach((function(helperName){var helper=mergedHelpers[helperName];mergedHelpers[helperName]=passLookupPropertyOption(helper,container)}))}function passLookupPropertyOption(helper,container){var lookupProperty=container.lookupProperty;return _internalWrapHelper.wrapHelper(helper,(function(options){return Utils.extend({lookupProperty:lookupProperty},options)}))}},function(module,exports,__webpack_require__){module.exports={default:__webpack_require__(40),__esModule:true}},function(module,exports,__webpack_require__){__webpack_require__(41);module.exports=__webpack_require__(21).Object.seal},function(module,exports,__webpack_require__){var isObject=__webpack_require__(42);__webpack_require__(18)("seal",(function($seal){return function seal(it){return $seal&&isObject(it)?$seal(it):it}}))},function(module,exports){module.exports=function(it){return typeof it==="object"?it!==null:typeof it==="function"}},function(module,exports){"use strict";exports.__esModule=true;exports.wrapHelper=wrapHelper;function wrapHelper(helper,transformOptionsFn){if(typeof helper!=="function"){return helper}var wrapper=function wrapper(){var options=arguments[arguments.length-1];arguments[arguments.length-1]=transformOptionsFn(options);return helper.apply(this,arguments)};return wrapper}},function(module,exports){(function(global){"use strict";exports.__esModule=true;exports["default"]=function(Handlebars){var root=typeof global!=="undefined"?global:window,$Handlebars=root.Handlebars;Handlebars.noConflict=function(){if(root.Handlebars===Handlebars){root.Handlebars=$Handlebars}return Handlebars}};module.exports=exports["default"]}).call(exports,function(){return this}())},function(module,exports){"use strict";exports.__esModule=true;var AST={helpers:{helperExpression:function helperExpression(node){return node.type==="SubExpression"||(node.type==="MustacheStatement"||node.type==="BlockStatement")&&!!(node.params&&node.params.length||node.hash)},scopedId:function scopedId(path){return/^\.|this\b/.test(path.original)},simpleId:function simpleId(path){return path.parts.length===1&&!AST.helpers.scopedId(path)&&!path.depth}}};exports["default"]=AST;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];var _interopRequireWildcard=__webpack_require__(3)["default"];exports.__esModule=true;exports.parseWithoutProcessing=parseWithoutProcessing;exports.parse=parse;var _parser=__webpack_require__(47);var _parser2=_interopRequireDefault(_parser);var _whitespaceControl=__webpack_require__(48);var _whitespaceControl2=_interopRequireDefault(_whitespaceControl);var _helpers=__webpack_require__(50);var Helpers=_interopRequireWildcard(_helpers);var _utils=__webpack_require__(5);exports.parser=_parser2["default"];var yy={};_utils.extend(yy,Helpers);function parseWithoutProcessing(input,options){if(input.type==="Program"){return input}_parser2["default"].yy=yy;yy.locInfo=function(locInfo){return new yy.SourceLocation(options&&options.srcName,locInfo)};var ast=_parser2["default"].parse(input);return ast}function parse(input,options){var ast=parseWithoutProcessing(input,options);var strip=new _whitespaceControl2["default"](options);return strip.accept(ast)}},function(module,exports){"use strict";exports.__esModule=true;var handlebars=function(){var parser={trace:function trace(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,0],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$){var $0=$$.length-1;switch(yystate){case 1:return $$[$0-1];break;case 2:this.$=yy.prepareProgram($$[$0]);break;case 3:this.$=$$[$0];break;case 4:this.$=$$[$0];break;case 5:this.$=$$[$0];break;case 6:this.$=$$[$0];break;case 7:this.$=$$[$0];break;case 8:this.$=$$[$0];break;case 9:this.$={type:"CommentStatement",value:yy.stripComment($$[$0]),strip:yy.stripFlags($$[$0],$$[$0]),loc:yy.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:$$[$0],value:$$[$0],loc:yy.locInfo(this._$)};break;case 11:this.$=yy.prepareRawBlock($$[$0-2],$$[$0-1],$$[$0],this._$);break;case 12:this.$={path:$$[$0-3],params:$$[$0-2],hash:$$[$0-1]};break;case 13:this.$=yy.prepareBlock($$[$0-3],$$[$0-2],$$[$0-1],$$[$0],false,this._$);break;case 14:this.$=yy.prepareBlock($$[$0-3],$$[$0-2],$$[$0-1],$$[$0],true,this._$);break;case 15:this.$={open:$$[$0-5],path:$$[$0-4],params:$$[$0-3],hash:$$[$0-2],blockParams:$$[$0-1],strip:yy.stripFlags($$[$0-5],$$[$0])};break;case 16:this.$={path:$$[$0-4],params:$$[$0-3],hash:$$[$0-2],blockParams:$$[$0-1],strip:yy.stripFlags($$[$0-5],$$[$0])};break;case 17:this.$={path:$$[$0-4],params:$$[$0-3],hash:$$[$0-2],blockParams:$$[$0-1],strip:yy.stripFlags($$[$0-5],$$[$0])};break;case 18:this.$={strip:yy.stripFlags($$[$0-1],$$[$0-1]),program:$$[$0]};break;case 19:var inverse=yy.prepareBlock($$[$0-2],$$[$0-1],$$[$0],$$[$0],false,this._$),program=yy.prepareProgram([inverse],$$[$0-1].loc);program.chained=true;this.$={strip:$$[$0-2].strip,program:program,chain:true};break;case 20:this.$=$$[$0];break;case 21:this.$={path:$$[$0-1],strip:yy.stripFlags($$[$0-2],$$[$0])};break;case 22:this.$=yy.prepareMustache($$[$0-3],$$[$0-2],$$[$0-1],$$[$0-4],yy.stripFlags($$[$0-4],$$[$0]),this._$);break;case 23:this.$=yy.prepareMustache($$[$0-3],$$[$0-2],$$[$0-1],$$[$0-4],yy.stripFlags($$[$0-4],$$[$0]),this._$);break;case 24:this.$={type:"PartialStatement",name:$$[$0-3],params:$$[$0-2],hash:$$[$0-1],indent:"",strip:yy.stripFlags($$[$0-4],$$[$0]),loc:yy.locInfo(this._$)};break;case 25:this.$=yy.preparePartialBlock($$[$0-2],$$[$0-1],$$[$0],this._$);break;case 26:this.$={path:$$[$0-3],params:$$[$0-2],hash:$$[$0-1],strip:yy.stripFlags($$[$0-4],$$[$0])};break;case 27:this.$=$$[$0];break;case 28:this.$=$$[$0];break;case 29:this.$={type:"SubExpression",path:$$[$0-3],params:$$[$0-2],hash:$$[$0-1],loc:yy.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:$$[$0],loc:yy.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:yy.id($$[$0-2]),value:$$[$0],loc:yy.locInfo(this._$)};break;case 32:this.$=yy.id($$[$0-1]);break;case 33:this.$=$$[$0];break;case 34:this.$=$$[$0];break;case 35:this.$={type:"StringLiteral",value:$$[$0],original:$$[$0],loc:yy.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number($$[$0]),original:Number($$[$0]),loc:yy.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:$$[$0]==="true",original:$$[$0]==="true",loc:yy.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:undefined,value:undefined,loc:yy.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:yy.locInfo(this._$)};break;case 40:this.$=$$[$0];break;case 41:this.$=$$[$0];break;case 42:this.$=yy.preparePath(true,$$[$0],this._$);break;case 43:this.$=yy.preparePath(false,$$[$0],this._$);break;case 44:$$[$0-2].push({part:yy.id($$[$0]),original:$$[$0],separator:$$[$0-1]});this.$=$$[$0-2];break;case 45:this.$=[{part:yy.id($$[$0]),original:$$[$0]}];break;case 46:this.$=[];break;case 47:$$[$0-1].push($$[$0]);break;case 48:this.$=[];break;case 49:$$[$0-1].push($$[$0]);break;case 50:this.$=[];break;case 51:$$[$0-1].push($$[$0]);break;case 58:this.$=[];break;case 59:$$[$0-1].push($$[$0]);break;case 64:this.$=[];break;case 65:$$[$0-1].push($$[$0]);break;case 70:this.$=[];break;case 71:$$[$0-1].push($$[$0]);break;case 78:this.$=[];break;case 79:$$[$0-1].push($$[$0]);break;case 82:this.$=[];break;case 83:$$[$0-1].push($$[$0]);break;case 86:this.$=[];break;case 87:$$[$0-1].push($$[$0]);break;case 90:this.$=[];break;case 91:$$[$0-1].push($$[$0]);break;case 94:this.$=[];break;case 95:$$[$0-1].push($$[$0]);break;case 98:this.$=[$$[$0]];break;case 99:$$[$0-1].push($$[$0]);break;case 100:this.$=[$$[$0]];break;case 101:$$[$0-1].push($$[$0]);break}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{15:[2,48],17:39,18:[2,48]},{20:41,56:40,64:42,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:44,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:45,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:41,56:48,64:42,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:49,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,50]},{72:[1,35],86:51},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:52,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:53,38:55,39:[1,57],43:56,44:[1,58],45:54,47:[2,54]},{28:59,43:60,44:[1,58],47:[2,56]},{13:62,15:[1,20],18:[1,61]},{33:[2,86],57:63,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:64,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:65,47:[1,66]},{30:67,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:68,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:69,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:70,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:74,33:[2,80],50:71,63:72,64:75,65:[1,43],69:73,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,79]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,50]},{20:74,53:80,54:[2,84],63:81,64:75,65:[1,43],69:82,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:83,47:[1,66]},{47:[2,55]},{4:84,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:85,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:86,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:87,47:[1,66]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:74,33:[2,88],58:88,63:89,64:75,65:[1,43],69:90,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:91,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:92,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,31:93,33:[2,60],63:94,64:75,65:[1,43],69:95,70:76,71:77,72:[1,78],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,33:[2,66],36:96,63:97,64:75,65:[1,43],69:98,70:76,71:77,72:[1,78],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,22:99,23:[2,52],63:100,64:75,65:[1,43],69:101,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:74,33:[2,92],62:102,63:103,64:75,65:[1,43],69:104,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,105]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:106,72:[1,107],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,108],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,109]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:55,39:[1,57],43:56,44:[1,58],45:111,46:110,47:[2,76]},{33:[2,70],40:112,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,113]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:74,63:115,64:75,65:[1,43],67:114,68:[2,96],69:116,70:76,71:77,72:[1,78],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,117]},{32:118,33:[2,62],74:119,75:[1,120]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:121,74:122,75:[1,120]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,123]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,124]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,108]},{20:74,63:125,64:75,65:[1,43],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:74,33:[2,72],41:126,63:127,64:75,65:[1,43],69:128,70:76,71:77,72:[1,78],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,129]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,130]},{33:[2,63]},{72:[1,132],76:131},{33:[1,133]},{33:[2,69]},{15:[2,12],18:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:134,74:135,75:[1,120]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,137],77:[1,136]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,138]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],54:[2,55],56:[2,20],60:[2,57],73:[2,81],82:[2,85],86:[2,18],90:[2,89],101:[2,53],104:[2,93],110:[2,19],111:[2,77],116:[2,97],119:[2,63],122:[2,69],135:[2,75],136:[2,32]},parseError:function parseError(str,hash){throw new Error(str)},parse:function parse(input){var self=this,stack=[0],vstack=[null],lstack=[],table=this.table,yytext="",yylineno=0,yyleng=0,recovering=0,TERROR=2,EOF=1;this.lexer.setInput(input);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;this.yy.parser=this;if(typeof this.lexer.yylloc=="undefined")this.lexer.yylloc={};var yyloc=this.lexer.yylloc;lstack.push(yyloc);var ranges=this.lexer.options&&this.lexer.options.ranges;if(typeof this.yy.parseError==="function")this.parseError=this.yy.parseError;function popStack(n){stack.length=stack.length-2*n;vstack.length=vstack.length-n;lstack.length=lstack.length-n}function lex(){var token;token=self.lexer.lex()||1;if(typeof token!=="number"){token=self.symbols_[token]||token}return token}var symbol,preErrorSymbol,state,action,a,r,yyval={},p,len,newState,expected;while(true){state=stack[stack.length-1];if(this.defaultActions[state]){action=this.defaultActions[state]}else{if(symbol===null||typeof symbol=="undefined"){symbol=lex()}action=table[state]&&table[state][symbol]}if(typeof action==="undefined"||!action.length||!action[0]){var errStr="";if(!recovering){expected=[];for(p in table[state])if(this.terminals_[p]&&p>2){expected.push("'"+this.terminals_[p]+"'")}if(this.lexer.showPosition){errStr="Parse error on line "+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(", ")+", got '"+(this.terminals_[symbol]||symbol)+"'"}else{errStr="Parse error on line "+(yylineno+1)+": Unexpected "+(symbol==1?"end of input":"'"+(this.terminals_[symbol]||symbol)+"'")}this.parseError(errStr,{text:this.lexer.match,token:this.terminals_[symbol]||symbol,line:this.lexer.yylineno,loc:yyloc,expected:expected})}}if(action[0]instanceof Array&&action.length>1){throw new Error("Parse Error: multiple actions possible at state: "+state+", token: "+symbol)}switch(action[0]){case 1:stack.push(symbol);vstack.push(this.lexer.yytext);lstack.push(this.lexer.yylloc);stack.push(action[1]);symbol=null;if(!preErrorSymbol){yyleng=this.lexer.yyleng;yytext=this.lexer.yytext;yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;if(recovering>0)recovering--}else{symbol=preErrorSymbol;preErrorSymbol=null}break;case 2:len=this.productions_[action[1]][1];yyval.$=vstack[vstack.length-len];yyval._$={first_line:lstack[lstack.length-(len||1)].first_line,last_line:lstack[lstack.length-1].last_line,first_column:lstack[lstack.length-(len||1)].first_column,last_column:lstack[lstack.length-1].last_column};if(ranges){yyval._$.range=[lstack[lstack.length-(len||1)].range[0],lstack[lstack.length-1].range[1]]}r=this.performAction.call(yyval,yytext,yyleng,yylineno,this.yy,action[1],vstack,lstack);if(typeof r!=="undefined"){return r}if(len){stack=stack.slice(0,-1*len*2);vstack=vstack.slice(0,-1*len);lstack=lstack.slice(0,-1*len)}stack.push(this.productions_[action[1]][0]);vstack.push(yyval.$);lstack.push(yyval._$);newState=table[stack[stack.length-2]][stack[stack.length-1]];stack.push(newState);break;case 3:return true}}return true}};var lexer=function(){var lexer={EOF:1,parseError:function parseError(str,hash){if(this.yy.parser){this.yy.parser.parseError(str,hash)}else{throw new Error(str)}},setInput:function setInput(input){this._input=input;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges)this.yylloc.range=[0,0];this.offset=0;return this},input:function input(){var ch=this._input[0];this.yytext+=ch;this.yyleng++;this.offset++;this.match+=ch;this.matched+=ch;var lines=ch.match(/(?:\r\n?|\n).*/g);if(lines){this.yylineno++;this.yylloc.last_line++}else{this.yylloc.last_column++}if(this.options.ranges)this.yylloc.range[1]++;this._input=this._input.slice(1);return ch},unput:function unput(ch){var len=ch.length;var lines=ch.split(/(?:\r\n?|\n)/g);this._input=ch+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-len-1);this.offset-=len;var oldLines=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(lines.length-1)this.yylineno-=lines.length-1;var r=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:lines?(lines.length===oldLines.length?this.yylloc.first_column:0)+oldLines[oldLines.length-lines.length].length-lines[0].length:this.yylloc.first_column-len};if(this.options.ranges){this.yylloc.range=[r[0],r[0]+this.yyleng-len]}return this},more:function more(){this._more=true;return this},less:function less(n){this.unput(this.match.slice(n))},pastInput:function pastInput(){var past=this.matched.substr(0,this.matched.length-this.match.length);return(past.length>20?"...":"")+past.substr(-20).replace(/\n/g,"")},upcomingInput:function upcomingInput(){var next=this.match;if(next.length<20){next+=this._input.substr(0,20-next.length)}return(next.substr(0,20)+(next.length>20?"...":"")).replace(/\n/g,"")},showPosition:function showPosition(){var pre=this.pastInput();var c=new Array(pre.length+1).join("-");return pre+this.upcomingInput()+"\n"+c+"^"},next:function next(){if(this.done){return this.EOF}if(!this._input)this.done=true;var token,match,tempMatch,index,col,lines;if(!this._more){this.yytext="";this.match=""}var rules=this._currentRules();for(var i=0;i<rules.length;i++){tempMatch=this._input.match(this.rules[rules[i]]);if(tempMatch&&(!match||tempMatch[0].length>match[0].length)){match=tempMatch;index=i;if(!this.options.flex)break}}if(match){lines=match[0].match(/(?:\r\n?|\n).*/g);if(lines)this.yylineno+=lines.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+match[0].length};this.yytext+=match[0];this.match+=match[0];this.matches=match;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]}this._more=false;this._input=this._input.slice(match[0].length);this.matched+=match[0];token=this.performAction.call(this,this.yy,this,rules[index],this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input)this.done=false;if(token)return token;else return}if(this._input===""){return this.EOF}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},lex:function lex(){var r=this.next();if(typeof r!=="undefined"){return r}else{return this.lex()}},begin:function begin(condition){this.conditionStack.push(condition)},popState:function popState(){return this.conditionStack.pop()},_currentRules:function _currentRules(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function topState(){return this.conditionStack[this.conditionStack.length-2]},pushState:function begin(condition){this.begin(condition)}};lexer.options={};lexer.performAction=function anonymous(yy,yy_,$avoiding_name_collisions,YY_START){function strip(start,end){return yy_.yytext=yy_.yytext.substring(start,yy_.yyleng-end+start)}var YYSTATE=YY_START;switch($avoiding_name_collisions){case 0:if(yy_.yytext.slice(-2)==="\\\\"){strip(0,1);this.begin("mu")}else if(yy_.yytext.slice(-1)==="\\"){strip(0,1);this.begin("emu")}else{this.begin("mu")}if(yy_.yytext)return 15;break;case 1:return 15;break;case 2:this.popState();return 15;break;case 3:this.begin("raw");return 15;break;case 4:this.popState();if(this.conditionStack[this.conditionStack.length-1]==="raw"){return 15}else{strip(5,9);return"END_RAW_BLOCK"}break;case 5:return 15;break;case 6:this.popState();return 14;break;case 7:return 65;break;case 8:return 68;break;case 9:return 19;break;case 10:this.popState();this.begin("raw");return 23;break;case 11:return 55;break;case 12:return 60;break;case 13:return 29;break;case 14:return 47;break;case 15:this.popState();return 44;break;case 16:this.popState();return 44;break;case 17:return 34;break;case 18:return 39;break;case 19:return 51;break;case 20:return 48;break;case 21:this.unput(yy_.yytext);this.popState();this.begin("com");break;case 22:this.popState();return 14;break;case 23:return 48;break;case 24:return 73;break;case 25:return 72;break;case 26:return 72;break;case 27:return 87;break;case 28:break;case 29:this.popState();return 54;break;case 30:this.popState();return 33;break;case 31:yy_.yytext=strip(1,2).replace(/\\"/g,'"');return 80;break;case 32:yy_.yytext=strip(1,2).replace(/\\'/g,"'");return 80;break;case 33:return 85;break;case 34:return 82;break;case 35:return 82;break;case 36:return 83;break;case 37:return 84;break;case 38:return 81;break;case 39:return 75;break;case 40:return 77;break;case 41:return 72;break;case 42:yy_.yytext=yy_.yytext.replace(/\\([\\\]])/g,"$1");return 72;break;case 43:return"INVALID";break;case 44:return 5;break}};lexer.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]+?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/];lexer.conditions={mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:false},emu:{rules:[2],inclusive:false},com:{rules:[6],inclusive:false},raw:{rules:[3,4,5],inclusive:false},INITIAL:{rules:[0,1,44],inclusive:true}};return lexer}();parser.lexer=lexer;function Parser(){this.yy={}}Parser.prototype=parser;parser.Parser=Parser;return new Parser}();exports["default"]=handlebars;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _visitor=__webpack_require__(49);var _visitor2=_interopRequireDefault(_visitor);function WhitespaceControl(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.options=options}WhitespaceControl.prototype=new _visitor2["default"];WhitespaceControl.prototype.Program=function(program){var doStandalone=!this.options.ignoreStandalone;var isRoot=!this.isRootSeen;this.isRootSeen=true;var body=program.body;for(var i=0,l=body.length;i<l;i++){var current=body[i],strip=this.accept(current);if(!strip){continue}var _isPrevWhitespace=isPrevWhitespace(body,i,isRoot),_isNextWhitespace=isNextWhitespace(body,i,isRoot),openStandalone=strip.openStandalone&&_isPrevWhitespace,closeStandalone=strip.closeStandalone&&_isNextWhitespace,inlineStandalone=strip.inlineStandalone&&_isPrevWhitespace&&_isNextWhitespace;if(strip.close){omitRight(body,i,true)}if(strip.open){omitLeft(body,i,true)}if(doStandalone&&inlineStandalone){omitRight(body,i);if(omitLeft(body,i)){if(current.type==="PartialStatement"){current.indent=/([ \t]+$)/.exec(body[i-1].original)[1]}}}if(doStandalone&&openStandalone){omitRight((current.program||current.inverse).body);omitLeft(body,i)}if(doStandalone&&closeStandalone){omitRight(body,i);omitLeft((current.inverse||current.program).body)}}return program};WhitespaceControl.prototype.BlockStatement=WhitespaceControl.prototype.DecoratorBlock=WhitespaceControl.prototype.PartialBlockStatement=function(block){this.accept(block.program);this.accept(block.inverse);var program=block.program||block.inverse,inverse=block.program&&block.inverse,firstInverse=inverse,lastInverse=inverse;if(inverse&&inverse.chained){firstInverse=inverse.body[0].program;while(lastInverse.chained){lastInverse=lastInverse.body[lastInverse.body.length-1].program}}var strip={open:block.openStrip.open,close:block.closeStrip.close,openStandalone:isNextWhitespace(program.body),closeStandalone:isPrevWhitespace((firstInverse||program).body)};if(block.openStrip.close){omitRight(program.body,null,true)}if(inverse){var inverseStrip=block.inverseStrip;if(inverseStrip.open){omitLeft(program.body,null,true)}if(inverseStrip.close){omitRight(firstInverse.body,null,true)}if(block.closeStrip.open){omitLeft(lastInverse.body,null,true)}if(!this.options.ignoreStandalone&&isPrevWhitespace(program.body)&&isNextWhitespace(firstInverse.body)){omitLeft(program.body);omitRight(firstInverse.body)}}else if(block.closeStrip.open){omitLeft(program.body,null,true)}return strip};WhitespaceControl.prototype.Decorator=WhitespaceControl.prototype.MustacheStatement=function(mustache){return mustache.strip};WhitespaceControl.prototype.PartialStatement=WhitespaceControl.prototype.CommentStatement=function(node){var strip=node.strip||{};return{inlineStandalone:true,open:strip.open,close:strip.close}};function isPrevWhitespace(body,i,isRoot){if(i===undefined){i=body.length}var prev=body[i-1],sibling=body[i-2];if(!prev){return isRoot}if(prev.type==="ContentStatement"){return(sibling||!isRoot?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(prev.original)}}function isNextWhitespace(body,i,isRoot){if(i===undefined){i=-1}var next=body[i+1],sibling=body[i+2];if(!next){return isRoot}if(next.type==="ContentStatement"){return(sibling||!isRoot?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(next.original)}}function omitRight(body,i,multiple){var current=body[i==null?0:i+1];if(!current||current.type!=="ContentStatement"||!multiple&&current.rightStripped){return}var original=current.value;current.value=current.value.replace(multiple?/^\s+/:/^[ \t]*\r?\n?/,"");current.rightStripped=current.value!==original}function omitLeft(body,i,multiple){var current=body[i==null?body.length-1:i-1];if(!current||current.type!=="ContentStatement"||!multiple&&current.leftStripped){return}var original=current.value;current.value=current.value.replace(multiple?/\s+$/:/[ \t]+$/,"");current.leftStripped=current.value!==original;return current.leftStripped}exports["default"]=WhitespaceControl;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);function Visitor(){this.parents=[]}Visitor.prototype={constructor:Visitor,mutating:false,acceptKey:function acceptKey(node,name){var value=this.accept(node[name]);if(this.mutating){if(value&&!Visitor.prototype[value.type]){throw new _exception2["default"]('Unexpected node type "'+value.type+'" found when accepting '+name+" on "+node.type)}node[name]=value}},acceptRequired:function acceptRequired(node,name){this.acceptKey(node,name);if(!node[name]){throw new _exception2["default"](node.type+" requires "+name)}},acceptArray:function acceptArray(array){for(var i=0,l=array.length;i<l;i++){this.acceptKey(array,i);if(!array[i]){array.splice(i,1);i--;l--}}},accept:function accept(object){if(!object){return}if(!this[object.type]){throw new _exception2["default"]("Unknown type: "+object.type,object)}if(this.current){this.parents.unshift(this.current)}this.current=object;var ret=this[object.type](object);this.current=this.parents.shift();if(!this.mutating||ret){return ret}else if(ret!==false){return object}},Program:function Program(program){this.acceptArray(program.body)},MustacheStatement:visitSubExpression,Decorator:visitSubExpression,BlockStatement:visitBlock,DecoratorBlock:visitBlock,PartialStatement:visitPartial,PartialBlockStatement:function PartialBlockStatement(partial){visitPartial.call(this,partial);this.acceptKey(partial,"program")},ContentStatement:function ContentStatement(){},CommentStatement:function CommentStatement(){},SubExpression:visitSubExpression,PathExpression:function PathExpression(){},StringLiteral:function StringLiteral(){},NumberLiteral:function NumberLiteral(){},BooleanLiteral:function BooleanLiteral(){},UndefinedLiteral:function UndefinedLiteral(){},NullLiteral:function NullLiteral(){},Hash:function Hash(hash){this.acceptArray(hash.pairs)},HashPair:function HashPair(pair){this.acceptRequired(pair,"value")}};function visitSubExpression(mustache){this.acceptRequired(mustache,"path");this.acceptArray(mustache.params);this.acceptKey(mustache,"hash")}function visitBlock(block){visitSubExpression.call(this,block);this.acceptKey(block,"program");this.acceptKey(block,"inverse")}function visitPartial(partial){this.acceptRequired(partial,"name");this.acceptArray(partial.params);this.acceptKey(partial,"hash")}exports["default"]=Visitor;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.SourceLocation=SourceLocation;exports.id=id;exports.stripFlags=stripFlags;exports.stripComment=stripComment;exports.preparePath=preparePath;exports.prepareMustache=prepareMustache;exports.prepareRawBlock=prepareRawBlock;exports.prepareBlock=prepareBlock;exports.prepareProgram=prepareProgram;exports.preparePartialBlock=preparePartialBlock;var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);function validateClose(open,close){close=close.path?close.path.original:close;if(open.path.original!==close){var errorNode={loc:open.path.loc};throw new _exception2["default"](open.path.original+" doesn't match "+close,errorNode)}}function SourceLocation(source,locInfo){this.source=source;this.start={line:locInfo.first_line,column:locInfo.first_column};this.end={line:locInfo.last_line,column:locInfo.last_column}}function id(token){if(/^\[.*\]$/.test(token)){return token.substring(1,token.length-1)}else{return token}}function stripFlags(open,close){return{open:open.charAt(2)==="~",close:close.charAt(close.length-3)==="~"}}function stripComment(comment){return comment.replace(/^\{\{~?!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function preparePath(data,parts,loc){loc=this.locInfo(loc);var original=data?"@":"",dig=[],depth=0;for(var i=0,l=parts.length;i<l;i++){var part=parts[i].part,isLiteral=parts[i].original!==part;original+=(parts[i].separator||"")+part;if(!isLiteral&&(part===".."||part==="."||part==="this")){if(dig.length>0){throw new _exception2["default"]("Invalid path: "+original,{loc:loc})}else if(part===".."){depth++}}else{dig.push(part)}}return{type:"PathExpression",data:data,depth:depth,parts:dig,original:original,loc:loc}}function prepareMustache(path,params,hash,open,strip,locInfo){var escapeFlag=open.charAt(3)||open.charAt(2),escaped=escapeFlag!=="{"&&escapeFlag!=="&";var decorator=/\*/.test(open);return{type:decorator?"Decorator":"MustacheStatement",path:path,params:params,hash:hash,escaped:escaped,strip:strip,loc:this.locInfo(locInfo)}}function prepareRawBlock(openRawBlock,contents,close,locInfo){validateClose(openRawBlock,close);locInfo=this.locInfo(locInfo);var program={type:"Program",body:contents,strip:{},loc:locInfo};return{type:"BlockStatement",path:openRawBlock.path,params:openRawBlock.params,hash:openRawBlock.hash,program:program,openStrip:{},inverseStrip:{},closeStrip:{},loc:locInfo}}function prepareBlock(openBlock,program,inverseAndProgram,close,inverted,locInfo){if(close&&close.path){validateClose(openBlock,close)}var decorator=/\*/.test(openBlock.open);program.blockParams=openBlock.blockParams;var inverse=undefined,inverseStrip=undefined;if(inverseAndProgram){if(decorator){throw new _exception2["default"]("Unexpected inverse block on decorator",inverseAndProgram)}if(inverseAndProgram.chain){inverseAndProgram.program.body[0].closeStrip=close.strip}inverseStrip=inverseAndProgram.strip;inverse=inverseAndProgram.program}if(inverted){inverted=inverse;inverse=program;program=inverted}return{type:decorator?"DecoratorBlock":"BlockStatement",path:openBlock.path,params:openBlock.params,hash:openBlock.hash,program:program,inverse:inverse,openStrip:openBlock.strip,inverseStrip:inverseStrip,closeStrip:close&&close.strip,loc:this.locInfo(locInfo)}}function prepareProgram(statements,loc){if(!loc&&statements.length){var firstLoc=statements[0].loc,lastLoc=statements[statements.length-1].loc;if(firstLoc&&lastLoc){loc={source:firstLoc.source,start:{line:firstLoc.start.line,column:firstLoc.start.column},end:{line:lastLoc.end.line,column:lastLoc.end.column}}}}return{type:"Program",body:statements,strip:{},loc:loc}}function preparePartialBlock(open,program,close,locInfo){validateClose(open,close);return{type:"PartialBlockStatement",name:open.path,params:open.params,hash:open.hash,program:program,openStrip:open.strip,closeStrip:close&&close.strip,loc:this.locInfo(locInfo)}}},function(module,exports,__webpack_require__){"use strict";var _Object$create=__webpack_require__(34)["default"];var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;exports.Compiler=Compiler;exports.precompile=precompile;exports.compile=compile;var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);var _utils=__webpack_require__(5);var _ast=__webpack_require__(45);var _ast2=_interopRequireDefault(_ast);var slice=[].slice;function Compiler(){}Compiler.prototype={compiler:Compiler,equals:function equals(other){var len=this.opcodes.length;if(other.opcodes.length!==len){return false}for(var i=0;i<len;i++){var opcode=this.opcodes[i],otherOpcode=other.opcodes[i];if(opcode.opcode!==otherOpcode.opcode||!argEquals(opcode.args,otherOpcode.args)){return false}}len=this.children.length;for(var i=0;i<len;i++){if(!this.children[i].equals(other.children[i])){return false}}return true},guid:0,compile:function compile(program,options){this.sourceNode=[];this.opcodes=[];this.children=[];this.options=options;this.stringParams=options.stringParams;this.trackIds=options.trackIds;options.blockParams=options.blockParams||[];options.knownHelpers=_utils.extend(_Object$create(null),{helperMissing:true,blockHelperMissing:true,each:true,if:true,unless:true,with:true,log:true,lookup:true},options.knownHelpers);return this.accept(program)},compileProgram:function compileProgram(program){var childCompiler=new this.compiler,result=childCompiler.compile(program,this.options),guid=this.guid++;this.usePartial=this.usePartial||result.usePartial;this.children[guid]=result;this.useDepths=this.useDepths||result.useDepths;return guid},accept:function accept(node){if(!this[node.type]){throw new _exception2["default"]("Unknown type: "+node.type,node)}this.sourceNode.unshift(node);var ret=this[node.type](node);this.sourceNode.shift();return ret},Program:function Program(program){this.options.blockParams.unshift(program.blockParams);var body=program.body,bodyLength=body.length;for(var i=0;i<bodyLength;i++){this.accept(body[i])}this.options.blockParams.shift();this.isSimple=bodyLength===1;this.blockParams=program.blockParams?program.blockParams.length:0;return this},BlockStatement:function BlockStatement(block){transformLiteralToPath(block);var program=block.program,inverse=block.inverse;program=program&&this.compileProgram(program);inverse=inverse&&this.compileProgram(inverse);var type=this.classifySexpr(block);if(type==="helper"){this.helperSexpr(block,program,inverse)}else if(type==="simple"){this.simpleSexpr(block);this.opcode("pushProgram",program);this.opcode("pushProgram",inverse);this.opcode("emptyHash");this.opcode("blockValue",block.path.original)}else{this.ambiguousSexpr(block,program,inverse);this.opcode("pushProgram",program);this.opcode("pushProgram",inverse);this.opcode("emptyHash");this.opcode("ambiguousBlockValue")}this.opcode("append")},DecoratorBlock:function DecoratorBlock(decorator){var program=decorator.program&&this.compileProgram(decorator.program);var params=this.setupFullMustacheParams(decorator,program,undefined),path=decorator.path;this.useDecorators=true;this.opcode("registerDecorator",params.length,path.original)},PartialStatement:function PartialStatement(partial){this.usePartial=true;var program=partial.program;if(program){program=this.compileProgram(partial.program)}var params=partial.params;if(params.length>1){throw new _exception2["default"]("Unsupported number of partial arguments: "+params.length,partial)}else if(!params.length){if(this.options.explicitPartialContext){this.opcode("pushLiteral","undefined")}else{params.push({type:"PathExpression",parts:[],depth:0})}}var partialName=partial.name.original,isDynamic=partial.name.type==="SubExpression";if(isDynamic){this.accept(partial.name)}this.setupFullMustacheParams(partial,program,undefined,true);var indent=partial.indent||"";if(this.options.preventIndent&&indent){this.opcode("appendContent",indent);indent=""}this.opcode("invokePartial",isDynamic,partialName,indent);this.opcode("append")},PartialBlockStatement:function PartialBlockStatement(partialBlock){this.PartialStatement(partialBlock)},MustacheStatement:function MustacheStatement(mustache){this.SubExpression(mustache);if(mustache.escaped&&!this.options.noEscape){this.opcode("appendEscaped")}else{this.opcode("append")}},Decorator:function Decorator(decorator){this.DecoratorBlock(decorator)},ContentStatement:function ContentStatement(content){if(content.value){this.opcode("appendContent",content.value)}},CommentStatement:function CommentStatement(){},SubExpression:function SubExpression(sexpr){transformLiteralToPath(sexpr);var type=this.classifySexpr(sexpr);if(type==="simple"){this.simpleSexpr(sexpr)}else if(type==="helper"){this.helperSexpr(sexpr)}else{this.ambiguousSexpr(sexpr)}},ambiguousSexpr:function ambiguousSexpr(sexpr,program,inverse){var path=sexpr.path,name=path.parts[0],isBlock=program!=null||inverse!=null;this.opcode("getContext",path.depth);this.opcode("pushProgram",program);this.opcode("pushProgram",inverse);path.strict=true;this.accept(path);this.opcode("invokeAmbiguous",name,isBlock)},simpleSexpr:function simpleSexpr(sexpr){var path=sexpr.path;path.strict=true;this.accept(path);this.opcode("resolvePossibleLambda")},helperSexpr:function helperSexpr(sexpr,program,inverse){var params=this.setupFullMustacheParams(sexpr,program,inverse),path=sexpr.path,name=path.parts[0];if(this.options.knownHelpers[name]){this.opcode("invokeKnownHelper",params.length,name)}else if(this.options.knownHelpersOnly){throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper "+name,sexpr)}else{path.strict=true;path.falsy=true;this.accept(path);this.opcode("invokeHelper",params.length,path.original,_ast2["default"].helpers.simpleId(path))}},PathExpression:function PathExpression(path){this.addDepth(path.depth);this.opcode("getContext",path.depth);var name=path.parts[0],scoped=_ast2["default"].helpers.scopedId(path),blockParamId=!path.depth&&!scoped&&this.blockParamIndex(name);if(blockParamId){this.opcode("lookupBlockParam",blockParamId,path.parts)}else if(!name){this.opcode("pushContext")}else if(path.data){this.options.data=true;this.opcode("lookupData",path.depth,path.parts,path.strict)}else{this.opcode("lookupOnContext",path.parts,path.falsy,path.strict,scoped)}},StringLiteral:function StringLiteral(string){this.opcode("pushString",string.value)},NumberLiteral:function NumberLiteral(number){this.opcode("pushLiteral",number.value)},BooleanLiteral:function BooleanLiteral(bool){this.opcode("pushLiteral",bool.value)},UndefinedLiteral:function UndefinedLiteral(){this.opcode("pushLiteral","undefined")},NullLiteral:function NullLiteral(){this.opcode("pushLiteral","null")},Hash:function Hash(hash){var pairs=hash.pairs,i=0,l=pairs.length;this.opcode("pushHash");for(;i<l;i++){this.pushParam(pairs[i].value)}while(i--){this.opcode("assignToHash",pairs[i].key)}this.opcode("popHash")},opcode:function opcode(name){this.opcodes.push({opcode:name,args:slice.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function addDepth(depth){if(!depth){return}this.useDepths=true},classifySexpr:function classifySexpr(sexpr){var isSimple=_ast2["default"].helpers.simpleId(sexpr.path);var isBlockParam=isSimple&&!!this.blockParamIndex(sexpr.path.parts[0]);var isHelper=!isBlockParam&&_ast2["default"].helpers.helperExpression(sexpr);var isEligible=!isBlockParam&&(isHelper||isSimple);if(isEligible&&!isHelper){var _name=sexpr.path.parts[0],options=this.options;if(options.knownHelpers[_name]){isHelper=true}else if(options.knownHelpersOnly){isEligible=false}}if(isHelper){return"helper"}else if(isEligible){return"ambiguous"}else{return"simple"}},pushParams:function pushParams(params){for(var i=0,l=params.length;i<l;i++){this.pushParam(params[i])}},pushParam:function pushParam(val){var value=val.value!=null?val.value:val.original||"";if(this.stringParams){if(value.replace){value=value.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")}if(val.depth){this.addDepth(val.depth)}this.opcode("getContext",val.depth||0);this.opcode("pushStringParam",value,val.type);if(val.type==="SubExpression"){this.accept(val)}}else{if(this.trackIds){var blockParamIndex=undefined;if(val.parts&&!_ast2["default"].helpers.scopedId(val)&&!val.depth){blockParamIndex=this.blockParamIndex(val.parts[0])}if(blockParamIndex){var blockParamChild=val.parts.slice(1).join(".");this.opcode("pushId","BlockParam",blockParamIndex,blockParamChild)}else{value=val.original||value;if(value.replace){value=value.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")}this.opcode("pushId",val.type,value)}}this.accept(val)}},setupFullMustacheParams:function setupFullMustacheParams(sexpr,program,inverse,omitEmpty){var params=sexpr.params;this.pushParams(params);this.opcode("pushProgram",program);this.opcode("pushProgram",inverse);if(sexpr.hash){this.accept(sexpr.hash)}else{this.opcode("emptyHash",omitEmpty)}return params},blockParamIndex:function blockParamIndex(name){for(var depth=0,len=this.options.blockParams.length;depth<len;depth++){var blockParams=this.options.blockParams[depth],param=blockParams&&_utils.indexOf(blockParams,name);if(blockParams&&param>=0){return[depth,param]}}}};function precompile(input,options,env){if(input==null||typeof input!=="string"&&input.type!=="Program"){throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+input)}options=options||{};if(!("data"in options)){options.data=true}if(options.compat){options.useDepths=true}var ast=env.parse(input,options),environment=(new env.Compiler).compile(ast,options);return(new env.JavaScriptCompiler).compile(environment,options)}function compile(input,options,env){if(options===undefined)options={};if(input==null||typeof input!=="string"&&input.type!=="Program"){throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+input)}options=_utils.extend({},options);if(!("data"in options)){options.data=true}if(options.compat){options.useDepths=true}var compiled=undefined;function compileInput(){var ast=env.parse(input,options),environment=(new env.Compiler).compile(ast,options),templateSpec=(new env.JavaScriptCompiler).compile(environment,options,undefined,true);return env.template(templateSpec)}function ret(context,execOptions){if(!compiled){compiled=compileInput()}return compiled.call(this,context,execOptions)}ret._setup=function(setupOptions){if(!compiled){compiled=compileInput()}return compiled._setup(setupOptions)};ret._child=function(i,data,blockParams,depths){if(!compiled){compiled=compileInput()}return compiled._child(i,data,blockParams,depths)};return ret}function argEquals(a,b){if(a===b){return true}if(_utils.isArray(a)&&_utils.isArray(b)&&a.length===b.length){for(var i=0;i<a.length;i++){if(!argEquals(a[i],b[i])){return false}}return true}}function transformLiteralToPath(sexpr){if(!sexpr.path.parts){var literal=sexpr.path;sexpr.path={type:"PathExpression",data:false,depth:0,parts:[literal.original+""],original:literal.original+"",loc:literal.loc}}}},function(module,exports,__webpack_require__){"use strict";var _Object$keys=__webpack_require__(13)["default"];var _interopRequireDefault=__webpack_require__(1)["default"];exports.__esModule=true;var _base=__webpack_require__(4);var _exception=__webpack_require__(6);var _exception2=_interopRequireDefault(_exception);var _utils=__webpack_require__(5);var _codeGen=__webpack_require__(53);var _codeGen2=_interopRequireDefault(_codeGen);function Literal(value){this.value=value}function JavaScriptCompiler(){}JavaScriptCompiler.prototype={nameLookup:function nameLookup(parent,name){return this.internalNameLookup(parent,name)},depthedLookup:function depthedLookup(name){return[this.aliasable("container.lookup"),"(depths, ",JSON.stringify(name),")"]},compilerInfo:function compilerInfo(){var revision=_base.COMPILER_REVISION,versions=_base.REVISION_CHANGES[revision];return[revision,versions]},appendToBuffer:function appendToBuffer(source,location,explicit){if(!_utils.isArray(source)){source=[source]}source=this.source.wrap(source,location);if(this.environment.isSimple){return["return ",source,";"]}else if(explicit){return["buffer += ",source,";"]}else{source.appendToBuffer=true;return source}},initializeBuffer:function initializeBuffer(){return this.quotedString("")},internalNameLookup:function internalNameLookup(parent,name){this.lookupPropertyFunctionIsUsed=true;return["lookupProperty(",parent,",",JSON.stringify(name),")"]},lookupPropertyFunctionIsUsed:false,compile:function compile(environment,options,context,asObject){this.environment=environment;this.options=options;this.stringParams=this.options.stringParams;this.trackIds=this.options.trackIds;this.precompile=!asObject;this.name=this.environment.name;this.isChild=!!context;this.context=context||{decorators:[],programs:[],environments:[]};this.preamble();this.stackSlot=0;this.stackVars=[];this.aliases={};this.registers={list:[]};this.hashes=[];this.compileStack=[];this.inlineStack=[];this.blockParams=[];this.compileChildren(environment,options);this.useDepths=this.useDepths||environment.useDepths||environment.useDecorators||this.options.compat;this.useBlockParams=this.useBlockParams||environment.useBlockParams;var opcodes=environment.opcodes,opcode=undefined,firstLoc=undefined,i=undefined,l=undefined;for(i=0,l=opcodes.length;i<l;i++){opcode=opcodes[i];this.source.currentLocation=opcode.loc;firstLoc=firstLoc||opcode.loc;this[opcode.opcode].apply(this,opcode.args)}this.source.currentLocation=firstLoc;this.pushSource("");if(this.stackSlot||this.inlineStack.length||this.compileStack.length){throw new _exception2["default"]("Compile completed with content left on stack")}if(!this.decorators.isEmpty()){this.useDecorators=true;this.decorators.prepend(["var decorators = container.decorators, ",this.lookupPropertyFunctionVarDeclaration(),";\n"]);this.decorators.push("return fn;");if(asObject){this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()])}else{this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");this.decorators.push("}\n");this.decorators=this.decorators.merge()}}else{this.decorators=undefined}var fn=this.createFunctionContext(asObject);if(!this.isChild){var ret={compiler:this.compilerInfo(),main:fn};if(this.decorators){ret.main_d=this.decorators;ret.useDecorators=true}var _context=this.context;var programs=_context.programs;var decorators=_context.decorators;for(i=0,l=programs.length;i<l;i++){if(programs[i]){ret[i]=programs[i];if(decorators[i]){ret[i+"_d"]=decorators[i];ret.useDecorators=true}}}if(this.environment.usePartial){ret.usePartial=true}if(this.options.data){ret.useData=true}if(this.useDepths){ret.useDepths=true}if(this.useBlockParams){ret.useBlockParams=true}if(this.options.compat){ret.compat=true}if(!asObject){ret.compiler=JSON.stringify(ret.compiler);this.source.currentLocation={start:{line:1,column:0}};ret=this.objectLiteral(ret);if(options.srcName){ret=ret.toStringWithSourceMap({file:options.destName});ret.map=ret.map&&ret.map.toString()}else{ret=ret.toString()}}else{ret.compilerOptions=this.options}return ret}else{return fn}},preamble:function preamble(){this.lastContext=0;this.source=new _codeGen2["default"](this.options.srcName);this.decorators=new _codeGen2["default"](this.options.srcName)},createFunctionContext:function createFunctionContext(asObject){var _this=this;var varDeclarations="";var locals=this.stackVars.concat(this.registers.list);if(locals.length>0){varDeclarations+=", "+locals.join(", ")}var aliasCount=0;_Object$keys(this.aliases).forEach((function(alias){var node=_this.aliases[alias];if(node.children&&node.referenceCount>1){varDeclarations+=", alias"+ ++aliasCount+"="+alias;node.children[0]="alias"+aliasCount}}));if(this.lookupPropertyFunctionIsUsed){varDeclarations+=", "+this.lookupPropertyFunctionVarDeclaration()}var params=["container","depth0","helpers","partials","data"];if(this.useBlockParams||this.useDepths){params.push("blockParams")}if(this.useDepths){params.push("depths")}var source=this.mergeSource(varDeclarations);if(asObject){params.push(source);return Function.apply(this,params)}else{return this.source.wrap(["function(",params.join(","),") {\n  ",source,"}"])}},mergeSource:function mergeSource(varDeclarations){var isSimple=this.environment.isSimple,appendOnly=!this.forceBuffer,appendFirst=undefined,sourceSeen=undefined,bufferStart=undefined,bufferEnd=undefined;this.source.each((function(line){if(line.appendToBuffer){if(bufferStart){line.prepend("  + ")}else{bufferStart=line}bufferEnd=line}else{if(bufferStart){if(!sourceSeen){appendFirst=true}else{bufferStart.prepend("buffer += ")}bufferEnd.add(";");bufferStart=bufferEnd=undefined}sourceSeen=true;if(!isSimple){appendOnly=false}}}));if(appendOnly){if(bufferStart){bufferStart.prepend("return ");bufferEnd.add(";")}else if(!sourceSeen){this.source.push('return "";')}}else{varDeclarations+=", buffer = "+(appendFirst?"":this.initializeBuffer());if(bufferStart){bufferStart.prepend("return buffer + ");bufferEnd.add(";")}else{this.source.push("return buffer;")}}if(varDeclarations){this.source.prepend("var "+varDeclarations.substring(2)+(appendFirst?"":";\n"))}return this.source.merge()},lookupPropertyFunctionVarDeclaration:function lookupPropertyFunctionVarDeclaration(){return"\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim()},blockValue:function blockValue(name){var blockHelperMissing=this.aliasable("container.hooks.blockHelperMissing"),params=[this.contextName(0)];this.setupHelperArgs(name,0,params);var blockName=this.popStack();params.splice(1,0,blockName);this.push(this.source.functionCall(blockHelperMissing,"call",params))},ambiguousBlockValue:function ambiguousBlockValue(){var blockHelperMissing=this.aliasable("container.hooks.blockHelperMissing"),params=[this.contextName(0)];this.setupHelperArgs("",0,params,true);this.flushInline();var current=this.topStack();params.splice(1,0,current);this.pushSource(["if (!",this.lastHelper,") { ",current," = ",this.source.functionCall(blockHelperMissing,"call",params),"}"])},appendContent:function appendContent(content){if(this.pendingContent){content=this.pendingContent+content}else{this.pendingLocation=this.source.currentLocation}this.pendingContent=content},append:function append(){if(this.isInline()){this.replaceStack((function(current){return[" != null ? ",current,' : ""']}));this.pushSource(this.appendToBuffer(this.popStack()))}else{var local=this.popStack();this.pushSource(["if (",local," != null) { ",this.appendToBuffer(local,undefined,true)," }"]);if(this.environment.isSimple){this.pushSource(["else { ",this.appendToBuffer("''",undefined,true)," }"])}}},appendEscaped:function appendEscaped(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function getContext(depth){this.lastContext=depth},pushContext:function pushContext(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function lookupOnContext(parts,falsy,strict,scoped){var i=0;if(!scoped&&this.options.compat&&!this.lastContext){this.push(this.depthedLookup(parts[i++]))}else{this.pushContext()}this.resolvePath("context",parts,i,falsy,strict)},lookupBlockParam:function lookupBlockParam(blockParamId,parts){this.useBlockParams=true;this.push(["blockParams[",blockParamId[0],"][",blockParamId[1],"]"]);this.resolvePath("context",parts,1)},lookupData:function lookupData(depth,parts,strict){if(!depth){this.pushStackLiteral("data")}else{this.pushStackLiteral("container.data(data, "+depth+")")}this.resolvePath("data",parts,0,true,strict)},resolvePath:function resolvePath(type,parts,i,falsy,strict){var _this2=this;if(this.options.strict||this.options.assumeObjects){this.push(strictLookup(this.options.strict&&strict,this,parts,type));return}var len=parts.length;for(;i<len;i++){this.replaceStack((function(current){var lookup=_this2.nameLookup(current,parts[i],type);if(!falsy){return[" != null ? ",lookup," : ",current]}else{return[" && ",lookup]}}))}},resolvePossibleLambda:function resolvePossibleLambda(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function pushStringParam(string,type){this.pushContext();this.pushString(type);if(type!=="SubExpression"){if(typeof string==="string"){this.pushString(string)}else{this.pushStackLiteral(string)}}},emptyHash:function emptyHash(omitEmpty){if(this.trackIds){this.push("{}")}if(this.stringParams){this.push("{}");this.push("{}")}this.pushStackLiteral(omitEmpty?"undefined":"{}")},pushHash:function pushHash(){if(this.hash){this.hashes.push(this.hash)}this.hash={values:{},types:[],contexts:[],ids:[]}},popHash:function popHash(){var hash=this.hash;this.hash=this.hashes.pop();if(this.trackIds){this.push(this.objectLiteral(hash.ids))}if(this.stringParams){this.push(this.objectLiteral(hash.contexts));this.push(this.objectLiteral(hash.types))}this.push(this.objectLiteral(hash.values))},pushString:function pushString(string){this.pushStackLiteral(this.quotedString(string))},pushLiteral:function pushLiteral(value){this.pushStackLiteral(value)},pushProgram:function pushProgram(guid){if(guid!=null){this.pushStackLiteral(this.programExpression(guid))}else{this.pushStackLiteral(null)}},registerDecorator:function registerDecorator(paramSize,name){var foundDecorator=this.nameLookup("decorators",name,"decorator"),options=this.setupHelperArgs(name,paramSize);this.decorators.push(["fn = ",this.decorators.functionCall(foundDecorator,"",["fn","props","container",options])," || fn;"])},invokeHelper:function invokeHelper(paramSize,name,isSimple){var nonHelper=this.popStack(),helper=this.setupHelper(paramSize,name);var possibleFunctionCalls=[];if(isSimple){possibleFunctionCalls.push(helper.name)}possibleFunctionCalls.push(nonHelper);if(!this.options.strict){possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"))}var functionLookupCode=["(",this.itemsSeparatedBy(possibleFunctionCalls,"||"),")"];var functionCall=this.source.functionCall(functionLookupCode,"call",helper.callParams);this.push(functionCall)},itemsSeparatedBy:function itemsSeparatedBy(items,separator){var result=[];result.push(items[0]);for(var i=1;i<items.length;i++){result.push(separator,items[i])}return result},invokeKnownHelper:function invokeKnownHelper(paramSize,name){var helper=this.setupHelper(paramSize,name);this.push(this.source.functionCall(helper.name,"call",helper.callParams))},invokeAmbiguous:function invokeAmbiguous(name,helperCall){this.useRegister("helper");var nonHelper=this.popStack();this.emptyHash();var helper=this.setupHelper(0,name,helperCall);var helperName=this.lastHelper=this.nameLookup("helpers",name,"helper");var lookup=["(","(helper = ",helperName," || ",nonHelper,")"];if(!this.options.strict){lookup[0]="(helper = ";lookup.push(" != null ? helper : ",this.aliasable("container.hooks.helperMissing"))}this.push(["(",lookup,helper.paramsInit?["),(",helper.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",helper.callParams)," : helper))"])},invokePartial:function invokePartial(isDynamic,name,indent){var params=[],options=this.setupParams(name,1,params);if(isDynamic){name=this.popStack();delete options.name}if(indent){options.indent=JSON.stringify(indent)}options.helpers="helpers";options.partials="partials";options.decorators="container.decorators";if(!isDynamic){params.unshift(this.nameLookup("partials",name,"partial"))}else{params.unshift(name)}if(this.options.compat){options.depths="depths"}options=this.objectLiteral(options);params.push(options);this.push(this.source.functionCall("container.invokePartial","",params))},assignToHash:function assignToHash(key){var value=this.popStack(),context=undefined,type=undefined,id=undefined;if(this.trackIds){id=this.popStack()}if(this.stringParams){type=this.popStack();context=this.popStack()}var hash=this.hash;if(context){hash.contexts[key]=context}if(type){hash.types[key]=type}if(id){hash.ids[key]=id}hash.values[key]=value},pushId:function pushId(type,name,child){if(type==="BlockParam"){this.pushStackLiteral("blockParams["+name[0]+"].path["+name[1]+"]"+(child?" + "+JSON.stringify("."+child):""))}else if(type==="PathExpression"){this.pushString(name)}else if(type==="SubExpression"){this.pushStackLiteral("true")}else{this.pushStackLiteral("null")}},compiler:JavaScriptCompiler,compileChildren:function compileChildren(environment,options){var children=environment.children,child=undefined,compiler=undefined;for(var i=0,l=children.length;i<l;i++){child=children[i];compiler=new this.compiler;var existing=this.matchExistingProgram(child);if(existing==null){this.context.programs.push("");var index=this.context.programs.length;child.index=index;child.name="program"+index;this.context.programs[index]=compiler.compile(child,options,this.context,!this.precompile);this.context.decorators[index]=compiler.decorators;this.context.environments[index]=child;this.useDepths=this.useDepths||compiler.useDepths;this.useBlockParams=this.useBlockParams||compiler.useBlockParams;child.useDepths=this.useDepths;child.useBlockParams=this.useBlockParams}else{child.index=existing.index;child.name="program"+existing.index;this.useDepths=this.useDepths||existing.useDepths;this.useBlockParams=this.useBlockParams||existing.useBlockParams}}},matchExistingProgram:function matchExistingProgram(child){for(var i=0,len=this.context.environments.length;i<len;i++){var environment=this.context.environments[i];if(environment&&environment.equals(child)){return environment}}},programExpression:function programExpression(guid){var child=this.environment.children[guid],programParams=[child.index,"data",child.blockParams];if(this.useBlockParams||this.useDepths){programParams.push("blockParams")}if(this.useDepths){programParams.push("depths")}return"container.program("+programParams.join(", ")+")"},useRegister:function useRegister(name){if(!this.registers[name]){this.registers[name]=true;this.registers.list.push(name)}},push:function push(expr){if(!(expr instanceof Literal)){expr=this.source.wrap(expr)}this.inlineStack.push(expr);return expr},pushStackLiteral:function pushStackLiteral(item){this.push(new Literal(item))},pushSource:function pushSource(source){if(this.pendingContent){this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation));this.pendingContent=undefined}if(source){this.source.push(source)}},replaceStack:function replaceStack(callback){var prefix=["("],stack=undefined,createdStack=undefined,usedLiteral=undefined;if(!this.isInline()){throw new _exception2["default"]("replaceStack on non-inline")}var top=this.popStack(true);if(top instanceof Literal){stack=[top.value];prefix=["(",stack];usedLiteral=true}else{createdStack=true;var _name=this.incrStack();prefix=["((",this.push(_name)," = ",top,")"];stack=this.topStack()}var item=callback.call(this,stack);if(!usedLiteral){this.popStack()}if(createdStack){this.stackSlot--}this.push(prefix.concat(item,")"))},incrStack:function incrStack(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)}return this.topStackName()},topStackName:function topStackName(){return"stack"+this.stackSlot},flushInline:function flushInline(){var inlineStack=this.inlineStack;this.inlineStack=[];for(var i=0,len=inlineStack.length;i<len;i++){var entry=inlineStack[i];if(entry instanceof Literal){this.compileStack.push(entry)}else{var stack=this.incrStack();this.pushSource([stack," = ",entry,";"]);this.compileStack.push(stack)}}},isInline:function isInline(){return this.inlineStack.length},popStack:function popStack(wrapped){var inline=this.isInline(),item=(inline?this.inlineStack:this.compileStack).pop();if(!wrapped&&item instanceof Literal){return item.value}else{if(!inline){if(!this.stackSlot){throw new _exception2["default"]("Invalid stack pop")}this.stackSlot--}return item}},topStack:function topStack(){var stack=this.isInline()?this.inlineStack:this.compileStack,item=stack[stack.length-1];if(item instanceof Literal){return item.value}else{return item}},contextName:function contextName(context){if(this.useDepths&&context){return"depths["+context+"]"}else{return"depth"+context}},quotedString:function quotedString(str){return this.source.quotedString(str)},objectLiteral:function objectLiteral(obj){return this.source.objectLiteral(obj)},aliasable:function aliasable(name){var ret=this.aliases[name];if(ret){ret.referenceCount++;return ret}ret=this.aliases[name]=this.source.wrap(name);ret.aliasable=true;ret.referenceCount=1;return ret},setupHelper:function setupHelper(paramSize,name,blockHelper){var params=[],paramsInit=this.setupHelperArgs(name,paramSize,params,blockHelper);var foundHelper=this.nameLookup("helpers",name,"helper"),callContext=this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : (container.nullContext || {})");return{params:params,paramsInit:paramsInit,name:foundHelper,callParams:[callContext].concat(params)}},setupParams:function setupParams(helper,paramSize,params){var options={},contexts=[],types=[],ids=[],objectArgs=!params,param=undefined;if(objectArgs){params=[]}options.name=this.quotedString(helper);options.hash=this.popStack();if(this.trackIds){options.hashIds=this.popStack()}if(this.stringParams){options.hashTypes=this.popStack();options.hashContexts=this.popStack()}var inverse=this.popStack(),program=this.popStack();if(program||inverse){options.fn=program||"container.noop";options.inverse=inverse||"container.noop"}var i=paramSize;while(i--){param=this.popStack();params[i]=param;if(this.trackIds){ids[i]=this.popStack()}if(this.stringParams){types[i]=this.popStack();contexts[i]=this.popStack()}}if(objectArgs){options.args=this.source.generateArray(params)}if(this.trackIds){options.ids=this.source.generateArray(ids)}if(this.stringParams){options.types=this.source.generateArray(types);options.contexts=this.source.generateArray(contexts)}if(this.options.data){options.data="data"}if(this.useBlockParams){options.blockParams="blockParams"}return options},setupHelperArgs:function setupHelperArgs(helper,paramSize,params,useRegister){var options=this.setupParams(helper,paramSize,params);options.loc=JSON.stringify(this.source.currentLocation);options=this.objectLiteral(options);if(useRegister){this.useRegister("options");params.push("options");return["options=",options]}else if(params){params.push(options);return""}else{return options}}};(function(){var reservedWords=("break else new var"+" case finally return void"+" catch for switch while"+" continue function this with"+" default if throw"+" delete in try"+" do instanceof typeof"+" abstract enum int short"+" boolean export interface static"+" byte extends long super"+" char final native synchronized"+" class float package throws"+" const goto private transient"+" debugger implements protected volatile"+" double import public let yield await"+" null true false").split(" ");var compilerWords=JavaScriptCompiler.RESERVED_WORDS={};for(var i=0,l=reservedWords.length;i<l;i++){compilerWords[reservedWords[i]]=true}})();JavaScriptCompiler.isValidJavaScriptVariableName=function(name){return!JavaScriptCompiler.RESERVED_WORDS[name]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)};function strictLookup(requireTerminal,compiler,parts,type){var stack=compiler.popStack(),i=0,len=parts.length;if(requireTerminal){len--}for(;i<len;i++){stack=compiler.nameLookup(stack,parts[i],type)}if(requireTerminal){return[compiler.aliasable("container.strict"),"(",stack,", ",compiler.quotedString(parts[i]),", ",JSON.stringify(compiler.source.currentLocation)," )"]}else{return stack}}exports["default"]=JavaScriptCompiler;module.exports=exports["default"]},function(module,exports,__webpack_require__){"use strict";var _Object$keys=__webpack_require__(13)["default"];exports.__esModule=true;var _utils=__webpack_require__(5);var SourceNode=undefined;try{if(false){var SourceMap=require("source-map");SourceNode=SourceMap.SourceNode}}catch(err){}if(!SourceNode){SourceNode=function(line,column,srcFile,chunks){this.src="";if(chunks){this.add(chunks)}};SourceNode.prototype={add:function add(chunks){if(_utils.isArray(chunks)){chunks=chunks.join("")}this.src+=chunks},prepend:function prepend(chunks){if(_utils.isArray(chunks)){chunks=chunks.join("")}this.src=chunks+this.src},toStringWithSourceMap:function toStringWithSourceMap(){return{code:this.toString()}},toString:function toString(){return this.src}}}function castChunk(chunk,codeGen,loc){if(_utils.isArray(chunk)){var ret=[];for(var i=0,len=chunk.length;i<len;i++){ret.push(codeGen.wrap(chunk[i],loc))}return ret}else if(typeof chunk==="boolean"||typeof chunk==="number"){return chunk+""}return chunk}function CodeGen(srcFile){this.srcFile=srcFile;this.source=[]}CodeGen.prototype={isEmpty:function isEmpty(){return!this.source.length},prepend:function prepend(source,loc){this.source.unshift(this.wrap(source,loc))},push:function push(source,loc){this.source.push(this.wrap(source,loc))},merge:function merge(){var source=this.empty();this.each((function(line){source.add(["  ",line,"\n"])}));return source},each:function each(iter){for(var i=0,len=this.source.length;i<len;i++){iter(this.source[i])}},empty:function empty(){var loc=this.currentLocation||{start:{}};return new SourceNode(loc.start.line,loc.start.column,this.srcFile)},wrap:function wrap(chunk){var loc=arguments.length<=1||arguments[1]===undefined?this.currentLocation||{start:{}}:arguments[1];if(chunk instanceof SourceNode){return chunk}chunk=castChunk(chunk,this,loc);return new SourceNode(loc.start.line,loc.start.column,this.srcFile,chunk)},functionCall:function functionCall(fn,type,params){params=this.generateList(params);return this.wrap([fn,type?"."+type+"(":"(",params,")"])},quotedString:function quotedString(str){return'"'+(str+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function objectLiteral(obj){var _this=this;var pairs=[];_Object$keys(obj).forEach((function(key){var value=castChunk(obj[key],_this);if(value!=="undefined"){pairs.push([_this.quotedString(key),":",value])}}));var ret=this.generateList(pairs);ret.prepend("{");ret.add("}");return ret},generateList:function generateList(entries){var ret=this.empty();for(var i=0,len=entries.length;i<len;i++){if(i){ret.add(",")}ret.add(castChunk(entries[i],this))}return ret},generateArray:function generateArray(entries){var ret=this.generateList(entries);ret.prepend("[");ret.add("]");return ret}};exports["default"]=CodeGen;module.exports=exports["default"]}])}));
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,(function(e){var n=t[o][1][e];return s(n?n:e)}),l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";var asap=require("asap/raw");function noop(){}var LAST_ERROR=null;var IS_ERROR={};function getThen(obj){try{return obj.then}catch(ex){LAST_ERROR=ex;return IS_ERROR}}function tryCallOne(fn,a){try{return fn(a)}catch(ex){LAST_ERROR=ex;return IS_ERROR}}function tryCallTwo(fn,a,b){try{fn(a,b)}catch(ex){LAST_ERROR=ex;return IS_ERROR}}module.exports=Promise;function Promise(fn){if(typeof this!=="object"){throw new TypeError("Promises must be constructed via new")}if(typeof fn!=="function"){throw new TypeError("not a function")}this._37=0;this._12=null;this._59=[];if(fn===noop)return;doResolve(fn,this)}Promise._99=noop;Promise.prototype.then=function(onFulfilled,onRejected){if(this.constructor!==Promise){return safeThen(this,onFulfilled,onRejected)}var res=new Promise(noop);handle(this,new Handler(onFulfilled,onRejected,res));return res};function safeThen(self,onFulfilled,onRejected){return new self.constructor((function(resolve,reject){var res=new Promise(noop);res.then(resolve,reject);handle(self,new Handler(onFulfilled,onRejected,res))}))}function handle(self,deferred){while(self._37===3){self=self._12}if(self._37===0){self._59.push(deferred);return}asap((function(){var cb=self._37===1?deferred.onFulfilled:deferred.onRejected;if(cb===null){if(self._37===1){resolve(deferred.promise,self._12)}else{reject(deferred.promise,self._12)}return}var ret=tryCallOne(cb,self._12);if(ret===IS_ERROR){reject(deferred.promise,LAST_ERROR)}else{resolve(deferred.promise,ret)}}))}function resolve(self,newValue){if(newValue===self){return reject(self,new TypeError("A promise cannot be resolved with itself."))}if(newValue&&(typeof newValue==="object"||typeof newValue==="function")){var then=getThen(newValue);if(then===IS_ERROR){return reject(self,LAST_ERROR)}if(then===self.then&&newValue instanceof Promise){self._37=3;self._12=newValue;finale(self);return}else if(typeof then==="function"){doResolve(then.bind(newValue),self);return}}self._37=1;self._12=newValue;finale(self)}function reject(self,newValue){self._37=2;self._12=newValue;finale(self)}function finale(self){for(var i=0;i<self._59.length;i++){handle(self,self._59[i])}self._59=null}function Handler(onFulfilled,onRejected,promise){this.onFulfilled=typeof onFulfilled==="function"?onFulfilled:null;this.onRejected=typeof onRejected==="function"?onRejected:null;this.promise=promise}function doResolve(fn,promise){var done=false;var res=tryCallTwo(fn,(function(value){if(done)return;done=true;resolve(promise,value)}),(function(reason){if(done)return;done=true;reject(promise,reason)}));if(!done&&res===IS_ERROR){done=true;reject(promise,LAST_ERROR)}}},{"asap/raw":4}],2:[function(require,module,exports){"use strict";var Promise=require("./core.js");module.exports=Promise;var TRUE=valuePromise(true);var FALSE=valuePromise(false);var NULL=valuePromise(null);var UNDEFINED=valuePromise(undefined);var ZERO=valuePromise(0);var EMPTYSTRING=valuePromise("");function valuePromise(value){var p=new Promise(Promise._99);p._37=1;p._12=value;return p}Promise.resolve=function(value){if(value instanceof Promise)return value;if(value===null)return NULL;if(value===undefined)return UNDEFINED;if(value===true)return TRUE;if(value===false)return FALSE;if(value===0)return ZERO;if(value==="")return EMPTYSTRING;if(typeof value==="object"||typeof value==="function"){try{var then=value.then;if(typeof then==="function"){return new Promise(then.bind(value))}}catch(ex){return new Promise((function(resolve,reject){reject(ex)}))}}return valuePromise(value)};Promise.all=function(arr){var args=Array.prototype.slice.call(arr);return new Promise((function(resolve,reject){if(args.length===0)return resolve([]);var remaining=args.length;function res(i,val){if(val&&(typeof val==="object"||typeof val==="function")){if(val instanceof Promise&&val.then===Promise.prototype.then){while(val._37===3){val=val._12}if(val._37===1)return res(i,val._12);if(val._37===2)reject(val._12);val.then((function(val){res(i,val)}),reject);return}else{var then=val.then;if(typeof then==="function"){var p=new Promise(then.bind(val));p.then((function(val){res(i,val)}),reject);return}}}args[i]=val;if(--remaining===0){resolve(args)}}for(var i=0;i<args.length;i++){res(i,args[i])}}))};Promise.reject=function(value){return new Promise((function(resolve,reject){reject(value)}))};Promise.race=function(values){return new Promise((function(resolve,reject){values.forEach((function(value){Promise.resolve(value).then(resolve,reject)}))}))};Promise.prototype["catch"]=function(onRejected){return this.then(null,onRejected)}},{"./core.js":1}],3:[function(require,module,exports){"use strict";var rawAsap=require("./raw");var freeTasks=[];var pendingErrors=[];var requestErrorThrow=rawAsap.makeRequestCallFromTimer(throwFirstError);function throwFirstError(){if(pendingErrors.length){throw pendingErrors.shift()}}module.exports=asap;function asap(task){var rawTask;if(freeTasks.length){rawTask=freeTasks.pop()}else{rawTask=new RawTask}rawTask.task=task;rawAsap(rawTask)}function RawTask(){this.task=null}RawTask.prototype.call=function(){try{this.task.call()}catch(error){if(asap.onerror){asap.onerror(error)}else{pendingErrors.push(error);requestErrorThrow()}}finally{this.task=null;freeTasks[freeTasks.length]=this}}},{"./raw":4}],4:[function(require,module,exports){(function(global){"use strict";module.exports=rawAsap;function rawAsap(task){if(!queue.length){requestFlush();flushing=true}queue[queue.length]=task}var queue=[];var flushing=false;var requestFlush;var index=0;var capacity=1024;function flush(){while(index<queue.length){var currentIndex=index;index=index+1;queue[currentIndex].call();if(index>capacity){for(var scan=0,newLength=queue.length-index;scan<newLength;scan++){queue[scan]=queue[scan+index]}queue.length-=index;index=0}}queue.length=0;index=0;flushing=false}var BrowserMutationObserver=global.MutationObserver||global.WebKitMutationObserver;if(typeof BrowserMutationObserver==="function"){requestFlush=makeRequestCallFromMutationObserver(flush)}else{requestFlush=makeRequestCallFromTimer(flush)}rawAsap.requestFlush=requestFlush;function makeRequestCallFromMutationObserver(callback){var toggle=1;var observer=new BrowserMutationObserver(callback);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function requestCall(){toggle=-toggle;node.data=toggle}}function makeRequestCallFromTimer(callback){return function requestCall(){var timeoutHandle,intervalHandle;if(typeof setTimeout!="undefined"){timeoutHandle=setTimeout(handleTimer,0)}if(typeof setInterval!="undefined"){intervalHandle=setInterval(handleTimer,50)}function handleTimer(){if(timeoutHandle){clearTimeout(timeoutHandle)}if(intervalHandle){clearInterval(intervalHandle)}callback()}}}rawAsap.makeRequestCallFromTimer=makeRequestCallFromTimer}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],5:[function(require,module,exports){if(typeof Promise.prototype.done!=="function"){Promise.prototype.done=function(onFulfilled,onRejected){var self=arguments.length?this.then.apply(this,arguments):this;self.then(null,(function(err){setTimeout((function(){throw err}),0)}))}}},{}],6:[function(require,module,exports){var asap=require("asap");if(typeof Promise==="undefined"){Promise=require("./lib/core.js");require("./lib/es6-extensions.js")}require("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);
if (!Element.prototype.scrollIntoViewIfNeeded) {
  Element.prototype.scrollIntoViewIfNeeded = function(centerIfNeeded) {
    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

    var parent = this.parentNode,
      parentComputedStyle = window.getComputedStyle(parent, null),
      parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
      parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
      overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
      overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
      overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
      overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
      alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
    }

    if ((overLeft || overRight) && centerIfNeeded) {
      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
    }

    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
      this.scrollIntoView(alignWithTop);
    }
  };
}
/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  window.br.isNumber = function(value) {
    return (!isNaN(parseFloat(value)) &&
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
      (br.isString(value) && (value.trim().length === 0)) ||
      ((typeof value.length != 'undefined') && (value.length === 0)) // Array, String
    );
  };

  window.br.isArray = function(value) {
    return (!br.isNull(value) &&
      (Object.prototype.toString.call(value) === '[object Array]')
    );
  };

  window.br.isObject = function(value) {
    return (!br.isEmpty(value) && (typeof value === 'object'));
  };

  window.br.isEmptyObject = function(value) {
    if (br.isObject(value)) {
      return (Object.keys(value).length === 0);
    } else {
      return false;
    }
  };

  window.br.isBoolean = function(value) {
    return (typeof value === 'boolean');
  };

  window.br.isString = function(value) {
    return (typeof value === 'string');
  };

  window.br.isFunction = function(value) {
    return (typeof value === 'function');
  };

  window.br.toString = function(value) {
    if (br.isNull(value)) {
      return '';
    } else {
      return value.toString();
    }
  };

  window.br.split = function(value, delimiter) {
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
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  const _helper = {
    pack: function(data) {
      return JSON.stringify(data);
    },
    unpack: function(data) {
      try {
        return JSON.parse(data);
      } catch (ex) {
        return null;
      }
    }
  };

  function BrStorage(storage) {
    const _this = this;

    let _storage = storage;

    _this.get = function(key, defaultValue) {
      let result;
      if (br.isArray(key)) {
        result = {};
        for (let i in key) {
          result[key[i]] = _this.get(key[i]);
        }
      } else {
        result = _helper.unpack(_storage.getItem(key));
      }
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    };

    _this.set = function(key, value) {
      if (br.isObject(key)) {
        for (let name in key) {
          _this.set(name, key[name]);
        }
      } else {
        _storage.setItem(key, _helper.pack(value));
      }
      return _this;
    };

    _this.inc = function(key, increment, glue) {
      let value = _this.get(key);
      if (br.isNumber(value)) {
        increment = (br.isNumber(increment) ? increment : 1);
        _this.set(key, value + increment);
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
          _this.set(key, value);
        }
      } else {
        increment = (br.isNumber(increment) ? increment : 1);
        _this.set(key, increment);
      }
      return _this;
    };

    _this.dec = function(key, increment) {
      let value = _this.get(key);
      increment = (br.isNumber(increment) ? increment : 1);
      _this.set(key, br.isNumber(value) ? (value - increment) : increment);
      return _this;
    };

    _this.append = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        let value = _this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for (let i in newValue) {
            _this.append(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while (value.length >= limit) {
              value.shift();
            }
          }
          value.push(newValue);
          _this.set(key, value);
        }
      }
      return _this;
    };

    _this.appendUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        _this.remove(key, newValue);
        _this.append(key, newValue, limit);
      }
      return _this;
    };

    _this.prepend = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        let value = _this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for (let i in newValue) {
            _this.prepend(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while (value.length >= limit) {
              value.pop();
            }
          }
          value.unshift(newValue);
          _this.set(key, value);
        }
      }
      return _this;
    };

    _this.prependUnique = function(key, newValue, limit) {
      if (!br.isEmpty(newValue)) {
        _this.remove(key, newValue);
        _this.prepend(key, newValue, limit);
      }
      return _this;
    };

    _this.each = function(key, fn) {
      let value = _this.get(key);
      if (!br.isArray(value)) {
        value = [];
      }
      for (let i = 0, length = value.length; i < length; i++) {
        fn.call(_this, value[i]);
      }
      return _this;
    };

    function _getLast(key, defaultValue, remove) {
      let result = null;
      let value = _this.get(key, defaultValue);
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

    _this.getLast = function(key, defaultValue) {
      return _getLast(key, defaultValue, false);
    };

    _this.takeLast = function(key, defaultValue) {
      return _getLast(key, defaultValue, true);
    };

    function _getFirst(key, defaultValue, remove) {
      let result = null;
      let value = _this.get(key, defaultValue);
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

    _this.getFirst = function(key, defaultValue) {
      return _getFirst(key, defaultValue, false);
    };

    _this.takeFirst = function(key, defaultValue) {
      return _getFirst(key, defaultValue, true);
    };

    _this.extend = function(key, newValue) {
      if (!br.isEmpty(newValue)) {
        let value = _this.get(key);
        if (!br.isObject(value)) {
          value = {};
        }
        if (br.isObject(newValue)) {
          for (let i in newValue) {
            value[i] = newValue[i];
          }
          _this.set(key, value);
        }
      }
      return _this;
    };

    _this.not = function(key) {
      let value = _this.get(key);
      if (!br.isBoolean(value)) {
        value = false;
      }
      _this.set(key, !value);
      return _this;
    };

    _this.clear = function() {
      _storage.clear();
      return _this;
    };

    _this.all = function() {
      let result = {};
      for (let name in _storage) {
        result[name] = _this.get(name);
      }
      return result;
    };

    _this.remove = function(key, arrayValue) {
      let value = _this.get(key);
      if (!br.isEmpty(arrayValue) && br.isArray(value)) {
        let idx = value.indexOf(arrayValue);
        if (idx != -1) {
          value.splice(idx, 1);
        }
        _this.set(key, value);
      } else {
        _storage.removeItem(key);
      }
      return _this;
    };

    _this.indexOf = function(key, arrayValue) {
      let value = _this.get(key);
      if (br.isArray(value)) {
        return value.indexOf(arrayValue);
      }
      return -1;
    };

    _this.has = function(key, arrayValue) {
      return (_this.indexOf(key, arrayValue) != -1);
    };
  }

  window.br.storage = new BrStorage(window.localStorage);
  window.br.session = new BrStorage(window.sessionStorage);
})(window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrEventQueue(obj) {
    const _this = this;

    _this.subscribers = {};
    _this.connections = [];
    _this.obj = obj || _this;
    _this.enabled = true;

    _this.enable = function() {
      _this.enabled = true;
    };

    _this.disable = function() {
      _this.enabled = false;
    };

    function subscribe(events, action, func) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        if (!_this.subscribers[event]) {
          _this.subscribers[event] = Object.create({
            on: [],
            pause: [],
            before: [],
            after: []
          });
        }
        _this.subscribers[event][action].push(func);
      }
    }

    _this.before = function(events, func) {
      subscribe(events, 'before', func);
    };

    _this.on = function(events, func) {
      subscribe(events, 'on', func);
    };

    _this.pause = function(events, func) {
      subscribe(events, 'pause', func);
    };

    _this.after = function(events, func) {
      subscribe(events, 'after', func);
    };

    _this.off = function(events) {
      let eventsArray = events.split(',');
      for (let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        delete _this.subscribers[event];
      }
    };

    _this.has = function(event, action) {
      return _this.subscribers[event] && (!action || (_this.subscribers[event][action].length > 0));
    };

    _this.connectTo = function(eventQueue) {
      _this.connections.push(eventQueue);
    };

    _this.getEvents = function() {
      let result = [];
      for (let name in _this.subscribers) {
        result.push(name);
      }
      return result;
    };

    function triggerOne(event, action, args) {
      let result = null;
      let subscribers = _this.subscribers[event];
      if (subscribers) {
        let funcs = subscribers[action];
        if (funcs) {
          for (let i = 0, length = funcs.length; i < length; i++) {
            result = funcs[i].apply(_this.obj, args);
          }
        }
      }
      return result;
    }

    function trigger(event, action, params) {
      if (_this.enabled) {
        if (event != '*') {
          _this.triggerEx('*', action, params);
        }
        let result = triggerOne(event, action, params);
        for (let i = 0, length = _this.connections.length; i < length; i++) {
          _this.connections[i].triggerEx(event, action, params);
        }
        return result;
      }
    }

    _this.triggerBefore = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'before', params);
    };

    _this.trigger = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'on', params);
    };

    _this.triggerPause = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'pause', params);
    };

    _this.triggerAfter = function(event) {
      let params = Array.from(arguments);
      params.splice(0, 1);
      return trigger(event, 'after', params);
    };

    _this.triggerCustom = function(event, action) {
      let params = Array.from(arguments);
      params.splice(0, 2);
      return trigger(event, action, params);
    };

    _this.triggerEx = function(event, action, params) {
      return trigger(event, action, params);
    };

    return _this;
  }

  window.br.eventQueue = function(obj) {
    return new BrEventQueue(obj);
  };
})(window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

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
        if (Object.prototype.hasOwnProperty.call(vals, name)) {
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
        for (let name in paramName) {
          values[name] = paramName[name];
        }
      } else {
        values[paramName] = paramValue;
      }
      let hash = '#';
      for (let name in values) {
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
/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrThread(lazy) {
    const _this = this;

    _this.queue = [];
    _this.workingQueue = [];
    _this.lazy = lazy;

    _this.push = function(func) {
      _this.queue.unshift({
        func: func
      });
      if (!_this.lazy) {
        _this.wakeup();
      }
    };

    _this.done = function() {
      _this.workingQueue.pop();
      _this.wakeup();
    };

    this.clear = function() {
      _this.queue = [];
      _this.workingQueue = [];
    };

    this.wakeup = function() {
      if ((_this.queue.length > 0) && (_this.workingQueue.length === 0)) {
        let obj = _this.queue.pop();
        _this.workingQueue.push(obj);
        obj.func(function() {
          _this.done();
        });
      }
    };
  }

  window.br.thread = function(lazy) {
    return new BrThread(lazy);
  };
})(window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrProfiler() {
    function stopwatch() {
      this.start_time = 0;
      this.stop_time = 0;
      this.run_time = 0;
      this.running = false;

      this.start = function() {
        this.start_time = new Date().getTime();
        this.running = true;
      };

      this.stop = function() {
        this.stop_time = new Date().getTime();
        this.run_time = (this.stop_time - this.start_time);
        this.running = false;
      };

      this.get_runtime = function() {
        return this.run_time;
      };

      this.reset = function() {
        this.run_time = 0;
      };

      return this;
    }

    function buffer(size) {
      this.arr = new Int32Array(size);
      this.begin = 0;
      this.end = -1;
      this.num_el = 0;
      this.arr_size = size;

      this.push_back = function(elem) {
        if (this.num_el < this.arr_size) {
          this.end++;
          this.arr[this.end] = elem;
          this.num_el++;
        } else {
          this.end = (this.end + 1) % this.arr_size;
          this.begin = (this.begin + 1) % this.arr_size;
          this.arr[this.end] = elem;
        }
      };

      this.get = function(i) {
        return this.arr[(this.begin + i) % this.arr_size];
      };

      this.size = function() {
        return this.num_el;
      };

      return this;
    }

    let count_frames = 0;
    let ringbuff = new buffer(20);

    this.fps = 0.0;
    this.timers = [];
    this.frame_timer = new stopwatch();

    this.add = function(subj) {
      this.timers.push([subj, new stopwatch()]);
    };

    this.new_frame = function() {
      ++count_frames;
      let n = this.timers.length | 0;
      for (let i = 0; i < n; ++i) {
        let sw = this.timers[i][1];
        sw.reset();
      }

      if (count_frames >= 1) {
        this.frame_timer.stop();
        ringbuff.push_back(this.frame_timer.get_runtime());
        let size = ringbuff.size();
        let sum = 0;
        for (let i = 0; i < size; ++i) {
          sum += ringbuff.get(i);
        }
        this.fps = size / sum * 1000;
        this.frame_timer.start();
      }
    };

    this.find_task = function(subj) {
      let n = this.timers.length | 0;
      for (let i = 0; i < n; ++i) {
        let pair = this.timers[i];
        if (pair[0] === subj) {
          return pair;
        }
      }
      this.add(subj);
      return this.find_task(subj);
    };

    this.start = function(subj) {
      let task = this.find_task(subj);
      task[1].start();
    };

    this.stop = function(subj, printToConsole) {
      let task = this.find_task(subj);
      task[1].stop();
      if (printToConsole) {
        br.log(task[0] + ": " + task[1].get_runtime() + "ms");
      }
    };

    this.log = function(printToConsole) {
      let n = this.timers.length | 0;
      let str = "<strong>FPS: " + this.fps.toFixed(2) + "</strong>";
      let str2 = "FPS: " + this.fps.toFixed(2);
      for (let i = 0; i < n; ++i) {
        let pair = this.timers[i];
        str += "<br/>" + pair[0] + ": " + pair[1].get_runtime() + "ms";
        str2 += ", " + pair[0] + ": " + pair[1].get_runtime() + "ms";
      }
      if (printToConsole) {
        br.log(str2);
      }
      return str;
    };

    return this;
  }

  let profiler;

  window.br.profiler = function(create) {
    if (create) {
      return new BrProfiler();
    } else
    if (!profiler) {
      profiler = new BrProfiler();
    }
    return profiler;
  };
})(window);
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

  function BrWebCamera() {
    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    const elem = document.createElement('canvas');
    const canvasSupported = !!(elem.getContext && elem.getContext('2d'));
    elem.remove();

    _this.isSupported = function() {
      return canvasSupported;
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

          br.getUserMedia({
            video: true
          }, function(stream) {
            webCam.srcObject = stream;
            webCam.onloadedmetadata = function() {
              _this.events.trigger('connected', {
                width: webCam.videoWidth,
                height: webCam.videoHeight
              });
              webCam.play();
              br.requestAnimationFrame(requestFrame);
            };
          }, function (error) {
            _this.events.trigger('error', error);
          });
        } catch (error) {
          _this.events.trigger('error', error);
        }
      } else {
        _this.events.trigger('error', 'Web Camera or Canvas is not supported in your browser');
      }
    };

    _this.disconnect = function(webCam) {
      if (webCam.srcObject) {
        try {
          const tracks = webCam.srcObject.getTracks();
          if (tracks.length > 0) {
            tracks[0].stop();
          }
        } catch (error) {
          //
        }
      }
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
    return /iPad|iPhone|iPod/.test(navigator.platform) || /Android/i.test(navigator.userAgent);
  };

  window.br.isMobileDevice = function() {
    return /iPad|iPhone|iPod/.test(navigator.platform) || /Android/i.test(navigator.userAgent);
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
    } else
    if (br.request.get('caller')) {
      document.location = br.request.get('caller');
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

  if (window.addEventListener) {
    window.addEventListener('error', function(event) {
      if (event.origin != document.location.origin) {
        return;
      }

      let data = {
        message: event.message,
        data: null,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? (event.error.stack || event.error.backtrace || event.error.stacktrace) : null,
        location: document.location.toString()
      };

      if (data.message && (data.message != 'Script error.')) {
        try {
          let result = window.br.events.trigger('error', data);
          if (result) {
            event.preventDefault();
          }
        } catch (error) {
          //
        }
      }
    });

    window.addEventListener('unhandledrejection', function(event) {
      if (event.origin != document.location.origin) {
        return;
      }

      let data = {
        message: typeof event.reason == 'string' ? event.reason : null,
        data: typeof event.reason == 'string' ? null : event.reason,
        filename: null,
        lineno: null,
        colno: null,
        stack: null,
        location: document.location.toString()
      };

      if (data.message && (data.message != 'Script error.')) {
        try {
          window.br.events.trigger('error', data);
        } catch (error) {
          // we don't care
        }
      }

      window.br.logWarning(`Unhandled Promise Rejection: ${data.message}`);
      if (data.data) {
        window.br.logWarning(data.data);
      }

      event.preventDefault();
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
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrFlagsHolder(permanent, name) {
    let flags = [];

    this.append = function(id) {
      if (permanent) {
        br.storage.appendUnique(name, id);
      } else
      if (!this.isFlagged(id)) {
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
        let idx = flags.indexOf(id);
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

  window.br.flagsHolder = function(permanent, name) {
    return new BrFlagsHolder(permanent, name);
  };
})(window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataSource(restServiceUrl, settings) {
    const _this = this;

    _this.options = Object.assign({}, settings);

    _this.setApiUrl = function(url) {
      _this.options.restServiceUrl = url;
      _this.options.restServiceUrlNormalized = url;
      _this.options.refreshDelay = _this.options.refreshDelay || 1500;

      if (!url.match(/[.]json$/) && !url.match(/\/$/)) {
        _this.options.restServiceUrlNormalized = `${url}/`;
      }
    };

    _this.setApiUrl(restServiceUrl);
    _this.options.refreshDelay = _this.options.refreshDelay || 1500;

    _this.ajaxRequest = null;
    _this.name = '-';
    _this.clientUID = null;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    let selectOperationCounter = 0;
    let refreshTimeout;
    let requestHeaders = {};

    if (br.request.csrfToken) {
      requestHeaders['X-Csrf-Token'] = br.request.csrfToken;
    }

    _this.getClientUID = function() {
      if (!_this.clientUID) {
        _this.clientUID = br.randomInt();
      }

      return _this.clientUID;
    };

    _this.setClientUID = function(clientUID) {
      _this.clientUID = clientUID;
    };

    _this.doingSelect = function() {
      return selectOperationCounter > 0;
    };

    _this.requestInProgress = function() {
      return (_this.ajaxRequest !== null);
    };

    _this.abortRequest = function() {
      if (_this.ajaxRequest !== null) {
        _this.ajaxRequest.abort();
      }

      return this;
    };

    const handleError = function(request, options, jqXHR, reject) {
      if (!br.isUnloading()) {
        let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
        reject({
          request: request,
          options: options,
          errorMessage: errorMessage
        });
      }
    };

    _this.insert = function(item, callback, options) {
      options = options || {};

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {
        let request = item;

        try {
          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options);
            _this.events.triggerBefore('insert', request, options);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'put';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          $.ajax({
            type: _this.options.crossdomain ? 'GET' : 'PUT',
            data: request,
            dataType: _this.options.crossdomain ? 'jsonp' : 'json',
            url: _this.options.restServiceUrl + (_this.options.authToken ? '?token=' + _this.options.authToken : ''),
            headers: requestHeaders,
            success: function(response) {
              let result, errorMessage;
              if (response) {
                result = true;
              } else {
                result = false;
                errorMessage = 'Empty response. Was expecting new created records with ROWID.';
              }
              if (result) {
                resolve({
                  request: request,
                  options: options,
                  response: response
                });
              } else {
                reject({
                  request: request,
                  options: options,
                  errorMessage: errorMessage
                });
              }
            },
            error: function(jqXHR) {
              handleError(request, options, jqXHR, reject);
            }
          });

        } catch (errorMessage) {
          reject({
            request: request,
            options: options,
            errorMessage: errorMessage
          });
        }
      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('insert', data.response, data.request, data.options);
            _this.events.triggerAfter('insert', true, data.response, data.request, data.options);
            _this.events.trigger('change', 'insert', data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'insert', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('insert', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });
    };

    _this.update = function(rowid, item, callback, options) {
      options = options || {};

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {
        let request = item;

        try {
          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options);
            _this.events.triggerBefore('update', request, options, rowid);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'post';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          $.ajax({
            type: _this.options.crossdomain ? 'GET' : 'POST',
            data: request,
            dataType: _this.options.crossdomain ? 'jsonp' : 'json',
            url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : ''),
            headers: requestHeaders,
            success: function(response) {
              let operation = 'update';
              if (response) {
                let res = _this.events.trigger('removeAfterUpdate', item, response);
                if ((res !== null) && res) {
                  operation = 'remove';
                }
              }
              resolve({
                operation: operation,
                request: request,
                options: options,
                response: response
              });
            },
            error: function(jqXHR) {
              handleError(request, options, jqXHR, reject);
            }
          });
        } catch (errorMessage) {
          reject({
            request: request,
            options: options,
            errorMessage: errorMessage
          });
        }
      }).then(function(data) {
        try {
          try {
            if (!disableEvents) {
              _this.events.trigger(data.operation, data.response, data.request, data.options);
              _this.events.triggerAfter(data.operation, true, data.response, data.request, data.options);
              _this.events.trigger('change', data.operation, data.response, data.request, data.options);
            }
            if (typeof callback == 'function') {
              callback.call(_this, true, data.response, data.request, data.options);
            }
          } catch (error) {
            if (typeof callback == 'function') {
              callback.call(_this, false, error, data.request, data.options);
            }
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'update', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('update', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.remove = function(rowid, callback, options) {
      options = options || {};

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {
        let request = {};

        try {
          if (!disableEvents) {
            _this.events.triggerBefore('request', request, options, rowid);
            _this.events.triggerBefore('remove', request, options, rowid);
            disableEvents = options && options.disableEvents;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'delete';
          }

          if (options && options.dataSets) {
            request.__dataSets = options.dataSets;
          }

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          $.ajax({
            type: _this.options.crossdomain ? 'GET' : 'DELETE',
            data: request,
            dataType: _this.options.crossdomain ? 'jsonp' : 'json',
            url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : ''),
            headers: requestHeaders,
            success: function(response) {
              resolve({
                rowid: rowid,
                request: request,
                options: options,
                response: response
              });
            },
            error: function(jqXHR) {
              if (!br.isUnloading()) {
                let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                reject({
                  rowid: rowid,
                  request: request,
                  options: options,
                  errorMessage: errorMessage
                });
              }
            }
          });
        } catch (errorMessage) {
          reject({
            rowid: rowid,
            request: request,
            options: options,
            errorMessage: errorMessage
          });
        }
      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('remove', data.rowid, data.response, data.request, data.options);
            _this.events.triggerAfter('remove', true, data.response, data.request, data.options);
            _this.events.trigger('change', 'remove', data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'remove', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('remove', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });

    };

    _this.selectCount = function(filter, callback, options) {
      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = {};
      }

      let newFilter = {};
      for (let name in filter) {
        newFilter[name] = filter[name];
      }
      newFilter.__result = 'count';

      let requestOptions = Object.assign({
        selectCount: true
      }, options);

      return _this.select(newFilter, callback, requestOptions);
    };

    _this.selectOne = function(filter, callback, options) {
      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = {};
      }

      let requestOptions = Object.assign({
        selectOne: true,
        limit: 1
      }, options);

      if (!br.isEmpty(filter)) {
        if (br.isNumber(filter)) {
          return _this.select({
            rowid: filter
          }, callback, requestOptions);
        } else {
          return _this.select(filter, callback, requestOptions);
        }
      } else {
        return _this.select(filter, callback, requestOptions);
      }
    };

    _this.selectDeferred = _this.deferredSelect = function(filter, callback, msec) {
      return new Promise(function(resolve, reject) {
        msec = msec || _this.options.refreshDelay;
        let savedFilter = {};
        for (let i in filter) {
          savedFilter[i] = filter[i];
        }
        window.clearTimeout(refreshTimeout);
        refreshTimeout = window.setTimeout(function() {
          _this.select(savedFilter).then(resolve, reject);
        }, msec);
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });
    };

    _this.load = _this.select = function(filter, callback, options) {
      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = {};
      } else
      if ((callback != undefined) && (callback != null) && (typeof callback != 'function')) {
        options = callback;
        callback = null;
      }

      options = options || {};

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = {};
        let requestRowid;

        let selectOne = options && options.selectOne;
        let selectCount = options && options.selectCount;
        let singleRespone = selectOne || selectCount;

        if (selectOne) {
          options.limit = 1;
        }

        if (!br.isEmpty(filter)) {
          if (!br.isNumber(filter) && !br.isObject(filter)) {
            reject({
              request: request,
              options: options,
              errorMessage: 'Unacceptable filter parameters'
            });
            return _this;
          } else {
            if (br.isNumber(filter)) {
              filter = {
                rowid: filter
              };
            }
            for (let name in filter) {
              if ((name == 'rowid') && selectOne) {
                requestRowid = filter[name];
              } else {
                request[name] = filter[name];
              }
            }
          }
        }

        let url;

        if (selectOne && requestRowid) {
          url = _this.options.restServiceUrlNormalized + requestRowid;
        } else {
          url = _this.options.restServiceUrl;
        }

        let proceed = true;

        if (!disableEvents) {
          try {
            _this.events.triggerBefore('request', request, options);
          } catch (e) {
            br.log(e);
            proceed = false;
          }
          try {
            _this.events.triggerBefore('select', request, options);
          } catch (e) {
            br.log(e);
            proceed = false;
          }
          disableEvents = options && options.disableEvents;
        }

        function handleResponse(response) {
          if (br.isArray(response)) {
            for (let i = 0, length = response.length; i < length; i++) {
              _this.events.trigger('calcFields', response[i]);
            }
          }
          if (singleRespone && br.isArray(response)) {
            if (response.length > 0) {
              response = response[0];
            } else {
              reject({
                request: request,
                options: options,
                errorMessage: 'Record not found'
              });
              return;
            }
          } else
          if (!singleRespone && !br.isArray(response)) {
            response = [response];
          }
          if (selectCount) {
            response = parseInt(response);
          }
          resolve({
            request: request,
            options: options,
            response: response
          });
        }

        if (proceed) {
          if (!br.isEmpty(_this.options.limit)) {
            request.__limit = _this.options.limit;
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

          if (_this.clientUID) {
            request.__clientUID = _this.clientUID;
          }

          if (options && options.clientUID) {
            request.__clientUID = options.clientUID;
          }

          if (options && options.excludeFields) {
            request.__excludeFields = options.excludeFields;
          }

          if (options && options.renderMode) {
            request.__renderMode = options.renderMode;
          }

          if (options && options.noCalcFields) {
            request.__noCalcFields = options.noCalcFields;
          }

          if (options && options.order) {
            request.__order = options.order;
          }

          if (options && options.page) {
            request.__page = options.page;
          }

          if (_this.options.crossdomain) {
            request.crossdomain = 'get';
          }

          selectOperationCounter++;

          for (let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          _this.ajaxRequest = $.ajax({
            type: 'GET',
            data: request,
            dataType: _this.options.crossdomain ? 'jsonp' : 'json',
            url: url + (_this.options.authToken ? '?token=' + _this.options.authToken : ''),
            headers: requestHeaders,
            success: function(response) {
              try {
                _this.ajaxRequest = null;
                handleResponse(response);
              } finally {
                selectOperationCounter--;
              }
            },
            error: function(jqXHR) {
              try {
                _this.ajaxRequest = null;
                if (!br.isUnloading()) {
                  var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                  reject({
                    request: request,
                    options: options,
                    errorMessage: errorMessage
                  });
                }
              } finally {
                selectOperationCounter--;
              }
            }
          });
        } else {
          if (selectCount) {
            handleResponse(0);
          } else {
            handleResponse([]);
          }
        }
      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('select', data.response, data.request, data.options);
            data.response = _this.events.triggerAfter('select', true, data.response, data.request, data.options) || data.response;
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', 'select', data.errorMessage, data.request, data.options);
          _this.events.triggerAfter('select', false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });
    };

    _this.invoke = function(method, params, callback, options) {
      if (typeof params == 'function') {
        options = callback;
        callback = params;
        params = {};
      }

      if (callback && (typeof callback != 'function')) {
        options = callback;
        callback = undefined;
      }

      options = options || {};

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {
        let request = params || {};

        if (!disableEvents) {
          _this.events.triggerBefore('request', request, options);
          _this.events.triggerBefore('invoke', request, options);
          _this.events.triggerBefore(method, request, options);
          disableEvents = options && options.disableEvents;
        }

        if (_this.options.crossdomain) {
          request.crossdomain = 'post';
        }

        if (options && options.dataSets) {
          request.__dataSets = options.dataSets;
        }

        if (_this.clientUID) {
          request.__clientUID = _this.clientUID;
        }

        if (options && options.clientUID) {
          request.__clientUID = options.clientUID;
        }

        $.ajax({
          type: _this.options.crossdomain ? 'GET' : 'POST',
          data: request,
          dataType: _this.options.crossdomain ? 'jsonp' : 'json',
          url: _this.options.restServiceUrlNormalized + method + (_this.options.authToken ? '?token=' + _this.options.authToken : ''),
          headers: requestHeaders,
          success: function(response) {
            resolve({
              method: method,
              request: request,
              options: options,
              response: response
            });
          },
          error: function(jqXHR) {
            if (!br.isUnloading()) {
              let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
              reject({
                method: method,
                request: request,
                options: options,
                errorMessage: errorMessage
              });
            }
          }
        });
      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger(data.method, data.response, data.request, data.options);
            _this.events.triggerAfter(data.method, true, data.response, data.request, data.options);
          }
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (!disableEvents) {
          _this.events.trigger('error', data.method, data.errorMessage, data.request, data.options);
          _this.events.triggerAfter(data.method, false, data.errorMessage, data.request, data.options);
        }
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        } else
        if (!_this.events.has('error')) {
          throw data;
        }
      });
    };
  }

  window.br.dataSource = function(restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };
})(jQuery, window);
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

  function BrTable(selector, options) {
    const _this = this;

    let initialized = false;

    let table = $(selector);
    let thead = $('thead', table);
    let tbody = $('tbody', table);

    let tableCopy;
    let theadColsCopy;
    let tbodyColsCopy;

    let calcDiv;
    let imagesCounter = 0;

    _this.options = options || {};

    if (_this.options.debug) {
      calcDiv = $('<div />');
    } else {
      calcDiv = $('<div style="height:0px;overflow:hidden;"/>');
    }

    table.parent().append(calcDiv);

    if (_this.options.autoHeight) {
      table.css('margin-bottom', '0px');
    }

    if (_this.options.autoWidth) {
      thead.on('scroll', function() {
        tbody[0].scrollLeft = thead[0].scrollLeft;
      });
      tbody.on('scroll', function() {
        thead[0].scrollLeft = tbody[0].scrollLeft;
      });
    }

    function autosize() {
      if (_this.options.autoHeight) {
        let windowHeight = $(window).height();
        let scrollTop = $(window).scrollTop() > 0 ? $(window).scrollTop() + 20 : 0;
        let tableTop = table.offset().top - scrollTop;
        let tbodyHeight = windowHeight - tableTop - thead.height();
        if (_this.options.debug) {
          tbodyHeight -= 200;
        } else {
          tbodyHeight -= 20;
        }
        tbody.height(tbodyHeight);
      }

      if (_this.options.autoWidth) {
        thead.width(table.width());
        tbody.width(table.width());
      }
    }

    function debugValue(container, value) {
      if (_this.options.debug) {
        let c = $(container);
        let v = Math.round(value);
        let e = c.find('span.br-table-debug');
        if (e.length == 0) {
          c.append('<br /><span class="br-table-debug" style="font-size:8px;">' + v + '</span>');
        } else {
          e.text(v);
        }
      }
    }

    function getWidths() {
      let widths = {};

      theadColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = {
          h: w,
          b: 0
        };
      });

      tbodyColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx].b = w;
      });

      return widths;
    }

    const colsCopy = function(el) {
      el.style.boxSizing = 'border-box';
      el.style.minWidth = '';
      el.style.maxWidth = '';
    };

    function createCopy() {
      tableCopy = table.clone();
      let theadCopy = tableCopy[0].getElementsByTagName('thead')[0];
      let tbodyCopy = tableCopy[0].getElementsByTagName('tbody')[0];
      theadColsCopy = $(theadCopy).find('tr:first>th');
      tbodyColsCopy = $(tbodyCopy).find('tr:first>td');

      theadCopy.style.display = '';
      theadCopy.style.overflow = '';
      tbodyCopy.style.display = '';
      tbodyCopy.style.overflow = '';

      theadColsCopy.each(function() {
        colsCopy(this);
      });

      tbodyColsCopy.each(function() {
        colsCopy(this);
      });

      calcDiv.html('');
      calcDiv.append(tableCopy);

      imagesCounter = 0;

      $('img', calcDiv).each(function() {
        imagesCounter++;
        this.onload = function() {
          imagesCounter--;
          _this.update(true);
        };
        this.onerror = function() {
          imagesCounter--;
          _this.update(true);
        };
      });
    }

    function update(skipCalcDivReloading) {
      if (!initialized) {
        thead.css({
          'display': 'block',
          'box-sizing': 'border-box',
          'overflow': 'hidden'
        });
        tbody.css({
          'display': 'block',
          'box-sizing': 'border-box',
          'overflow': 'auto'
        });
        table.css({
          'border-bottom': '0px',
          'border-left': '0px',
          'border-right': '0px'
        });
        initialized = true;
      }

      if (!tableCopy || !skipCalcDivReloading) {
        createCopy();
      }

      window.setTimeout(function() {
        let widths = getWidths();

        let headerCols = table.find('thead tr:first>th');

        headerCols.each(function(idx) {
          let w = widths[idx].h;
          debugValue(this, w);
          this.style.boxSizing = 'border-box';
          this.style.minWidth = w + 'px';
          this.style.maxWidth = w + 'px';
        });

        let bodyCols = table.find('tbody tr:first>td');

        bodyCols.each(function(idx) {
          let w = widths[idx].b;
          debugValue(this, w);
          this.style.boxSizing = 'border-box';
          this.style.minWidth = w + 'px';
          this.style.maxWidth = w + 'px';
        });

        autosize();

        if (imagesCounter == 0) {
          if (!_this.options.debug) {
            calcDiv.html('');
            tableCopy.remove();
            tableCopy = null;
          }
        }
      });
    }

    let updateTimer, autosizeTimer;

    _this.update = function(skipCalcDivReloading) {
      window.clearTimeout(updateTimer);
      updateTimer = window.setTimeout(function() {
        update(skipCalcDivReloading);
      }, 100);
    };

    $(window).on('resize', function() {
      _this.update();
    });

    $(window).on('scroll', function() {
      window.clearTimeout(autosizeTimer);
      autosizeTimer = window.setTimeout(function() {
        autosize();
      }, 100);
    });

    _this.update();

    return this;
  }

  window.br.table = function(selector, options) {
    return new BrTable($(selector), options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataGrid(containerSelector, rowTemplate, dataSource, settings) {
    const _this = this;

    _this.selector = containerSelector;

    _this.options = Object.assign({}, settings);

    _this.options.templates = _this.options.templates || {};

    _this.options.templates.noData = _this.options.templates.noData || '.data-empty-template';

    _this.options.templates.row = $(rowTemplate).html();
    _this.options.templates.groupRow = _this.options.templates.groupRow ? $(_this.options.templates.groupRow).html() : '';
    _this.options.templates.header = _this.options.templates.header ? $(_this.options.templates.header).html() : '';
    _this.options.templates.footer = _this.options.templates.footer ? $(_this.options.templates.footer).html() : '';
    _this.options.templates.noData = _this.options.templates.noData ? $(_this.options.templates.noData).html() : '';

    _this.options.templates.row = _this.options.templates.row || '';
    _this.options.templates.groupRow = _this.options.templates.groupRow || '';
    _this.options.templates.header = _this.options.templates.header || '';
    _this.options.templates.footer = _this.options.templates.footer || '';
    _this.options.templates.noData = _this.options.templates.noData || '';

    _this.templates = {};

    _this.templates.row = _this.options.templates.row.length > 0 ? br.compile(_this.options.templates.row) : function() {
      return '';
    };
    _this.templates.groupRow = _this.options.templates.groupRow.length > 0 ? br.compile(_this.options.templates.groupRow) : function() {
      return '';
    };
    _this.templates.header = _this.options.templates.header.length > 0 ? br.compile(_this.options.templates.header) : function() {
      return '';
    };
    _this.templates.footer = _this.options.templates.footer.length > 0 ? br.compile(_this.options.templates.footer) : function() {
      return '';
    };
    _this.templates.noData = _this.options.templates.noData.length > 0 ? br.compile(_this.options.templates.noData) : function() {
      return '';
    };

    _this.options.selectors = _this.options.selectors || {};

    _this.options.selectors.header = _this.options.selectors.header || _this.options.headersSelector || _this.selector;
    _this.options.selectors.footer = _this.options.selectors.footer || _this.options.footersSelector || _this.selector;
    _this.options.selectors.remove = _this.options.selectors.remove || _this.options.deleteSelector || '.action-delete';

    _this.options.dataSource = dataSource;

    _this.dataSource = _this.options.dataSource;
    _this.storageTag = _this.options.storageTag ? _this.options.storageTag : document.location.pathname + ':' + _this.dataSource.options.restServiceUrl;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    if (_this.options.fixedHeader) {
      _this.table = br.table($(_this.selector).closest('table'), settings);
    }

    let noMoreData = false;
    let disconnected = false;

    _this.loadingMoreData = false;

    _this.after('insert', function(data) {
      _this.events.trigger('change', data, 'insert');
      _this.events.triggerAfter('change', data, 'insert');
    });

    _this.after('update', function(data) {
      _this.events.trigger('change', data, 'update');
      _this.events.triggerAfter('change', data, 'update');
    });

    _this.after('remove', function(data) {
      _this.events.trigger('change', data, 'remove');
      _this.events.triggerAfter('change', data, 'remove');
    });

    _this.after('change', function() {
      if (_this.table) {
        _this.table.update();
      }
    });

    _this.getContainer = function() {
      return $(_this.selector);
    };

    _this.container = _this.getContainer();

    _this.setStored = function(name, value) {
      let stored = br.storage.get(`${_this.storageTag}Stored`);
      stored = stored || {};
      stored[name] = value;
      br.storage.set(`${_this.storageTag}Stored`, stored);
    };

    _this.getStored = function(name, defaultValue) {
      let stored = br.storage.get(`${_this.storageTag}Stored`);
      let result = stored ? stored[name] : stored;
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    };

    _this.resetStored = function(stopPropagation) {
      br.storage.remove(`${_this.storageTag}Stored`);
      if (!stopPropagation) {
        _this.events.trigger('resetStored');
        br.events.trigger('resetStored');
      }
    };

    _this.setFilter = function(name, value) {
      let filter = br.storage.get(`${_this.storageTag}Filter`);
      filter = filter || {};
      filter[name] = value;
      br.storage.set(`${_this.storageTag}Filter`, filter);
    };

    _this.getFilter = function(name, defaultValue) {
      let filter = br.storage.get(`${_this.storageTag}Filter`);
      let result = filter ? filter[name] : filter;
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    };

    _this.resetFilters = function(stopPropagation) {
      br.storage.remove(_this.storageTag + 'Filter');
      if (!stopPropagation) {
        _this.events.trigger('resetFilters');
        br.events.trigger('resetFilters');
      }
    };

    _this.isDisconnected = function() {
      return disconnected;
    };

    _this.disconnectFromDataSource = function() {
      disconnected = true;
    };

    _this.reconnectWithDataSource = function() {
      disconnected = false;
    };

    _this.renderHeader = function(data, asString) {
      data = _this.events.trigger('renderHeader', data) || data;
      let s = _this.templates.header(data);
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        let result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    _this.renderFooter = function(data, asString) {
      data = _this.events.trigger('renderFooter', data) || data;
      let template = _this.templates.footer(data);
      if (asString) {
        return template;
      } else
      if (template.length > 0) {
        let result = $(template);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    _this.renderRow = function(srcDataRow, asString) {
      let dataRow = _this.events.trigger('renderRow', srcDataRow) || srcDataRow;
      let template = _this.templates.row(dataRow).trim();
      if (asString) {
        return {
          rendered: template,
          dataRow: dataRow
        };
      } else
      if (template.length > 0) {
        let result = $(template);
        if (_this.options.storeDataRow) {
          result.data('data-row', dataRow);
        }
        return {
          renderedRow: result,
          dataRow: dataRow
        };
      } else {
        return {
          renderedRow: null,
          dataRow: dataRow
        };
      }
    };

    _this.renderGroupRow = function(data, asString) {
      data = _this.events.trigger('renderGroupRow', data) || data;
      let s = _this.templates.groupRow(data).trim();
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        let result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    _this.prepend = function(row) {
      return $(_this.selector).prepend(row);
    };

    _this.append = function(row) {
      return $(_this.selector).append(row);
    };

    _this.insertDataRowAfter = function(dataRow, selector) {
      let renderedRow = _this.renderRow(dataRow);
      if (renderedRow.renderedRow) {
        $(renderedRow.renderedRow).insertAfter(selector);
      }
      return renderedRow.renderedRow;
    };

    _this.addDataRow = function(dataRow, disableEvents) {
      let renderedRow = _this.renderRow(dataRow);
      if (renderedRow.renderedRow) {
        _this.events.triggerBefore('insert', renderedRow.dataRow, renderedRow.renderedRow);
        _this.events.trigger('insert', renderedRow.dataRow, renderedRow.renderedRow);
        if (_this.options.appendInInsert) {
          _this.append(renderedRow.renderedRow);
          if (_this.options.scrollToInsertedRow) {
            renderedRow.renderedRow[0].scrollIntoView();
          }
        } else {
          _this.prepend(renderedRow.renderedRow);
        }
        _this.checkForEmptyGrid();
        if (!disableEvents) {
          _this.events.triggerAfter('renderRow', renderedRow.dataRow, renderedRow.renderedRow);
          _this.events.triggerAfter('insert', renderedRow.dataRow, renderedRow.renderedRow);
        }
      }
      return renderedRow.renderedRow;
    };

    _this.refreshRow = function(dataRow, options, isUpdate) {
      let filter = `[data-rowid="${dataRow.rowid}"]`;
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }

      let existingRows = $(_this.selector).find(filter);
      if (existingRows.length > 0) {
        let renderedRow = _this.renderRow(dataRow);
        if (renderedRow.renderedRow) {
          if (_this.options.storeDataRow) {
            renderedRow.renderedRow.data('data-row', renderedRow.dataRow);
          }
          _this.events.triggerBefore('update', renderedRow.dataRow, existingRows, renderedRow.renderedRow, isUpdate);
          _this.events.trigger('update', renderedRow.dataRow, existingRows, renderedRow.renderedRow, isUpdate);
          let resultingRows = [];
          if (renderedRow.renderedRow.length > 1) {
            let row = renderedRow.renderedRow.clone();
            $(existingRows[0]).before(row);
            resultingRows.push(row);
          } else {
            existingRows.each(function() {
              let row = renderedRow.renderedRow.clone();
              $(this).before(row);
              resultingRows.push(row);
            });
          }
          let resultingRowsJq = $(resultingRows).map(function() {
            return this.toArray();
          });
          _this.events.triggerAfter('renderRow', renderedRow.dataRow, resultingRowsJq, existingRows);
          _this.events.triggerAfter('update', renderedRow.dataRow, existingRows, resultingRowsJq, isUpdate);
          existingRows.remove();
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    _this.hasRow = function(rowid, options) {
      let filter = `[data-rowid="${rowid}"]`;
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      let existingRows = $(_this.selector).find(filter);
      return (existingRows.length > 0);
    };

    _this.reloadRow = function(rowid, callback, options) {
      if (!br.isEmpty(callback)) {
        if (typeof callback != 'function') {
          options = callback;
          callback = null;
        }
      }
      options = options || {};
      options.disableEvents = true;
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      let filter;
      if (br.isArray(rowid)) {
        filter = {
          rowid: rowid
        };
      } else
      if (br.isObject(rowid)) {
        filter = rowid;
      } else {
        filter = {
          rowid: rowid
        };
      }
      _this.events.triggerBefore('reloadRow', filter, options);
      _this.dataSource.select(filter, function(result, response) {
        if (!result || (response.length === 0)) {
          if (br.isArray(rowid)) {
            rowid.map(function(id) {
              _this.removeRow(id);
            });
          } else {
            _this.removeRow(rowid);
          }
          if (typeof callback == 'function') {
            callback.call(_this, result, null);
          }
        } else {
          response.map(function(row) {
            if (!_this.refreshRow(row, options)) {
              if (_this.isEmpty()) {
                $(_this.selector).html('');
              }
              _this.addDataRow(row);
            }
            if (typeof callback == 'function') {
              callback.call(_this, result, row, true);
            }
          });
        }
      }, options);
    };

    function addNoDataRow() {
      const noDataRow = $(_this.templates.noData());
      noDataRow.addClass('br-no-data');
      $(_this.selector).html('');
      $(_this.selector).append(noDataRow);
    }

    function removeNoDataRow() {
      $(_this.selector).find('.br-no-data').remove();
    }

    _this.checkForEmptyGrid = function() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        addNoDataRow();
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      } else {
        removeNoDataRow();
      }
    };

    _this.removeRow = function(rowid, options) {
      let filter = `[data-rowid="${rowid}"]`;
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      let row = $(_this.selector).find(filter);
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        _this.checkForEmptyGrid();
        _this.events.triggerAfter('remove', rowid, row);
      }
    };

    _this.load = _this.refresh = function(callback) {
      return new Promise(function(resolve, reject) {
        _this.dataSource.select().then(resolve, reject);
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });
    };

    _this.loadMore = function(callback) {
      if (!(noMoreData || _this.loadingMoreData)) {
        _this.loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          if (typeof callback == 'function') {
            callback.call(_this, result, response);
          }
          _this.loadingMoreData = false;
        }, {
          loadingMore: true
        });
      }
    };

    _this.isEmpty = function() {
      return ($(_this.selector).find('[data-rowid]').length === 0);
    };

    _this.getKeys = function(attrName) {
      let result = [];
      if (!attrName) {
        attrName = 'data-rowid';
      }
      $('[' + attrName + ']', $(_this.selector)).each(function() {
        result.push(br.toInt($(this).attr(attrName)));
      });
      return result;
    };

    _this.isOrderConfigured = function() {
      let orderAndGroup = _this.getOrderAndGroup();
      return br.isArray(orderAndGroup) && (orderAndGroup.length > 0);
    };

    function saveOrderAndGroup(orderAndGroup) {
      br.storage.set(_this.storageTag + 'orderAndGroup', orderAndGroup);
      return orderAndGroup;
    }

    function showOrder(orderAndGroup) {
      for (let i = 0, length = orderAndGroup.length; i < length; i++) {
        let ctrl = $('.sortable[data-field="' + orderAndGroup[i].fieldName + '"].' + (orderAndGroup[i].asc ? 'order-asc' : 'order-desc'), $(_this.options.selectors.header));
        ctrl.addClass('icon-white').addClass('icon-border').addClass('fa-border');
        let idx = ctrl.parent().find('div.br-sort-index');
        if (orderAndGroup.length > 1) {
          if (idx.length > 0) {
            idx.text(i + 1);
          } else {
            ctrl.parent().append($('<div class="br-sort-index">' + (i + 1) + '</div>'));
          }
        }
      }
    }

    _this.getOrder = function() {
      let order = _this.getOrderAndGroup();
      let result = {};
      if (br.isArray(order)) {
        for (let i = 0, length = order.length; i < length; i++) {
          if (order[i].asc) {
            result[order[i].fieldName] = 1;
          } else {
            result[order[i].fieldName] = -1;
          }
        }
      }
      return result;
    };

    _this.setOrder = function(order, callback) {
      let orderAndGroup = [];
      for (let name in order) {
        orderAndGroup.push({
          fieldName: name,
          asc: order[name] > 0,
          group: false,
          index: orderAndGroup.length
        });
      }
      _this.setOrderAndGroup(orderAndGroup, callback);
    };

    _this.getOrderAndGroup = function() {
      let result = br.storage.get(_this.storageTag + 'orderAndGroup', []);
      if (br.isEmpty(result) || !br.isArray(result) || (result.length === 0)) {
        if (_this.options.defaultOrderAndGroup) {
          result = _this.options.defaultOrderAndGroup;
        } else {
          result = [];
        }
      }
      return result;
    };

    _this.setOrderAndGroup = function(orderAndGroup, callback) {
      saveOrderAndGroup(orderAndGroup);
      showOrder(orderAndGroup);
      _this.events.triggerBefore('changeOrder', orderAndGroup);
      if (callback) {
        _this.dataSource.select(function(result, response) {
          if (typeof callback == 'function') {
            callback.call(_this, result, response);
          }
        });
      }
      return orderAndGroup;
    };

    _this.init = function() {

      showOrder(_this.getOrderAndGroup());

      $(this.options.selectors.header).on('click', '.sortable', function(event) {
        let sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border') || $(this).hasClass('fa-border'));
        if (!event.metaKey) {
          $('.sortable', $(_this.options.selectors.header)).removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
          $('.br-sort-index', $(_this.options.selectors.header)).remove();
        }
        if (sorted) {
          $(this).removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
        } else {
          $(this).siblings('i').removeClass('icon-white').removeClass('icon-border').removeClass('fa-border');
          $(this).addClass('icon-white').addClass('icon-border').addClass('fa-border');
        }
        let orderAndGroup;
        let fieldName = $(this).attr('data-field');
        let newOrder = {
          fieldName: fieldName,
          asc: $(this).hasClass('order-asc'),
          group: $(this).hasClass('group-by')
        };
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          orderAndGroup = _this.getOrderAndGroup();
          let newOrderAndGroup = [];
          for (let i = 0, length = orderAndGroup.length; i < length; i++) {
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
        _this.setOrderAndGroup(orderAndGroup, true);
      });

      if (_this.dataSource) {

        _this.dataSource.before('select', function(request, options) {
          options.order = _this.getOrder();
        });

        _this.dataSource.after('select', function(result, response) {
          $(_this.selector).removeClass('progress-big');
          if (result) {
            noMoreData = (response.length === 0);
            if (!_this.isDisconnected()) {
              _this.render(response, _this.loadingMoreData);
            }
          }
        });

        _this.dataSource.after('insert', function(result, response) {
          if (result) {
            if (!_this.isDisconnected()) {
              if (_this.isEmpty()) {
                $(_this.selector).html(''); // to remove No-Data box
              }
              _this.addDataRow(response);
            }
          }
        });

        _this.dataSource.on('update', function(data) {
          _this.refreshRow(data, _this.options, true);
        });

        _this.dataSource.on('remove', function(rowid) {
          if (!_this.isDisconnected()) {
            _this.removeRow(rowid, _this.options);
          }
        });

        if (this.options.selectors.remove) {
          $(_this.selector).on('click', _this.options.selectors.remove, function() {
            let row = $(this).closest('[data-rowid]');
            if (row.length > 0) {
              let rowid = $(row).attr('data-rowid');
              if (!br.isEmpty(rowid)) {
                br.confirm('Delete confirmation', 'Are you sure you want to delete this record?', function() {
                  _this.dataSource.remove(rowid);
                });
              }
            }
          });
        }

        if (br.isString(_this.selector)) {
          br.editable(_this.selector + ' .editable', function(content) {
            let $this = $(this);
            let rowid = $this.closest('[data-rowid]').attr('data-rowid');
            let dataField = $this.attr('data-field');
            if (!br.isEmpty(rowid) && !br.isEmpty(dataField)) {
              let data = {};
              data[dataField] = content;
              _this.dataSource.update(rowid, data, function(result) {
                if (result) {
                  _this.events.trigger('editable.update', $this, content);
                }
              });
            }
          });
        }
      }
    };

    this.render = function(data, loadingMoreData) {
      let $selector = $(_this.selector);
      _this.events.triggerBefore('change', data, 'render');
      if (data) {
        if (!loadingMoreData) {
          $selector.html('');
        }
        if (_this.options.freeGrid) {
          data = data[0];
          if (data.headers && (data.headers.length > 0)) {
            for (let i = 0, length = data.headers.length; i < length; i++) {
              if (data.headers[i]) {
                let tableRow = _this.renderHeader(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.header).append(tableRow);
                }
              }
            }
          }
          if (data.footers && (data.footers.length > 0)) {
            for (let i = 0, length = data.footers.length; i < length; i++) {
              if (data.footers[i]) {
                let tableRow = _this.renderFooter(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.footer).append(tableRow);
                }
              }
            }
          }
          $(_this.options.selectors.header).html('');
          $(_this.options.selectors.footer).html('');
          if (data.rows) {
            if (data.rows.length > 0) {
              for (let i = 0, length = data.rows.length; i < length; i++) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    let renderedRow = _this.renderRow(data.rows[i].row);
                    if (renderedRow.renderedRow) {
                      $selector.append(renderedRow.renderedRow);
                    }
                  }
                  if (data.rows[i].header) {
                    let tableRow = _this.renderHeader(data.rows[i].header);
                    if (tableRow) {
                      $(_this.options.selectors.header).append(tableRow);
                    }
                  }
                  if (data.rows[i].footer) {
                    let tableRow = _this.renderFooter(data.rows[i].footer);
                    if (tableRow) {
                      $(_this.options.selectors.footer).append(tableRow);
                    }
                  }
                }
              }
            } else {
              addNoDataRow();
            }
          } else {
            addNoDataRow();
          }
        } else {
          if (data && (data.length > 0)) {
            let group = _this.getOrderAndGroup();
            let groupValues = {};
            let groupFieldName = '';
            for (let i = 0, length = data.length; i < length; i++) {
              if (data[i]) {
                if (br.isArray(group)) {
                  let length = group.length;
                  for (let k = 0; k < length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      for (let j = k; j < length; j++) {
                        groupFieldName = group[j].fieldName;
                        groupValues[groupFieldName] = undefined;
                      }
                      break;
                    }
                  }
                  for (let k = 0; k < length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      groupValues[groupFieldName] = data[i][groupFieldName];
                      let tmp = data[i];
                      tmp.__groupBy = {};
                      tmp.__groupBy.__field = groupFieldName;
                      tmp.__groupBy.__value = data[i][groupFieldName];
                      tmp.__groupBy[groupFieldName] = true;
                      let tableRow = _this.renderGroupRow(tmp);
                      if (tableRow) {
                        $selector.append(tableRow);
                        _this.events.triggerAfter('renderGroupRow', data[i], tableRow);
                      }
                    }
                  }
                }
                let dataRow = data[i];
                let renderedRow = _this.renderRow(dataRow);
                if (renderedRow.renderedRow) {
                  $selector.append(renderedRow.renderedRow);
                  _this.events.triggerAfter('renderRow', renderedRow.dataRow, renderedRow.renderedRow);
                }
              }
            }
          } else
          if (!loadingMoreData) {
            addNoDataRow();
          }
        }
      } else {
        addNoDataRow();
      }
      _this.events.trigger('change', data, 'render');
      _this.events.triggerAfter('change', data, 'render');
      _this.events.triggerAfter('render', data);
    };

    return this.init();
  }

  window.br.dataGrid = function(selector, rowTemplate, dataSource, options) {
    return new BrDataGrid(selector, rowTemplate, dataSource, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataCombo(selector) {
    const _this = this;

    const selectLimit = 50;

    let beautified = false;
    let beautifier = '';
    let currentData = [];
    let requestTimer;

    _this.selector = $(selector);

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    _this.isValid = function() {
      return _this.selector.length > 0;
    };

    _this.isLoaded = function() {
      return _this.loaded;
    };

    _this.hasOptions = function() {
      return (_this.selector.find('option').length > 0);
    };

    _this.optionsAmount = function() {
      return _this.selector.find('option').length;
    };

    _this.getFirstAvailableValue = function() {
      let result = null;
      _this.selector.find('option').each(function() {
        const val = $(this).val();
        if (!br.isEmpty(val)) {
          if (br.isEmpty(result)) {
            result = val;
          }
        }
      });
      return result;
    };

    _this.getContainer = function() {
      return _this.selector;
    };

    function storageTag(ctrl) {
      let result = _this.storageTag;
      result = result + ':filter-value';
      if (!br.isEmpty($(ctrl).attr('id'))) {
        result = result + ':' + $(ctrl).attr('id');
      } else
      if (!br.isEmpty($(ctrl).attr('name'))) {
        result = result + ':' + $(ctrl).attr('name');
      }
      if (!br.isEmpty($(ctrl).attr('data-storage-key'))) {
        result = result + ':' + $(ctrl).attr('data-storage-key');
      }
      return result;
    }

    function getName(data) {
      if (br.isFunction(_this.options.onGetName)) {
        return _this.options.onGetName.call(_this, data);
      } else {
        let item = {
          value: data[_this.options.valueField],
          name: data[_this.options.nameField]
        };
        _this.events.trigger('formatItem', item, data);
        return item.name;
      }
    }

    function beautify() {
      if (_this.isValid() && !_this.options.noDecoration && !_this.selector.attr('size')) {
        if (window.Select2) {
          if (_this.options.lookupMode && beautified) {
            return;
          } else {
            let params = {};
            if (_this.options.hideSearchBox) {
              params.minimumResultsForSearch = -1;
            }
            if (_this.options.skipTranslate) {
              params.dropdownCssClass = 'skiptranslate';
            }
            if (_this.options.allowClear) {
              params.allowClear = _this.options.allowClear;
              params.placeholder = _this.options.emptyName;
            }
            if (_this.options.formatOption) {
              params.formatResult = _this.options.formatOption;
            }
            if (_this.options.formatSelection) {
              params.formatSelection = _this.options.formatSelection;
            }
            params.dropdownAutoWidth = true;
            params.dropdownCss = {
              'max-width': '400px'
            };
            if (_this.options.lookupMode) {
              params.minimumInputLength = _this.options.lookup_minimumInputLength;
              params.allowClear = true;
              params.placeholder = _this.options.emptyName;
              params.query = function(query) {
                window.clearTimeout(requestTimer);
                let request = {};
                request.keyword = query.term;
                requestTimer = window.setTimeout(function() {
                  if (query.term || _this.options.lookup_minimumInputLength === 0) {
                    _this.dataSource.select(request, function(result, response) {
                      if (result) {
                        let data = {
                          results: []
                        };
                        for (let i = 0, length = response.length; i < length; i++) {
                          data.results.push({
                            id: response[i][_this.options.valueField],
                            text: getName(response[i])
                          });
                        }
                        if (response.length == selectLimit) {
                          data.more = true;
                        }
                        query.callback(data);
                      }
                    }, {
                      limit: selectLimit,
                      skip: (query.page - 1) * selectLimit
                    });
                  }
                }, 300);
              };
            }
            _this.selector.select2(params);
            if (_this.val()) {
              _this.selector.addClass('br-input-has-value');
            } else {
              _this.selector.removeClass('br-input-has-value');
            }
            beautified = true;
            beautifier = 'select2';
          }
        } else
        if (window.Selectize && !beautified) {
          _this.selector.selectize({
            openOnFocus: false
          });
          beautified = true;
          beautifier = 'selectize';
        }
      }
    }

    _this.selected = function(fieldName) {
      if (br.isArray(currentData)) {
        if (currentData.length > 0) {
          const val = _this.val();
          if (!br.isEmpty(val)) {
            for (let i = 0, length = currentData.length; i < length; i++) {
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

    _this.val = function(value, callback) {
      if (value !== undefined) {
        if (_this.options.saveSelection) {
          if (_this.options.saveToSessionStorage) {
            br.session.set(storageTag(_this.selector), value);
          } else {
            br.storage.set(storageTag(_this.selector), value);
          }
        }
        if (_this.isValid()) {
          br.setValue(_this.selector, value, true);
          switch (beautifier) {
          case 'select2':
            break;
          case 'selectize':
            _this.selector[0].selectize.setValue(value);
            break;
          }
          beautify();
          if (_this.options.lookupMode) {
            if (value) {
              let data = {
                id: value,
                text: value
              };
              let request = {
                rowid: value
              };
              _this.selector.select2('data', data);
              let options = {
                disableEvents: true,
                dataSets: 'none'
              };
              _this.dataSource.events.triggerBefore('selectByRowid', request, options);
              _this.dataSource.select(request, function(result, response) {
                if (result) {
                  if (response.length > 0) {
                    response = response[0];
                    data = {
                      id: response[_this.options.valueField],
                      text: getName(response)
                    };
                    _this.selector.select2('data', data);
                  }
                }
                if (callback) {
                  callback.call(_this.selector, result, response);
                }
              }, options);
            } else {
              _this.selector.select2('data', null);
              if (callback) {
                callback.call(_this.selector, true, value);
              }
            }
          } else {
            if (callback) {
              callback.call(_this.selector, true, value);
            }
          }
        }
      }
      if (_this.isValid()) {
        const val = _this.selector.val();
        if (val !== null) {
          return val;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };

    _this.valOrNull = function() {
      if (_this.isValid()) {
        const val = _this.val();
        return br.isEmpty(val) ? null : val;
      } else {
        return undefined;
      }
    };

    _this.disableOption = function(value) {
      _this.selector.find('option[value=' + value + ']').attr('disabled', 'disabled');
    };

    _this.disableAllOptions = function() {
      _this.selector.find('option').attr('disabled', 'disabled');
    };

    _this.enableOption = function(value) {
      _this.selector.find('option[value=' + value + ']').removeAttr('disabled');
    };

    _this.enableAllOptions = function() {
      _this.selector.find('option').removeAttr('disabled');
    };

    _this.reset = function(triggerChange) {
      br.storage.remove(storageTag(_this.selector));
      br.session.remove(storageTag(_this.selector));
      if (_this.isValid()) {
        _this.val('');
        if (triggerChange) {
          _this.selector.trigger('change');
        }
      }
    };

    _this.selector.on('reset', function() {
      _this.reset();
    });

    function renderRow(data) {
      let content = '';
      const isDisabled = !br.isEmpty(_this.options.disabledField) && br.toInt(data[_this.options.disabledField]) > 0;
      content += `<option value="${data[_this.options.valueField]}"`;
      if (isDisabled) {
        content += ` disabled="disabled"`;
      }
      content += '>';
      if (!br.isEmpty(_this.options.levelField)) {
        const margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for (let k = 0; k < margin; k++) {
          content += '&nbsp;';
        }
      }
      content += `${getName(data)}</option>`;
      return content;
    }

    function render(data) {
      currentData = data;

      if (!_this.options.lookupMode) {
        if (_this.options.saveSelection) {
          if (_this.options.saveToSessionStorage) {
            _this.options.selectedValue = br.session.get(storageTag(_this.selector));
          } else {
            _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
          }
        }

        _this.selector.each(function() {
          const _selector = $(this);
          let val = _selector.val();
          if (br.isEmpty(val)) {
            val = _selector.attr('data-value');
            _selector.removeAttr('data-value');
          }
          _selector.html('');

          let template = '';
          let cbObj = {};
          cbObj.data = data;
          if (!(_this.options.hideEmptyValue || (_this.options.autoSelectSingle && (data.length == 1)))) {
            cbObj.s = template;
            _this.events.triggerBefore('generateEmptyOption', cbObj, _selector);
            template = cbObj.s;
            if (_this.options.allowClear) {
              template += '<option></option>';
            } else {
              template += `<option value="${_this.options.emptyValue}">${_this.options.emptyName}</option>`;
            }
          }

          cbObj.s = template;
          _this.events.triggerBefore('generateOptions', cbObj, _selector);
          template = cbObj.s;

          for (let i = 0, length = data.length; i < length; i++) {
            template += renderRow(data[i]);
            if (br.isEmpty(_this.options.selectedValue) && !br.isEmpty(_this.options.selectedValueField)) {
              let selectedValue = data[i][_this.options.selectedValueField];
              if ((br.isBoolean(selectedValue) && selectedValue) || (br.toInt(selectedValue) == 1)) {
                _this.options.preSelectedValue = data[i][_this.options.valueField];
              }
            }
          }

          _selector.html(template);

          if (!br.isEmpty(_this.options.preSelectedValue)) {
            _selector.find(`option[value="${_this.options.preSelectedValue}"]`).prop('selected', true).attr('selected', 'selected');
          } else
          if (!br.isEmpty(val)) {
            if (br.isArray(val)) {
              for (let k = 0, length = val.length; k < length; k++) {
                _selector.find(`option[value="${val[k]}"]`).prop('selected', true).attr('selected', 'selected');
              }
            } else {
              _selector.find(`option[value="${val}"]`).prop('selected', true).attr('selected', 'selected');
            }
          }

          if (!br.isEmpty(_this.options.selectedValue)) {
            _selector.find(`option[value="${_this.options.selectedValue}"]`).prop('selected', true);
          }

        });
      }
    }

    _this.load = _this.reload = function(filter, callback) {
      if (typeof filter == 'function') {
        callback = filter;
        filter = {};
      }

      return new Promise(function(resolve, reject) {
        let options = {
          fields: _this.options.fields
        };
        if (_this.dataSource) {
          if (_this.isValid()) {
            if (_this.options.lookupMode) {
              resolve({
                request: {},
                options: options,
                response: []
              });
              beautify();
              _this.loaded = true;
              _this.events.trigger('load', []);
            } else {
              _this.dataSource.select(filter, options).then(function(data) {
                resolve(data);
                beautify();
                _this.loaded = true;
              }).catch(function(data) {
                reject(data);
              });
            }
          } else {
            resolve({
              request: {},
              options: options,
              response: []
            });
            _this.loaded = true;
            _this.events.trigger('load', []);
          }
        }
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });
    };

    let prevValue = _this.val();

    _this.getPrevValue = function() {
      return prevValue;
    };

    _this.setSavedValue = function(value) {
      if (_this.options.saveToSessionStorage) {
        br.session.set(storageTag(_this.selector), value);
      } else {
        br.storage.set(storageTag(_this.selector), value);
      }
    };

    _this.selector.on('change', function() {
      if (_this.options.saveSelection) {
        _this.setSavedValue(_this.val());
      }
      _this.events.trigger('change');
      beautify();
    });

    _this.selector.on('click', function() {
      prevValue = _this.val();
      _this.events.trigger('click');
    });

    _this.selector.on('select2-opening', function() {
      prevValue = _this.val();
      _this.events.trigger('click');
    });

    _this.applyOptions = function(dataSource, options) {
      let thereWasDataSource = (typeof _this.dataSource != 'undefined');

      _this.dataSource = _this.dataSource || dataSource;

      options = options || {};

      _this.options = _this.options || {};

      for (let optionName in options) {
        _this.options[optionName] = options[optionName];
      }

      _this.options.fields = _this.options.fields || {};

      _this.options.valueField = _this.options.valueField || 'rowid';
      _this.options.nameField = _this.options.nameField || 'name';
      _this.options.hideEmptyValue = _this.options.hideEmptyValue || (_this.selector.attr('multiple') == 'multiple');
      _this.options.emptyName = _this.options.emptyName || '--any--';
      _this.options.emptyValue = _this.options.emptyValue || '';
      _this.options.lookup_minimumInputLength = _this.options.lookup_minimumInputLength || 1;

      _this.storageTag = _this.options.storageTag || document.location.pathname;

      _this.options.skipTranslate = _this.options.skipTranslate || false;
      _this.options.allowClear = _this.options.allowClear || false;
      _this.options.lookupMode = _this.options.lookupMode || false;
      _this.options.saveSelection = _this.options.saveSelection || false;
      _this.options.saveToSessionStorage = _this.options.saveToSessionStorage || false;

      if (_this.options.skipTranslate) {
        _this.selector.addClass('skiptranslate');
      }

      _this.loaded = _this.options.lookupMode;

      if (_this.dataSource) {
        _this.storageTag = _this.storageTag + ':' + _this.dataSource.options.restServiceUrl;
      }

      if (!thereWasDataSource && _this.dataSource) {

        _this.dataSource.on('select', function(data) {
          if (_this.isValid()) {
            if (!_this.options.lookupMode) {
              render(data);
            }
            beautify();
          }
          _this.events.trigger('load', data);
        });

        _this.dataSource.after('insert', function(result, data) {
          if (result && _this.isValid()) {
            if (!_this.options.lookupMode) {
              _this.selector.append($(renderRow(data)));
            }
            beautify();
          }
          _this.events.trigger('change');
        });

        _this.dataSource.after('update', function(result, data) {
          if (result && _this.isValid()) {
            if (!_this.options.lookupMode) {
              if (data[_this.options.valueField]) {
                _this.selector.find('option[value=' + data[_this.options.valueField] + ']').text(getName(data));
              }
            }
            beautify();
          }
          _this.events.trigger('change');
        });

        _this.dataSource.after('remove', function(result, data) {
          if (result && _this.isValid()) {
            if (!_this.options.lookupMode) {
              if (data[_this.options.valueField]) {
                _this.selector.find('option[value=' + data[_this.options.valueField] + ']').remove();
              }
            }
            beautify();
          }
          _this.events.trigger('change');
        });

      }

      if (_this.options.saveSelection && (!_this.dataSource || (!thereWasDataSource && _this.options.lookupMode))) {
        if (_this.options.saveToSessionStorage) {
          _this.options.selectedValue = br.session.get(storageTag(_this.selector));
        } else {
          _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
        }
        if (!br.isEmpty(_this.options.selectedValue)) {
          _this.val(_this.options.selectedValue);
        }
      }

      beautify();

      return _this;
    };

    _this.selector.data('BrDataCombo', _this);
  }

  window.br.dataCombo = function(selector, dataSource, options) {
    let instance = $(selector).data('BrDataCombo');
    if (!instance) {
      instance = new BrDataCombo(selector);
    }
    return instance.applyOptions(dataSource, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrEditable(ctrl, options) {
    const _this = this;

    if (br.isFunction(options)) {
      options = {
        onSave: options
      };
    }

    _this.options = options || {};
    _this.ctrl = $(ctrl);
    _this.editor = null;
    _this.savedWidth = '';

    _this.click = function() {
      const isExternalEditor = (_this.ctrl.attr('data-editable-type') == 'textarea');
      let content = ((typeof _this.ctrl.attr('data-editable') != 'undefined') ? _this.ctrl.attr('data-editable') : _this.ctrl.text());
      if (isExternalEditor) {
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        let fields = {
          value: {
            title: _this.ctrl.attr('title'),
            value: content
          }
        };
        br.prompt('Please enter value', fields, function(values) {
          if (_this.options.onSave) {
            _this.options.onSave.call(_this.ctrl, values[0], 'keyup');
          } else {
            _this.apply(values[0]);
          }
        }, {
          valueType: 'text',
          okTitle: 'Save',
        });
      } else
      if (!_this.activated()) {
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        _this.ctrl.text('');
        _this.editor = $('<input type="text" />');
        _this.editor.addClass('form-control');
        _this.editor.addClass('br-editable-control');
        _this.editor.css({
          'width': '100%',
          'height': '100%',
          'min-height': '30px',
          'min-width': '60px',
          'font-size': _this.ctrl.css('font-size'),
          'font-weight': _this.ctrl.css('font-weight'),
          'box-sizing': '100%',
          '-webkit-box-sizing': 'border-box',
          '-moz-box-sizing': 'border-box',
          '-ms-box-sizing': 'border-box',
          'margin-top': '2px',
          'margin-bottom': '2px'
        });
        if (_this.ctrl.attr('data-editable-style')) {
          _this.editor.attr('style', _this.ctrl.attr('data-editable-style'));
        }
        _this.ctrl.append(_this.editor);
        if (_this.options.onGetContent) {
          content = _this.options.onGetContent.call(_this.ctrl, _this.editor, content);
        }
        _this.editor.val(content);
        _this.editor.on('keydown', function(evt0) {
          if (evt0.keyCode == 9) {
            let value = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'keyup');
            } else {
              _this.apply(value);
            }
            evt0.stopPropagation();
            evt0.preventDefault();
          }
        });
        _this.editor.on('keyup', function(evt0) {
          let value = _this.editor.val();
          switch (evt0.keyCode) {
          case 13:
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'keyup');
            } else {
              _this.apply(value);
            }
            evt0.stopPropagation();
            break;
          case 27:
            _this.cancel();
            evt0.stopPropagation();
            break;
          }
        });
        _this.editor.on('blur', function(evt0) {
          let ok = true;
          if (_this.options.onBlur) {
            ok = _this.options.onBlur.call(_this.ctrl, evt0);
          }
          if (ok) {
            let value = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, value, 'blur');
            } else {
              _this.apply(value);
            }
          }
        });
        _this.editor.focus();
      }
    };

    _this.get = function() {
      return _this;
    };

    _this.activated = function() {
      return _this.editor !== null;
    };

    _this.save = function(content) {
      if (_this.editor) {
        if (content === undefined) {
          content = _this.editor.val();
        }
        if (_this.options.onSave) {
          _this.options.onSave.call(_this.ctrl, content, 'blur');
        } else {
          _this.apply(content);
        }
      }
    };

    _this.apply = function(content) {
      if (_this.editor) {
        if (content === undefined) {
          content = _this.editor.val();
        }
        _this.editor.remove();
        _this.editor = null;
        _this.ctrl.html(content);
        if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
          _this.ctrl.attr('data-editable', content);
        }
        _this.ctrl.css('width', '');
      }
    };

    _this.cancel = function() {
      if (_this.editor) {
        _this.editor.remove();
        _this.editor = null;
        _this.ctrl.html(_this.ctrl.data('brEditable-original-html'));
        _this.ctrl.css('width', '');
      }
    };

    return _this;
  }

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      if ($(selector).hasClass('br-editable-control')) {
        selector = $(selector).parent();
      }
      let instance = $(selector).data('brEditable-editable');
      switch (callback) {
      case 'exists':
        return !!instance;
      case 'get':
      case 'apply':
      case 'save':
      case 'cancel':
      case 'click':
        if (!instance) {
          instance = new BrEditable($(selector), callback);
          $(selector).data('brEditable-editable', instance);
        }
        return instance[callback](value);
      }
    } else {
      $(document).on('click', selector, function(event) {
        let $this = $(this);
        let instance = $this.data('brEditable-editable');
        if (!instance) {
          instance = new BrEditable(this, callback);
          $this.data('brEditable-editable', instance);
        }
        if (instance.options.onActivate) {
          instance.options.onActivate.call(instance.ctrl, function() {
            instance.click(event);
          });
          return;
        }
        if (instance.options.onClick) {
          instance.options.onClick.call(instance.ctrl, event);
          return;
        }
        return instance.click(event);
      });
    }
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global Flyovers */
/* global SmartHint */
/* global LinkPreviewer */
/* global Mustache */

(function($, window) {
  window.br = window.br || {};

  window.br.bootstrapVersion = 0;

  const hint = new SmartHint();

  window.br.attachHint = function(selector, settings) {
    hint.attach(selector, settings);
  }

  const linkPreviewer = new LinkPreviewer();

  window.br.attachLinkPreviewer = function(selector, settings) {
    linkPreviewer.attach(selector, settings);
  }

  window.br.showError = function(message) {
    if (!br.isEmpty(message)) {
      alert(message);
    }
  };

  window.br.showMessage = window.br.showError;

  const flyovers = new Flyovers();

  window.br.growlError = function(message, settings) {
    flyovers.showError(br.trn('Error'), message, settings);
  };

  window.br.growlWarning = function(message, settings) {
    flyovers.showWarning(br.trn('Warning'), message, settings);
  };

  window.br.growlMessage = function(message, title, settings) {
    if (title) {
      flyovers.showMessage(message, settings);
    } else {
      flyovers.showMessage(title, message, settings);
    }
  };

  window.br.panic = function(message) {
    $('.container').html(`
      <div class="row">
        <div class="span12">
          <div class="alert alert-error">
            <h4>${br.trn('Error')}!</h4>
            <p>${message}</p>
          </div>
        </div>
      </div>
    `);
    throw new Error('Panic');
  };

  const hiddenBsModal = function(event, modal, remove, oldActiveElement) {
    if ($(event.target).is(modal)) {
      if (remove) {
        modal.remove();
      }
      if (oldActiveElement) {
        oldActiveElement.focus();
      }
    }
  };

  window.br.confirm = function(title, message, buttons, callback, options) {
    if (typeof buttons == 'function') {
      options = callback;
      callback = buttons;
      buttons = null;
    }
    options = options || {};
    options.cancelTitle = options.cancelTitle || br.trn('Cancel');
    options.onConfirm = options.onConfirm || callback;
    options.cssClass = options.cssClass || '';
    options.defaultButton = options.defaultButton || 'confirm';

    let template = `
      <div class="br-modal-confirm modal ${options.cssClass}" data-backdrop="static" role="dialog">
    `;

    let checkBoxes = '';
    if (options.checkBoxes) {
      for (let i in options.checkBoxes) {
        let check = options.checkBoxes[i];
        let checked = '';
        if (check.default) {
          checked = 'checked';
        }
        checkBoxes += `
          <div class="checkbox">
            <label class="checkbox">
              <input type="checkbox" class="confirm-checkbox" name="${check.name}" value="1" ${checked}> ${check.title}
            </label>
          </div>
        `;
      }
    }

    template += `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title pull-left">${title}</h3>
            <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
            <div class="clearfix"></div>
          </div>
          <div class="modal-body" style="overflow-y:auto;">
            ${message}
            ${checkBoxes}
          </div>
          <div class="modal-footer">
    `;
    if (options.showDontAskMeAgain) {
      const dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `
        <label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
          <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
        </label>
      `;
    }
    if (br.isEmpty(buttons)) {
      const yesTitle = options.yesTitle || br.trn('Yes');
      const yesLink = options.yesLink || 'javascript:;';
      const target = (options.yesLink && !options.targetSamePage ? '_blank' : '');
      template += `
        <a href="${yesLink}" target="${target}" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;${yesTitle}&nbsp;</a>
      `;
    } else {
      let idx = 0;
      for (let inputName in buttons) {
        template += `
          <a href="javascript:;" class="btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-default'} action-confirm-close" rel="${inputName}">&nbsp;${buttons[inputName]}&nbsp;</a>
        `;
        idx++;
      }
    }
    template += `
              <a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel" rel="cancel">&nbsp;${options.cancelTitle}&nbsp;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    let remove = true;

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onShow) {
          options.onShow.call(modal);
        }
        $(this).find('.action-confirm-close').on('click', function() {
          const button = $(this).attr('rel');
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          let checks = {};
          $('input.confirm-checkbox').each(function() {
            checks[$(this).attr('name')] = $(this).is(':checked');
          });
          remove = false;
          modal.modal('hide');
          if (options.onConfirm) {
            options.onConfirm.call(this, button, dontAsk, checks);
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
          }
        });
        $(this).find('.action-confirm-cancel').click(function() {
          const button = 'cancel';
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          remove = false;
          modal.modal('hide');
          if (options.onCancel) {
            options.onCancel(button, dontAsk);
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
          }
        });
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.defaultButton) {
          const btn = $(this).find(`.modal-footer a.btn[rel="${options.defaultButton}"]`);
          if (btn.length > 0) {
            btn.addClass('btn-primary');
          }
        }
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove && options.onCancel) {
          const button = 'cancel';
          const dontAsk = $('input[name="showDontAskMeAgain"]', $(modal)).is(':checked');
          options.onCancel(button, dontAsk);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      hiddenBsModal(event, modal, remove, oldActiveElement);
    });

    $(modal).modal('show');

    return modal;
  };

  window.br.error = function(title, message, callback, options) {
    if (callback) {
      if (typeof callback != 'function') {
        options = callback;
        callback = null;
      }
    }

    options = options || {};

    const buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalError').length > 0) {
      const currentMessage = $('#br_modalError .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalError').off('hide.bs.modal');
      $('#br_modalError').modal('hide');
      $('#br_modalError').remove();
    }

    let template = `
      <div class="br-modal-error modal" id="br_modalError" data-backdrop="static" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
    `;
    if (title !== '') {
      template += `
        <div class="modal-header">
          <h3 class="modal-title pull-left">${title}</h3>
          <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
          <div class="clearfix"></div>
        </div>
      `;
    }
    template += `
            <div class="modal-body" style="overflow-y:auto;">${message}</div>
            <div class="modal-footer" style="background-color:red;">
               <a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          callback.call(this, event);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      hiddenBsModal(event, modal, true, oldActiveElement);
    });

    $(modal).modal('show');

    return modal;
  };

  window.br.inform = function(title, message, callback, options) {
    if (callback) {
      if (typeof callback != 'function') {
        options = callback;
        callback = null;
      }
    }

    options = options || {};

    const buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalInform').length > 0) {
      const currentMessage = $('#br_modalInform .modal-body').html();
      if ((currentMessage.indexOf(message) == -1) && !options.replace) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalInform').off('hide.bs.modal');
      $('#br_modalInform').modal('hide');
      $('#br_modalInform').remove();
    }

    let template = `
      <div class="br-modal-inform modal" id="br_modalInform" data-backdrop="static" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
    `;
    if (title !== '') {
      template += `
        <div class="modal-header">
          <h3 class="modal-title pull-left">${title}</h3>
          <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
          <div class="clearfix"></div>
        </div>
      `;
    }
    template += `
      <div class="modal-body" style="overflow-y:auto;">${message}</div>
      <div class="modal-footer">
    `;
    if (options.showDontAskMeAgain) {
      let dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `
        <label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
          <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
        </label>
      `;
    }
    template += `
              <a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          const dontAsk = $('input[name="showDontAskMeAgain"]', $(modal)).is(':checked');
          callback.call(this, dontAsk);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      hiddenBsModal(event, modal, true, oldActiveElement);
    });

    $(modal).modal('show');

    return modal;
  };

  window.br.prompt = function(title, fields, callback, settings) {
    let options = Object.assign({
      okTitle: br.trn('Ok'),
      cancelTitle: br.trn('Cancel'),
    }, settings)

    let inputs = {

    };

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      options.valueRequired = true;
      inputs[fields] = {
        id: '',
        class: '',
        value: '',
        title: fields,
      };
    }

    if (options.onhide) {
      options.onHide = options.onhide;
    }

    let template = `
      <div class="br-modal-prompt modal" data-backdrop="static" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title pull-left">${title}</h3>
              <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
              <div class="clearfix"></div>
            </div>
            <div class="modal-body" style="overflow-y:auto;">
            </div>
            <div class="modal-footer">
              <a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">${options.okTitle}</a>
              <a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel btn-outline-secondary">&nbsp;${options.cancelTitle}&nbsp;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = $(template);

    for (let inputLabel in inputs) {
      if (br.isObject(inputs[inputLabel])) {
        inputs[inputLabel] = Object.assign({
          id: '',
          class: '',
          value: '',
          title: '',
        }, inputs[inputLabel]);
      } else {
        inputs[inputLabel] = {
          id: '',
          class: '',
          value: inputs[inputLabel],
          title: '',
        }
      }
    }

    for (let inputLabel in inputs) {
      let tag = (options.valueType == 'text' ? 'textarea' : 'input');
      let control = $(`
        <div class="row-fluid">
          <div class="span12">
            <label></label>
            <${tag} type="text" id="${inputs[inputLabel].id}" class="value-control form-control" rows="8"></${tag}>
          </div>
        </div>
      `);
      control.find('label').text(inputs[inputLabel].title);
      control.find('.value-control').val(inputs[inputLabel].value);
      if (options.valueType == 'int') {
        control.find('.value-control').addClass('input-small');
      } else {
        control.find('.value-control').addClass('justified');
      }
      if (!br.isEmpty(inputs[inputLabel].class)) {
        control.find('.value-control').addClass(inputs[inputLabel].class);
      }
      modal.find('.modal-body').append(control);
    }

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    let remove = true;

    $(modal).on('keypress', 'input', function(event) {
      if (event.keyCode == 13) {
        $(modal).find('a.action-confirm-close').trigger('click');
      }
    });

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('.action-confirm-close').on('click', function() {
          let results = [];
          let ok = true;
          let notOkField;
          let inputs0 = [];
          $(this).closest('div.modal').find('.value-control').each(function() {
            if ($(this).hasClass('required') && br.isEmpty($(this).val())) {
              ok = false;
              notOkField = $(this);
            }
            results.push($(this).val().trim());
            inputs0.push($(this));
          });
          if (ok) {
            if (options.onValidate) {
              try {
                options.onValidate.call(this, results);
              } catch (e) {
                ok = false;
                br.growlError(e);
                if (inputs0.length == 1) {
                  inputs0[0].focus();
                }
              }
            }
            if (ok) {
              remove = false;
              modal.modal('hide');
              if (callback) {
                callback.call(this, results);
              }
              modal.remove();
              if (oldActiveElement) {
                oldActiveElement.focus();
              }
            }
          } else {
            br.growlError('Please enter value');
            notOkField[0].focus();
          }
        });
        $(this).find('.action-confirm-cancel').click(function() {
          remove = false;
          modal.modal('hide');
          if (options.onCancel) {
            options.onCancel();
          }
          modal.remove();
          if (oldActiveElement) {
            oldActiveElement.focus();
          }
        });
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('.value-control')[0].focus();
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove && options.onCancel) {
          options.onCancel();
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      hiddenBsModal(event, modal, remove, oldActiveElement);
    });

    $(modal).modal('show');

    return modal;
  };

  window.br.compile = function(template) {
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw new Error('Template engine not linked');
        } else {
          return Handlebars.compile(template);
        }
      } else {
        return function(data) {
          return Mustache.render(template, data);
        };
      }
    } else {
      throw new Error('Empty template');
    }
  };

  window.br.fetch = function(template, data) {
    data = data || {};
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw new Error('Template engine not linked');
        } else {
          let t = Handlebars.compile(template);
          return t(data);
        }
      } else {
        return Mustache.render(template, data);
      }
    } else {
      return '';
    }
  };

  let progressCounter = 0;

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
    } catch (ex) {
      return null;
    }
  };

  let progressBar_Total = 0;
  let progressBar_Progress = 0;
  let progressBar_Message = '';

  const progressBarTemplate = `
    <div id="br_progressBar" class="br-modal-progress modal" style="display:none;z-index:10000;top:30px;margin-top:0px;position:fixed;" data-backdrop="static" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">
              <tr>
                <td><div id="br_progressMessage" style="max-width:440px;max-height:40px;overflow:hidden;text-overflow:ellipsis;"></div></td>
                <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>
              </tr>
            </table>
            <div id="br_progressBar_Section" style="display:none;clear:both;">
              <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">
                <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>
              </div>
            </div>
            <div id="br_progressBarAnimation" style="padding-top:10px;text-align:center;">
              <img src="${br.brightUrl}images/progress-h.gif" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  function fileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  let currentProgressType;

  function renderProgress() {
    const p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    if (currentProgressType == 'upload') {
      $('#br_progressStage').text(fileSize(progressBar_Progress) + ' of ' + fileSize(progressBar_Total));
    } else {
      $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
    }
  }

  function initBackDrop() {
    if ($('#br_modalBackDrop').length === 0) {
      $('body').append(`
        <div id="br_modalBackDrop" class="modal-backdrop" style="z-index:9999;"></div>
      `);
    }
  }

  function showBackDrop() {
    initBackDrop();
    $('#br_modalBackDrop').show();
  }

  function hideBackDrop() {
    $('#br_modalBackDrop').hide();
  }

  window.br.startProgress = function(value, message, progressType) {
    currentProgressType = progressType;
    if (!br.isNumber(value)) {
      message = value;
      value = 0;
    }
    progressBar_Total = value;
    progressBar_Progress = 0;
    progressBar_Message = message;
    if ($('#br_progressBar').length === 0) {
      const pbr = $(progressBarTemplate);
      pbr.data('brAutoSizeConfigured', true);
      if (br.bootstrapVersion == 2) {
        pbr.css('top', '30px');
        pbr.css('margin-top', '0px');
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
    br.showProgress();
  };

  window.br.showProgress = function() {
    showBackDrop();
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
    hideBackDrop();
  };

  window.br.incProgress = function(value) {
    value = value || 1;
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
      const $container = $(this).parent('.br-container');
      let $navBar = $('nav.navbar');
      if ($navBar.length === 0) {
        $navBar = $('div.navbar');
      }
      let initialMarginTop = 0;
      if ($navBar.css('position') != 'static') {
        initialMarginTop = $container.offset().top;
      }
      if (deferred) {
        initialMarginTop = 0;
      }

      $('body').css('overflow', 'hidden');

      function resize() {
        let navBarHeight = 0;
        if ($navBar.length !== 0) {
          navBarHeight = $navBar.height();
        }
        if (deferred) {
          navBarHeight = 0;
        }
        const height = $(window).height() - navBarHeight - initialMarginTop;
        if (height > 0) {
          let marginTop = 0;
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
    const mh = $(window).height() - $(modal).find('.modal-header').outerHeight() - $(modal).find('.modal-footer').outerHeight() - 90;

    $(modal).find('.modal-body').css('max-height', mh + 'px');
    $(modal).find('.modal-body').css('overflow-y', 'auto');
    $(modal).trigger('bs.body.resize');
  };

  function attachBootstrapDatePickers(selector) {
    if ($.fn.bootstrapDatepicker) {
      try {
        $(selector).each(function() {
          $(this).bootstrapDatepicker({
            todayBtn: 'linked',
            clearBtn: true,
            multidate: false,
            autoclose: true,
            todayHighlight: true,
            orientation: ($(this).attr('data-dp-orientation') ? $(this).attr('data-dp-orientation') : 'top')
          }).on('show', function(evt) {
            if (!evt.date) {
              if ($(this).val()) {
                $(this).bootstrapDatepicker('update', $(this).val());
              }
            }
          });
        });
      } catch (error) {
        br.logError(`Can not bind bootstrap date picker: ${error}`);
      }
    }
  }

  function attachBootstrapDateTimePickers(selector) {
    if ($.fn.datetimepicker) {
      try {
        $(selector).each(function() {
          $(this).datetimepicker({
            format: 'mm/dd/yyyy HH:ii P',
            autoclose: true,
            todayBtn: true,
            pickerPosition: 'bottom-left',
            minuteStep: 5,
            showMeridian: true,
            useCurrent: false,
            todayHighlight: false
          }).on('show', function() {
            // $(this).datetimepicker('update', $(this).val());
          });
        });
      } catch (error) {
        br.logError(`Can not bind bootstrap date time picker: ${error}`);
      }
    }
  }

  window.br.attachDatePickers = function(container) {
    if (container) {
      attachBootstrapDatePickers($('input.bootstrap-datepicker', container));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker', container));
    } else {
      attachBootstrapDatePickers($('input.bootstrap-datepicker'));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker'));
    }
  };

  window.br.handleClick = function(control, promise) {
    $(control).addClass('disabled').prop('disabled', true);

    promise.then(function() {
      $(control).removeClass('disabled').prop('disabled', false);
    }).catch(function(error) {
      $(control).removeClass('disabled').prop('disabled', false);
      br.growlError(error);
    });
  };

  window.br.sortTable = function(table, order) {
    function getValuesComparison(a, b, columnIndex, direction) {
      const td1 = $($('td', $(a))[columnIndex]);
      const td2 = $($('td', $(b))[columnIndex]);
      const val1 = td1.attr('data-sort-value') ? td1.attr('data-sort-value') : td1.text().trim().replace(/%$/, '').replace(/,/, '');
      const val2 = td2.attr('data-sort-value') ? td2.attr('data-sort-value') : td2.text().trim().replace(/%$/, '').replace(/,/, '');
      let val1F = 0;
      let val2F = 0;
      let floatValues = 0;
      if (!isNaN(parseFloat(val1)) && isFinite(val1)) {
        val1F = parseFloat(val1);
        floatValues++;
      }
      if (!isNaN(parseFloat(val2)) && isFinite(val2)) {
        val2F = parseFloat(val2);
        floatValues++;
      }
      if (floatValues == 2) {
        return (val1F == val2F ? 0 : (val1F > val2F ? direction : direction * -1));
      } else {
        return val1.localeCompare(val2) * direction;
      }
    }

    return new Promise(function(resolve) {
      $('tbody', table).each(function() {
        const tbody = $(this);
        $('tr', tbody).sort(function(a, b) {
          let values = [];
          order.forEach(function(orderCfg) {
            values.push(getValuesComparison(a, b, orderCfg.column, (orderCfg.order == 'asc' ? 1 : -1)));
          });
          return values.reduce(function(result, value) {
            if (result != 0) {
              return result;
            }
            return value;
          }, 0);
        }).each(function() {
          $(tbody).append($(this));
        });
      });
      resolve();
    });
  };

  window.br.setValue = function(selector, value, fromBrDataCombo) {
    $(selector).each(function() {
      const element = $(this);
      const dataComboInstance = element.data('BrDataCombo');
      if (dataComboInstance && !fromBrDataCombo) {
        dataComboInstance.val(value);
      } else {
        element.val(value);
        if (br.isEmpty(element.val())) {
          const options = element.find('option');
          let found = false;
          options.each(function() {
            if (!found && ((this.value == value) || (br.isEmpty(this.value) && br.isEmpty(value)))) {
              element.val(this.value);
              found = true;
            }
          });
          if (!found) {
            options.each(function() {
              if (this.getAttribute('selected')) {
                element.val(this.value);
                found = true;
              }
            });
            if (br.isEmpty(element.val())) {
              if (element.attr('multiple') != 'multiple') {
                if (options.length > 0) {
                  element.val(options[0].value);
                }
              }
            }
          }
        }
        if (!fromBrDataCombo) {
          if (element.data('select2')) {
            if ((element.attr('multiple') != 'multiple')) {
              element.select2('val', element.val());
            }
          }
        }
      }
    });
  };

  if (typeof window.Handlebars == 'object') {
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });
  }

  function enchanceBootstrap() {
    // const tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    // function disableTabbingOnPage(except) {
    //   $.each($(tabbableElements), function (idx, item) {
    //     const el = $(item);
    //     if (!el.closest(except).length) {
    //       const tabindex = el.attr('tabindex');
    //       if (tabindex) {
    //         el.attr('data-prev-tabindex', tabindex);
    //       }
    //       el.attr('tabindex', '-1');
    //     }
    //   });
    // }

    // function reEnableTabbingOnPage(except) {
    //   $.each($(tabbableElements), function (idx, item) {
    //     const el = $(item);
    //     if (!el.closest(except).length) {
    //       const prevTabindex = el.attr('data-prev-tabindex');
    //       if (prevTabindex) {
    //         el.attr('tabindex', prevTabindex);
    //       } else {
    //         el.removeAttr('tabindex');
    //       }
    //       el.removeAttr('data-prev-tabindex');
    //     }
    //   });
    // }

    function configureAutosize(control) {
      if (!control.data('brAutoSizeConfigured')) {
        control.data('brAutoSizeConfigured', 1);
        if (br.bootstrapVersion == 2) {
          control.css('top', '20px');
          control.css('margin-top', '0px');
          control.css('position', 'fixed');
        }
        $(window).on('resize', function() {
          br.resizeModalPopup(control);
        });
      }
    }

    const defaultOpacity = 50;

    $(document).on('shown.bs.modal', function(event) {
      const target = $(event.target);
      if (target.hasClass('modal')) {
        let zindex = br.toInt(target.css('z-index'));
        $('div.modal').each(function() {
          const cthis = $(this);
          if (cthis.is(':visible')) {
            if (!cthis.is(target)) {
              const czindex = br.toInt(cthis.css('z-index'));
              zindex = Math.max(zindex, czindex) + 2;
            }
          }
        });
        target.css('z-index', zindex);
        zindex--;
        $('.modal-backdrop').css('z-index', zindex);
        if ($('.modal-backdrop').length) {
          const opacity = defaultOpacity / $('.modal-backdrop').length;
          $('.modal-backdrop').css({
            'opacity': opacity / 100,
            'filter': 'alpha(opacity=' + opacity + ')'
          });
        }
        // disableTabbingOnPage(target);
      }
      br.draggable(target, {
        handler: '.modal-header'
      });
      if (target.hasClass('modal')) {
        configureAutosize(target);
        br.resizeModalPopup(target);
      }
    });

    $(document).on('hidden.bs.modal', function(event) {
      const target = $(event.target);
      if (target.hasClass('modal')) {
        let modals = [];
        $('div.modal').each(function() {
          if ($(this).is(':visible')) {
            modals.push({
              zindex: br.toInt($(this).css('z-index')),
              modal: $(this)
            });
          }
        });
        if (modals.length) {
          modals.sort(function compare(a, b) {
            if (a.zindex > b.zindex) {
              return -1;
            } else
            if (a.zindex < b.zindex) {
              return 1;
            }
            return 0;
          });
          const zindex = modals[0].zindex - 1;
          $('.modal-backdrop').css('z-index', zindex);
          if ($('.modal-backdrop').length) {
            const opacity = defaultOpacity / $('.modal-backdrop').length;
            $('.modal-backdrop').css({
              'opacity': opacity / 100,
              'filter': 'alpha(opacity=' + opacity + ')'
            });
          }
        }
        // reEnableTabbingOnPage(target);
      }
    });

    $(document).on('click', function() {
      $('.br-dropdown-detached:visible').hide();
    });

    $(window).on('resize', function() {
      $('.br-dropdown-detached:visible').each(function() {
        const detachedMenu = $(this);
        const detachedMenuHolder = detachedMenu.data('detachedMenuHolder');
        const alignRight = detachedMenu.hasClass('br-dropdown-detached-right-aligned');
        const menu = detachedMenu.find('.dropdown-menu');
        const maxHeight = $(window).height() - (detachedMenuHolder.offset().top + detachedMenuHolder.height()) - 30;
        const css = Object.create({
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height(),
          right: (alignRight ? ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width() : detachedMenuHolder.offset().left)
        });
        detachedMenu.css(css);
        menu.css('max-height', `${maxHeight}px`);
        menu.css('overflow-y', `auto`);
      });
    });

    $(document).on('shown.bs.dropdown', function(event) {
      $('.br-dropdown-detached:visible').hide();
      const detachedMenuHolder = $(event.target);
      if (detachedMenuHolder.hasClass('br-dropdown-detachable')) {
        const alignRight = detachedMenuHolder.hasClass('br-dropdown-detachable-right-aligned');
        const menu = $(detachedMenuHolder.find('.dropdown-menu'));
        let detachedMenu = detachedMenuHolder.data('detachedMenu');
        const maxHeight = $(window).height() - (detachedMenuHolder.offset().top + detachedMenuHolder.height()) - 30;
        const css = Object.create({
          position: 'absolute',
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height(),
          right: (alignRight ? ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width() : detachedMenuHolder.offset().left),
        });
        if (detachedMenu) {
          detachedMenu.css(css);
          detachedMenu.addClass('open');
          detachedMenu.show();
        } else
        if (menu.length > 0) {
          detachedMenu = $('<div class="dropdown br-dropdown-detached" style="min-height:1px;"></div>');
          if (alignRight) {
            detachedMenu.addClass('br-dropdown-detached-right-aligned');
          }
          detachedMenu.append(menu.detach());
          detachedMenu.css(css);
          $('body').append(detachedMenu);
          menu.show();

          detachedMenu.data('detachedMenuHolder', detachedMenuHolder);
          detachedMenu.data('detachedMenuWidth', menu.width());
          detachedMenuHolder.data('detachedMenu', detachedMenu);
        }
        menu.css('max-height', `${maxHeight}px`);
        menu.css('overflow-y', `auto`);
      }
    });
  }

  let isAuthorized = true;

  br.setAutorizationState = function(value) {
    isAuthorized = value;
  };

  $(function() {
    if ($.fn['modal']) {
      if ($.fn['modal'].toString().indexOf('bs.modal') == -1) {
        br.bootstrapVersion = 2;
      } else {
        br.bootstrapVersion = 3;
      }
    } else {
      br.bootstrapVersion = 0;
    }

    if (br.bootstrapVersion == 2) {
      $.fn.modal.Constructor.prototype.enforceFocus = function() {
        // fakse
      };
    }

    $(document).ajaxStart(function() {
      br.showAJAXProgress();
    });

    $(document).ajaxStop(function() {
      br.hideAJAXProgress();
    });

    $(document).ajaxError(function(event, jqXHR) {
      if (jqXHR.status == 401) {
        if (isAuthorized) {
          br.setAutorizationState(false);
          if (br.events.has('authorizationRequired')) {
            br.events.trigger('authorizationRequired');
          } else {
            br.growlError(br.trn('You are trying to run operation which require authorization.'));
          }
        }
      }
    });

    $(document).on('keypress', 'input[data-click-on-enter]', function(event) {
      if (event.keyCode == 13) {
        $($(this).attr('data-click-on-enter')).trigger('click');
      }
    });

    $(document).on('click', '.action-clear-selector-value', function() {
      const target = $($(this).attr('data-selector'));
      if (target.length > 0) {
        br.setValue(target, '');
        target.trigger('change');
        if (target.attr('data-click-on-enter')) {
          $(target.attr('data-click-on-enter')).trigger('click');
        }
      }
    });

    br.attachDatePickers();

    enchanceBootstrap();

    if ($('.focused').length > 0) {
      try {
        $('.focused')[0].focus();
      } catch (error) {
        //
      }
    }

    if (!br.isTouchScreen) {
      const disableBounceContainer = $('body').attr('data-disable-bounce-container');
      if (!br.isEmpty(disableBounceContainer)) {
        br.disableBounce($(disableBounceContainer));
      }
    }

    br.initScrollableAreas();

    if (br.bootstrapVersion == 2) {
      $('ul.dropdown-menu [data-toggle=dropdown]').each(function(index, item) {
        item.addEventListener('touchend', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).closest('.dropdown-menu').find('.dropdown-submenu').removeClass('open');
          $(this).parent().addClass('open');
        });
      });
    }
  });
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  window.br.clipboard = {
    copy: function(textToCopy) {
      function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const result = document.execCommand('copy');
          if (result) {
            br.growlMessage('Text copied to clipboard...');
          } else {
            br.growlError('Copy to clipboard denied by browser security settings...');
          }
        } catch (err) {
          br.growlError('Copy to clipboard denied by browser security settings...');
        }
        document.body.removeChild(textArea);
      }
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(textToCopy);
        return;
      }
      navigator.clipboard.writeText(textToCopy).then(function() {
        br.growlMessage('Text copied to clipboard...');
      }).catch(function() {
        fallbackCopyTextToClipboard(textToCopy);
      });
    }
  }

  $(function() {
    function notify(event, result) {
      br.events.trigger('paste', result, event);
    }

    function loadFile(result, file, originalEvent, onError) {
      const reader = new FileReader();

      reader.onload = function(event) {
        const parts = /^data[:](.+?)\/(.+?);/.exec(event.target.result);
        let result_dataType = 'other';
        let result_dataSubType = 'binary';
        if (parts) {
          result_dataType = parts[1];
          result_dataSubType = parts[2];
        }
        result.dataType = result_dataType;
        result.dataSubType = result_dataSubType;
        result.dataValue = event.target.result;
        result.data[result_dataType] = result.data[result_dataType] || {};
        result.data[result_dataType][result_dataSubType] = event.target.result;
        notify(originalEvent, result);
      };

      reader.onerror = function(event) {
        if (onError) {
          onError.call(event);
        }
      };

      reader.readAsDataURL(file);
    }

    function loadData(result, clipboardData, mediaType, isImage) {
      const data = clipboardData.getData(mediaType);

      if (data && (data.length > 0)) {
        if (isImage) {
          mediaType = 'image/url';
        }
        const parts = /^(.+?)\/(.+?)$/.exec(mediaType);
        let result_dataType = 'other';
        let result_dataSubType = 'binary';
        if (parts) {
          result_dataType = parts[1];
          result_dataSubType = parts[2];
        }
        result.dataType = result_dataType;
        result.dataSubType = result_dataSubType;
        result.dataValue = data;
        if (isImage) {
          result.data[result_dataType] = result.data[result_dataType] || {};
          result.data[result_dataType][result_dataSubType] = data;
        }
        return true;
      }

      return false;
    }

    function processItems(items, result, event) {
      if (items.length > 0) {
        let item = items.shift();
        loadFile(result, item, event, function() {
          processItems(items, result, event);
        });
      }
    }

    $('body').on('paste', function(event) {
      let result = {
        data: {},
        dataType: '',
        dataSubType: '',
        dataValue: ''
      };
      let items = [];
      let complete = true;

      event = event.originalEvent;

      if (event.clipboardData) {
        for (let i = 0, length = event.clipboardData.types.length; i < length; i++) {
          const dataType = event.clipboardData.types[i];
          const parts = /^(.+?)\/(.+?)$/.exec(dataType);
          let result_dataType = 'other';
          let result_dataSubType = dataType;
          if (parts) {
            result_dataType = parts[1];
            result_dataSubType = parts[2];
          }
          result.data[result_dataType] = result.data[result_dataType] || {};
          result.data[result_dataType][result_dataSubType] = event.clipboardData.getData(dataType);
        }

        if (!loadData(result, event.clipboardData, 'public.url', true)) {
          if (loadData(result, event.clipboardData, 'text/html')) {
            result.dataValue = result.dataValue.replace(/<(html|body|head|meta|link)[^>]*?>/g, '').replace(/<\/(html|body|head|meta|link)[^>]*?>/g, '');
          } else
          if (!loadData(result, event.clipboardData, 'text/plain')) {
            if (event.clipboardData.items && (event.clipboardData.items.length > 0)) {
              for (let i = 0, length = event.clipboardData.items.length; i < length; i++) {
                if (event.clipboardData.items[i].type.match('image.*')) {
                  items.push(event.clipboardData.items[i].getAsFile());
                }
              }
            }
            if (event.clipboardData.files && (event.clipboardData.files.length > 0)) {
              for (let i = 0, length = event.clipboardData.files.length; i < length; i++) {
                if (event.clipboardData.files[i].type.match('image.*')) {
                  items.push(event.clipboardData.files[i]);
                }
              }
            }
            if (items.length > 0) {
              complete = false;
              processItems(items, result, event);
            }
          }
        }

        if (complete) {
          notify(event, result);
        }
      }
    });
  });
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataEditor(selector, dataSource, options) {
    const _this = this;

    let editorRowid = null;
    let editorRowData = null;
    let cancelled = false;
    let closeConfirmationTmp;
    let saving = false;
    let savingAndClosing = false;
    let workMode = false;

    _this.options = options || {};
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.save = _this.options.selectors.save || '.action-save';
    _this.options.selectors.cancel = _this.options.selectors.cancel || '.action-cancel';
    _this.options.selectors.errorMessage = _this.options.selectors.errorMessage || '.editor-error-message';

    if (_this.options.inputsContainer) {
      _this.inputsContainer = $(_this.options.inputsContainer);
    } else {
      _this.inputsContainer = $(selector);
    }

    _this.dataSource = dataSource;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.pause = function(event, callback) {
      _this.events.pause(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    _this.getContainer = function() {
      return $(selector);
    };

    _this.container = _this.getContainer();

    _this.rowid = function() {
      return editorRowid;
    };

    _this.rowData = function(name) {
      return name ? (editorRowData ? editorRowData[name] : undefined) : editorRowData;
    };

    _this.isActive = function() {
      return _this.container.is(':visible');
    };

    _this.isEditMode = function() {
      return !br.isNull(editorRowid);
    };

    _this.isInsertMode = function() {
      return br.isNull(editorRowid);
    };

    _this.lock = function() {
      $(_this.options.selectors.save, _this.container).addClass('disabled');
      $('.action-save-related', _this.container).addClass('disabled');
    };

    _this.unlock = function() {
      $(_this.options.selectors.save, _this.container).removeClass('disabled');
      $('.action-save-related', _this.container).removeClass('disabled');
      br.resetCloseConfirmation();
    };

    _this.showError = function(message) {
      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    _this.updateEditorTitle = function() {
      let title = '';
      if (_this.options.title) {
        title = _this.options.title;
      } else
      if (editorRowid) {
        switch (workMode) {
        case 'copy':
          title = `Copy ${_this.options.noun}`;
          break;
        case 'view':
          title = `View ${_this.options.noun}`;
          if (!_this.options.hideRowid) {
            title += ` (#${editorRowid})`;
          }
          break;
        default:
          title = `Edit ${_this.options.noun}`;
          if (!_this.options.hideRowid) {
            title += ` (#${editorRowid})`;
          }
          break;
        }
      } else {
        title = `Create ${_this.options.noun}`;
      }
      let rowName = _this.container.find('input.data-field[name="name"]').val();
      if (rowName) {
        title += ` ${rowName}`;
      }
      _this.container.find('.operation').text(title);
    };

    function editorShown() {
      let focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', _this.container);
      if (focusedInput.length > 0) {
        try {
          focusedInput[0].focus();
        } catch (e) {
          //
        }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', _this.container);
        if (focusedInput.length > 0) {
          try {
            focusedInput[0].focus();
          } catch (e) {
            //
          }
        }
      }
      if ($.fn.bootstrapDatepicker) {
        try {
          $('input.bootstrap-datepicker', _this.container).each(function() {
            $(this).bootstrapDatepicker('update');
          });
        } catch (error) {
          br.logError(error);
        }
      }
      _this.events.trigger('editor.shown');
      br.resetCloseConfirmation();
    }

    function editorHidden(result, response) {
      _this.events.trigger('editor.hidden', result, response);
      br.resetCloseConfirmation();
      if (closeConfirmationTmp) {
        br.confirmClose();
      }
    }

    _this.init = function() {
      if (_this.container.hasClass('modal')) {
        _this.container.on('shown.bs.modal', function(event) {
          if ($(event.target).is(_this.container)) {
            editorShown();
          }
        });
        _this.container.on('hide.bs.modal', function(event) {
          if ($(event.target).is(_this.container)) {
            if (cancelled) {
              cancelled = false;
            } else {
              if (br.isCloseConfirmationRequired()) {
                br.confirm('Changes detected', br.closeConfirmationMessage, function() {
                  _this.cancel();
                });
                return false;
              }
            }
            _this.events.trigger('editor.hide', false, editorRowid);
          }
        });
        _this.container.on('hidden.bs.modal', function(event) {
          if ($(event.target).is(_this.container)) {
            editorHidden(false, editorRowid);
          }
        });
      }

      $(_this.options.selectors.cancel, _this.container).removeAttr('data-dismiss');

      $(_this.options.selectors.cancel, _this.container).click(function() {
        _this.cancel();
      });

      $(_this.options.selectors.save, _this.container).click(function() {
        let btn = $(this);
        if (!btn.hasClass('disabled') && !saving) {
          let andClose = btn.hasClass('action-close') || _this.container.hasClass('modal');
          btn.addClass('disabled');
          internalSave(andClose, function() {
            btn.removeClass('disabled');
          }, function() {
            btn.removeClass('disabled');
          });
        }
      });

      const updateEditorTitle = function(el) {
        if (el.attr('name') == 'name') {
          _this.updateEditorTitle();
        }
        br.confirmClose();
      };

      _this.inputsContainer.on('change', 'select.data-field,input.data-field,textarea.data-field', function() {
        updateEditorTitle($(this));
      });

      _this.inputsContainer.on('input', 'select.data-field,input.data-field,textarea.data-field', function() {
        updateEditorTitle($(this));
      });

      return _this;
    };

    _this.fillDefaults = function() {
      _this.inputsContainer.find('input.data-field[type="checkbox"]').each(function() {
        $(this).prop('checked', !!$(this).attr('data-default-checked'));
      });
      _this.inputsContainer.find('input.data-field,select.data-field').each(function() {
        const this_ = $(this);
        if (!this_.val() && this_.attr('data-default')) {
          br.setValue(this_, this_.attr('data-default'));
        }
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for (let name in data) {
          _this.inputsContainer.find(`div.data-field[data-toggle="buttons-radio"][name="${name}"],input.data-field[name="${name}"],select.data-field[name="${name}"],textarea.data-field[name="${name}"]`).each(function() {
            let input = $(this);
            if (input.attr('data-toggle') == 'buttons-radio') {
              let val = br.isNull(data[name]) ? '' : data[name];
              input.find(`button[value="${val}"]`).addClass('active');
            } else
            if (input.attr('type') == 'checkbox') {
              input.prop('checked', br.toInt(data[name]) == 1);
            } else
            if (input.attr('type') == 'radio') {
              input.prop('checked', br.toInt(data[name]) == br.toInt(input.val()));
            } else {
              let ckeditorInstance = input.data('ckeditorInstance');
              if (ckeditorInstance) {
                (function(ckeditorInstance0, data0) {
                  ckeditorInstance0.setData(data0, {
                    noSnapshot: true,
                    callback: function() {
                      if (ckeditorInstance0.getData() != data0) {
                        // not sure why but setData is not wroking sometimes, so need to run again :(
                        ckeditorInstance0.setData(data0, {
                          noSnapshot: true
                        });
                      }
                    }
                  });
                })(ckeditorInstance, data[name]);
              } else {
                br.setValue(input, data[name]);
              }
            }
          });
        }
      }
      if (window.Select2) {
        _this.inputsContainer.find('select.data-field').each(function() {
          $(this).select2();
        });
      }
    };

    _this.show = function(rowid, params) {
      let editorParams = Object.assign({
        mode: br.isNumber(rowid) ? 'edit' : 'insert',
        defaults: null,
        params: {}
      }, params);
      workMode = editorParams.mode;
      closeConfirmationTmp = br.isCloseConfirmationRequired();
      editorRowid = br.isNumber(rowid) ? rowid : null;
      editorRowData = br.isObject(rowid) ? rowid : null;
      _this.inputsContainer.find('select.data-field').each(function() {
        br.setValue($(this), '');
      });
      _this.inputsContainer.find('input.data-field[type!=radio],textarea.data-field').val('');
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1').prop('checked', false);
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      _this.inputsContainer.find('textarea.data-field').each(function() {
        let ckeditorInstance = $(this).data('ckeditorInstance');
        let onChangeHandled = $(this).data('onChangeHandled');
        if (ckeditorInstance && !onChangeHandled) {
          $(this).data('onChangeHandled', true);
          ckeditorInstance.on('change', function(e) {
            if (e.editor.checkDirty()) {
              br.confirmClose();
            }
          });
        }
      });

      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (workMode == 'view') {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          $(this).attr('wasAvailable', !$(this).prop('disabled'));
          $(this).prop('readonly', true);
          $(this).prop('disabled', true);
          let ckeditorInstance = $(this).data('ckeditorInstance');
          if (ckeditorInstance) {
            ckeditorInstance.setReadOnly(true);
          }
        });
        $(_this.options.selectors.save, _this.container).hide();
        $('.action-save-related', _this.container).hide();
      } else {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          if ($(this).attr('wasAvailable')) {
            $(this).prop('readonly', false);
            $(this).prop('disabled', false);
            let ckeditorInstance = $(this).data('ckeditorInstance');
            if (ckeditorInstance) {
              ckeditorInstance.setReadOnly(false);
            }
          }
        });
        $(_this.options.selectors.save, _this.container).show();
        $('.action-save-related', _this.container).show();
      }

      if (editorRowid) {
        let dataSourceRequest = {
          rowid: editorRowid
        };
        let dataSourceOptions = {
          disableEvents: true
        };
        _this.events.triggerBefore('editor.loadData', dataSourceRequest, dataSourceOptions);
        _this.dataSource.selectOne(dataSourceRequest, function(result, response) {
          if (result) {
            editorRowData = response;
            _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
            _this.fillControls(editorRowData);
            if (workMode == 'copy') {
              editorRowid = null;
            }
            _this.updateEditorTitle();
            _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
            br.attachDatePickers(_this.inputsContainer);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            } else {
              editorShown();
            }
          } else {
            if (_this.container.hasClass('modal')) {
              _this.showError(editorRowData);
            } else {
              br.backToCaller(_this.options.returnUrl, true);
            }
          }
        }, dataSourceOptions);
      } else {
        _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
        _this.fillDefaults();
        _this.fillControls(editorParams.defaults);
        _this.updateEditorTitle();
        _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults, editorParams.params);
        br.attachDatePickers(_this.inputsContainer);
        if (_this.container.hasClass('modal')) {
          _this.container.modal('show');
        } else {
          editorShown();
        }
      }
      return _this.container;
    };

    _this.hide = _this.cancel = function() {
      cancelled = true;
      _this.events.trigger('editor.cancel', false, editorRowid);
      if (_this.container.hasClass('modal')) {
        _this.container.modal('hide');
      } else {
        _this.events.trigger('editor.hide', false, editorRowid);
        editorHidden(false, editorHidden);
        br.backToCaller(_this.options.returnUrl, false);
      }
    };

    _this.isSaving = function() {
      return saving;
    };

    _this.isSavingAndClosing = function() {
      return saving && savingAndClosing;
    };

    _this.saveIfInsert = function(successCallback, errorCallback) {
      if (_this.isInsertMode()) {
        _this.save(false, successCallback, errorCallback);
      } else
      if (br.isFunction(successCallback)) {
        successCallback();
      }
    };

    _this.save = function(andClose, successCallback, errorCallback, silent) {
      if (br.isFunction(andClose)) {
        errorCallback = successCallback;
        successCallback = andClose;
        andClose = false;
        // if function invoked with callabacks I'll consider that it msut save silently
        silent = true;
      }
      if (workMode == 'view') {
        if (br.isFunction(successCallback)) {
          successCallback();
        }
      } else {
        if (!br.isFunction(successCallback)) {
          successCallback = null;
        }
        if (!br.isFunction(errorCallback)) {
          errorCallback = null;
        }
        return internalSave(andClose, successCallback, errorCallback, silent);
      }
    };

    function saveContinue(andClose, successCallback, errorCallback, silent, data) {
      savingAndClosing = andClose;

      let operation = editorRowid ? 'update' : 'insert';

      try {
        let saveOptions = {};
        _this.events.trigger('editor.save', operation, data, saveOptions);
        if (editorRowid) {
          _this.events.triggerBefore('editor.update', data, options);
          _this.dataSource.update(editorRowid, data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.events.triggerAfter('editor.update', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    let callResponse = {
                      refresh: true
                    };
                    _this.events.trigger('editor.hide', true, response, callResponse);
                    editorHidden(true, response);
                    br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                  }
                } else {
                  if (!_this.options.hideSaveNotification && !silent) {
                    br.growlMessage('Changes saved', 'Success');
                  }
                }
                if (successCallback) {
                  successCallback.call(_this, response);
                }
              } else {
                _this.events.triggerAfter('editor.update', false, response);
                _this.events.triggerAfter('editor.save', false, response, operation);
                if (!_this.dataSource.events.has('error')) {
                  _this.showError(response);
                }
                if (errorCallback) {
                  errorCallback.call(_this, data, response);
                }
              }
            } finally {
              saving = false;
            }
          }, saveOptions);
        } else {
          _this.events.triggerBefore('editor.insert', data, saveOptions);
          _this.dataSource.insert(data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.updateEditorTitle();
                _this.events.triggerAfter('editor.insert', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    let callResponse = {
                      refresh: true
                    };
                    _this.events.trigger('editor.hide', true, response, callResponse);
                    editorHidden(true, response);
                    br.backToCaller(_this.options.returnUrl, callResponse.refresh);
                  }
                } else {
                  if (!_this.options.hideSaveNotification && !silent) {
                    br.growlMessage('Changes saved', 'Success');
                  }
                }
                if (successCallback) {
                  successCallback.call(_this, response);
                }
              } else {
                _this.events.triggerAfter('editor.insert', false, response);
                _this.events.triggerAfter('editor.save', false, response, operation);
                if (!_this.dataSource.events.has('error')) {
                  _this.showError(response);
                }
                if (errorCallback) {
                  errorCallback.call(_this, data, response);
                }
              }
            } finally {
              saving = false;
            }
          }, saveOptions);
        }
      } catch (error) {
        _this.showError(error.message);
        if (errorCallback) {
          errorCallback.call(_this, data, error.message);
        }
        saving = false;
      }
    }

    function internalSave(andClose, successCallback, errorCallback, silent) {

      if (saving) {
        window.setTimeout(function() {
          internalSave(andClose, successCallback, errorCallback, silent);
        }, 100);
        return;
      } else {
        saving = true;
      }

      let data = {};
      let errors = [];
      try {
        $(_this.options.selectors.errorMessage, _this.container).hide();
        _this.events.triggerBefore('editor.save');
        _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
          let val;
          let skip = false;
          let input = $(this);
          if ((input.attr('readonly') != 'readonly') && (input.attr('disabled') != 'disabled')) {
            if (input.attr('data-toggle') == 'buttons-radio') {
              val = input.find('button.active').val();
            } else
            if (input.attr('type') == 'checkbox') {
              val = input.is(':checked') ? 1 : 0;
            } else
            if (input.attr('type') == 'radio') {
              if (input.is(':checked')) {
                val = input.val();
              } else {
                skip = true;
              }
            } else {
              val = input.val();
            }
            if (!skip) {
              if (
                input.hasClass('required') &&
                br.isEmpty(val) &&
                (!input.hasClass('required-edit-only') ||
                  _this.isEditMode()
                ) &&
                (!input.hasClass('required-insert-only') ||
                  _this.isInsertMode()
                )
              ) {
                let title = input.attr('title');
                if (br.isEmpty(title)) {
                  title = input.prev('label').text();
                }
                if (errors.length === 0) {
                  this.focus();
                }
                errors.push(br.trn('%s must be filled').replace('%s', title));
              } else
              if (br.isEmpty(val)) {
                data[input.attr('name')] = '';
              } else {
                data[input.attr('name')] = val;
              }
            }
          }
        });

        if (errors.length > 0) {
          let tmpl = (errors.length == 1) ? '{{#errors}}{{.}}{{/errors}}' : br.trn('Please check the following:') + '<br /><ul>{{#errors}}<li>{{.}}</li>{{/errors}}</ul>';
          let error = br.fetch(tmpl, {
            errors: errors
          });
          _this.showError(error);
          if (errorCallback) {
            errorCallback.call(_this, data, error);
          }
          saving = false;
        } else {
          let operation = editorRowid ? 'update' : 'insert';
          if (_this.events.has('editor.save', 'pause')) {
            _this.events.triggerPause('editor.save', {
              continue: function(data0) {
                saveContinue(andClose, successCallback, errorCallback, silent, data0);
              },
              cancel: function(error) {
                if (errorCallback) {
                  errorCallback.call(_this, data, error);
                }
                saving = false;
              }
            },
            operation,
            data
            );
          } else {
            saveContinue(andClose, successCallback, errorCallback, silent, data);
          }
        }
      } catch (e) {
        if (errorCallback) {
          errorCallback.call(_this, data, e.message);
        }
        saving = false;
        throw e;
      }
    }

    return _this.init();
  }

  window.br.dataEditor = function(selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDataBrowser(entity, settings) {
    const _this = this;

    let pagerSetUp = false;
    let headerContainer = 'body';
    let selectionQueue = [];

    _this.options = Object.assign({}, settings);
    _this.options.autoLoad = _this.options.autoLoad || false;
    _this.options.defaults = _this.options.defaults || {};
    _this.options.entity = entity;
    _this.options.features = _this.options.features || {
      editor: true
    };
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.container = _this.options.selectors.container || '';
    _this.options.selectors.scrollContainer = _this.options.selectors.scrollContainer || '';
    _this.options.pageSizes = _this.options.pageSizes || [20, 50, 100, 200];

    function findNode(selector) {
      if (_this.options.selectors.container !== '') {
        return _this.options.selectors.container + ' ' + selector;
      } else {
        return selector;
      }
    }

    _this.getContainer = function() {
      if (_this.options.selectors.container !== '') {
        return $(_this.options.selectors.container);
      } else {
        return $('body');
      }
    };

    _this.container = _this.getContainer();

    _this.getScrollContainer = function() {
      if (_this.options.selectors.container !== '') {
        if (_this.options.selectors.scrollContainer !== '') {
          if (_this.options.selectors.scrollContainer.indexOf('#') === 0) {
            return $(_this.options.selectors.scrollContainer);
          } else {
            return $(_this.options.selectors.container + ' ' + _this.options.selectors.scrollContainer);
          }
        } else {
          return $(_this.options.selectors.container);
        }
      } else {
        return $(_this.options.selectors.scrollContainer);
      }
    };

    _this.options.selectors.dataTable = findNode(_this.options.selectors.dataTable || '.data-table');
    _this.options.selectors.editForm = _this.options.selectors.editForm || '';

    _this.getTableContainer = function() {
      return $(_this.options.selectors.dataTable);
    };

    if (_this.options.selectors.editForm === '') {
      if (_this.options.selectors.container === '') {
        _this.options.selectors.editForm = '.data-edit-form';
      } else {
        _this.options.selectors.editForm = _this.options.selectors.container + ' .data-edit-form';
      }
    }

    _this.options.templates = _this.options.templates || {};
    _this.options.templates.row = _this.options.templates.row || _this.options.templates.rowTemplate || '.data-row-template';
    _this.options.templates.groupRow = _this.options.templates.groupRow || '.data-group-row-template';
    _this.options.templates.noData = _this.options.templates.noData || '.data-empty-template';

    const selActionCRUD = `${findNode('.action-edit')},${findNode('.action-view')},${findNode('.action-create')},${findNode('.action-copy')}`;

    if (typeof entity == 'string') {
      if (_this.options.entity.indexOf('/') == -1) {
        _this.dataSource = br.dataSource(`${br.baseUrl}api/${_this.options.entity}/`);
      } else {
        _this.dataSource = br.dataSource(`${br.baseUrl}${_this.options.entity}`);
      }
      _this.dataSource.on('error', function(operation, error) {
        if (error && (error.length > 0)) {
          br.growlError(error);
        }
      });
    } else {
      _this.dataSource = entity;
    }

    _this.storageTag = _this.options.storageTag ? _this.options.storageTag : document.location.pathname + ':' + _this.dataSource.options.restServiceUrl;

    _this.selection = br.flagsHolder();

    _this.countDataSource = br.dataSource(_this.dataSource.options.restServiceUrl);

    if (_this.options.selectors.container !== '') {
      headerContainer = _this.options.selectors.container;
    }

    _this.dataGrid = br.dataGrid(_this.options.selectors.dataTable, _this.options.templates.row, _this.dataSource, {
      templates: {
        noData: _this.options.templates.noData,
        groupRow: _this.options.templates.groupRow
      },
      selectors: {
        header: headerContainer,
        remove: '.action-delete',
        refreshRow: _this.options.selectors.refreshRow
      },
      appendInInsert: _this.options.appendInInsert,
      defaultOrderAndGroup: _this.options.defaultOrderAndGroup,
      fixedHeader: _this.options.fixedHeader,
      autoHeight: !br.isMobileDevice() ? _this.options.autoHeight : false,
      autoWidth: _this.options.autoWidth,
      storageTag: _this.options.storageTag,
      storeDataRow: _this.options.storeDataRow
    });

    _this.setStored = function(name, value) {
      _this.dataGrid.setStored(name, value);
    };

    _this.getStored = function(name, defaultValue) {
      return _this.dataGrid.getStored(name, defaultValue);
    };

    _this.resetStored = function(stopPropagation) {
      _this.dataGrid.resetStored(stopPropagation);
      if (!stopPropagation) {
        br.refresh();
      }
    };

    _this.defaultLimit = _this.options.limit || 20;
    _this.limit = _this.getStored('pager_PageSize', _this.defaultLimit);
    _this.skip = 0;
    _this.recordsAmount = 0;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) {
      _this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      _this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      _this.events.after(event, callback);
    };

    _this.before = function(operation, callback) {
      _this.dataSource.before(operation, callback);
      _this.countDataSource.before(operation, callback);
    };

    _this.isOrderConfigured = function() {
      return _this.dataGrid.isOrderConfigured();
    };

    _this.getOrder = function() {
      return _this.dataGrid.getOrder();
    };

    _this.setOrder = function(order, callback) {
      return _this.dataGrid.setOrder(order, callback);
    };

    _this.getOrderAndGroup = function() {
      return _this.dataGrid.getOrderAndGroup();
    };

    _this.setOrderAndGroup = function(orderAndGroup, callback) {
      return _this.dataGrid.setOrderAndGroup(orderAndGroup, callback);
    };

    _this.setFilter = function(name, value) {
      _this.dataGrid.setFilter(name, value);
    };

    _this.getFilter = function(name, defaultValue) {
      return _this.dataGrid.getFilter(name, defaultValue);
    };

    _this.resetFilters = function(stopPropagation, inPopup) {
      br.setValue(findNode('input.data-filter'), '');
      br.setValue(findNode('select.data-filter'), '');
      $(findNode('input.data-filter')).trigger('reset');
      $(findNode('select.data-filter')).trigger('reset');
      _this.dataGrid.resetFilters(stopPropagation);
      if (!stopPropagation) {
        _this.events.trigger('resetFilters');
        if (br.toInt(inPopup) == 1) {
          _this.refresh();
        } else {
          br.refresh();
        }
      }
    };

    _this.reloadRow = function(rowid, callback, options) {
      _this.dataGrid.reloadRow(rowid, callback, options);
    };

    _this.hasRow = function(rowid, options) {
      return _this.dataGrid.hasRow(rowid, options);
    };

    _this.removeRow = function(rowid) {
      return _this.dataGrid.removeRow(rowid);
    };

    function deleteQueued() {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        _this.dataSource.remove(rowid, function(result) {
          if (result) {
            _this.unSelectRow(rowid);
          }
          br.stepProgress();
          deleteQueued();
        });
      } else {
        br.hideProgress();
      }
    }

    _this.deleteSelection = function() {
      selectionQueue = _this.selection.get().slice(0);
      if (selectionQueue.length > 0) {
        br.confirm('Delete confirmation', `Are you sure you want do delete ${selectionQueue.length} record(s)?`, function() {
          br.startProgress(selectionQueue.length, 'Deleting...');
          deleteQueued();
        });
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function updateQueued(func) {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        let data = {};
        func(data);
        _this.dataSource.update(rowid, data, function(result) {
          if (result) {
            _this.unSelectRow(rowid);
          }
          br.stepProgress();
          updateQueued(func);
        });
      } else {
        br.hideProgress();
      }
    }

    _this.updateSelection = function(func) {
      selectionQueue = _this.selection.get().slice(0);
      if (selectionQueue.length > 0) {
        br.startProgress(selectionQueue.length, 'Updating...');
        updateQueued(func);
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function processQueued(processRowCallback, processCompleteCallback, params) {
      if (selectionQueue.length > 0) {
        const rowid = selectionQueue.shift();
        processRowCallback(rowid, function() {
          if (params.showProgress) {
            br.stepProgress();
          }
          processQueued(processRowCallback, processCompleteCallback, params);
        });
      } else {
        if (params.showProgress) {
          br.hideProgress();
        }
        if (processCompleteCallback) {
          processCompleteCallback();
        }
      }
    }

    _this.processSelection = function(processRowCallback, processCompleteCallback, params) {
      params = params || {};
      params.showProgress = params.showProgress || false;
      selectionQueue = _this.selection.get();
      if (selectionQueue.length > 0) {
        if (params.showProgress) {
          br.startProgress(selectionQueue.length, params.title || '');
        }
        processQueued(processRowCallback, processCompleteCallback, params);
      } else {
        br.growlError('Please select at least one record');
      }
    };

    _this.init = function() {
      if (_this.options.nav) {
        $(`.nav-item[rel="${_this.options.nav}"]`).addClass('active');
      }

      const keywordControl = $(findNode('input.data-filter[name="keyword"]'));
      const inputControls = $(findNode('input.data-filter,select.data-filter'));

      _this.dataSource.before('select', function(request, options) {
        request = request || {};
        if (keywordControl.length > 0) {
          request.keyword = keywordControl.val();
          _this.setFilter('keyword', request.keyword);
        }
        options = options || {};
        options.skip = _this.skip;
        options.limit = _this.limit || _this.defaultLimit;
      });

      _this.dataSource.after('remove', function(result) {
        if (result) {
          if (selectionQueue.length === 0) {
            _this.resetPager();
            _this.updatePager();
          }
          if (_this.dataGrid.isEmpty()) {
            _this.refresh();
          }
        }
      });

      _this.dataSource.after('insert', function(result) {
        if (result) {
          _this.resetPager();
          _this.updatePager();
        }
      });

      _this.countDataSource.before('select', function(request) {
        if (keywordControl.length > 0) {
          request.keyword = keywordControl.val();
        }
      });

      _this.dataSource.after('select', function(result, response) {
        if (result) {
          if (_this.options.autoLoad) {
            _this.skip = _this.skip + response.length;
          }
        }
        _this.updatePager(true);
      });

      // search

      inputControls.each(function() {
        if ($(this).parent().hasClass('input-append')) {
          $(this).parent().addClass('data-filter');
          $(this).parent().css({
            display: 'inline-block',
            position: 'relative'
          });
        }
      });

      if (keywordControl.length > 0) {
        br.modified(keywordControl, function() {
          const val = $(this).val();
          keywordControl.each(function() {
            if ($(this).val() != val) {
              $(this).val(val);
            }
          });
          if ($(this).hasClass('instant-search')) {
            _this.refreshDeferred();
          }
        });
      }

      br.modified(findNode('input.data-filter,select.data-filter'), function() {
        const val = $(this).val();
        let container = $(this).parent();
        if (!container.hasClass('input-append')) {
          container = $(this);
        }
        if (br.isEmpty(val)) {
          container.removeClass('br-input-has-value');
        } else {
          container.addClass('br-input-has-value');
        }
        _this.resetPager();
      });

      br.attachDatePickers();

      if (_this.options.features.editor) {
        let container = $(_this.options.selectors.editForm);
        if (container.length > 0) {
          let editorOptions = _this.options.editor || {
            noun: _this.options.noun
          };
          _this.editor = _this.dataEditor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
          _this.editor.events.connectTo(_this.events);

          $(findNode('.action-create')).show();

          $(document).on('click', selActionCRUD, function() {
            const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
            let mode;
            if ($(this).hasClass('action-copy')) {
              mode = 'copy';
            } else
            if ($(this).hasClass('action-view')) {
              mode = 'view';
            } else
            if (rowid) {
              mode = 'edit';
            } else {
              mode = 'insert';
            }
            _this.editor.show(rowid, {
              mode: mode
            });
          });
        }
      }

      // pager

      $(findNode('.action-next') + ',' + findNode('.pager-action-next')).on('click', function() {
        _this.skip += _this.limit;
        _this.refresh({}, null, true);
      });

      $(findNode('.action-prior') + ',' + findNode('.pager-action-prior')).on('click', function() {
        _this.skip -= _this.limit;
        if (_this.skip < 0) {
          _this.skip = 0;
        }
        _this.refresh({}, null, true);
      });

      $(findNode('.pager-page-navigation')).on('click', '.pager-action-navigate', function() {
        const value = br.toInt($(this).attr('data-page'));
        if (value > 0) {
          const newSkip = _this.limit * (value - 1);
          if (newSkip != _this.skip) {
            _this.skip = _this.limit * (value - 1);
            _this.setStored('pager_PageNo', _this.skip);
            _this.refresh({}, null, true);
          }
        }
      });

      $(findNode('.pager-page-size-navigation')).on('click', '.pager-action-page-size', function() {
        const value = br.toInt($(this).attr('data-size'));
        _this.limit = value;
        _this.skip = 0;
        _this.setStored('pager_PageNo', _this.skip);
        _this.setStored('pager_PageSize', _this.limit);
        _this.refresh({}, null, true);
      });

      $(findNode('.action-refresh')).on('click', function() {
        _this.refresh();
      });

      $(findNode('.action-clear-one-filter')).on('click', function() {
        let rel = $(this).attr('rel');
        $(findNode(`.data-filter[name="${rel}"]`)).val('');
        $(findNode(`.data-filter[name="${rel}"]`)).trigger('change');
        _this.refresh();
      });

      $(findNode('input.data-filter[name=keyword]')).val(_this.getFilter('keyword'));

      $(findNode('.action-reset-filters')).on('click', function() {
        _this.resetFilters(false, $(this).attr('data-in-popup'));
      });

      function checkAutoLoad() {
        const docsHeight = $(_this.options.selectors.dataTable).height();
        const docsContainerHeight = _this.getScrollContainer().height();
        const scrollTop = _this.getScrollContainer().scrollTop();

        if (scrollTop + docsContainerHeight > docsHeight) {
          _this.dataGrid.loadMore();
        }
      }

      if (_this.options.autoLoad) {
        _this.getScrollContainer().on('scroll', function() {
          checkAutoLoad();
        });
      }

      $(document).on('click', findNode('.action-select-all'), function() {
        _this.selectAll($(this).is(':checked'));
      });

      $(document).on('click', findNode('.action-select-row'), function() {
        const row = $(this).closest('[data-rowid]');
        const rowid = row.attr('data-rowid');
        const checked = $(this).is(':checked');
        if (checked) {
          _this.selectRow(rowid);
        } else {
          _this.unSelectRow(rowid);
        }
      });

      $(document).on('click', findNode('.action-clear-selection'), function() {
        _this.clearSelection();
      });

      $(document).on('click', findNode('.action-delete-selected'), function() {
        _this.deleteSelection();
      });

      _this.dataGrid.before('changeOrder', function() {
        _this.resetPager();
      });

      _this.dataGrid.on('change', function() {
        const selection = _this.selection.get();
        if (selection.length > 0) {
          _this.restoreSelection();
        } else {
          _this.clearSelection();
        }
        $(findNode('.action-select-all')).prop('checked', false);
        _this.events.trigger('change');
        _this.events.triggerAfter('change');
      });

      _this.events.on('selectionChanged', function(count) {
        if (count > 0) {
          $(findNode('.selection-count')).text(count);
          $(findNode('.selection-stat')).text(`${count} record(s) selected`);
          $(findNode('.selection-stat')).show();
          $(findNode('.action-clear-selection')).show();
          const selection = _this.selection.get();
          let deletable = selection.filter(function(rowid) {
            return $(findNode(`tr[data-rowid="${rowid}"] td .action-delete`)).length > 0;
          });
          if (deletable.length > 0) {
            $(findNode('.action-delete-selected')).show();
          } else {
            $(findNode('.action-delete-selected')).hide();
          }
        } else {
          $(findNode('.selection-count')).text('0');
          $(findNode('.selection-stat')).hide();
          $(findNode('.action-clear-selection')).hide();
          $(findNode('.action-delete-selected')).hide();
        }
      });

      return this;
    };

    function internalUpdatePager() {
      if (!_this.dataGrid.isDisconnected()) {
        const totalPages = Math.ceil(_this.recordsAmount / _this.limit);
        const currentPage = Math.ceil(_this.skip / _this.limit) + 1;

        let $pc = $(findNode('.pager-page-navigation'));
        $pc.html('');
        let s = '';
        let f1 = false;
        let f2 = false;
        let r = 3;
        let el = false;
        for (let i = 1; i <= totalPages; i++) {
          if ((i <= r) || ((i > currentPage - r) && (i < currentPage + r)) || (i > (totalPages - r))) {
            if (i == currentPage) {
              s = s + '<strong class="pager-nav-element">' + i + '</strong>';
            } else {
              el = true;
              s = s + '<a href="javascript:;" class="pager-action-navigate pager-nav-element" data-page="' + i + '">' + i + '</a>';
            }
          } else
          if (!f1 && i < currentPage) {
            s = s + '...';
            f1 = true;
          } else
          if (!f2 && i > currentPage) {
            s = s + '...';
            f2 = true;
          }
        }
        if (el) {
          $pc.html(s);
          $(findNode('.pager-nav-element')).show();
        } else {
          $(findNode('.pager-nav-element')).css('display', 'none');
        }

        $pc = $(findNode('.pager-page-size-navigation'));
        $pc.html('');
        s = '';
        const sizes = _this.options.pageSizes;
        for (let i = 0, length = sizes.length; i < length; i++) {
          let size = sizes[i];
          let dsize = size;
          if (size >= _this.recordsAmount) {
            dsize = _this.recordsAmount;
          }
          if (size == _this.limit) {
            s = s + '<strong class="pager-nav-element">' + dsize + '</strong>';
          } else {
            s = s + '<a href="javascript:;" class="pager-action-page-size pager-size-element" data-size="' + size + '">' + dsize + '</a>';
          }
          if (size >= _this.recordsAmount) {
            break;
          }
        }
        if (s.length > 0) {
          $pc.html(s);
          $(findNode('.pager-page-size-container')).show();
        } else {
          $(findNode('.pager-page-size-container')).css('display', 'none');
        }

        const min = (_this.skip + 1);
        const max = Math.min(_this.skip + _this.limit, _this.recordsAmount);

        if (_this.recordsAmount > 0) {
          if (_this.recordsAmount > max) {
            $(findNode('.action-next')).show();
            $(findNode('.pager-action-next')).show();
          } else {
            $(findNode('.action-next')).css('display', 'none');
            $(findNode('.pager-action-next')).css('display', 'none');
          }
          if (_this.skip > 0) {
            $(findNode('.action-prior')).show();
            $(findNode('.pager-action-prior')).show();
          } else {
            $(findNode('.action-prior')).css('display', 'none');
            $(findNode('.pager-action-prior')).css('display', 'none');
          }
          $(findNode('.pager-control')).show();
          _this.events.triggerAfter('pager.show');
        } else {
          $(findNode('.pager-control')).css('display', 'none');
          _this.events.triggerAfter('pager.hide');
        }
        $(findNode('.pager-stat')).text('Records ' + min + '-' + max + ' of ' + _this.recordsAmount);
        $(findNode('.pager-page-size')).text(_this.limit + ' records per page');

        pagerSetUp = true;

        if (_this.dataGrid.table) {
          _this.dataGrid.table.update();
        }
      }
    }

    _this.reset = function() {
      _this.getTableContainer().html('');
      $(findNode('.pager-control')).hide();
    };

    _this.restoreSelection = function(selection) {
      if (!selection) {
        selection = _this.selection.get();
      }
      for (let i = 0, length = selection.length; i < length; i++) {
        _this.selectRow(selection[i], true);
      }
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.clearSelection = function(disableEvents) {
      _this.selection.clear();
      $(findNode('.action-select-row')).prop('checked', false);
      $(findNode('tr.row-selected')).removeClass('row-selected');
      $(findNode('.action-select-all')).prop('checked', false);
      if (!disableEvents) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    _this.getSelection = function() {
      return _this.selection.get();
    };

    _this.setSelection = function(selection, disableEvents) {
      if (selection) {
        for (let i = 0, length = selection.length; i < length; i++) {
          _this.selectRow(selection[i], true);
          _this.selection.append(selection[i]);
        }
        if (!disableEvents) {
          _this.events.trigger('selectionChanged', _this.selection.get().length);
        }
      } else {
        _this.clearSelection(disableEvents);
      }
    };

    let updatePagerTimer;
    let refreshTimer;

    function doUpdatePager() {
      if (_this.dataSource.doingSelect() || _this.countDataSource.doingSelect()) {
        window.clearTimeout(updatePagerTimer);
        updatePagerTimer = window.setTimeout(function() {
          doUpdatePager();
        }, 300);
      } else {
        _this.countDataSource.selectCount(function(success, result) {
          if (success) {
            _this.recordsAmount = result;
            internalUpdatePager();
            _this.events.triggerAfter('recordsCountRetrieved', result);
          } else {
            $(findNode('.pager-control')).css('display', 'none');
            _this.events.triggerAfter('pager.hide');
          }
        });
      }
    }

    _this.updatePager = function(force) {
      if (!pagerSetUp || force) {
        window.clearTimeout(updatePagerTimer);
        updatePagerTimer = window.setTimeout(function() {
          doUpdatePager();
        }, 300);
      } else {
        internalUpdatePager();
      }
    };

    _this.unSelectRow = function(rowid, multiple) {
      const chk = $(_this.options.selectors.dataTable).find(`input.action-select-row[value="${rowid}"]`);
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find(`tr[data-rowid="${rowid}"]`);
      if (row.length > 0) {
        row.find('.action-select-row').prop('checked', false);
        row.removeClass('row-selected');
      }
      _this.selection.remove(rowid);
      if (!multiple) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    _this.selectRow = function(rowid, multiple) {
      const chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find(`tr[data-rowid="${rowid}"]`);
      if (row.length > 0) {
        row.find('.action-select-row').prop('checked', true);
        row.addClass('row-selected');
        _this.selection.append(rowid);
        if (!multiple) {
          _this.events.trigger('selectionChanged', _this.selection.get().length);
        }
      }
    };

    _this.selectAll = function(checked) {
      $(findNode('.action-select-all')).prop('checked', checked);
      $(findNode('.action-select-row')).each(function() {
        const row = $(this).closest('[data-rowid]');
        const rowid = row.attr('data-rowid');
        if (checked) {
          _this.selectRow(rowid, true);
        } else {
          _this.unSelectRow(rowid, true);
        }
      });
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.isFiltersVisible = function() {
      return $(findNode('.filters-panel')).is(':visible');
    };

    _this.resetPager = function() {
      pagerSetUp = false;
      _this.skip = 0;
    };

    function internalRefresh(deferred, filter, callback) {
      if (deferred) {
        _this.dataSource.selectDeferred(filter, callback);
      } else {
        if (_this.dataSource.doingSelect() || _this.countDataSource.doingSelect()) {
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(function() {
            internalRefresh(false, filter, callback);
          }, 300);
        } else {
          _this.dataSource.select(filter, callback);
        }
      }
    }

    function refresh(deferred, filter, callback, doNotResetPager) {
      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {
        internalRefresh(deferred, filter, function(result, response, request, options) {
          if (result) {
            resolve({
              request: request,
              options: options,
              response: response
            });
          } else {
            reject({
              request: request,
              options: options,
              errorMessage: response
            });
          }
        });
      }).then(function(data) {
        try {
          if (typeof callback == 'function') {
            callback.call(_this, true, data.response, data.request, data.options);
          }
        } catch (error) {
          br.logError('Error: ' + error);
        }
        return data;
      }).catch(function(data) {
        if (typeof callback == 'function') {
          callback.call(_this, false, data.errorMessage, data.request, data.options);
        }
        throw data;
      });
    }

    _this.refreshDeferred = function(filter, callback, doNotResetPager) {
      return refresh(true, filter, callback, doNotResetPager);
    };

    _this.load = _this.refresh = function(filter, callback, doNotResetPager) {
      return refresh(false, filter, callback, doNotResetPager);
    };

    return _this.init();
  }

  window.br.dataBrowser = function(entity, options) {
    return new BrDataBrowser(entity, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  const invokerTemplate = br.compile(`
    <div class="dropdown br-ajax-dropdown">
      <a href="javascript:;" class="br-ex-action-change-menu-menu" style="cursor:pointer;"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a>
    </div>
  `);
  const menuItemTemplateStr = `
    <li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>
  `;
  const menuItemTemplate = br.compile(`
    <li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>
  `);
  const dropDownTemplate = `
    <div class="dropdown br-ajax-dropdown" style="position:absolute;z-index:99999;">
      <a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle br-ex-action-change-menu-menu" style="cursor:pointer;"><span>{{value}}</span> <b class="caret"></b></a>
      <ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul>
    </div>
  `;

  function showDropDownMenu(invoker, items, rowid, menuElement, dataSource, fieldName, options) {
    const dropDown = $(dropDownTemplate);
    const dropDownList = dropDown.find('ul');
    const dropDownMenu = dropDown.find('.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      const value = $(this).attr('data-value');
      let data = {};
      data[fieldName] = value;
      if (options.onClick) {
        options.onClick.call(invoker, dataSource, rowid, data, menuElement);
      } else {
        dataSource.update(rowid, data, function(result, response) {
          if (result) {
            if (options.onUpdate) {
              options.onUpdate.call(invoker, response, menuElement);
            }
          }
        });
      }
    });
    $(document).on('click.dropdown.data-api', function() {
      dropDown.remove();
    });
    dropDownList.html('');
    if (options.allowClear) {
      dropDownList.append(menuItemTemplate({
        id: '',
        name: (options.clearLabel ? options.clearLabel : '--clear--')
      }));
    }
    if (options.onBeforeRenderMenu) {
      options.onBeforeRenderMenu.call(dropDownList, menuItemTemplateStr);
    }
    for (let i = 0, length = items.length; i < length; i++) {
      dropDownList.append(menuItemTemplate({
        id: items[i][options.keyField],
        name: items[i][options.nameField]
      }));
    }
    const invokerItem = invoker.find('.br-ex-action-change-menu-menu');
    const scr = $(window).scrollTop();
    let leftOffset = invoker.offset().left;
    let t = (invokerItem.offset().top + invokerItem.height());
    dropDown.css('top', t + 'px');
    t = t - scr;
    let h = Math.max($(window).height() - t - 20, 100);
    dropDownList.css('max-height', h + 'px');
    $('body').append(dropDown);
    if (options.dropDownPosition === 'left') {
      leftOffset -= dropDownList.width();
    }
    dropDown.css('left', `${leftOffset}px`);
    dropDownMenu.dropdown('toggle');
  }

  function internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    const rowid = el.closest('[data-rowid]').attr('data-rowid');
    const menuElement = invoker.find('span.br-ex-current-value');
    let filter = {
      targetRowid: rowid
    };
    if (options.onSelect) {
      options.onSelect.call(choicesDataSource, filter, rowid, $(el));
    }
    choicesDataSource.select(filter, function(result, response) {
      if (result && (response.length > 0)) {
        showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options);
      }
    });
  }

  function handleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    if (options.onActivate) {
      options.onActivate.call(el, function() {
        internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options);
      });
    } else {
      internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options);
    }
  }

  function setupControl(el, doClick, choicesDataSource, dataSource, fieldName, options) {
    const $this = el;
    if (!$this.data('BrExChangeMenu')) {
      $this.data('BrExChangeMenu', true);
      let value = $this.text().trim();
      if (!options.hideHint) {
        if ((value.length === 0) || (value == '(click to change)')) {
          value = '<span style="color:#AAA;">(click to change)</span>';
        }
      }
      const invoker = $(invokerTemplate({
        value: value
      }));
      if (options.onSetupInvoker) {
        options.onSetupInvoker.call(invoker);
      }
      $this.html(invoker);
      $this.on('click', '.br-ex-action-change-menu-menu', function() {
        handleClick($(this), $this, choicesDataSource, dataSource, fieldName, options);
      });
      if (doClick) {
        handleClick($this.find('.br-ex-action-change-menu-menu'), $this, choicesDataSource, dataSource, fieldName, options);
      }
    }
  }

  function BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options) {
    let settings = Object.assign({
      keyField: 'id',
      nameField: 'name',
      sticky: true,
    }, options);

    if (settings.container) {
      $(settings.container).find(selector).each(function() {
        setupControl($(this), false, choicesDataSource, dataSource, fieldName, settings);
      });
      $(settings.container).on('click', selector, function() {
        setupControl($(this), true, choicesDataSource, dataSource, fieldName, settings);
      });
    } else {
      $(selector).each(function() {
        setupControl($(this), false, choicesDataSource, dataSource, fieldName, settings);
      });

      if (settings.sticky) {
        $(document).on('click', selector, function() {
          setupControl($(this), true, choicesDataSource, dataSource, fieldName, settings);
        });
      }
    }
  }

  window.br.dropDownMenu = function(selector, choicesDataSource, dataSource, fieldName, options) {
    return new BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  window.br.dataHelpers = window.br.dataHelpers || {};

  window.br.dataHelpers.before = function(event, dataControls, callback) {
    for (let i = 0, length = dataControls.length; i < length; i++) {
      dataControls[i].before(event, callback);
    }
  };

  window.br.dataHelpers.on = function(event, dataControls, callback) {
    for (let i = 0, length = dataControls.length; i < length; i++) {
      dataControls[i].on(event, callback);
    }
  };

  function execute(funcToExecute, paramsQueue, extraParams, resolve, reject) {
    let functionsQueue = [];

    while ((functionsQueue.length <= extraParams.workers) && (paramsQueue.length > 0)) {
      functionsQueue.push(funcToExecute(paramsQueue.pop()).then(function() {
        br.stepProgress();
      }));
    }

    Promise.all(functionsQueue).then(function(data) {
      if (paramsQueue.length > 0) {
        execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
      } else {
        br.stepProgress();
        if (!extraParams.doNotHideProgress) {
          br.hideProgress();
        }
        resolve(data);
      }
    }).catch(function(data) {
      if (!extraParams.doNotHideProgressOnError) {
        br.hideProgress();
      }
      reject(data);
    });
  }

  window.br.dataHelpers.execute = function(funcToExecute, funcToGetTotal, funcToGetParams, extraParams) {
    extraParams = Object.assign({
      title: '',
      workers: 10
    }, extraParams);

    return new Promise(function(resolve, reject) {
      br.startProgress(funcToGetTotal(), extraParams.title);
      window.setTimeout(function() {
        let paramsQueue = [];
        let params = funcToGetParams();
        while (params) {
          paramsQueue.push(params);
          params = funcToGetParams();
        }
        execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
      });
    });
  };

  window.br.dataHelpers.load = window.br.dataHelpers.select = function(dataControls, callback) {
    let promises = [];

    for (let i = 0, length = dataControls.length; i < length; i++) {
      (function(dataObject) {
        promises.push(
          new Promise(function(resolve, reject) {
            dataObject.load().then(function(data) {
              resolve({
                dataObject: dataObject,
                data: data
              });
            }).catch(function(data) {
              reject({
                dataObject: dataObject,
                data: data
              });
            });
          })
        );
      })(dataControls[i]);
    }

    return Promise.all(promises).then(function(data) {
      try {
        if (typeof callback == 'function') {
          callback(true, data);
        }
      } catch (error) {
        br.logError('Error: ' + error);
      }
      return data;
    }).catch(function(data) {
      try {
        if (typeof callback == 'function') {
          callback(false, data);
        }
      } catch (error) {
        br.logError('Error: ' + error);
      }
      throw data;
    });
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function($, window) {
  window.br = window.br || {};

  function BrDraggable(ctrl, options) {
    const _this = this;

    let dragObject = null;
    let dragHandler = null;
    let pos_y, pos_x, ofs_x, ofs_y;

    _this.options = Object.assign({
      exclude: ['INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON']
    }, options);

    function setPosition(element, left, top) {
      element.style.marginTop = '0px';
      element.style.marginLeft = '0px';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      element.style.right = '';
      element.style.bottom = '';
    }

    function downHandler(e) {
      if (e.button === 0) {
        let target = e.target || e.srcElement;
        let parent = target.parentNode;

        if (target && (_this.options.exclude.indexOf(target.tagName.toUpperCase()) == -1)) {
          if (!parent || (_this.options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) { // img in a
            dragObject = ctrl;

            let pageX = e.pageX || e.touches[0].pageX;
            let pageY = e.pageY || e.touches[0].pageY;

            ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
            ofs_y = dragObject.getBoundingClientRect().top - dragObject.offsetTop;

            pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
            pos_y = pageY - (dragObject.getBoundingClientRect().top + document.body.scrollTop);

            e.preventDefault();
          }
        }
      }
    }

    function moveHandler(e) {
      if (dragObject !== null) {
        let pageX = e.pageX || e.touches[0].pageX;
        let pageY = e.pageY || e.touches[0].pageY;
        let left = pageX - pos_x - ofs_x - document.body.scrollLeft;
        let top = pageY - pos_y - ofs_y - document.body.scrollTop;
        if (top < 0) {
          top = 0;
        }
        if (top > window.innerHeight) {
          top = window.innerHeight - 40;
        }
        if (left < 0) {
          left = 0;
        }

        setPosition(dragObject, left, top);
        if (_this.options.ondrag) {
          _this.options.ondrag.call(e);
        }
      }
    }

    function upHandler() {
      if (dragObject !== null) {
        dragObject = null;
      }
    }

    if (_this.options.handler) {
      dragHandler = ctrl.querySelector(_this.options.handler);
    } else {
      dragHandler = ctrl;
    }

    if (dragHandler) {
      dragHandler.style.cursor = 'move';
      ctrl.style.position = 'fixed';

      if (dragHandler.__br_draggable) {
        return dragHandler.__br_draggable;
      }

      dragHandler.addEventListener('mousedown', function(event) {
        downHandler(event);
      });

      window.addEventListener('mousemove', function(event) {
        moveHandler(event);
      });

      window.addEventListener('mouseup', function() {
        upHandler();
      });

      dragHandler.addEventListener('touchstart', function(event) {
        downHandler(event);
      });

      window.addEventListener('touchmove', function(event) {
        moveHandler(event);
      });

      window.addEventListener('touchend', function() {
        upHandler();
      });

      dragHandler.__br_draggable = _this;
    }

    return _this;
  }

  window.br.draggable = function(selector, options) {
    let result = [];
    $(selector).each(function() {
      result.push(new BrDraggable(this, options));
    });
    if (result.length === 1) {
      return result[0];
    }
    return result;
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global google */

(function($, window) {
  window.br = window.br || {};

  function BrGoogleMap(selector, options) {
    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) {
      this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      this.events.after(event, callback);
    };

    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function() {
        let paths = this.getPaths();
        let bounds = new google.maps.LatLngBounds();
        paths.forEach(function(path) {
          let points = path.getArray();
          for (let i = 0, length = points.length; i < length; i++) {
            bounds.extend(points[i]);
          }
        });
        return bounds;
      };
    }

    let worldCenter = new google.maps.LatLng(42, 18);
    let singleClickTimeout;

    options = options || {};
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') {
      options.streetViewControl = true;
    }
    if (typeof options.panControl == 'undefined') {
      options.panControl = true;
    }
    if (typeof options.mapTypeControl == 'undefined') {
      options.mapTypeControl = true;
    }
    if (typeof options.zoomControl == 'undefined') {
      options.zoomControl = true;
    }
    if (typeof options.scaleControl == 'undefined') {
      options.scaleControl = true;
    }
    if (typeof options.rotateControl == 'undefined') {
      options.rotateControl = true;
    }
    if (typeof options.mapType == 'undefined') {
      options.mapType = google.maps.MapTypeId.ROADMAP;
    }

    _this.mapOptions = {
      zoom: options.zoom,
      maxZoom: options.maxZoom,
      center: options.mapCenter,
      mapTypeId: options.mapType,
      mapTypeControl: options.mapTypeControl,
      panControl: options.panControl,
      zoomControl: options.zoomControl,
      scaleControl: options.scaleControl,
      streetViewControl: options.streetViewControl,
      rotateControl: options.rotateControl
    };

    if (options.maxZoom) {
      _this.mapOptions.maxZoom = options.maxZoom;
    }

    _this.mapSelector = selector;
    _this.mapContainer = $(_this.mapSelector)[0];
    _this.map = new google.maps.Map(_this.mapContainer, _this.mapOptions);
    _this.directionsService = new google.maps.DirectionsService();
    _this.directionsDisplay = new google.maps.DirectionsRenderer();
    _this.geocoder = new google.maps.Geocoder();
    _this.weatherLayer = null;
    _this.travelMode = google.maps.DirectionsTravelMode.DRIVING;

    _this.markers = [];
    _this.polygons = [];
    _this.layers = [];

    google.maps.event.addListener(_this.map, 'click', function(event) {
      _this.events.trigger('click', event);
      (function(zoomLevel, event0) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == _this.map.getZoom()) {
            _this.events.trigger('singleclick', event0);
          }
        }, 300);
      })(_this.map.getZoom(), event);
    });

    function computeRouteParams(result) {
      let distance = 0;
      let duration = 0;
      let myroute = result.routes[0];
      myroute.legs.forEach(function(item) {
        distance += item.distance.value;
        duration += item.duration.value;
      });
      return {
        distance: distance,
        duration: duration
      };
    }

    google.maps.event.addListener(_this.directionsDisplay, 'directions_changed', function() {
      let routeParams = computeRouteParams(_this.directionsDisplay.directions);
      routeParams.directions = _this.directionsDisplay.directions;
      _this.events.trigger('directions_changed', routeParams);
    });
    google.maps.event.addListener(_this.map, 'dblclick', function(event) {
      window.clearTimeout(singleClickTimeout);
      _this.events.trigger('dblclick', event);
    });
    google.maps.event.addListener(_this.map, 'rightclick', function(event) {
      _this.events.trigger('rightclick', event);
    });
    google.maps.event.addListener(_this.map, 'bounds_changed', function(event) {
      _this.events.trigger('bounds_changed', event);
    });
    google.maps.event.addListener(_this.map, 'center_changed', function(event) {
      _this.events.trigger('center_changed', event);
    });
    google.maps.event.addListener(_this.map, 'place_changed', function(event) {
      _this.events.trigger('place_changed', event);
    });

    _this.identifyLocation = function(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          _this.map.setCenter(pos);
          _this.map.setZoom(15);
          if (typeof callback == 'function') {
            callback.call(_this, true, pos);
          }
        }, function() {
          if (typeof callback == 'function') {
            callback.call(_this, false);
          }
        });
      } else {
        if (typeof callback == 'function') {
          callback.call(_this, false);
        }
      }
    };

    _this.isWeatherVisible = function() {
      return (_this.weatherLayer !== null);
    };

    _this.showWeather = function(show) {
      if (show && !_this.weatherVisible()) {
        _this.weatherLayer = new google.maps.weather.WeatherLayer();
        _this.weatherLayer.setMap(_this.map);
      } else
      if (!show && _this.weatherVisible()) {
        _this.weatherLayer.setMap(null);
        _this.weatherLayer = null;
      }
    };

    _this.clearPoi = function() {
      _this.removePolygons();
      _this.removeMarkers();
      _this.removeLayers();
    };

    _this.setMapType = function(value) {
      switch (value) {
      case 'r':
        _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        break;
      case 's':
        _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
      case 't':
        _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
      case 'h':
        _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
      }
    };

    _this.setTravelMode = function(value) {
      switch (value) {
      case 'd':
        _this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
        break;
      case 'b':
        _this.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
        break;
      case 'w':
        _this.travelMode = google.maps.DirectionsTravelMode.WALKING;
        break;
      }
    };

    _this.setZoom = function(zoom) {
      _this.map.setZoom(zoom);
    };

    _this.world = function() {
      _this.map.setCenter(worldCenter);
      _this.map.setZoom(3);
    };

    _this.pan = function(zoom) {
      function processPoints(geometry, callback, thisArg) {
        if (geometry instanceof google.maps.LatLng) {
          callback.call(thisArg, geometry);
        } else
        if (geometry instanceof google.maps.Data.Point) {
          callback.call(thisArg, geometry.get());
        } else {
          geometry.getArray().forEach(function(g) {
            processPoints(g, callback, thisArg);
          });
        }
      }
      let bounds = new google.maps.LatLngBounds();
      _this.markers.forEach(function(marker) {
        processPoints(new google.maps.LatLng(marker.position.lat(), marker.position.lng()), bounds.extend, bounds);
      });
      _this.polygons.forEach(function(polygon) {
        processPoints(polygon.latLngs, bounds.extend, bounds);
      });
      _this.map.data.forEach(function(feature) {
        processPoints(feature.getGeometry(), bounds.extend, bounds);
      });
      _this.layers.forEach(function(layer) {
        layer.forEach(function(feature) {
          processPoints(feature.getGeometry(), bounds.extend, bounds);
        });
      });
      _this.map.fitBounds(bounds);
      if (zoom) {
        window.setTimeout(function() {
          _this.setZoom(zoom);
        });
      }
    };

    _this.gotoAddress = function(address, callback) {
      _this.findAddress(address, function(result, points) {
        if (result) {
          let pos = new google.maps.LatLng(points[0].lat, points[0].lng);
          _this.map.setCenter(pos);
          _this.map.setZoom(17);
          if (typeof callback == 'function') {
            callback.call(_this);
          }
        }
      });
    };

    _this.findAddress = function(address, callback) {
      _this.geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let points = results.map(function(item) {
            return {
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng(),
              name: item.formatted_address,
              raw: item
            };
          });
          if (typeof callback == 'function') {
            callback.call(_this, points.length > 0, points);
          }
        } else {
          if (typeof callback == 'function') {
            callback.call(_this, false);
          }
        }
      });
    };

    _this.clearRoute = function() {
      _this.directionsDisplay.setMap(null);
    };

    _this.drawRoute = function(coordinates, callback) {
      let origin = null;
      let destination = null;
      let waypoints = [];
      for (let latLng of coordinates) {
        if (origin === null) {
          origin = latLng;
        } else
        if (destination === null) {
          destination = latLng;
        } else {
          waypoints.push({
            location: destination,
            stopover: true
          });
          destination = latLng;
        }
      }
      if ((origin !== null) && (destination !== null)) {
        let request = {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: _this.travelMode
        };
        _this.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            _this.directionsDisplay.setMap(_this.map);
            _this.directionsDisplay.setDirections(response);
            let routeParams = computeRouteParams(_this.directionsDisplay.directions);
            routeParams.directions = _this.directionsDisplay.directions;
            if (callback) {
              callback.call(this, true, routeParams);
            }
          } else {
            if (callback) {
              callback.call(this, false);
            }
          }
        });
      } else {
        if (callback) {
          callback.call(this, false);
        }
      }
    };

    _this.drawRouteByTag = function(tag, callback) {
      let markers = _this.getMarkersByTag(tag);
      let coord = markers.map(function(item) {
        return new google.maps.LatLng(item.position.lat(), item.position.lng());
      });
      _this.drawRoute(coord, callback);
    };

    _this.pointToFeature = function(lng, lat, properties) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: Object.assign({
          latitude: lat,
          longitude: lng,
          "marker-size": "medium",
          "marker-symbol": "triangle"
        }, properties)
      };
    };

    // layers

    _this.addLayer = function(geoString, params) {
      params = params || {};

      let geoJson;
      if (typeof geoString == 'string') {
        geoJson = JSON.parse(geoString);
      } else {
        geoJson = geoString;
      }

      let getJsonStyle = Object.assign({
        strokeColor: '#999',
        strokeOpacity: 1,
        strokeWeight: 0.5
      }, params.style);

      let getJsonCustom = {};

      getJsonCustom.id = params.id;
      getJsonCustom.data = params.data;
      getJsonCustom.tag = params.tag;

      let geoJsonLayer = new google.maps.Data();
      geoJsonLayer.addGeoJson(geoJson);
      geoJsonLayer.setMap(_this.map);
      geoJsonLayer.setStyle(getJsonStyle);
      geoJsonLayer.custom = getJsonCustom;
      geoJsonLayer.addListener('click', function(event) {
        _this.events.trigger('layer.click', geoJsonLayer, event);
      });

      _this.layers.push(geoJsonLayer);
      return geoJsonLayer;
    };

    _this.getLayer = function(id) {
      let result = _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      if (result.length > 0) {
        return result[0];
      }
    };

    _this.layerExists = function(id) {
      let result = _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      return result.length > 0;
    };

    _this.removeLayer = function(id) {
      _this.layers = _this.layers.filter(function(item) {
        if (item.custom && (item.custom.id == id)) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    _this.removeLayers = function(tag) {
      _this.layers = _this.layers.filter(function(item) {
        if (!tag || (item.custom && (item.custom.tag == tag))) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    // markers

    _this.addMarker = function(lat, lng, params, tag, custom) {
      let inputParams = params || {};
      let markerParams = {};
      markerParams.icon = inputParams.icon || null;
      markerParams.draggable = inputParams.draggable || false;
      let latLng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: markerParams.icon,
        draggable: markerParams.draggable
      });
      marker.custom = custom || {};
      marker.tag = tag;
      _this.markers.push(marker);
      google.maps.event.addListener(marker, 'click', function(event) {
        _this.events.trigger('marker.click', marker, event);
      });
      if (markerParams.draggable) {
        google.maps.event.addListener(marker, 'dragend', function(event) {
          _this.events.trigger('marker.dragend', marker, event);
        });
      }
      return marker;
    };

    _this.getMarkersByTag = function(tag) {
      return _this.markers.filter(function(marker) {
        return marker.tag == tag;
      });
    };

    _this.getMarkersCount = function() {
      return _this.markers.length;
    };

    _this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    _this.removeMarkers = function(tag) {
      _this.markers.forEach(function(marker) {
        if (!tag || (marker.tag == tag)) {
          marker.setMap(null);
        }
      });
      _this.markers = _this.markers.filter(function(marker) {
        return !!marker.getMap();
      });
    };

    // polygons

    _this.addGeoJSONPolygon = function(geoData, params, tag, custom) {
      function arrayMap(array, callback) {
        let original_callback_params = Array.prototype.slice.call(arguments, 2);
        let array_return = [];
        let array_length = array.length;
        if (Array.prototype.map && (array.map === Array.prototype.map)) {
          array_return = Array.prototype.map.call(array, function(item) {
            const callback_params = original_callback_params;
            callback_params.splice(0, 0, item);
            return callback.apply(this, callback_params);
          });
        } else {
          for (let i = 0; i < array_length; i++) {
            const callback_params = original_callback_params;
            callback_params.splice(0, 0, array[i]);
            array_return.push(callback.apply(this, callback_params));
          }
        }
        return array_return;
      }

      function arrayFlat(array) {
        let result = [];
        for (let value of array) {
          result = result.concat(value);
        }
        return result;
      }

      function coordsToLatLngs(coords, useGeoJSON) {
        let first_coord = coords[0];
        let second_coord = coords[1];
        if (useGeoJSON) {
          first_coord = coords[1];
          second_coord = coords[0];
        }
        return new google.maps.LatLng(first_coord, second_coord);
      }

      function arrayToLatLng(coords, useGeoJSON) {
        for (let i = 0; i < coords.length; i++) {
          if (coords[i].length > 0 && typeof(coords[i][0]) == "object") {
            coords[i] = arrayToLatLng(coords[i], useGeoJSON);
          } else {
            coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
          }
        }
        return coords;
      }
      params = params || {};
      let polygonParams = {};
      let coordinates = JSON.parse(JSON.stringify(geoData));
      polygonParams.paths = arrayFlat(arrayMap(coordinates, arrayToLatLng, true));
      polygonParams.strokeColor = params.strokeColor || '#999';
      polygonParams.strokeOpacity = params.strokeOpacity || 1;
      polygonParams.strokeWeight = params.strokeWeight || 0.5;
      polygonParams.fillColor = params.fillColor;
      polygonParams.fillOpacity = polygonParams.fillColor ? (params.fillOpacity == undefined ? 0.3 : params.fillOpacity) : 0;
      polygonParams.map = _this.map;
      let polygon = new google.maps.Polygon(polygonParams);
      polygon.custom = custom;
      polygon.tag = tag;
      _this.polygons.push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    _this.getPolygonsByTag = function(tag) {
      return _this.polygons.filter(function(polygon) {
        return polygon.tag == tag;
      });
    };

    _this.getPolygonsCount = function() {
      return _this.polygons.length;
    };

    _this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    _this.removePolygons = function(tag) {
      _this.polygons.forEach(function(polygon) {
        if (!tag || (polygon.tag == tag)) {
          polygon.setMap(null);
        }
      });
      _this.polygons = _this.polygons.filter(function(polygon) {
        return !!polygon.getMap();
      });
    };

    // init

    if (_this.weather) {
      _this.showWeather();
    }

    return _this;
  }

  window.br.googleMap = function(selector, options) {
    return new BrGoogleMap(selector, options);
  };
})(jQuery, window);
/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

(function(window) {
  window.br = window.br || {};

  function BrEventBus(endpointUrl) {
    const _this = this;

    _this.events = br.eventQueue(_this);
    _this.subscriptions = br.eventQueue(_this);
    _this.spaces = br.eventQueue(_this);

    const debugMode = false;
    const reconnectTimeout = 1000;
    const isValid = (endpointUrl && (typeof WebSocket != 'undefined'));

    let webSocket;
    let reconnectsCounter = 0;
    let reconnectTimer;
    let successfulConnections = 0;
    let __clientUID;
    let __userInfo;

    function reconnect() {
      window.clearTimeout(reconnectTimer);
      let timeout = reconnectsCounter * reconnectTimeout;
      if (debugMode && (timeout > 0)) {
        br.log((successfulConnections > 0 ? 're' : '') + 'connecting in ' + timeout + 'ms');
      }
      reconnectTimer = window.setTimeout(function() {
        if (debugMode) {
          br.log((successfulConnections > 0 ? 're' : '') + 'connecting');
        }
        connect();
      }, timeout);
    }

    function subscribe() {
      if (webSocket && (webSocket.readyState == 1) && (_this.subscriptions.getEvents().length > 0)) {
        let message = {
          action: 'eventBus.subscribe',
          data: {
            events: _this.subscriptions.getEvents(),
            spaces: _this.spaces.getEvents(),
            userInfo: __userInfo
          }
        };
        try {
          webSocket.send(JSON.stringify(message));
        } catch (error) {
          _this.events.trigger('error', error);
        }
      }
    }

    function handleConnectionError(error) {
      if (webSocket) {
        try {
          webSocket.onopen = null;
          webSocket.onmessage = null;
          webSocket.onclose = null;
          webSocket.onerror = null;
          if (webSocket.readyState == 1) {
            webSocket.close();
          }
        } catch (exception) {
          //
        }
        webSocket = null;
      }
      _this.setClientUID(undefined);
      _this.events.trigger('error', error);
      _this.events.trigger('disconnected');
      reconnectsCounter++;
      if (reconnectsCounter > 60) {
        reconnectsCounter = 60;
      }
      reconnect();
    }

    const connectionClosed = function(event) {
      if (debugMode) {
        br.log(event);
      }
      handleConnectionError('Connection closed');
    };

    function connect() {
      try {
        webSocket = new WebSocket(endpointUrl);
        webSocket.onopen = function(event) {
          if (debugMode) {
            br.log(event);
          }
          _this.events.trigger('connected');
          reconnectsCounter = 0;
          successfulConnections++;
          subscribe();
        };
        webSocket.onmessage = function(event) {
          if (debugMode) {
            br.log(event);
          }
          try {
            let message = $.parseJSON(event.data);
            switch (message.action) {
            case 'eventBus.registered':
              _this.setClientUID(message.clientUID);
              break;
            case 'eventBus.usersList':
              _this.spaces.trigger(message.spaceName, message.data);
              break;
            default:
              if (!message.clientUID || (_this.getClientUID() != message.clientUID)) {
                _this.subscriptions.trigger(message.action, message.data);
              }
            }
          } catch (exception) {
            br.log(exception);
          }
        };
        webSocket.onclose = function(event) {
          connectionClosed(event);
        };
        webSocket.onerror = function(event) {
          connectionClosed(event);
        };
      } catch (exception) {
        if (debugMode) {
          br.log('exception');
          br.log(exception);
        }
        handleConnectionError(exception);
      }
    }

    _this.isValid = function() {
      return isValid;
    };

    _this.setClientUID = function(clientUID) {
      __clientUID = clientUID;
      if (__clientUID) {
        _this.events.trigger('registered', __clientUID);
        return;
      }
      _this.events.trigger('unregistered');
    };

    _this.getClientUID = function() {
      return __clientUID;
    };

    _this.on = function(event, callback) {
      if (webSocket && (webSocket.readyState == 1) && (event == 'connected')) {
        callback();
        return;
      }
      if ((event == 'registered') && __clientUID) {
        callback(__clientUID);
        return;
      }
      _this.events.on(event, callback);
    };

    _this.off = function(event) {
      _this.events.off(event);
    };

    _this.offAll = function() {
      _this.events = br.eventQueue(_this);
    };

    _this.subscribe = function(event, callback) {
      _this.subscriptions.on(event, callback);
      subscribe();
    };

    _this.unsubscribe = function(event) {
      _this.subscriptions.off(event);
    };

    _this.unsubscribeAll = function() {
      _this.subscriptions.subscribers = {};
    };

    _this.joinSpace = function(spaceName, userInfo, callback) {
      __userInfo = userInfo;
      _this.spaces.on(spaceName, callback);
      subscribe();
    };

    window.setTimeout(function() {
      if (_this.isValid()) {
        reconnect();
      } else {
        _this.events.trigger('error', 'Not configured');
      }
    }, 100);

    return this;
  }

  window.br.eventBus = function(endpointUrl) {
    return new BrEventBus(endpointUrl);
  };
})(window);