"use strict";
define("utils/prototype/object.vue.js",[],function(){
function t(t,e){
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);
return t;
}
function e(e,n){
var r=void 0;
if(n===!0){
if(Object.isArray(e)){
r=[];
for(var o in e)e.hasOwnProperty(o)&&r.push(Object.isObject(e[o])?Object.clone(e[o],!0):e[o]);
}else{
r={};
for(var o in e)e.hasOwnProperty(o)&&(r[o]=Object.isObject(e[o])?Object.clone(e[o],!0):e[o]);
}
return r;
}
return t({},e);
}
function n(t){
return!(!this||1!==t.nodeType);
}
function r(t){
return Object.prototype.toString.call(t)===y;
}
function o(t){
return Object.prototype.toString.call(t)===l;
}
function i(t){
return Object.prototype.toString.call(t)===b;
}
function c(t){
return Object.prototype.toString.call(t)===O;
}
function u(t){
return Object.prototype.toString.call(t)===s;
}
function a(t){
return Object.prototype.toString.call(t)===d;
}
function f(t){
return"undefined"==typeof t;
}
function j(t,e){
var n=[];
for(var r in t)t.hasOwnProperty(r)&&n.push(e===!0?[encodeURIComponent(r),"=",encodeURIComponent(t[r]),"&"].join(""):[r,"=",t[r],"&"].join(""));
return n.join("").slice(0,-1);
}
function p(t,e){
if("undefined"!=typeof e)for(var n in t)if(t.hasOwnProperty(n)&&e(t[n],n)===!1)break;
}
var b="[object Function]",s="[object Number]",O="[object String]",l="[object Array]",y="[object Object]",d="[object Date]";
t(Object,{
extend:t,
clone:e,
isObject:r,
isElement:n,
isArray:o,
isFunction:i,
isString:c,
isNumber:u,
isDate:a,
isUndefined:f,
param:j,
each:p
});
});