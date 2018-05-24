"use strict";
define("utils/prototype/function.vue.js",["utils/prototype/object.vue.js"],function(t){
t("utils/prototype/object.vue.js"),Object.extend(Function.prototype,function(){
function t(t,n){
for(var r=t.length,e=n.length;e--;)t[r+e]=n[e];
return t;
}
function n(n,r){
var e=s.call(n,0);
return t(e,r);
}
function r(t){
var r=arguments,e=this,u=s.call(arguments,1);
return arguments.length<2&&Object.isUndefined(arguments[0])?this:function(){
var i=n(u,r);
return e.apply(t,i);
};
}
function e(t,n){
var r=this,e=s.call(arguments,2),u=1e3*t;
return window.setTimeout(function(){
return r.apply(n||r,e);
},u);
}
function u(){
var n=t([.01,null],arguments);
return this.delay.apply(this,n);
}
function i(t){
var n=this,r=arguments,e=this;
return function(){
return t.apply(n,r)===!1?!1:e.apply(n,r);
};
}
function a(n){
var r=this,e=arguments,u=this;
return function(){
var i=u.apply(r,e),a=t([i],e);
return n.apply(r,a),i;
};
}
function o(n){
var r=this,e=arguments,u=this;
return function(){
var i=t([u.bind(r)],e);
return n.apply(r,i);
};
}
var s=Array.prototype.slice;
return{
bind:Function.prototype.bind||r,
delay:e,
defer:u,
before:i,
after:a,
wrap:o
};
}());
});