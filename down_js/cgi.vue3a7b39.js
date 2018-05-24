"use strict";
define("utils/cgi.vue.js",["utils/ajax.vue.js"],function(a,t,e){
var n=a("utils/ajax.vue.js"),o={
token:window.commonData.data.t,
lang:window.commonData.data.lang,
f:"json",
ajax:"1"
},s=function(a){
var t=a||{};
for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);
return t;
},r={};
r.get=function(a,t,e,o){
a.data=s(a.data),a.success=t,a.error=e,a.complete=o,a.dataType="json",n(a);
},r.post=function(a,t,e,o){
a.type="POST",a.data=s(a.data),a.success=t,a.error=e,a.complete=o,a.dataType="json",
n(a);
},e.exports=r;
});