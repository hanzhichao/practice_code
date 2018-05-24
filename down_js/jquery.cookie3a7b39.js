!function(e){
"function"==typeof define&&define.amd?define("jquery.cookie.js",["jquery.js"],["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery.js")):e(jQuery);
}(function(e){
function n(e){
return u.raw?e:encodeURIComponent(e);
}
function o(e){
return u.raw?e:decodeURIComponent(e);
}
function i(e){
return n(u.json?JSON.stringify(e):String(e));
}
function r(e){
0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));
try{
return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e;
}catch(n){}
}
function t(n,o){
var i=u.raw?n:r(n);
return e.isFunction(o)?o(i):i;
}
var c=/\+/g,u=e.cookie=function(r,c,s){
if(arguments.length>1&&!e.isFunction(c)){
if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){
var a=s.expires,d=s.expires=new Date;
d.setMilliseconds(d.getMilliseconds()+864e5*a);
}
return document.cookie=[n(r),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("");
}
for(var f=r?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){
var j=p[l].split("="),x=o(j.shift()),g=j.join("=");
if(r===x){
f=t(g,c);
break;
}
r||void 0===(g=t(g))||(f[x]=g);
}
return f;
};
u.defaults={},e.removeCookie=function(n,o){
return e.cookie(n,"",e.extend({},o,{
expires:-1
})),!e.cookie(n);
};
});