define("common/wx/mpEditor/utils.js",[],function(){
"use strict";
function e(){
return s.uid++;
}
function t(e,t){
return(s.ie&&s.version<9?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' style='overflow:hidden;'><head></head><body></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){top.window.__templateCardIframeReady(document,'"+e+"','"+(t||"")+"');var _tmpScript = document.getElementById('_initialScript');if(_tmpScript&&_tmpScript.parentNode){_tmpScript.parentNode.removeChild(_tmpScript);}},0)</script></html>";
}
function n(t){
var n=e();
a(t,n);
var i="";
if(t.attr)for(var o in t.attr)t.attr.hasOwnProperty(o)&&(i+=" "+o+'="'+t.attr[o]+'"');
var d="<iframe "+i+' data-uid="'+n+'" src="#src#"></iframe>';
return t.noSrc===!0?d.replace("#src#","about:blank"):d.replace("#src#",r(n,t.uid));
}
function r(e,t){
return"javascript:void(function(){document.domain='qq.com';top.window.__templateCardIframeWrite(document,'"+e+"','"+(t||"")+"');}())";
}
function i(e){
try{
delete s.iframeReadyFunc[e];
}catch(t){}
}
function a(e,t){
function n(e){
return function(t){
var n,r=t.uid,i=e.$dom;
if(!i&&"undefined"!=typeof e.editorId){
var a=window.UE.instants["ueditorInstant"+e.editorId];
a&&(i=$(a.body));
}
return i&&i.length>0&&(n=i.find("iframe[data-uid="+r+"]"),n=n&&n.length>0?n[0]:null),
n||(n=$(document.body).find("iframe[data-uid="+r+"]"),n=n&&n.length>0?n[0]:null),
n&&("function"==typeof e.onIframeReadyFunc&&e.onIframeReadyFunc({
doc:t.doc,
win:t.win,
iframe:n
}),e.iframeSelect===!0&&top.window.__editorIframeSelect&&$(t.doc.body).on("click",function(){
var e=this.ownerDocument,t=e?e.defaultView||e.parentWindow:null;
t&&top.window.__editorIframeSelect(t);
})),e;
};
}
e&&(e.uid?s.iframeReadyFunc[e.uid]&&e.force!==!0||(s.iframeReadyFunc[e.uid]=n(e)):t&&(s.iframeReadyFunc[t]=n(e)));
}
function o(e){
e.prototype.bindEventInterface=function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},e.prototype.unbindEventInterface=function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},e.prototype.unbindSpecifyEvent=function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var r=this.__EventInterfaceCache[t];
if(r.type===e.type&&r.eventName===e.eventName&&r.fun===e.fun&&(!e.dom||e.dom&&r.dom===e.dom)){
"domUtils"==r.type?this.domUtils.un(r.dom,r.eventName,r.fun):"editor"==r.type&&this.editor.removeListener(r.eventName,r.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
};
}
function d(e){
if(e&&0!=e.length){
var t=s.asynRenderIframeKey++;
s.asynRenderIframeId[t]=null,f(e,t,function(e){
e.replaceTagName("iframe");
});
}
}
function c(e){
if(e&&0!=e.length){
var t=s.asynRenderIframeKey++;
s.asynRenderIframeId[t]=null,f(e,t,function(e){
e.attr("src",e.attr("src"));
});
}
}
function f(e,t,n){
if(s.asynRenderIframeId[t]&&(clearTimeout(s.asynRenderIframeId[t]),s.asynRenderIframeId[t]=null),
!e||0==e.length)try{
delete s.asynRenderIframeId[t];
}catch(r){}
s.asynRenderIframeId[t]=setTimeout(function(){
for(var r=+new Date;e&&e.length>0;){
var i=+new Date;
if(i-r>16){
f(e,t,n);
break;
}
var a=e.shift(),o=a.parent();
o&&o.length>0?n(a):e=[];
}
if(!e||0==e.length)try{
delete s.asynRenderIframeId[t];
}catch(d){}
},0);
}
function m(e){
for(var t,n=[/^http(s)?:\/\/vpic\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/shp\.qpic\.cn([\/?].*)*$/i],r=0;t=n[r++];)if(t.test(e))return!0;
return!1;
}
var u=navigator.userAgent.toLowerCase(),s={
uid:+new Date,
iframeReadyFunc:{},
ie:/(msie\s|trident.*rv:)([\w.]+)/.test(u),
version:0,
edge:/edge\/([\w.]+)/i.test(u),
asynRenderIframeKey:+new Date,
asynRenderIframeId:{}
};
return function(e,t){
if(e.ie){
var n=t.match(/(?:msie\s([\w.]+))/),r=t.match(/(?:trident.*rv:([\w.]+))/);
e.version=n&&r&&n[1]&&r[1]?Math.max(1*n[1],1*r[1]):n&&n[1]?1*n[1]:r&&r[1]?1*r[1]:0;
}
}(s,u,window),function(e,t){
"function"!=typeof e.__templateCardIframeWrite&&(e.__templateCardIframeWrite=function(e,n,r){
e.open(),e.domain="qq.com",e.write(t(n,r)),e.close();
});
}(top.window,t),function(e,t){
"function"!=typeof e.__templateCardIframeReady&&(e.__templateCardIframeReady=function(e,n,r){
var i,a;
if(a=r?t[r]:t[n],"function"==typeof a&&e){
var o=e.defaultView||e.parentWindow;
o&&(i=a({
uid:n,
customerUid:r,
doc:e,
win:o
}));
}
if(!i||i.notClear!==!0)try{
delete t[n];
}catch(d){}
});
}(top.window,s.iframeReadyFunc),{
getuid:e,
getIframeSrc:r,
createIframeReadyFunc:a,
createLocalIframe:n,
clearIframeReadyFunc:i,
initEventInterface:o,
createAsynRenderIframe:d,
createAsynIframeReload:c,
isOuterWhiteDomain:m
};
});