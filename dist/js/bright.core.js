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

    _this.setHash = function(paramName, paramValue) {
      let params = document.location.hash.replace('#', '').split('&').filter((item) => !!item);
      let values = {};
      params.map(function(item) {
        const pairs = item.split('=');
        if (pairs.length == 2) {
          values[pairs[0]] = pairs[1];
        }
      });
      if (br.isObject(paramName)) {
        for(let name in paramName) {
          values[name] = paramName[name];
        }
      } else {
        values[paramName] = paramValue;
      }
      let hash = '#';
      for(let name in values) {
        hash += `${name}=${values[name]}&`;
      }
      document.location.hash = hash;
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
              addNoDataRow();
            }
          } else {
            addNoDataRow();
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
      let content = '';
      const isGroup = !br.isEmpty(_this.options.groupField) && br.toInt(data[_this.options.groupField]) > 0;
      const isDisabled = !br.isEmpty(_this.options.disabledField) && br.toInt(data[_this.options.disabledField]) > 0;
      content += `<option value="${data[_this.options.valueField]}"`;
      if (isDisabled) {
        content += ` disabled="disabled"`;
      }
      content += '>';
      if (!br.isEmpty(_this.options.levelField)) {
        const margin = (br.toInt(data[_this.options.levelField]) - 1) * 4;
        for(let k = 0; k < margin; k++) {
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

    _this.options = Object.assign({
      exclude: [ 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON' ]
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
          if (!parent || (_this.options.exclude.indexOf(parent.tagName.toUpperCase()) == -1)) {  // img in a
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
        if (_this.options.ondrag) {
          _this.options.ondrag.call(e);
        }
      }
    }

    function upHandler(e) {
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
        let content = ((typeof _this.ctrl.attr('data-editable') != 'undefined') ? _this.ctrl.attr('data-editable') : _this.ctrl.text());
        _this.ctrl.data('brEditable-original-html', _this.ctrl.html());
        _this.ctrl.data('brEditable-original-width', _this.ctrl.css('width'));
        _this.ctrl.text('');
        _this.editor = ((_this.ctrl.attr('data-editable-type') == 'textarea') ? $('<textarea rows="3"></textarea>') : $('<input type="text" />'));
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
          return !!instance;
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

  window.br.showError = function(message) {
    if (!br.isEmpty(message)) {
      alert(message);
    }
  };

  window.br.showMessage = function(message) {
    if (!br.isEmpty(message)) {
      alert(message);
    }
  };

  window.br.growlError = function(message, image) {
    if (!br.isEmpty(message)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
          title: br.trn('Error'),
          text: message,
          class_name: 'gritter-red',
          image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(message, {
          addnCls: 'humane-jackedup-error humane-original-error',
          timeout: 5000
        });
      } else {
        alert(message);
      }
    }
  };

  window.br.growlWarning = function(message, image) {
    if (!br.isEmpty(message)) {
      if (typeof $.gritter != 'undefined') {
        $.gritter.add({
          title: br.trn('Warning'),
          text: message,
          class_name: 'gritter-orange',
          image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(message, {
          addnCls: 'humane-jackedup-error humane-original-error',
          timeout: 5000
        });
      } else {
        alert(message);
      }
    }
  };

  window.br.growlMessage = function(message, title, image) {
    if (!br.isEmpty(message)) {
      if (typeof $.gritter != 'undefined') {
        if (br.isEmpty(title)) {
          title = ' ';
        }
        $.gritter.add({
          title: title,
          text: message,
          class_name: 'gritter-light',
          image: image
        });
      } else
      if (typeof window.humane != 'undefined') {
        humane.log(message);
      } else {
        alert(message);
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

  window.br.attachDatePickers = function (container) {
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
        switch(workMode) {
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
        try { focusedInput[0].focus(); } catch (e) { }
      } else {
        focusedInput = $('input[type!=hidden]:visible,select:visible,textarea:visible', _this.container);
        if (focusedInput.length > 0) {
          try { focusedInput[0].focus(); } catch (e) { }
        }
      }
      if ($.fn.bootstrapDatepicker) {
        try {
          $('input.bootstrap-datepicker', _this.container).each(function(){
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
          internalSave( andClose
                      , function() { btn.removeClass('disabled'); }
                      , function() { btn.removeClass('disabled'); }
                      );
        }
      });

      $(_this.inputsContainer).on('change', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        if ($(this).attr('name') == 'name') {
          _this.updateEditorTitle();
        }
        br.confirmClose();
      });

      $(_this.inputsContainer).on('input', 'select.data-field,input.data-field,textarea.data-field', function(event) {
        if ($(this).attr('name') == 'name') {
          _this.updateEditorTitle();
        }
        br.confirmClose();
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

    _this.show = function(rowid, params) {
      let editorParams = Object.assign({
        mode: br.isNumber(rowid) ? 'edit' : 'insert',
        defaults: null
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

      let ctrl = $(_this.options.selectors.errorMessage, _this.container);
      if (ctrl.length > 0) {
        ctrl.html('').hide();
      }

      if (workMode == 'view') {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          $(this).attr('wasAvailable', !$(this).prop('disabled'));
          $(this).prop('readonly', true);
          $(this).prop('disabled', true);
        });
        $(_this.options.selectors.save, _this.container).hide();
        $('.action-save-related', _this.container).hide();
      } else {
        _this.inputsContainer.find('input,select,textarea').each(function() {
          if ($(this).attr('wasAvailable')) {
            $(this).prop('readonly', false);
            $(this).prop('disabled', false);
          }
        });
        $(_this.options.selectors.save, _this.container).show();
        $('.action-save-related', _this.container).show();
      }

      if (editorRowid) {
        let dataSourceRequest = { rowid: editorRowid };
        let dataSourceOptions = { disableEvents: true };
        _this.events.triggerBefore('editor.loadData', dataSourceRequest, dataSourceOptions);
        _this.dataSource.selectOne(dataSourceRequest, function(result, response) {
          if (result) {
            editorRowData = response;
            _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults);
            _this.fillControls(editorRowData);
            if (workMode == 'copy') {
              editorRowid = null;
            }
            _this.updateEditorTitle();
            _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults);
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
        _this.events.triggerBefore('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults);
        _this.fillDefaults();
        _this.fillControls(editorParams.defaults);
        _this.updateEditorTitle();
        _this.events.trigger('editor.show', editorRowData, (workMode == 'copy'), editorParams.defaults);
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
        silent  = true;
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
                _this.updateEditorTitle();
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

    const selActionCRUD = `${findNode('.action-edit')},${findNode('.action-view')},${findNode('.action-create')},${findNode('.action-copy')}`;

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
            const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
            const mode = ($(this).hasClass('action-copy') ? 'copy' : ($(this).hasClass('action-view') ? 'view' : (rowid ? 'edit' : 'insert')));
            _this.editor.show(rowid, { mode: mode });
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