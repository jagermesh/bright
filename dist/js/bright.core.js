/**!

 @license
 handlebars v4.1.2

Copyright (C) 2011-2017 by Yehuda Katz

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
(function t(e,r){if(typeof exports==="object"&&typeof module==="object")module.exports=r();else if(typeof define==="function"&&define.amd)define([],r);else if(typeof exports==="object")exports["Handlebars"]=r();else e["Handlebars"]=r()})(this,(function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var s=e[i]={exports:{},id:i,loaded:false};t[i].call(s.exports,s,s.exports,r);s.loaded=true;return s.exports}r.m=t;r.c=e;r.p="";return r(0)}([function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(2);var n=i(s);var a=r(35);var o=i(a);var u=r(36);var l=r(41);var c=r(42);var h=i(c);var p=r(39);var f=i(p);var d=r(34);var m=i(d);var v=n["default"].create;function g(){var t=v();t.compile=function(e,r){return l.compile(e,r,t)};t.precompile=function(e,r){return l.precompile(e,r,t)};t.AST=o["default"];t.Compiler=l.Compiler;t.JavaScriptCompiler=h["default"];t.Parser=u.parser;t.parse=u.parse;return t}var k=g();k.create=g;m["default"](k);k.Visitor=f["default"];k["default"]=k;e["default"]=k;t.exports=e["default"]},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=true},function(t,e,r){"use strict";var i=r(3)["default"];var s=r(1)["default"];e.__esModule=true;var n=r(4);var a=i(n);var o=r(21);var u=s(o);var l=r(6);var c=s(l);var h=r(5);var p=i(h);var f=r(22);var d=i(f);var m=r(34);var v=s(m);function g(){var t=new a.HandlebarsEnvironment;p.extend(t,a);t.SafeString=u["default"];t.Exception=c["default"];t.Utils=p;t.escapeExpression=p.escapeExpression;t.VM=d;t.template=function(e){return d.template(e,t)};return t}var k=g();k.create=g;v["default"](k);k["default"]=k;e["default"]=k;t.exports=e["default"]},function(t,e){"use strict";e["default"]=function(t){if(t&&t.__esModule){return t}else{var e={};if(t!=null){for(var r in t){if(Object.prototype.hasOwnProperty.call(t,r))e[r]=t[r]}}e["default"]=t;return e}};e.__esModule=true},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;e.HandlebarsEnvironment=m;var s=r(5);var n=r(6);var a=i(n);var o=r(10);var u=r(18);var l=r(20);var c=i(l);var h="4.1.2";e.VERSION=h;var p=7;e.COMPILER_REVISION=p;var f={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};e.REVISION_CHANGES=f;var d="[object Object]";function m(t,e,r){this.helpers=t||{};this.partials=e||{};this.decorators=r||{};o.registerDefaultHelpers(this);u.registerDefaultDecorators(this)}m.prototype={constructor:m,logger:c["default"],log:c["default"].log,registerHelper:function t(e,r){if(s.toString.call(e)===d){if(r){throw new a["default"]("Arg not supported with multiple helpers")}s.extend(this.helpers,e)}else{this.helpers[e]=r}},unregisterHelper:function t(e){delete this.helpers[e]},registerPartial:function t(e,r){if(s.toString.call(e)===d){s.extend(this.partials,e)}else{if(typeof r==="undefined"){throw new a["default"]('Attempting to register a partial called "'+e+'" as undefined')}this.partials[e]=r}},unregisterPartial:function t(e){delete this.partials[e]},registerDecorator:function t(e,r){if(s.toString.call(e)===d){if(r){throw new a["default"]("Arg not supported with multiple decorators")}s.extend(this.decorators,e)}else{this.decorators[e]=r}},unregisterDecorator:function t(e){delete this.decorators[e]}};var v=c["default"].log;e.log=v;e.createFrame=s.createFrame;e.logger=c["default"]},function(t,e){"use strict";e.__esModule=true;e.extend=a;e.indexOf=c;e.escapeExpression=h;e.isEmpty=p;e.createFrame=f;e.blockParams=d;e.appendContextPath=m;var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"};var i=/[&<>"'`=]/g,s=/[&<>"'`=]/;function n(t){return r[t]}function a(t){for(var e=1;e<arguments.length;e++){for(var r in arguments[e]){if(Object.prototype.hasOwnProperty.call(arguments[e],r)){t[r]=arguments[e][r]}}}return t}var o=Object.prototype.toString;e.toString=o;var u=function t(e){return typeof e==="function"};if(u(/x/)){e.isFunction=u=function(t){return typeof t==="function"&&o.call(t)==="[object Function]"}}e.isFunction=u;var l=Array.isArray||function(t){return t&&typeof t==="object"?o.call(t)==="[object Array]":false};e.isArray=l;function c(t,e){for(var r=0,i=t.length;r<i;r++){if(t[r]===e){return r}}return-1}function h(t){if(typeof t!=="string"){if(t&&t.toHTML){return t.toHTML()}else if(t==null){return""}else if(!t){return t+""}t=""+t}if(!s.test(t)){return t}return t.replace(i,n)}function p(t){if(!t&&t!==0){return true}else if(l(t)&&t.length===0){return true}else{return false}}function f(t){var e=a({},t);e._parent=t;return e}function d(t,e){t.path=e;return t}function m(t,e){return(t?t+".":"")+e}},function(t,e,r){"use strict";var i=r(7)["default"];e.__esModule=true;var s=["description","fileName","lineNumber","message","name","number","stack"];function n(t,e){var r=e&&e.loc,a=undefined,o=undefined;if(r){a=r.start.line;o=r.start.column;t+=" - "+a+":"+o}var u=Error.prototype.constructor.call(this,t);for(var l=0;l<s.length;l++){this[s[l]]=u[s[l]]}if(Error.captureStackTrace){Error.captureStackTrace(this,n)}try{if(r){this.lineNumber=a;if(i){Object.defineProperty(this,"column",{value:o,enumerable:true})}else{this.column=o}}}catch(t){}}n.prototype=new Error;e["default"]=n;t.exports=e["default"]},function(t,e,r){t.exports={default:r(8),__esModule:true}},function(t,e,r){var i=r(9);t.exports=function t(e,r,s){return i.setDesc(e,r,s)}},function(t,e){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;e.registerDefaultHelpers=k;var s=r(11);var n=i(s);var a=r(12);var o=i(a);var u=r(13);var l=i(u);var c=r(14);var h=i(c);var p=r(15);var f=i(p);var d=r(16);var m=i(d);var v=r(17);var g=i(v);function k(t){n["default"](t);o["default"](t);l["default"](t);h["default"](t);f["default"](t);m["default"](t);g["default"](t)}},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);e["default"]=function(t){t.registerHelper("blockHelperMissing",(function(e,r){var s=r.inverse,n=r.fn;if(e===true){return n(this)}else if(e===false||e==null){return s(this)}else if(i.isArray(e)){if(e.length>0){if(r.ids){r.ids=[r.name]}return t.helpers.each(e,r)}else{return s(this)}}else{if(r.data&&r.ids){var a=i.createFrame(r.data);a.contextPath=i.appendContextPath(r.data.contextPath,r.name);r={data:a}}return n(e,r)}}))};t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(5);var n=r(6);var a=i(n);e["default"]=function(t){t.registerHelper("each",(function(t,e){if(!e){throw new a["default"]("Must pass iterator to #each")}var r=e.fn,i=e.inverse,n=0,o="",u=undefined,l=undefined;if(e.data&&e.ids){l=s.appendContextPath(e.data.contextPath,e.ids[0])+"."}if(s.isFunction(t)){t=t.call(this)}if(e.data){u=s.createFrame(e.data)}function c(e,i,n){if(u){u.key=e;u.index=i;u.first=i===0;u.last=!!n;if(l){u.contextPath=l+e}}o=o+r(t[e],{data:u,blockParams:s.blockParams([t[e],e],[l+e,null])})}if(t&&typeof t==="object"){if(s.isArray(t)){for(var h=t.length;n<h;n++){if(n in t){c(n,n,n===t.length-1)}}}else{var p=undefined;for(var f in t){if(t.hasOwnProperty(f)){if(p!==undefined){c(p,n-1)}p=f;n++}}if(p!==undefined){c(p,n-1,true)}}}if(n===0){o=i(this)}return o}))};t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(6);var n=i(s);e["default"]=function(t){t.registerHelper("helperMissing",(function(){if(arguments.length===1){return undefined}else{throw new n["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}}))};t.exports=e["default"]},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);e["default"]=function(t){t.registerHelper("if",(function(t,e){if(i.isFunction(t)){t=t.call(this)}if(!e.hash.includeZero&&!t||i.isEmpty(t)){return e.inverse(this)}else{return e.fn(this)}}));t.registerHelper("unless",(function(e,r){return t.helpers["if"].call(this,e,{fn:r.inverse,inverse:r.fn,hash:r.hash})}))};t.exports=e["default"]},function(t,e){"use strict";e.__esModule=true;e["default"]=function(t){t.registerHelper("log",(function(){var e=[undefined],r=arguments[arguments.length-1];for(var i=0;i<arguments.length-1;i++){e.push(arguments[i])}var s=1;if(r.hash.level!=null){s=r.hash.level}else if(r.data&&r.data.level!=null){s=r.data.level}e[0]=s;t.log.apply(t,e)}))};t.exports=e["default"]},function(t,e){"use strict";e.__esModule=true;e["default"]=function(t){t.registerHelper("lookup",(function(t,e){if(!t){return t}if(e==="constructor"&&!t.propertyIsEnumerable(e)){return undefined}return t[e]}))};t.exports=e["default"]},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);e["default"]=function(t){t.registerHelper("with",(function(t,e){if(i.isFunction(t)){t=t.call(this)}var r=e.fn;if(!i.isEmpty(t)){var s=e.data;if(e.data&&e.ids){s=i.createFrame(e.data);s.contextPath=i.appendContextPath(e.data.contextPath,e.ids[0])}return r(t,{data:s,blockParams:i.blockParams([t],[s&&s.contextPath])})}else{return e.inverse(this)}}))};t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;e.registerDefaultDecorators=a;var s=r(19);var n=i(s);function a(t){n["default"](t)}},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);e["default"]=function(t){t.registerDecorator("inline",(function(t,e,r,s){var n=t;if(!e.partials){e.partials={};n=function(s,n){var a=r.partials;r.partials=i.extend({},a,e.partials);var o=t(s,n);r.partials=a;return o}}e.partials[s.args[0]]=s.fn;return n}))};t.exports=e["default"]},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);var s={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function t(e){if(typeof e==="string"){var r=i.indexOf(s.methodMap,e.toLowerCase());if(r>=0){e=r}else{e=parseInt(e,10)}}return e},log:function t(e){e=s.lookupLevel(e);if(typeof console!=="undefined"&&s.lookupLevel(s.level)<=e){var r=s.methodMap[e];if(!console[r]){r="log"}for(var i=arguments.length,n=Array(i>1?i-1:0),a=1;a<i;a++){n[a-1]=arguments[a]}console[r].apply(console,n)}}};e["default"]=s;t.exports=e["default"]},function(t,e){"use strict";e.__esModule=true;function r(t){this.string=t}r.prototype.toString=r.prototype.toHTML=function(){return""+this.string};e["default"]=r;t.exports=e["default"]},function(t,e,r){"use strict";var i=r(23)["default"];var s=r(3)["default"];var n=r(1)["default"];e.__esModule=true;e.checkRevision=h;e.template=p;e.wrapProgram=f;e.resolvePartial=d;e.invokePartial=m;e.noop=v;var a=r(5);var o=s(a);var u=r(6);var l=n(u);var c=r(4);function h(t){var e=t&&t[0]||1,r=c.COMPILER_REVISION;if(e!==r){if(e<r){var i=c.REVISION_CHANGES[r],s=c.REVISION_CHANGES[e];throw new l["default"]("Template was precompiled with an older version of Handlebars than the current runtime. "+"Please update your precompiler to a newer version ("+i+") or downgrade your runtime to an older version ("+s+").")}else{throw new l["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. "+"Please update your runtime to a newer version ("+t[1]+").")}}}function p(t,e){if(!e){throw new l["default"]("No environment passed to template")}if(!t||!t.main){throw new l["default"]("Unknown template object: "+typeof t)}t.main.decorator=t.main_d;e.VM.checkRevision(t.compiler);function r(r,i,s){if(s.hash){i=o.extend({},i,s.hash);if(s.ids){s.ids[0]=true}}r=e.VM.resolvePartial.call(this,r,i,s);var n=e.VM.invokePartial.call(this,r,i,s);if(n==null&&e.compile){s.partials[s.name]=e.compile(r,t.compilerOptions,e);n=s.partials[s.name](i,s)}if(n!=null){if(s.indent){var a=n.split("\n");for(var u=0,c=a.length;u<c;u++){if(!a[u]&&u+1===c){break}a[u]=s.indent+a[u]}n=a.join("\n")}return n}else{throw new l["default"]("The partial "+s.name+" could not be compiled when running in runtime-only mode")}}var s={strict:function t(e,r){if(!(r in e)){throw new l["default"]('"'+r+'" not defined in '+e)}return e[r]},lookup:function t(e,r){var i=e.length;for(var s=0;s<i;s++){if(e[s]&&e[s][r]!=null){return e[s][r]}}},lambda:function t(e,r){return typeof e==="function"?e.call(r):e},escapeExpression:o.escapeExpression,invokePartial:r,fn:function e(r){var i=t[r];i.decorator=t[r+"_d"];return i},programs:[],program:function t(e,r,i,s,n){var a=this.programs[e],o=this.fn(e);if(r||n||s||i){a=f(this,e,o,r,i,s,n)}else if(!a){a=this.programs[e]=f(this,e,o)}return a},data:function t(e,r){while(e&&r--){e=e._parent}return e},merge:function t(e,r){var i=e||r;if(e&&r&&e!==r){i=o.extend({},r,e)}return i},nullContext:i({}),noop:e.VM.noop,compilerInfo:t.compiler};function n(e){var r=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var i=r.data;n._setup(r);if(!r.partial&&t.useData){i=g(e,i)}var a=undefined,o=t.useBlockParams?[]:undefined;if(t.useDepths){if(r.depths){a=e!=r.depths[0]?[e].concat(r.depths):r.depths}else{a=[e]}}function u(e){return""+t.main(s,e,s.helpers,s.partials,i,o,a)}u=k(t.main,u,s,r.depths||[],i,o);return u(e,r)}n.isTop=true;n._setup=function(r){if(!r.partial){s.helpers=s.merge(r.helpers,e.helpers);if(t.usePartial){s.partials=s.merge(r.partials,e.partials)}if(t.usePartial||t.useDecorators){s.decorators=s.merge(r.decorators,e.decorators)}}else{s.helpers=r.helpers;s.partials=r.partials;s.decorators=r.decorators}};n._child=function(e,r,i,n){if(t.useBlockParams&&!i){throw new l["default"]("must pass block params")}if(t.useDepths&&!n){throw new l["default"]("must pass parent depths")}return f(s,e,t[e],r,0,i,n)};return n}function f(t,e,r,i,s,n,a){function o(e){var s=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var o=a;if(a&&e!=a[0]&&!(e===t.nullContext&&a[0]===null)){o=[e].concat(a)}return r(t,e,t.helpers,t.partials,s.data||i,n&&[s.blockParams].concat(n),o)}o=k(r,o,t,a,i,n);o.program=e;o.depth=a?a.length:0;o.blockParams=s||0;return o}function d(t,e,r){if(!t){if(r.name==="@partial-block"){t=r.data["partial-block"]}else{t=r.partials[r.name]}}else if(!t.call&&!r.name){r.name=t;t=r.partials[t]}return t}function m(t,e,r){var i=r.data&&r.data["partial-block"];r.partial=true;if(r.ids){r.data.contextPath=r.ids[0]||r.data.contextPath}var s=undefined;if(r.fn&&r.fn!==v){(function(){r.data=c.createFrame(r.data);var t=r.fn;s=r.data["partial-block"]=function e(r){var s=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];s.data=c.createFrame(s.data);s.data["partial-block"]=i;return t(r,s)};if(t.partials){r.partials=o.extend({},r.partials,t.partials)}})()}if(t===undefined&&s){t=s}if(t===undefined){throw new l["default"]("The partial "+r.name+" could not be found")}else if(t instanceof Function){return t(e,r)}}function v(){return""}function g(t,e){if(!e||!("root"in e)){e=e?c.createFrame(e):{};e.root=t}return e}function k(t,e,r,i,s,n){if(t.decorator){var a={};e=t.decorator(e,a,r,i&&i[0],s,n,i);o.extend(e,a)}return e}},function(t,e,r){t.exports={default:r(24),__esModule:true}},function(t,e,r){r(25);t.exports=r(30).Object.seal},function(t,e,r){var i=r(26);r(27)("seal",(function(t){return function e(r){return t&&i(r)?t(r):r}}))},function(t,e){t.exports=function(t){return typeof t==="object"?t!==null:typeof t==="function"}},function(t,e,r){var i=r(28),s=r(30),n=r(33);t.exports=function(t,e){var r=(s.Object||{})[t]||Object[t],a={};a[t]=e(r);i(i.S+i.F*n((function(){r(1)})),"Object",a)}},function(t,e,r){var i=r(29),s=r(30),n=r(31),a="prototype";var o=function(t,e,r){var u=t&o.F,l=t&o.G,c=t&o.S,h=t&o.P,p=t&o.B,f=t&o.W,d=l?s:s[e]||(s[e]={}),m=l?i:c?i[e]:(i[e]||{})[a],v,g,k;if(l)r=e;for(v in r){g=!u&&m&&v in m;if(g&&v in d)continue;k=g?m[v]:r[v];d[v]=l&&typeof m[v]!="function"?r[v]:p&&g?n(k,i):f&&m[v]==k?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};e[a]=t[a];return e}(k):h&&typeof k=="function"?n(Function.call,k):k;if(h)(d[a]||(d[a]={}))[v]=k}};o.F=1;o.G=2;o.S=4;o.P=8;o.B=16;o.W=32;t.exports=o},function(t,e){var r=t.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();if(typeof __g=="number")__g=r},function(t,e){var r=t.exports={version:"1.2.6"};if(typeof __e=="number")__e=r},function(t,e,r){var i=r(32);t.exports=function(t,e,r){i(t);if(e===undefined)return t;switch(r){case 1:return function(r){return t.call(e,r)};case 2:return function(r,i){return t.call(e,r,i)};case 3:return function(r,i,s){return t.call(e,r,i,s)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(typeof t!="function")throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return true}}},function(t,e){(function(r){"use strict";e.__esModule=true;e["default"]=function(t){var e=typeof r!=="undefined"?r:window,i=e.Handlebars;t.noConflict=function(){if(e.Handlebars===t){e.Handlebars=i}return t}};t.exports=e["default"]}).call(e,function(){return this}())},function(t,e){"use strict";e.__esModule=true;var r={helpers:{helperExpression:function t(e){return e.type==="SubExpression"||(e.type==="MustacheStatement"||e.type==="BlockStatement")&&!!(e.params&&e.params.length||e.hash)},scopedId:function t(e){return/^\.|this\b/.test(e.original)},simpleId:function t(e){return e.parts.length===1&&!r.helpers.scopedId(e)&&!e.depth}}};e["default"]=r;t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];var s=r(3)["default"];e.__esModule=true;e.parse=f;var n=r(37);var a=i(n);var o=r(38);var u=i(o);var l=r(40);var c=s(l);var h=r(5);e.parser=a["default"];var p={};h.extend(p,c);function f(t,e){if(t.type==="Program"){return t}a["default"].yy=p;p.locInfo=function(t){return new p.SourceLocation(e&&e.srcName,t)};var r=new u["default"](e);return r.accept(a["default"].parse(t))}},function(t,e){"use strict";e.__esModule=true;var r=function(){var t={trace:function t(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition_plus0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,1],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function t(e,r,i,s,n,a,o){var u=a.length-1;switch(n){case 1:return a[u-1];break;case 2:this.$=s.prepareProgram(a[u]);break;case 3:this.$=a[u];break;case 4:this.$=a[u];break;case 5:this.$=a[u];break;case 6:this.$=a[u];break;case 7:this.$=a[u];break;case 8:this.$=a[u];break;case 9:this.$={type:"CommentStatement",value:s.stripComment(a[u]),strip:s.stripFlags(a[u],a[u]),loc:s.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:a[u],value:a[u],loc:s.locInfo(this._$)};break;case 11:this.$=s.prepareRawBlock(a[u-2],a[u-1],a[u],this._$);break;case 12:this.$={path:a[u-3],params:a[u-2],hash:a[u-1]};break;case 13:this.$=s.prepareBlock(a[u-3],a[u-2],a[u-1],a[u],false,this._$);break;case 14:this.$=s.prepareBlock(a[u-3],a[u-2],a[u-1],a[u],true,this._$);break;case 15:this.$={open:a[u-5],path:a[u-4],params:a[u-3],hash:a[u-2],blockParams:a[u-1],strip:s.stripFlags(a[u-5],a[u])};break;case 16:this.$={path:a[u-4],params:a[u-3],hash:a[u-2],blockParams:a[u-1],strip:s.stripFlags(a[u-5],a[u])};break;case 17:this.$={path:a[u-4],params:a[u-3],hash:a[u-2],blockParams:a[u-1],strip:s.stripFlags(a[u-5],a[u])};break;case 18:this.$={strip:s.stripFlags(a[u-1],a[u-1]),program:a[u]};break;case 19:var l=s.prepareBlock(a[u-2],a[u-1],a[u],a[u],false,this._$),c=s.prepareProgram([l],a[u-1].loc);c.chained=true;this.$={strip:a[u-2].strip,program:c,chain:true};break;case 20:this.$=a[u];break;case 21:this.$={path:a[u-1],strip:s.stripFlags(a[u-2],a[u])};break;case 22:this.$=s.prepareMustache(a[u-3],a[u-2],a[u-1],a[u-4],s.stripFlags(a[u-4],a[u]),this._$);break;case 23:this.$=s.prepareMustache(a[u-3],a[u-2],a[u-1],a[u-4],s.stripFlags(a[u-4],a[u]),this._$);break;case 24:this.$={type:"PartialStatement",name:a[u-3],params:a[u-2],hash:a[u-1],indent:"",strip:s.stripFlags(a[u-4],a[u]),loc:s.locInfo(this._$)};break;case 25:this.$=s.preparePartialBlock(a[u-2],a[u-1],a[u],this._$);break;case 26:this.$={path:a[u-3],params:a[u-2],hash:a[u-1],strip:s.stripFlags(a[u-4],a[u])};break;case 27:this.$=a[u];break;case 28:this.$=a[u];break;case 29:this.$={type:"SubExpression",path:a[u-3],params:a[u-2],hash:a[u-1],loc:s.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:a[u],loc:s.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:s.id(a[u-2]),value:a[u],loc:s.locInfo(this._$)};break;case 32:this.$=s.id(a[u-1]);break;case 33:this.$=a[u];break;case 34:this.$=a[u];break;case 35:this.$={type:"StringLiteral",value:a[u],original:a[u],loc:s.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number(a[u]),original:Number(a[u]),loc:s.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:a[u]==="true",original:a[u]==="true",loc:s.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:undefined,value:undefined,loc:s.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:s.locInfo(this._$)};break;case 40:this.$=a[u];break;case 41:this.$=a[u];break;case 42:this.$=s.preparePath(true,a[u],this._$);break;case 43:this.$=s.preparePath(false,a[u],this._$);break;case 44:a[u-2].push({part:s.id(a[u]),original:a[u],separator:a[u-1]});this.$=a[u-2];break;case 45:this.$=[{part:s.id(a[u]),original:a[u]}];break;case 46:this.$=[];break;case 47:a[u-1].push(a[u]);break;case 48:this.$=[a[u]];break;case 49:a[u-1].push(a[u]);break;case 50:this.$=[];break;case 51:a[u-1].push(a[u]);break;case 58:this.$=[];break;case 59:a[u-1].push(a[u]);break;case 64:this.$=[];break;case 65:a[u-1].push(a[u]);break;case 70:this.$=[];break;case 71:a[u-1].push(a[u]);break;case 78:this.$=[];break;case 79:a[u-1].push(a[u]);break;case 82:this.$=[];break;case 83:a[u-1].push(a[u]);break;case 86:this.$=[];break;case 87:a[u-1].push(a[u]);break;case 90:this.$=[];break;case 91:a[u-1].push(a[u]);break;case 94:this.$=[];break;case 95:a[u-1].push(a[u]);break;case 98:this.$=[a[u]];break;case 99:a[u-1].push(a[u]);break;case 100:this.$=[a[u]];break;case 101:a[u-1].push(a[u]);break}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{13:40,15:[1,20],17:39},{20:42,56:41,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:45,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:48,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:42,56:49,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:50,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,51]},{72:[1,35],86:52},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:53,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:54,38:56,39:[1,58],43:57,44:[1,59],45:55,47:[2,54]},{28:60,43:61,44:[1,59],47:[2,56]},{13:63,15:[1,20],18:[1,62]},{15:[2,48],18:[2,48]},{33:[2,86],57:64,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:65,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:66,47:[1,67]},{30:68,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:69,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:70,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:71,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:75,33:[2,80],50:72,63:73,64:76,65:[1,44],69:74,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,80]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,51]},{20:75,53:81,54:[2,84],63:82,64:76,65:[1,44],69:83,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:84,47:[1,67]},{47:[2,55]},{4:85,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:86,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:87,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:88,47:[1,67]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:75,33:[2,88],58:89,63:90,64:76,65:[1,44],69:91,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:92,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:93,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,31:94,33:[2,60],63:95,64:76,65:[1,44],69:96,70:77,71:78,72:[1,79],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,66],36:97,63:98,64:76,65:[1,44],69:99,70:77,71:78,72:[1,79],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,22:100,23:[2,52],63:101,64:76,65:[1,44],69:102,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,92],62:103,63:104,64:76,65:[1,44],69:105,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,106]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:107,72:[1,108],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,109],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,110]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:56,39:[1,58],43:57,44:[1,59],45:112,46:111,47:[2,76]},{33:[2,70],40:113,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,114]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:75,63:116,64:76,65:[1,44],67:115,68:[2,96],69:117,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,118]},{32:119,33:[2,62],74:120,75:[1,121]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:122,74:123,75:[1,121]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,124]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,125]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,109]},{20:75,63:126,64:76,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:75,33:[2,72],41:127,63:128,64:76,65:[1,44],69:129,70:77,71:78,72:[1,79],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,130]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,131]},{33:[2,63]},{72:[1,133],76:132},{33:[1,134]},{33:[2,69]},{15:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:135,74:136,75:[1,121]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,138],77:[1,137]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,139]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],55:[2,55],57:[2,20],61:[2,57],74:[2,81],83:[2,85],87:[2,18],91:[2,89],102:[2,53],105:[2,93],111:[2,19],112:[2,77],117:[2,97],120:[2,63],123:[2,69],124:[2,12],136:[2,75],137:[2,32]},parseError:function t(e,r){throw new Error(e)},parse:function t(e){var r=this,i=[0],s=[null],n=[],a=this.table,o="",u=0,l=0,c=0,h=2,p=1;this.lexer.setInput(e);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;this.yy.parser=this;if(typeof this.lexer.yylloc=="undefined")this.lexer.yylloc={};var f=this.lexer.yylloc;n.push(f);var d=this.lexer.options&&this.lexer.options.ranges;if(typeof this.yy.parseError==="function")this.parseError=this.yy.parseError;function m(t){i.length=i.length-2*t;s.length=s.length-t;n.length=n.length-t}function v(){var t;t=r.lexer.lex()||1;if(typeof t!=="number"){t=r.symbols_[t]||t}return t}var g,k,y,b,S,_,P={},x,w,E,C;while(true){y=i[i.length-1];if(this.defaultActions[y]){b=this.defaultActions[y]}else{if(g===null||typeof g=="undefined"){g=v()}b=a[y]&&a[y][g]}if(typeof b==="undefined"||!b.length||!b[0]){var L="";if(!c){C=[];for(x in a[y])if(this.terminals_[x]&&x>2){C.push("'"+this.terminals_[x]+"'")}if(this.lexer.showPosition){L="Parse error on line "+(u+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+C.join(", ")+", got '"+(this.terminals_[g]||g)+"'"}else{L="Parse error on line "+(u+1)+": Unexpected "+(g==1?"end of input":"'"+(this.terminals_[g]||g)+"'")}this.parseError(L,{text:this.lexer.match,token:this.terminals_[g]||g,line:this.lexer.yylineno,loc:f,expected:C})}}if(b[0]instanceof Array&&b.length>1){throw new Error("Parse Error: multiple actions possible at state: "+y+", token: "+g)}switch(b[0]){case 1:i.push(g);s.push(this.lexer.yytext);n.push(this.lexer.yylloc);i.push(b[1]);g=null;if(!k){l=this.lexer.yyleng;o=this.lexer.yytext;u=this.lexer.yylineno;f=this.lexer.yylloc;if(c>0)c--}else{g=k;k=null}break;case 2:w=this.productions_[b[1]][1];P.$=s[s.length-w];P._$={first_line:n[n.length-(w||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(w||1)].first_column,last_column:n[n.length-1].last_column};if(d){P._$.range=[n[n.length-(w||1)].range[0],n[n.length-1].range[1]]}_=this.performAction.call(P,o,l,u,this.yy,b[1],s,n);if(typeof _!=="undefined"){return _}if(w){i=i.slice(0,-1*w*2);s=s.slice(0,-1*w);n=n.slice(0,-1*w)}i.push(this.productions_[b[1]][0]);s.push(P.$);n.push(P._$);E=a[i[i.length-2]][i[i.length-1]];i.push(E);break;case 3:return true}}return true}};var e=function(){var t={EOF:1,parseError:function t(e,r){if(this.yy.parser){this.yy.parser.parseError(e,r)}else{throw new Error(e)}},setInput:function t(e){this._input=e;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges)this.yylloc.range=[0,0];this.offset=0;return this},input:function t(){var e=this._input[0];this.yytext+=e;this.yyleng++;this.offset++;this.match+=e;this.matched+=e;var r=e.match(/(?:\r\n?|\n).*/g);if(r){this.yylineno++;this.yylloc.last_line++}else{this.yylloc.last_column++}if(this.options.ranges)this.yylloc.range[1]++;this._input=this._input.slice(1);return e},unput:function t(e){var r=e.length;var i=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-r-1);this.offset-=r;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(i.length-1)this.yylineno-=i.length-1;var n=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===s.length?this.yylloc.first_column:0)+s[s.length-i.length].length-i[0].length:this.yylloc.first_column-r};if(this.options.ranges){this.yylloc.range=[n[0],n[0]+this.yyleng-r]}return this},more:function t(){this._more=true;return this},less:function t(e){this.unput(this.match.slice(e))},pastInput:function t(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},upcomingInput:function t(){var e=this.match;if(e.length<20){e+=this._input.substr(0,20-e.length)}return(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},showPosition:function t(){var e=this.pastInput();var r=new Array(e.length+1).join("-");return e+this.upcomingInput()+"\n"+r+"^"},next:function t(){if(this.done){return this.EOF}if(!this._input)this.done=true;var e,r,i,s,n,a;if(!this._more){this.yytext="";this.match=""}var o=this._currentRules();for(var u=0;u<o.length;u++){i=this._input.match(this.rules[o[u]]);if(i&&(!r||i[0].length>r[0].length)){r=i;s=u;if(!this.options.flex)break}}if(r){a=r[0].match(/(?:\r\n?|\n).*/g);if(a)this.yylineno+=a.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:a?a[a.length-1].length-a[a.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length};this.yytext+=r[0];this.match+=r[0];this.matches=r;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]}this._more=false;this._input=this._input.slice(r[0].length);this.matched+=r[0];e=this.performAction.call(this,this.yy,this,o[s],this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input)this.done=false;if(e)return e;else return}if(this._input===""){return this.EOF}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},lex:function t(){var e=this.next();if(typeof e!=="undefined"){return e}else{return this.lex()}},begin:function t(e){this.conditionStack.push(e)},popState:function t(){return this.conditionStack.pop()},_currentRules:function t(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function t(){return this.conditionStack[this.conditionStack.length-2]},pushState:function t(e){this.begin(e)}};t.options={};t.performAction=function t(e,r,i,s){function n(t,e){return r.yytext=r.yytext.substring(t,r.yyleng-e+t)}var a=s;switch(i){case 0:if(r.yytext.slice(-2)==="\\\\"){n(0,1);this.begin("mu")}else if(r.yytext.slice(-1)==="\\"){n(0,1);this.begin("emu")}else{this.begin("mu")}if(r.yytext)return 15;break;case 1:return 15;break;case 2:this.popState();return 15;break;case 3:this.begin("raw");return 15;break;case 4:this.popState();if(this.conditionStack[this.conditionStack.length-1]==="raw"){return 15}else{n(5,9);return"END_RAW_BLOCK"}break;case 5:return 15;break;case 6:this.popState();return 14;break;case 7:return 65;break;case 8:return 68;break;case 9:return 19;break;case 10:this.popState();this.begin("raw");return 23;break;case 11:return 55;break;case 12:return 60;break;case 13:return 29;break;case 14:return 47;break;case 15:this.popState();return 44;break;case 16:this.popState();return 44;break;case 17:return 34;break;case 18:return 39;break;case 19:return 51;break;case 20:return 48;break;case 21:this.unput(r.yytext);this.popState();this.begin("com");break;case 22:this.popState();return 14;break;case 23:return 48;break;case 24:return 73;break;case 25:return 72;break;case 26:return 72;break;case 27:return 87;break;case 28:break;case 29:this.popState();return 54;break;case 30:this.popState();return 33;break;case 31:r.yytext=n(1,2).replace(/\\"/g,'"');return 80;break;case 32:r.yytext=n(1,2).replace(/\\'/g,"'");return 80;break;case 33:return 85;break;case 34:return 82;break;case 35:return 82;break;case 36:return 83;break;case 37:return 84;break;case 38:return 81;break;case 39:return 75;break;case 40:return 77;break;case 41:return 72;break;case 42:r.yytext=r.yytext.replace(/\\([\\\]])/g,"$1");return 72;break;case 43:return"INVALID";break;case 44:return 5;break}};t.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/];t.conditions={mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:false},emu:{rules:[2],inclusive:false},com:{rules:[6],inclusive:false},raw:{rules:[3,4,5],inclusive:false},INITIAL:{rules:[0,1,44],inclusive:true}};return t}();t.lexer=e;function r(){this.yy={}}r.prototype=t;t.Parser=r;return new r}();e["default"]=r;t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(39);var n=i(s);function a(){var t=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.options=t}a.prototype=new n["default"];a.prototype.Program=function(t){var e=!this.options.ignoreStandalone;var r=!this.isRootSeen;this.isRootSeen=true;var i=t.body;for(var s=0,n=i.length;s<n;s++){var a=i[s],h=this.accept(a);if(!h){continue}var p=o(i,s,r),f=u(i,s,r),d=h.openStandalone&&p,m=h.closeStandalone&&f,v=h.inlineStandalone&&p&&f;if(h.close){l(i,s,true)}if(h.open){c(i,s,true)}if(e&&v){l(i,s);if(c(i,s)){if(a.type==="PartialStatement"){a.indent=/([ \t]+$)/.exec(i[s-1].original)[1]}}}if(e&&d){l((a.program||a.inverse).body);c(i,s)}if(e&&m){l(i,s);c((a.inverse||a.program).body)}}return t};a.prototype.BlockStatement=a.prototype.DecoratorBlock=a.prototype.PartialBlockStatement=function(t){this.accept(t.program);this.accept(t.inverse);var e=t.program||t.inverse,r=t.program&&t.inverse,i=r,s=r;if(r&&r.chained){i=r.body[0].program;while(s.chained){s=s.body[s.body.length-1].program}}var n={open:t.openStrip.open,close:t.closeStrip.close,openStandalone:u(e.body),closeStandalone:o((i||e).body)};if(t.openStrip.close){l(e.body,null,true)}if(r){var a=t.inverseStrip;if(a.open){c(e.body,null,true)}if(a.close){l(i.body,null,true)}if(t.closeStrip.open){c(s.body,null,true)}if(!this.options.ignoreStandalone&&o(e.body)&&u(i.body)){c(e.body);l(i.body)}}else if(t.closeStrip.open){c(e.body,null,true)}return n};a.prototype.Decorator=a.prototype.MustacheStatement=function(t){return t.strip};a.prototype.PartialStatement=a.prototype.CommentStatement=function(t){var e=t.strip||{};return{inlineStandalone:true,open:e.open,close:e.close}};function o(t,e,r){if(e===undefined){e=t.length}var i=t[e-1],s=t[e-2];if(!i){return r}if(i.type==="ContentStatement"){return(s||!r?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(i.original)}}function u(t,e,r){if(e===undefined){e=-1}var i=t[e+1],s=t[e+2];if(!i){return r}if(i.type==="ContentStatement"){return(s||!r?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(i.original)}}function l(t,e,r){var i=t[e==null?0:e+1];if(!i||i.type!=="ContentStatement"||!r&&i.rightStripped){return}var s=i.value;i.value=i.value.replace(r?/^\s+/:/^[ \t]*\r?\n?/,"");i.rightStripped=i.value!==s}function c(t,e,r){var i=t[e==null?t.length-1:e-1];if(!i||i.type!=="ContentStatement"||!r&&i.leftStripped){return}var s=i.value;i.value=i.value.replace(r?/\s+$/:/[ \t]+$/,"");i.leftStripped=i.value!==s;return i.leftStripped}e["default"]=a;t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(6);var n=i(s);function a(){this.parents=[]}a.prototype={constructor:a,mutating:false,acceptKey:function t(e,r){var i=this.accept(e[r]);if(this.mutating){if(i&&!a.prototype[i.type]){throw new n["default"]('Unexpected node type "'+i.type+'" found when accepting '+r+" on "+e.type)}e[r]=i}},acceptRequired:function t(e,r){this.acceptKey(e,r);if(!e[r]){throw new n["default"](e.type+" requires "+r)}},acceptArray:function t(e){for(var r=0,i=e.length;r<i;r++){this.acceptKey(e,r);if(!e[r]){e.splice(r,1);r--;i--}}},accept:function t(e){if(!e){return}if(!this[e.type]){throw new n["default"]("Unknown type: "+e.type,e)}if(this.current){this.parents.unshift(this.current)}this.current=e;var r=this[e.type](e);this.current=this.parents.shift();if(!this.mutating||r){return r}else if(r!==false){return e}},Program:function t(e){this.acceptArray(e.body)},MustacheStatement:o,Decorator:o,BlockStatement:u,DecoratorBlock:u,PartialStatement:l,PartialBlockStatement:function t(e){l.call(this,e);this.acceptKey(e,"program")},ContentStatement:function t(){},CommentStatement:function t(){},SubExpression:o,PathExpression:function t(){},StringLiteral:function t(){},NumberLiteral:function t(){},BooleanLiteral:function t(){},UndefinedLiteral:function t(){},NullLiteral:function t(){},Hash:function t(e){this.acceptArray(e.pairs)},HashPair:function t(e){this.acceptRequired(e,"value")}};function o(t){this.acceptRequired(t,"path");this.acceptArray(t.params);this.acceptKey(t,"hash")}function u(t){o.call(this,t);this.acceptKey(t,"program");this.acceptKey(t,"inverse")}function l(t){this.acceptRequired(t,"name");this.acceptArray(t.params);this.acceptKey(t,"hash")}e["default"]=a;t.exports=e["default"]},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;e.SourceLocation=o;e.id=u;e.stripFlags=l;e.stripComment=c;e.preparePath=h;e.prepareMustache=p;e.prepareRawBlock=f;e.prepareBlock=d;e.prepareProgram=m;e.preparePartialBlock=v;var s=r(6);var n=i(s);function a(t,e){e=e.path?e.path.original:e;if(t.path.original!==e){var r={loc:t.path.loc};throw new n["default"](t.path.original+" doesn't match "+e,r)}}function o(t,e){this.source=t;this.start={line:e.first_line,column:e.first_column};this.end={line:e.last_line,column:e.last_column}}function u(t){if(/^\[.*\]$/.test(t)){return t.substring(1,t.length-1)}else{return t}}function l(t,e){return{open:t.charAt(2)==="~",close:e.charAt(e.length-3)==="~"}}function c(t){return t.replace(/^\{\{~?!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function h(t,e,r){r=this.locInfo(r);var i=t?"@":"",s=[],a=0;for(var o=0,u=e.length;o<u;o++){var l=e[o].part,c=e[o].original!==l;i+=(e[o].separator||"")+l;if(!c&&(l===".."||l==="."||l==="this")){if(s.length>0){throw new n["default"]("Invalid path: "+i,{loc:r})}else if(l===".."){a++}}else{s.push(l)}}return{type:"PathExpression",data:t,depth:a,parts:s,original:i,loc:r}}function p(t,e,r,i,s,n){var a=i.charAt(3)||i.charAt(2),o=a!=="{"&&a!=="&";var u=/\*/.test(i);return{type:u?"Decorator":"MustacheStatement",path:t,params:e,hash:r,escaped:o,strip:s,loc:this.locInfo(n)}}function f(t,e,r,i){a(t,r);i=this.locInfo(i);var s={type:"Program",body:e,strip:{},loc:i};return{type:"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:s,openStrip:{},inverseStrip:{},closeStrip:{},loc:i}}function d(t,e,r,i,s,o){if(i&&i.path){a(t,i)}var u=/\*/.test(t.open);e.blockParams=t.blockParams;var l=undefined,c=undefined;if(r){if(u){throw new n["default"]("Unexpected inverse block on decorator",r)}if(r.chain){r.program.body[0].closeStrip=i.strip}c=r.strip;l=r.program}if(s){s=l;l=e;e=s}return{type:u?"DecoratorBlock":"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:e,inverse:l,openStrip:t.strip,inverseStrip:c,closeStrip:i&&i.strip,loc:this.locInfo(o)}}function m(t,e){if(!e&&t.length){var r=t[0].loc,i=t[t.length-1].loc;if(r&&i){e={source:r.source,start:{line:r.start.line,column:r.start.column},end:{line:i.end.line,column:i.end.column}}}}return{type:"Program",body:t,strip:{},loc:e}}function v(t,e,r,i){a(t,r);return{type:"PartialBlockStatement",name:t.path,params:t.params,hash:t.hash,program:e,openStrip:t.strip,closeStrip:r&&r.strip,loc:this.locInfo(i)}}},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;e.Compiler=c;e.precompile=h;e.compile=p;var s=r(6);var n=i(s);var a=r(5);var o=r(35);var u=i(o);var l=[].slice;function c(){}c.prototype={compiler:c,equals:function t(e){var r=this.opcodes.length;if(e.opcodes.length!==r){return false}for(var i=0;i<r;i++){var s=this.opcodes[i],n=e.opcodes[i];if(s.opcode!==n.opcode||!f(s.args,n.args)){return false}}r=this.children.length;for(var i=0;i<r;i++){if(!this.children[i].equals(e.children[i])){return false}}return true},guid:0,compile:function t(e,r){this.sourceNode=[];this.opcodes=[];this.children=[];this.options=r;this.stringParams=r.stringParams;this.trackIds=r.trackIds;r.blockParams=r.blockParams||[];var i=r.knownHelpers;r.knownHelpers={helperMissing:true,blockHelperMissing:true,each:true,if:true,unless:true,with:true,log:true,lookup:true};if(i){for(var s in i){this.options.knownHelpers[s]=i[s]}}return this.accept(e)},compileProgram:function t(e){var r=new this.compiler,i=r.compile(e,this.options),s=this.guid++;this.usePartial=this.usePartial||i.usePartial;this.children[s]=i;this.useDepths=this.useDepths||i.useDepths;return s},accept:function t(e){if(!this[e.type]){throw new n["default"]("Unknown type: "+e.type,e)}this.sourceNode.unshift(e);var r=this[e.type](e);this.sourceNode.shift();return r},Program:function t(e){this.options.blockParams.unshift(e.blockParams);var r=e.body,i=r.length;for(var s=0;s<i;s++){this.accept(r[s])}this.options.blockParams.shift();this.isSimple=i===1;this.blockParams=e.blockParams?e.blockParams.length:0;return this},BlockStatement:function t(e){d(e);var r=e.program,i=e.inverse;r=r&&this.compileProgram(r);i=i&&this.compileProgram(i);var s=this.classifySexpr(e);if(s==="helper"){this.helperSexpr(e,r,i)}else if(s==="simple"){this.simpleSexpr(e);this.opcode("pushProgram",r);this.opcode("pushProgram",i);this.opcode("emptyHash");this.opcode("blockValue",e.path.original)}else{this.ambiguousSexpr(e,r,i);this.opcode("pushProgram",r);this.opcode("pushProgram",i);this.opcode("emptyHash");this.opcode("ambiguousBlockValue")}this.opcode("append")},DecoratorBlock:function t(e){var r=e.program&&this.compileProgram(e.program);var i=this.setupFullMustacheParams(e,r,undefined),s=e.path;this.useDecorators=true;this.opcode("registerDecorator",i.length,s.original)},PartialStatement:function t(e){this.usePartial=true;var r=e.program;if(r){r=this.compileProgram(e.program)}var i=e.params;if(i.length>1){throw new n["default"]("Unsupported number of partial arguments: "+i.length,e)}else if(!i.length){if(this.options.explicitPartialContext){this.opcode("pushLiteral","undefined")}else{i.push({type:"PathExpression",parts:[],depth:0})}}var s=e.name.original,a=e.name.type==="SubExpression";if(a){this.accept(e.name)}this.setupFullMustacheParams(e,r,undefined,true);var o=e.indent||"";if(this.options.preventIndent&&o){this.opcode("appendContent",o);o=""}this.opcode("invokePartial",a,s,o);this.opcode("append")},PartialBlockStatement:function t(e){this.PartialStatement(e)},MustacheStatement:function t(e){this.SubExpression(e);if(e.escaped&&!this.options.noEscape){this.opcode("appendEscaped")}else{this.opcode("append")}},Decorator:function t(e){this.DecoratorBlock(e)},ContentStatement:function t(e){if(e.value){this.opcode("appendContent",e.value)}},CommentStatement:function t(){},SubExpression:function t(e){d(e);var r=this.classifySexpr(e);if(r==="simple"){this.simpleSexpr(e)}else if(r==="helper"){this.helperSexpr(e)}else{this.ambiguousSexpr(e)}},ambiguousSexpr:function t(e,r,i){var s=e.path,n=s.parts[0],a=r!=null||i!=null;this.opcode("getContext",s.depth);this.opcode("pushProgram",r);this.opcode("pushProgram",i);s.strict=true;this.accept(s);this.opcode("invokeAmbiguous",n,a)},simpleSexpr:function t(e){var r=e.path;r.strict=true;this.accept(r);this.opcode("resolvePossibleLambda")},helperSexpr:function t(e,r,i){var s=this.setupFullMustacheParams(e,r,i),a=e.path,o=a.parts[0];if(this.options.knownHelpers[o]){this.opcode("invokeKnownHelper",s.length,o)}else if(this.options.knownHelpersOnly){throw new n["default"]("You specified knownHelpersOnly, but used the unknown helper "+o,e)}else{a.strict=true;a.falsy=true;this.accept(a);this.opcode("invokeHelper",s.length,a.original,u["default"].helpers.simpleId(a))}},PathExpression:function t(e){this.addDepth(e.depth);this.opcode("getContext",e.depth);var r=e.parts[0],i=u["default"].helpers.scopedId(e),s=!e.depth&&!i&&this.blockParamIndex(r);if(s){this.opcode("lookupBlockParam",s,e.parts)}else if(!r){this.opcode("pushContext")}else if(e.data){this.options.data=true;this.opcode("lookupData",e.depth,e.parts,e.strict)}else{this.opcode("lookupOnContext",e.parts,e.falsy,e.strict,i)}},StringLiteral:function t(e){this.opcode("pushString",e.value)},NumberLiteral:function t(e){this.opcode("pushLiteral",e.value)},BooleanLiteral:function t(e){this.opcode("pushLiteral",e.value)},UndefinedLiteral:function t(){this.opcode("pushLiteral","undefined")},NullLiteral:function t(){this.opcode("pushLiteral","null")},Hash:function t(e){var r=e.pairs,i=0,s=r.length;this.opcode("pushHash");for(;i<s;i++){this.pushParam(r[i].value)}while(i--){this.opcode("assignToHash",r[i].key)}this.opcode("popHash")},opcode:function t(e){this.opcodes.push({opcode:e,args:l.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function t(e){if(!e){return}this.useDepths=true},classifySexpr:function t(e){var r=u["default"].helpers.simpleId(e.path);var i=r&&!!this.blockParamIndex(e.path.parts[0]);var s=!i&&u["default"].helpers.helperExpression(e);var n=!i&&(s||r);if(n&&!s){var a=e.path.parts[0],o=this.options;if(o.knownHelpers[a]){s=true}else if(o.knownHelpersOnly){n=false}}if(s){return"helper"}else if(n){return"ambiguous"}else{return"simple"}},pushParams:function t(e){for(var r=0,i=e.length;r<i;r++){this.pushParam(e[r])}},pushParam:function t(e){var r=e.value!=null?e.value:e.original||"";if(this.stringParams){if(r.replace){r=r.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")}if(e.depth){this.addDepth(e.depth)}this.opcode("getContext",e.depth||0);this.opcode("pushStringParam",r,e.type);if(e.type==="SubExpression"){this.accept(e)}}else{if(this.trackIds){var i=undefined;if(e.parts&&!u["default"].helpers.scopedId(e)&&!e.depth){i=this.blockParamIndex(e.parts[0])}if(i){var s=e.parts.slice(1).join(".");this.opcode("pushId","BlockParam",i,s)}else{r=e.original||r;if(r.replace){r=r.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")}this.opcode("pushId",e.type,r)}}this.accept(e)}},setupFullMustacheParams:function t(e,r,i,s){var n=e.params;this.pushParams(n);this.opcode("pushProgram",r);this.opcode("pushProgram",i);if(e.hash){this.accept(e.hash)}else{this.opcode("emptyHash",s)}return n},blockParamIndex:function t(e){for(var r=0,i=this.options.blockParams.length;r<i;r++){var s=this.options.blockParams[r],n=s&&a.indexOf(s,e);if(s&&n>=0){return[r,n]}}}};function h(t,e,r){if(t==null||typeof t!=="string"&&t.type!=="Program"){throw new n["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t)}e=e||{};if(!("data"in e)){e.data=true}if(e.compat){e.useDepths=true}var i=r.parse(t,e),s=(new r.Compiler).compile(i,e);return(new r.JavaScriptCompiler).compile(s,e)}function p(t,e,r){if(e===undefined)e={};if(t==null||typeof t!=="string"&&t.type!=="Program"){throw new n["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t)}e=a.extend({},e);if(!("data"in e)){e.data=true}if(e.compat){e.useDepths=true}var i=undefined;function s(){var i=r.parse(t,e),s=(new r.Compiler).compile(i,e),n=(new r.JavaScriptCompiler).compile(s,e,undefined,true);return r.template(n)}function o(t,e){if(!i){i=s()}return i.call(this,t,e)}o._setup=function(t){if(!i){i=s()}return i._setup(t)};o._child=function(t,e,r,n){if(!i){i=s()}return i._child(t,e,r,n)};return o}function f(t,e){if(t===e){return true}if(a.isArray(t)&&a.isArray(e)&&t.length===e.length){for(var r=0;r<t.length;r++){if(!f(t[r],e[r])){return false}}return true}}function d(t){if(!t.path.parts){var e=t.path;t.path={type:"PathExpression",data:false,depth:0,parts:[e.original+""],original:e.original+"",loc:e.loc}}}},function(t,e,r){"use strict";var i=r(1)["default"];e.__esModule=true;var s=r(4);var n=r(6);var a=i(n);var o=r(5);var u=r(43);var l=i(u);function c(t){this.value=t}function h(){}h.prototype={nameLookup:function t(e,r){if(r==="constructor"){return["(",e,".propertyIsEnumerable('constructor') ? ",e,".constructor : undefined",")"]}if(h.isValidJavaScriptVariableName(r)){return[e,".",r]}else{return[e,"[",JSON.stringify(r),"]"]}},depthedLookup:function t(e){return[this.aliasable("container.lookup"),'(depths, "',e,'")']},compilerInfo:function t(){var e=s.COMPILER_REVISION,r=s.REVISION_CHANGES[e];return[e,r]},appendToBuffer:function t(e,r,i){if(!o.isArray(e)){e=[e]}e=this.source.wrap(e,r);if(this.environment.isSimple){return["return ",e,";"]}else if(i){return["buffer += ",e,";"]}else{e.appendToBuffer=true;return e}},initializeBuffer:function t(){return this.quotedString("")},compile:function t(e,r,i,s){this.environment=e;this.options=r;this.stringParams=this.options.stringParams;this.trackIds=this.options.trackIds;this.precompile=!s;this.name=this.environment.name;this.isChild=!!i;this.context=i||{decorators:[],programs:[],environments:[]};this.preamble();this.stackSlot=0;this.stackVars=[];this.aliases={};this.registers={list:[]};this.hashes=[];this.compileStack=[];this.inlineStack=[];this.blockParams=[];this.compileChildren(e,r);this.useDepths=this.useDepths||e.useDepths||e.useDecorators||this.options.compat;this.useBlockParams=this.useBlockParams||e.useBlockParams;var n=e.opcodes,o=undefined,u=undefined,l=undefined,c=undefined;for(l=0,c=n.length;l<c;l++){o=n[l];this.source.currentLocation=o.loc;u=u||o.loc;this[o.opcode].apply(this,o.args)}this.source.currentLocation=u;this.pushSource("");if(this.stackSlot||this.inlineStack.length||this.compileStack.length){throw new a["default"]("Compile completed with content left on stack")}if(!this.decorators.isEmpty()){this.useDecorators=true;this.decorators.prepend("var decorators = container.decorators;\n");this.decorators.push("return fn;");if(s){this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()])}else{this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");this.decorators.push("}\n");this.decorators=this.decorators.merge()}}else{this.decorators=undefined}var h=this.createFunctionContext(s);if(!this.isChild){var p={compiler:this.compilerInfo(),main:h};if(this.decorators){p.main_d=this.decorators;p.useDecorators=true}var f=this.context;var d=f.programs;var m=f.decorators;for(l=0,c=d.length;l<c;l++){if(d[l]){p[l]=d[l];if(m[l]){p[l+"_d"]=m[l];p.useDecorators=true}}}if(this.environment.usePartial){p.usePartial=true}if(this.options.data){p.useData=true}if(this.useDepths){p.useDepths=true}if(this.useBlockParams){p.useBlockParams=true}if(this.options.compat){p.compat=true}if(!s){p.compiler=JSON.stringify(p.compiler);this.source.currentLocation={start:{line:1,column:0}};p=this.objectLiteral(p);if(r.srcName){p=p.toStringWithSourceMap({file:r.destName});p.map=p.map&&p.map.toString()}else{p=p.toString()}}else{p.compilerOptions=this.options}return p}else{return h}},preamble:function t(){this.lastContext=0;this.source=new l["default"](this.options.srcName);this.decorators=new l["default"](this.options.srcName)},createFunctionContext:function t(e){var r="";var i=this.stackVars.concat(this.registers.list);if(i.length>0){r+=", "+i.join(", ")}var s=0;for(var n in this.aliases){var a=this.aliases[n];if(this.aliases.hasOwnProperty(n)&&a.children&&a.referenceCount>1){r+=", alias"+ ++s+"="+n;a.children[0]="alias"+s}}var o=["container","depth0","helpers","partials","data"];if(this.useBlockParams||this.useDepths){o.push("blockParams")}if(this.useDepths){o.push("depths")}var u=this.mergeSource(r);if(e){o.push(u);return Function.apply(this,o)}else{return this.source.wrap(["function(",o.join(","),") {\n  ",u,"}"])}},mergeSource:function t(e){var r=this.environment.isSimple,i=!this.forceBuffer,s=undefined,n=undefined,a=undefined,o=undefined;this.source.each((function(t){if(t.appendToBuffer){if(a){t.prepend("  + ")}else{a=t}o=t}else{if(a){if(!n){s=true}else{a.prepend("buffer += ")}o.add(";");a=o=undefined}n=true;if(!r){i=false}}}));if(i){if(a){a.prepend("return ");o.add(";")}else if(!n){this.source.push('return "";')}}else{e+=", buffer = "+(s?"":this.initializeBuffer());if(a){a.prepend("return buffer + ");o.add(";")}else{this.source.push("return buffer;")}}if(e){this.source.prepend("var "+e.substring(2)+(s?"":";\n"))}return this.source.merge()},blockValue:function t(e){var r=this.aliasable("helpers.blockHelperMissing"),i=[this.contextName(0)];this.setupHelperArgs(e,0,i);var s=this.popStack();i.splice(1,0,s);this.push(this.source.functionCall(r,"call",i))},ambiguousBlockValue:function t(){var e=this.aliasable("helpers.blockHelperMissing"),r=[this.contextName(0)];this.setupHelperArgs("",0,r,true);this.flushInline();var i=this.topStack();r.splice(1,0,i);this.pushSource(["if (!",this.lastHelper,") { ",i," = ",this.source.functionCall(e,"call",r),"}"])},appendContent:function t(e){if(this.pendingContent){e=this.pendingContent+e}else{this.pendingLocation=this.source.currentLocation}this.pendingContent=e},append:function t(){if(this.isInline()){this.replaceStack((function(t){return[" != null ? ",t,' : ""']}));this.pushSource(this.appendToBuffer(this.popStack()))}else{var e=this.popStack();this.pushSource(["if (",e," != null) { ",this.appendToBuffer(e,undefined,true)," }"]);if(this.environment.isSimple){this.pushSource(["else { ",this.appendToBuffer("''",undefined,true)," }"])}}},appendEscaped:function t(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function t(e){this.lastContext=e},pushContext:function t(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function t(e,r,i,s){var n=0;if(!s&&this.options.compat&&!this.lastContext){this.push(this.depthedLookup(e[n++]))}else{this.pushContext()}this.resolvePath("context",e,n,r,i)},lookupBlockParam:function t(e,r){this.useBlockParams=true;this.push(["blockParams[",e[0],"][",e[1],"]"]);this.resolvePath("context",r,1)},lookupData:function t(e,r,i){if(!e){this.pushStackLiteral("data")}else{this.pushStackLiteral("container.data(data, "+e+")")}this.resolvePath("data",r,0,true,i)},resolvePath:function t(e,r,i,s,n){var a=this;if(this.options.strict||this.options.assumeObjects){this.push(p(this.options.strict&&n,this,r,e));return}var o=r.length;for(;i<o;i++){this.replaceStack((function(t){var n=a.nameLookup(t,r[i],e);if(!s){return[" != null ? ",n," : ",t]}else{return[" && ",n]}}))}},resolvePossibleLambda:function t(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function t(e,r){this.pushContext();this.pushString(r);if(r!=="SubExpression"){if(typeof e==="string"){this.pushString(e)}else{this.pushStackLiteral(e)}}},emptyHash:function t(e){if(this.trackIds){this.push("{}")}if(this.stringParams){this.push("{}");this.push("{}")}this.pushStackLiteral(e?"undefined":"{}")},pushHash:function t(){if(this.hash){this.hashes.push(this.hash)}this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function t(){var e=this.hash;this.hash=this.hashes.pop();if(this.trackIds){this.push(this.objectLiteral(e.ids))}if(this.stringParams){this.push(this.objectLiteral(e.contexts));this.push(this.objectLiteral(e.types))}this.push(this.objectLiteral(e.values))},pushString:function t(e){this.pushStackLiteral(this.quotedString(e))},pushLiteral:function t(e){this.pushStackLiteral(e)},pushProgram:function t(e){if(e!=null){this.pushStackLiteral(this.programExpression(e))}else{this.pushStackLiteral(null)}},registerDecorator:function t(e,r){var i=this.nameLookup("decorators",r,"decorator"),s=this.setupHelperArgs(r,e);this.decorators.push(["fn = ",this.decorators.functionCall(i,"",["fn","props","container",s])," || fn;"])},invokeHelper:function t(e,r,i){var s=this.popStack(),n=this.setupHelper(e,r),a=i?[n.name," || "]:"";var o=["("].concat(a,s);if(!this.options.strict){o.push(" || ",this.aliasable("helpers.helperMissing"))}o.push(")");this.push(this.source.functionCall(o,"call",n.callParams))},invokeKnownHelper:function t(e,r){var i=this.setupHelper(e,r);this.push(this.source.functionCall(i.name,"call",i.callParams))},invokeAmbiguous:function t(e,r){this.useRegister("helper");var i=this.popStack();this.emptyHash();var s=this.setupHelper(0,e,r);var n=this.lastHelper=this.nameLookup("helpers",e,"helper");var a=["(","(helper = ",n," || ",i,")"];if(!this.options.strict){a[0]="(helper = ";a.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))}this.push(["(",a,s.paramsInit?["),(",s.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",s.callParams)," : helper))"])},invokePartial:function t(e,r,i){var s=[],n=this.setupParams(r,1,s);if(e){r=this.popStack();delete n.name}if(i){n.indent=JSON.stringify(i)}n.helpers="helpers";n.partials="partials";n.decorators="container.decorators";if(!e){s.unshift(this.nameLookup("partials",r,"partial"))}else{s.unshift(r)}if(this.options.compat){n.depths="depths"}n=this.objectLiteral(n);s.push(n);this.push(this.source.functionCall("container.invokePartial","",s))},assignToHash:function t(e){var r=this.popStack(),i=undefined,s=undefined,n=undefined;if(this.trackIds){n=this.popStack()}if(this.stringParams){s=this.popStack();i=this.popStack()}var a=this.hash;if(i){a.contexts[e]=i}if(s){a.types[e]=s}if(n){a.ids[e]=n}a.values[e]=r},pushId:function t(e,r,i){if(e==="BlockParam"){this.pushStackLiteral("blockParams["+r[0]+"].path["+r[1]+"]"+(i?" + "+JSON.stringify("."+i):""))}else if(e==="PathExpression"){this.pushString(r)}else if(e==="SubExpression"){this.pushStackLiteral("true")}else{this.pushStackLiteral("null")}},compiler:h,compileChildren:function t(e,r){var i=e.children,s=undefined,n=undefined;for(var a=0,o=i.length;a<o;a++){s=i[a];n=new this.compiler;var u=this.matchExistingProgram(s);if(u==null){this.context.programs.push("");var l=this.context.programs.length;s.index=l;s.name="program"+l;this.context.programs[l]=n.compile(s,r,this.context,!this.precompile);this.context.decorators[l]=n.decorators;this.context.environments[l]=s;this.useDepths=this.useDepths||n.useDepths;this.useBlockParams=this.useBlockParams||n.useBlockParams;s.useDepths=this.useDepths;s.useBlockParams=this.useBlockParams}else{s.index=u.index;s.name="program"+u.index;this.useDepths=this.useDepths||u.useDepths;this.useBlockParams=this.useBlockParams||u.useBlockParams}}},matchExistingProgram:function t(e){for(var r=0,i=this.context.environments.length;r<i;r++){var s=this.context.environments[r];if(s&&s.equals(e)){return s}}},programExpression:function t(e){var r=this.environment.children[e],i=[r.index,"data",r.blockParams];if(this.useBlockParams||this.useDepths){i.push("blockParams")}if(this.useDepths){i.push("depths")}return"container.program("+i.join(", ")+")"},useRegister:function t(e){if(!this.registers[e]){this.registers[e]=true;this.registers.list.push(e)}},push:function t(e){if(!(e instanceof c)){e=this.source.wrap(e)}this.inlineStack.push(e);return e},pushStackLiteral:function t(e){this.push(new c(e))},pushSource:function t(e){if(this.pendingContent){this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation));this.pendingContent=undefined}if(e){this.source.push(e)}},replaceStack:function t(e){var r=["("],i=undefined,s=undefined,n=undefined;if(!this.isInline()){throw new a["default"]("replaceStack on non-inline")}var o=this.popStack(true);if(o instanceof c){i=[o.value];r=["(",i];n=true}else{s=true;var u=this.incrStack();r=["((",this.push(u)," = ",o,")"];i=this.topStack()}var l=e.call(this,i);if(!n){this.popStack()}if(s){this.stackSlot--}this.push(r.concat(l,")"))},incrStack:function t(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)}return this.topStackName()},topStackName:function t(){return"stack"+this.stackSlot},flushInline:function t(){var e=this.inlineStack;this.inlineStack=[];for(var r=0,i=e.length;r<i;r++){var s=e[r];if(s instanceof c){this.compileStack.push(s)}else{var n=this.incrStack();this.pushSource([n," = ",s,";"]);this.compileStack.push(n)}}},isInline:function t(){return this.inlineStack.length},popStack:function t(e){var r=this.isInline(),i=(r?this.inlineStack:this.compileStack).pop();if(!e&&i instanceof c){return i.value}else{if(!r){if(!this.stackSlot){throw new a["default"]("Invalid stack pop")}this.stackSlot--}return i}},topStack:function t(){var e=this.isInline()?this.inlineStack:this.compileStack,r=e[e.length-1];if(r instanceof c){return r.value}else{return r}},contextName:function t(e){if(this.useDepths&&e){return"depths["+e+"]"}else{return"depth"+e}},quotedString:function t(e){return this.source.quotedString(e)},objectLiteral:function t(e){return this.source.objectLiteral(e)},aliasable:function t(e){var r=this.aliases[e];if(r){r.referenceCount++;return r}r=this.aliases[e]=this.source.wrap(e);r.aliasable=true;r.referenceCount=1;return r},setupHelper:function t(e,r,i){var s=[],n=this.setupHelperArgs(r,e,s,i);var a=this.nameLookup("helpers",r,"helper"),o=this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : (container.nullContext || {})");return{params:s,paramsInit:n,name:a,callParams:[o].concat(s)}},setupParams:function t(e,r,i){var s={},n=[],a=[],o=[],u=!i,l=undefined;if(u){i=[]}s.name=this.quotedString(e);s.hash=this.popStack();if(this.trackIds){s.hashIds=this.popStack()}if(this.stringParams){s.hashTypes=this.popStack();s.hashContexts=this.popStack()}var c=this.popStack(),h=this.popStack();if(h||c){s.fn=h||"container.noop";s.inverse=c||"container.noop"}var p=r;while(p--){l=this.popStack();i[p]=l;if(this.trackIds){o[p]=this.popStack()}if(this.stringParams){a[p]=this.popStack();n[p]=this.popStack()}}if(u){s.args=this.source.generateArray(i)}if(this.trackIds){s.ids=this.source.generateArray(o)}if(this.stringParams){s.types=this.source.generateArray(a);s.contexts=this.source.generateArray(n)}if(this.options.data){s.data="data"}if(this.useBlockParams){s.blockParams="blockParams"}return s},setupHelperArgs:function t(e,r,i,s){var n=this.setupParams(e,r,i);n=this.objectLiteral(n);if(s){this.useRegister("options");i.push("options");return["options=",n]}else if(i){i.push(n);return""}else{return n}}};(function(){var t=("break else new var"+" case finally return void"+" catch for switch while"+" continue function this with"+" default if throw"+" delete in try"+" do instanceof typeof"+" abstract enum int short"+" boolean export interface static"+" byte extends long super"+" char final native synchronized"+" class float package throws"+" const goto private transient"+" debugger implements protected volatile"+" double import public let yield await"+" null true false").split(" ");var e=h.RESERVED_WORDS={};for(var r=0,i=t.length;r<i;r++){e[t[r]]=true}})();h.isValidJavaScriptVariableName=function(t){return!h.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)};function p(t,e,r,i){var s=e.popStack(),n=0,a=r.length;if(t){a--}for(;n<a;n++){s=e.nameLookup(s,r[n],i)}if(t){return[e.aliasable("container.strict"),"(",s,", ",e.quotedString(r[n]),")"]}else{return s}}e["default"]=h;t.exports=e["default"]},function(t,e,r){"use strict";e.__esModule=true;var i=r(5);var s=undefined;try{if(false){var n=require("source-map");s=n.SourceNode}}catch(t){}if(!s){s=function(t,e,r,i){this.src="";if(i){this.add(i)}};s.prototype={add:function t(e){if(i.isArray(e)){e=e.join("")}this.src+=e},prepend:function t(e){if(i.isArray(e)){e=e.join("")}this.src=e+this.src},toStringWithSourceMap:function t(){return{code:this.toString()}},toString:function t(){return this.src}}}function a(t,e,r){if(i.isArray(t)){var s=[];for(var n=0,a=t.length;n<a;n++){s.push(e.wrap(t[n],r))}return s}else if(typeof t==="boolean"||typeof t==="number"){return t+""}return t}function o(t){this.srcFile=t;this.source=[]}o.prototype={isEmpty:function t(){return!this.source.length},prepend:function t(e,r){this.source.unshift(this.wrap(e,r))},push:function t(e,r){this.source.push(this.wrap(e,r))},merge:function t(){var e=this.empty();this.each((function(t){e.add(["  ",t,"\n"])}));return e},each:function t(e){for(var r=0,i=this.source.length;r<i;r++){e(this.source[r])}},empty:function t(){var e=this.currentLocation||{start:{}};return new s(e.start.line,e.start.column,this.srcFile)},wrap:function t(e){var r=arguments.length<=1||arguments[1]===undefined?this.currentLocation||{start:{}}:arguments[1];if(e instanceof s){return e}e=a(e,this,r);return new s(r.start.line,r.start.column,this.srcFile,e)},functionCall:function t(e,r,i){i=this.generateList(i);return this.wrap([e,r?"."+r+"(":"(",i,")"])},quotedString:function t(e){return'"'+(e+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function t(e){var r=[];for(var i in e){if(e.hasOwnProperty(i)){var s=a(e[i],this);if(s!=="undefined"){r.push([this.quotedString(i),":",s])}}}var n=this.generateList(r);n.prepend("{");n.add("}");return n},generateList:function t(e){var r=this.empty();for(var i=0,s=e.length;i<s;i++){if(i){r.add(",")}r.add(a(e[i],this))}return r},generateArray:function t(e){var r=this.generateList(e);r.prepend("[");r.add("]");return r}};e["default"]=o;t.exports=e["default"]}])}));
(function(e){e.gritter={};e.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3};e.gritter.add=function(e){try{return t.add(e||{})}catch(e){}};e.gritter.remove=function(e,i){t.removeSpecific(e,i||{})};e.gritter.removeAll=function(e){t.stop(e||{})};var t={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close"href="#" tabindex="1">hide</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(i){if(typeof i=="string"){i={text:i}}if(i.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var r=i.title,s=i.text,n=i.image||"",o=i.sticky||false,a=i.class_name||e.gritter.options.class_name,_=e.gritter.options.position,c=i.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,p=this._tpl_item;e(["before_open","after_open","before_close","after_close"]).each((function(r,s){t["_"+s+"_"+f]=e.isFunction(i[s])?i[s]:function(){}}));this._custom_timer=0;if(c){this._custom_timer=c}var l=n!=""?'<img src="'+n+'" class="gritter-image" />':"",u=n!=""?"gritter-with-image":"gritter-without-image";if(r){r=this._str_replace("[[title]]",r,this._tpl_title)}else{r=""}p=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[r,s,this._tpl_close,l,this._item_count,u,a],p);if(this["_before_open_"+f]()===false){return false}e("#gritter-notice-wrapper").addClass(_).append(p);var m=e("#gritter-item-"+this._item_count);m.fadeIn(this.fade_in_speed,(function(){t["_after_open_"+f](e(this))}));if(!o){this._setFadeTimer(m,f)}e(m).bind("mouseenter mouseleave",(function(i){if(i.type=="mouseenter"){if(!o){t._restoreItemIfFading(e(this),f)}}else{if(!o){t._setFadeTimer(e(this),f)}}t._hoverState(e(this),i.type)}));e(m).find(".gritter-close").click((function(){t.removeSpecific(f,{},null,true);return false}));return f},_countRemoveWrapper:function(t,i,r){i.remove();this["_after_close_"+t](i,r);if(e(".gritter-item-wrapper").length==0){e("#gritter-notice-wrapper").remove()}},_fade:function(e,i,r,s){r=r||{};var n=typeof r.fade!="undefined"?r.fade:true,o=r.speed||this.fade_out_speed,a=s;this["_before_close_"+i](e,a);if(s){e.unbind("mouseenter mouseleave")}if(n){e.animate({opacity:0},o,(function(){e.animate({height:0},300,(function(){t._countRemoveWrapper(i,e,a)}))}))}else{this._countRemoveWrapper(i,e)}},_hoverState:function(e,t){if(t=="mouseenter"){e.addClass("hover");e.find(".gritter-close").show()}else{e.removeClass("hover");e.find(".gritter-close").hide()}},removeSpecific:function(t,i,r,s){if(!r){r=e("#gritter-item-"+t)}this._fade(r,t,i||{},s)},_restoreItemIfFading:function(e,t){window.clearTimeout(this["_int_id_"+t]);e.stop().css({opacity:"",height:""})},_runSetup:function(){for(var t in e.gritter.options){this[t]=e.gritter.options[t]}this._is_setup=1},_setFadeTimer:function(e,i){var r=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+i]=window.setTimeout((function(){t._fade(e,i)}),r)},stop:function(t){var i=e.isFunction(t.before_close)?t.before_close:function(){};var r=e.isFunction(t.after_close)?t.after_close:function(){};var s=e("#gritter-notice-wrapper");i(s);s.fadeOut((function(){e(this).remove();r()}))},_str_replace:function(e,t,i,r){var s=0,n=0,o="",a="",_=0,c=0,f=[].concat(e),p=[].concat(t),l=i,u=p instanceof Array,m=l instanceof Array;l=[].concat(l);if(r){this.window[r]=0}for(s=0,_=l.length;s<_;s++){if(l[s]===""){continue}for(n=0,c=f.length;n<c;n++){o=l[s]+"";a=u?p[n]!==undefined?p[n]:"":p[0];l[s]=o.split(f[n]).join(a);if(r&&l[s]!==o){this.window[r]+=(o.length-l[s].length)/f[n].length}}}return m?l:l[0]},_verifyWrapper:function(){if(e("#gritter-notice-wrapper").length==0){e("body").append(this._tpl_wrap)}}}})(jQuery);
(function n(t,e,r){function i(f,u){if(!e[f]){if(!t[f]){var c=typeof require=="function"&&require;if(!u&&c)return c(f,!0);if(o)return o(f,!0);var a=new Error("Cannot find module '"+f+"'");throw a.code="MODULE_NOT_FOUND",a}var s=e[f]={exports:{}};t[f][0].call(s.exports,(function(n){var e=t[f][1][n];return i(e?e:n)}),s,s.exports,n,t,e,r)}return e[f].exports}var o=typeof require=="function"&&require;for(var f=0;f<r.length;f++)i(r[f]);return i})({1:[function(n,t,e){"use strict";var r=n("asap/raw");function i(){}var o=null;var f={};function u(n){try{return n.then}catch(n){o=n;return f}}function c(n,t){try{return n(t)}catch(n){o=n;return f}}function a(n,t,e){try{n(t,e)}catch(n){o=n;return f}}t.exports=s;function s(n){if(typeof this!=="object"){throw new TypeError("Promises must be constructed via new")}if(typeof n!=="function"){throw new TypeError("not a function")}this._37=0;this._12=null;this._59=[];if(n===i)return;w(n,this)}s._99=i;s.prototype.then=function(n,t){if(this.constructor!==s){return l(this,n,t)}var e=new s(i);h(this,new d(n,t,e));return e};function l(n,t,e){return new n.constructor((function(r,o){var f=new s(i);f.then(r,o);h(n,new d(t,e,f))}))}function h(n,t){while(n._37===3){n=n._12}if(n._37===0){n._59.push(t);return}r((function(){var e=n._37===1?t.onFulfilled:t.onRejected;if(e===null){if(n._37===1){p(t.promise,n._12)}else{v(t.promise,n._12)}return}var r=c(e,n._12);if(r===f){v(t.promise,o)}else{p(t.promise,r)}}))}function p(n,t){if(t===n){return v(n,new TypeError("A promise cannot be resolved with itself."))}if(t&&(typeof t==="object"||typeof t==="function")){var e=u(t);if(e===f){return v(n,o)}if(e===n.then&&t instanceof s){n._37=3;n._12=t;y(n);return}else if(typeof e==="function"){w(e.bind(t),n);return}}n._37=1;n._12=t;y(n)}function v(n,t){n._37=2;n._12=t;y(n)}function y(n){for(var t=0;t<n._59.length;t++){h(n,n._59[t])}n._59=null}function d(n,t,e){this.onFulfilled=typeof n==="function"?n:null;this.onRejected=typeof t==="function"?t:null;this.promise=e}function w(n,t){var e=false;var r=a(n,(function(n){if(e)return;e=true;p(t,n)}),(function(n){if(e)return;e=true;v(t,n)}));if(!e&&r===f){e=true;v(t,o)}}},{"asap/raw":4}],2:[function(n,t,e){"use strict";var r=n("./core.js");t.exports=r;var i=s(true);var o=s(false);var f=s(null);var u=s(undefined);var c=s(0);var a=s("");function s(n){var t=new r(r._99);t._37=1;t._12=n;return t}r.resolve=function(n){if(n instanceof r)return n;if(n===null)return f;if(n===undefined)return u;if(n===true)return i;if(n===false)return o;if(n===0)return c;if(n==="")return a;if(typeof n==="object"||typeof n==="function"){try{var t=n.then;if(typeof t==="function"){return new r(t.bind(n))}}catch(n){return new r((function(t,e){e(n)}))}}return s(n)};r.all=function(n){var t=Array.prototype.slice.call(n);return new r((function(n,e){if(t.length===0)return n([]);var i=t.length;function o(f,u){if(u&&(typeof u==="object"||typeof u==="function")){if(u instanceof r&&u.then===r.prototype.then){while(u._37===3){u=u._12}if(u._37===1)return o(f,u._12);if(u._37===2)e(u._12);u.then((function(n){o(f,n)}),e);return}else{var c=u.then;if(typeof c==="function"){var a=new r(c.bind(u));a.then((function(n){o(f,n)}),e);return}}}t[f]=u;if(--i===0){n(t)}}for(var f=0;f<t.length;f++){o(f,t[f])}}))};r.reject=function(n){return new r((function(t,e){e(n)}))};r.race=function(n){return new r((function(t,e){n.forEach((function(n){r.resolve(n).then(t,e)}))}))};r.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":1}],3:[function(n,t,e){"use strict";var r=n("./raw");var i=[];var o=[];var f=r.makeRequestCallFromTimer(u);function u(){if(o.length){throw o.shift()}}t.exports=c;function c(n){var t;if(i.length){t=i.pop()}else{t=new a}t.task=n;r(t)}function a(){this.task=null}a.prototype.call=function(){try{this.task.call()}catch(n){if(c.onerror){c.onerror(n)}else{o.push(n);f()}}finally{this.task=null;i[i.length]=this}}},{"./raw":4}],4:[function(n,t,e){(function(n){"use strict";t.exports=e;function e(n){if(!r.length){o();i=true}r[r.length]=n}var r=[];var i=false;var o;var f=0;var u=1024;function c(){while(f<r.length){var n=f;f=f+1;r[n].call();if(f>u){for(var t=0,e=r.length-f;t<e;t++){r[t]=r[t+f]}r.length-=f;f=0}}r.length=0;f=0;i=false}var a=n.MutationObserver||n.WebKitMutationObserver;if(typeof a==="function"){o=s(c)}else{o=l(c)}e.requestFlush=o;function s(n){var t=1;var e=new a(n);var r=document.createTextNode("");e.observe(r,{characterData:true});return function n(){t=-t;r.data=t}}function l(n){return function t(){var e,r;if(typeof setTimeout!="undefined"){e=setTimeout(i,0)}if(typeof setInterval!="undefined"){r=setInterval(i,50)}function i(){if(e){clearTimeout(e)}if(r){clearInterval(r)}n()}}}e.makeRequestCallFromTimer=l}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],5:[function(n,t,e){if(typeof Promise.prototype.done!=="function"){Promise.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,(function(n){setTimeout((function(){throw n}),0)}))}}},{}],6:[function(n,t,e){var r=n("asap");if(typeof Promise==="undefined"){Promise=n("./lib/core.js");n("./lib/es6-extensions.js")}n("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);
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
      if (canvasSupported && (navigator.userAgent.search(/Chrome/) > -1 || navigator.userAgent.search(/Firefox/) > -1 || navigator.userAgent.search(/Safari/) > -1)) {
        return true;
      } else {
        return false;
      }
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
      webCam.pause();
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
    let ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)) || (/Android/i.test(ua)));
  };

  window.br.isMobileDevice = function() {
    let ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)) || (/Android/i.test(ua)));
  };

  window.br.isiOS = function() {
    let ua = navigator.userAgent;
    return ((/iPad/i.test(ua)) || (/iPhone/i.test(ua)));
  };

  window.br.isiPad = function() {
    let ua = navigator.userAgent;
    return (/iPad/i.test(ua));
  };

  window.br.isiPhone = function() {
    let ua = navigator.userAgent;
    return (/iPhone/i.test(ua));
  };

  window.br.isAndroid = function() {
    let ua = navigator.userAgent;
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

  function openUrl(url, options) {

    options = options || { };

    let s;

    if (options.urlTitle) {
      s = '<p>Click below to open link manually</p>'
        + '<p><a target="' + (options.target ? options.target : '_blank') + '" class="action-open-link" href="' + url + '" style="word-wrap: break-word">' + options.urlTitle + '</a></p>';
    } else {
      s = '<p>Click a <a target="' + (options.target ? options.target : '_blank') + '" class="action-open-link" href="' + url + '" style="word-wrap: break-word">here</a> to open link manually</p>';
    }

    let dialog = br.inform( 'You browser is currently blocking popups'
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
      let a = document.createElement('a');
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
      let w, h;
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
      let left = (screen.width) ? (screen.width-w)/2 : 0;
      let settings = 'height='+h+',width='+w+',top=20,left='+left+',menubar=0,scrollbars=1,resizable=1';
      let win = window.open(url, options.target, settings);
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
          message: event.message
        , data: null
        , filename: event.filename
        , lineno: event.lineno
        , colno: event.colno
        , stack: event.error ? (event.error.stack || event.error.backtrace || event.error.stacktrace) : null
        , location: document.location.toString()
      };

      let result = false;

      try {
        result = window.br.events.trigger('error', data);
      } catch (error) {

      }

      if (result) {
        event.preventDefault();
      }
    });

    window.addEventListener('unhandledrejection', function(event) {
      let data = {
          message: typeof event.reason == 'string' ? event.reason : null
        , data: typeof event.reason == 'string' ?  null : event.reason
        , filename: null
        , lineno: null
        , colno: null
        , stack: null
        , location: document.location.toString()
      };

      let result = false;

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

    let result = '';

    prefix = prefix ? prefix : '';
    for(let name in obj) {
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

          for(let paramName in request) {
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
                     let result, errorMessage;
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

          for(let paramName in request) {
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

          for(let paramName in request) {
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
                                     , headers: { 'X-Csrf-Token': br.request.csrfToken }
                                     , success: function(response) {
                                         try {
                                           _this.ajaxRequest = null;
                                           if (br.isArray(response)) {
                                             for(let i = 0, length = response.length; i < length; i++) {
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

        for(let paramName in request) {
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
      theadColsCopy = $(theadCopy).find('tr:first th');
      tbodyColsCopy = $(tbodyCopy).find('tr:first td');

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

        let headerCols = table.find('thead tr:first th');

        headerCols.each(function(idx) {
          let w = widths[idx].h;
          debugValue(this, w);
          this.style.boxSizing = 'border-box';
          this.style.minWidth = w + 'px';
          this.style.maxWidth = w + 'px';
        });

        let bodyCols   = table.find('tbody tr:first td');

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

    _this.setStored = function(name, value) {
      let stored = br.storage.get(_this.storageTag + 'Stored');
      stored = stored || Object.create({});
      stored[name] = value;
      br.storage.set(_this.storageTag + 'Stored', stored);
    };

    _this.getStored = function(name, defaultValue) {
      let stored = br.storage.get(_this.storageTag + 'Stored');
      let result = stored ? stored[name] : stored;
      return br.isEmpty(result) ? (br.isNull(defaultValue) ? result : defaultValue) : result;
    };

    _this.resetStored = function(stopPropagation) {
      br.storage.remove(_this.storageTag + 'Stored');
      if (!stopPropagation) {
        _this.events.trigger('resetStored');
        br.events.trigger('resetStored');
      }
    };

    _this.setFilter = function(name, value) {
      let filter = br.storage.get(_this.storageTag + 'Filter');
      filter = filter || Object.create({});
      filter[name] = value;
      br.storage.set(_this.storageTag + 'Filter', filter);
    };

    _this.getFilter = function(name, defaultValue) {
      let filter = br.storage.get(_this.storageTag + 'Filter');
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
      let s =  _this.templates.footer(data);
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

    _this.renderRow = function(data, asString) {
      data = _this.events.trigger('renderRow', data) || data;
      let s = _this.templates.row(data).trim();
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

    _this.insertDataRowAfter = function(row, selector) {
      let tableRow = _this.renderRow(row);
      if (tableRow) {
        $(tableRow).insertAfter(selector);
      }
      return tableRow;
    };

    _this.addDataRow = function(row, disableEvents) {
      let tableRow = _this.renderRow(row);
      if (tableRow) {
        _this.events.triggerBefore('insert', row, tableRow);
        _this.events.trigger('insert', row, tableRow);
        if (_this.options.appendInInsert) {
          _this.append(tableRow);
          if (_this.options.scrollToInsertedRow) {
            tableRow[0].scrollIntoView();
          }
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

    _this.hasRow = function(rowid) {
      let row = $(_this.selector).find('[data-rowid=' + rowid + ']');
      return (row.length > 0);
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
      if (br.isObject(rowid)) {
        filter = rowid;
      } else {
        filter = { rowid: rowid };
      }
      _this.dataSource.select(filter, function(result, response) {
        if (!result || (response.length === 0)) {
          _this.removeRow(rowid);
          // if (!options.reloadOnlyRow) {
          //   _this.refresh(function(result, response) {
          //     if (typeof callback == 'function') {
          //       callback.call(_this, result, response, false);
          //     }
          //   });
          // }
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

    _this.removeRow = function(rowid, options) {
      let filter = '[data-rowid=' + rowid + ']';
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
      let filter = '[data-rowid=' + data.rowid + ']';
      options = options || Object.create({});
      options.refreshSelector = options.refreshSelector || _this.options.selectors.refreshRow;
      if (options.refreshSelector) {
        filter = options.refreshSelector + filter;
      }
      let existingRows = $(_this.selector).find(filter);
      if (existingRows.length > 0) {
        let replacementRow = _this.renderRow(data);
        if (replacementRow) {
          if (_this.options.storeDataRow) {
            replacementRow.data('data-row', data);
          }
          _this.events.triggerBefore('update', data);
          _this.events.trigger('update', data, existingRows);
          let resultingRows = [];
          existingRows.each(function() {
            let row = replacementRow.clone();
            $(this).before(row);
            resultingRows.push(row);
          });
          existingRows.remove();
          let resultingRowsJq = $(resultingRows).map(function() { return this.toArray(); });
          _this.events.triggerAfter('renderRow', data, resultingRowsJq);
          _this.events.triggerAfter('update', data, resultingRowsJq);
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

        _this.dataSource.after('insert', function(result, response) {
          if (result) {
            if (!disconnected) {
              if (_this.isEmpty()) {
                $(_this.selector).html(''); // to remove No-Data box
              }
              _this.addDataRow(response);
            }
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
          if (!disconnected) {
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
      let tableRow;
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
                tableRow = _this.renderHeader(data.headers[i]);
                if (tableRow) {
                  $(_this.options.selectors.header).append(tableRow);
                }
              }
            }
          }
          if (data.footers && (data.footers.length > 0)) {
            for (let i = 0, length = data.footers.length; i < length; i++) {
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
            if (data.rows.length > 0) {
              for (let i = 0, length = data.rows.length; i < length; i++) {
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

    function storageTag(c) {
      let result = _this.storageTag;
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
          br.setComboValue(_this.selector, value, true);
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
                _selector.find('option[value="' + val[k] +'"]').prop('selected', true).attr('selected', 'selected');
              }
            } else {
              _selector.find('option[value="' + val +'"]').prop('selected', true).attr('selected', 'selected');
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

    function moveHandler(e) {
      if (dragObject !== null) {
        let pageX = e.pageX || e.touches[0].pageX;
        let pageY = e.pageY || e.touches[0].pageY;
        let left = pageX - pos_x - ofs_x - document.body.scrollLeft;
        let top  = pageY - pos_y - ofs_y - document.body.scrollTop;

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
      let data = $(selector).data('brEditable-editable');
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
        let $this = $(this);
        let data = $this.data('brEditable-editable');
        if (!data) {
          $this.data('brEditable-editable', (data = new BrEditable(this, callback)));
        }
        data.click(e);
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

    let template = '<div class="br-modal-confirm modal ${options.cssClass}" role="dialog">';

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
                     <h3 class="modal-title">${title}</h3>
                     <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
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
      for(let inputName in buttons) {
        template += `<a href="javascript:;" class="btn btn-sm btn-default action-confirm-close" rel="${inputName}">&nbsp;${buttons[inputName]}&nbsp;</a>`;
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

    $(modal).on('hide.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.onHide) {
          options.onHide.call(this);
        }
        if (remove) {
          if (options.onCancel) {
            const button = 'cancel';
            const dontAsk = $('input[name=showDontAskMeAgain]', $(modal)).is(':checked');
            options.onCancel(button, dontAsk);
          }
          modal.remove();
        }
      }
    });

    $(modal).on('shown.bs.modal', function(event) {
      if ($(event.target).is(modal)) {
        if (options.defaultButton) {
          const btn = $(this).find('.modal-footer a.btn[rel=' + options.defaultButton + ']');
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
                     <h3 class="modal-title">${title}</h3>
                     <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
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

    const buttonTitle = options.buttonTitle || 'Dismiss';

    if ($('#br_modalInform').length > 0) {
      const currentMessage = $('#br_modalInform .modal-body').html();
      if (currentMessage.indexOf(message) == -1) {
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
                     <h3 class="modal-title">${title}</h3>
                     <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
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
                          <h3 class="modal-title">${title}</h3>
                          <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
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
                   <a href="javascript:;" class="btn btn-sm btn-primary action-confirm-close" rel="confirm" >Ok</a>
                   <a href="javascript:;" class="btn btn-sm btn-default btn-outline-secondary" data-dismiss="modal">&nbsp;${br.trn('Cancel')}&nbsp;</a>
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
          todayBtn: 'linked',
          clearBtn: true,
          multidate: false,
          autoclose: true,
          todayHighlight: true,
          orientation: 'top'
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
      const td1 = $($('td', $(a))[columnIndex]);
      const td2 = $($('td', $(b))[columnIndex]);
      const val1 = td1.remove('a').text().trim();
      const val2 = td2.remove('a').text().trim();
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

  window.br.setComboValue = function(selector, value, fromBrDataCombo) {

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
          if (!br.isEmpty(element.val())) {
            if (element.data('select2')) {
              if ((element.attr('multiple') != 'multiple')) {
                element.select2('val', element.val());
              }
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

    const tabbableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function disableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        const el = $(item);
        if (!el.closest(except).length) {
          const tabindex = el.attr('tabindex');
          if (tabindex) {
            el.attr('data-prev-tabindex', tabindex);
          }
          el.attr('tabindex', '-1');
        }
      });
    }

    function reEnableTabbingOnPage(except) {
      $.each($(tabbableElements), function (idx, item) {
        const el = $(item);
        if (!el.closest(except).length) {
          const prevTabindex = el.attr('data-prev-tabindex');
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
        let css = Object.create({
          top: detachedMenuHolder.offset().top + detachedMenuHolder.height()
        });
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
      const target = $(event.target);
      if (target.hasClass('br-dropdown-detachable')) {
        const alignRight = target.hasClass('br-dropdown-detachable-right-aligned');
        let detachedMenu = target.data('detachedMenu');
        let css = Object.create({
          position: 'absolute',
          top: target.offset().top + target.height()
        });
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
          let menu = $(target.find('.dropdown-menu'));
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
      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html(message).show();
      } else {
        br.growlError(message);
      }
    };

    _this.editorConfigure = function(isCopy) {
      let s = '';
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
      _this.inputsContainer.find('input.data-field[type=checkbox]').each(function() {
        $(this).prop('checked', !!$(this).attr('data-default-checked'));
      });
    };

    _this.fillControls = function(data) {
      if (data) {
        for(var i in data) {
          _this.inputsContainer.find('div.data-field[data-toggle=buttons-radio][name=' + i + '],input.data-field[name=' + i + '],select.data-field[name=' + i + '],textarea.data-field[name=' + i + ']').each(function() {
            let input = $(this);
            if (input.attr('data-toggle') == 'buttons-radio') {
              let val = br.isNull(data[i]) ? '' : data[i];
              input.find('button[value="' + val + '"]').addClass('active');
            } else
            if (input.attr('type') == 'checkbox') {
              input.prop('checked', br.toInt(data[i]) == 1);
            } else
            if (input.attr('type') == 'radio') {
              input.prop('checked', br.toInt(data[i]) == br.toInt(input.val()));
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
                })(input, ckeditorInstance, data[i]);
              } else {
                let dataComboInstance = input.data('BrDataCombo');
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
      let defaultValues = null;
      if (br.isNumber(rowid)) {
        editorRowid = rowid;
      } else
      if (br.isObject(rowid)) {
        defaultValues = rowid;
      }
      _this.inputsContainer.find('select.data-field').each(function() {
        br.setComboValue($(this), '');
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
    let pageNavIsSlider = false;
    let pageSizeIsSlider = false;
    let pagerInitialized = false;

    _this.options = options || Object.create({});
    _this.options.autoLoad = _this.options.autoLoad || false;
    _this.options.defaults = _this.options.defaults || {};
    _this.options.defaults.filtersHidden = _this.options.defaults.filtersHidden || false;
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

    _this.scrollContainer = function() {
      if (_this.options.selectors.container !== '') {
        if (_this.options.selectors.scrollContainer !== '') {
          if (_this.options.selectors.scrollContainer.indexOf('#') === 0) {
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

    _this.options.selectors.dataTable = findNode(_this.options.selectors.dataTable || '.data-table');
    _this.options.selectors.editForm = _this.options.selectors.editForm || '';

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
        br.growlError(error);
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
      return _this.dataGrid.setFilter(name, defaultValue);
    };

    _this.resetFilters = function(stopPropagation) {
      br.setComboValue(findNode('input.data-filter'), '');
      br.setComboValue(findNode('select.data-filter'), '');
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

    _this.hasRow = function(rowid) {
      return _this.dataGrid.hasRow(rowid);
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
        if ($(findNode('input.data-filter[name=keyword]')).length > 0) {
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
        showFiltersDesc();
      });

      // search

      br.modified(findNode('input.data-filter[name=keyword]'), function() {
        const _val = $(this).val();
        $(findNode('input.data-filter[name=keyword]')).each(function() {
          if ($(this).val() != _val) {
            $(this).val(_val);
          }
        });
        if ($(this).hasClass('instant-search')) {
          _this.refreshDeferred();
        }
      });

      br.modified(findNode('input.data-filter') + ',' + findNode('select.data-filter'), function() {
        _this.resetPager();
      });

      br.attachDatePickers();

      if (_this.options.features.editor) {
        let editorOptions = _this.options.editor || { noun: _this.options.noun };
        _this.editor = br.dataEditor(_this.options.selectors.editForm, _this.dataSource, editorOptions);
        _this.editor.events.connectTo(_this.events);

        $(findNode('.action-create')).show();

        $(document).on('click', selActionCRUD, function() {
          const isCopy = $(this).hasClass('action-copy');
          const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
          _this.editor.show(rowid, isCopy);
        });
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

      $(findNode('.action-refresh')).click(function() {
        _this.refresh();
      });

      $(findNode('.action-clear-one-filter')).click(function() {
        $(findNode('.data-filter[name=' + $(this).attr('rel') + ']')).val('');
        $(findNode('.data-filter[name=' + $(this).attr('rel') + ']')).trigger('change');
        _this.refresh();
      });

      $(findNode('input.data-filter[name=keyword]')).val(_this.getFilter('keyword'));

      function showFiltersDesc() {

        if ($(findNode('.filters-panel')).is(':visible')) {
          $(findNode('.action-show-hide-filters')).find('span').text('Hide filters');
          $(findNode('.filter-description')).text('');
        } else {
          $(findNode('.action-show-hide-filters')).find('span').text('Show filters');
          let s = '';
          $(findNode('.data-filter')).each(function() {
            const val = $(this).val();
            const title = $(this).attr('title');
            if (val && title) {
              s = s + '/ <strong>' + title + '</strong> ';
              if ($(this).is('select')) {
                s = s + $(this).find('option[value=' + val + ']').text() + ' ';
              } else {
                s = s + val + ' ';
              }

            }
          });
          $(findNode('.filter-description')).html(s);
        }

      }

      function setupFilters(initial) {

        function showHideFilters(initial) {

          if ($(findNode('.filters-panel')).is(':visible')) {
            _this.setStored('filters-hidden', true);
            $(findNode('.filters-panel')).css('display', 'none');
            showFiltersDesc();
            _this.events.trigger('hideFilters');
          } else {
            _this.setStored('filters-hidden', false);
            $(findNode('.filters-panel')).show();
            showFiltersDesc();
            _this.events.trigger('showFilters');
          }

          if (_this.dataGrid.table) {
            _this.dataGrid.table.update();
          }

        }

        $(findNode('.action-show-hide-filters')).on('click', function() {
          showHideFilters();
        });

        $(findNode('.action-reset-filters')).on('click', function () {
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

        const docsHeight = $(_this.options.selectors.dataTable).height();
        const docsContainerHeight = $(_this.scrollContainer()).height();
        const scrollTop = $(_this.scrollContainer()).scrollTop();

        if (scrollTop + docsContainerHeight > docsHeight) {
          _this.dataGrid.loadMore();
        }

      }

      if (_this.options.autoLoad) {
        $(_this.scrollContainer()).on('scroll', function() {
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
          $(findNode('.selection-stat')).hide();
          $(findNode('.action-clear-selection')).hide();
          $(findNode('.action-delete-selected')).hide();
        }
      });

      return this;
    };

    function initPager() {

      if (pagerInitialized) {
        return;
      }

      if ($.fn.slider) {
        $(findNode('.pager-page-slider')).each(function() {
          pageNavIsSlider = true;
          $(this).slider({
              min: 1
            , value: 1
            , change: function(event, ui) {
                const value = $(findNode('.pager-page-slider')).slider('option', 'value');
                if (value > 0) {
                  const newSkip = _this.limit * (value - 1);
                  if (newSkip != _this.skip) {
                    _this.skip = _this.limit * (value - 1);
                    _this.setStored('pager_PageNo', _this.skip);
                    _this.refresh({}, null, true);
                  }
                }
              }
          });
        });

        $(findNode('.pager-page-size-slider')).each(function() {
          pageSizeIsSlider = true;
          $(this).slider({
              min: _this.defaultLimit
            , value: _this.limit
            , max: _this.defaultLimit * 20
            , step: _this.defaultLimit
            , change: function(event, ui) {
                _this.limit = $(findNode('.pager-page-size-slider')).slider('option', 'value');
                _this.setStored('pager_PageSize', _this.limit);
                $(findNode('.pager-page-slider')).slider('option', 'value', 1);
                $(findNode('.pager-page-slider')).slider('option', 'max', Math.ceil(_this.recordsAmount / _this.limit));
                _this.refresh({}, null, true);
              }
          });
        });
      }

      pagerInitialized = true;

    }

    function internalUpdatePager() {

      initPager();

      const totalPages = Math.ceil(_this.recordsAmount / _this.limit);
      const currentPage = Math.ceil(_this.skip / _this.limit) + 1;

      if (pageNavIsSlider) {
        $(findNode('.pager-page-slider')).slider('option', 'max', totalPages);
        $(findNode('.pager-page-slider')).slider('option', 'value', currentPage);
      } else {
        const $pc = $(findNode('.pager-page-navigation'));
        $pc.html('');
        let s = '';
        let f1 = false;
        let f2 = false;
        let r = 5;
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
      }

      if (pageSizeIsSlider) {

      } else {
        const $pc = $(findNode('.pager-page-size-navigation'));
        $pc.html('');
        let s = '';
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

    _this.restoreSelection = function(selection) {
      if (!selection) {
        selection = _this.selection.get();
      }
      for(let i = 0, length = selection.length; i < length; i++) {
        _this.selectRow(selection[i], true);
      }
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.clearSelection = function() {
      _this.selection.clear();
      $(findNode('.action-select-row')).prop('checked', false);
      $(findNode('tr.row-selected')).removeClass('row-selected');
      $(findNode('.action-select-all')).prop('checked', false);
      _this.events.trigger('selectionChanged', _this.selection.get().length);
    };

    _this.getSelection = function() {
      return _this.selection.get();
    };

    _this.setSelection = function(selection) {
      if (selection) {
        for(let i = 0, length = selection.length; i < length; i++) {
          _this.selectRow(selection[i], true);
          _this.selection.append(selection[i]);
        }
        _this.events.trigger('selectionChanged', _this.selection.get().length);
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

  const invokerTemplate = br.compile('<div class="dropdown br-ajax-dropdown"><span href="javascript:;" class="br-ex-action-change-menu-menu" style="cursor:pointer;"><span class="br-ex-current-value">{{&value}}</span> <b class="caret"></b></a></div>');
  const menuItemTemplateStr = '<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>';
  const menuItemTemplate = br.compile('<li><a class="br-ex-action-change-menu" href="javascript:;" data-value="{{id}}">{{name}}</a></li>');
  const dropDownTemplate = '<div class="dropdown br-ajax-dropdown" style="position:absolute;z-index:1050;"><a style="display:none;" href="javascript:;" role="button" data-toggle="dropdown" class="dropdown-toggle br-ex-action-change-menu-menu" style="cursor:pointer;"><span>{{value}}</span> <b class="caret"></b></a><ul class="dropdown-menu" role="menu" style="overflow:auto;"></ul></div>';

  function showDropDownMenu(invoker, response, rowid, menuElement, dataSource, fieldName, options) {
    const dropDown = $(dropDownTemplate);
    const dropDownList = dropDown.find('ul');
    const dropDownMenu = dropDown.find('.br-ex-action-change-menu-menu');
    dropDown.on('click', '.br-ex-action-change-menu', function() {
      const value = $(this).attr('data-value');
      let data = Object.create({});
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

  function handleClick(el, invoker, choicesDataSource, dataSource, fieldName, options) {
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

  function setupControl(el, doClick, choicesDataSource, dataSource, fieldName, options) {
    const $this = el;
    if ($this.data('BrExChangeMenu')) {

    } else {
      $this.data('BrExChangeMenu', true);
      let value = $this.text().trim();
      if ((value.length === 0) || (value == '(click to change)')) {
        value = '<span style="color:#AAA;">(click to change)</span>';
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

  window.br = window.br || Object.create({});

  function BrGoogleMap(selector, options) {

    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) { this.events.before(event, callback); };
    _this.on     = function(event, callback) { this.events.on(event, callback); };
    _this.after  = function(event, callback) { this.events.after(event, callback); };

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

    _this.mapOptions = { zoom: options.zoom
                       , maxZoom: options.maxZoom
                       , center: options.mapCenter
                       , mapTypeId: options.mapType
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
    _this.markers = { };
    _this.polygons = { };
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
        _this.weatherLayer = new google.maps.weather.WeatherLayer({
          //temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        _this.weatherLayer.setMap(_this.map);
      } else
      if (!show && _this.weatherVisible()) {
        _this.weatherLayer.setMap(null);
        _this.weatherLayer = null;
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

    _this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    _this.iterateMarkers = function(callback) {
      let stop = false;
      for(let tag in _this.markers) {
        for (let i = _this.markers[tag].length-1; i >= 0; i--) {
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

    _this.removeMarkers = function(tag) {
      if (tag) {
        internalRemoveMarkers(tag);
      } else {
        for(tag in _this.markers) {
          internalRemoveMarkers(tag);
        }
      }
    };

    _this.addMarker = function(lat, lng, params, tag, custom) {
      let markerParams = Object.create({});
      markerParams.icon = params.icon || null;
      markerParams.draggable = params.draggable || false;
      let latLng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({ position: latLng
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

    _this.getMarkersByTag = function(tag) {
      return _this.markers[tag] || [];
    };

    _this.getMarkersCount = function() {
      let result = 0;
      for(let tag in _this.markers) {
        result += _this.markers[tag].length;
      }
      return result;
    };

    function internalRemovePolygons(tag) {
      if (_this.polygons[tag]) {
        for (let i = _this.polygons[tag].length-1; i >= 0; i--) {
          _this.polygons[tag][i].setMap(null);
          _this.polygons[tag].splice(i, 1);
        }
      }
    }

    _this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    _this.iteratePolygons = function(callback) {
      let stop = false;
      for(let tag in _this.polygons) {
        for (let i = _this.polygons[tag].length-1; i >= 0; i--) {
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

    _this.removePolygons = function(tag) {
      if (tag) {
        internalRemovePolygons(tag);
      } else {
        for(tag in _this.polygons) {
          internalRemovePolygons(tag);
        }
      }
    };

    _this.clearPoi = function() {
      _this.removePolygons();
      _this.removeMarkers();
      _this.removeLayers();
    };

    _this.addGeoJSONPolygon = function(geoData, params, tag, custom) {

      function arrayMap(array, callback) {
        let original_callback_params = Array.prototype.slice.call(arguments, 2);
        let array_return = [];
        let array_length = array.length;

        if (Array.prototype.map && (array.map === Array.prototype.map)) {
          array_return = Array.prototype.map.call(array, function(item) {
            var callback_params = original_callback_params;
            callback_params.splice(0, 0, item);

            return callback.apply(this, callback_params);
          });
        } else {
          for (let i = 0; i < array_length; i++) {
            var callback_params = original_callback_params;
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
          }
          else {
            coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
          }
        }

        return coords;
      }
      params = params || Object.create({});
      let polygonParams = Object.create({});
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
      tag = tag || '_';
      _this.polygons[tag] = _this.polygons[tag] || [];
      _this.polygons[tag].push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    _this.getPolygonsByTag = function(tag) {
      return _this.polygons[tag] || [];
    };

    _this.getPolygonsCount = function() {
      let result = 0;
      for(let tag in _this.polygons) {
        result += _this.polygons[tag].length;
      }
      return result;
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
            origin: origin
          , destination: destination
          , waypoints: waypoints
          , travelMode: _this.travelMode
          //optimizeWaypoints: document.getElementById('optimize').checked,
          //avoidHighways: document.getElementById('highways').checked,
          //avoidTolls: document.getElementById('tolls').checked
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

    _this.addLayer = function(geoString, params) {
      params = params || Object.create({});

      let geoJson;
      if (typeof geoString == 'string') {
        geoJson = JSON.parse(geoString);
      } else {
        geoJson = geoString;
      }

      let getJsonStyle = Object.assign({ strokeColor: '#999', strokeOpacity: 1, strokeWeight: 0.5 }, params.style);
      let getJsonCustom = Object.create({});

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

    _this.removeLayer = function(id) {
      _this.layers = _this.layers.filter(function(item) {
        if (item.custom && (item.custom.id == id)) {
          item.setMap(null);
          return false;
        }
        return true;
      });
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

    _this.removeLayers = function(tag) {
      _this.layers = _this.layers.filter(function(item) {
        if (!tag || (item.custom && (item.custom.tag == tag))) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    _this.pointToFeature = function(lng, lat, properties) {
      let geoJson = { type: 'Feature'
                    , geometry: { type: 'Point', 'coordinates': [ lng, lat ] }
                    , properties: Object.assign({ latitude: lat, longitude: lng, "marker-size": "medium", "marker-symbol": "triangle" }, properties)
                    };
      return geoJson;
    };

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