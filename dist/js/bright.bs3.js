/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.0",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),j=function(e,t){return e===t&&(l=!0),0},D={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&D.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(j),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(j).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var D,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,D=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function we(){return!0}function Te(){return!1}function Ce(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ee(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ee(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Te;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Se(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,we)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click",we),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?we:Te,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Te,isPropagationStopped:Te,isImmediatePropagationStopped:Te,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=we,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=we,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=we,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Se(this,e,Ce),!1},trigger:function(){return Se(this,e),!0},_default:function(){return!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return Ee(this,e,t,n,r)},one:function(e,t,n,r){return Ee(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Te),this.each(function(){S.event.remove(this,e,n,t)})}});var ke=/<script|<style|<link/i,Ae=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function He(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Ae.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),He(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),De)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,qe),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(Ne,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Le(o[r],a[r]);else Le(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Re=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Me=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ie=new RegExp(ne.join("|"),"i");function We(e,t,n){var r,i,o,a,s=e.style;return(n=n||Re(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Pe.test(a)&&Ie.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function Fe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var Be=["Webkit","Moz","ms"],$e=E.createElement("div").style,_e={};function ze(e){var t=S.cssProps[e]||_e[e];return t||(e in $e?e:_e[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Be.length;while(n--)if((e=Be[n]+t)in $e)return e}(e)||e)}var Ue=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ve={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"};function Ye(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Qe(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Je(e,t,n){var r=Re(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=We(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Qe(e,t,n||(i?"border":"content"),o,r,a)+"px"}function Ke(e,t,n,r,i){return new Ke.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=We(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Xe.test(t),l=e.style;if(u||(t=ze(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Xe.test(t)||(t=ze(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=We(e,t,r)),"normal"===i&&t in Ge&&(i=Ge[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ue.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Je(e,u,n):Me(e,Ve,function(){return Je(e,u,n)})},set:function(e,t,n){var r,i=Re(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Qe(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Qe(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Ye(0,t,s)}}}),S.cssHooks.marginLeft=Fe(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(We(e,"marginLeft"))||e.getBoundingClientRect().left-Me(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Ye)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Re(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=Ke).prototype={constructor:Ke,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=Ke.propHooks[this.prop];return e&&e.get?e.get(this):Ke.propHooks._default.get(this)},run:function(e){var t,n=Ke.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ke.propHooks._default.set(this),this}}).init.prototype=Ke.prototype,(Ke.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[ze(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=Ke.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=Ke.prototype.init,S.fx.step={};var Ze,et,tt,nt,rt=/^(?:toggle|show|hide)$/,it=/queueHooks$/;function ot(){et&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(ot):C.setTimeout(ot,S.fx.interval),S.fx.tick())}function at(){return C.setTimeout(function(){Ze=void 0}),Ze=Date.now()}function st(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ut(e,t,n){for(var r,i=(lt.tweeners[t]||[]).concat(lt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function lt(o,e,t){var n,a,r=0,i=lt.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=Ze||at(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:Ze||at(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=lt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ut,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(lt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],lt.tweeners[n]=lt.tweeners[n]||[],lt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],rt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ut(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?lt.prefilters.unshift(e):lt.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=lt(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&it.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(st(r,!0),e,t,n)}}),S.each({slideDown:st("show"),slideUp:st("hide"),slideToggle:st("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(Ze=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),Ze=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){et||(et=!0,ot())},S.fx.stop=function(){et=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},tt=E.createElement("input"),nt=E.createElement("select").appendChild(E.createElement("option")),tt.type="checkbox",y.checkOn=""!==tt.value,y.optSelected=nt.selected,(tt=E.createElement("input")).value="t",tt.type="radio",y.radioValue="t"===tt.value;var ct,ft=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?ct:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ct={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=ft[t]||S.find.attr;ft[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=ft[o],ft[o]=r,r=null!=a(e,t,n)?o:null,ft[o]=i),r}});var pt=/^(?:input|select|textarea|button)$/i,dt=/^(?:a|area)$/i;function ht(e){return(e.match(P)||[]).join(" ")}function gt(e){return e.getAttribute&&e.getAttribute("class")||""}function vt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):pt.test(e.nodeName)||dt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,gt(this)))});if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,gt(this)))});if(!arguments.length)return this.attr("class","");if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,gt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=vt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=gt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+ht(gt(n))+" ").indexOf(t))return!0;return!1}});var yt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(yt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:ht(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var mt=/^(?:focusinfocus|focusoutblur)$/,xt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!mt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,mt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,xt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,xt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var bt=C.location,wt={guid:Date.now()},Tt=/\?/;S.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Ct=/\[\]$/,Et=/\r?\n/g,St=/^(?:submit|button|image|reset|file)$/i,kt=/^(?:input|select|textarea|keygen)/i;function At(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||Ct.test(n)?i(n,t):At(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)At(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)At(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&kt.test(this.nodeName)&&!St.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(Et,"\r\n")}}):{name:t.name,value:n.replace(Et,"\r\n")}}).get()}});var Nt=/%20/g,jt=/#.*$/,Dt=/([?&])_=[^&]*/,qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Lt=/^(?:GET|HEAD)$/,Ht=/^\/\//,Ot={},Pt={},Rt="*/".concat("*"),Mt=E.createElement("a");function It(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Wt(t,i,o,a){var s={},u=t===Pt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Ft(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Mt.href=bt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:bt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Rt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ft(Ft(e,S.ajaxSettings),t):Ft(S.ajaxSettings,e)},ajaxPrefilter:It(Ot),ajaxTransport:It(Pt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=qt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||bt.href)+"").replace(Ht,bt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Mt.protocol+"//"+Mt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Wt(Ot,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Lt.test(v.type),f=v.url.replace(jt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Nt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Tt.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Dt,"$1"),o=(Tt.test(f)?"&":"?")+"_="+wt.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+Rt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Wt(Pt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&S.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Bt={0:200,1223:204},$t=S.ajaxSettings.xhr();y.cors=!!$t&&"withCredentials"in $t,y.ajax=$t=!!$t,S.ajaxTransport(function(i){var o,a;if(y.cors||$t&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Bt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var _t,zt=[],Ut=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=zt.pop()||S.expando+"_"+wt.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Ut.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ut.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Ut,"$1"+r):!1!==e.jsonp&&(e.url+=(Tt.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,zt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((_t=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===_t.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=ht(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=Fe(y.pixelPosition,function(e,t){if(t)return t=We(e,n),Pe.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Xt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Xt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Vt=C.jQuery,Gt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Gt),e&&C.jQuery===S&&(C.jQuery=Vt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||3<e[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function o(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(t.style[i]!==undefined)return{end:e[i]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)};a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=s(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),i="#"===i?[]:i;var o=s(document).find(i);function n(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),s.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())};var t=s.fn.alert;s.fn.alert=function o(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict";var n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.4.1",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data();t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e).prop(e,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e).prop(e,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var t=s.fn.button;s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target).closest(".btn");i.call(e,"toggle"),s(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),e.is("input,button")?e.trigger("focus"):e.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(p){"use strict";var c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))};function r(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide;e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.4.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var o=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(o)},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),n=this.interval,s="next"==t?"left":"right",a=this;if(o.hasClass("active"))return this.sliding=!1;var r=o[0],l=p.Event("slide.bs.carousel",{relatedTarget:r,direction:s});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,n&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=p(this.$indicators.children()[this.getItemIndex(o)]);h&&h.addClass("active")}var d=p.Event("slid.bs.carousel",{relatedTarget:r,direction:s});return p.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),"object"==typeof o&&o.length&&o[0].offsetWidth,i.addClass(s),o.addClass(s),i.one("bsTransitionEnd",function(){o.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger(d)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),n&&this.cycle(),this}};var t=p.fn.carousel;p.fn.carousel=r,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this};var e=function(t){var e=p(this),i=e.attr("href");i&&(i=i.replace(/.*(?=#[^\s]+$)/,""));var o=e.attr("data-target")||i,n=p(document).find(o);if(n.hasClass("carousel")){var s=p.extend({},n.data(),e.data()),a=e.attr("data-slide-to");a&&(s.interval=!1),r.call(n,s),a&&n.data("bs.carousel").to(a),t.preventDefault()}};p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this);r.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(document).find(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.4.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return n.call(this);var s=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=n(e),o=i.data("bs.collapse")?"toggle":e.data();l.call(i,o)})}(jQuery),function(a){"use strict";var r='[data-toggle="dropdown"]',o=function(t){a(t).on("click.bs.dropdown",this.toggle)};function l(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i="#"!==e?a(document).find(e):null;return i&&i.length?i:t.parent()}function s(o){o&&3===o.which||(a(".dropdown-backdrop").remove(),a(r).each(function(){var t=a(this),e=l(t),i={relatedTarget:this};e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&a.contains(e[0],o.target)||(e.trigger(o=a.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",i)))))}))}o.VERSION="3.4.1",o.prototype.toggle=function(t){var e=a(this);if(!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(s(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",s);var n={relatedTarget:this};if(i.trigger(t=a.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(a.Event("shown.bs.dropdown",n))}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=a(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(r).trigger("focus"),e.trigger("click");var n=i.find(".dropdown-menu li:not(.disabled):visible a");if(n.length){var s=n.index(t.target);38==t.which&&0<s&&s--,40==t.which&&s<n.length-1&&s++,~s||(s=0),n.eq(s).trigger("focus")}}}};var t=a.fn.dropdown;a.fn.dropdown=function e(i){return this.each(function(){var t=a(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},a.fn.dropdown.Constructor=o,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=t,this},a(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",r,o.prototype.toggle).on("keydown.bs.dropdown.data-api",r,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(a){"use strict";var s=function(t,e){this.options=e,this.$body=a(document.body),this.$element=a(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,n){return this.each(function(){var t=a(this),e=t.data("bs.modal"),i=a.extend({},s.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new s(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}s.VERSION="3.4.1",s.TRANSITION_DURATION=300,s.BACKDROP_TRANSITION_DURATION=150,s.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},s.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},s.prototype.show=function(i){var o=this,t=a.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){a(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=a.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:i});t?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(s.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},s.prototype.hide=function(t){t&&t.preventDefault(),t=a.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(s.TRANSITION_DURATION):this.hideModal())},s.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},s.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},s.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},s.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},s.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},s.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=a.support.transition&&i;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+i).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){e.removeBackdrop(),t&&t()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):n()}else t&&t()},s.prototype.handleUpdate=function(){this.adjustDialog()},s.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},s.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},s.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},s.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var n=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",t+n),a(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,o=a(e).css("padding-right");a(e).data("padding-right",i).css("padding-right",parseFloat(o)+n+"px")}))},s.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),a(this.fixedContent).each(function(t,e){var i=a(e).data("padding-right");a(e).removeData("padding-right"),e.style.paddingRight=i||""})},s.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=a.fn.modal;a.fn.modal=r,a.fn.modal.Constructor=s,a.fn.modal.noConflict=function(){return a.fn.modal=t,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=a(this),i=e.attr("href"),o=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),n=a(document).find(o),s=n.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(i)&&i},n.data(),e.data());e.is("a")&&t.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(n,s,this)})}(jQuery),function(g){"use strict";var o=["sanitize","whiteList","sanitizeFn"],a=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},r=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,l=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function u(t,e){var i=t.nodeName.toLowerCase();if(-1!==g.inArray(i,e))return-1===g.inArray(i,a)||Boolean(t.nodeValue.match(r)||t.nodeValue.match(l));for(var o=g(e).filter(function(t,e){return e instanceof RegExp}),n=0,s=o.length;n<s;n++)if(i.match(o[n]))return!0;return!1}function n(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return t;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=t;for(var n=g.map(e,function(t,e){return e}),s=g(o.body).find("*"),a=0,r=s.length;a<r;a++){var l=s[a],h=l.nodeName.toLowerCase();if(-1!==g.inArray(h,n))for(var d=g.map(l.attributes,function(t){return t}),p=[].concat(e["*"]||[],e[h]||[]),c=0,f=d.length;c<f;c++)u(d[c],p)||l.removeAttribute(d[c].nodeName);else l.parentNode.removeChild(l)}return o.body.innerHTML}var m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};m.VERSION="3.4.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},m.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(document).find(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this))}}this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){var e=this.$element.data();for(var i in e)e.hasOwnProperty(i)&&-1!==g.inArray(i,o)&&delete e[i];return(t=g.extend({},this.getDefaults(),e,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=n(t.template,t.whiteList,t.sanitizeFn)),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t=g.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),n=this.getUID(this.type);this.setContent(),o.attr("id",n),this.$element.attr("aria-describedby",n),this.options.animation&&o.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(s);r&&(s=s.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?o.appendTo(g(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),h=o[0].offsetWidth,d=o[0].offsetHeight;if(r){var p=s,c=this.getPosition(this.$viewport);s="bottom"==s&&l.bottom+d>c.bottom?"top":"top"==s&&l.top-d<c.top?"bottom":"right"==s&&l.right+h>c.width?"left":"left"==s&&l.left-h<c.left?"right":s,o.removeClass(p).addClass(s)}var f=this.getCalculatedOffset(s,l,h,d);this.applyPlacement(f,s);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};g.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",u).emulateTransitionEnd(m.TRANSITION_DURATION):u()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),t.top+=s,t.left+=a,g.offset.setOffset(i[0],g.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var d=/top|bottom/.test(e),p=d?2*h.left-o+r:2*h.top-n+l,c=d?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][c],d)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=n(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type);function n(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:g(window).width(),height:g(window).height()}:null;return g.extend({},o,a,r,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},m.prototype.sanitizeHtml=function(t){return n(t,this.options.whiteList,this.options.sanitizeFn)};var e=g.fn.tooltip;g.fn.tooltip=function i(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=e,this}}(jQuery),function(n){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.1",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var o=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===o&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===o?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=n.fn.popover;n.fn.popover=function e(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict";function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.4.1",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(n[t+1]===undefined||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=s(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=s.fn.scrollspy;s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),n=r.Event("hide.bs.tab",{relatedTarget:t[0]}),s=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(n),t.trigger(s),!s.isDefaultPrevented()&&!n.isDefaultPrevented()){var a=r(document).find(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e);var i=this.options.target===h.DEFAULTS.target?l(this.options.target):l(document).find(this.options.target);this.$target=i.on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.4.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return n<i&&"top";if("bottom"==this.affixed)return null!=i?!(n+this.unpin<=s.top)&&"bottom":!(n+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?n:s.top;return null!=i&&n<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var s=this.getState(n,t,i,o);if(this.affixed!=s){null!=this.unpin&&this.$element.css("top","");var a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);
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
(function($){$.gritter={};$.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3};$.gritter.add=function(params){try{return Gritter.add(params||{})}catch(e){}};$.gritter.remove=function(id,params){Gritter.removeSpecific(id,params||{})};$.gritter.removeAll=function(params){Gritter.stop(params||{})};var Gritter={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close"href="#" tabindex="1">hide</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(params){if(typeof params=="string"){params={text:params}}if(params.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var title=params.title,text=params.text,image=params.image||"",sticky=params.sticky||false,item_class=params.class_name||$.gritter.options.class_name,position=$.gritter.options.position,time_alive=params.time||"";this._verifyWrapper();this._item_count++;var number=this._item_count,tmp=this._tpl_item;$(["before_open","after_open","before_close","after_close"]).each((function(i,val){Gritter["_"+val+"_"+number]=$.isFunction(params[val])?params[val]:function(){}}));this._custom_timer=0;if(time_alive){this._custom_timer=time_alive}var image_str=image!=""?'<img src="'+image+'" class="gritter-image" />':"",class_name=image!=""?"gritter-with-image":"gritter-without-image";if(title){title=this._str_replace("[[title]]",title,this._tpl_title)}else{title=""}tmp=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[title,text,this._tpl_close,image_str,this._item_count,class_name,item_class],tmp);if(this["_before_open_"+number]()===false){return false}$("#gritter-notice-wrapper").addClass(position).append(tmp);var item=$("#gritter-item-"+this._item_count);item.fadeIn(this.fade_in_speed,(function(){Gritter["_after_open_"+number]($(this))}));if(!sticky){this._setFadeTimer(item,number)}$(item).bind("mouseenter mouseleave",(function(event){if(event.type=="mouseenter"){if(!sticky){Gritter._restoreItemIfFading($(this),number)}}else{if(!sticky){Gritter._setFadeTimer($(this),number)}}Gritter._hoverState($(this),event.type)}));$(item).find(".gritter-close").click((function(){Gritter.removeSpecific(number,{},null,true);return false}));return number},_countRemoveWrapper:function(unique_id,e,manual_close){e.remove();this["_after_close_"+unique_id](e,manual_close);if($(".gritter-item-wrapper").length==0){$("#gritter-notice-wrapper").remove()}},_fade:function(e,unique_id,params,unbind_events){params=params||{};var fade=typeof params.fade!="undefined"?params.fade:true,fade_out_speed=params.speed||this.fade_out_speed,manual_close=unbind_events;this["_before_close_"+unique_id](e,manual_close);if(unbind_events){e.unbind("mouseenter mouseleave")}if(fade){e.animate({opacity:0},fade_out_speed,(function(){e.animate({height:0},300,(function(){Gritter._countRemoveWrapper(unique_id,e,manual_close)}))}))}else{this._countRemoveWrapper(unique_id,e)}},_hoverState:function(e,type){if(type=="mouseenter"){e.addClass("hover");e.find(".gritter-close").show()}else{e.removeClass("hover");e.find(".gritter-close").hide()}},removeSpecific:function(unique_id,params,e,unbind_events){if(!e){e=$("#gritter-item-"+unique_id)}this._fade(e,unique_id,params||{},unbind_events)},_restoreItemIfFading:function(e,unique_id){window.clearTimeout(this["_int_id_"+unique_id]);e.stop().css({opacity:"",height:""})},_runSetup:function(){for(var opt in $.gritter.options){this[opt]=$.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(e,unique_id){var timer_str=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+unique_id]=window.setTimeout((function(){Gritter._fade(e,unique_id)}),timer_str)},stop:function(params){var before_close=$.isFunction(params.before_close)?params.before_close:function(){};var after_close=$.isFunction(params.after_close)?params.after_close:function(){};var wrap=$("#gritter-notice-wrapper");before_close(wrap);wrap.fadeOut((function(){$(this).remove();after_close()}))},_str_replace:function(search,replace,subject,count){var i=0,j=0,temp="",repl="",sl=0,fl=0,f=[].concat(search),r=[].concat(replace),s=subject,ra=r instanceof Array,sa=s instanceof Array;s=[].concat(s);if(count){this.window[count]=0}for(i=0,sl=s.length;i<sl;i++){if(s[i]===""){continue}for(j=0,fl=f.length;j<fl;j++){temp=s[i]+"";repl=ra?r[j]!==undefined?r[j]:"":r[0];s[i]=temp.split(f[j]).join(repl);if(count&&s[i]!==temp){this.window[count]+=(temp.length-s[i].length)/f[j].length}}}return sa?s:s[0]},_verifyWrapper:function(){if($("#gritter-notice-wrapper").length==0){$("body").append(this._tpl_wrap)}}}})(jQuery);
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,(function(e){var n=t[o][1][e];return s(n?n:e)}),l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";var asap=require("asap/raw");function noop(){}var LAST_ERROR=null;var IS_ERROR={};function getThen(obj){try{return obj.then}catch(ex){LAST_ERROR=ex;return IS_ERROR}}function tryCallOne(fn,a){try{return fn(a)}catch(ex){LAST_ERROR=ex;return IS_ERROR}}function tryCallTwo(fn,a,b){try{fn(a,b)}catch(ex){LAST_ERROR=ex;return IS_ERROR}}module.exports=Promise;function Promise(fn){if(typeof this!=="object"){throw new TypeError("Promises must be constructed via new")}if(typeof fn!=="function"){throw new TypeError("not a function")}this._37=0;this._12=null;this._59=[];if(fn===noop)return;doResolve(fn,this)}Promise._99=noop;Promise.prototype.then=function(onFulfilled,onRejected){if(this.constructor!==Promise){return safeThen(this,onFulfilled,onRejected)}var res=new Promise(noop);handle(this,new Handler(onFulfilled,onRejected,res));return res};function safeThen(self,onFulfilled,onRejected){return new self.constructor((function(resolve,reject){var res=new Promise(noop);res.then(resolve,reject);handle(self,new Handler(onFulfilled,onRejected,res))}))}function handle(self,deferred){while(self._37===3){self=self._12}if(self._37===0){self._59.push(deferred);return}asap((function(){var cb=self._37===1?deferred.onFulfilled:deferred.onRejected;if(cb===null){if(self._37===1){resolve(deferred.promise,self._12)}else{reject(deferred.promise,self._12)}return}var ret=tryCallOne(cb,self._12);if(ret===IS_ERROR){reject(deferred.promise,LAST_ERROR)}else{resolve(deferred.promise,ret)}}))}function resolve(self,newValue){if(newValue===self){return reject(self,new TypeError("A promise cannot be resolved with itself."))}if(newValue&&(typeof newValue==="object"||typeof newValue==="function")){var then=getThen(newValue);if(then===IS_ERROR){return reject(self,LAST_ERROR)}if(then===self.then&&newValue instanceof Promise){self._37=3;self._12=newValue;finale(self);return}else if(typeof then==="function"){doResolve(then.bind(newValue),self);return}}self._37=1;self._12=newValue;finale(self)}function reject(self,newValue){self._37=2;self._12=newValue;finale(self)}function finale(self){for(var i=0;i<self._59.length;i++){handle(self,self._59[i])}self._59=null}function Handler(onFulfilled,onRejected,promise){this.onFulfilled=typeof onFulfilled==="function"?onFulfilled:null;this.onRejected=typeof onRejected==="function"?onRejected:null;this.promise=promise}function doResolve(fn,promise){var done=false;var res=tryCallTwo(fn,(function(value){if(done)return;done=true;resolve(promise,value)}),(function(reason){if(done)return;done=true;reject(promise,reason)}));if(!done&&res===IS_ERROR){done=true;reject(promise,LAST_ERROR)}}},{"asap/raw":4}],2:[function(require,module,exports){"use strict";var Promise=require("./core.js");module.exports=Promise;var TRUE=valuePromise(true);var FALSE=valuePromise(false);var NULL=valuePromise(null);var UNDEFINED=valuePromise(undefined);var ZERO=valuePromise(0);var EMPTYSTRING=valuePromise("");function valuePromise(value){var p=new Promise(Promise._99);p._37=1;p._12=value;return p}Promise.resolve=function(value){if(value instanceof Promise)return value;if(value===null)return NULL;if(value===undefined)return UNDEFINED;if(value===true)return TRUE;if(value===false)return FALSE;if(value===0)return ZERO;if(value==="")return EMPTYSTRING;if(typeof value==="object"||typeof value==="function"){try{var then=value.then;if(typeof then==="function"){return new Promise(then.bind(value))}}catch(ex){return new Promise((function(resolve,reject){reject(ex)}))}}return valuePromise(value)};Promise.all=function(arr){var args=Array.prototype.slice.call(arr);return new Promise((function(resolve,reject){if(args.length===0)return resolve([]);var remaining=args.length;function res(i,val){if(val&&(typeof val==="object"||typeof val==="function")){if(val instanceof Promise&&val.then===Promise.prototype.then){while(val._37===3){val=val._12}if(val._37===1)return res(i,val._12);if(val._37===2)reject(val._12);val.then((function(val){res(i,val)}),reject);return}else{var then=val.then;if(typeof then==="function"){var p=new Promise(then.bind(val));p.then((function(val){res(i,val)}),reject);return}}}args[i]=val;if(--remaining===0){resolve(args)}}for(var i=0;i<args.length;i++){res(i,args[i])}}))};Promise.reject=function(value){return new Promise((function(resolve,reject){reject(value)}))};Promise.race=function(values){return new Promise((function(resolve,reject){values.forEach((function(value){Promise.resolve(value).then(resolve,reject)}))}))};Promise.prototype["catch"]=function(onRejected){return this.then(null,onRejected)}},{"./core.js":1}],3:[function(require,module,exports){"use strict";var rawAsap=require("./raw");var freeTasks=[];var pendingErrors=[];var requestErrorThrow=rawAsap.makeRequestCallFromTimer(throwFirstError);function throwFirstError(){if(pendingErrors.length){throw pendingErrors.shift()}}module.exports=asap;function asap(task){var rawTask;if(freeTasks.length){rawTask=freeTasks.pop()}else{rawTask=new RawTask}rawTask.task=task;rawAsap(rawTask)}function RawTask(){this.task=null}RawTask.prototype.call=function(){try{this.task.call()}catch(error){if(asap.onerror){asap.onerror(error)}else{pendingErrors.push(error);requestErrorThrow()}}finally{this.task=null;freeTasks[freeTasks.length]=this}}},{"./raw":4}],4:[function(require,module,exports){(function(global){"use strict";module.exports=rawAsap;function rawAsap(task){if(!queue.length){requestFlush();flushing=true}queue[queue.length]=task}var queue=[];var flushing=false;var requestFlush;var index=0;var capacity=1024;function flush(){while(index<queue.length){var currentIndex=index;index=index+1;queue[currentIndex].call();if(index>capacity){for(var scan=0,newLength=queue.length-index;scan<newLength;scan++){queue[scan]=queue[scan+index]}queue.length-=index;index=0}}queue.length=0;index=0;flushing=false}var BrowserMutationObserver=global.MutationObserver||global.WebKitMutationObserver;if(typeof BrowserMutationObserver==="function"){requestFlush=makeRequestCallFromMutationObserver(flush)}else{requestFlush=makeRequestCallFromTimer(flush)}rawAsap.requestFlush=requestFlush;function makeRequestCallFromMutationObserver(callback){var toggle=1;var observer=new BrowserMutationObserver(callback);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function requestCall(){toggle=-toggle;node.data=toggle}}function makeRequestCallFromTimer(callback){return function requestCall(){var timeoutHandle,intervalHandle;if(typeof setTimeout!="undefined"){timeoutHandle=setTimeout(handleTimer,0)}if(typeof setInterval!="undefined"){intervalHandle=setInterval(handleTimer,50)}function handleTimer(){if(timeoutHandle){clearTimeout(timeoutHandle)}if(intervalHandle){clearInterval(intervalHandle)}callback()}}}rawAsap.makeRequestCallFromTimer=makeRequestCallFromTimer}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],5:[function(require,module,exports){if(typeof Promise.prototype.done!=="function"){Promise.prototype.done=function(onFulfilled,onRejected){var self=arguments.length?this.then.apply(this,arguments):this;self.then(null,(function(err){setTimeout((function(){throw err}),0)}))}}},{}],6:[function(require,module,exports){var asap=require("asap");if(typeof Promise==="undefined"){Promise=require("./lib/core.js");require("./lib/es6-extensions.js")}require("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);
/* global Element */

if (!Element.prototype.scrollIntoViewIfNeeded) {
  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
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

;(function (window) {

  window.br = window.br || Object.create({});

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
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function (window) {

  window.br = window.br || Object.create({});

  const _helper = {
    pack: function(data) {
      return JSON.stringify(data);
    }
  , unpack: function(data) {
      try {
        return JSON.parse(data);
      } catch(ex) {
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
        result = Object.create({});
        for(let i in key) {
          result[key[i]] = _this.get(key[i]);
        }
      } else {
        result = _helper.unpack(_storage.getItem(key));
      }
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    };

    _this.set = function(key, value) {
      if (br.isObject(key)) {
        for(let name in key) {
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
          for(let i in newValue) {
            _this.append(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while(value.length >= limit) {
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
          for(let i in newValue) {
            _this.prepend(key, newValue[i], limit);
          }
        } else {
          if (br.isNumber(limit)) {
            while(value.length >= limit) {
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
      for(let i = 0, length = value.length; i < length; i++) {
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
          value = Object.create({});
        }
        if (br.isObject(newValue)) {
          for(let i in newValue) {
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
      let result = Object.create({});
      for(let name in _storage) {
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

;(function (window) {

  window.br = window.br || Object.create({});

  function BrEventQueue(obj) {

    const _this = this;

    _this.subscribers = Object.create({});
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
      for(let i = 0, length = eventsArray.length; i < length; i++) {
        let event = eventsArray[i];
        if (!_this.subscribers[event]) {
          _this.subscribers[event] = Object.create({ on: [], pause: [], before: [], after: [] });
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
      for(let i = 0, length = eventsArray.length; i < length; i++) {
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
      for(let name in _this.subscribers) {
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

;(function (window) {

  window.br = window.br || Object.create({});

  function BrRequest() {

    const _this = this;

    _this.continueRoute = true;
    _this.csrfToken = '';

    let csrfCookie = '';

    if (document) {
      if (document.cookie) {
        var csrfCookieRegexp = document.cookie.match(/Csrf-Token=([\w-]+)/);
        if (csrfCookieRegexp) {
          _this.csrfToken = csrfCookieRegexp[1];
        }
      }
    }

    _this.get = function(name, defaultValue) {
      let vars = document.location.search.replace('?', '').split('&');
      let vals = Object.create({});
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
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

    _this.hash = function(name, defaultValue) {
      let vars = document.location.hash.replace('#', '').split('&');
      let vals = {};
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
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

;(function (window) {

  window.br = window.br || Object.create({});

  function BrThread(lazy) {

    const _this = this;

    _this.queue = [];
    _this.workingQueue = [];
    _this.lazy = lazy;

    _this.push = function(func) {
      _this.queue.unshift({ func: func });
      if (!_this.lazy) {
        _this.wakeup();
      }
    };

    _this.done = function(func) {
      _this.workingQueue.pop();
      _this.wakeup();
    };

    this.clear = function(func) {
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

/* global Int32Array */

;(function (window) {

  window.br = window.br || Object.create({});

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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrWebCamera() {

    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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

          br.getUserMedia( { video: true }
                         , function(stream) {
                             webCam.srcObject = stream;
                             webCam.onloadedmetadata = function(event) {
                               _this.events.trigger('connected', { width: webCam.videoWidth, height: webCam.videoHeight });
                               webCam.play();
                               br.requestAnimationFrame(requestFrame);
                             };
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

    _this.disconnect = function(webCam) {
      if (webCam.srcObject) {
        try {
          const tracks = webCam.srcObject.getTracks();
          if (tracks.length > 0) {
            tracks[0].stop();
          }
        } catch (error) {

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

/* global console */
/* global ArrayBuffer */
/* global Uint32Array */
/* global FormData */
/* global safari */

;(function ($, window) {

  window.br = window.br || Object.create({});

  let baseUrl = '';
  let brightUrl = '';

  let scripts = $('script');

  for(let i = 0, length = scripts.length; i < length; i++) {
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

  let logStarted = false;

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
    return /*@cc_on!@*/false || !!document.documentMode; // At least IE6
  };

  window.br.isOpera = function() {
    return (!!window.opr && !!window.opr.addons) || !!window.opera;
  };

  window.br.isFirefox = function() {
    return typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
  };

  window.br.isSafari = function() {
    return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
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

          }
        }
      }
      window.close();
    } else {
      let caller = br.isEmpty(br.request.get('caller')) ? null : br.request.get('caller');
      let referer = br.isEmpty(document.referrer) ? null : (document.referrer.indexOf('login') != -1 ? null : (document.referrer == document.location.toString() ? null : document.referrer));
      let href = br.isEmpty(defaultHref) ? null : defaultHref;
      let redirectHref = (caller ? caller : (href ? href : referer));
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

    function processQueued(processRowCallback, processCompleteCallback, params) {

      if (array.length > 0) {
        let rowid = array.shift();
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
    let trn = [];
    this.get = function (phrase) { if (trn[phrase]) { return trn[phrase]; } else { return phrase; } };
    this.set = function (phrase, translation) { trn[phrase] = translation; return this; };
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
    let F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
  };

  function openUrl(href, options) {
    options = options || { };

    let message;
    const target = (options.target ? options.target : '_blank');

    if (options.urlTitle) {
      message = `<p>Click below to open link manually</p>
                 <p><a target="${target}" class="action-open-link" href="${href}" style="word-wrap: break-word">${options.urlTitle}</a></p>`;
    } else {
      message = `<p>Click a <a target="${target}" class="action-open-link" href="${href}" style="word-wrap: break-word">here</a> to open link manually</p>`;
    }

    message = `${message}
              <p>To eliminate this extra step, we recommend you modify your settings to disable the popup blocker.</p>`;

    const dialog = br.inform('You browser is currently blocking popups', message);
    $('.action-open-link', dialog).on('click', function() {
      dialog.modal('hide');
      dialog.remove();
    });
  }

  window.br.openPage = function(href, options) {
    options = options || { };

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
      options = { target: options };
    } else {
      options = options || { };
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
      let left = (screen.width) ? (screen.width-width)/2 : 0;
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
        for(let i = 0, length = callbacks.length; i < length; i++) {
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
      let callbacks = $(this).data(listName);
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

  let closeConfirmationRequired = false;
  let windowUnloading = false;

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
        for(let i = 0, length = sel.rangeCount; i < length; ++i) {
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

  /* jshint ignore:start */
  window.br.load = window.br.resourceLoader = function(j){function p(c,a){var g=j.createElement(c),b;for(b in a)a.hasOwnProperty(b)&&g.setAttribute(b,a[b]);return g}function m(c){var a=k[c],b,e;if(a)b=a.callback,e=a.urls,e.shift(),h=0,e.length||(b&&b.call(a.context,a.obj),k[c]=null,n[c].length&&i(c))}function u(){if(!b){var c=navigator.userAgent;b={async:j.createElement("script").async===!0};(b.webkit=/AppleWebKit\//.test(c))||(b.ie=/MSIE/.test(c))||(b.opera=/Opera/.test(c))||(b.gecko=/Gecko\//.test(c))||(b.unknown=!0)}}function i(c,
    a,g,e,h){var i=function(){m(c)},o=c==="css",f,l,d,q;u();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||b.async||b.gecko||b.opera)n[c].push({urls:a,callback:g,obj:e,context:h});else{f=0;for(l=a.length;f<l;++f)n[c].push({urls:[a[f]],callback:f===l-1?g:null,obj:e,context:h})}if(!k[c]&&(q=k[c]=n[c].shift())){r||(r=j.head||j.getElementsByTagName("head")[0]);a=q.urls;f=0;for(l=a.length;f<l;++f)g=a[f],o?d=b.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(d=p("script",{src:g}),d.async=!1),d.className=
    "lazyload",d.setAttribute("charset","utf-8"),b.ie&&!o?d.onreadystatechange=function(){if(/loaded|complete/.test(d.readyState))d.onreadystatechange=null,i()}:o&&(b.gecko||b.webkit)?b.webkit?(q.urls[f]=d.href,s()):(d.innerHTML='@import "'+g+'";',m("css")):d.onload=d.onerror=i,r.appendChild(d)}}function s(){var c=k.css,a;if(c){for(a=t.length;--a>=0;)if(t[a].href===c.urls[0]){m("css");break}h+=1;c&&(h<200?setTimeout(s,50):m("css"))}}var b,r,k={},h=0,n={css:[],js:[]},t=j.styleSheets;return{css:function(c,
    a,b,e){i("css",c,a,b,e)},js:function(c,a,b,e){i("js",c,a,b,e)}}}(document);
  /* jshint ignore:end */

  window.br.URL = window.URL || window.webkitURL;

  // Media devices - audio/video

  let lastAnimationFramtTime = 0;

  window.br.requestAnimationFrame = function(callback, element) {

    let requestAnimationFrame =
      window.requestAnimationFrame        ||
      window.webkitRequestAnimationFrame  ||
      window.mozRequestAnimationFrame     ||
      window.oRequestAnimationFrame       ||
      window.msRequestAnimationFrame      ||
      function(callback, element) {
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16 - (currTime - lastAnimationFramtTime));
        let id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastAnimationFramtTime = currTime + timeToCall;
        return id;
      };

    return requestAnimationFrame.call(window, callback, element);

  };

  window.br.cancelAnimationFrame = function(id) {

    let cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      };

    return cancelAnimationFrame.call(window, id);

  };

  window.br.getUserMedia = function(options, success, error) {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
    } else {
      let getUserMedia =
        navigator.getUserMedia       ||
        navigator.mozGetUserMedia    ||
        navigator.webkitGetUserMedia ||
        navigator.msGetUserMedia     ||
        function(options, success, error) {
          error();
        };

      return getUserMedia.call(window.navigator, options, success, error);
    }

  };

  window.br.getAudioContext = function() {

    let AudioContext = window.AudioContext ||
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

  if (window.addEventListener) {
    window.addEventListener('error', function(event) {

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

        }
      }

    });

    window.addEventListener('unhandledrejection', function(event) {

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
        let result = false;
        try {
          result = window.br.events.trigger('error', data);
        } catch (error) {

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
    for(let name in obj) {
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
          let message = '', suffix;
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

;(function (window) {

  window.br = window.br || Object.create({});

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

  window.br.flagsHolder = function (permanent, name) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataSource(restServiceUrl, options) {

    const _this = this;

    _this.options = options || Object.create({});
    _this.options.restServiceUrl = restServiceUrl;
    _this.options.restServiceUrlNormalized = restServiceUrl;
    _this.options.refreshDelay = _this.options.refreshDelay || 1500;

    if (!restServiceUrl.match(/[.]json$/) && !restServiceUrl.match(/\/$/)) {
      _this.options.restServiceUrlNormalized = restServiceUrl + '/';
    }

    _this.ajaxRequest = null;
    _this.name = '-';
    _this.clientUID = null;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    let selectOperationCounter = 0;
    let refreshTimeout;
    let requestHeaders = { };

    if (br.request.csrfToken) {
      requestHeaders['X-Csrf-Token'] = br.request.csrfToken;
    }

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

      options = options || Object.create({});

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

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'PUT'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrl + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     let result, errorMessage;
                     if (response) {
                       result = true;
                     } else {
                       result = false;
                       errorMessage = 'Empty response. Was expecting new created records with ROWID.';
                     }
                     if (result) {
                       resolve({request: request, options: options, response: response});
                     } else {
                       reject({request: request, options: options, errorMessage: errorMessage});
                     }
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
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

      options = options || Object.create({});

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

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     let operation = 'update';
                     if (response) {
                       let res = _this.events.trigger('removeAfterUpdate', item, response);
                       if ((res !== null) && res) {
                         operation = 'remove';
                       }
                     }
                     resolve({operation: operation, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
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

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = Object.create({});

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

          $.ajax({ type: _this.options.crossdomain ? 'GET' : 'DELETE'
                 , data: request
                 , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                 , url: _this.options.restServiceUrlNormalized + rowid + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                 , headers: requestHeaders
                 , success: function(response) {
                     resolve({rowid: rowid, request: request, options: options, response: response});
                   }
                 , error: function(jqXHR, textStatus, errorThrown) {
                     if (!br.isUnloading()) {
                       let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
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
        filter = Object.create({});
      }

      let newFilter = Object.create({});
      for(let name in filter) {
        newFilter[name] = filter[name];
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
        filter = Object.create({});
      }

      options = options || Object.create({});
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
        let savedFilter = Object.create({});
        for(let i in filter) {
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
        filter = Object.create({});
      } else
      if ((callback != undefined) && (callback != null) && (typeof callback != 'function')) {
        options = callback;
        callback = null;
      }

      options = options || { };

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = Object.create({});
        let requestRowid;

        let selectOne = options && options.selectOne;
        let selectCount = options && options.selectCount;
        let singleRespone = selectOne || selectCount;

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
            for(let name in filter) {
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

        function handleResponse(response) {
          if (br.isArray(response)) {
            for(let i = 0, length = response.length; i < length; i++) {
              _this.events.trigger('calcFields', response[i]);
            }
          }
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

          for(let paramName in request) {
            if (request[paramName] === null) {
              request[paramName] = 'null';
            }
          }

          _this.ajaxRequest = $.ajax({ type: 'GET'
                                     , data: request
                                     , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
                                     , url: url + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
                                     , headers: requestHeaders
                                     , success: function(response) {
                                         try {
                                           _this.ajaxRequest = null;
                                           handleResponse(response);
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
        options  = callback;
        callback = params;
        params   = Object.create({});
      }

      if (callback && (typeof callback != 'function')) {
        options  = callback;
        callback = undefined;
      }

      options = options || Object.create({});

      let disableEvents = options && options.disableEvents;

      return new Promise(function(resolve, reject) {

        let request = params || Object.create({});

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

        $.ajax({ type: _this.options.crossdomain ? 'GET' : 'POST'
               , data: request
               , dataType: _this.options.crossdomain ? 'jsonp' : 'json'
               , url: _this.options.restServiceUrlNormalized + method + (_this.options.authToken ? '?token=' + _this.options.authToken : '')
               , headers: requestHeaders
               , success: function(response) {
                   resolve({method: method, request: request, options: options, response: response});
                 }
               , error: function(jqXHR, textStatus, errorThrown) {
                   if (!br.isUnloading()) {
                     let errorMessage = (br.isEmpty(jqXHR.responseText) ? jqXHR.statusText : jqXHR.responseText);
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

  }

  window.br.dataSource = function (restServiceUrl, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrTable(selector, options) {

    const _this = this;

    let initialized = false;

    let table = $(selector);
    let thead = $('thead', table);
    let tbody = $('tbody', table);

    let tableCopy;
    let theadCopy;
    let tbodyCopy;
    let theadColsCopy;
    let tbodyColsCopy;

    let calcDiv;
    let imagesCounter = 0;

    _this.options = options || Object.create({ });

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
        let scrollTop    = $(window).scrollTop() > 0 ? $(window).scrollTop() + 20 : 0;
        let tableTop     = table.offset().top - scrollTop;
        let tbodyHeight  = windowHeight - tableTop - thead.height();
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

      let widths = Object.create({});

      theadColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx] = { h: w, b: 0 };
      });

      tbodyColsCopy.each(function(idx) {
        let w = this.getBoundingClientRect().width;
        debugValue(this, w);
        widths[idx].b = w;
      });

      return widths;

    }

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

      theadColsCopy.each(function(idx) {
        this.style.boxSizing = 'border-box';
        this.style.minWidth = '';
        this.style.maxWidth = '';
      });

      tbodyColsCopy.each(function(idx) {
        this.style.boxSizing = 'border-box';
        this.style.minWidth = '';
        this.style.maxWidth = '';
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
        thead.css({ 'display': 'block', 'box-sizing': 'border-box', 'overflow': 'hidden' });
        tbody.css({ 'display': 'block', 'box-sizing': 'border-box', 'overflow': 'auto' });
        table.css({ 'border-bottom': '0px', 'border-left': '0px', 'border-right': '0px' });
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

        let bodyCols   = table.find('tbody tr:first>td');

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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataGrid(selector, rowTemplate, dataSource, options) {

    const _this = this;

    _this.selector = selector;

    _this.options = options || Object.create({});

    _this.options.templates          = _this.options.templates || Object.create({});

    _this.options.templates.noData   = _this.options.templates.noData || '.data-empty-template';

    _this.options.templates.row      = $(rowTemplate).html();
    _this.options.templates.groupRow = _this.options.templates.groupRow ? $(_this.options.templates.groupRow).html() : '';
    _this.options.templates.header   = _this.options.templates.header   ? $(_this.options.templates.header).html() : '';
    _this.options.templates.footer   = _this.options.templates.footer   ? $(_this.options.templates.footer).html() : '';
    _this.options.templates.noData   = _this.options.templates.noData   ? $(_this.options.templates.noData).html() : '';

    _this.options.templates.row      = _this.options.templates.row      || '';
    _this.options.templates.groupRow = _this.options.templates.groupRow || '';
    _this.options.templates.header   = _this.options.templates.header   || '';
    _this.options.templates.footer   = _this.options.templates.footer   || '';
    _this.options.templates.noData   = _this.options.templates.noData   || '';

    _this.templates = Object.create({});

    _this.templates.row      = _this.options.templates.row.length > 0      ? br.compile(_this.options.templates.row)      : function() { return ''; };
    _this.templates.groupRow = _this.options.templates.groupRow.length > 0 ? br.compile(_this.options.templates.groupRow) : function() { return ''; };
    _this.templates.header   = _this.options.templates.header.length > 0   ? br.compile(_this.options.templates.header)   : function() { return ''; };
    _this.templates.footer   = _this.options.templates.footer.length > 0   ? br.compile(_this.options.templates.footer)   : function() { return ''; };
    _this.templates.noData   = _this.options.templates.noData.length > 0   ? br.compile(_this.options.templates.noData)   : function() { return ''; };

    _this.options.selectors          = _this.options.selectors || Object.create({});

    _this.options.selectors.header   = _this.options.selectors.header || _this.options.headersSelector || _this.selector;
    _this.options.selectors.footer   = _this.options.selectors.footer || _this.options.footersSelector || _this.selector;
    _this.options.selectors.remove   = _this.options.selectors.remove || _this.options.deleteSelector  || '.action-delete';

    _this.options.dataSource = dataSource;

    _this.dataSource = _this.options.dataSource;
    _this.storageTag = _this.options.storageTag ? _this.options.storageTag : document.location.pathname + ':' + _this.dataSource.options.restServiceUrl;

    _this.events = br.eventQueue(_this);
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

    if (_this.options.fixedHeader) {
      _this.table = br.table($(_this.selector).closest('table'), options);
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
      stored = stored || Object.create({});
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
      filter = filter || Object.create({});
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
      let template =  _this.templates.footer(data);
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
        return { rendered: template, dataRow: dataRow };
      } else
      if (template.length > 0) {
        let result = $(template);
        if (_this.options.storeDataRow) {
          result.data('data-row', dataRow);
        }
        return { renderedRow: result, dataRow: dataRow };
      } else {
        return { renderedRow: null, dataRow: dataRow };
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
        if (!disableEvents) {
          _this.events.triggerAfter('renderRow', renderedRow.dataRow, renderedRow.renderedRow);
          _this.events.triggerAfter('insert', renderedRow.dataRow, renderedRow.renderedRow);
        }
      }
      return renderedRow.renderedRow;
    };

    _this.refreshRow = function(dataRow, options, isUpdate) {
      let filter = `[data-rowid="${dataRow.rowid}"]`;
      options = options || Object.create({});
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
          let resultingRowsJq = $(resultingRows).map(function() { return this.toArray(); });
          _this.events.triggerAfter('renderRow', renderedRow.dataRow, existingRows, resultingRowsJq);
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
      options = options || Object.create({});
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
      options = options || { };
      options.disableEvents = true;
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      let filter;
      if (br.isArray(rowid)) {
        filter = { rowid: rowid };
      } else
      if (br.isObject(rowid)) {
        filter = rowid;
      } else {
        filter = { rowid: rowid };
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

    function checkForEmptyGrid() {
      if (_this.isEmpty()) {
        _this.events.triggerBefore('nodata');
        $(_this.selector).html(_this.templates.noData());
        _this.events.trigger('nodata');
        _this.events.triggerAfter('nodata');
      }
    }

    _this.removeRow = function(rowid, options) {
      let filter = `[data-rowid="${rowid}"]`;
      options = options || Object.create({});
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      let row = $(_this.selector).find(filter);
      if (row.length > 0) {
        _this.events.triggerBefore('remove', rowid);
        _this.events.trigger('remove', rowid, row);
        row.remove();
        checkForEmptyGrid();
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
      if (noMoreData || _this.loadingMoreData) {

      } else {
        _this.loadingMoreData = true;
        _this.dataSource.select(Object.create({}), function(result, response) {
          if (typeof callback == 'function') { callback.call(_this, result, response); }
          _this.loadingMoreData = false;
        }, { loadingMore: true });
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
      for(let i = 0, length = orderAndGroup.length; i < length; i++) {
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
      let result = Object.create({});
      if (br.isArray(order)) {
        for(let i = 0, length = order.length; i < length; i++) {
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
      for(let name in order) {
        orderAndGroup.push({ fieldName: name, asc: order[name] > 0, group: false, index: orderAndGroup.length });
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
        let newOrder = { fieldName: fieldName, asc: $(this).hasClass('order-asc'), group: $(this).hasClass('group-by') };
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          orderAndGroup = _this.getOrderAndGroup();
          let newOrderAndGroup = [];
          for(let i = 0, length = orderAndGroup.length; i < length; i++) {
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

        _this.dataSource.after('select', function(result, response, request) {
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
            let $this = $(this);
            let rowid = $this.closest('[data-rowid]').attr('data-rowid');
            let dataField = $this.attr('data-field');
            if (!br.isEmpty(rowid) && !br.isEmpty(dataField)) {
              let data = Object.create({});
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
              $selector.html(_this.templates.noData());
            }
          } else {
            $selector.html(_this.templates.noData());
          }
        } else {
          if (data && (data.length > 0)) {
            let group = _this.getOrderAndGroup();
            let groupValues = Object.create({});
            let groupFieldName = '';
            for (let i = 0, length = data.length; i < length; i++) {
              if (data[i]) {
                if (br.isArray(group)) {
                  for (let k = 0, length = group.length; k < length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      for(let j = k, length = group.length; j < length; j++) {
                        groupFieldName = group[j].fieldName;
                        groupValues[groupFieldName] = undefined;
                      }
                      break;
                    }
                  }
                  for (let k = 0, length = group.length; k < length; k++) {
                    groupFieldName = group[k].fieldName;
                    if (group[k].group && (groupValues[groupFieldName] != data[i][groupFieldName])) {
                      groupValues[groupFieldName] = data[i][groupFieldName];
                      let tmp = data[i];
                      tmp.__groupBy = Object.create({});
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
            $selector.html(_this.templates.noData());
          }
        }
      } else {
        $selector.html(_this.templates.noData());
      }
      _this.events.trigger('change', data, 'render');
      _this.events.triggerAfter('change', data, 'render');
      _this.events.triggerAfter('render', data);
    };

    return this.init();

  }

  window.br.dataGrid = function (selector, rowTemplate, dataSource, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataCombo(selector, dataSource, options) {

    const _this = this;

    const selectLimit = 50;

    let beautified = false;
    let beautifier = '';
    let currentData = [];
    let requestTimer;

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
        let item = { value: data[_this.options.valueField]
                   , name: data[_this.options.nameField]
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
              params.allowClear  = _this.options.allowClear;
              params.placeholder = _this.options.emptyName;
            }
            if (_this.options.formatOption) {
              params.formatResult = _this.options.formatOption;
            }
            if (_this.options.formatSelection) {
              params.formatSelection = _this.options.formatSelection;
            }
            params.dropdownAutoWidth = true;
            params.dropdownCss = { 'max-width': '400px' };
            if (_this.options.lookupMode) {
              params.minimumInputLength = _this.options.lookup_minimumInputLength;
              params.allowClear  = true;
              params.placeholder = _this.options.emptyName;
              params.query = function (query) {
                window.clearTimeout(requestTimer);
                let request = Object.create({});
                request.keyword = query.term;
                requestTimer = window.setTimeout(function() {
                  if (query.term || _this.options.lookup_minimumInputLength === 0) {
                    _this.dataSource.select(request, function(result, response) {
                      if (result) {
                        let data = { results: [] };
                        for(let i = 0, length = response.length; i < length; i++) {
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
          _this.selector.selectize({ openOnFocus: false });
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
            for(let i = 0, length = currentData.length; i < length; i++) {
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
          switch(beautifier) {
            case 'select2':
              break;
            case 'selectize':
              _this.selector[0].selectize.setValue(value);
              break;
          }
          beautify();
          if (_this.options.lookupMode) {
            if (value) {
              let data = { id: value, text: value };
              let request = { rowid: value };
              _this.selector.select2('data', data);
              let options = { disableEvents: true, dataSets: 'none' };
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
      let s = '';
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
        const margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for(let k = 0; k < margin; k++) {
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
          if (_this.options.hideEmptyValue || (_this.options.autoSelectSingle && (data.length == 1))) {

          } else {
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

          for(let i = 0, length = data.length; i < length; i++) {
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
              for(let k = 0, length = val.length; k < length; k++) {
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
        let options = { fields: _this.options.fields };
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

      options = options || Object.create({});

      _this.options = _this.options || Object.create({});

      for(let optionName in options) {
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

  window.br.dataCombo = function (selector, dataSource, options) {
    let instance = $(selector).data('BrDataCombo');
    if (!instance) {
      instance = new BrDataCombo(selector, dataSource, options);
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDraggable(ctrl, options) {

    const _this = this;

    let dragObject = null;
    let dragHandler = null;
    let pos_y, pos_x, ofs_x, ofs_y;

    options = options || Object.create({});
    options.exclude = [ 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON' ];

    function setPosition(element, left, top) {
      element.style.marginTop = '0px';
      element.style.marginLeft = '0px';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
    }

    function downHandler(e) {
      if (e.button === 0) {
        let target = e.target || e.srcElement;
        let parent = target.parentNode;

        if (target && (options.exclude.indexOf(target.tagName.toUpperCase()) == -1)) {
          if (!parent || (options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) {  // img in a
            dragObject = ctrl;

            let pageX = e.pageX || e.touches[0].pageX;
            let pageY = e.pageY || e.touches[0].pageY;

            ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
            ofs_y = dragObject.getBoundingClientRect().top  - dragObject.offsetTop;

            pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
            pos_y = pageY - (dragObject.getBoundingClientRect().top  + document.body.scrollTop);

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
        let top  = pageY - pos_y - ofs_y - document.body.scrollTop;
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

  window.br.draggable = function (selector, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrEditable(ctrl, options) {

    const _this = this;

    if (br.isFunction(options)) {
      options = { onSave: options };
    }
    _this.options = options || Object.create({});
    _this.ctrl = $(ctrl);
    _this.editor = null;
    _this.savedWidth = '';

    _this.click = function(element, e) {
      if (!_this.activated()) {
        let content = '';
        if (typeof _this.ctrl.attr('data-editable') != 'undefined') {
          content = _this.ctrl.attr('data-editable');
        } else {
          content = _this.ctrl.text();
        }
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        _this.ctrl.text('');
        let isTextarea = (_this.ctrl.attr('data-editable-type') == 'textarea');
        if (isTextarea) {
          _this.editor = $('<textarea rows="3"></textarea>');
        } else {
          _this.editor = $('<input type="text" />');
        }
        _this.editor.addClass('form-control');
        _this.editor.addClass('br-editable-control');
        _this.editor.css({ 'width': '100%'
                         , 'height': '100%'
                         , 'min-height': '30px'
                         , 'font-size': _this.ctrl.css('font-size')
                         , 'font-weight': _this.ctrl.css('font-weight')
                         , 'box-sizing': '100%'
                         , '-webkit-box-sizing': 'border-box'
                         , '-moz-box-sizing': 'border-box'
                         , '-ms-box-sizing': 'border-box'
                         , 'margin-top': '2px'
                         , 'margin-bottom': '2px'
                         });
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
            let content = _this.editor.val();
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
          let content = _this.editor.val();
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
          let ok = true;
          if (_this.options.onBlur) {
            ok = _this.options.onBlur.call(_this.ctrl, e);
          }
          if (ok) {
            let content = _this.editor.val();
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
          if (instance) {
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
          if (!instance) {
            $(selector).data('brEditable-editable', (instance = new BrEditable($(selector), callback)));
          }
          return instance[callback](value);
      }
    } else {
      $(document).on('click', selector, function(event) {
        let $this = $(this);
        let instance = $this.data('brEditable-editable');
        if (!instance) {
          $this.data('brEditable-editable', (instance = new BrEditable(this, callback)));
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

/* jshint scripturl:true */

;(function ($, window) {

  window.br = window.br || Object.create({});

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
        humane.log(s, { addnCls: 'humane-jackedup-error humane-original-error'
                      , timeout: 5000
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
    options.cssClass = options.cssClass || '';
    options.defaultButton = options.defaultButton || 'confirm';

    let template = `<div class="br-modal-confirm modal ${options.cssClass}" data-backdrop="static" role="dialog">`;

    let checkBoxes = '';
    if (options.checkBoxes) {
      for (let i in options.checkBoxes) {
        let check = options.checkBoxes[i];
        let checked = '';
        if (check.default) {
          checked = 'checked';
        }
        checkBoxes += `<div class="checkbox">
                         <label class="checkbox">
                           <input type="checkbox" class="confirm-checkbox" name="${check.name}" value="1" ${checked}> ${check.title}
                         </label>
                       </div>`;
      }
    }

    template += `<div class="modal-dialog" role="document">
                   <div class="modal-content">
                   <div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>
                   <div class="modal-body" style="overflow-y:auto;">${message} ${checkBoxes}</div>
                   <div class="modal-footer">`;
    if (options.showDontAskMeAgain) {
      const dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
                     <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
                   </label>`;
    }
    if (br.isEmpty(buttons)) {
      const yesTitle = options.yesTitle || br.trn('Yes');
      const yesLink  = options.yesLink || 'javascript:;';
      const target   = (options.yesLink && !options.targetSamePage ? '_blank' : '');
      template += `<a href="${yesLink}" target="${target}" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">&nbsp;${yesTitle}&nbsp;</a>`;
    } else {
      let idx = 0;
      for(let inputName in buttons) {
        template += `<a href="javascript:;" class="btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-default'} action-confirm-close" rel="${inputName}">&nbsp;${buttons[inputName]}&nbsp;</a>`;
        idx++;
      }
    }
    template += `<a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel" rel="cancel">&nbsp;${options.cancelTitle}&nbsp;</a>
                 </div></div></div></div>`;

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
          let checks = Object.create({});
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

    let template = `<div class="br-modal-error modal" id="br_modalError" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">`;
    if (title !== '') {
      template += `<div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>`;
    }
    template += `<div class="modal-body" style="overflow-y:auto;">${message}</div>
                 <div class="modal-footer" style="background-color:red;">
                   <a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a>
                 </div></div></div></div>`;

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

    let template = `<div class="br-modal-inform modal" id="br_modalInform" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">`;
    if (title !== '') {
      template += `<div class="modal-header">
                     <h3 class="modal-title pull-left">${title}</h3>
                     <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                     <div class="clearfix"></div>
                   </div>`;
    }
    template += `<div class="modal-body" style="overflow-y:auto;">${message}</div>
                 <div class="modal-footer">`;
    if (options.showDontAskMeAgain) {
      let dontAskMeAgainTitle = (options.dontAskMeAgainTitle) ? options.dontAskMeAgainTitle : br.trn("Don't ask me again");
      template += `<label style="text-align:left;float:left;padding-top:5px;" class="checkbox">
                     <input name="showDontAskMeAgain" type="checkbox" value="1"> ${dontAskMeAgainTitle}
                   </label>`;
    }
    template += `<a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn(buttonTitle)}&nbsp;</a></div></div></div></div>`;

    const modal = $(template);

    const oldActiveElement = document.activeElement;
    if (oldActiveElement) {
      oldActiveElement.blur();
    }

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (callback) {
          const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
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
    options.cancelTitle = options.cancelTitle || br.trn('Cancel');
    options.okTitle = options.okTitle || br.trn('Ok');

    let inputs = Object.create({});

    if (br.isObject(fields)) {
      inputs = fields;
    } else {
      options.valueRequired = true;
      inputs[fields] = '';
    }

    if (options.onhide) {
      options.onHide = options.onhide;
    }

    let template = `<div class="br-modal-prompt modal" data-backdrop="static" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h3 class="modal-title pull-left">${title}</h3>
                          <a class="close pull-right float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                          <div class="clearfix"></div>
                        </div>
                        <div class="modal-body" style="overflow-y:auto;">`;
    for(let inputLabel in inputs) {
      if (br.isObject(inputs[inputLabel])) {
        let inputId    = (br.isEmpty(inputs[inputLabel].id) ? '' : inputs[inputLabel].id);
        let inputClass = (br.isEmpty(inputs[inputLabel]['class']) ? '' : inputs[inputLabel]['class']) ;
        let inputValue = inputs[inputLabel].value;
        template += `<label>${inputLabel}</label>
                     <input type="text" id="${inputId}" class="span4 ${inputClass}" value="${inputValue}" />`;
      } else {
        let inputClass1 = (options.valueType == 'int' ? ' input-small' : ' justified');
        let inputClass2 = (options.valueRequired ? ' required' : '');
        let inputValue  = inputs[inputLabel];
        template += `<label>${inputLabel}</label>
                     <input type="text" class="form-control ${inputClass1} ${inputClass2}" value="${inputValue}" />`;
      }
    }

    template += `</div>
                 <div class="modal-footer">
                   <a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm">${options.okTitle}</a>
                   <a href="javascript:;" class="btn btn-sm btn-default action-confirm-cancel btn-outline-secondary">&nbsp;${options.cancelTitle}&nbsp;</a>
                 </div>
               </div>
             </div>
           </div>`;

    const modal = $(template);

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
          let inputs = [];
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
        $(this).find('input[type=text]')[0].focus();
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

  let noTemplateEngine = false;

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
    data = data || Object.create({});
    if (template) {
      if (typeof window.Mustache == 'undefined') {
        if (typeof window.Handlebars == 'undefined') {
          throw 'Template engine not linked';
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
    } catch(ex) {
      return null;
    }
  };

  let progressBar_Total = 0;
  let progressBar_Progress = 0;
  let progressBar_Message = '';

  const progressBarTemplate = `<div id="br_progressBar" class="br-modal-progress modal" style="display:none;z-index:10000;top:30px;margin-top:0px;position:fixed;" data-backdrop="static" role="dialog">
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
                                       <div id="br_progressBarAnimation" style="padding-top:10px;">
                                         <center><img src="${br.brightUrl}images/progress-h.gif" /></center>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>`;


  function fileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' '+['B', 'kB', 'MB', 'GB', 'TB'][i];
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

  let backDropCounter = 0;

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
    showBackDrop('progress');
    $('#br_progressBar').modal('show');
    renderProgress();
  };

  window.br.hideProgress = function() {
    $('#br_progressBar').modal('hide');
    hideBackDrop('progress');
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
          todayBtn: 'linked'
        , clearBtn: true
        , multidate: false
        , autoclose: true
        , todayHighlight: true
        , orientation: ($(this).attr('data-dp-orientation') ? $(this).attr('data-dp-orientation') : 'top')
        }).on('show', function(evt) {
          if (!evt.date) {
            if ($(this).val()) {
              $(this).bootstrapDatepicker('update', $(this).val());
            }
          }
        });
      });
    } catch (e) {
      br.log('[ERROR] bootstrapDatePicker expected but script was not loaded');
    }

  }

  function attachBootstrapDateTimePickers(selector) {

    try {
      $(selector).each(function() {
        $(this).datetimepicker({
            format: 'mm/dd/yyyy HH:ii P'
          , autoclose: true
          , todayBtn: true
          , pickerPosition: 'bottom-left'
          , minuteStep: 5
          , showMeridian: true
          , useCurrent: false
          , todayHighlight: false
        }).on('show', function() {
          // $(this).datetimepicker('update', $(this).val());
        });
      });
    } catch (e) {
      br.log('[ERROR] bootstrapDateTimePicker expected but script was not loaded');
    }

  }

  window.br.attachDatePickers = function (container) {

    if (container) {
      attachjQueryUIDatePickers($('input.datepicker', container));
      attachBootstrapDatePickers($('input.bootstrap-datepicker', container));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker', container));
    } else {
      attachjQueryUIDatePickers($('input.datepicker'));
      attachBootstrapDatePickers($('input.bootstrap-datepicker'));
      attachBootstrapDateTimePickers($('input.bootstrap-datetimepicker'));
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
      const td1 = $($('td', $(a))[columnIndex]);
      const td2 = $($('td', $(b))[columnIndex]);
      const val1 = td1.attr('data-sort-value') ? td1.attr('data-sort-value') : td1.text().trim().replace(/\%$/, '').replace(/\,/, '');
      const val2 = td2.attr('data-sort-value') ? td2.attr('data-sort-value') : td2.text().trim().replace(/\%$/, '').replace(/\,/, '');
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
        return (val1F == val2F ? 0: (val1F > val2F ? direction : direction * -1));
      } else {
        return val1.localeCompare(val2) * direction;
      }
    }

    return new Promise(function(resolve, reject) {
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
          // if (!br.isEmpty(element.val())) {
            if (element.data('select2')) {
              if ((element.attr('multiple') != 'multiple')) {
                // br.log(element);
                element.select2('val', element.val());
              }
            }
          // }
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

    const tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function disableTabbingOnPage(except) {
      // $.each($(tabbableElements), function (idx, item) {
      //   const el = $(item);
      //   if (!el.closest(except).length) {
      //     const tabindex = el.attr('tabindex');
      //     if (tabindex) {
      //       el.attr('data-prev-tabindex', tabindex);
      //     }
      //     el.attr('tabindex', '-1');
      //   }
      // });
    }

    function reEnableTabbingOnPage(except) {
      // $.each($(tabbableElements), function (idx, item) {
      //   const el = $(item);
      //   if (!el.closest(except).length) {
      //     const prevTabindex = el.attr('data-prev-tabindex');
      //     if (prevTabindex) {
      //       el.attr('tabindex', prevTabindex);
      //     } else {
      //       el.removeAttr('tabindex');
      //     }
      //     el.removeAttr('data-prev-tabindex');
      //   }
      // });
    }

    function configureAutosize(control) {
      if (control.data('brAutoSizeConfigured')) {

      } else {
        control.data('brAutoSizeConfigured', 1);
        if (br.bootstrapVersion == 2) {
          control.css('top', '20px');
          control.css('margin-top', '0px');
          control.css('position', 'fixed');
        }
        $(window).on('resize', function(){
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
      const target = $(event.target);
      if (target.hasClass('modal')) {
        let modals = [];
        $('div.modal').each(function() {
          if ($(this).is(':visible')) {
            modals.push({ zindex: br.toInt($(this).css('z-index')), modal: $(this) });
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
          const zindex = modals[0].zindex-1;
          $('.modal-backdrop').css('z-index', zindex);
          if ($('.modal-backdrop').length) {
            const opacity = defaultOpacity / $('.modal-backdrop').length;
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

    $(document).on('click', '.action-clear-selector-value', function(event) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  $(function() {

    function notify(event, result) {

      br.events.trigger('paste', result, event);

    }

    function loadFile(result, file, originalEvent, onError) {

      const reader = new FileReader();

      reader.onload = function(event) {
        const parts = /^data[:](.+?)\/(.+?);/.exec(event.target.result);
        let result_dataType    = 'other';
        let result_dataSubType = 'binary';
        if (parts) {
          result_dataType    = parts[1];
          result_dataSubType = parts[2];
        }
        result.dataType    = result_dataType;
        result.dataSubType = result_dataSubType;
        result.dataValue   = event.target.result;
        result.data[result_dataType] = result.data[result_dataType] || { };
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
        let result_dataType    = 'other';
        let result_dataSubType = 'binary';
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

    function processItems(items, result, event) {

      if (items.length > 0) {
        let item = items.shift();
        loadFile(result, item, event, function() {
          processItems(items, result, event);
        });
      }

    }

    $('body').on('paste', function(event) {

      let result = { data: { }, dataType: '', dataSubType: '', dataValue: '' };
      let items = [];
      let complete = true;

      event = event.originalEvent;

      if (event.clipboardData) {
        for(let i = 0, length = event.clipboardData.types.length; i < length; i++) {
          const dataType = event.clipboardData.types[i];
          const parts = /^(.+?)\/(.+?)$/.exec(dataType);
          let result_dataType    = 'other';
          let result_dataSubType = dataType;
          if (parts) {
            result_dataType    = parts[1];
            result_dataSubType = parts[2];
          }
          result.data[result_dataType] = result.data[result_dataType] || { };
          result.data[result_dataType][result_dataSubType] = event.clipboardData.getData(dataType);
        }

        if (loadData(result, event.clipboardData, 'public.url', true)) {

        } else
        if (loadData(result, event.clipboardData, 'text/html')) {
          result.dataValue = result.dataValue.replace(/<(html|body|head|meta|link)[^>]*?>/g, '')
                                             .replace(/<\/(html|body|head|meta|link)[^>]*?>/g, '');
        } else
        if (loadData(result, event.clipboardData, 'text/plain')) {

        } else {
          if (event.clipboardData.items && (event.clipboardData.items.length > 0)) {
            for(let i = 0, length = event.clipboardData.items.length; i < length; i++) {
              if (event.clipboardData.items[i].type.match('image.*')) {
                items.push(event.clipboardData.items[i].getAsFile());
              }
            }
          }
          if (event.clipboardData.files && (event.clipboardData.files.length > 0)) {
            for(let i = 0, length = event.clipboardData.files.length; i < length; i++) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataEditor(selector, dataSource, options) {

    const _this = this;

    let editorRowid = null;
    let editorRowData = null;
    let active = false;
    let cancelled = false;
    let closeConfirmationTmp;
    let saving = false;
    let savingAndClosing = false;

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
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.pause  = function(event, callback) { _this.events.pause(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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
    };

    _this.unlock = function() {
      $(_this.options.selectors.save, _this.container).removeClass('disabled');
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

    _this.editorConfigure = function(isCopy) {
      let title = '';
      if (_this.options.title) {
        title = _this.options.title;
      } else
      if (editorRowid) {
        if (isCopy) {
          title = `Copy ${_this.options.noun}`;
        } else {
          title = `Edit ${_this.options.noun}`;
          if (!_this.options.hideRowid) {
            title += ` (#${editorRowid})`;
          }
        }
      } else {
        title = `Create ${_this.options.noun}`;
      }
      _this.container.find('.operation').text(title);
    };

    function editorShown() {
      let focusedInput = $('input.focus[type!=hidden]:visible,select.focus:visible,textarea.focus:visible', _this.container);
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
      _this.inputsContainer.find('input.data-field[type="checkbox"]').each(function() {
        $(this).prop('checked', !!$(this).attr('data-default-checked'));
      });
      _this.inputsContainer.find('select.data-field').each(function() {
        const this_ = $(this);
        if (!this_.val() && this_.attr('data-default')) {
          br.setValue(this_, this_.attr('data-default'));
        }
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for(let name in data) {
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
                })(input, ckeditorInstance, data[name]);
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

    _this.show = function(rowid, isCopy, params) {
      closeConfirmationTmp = br.isCloseConfirmationRequired();
      editorRowid = null;
      editorRowData = null;
      let defaultValues = null;
      if (br.isNumber(rowid)) {
        editorRowid = rowid;
      } else
      if (br.isObject(rowid)) {
        defaultValues = rowid;
      }
      _this.inputsContainer.find('select.data-field').each(function() {
        br.setValue($(this), '');
      });
      _this.inputsContainer.find('input.data-field[type!=radio],textarea.data-field').val('');
      _this.inputsContainer.find('input.data-field[type=checkbox]').val('1').prop('checked', false);
      _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio]').find('button').removeClass('active');

      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (editorRowid) {
        let request = { rowid: editorRowid };
        let options = { disableEvents: true };
        _this.events.triggerBefore('editor.loadData', request, options);
        _this.dataSource.selectOne(request, function(result, data) {
          if (result) {
            editorRowData = data;
            _this.events.triggerBefore('editor.show', data, isCopy, params);
            _this.editorConfigure(isCopy);
            _this.fillControls(data);
            if (isCopy) {
              editorRowid = null;
            }
            _this.events.trigger('editor.show', data, isCopy, params);
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
        _this.events.triggerBefore('editor.show', null, isCopy, params);
        _this.editorConfigure(isCopy);
        _this.fillDefaults();
        _this.fillControls(defaultValues);
        _this.events.trigger('editor.show', defaultValues, isCopy, params);
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

      let op = editorRowid ? 'update' : 'insert';
      let ok = true;

      try {
        let options = Object.create({});
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
                    let callResponse = { refresh: true };
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
                    let callResponse = { refresh: true };
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

      let data = Object.create({ });
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
              if (input.hasClass('required') && br.isEmpty(val) && (!input.hasClass('required-edit-only') || _this.isEditMode()) && (!input.hasClass('required-insert-only') || _this.isInsertMode())) {
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
          let tmpl = (errors.length == 1) ? '{{#errors}}{{.}}{{/errors}}': br.trn('Please check the following:') + '<br /><ul>{{#errors}}<li>{{.}}</li>{{/errors}}</ul>';
          let error = br.fetch(tmpl, { errors: errors });
          _this.showError(error);
          if (errorCallback) {
            errorCallback.call(_this, data, error);
          }
          saving = false;
        } else {
          let op = editorRowid ? 'update' : 'insert';
          let ok = true;
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

  window.br.dataEditor = function (selector, dataSource, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  function BrDataBrowser(entity, options) {

    const _this = this;

    let pagerSetUp = false;
    let headerContainer = 'body';
    let selectionQueue = [];
    let pagerInitialized = false;

    _this.options = options || Object.create({});
    _this.options.autoLoad = _this.options.autoLoad || false;
    _this.options.defaults = _this.options.defaults || {};
    _this.options.entity = entity;
    _this.options.features = _this.options.features || { editor: true };
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

    const selActionCRUD = findNode('.action-edit') + ',' + findNode('.action-create') + ',' + findNode('.action-copy');

    if (typeof entity == 'string') {
      if (_this.options.entity.indexOf('/') == -1) {
        _this.dataSource = br.dataSource(br.baseUrl + 'api/' + _this.options.entity + '/');
      } else {
        _this.dataSource = br.dataSource(br.baseUrl + _this.options.entity);
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

    _this.dataGrid = br.dataGrid( _this.options.selectors.dataTable
                                , _this.options.templates.row
                                , _this.dataSource
                                , { templates: { noData: _this.options.templates.noData, groupRow: _this.options.templates.groupRow }
                                  , selectors: { header: headerContainer, remove: '.action-delete', refreshRow: _this.options.selectors.refreshRow }
                                  , appendInInsert: _this.options.appendInInsert
                                  , defaultOrderAndGroup: _this.options.defaultOrderAndGroup
                                  , fixedHeader: _this.options.fixedHeader
                                  , autoHeight: _this.options.autoHeight
                                  , autoWidth: _this.options.autoWidth
                                  , storageTag: _this.options.storageTag
                                  , storeDataRow: _this.options.storeDataRow
                                  }
                                );

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
    _this.before = function(event, callback) { _this.events.before(event, callback); };
    _this.on     = function(event, callback) { _this.events.on(event, callback); };
    _this.after  = function(event, callback) { _this.events.after(event, callback); };

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

    _this.resetFilters = function(stopPropagation) {
      br.setValue(findNode('input.data-filter'), '');
      br.setValue(findNode('select.data-filter'), '');
      $(findNode('input.data-filter')).trigger('reset');
      $(findNode('select.data-filter')).trigger('reset');
      _this.dataGrid.resetFilters(stopPropagation);
      if (!stopPropagation) {
        _this.events.trigger('resetFilters');
        br.refresh();
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

    _this.deleteSelection = function() {
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
        const rowid = selectionQueue.shift();
        let data = Object.create({});
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
      params = params || Object.create({});
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
        $('.nav-item[rel=' + _this.options.nav + ']').addClass('active');
      }

      _this.dataSource.before('select', function(request, options) {
        request = request || Object.create({});
        const keywordControl = $(findNode('input.data-filter[name=keyword]'));
        if (keywordControl.length > 0) {
          request.keyword = $(findNode('input.data-filter[name=keyword]')).val();
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
        if ($(findNode('input.data-filter[name=keyword]')).length > 0) {
          request.keyword = $(findNode('input.data-filter[name=keyword]')).val();
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
      const inputControls = $(findNode('input.data-filter,select.data-filter'));
      inputControls.each(function() {
        if ($(this).parent().hasClass('input-append')) {
          $(this).parent().addClass('data-filter');
          $(this).parent().css({ display: 'inline-block', position: 'relative' });
        }
      });

      const keywordControl = $(findNode('input.data-filter[name=keyword]'));
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
        if (container.hasClass('input-append')) {
        } else {
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
          let editorOptions = _this.options.editor || { noun: _this.options.noun };
          _this.editor = _this.dataEditor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
          _this.editor.events.connectTo(_this.events);

          $(findNode('.action-create')).show();

          $(document).on('click', selActionCRUD, function() {
            const isCopy = $(this).hasClass('action-copy');
            const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
            _this.editor.show(rowid, isCopy);
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
        $(findNode('.data-filter[name=' + $(this).attr('rel') + ']')).val('');
        $(findNode('.data-filter[name=' + $(this).attr('rel') + ']')).trigger('change');
        _this.refresh();
      });

      $(findNode('input.data-filter[name=keyword]')).val(_this.getFilter('keyword'));

      $(findNode('.action-reset-filters')).on('click', function () {
        _this.resetFilters();
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
          $(findNode('.selection-stat')).text(count + ' record(s) selected');
          $(findNode('.selection-stat')).show();
          $(findNode('.action-clear-selection')).show();
          const selection = _this.selection.get();
          let deletable = selection.filter(function(rowid) {
            return $(findNode('tr[data-rowid=' + rowid + '] td .action-delete')).length > 0;
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
        for(let i = 1; i <= totalPages; i++) {
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
          $(findNode('.pager-nav-element')).show();
        } else {
          $(findNode('.pager-nav-element')).css('display', 'none');
        }

        $pc = $(findNode('.pager-page-size-navigation'));
        $pc.html('');
        s = '';
        const sizes = _this.options.pageSizes;
        for(let i = 0, length = sizes.length; i < length; i++) {
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
      for(let i = 0, length = selection.length; i < length; i++) {
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
        for(let i = 0, length = selection.length; i < length; i++) {
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

    _this.unSelectRow = function(rowid, multiple) {
      const chk = $(_this.options.selectors.dataTable).find('input.action-select-row[value=' + rowid + ']');
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
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
      const row = (chk.length > 0) ? $(chk).closest('[data-rowid]') : $(_this.options.selectors.dataTable).find('tr[data-rowid=' + rowid + ']');
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

    return _this.init();
  }

  window.br.dataBrowser = function (entity, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  const invokerTemplate = br.compile('<div class="dropdown br-ajax-dropdown"><a href="javascript:;" class="br-ex-action-change-menu-menu" style="cursor:pointer;"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a></div>');
  const menuItemTemplateStr = '<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>';
  const menuItemTemplate = br.compile('<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>');
  const dropDownTemplate = '<div class="dropdown br-ajax-dropdown" style="position:absolute;z-index:99999;"><a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle br-ex-action-change-menu-menu" style="cursor:pointer;"><span>{{value}}</span> <b class="caret"></b></a><ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul></div>';

  function showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options) {
    const dropDown = $(dropDownTemplate);
    const dropDownList = dropDown.find('ul');
    const dropDownMenu = dropDown.find('.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      const value = $(this).attr('data-value');
      let data = Object.create({});
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
      dropDownList.append(menuItemTemplate({ id: '', name: (options.clearLabel ? options.clearLabel : '-- сlear --') }));
    }
    if (options.onBeforeRenderMenu) {
      options.onBeforeRenderMenu.call(dropDownList, menuItemTemplateStr);
    }
    for(let i = 0, length = response.length; i < length; i++) {
      dropDownList.append(menuItemTemplate({ id: response[i][options.keyField], name: response[i][options.nameField] }));
    }
    dropDown.css('left', invoker.offset().left + 'px');
    const invokerItem = invoker.find('.br-ex-action-change-menu-menu');
    const scr = $(window).scrollTop();
    let t = (invokerItem.offset().top + invokerItem.height());
    dropDown.css('top', t + 'px');
    t = t - scr;
    let h = Math.max($(window).height() - t - 20, 100);
    dropDownList.css('max-height', h + 'px');
    $('body').append(dropDown);
    dropDownMenu.dropdown('toggle');
  }

  function internalhandleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
    const rowid = el.closest('[data-rowid]').attr('data-rowid');
    const menuElement = invoker.find('span.br-ex-current-value');
    let filter = { __targetRowid: rowid };
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
    if ($this.data('BrExChangeMenu')) {

    } else {
      $this.data('BrExChangeMenu', true);
      let value = $this.text().trim();
      if (!options.hideHint) {
        if ((value.length === 0) || (value == '(click to change)')) {
          value = '<span style="color:#AAA;">(click to change)</span>';
        }
      }
      const invoker = $(invokerTemplate({ value: value }));
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
    options = options || Object.create({});
    options.keyField = options.keyField || 'id';
    options.nameField = options.nameField || 'name';

    $(selector).each(function() {
      setupControl($(this), false, choicesDataSource, dataSource, fieldName, options);
    });

    $(document).on('click', selector, function() {
      setupControl($(this), true, choicesDataSource, dataSource, fieldName, options);
    });
  }

  window.br.dropDownMenu = function (selector, choicesDataSource, dataSource, fieldName, options) {
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

;(function ($, window) {

  window.br = window.br || Object.create({});

  window.br.dataHelpers = window.br.dataHelpers || Object.create({});

  window.br.dataHelpers.before = function(event, dataControls, callback) {

    for(let i = 0, length = dataControls.length; i < length; i++) {
      dataControls[i].before(event, callback);
    }

  };

  window.br.dataHelpers.on = function(event, dataControls, callback) {

    for(let i = 0, length = dataControls.length; i < length; i++) {
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
      let params = [];
      let functionsForExecute = [];
      br.startProgress(funcToGetTotal(), extraParams.title);
      window.setTimeout(function() {
        let paramsQueue = [];
        while (true) {
          let params = funcToGetParams();
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

    let promises = [];

    for(let i = 0, length = dataControls.length; i < length; i++) {
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
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global google */

;(function ($, window) {
  window.br = window.br || {};

  function BrGoogleMap(selector, options) {
    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) { this.events.before(event, callback); };
    _this.on = function(event, callback) { this.events.on(event, callback); };
    _this.after = function(event, callback) { this.events.after(event, callback); };

    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function(latLng) {
        let paths = this.getPaths();
        let bounds = new google.maps.LatLngBounds();
        paths.forEach(function(path) {
          let points = path.getArray();
          for(let i = 0, length = points.length; i < length; i++) {
            bounds.extend(points[i]);
          }
        });
        return bounds;
      };
    }

    let worldCenter = new google.maps.LatLng(42, 18);
    let singleClickTimeout;

    options = options || Object.create({ });
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') { options.streetViewControl = true; }
    if (typeof options.panControl == 'undefined') { options.panControl = true; }
    if (typeof options.mapTypeControl == 'undefined') { options.mapTypeControl = true; }
    if (typeof options.zoomControl == 'undefined') { options.zoomControl = true; }
    if (typeof options.scaleControl == 'undefined') { options.scaleControl = true; }
    if (typeof options.rotateControl == 'undefined') { options.rotateControl = true; }
    if (typeof options.mapType == 'undefined') { options.mapType = google.maps.MapTypeId.ROADMAP; }

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
      (function(zoomLevel, event) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == _this.map.getZoom()) {
            _this.events.trigger('singleclick', event);
          }
        }, 300);
      })(_this.map.getZoom(), event);
    });

    function computeRouteParams(result) {
      let distance = 0;
      let duration = 0;
      let myroute = result.routes[0];
      for (let i = 0; i < myroute.legs.length; i++) {
        distance += myroute.legs[i].distance.value;
        duration += myroute.legs[i].duration.value;
      }
      return { distance: distance, duration: duration };
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
      switch(value) {
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
      switch(value) {
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
      _this.markers.map(function(marker) {
        processPoints(new google.maps.LatLng(marker.position.lat(), marker.position.lng()), bounds.extend, bounds);
      });
      _this.polygons.map(function(polygon) {
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
      _this.geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let points = [];
          for (let i = 0; i < results.length; i++) {
            points.push({
              lat: results[i].geometry.location.lat(),
              lng: results[i].geometry.location.lng(),
              name: results[i].formatted_address,
              raw: results[i]
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

    _this.clearRoute = function() {
      _this.directionsDisplay.setMap(null);
    };

    _this.drawRoute = function(coord, callback) {
      let origin = null;
      let destination = null;
      let waypoints = [];
      for (let i = 0; i < coord.length; i++) {
        let latLng = coord[i];
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
      let coord = [];
      let markers = _this.getMarkersByTag(tag);
      for (let i = 0; i < markers.length; i++) {
        coord.push(new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
      }
      _this.drawRoute(coord, callback);
    };

    _this.pointToFeature = function(lng, lat, properties) {
      let geoJson = {
        type: 'Feature',
        geometry: { type: 'Point', 'coordinates': [ lng, lat ] },
        properties: Object.assign({ latitude: lat, longitude: lng, "marker-size": "medium", "marker-symbol": "triangle" }, properties)
      };
      return geoJson;
    };

    // layers

    _this.addLayer = function(geoString, params) {
      params = params || Object.create({});

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

      getJsonCustom.id   = params.id;
      getJsonCustom.data = params.data;
      getJsonCustom.tag  = params.tag;

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
      let result =  _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      if (result.length > 0) {
        return result[0];
      }
    };

    _this.layerExists = function(id) {
      let result =  _this.layers.filter(function(item) {
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
      marker.custom = custom || { };
      marker.tag    = tag;
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
      _this.markers.map(function(marker) {
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
        for (let i = 0; i < array.length; i++) {
          result = result.concat(array[i]);
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
      polygon.tag    = tag;
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
      _this.polygons.map(function(polygon) {
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

  window.br.googleMap = function (selector, options) {
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

/* global WebSocket */

;(function (window) {

  window.br = window.br || Object.create({});

  function BrEventBus(endpointUrl) {

    const _this = this;

    _this.events        = br.eventQueue(_this);
    _this.subscriptions = br.eventQueue(_this);
    _this.spaces        = br.eventQueue(_this);

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
      let timeout = reconnectsCounter*reconnectTimeout;
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
        let message = { action: 'eventBus.subscribe'
                      , data: { events: _this.subscriptions.getEvents()
                              , spaces: _this.spaces.getEvents()
                              , userInfo: __userInfo
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
          webSocket.onopen    = null;
          webSocket.onmessage = null;
          webSocket.onclose   = null;
          webSocket.onerror   = null;
          if (webSocket.readyState == 1) {
            webSocket.close();
          }
        } catch (exception) {

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
        webSocket.onmessage = function (event) {
          if (debugMode) {
            br.log(event);
          }
          try {
            let message = $.parseJSON(event.data);
            switch(message.action) {
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
          if (debugMode) {
            br.log(event);
          }
          handleConnectionError('Connection closed');
        };
        webSocket.onerror = function(event) {
          if (debugMode) {
            br.log(event);
          }
          handleConnectionError('Connection closed');
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

    _this.offAll = function(event) {
      _this.events = br.eventQueue(_this);
    };

    _this.subscribe = function(event, callback) {
      _this.subscriptions.on(event, callback);
      subscribe();
    };

    _this.unsubscribe = function(event) {
      _this.subscriptions.off(event);
    };

    _this.unsubscribeAll = function(event) {
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

  let eventBus;

  window.br.eventBus = function(endpointUrl) {
    return new BrEventBus(endpointUrl);
  };

})(window);