define("common/lib/MockJax.js",[],function(){
!function(e){
function t(t){
void 0==window.DOMParser&&window.ActiveXObject&&(DOMParser=function(){},DOMParser.prototype.parseFromString=function(e){
var t=new ActiveXObject("Microsoft.XMLDOM");
return t.async="false",t.loadXML(e),t;
});
try{
var n=(new DOMParser).parseFromString(t,"text/xml");
if(!e.isXMLDoc(n))throw"Unable to parse XML";
var s=e("parsererror",n);
if(1==s.length)throw"Error: "+e(n).text();
return n;
}catch(o){
var r=void 0==o.name?o:o.name+": "+o.message;
return void e(document).trigger("xmlParseError",[r]);
}
}
function n(t,n,s){
(t.context?e(t.context):e.event).trigger(n,s);
}
function s(t,n){
var o=!0;
return"string"==typeof n?e.isFunction(t.test)?t.test(n):t==n:(e.each(t,function(r){
return void 0===n[r]?o=!1:void(o="object"==typeof n[r]?o&&s(t[r],n[r]):e.isFunction(t[r].test)?o&&t[r].test(n[r]):o&&t[r]==n[r]);
}),o);
}
function o(t,n){
if(e.isFunction(t))return t(n);
if(e.isFunction(t.url.test)){
if(!t.url.test(n.url))return null;
}else{
var o=t.url.indexOf("*");
if(t.url!==n.url&&-1===o||!new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g,"\\$&").replace(/\*/g,".+")).test(n.url))return null;
}
return t.data&&n.data&&!s(t.data,n.data)?null:t&&t.type&&t.type.toLowerCase()!=n.type.toLowerCase()?null:t;
}
function r(n,s,o){
var r=function(r){
return function(){
return function(){
var r;
this.status=n.status,this.statusText=n.statusText,this.readyState=4,e.isFunction(n.response)&&n.response(o),
"json"==s.dataType&&"object"==typeof n.responseText?this.responseText=JSON.stringify(n.responseText):"xml"==s.dataType?"string"==typeof n.responseXML?(this.responseXML=t(n.responseXML),
this.responseText=n.responseXML):this.responseXML=n.responseXML:this.responseText=n.responseText,
("number"==typeof n.status||"string"==typeof n.status)&&(this.status=n.status),"string"==typeof n.statusText&&(this.statusText=n.statusText),
r=this.onreadystatechange||this.onload,e.isFunction(r)?(n.isTimeout&&(this.status=-1),
r.call(this,n.isTimeout?"timeout":void 0)):n.isTimeout&&(this.status=-1);
}.apply(r);
};
}(this);
n.proxy?g({
global:!1,
url:n.proxy,
type:n.proxyType,
data:n.data,
dataType:"script"===s.dataType?"text/plain":s.dataType,
complete:function(e){
n.responseXML=e.responseXML,n.responseText=e.responseText,n.status=e.status,n.statusText=e.statusText,
this.responseTimer=setTimeout(r,n.responseTime||0);
}
}):s.async===!1?r():this.responseTimer=setTimeout(r,n.responseTime||50);
}
function a(t,n,s,o){
return t=e.extend(!0,{},e.mockjaxSettings,t),"undefined"==typeof t.headers&&(t.headers={}),
t.contentType&&(t.headers["content-type"]=t.contentType),{
status:t.status,
statusText:t.statusText,
readyState:1,
open:function(){},
send:function(){
o.fired=!0,r.call(this,t,n,s);
},
abort:function(){
clearTimeout(this.responseTimer);
},
setRequestHeader:function(e,n){
t.headers[e]=n;
},
getResponseHeader:function(e){
return t.headers&&t.headers[e]?t.headers[e]:"last-modified"==e.toLowerCase()?t.lastModified||(new Date).toString():"etag"==e.toLowerCase()?t.etag||"":"content-type"==e.toLowerCase()?t.contentType||"text/plain":void 0;
},
getAllResponseHeaders:function(){
var n="";
return e.each(t.headers,function(e,t){
n+=e+": "+t+"\n";
}),n;
}
};
}
function i(e,t,n){
if(u(e),e.dataType="json",e.data&&T.test(e.data)||T.test(e.url)){
c(e,t,n);
var s=/^(\w+:)?\/\/([^\/?#]+)/,o=s.exec(e.url),r=o&&(o[1]&&o[1]!==location.protocol||o[2]!==location.host);
if(e.dataType="script","GET"===e.type.toUpperCase()&&r){
var a=l(e,t,n);
return a?a:!0;
}
}
return null;
}
function u(e){
"GET"===e.type.toUpperCase()?T.test(e.url)||(e.url+=(/\?/.test(e.url)?"&":"?")+(e.jsonp||"callback")+"=?"):e.data&&T.test(e.data)||(e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?");
}
function l(t,n,s){
var o=s&&s.context||t,r=null;
return n.response&&e.isFunction(n.response)?n.response(s):e.globalEval("object"==typeof n.responseText?"("+JSON.stringify(n.responseText)+")":"("+n.responseText+")"),
p(t,o,n),d(t,o,n),e.Deferred&&(r=new e.Deferred,"object"==typeof n.responseText?r.resolveWith(o,[n.responseText]):r.resolveWith(o,[e.parseJSON(n.responseText)])),
r;
}
function c(e,t,n){
var s=n&&n.context||e,o=e.jsonpCallback||"jsonp"+m++;
e.data&&(e.data=(e.data+"").replace(T,"="+o+"$1")),e.url=e.url.replace(T,"="+o+"$1"),
window[o]=window[o]||function(n){
data=n,p(e,s,t),d(e,s,t),window[o]=void 0;
try{
delete window[o];
}catch(r){}
head&&head.removeChild(script);
};
}
function p(e,t,s){
e.success&&e.success.call(t,s.responseText||"",status,{}),e.global&&n(e,"ajaxSuccess",[{},e]);
}
function d(t,s){
t.complete&&t.complete.call(s,{},status),t.global&&n("ajaxComplete",[{},t]),t.global&&!--e.active&&e.event.trigger("ajaxStop");
}
function f(t,n){
var s,r,u;
"object"==typeof t?(n=t,t=void 0):n.url=t,r=e.extend(!0,{},e.ajaxSettings,n);
for(var l=0;l<h.length;l++)if(h[l]&&(u=o(h[l],r)))return y.push(r),e.mockjaxSettings.log(u,r),
"jsonp"===r.dataType&&(s=i(r,u,n))?s:(u.cache=r.cache,u.timeout=r.timeout,u.global=r.global,
x(u,n),function(t,n,o,r){
s=g.call(e,e.extend(!0,{},o,{
xhr:function(){
return a(t,n,o,r);
}
}));
}(u,r,n,h[l]),s);
return g.apply(e,[n]);
}
function x(e,t){
if(e.url instanceof RegExp&&e.hasOwnProperty("urlParams")){
var n=e.url.exec(t.url);
if(1!==n.length){
n.shift();
var s=0,o=n.length,r=e.urlParams.length,a=Math.min(o,r),i={};
for(s;a>s;s++){
var u=e.urlParams[s];
i[u]=n[s];
}
t.urlParams=i;
}
}
}
var g=e.ajax,h=[],y=[],T=/=\?(&|$)/,m=(new Date).getTime();
e.extend({
ajax:f
}),e.mockjaxSettings={
log:function(t,n){
if(t.logging!==!1&&("undefined"!=typeof t.logging||e.mockjaxSettings.logging!==!1)&&window.console&&console.log){
var s="MOCK "+n.type.toUpperCase()+": "+n.url,o=e.extend({},n);
if("function"==typeof console.log)console.log(s,o);else try{
console.log(s+" "+JSON.stringify(o));
}catch(r){
console.log(s);
}
}
},
logging:!0,
status:200,
statusText:"OK",
responseTime:500,
isTimeout:!1,
contentType:"text/plain",
response:"",
responseText:"",
responseXML:"",
proxy:"",
proxyType:"GET",
lastModified:null,
etag:"",
headers:{
etag:"IJF@H#@923uf8023hFO@I#H#",
"content-type":"text/plain"
}
},e.mockjax=function(e){
var t=h.length;
return h[t]=e,t;
},e.mockjaxClear=function(e){
1==arguments.length?h[e]=null:h=[],y=[];
},e.mockjax.handler=function(e){
return 1==arguments.length?h[e]:void 0;
},e.mockjax.mockedAjaxCalls=function(){
return y;
};
}(jQuery);
});