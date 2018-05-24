define("biz_web/lib/webuploader/dollar-builtin.js",[],function(){
function t(t,n){
var e;
if("function"!=typeof t&&"number"==typeof t.length){
for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t;
}else for(e in t)if(a.call(t,e)&&n.call(t[e],e,t[e])===!1)return t;
return t;
}
function n(e,r,i){
t(r,function(t,r){
i&&"object"==typeof r?("object"!=typeof e[t]&&(e[t]="array"===o(r)?[]:{}),n(e[t],r,i)):e[t]=r;
});
}
function e(t,n,e){
null==e?t.removeAttribute(n):t.setAttribute(n,e);
}
function r(t){
var n={};
return t="string"==typeof t&&l.test(t)?i.getElementById(RegExp.$1):t,t&&(n[0]=t,
n.length=1),r.extend(n,{
_wrap:!0,
get:function(){
return t;
},
addClass:function(n){
return t.classList.add(n),this;
},
removeClass:function(n){
return t.classList.remove(n),this;
},
html:function(n){
return n&&(t.innerHTML=n),t.innerHTML;
},
attr:function(n,o){
r.isObject(n)?r.each(n,function(n,r){
e(t,n,r);
}):e(t,n,o);
},
empty:function(){
return t.innerHTML="",this;
},
before:function(n){
t.parentNode.insertBefore(n,t);
},
append:function(n){
n=n._wrap?n.get():n,t.appendChild(n);
},
text:function(){
return t.textContent;
},
on:function(n,e){
return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent&&t.attachEvent("on"+n,e),
this;
},
off:function(n,e){
return t.removeEventListener?t.removeEventListener(n,e,!1):t.attachEvent&&t.detachEvent("on"+n,e),
this;
}
});
}
function o(t){
return null==t?String(t):f[s.call(t)]||"object";
}
var i=window.document,u=[],c=u.slice,f={},a=f.hasOwnProperty,s=f.toString,l=/^#(.*)$/;
return t("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){
f["[object "+n+"]"]=n.toLowerCase();
}),r.each=t,r.extend=function(t){
var e,r=c.call(arguments,1);
return"boolean"==typeof t&&(e=t,t=r.shift()),r.forEach(function(r){
r&&n(t,r,e);
}),t;
},r.type=o,r.isWindow=function(t){
return t&&t.window===t;
},r.isPlainObject=function(t){
if("object"!==o(t)||t.nodeType||r.isWindow(t))return!1;
try{
if(t.constructor&&!a.call(t.constructor.prototype,"isPrototypeOf"))return!1;
}catch(n){
return!1;
}
return!0;
},r.isObject=function(t){
return"object"===o(t);
},r.trim=function(t){
return t?t.trim():"";
},r.isFunction=function(t){
return"function"===o(t);
},u=null,r;
});