﻿"use strict";
_kangoLoader.add("kango/api", function(require, exports, module) {
var core=require("kango/core"),extensionInfo=require("kango/extension_info"),utils=require("kango/utils"),object=utils.object,array=utils.array,func=utils.func,invoke=require("kango/invoke"),console=require("kango/console"),storage=require("kango/storage"),xhr=require("kango/xhr"),browser=require("kango/browser"),i18n=require("kango/i18n"),io=require("kango/io"),browserButton=require("kango-ui/browser_button"),optionsPage=require("kango-ui/options"),notifications=require("kango-ui/notifications"),
contextMenuItem=require("kango-ui/context_menu"),MessageTarget=require("kango/message_target"),InvokeAsync=require("kango/invoke_async");require("kango/backgroundscript_engine");require("kango/userscript_engine");var messageRouter=require("kango/messaging"),addEventListener=func.bind(core.addEventListener,core);function dispatchMessage(a,b){return messageRouter.dispatchMessage(a,b)}
var invokeAsync=new InvokeAsync(addEventListener,dispatchMessage,invoke,function(a,b){console.reportError(b)}),messageTarget=new MessageTarget(addEventListener);function wrapEventTarget(a){var b=[];a.addEventListener=func.decorate(a.addEventListener,function(a,c){var d=c[0],e=c[1];return a.call(this,d,e)?(b.push({type:d,listener:e}),!0):!1});return{clear:function(){array.forEach(b,function(b){a.removeEventListener(b.type,b.listener)});b=[]}}}
function wrapMessageTarget(a){var b=[];a.addMessageListener=func.decorate(a.addMessageListener,function(a,c){var d=c[0],e=c[1];return a.call(this,d,e)?(b.push({name:d,listener:e}),!0):!1});return{clear:function(){array.forEach(b,function(b){a.removeMessageListener(b.name,b.listener)});b=[]}}}
function createApi(){var a={console:console.getPublicApi(),storage:storage.getPublicApi(),xhr:xhr.getPublicApi(),browser:browser.getPublicApi(),i18n:i18n.getPublicApi(),io:io.getPublicApi(),getExtensionInfo:function(){return extensionInfo.getRawData()},isDebug:function(){return extensionInfo.debug},invokeAsync:func.bind(invokeAsync.invokeAsync,invokeAsync),invokeAsyncCallback:func.bind(invokeAsync.invokeAsyncCallback,invokeAsync),dispatchMessage:dispatchMessage,addMessageListener:func.bind(messageTarget.addMessageListener,
messageTarget),removeMessageListener:func.bind(messageTarget.removeMessageListener,messageTarget)};object.forEach({browserButton:browserButton,notifications:notifications,optionsPage:optionsPage,contextMenuItem:contextMenuItem},function(b,c){b.getPublicApi&&(a.ui=a.ui||{},a.ui[c]=b.getPublicApi())});var b=wrapMessageTarget(a),f=null;a.ui.browserButton&&(f=wrapEventTarget(a.ui.browserButton));var c=wrapEventTarget(a.browser);object.forEach(a,function(a){"object"==typeof a&&object.freeze(a)});a.ui&&
object.forEach(a.ui,function(a){"object"==typeof a&&object.freeze(a)});core.fireEvent("createApi",{name:"kango",obj:a});object.freeze(a);return{obj:a,clear:function(){b.clear();f&&f.clear();c.clear()}}}core.registerApiFactory("kango",createApi);








var StorageSyncModule=require("kango/storage_sync");new StorageSyncModule(storage.storage,addEventListener,func.bind(browser.tabs.broadcastMessage,browser.tabs));

});