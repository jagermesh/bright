/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/* jshint ignore:start */

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Handlebars=e():t.Handlebars=e()}(this,function(){return i={},r.m=s=[function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(2)),n=s(r(35)),a=r(36),o=r(41),c=s(r(42)),l=s(r(39)),h=s(r(34)),p=i.default.create;function u(){var r=p();return r.compile=function(t,e){return o.compile(t,e,r)},r.precompile=function(t,e){return o.precompile(t,e,r)},r.AST=n.default,r.Compiler=o.Compiler,r.JavaScriptCompiler=c.default,r.Parser=a.parser,r.parse=a.parse,r}var f=u();f.create=u,h.default(f),f.Visitor=l.default,f.default=f,e.default=f,t.exports=e.default},function(t,e){"use strict";e.default=function(t){return t&&t.__esModule?t:{default:t}},e.__esModule=!0},function(t,e,r){"use strict";var s=r(3).default,i=r(1).default;e.__esModule=!0;var n=s(r(4)),a=i(r(21)),o=i(r(6)),c=s(r(5)),l=s(r(22)),h=i(r(34));function p(){var e=new n.HandlebarsEnvironment;return c.extend(e,n),e.SafeString=a.default,e.Exception=o.default,e.Utils=c,e.escapeExpression=c.escapeExpression,e.VM=l,e.template=function(t){return l.template(t,e)},e}var u=p();u.create=p,h.default(u),u.default=u,e.default=u,t.exports=e.default},function(t,e){"use strict";e.default=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e},e.__esModule=!0},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.HandlebarsEnvironment=h;var i=r(5),n=s(r(6)),a=r(10),o=r(18),c=s(r(20));e.VERSION="4.1.2";e.COMPILER_REVISION=7;e.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};var l="[object Object]";function h(t,e,r){this.helpers=t||{},this.partials=e||{},this.decorators=r||{},a.registerDefaultHelpers(this),o.registerDefaultDecorators(this)}h.prototype={constructor:h,logger:c.default,log:c.default.log,registerHelper:function(t,e){if(i.toString.call(t)===l){if(e)throw new n.default("Arg not supported with multiple helpers");i.extend(this.helpers,t)}else this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){if(i.toString.call(t)===l)i.extend(this.partials,t);else{if(void 0===e)throw new n.default('Attempting to register a partial called "'+t+'" as undefined');this.partials[t]=e}},unregisterPartial:function(t){delete this.partials[t]},registerDecorator:function(t,e){if(i.toString.call(t)===l){if(e)throw new n.default("Arg not supported with multiple decorators");i.extend(this.decorators,t)}else this.decorators[t]=e},unregisterDecorator:function(t){delete this.decorators[t]}};var p=c.default.log;e.log=p,e.createFrame=i.createFrame,e.logger=c.default},function(t,e){"use strict";e.__esModule=!0,e.extend=a,e.indexOf=function(t,e){for(var r=0,s=t.length;r<s;r++)if(t[r]===e)return r;return-1},e.escapeExpression=function(t){if("string"!=typeof t){if(t&&t.toHTML)return t.toHTML();if(null==t)return"";if(!t)return t+"";t=""+t}return i.test(t)?t.replace(s,n):t},e.isEmpty=function(t){return!t&&0!==t||!(!l(t)||0!==t.length)},e.createFrame=function(t){var e=a({},t);return e._parent=t,e},e.blockParams=function(t,e){return t.path=e,t},e.appendContextPath=function(t,e){return(t?t+".":"")+e};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},s=/[&<>"'`=]/g,i=/[&<>"'`=]/;function n(t){return r[t]}function a(t){for(var e=1;e<arguments.length;e++)for(var r in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],r)&&(t[r]=arguments[e][r]);return t}var o=Object.prototype.toString;e.toString=o;var c=function(t){return"function"==typeof t};c(/x/)&&(e.isFunction=c=function(t){return"function"==typeof t&&"[object Function]"===o.call(t)}),e.isFunction=c;var l=Array.isArray||function(t){return!(!t||"object"!=typeof t)&&"[object Array]"===o.call(t)};e.isArray=l},function(t,e,r){"use strict";var o=r(7).default;e.__esModule=!0;var c=["description","fileName","lineNumber","message","name","number","stack"];function l(t,e){var r=e&&e.loc,s=void 0,i=void 0;r&&(t+=" - "+(s=r.start.line)+":"+(i=r.start.column));for(var n=Error.prototype.constructor.call(this,t),a=0;a<c.length;a++)this[c[a]]=n[c[a]];Error.captureStackTrace&&Error.captureStackTrace(this,l);try{r&&(this.lineNumber=s,o?Object.defineProperty(this,"column",{value:i,enumerable:!0}):this.column=i)}catch(t){}}l.prototype=new Error,e.default=l,t.exports=e.default},function(t,e,r){t.exports={default:r(8),__esModule:!0}},function(t,e,r){var s=r(9);t.exports=function(t,e,r){return s.setDesc(t,e,r)}},function(t,e){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.registerDefaultHelpers=function(t){i.default(t),n.default(t),a.default(t),o.default(t),c.default(t),l.default(t),h.default(t)};var i=s(r(11)),n=s(r(12)),a=s(r(13)),o=s(r(14)),c=s(r(15)),l=s(r(16)),h=s(r(17))},function(t,e,r){"use strict";e.__esModule=!0;var a=r(5);e.default=function(n){n.registerHelper("blockHelperMissing",function(t,e){var r=e.inverse,s=e.fn;if(!0===t)return s(this);if(!1===t||null==t)return r(this);if(a.isArray(t))return 0<t.length?(e.ids&&(e.ids=[e.name]),n.helpers.each(t,e)):r(this);if(e.data&&e.ids){var i=a.createFrame(e.data);i.contextPath=a.appendContextPath(e.data.contextPath,e.name),e={data:i}}return s(t,e)})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var u=r(5),f=s(r(6));e.default=function(t){t.registerHelper("each",function(s,t){if(!t)throw new f.default("Must pass iterator to #each");var i=t.fn,e=t.inverse,r=0,n="",a=void 0,o=void 0;function c(t,e,r){a&&(a.key=t,a.index=e,a.first=0===e,a.last=!!r,o&&(a.contextPath=o+t)),n+=i(s[t],{data:a,blockParams:u.blockParams([s[t],t],[o+t,null])})}if(t.data&&t.ids&&(o=u.appendContextPath(t.data.contextPath,t.ids[0])+"."),u.isFunction(s)&&(s=s.call(this)),t.data&&(a=u.createFrame(t.data)),s&&"object"==typeof s)if(u.isArray(s))for(var l=s.length;r<l;r++)r in s&&c(r,r,r===s.length-1);else{var h=void 0;for(var p in s)s.hasOwnProperty(p)&&(void 0!==h&&c(h,r-1),h=p,r++);void 0!==h&&c(h,r-1,!0)}return 0===r&&(n=e(this)),n})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(6));e.default=function(t){t.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new i.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5);e.default=function(r){r.registerHelper("if",function(t,e){return s.isFunction(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||s.isEmpty(t)?e.inverse(this):e.fn(this)}),r.registerHelper("unless",function(t,e){return r.helpers.if.call(this,t,{fn:e.inverse,inverse:e.fn,hash:e.hash})})},t.exports=e.default},function(t,e){"use strict";e.__esModule=!0,e.default=function(i){i.registerHelper("log",function(){for(var t=[void 0],e=arguments[arguments.length-1],r=0;r<arguments.length-1;r++)t.push(arguments[r]);var s=1;null!=e.hash.level?s=e.hash.level:e.data&&null!=e.data.level&&(s=e.data.level),t[0]=s,i.log.apply(i,t)})},t.exports=e.default},function(t,e){"use strict";e.__esModule=!0,e.default=function(t){t.registerHelper("lookup",function(t,e){return t?"constructor"!==e||t.propertyIsEnumerable(e)?t[e]:void 0:t})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var i=r(5);e.default=function(t){t.registerHelper("with",function(t,e){i.isFunction(t)&&(t=t.call(this));var r=e.fn;if(i.isEmpty(t))return e.inverse(this);var s=e.data;return e.data&&e.ids&&((s=i.createFrame(e.data)).contextPath=i.appendContextPath(e.data.contextPath,e.ids[0])),r(t,{data:s,blockParams:i.blockParams([t],[s&&s.contextPath])})})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.registerDefaultDecorators=function(t){i.default(t)};var i=s(r(19))},function(t,e,r){"use strict";e.__esModule=!0;var o=r(5);e.default=function(t){t.registerDecorator("inline",function(i,n,a,t){var e=i;return n.partials||(n.partials={},e=function(t,e){var r=a.partials;a.partials=o.extend({},r,n.partials);var s=i(t,e);return a.partials=r,s}),n.partials[t.args[0]]=t.fn,e})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5),n={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(t){if("string"==typeof t){var e=s.indexOf(n.methodMap,t.toLowerCase());t=0<=e?e:parseInt(t,10)}return t},log:function(t){if(t=n.lookupLevel(t),"undefined"!=typeof console&&n.lookupLevel(n.level)<=t){var e=n.methodMap[t];console[e]||(e="log");for(var r=arguments.length,s=Array(1<r?r-1:0),i=1;i<r;i++)s[i-1]=arguments[i];console[e].apply(console,s)}}};e.default=n,t.exports=e.default},function(t,e){"use strict";function r(t){this.string=t}e.__esModule=!0,r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},e.default=r,t.exports=e.default},function(t,e,r){"use strict";var s=r(23).default,i=r(3).default,n=r(1).default;e.__esModule=!0,e.checkRevision=function(t){var e=t&&t[0]||1,r=u.COMPILER_REVISION;if(e!==r){if(e<r){var s=u.REVISION_CHANGES[r],i=u.REVISION_CHANGES[e];throw new p.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+s+") or downgrade your runtime to an older version ("+i+").")}throw new p.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}},e.template=function(o,c){if(!c)throw new p.default("No environment passed to template");if(!o||!o.main)throw new p.default("Unknown template object: "+typeof o);o.main.decorator=o.main_d,c.VM.checkRevision(o.compiler);var a={strict:function(t,e){if(!(e in t))throw new p.default('"'+e+'" not defined in '+t);return t[e]},lookup:function(t,e){for(var r=t.length,s=0;s<r;s++)if(t[s]&&null!=t[s][e])return t[s][e]},lambda:function(t,e){return"function"==typeof t?t.call(e):t},escapeExpression:h.escapeExpression,invokePartial:function(t,e,r){r.hash&&(e=h.extend({},e,r.hash),r.ids&&(r.ids[0]=!0)),t=c.VM.resolvePartial.call(this,t,e,r);var s=c.VM.invokePartial.call(this,t,e,r);if(null==s&&c.compile&&(r.partials[r.name]=c.compile(t,o.compilerOptions,c),s=r.partials[r.name](e,r)),null==s)throw new p.default("The partial "+r.name+" could not be compiled when running in runtime-only mode");if(r.indent){for(var i=s.split("\n"),n=0,a=i.length;n<a&&(i[n]||n+1!==a);n++)i[n]=r.indent+i[n];s=i.join("\n")}return s},fn:function(t){var e=o[t];return e.decorator=o[t+"_d"],e},programs:[],program:function(t,e,r,s,i){var n=this.programs[t],a=this.fn(t);return n=e||i||s||r?f(this,t,a,e,r,s,i):n||(this.programs[t]=f(this,t,a))},data:function(t,e){for(;t&&e--;)t=t._parent;return t},merge:function(t,e){var r=t||e;return t&&e&&t!==e&&(r=h.extend({},e,t)),r},nullContext:s({}),noop:c.VM.noop,compilerInfo:o.compiler};function l(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=e.data;l._setup(e),!e.partial&&o.useData&&(r=function(t,e){e&&"root"in e||((e=e?u.createFrame(e):{}).root=t);return e}(t,r));var s=void 0,i=o.useBlockParams?[]:void 0;function n(t){return""+o.main(a,t,a.helpers,a.partials,r,i,s)}return o.useDepths&&(s=e.depths?t!=e.depths[0]?[t].concat(e.depths):e.depths:[t]),(n=d(o.main,n,a,e.depths||[],r,i))(t,e)}return l.isTop=!0,l._setup=function(t){t.partial?(a.helpers=t.helpers,a.partials=t.partials,a.decorators=t.decorators):(a.helpers=a.merge(t.helpers,c.helpers),o.usePartial&&(a.partials=a.merge(t.partials,c.partials)),(o.usePartial||o.useDecorators)&&(a.decorators=a.merge(t.decorators,c.decorators)))},l._child=function(t,e,r,s){if(o.useBlockParams&&!r)throw new p.default("must pass block params");if(o.useDepths&&!s)throw new p.default("must pass parent depths");return f(a,t,o[t],e,0,r,s)},l},e.wrapProgram=f,e.resolvePartial=function(t,e,r){t?t.call||r.name||(r.name=t,t=r.partials[t]):t="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name];return t},e.invokePartial=function(t,e,r){var i=r.data&&r.data["partial-block"];r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var n=void 0;r.fn&&r.fn!==a&&function(){r.data=u.createFrame(r.data);var s=r.fn;n=r.data["partial-block"]=function(t,e){var r=arguments.length<=1||void 0===e?{}:e;return r.data=u.createFrame(r.data),r.data["partial-block"]=i,s(t,r)},s.partials&&(r.partials=h.extend({},r.partials,s.partials))}();void 0===t&&n&&(t=n);{if(void 0===t)throw new p.default("The partial "+r.name+" could not be found");if(t instanceof Function)return t(e,r)}},e.noop=a;var h=i(r(5)),p=n(r(6)),u=r(4);function f(s,t,i,n,e,a,o){function r(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=o;return!o||t==o[0]||t===s.nullContext&&null===o[0]||(r=[t].concat(o)),i(s,t,s.helpers,s.partials,e.data||n,a&&[e.blockParams].concat(a),r)}return(r=d(i,r,s,o,n,a)).program=t,r.depth=o?o.length:0,r.blockParams=e||0,r}function a(){return""}function d(t,e,r,s,i,n){if(t.decorator){var a={};e=t.decorator(e,a,r,s&&s[0],i,n,s),h.extend(e,a)}return e}},function(t,e,r){t.exports={default:r(24),__esModule:!0}},function(t,e,r){r(25),t.exports=r(30).Object.seal},function(t,e,r){var s=r(26);r(27)("seal",function(e){return function(t){return e&&s(t)?e(t):t}})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,r){var i=r(28),n=r(30),a=r(33);t.exports=function(t,e){var r=(n.Object||{})[t]||Object[t],s={};s[t]=e(r),i(i.S+i.F*a(function(){r(1)}),"Object",s)}},function(t,e,r){var d=r(29),m=r(30),g=r(31),v="prototype",y=function(t,e,r){var s,i,n,a=t&y.F,o=t&y.G,c=t&y.S,l=t&y.P,h=t&y.B,p=t&y.W,u=o?m:m[e]||(m[e]={}),f=o?d:c?d[e]:(d[e]||{})[v];for(s in o&&(r=e),r)(i=!a&&f&&s in f)&&s in u||(n=i?f[s]:r[s],u[s]=o&&"function"!=typeof f[s]?r[s]:h&&i?g(n,d):p&&f[s]==n?function(e){function t(t){return this instanceof e?new e(t):e(t)}return t[v]=e[v],t}(n):l&&"function"==typeof n?g(Function.call,n):n,l&&((u[v]||(u[v]={}))[s]=n))};y.F=1,y.G=2,y.S=4,y.P=8,y.B=16,y.W=32,t.exports=y},function(t,e){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var r=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=r)},function(t,e,r){var n=r(32);t.exports=function(s,i,t){if(n(s),void 0===i)return s;switch(t){case 1:return function(t){return s.call(i,t)};case 2:return function(t,e){return s.call(i,t,e)};case 3:return function(t,e,r){return s.call(i,t,e,r)}}return function(){return s.apply(i,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){(function(s){"use strict";e.__esModule=!0,e.default=function(t){var e=void 0!==s?s:window,r=e.Handlebars;t.noConflict=function(){return e.Handlebars===t&&(e.Handlebars=r),t}},t.exports=e.default}).call(e,function(){return this}())},function(t,e){"use strict";e.__esModule=!0;var r={helpers:{helperExpression:function(t){return"SubExpression"===t.type||("MustacheStatement"===t.type||"BlockStatement"===t.type)&&!!(t.params&&t.params.length||t.hash)},scopedId:function(t){return/^\.|this\b/.test(t.original)},simpleId:function(t){return 1===t.parts.length&&!r.helpers.scopedId(t)&&!t.depth}}};e.default=r,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default,i=r(3).default;e.__esModule=!0,e.parse=function(t,e){return"Program"!==t.type?((n.default.yy=l).locInfo=function(t){return new l.SourceLocation(e&&e.srcName,t)},new a.default(e).accept(n.default.parse(t))):t};var n=s(r(37)),a=s(r(38)),o=i(r(40)),c=r(5);e.parser=n.default;var l={};c.extend(l,o)},function(t,e){"use strict";e.__esModule=!0;var r,s,i=(s={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,r=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),r.length-1&&(this.yylineno-=r.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:r?(r.length===s.length?this.yylloc.first_column:0)+s[s.length-r.length].length-r[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(20<t.length?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(20<t.length?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;var t,e,r,s,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var n=this._currentRules(),a=0;a<n.length&&(!(r=this._input.match(this.rules[n[a]]))||e&&!(r[0].length>e[0].length)||(e=r,s=a,this.options.flex));a++);return e?((i=e[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,n[s],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t||void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return void 0!==t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)},options:{},performAction:function(t,r,e,s){function i(t,e){return r.yytext=r.yytext.substring(t,r.yyleng-e+t)}switch(e){case 0:if("\\\\"===r.yytext.slice(-2)?(i(0,1),this.begin("mu")):"\\"===r.yytext.slice(-1)?(i(0,1),this.begin("emu")):this.begin("mu"),r.yytext)return 15;break;case 1:return 15;case 2:return this.popState(),15;case 3:return this.begin("raw"),15;case 4:return this.popState(),"raw"===this.conditionStack[this.conditionStack.length-1]?15:(i(5,9),"END_RAW_BLOCK");case 5:return 15;case 6:return this.popState(),14;case 7:return 65;case 8:return 68;case 9:return 19;case 10:return this.popState(),this.begin("raw"),23;case 11:return 55;case 12:return 60;case 13:return 29;case 14:return 47;case 15:case 16:return this.popState(),44;case 17:return 34;case 18:return 39;case 19:return 51;case 20:return 48;case 21:this.unput(r.yytext),this.popState(),this.begin("com");break;case 22:return this.popState(),14;case 23:return 48;case 24:return 73;case 25:case 26:return 72;case 27:return 87;case 28:break;case 29:return this.popState(),54;case 30:return this.popState(),33;case 31:return r.yytext=i(1,2).replace(/\\"/g,'"'),80;case 32:return r.yytext=i(1,2).replace(/\\'/g,"'"),80;case 33:return 85;case 34:case 35:return 82;case 36:return 83;case 37:return 84;case 38:return 81;case 39:return 75;case 40:return 77;case 41:return 72;case 42:return r.yytext=r.yytext.replace(/\\([\\\]])/g,"$1"),72;case 43:return"INVALID";case 44:return 5}},rules:[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/],conditions:{mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!(r={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition_plus0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,1],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function(t,e,r,s,i,n,a){var o=n.length-1;switch(i){case 1:return n[o-1];case 2:this.$=s.prepareProgram(n[o]);break;case 3:case 4:case 5:case 6:case 7:case 8:this.$=n[o];break;case 9:this.$={type:"CommentStatement",value:s.stripComment(n[o]),strip:s.stripFlags(n[o],n[o]),loc:s.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:n[o],value:n[o],loc:s.locInfo(this._$)};break;case 11:this.$=s.prepareRawBlock(n[o-2],n[o-1],n[o],this._$);break;case 12:this.$={path:n[o-3],params:n[o-2],hash:n[o-1]};break;case 13:this.$=s.prepareBlock(n[o-3],n[o-2],n[o-1],n[o],!1,this._$);break;case 14:this.$=s.prepareBlock(n[o-3],n[o-2],n[o-1],n[o],!0,this._$);break;case 15:this.$={open:n[o-5],path:n[o-4],params:n[o-3],hash:n[o-2],blockParams:n[o-1],strip:s.stripFlags(n[o-5],n[o])};break;case 16:case 17:this.$={path:n[o-4],params:n[o-3],hash:n[o-2],blockParams:n[o-1],strip:s.stripFlags(n[o-5],n[o])};break;case 18:this.$={strip:s.stripFlags(n[o-1],n[o-1]),program:n[o]};break;case 19:var c=s.prepareBlock(n[o-2],n[o-1],n[o],n[o],!1,this._$),l=s.prepareProgram([c],n[o-1].loc);l.chained=!0,this.$={strip:n[o-2].strip,program:l,chain:!0};break;case 20:this.$=n[o];break;case 21:this.$={path:n[o-1],strip:s.stripFlags(n[o-2],n[o])};break;case 22:case 23:this.$=s.prepareMustache(n[o-3],n[o-2],n[o-1],n[o-4],s.stripFlags(n[o-4],n[o]),this._$);break;case 24:this.$={type:"PartialStatement",name:n[o-3],params:n[o-2],hash:n[o-1],indent:"",strip:s.stripFlags(n[o-4],n[o]),loc:s.locInfo(this._$)};break;case 25:this.$=s.preparePartialBlock(n[o-2],n[o-1],n[o],this._$);break;case 26:this.$={path:n[o-3],params:n[o-2],hash:n[o-1],strip:s.stripFlags(n[o-4],n[o])};break;case 27:case 28:this.$=n[o];break;case 29:this.$={type:"SubExpression",path:n[o-3],params:n[o-2],hash:n[o-1],loc:s.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:n[o],loc:s.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:s.id(n[o-2]),value:n[o],loc:s.locInfo(this._$)};break;case 32:this.$=s.id(n[o-1]);break;case 33:case 34:this.$=n[o];break;case 35:this.$={type:"StringLiteral",value:n[o],original:n[o],loc:s.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number(n[o]),original:Number(n[o]),loc:s.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:"true"===n[o],original:"true"===n[o],loc:s.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:s.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:s.locInfo(this._$)};break;case 40:case 41:this.$=n[o];break;case 42:this.$=s.preparePath(!0,n[o],this._$);break;case 43:this.$=s.preparePath(!1,n[o],this._$);break;case 44:n[o-2].push({part:s.id(n[o]),original:n[o],separator:n[o-1]}),this.$=n[o-2];break;case 45:this.$=[{part:s.id(n[o]),original:n[o]}];break;case 46:this.$=[];break;case 47:n[o-1].push(n[o]);break;case 48:this.$=[n[o]];break;case 49:n[o-1].push(n[o]);break;case 50:this.$=[];break;case 51:n[o-1].push(n[o]);break;case 58:this.$=[];break;case 59:n[o-1].push(n[o]);break;case 64:this.$=[];break;case 65:n[o-1].push(n[o]);break;case 70:this.$=[];break;case 71:n[o-1].push(n[o]);break;case 78:this.$=[];break;case 79:n[o-1].push(n[o]);break;case 82:this.$=[];break;case 83:n[o-1].push(n[o]);break;case 86:this.$=[];break;case 87:n[o-1].push(n[o]);break;case 90:this.$=[];break;case 91:n[o-1].push(n[o]);break;case 94:this.$=[];break;case 95:n[o-1].push(n[o]);break;case 98:this.$=[n[o]];break;case 99:n[o-1].push(n[o]);break;case 100:this.$=[n[o]];break;case 101:n[o-1].push(n[o])}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{13:40,15:[1,20],17:39},{20:42,56:41,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:45,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:48,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:42,56:49,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:50,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,51]},{72:[1,35],86:52},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:53,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:54,38:56,39:[1,58],43:57,44:[1,59],45:55,47:[2,54]},{28:60,43:61,44:[1,59],47:[2,56]},{13:63,15:[1,20],18:[1,62]},{15:[2,48],18:[2,48]},{33:[2,86],57:64,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:65,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:66,47:[1,67]},{30:68,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:69,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:70,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:71,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:75,33:[2,80],50:72,63:73,64:76,65:[1,44],69:74,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,80]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,51]},{20:75,53:81,54:[2,84],63:82,64:76,65:[1,44],69:83,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:84,47:[1,67]},{47:[2,55]},{4:85,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:86,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:87,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:88,47:[1,67]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:75,33:[2,88],58:89,63:90,64:76,65:[1,44],69:91,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:92,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:93,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,31:94,33:[2,60],63:95,64:76,65:[1,44],69:96,70:77,71:78,72:[1,79],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,66],36:97,63:98,64:76,65:[1,44],69:99,70:77,71:78,72:[1,79],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,22:100,23:[2,52],63:101,64:76,65:[1,44],69:102,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,92],62:103,63:104,64:76,65:[1,44],69:105,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,106]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:107,72:[1,108],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,109],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,110]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:56,39:[1,58],43:57,44:[1,59],45:112,46:111,47:[2,76]},{33:[2,70],40:113,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,114]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:75,63:116,64:76,65:[1,44],67:115,68:[2,96],69:117,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,118]},{32:119,33:[2,62],74:120,75:[1,121]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:122,74:123,75:[1,121]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,124]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,125]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,109]},{20:75,63:126,64:76,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:75,33:[2,72],41:127,63:128,64:76,65:[1,44],69:129,70:77,71:78,72:[1,79],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,130]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,131]},{33:[2,63]},{72:[1,133],76:132},{33:[1,134]},{33:[2,69]},{15:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:135,74:136,75:[1,121]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,138],77:[1,137]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,139]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],55:[2,55],57:[2,20],61:[2,57],74:[2,81],83:[2,85],87:[2,18],91:[2,89],102:[2,53],105:[2,93],111:[2,19],112:[2,77],117:[2,97],120:[2,63],123:[2,69],124:[2,12],136:[2,75],137:[2,32]},parseError:function(t,e){throw new Error(t)},parse:function(t){var e=this,r=[0],s=[null],i=[],n=this.table,a="",o=0,c=0,l=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,void 0===(this.yy.parser=this).lexer.yylloc&&(this.lexer.yylloc={});var h=this.lexer.yylloc;i.push(h);var p=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var u,f,d,m,g,v,y,k,S,b,_={};;){if(d=r[r.length-1],void 0===(m=this.defaultActions[d]?this.defaultActions[d]:(null==u&&(b=void 0,"number"!=typeof(b=e.lexer.lex()||1)&&(b=e.symbols_[b]||b),u=b),n[d]&&n[d][u]))||!m.length||!m[0]){var P="";if(!l){for(v in S=[],n[d])this.terminals_[v]&&2<v&&S.push("'"+this.terminals_[v]+"'");P=this.lexer.showPosition?"Parse error on line "+(o+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[u]||u)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==u?"end of input":"'"+(this.terminals_[u]||u)+"'"),this.parseError(P,{text:this.lexer.match,token:this.terminals_[u]||u,line:this.lexer.yylineno,loc:h,expected:S})}}if(m[0]instanceof Array&&1<m.length)throw new Error("Parse Error: multiple actions possible at state: "+d+", token: "+u);switch(m[0]){case 1:r.push(u),s.push(this.lexer.yytext),i.push(this.lexer.yylloc),r.push(m[1]),u=null,f?(u=f,f=null):(c=this.lexer.yyleng,a=this.lexer.yytext,o=this.lexer.yylineno,h=this.lexer.yylloc,0<l&&l--);break;case 2:if(y=this.productions_[m[1]][1],_.$=s[s.length-y],_._$={first_line:i[i.length-(y||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(y||1)].first_column,last_column:i[i.length-1].last_column},p&&(_._$.range=[i[i.length-(y||1)].range[0],i[i.length-1].range[1]]),void 0!==(g=this.performAction.call(_,a,c,o,this.yy,m[1],s,i)))return g;y&&(r=r.slice(0,-1*y*2),s=s.slice(0,-1*y),i=i.slice(0,-1*y)),r.push(this.productions_[m[1]][0]),s.push(_.$),i.push(_._$),k=n[r[r.length-2]][r[r.length-1]],r.push(k);break;case 3:return!0}}return!0}})},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}}},r.lexer=s,new((n.prototype=r).Parser=n));function n(){this.yy={}}e.default=i,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(39));function n(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.options=t}function f(t,e,r){void 0===e&&(e=t.length);var s=t[e-1],i=t[e-2];return s?"ContentStatement"===s.type?(i||!r?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(s.original):void 0:r}function d(t,e,r){void 0===e&&(e=-1);var s=t[e+1],i=t[e+2];return s?"ContentStatement"===s.type?(i||!r?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(s.original):void 0:r}function m(t,e,r){var s=t[null==e?0:e+1];if(s&&"ContentStatement"===s.type&&(r||!s.rightStripped)){var i=s.value;s.value=s.value.replace(r?/^\s+/:/^[ \t]*\r?\n?/,""),s.rightStripped=s.value!==i}}function g(t,e,r){var s=t[null==e?t.length-1:e-1];if(s&&"ContentStatement"===s.type&&(r||!s.leftStripped)){var i=s.value;return s.value=s.value.replace(r?/\s+$/:/[ \t]+$/,""),s.leftStripped=s.value!==i,s.leftStripped}}(n.prototype=new i.default).Program=function(t){var e=!this.options.ignoreStandalone,r=!this.isRootSeen;this.isRootSeen=!0;for(var s=t.body,i=0,n=s.length;i<n;i++){var a=s[i],o=this.accept(a);if(o){var c=f(s,i,r),l=d(s,i,r),h=o.openStandalone&&c,p=o.closeStandalone&&l,u=o.inlineStandalone&&c&&l;o.close&&m(s,i,!0),o.open&&g(s,i,!0),e&&u&&(m(s,i),g(s,i)&&"PartialStatement"===a.type&&(a.indent=/([ \t]+$)/.exec(s[i-1].original)[1])),e&&h&&(m((a.program||a.inverse).body),g(s,i)),e&&p&&(m(s,i),g((a.inverse||a.program).body))}}return t},n.prototype.BlockStatement=n.prototype.DecoratorBlock=n.prototype.PartialBlockStatement=function(t){this.accept(t.program),this.accept(t.inverse);var e=t.program||t.inverse,r=t.program&&t.inverse,s=r,i=r;if(r&&r.chained)for(s=r.body[0].program;i.chained;)i=i.body[i.body.length-1].program;var n={open:t.openStrip.open,close:t.closeStrip.close,openStandalone:d(e.body),closeStandalone:f((s||e).body)};if(t.openStrip.close&&m(e.body,null,!0),r){var a=t.inverseStrip;a.open&&g(e.body,null,!0),a.close&&m(s.body,null,!0),t.closeStrip.open&&g(i.body,null,!0),!this.options.ignoreStandalone&&f(e.body)&&d(s.body)&&(g(e.body),m(s.body))}else t.closeStrip.open&&g(e.body,null,!0);return n},n.prototype.Decorator=n.prototype.MustacheStatement=function(t){return t.strip},n.prototype.PartialStatement=n.prototype.CommentStatement=function(t){var e=t.strip||{};return{inlineStandalone:!0,open:e.open,close:e.close}},e.default=n,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(6));function n(){this.parents=[]}function a(t){this.acceptRequired(t,"path"),this.acceptArray(t.params),this.acceptKey(t,"hash")}function o(t){a.call(this,t),this.acceptKey(t,"program"),this.acceptKey(t,"inverse")}function c(t){this.acceptRequired(t,"name"),this.acceptArray(t.params),this.acceptKey(t,"hash")}n.prototype={constructor:n,mutating:!1,acceptKey:function(t,e){var r=this.accept(t[e]);if(this.mutating){if(r&&!n.prototype[r.type])throw new i.default('Unexpected node type "'+r.type+'" found when accepting '+e+" on "+t.type);t[e]=r}},acceptRequired:function(t,e){if(this.acceptKey(t,e),!t[e])throw new i.default(t.type+" requires "+e)},acceptArray:function(t){for(var e=0,r=t.length;e<r;e++)this.acceptKey(t,e),t[e]||(t.splice(e,1),e--,r--)},accept:function(t){if(t){if(!this[t.type])throw new i.default("Unknown type: "+t.type,t);this.current&&this.parents.unshift(this.current),this.current=t;var e=this[t.type](t);return this.current=this.parents.shift(),!this.mutating||e?e:!1!==e?t:void 0}},Program:function(t){this.acceptArray(t.body)},MustacheStatement:a,Decorator:a,BlockStatement:o,DecoratorBlock:o,PartialStatement:c,PartialBlockStatement:function(t){c.call(this,t),this.acceptKey(t,"program")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:a,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(t){this.acceptArray(t.pairs)},HashPair:function(t){this.acceptRequired(t,"value")}},e.default=n,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.SourceLocation=function(t,e){this.source=t,this.start={line:e.first_line,column:e.first_column},this.end={line:e.last_line,column:e.last_column}},e.id=function(t){return/^\[.*\]$/.test(t)?t.substring(1,t.length-1):t},e.stripFlags=function(t,e){return{open:"~"===t.charAt(2),close:"~"===e.charAt(e.length-3)}},e.stripComment=function(t){return t.replace(/^\{\{~?!-?-?/,"").replace(/-?-?~?\}\}$/,"")},e.preparePath=function(t,e,r){r=this.locInfo(r);for(var s=t?"@":"",i=[],n=0,a=0,o=e.length;a<o;a++){var c=e[a].part,l=e[a].original!==c;if(s+=(e[a].separator||"")+c,l||".."!==c&&"."!==c&&"this"!==c)i.push(c);else{if(0<i.length)throw new h.default("Invalid path: "+s,{loc:r});".."===c&&n++}}return{type:"PathExpression",data:t,depth:n,parts:i,original:s,loc:r}},e.prepareMustache=function(t,e,r,s,i,n){var a=s.charAt(3)||s.charAt(2),o="{"!==a&&"&"!==a;return{type:/\*/.test(s)?"Decorator":"MustacheStatement",path:t,params:e,hash:r,escaped:o,strip:i,loc:this.locInfo(n)}},e.prepareRawBlock=function(t,e,r,s){l(t,r),s=this.locInfo(s);var i={type:"Program",body:e,strip:{},loc:s};return{type:"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:i,openStrip:{},inverseStrip:{},closeStrip:{},loc:s}},e.prepareBlock=function(t,e,r,s,i,n){s&&s.path&&l(t,s);var a=/\*/.test(t.open);e.blockParams=t.blockParams;var o=void 0,c=void 0;if(r){if(a)throw new h.default("Unexpected inverse block on decorator",r);r.chain&&(r.program.body[0].closeStrip=s.strip),c=r.strip,o=r.program}i&&(i=o,o=e,e=i);return{type:a?"DecoratorBlock":"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:e,inverse:o,openStrip:t.strip,inverseStrip:c,closeStrip:s&&s.strip,loc:this.locInfo(n)}},e.prepareProgram=function(t,e){if(!e&&t.length){var r=t[0].loc,s=t[t.length-1].loc;r&&s&&(e={source:r.source,start:{line:r.start.line,column:r.start.column},end:{line:s.end.line,column:s.end.column}})}return{type:"Program",body:t,strip:{},loc:e}},e.preparePartialBlock=function(t,e,r,s){return l(t,r),{type:"PartialBlockStatement",name:t.path,params:t.params,hash:t.hash,program:e,openStrip:t.strip,closeStrip:r&&r.strip,loc:this.locInfo(s)}};var h=s(r(6));function l(t,e){if(e=e.path?e.path.original:e,t.path.original!==e){var r={loc:t.path.loc};throw new h.default(t.path.original+" doesn't match "+e,r)}}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.Compiler=n,e.precompile=function(t,e,r){if(null==t||"string"!=typeof t&&"Program"!==t.type)throw new c.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);"data"in(e=e||{})||(e.data=!0);e.compat&&(e.useDepths=!0);var s=r.parse(t,e),i=(new r.Compiler).compile(s,e);return(new r.JavaScriptCompiler).compile(i,e)},e.compile=function(s,i,n){void 0===i&&(i={});if(null==s||"string"!=typeof s&&"Program"!==s.type)throw new c.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+s);"data"in(i=l.extend({},i))||(i.data=!0);i.compat&&(i.useDepths=!0);var a=void 0;function o(){var t=n.parse(s,i),e=(new n.Compiler).compile(t,i),r=(new n.JavaScriptCompiler).compile(e,i,void 0,!0);return n.template(r)}function t(t,e){return(a=a||o()).call(this,t,e)}return t._setup=function(t){return(a=a||o())._setup(t)},t._child=function(t,e,r,s){return(a=a||o())._child(t,e,r,s)},t};var c=s(r(6)),l=r(5),o=s(r(35)),i=[].slice;function n(){}function a(t,e){if(t===e)return!0;if(l.isArray(t)&&l.isArray(e)&&t.length===e.length){for(var r=0;r<t.length;r++)if(!a(t[r],e[r]))return!1;return!0}}function h(t){if(!t.path.parts){var e=t.path;t.path={type:"PathExpression",data:!1,depth:0,parts:[e.original+""],original:e.original+"",loc:e.loc}}}n.prototype={compiler:n,equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var r=0;r<e;r++){var s=this.opcodes[r],i=t.opcodes[r];if(s.opcode!==i.opcode||!a(s.args,i.args))return!1}e=this.children.length;for(r=0;r<e;r++)if(!this.children[r].equals(t.children[r]))return!1;return!0},guid:0,compile:function(t,e){this.sourceNode=[],this.opcodes=[],this.children=[],this.options=e,this.stringParams=e.stringParams,this.trackIds=e.trackIds,e.blockParams=e.blockParams||[];var r=e.knownHelpers;if(e.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0,lookup:!0},r)for(var s in r)this.options.knownHelpers[s]=r[s];return this.accept(t)},compileProgram:function(t){var e=(new this.compiler).compile(t,this.options),r=this.guid++;return this.usePartial=this.usePartial||e.usePartial,this.children[r]=e,this.useDepths=this.useDepths||e.useDepths,r},accept:function(t){if(!this[t.type])throw new c.default("Unknown type: "+t.type,t);this.sourceNode.unshift(t);var e=this[t.type](t);return this.sourceNode.shift(),e},Program:function(t){this.options.blockParams.unshift(t.blockParams);for(var e=t.body,r=e.length,s=0;s<r;s++)this.accept(e[s]);return this.options.blockParams.shift(),this.isSimple=1===r,this.blockParams=t.blockParams?t.blockParams.length:0,this},BlockStatement:function(t){h(t);var e=t.program,r=t.inverse;e=e&&this.compileProgram(e),r=r&&this.compileProgram(r);var s=this.classifySexpr(t);"helper"===s?this.helperSexpr(t,e,r):"simple"===s?(this.simpleSexpr(t),this.opcode("pushProgram",e),this.opcode("pushProgram",r),this.opcode("emptyHash"),this.opcode("blockValue",t.path.original)):(this.ambiguousSexpr(t,e,r),this.opcode("pushProgram",e),this.opcode("pushProgram",r),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},DecoratorBlock:function(t){var e=t.program&&this.compileProgram(t.program),r=this.setupFullMustacheParams(t,e,void 0),s=t.path;this.useDecorators=!0,this.opcode("registerDecorator",r.length,s.original)},PartialStatement:function(t){this.usePartial=!0;var e=t.program;e=e&&this.compileProgram(t.program);var r=t.params;if(1<r.length)throw new c.default("Unsupported number of partial arguments: "+r.length,t);r.length||(this.options.explicitPartialContext?this.opcode("pushLiteral","undefined"):r.push({type:"PathExpression",parts:[],depth:0}));var s=t.name.original,i="SubExpression"===t.name.type;i&&this.accept(t.name),this.setupFullMustacheParams(t,e,void 0,!0);var n=t.indent||"";this.options.preventIndent&&n&&(this.opcode("appendContent",n),n=""),this.opcode("invokePartial",i,s,n),this.opcode("append")},PartialBlockStatement:function(t){this.PartialStatement(t)},MustacheStatement:function(t){this.SubExpression(t),t.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},Decorator:function(t){this.DecoratorBlock(t)},ContentStatement:function(t){t.value&&this.opcode("appendContent",t.value)},CommentStatement:function(){},SubExpression:function(t){h(t);var e=this.classifySexpr(t);"simple"===e?this.simpleSexpr(t):"helper"===e?this.helperSexpr(t):this.ambiguousSexpr(t)},ambiguousSexpr:function(t,e,r){var s=t.path,i=s.parts[0],n=null!=e||null!=r;this.opcode("getContext",s.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",r),s.strict=!0,this.accept(s),this.opcode("invokeAmbiguous",i,n)},simpleSexpr:function(t){var e=t.path;e.strict=!0,this.accept(e),this.opcode("resolvePossibleLambda")},helperSexpr:function(t,e,r){var s=this.setupFullMustacheParams(t,e,r),i=t.path,n=i.parts[0];if(this.options.knownHelpers[n])this.opcode("invokeKnownHelper",s.length,n);else{if(this.options.knownHelpersOnly)throw new c.default("You specified knownHelpersOnly, but used the unknown helper "+n,t);i.strict=!0,i.falsy=!0,this.accept(i),this.opcode("invokeHelper",s.length,i.original,o.default.helpers.simpleId(i))}},PathExpression:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0],r=o.default.helpers.scopedId(t),s=!t.depth&&!r&&this.blockParamIndex(e);s?this.opcode("lookupBlockParam",s,t.parts):e?t.data?(this.options.data=!0,this.opcode("lookupData",t.depth,t.parts,t.strict)):this.opcode("lookupOnContext",t.parts,t.falsy,t.strict,r):this.opcode("pushContext")},StringLiteral:function(t){this.opcode("pushString",t.value)},NumberLiteral:function(t){this.opcode("pushLiteral",t.value)},BooleanLiteral:function(t){this.opcode("pushLiteral",t.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(t){var e=t.pairs,r=0,s=e.length;for(this.opcode("pushHash");r<s;r++)this.pushParam(e[r].value);for(;r--;)this.opcode("assignToHash",e[r].key);this.opcode("popHash")},opcode:function(t){this.opcodes.push({opcode:t,args:i.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(t){t&&(this.useDepths=!0)},classifySexpr:function(t){var e=o.default.helpers.simpleId(t.path),r=e&&!!this.blockParamIndex(t.path.parts[0]),s=!r&&o.default.helpers.helperExpression(t),i=!r&&(s||e);if(i&&!s){var n=t.path.parts[0],a=this.options;a.knownHelpers[n]?s=!0:a.knownHelpersOnly&&(i=!1)}return s?"helper":i?"ambiguous":"simple"},pushParams:function(t){for(var e=0,r=t.length;e<r;e++)this.pushParam(t[e])},pushParam:function(t){var e=null!=t.value?t.value:t.original||"";if(this.stringParams)e.replace&&(e=e.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),t.depth&&this.addDepth(t.depth),this.opcode("getContext",t.depth||0),this.opcode("pushStringParam",e,t.type),"SubExpression"===t.type&&this.accept(t);else{if(this.trackIds){var r=void 0;if(!t.parts||o.default.helpers.scopedId(t)||t.depth||(r=this.blockParamIndex(t.parts[0])),r){var s=t.parts.slice(1).join(".");this.opcode("pushId","BlockParam",r,s)}else(e=t.original||e).replace&&(e=e.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")),this.opcode("pushId",t.type,e)}this.accept(t)}},setupFullMustacheParams:function(t,e,r,s){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",r),t.hash?this.accept(t.hash):this.opcode("emptyHash",s),i},blockParamIndex:function(t){for(var e=0,r=this.options.blockParams.length;e<r;e++){var s=this.options.blockParams[e],i=s&&l.indexOf(s,t);if(s&&0<=i)return[e,i]}}}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=r(4),d=s(r(6)),n=r(5),a=s(r(43));function c(t){this.value=t}function o(){}o.prototype={nameLookup:function(t,e){return"constructor"===e?["(",t,".propertyIsEnumerable('constructor') ? ",t,".constructor : undefined",")"]:o.isValidJavaScriptVariableName(e)?[t,".",e]:[t,"[",JSON.stringify(e),"]"]},depthedLookup:function(t){return[this.aliasable("container.lookup"),'(depths, "',t,'")']},compilerInfo:function(){var t=i.COMPILER_REVISION;return[t,i.REVISION_CHANGES[t]]},appendToBuffer:function(t,e,r){return n.isArray(t)||(t=[t]),t=this.source.wrap(t,e),this.environment.isSimple?["return ",t,";"]:r?["buffer += ",t,";"]:(t.appendToBuffer=!0,t)},initializeBuffer:function(){return this.quotedString("")},compile:function(t,e,r,s){this.environment=t,this.options=e,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!s,this.name=this.environment.name,this.isChild=!!r,this.context=r||{decorators:[],programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(t,e),this.useDepths=this.useDepths||t.useDepths||t.useDecorators||this.options.compat,this.useBlockParams=this.useBlockParams||t.useBlockParams;var i=t.opcodes,n=void 0,a=void 0,o=void 0,c=void 0;for(o=0,c=i.length;o<c;o++)n=i[o],this.source.currentLocation=n.loc,a=a||n.loc,this[n.opcode].apply(this,n.args);if(this.source.currentLocation=a,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new d.default("Compile completed with content left on stack");this.decorators.isEmpty()?this.decorators=void 0:(this.useDecorators=!0,this.decorators.prepend("var decorators = container.decorators;\n"),this.decorators.push("return fn;"),s?this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()]):(this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"),this.decorators.push("}\n"),this.decorators=this.decorators.merge()));var l=this.createFunctionContext(s);if(this.isChild)return l;var h={compiler:this.compilerInfo(),main:l};this.decorators&&(h.main_d=this.decorators,h.useDecorators=!0);var p=this.context,u=p.programs,f=p.decorators;for(o=0,c=u.length;o<c;o++)u[o]&&(h[o]=u[o],f[o]&&(h[o+"_d"]=f[o],h.useDecorators=!0));return this.environment.usePartial&&(h.usePartial=!0),this.options.data&&(h.useData=!0),this.useDepths&&(h.useDepths=!0),this.useBlockParams&&(h.useBlockParams=!0),this.options.compat&&(h.compat=!0),s?h.compilerOptions=this.options:(h.compiler=JSON.stringify(h.compiler),this.source.currentLocation={start:{line:1,column:0}},h=this.objectLiteral(h),e.srcName?(h=h.toStringWithSourceMap({file:e.destName})).map=h.map&&h.map.toString():h=h.toString()),h},preamble:function(){this.lastContext=0,this.source=new a.default(this.options.srcName),this.decorators=new a.default(this.options.srcName)},createFunctionContext:function(t){var e="",r=this.stackVars.concat(this.registers.list);0<r.length&&(e+=", "+r.join(", "));var s=0;for(var i in this.aliases){var n=this.aliases[i];this.aliases.hasOwnProperty(i)&&n.children&&1<n.referenceCount&&(e+=", alias"+ ++s+"="+i,n.children[0]="alias"+s)}var a=["container","depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&a.push("blockParams"),this.useDepths&&a.push("depths");var o=this.mergeSource(e);return t?(a.push(o),Function.apply(this,a)):this.source.wrap(["function(",a.join(","),") {\n  ",o,"}"])},mergeSource:function(t){var e=this.environment.isSimple,r=!this.forceBuffer,s=void 0,i=void 0,n=void 0,a=void 0;return this.source.each(function(t){t.appendToBuffer?(n?t.prepend("  + "):n=t,a=t):(n&&(i?n.prepend("buffer += "):s=!0,a.add(";"),n=a=void 0),i=!0,e||(r=!1))}),r?n?(n.prepend("return "),a.add(";")):i||this.source.push('return "";'):(t+=", buffer = "+(s?"":this.initializeBuffer()),n?(n.prepend("return buffer + "),a.add(";")):this.source.push("return buffer;")),t&&this.source.prepend("var "+t.substring(2)+(s?"":";\n")),this.source.merge()},blockValue:function(t){var e=this.aliasable("helpers.blockHelperMissing"),r=[this.contextName(0)];this.setupHelperArgs(t,0,r);var s=this.popStack();r.splice(1,0,s),this.push(this.source.functionCall(e,"call",r))},ambiguousBlockValue:function(){var t=this.aliasable("helpers.blockHelperMissing"),e=[this.contextName(0)];this.setupHelperArgs("",0,e,!0),this.flushInline();var r=this.topStack();e.splice(1,0,r),this.pushSource(["if (!",this.lastHelper,") { ",r," = ",this.source.functionCall(t,"call",e),"}"])},appendContent:function(t){this.pendingContent?t=this.pendingContent+t:this.pendingLocation=this.source.currentLocation,this.pendingContent=t},append:function(){if(this.isInline())this.replaceStack(function(t){return[" != null ? ",t,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var t=this.popStack();this.pushSource(["if (",t," != null) { ",this.appendToBuffer(t,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(t){this.lastContext=t},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(t,e,r,s){var i=0;s||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(t[i++])),this.resolvePath("context",t,i,e,r)},lookupBlockParam:function(t,e){this.useBlockParams=!0,this.push(["blockParams[",t[0],"][",t[1],"]"]),this.resolvePath("context",e,1)},lookupData:function(t,e,r){t?this.pushStackLiteral("container.data(data, "+t+")"):this.pushStackLiteral("data"),this.resolvePath("data",e,0,!0,r)},resolvePath:function(r,s,i,n,t){var a=this;if(this.options.strict||this.options.assumeObjects)this.push(function(t,e,r,s){var i=e.popStack(),n=0,a=r.length;t&&a--;for(;n<a;n++)i=e.nameLookup(i,r[n],s);return t?[e.aliasable("container.strict"),"(",i,", ",e.quotedString(r[n]),")"]:i}(this.options.strict&&t,this,s,r));else for(var e=s.length;i<e;i++)this.replaceStack(function(t){var e=a.nameLookup(t,s[i],r);return n?[" && ",e]:[" != null ? ",e," : ",t]})},resolvePossibleLambda:function(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(t,e){this.pushContext(),this.pushString(e),"SubExpression"!==e&&("string"==typeof t?this.pushString(t):this.pushStackLiteral(t))},emptyHash:function(t){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}")),this.pushStackLiteral(t?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var t=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(t.ids)),this.stringParams&&(this.push(this.objectLiteral(t.contexts)),this.push(this.objectLiteral(t.types))),this.push(this.objectLiteral(t.values))},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},registerDecorator:function(t,e){var r=this.nameLookup("decorators",e,"decorator"),s=this.setupHelperArgs(e,t);this.decorators.push(["fn = ",this.decorators.functionCall(r,"",["fn","props","container",s])," || fn;"])},invokeHelper:function(t,e,r){var s=this.popStack(),i=this.setupHelper(t,e),n=r?[i.name," || "]:"",a=["("].concat(n,s);this.options.strict||a.push(" || ",this.aliasable("helpers.helperMissing")),a.push(")"),this.push(this.source.functionCall(a,"call",i.callParams))},invokeKnownHelper:function(t,e){var r=this.setupHelper(t,e);this.push(this.source.functionCall(r.name,"call",r.callParams))},invokeAmbiguous:function(t,e){this.useRegister("helper");var r=this.popStack();this.emptyHash();var s=this.setupHelper(0,t,e),i=["(","(helper = ",this.lastHelper=this.nameLookup("helpers",t,"helper")," || ",r,")"];this.options.strict||(i[0]="(helper = ",i.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))),this.push(["(",i,s.paramsInit?["),(",s.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",s.callParams)," : helper))"])},invokePartial:function(t,e,r){var s=[],i=this.setupParams(e,1,s);t&&(e=this.popStack(),delete i.name),r&&(i.indent=JSON.stringify(r)),i.helpers="helpers",i.partials="partials",i.decorators="container.decorators",t?s.unshift(e):s.unshift(this.nameLookup("partials",e,"partial")),this.options.compat&&(i.depths="depths"),i=this.objectLiteral(i),s.push(i),this.push(this.source.functionCall("container.invokePartial","",s))},assignToHash:function(t){var e=this.popStack(),r=void 0,s=void 0,i=void 0;this.trackIds&&(i=this.popStack()),this.stringParams&&(s=this.popStack(),r=this.popStack());var n=this.hash;r&&(n.contexts[t]=r),s&&(n.types[t]=s),i&&(n.ids[t]=i),n.values[t]=e},pushId:function(t,e,r){"BlockParam"===t?this.pushStackLiteral("blockParams["+e[0]+"].path["+e[1]+"]"+(r?" + "+JSON.stringify("."+r):"")):"PathExpression"===t?this.pushString(e):"SubExpression"===t?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:o,compileChildren:function(t,e){for(var r=t.children,s=void 0,i=void 0,n=0,a=r.length;n<a;n++){s=r[n],i=new this.compiler;var o=this.matchExistingProgram(s);if(null==o){this.context.programs.push("");var c=this.context.programs.length;s.index=c,s.name="program"+c,this.context.programs[c]=i.compile(s,e,this.context,!this.precompile),this.context.decorators[c]=i.decorators,this.context.environments[c]=s,this.useDepths=this.useDepths||i.useDepths,this.useBlockParams=this.useBlockParams||i.useBlockParams,s.useDepths=this.useDepths,s.useBlockParams=this.useBlockParams}else s.index=o.index,s.name="program"+o.index,this.useDepths=this.useDepths||o.useDepths,this.useBlockParams=this.useBlockParams||o.useBlockParams}},matchExistingProgram:function(t){for(var e=0,r=this.context.environments.length;e<r;e++){var s=this.context.environments[e];if(s&&s.equals(t))return s}},programExpression:function(t){var e=this.environment.children[t],r=[e.index,"data",e.blockParams];return(this.useBlockParams||this.useDepths)&&r.push("blockParams"),this.useDepths&&r.push("depths"),"container.program("+r.join(", ")+")"},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},push:function(t){return t instanceof c||(t=this.source.wrap(t)),this.inlineStack.push(t),t},pushStackLiteral:function(t){this.push(new c(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),t&&this.source.push(t)},replaceStack:function(t){var e=["("],r=void 0,s=void 0,i=void 0;if(!this.isInline())throw new d.default("replaceStack on non-inline");var n=this.popStack(!0);if(n instanceof c)e=["(",r=[n.value]],i=!0;else{s=!0;var a=this.incrStack();e=["((",this.push(a)," = ",n,")"],r=this.topStack()}var o=t.call(this,r);i||this.popStack(),s&&this.stackSlot--,this.push(e.concat(o,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;this.inlineStack=[];for(var e=0,r=t.length;e<r;e++){var s=t[e];if(s instanceof c)this.compileStack.push(s);else{var i=this.incrStack();this.pushSource([i," = ",s,";"]),this.compileStack.push(i)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),r=(e?this.inlineStack:this.compileStack).pop();if(!t&&r instanceof c)return r.value;if(!e){if(!this.stackSlot)throw new d.default("Invalid stack pop");this.stackSlot--}return r},topStack:function(){var t=this.isInline()?this.inlineStack:this.compileStack,e=t[t.length-1];return e instanceof c?e.value:e},contextName:function(t){return this.useDepths&&t?"depths["+t+"]":"depth"+t},quotedString:function(t){return this.source.quotedString(t)},objectLiteral:function(t){return this.source.objectLiteral(t)},aliasable:function(t){var e=this.aliases[t];return e?e.referenceCount++:((e=this.aliases[t]=this.source.wrap(t)).aliasable=!0,e.referenceCount=1),e},setupHelper:function(t,e,r){var s=[];return{params:s,paramsInit:this.setupHelperArgs(e,t,s,r),name:this.nameLookup("helpers",e,"helper"),callParams:[this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : (container.nullContext || {})")].concat(s)}},setupParams:function(t,e,r){var s={},i=[],n=[],a=[],o=!r,c=void 0;o&&(r=[]),s.name=this.quotedString(t),s.hash=this.popStack(),this.trackIds&&(s.hashIds=this.popStack()),this.stringParams&&(s.hashTypes=this.popStack(),s.hashContexts=this.popStack());var l=this.popStack(),h=this.popStack();(h||l)&&(s.fn=h||"container.noop",s.inverse=l||"container.noop");for(var p=e;p--;)c=this.popStack(),r[p]=c,this.trackIds&&(a[p]=this.popStack()),this.stringParams&&(n[p]=this.popStack(),i[p]=this.popStack());return o&&(s.args=this.source.generateArray(r)),this.trackIds&&(s.ids=this.source.generateArray(a)),this.stringParams&&(s.types=this.source.generateArray(n),s.contexts=this.source.generateArray(i)),this.options.data&&(s.data="data"),this.useBlockParams&&(s.blockParams="blockParams"),s},setupHelperArgs:function(t,e,r,s){var i=this.setupParams(t,e,r);return i=this.objectLiteral(i),s?(this.useRegister("options"),r.push("options"),["options=",i]):r?(r.push(i),""):i}},function(){for(var t="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),e=o.RESERVED_WORDS={},r=0,s=t.length;r<s;r++)e[t[r]]=!0}(),o.isValidJavaScriptVariableName=function(t){return!o.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)},e.default=o,t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var a=r(5),s=void 0;try{}catch(t){}function n(t,e,r){if(a.isArray(t)){for(var s=[],i=0,n=t.length;i<n;i++)s.push(e.wrap(t[i],r));return s}return"boolean"==typeof t||"number"==typeof t?t+"":t}function i(t){this.srcFile=t,this.source=[]}s||((s=function(t,e,r,s){this.src="",s&&this.add(s)}).prototype={add:function(t){a.isArray(t)&&(t=t.join("")),this.src+=t},prepend:function(t){a.isArray(t)&&(t=t.join("")),this.src=t+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),i.prototype={isEmpty:function(){return!this.source.length},prepend:function(t,e){this.source.unshift(this.wrap(t,e))},push:function(t,e){this.source.push(this.wrap(t,e))},merge:function(){var e=this.empty();return this.each(function(t){e.add(["  ",t,"\n"])}),e},each:function(t){for(var e=0,r=this.source.length;e<r;e++)t(this.source[e])},empty:function(){var t=this.currentLocation||{start:{}};return new s(t.start.line,t.start.column,this.srcFile)},wrap:function(t,e){var r=arguments.length<=1||void 0===e?this.currentLocation||{start:{}}:e;return t instanceof s?t:(t=n(t,this,r),new s(r.start.line,r.start.column,this.srcFile,t))},functionCall:function(t,e,r){return r=this.generateList(r),this.wrap([t,e?"."+e+"(":"(",r,")"])},quotedString:function(t){return'"'+(t+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(t){var e=[];for(var r in t)if(t.hasOwnProperty(r)){var s=n(t[r],this);"undefined"!==s&&e.push([this.quotedString(r),":",s])}var i=this.generateList(e);return i.prepend("{"),i.add("}"),i},generateList:function(t){for(var e=this.empty(),r=0,s=t.length;r<s;r++)r&&e.add(","),e.add(n(t[r],this));return e},generateArray:function(t){var e=this.generateList(t);return e.prepend("["),e.add("]"),e}},e.default=i,t.exports=e.default}],r.c=i,r.p="",r(0);function r(t){if(i[t])return i[t].exports;var e=i[t]={exports:{},id:t,loaded:!1};return s[t].call(e.exports,e,e.exports,r),e.loaded=!0,e.exports}var s,i});
/* jshint ignore:start */

!function(m){m.gritter={},m.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3},m.gritter.add=function(t){try{return d.add(t||{})}catch(t){}},m.gritter.remove=function(t,e){d.removeSpecific(t,e||{})},m.gritter.removeAll=function(t){d.stop(t||{})};var d={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close"href="#" tabindex="1">hide</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(i){if("string"==typeof i&&(i={text:i}),null===i.text)throw'You must supply "text" parameter.';this._is_setup||this._runSetup();var t=i.title,e=i.text,r=i.image||"",s=i.sticky||!1,o=i.class_name||m.gritter.options.class_name,n=m.gritter.options.position,a=i.time||"";this._verifyWrapper(),this._item_count++;var _=this._item_count,c=this._tpl_item;m(["before_open","after_open","before_close","after_close"]).each(function(t,e){d["_"+e+"_"+_]=m.isFunction(i[e])?i[e]:function(){}}),this._custom_timer=0,a&&(this._custom_timer=a);var p=""!=r?'<img src="'+r+'" class="gritter-image" />':"",l=""!=r?"gritter-with-image":"gritter-without-image";if(t=t?this._str_replace("[[title]]",t,this._tpl_title):"",c=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[t,e,this._tpl_close,p,this._item_count,l,o],c),!1===this["_before_open_"+_]())return!1;m("#gritter-notice-wrapper").addClass(n).append(c);var u=m("#gritter-item-"+this._item_count);return u.fadeIn(this.fade_in_speed,function(){d["_after_open_"+_](m(this))}),s||this._setFadeTimer(u,_),m(u).bind("mouseenter mouseleave",function(t){"mouseenter"==t.type?s||d._restoreItemIfFading(m(this),_):s||d._setFadeTimer(m(this),_),d._hoverState(m(this),t.type)}),m(u).find(".gritter-close").click(function(){return d.removeSpecific(_,{},null,!0),!1}),_},_countRemoveWrapper:function(t,e,i){e.remove(),this["_after_close_"+t](e,i),0==m(".gritter-item-wrapper").length&&m("#gritter-notice-wrapper").remove()},_fade:function(t,e,i,r){var s=void 0===(i=i||{}).fade||i.fade,o=i.speed||this.fade_out_speed,n=r;this["_before_close_"+e](t,n),r&&t.unbind("mouseenter mouseleave"),s?t.animate({opacity:0},o,function(){t.animate({height:0},300,function(){d._countRemoveWrapper(e,t,n)})}):this._countRemoveWrapper(e,t)},_hoverState:function(t,e){"mouseenter"==e?(t.addClass("hover"),t.find(".gritter-close").show()):(t.removeClass("hover"),t.find(".gritter-close").hide())},removeSpecific:function(t,e,i,r){i=i||m("#gritter-item-"+t),this._fade(i,t,e||{},r)},_restoreItemIfFading:function(t,e){window.clearTimeout(this["_int_id_"+e]),t.stop().css({opacity:"",height:""})},_runSetup:function(){for(var t in m.gritter.options)this[t]=m.gritter.options[t];this._is_setup=1},_setFadeTimer:function(t,e){var i=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+e]=window.setTimeout(function(){d._fade(t,e)},i)},stop:function(t){var e=m.isFunction(t.before_close)?t.before_close:function(){},i=m.isFunction(t.after_close)?t.after_close:function(){},r=m("#gritter-notice-wrapper");e(r),r.fadeOut(function(){m(this).remove(),i()})},_str_replace:function(t,e,i,r){var s,o=0,n=0,a="",_="",c=0,p=[].concat(t),l=[].concat(e),u=i,m=l instanceof Array,d=u instanceof Array;for(u=[].concat(u),r&&(this.window[r]=0),o=0,s=u.length;o<s;o++)if(""!==u[o])for(n=0,c=p.length;n<c;n++)a=u[o]+"",_=m?void 0!==l[n]?l[n]:"":l[0],u[o]=a.split(p[n]).join(_),r&&u[o]!==a&&(this.window[r]+=(a.length-u[o].length)/p[n].length);return d?u:u[0]},_verifyWrapper:function(){0==m("#gritter-notice-wrapper").length&&m("body").append(this._tpl_wrap)}}}(jQuery);
/* jshint ignore:start */

!function i(u,f,c){function s(e,n){if(!f[e]){if(!u[e]){var t="function"==typeof require&&require;if(!n&&t)return t(e,!0);if(l)return l(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var o=f[e]={exports:{}};u[e][0].call(o.exports,function(n){var t=u[e][1][n];return s(t||n)},o,o.exports,i,u,f,c)}return f[e].exports}for(var l="function"==typeof require&&require,n=0;n<c.length;n++)s(c[n]);return s}({1:[function(n,t,e){"use strict";var o=n("asap/raw");function u(){}var i=null,f={};function c(n){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],n!==u&&p(n,this)}function s(e,r){for(;3===e._37;)e=e._12;0!==e._37?o(function(){var n=1===e._37?r.onFulfilled:r.onRejected;if(null!==n){var t=function(n,t){try{return n(t)}catch(n){return i=n,f}}(n,e._12);t===f?a(r.promise,i):l(r.promise,t)}else 1===e._37?l(r.promise,e._12):a(r.promise,e._12)}):e._59.push(r)}function l(n,t){if(t===n)return a(n,new TypeError("A promise cannot be resolved with itself."));if(t&&("object"==typeof t||"function"==typeof t)){var e=function(n){try{return n.then}catch(n){return i=n,f}}(t);if(e===f)return a(n,i);if(e===n.then&&t instanceof c)return n._37=3,n._12=t,void r(n);if("function"==typeof e)return void p(e.bind(t),n)}n._37=1,n._12=t,r(n)}function a(n,t){n._37=2,n._12=t,r(n)}function r(n){for(var t=0;t<n._59.length;t++)s(n,n._59[t]);n._59=null}function h(n,t,e){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.promise=e}function p(n,t){var e=!1,r=function(n,t,e){try{n(t,e)}catch(n){return i=n,f}}(n,function(n){e||(e=!0,l(t,n))},function(n){e||(e=!0,a(t,n))});e||r!==f||(e=!0,a(t,i))}(t.exports=c)._99=u,c.prototype.then=function(n,t){if(this.constructor!==c)return function(r,o,i){return new r.constructor(function(n,t){var e=new c(u);e.then(n,t),s(r,new h(o,i,e))})}(this,n,t);var e=new c(u);return s(this,new h(n,t,e)),e}},{"asap/raw":4}],2:[function(n,t,e){"use strict";var c=n("./core.js");t.exports=c;var r=l(!0),o=l(!1),i=l(null),u=l(void 0),f=l(0),s=l("");function l(n){var t=new c(c._99);return t._37=1,t._12=n,t}c.resolve=function(n){if(n instanceof c)return n;if(null===n)return i;if(void 0===n)return u;if(!0===n)return r;if(!1===n)return o;if(0===n)return f;if(""===n)return s;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new c(t.bind(n))}catch(e){return new c(function(n,t){t(e)})}return l(n)},c.all=function(n){var f=Array.prototype.slice.call(n);return new c(function(r,o){if(0===f.length)return r([]);var i=f.length;function u(t,n){if(n&&("object"==typeof n||"function"==typeof n)){if(n instanceof c&&n.then===c.prototype.then){for(;3===n._37;)n=n._12;return 1===n._37?u(t,n._12):(2===n._37&&o(n._12),void n.then(function(n){u(t,n)},o))}var e=n.then;if("function"==typeof e)return void new c(e.bind(n)).then(function(n){u(t,n)},o)}f[t]=n,0==--i&&r(f)}for(var n=0;n<f.length;n++)u(n,f[n])})},c.reject=function(e){return new c(function(n,t){t(e)})},c.race=function(n){return new c(function(t,e){n.forEach(function(n){c.resolve(n).then(t,e)})})},c.prototype.catch=function(n){return this.then(null,n)}},{"./core.js":1}],3:[function(n,t,e){"use strict";var r=n("./raw"),o=[],i=[],u=r.makeRequestCallFromTimer(function(){if(i.length)throw i.shift()});function f(n){var t;(t=o.length?o.pop():new c).task=n,r(t)}function c(){this.task=null}t.exports=f,c.prototype.call=function(){try{this.task.call()}catch(n){f.onerror?f.onerror(n):(i.push(n),u())}finally{this.task=null,o[o.length]=this}}},{"./raw":4}],4:[function(n,a,t){(function(n){"use strict";function t(n){r.length||(e(),!0),r[r.length]=n}a.exports=t;var e,r=[],o=0;function i(){for(;o<r.length;){var n=o;if(o+=1,r[n].call(),1024<o){for(var t=0,e=r.length-o;t<e;t++)r[t]=r[t+o];r.length-=o,o=0}}r.length=0,o=0,!1}var u,f,c,s=n.MutationObserver||n.WebKitMutationObserver;function l(r){return function(){var n,t;function e(){n&&clearTimeout(n),t&&clearInterval(t),r()}"undefined"!=typeof setTimeout&&(n=setTimeout(e,0)),"undefined"!=typeof setInterval&&(t=setInterval(e,50))}}e="function"==typeof s?(u=1,f=new s(i),c=document.createTextNode(""),f.observe(c,{characterData:!0}),function(){u=-u,c.data=u}):l(i),t.requestFlush=e,t.makeRequestCallFromTimer=l}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(n,t,e){"function"!=typeof Promise.prototype.done&&(Promise.prototype.done=function(n,t){(arguments.length?this.then.apply(this,arguments):this).then(null,function(n){setTimeout(function(){throw n},0)})})},{}],6:[function(n,t,e){n("asap");"undefined"==typeof Promise&&(Promise=n("./lib/core.js"),n("./lib/es6-extensions.js")),n("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);
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
             (br.isString(value) && (value.trim().length === 0)) ||
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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
    this.enabled = true;

    this.enable = function() {
      this.enabled = true;
    };

    this.disable = function() {
      this.enabled = false;
    };

    this.before = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], pause: [], before: [], after: [] };
        _this.subscribers[events[i]].before.push(callback);
      }
    };

    this.on = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], pause: [], before: [], after: [] };
        _this.subscribers[events[i]].on.push(callback);
      }
    };

    this.pause = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], pause: [], before: [], after: [] };
        _this.subscribers[events[i]].pause.push(callback);
      }
    };

    this.after = function(events, callback) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        _this.subscribers[events[i]] = _this.subscribers[events[i]] || { on: [], pause: [], before: [], after: [] };
        _this.subscribers[events[i]].after.push(callback);
      }
    };

    this.off = function(events) {
      events = events.split(',');
      for(var i = 0; i < events.length; i++) {
        delete _this.subscribers[events[i]];
      }
    };

    this.has = function(eventName, pos) {
      if (this.subscribers[eventName]) {
        if (!pos) {
          return true;
        } else {
          return this.subscribers[eventName][pos].length > 0;
        }
      } else {
        return false;
      }
    };

    this.connectTo = function(eventQueue) {
      _this.connections.push(eventQueue);
    };

    this.getEvents = function() {
      var res = [];
      for(var name in _this.subscribers) {
        res[res.length] = name;
      }
      return res;
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
          case 'pause':
            for (i = 0; i < eventSubscribers.on.length; i++) {
              result = eventSubscribers.pause[i].apply(_this.obj, args);
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

      if (this.enabled) {

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

      }

    };

    this.triggerBefore = function(event) {
      return this.triggerEx(event, 'before', arguments);
    };

    this.trigger = function(event) {
      return this.triggerEx(event, 'on', arguments);
    };

    this.triggerPause = function(event) {
      return this.triggerEx(event, 'pause', arguments);
    };

    this.triggerAfter = function(event) {
      return this.triggerEx(event, 'after', arguments);
    };

  }

  window.br = window.br || {};

  window.br.eventQueue = function(obj) {
    return new BrEventQueue(obj);
  };

})(window);

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

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global Int32Array */

;(function (window) {

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
        if (this.num_el<this.arr_size) {
          this.end++;
          this.arr[this.end] = elem;
          this.num_el++;
        } else {
          this.end = (this.end+1)%this.arr_size;
          this.begin = (this.begin+1)%this.arr_size;
          this.arr[this.end] = elem;
        }
      };

      this.get = function(i) {
        return this.arr[(this.begin+i)%this.arr_size];
      };

      this.size = function() {
        return this.num_el;
      };

      return this;

    }

    var count_frames = 0;
    var ringbuff = new buffer(20);

    this.fps = 0.0;
    this.timers = [];
    this.frame_timer = new stopwatch();

    this.add = function(subj) {
      this.timers.push([subj, new stopwatch()]);
    };

    this.new_frame = function() {
      ++count_frames;
      var i = 0;
      var n = this.timers.length | 0;
      for(i = 0; i < n; ++i) {
          var sw = this.timers[i][1];
          sw.reset();
      }

      if(count_frames >= 1) {
          this.frame_timer.stop();
          ringbuff.push_back(this.frame_timer.get_runtime());
          var size = ringbuff.size();
          var sum = 0;
          for(i = 0; i < size; ++i) {
              sum += ringbuff.get(i);
          }
          this.fps = size / sum * 1000;
          this.frame_timer.start();
      }
    };

    this.find_task = function(subj) {
      var n = this.timers.length | 0;
      var i = 0;
      for(i = 0; i < n; ++i) {
          var pair = this.timers[i];
          if(pair[0] === subj) {
              return pair;
          }
      }
      this.add(subj);
      return this.find_task(subj);
    };

    this.start = function(subj) {
      var task = this.find_task(subj);
      task[1].start();
    };

    this.stop = function(subj, printToConsole) {
      var task = this.find_task(subj);
      task[1].stop();
      if (printToConsole) {
        br.log(task[0] + ": " + task[1].get_runtime() + "ms");
      }
    };

    this.log = function(printToConsole) {
      var n = this.timers.length | 0;
      var i = 0;
      var str = "<strong>FPS: " + this.fps.toFixed(2) + "</strong>";
      var str2 = "FPS: " + this.fps.toFixed(2);
      for(i = 0; i < n; ++i) {
          var pair = this.timers[i];
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

  window.br = window.br || {};

  var profiler;

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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

  ;(function (window) {

    function BrWebCamera() {

      var _this = this;

      _this.events = br.eventQueue(this);
      _this.before = function(event, callback) { _this.events.before(event, callback); };
      _this.on     = function(event, callback) { _this.events.on(event, callback); };
      _this.after  = function(event, callback) { _this.events.after(event, callback); };

      var lastTime = 0;

      _this.requestAnimationFrame = function(callback, element) {

        var requestAnimationFrame =
          window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          window.oRequestAnimationFrame       ||
          window.msRequestAnimationFrame      ||
          function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };

        return requestAnimationFrame.call(window, callback, element);

      };

      _this.getUserMedia = function(options, success, error) {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
        } else {
          var getUserMedia =
            navigator.getUserMedia       ||
            navigator.mozGetUserMedia    ||
            navigator.webkitGetUserMedia ||
            navigator.msGetUserMedia     ||
            function(options, success, error) {
              error();
            };

          return getUserMedia.call(window, options, success, error);
        }

      };

      var elem = document.createElement('canvas');
      var canvasSupported = !!(elem.getContext && elem.getContext('2d'));
      elem.remove();

      _this.isSupported = function() {

        if (canvasSupported && (navigator.userAgent.search(/Chrome/) > -1 || navigator.userAgent.search(/Firefox/) > -1 || navigator.userAgent.search(/Safari/) > -1)) {
          return true;
        } else {
          return false;
        }

      };

      _this.connect = function(webCam) {

        if (_this.isSupported()) {
          try {
            var attempts = 0;

            var requestFrame = function () {
              if (webCam.readyState === webCam.HAVE_ENOUGH_DATA) {
                try {
                  _this.events.trigger('frame', webCam);
                } catch (Error) {

                }
              }
              _this.requestAnimationFrame(requestFrame);
            };

            var findVideoSize = function() {
              if (webCam.videoWidth > 0 && webCam.videoHeight > 0) {
                webCam.removeEventListener('loadeddata', readyListener);
                _this.events.trigger('connected', { width: webCam.videoWidth, height: webCam.videoWidth });
                _this.requestAnimationFrame(requestFrame);
              } else {
                if (attempts < 10) {
                  attempts++;
                  window.setTimeout(findVideoSize, 200);
                } else {
                  _this.events.trigger('connected', { width: 640, height: 480 });
                  _this.requestAnimationFrame(requestFrame);
                }
              }
            };

            var readyListener = function(event) {
              findVideoSize();
            };

            webCam.addEventListener('loadeddata', readyListener);

            $(window).on('unload', function() {
              webCam.pause();
              webCam.src = null;
            });

            _this.getUserMedia( { video: true }
                              , function(stream) {
                                  webCam.srcObject = stream;
                                  webCam.setAttribute('playsinline', true);
                                  window.setTimeout(function() {
                                    webCam.play();
                                  }, 500);
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

    }

    window.br = window.br || {};

    var webCamera;

    window.br.webCamera = function(params) {
      if (!webCamera) {
        webCamera = new BrWebCamera(params);
      }
      return webCamera;
    };

  })(window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global console */
/* global ArrayBuffer */
/* global Uint32Array */
/* global FormData */

;(function ($, window) {

  window.br = window.br || {};

  var baseUrl = '';
  var brightUrl = '';

  var scripts = $('script');

  for(var i = 0; i < scripts.length; i++) {
    var src = $(scripts[i]).attr('src');
    if (!br.isEmpty(src)) {
      if (/bright\/.+?[.]js/i.test(src)) {
        var idx = src.indexOf('vendor/');
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

  var logStarted = false;

  window.br.log = function(msg) {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.log.apply(this, arguments);
    }
  };

  window.br.logError = function(msg) {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.error.apply(this, arguments);
    }
  };

  window.br.logWarning = function(msg) {
    if (typeof(console) != 'undefined') {
      if (!logStarted) {
        console.log('*********************** LOG STARTED ***********************');
        logStarted = true;
      }
      console.warn.apply(this, arguments);
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
    return typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
  };

  window.br.isSafari = function() {
    return (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
  };

  window.br.isChrome = function() {
    return !!window.chrome && !br.isOpera(); // Chrome 1+
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

    function processQueued(processRowCallback, processCompleteCallback, params) {

      if (array.length > 0) {
        var rowid = array.shift();
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
      var div = document.createElement('div');
      var s = div.style;
      s.position = 'absolute';
      s.top = s.left = 0;
      s.visibility = 'hidden';
      document.body.appendChild(div);
      div.innerHTML = '<img src="' + images.join('" /><img src="') + '" />';
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

  function openUrl(url, options) {

    options = options || { };

    var s;

    if (options.urlTitle) {
      s = '<p>Click below to open link manually</p>'
        + '<p><a target="' + (options.target ? options.target : '_blank') + '" class="action-open-link" href="' + url + '" style="word-wrap: break-word">' + options.urlTitle + '</a></p>';
    } else {
      s = '<p>Click a <a target="' + (options.target ? options.target : '_blank') + '" class="action-open-link" href="' + url + '" style="word-wrap: break-word">here</a> to open link manually</p>';
    }

    var dialog = br.inform( 'You browser is currently blocking popups'
                          , s
                          + '<p>To eliminate this extra step, we recommend you modify your settings to disable the popup blocker.</p>'
                          );

    $('.action-open-link', dialog).on('click', function() {
      dialog.modal('hide');
      dialog.remove();
    });

  }

  window.br.openPage = function(url, options) {

    options = options || { };

    if (br.isSafari()) {
      br.openPopup(url, options);
    } else {
      var a = document.createElement('a');
      a.href = url;
      a.target = options.target ? options.target : '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

  };

  window.br.openPopup = function(url, options) {

    if (br.isString(options)) {
      options = { target: options };
    } else {
      options = options || { };
    }

    options.target = options.target || '_blank';

    if (window.br.popupBlocker == 'active') {
      openUrl(url, options);
    } else {
      var w, h;
      if (screen.width) {
        if (options.fullScreen) {
          w = screen.width;
        } else {
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
      if (screen.height) {
        if (options.fullScreen) {
          h = screen.height;
        } else {
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
      var win = window.open(url, options.target, settings);
      if (win) {
        window.br.popupBlocker = 'inactive';
        win.focus();
        return win;
      } else {
        window.br.popupBlocker = 'active';
        openUrl(url, options);
      }
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

  window.br.events = br.eventQueue();
  window.br.before = function(event, callback) { window.br.events.before(event, callback); };
  window.br.on     = function(event, callback) { window.br.events.on(event,     callback); };
  window.br.after  = function(event, callback) { window.br.events.after(event,  callback); };

  window.br.confirmClose = function(message) {
    if (message) {
      br.closeConfirmationMessage = message;
    }
    closeConfirmationRequired = true;
    window.br.events.trigger('closeConfirmationRequested');
  };

  window.br.resetCloseConfirmation = function(message) {
    closeConfirmationRequired = false;
    window.br.events.trigger('closeConfirmationReset');
  };

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

    $(window).on('resize', function() {
      resize();
    });

  };

  window.br.getSelection = function() {

    var html = '';

    if (typeof window.getSelection != 'undefined') {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var container = document.createElement('div');
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
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

  var ctx;

  window.br.beep = function(callback) {

    try {
      var duration = 0.1;
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
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

  window.br.URL = window.URL || window.webkitURL;

  var lastTime = 0;

  window.br.requestAnimationFrame = function(callback, element) {

    var requestAnimationFrame =
      window.requestAnimationFrame        ||
      window.webkitRequestAnimationFrame  ||
      window.mozRequestAnimationFrame     ||
      window.oRequestAnimationFrame       ||
      window.msRequestAnimationFrame      ||
      function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    return requestAnimationFrame.call(window, callback, element);

  };

  window.br.cancelAnimationFrame = function(id) {

    var cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      };

    return cancelAnimationFrame.call(window, id);

  };

  window.br.getUserMedia = function(options, success, error) {

    var getUserMedia =
      window.navigator.getUserMedia ||
      window.navigator.mozGetUserMedia ||
      window.navigator.webkitGetUserMedia ||
      window.navigator.msGetUserMedia ||
      function(options, success, error) {
          error();
      };

    return getUserMedia.call(window.navigator, options, success, error);

  };

  window.br.getAudioContext = function() {

    window.AudioContext = window.AudioContext ||
                          window.webkitAudioContext;

    return new AudioContext();

  };

  var isLittleEndian = true;

  window.br.detectEndian = function() {

    var buf = new ArrayBuffer(8);
    var data = new Uint32Array(buf);
    data[0] = 0xff000000;
    isLittleEndian = true;
    if (buf[0] === 0xff) {
      isLittleEndian = false;
    }

    return isLittleEndian;

  };

  if (window.addEventListener) {

    window.addEventListener('error', function(event) {
      var data = {
          message: event.message
        , data: null
        , filename: event.filename
        , lineno: event.lineno
        , colno: event.colno
        , stack: event.error ? (event.error.stack || event.error.backtrace || event.error.stacktrace) : null
        , location: document.location.toString()
      };

      var result = false;

      try {
        result = window.br.events.trigger('error', data);
      } catch (error) {

      }

      if (result) {
        event.preventDefault();
      }
    });

    window.addEventListener('unhandledrejection', function(event) {
      var data = {
          message: typeof event.reason == 'string' ? event.reason : null
        , data: typeof event.reason == 'string' ?  null : event.reason
        , filename: null
        , lineno: null
        , colno: null
        , stack: null
        , location: document.location.toString()
      };

      var result = false;

      try {
        result = window.br.events.trigger('error', data);
      } catch (error) {

      }

      window.br.logWarning('Unhandled Promise Rejection:' + (typeof event.reason == 'string' ? ' ' + event.reason : ''));
      if (typeof event.reason != 'string') {
        window.br.logWarning(event.reason);
      }

      event.preventDefault();
    });

  }

  function printObject(obj, eol, prefix) {

    var result = '';

    prefix = prefix ? prefix : '';
    for(var name in obj) {
      if (br.isObject(obj[name])) {
        result += printObject(obj[name], eol, prefix + name + '.');
      } else {
        result += prefix + name + ': ' + obj[name] + eol;
      }
    }

    return result;

  }

  window.br.setErrorsBeacon = function(url, format) {

    if (navigator.sendBeacon) {
      format = format || 'json';
      br.on('error', function(error) {
        var message = '', suffix;
        switch(format) {
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
        var data = new FormData();
        data.append('error', message);
        navigator.sendBeacon(url, data);
      });
    }

  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataSource(restServiceUrl, options) {

    var _this = this;

    _this.ajaxRequest = null;
    _this.name = '-';
    _this.options = options || {};

    _this.options.restServiceUrl = restServiceUrl;
    _this.options.restServiceUrlNormalized = restServiceUrl;

    if (!restServiceUrl.match(/[.]json$/) && !restServiceUrl.match(/\/$/)) {
      _this.options.restServiceUrlNormalized = restServiceUrl + '/';
    }

    _this.options.refreshDelay = _this.options.refreshDelay || 1500;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    _this.clientUID = null;

    var selectOperationCounter = 0;
    var refreshTimeout;

    _this.getClientUID = function() {

      if (!_this.clientUID) {
        _this.clientUID = Math.round(Math.random() * 100000);
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

    _this.insert = function(item, callback, options) {

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = item;

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'PUT'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: { 'X-Csrf-Token': br.request.csrfToken }
                 , success: function(response) {
                     var result, errorMessage;
                     if (_this.options.crossdomain) {
                       if (typeof response == 'string') {
                         result = false;
                         errorMessage = response.length > 0 ? response : 'Empty response. Was expecting new created records with ROWID.';
                       } else {
                         result = true;
                       }
                     } else {
                       if (response) {
                         result = true;
                       } else {
                         result = false;
                         errorMessage = 'Empty response. Was expecting new created records with ROWID.';
                       }
                     }
                     if (result) {
                       resolve({request: request, options: options, response: response});
                     } else {
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({request: request, options: options, errorMessage: errorMessage});
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

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = item;

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: { 'X-Csrf-Token': br.request.csrfToken }
                 , success: function(response) {
                     var operation = 'update';
                     if (response) {
                       var res = _this.events.trigger('removeAfterUpdate', item, response);
                       if ((res !== null) && res) {
                         operation = 'remove';
                       }
                     }
                     resolve({operation: operation, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({request: request, options: options, errorMessage: errorMessage});
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

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = {};

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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'DELETE'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: { 'X-Csrf-Token': br.request.csrfToken }
                 , success: function(response) {
                     resolve({rowid: rowid, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                       reject({rowid: rowid, request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 });

        } catch (errorMessage) {
          reject({rowid: rowid, request: request, options: options, errorMessage: errorMessage});
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
        filter = { };
      }

      var newFilter = {};
      for(var i in filter) {
        newFilter[i] = filter[i];
      }
      newFilter.__result = 'count';

      options = options || {};
      options.selectCount = true;

      return _this.select(newFilter, callback, options);

    };

    _this.selectOne = function(filter, callback, options) {

      if (typeof filter == 'function') {
        options = callback;
        callback = filter;
        filter = { };
      }

      options = options || { };
      options.selectOne = true;
      options.limit = 1;

      if (!br.isEmpty(filter)) {
        if (br.isNumber(filter)) {
          return _this.select({ rowid: filter }, callback, options);
        } else {
          return _this.select(filter, callback, options);
        }
      } else {
        return _this.select(filter, callback, options);
      }

    };

    _this.selectDeferred = _this.deferredSelect = function(filter, callback, msec) {

      return new Promise(function(resolve, reject) {

        msec = msec || _this.options.refreshDelay;
        var savedFilter = {};
        for(var i in filter) {
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
        // .select(callback, options);
        options = callback;
        callback = filter;
        filter = { };
      } else
      if ((callback != undefined) && (callback != null) && (typeof callback != 'function')) {
        // .select(filter, options);
        options = callback;
        callback = null;
      } else {
        // .select(filter, callback, options);
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = {};
        var requestRowid;

        var selectOne = options && options.selectOne;
        var selectCount = options && options.selectCount;
        var singleRespone = selectOne || selectCount;

        if (selectOne) {
          options.limit = 1;
        }

        if (!br.isEmpty(filter)) {
          if (!br.isNumber(filter) && !br.isObject(filter)) {
            reject({request: request, options: options, errorMessage: 'Unacceptable filter parameters'});
            return _this;
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

        var url;

        if (selectOne && requestRowid) {
          url = _this.options.restServiceUrlNormalized + requestRowid;
        } else {
          url = _this.options.restServiceUrl;
        }

        var proceed = true;

        if (!disableEvents) {
          try {
            _this.events.triggerBefore('request', request, options);
          } catch(e) {
            br.log(e);
            proceed = false;
          }
          try {
            _this.events.triggerBefore('select', request, options);
          } catch(e) {
            br.log(e);
            proceed = false;
          }
          disableEvents = options && options.disableEvents;
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

          for(var paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          _this.ajaxRequest = $.ajax({ type: 'GET'
                                     , data: request
                                     , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                                     , url: url + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                                     , headers: { 'X-Csrf-Token': br.request.csrfToken }
                                     , success: function(response) {
                                         try {
                                           _this.ajaxRequest = null;
                                           if (br.isArray(response)) {
                                             for(var i = 0; i < response.length; i++) {
                                               _this.events.trigger('calcFields', response[i]);
                                             }
                                           }
                                           if ((_this.options.crossdomain && (typeof response == 'string')) || br.isNull(response)) {
                                             reject({request: request, options: options, errorMessage: 'Unknown error'});
                                           } else {
                                             if (singleRespone && br.isArray(response)) {
                                               if (response.length > 0) {
                                                 response = response[0];
                                               } else {
                                                 reject({request: request, options: options, errorMessage: 'Record not found'});
                                                 return;
                                               }
                                             } else
                                             if (!singleRespone && !br.isArray(response)) {
                                               response = [response];
                                             }
                                             if (selectCount) {
                                               response = parseInt(response);
                                             }
                                             resolve({request: request, options: options, response: response});
                                           }
                                         } finally {
                                           selectOperationCounter--;
                                         }
                                       }
                                     , error: function(jqXHR, textStatus, errorThrown) {
                                         try {
                                           _this.ajaxRequest = null;
                                           if (!br.isUnloading()) {
                                             var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                                             reject({request: request, options: options, errorMessage: errorMessage});
                                           }
                                         } finally {
                                           selectOperationCounter--;
                                         }
                                       }
                                     });
        }

      }).then(function(data) {
        try {
          if (!disableEvents) {
            _this.events.trigger('select', data.response, data.request, data.options);
            _this.events.triggerAfter('select', true, data.response, data.request, data.options);
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
        options  = callback;
        callback = params;
        params   = {};
      }

      if (callback && (typeof callback != 'function')) {
        options  = callback;
        callback = undefined;
      }

      options = options || { };

      var disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        var request = params || { };

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

        for(var paramName in request) {
          if (request[paramName] === null) {
            request[paramName] = 'null';
          }
        }

        $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
               , data: request
               , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
               , url: _this.options.restServiceUrlNormalized + method + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
               , headers: { 'X-Csrf-Token': br.request.csrfToken }
               , success: function(response) {
                   if (_this.options.crossdomain && (typeof response == 'string')) {
                     reject({method: method, request: request, options: options, errorMessage: response});
                   } else {
                     resolve({method: method, request: request, options: options, response: response});
                   }
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (!br.isUnloading()) {
                     var errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
                     reject({method: method, request: request, options: options, errorMessage: errorMessage});
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

    _this.fillCombo = function(selector, data, options) {

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

  }

  window.br = window.br || {};

  window.br.dataSource = function (restServiceUrl, options) {
    return new BrDataSource(restServiceUrl, options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrTable(selector, options) {

    var _this = this;

    var initialized = false;

    var table = $(selector);
    var thead = $('thead', table);
    var tbody = $('tbody', table);

    var tableCopy;
    var theadCopy;
    var tbodyCopy;
    var theadColsCopy;
    var tbodyColsCopy;

    var calcDiv;
    var imagesCounter = 0;

    _this.options = options || { };

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
        var windowHeight = $(window).height();
        var tableTop     = table.offset().top;
        var tbodyHeight  = windowHeight - tableTop - thead.height();
        if (_this.options.debug) {
          tbodyHeight -= 200;
        } else {
          tbodyHeight -= 10;
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
        var c = $(container);
        var v = Math.round(value);
        var e = c.find('span.br-table-debug');
        if (e.length == 0) {
          c.append('<br /><span class="br-table-debug">' + v + '</span>');
        } else {
          e.text(v);
        }
      }

    }

    function getWidths() {

      var widths = {};

      theadColsCopy.each(function(idx) {
        var w = $(this)[0].getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0, m: 0 };
      });

      tbodyColsCopy.each(function(idx) {
        var w = $(this)[0].getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0, m: 0 };
      });

      return widths;

    }

    function createCopy() {

      tableCopy = table.clone();
      theadCopy = $('thead', tableCopy);
      tbodyCopy = $('tbody', tableCopy);
      theadColsCopy = theadCopy.find('tr:first th');
      tbodyColsCopy = tbodyCopy.find('tr:first td');

      theadCopy.css('display', '').css('overflow', '');
      tbodyCopy.css('display', '').css('overflow', '');

      theadColsCopy.each(function(idx) {
        var c = $(this);
        c.css('min-width', '').css('max-width', '');
      });

      tbodyColsCopy.each(function(idx) {
        var c = $(this);
        c.css('min-width', '').css('max-width', '');
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
        thead.css({ 'display': 'block', 'overflow': 'hidden' });
        tbody.css({ 'display': 'block', 'overflow': 'auto' });
        table.css({ 'border-bottom': '0px', 'border-left': '0px', 'border-right': '0px' });
        initialized = true;
      }

      if (!tableCopy || !skipCalcDivReloading) {
        createCopy();
      }

      window.setTimeout(function() {

        var widths = getWidths();

        var headerCols = table.find('thead tr:first th');

        headerCols.each(function(idx) {
          var w = widths[idx].h;
          var c = $(this);
          debugValue(c, w);
          c.css({ 'min-width': w, 'max-width': w });
        });

        var bodyCols   = table.find('tbody tr:first td');

        bodyCols.each(function(idx) {
          var w = widths[idx].h;
          var c = $(this);
          debugValue(c, w);
          c.css({ 'min-width': w, 'max-width': w });
        });

        autosize();

        if (imagesCounter == 0) {
          calcDiv.html('');
          tableCopy.remove();
          tableCopy = null;
        }

      });

    }

    var updateTimer;

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
      autosize();
    });

    _this.update();

    return this;

  }

  window.br = window.br || {};

  window.br.table = function(selector, options) {
    return new BrTable($(selector), options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    var _this = this;

    this.selector = selector;

    this.options = options || {};

    this.options.templates          = this.options.templates || {};

    this.options.templates.noData   = this.options.templates.noData || '.data-empty-template';

    this.options.templates.row      = $(rowTemplate).html();
    this.options.templates.groupRow = this.options.templates.groupRow ? $(this.options.templates.groupRow).html() : '';
    this.options.templates.header   = this.options.templates.header   ? $(this.options.templates.header).html() : '';
    this.options.templates.footer   = this.options.templates.footer   ? $(this.options.templates.footer).html() : '';
    this.options.templates.noData   = this.options.templates.noData   ? $(this.options.templates.noData).html() : '';

    this.options.templates.row      = this.options.templates.row      || '';
    this.options.templates.groupRow = this.options.templates.groupRow || '';
    this.options.templates.header   = this.options.templates.header   || '';
    this.options.templates.footer   = this.options.templates.footer   || '';
    this.options.templates.noData   = this.options.templates.noData   || '';

    this.templates = {};

    this.templates.row      = this.options.templates.row.length > 0      ? br.compile(this.options.templates.row)      : function() { return ''; };
    this.templates.groupRow = this.options.templates.groupRow.length > 0 ? br.compile(this.options.templates.groupRow) : function() { return ''; };
    this.templates.header   = this.options.templates.header.length > 0   ? br.compile(this.options.templates.header)   : function() { return ''; };
    this.templates.footer   = this.options.templates.footer.length > 0   ? br.compile(this.options.templates.footer)   : function() { return ''; };
    this.templates.noData   = this.options.templates.noData.length > 0   ? br.compile(this.options.templates.noData)   : function() { return ''; };

    this.options.selectors          = this.options.selectors || {};

    this.options.selectors.header   = this.options.selectors.header || this.options.headersSelector || this.selector;
    this.options.selectors.footer   = this.options.selectors.footer || this.options.footersSelector || this.selector;
    this.options.selectors.remove   = this.options.selectors.remove || this.options.deleteSelector  || '.action-delete';

    this.options.dataSource = dataSource;

    this.dataSource = this.options.dataSource;
    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname + ':' + this.dataSource.options.restServiceUrl;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    if (this.options.fixedHeader) {
      this.table = br.table($(this.selector).closest('table'), options);
    }

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

    this.after('change', function() {
      if (this.table) {
        this.table.update();
      }
    });

    var disconnected = false;

    this.setStored = function(name, value) {
      br.storage.set(this.storageTag + 'stored:' + name, value);
    };

    this.getStored = function(name, defaultValue) {
      return br.storage.get(this.storageTag + 'stored:' + name, defaultValue);
    };

    this.isDisconnected = function() {
      return disconnected;
    };

    this.disconnectFromDataSource = function() {
      disconnected = true;
    };

    this.reconnectWithDataSource = function() {
      disconnected = false;
    };

    this.renderHeader = function(data, asString) {
      data = _this.events.trigger('renderHeader', data) || data;
      var s = _this.templates.header(data);
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    this.renderFooter = function(data, asString) {
      data = _this.events.trigger('renderFooter', data) || data;
      var s =  _this.templates.footer(data);
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    this.renderRow = function(data, asString) {
      data = _this.events.trigger('renderRow', data) || data;
      var s = _this.templates.row(data).trim();
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    this.renderGroupRow = function(data, asString) {
      data = _this.events.trigger('renderGroupRow', data) || data;
      var s = _this.templates.groupRow(data).trim();
      if (asString) {
        return s;
      } else
      if (s.length > 0) {
        var result = $(s);
        if (_this.options.storeDataRow) {
          result.data('data-row', data);
        }
        return result;
      } else {
        return null;
      }
    };

    this.prepend = function(row) {
      return $(_this.selector).prepend(row);
    };

    this.append = function(row) {
      return $(_this.selector).append(row);
    };

    this.insertDataRowAfter = function(row, selector) {
      var tableRow = _this.renderRow(row);
      if (tableRow) {
        $(tableRow).insertAfter(selector);
      }
      return tableRow;
    };

    this.addDataRow = function(row, disableEvents) {
      var tableRow = _this.renderRow(row);
      if (tableRow) {
        _this.events.triggerBefore('insert', row, tableRow);
        _this.events.trigger('insert', row, tableRow);
        if (_this.options.appendInInsert) {
          _this.append(tableRow);
        } else {
          _this.prepend(tableRow);
        }
        if (!disableEvents) {
          _this.events.triggerAfter('renderRow', row, tableRow);
          _this.events.triggerAfter('insert', row, tableRow);
        }
      }
      return tableRow;
    };

    this.hasRow = function(rowid) {
      var row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      return (row.length > 0);
    };

    this.reloadRow = function(rowid, callback, options) {
      if (!br.isEmpty(callback)) {
        if (typeof callback != 'function') {
          options = callback;
          callback = null;
        }
      }
      options = options || { };
      options.disableEvents = true;
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      var filter;
      if (br.isObject(rowid)) {
        filter = rowid;
      } else {
        filter = { rowid: rowid };
      }
      _this.dataSource.select(filter, function(result, response) {
        if (!result || (response.length === 0)) {
          if (!options.reloadOnlyRow) {
            _this.refresh(function(result, response) {
              if (typeof callback == 'function') {
                callback.call(_this, result, response, false);
              }
            });
          }
        } else {
          response = response[0];
          if (_this.refreshRow(response, options)) {

          } else {
            if (_this.isEmpty()) {
              $(_this.selector).html('');
            }
            _this.addDataRow(response);
          }
          if (typeof callback == 'function') {
            callback.call(_this, result, response, true);
          }
        }
      }, options);
    };

    function checkForEmptyGrid() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        $(_this.selector).html(_this.templates.noData());
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      }
    }

    this.removeRow = function(rowid, options) {
      var filter = '[data-rowid=' + rowid + ']';
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      var row = $(_this.selector).find(filter);
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        checkForEmptyGrid();
        _this.events.triggerAfter('remove', rowid, row);
      } else
      if (!_this.options.singleRowMode) {
        _this.dataSource.select();
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

    _this.refreshRow = function(data, options) {
      var filter = '[data-rowid=' + data.rowid + ']';
      options = options || {};
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      var row = $(_this.selector).find(filter);
      if (row.length > 0) {
        var tableRow = _this.renderRow(data);
        if (tableRow) {
          if (_this.options.storeDataRow) {
            tableRow.data('data-row', data);
          }
          _this.events.triggerBefore('update', data);
          _this.events.trigger('update', data, row);
          $(row[0]).before(tableRow);
          row.remove();
          _this.events.triggerAfter('renderRow', data, tableRow);
          _this.events.triggerAfter('update', data, tableRow);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    _this.loadMore = function(callback) {
      if (noMoreData || _this.loadingMoreData) {

      } else {
        _this.loadingMoreData = true;
        _this.dataSource.select({}, function(result, response) {
          if (typeof callback == 'function') { callback.call(_this, result, response); }
          _this.loadingMoreData = false;
        }, { loadingMore: true });
      }
    };

    _this.isEmpty = function() {
      return ($(_this.selector).find('[data-rowid]').length === 0);
    };

    _this.getKeys = function(attrName) {
      var result = [];
      if (!attrName) {
        attrName = 'data-rowid';
      }
      $('[' + attrName + ']', $(_this.selector)).each(function() {
        result.push(br.toInt($(this).attr(attrName)));
      });
      return result;
    };

    _this.isOrderConfigured = function() {
      var orderAndGroup = _this.getOrderAndGroup();
      return br.isArray(orderAndGroup) && (orderAndGroup.length > 0);
    };

    function saveOrderAndGroup(orderAndGroup) {
      br.storage.set(_this.storageTag + 'orderAndGroup', orderAndGroup);
      return orderAndGroup;
    }

    function showOrder(orderAndGroup) {
      for(var i = 0; i < orderAndGroup.length; i++) {
        var ctrl = $('.sortable[data-field="' + orderAndGroup[i].fieldName + '"].' + (orderAndGroup[i].asc ? 'order-asc' : 'order-desc'), $(_this.options.selectors.header));
        ctrl.addClass('icon-white').addClass('icon-border').addClass('fa-border');
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

    _this.getOrder = function() {
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

    _this.setOrder = function(order, callback) {
      var orderAndGroup = [];
      for(var name in order) {
        orderAndGroup.push({ fieldName: name, asc: order[name] > 0, group: false, index: orderAndGroup.length });
      }
      _this.setOrderAndGroup(orderAndGroup, callback);
    };

    _this.getOrderAndGroup = function() {
      var result = br.storage.get(_this.storageTag + 'orderAndGroup', []);
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
        var sorted = ($(this).hasClass('icon-white') || $(this).hasClass('icon-border') || $(this).hasClass('fa-border'));
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
        _this.setOrderAndGroup(orderAndGroup, true);
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
          if (_this.refreshRow(data, _this.options)) {

          } else
          if (!_this.options.singleRowMode) {
            _this.dataSource.select();
          }
        });

        _this.dataSource.on('remove', function(rowid) {
          _this.removeRow(rowid, _this.options);
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

        if (br.isString(_this.selector)) {
          br.editable(_this.selector + ' .editable', function(content) {
            var $this = $(this);
            var rowid = $this.closest('[data-rowid]').attr('data-rowid');
            var dataField = $this.attr('data-field');
            if (!br.isEmpty(rowid) && !br.isEmpty(dataField)) {
              var data = {};
              data[dataField] = content;
              _this.dataSource.update( rowid
                                     , data
                                     , function(result, response) {
                                         if (result) {
                                           _this.events.trigger('editable.update', $this, content);
                                         }
                                       }
                                     );
            }
          });
        }

      }

    };

    this.render = function(data, loadingMoreData) {
      var $selector = $(_this.selector);
      var tableRow;
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
                tableRow = _this.renderHeader(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.header).append(tableRow);
                }
              }
            }
          }
          if (data.footers) {
            for (i in data.footers) {
              if (data.footers[i]) {
                tableRow = _this.renderFooter(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.footer).append(tableRow);
                }
              }
            }
          }
          $(_this.options.selectors.header).html('');
          $(_this.options.selectors.footer).html('');
          if (data.rows) {
            if (data.rows.length === 0) {
              $selector.html(_this.templates.noData());
            } else {
              for (i in data.rows) {
                if (data.rows[i]) {
                  if (data.rows[i].row) {
                    tableRow = _this.renderRow(data.rows[i].row);
                    if (tableRow) {
                      $selector.append(tableRow);
                    }
                  }
                  if (data.rows[i].header) {
                    tableRow = _this.renderHeader(data.rows[i].header);
                    if (tableRow) {
                      $(_this.options.selectors.header).append(tableRow);
                    }
                  }
                  if (data.rows[i].footer) {
                    tableRow = _this.renderFooter(data.rows[i].footer);
                    if (tableRow) {
                      $(_this.options.selectors.footer).append(tableRow);
                    }
                  }
                }
              }
            }
          } else {
            $selector.html(_this.templates.noData());
          }
        } else {
          if (data && (data.length > 0)) {
            var group = _this.getOrderAndGroup();
            var groupValues = {};
            var groupFieldName = '';
            for (i = 0; i < data.length; i++) {
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
                      tableRow = _this.renderGroupRow(tmp);
                      if (tableRow) {
                        $selector.append(tableRow);
                        _this.events.triggerAfter('renderGroupRow', data[i], tableRow);
                      }
                    }
                  }
                }
                tableRow = _this.renderRow(data[i]);
                if (tableRow) {
                  $selector.append(tableRow);
                  _this.events.triggerAfter('renderRow', data[i], tableRow);
                }
              }
            }
          } else
          if (!loadingMoreData) {
            $selector.html(_this.templates.noData());
          }
        }
      } else {
        $selector.html(_this.templates.noData());
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataCombo(selector, dataSource, options) {

    var _this = this;

    var beautified = false;
    var beautifier = '';
    var currentData = [];
    var requestTimer;

    _this.selector = $(selector);

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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
      var result = null;
      _this.selector.find('option').each(function() {
        var val = $(this).val();
        if (!br.isEmpty(val)) {
          if (br.isEmpty(result)) {
            result = val;
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

    function getName(data) {
      if (br.isFunction(_this.options.onGetName)) {
        return _this.options.onGetName.call(_this, data);
      } else {
        var item = { value: data[_this.options.keyField]
                   , name: data[_this.options.nameField]
                   };
        _this.events.trigger('formatItem', item, data);
        return item.name;
      }
    }

    function beautify() {
      var selectLimit = 50;

      if (_this.isValid() && !_this.options.noDecoration && !_this.selector.attr('size')) {
        if (window.Select2) {
          if (_this.options.lookupMode && beautified) {
            return;
          } else {
            var params = {};
            if (_this.options.hideSearchBox) {
              params.minimumResultsForSearch = -1;
            }
            if (_this.options.skipTranslate) {
              params.dropdownCssClass = 'skiptranslate';
            }
            if (_this.options.allowClear) {
              params.allowClear  = _this.options.allowClear;
              params.placeholder = _this.options.emptyName;
            }
            params.dropdownAutoWidth = true;
            params.dropdownCss = { 'max-width': '400px' };
            if (_this.options.lookupMode) {
              params.minimumInputLength = _this.options.lookup_minimumInputLength;
              params.allowClear  = true;
              params.placeholder = _this.options.emptyName;
              params.query = function (query) {
                window.clearTimeout(requestTimer);
                var request = { };
                request.keyword = query.term;
                requestTimer = window.setTimeout(function() {
                  if (query.term || _this.options.lookup_minimumInputLength === 0) {
                    _this.dataSource.select(request, function(result, response) {
                      if (result) {
                        var data = { results: [] };
                        for(var i = 0; i < response.length; i++) {
                          data.results.push({ id:   response[i][_this.options.valueField]
                                            , text: getName(response[i])
                                            });
                        }
                        if (response.length == selectLimit) {
                          data.more = true;
                        }
                        query.callback(data);
                      }
                    }, { limit: selectLimit
                       , skip: (query.page - 1) * selectLimit
                       }
                    );
                  }
                }, 300);
              };
            }
            _this.selector.select2(params);
            beautified = true;
            beautifier = 'select2';
          }
        } else
        if (window.Selectize && !beautified) {
          _this.selector.selectize({openOnFocus: false});
          beautified = true;
          beautifier = 'selectize';
        }
      }
    }

    function setValue(value) {
      _this.selector.val(value);
      switch(beautifier) {
        case 'select2':
          break;
        case 'selectize':
          _this.selector[0].selectize.setValue(value);
          break;
      }
    }

    _this.selected = function(fieldName) {
      if (br.isArray(currentData)) {
        if (currentData.length > 0) {
          var val = _this.val();
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
          setValue(value);
          beautify();
          if (_this.options.lookupMode) {
            if (value) {
              var data = { id: value, text: value };
              var request = { rowid: value };
              _this.selector.select2('data', data);
              var options = { disableEvents: true };
              _this.dataSource.events.triggerBefore('selectByRowid', request, options);
              _this.dataSource.select(request, function(result, response) {
                if (result) {
                  if (response.length > 0) {
                    response = response[0];
                    data = { id: response[_this.options.valueField]
                           , text: getName(response)
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
        var val = _this.selector.val();
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
        var val = _this.val();
        return br.isEmpty(val) ? null : val;
      } else {
        return undefined;
      }
    };

    _this.disableOption = function(value) {
      _this.selector.find('option[value=' + value + ']').attr('disabled', 'disabled');
    };

    _this.disableAllOptions = function(value) {
      _this.selector.find('option').attr('disabled', 'disabled');
    };

    _this.enableOption = function(value) {
      _this.selector.find('option[value=' + value + ']').removeAttr('disabled');
    };

    _this.enableAllOptions = function(value) {
      _this.selector.find('option').removeAttr('disabled');
    };

    _this.reset = function(triggerChange) {
      br.storage.remove(storageTag(_this.selector));
      br.session.remove(storageTag(_this.selector));
      if (_this.isValid()) {
        _this.selector.val('');
        if (triggerChange) {
          _this.selector.trigger('change');
        } else {
          beautify();
        }
      }
    };

    _this.selector.on('reset', function() {
      _this.reset();
    });

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

      if (!_this.options.lookupMode) {

        if (_this.options.saveSelection) {
          if (_this.options.saveToSessionStorage) {
            _this.options.selectedValue = br.session.get(storageTag(_this.selector));
          } else {
            _this.options.selectedValue = br.storage.get(storageTag(_this.selector));
          }
        }

        _this.selector.each(function() {
          var _selector = $(this);
          var val = _selector.val();
          if (br.isEmpty(val)) {
            val = _selector.attr('data-value');
            _selector.removeAttr('data-value');
          }
          _selector.html('');

          var s = '';
          var cbObj = {};
          cbObj.data = data;
          if (_this.options.hideEmptyValue || (_this.options.autoSelectSingle && (data.length == 1))) {

          } else {
            cbObj.s = s;
            _this.events.triggerBefore('generateEmptyOption', cbObj, _selector);
            s = cbObj.s;
            if (_this.options.allowClear) {
              s = s + '<option></option>';
            } else {
              s = s + '<option value="' + _this.options.emptyValue + '">' + _this.options.emptyName + '</option>';
            }
          }

          cbObj.s = s;
          _this.events.triggerBefore('generateOptions', cbObj, _selector);
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
          _selector.html(s);

          if (!br.isEmpty(_this.options.selectedValue)) {
            _selector.find('option[value=' + _this.options.selectedValue +']').attr('selected', 'selected');
          } else
          if (!br.isEmpty(val)) {
            if (br.isArray(val)) {
              for (var k = 0; k < val.length; k++) {
                _selector.find('option[value=' + val[k] +']').attr('selected', 'selected');
              }
            } else {
              _selector.find('option[value=' + val +']').attr('selected', 'selected');
            }
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

        var options = { fields: _this.options.fields };

        if (_this.dataSource) {
          if (_this.isValid()) {
            if (_this.options.lookupMode) {
              resolve({ request: {}, options: options, response: []});
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
            resolve({ request: {}, options: options, response: []});
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

    var prevValue = _this.val();

    _this.getPrevValue = function() {
      return prevValue;
    };

    _this.selector.on('change', function() {
      if (_this.options.saveSelection) {
        if (_this.options.saveToSessionStorage) {
          br.session.set(storageTag(this), $(this).val());
        } else {
          br.storage.set(storageTag(this), $(this).val());
        }
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

      var thereWasDataSource = (typeof _this.dataSource != 'undefined');

      _this.dataSource = _this.dataSource || dataSource;

      options = options || Object.create({});

      _this.options = _this.options || Object.create({});

      for(var optionName in options) {
        _this.options[optionName] = options[optionName];
      }

      _this.options.fields = _this.options.fields || Object.create({});

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
                _this.selector.find('option[value=' + data[_this.options.valueField] +']').text(getName(data));
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
                _this.selector.find('option[value=' + data[_this.options.valueField] +']').remove();
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

  window.br = window.br || {};

  window.br.dataCombo = function (selector, dataSource, options) {
    var instance = $(selector).data('BrDataCombo');
    if (!instance) {
      instance = new BrDataCombo(selector, dataSource, options);
    }
    return instance.applyOptions(dataSource, options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global jQuery */

;(function ($, window) {

  function BrDraggable(ctrl, options) {

    var _this = this;

    var dragObject = null;
    var dragHandler = null;
    var pos_y, pos_x, ofs_x, ofs_y;

    options = options || {};
    options.exclude = [ 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON' ];

    function setPosition(element, left, top) {
      element.style.marginTop = '0px';
      element.style.marginLeft = '0px';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
    }

    function downHandler(e) {
      var target = e.target || e.srcElement;
      var parent = target.parentNode;

      if (target && (options.exclude.indexOf(target.tagName.toUpperCase()) == -1)) {
        if (!parent || (options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) {  // img in a
          dragObject = ctrl;

          var pageX = e.pageX || e.touches[0].pageX;
          var pageY = e.pageY || e.touches[0].pageY;

          ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
          ofs_y = dragObject.getBoundingClientRect().top  - dragObject.offsetTop;

          pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
          pos_y = pageY - (dragObject.getBoundingClientRect().top  + document.body.scrollTop);

          e.preventDefault();
        }
      }
    }

    function moveHandler(e) {
      if (dragObject !== null) {
        var pageX = e.pageX || e.touches[0].pageX;
        var pageY = e.pageY || e.touches[0].pageY;
        var left = pageX - pos_x - ofs_x - document.body.scrollLeft;
        var top  = pageY - pos_y - ofs_y - document.body.scrollTop;

        setPosition(dragObject, left, top);
        if (options.ondrag) {
          options.ondrag.call(e);
        }
      }
    }

    function upHandler(e) {
      if (dragObject !== null) {
        dragObject = null;
      }
    }

    if (options.handler) {
      dragHandler = ctrl.querySelector(options.handler);
    } else {
      dragHandler = ctrl;
    }

    if (dragHandler) {

      dragHandler.style.cursor = 'move';
      ctrl.style.position = 'fixed';

      if (dragHandler.__br_draggable) {
        return dragHandler.__br_draggable;
      }

      dragHandler.addEventListener('mousedown', function(e) {
        downHandler(e);
      });

      window.addEventListener('mousemove', function(e) {
        moveHandler(e);
      });

      window.addEventListener('mouseup', function(e) {
        upHandler(e);
      });

      dragHandler.addEventListener('touchstart', function(e) {
        downHandler(e);
      });

      window.addEventListener('touchmove', function(e) {
        moveHandler(e);
      });

      window.addEventListener('touchend', function(e) {
        upHandler(e);
      });

      dragHandler.__br_draggable = _this;

    }

    return _this;

  }

  window.br = window.br || {};

  window.br.draggable = function (selector, options) {
    var result = [];
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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
    _this.options = options || {};
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
        _this.ctrl.text('');
        var isTextarea = (_this.ctrl.attr('data-editable-type') == 'textarea');
        if (isTextarea) {
          _this.editor = $('<textarea rows="3"></textarea>');
        } else {
          _this.editor = $('<input type="text" />');
        }
        _this.editor.addClass('form-control');
        _this.editor.addClass('br-editable-control');
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
        _this.editor.on('keydown', function(e) {
          if (e.keyCode == 9) {
            var content = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'keyup');
            } else {
              _this.apply(content);
            }
            e.stopPropagation();
            e.preventDefault();
          }
        });
        _this.editor.on('keyup', function(e) {
          var content = _this.editor.val();
          switch (e.keyCode) {
            case 13:
              if (_this.options.onSave) {
                _this.options.onSave.call(_this.ctrl, content, 'keyup');
              } else {
                _this.apply(content);
              }
              e.stopPropagation();
              break;
            case 27:
              _this.cancel();
              e.stopPropagation();
              break;
          }
        });
        _this.editor.on('blur', function(e) {
          var ok = true;
          if (_this.options.onBlur) {
            ok = _this.options.onBlur.call(_this.ctrl, e);
          }
          if (ok) {
            var content = _this.editor.val();
            if (_this.options.onSave) {
              _this.options.onSave.call(_this.ctrl, content, 'blur');
            } else {
              _this.apply(content);
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

  }

  window.br = window.br || {};

  window.br.editable = function(selector, callback, value) {
    if (typeof callback == 'string') {
      if ($(selector).hasClass('br-editable-control')) {
        selector = $(selector).parent();
      }
      var data = $(selector).data('brEditable-editable');
      switch (callback) {
        case 'exists':
          if (data) {
            return true;
          } else {
            return false;
          }
          break;
        case 'get':
        case 'apply':
        case 'save':
        case 'cancel':
        case 'click':
          if (!data) {
            $(selector).data('brEditable-editable', (data = new BrEditable($(selector), callback)));
          }
          if (data) {
            return data[callback](value);
          }
          break;
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* jshint scripturl:true */

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
    options.onConfirm = options.onConfirm || callback;

    var i;

    var s = '<div class="br-modal-confirm modal';
    if (options.cssClass) {
      s = s + ' ' + options.cssClass;
    }
    s += '">';

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
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">' + message + checkBoxes + '</div>' +
            '<div class="modal-footer">';
    if (options.showDontAskMeAgain) {
      var dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      s = s + '<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">' +
              '<input name="showDontAskMeAgain" type="checkbox" value="1"> ' + dontAskMeAgainTitle +
              '</label>';
    }
    if (br.isEmpty(buttons)) {
      var yesTitle    = options.yesTitle || br.trn('Yes');
      var yesLink     = options.yesLink || 'javascript:;';
      var targetBlank = options.yesLink && !options.targetSamePage;
      s = s + '<a href="' + yesLink + '" ' + (targetBlank ? 'target="_blank"' : '') + ' class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;' + yesTitle + '&nbsp;</a>';
    } else {
      for(i in buttons) {
        s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-close" rel="' + i + '">&nbsp;' + buttons[i] + '&nbsp;</a>';
      }
    }
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel" rel="cancel">&nbsp;' + options.cancelTitle + '&nbsp;</a>';
    s = s + '</div></div></div></div>';

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    var remove = true;

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onShow) {
          options.onShow.call(modal);
        }
        $(this).find('.action-confirm-close').on('click', function() {
          var button = $(this).attr('rel');
          var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
          var checks = {};
          $('input.confirm-checkbox').each(function(){
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
          var button = 'cancel';
          var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
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

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove) {
          if (options.onCancel) {
            var button = 'cancel';
            var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
            options.onCancel(button, dontAsk);
          }
          modal.remove();
        }
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.defaultButton) {
          var btn = $(this).find('.modal-footer a.btn[rel=' + options.defaultButton + ']');
          if (btn.length > 0) {
            btn[0].focus();
          }
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (remove) {
          modal.remove();
        }
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  window.br.error = function(title, message, callback, options) {

    if (callback) {
      if (typeof callback != 'function') {
        options  = callback;
        callback = null;
      }
    }

    options = options || {};

    var buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalError').length > 0) {
      var currentMessage = $('#br_modalError .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalError').off('hide.bs.modal');
      $('#br_modalError').modal('hide');
      $('#br_modalError').remove();
    }

    var s = '<div class="modal" id="br_modalError" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';
    if (title !== '') {
      s = s + '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>';
    }
    s = s + '<div class="modal-body" style="overflow-y:auto;">' + message + '</div>' +
            '<div class="modal-footer" style="background-color:red;">';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn(buttonTitle) + '&nbsp;</a><';
    s = s + '/div></div></div></div>';
    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          callback.call(this);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        modal.remove();
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

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

    if ($('#br_modalInform').length > 0) {
      var currentMessage = $('#br_modalInform .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
        message = message + '<br /><br />' + currentMessage;
      }
      $('#br_modalInform').off('hide.bs.modal');
      $('#br_modalInform').modal('hide');
      $('#br_modalInform').remove();
    }

    var s = '<div class="modal" id="br_modalInform" data-backdrop="static">' +
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

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        var dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
        if (callback) {
          callback.call(this, dontAsk);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        modal.remove();
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

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

    if (options.onhide) {
      options.onHide = options.onhide;
    }

    var s = '<div class="br-modal-prompt modal" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3 class="modal-title">' + title + '</h3></div>' +
            '<div class="modal-body" style="overflow-y:auto;">';
    for(var i in inputs) {
      if (br.isObject(inputs[i])) {
        s = s + '<label>' + i + '</label>' +
              '<input type="text" ' + (inputs[i].id ? 'id="'+inputs[i].id+'"' : '') + ' class="span4 ' + (br.isEmpty(inputs[i]['class']) ? '' : inputs[i]['class']) + '" value="' + inputs[i].value + '" />';
      } else {
        s = s + '<label>' + i + '</label>' +
                '<input type="text" class="form-control ' + (options.valueType == 'int' ? ' input-small' : ' justified') + (options.valueRequired ? ' required' : '') + ' " value="' + inputs[i] + '" />';
      }
    }

    s = s + '</div>' +
            '<div class="modal-footer">';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm" >Ok</a>';
    s = s + '<a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">&nbsp;' + br.trn('Cancel') + '&nbsp;</a>';
    s = s + '</div></div></div></div>';

    var modal = $(s);

    var oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    var remove = true;

    $(modal).on('keypress', 'input', function(event) {
      if (event.keyCode == 13) {
        $(modal).find('a.action-confirm-close').trigger('click');
      }
    });

    $(modal).on('show.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('.action-confirm-close').on('click', function() {
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
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        $(this).find('input[type=text]')[0].focus();
      }
    });

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
      }
    });

    $(modal).on('hidden.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (remove) {
          modal.remove();
        }
        if (oldActiveElement) {
          oldActiveElement.focus();
        }
      }
    });

    $(modal).modal('show');

    return modal;

  };

  var noTemplateEngine = false;

  window.br.compile = function(template) {
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
        } else {
          return Handlebars.compile(template);
        }
      } else {
        return function(data) { return Mustache.render(template, data); };
      }
    } else {
      throw 'Empty template';
    }
  };

  window.br.fetch = function(template, data, tags) {
    data = data || {};
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
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
  var progressBarTemplate = '<div id="br_progressBar" class="modal" style="display:none;z-index:10000;top:20px;margin-top:0px;position:fixed;" data-backdrop="static">' +
                            '  <div class="modal-dialog">'+
                            '    <div class="modal-content">'+
                            '      <div class="modal-body">' +
                            '        <table style="width:100%;font-size:18px;font-weight:300;margin-bottom:10px;">'+
                            '          <tr>'+
                            '            <td><div id="br_progressMessage" style="max-width:440px;max-height:40px;overflow:hidden;text-overflow:ellipsis;"></div></td>' +
                            '            <td align="right" id="br_progressStage" style="font-size:14px;font-weight:300;"></td>' +
                            '          </tr>' +
                            '        </table>' +
                            '        <div id="br_progressBar_Section" style="display:none;clear:both;">' +
                            '          <div style="margin-bottom:0px;padding:0px;height:20px;overflow: hidden;background-color: #f5f5f5;border-radius: 4px;box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">' +
                            '            <div id="br_progressBar_Bar" style="background-color:#008cba;border:none;padding:0px;height:20px;"></div>' +
                            '          </div>' +
                            '        </div>' +
                            '        <div id="br_progressBarAnimation" style="display1:none;padding-top:10px;">' +
                            '          <center><img src="' + br.brightUrl + 'images/progress-h.gif" /></center>' +
                            '        </div>' +
                            '      </div>' +
                            '    </div>' +
                            '  </div>' +
                            '</div>';


  function fileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' '+['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  var currentProgressType;

  function renderProgress() {
    var p = Math.round(progressBar_Progress * 100 / progressBar_Total);
    $('#br_progressBar_Bar').css('width', p + '%');
    $('#br_progressMessage').text(progressBar_Message);
    if (currentProgressType == 'upload') {
      $('#br_progressStage').text(fileSize(progressBar_Progress) + ' of ' + fileSize(progressBar_Total));
    } else {
      $('#br_progressStage').text(progressBar_Progress + ' of ' + progressBar_Total);
    }
  }

  var backDropCounter = 0;

  function initBackDrop() {
    if ($('#br_modalBackDrop').length === 0) {
      $('body').append('<div id="br_modalBackDrop" class="modal-backdrop" style="z-index:9999;"></div>');
    }
  }

  function showBackDrop(className) {
    initBackDrop();
    $('#br_modalBackDrop').show();
  }

  function hideBackDrop(className) {
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
      var pbr = $(progressBarTemplate);
      if (br.bootstrapVersion == 2) {
        pbr.css('top', '20px');
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
    window.br.showProgress();
  };

  window.br.showProgress = function() {
    showBackDrop('progress');
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
    hideBackDrop('progress');
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

  window.br.handleClick = function(control, promise) {

    $(control).addClass('disabled').attr('disabled', 'disabled');

    promise.then(function() {
      $(control).removeClass('disabled').removeAttr('disabled');
    }).catch(function(error) {
      $(control).removeClass('disabled').removeAttr('disabled');
      br.growlError(error);
    });

  };

  window.br.sortTable = function(table, order) {

    function getValuesComparison(a, b, columnIndex, direction) {
      var td1 = $($('td', $(a))[columnIndex]);
      var td2 = $($('td', $(b))[columnIndex]);
      var val1 = td1.remove('a').text().trim();
      var val2 = td2.remove('a').text().trim();
      var val1F = 0;
      var val2F = 0;
      var floatValues = 0;
      if (!isNaN(parseFloat(val1)) && isFinite(val1)) {
        val1F = parseFloat(val1);
        floatValues++;
      }
      if (!isNaN(parseFloat(val2)) && isFinite(val2)) {
        val2F = parseFloat(val2);
        floatValues++;
      }
      if (floatValues == 2) {
        return (val1F == val2F ? 0: (val1F > val2F ? direction : direction * -1));
      } else {
        return val1.localeCompare(val2) * direction;
      }
    }

    return new Promise(function(resolve, reject) {
      $('tbody', table).each(function() {
        var tbody = $(this);
        $('tr', tbody).sort(function(a, b) {
          var values = [];
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

    var tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function disableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        var el = $(item);
        if (!el.closest(except).length) {
          var tabindex = el.attr('tabindex');
          if (tabindex) {
            el.attr('data-prev-tabindex', tabindex);
          }
          el.attr('tabindex', '-1');
        }
      });
    }

    function reEnableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        var el = $(item);
        if (!el.closest(except).length) {
          var prevTabindex = el.attr('data-prev-tabindex');
          if (prevTabindex) {
            el.attr('tabindex', prevTabindex);
          } else {
            el.removeAttr('tabindex');
          }
          el.removeAttr('data-prev-tabindex');
        }
      });
    }

    function configureAutosize(control) {
      if (control.data('brAutoSizeConfigured')) {

      } else {
        if (br.bootstrapVersion == 2) {
          control.css('top', '20px');
          control.css('margin-top', '0px');
          control.css('position', 'fixed');
        }
        $(window).resize(function(){
          br.resizeModalPopup(control);
        });
        control.data('brAutoSizeConfigured', 1);
      }
    }

    var defaultOpacity = 50;

    $(document).on('shown.bs.modal', function(event) {
      var target = $(event.target);
      if (target.hasClass('modal')) {
        var zindex = br.toInt(target.css('z-index'));
        $('div.modal').each(function() {
          var cthis = $(this);
          if (cthis.is(':visible')) {
            if (!cthis.is(target)) {
              var czindex = br.toInt(cthis.css('z-index'));
              zindex = Math.max(zindex, czindex) + 2;
            }
          }
        });
        target.css('z-index', zindex);
        zindex--;
        $('.modal-backdrop').css('z-index', zindex);
        if ($('.modal-backdrop').length) {
          var opacity = defaultOpacity / $('.modal-backdrop').length;
          $('.modal-backdrop').css({ 'opacity': opacity/100, 'filter': 'alpha(opacity=' + opacity + ')' });
        }
        disableTabbingOnPage(target);
      }
      br.draggable(target, { handler: '.modal-header' });
      if (target.hasClass('modal')) {
        configureAutosize(target);
        br.resizeModalPopup(target);
      }
    });

    $(document).on('hidden.bs.modal', function(event) {
      var target = $(event.target);
      if (target.hasClass('modal')) {
        var modals = [];
        $('div.modal').each(function() {
          if ($(this).is(':visible')) {
            modals.push({ zindex: br.toInt($(this).css('z-index')), modal: $(this) });
          }
        });
        if (modals.length) {
          modals.sort(function compare(a, b) {
            if (a.zindex > b.zindex)
              return -1;
            if (a.zindex < b.zindex)
              return 1;
            return 0;
          });
          var zindex = modals[0].zindex-1;
          $('.modal-backdrop').css('z-index', zindex);
          if ($('.modal-backdrop').length) {
            var opacity = defaultOpacity / $('.modal-backdrop').length;
            $('.modal-backdrop').css({ 'opacity': opacity/100, 'filter': 'alpha(opacity=' + opacity + ')' });
          }
        }
        reEnableTabbingOnPage(target);
      }
    });

    $(document).on('click', function(event) {
      $('.br-dropdown-detached:visible').hide();
    });

    $(window).on('resize', function() {
      $('.br-dropdown-detached:visible').each(function() {
        var detachedMenu = $(this);
        var detachedMenuHolder = detachedMenu.data('detachedMenuHolder');
        var alignRight = detachedMenu.hasClass('br-dropdown-detached-right-aligned');
        var menu = detachedMenu.find('.dropdown-menu');
        var css = {
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height()
        };
        if (alignRight) {
          css.right = ($(window).width() - detachedMenuHolder.offset().left - detachedMenuHolder.width()) + menu.width();
        } else {
          css.left = detachedMenuHolder.offset().left;
        }
        detachedMenu.css(css);
      });
    });

    $(document).on('shown.bs.dropdown', function(event) {
      $('.br-dropdown-detached:visible').hide();
      var target = $(event.target);
      if (target.hasClass('br-dropdown-detachable')) {
        var detachedMenu = target.data('detachedMenu');
        var alignRight = target.hasClass('br-dropdown-detachable-right-aligned');
        var css = {
          position: 'absolute',
          top: target.offset().top + target.height()
        };
        if (detachedMenu) {
          if (alignRight) {
            css.right = ($(window).width() - target.offset().left - target.width()) + detachedMenu.data('detachedMenuWidth');
          } else {
            css.left = target.offset().left;
          }
          detachedMenu.css(css);
          detachedMenu.addClass('open');
          detachedMenu.show();
        } else {
          var menu = $(target.find('.dropdown-menu'));
          if (menu.length) {
            if (alignRight) {
              css.right = ($(window).width() - target.offset().left - target.width()) + menu.width();
            } else {
              css.left = target.offset().left;
            }
            detachedMenu = $('<div class="dropdown br-dropdown-detached" style="min-height:1px;"></div>');
            if (alignRight) {
              detachedMenu.addClass('br-dropdown-detached-right-aligned');
            }
            detachedMenu.append(menu.detach());
            detachedMenu.css(css);
            $('body').append(detachedMenu);
            menu.show();

            detachedMenu.data('detachedMenuHolder', target);
            detachedMenu.data('detachedMenuWidth', menu.width());
            target.data('detachedMenu', detachedMenu);
          }
        }
      }
    });

  }

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

    if (br.bootstrapVersion == 2) {
      $.fn.modal.Constructor.prototype.enforceFocus = function () {};
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

    $(document).on('keypress', 'input[data-click-on-enter]', function(event) {
      if (event.keyCode == 13) {
        $($(this).attr('data-click-on-enter')).trigger('click');
      }
    });

    br.attachDatePickers();

    enchanceBootstrap();

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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  window.br = window.br || {};

  var clipboardCallbacks = [];

  window.br.onPaste = function(callback) {
    clipboardCallbacks.push(callback);
  };

  $(document).ready(function() {
    $('body').on('paste', function(evt) {

      var result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      evt = evt.originalEvent;

      function notify(evt, result) {
        br.events.trigger('paste', evt, result);
        for(var i = 0; i < clipboardCallbacks.length; i++) {
          clipboardCallbacks[i].call(evt, result);
        }
      }

      function loadFile(result, file, originalEvt, onerror) {
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
          notify(originalEvt, result);
        };
        reader.onerror = function(evt) {
          if (onerror) {
            onerror();
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

      var items = [];

      function processItems() {
        if (items.length > 0) {
          var item = items.shift();
          loadFile(result, item, evt, function() {
            processItems();
          });
        }
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

        var complete = true;
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
                items.push(evt.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (evt.clipboardData.files && (evt.clipboardData.files.length > 0)) {
            for(i = 0; i < evt.clipboardData.files.length; i++) {
              if (evt.clipboardData.files[i].type.match('image.*')) {
                items.push(evt.clipboardData.files[0]);
              }
            }
          }
          if (items.length > 0) {
            complete = false;
            processItems();
          }
        }

        if (complete) {
          notify(evt, result);
        }

      }
    });
  });

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
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

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataEditor(selector, dataSource, options) {

    var _this = this;

    var editorRowid = null;
    var editorRowData = null;
    var active = false;
    var cancelled = false;

    _this.options = options || {};
    _this.options.noun = _this.options.noun || '';
    _this.options.selectors = _this.options.selectors || {};
    _this.options.selectors.save = _this.options.selectors.save || '.action-save';
    _this.options.selectors.cancel = _this.options.selectors.cancel || '.action-cancel';
    _this.options.selectors.errorMessage = _this.options.selectors.errorMessage || '.editor-error-message';
    _this.container = $(selector);
    if (_this.options.inputsContainer) {
      _this.inputsContainer = $(_this.options.inputsContainer);
    } else {
      _this.inputsContainer = _this.container;
    }

    _this.dataSource = dataSource;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.pause  = function(event, callback) { _this.events.pause(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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
    };

    _this.unlock = function() {
      $(_this.options.selectors.save, _this.container).removeClass('disabled');
      br.resetCloseConfirmation();
    };

    _this.showError = function(message) {
      var ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    _this.editorConfigure = function(isCopy) {
      var s = '';
      if (_this.options.title) {
        s = _this.options.title;
      } else
      if (editorRowid) {
        if (isCopy) {
          s = 'Copy ' + _this.options.noun;
        } else {
          s = 'Edit ' + _this.options.noun;
          if (!_this.options.hideRowid) {
            s = s + ' (#' + editorRowid + ')';
          }
        }
      } else {
        s = 'Create ' + _this.options.noun;
      }
      _this.container.find('.operation').text(s);
    };

    function editorShown() {
      var focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', _this.container);
      if (focusedInput.length > 0) {
        try { focusedInput[0].focus(); } catch (e) { }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', _this.container);
        if (focusedInput.length > 0) {
          try { focusedInput[0].focus(); } catch (e) { }
        }
      }
      _this.events.trigger('editor.shown');
      br.resetCloseConfirmation();
    }

    var closeConfirmationTmp;

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
        var btn = $(this);
        if (!btn.hasClass('disabled') && !saving) {
          var andClose = btn.hasClass('action-close') || _this.container.hasClass('modal');
          btn.addClass('disabled');
          internalSave( andClose
                      , function() { btn.removeClass('disabled'); }
                      , function() { btn.removeClass('disabled'); }
                      );
        }
      });

      $(_this.inputsContainer).on('change', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        br.confirmClose();
      });

      $(_this.inputsContainer).on('input', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        br.confirmClose();
      });

      return _this;

    };

    _this.fillDefaults = function() {
      _this.inputsContainer.find('input.data-field[type=checkbox]').each(function() {
        $(this).prop('checked', !!$(this).attr('data-default-checked'));
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for(var i in data) {
          _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
            var input = $(this);
            if (input.attr('data-toggle') == 'buttons-radio') {
              var val = br.isNull(data[i]) ? '' : data[i];
              input.find('button[value="' + val + '"]').addClass('active');
            } else
            if (input.attr('type') == 'checkbox') {
              input.prop('checked', br.toInt(data[i]) == 1);
            } else
            if (input.attr('type') == 'radio') {
              input.prop('checked', br.toInt(data[i]) == br.toInt(input.val()));
            } else {
              var ckeditorInstance = input.data('ckeditorInstance');
              if (ckeditorInstance) {
                (function(input, ckeditorInstance, data) {
                  ckeditorInstance.setData(data
                    , { noSnapshot: true
                      , callback: function(aa) {
                          if (ckeditorInstance.getData() != data) {
                            // not sure why but setData is not wroking sometimes, so need to run again :(
                            ckeditorInstance.setData(data, { noSnapshot: true });
                          }
                        }
                      });
                })(input, ckeditorInstance, data[i]);
              } else {
                var dataComboInstance = input.data('BrDataCombo');
                if (dataComboInstance) {
                  dataComboInstance.val(data[i]);
                } else {
                  input.val(data[i]);
                }
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

    _this.show = function(rowid, isCopy) {
      closeConfirmationTmp = br.isCloseConfirmationRequired();
      editorRowid = null;
      editorRowData = null;
      var defaultValues = null;
      if (br.isNumber(rowid)) {
        editorRowid = rowid;
      } else
      if (br.isObject(rowid)) {
        defaultValues = rowid;
      }
      _this.inputsContainer.find('input.data-field[type!=radio],select.data-field,textarea.data-field').each(function() {
        var dataComboInstance = $(this).data('BrDataCombo');
        if (dataComboInstance) {
          dataComboInstance.val('');
        } else {
          $(this).val('');
        }
      });
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1');
      _this.inputsContainer.find('input.data-field[type=checkbox]').prop('checked', false);
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      var ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (editorRowid) {
        var request = { rowid: editorRowid };
        var options = { disableEvents: true };
        _this.events.triggerBefore('editor.loadData', request, options);
        _this.dataSource.selectOne(request, function(result, data) {
          if (result) {
            editorRowData = data;
            _this.events.triggerBefore('editor.show', data, isCopy);
            _this.editorConfigure(isCopy);
            _this.fillControls(data);
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('editor.show', data, isCopy);
            br.attachDatePickers(_this.inputsContainer);
            if (_this.container.hasClass('modal')) {
              _this.container.modal('show');
            } else {
              editorShown();
            }
          } else {
            if (_this.container.hasClass('modal')) {
              _this.showError(data);
            } else {
              br.backToCaller(_this.options.returnUrl, true);
            }
          }
        }, options);
      } else {
        _this.events.triggerBefore('editor.show');
        _this.editorConfigure(isCopy);
        _this.fillDefaults();
        _this.fillControls(defaultValues);
        _this.events.trigger('editor.show', defaultValues);
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

    var saving = false;
    var savingAndClosing = false;

    _this.isSaving = function() {
      return saving;
    };

    _this.isSavingAndClosing = function() {
      return saving && savingAndClosing;
    };

    _this.save = function(andClose, successCallback, errorCallback, silent) {
      if (br.isFunction(andClose)) {
        errorCallback   = successCallback;
        successCallback = andClose;
        andClose        = false;
        // if function invoked with callabacks I'll consider that it msut save silently
        silent          = true;
      }
      if (!br.isFunction(successCallback)) {
        successCallback = null;
      }
      if (!br.isFunction(errorCallback)) {
        errorCallback = null;
      }
      return internalSave(andClose, successCallback, errorCallback, silent);
    };

    function saveContinue(andClose, successCallback, errorCallback, silent, data) {

      savingAndClosing = andClose;

      var op = '';
      var ok = true;
      if (editorRowid) {
        op = 'update';
      } else {
        op = 'insert';
      }
      try {
        var options = {  };
        _this.events.trigger('editor.save', op, data, options);
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
                    var callResponse = { refresh: true };
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
                _this.events.triggerAfter('editor.save', false, response, op);
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
          }, options);
        } else {
          _this.events.triggerBefore('editor.insert', data, options);
          _this.dataSource.insert(data, function(result, response) {
            try {
              if (result) {
                br.resetCloseConfirmation();
                editorRowid = response.rowid;
                editorRowData = response;
                _this.editorConfigure(false);
                _this.events.triggerAfter('editor.insert', true, response);
                _this.events.triggerAfter('editor.save', true, response);
                if (andClose) {
                  if (_this.container.hasClass('modal')) {
                    _this.container.modal('hide');
                    editorRowid = null;
                    editorRowData = null;
                  } else {
                    var callResponse = { refresh: true };
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
                _this.events.triggerAfter('editor.save', false, response, op);
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
          }, options);
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

      var data = Object.create({ });
      var errors = [];
      try {
        $(_this.options.selectors.errorMessage, _this.container).hide();
        _this.events.triggerBefore('editor.save');
        _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio],input.data-field,select.data-field,textarea.data-field').each(function() {
          var val;
          var skip = false;
          var input = $(this);
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
              if (input.hasClass('required') && br.isEmpty(val) && (!input.hasClass('required-edit-only') || _this.isEditMode()) && (!input.hasClass('required-insert-only') || _this.isInsertMode())) {
                var title = input.attr('title');
                if (br.isEmpty(title)) {
                  title = input.prev('label').text();
                }
                if (errors.length === 0) {
                  this.focus();
                }
                errors.push(br.trn('%s must be filled').replace('%s', title));
                ok = false;
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
          var tmpl;
          if (errors.length == 1) {
            tmpl = '{{#errors}}{{.}}{{/errors}}';
          } else {
            tmpl = br.trn('Please check the following:') + '<br /><ul>{{#errors}}<li>{{.}}</li>{{/errors}}</ul>';
          }
          var error = br.fetch(tmpl, { errors: errors });
          _this.showError(error);
          if (errorCallback) {
            errorCallback.call(_this, data, error);
          }
          saving = false;
        } else {
          var op = '';
          var ok = true;
          if (editorRowid) {
            op = 'update';
          } else {
            op = 'insert';
          }
          if (_this.events.has('editor.save', 'pause')) {
            _this.events.triggerPause( 'editor.save'
                                     , { continue: function(data) {
                                           saveContinue(andClose, successCallback, errorCallback, silent, data);
                                         }
                                       , cancel: function(error) {
                                           if (errorCallback) {
                                             errorCallback.call(_this, data, error);
                                           }
                                           saving = false;
                                         }
                                       }
                                     , op
                                     , data
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

  window.br = window.br || {};

  window.br.dataEditor = function (selector, dataSource, options) {
    return new BrDataEditor(selector, dataSource, options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  function BrDataBrowser(entity, options) {

    var _this = this;

    var pagerSetUp = false;

    this.options = options || {};
    this.options.autoLoad = this.options.autoLoad || false;
    this.options.defaults = this.options.defaults || {};
    this.options.defaults.filtersHidden = this.options.defaults.filtersHidden || false;
    this.options.entity = entity;
    this.options.features = this.options.features || { editor: true };
    this.options.noun = this.options.noun || '';
    this.options.selectors = this.options.selectors || {};
    this.options.selectors.container = this.options.selectors.container || '';
    this.options.selectors.scrollContainer = this.options.selectors.scrollContainer || '';
    this.options.pageSizes = this.options.pageSizes || [20, 50, 100, 200];

    function c(selector) {
      if (_this.options.selectors.container !== '') {
        return _this.options.selectors.container + ' ' + selector;
      } else {
        return selector;
      }
    }

    this.scrollContainer = function() {
      if (_this.options.selectors.container !== '') {
        if (_this.options.selectors.scrollContainer !== '') {
          if (this.options.selectors.scrollContainer.indexOf('#') === 0) {
             return _this.options.selectors.scrollContainer;
          } else {
            return _this.options.selectors.container + ' ' + _this.options.selectors.scrollContainer;
          }
        } else {
          return _this.options.selectors.container;
        }
      } else {
        return _this.options.selectors.scrollContainer;
      }
    };

    this.options.selectors.dataTable = c(this.options.selectors.dataTable || '.data-table');
    this.options.selectors.editForm = this.options.selectors.editForm || '';
    if (this.options.selectors.editForm === '') {
      if (this.options.selectors.container === '') {
        this.options.selectors.editForm = '.data-edit-form';
      } else {
        this.options.selectors.editForm = _this.options.selectors.container + ' .data-edit-form';
      }
    }

    this.options.templates = this.options.templates || {};
    this.options.templates.row = this.options.templates.row || this.options.templates.rowTemplate || '.data-row-template';
    this.options.templates.groupRow = this.options.templates.groupRow || '.data-group-row-template';
    this.options.templates.noData = this.options.templates.noData || '.data-empty-template';

    var selActionCRUD = c('.action-edit') + ',' + c('.action-create') + ',' + c('.action-copy');

    if (typeof entity == 'string') {
      if (this.options.entity.indexOf('/') == -1) {
        this.dataSource = br.dataSource(br.baseUrl + 'api/' + this.options.entity + '/');
      } else {
        this.dataSource = br.dataSource(br.baseUrl + this.options.entity);
      }
      this.dataSource.on('error', function(operation, error) {
        br.growlError(error);
      });
    } else {
      this.dataSource = entity;
    }

    this.storageTag = this.options.storageTag ? this.options.storageTag : document.location.pathname + ':' + this.dataSource.options.restServiceUrl;

    this.setStored = function(name, value) {
      br.storage.set(this.storageTag + 'stored:' + name, value);
    };

    this.getStored = function(name, defaultValue) {
      return br.storage.get(this.storageTag + 'stored:' + name, defaultValue);
    };

    this.defaultLimit = this.options.limit || 20;
    this.limit = _this.getStored('pager_PageSize', this.defaultLimit);
    this.skip = 0;
    this.recordsAmount = 0;

    this.selection = br.flagsHolder();

    this.countDataSource = br.dataSource(this.dataSource.options.restServiceUrl);

    var headerContainer = 'body';

    if (this.options.selectors.container !== '') {
      headerContainer = this.options.selectors.container;
    }

    this.dataGrid = br.dataGrid( this.options.selectors.dataTable
                               , this.options.templates.row
                               , this.dataSource
                               , { templates: { noData: this.options.templates.noData, groupRow: this.options.templates.groupRow }
                                 , selectors: { header: headerContainer, remove: '.action-delete', refreshRow: this.options.selectors.refreshRow }
                                 , appendInInsert: this.options.appendInInsert
                                 , defaultOrderAndGroup: this.options.defaultOrderAndGroup
                                 , fixedHeader: this.options.fixedHeader
                                 , autoHeight: this.options.autoHeight
                                 , autoWidth: this.options.autoWidth
                                 , storageTag: this.options.storageTag
                                 , storeDataRow: this.options.storeDataRow
                                 }
                               );

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    this.before = function(operation, callback) {
      this.dataSource.before(operation, callback);
      this.countDataSource.before(operation, callback);
    };

    this.isOrderConfigured = function() {
      return _this.dataGrid.isOrderConfigured();
    };

    this.getOrder = function() {
      return _this.dataGrid.getOrder();
    };

    this.setOrder = function(order, callback) {
      return _this.dataGrid.setOrder(order, callback);
    };

    this.getOrderAndGroup = function() {
      return _this.dataGrid.getOrderAndGroup();
    };

    this.setOrderAndGroup = function(orderAndGroup, callback) {
      return _this.dataGrid.setOrderAndGroup(orderAndGroup, callback);
    };

    this.setFilter = function(name, value) {
      var filter = br.storage.get(this.storageTag + 'filter');
      filter = filter || { };
      filter[name] = value;
      br.storage.set(this.storageTag + 'filter', filter);
    };

    this.getFilter = function(name, defaultValue) {
      var filter = br.storage.get(this.storageTag + 'filter', defaultValue);
      filter = filter || { };
      return filter[name];
    };

    this.reloadRow = function(rowid, callback, options) {
      _this.dataGrid.reloadRow(rowid, callback, options);
    };

    this.hasRow = function(rowid) {
      return _this.dataGrid.hasRow(rowid);
    };

    this.removeRow = function(rowid) {
      return _this.dataGrid.removeRow(rowid);
    };

    var selectionQueue = [];

    function deleteQueued() {

      if (selectionQueue.length > 0) {
        var rowid = selectionQueue.shift();
        _this.dataSource.remove(rowid, function(result, response) {
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

    this.deleteSelection = function() {
      selectionQueue = _this.selection.get().slice(0);
      if (selectionQueue.length > 0) {
        br.confirm( 'Delete confirmation'
                  , 'Are you sure you want do delete ' + selectionQueue.length + ' record(s)?'
                  , function() {
                      br.startProgress(selectionQueue.length, 'Deleting...');
                      deleteQueued();
                    }
                  );
      } else {
        br.growlError('Please select at least one record');
      }
    };

    function updateQueued(func) {

      if (selectionQueue.length > 0) {
        var rowid = selectionQueue.shift();
        var data = {};
        func(data);
        _this.dataSource.update(rowid, data, function(result, response) {
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

    this.updateSelection = function(func) {
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
        var rowid = selectionQueue.shift();
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

    this.processSelection = function(processRowCallback, processCompleteCallback, params) {
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

    this.init = function() {
      // nav
      $('.nav-item[rel=' + _this.options.nav + ']').addClass('active');

      _this.dataSource.before('select', function(request, options) {
        request = request || {};
        if ($(c('input.data-filter[name=keyword]')).length > 0) {
          request.keyword = $(c('input.data-filter[name=keyword]')).val();
          _this.setFilter('keyword', request.keyword);
        }
        options       = options || {};
        options.skip  = _this.skip;
        options.limit = _this.limit || _this.defaultLimit;
      });

      _this.dataSource.after('remove', function(request, options) {
        if (selectionQueue.length === 0) {
          _this.resetPager();
          _this.updatePager();
        }
        if (_this.dataGrid.isEmpty()) {
          _this.refresh();
        }
      });

      _this.dataSource.after('insert', function(request, options) {
        _this.resetPager();
        _this.updatePager();
      });

      _this.countDataSource.before('select', function(request) {
        if ($(c('input.data-filter[name=keyword]')).length > 0) {
          request.keyword = $(c('input.data-filter[name=keyword]')).val();
        }
      });

      _this.dataSource.after('select', function(result, response) {
        if (result) {
          if (_this.options.autoLoad) {
            _this.skip = _this.skip + response.length;
          }
        }
        _this.updatePager(true);
        showFiltersDesc();
      });

      // search
      br.modified(c('input.data-filter[name=keyword]'), function() {
        var _val = $(this).val();
        $(c('input.data-filter[name=keyword]')).each(function() {
          if ($(this).val() != _val) {
            $(this).val(_val);
          }
        });
        if ($(this).hasClass('instant-search')) {
          _this.refreshDeferred();
        }
      });

      br.modified(c('input.data-filter') + ',' + c('select.data-filter'), function() {
        _this.resetPager();
      });

      br.attachDatePickers();

      if (_this.options.features.editor) {
        var editorOptions = _this.options.editor || { noun: _this.options.noun };
        _this.editor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
        _this.editor.events.connectTo(_this.events);

        $(c('.action-create')).show();

        $(document).on('click', selActionCRUD, function() {
          var isCopy = $(this).hasClass('action-copy');
          var rowid = $(this).closest('[data-rowid]').attr('data-rowid');
          _this.editor.show(rowid, isCopy);
        });
      }

      // pager
      $(c('a.action-next') + ',' + c('a.pager-action-next')).on('click', function() {
        _this.skip += _this.limit;
        _this.refresh({}, null, true);
      });

      $(c('a.action-prior') + ',' + c('a.pager-action-prior')).on('click', function() {
        _this.skip -= _this.limit;
        if (_this.skip < 0) {
          _this.skip = 0;
        }
        _this.refresh({}, null, true);
      });

      $(c('.pager-page-navigation')).on('click', 'a.pager-action-navigate', function() {
        var value = br.toInt($(this).attr('data-page'));
        if (value > 0) {
          var newSkip = _this.limit * (value - 1);
          if (newSkip != _this.skip) {
            _this.skip = _this.limit * (value - 1);
            _this.setStored('pager_PageNo', _this.skip);
            _this.refresh({}, null, true);
          }
        }
      });

      $(c('.pager-page-size-navigation')).on('click', 'a.pager-action-page-size', function() {
        var value = br.toInt($(this).attr('data-size'));
        _this.limit = value;
        _this.skip = 0;
        _this.setStored('pager_PageNo', _this.skip);
        _this.setStored('pager_PageSize', _this.limit);
        _this.refresh({}, null, true);
      });

      $(c('.action-refresh')).click(function() {
        _this.refresh();
      });

      $(c('.action-clear-one-filter')).click(function() {
        $(c('.data-filter' + '[name=' + $(this).attr('rel') + ']')).val('');
        _this.refresh();
      });

      $(c('input.data-filter[name=keyword]')).val(_this.getFilter('keyword'));

      function showFiltersDesc() {

        if ($(c('.filters-panel')).is(':visible')) {
          $(c('.action-show-hide-filters')).find('span').text('Hide filters');
          $(c('.filter-description')).text('');
        } else {
          $(c('.action-show-hide-filters')).find('span').text('Show filters');
          var s = '';
          $(c('.data-filter')).each(function() {
            var val = $(this).val();
            var title = $(this).attr('title');
            if (val &&title) {
              s = s + '/ <strong>' + title + '</strong> ';
              if ($(this).is('select')) {
                s = s + $(this).find('option[value=' + val + ']').text() + ' ';
              } else {
                s = s + val + ' ';
              }

            }
          });
          $(c('.filter-description')).html(s);
        }

      }

      function setupFilters(initial) {

        function showHideFilters(initial) {

          if ($(c('.filters-panel')).is(':visible')) {
            _this.setStored('filters-hidden', true);
            $(c('.filters-panel')).css('display', 'none');
            showFiltersDesc();
            _this.events.trigger('hideFilters');
          } else {
            _this.setStored('filters-hidden', false);
            $(c('.filters-panel')).show();
            showFiltersDesc();
            _this.events.trigger('showFilters');
          }

          if (_this.dataGrid.table) {
            _this.dataGrid.table.update();
          }

        }

        $(c('.action-show-hide-filters')).on('click', function() {
          showHideFilters();
        });

        $(c('.action-reset-filters')).on('click', function () {
          _this.resetFilters();
        });

        if (br.isNull(_this.getStored('filters-hidden'))) {
          _this.setStored('filters-hidden', _this.options.defaults.filtersHidden);
        }

        if (_this.getStored('filters-hidden')) {
          showFiltersDesc();
        } else {
          showHideFilters(initial);
        }

      }

      setupFilters(true);

      function checkAutoLoad() {
        var docsHeight = $(_this.options.selectors.dataTable).height();
        var docsContainerHeight = $(_this.scrollContainer()).height();
        var scrollTop = $(_this.scrollContainer()).scrollTop();
        if (scrollTop + docsContainerHeight > docsHeight) {
          _this.dataGrid.loadMore();
        }
      }

      if (_this.options.autoLoad) {
        $(_this.scrollContainer()).on('scroll', function() {
          checkAutoLoad();
        });
      }

      $(document).on('click', c('.action-select-all'), function() {
        var checked = $(this).is(':checked');
        _this.selectAll(checked);
      });

      $(document).on('click', c('.action-select-row'), function() {
        var row = $(this).closest('[data-rowid]');
        var rowid = row.attr('data-rowid');
        var checked = $(this).is(':checked');
        if (checked) {
          _this.selectRow(rowid);
        } else {
          _this.unSelectRow(rowid);
        }
      });

      $(document).on('click', c('.action-clear-selection'), function() {
        _this.clearSelection();
      });

      $(document).on('click', c('.action-delete-selected'), function() {
        _this.deleteSelection();
      });

      _this.dataGrid.before('changeOrder', function() {
        _this.resetPager();
      });

      _this.dataGrid.on('change', function() {
        $(c('.action-select-all')).removeAttr('checked');
        var selection = _this.selection.get();
        if (selection.length > 0) {
          _this.restoreSelection();
        } else {
          _this.clearSelection();
        }
        _this.events.trigger('change');
        _this.events.triggerAfter('change');
      });

      _this.events.on('selectionChanged', function(count) {
        if (count > 0) {
          $(c('.selection-stat')).text(count + ' record(s) selected');
          $(c('.selection-stat')).show();
          $(c('.action-clear-selection')).show();
        } else {
          $(c('.selection-stat')).css('display', 'none');
          $(c('.action-clear-selection')).css('display', 'none');
        }
      });

      return this;
    };

    var pageNavIsSlider = false, pageSizeIsSlider = false, pagerInitialized = false;

    function initPager() {

      if (pagerInitialized) {
        return;
      }

      if ($.fn.slider) {
        $(c('.pager-page-slider')).each(function() {
          pageNavIsSlider = true;
          $(this).slider({
              min: 1
            , value: 1
            , change: function(event, ui) {
                var value = $(c('.pager-page-slider')).slider('option', 'value');
                if (value > 0) {
                  var newSkip = _this.limit * (value - 1);
                  if (newSkip != _this.skip) {
                    _this.skip = _this.limit * (value - 1);
                    _this.setStored('pager_PageNo', _this.skip);
                    _this.refresh({}, null, true);
                  }
                }
              }
          });
        });

        $(c('.pager-page-size-slider')).each(function() {
          pageSizeIsSlider = true;
          $(this).slider({
              min: _this.defaultLimit
            , value: _this.limit
            , max: _this.defaultLimit * 20
            , step: _this.defaultLimit
            , change: function(event, ui) {
                var value = $(c('.pager-page-size-slider')).slider('option', 'value');
                _this.limit = value;
                _this.setStored('pager_PageSize', _this.limit);
                $(c('.pager-page-slider')).slider('option', 'value', 1);
                $(c('.pager-page-slider')).slider('option', 'max', Math.ceil(_this.recordsAmount / _this.limit));
                _this.refresh({}, null, true);
              }
          });
        });
      }

      pagerInitialized = true;

    }

    function internalUpdatePager() {

      initPager();

      var totalPages = Math.ceil(_this.recordsAmount / _this.limit);
      var currentPage = Math.ceil(_this.skip / _this.limit) + 1;
      var $pc, s, i;

      if (pageNavIsSlider) {
        $(c('.pager-page-slider')).slider('option', 'max', totalPages);
        $(c('.pager-page-slider')).slider('option', 'value', currentPage);
      } else {
        $pc = $(c('.pager-page-navigation'));
        $pc.html('');
        s = '';
        var f1 = false, f2 = false, r = 5, el = false;
        for (i = 1; i <= totalPages; i++) {
          if ((i <= r) || ((i > currentPage - r) && (i < currentPage + r)) || (i > (totalPages - r))) {
            if (i == currentPage) {
              s = s + '<strong class="pager-nav-element">' + i+ '</strong>';
            } else {
              el = true;
              s = s + '<a href="javascript:;" class="pager-action-navigate pager-nav-element" data-page="'+ i + '">' + i+ '</a>';
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
          $(c('.pager-nav-element')).show();
        } else {
          $(c('.pager-nav-element')).css('display', 'none');
        }
      }

      if (pageSizeIsSlider) {

      } else {
        $pc = $(c('.pager-page-size-navigation'));
        $pc.html('');
        s = '';
        var sizes = _this.options.pageSizes;
        for (i = 0; i < sizes.length; i++) {
          var size = sizes[i];
          var dsize = size;
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
          $(c('.pager-page-size-container')).show();
        } else {
          $(c('.pager-page-size-container')).css('display', 'none');
        }
      }

      var min = (_this.skip + 1);
      var max = Math.min(_this.skip + _this.limit, _this.recordsAmount);
      if (_this.recordsAmount > 0) {
        if (_this.recordsAmount > max) {
          $(c('.action-next')).show();
          $(c('.pager-action-next')).show();
        } else {
          $(c('.action-next')).css('display', 'none');
          $(c('.pager-action-next')).css('display', 'none');
        }
        if (_this.skip > 0) {
          $(c('.action-prior')).show();
          $(c('.pager-action-prior')).show();
        } else {
          $(c('.action-prior')).css('display', 'none');
          $(c('.pager-action-prior')).css('display', 'none');
        }
        $(c('.pager-control')).show();
        _this.events.triggerAfter('pager.show');
      } else {
        $(c('.pager-control')).css('display', 'none');
        _this.events.triggerAfter('pager.hide');
      }
      $(c('.pager-stat')).text('Records ' + min + '-' + max + ' of ' + _this.recordsAmount);
      $(c('.pager-page-size')).text(_this.limit + ' records per page');

      pagerSetUp = true;

      if (_this.dataGrid.table) {
        _this.dataGrid.table.update();
      }

    }

    this.restoreSelection = function(selection) {
      if (!selection) {
        selection = _this.selection.get();
      }
      for (var i = 0; i < selection.length; i++) {
        _this.selectRow(selection[i], true);
      }
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    this.clearSelection = function() {
      _this.selection.clear();
      $(c('.action-select-row')).removeAttr('checked');
      $(c('tr.row-selected')).removeClass('row-selected');
      $(c('.action-select-all')).removeAttr('checked');
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    this.getSelection = function() {
      return _this.selection.get();
    };

    this.setSelection = function(selection) {
      if (selection) {
        for (var i = 0; i < selection.length; i++) {
          _this.selectRow(selection[i], true);
          _this.selection.append(selection[i]);
        }
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    var updatePagerTimer;

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
            $(c('.pager-control')).css('display', 'none');
            _this.events.triggerAfter('pager.hide');
          }
        });
      }
    }

    this.updatePager = function(force) {
      if (!pagerSetUp || force) {
        window.clearTimeout(updatePagerTimer);
        updatePagerTimer = window.setTimeout(function() {
          doUpdatePager();
        }, 300);
      } else {
        internalUpdatePager();
      }
    };

    var refreshTimer;

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

    this.unSelectRow = function(rowid, multiple) {
      var chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      var row;
      if (chk.length > 0) {
        row = $(chk).closest('[data-rowid]');
      } else {
        row = $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
      }
      if (row.length > 0) {
        row.find('.action-select-row').removeAttr('checked');
        row.removeClass('row-selected');
      }
      _this.selection.remove(rowid);
      if (!multiple) {
        _this.events.trigger('selectionChanged', _this.selection.get().length);
      }
    };

    this.selectRow = function(rowid, multiple) {
      var chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      var row;
      if (chk.length > 0) {
        row = $(chk).closest('[data-rowid]');
      } else {
        row = $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
      }
      if (row.length > 0) {
        row.find('.action-select-row').prop('checked', 'checked');
        row.addClass('row-selected');
        _this.selection.append(rowid);
        if (!multiple) {
          _this.events.trigger('selectionChanged', _this.selection.get().length);
        }
      }
    };

    this.selectAll = function(checked) {
      if (checked) {
        $(c('.action-select-all')).prop('checked', 'checked');
      } else {
        $(c('.action-select-all')).removeAttr('checked');
      }
      $(c('.action-select-row')).each(function() {
        var row = $(this).closest('[data-rowid]');
        var rowid = row.attr('data-rowid');
        if (checked) {
          _this.selectRow(rowid, true);
        } else {
          _this.unSelectRow(rowid, true);
        }
      });
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    this.isFiltersVisible = function() {
      return $(c('.filters-panel')).is(':visible');
    };

    this.resetPager = function() {
      pagerSetUp = false;
      _this.skip = 0;
    };

    this.resetFilters = function() {
      $(c('input.data-filter')).val('');
      $(c('select.data-filter')).val('');
      $(c('select.data-filter')).trigger('reset');
      br.storage.remove(this.storageTag + 'filter');
      _this.events.trigger('resetFilters');
      br.refresh();
    };

    _this.refreshDeferred = function(filter, callback, doNotResetPager) {

      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {

        internalRefresh(true, filter, function(result, response, request, options) {
          if (result) {
            resolve({ request: request, options: options, response: response });
          } else {
            reject({ request: request, options: options, errorMessage: response });
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

    };

    _this.load = _this.refresh = function(filter, callback, doNotResetPager) {

      if (typeof filter == 'function') {
        doNotResetPager = callback;
        callback = filter;
        filter = {};
      }

      if (!doNotResetPager) {
        _this.resetPager();
      }

      return new Promise(function(resolve, reject) {

        internalRefresh(false, filter, function(result, response, request, options) {
          if (result) {
            resolve({ request: request, options: options, response: response });
          } else {
            reject({ request: request, options: options, errorMessage: response });
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

    };

    return this.init();

  }

  window.br = window.br || {};

  window.br.dataBrowser = function (entity, options) {
    return new BrDataBrowser(entity, options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  var invokerTemplate = '<div class="dropdown br-ajax-dropdown"><span href="javascript:;" class="br-ex-action-change-menu-menu" style="cursor:pointer;"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a></div>';

  function showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options) {
    var menuItemTemplate = '<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>';
    var dropDown = $('<div class="dropdown br-ajax-dropdown" style="position:absolute;z-index:1050;"><a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle br-ex-action-change-menu-menu" style="cursor:pointer;"><span>{{value}}</span> <b class="caret"></b></a><ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul></div>');
    var dropDownList = dropDown.find('ul');
    var dropDownMenu = dropDown.find('.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      var value = $(this).attr('data-value');
      var data = {};
      data[fieldName] = value;
      if (options.onClick) {
        options.onClick.call($(this), dataSource, rowid, data, menuElement);
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
      dropDownList.append(br.fetch(menuItemTemplate, { id: '', name: (options.clearLabel ? options.clearLabel : '-- сlear --') }));
    }
    if (options.onBeforeRenderMenu) {
      options.onBeforeRenderMenu.call(dropDownList, menuItemTemplate);
    }
    for(var i in response) {
      dropDownList.append(br.fetch(menuItemTemplate, { id: response[i][options.keyField], name: response[i][options.nameField] }));
    }
    dropDown.css('left', invoker.offset().left + 'px');
    var invokerItem = invoker.find('.br-ex-action-change-menu-menu');
    var t = (invokerItem.offset().top + invokerItem.height());
    var scr = $(window).scrollTop();
    dropDown.css('top', t + 'px');
    t = t - scr;
    var h = Math.max($(window).height() - t - 20, 100);
    dropDownList.css('max-height', h + 'px');
    $('body').append(dropDown);
    dropDownMenu.dropdown('toggle');
  }

  function handleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    var rowid = el.closest('[data-rowid]').attr('data-rowid');
    var menuElement = invoker.find('span.br-ex-current-value');
    var filter = { __targetRowid: rowid };
    if (options.onSelect) {
      options.onSelect.call(choicesDataSource, filter, rowid, $(el));
    }
    choicesDataSource.select(filter, function(result, response) {
      if (result && (response.length > 0)) {
        showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options);
      }
    });
  }

  function setupControl(el, doClick, choicesDataSource, dataSource, fieldName, options) {

    var $this = el;
    if ($this.data('BrExChangeMenu')) {

    } else {
      $this.data('BrExChangeMenu', true);
      var value = $this.text().trim();
      if ((value.length === 0) || (value == '(click to change)')) {
        value = '<span style="color:#AAA;">(click to change)</span>';
      }
      var invoker = $(br.fetch(invokerTemplate, { value: value }));
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

    options = options || {};
    options.keyField = options.keyField || 'id';
    options.nameField = options.nameField || 'name';

    $(selector).each(function() {
      setupControl($(this), false, choicesDataSource, dataSource, fieldName, options);
    });

    $(document).on('click', selector, function() {
      setupControl($(this), true, choicesDataSource, dataSource, fieldName, options);
    });

  }

  window.br = window.br || {};

  window.br.exChangeMenu = function (selector, choicesDataSource, dataSource, fieldName, options) {
    return new BrExChangeMenu(selector, choicesDataSource, dataSource, fieldName, options);
  };

})(jQuery, window);

/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global Promise */

;(function ($, window) {

  window.br = window.br || {};

  window.br.dataHelpers = window.br.dataHelpers || {};

  window.br.dataHelpers.before = function(event, dataControls, callback) {

    for(var i = 0; i < dataControls.length; i++) {
      dataControls[i].before(event, callback);
    }

  };

  window.br.dataHelpers.on = function(event, dataControls, callback) {

    for(var i = 0; i < dataControls.length; i++) {
      dataControls[i].on(event, callback);
    }

  };


  function execute(funcToExecute, paramsQueue, extraParams, resolve, reject) {

    var functionsQueue = [];

    while ((functionsQueue.length <= extraParams.workers) && (paramsQueue.length > 0)) {
      functionsQueue.push(funcToExecute(paramsQueue.pop()).then(function() {
        br.stepProgress();
      }));
    }

    Promise.all(functionsQueue)
           .then(function(data) {
             if (paramsQueue.length > 0) {
               execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
             } else {
               br.stepProgress();
               if (!extraParams.doNotHideProgress) {
                 br.hideProgress();
               }
               resolve(data);
             }
           })
           .catch(function(data) {
             if (!extraParams.doNotHideProgressOnError) {
               br.hideProgress();
             }
             reject(data);
           });

  }

  window.br.dataHelpers.execute = function(funcToExecute, funcToGetTotal, funcToGetParams, extraParams) {

    extraParams         = extraParams         || {};
    extraParams.title   = extraParams.title   || '';
    extraParams.workers = extraParams.workers || 10;

    return new Promise(function(resolve, reject) {
      var params = [];
      var functionsForExecute = [];
      br.startProgress(funcToGetTotal(), extraParams.title);
      window.setTimeout(function() {
        var paramsQueue = [];
        while (true) {
          var params = funcToGetParams();
          if (params) {
            paramsQueue.push(params);
          } else {
            break;
          }
        }
        execute(funcToExecute, paramsQueue, extraParams, resolve, reject);
      });
    });

  };

  window.br.dataHelpers.load = window.br.dataHelpers.select = function(dataControls, callback) {

    var promises = [];

    for(var i = 0; i < dataControls.length; i++) {
      (function(dataObject) {
        promises.push(
          new Promise(function(resolve, reject) {
            dataObject.load().then(function(data) {
              resolve({ dataObject: dataObject, data: data });
            }).catch(function(data) {
              reject({ dataObject: dataObject, data: data });
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
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global google */

;(function ($, window, undefined) {

  function BrGoogleMap(selector, options) {

    var _this = this;
    var worldCenter = new google.maps.LatLng(42, 18);

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    options = options || { };
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') { options.streetViewControl = true; }
    if (typeof options.panControl == 'undefined') { options.panControl = true; }
    if (typeof options.mapTypeControl == 'undefined') { options.mapTypeControl = true; }
    if (typeof options.zoomControl == 'undefined') { options.zoomControl = true; }
    if (typeof options.scaleControl == 'undefined') { options.scaleControl = true; }
    if (typeof options.rotateControl == 'undefined') { options.rotateControl = true; }

    this.mapOptions = { zoom: options.zoom
                      , maxZoom: options.maxZoom
                      , center: options.mapCenter
                      , mapTypeId: google.maps.MapTypeId.ROADMAP
                      , mapTypeControl: options.mapTypeControl
                      , mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                          , position: google.maps.ControlPosition.BOTTOM_LEFT
                        }
                      , panControl: options.panControl
                      , panControlOptions: {
                          position: google.maps.ControlPosition.RIGHT_BOTTOM
                        }
                      , zoomControl: options.zoomControl
                      , zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE
                          , position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , scaleControl: options.scaleControl
                      , scaleControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , streetViewControl: options.streetViewControl
                      , streetViewControlOptions: {
                          position: google.maps.ControlPosition.LEFT_BOTTOM
                        }
                      , rotateControl: options.rotateControl
                      , rotateControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      };

    if (options.maxZoom) {
      this.mapOptions.maxZoom = options.maxZoom;
    }

    this.mapSelector = selector;
    this.mapContainer = $(this.mapSelector)[0];
    this.map = new google.maps.Map(this.mapContainer, this.mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.geocoder = new google.maps.Geocoder();
    this.weatherLayer = null;
    this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    this.markers = { };
    this.polygons = { };

    var singleClickTimeout;

    google.maps.event.addListener(this.map, 'click', function(event) {
      _this.events.trigger('click', event);
      (function(zoomLevel, event) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == map.map.getZoom()) {
            _this.events.trigger('singleclick', event);
          }
        }, 300);
      })(map.map.getZoom(), event);
    });

    function computeRouteParams(result) {
      var distance = 0, duration = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        distance += myroute.legs[i].distance.value;
        duration += myroute.legs[i].duration.value;
      }
      return { distance: distance, duration: duration };
    }

    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', function() {
      var routeParams = computeRouteParams(_this.directionsDisplay.directions);
      routeParams.directions = _this.directionsDisplay.directions;
      _this.events.trigger('directions_changed', routeParams);
    });
    google.maps.event.addListener(this.map, 'dblclick', function(event) {
      window.clearTimeout(singleClickTimeout);
      _this.events.trigger('dblclick', event);
    });
    google.maps.event.addListener(this.map, 'rightclick', function(event) {
      _this.events.trigger('rightclick', event);
    });
    google.maps.event.addListener(this.map, 'bounds_changed', function(event) {
      _this.events.trigger('bounds_changed', event);
    });
    google.maps.event.addListener(this.map, 'center_changed', function(event) {
      _this.events.trigger('center_changed', event);
    });
    google.maps.event.addListener(this.map, 'place_changed', function(event) {
      _this.events.trigger('place_changed', event);
    });

    var map = this;

    this.identifyLocation = function(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.map.setCenter(pos);
          map.map.setZoom(15);
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

    this.isWeatherVisible = function() {
      return (this.weatherLayer !== null);
    };

    this.showWeather = function(show) {
      if (show && !this.weatherVisible()) {
        this.weatherLayer = new google.maps.weather.WeatherLayer({
          //temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        this.weatherLayer.setMap(this.map);
      } else
      if (!show && this.weatherVisible()) {
        this.weatherLayer.setMap(null);
        this.weatherLayer = null;
      }
    };

    function internalRemoveMarkers(tag) {
      if (_this.markers[tag]) {
        for (var i = _this.markers[tag].length-1; i >= 0; i--) {
          _this.markers[tag][i].setMap(null);
          _this.markers[tag].splice(i, 1);
        }
      }
    }

    this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    this.iterateMarkers = function(callback) {
      var stop = false;
      for(var tag in _this.markers) {
        for (var i = _this.markers[tag].length-1; i >= 0; i--) {
          stop = callback(_this.markers[tag][i]);
          if (stop) {
            break;
          }
        }
        if (stop) {
          break;
        }
      }
    };

    this.removeMarkers = function(tag) {
      if (tag) {
        internalRemoveMarkers(tag);
      } else {
        for(tag in _this.markers) {
          internalRemoveMarkers(tag);
        }
      }
    };

    this.addMarker = function(lat, lng, params, tag, custom) {
      var markerParams = Object.create({});
      markerParams.icon = params.icon || null;
      markerParams.draggable = params.draggable || false;
      var latLng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({ position: latLng
                                          , map: this.map
                                          , icon: markerParams.icon
                                          , draggable: markerParams.draggable
                                          });
      marker.custom = custom || { };
      tag = tag || '_';
      this.markers[tag] = this.markers[tag] || [];
      this.markers[tag].push(marker);
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

    this.getMarkersByTag = function(tag) {
      return _this.markers[tag] || [];
    };

    this.getMarkersCount = function() {
      var result = 0;
      for(var tag in _this.markers) {
        result += _this.markers[tag].length;
      }
      return result;
    };

    function array_map(array, callback) {
      var original_callback_params = Array.prototype.slice.call(arguments, 2),
        array_return = [],
        array_length = array.length,
        i;

      if (Array.prototype.map && array.map === Array.prototype.map) {
        array_return = Array.prototype.map.call(array, function(item) {
          var callback_params = original_callback_params;
          callback_params.splice(0, 0, item);

          return callback.apply(this, callback_params);
        });
      } else {
        for (i = 0; i < array_length; i++) {
          var callback_params = original_callback_params;
          callback_params.splice(0, 0, array[i]);
          array_return.push(callback.apply(this, callback_params));
        }
      }

      return array_return;
    }

    function array_flat(array) {
      var new_array = [],
          i;

      for (i = 0; i < array.length; i++) {
        new_array = new_array.concat(array[i]);
      }

      return new_array;
    }

    function coordsToLatLngs(coords, useGeoJSON) {
      var first_coord = coords[0],
          second_coord = coords[1];

      if (useGeoJSON) {
        first_coord = coords[1];
        second_coord = coords[0];
      }

      return new google.maps.LatLng(first_coord, second_coord);
    }

    function arrayToLatLng(coords, useGeoJSON) {
      var i;

      for (i = 0; i < coords.length; i++) {
        if (coords[i].length > 0 && typeof(coords[i][0]) == "object") {
          coords[i] = arrayToLatLng(coords[i], useGeoJSON);
        }
        else {
          coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
        }
      }

      return coords;
    }

    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function(latLng) {
        var bounds = new google.maps.LatLngBounds();
        var paths = this.getPaths();
        var path;

        for (var p = 0; p < paths.getLength(); p++) {
          path = paths.getAt(p);
          for (var i = 0; i < path.getLength(); i++) {
            bounds.extend(path.getAt(i));
          }
        }

        return bounds;
      };
    }

    function internalRemovePlygons(tag) {
      if (_this.polygons[tag]) {
        for (var i = _this.polygons[tag].length-1; i >= 0; i--) {
          _this.polygons[tag][i].setMap(null);
          _this.polygons[tag].splice(i, 1);
        }
      }
    }

    this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    this.iteratePolygons = function(callback) {
      var stop = false;
      for(var tag in _this.polygons) {
        for (var i = _this.polygons[tag].length-1; i >= 0; i--) {
          stop = callback(_this.polygons[tag][i]);
          if (stop) {
            break;
          }
        }
        if (stop) {
          break;
        }
      }
    };

    this.removePolygons = function(tag) {
      if (tag) {
        internalRemovePlygons(tag);
      } else {
        for(tag in _this.polygons) {
          internalRemovePlygons(tag);
        }
      }
    };

    this.clearPoi = function() {
      this.removePolygons();
      this.removeMarkers();
    };

    this.addGeoJSONPolygon = function(geoData, params, tag, custom) {
      params = params || Object.create({});
      var polygonParams = Object.create({});
      var coordinates = JSON.parse(JSON.stringify(geoData));
      polygonParams.paths = array_flat(array_map(coordinates, arrayToLatLng, true));
      polygonParams.strokeColor = params.strokeColor || '#999';
      polygonParams.strokeOpacity = params.strokeOpacity || 1;
      polygonParams.strokeWeight = params.strokeWeight || 0.5;
      polygonParams.fillColor = params.fillColor;
      polygonParams.fillOpacity = polygonParams.fillColor ? (params.fillOpacity == undefined ? 0.3 : params.fillOpacity) : 0;
      polygonParams.map = _this.map;
      var polygon = new google.maps.Polygon(polygonParams);
      polygon.custom = custom;
      tag = tag || '_';
      this.polygons[tag] = this.polygons[tag] || [];
      this.polygons[tag].push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    this.getPolygonsByTag = function(tag) {
      return _this.polygons[tag] || [];
    };

    this.getPolygonsCount = function() {
      var result = 0;
      for(var tag in _this.polygons) {
        result += _this.polygons[tag].length;
      }
      return result;
    };

    this.setMapType = function(value) {
      switch(value) {
        case 'r':
          this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
        case 's':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 't':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 'h':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
      }
    };

    this.setTravelMode = function(value) {
      switch(value) {
        case 'd':
          this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
          break;
        case 'b':
          this.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
          break;
        case 'w':
          this.travelMode = google.maps.DirectionsTravelMode.WALKING;
          break;
      }
    };

    this.setZoom = function(zoom) {
      _this.map.setZoom(zoom);
    };

    this.world = function() {
      _this.map.setCenter(worldCenter);
      _this.map.setZoom(3);
    };

    this.pan = function() {
      var bounds = { }, lat, lng, tag, points = [], i;
      for (tag in this.markers) {
        for (i = 0; i < this.markers[tag].length; i++) {
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat()-1, lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat()+1, lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng()-1 });
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng()+1 });
        }
      }
      for (tag in this.polygons) {
        for (i = 0; i < this.polygons[tag].length; i++) {
          points.push( { lat: this.polygons[tag][i].getBounds().getNorthEast().lat(), lng: this.polygons[tag][i].getBounds().getNorthEast().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getSouthWest().lat(), lng: this.polygons[tag][i].getBounds().getSouthWest().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getNorthEast().lat(), lng: this.polygons[tag][i].getBounds().getSouthWest().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getSouthWest().lat(), lng: this.polygons[tag][i].getBounds().getNorthEast().lng() });
        }
      }
      for (i = 0; i < points.length; i++) {
        lat = points[i].lat;
        lng = points[i].lng;
        if (!bounds.latMin) {
          bounds = { latMin: lat, lngMin: lng, latMax: lat, lngMax: lng };
        } else {
          bounds.latMin = Math.max(-54,  Math.min(bounds.latMin, lat));
          bounds.lngMin = Math.max(-160, Math.min(bounds.lngMin, lng));
          bounds.latMax = Math.min(83,   Math.max(bounds.latMax, lat));
          bounds.lngMax = Math.min(160,  Math.max(bounds.lngMax, lng));
        }
      }
      if (points.length > 0) {
        var point = { lat: bounds.latMin + (bounds.latMax - bounds.latMin)/2
                    , lng: bounds.lngMin + (bounds.lngMax - bounds.lngMin)/2
                    };
        var mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.latMin, bounds.lngMin), new google.maps.LatLng(bounds.latMax, bounds.lngMax));
        this.map.panToBounds(mapBounds);
        this.map.fitBounds(mapBounds);
        this.map.setCenter(new google.maps.LatLng(point.lat, point.lng));
      }
    };

    this.gotoAddress = function(address, callback) {
      _this.findAddress(address, function(result, points) {
        if (result) {
          var pos = new google.maps.LatLng(points[0].lat, points[0].lng);
          _this.map.setCenter(pos);
          _this.map.setZoom(17);
          if (typeof callback == 'function') {
            callback.call(_this);
          }
        }
      });
    };

    this.findAddress = function(address, callback) {
      _this.geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var points = [];
          for (var i = 0; i < results.length; i++) {
            points.push({ lat: results[i].geometry.location.lat()
                        , lng: results[i].geometry.location.lng()
                        , name: results[i].formatted_address
                        , raw: results[i]
                        });
          }
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

    this.clearRoute = function() {
      map.directionsDisplay.setMap(null);
    };

    this.drawRoute = function(coord, callback) {
      var origin = null;
      var destination = null;
      var waypoints = [];
      for (var i = 0; i < coord.length; i++) {
        var latLng = coord[i];
        if (origin === null) {
          origin = latLng;
        } else
        if (destination === null) {
          destination = latLng;
        } else {
          waypoints.push({ location: destination, stopover: true });
          destination = latLng;
        }
      }
      if ((origin !== null) && (destination !== null)) {
        var request = {
            origin: origin
          , destination: destination
          , waypoints: waypoints
          , travelMode: this.travelMode
          //optimizeWaypoints: document.getElementById('optimize').checked,
          //avoidHighways: document.getElementById('highways').checked,
          //avoidTolls: document.getElementById('tolls').checked
        };
        this.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            _this.directionsDisplay.setMap(_this.map);
            _this.directionsDisplay.setDirections(response);
            var routeParams = computeRouteParams(_this.directionsDisplay.directions);
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

    this.drawRouteByTag = function(tag, callback) {
      var coord = [];
      var markers = this.getMarkersByTag(tag);
      for (var i = 0; i < markers.length; i++) {
        coord.push(new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
      }
      this.drawRoute(coord, callback);
    };

    if (this.weather) {
      this.showWeather();
    }

    return this;

  }

  window.br = window.br || {};

  window.br.googleMap = function (selector, options) {
    return new BrGoogleMap(selector, options);
  };

})(jQuery, window);
