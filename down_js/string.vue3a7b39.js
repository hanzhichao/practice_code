"use strict";
function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
define("utils/prototype/string.vue.js",["utils/prototype/object.vue.js"],function(t){
t("utils/prototype/object.vue.js"),Object.extend(String.prototype,function(){
function t(t){
return this.replace(/\{(\w+)\}/g,function(e,n){
return void 0!==t[n]?t[n]:e;
});
}
function e(){
return this.replace(/[^\x00-\xff]/g,"**").length;
}
function n(t,e){
var n=t||30,r=Object.isUndefined(e)?"...":e;
return this.length>n?this.slice(0,n-r.length)+r:String(this);
}
function r(t){
return t===!0?this.replace(/^\s+/,""):t===!1?this.replace(/\s+$/,""):this.replace(/^\s+/,"").replace(/\s+$/,"");
}
function i(t){
var e=["&","&amp;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;"];
t===!1&&e.reverse();
for(var n=this,r=0;r<e.length;r+=2)n=n.replace(new RegExp(e[r],"g"),e[1+r]);
return n;
}
function o(t){
return this.indexOf(t)>-1;
}
function s(t){
return 0===this.lastIndexOf(t,0);
}
function u(t){
var e=this.length-t.length;
return e>=0&&this.indexOf(t,e)===e;
}
function c(){
return""===this;
}
function f(){
return this.replace(/<\/?[^>]*\/?>/g,"");
}
function p(){
return/^\s*$/.test(this);
}
function h(){
var t=void 0,e=this,n=void 0,r=void 0,i=arguments.length;
if(1>i)return f;
for(t=0;i>t;)e=e.replace(/%s/,"{#"+t++ +"#}");
for(e.replace("%s",""),t=0;;){
if(n=arguments[t],void 0===n)break;
r=new RegExp("{#"+t+"#}","g"),e=e.replace(r,n),t++;
}
return e;
}
function l(){
for(var t=this,e=0,n=void 0,r=0,i=!0;i&&(n=t.charAt(e++));)r+=n.charCodeAt().toString(16).length/2;
return r;
}
function a(t,e){
var n=this;
if("function"==typeof this.split){
var r=function(){
var r=n.split(e||"&"),i={};
return r.each(function(e){
var n=e.split("=");
2===n.length&&n[0]&&n[1]&&(t===!0?i[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):i[n[0]]=n[1]);
}),{
v:i
};
}();
if("object"===("undefined"==typeof r?"undefined":_typeof(r)))return r.v;
}
}
return{
format:t,
sprintf:h,
text:f,
len:e,
truncate:n,
trim:String.prototype.trim||r,
https2http:function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},
http2https:function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},
nogif:function(){
return this.indexOf("wx_fmt=gif")>-1||this.indexOf("/mmbiz_gif/")>-1?this.replace("/0?","/s640?").replace("wx_fmt=gif",""):this.toString();
},
html:i,
has:o,
startsWith:s,
endsWith:u,
param:a,
empty:c,
blank:p,
bytes:l
};
}());
});