!function(e,t){
"use strict";
var n,r,a,i=e,o=i.document,l=i.navigator,s=i.setTimeout,c=i.clearTimeout,u=i.setInterval,f=i.clearInterval,d=i.getComputedStyle,p=i.encodeURIComponent,h=i.ActiveXObject,m=i.Error,y=i.Number.parseInt||i.parseInt,v=i.Number.parseFloat||i.parseFloat,g=i.Number.isNaN||i.isNaN,b=i.Date.now,w=i.Object.keys,x=i.Object.defineProperty,C=i.Object.prototype.hasOwnProperty,E=i.Array.prototype.slice,T=function(){
var e=function(e){
return e;
};
if("function"==typeof i.wrap&&"function"==typeof i.unwrap)try{
var t=o.createElement("div"),n=i.unwrap(t);
1===t.nodeType&&n&&1===n.nodeType&&(e=i.unwrap);
}catch(r){}
return e;
}(),j=function(e){
return E.call(e,0);
},D=function(){
var e,n,r,a,i,o,l=j(arguments),s=l[0]||{};
for(e=1,n=l.length;n>e;e++)if(null!=(r=l[e]))for(a in r)C.call(r,a)&&(i=s[a],o=r[a],
s!==o&&o!==t&&(s[a]=o));
return s;
},k=function(e){
var t,n,r,a;
if("object"!=typeof e||null==e||"number"==typeof e.nodeType)t=e;else if("number"==typeof e.length)for(t=[],
n=0,r=e.length;r>n;n++)C.call(e,n)&&(t[n]=k(e[n]));else{
t={};
for(a in e)C.call(e,a)&&(t[a]=k(e[a]));
}
return t;
},I=function(e,t){
for(var n={},r=0,a=t.length;a>r;r++)t[r]in e&&(n[t[r]]=e[t[r]]);
return n;
},O=function(e,t){
var n={};
for(var r in e)-1===t.indexOf(r)&&(n[r]=e[r]);
return n;
},N=function(e){
if(e)for(var t in e)C.call(e,t)&&delete e[t];
return e;
},_=function(e,t){
if(e&&1===e.nodeType&&e.ownerDocument&&t&&(1===t.nodeType&&t.ownerDocument&&t.ownerDocument===e.ownerDocument||9===t.nodeType&&!t.ownerDocument&&t===e.ownerDocument))do{
if(e===t)return!0;
e=e.parentNode;
}while(e);
return!1;
},A=function(e){
var t;
return"string"==typeof e&&e&&(t=e.split("#")[0].split("?")[0],t=e.slice(0,e.lastIndexOf("/")+1)),
t;
},L=function(e){
var t,n;
return"string"==typeof e&&e&&(n=e.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),
n&&n[1]?t=n[1]:(n=e.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),
n&&n[1]&&(t=n[1]))),t;
},z=function(){
var e,t;
try{
throw new m;
}catch(n){
t=n;
}
return t&&(e=t.sourceURL||t.fileName||L(t.stack)),e;
},F=function(){
var e,n,r;
if(o.currentScript&&(e=o.currentScript.src))return e;
if(n=o.getElementsByTagName("script"),1===n.length)return n[0].src||t;
if("readyState"in n[0])for(r=n.length;r--;)if("interactive"===n[r].readyState&&(e=n[r].src))return e;
return"loading"===o.readyState&&(e=n[n.length-1].src)?e:(e=z())?e:t;
},S=function(){
var e,n,r,a=o.getElementsByTagName("script");
for(e=a.length;e--;){
if(!(r=a[e].src)){
n=null;
break;
}
if(r=A(r),null==n)n=r;else if(n!==r){
n=null;
break;
}
}
return n||t;
},Z=function(){
if(e.wx&&wx.path&&wx.path.zeroClipboard_new)return wx.path.zeroClipboard_new;
var t=A(F())||S()||"";
return t+"ZeroClipboard.swf";
},V=function(){
var e=/win(dows|[\s]?(nt|me|ce|xp|vista|[\d]+))/i;
return!!l&&(e.test(l.appVersion||"")||e.test(l.platform||"")||-1!==(l.userAgent||"").indexOf("Windows"));
},$=function(){
return null==e.opener&&(!!e.top&&e!=e.top||!!e.parent&&e!=e.parent);
}(),X={
bridge:null,
version:"0.0.0",
pluginType:"unknown",
disabled:null,
outdated:null,
sandboxed:null,
unavailable:null,
degraded:null,
deactivated:null,
overdue:null,
ready:null
},Y="11.0.0",B={},M={},P=null,H=0,R=0,J={
ready:"Flash communication is established",
error:{
"flash-disabled":"Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
"flash-outdated":"Flash is too outdated to support ZeroClipboard",
"flash-sandboxed":"Attempting to run Flash in a sandboxed iframe, which is impossible",
"flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript",
"flash-degraded":"Flash is unable to preserve data fidelity when communicating with JavaScript",
"flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
"flash-overdue":"Flash communication was established but NOT within the acceptable time limit",
"version-mismatch":"ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
"clipboard-error":"At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
"config-mismatch":"ZeroClipboard configuration does not match Flash's reality",
"swf-not-found":"The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"
}
},K=["flash-unavailable","flash-degraded","flash-overdue","version-mismatch","config-mismatch","clipboard-error"],U=["flash-disabled","flash-outdated","flash-sandboxed","flash-unavailable","flash-degraded","flash-deactivated","flash-overdue"],W=new RegExp("^flash-("+U.map(function(e){
return e.replace(/^flash-/,"");
}).join("|")+")$"),q=new RegExp("^flash-("+U.slice(1).map(function(e){
return e.replace(/^flash-/,"");
}).join("|")+")$"),G={
swfPath:Z(),
trustedDomains:e.location.host?[e.location.host]:[],
cacheBust:!0,
forceEnhancedClipboard:!1,
flashLoadTimeout:3e4,
autoActivate:!0,
bubbleEvents:!0,
fixLineEndings:!0,
containerId:"global-zeroclipboard-html-bridge",
containerClass:"global-zeroclipboard-container",
swfObjectId:"global-zeroclipboard-flash-bridge",
hoverClass:"zeroclipboard-is-hover",
activeClass:"zeroclipboard-is-active",
forceHandCursor:!1,
title:null,
zIndex:999999999
},Q=function(e){
if("object"==typeof e&&null!==e)for(var t in e)if(C.call(e,t))if(/^(?:forceHandCursor|title|zIndex|bubbleEvents|fixLineEndings)$/.test(t))G[t]=e[t];else if(null==X.bridge)if("containerId"===t||"swfObjectId"===t){
if(!ht(e[t]))throw new Error("The specified `"+t+"` value is not valid as an HTML4 Element ID");
G[t]=e[t];
}else G[t]=e[t];
{
if("string"!=typeof e||!e)return k(G);
if(C.call(G,e))return G[e];
}
},et=function(){
return Jt(),{
browser:I(l,["userAgent","platform","appName","appVersion"]),
flash:O(X,["bridge"]),
zeroclipboard:{
version:Ut.version,
config:Ut.config()
}
};
},tt=function(){
return!!(X.disabled||X.outdated||X.sandboxed||X.unavailable||X.degraded||X.deactivated);
},nt=function(e,r){
var a,i,o,l={};
if("string"==typeof e&&e)o=e.toLowerCase().split(/\s+/);else if("object"==typeof e&&e&&"undefined"==typeof r)for(a in e)C.call(e,a)&&"string"==typeof a&&a&&"function"==typeof e[a]&&Ut.on(a,e[a]);
if(o&&o.length){
for(a=0,i=o.length;i>a;a++)e=o[a].replace(/^on/,""),l[e]=!0,B[e]||(B[e]=[]),B[e].push(r);
if(l.ready&&X.ready&&Ut.emit({
type:"ready"
}),l.error){
for(a=0,i=U.length;i>a;a++)if(X[U[a].replace(/^flash-/,"")]===!0){
Ut.emit({
type:"error",
name:U[a]
});
break;
}
n!==t&&Ut.version!==n&&Ut.emit({
type:"error",
name:"version-mismatch",
jsVersion:Ut.version,
swfVersion:n
});
}
}
return Ut;
},rt=function(e,t){
var n,r,a,i,o;
if(0===arguments.length)i=w(B);else if("string"==typeof e&&e)i=e.split(/\s+/);else if("object"==typeof e&&e&&"undefined"==typeof t)for(n in e)C.call(e,n)&&"string"==typeof n&&n&&"function"==typeof e[n]&&Ut.off(n,e[n]);
if(i&&i.length)for(n=0,r=i.length;r>n;n++)if(e=i[n].toLowerCase().replace(/^on/,""),
o=B[e],o&&o.length)if(t)for(a=o.indexOf(t);-1!==a;)o.splice(a,1),a=o.indexOf(t,a);else o.length=0;
return Ut;
},at=function(e){
var t;
return t="string"==typeof e&&e?k(B[e])||null:k(B);
},it=function(e){
var t,n,r;
return e=mt(e),e&&!Ct(e)?"ready"===e.type&&X.overdue===!0?Ut.emit({
type:"error",
name:"flash-overdue"
}):(t=D({},e),wt.call(this,t),"copy"===e.type&&(r=Nt(M),n=r.data,P=r.formatMap),
n):void 0;
},ot=function(){
var e=X.sandboxed;
if(Jt(),"boolean"!=typeof X.ready&&(X.ready=!1),X.sandboxed!==e&&X.sandboxed===!0)X.ready=!1,
Ut.emit({
type:"error",
name:"flash-sandboxed"
});else if(!Ut.isFlashUnusable()&&null===X.bridge){
var t=G.flashLoadTimeout;
"number"==typeof t&&t>=0&&(H=s(function(){
"boolean"!=typeof X.deactivated&&(X.deactivated=!0),X.deactivated===!0&&Ut.emit({
type:"error",
name:"flash-deactivated"
});
},t)),X.overdue=!1,It();
}
},lt=function(){
Ut.clearData(),Ut.blur(),Ut.emit("destroy"),Ot(),Ut.off();
},st=function(e,t){
var n;
if("object"==typeof e&&e&&"undefined"==typeof t)n=e,Ut.clearData();else{
if("string"!=typeof e||!e)return;
n={},n[e]=t;
}
for(var r in n)"string"==typeof r&&r&&C.call(n,r)&&"string"==typeof n[r]&&n[r]&&(M[r]=Rt(n[r]));
},ct=function(e){
"undefined"==typeof e?(N(M),P=null):"string"==typeof e&&C.call(M,e)&&delete M[e];
},ut=function(e){
return"undefined"==typeof e?k(M):"string"==typeof e&&C.call(M,e)?M[e]:void 0;
},ft=function(e){
if(e&&1===e.nodeType){
r&&(Vt(r,G.activeClass),r!==e&&Vt(r,G.hoverClass)),r=e,Zt(e,G.hoverClass);
var t=e.getAttribute("title")||G.title;
if("string"==typeof t&&t){
var n=kt(X.bridge);
n&&n.setAttribute("title",t);
}
var a=G.forceHandCursor===!0||"pointer"===$t(e,"cursor");
Pt(a),Mt();
}
},dt=function(){
var e=kt(X.bridge);
e&&(e.removeAttribute("title"),e.style.left="0px",e.style.top="-9999px",e.style.width="1px",
e.style.height="1px"),r&&(Vt(r,G.hoverClass),Vt(r,G.activeClass),r=null);
},pt=function(){
return r||null;
},ht=function(e){
return"string"==typeof e&&e&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(e);
},mt=function(e){
var t;
if("string"==typeof e&&e?(t=e,e={}):"object"==typeof e&&e&&"string"==typeof e.type&&e.type&&(t=e.type),
t){
t=t.toLowerCase(),!e.target&&(/^(copy|aftercopy|_click)$/.test(t)||"error"===t&&"clipboard-error"===e.name)&&(e.target=a),
D(e,{
type:t,
target:e.target||r||null,
relatedTarget:e.relatedTarget||null,
currentTarget:X&&X.bridge||null,
timeStamp:e.timeStamp||b()||null
});
var n=J[e.type];
return"error"===e.type&&e.name&&n&&(n=n[e.name]),n&&(e.message=n),"ready"===e.type&&D(e,{
target:null,
version:X.version
}),"error"===e.type&&(W.test(e.name)&&D(e,{
target:null,
minimumVersion:Y
}),q.test(e.name)&&D(e,{
version:X.version
})),"copy"===e.type&&(e.clipboardData={
setData:Ut.setData,
clearData:Ut.clearData
}),"aftercopy"===e.type&&(e=_t(e,P)),e.target&&!e.relatedTarget&&(e.relatedTarget=yt(e.target)),
vt(e);
}
},yt=function(e){
var t=e&&e.getAttribute&&e.getAttribute("data-clipboard-target");
return t?o.getElementById(t):null;
},vt=function(e){
if(e&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)){
var n=e.target,r="_mouseover"===e.type&&e.relatedTarget?e.relatedTarget:t,a="_mouseout"===e.type&&e.relatedTarget?e.relatedTarget:t,l=Xt(n),s=i.screenLeft||i.screenX||0,c=i.screenTop||i.screenY||0,u=o.body.scrollLeft+o.documentElement.scrollLeft,f=o.body.scrollTop+o.documentElement.scrollTop,d=l.left+("number"==typeof e._stageX?e._stageX:0),p=l.top+("number"==typeof e._stageY?e._stageY:0),h=d-u,m=p-f,y=s+h,v=c+m,g="number"==typeof e.movementX?e.movementX:0,b="number"==typeof e.movementY?e.movementY:0;
delete e._stageX,delete e._stageY,D(e,{
srcElement:n,
fromElement:r,
toElement:a,
screenX:y,
screenY:v,
pageX:d,
pageY:p,
clientX:h,
clientY:m,
x:h,
y:m,
movementX:g,
movementY:b,
offsetX:0,
offsetY:0,
layerX:0,
layerY:0
});
}
return e;
},gt=function(e){
var t=e&&"string"==typeof e.type&&e.type||"";
return!/^(?:(?:before)?copy|destroy)$/.test(t);
},bt=function(e,t,n,r){
r?s(function(){
e.apply(t,n);
},0):e.apply(t,n);
},wt=function(e){
if("object"==typeof e&&e&&e.type){
var t=gt(e),n=B["*"]||[],r=B[e.type]||[],a=n.concat(r);
if(a&&a.length){
var o,l,s,c,u,f=this;
for(o=0,l=a.length;l>o;o++)s=a[o],c=f,"string"==typeof s&&"function"==typeof i[s]&&(s=i[s]),
"object"==typeof s&&s&&"function"==typeof s.handleEvent&&(c=s,s=s.handleEvent),"function"==typeof s&&(u=D({},e),
bt(s,c,[u],t));
}
return this;
}
},xt=function(e){
var t=null;
return($===!1||e&&"error"===e.type&&e.name&&-1!==K.indexOf(e.name))&&(t=!1),t;
},Ct=function(e){
var t=e.target||r||null,i="swf"===e._source;
switch(delete e._source,e.type){
case"error":
var o="flash-sandboxed"===e.name||xt(e);
"boolean"==typeof o&&(X.sandboxed=o),-1!==U.indexOf(e.name)?D(X,{
disabled:"flash-disabled"===e.name,
outdated:"flash-outdated"===e.name,
unavailable:"flash-unavailable"===e.name,
degraded:"flash-degraded"===e.name,
deactivated:"flash-deactivated"===e.name,
overdue:"flash-overdue"===e.name,
ready:!1
}):"version-mismatch"===e.name&&(n=e.swfVersion,D(X,{
disabled:!1,
outdated:!1,
unavailable:!1,
degraded:!1,
deactivated:!1,
overdue:!1,
ready:!1
})),Bt();
break;

case"ready":
n=e.swfVersion;
var l=X.deactivated===!0;
D(X,{
disabled:!1,
outdated:!1,
sandboxed:!1,
unavailable:!1,
degraded:!1,
deactivated:!1,
overdue:l,
ready:!l
}),Bt();
break;

case"beforecopy":
a=t;
break;

case"copy":
var s,c,u=e.relatedTarget;
!M["text/html"]&&!M["text/plain"]&&u&&(c=u.value||u.outerHTML||u.innerHTML)&&(s=u.value||u.textContent||u.innerText)?(e.clipboardData.clearData(),
e.clipboardData.setData("text/plain",s),c!==s&&e.clipboardData.setData("text/html",c)):!M["text/plain"]&&e.target&&(s=e.target.getAttribute("data-clipboard-text"))&&(e.clipboardData.clearData(),
e.clipboardData.setData("text/plain",s));
break;

case"aftercopy":
Et(e),Ut.clearData(),t&&t!==St()&&t.focus&&t.focus();
break;

case"_mouseover":
Ut.focus(t),G.bubbleEvents===!0&&i&&(t&&t!==e.relatedTarget&&!_(e.relatedTarget,t)&&Tt(D({},e,{
type:"mouseenter",
bubbles:!1,
cancelable:!1
})),Tt(D({},e,{
type:"mouseover"
})));
break;

case"_mouseout":
Ut.blur(),G.bubbleEvents===!0&&i&&(t&&t!==e.relatedTarget&&!_(e.relatedTarget,t)&&Tt(D({},e,{
type:"mouseleave",
bubbles:!1,
cancelable:!1
})),Tt(D({},e,{
type:"mouseout"
})));
break;

case"_mousedown":
Zt(t,G.activeClass),G.bubbleEvents===!0&&i&&Tt(D({},e,{
type:e.type.slice(1)
}));
break;

case"_mouseup":
Vt(t,G.activeClass),G.bubbleEvents===!0&&i&&Tt(D({},e,{
type:e.type.slice(1)
}));
break;

case"_click":
a=null,G.bubbleEvents===!0&&i&&Tt(D({},e,{
type:e.type.slice(1)
}));
break;

case"_mousemove":
G.bubbleEvents===!0&&i&&Tt(D({},e,{
type:e.type.slice(1)
}));
}
return/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)?!0:void 0;
},Et=function(e){
if(e.errors&&e.errors.length>0){
var t=k(e);
D(t,{
type:"error",
name:"clipboard-error"
}),delete t.success,s(function(){
Ut.emit(t);
},0);
}
},Tt=function(e){
if(e&&"string"==typeof e.type&&e){
var t,n=e.target||null,r=n&&n.ownerDocument||o,a={
view:r.defaultView||i,
canBubble:!0,
cancelable:!0,
detail:"click"===e.type?1:0,
button:"number"==typeof e.which?e.which-1:"number"==typeof e.button?e.button:r.createEvent?0:1
},l=D(a,e);
n&&r.createEvent&&n.dispatchEvent&&(l=[l.type,l.canBubble,l.cancelable,l.view,l.detail,l.screenX,l.screenY,l.clientX,l.clientY,l.ctrlKey,l.altKey,l.shiftKey,l.metaKey,l.button,l.relatedTarget],
t=r.createEvent("MouseEvents"),t.initMouseEvent&&(t.initMouseEvent.apply(t,l),t._source="js",
n.dispatchEvent(t)));
}
},jt=function(){
var e=G.flashLoadTimeout;
if("number"==typeof e&&e>=0){
var t=Math.min(1e3,e/10),n=G.swfObjectId+"_fallbackContent";
R=u(function(){
var e=o.getElementById(n);
Yt(e)&&(Bt(),X.deactivated=null,Ut.emit({
type:"error",
name:"swf-not-found"
}));
},t);
}
},Dt=function(){
var e=o.createElement("div");
return e.id=G.containerId,e.className=G.containerClass,e.style.position="absolute",
e.style.left="0px",e.style.top="-9999px",e.style.width="1px",e.style.height="1px",
e.style.zIndex=""+Ht(G.zIndex),e;
},kt=function(e){
for(var t=e&&e.parentNode;t&&"OBJECT"===t.nodeName&&t.parentNode;)t=t.parentNode;
return t||null;
},It=function(){
var e,t=X.bridge,n=kt(t);
if(!t){
var r=Ft(i.location.host,G),a="never"===r?"none":"all",l=Lt(D({
jsVersion:Ut.version
},G)),s=G.swfPath+At(G.swfPath,G);
n=Dt();
var c=o.createElement("div");
n.appendChild(c),o.body.appendChild(n);
var u=o.createElement("div"),f="activex"===X.pluginType;
u.innerHTML='<object id="'+G.swfObjectId+'" name="'+G.swfObjectId+'" width="100%" height="100%" '+(f?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+s+'"')+">"+(f?'<param name="movie" value="'+s+'"/>':"")+'<param name="allowScriptAccess" value="'+r+'"/><param name="allowNetworking" value="'+a+'"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="'+l+'"/><div id="'+G.swfObjectId+'_fallbackContent">&nbsp;</div></object>',
t=u.firstChild,u=null,T(t).ZeroClipboard=Ut,n.replaceChild(t,c),jt();
}
return t||(t=o[G.swfObjectId],t&&(e=t.length)&&(t=t[e-1]),!t&&n&&(t=n.firstChild)),
X.bridge=t||null,t;
},Ot=function(){
var e=X.bridge;
if(e){
var r=kt(e);
r&&("activex"===X.pluginType&&"readyState"in e?(e.style.display="none",function a(){
if(4===e.readyState){
for(var t in e)"function"==typeof e[t]&&(e[t]=null);
e.parentNode&&e.parentNode.removeChild(e),r.parentNode&&r.parentNode.removeChild(r);
}else s(a,10);
}()):(e.parentNode&&e.parentNode.removeChild(e),r.parentNode&&r.parentNode.removeChild(r))),
Bt(),X.ready=null,X.bridge=null,X.deactivated=null,n=t;
}
},Nt=function(e){
var t={},n={};
if("object"==typeof e&&e){
for(var r in e)if(r&&C.call(e,r)&&"string"==typeof e[r]&&e[r])switch(r.toLowerCase()){
case"text/plain":
case"text":
case"air:text":
case"flash:text":
t.text=e[r],n.text=r;
break;

case"text/html":
case"html":
case"air:html":
case"flash:html":
t.html=e[r],n.html=r;
break;

case"application/rtf":
case"text/rtf":
case"rtf":
case"richtext":
case"air:rtf":
case"flash:rtf":
t.rtf=e[r],n.rtf=r;
}
return{
data:t,
formatMap:n
};
}
},_t=function(e,t){
if("object"!=typeof e||!e||"object"!=typeof t||!t)return e;
var n={};
for(var r in e)if(C.call(e,r))if("errors"===r){
n[r]=e[r]?e[r].slice():[];
for(var a=0,i=n[r].length;i>a;a++)n[r][a].format=t[n[r][a].format];
}else if("success"!==r&&"data"!==r)n[r]=e[r];else{
n[r]={};
var o=e[r];
for(var l in o)l&&C.call(o,l)&&C.call(t,l)&&(n[r][t[l]]=o[l]);
}
return n;
},At=function(e,t){
var n=null==t||t&&t.cacheBust===!0;
return n?(-1===e.indexOf("?")?"?":"&")+"noCache="+b():"";
},Lt=function(e){
var t,n,r,a,o="",l=[];
if(e.trustedDomains&&("string"==typeof e.trustedDomains?a=[e.trustedDomains]:"object"==typeof e.trustedDomains&&"length"in e.trustedDomains&&(a=e.trustedDomains)),
a&&a.length)for(t=0,n=a.length;n>t;t++)if(C.call(a,t)&&a[t]&&"string"==typeof a[t]){
if(r=zt(a[t]),!r)continue;
if("*"===r){
l.length=0,l.push(r);
break;
}
l.push.apply(l,[r,"//"+r,i.location.protocol+"//"+r]);
}
return l.length&&(o+="trustedOrigins="+p(l.join(","))),e.forceEnhancedClipboard===!0&&(o+=(o?"&":"")+"forceEnhancedClipboard=true"),
"string"==typeof e.swfObjectId&&e.swfObjectId&&(o+=(o?"&":"")+"swfObjectId="+p(e.swfObjectId)),
"string"==typeof e.jsVersion&&e.jsVersion&&(o+=(o?"&":"")+"jsVersion="+p(e.jsVersion)),
o;
},zt=function(e){
if(null==e||""===e)return null;
if(e=e.replace(/^\s+|\s+$/g,""),""===e)return null;
var t=e.indexOf("//");
e=-1===t?e:e.slice(t+2);
var n=e.indexOf("/");
return e=-1===n?e:-1===t||0===n?null:e.slice(0,n),e&&".swf"===e.slice(-4).toLowerCase()?null:e||null;
},Ft=function(){
var e=function(e){
var t,n,r,a=[];
if("string"==typeof e&&(e=[e]),"object"!=typeof e||!e||"number"!=typeof e.length)return a;
for(t=0,n=e.length;n>t;t++)if(C.call(e,t)&&(r=zt(e[t]))){
if("*"===r){
a.length=0,a.push("*");
break;
}
-1===a.indexOf(r)&&a.push(r);
}
return a;
};
return function(t,n){
var r=zt(n.swfPath);
null===r&&(r=t);
var a=e(n.trustedDomains),i=a.length;
if(i>0){
if(1===i&&"*"===a[0])return"always";
if(-1!==a.indexOf(t))return 1===i&&t===r?"sameDomain":"always";
}
return"never";
};
}(),St=function(){
try{
return o.activeElement;
}catch(e){
return null;
}
},Zt=function(e,t){
var n,r,a,i=[];
if("string"==typeof t&&t&&(i=t.split(/\s+/)),e&&1===e.nodeType&&i.length>0){
for(a=(" "+(e.className||"")+" ").replace(/[\t\r\n\f]/g," "),n=0,r=i.length;r>n;n++)-1===a.indexOf(" "+i[n]+" ")&&(a+=i[n]+" ");
a=a.replace(/^\s+|\s+$/g,""),a!==e.className&&(e.className=a);
}
return e;
},Vt=function(e,t){
var n,r,a,i=[];
if("string"==typeof t&&t&&(i=t.split(/\s+/)),e&&1===e.nodeType&&i.length>0&&e.className){
for(a=(" "+e.className+" ").replace(/[\t\r\n\f]/g," "),n=0,r=i.length;r>n;n++)a=a.replace(" "+i[n]+" "," ");
a=a.replace(/^\s+|\s+$/g,""),a!==e.className&&(e.className=a);
}
return e;
},$t=function(e,t){
var n=d(e,null).getPropertyValue(t);
return"cursor"!==t||n&&"auto"!==n||"A"!==e.nodeName?n:"pointer";
},Xt=function(e){
var t={
left:0,
top:0,
width:0,
height:0
};
if(e.getBoundingClientRect){
var n=e.getBoundingClientRect(),r=i.pageXOffset,a=i.pageYOffset,l=o.documentElement.clientLeft||0,s=o.documentElement.clientTop||0,c=0,u=0;
if("relative"===$t(o.body,"position")){
var f=o.body.getBoundingClientRect(),d=o.documentElement.getBoundingClientRect();
c=f.left-d.left||0,u=f.top-d.top||0;
}
t.left=n.left+r-l-c,t.top=n.top+a-s-u,t.width="width"in n?n.width:n.right-n.left,
t.height="height"in n?n.height:n.bottom-n.top;
}
return t;
},Yt=function(e){
if(!e)return!1;
var t=d(e,null);
if(!t)return!1;
var n=v(t.height)>0,r=v(t.width)>0,a=v(t.top)>=0,i=v(t.left)>=0,o=n&&r&&a&&i,l=o?null:Xt(e),s="none"!==t.display&&"collapse"!==t.visibility&&(o||!!l&&(n||l.height>0)&&(r||l.width>0)&&(a||l.top>=0)&&(i||l.left>=0));
return s;
},Bt=function(){
c(H),H=0,f(R),R=0;
},Mt=function(){
var e;
if(r&&(e=kt(X.bridge))){
var t=Xt(r);
D(e.style,{
width:t.width+"px",
height:t.height+"px",
top:t.top+"px",
left:t.left+"px",
zIndex:""+Ht(G.zIndex)
});
}
},Pt=function(e){
X.ready===!0&&(X.bridge&&"function"==typeof X.bridge.setHandCursor?X.bridge.setHandCursor(e):X.ready=!1);
},Ht=function(e){
if(/^(?:auto|inherit)$/.test(e))return e;
var t;
return"number"!=typeof e||g(e)?"string"==typeof e&&(t=Ht(y(e,10))):t=e,"number"==typeof t?t:"auto";
},Rt=function(e){
var t=/(\r\n|\r|\n)/g;
return"string"==typeof e&&G.fixLineEndings===!0&&(V()?/((^|[^\r])\n|\r([^\n]|$))/.test(e)&&(e=e.replace(t,"\r\n")):/\r/.test(e)&&(e=e.replace(t,"\n"))),
e;
},Jt=function(t){
var n,r,a,i=X.sandboxed,o=null;
if(t=t===!0,$===!1)o=!1;else{
try{
r=e.frameElement||null;
}catch(l){
a={
name:l.name,
message:l.message
};
}
if(r&&1===r.nodeType&&"IFRAME"===r.nodeName)try{
o=r.hasAttribute("sandbox");
}catch(l){
o=null;
}else{
try{
n=document.domain||null;
}catch(l){
n=null;
}
(null===n||a&&"SecurityError"===a.name&&/(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(a.message.toLowerCase()))&&(o=!0);
}
}
return X.sandboxed=o,i===o||t||Kt(h),o;
},Kt=function(e){
function t(e){
var t=e.match(/[\d]+/g);
return t.length=3,t.join(".");
}
function n(e){
return!!e&&(e=e.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e)||"chrome.plugin"===e.slice(-13));
}
function r(e){
e&&(s=!0,e.version&&(f=t(e.version)),!f&&e.description&&(f=t(e.description)),e.filename&&(u=n(e.filename)));
}
var a,i,o,s=!1,c=!1,u=!1,f="";
if(l.plugins&&l.plugins.length)a=l.plugins["Shockwave Flash"],r(a),l.plugins["Shockwave Flash 2.0"]&&(s=!0,
f="2.0.0.11");else if(l.mimeTypes&&l.mimeTypes.length)o=l.mimeTypes["application/x-shockwave-flash"],
a=o&&o.enabledPlugin,r(a);else if("undefined"!=typeof e){
c=!0;
try{
i=new e("ShockwaveFlash.ShockwaveFlash.7"),s=!0,f=t(i.GetVariable("$version"));
}catch(d){
try{
i=new e("ShockwaveFlash.ShockwaveFlash.6"),s=!0,f="6.0.21";
}catch(p){
try{
i=new e("ShockwaveFlash.ShockwaveFlash"),s=!0,f=t(i.GetVariable("$version"));
}catch(h){
c=!1;
}
}
}
}
X.disabled=s!==!0,X.outdated=f&&v(f)<v(Y),X.version=f||"0.0.0",X.pluginType=u?"pepper":c?"activex":s?"netscape":"unknown";
};
Kt(h),Jt(!0);
var Ut=function(){
return this instanceof Ut?void("function"==typeof Ut._createClient&&Ut._createClient.apply(this,j(arguments))):new Ut;
};
x(Ut,"version",{
value:"2.3.0-beta.1",
writable:!1,
configurable:!0,
enumerable:!0
}),Ut.config=function(){
return Q.apply(this,j(arguments));
},Ut.state=function(){
return et.apply(this,j(arguments));
},Ut.isFlashUnusable=function(){
return tt.apply(this,j(arguments));
},Ut.on=function(){
return nt.apply(this,j(arguments));
},Ut.off=function(){
return rt.apply(this,j(arguments));
},Ut.handlers=function(){
return at.apply(this,j(arguments));
},Ut.emit=function(){
return it.apply(this,j(arguments));
},Ut.create=function(){
return ot.apply(this,j(arguments));
},Ut.destroy=function(){
return lt.apply(this,j(arguments));
},Ut.setData=function(){
return st.apply(this,j(arguments));
},Ut.clearData=function(){
return ct.apply(this,j(arguments));
},Ut.getData=function(){
return ut.apply(this,j(arguments));
},Ut.focus=Ut.activate=function(){
return ft.apply(this,j(arguments));
},Ut.blur=Ut.deactivate=function(){
return dt.apply(this,j(arguments));
},Ut.activeElement=function(){
return pt.apply(this,j(arguments));
};
var Wt=0,qt={},Gt=0,Qt={},en={};
D(G,{
autoActivate:!0
});
var tn=function(e){
var t=this;
t.id=""+Wt++,qt[t.id]={
instance:t,
elements:[],
handlers:{}
},e&&t.clip(e),Ut.on("*",function(e){
return t.emit(e);
}),Ut.on("destroy",function(){
t.destroy();
}),Ut.create();
},nn=function(e,r){
var a,i,o,l={},s=qt[this.id],c=s&&s.handlers;
if(!s)throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
if("string"==typeof e&&e)o=e.toLowerCase().split(/\s+/);else if("object"==typeof e&&e&&"undefined"==typeof r)for(a in e)C.call(e,a)&&"string"==typeof a&&a&&"function"==typeof e[a]&&this.on(a,e[a]);
if(o&&o.length){
for(a=0,i=o.length;i>a;a++)e=o[a].replace(/^on/,""),l[e]=!0,c[e]||(c[e]=[]),c[e].push(r);
if(l.ready&&X.ready&&this.emit({
type:"ready",
client:this
}),l.error){
for(a=0,i=U.length;i>a;a++)if(X[U[a].replace(/^flash-/,"")]){
this.emit({
type:"error",
name:U[a],
client:this
});
break;
}
n!==t&&Ut.version!==n&&this.emit({
type:"error",
name:"version-mismatch",
jsVersion:Ut.version,
swfVersion:n
});
}
}
return this;
},rn=function(e,t){
var n,r,a,i,o,l=qt[this.id],s=l&&l.handlers;
if(!s)return this;
if(0===arguments.length)i=w(s);else if("string"==typeof e&&e)i=e.split(/\s+/);else if("object"==typeof e&&e&&"undefined"==typeof t)for(n in e)C.call(e,n)&&"string"==typeof n&&n&&"function"==typeof e[n]&&this.off(n,e[n]);
if(i&&i.length)for(n=0,r=i.length;r>n;n++)if(e=i[n].toLowerCase().replace(/^on/,""),
o=s[e],o&&o.length)if(t)for(a=o.indexOf(t);-1!==a;)o.splice(a,1),a=o.indexOf(t,a);else o.length=0;
return this;
},an=function(e){
var t=null,n=qt[this.id]&&qt[this.id].handlers;
return n&&(t="string"==typeof e&&e?n[e]?n[e].slice(0):[]:k(n)),t;
},on=function(e){
if(fn.call(this,e)){
"object"==typeof e&&e&&"string"==typeof e.type&&e.type&&(e=D({},e));
var t=D({},mt(e),{
client:this
});
dn.call(this,t);
}
return this;
},ln=function(e){
if(!qt[this.id])throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
e=pn(e);
for(var t=0;t<e.length;t++)if(C.call(e,t)&&e[t]&&1===e[t].nodeType){
e[t].zcClippingId?-1===Qt[e[t].zcClippingId].indexOf(this.id)&&Qt[e[t].zcClippingId].push(this.id):(e[t].zcClippingId="zcClippingId_"+Gt++,
Qt[e[t].zcClippingId]=[this.id],G.autoActivate===!0&&hn(e[t]));
var n=qt[this.id]&&qt[this.id].elements;
-1===n.indexOf(e[t])&&n.push(e[t]);
}
return this;
},sn=function(e){
var t=qt[this.id];
if(!t)return this;
var n,r=t.elements;
e="undefined"==typeof e?r.slice(0):pn(e);
for(var a=e.length;a--;)if(C.call(e,a)&&e[a]&&1===e[a].nodeType){
for(n=0;-1!==(n=r.indexOf(e[a],n));)r.splice(n,1);
var i=Qt[e[a].zcClippingId];
if(i){
for(n=0;-1!==(n=i.indexOf(this.id,n));)i.splice(n,1);
0===i.length&&(G.autoActivate===!0&&mn(e[a]),delete e[a].zcClippingId);
}
}
return this;
},cn=function(){
var e=qt[this.id];
return e&&e.elements?e.elements.slice(0):[];
},un=function(){
qt[this.id]&&(this.unclip(),this.off(),delete qt[this.id]);
},fn=function(e){
if(!e||!e.type)return!1;
if(e.client&&e.client!==this)return!1;
var t=qt[this.id],n=t&&t.elements,r=!!n&&n.length>0,a=!e.target||r&&-1!==n.indexOf(e.target),i=e.relatedTarget&&r&&-1!==n.indexOf(e.relatedTarget),o=e.client&&e.client===this;
return t&&(a||i||o)?!0:!1;
},dn=function(e){
var t=qt[this.id];
if("object"==typeof e&&e&&e.type&&t){
var n=gt(e),r=t&&t.handlers["*"]||[],a=t&&t.handlers[e.type]||[],o=r.concat(a);
if(o&&o.length){
var l,s,c,u,f,d=this;
for(l=0,s=o.length;s>l;l++)c=o[l],u=d,"string"==typeof c&&"function"==typeof i[c]&&(c=i[c]),
"object"==typeof c&&c&&"function"==typeof c.handleEvent&&(u=c,c=c.handleEvent),"function"==typeof c&&(f=D({},e),
bt(c,u,[f],n));
}
}
},pn=function(e){
return"string"==typeof e&&(e=[]),"number"!=typeof e.length?[e]:e;
},hn=function(e){
if(e&&1===e.nodeType){
var t=function(e){
(e||(e=i.event))&&("js"!==e._source&&(e.stopImmediatePropagation(),e.preventDefault()),
delete e._source);
},n=function(n){
(n||(n=i.event))&&(t(n),Ut.focus(e));
};
e.addEventListener("mouseover",n,!1),e.addEventListener("mouseout",t,!1),e.addEventListener("mouseenter",t,!1),
e.addEventListener("mouseleave",t,!1),e.addEventListener("mousemove",t,!1),en[e.zcClippingId]={
mouseover:n,
mouseout:t,
mouseenter:t,
mouseleave:t,
mousemove:t
};
}
},mn=function(e){
if(e&&1===e.nodeType){
var t=en[e.zcClippingId];
if("object"==typeof t&&t){
for(var n,r,a=["move","leave","enter","out","over"],i=0,o=a.length;o>i;i++)n="mouse"+a[i],
r=t[n],"function"==typeof r&&e.removeEventListener(n,r,!1);
delete en[e.zcClippingId];
}
}
};
Ut._createClient=function(){
tn.apply(this,j(arguments));
},Ut.prototype.on=function(){
return nn.apply(this,j(arguments));
},Ut.prototype.off=function(){
return rn.apply(this,j(arguments));
},Ut.prototype.handlers=function(){
return an.apply(this,j(arguments));
},Ut.prototype.emit=function(){
return on.apply(this,j(arguments));
},Ut.prototype.clip=function(){
return ln.apply(this,j(arguments));
},Ut.prototype.unclip=function(){
return sn.apply(this,j(arguments));
},Ut.prototype.elements=function(){
return cn.apply(this,j(arguments));
},Ut.prototype.destroy=function(){
return un.apply(this,j(arguments));
},Ut.prototype.setText=function(e){
if(!qt[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.setData("text/plain",e),this;
},Ut.prototype.setHtml=function(e){
if(!qt[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.setData("text/html",e),this;
},Ut.prototype.setRichText=function(e){
if(!qt[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.setData("application/rtf",e),this;
},Ut.prototype.setData=function(){
if(!qt[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.setData.apply(this,j(arguments)),this;
},Ut.prototype.clearData=function(){
if(!qt[this.id])throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.clearData.apply(this,j(arguments)),this;
},Ut.prototype.getData=function(){
if(!qt[this.id])throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
return Ut.getData.apply(this,j(arguments));
},"function"==typeof define&&define.amd?define("common/qq/jquery.plugin/ZeroClipboard.js",[],function(){
return Ut;
}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?module.exports=Ut:e.ZeroClipboard=Ut;
}(function(){
return this||window;
}());