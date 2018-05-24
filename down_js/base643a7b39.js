define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});