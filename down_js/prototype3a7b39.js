!function(){
function t(t,n){
for(var r in n)t[r]=n[r];
return t;
}
function n(n,r){
if(r===!0){
var e;
if(Object.isArray(n)){
e=[];
for(var i in n)n.hasOwnProperty(i)&&e.push(Object.isObject(n[i])?Object.clone(n[i],!0):n[i]);
}else{
e={};
for(var i in n)n.hasOwnProperty(i)&&(e[i]=Object.isObject(n[i])?Object.clone(n[i],!0):n[i]);
}
return e;
}
return t({},n);
}
function r(t){
return!(!this||1!=t.nodeType);
}
function e(t){
return Object.prototype.toString.call(t)===b;
}
function i(t){
return Object.prototype.toString.call(t)===m;
}
function o(t){
return Object.prototype.toString.call(t)===h;
}
function c(t){
return Object.prototype.toString.call(t)===g;
}
function u(t){
return Object.prototype.toString.call(t)===l;
}
function a(t){
return Object.prototype.toString.call(t)===d;
}
function s(t){
return"undefined"==typeof t;
}
function f(t,n){
var r=[];
for(var e in t)t.hasOwnProperty(e)&&r.push(n===!0?[encodeURIComponent(e),"=",encodeURIComponent(t[e]),"&"].join(""):[e,"=",t[e],"&"].join(""));
return r.join("").slice(0,-1);
}
function p(t,n){
if("undefined"!=typeof n)for(var r in t)if(t.hasOwnProperty(r)&&n(t[r],r)===!1)break;
}
var h="[object Function]",l="[object Number]",g="[object String]",m="[object Array]",b="[object Object]",d="[object Date]";
t(Object,{
extend:t,
clone:n,
isObject:e,
isElement:r,
isArray:i,
isFunction:o,
isString:c,
isNumber:u,
isDate:a,
isUndefined:s,
param:f,
each:p
});
}(),Object.extend(String.prototype,function(){
function t(t){
return this.replace(/\{(\w+)\}/g,function(n,r){
return void 0!==t[r]?t[r]:n;
});
}
function n(){
return this.replace(/[^\x00-\xff]/g,"**").length;
}
function r(t,n){
return t=t||30,n=Object.isUndefined(n)?"...":n,this.length>t?this.slice(0,t-n.length)+n:String(this);
}
function e(t){
return t===!0?this.replace(/^\s+/,""):t===!1?this.replace(/\s+$/,""):this.replace(/^\s+/,"").replace(/\s+$/,"");
}
function i(t){
var n=["&","&amp;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;"];
t===!1&&n.reverse();
for(var r=0,e=this;r<n.length;r+=2)e=e.replace(new RegExp(n[r],"g"),n[1+r]);
return e;
}
function o(t){
return this.indexOf(t)>-1;
}
function c(t){
return 0===this.lastIndexOf(t,0);
}
function u(t){
var n=this.length-t.length;
return n>=0&&this.indexOf(t,n)===n;
}
function a(){
return""==this;
}
function s(){
return this.replace(/<\/?[^>]*\/?>/g,"");
}
function f(){
return/^\s*$/.test(this);
}
function p(){
var t,n,r,e=this,i=arguments.length;
if(1>i)return s;
for(t=0;i>t;)e=e.replace(/%s/,"{#"+t++ +"#}");
for(e.replace("%s",""),t=0;void 0!==(n=arguments[t]);)r=new RegExp("{#"+t+"#}","g"),
e=e.replace(r,n),t++;
return e;
}
function h(){
for(var t,n=this,r=0,e=0;t=n.charAt(r++);)e+=t.charCodeAt().toString(16).length/2;
return e;
}
function l(t,n){
if("function"==typeof this.split){
var r=this.split(n||"&"),e={};
return r.each(function(n){
arr=n.split("="),2==arr.length&&arr[0]&&arr[1]&&(t===!0?e[decodeURIComponent(arr[0])]=decodeURIComponent(arr[1]):e[arr[0]]=arr[1]);
}),e;
}
}
document.createElement("div");
return{
format:t,
sprintf:p,
text:s,
len:n,
truncate:r,
trim:String.prototype.trim||e,
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
startsWith:c,
endsWith:u,
param:l,
empty:a,
blank:f,
bytes:h
};
}()),Object.extend(Function.prototype,function(){
function t(t,n){
for(var r=t.length,e=n.length;e--;)t[r+e]=n[e];
return t;
}
function n(n,r){
return n=a.call(n,0),t(n,r);
}
function r(t){
if(arguments.length<2&&Object.isUndefined(arguments[0]))return this;
var r=this,e=a.call(arguments,1);
return function(){
var i=n(e,arguments);
return r.apply(t,i);
};
}
function e(t,n){
var r=this;
return args=a.call(arguments,2),t=1e3*t,window.setTimeout(function(){
return r.apply(n||r,args);
},t);
}
function i(){
var n=t([.01,null],arguments);
return this.delay.apply(this,n);
}
function o(t){
var n=this;
return function(){
return t.apply(this,arguments)===!1?!1:n.apply(this,arguments);
};
}
function c(n){
var r=this;
return function(){
var e=r.apply(this,arguments),i=t([e],arguments);
return n.apply(this,i),e;
};
}
function u(n){
var r=this;
return function(){
var e=t([r.bind(this)],arguments);
return n.apply(this,e);
};
}
var a=Array.prototype.slice;
return{
bind:r,
delay:e,
defer:i,
before:o,
after:c,
wrap:u
};
}()),function(){
function t(t,n){
for(var r=0,e=this.length>>>0;e>r;r++)r in this&&t.call(n,this[r],r,this);
}
function n(){
return this[this.length-1];
}
function r(t){
return t===!0?Object.clone.apply(this,arguments):c.call(this,0);
}
function e(t){
var n=[];
return this.each(function(r,e){
n.push(t(r,e));
}),n;
}
function i(t){
var n=-1;
return this.each(function(r,e){
return t==r?(n=e,!1):void 0;
}),n;
}
var o=Array.prototype,c=o.slice;
Object.extend(o,{
each:Array.prototype.forEach||t,
indexOf:Array.prototype.indexOf||i,
last:n,
clone:r,
map:e
});
}();