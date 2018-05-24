define("entityshop/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=document.createElement("script"),r=document.head||document.getElementsByTagName("head")[0]||document.documentElement,i=t.url+"&t="+Math.random(),d=t.callbackName,a="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,c="undefined"==typeof t.timeoutCode?500:t.timeoutCode,l="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,s=!1,f=null,m=function(e){
o&&!s&&(s=!0,f&&(clearTimeout(f),f=null),o.onload=o.onreadystatechange=o.onerror=null,
r&&o.parentNode&&r.removeChild(o),o=null,d&&-1==d.indexOf(".")&&(window[d]=null),
e!=u&&"loaded"!=a&&"function"==typeof t.onerror&&t.onerror(e));
};
if(d&&"function"==typeof t.callback){
var p=d;
-1==d.indexOf(".")&&(d=window[d]?d+e.counter++:d,window[d]=function(){
a="loaded",t.callback.apply(null,arguments);
}),i=i.replace("="+p,"="+d);
}
o.onload=o.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&m("loaded"==a?u:l);
},o.onerror=function(){
return n>0?(t.retry=n-1,f&&(clearTimeout(f),f=null),void e(t)):void m(l);
},t.timeout&&(f=setTimeout(function(){
m(c);
},parseInt(t.timeout,10))),a="loading",o.charset="utf-8",setTimeout(function(){
o.src=i;
try{
r.insertBefore(o,r.lastChild);
}catch(e){}
},0);
}
return e;
});