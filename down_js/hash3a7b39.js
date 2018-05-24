define("common/wx/hash.js",[],function(t,n,a){
"use strict";
a.exports={
setHash:function(t){
setTimeout(function(){
location.hash=t;
},0);
},
getHash:function(t){
var n=t||location.hash;
return n?n.replace(/.*#/,""):"";
},
getHashModelName:function(){
var t=this.getHash();
return""==t?"":t?t.split("&")[0].split("=")[0]:[];
},
getHashActionName:function(){
var t=this.getHash();
return""==t?"":(t?t.split("&"):[])[0].split("=")[1];
},
getHashParam:function(t){
var n=this.getHash().match(new RegExp("(^|&)"+t+"=([^&]*)(&|$)"));
return null!=n?n[2]:"";
},
getUrlParam:function(t){
var n=arguments[1]||window.location.search,a=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=n.substr(n.indexOf("?")+1).match(a);
return null!=e?e[2]:"";
},
getParams:function(){
var t=[],n=this.getHash();
paramArr=n?n.split("&"):[];
for(var a=1,e=paramArr.length;e>a;a++)t.push(paramArr[a]);
return t;
},
decodeUrl:function(t){
t=decodeURIComponent(t);
var n=this.parseUrl(t),a=[];
$.each(n.params,function(t,n){
n=decodeURIComponent(n),a.push(t+"="+n);
});
var e=t.split("?")[0];
return e+"?"+a.join("&");
}
};
});