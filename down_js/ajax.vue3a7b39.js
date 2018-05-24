"use strict";
function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("utils/ajax.vue.js",["components/tips.vue.js"],function(e,t,r){
var a=void 0,o=function(){},n=e("components/tips.vue.js"),i=function(e,t){
var r=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==t.url.indexOf("/misc/safeassistant")||-1!==t.url.indexOf("/safe/safeuuid")),o=11;
switch(e){
case"timeout":
o=7;
break;

case"error":
o=8;
break;

case"notmodified":
o=9;
break;

case"parsererror":
o=10;
break;

default:
o=11;
}
for(var i=["lang","random","f","ajax","token"],u=0;u<i.length;++u){
var s=i[u];
t.data&&t.data[s]&&delete t.data[s];
}
o+=r?100:0,a({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:window.commonData.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:t.url,
param:JSON.stringify(t.data).substr(0,50),
info:e
}),
id:o,
level:"error"
},
type:"POST"
}),a({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:window.commonData.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:t.url,
param:JSON.stringify(t.data).substr(0,50),
info:e
}),
id:6+(r?100:0),
level:"error"
},
type:"POST"
}),"timeout"===e&&n.err("你的网络环境较差，请稍后重试");
};
a=function(e){
var t=(e.type||"GET").toUpperCase(),r=e.url,a="undefined"==typeof e.async?!0:e.async,n=new XMLHttpRequest;
n.donotHock=!!e.donotHock;
var u=null,s=null,c=o,d=o,f=o;
if(e.success&&(c=function(t){
try{
e.success(t);
}catch(r){
throw r;
}
}),e.error&&(d=function(t,r){
try{
e.error(t,r),i(r,e);
}catch(a){
throw a;
}
}),e.complete&&(f=function(){
try{
e.complete();
}catch(t){
throw t;
}
}),"object"===_typeof(e.data)){
var l=e.data;
s=[];
for(var p in l)l.hasOwnProperty(p)&&s.push(p+"="+encodeURIComponent(l[p]));
s=s.join("&");
}else s="string"==typeof e.data?e.data:null;
n.open(t,r,a),n.onerror=function(){
d(n,"error"),u&&clearTimeout(u),f();
},n.onreadystatechange=function(){
if(3===n.readyState&&e.received&&e.received(n),4===n.readyState){
n.onreadystatechange=null;
var t=n.status;
if(t>=200&&400>t)try{
var r=n.responseText,a=r;
if("json"===e.dataType)try{
a=JSON.parse(a);
}catch(i){
return void d(n,"parsererror");
}
c(a);
}catch(i){
throw i;
}else d(n,"error");
u&&clearTimeout(u),f(),f=o;
}
},"POST"===t&&n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
n.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(u=setTimeout(function(){
n.abort("timeout"),d(n,"timeout"),f(),f=o;
},e.timeout));
try{
n.send(s);
}catch(m){
d(n,"timeout");
}
},r.exports=a;
});