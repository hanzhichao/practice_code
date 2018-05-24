define("common/qq/url.js",[],function(t,i,a){
"use strict";
function n(t){
var i=this,a="";
if(this.base="",this.param={},t){
var n=t.match(/(\w.*?)\?([^#]*)(#(.*))?$/);
n&&n[1]&&n[2]&&(this.base=n[1],a=n[2]);
}else this.base=[window.location.origin,window.location.pathname].join(""),a=window.location.search.slice(1);
a=a.split("&"),a.each(function(t){
t=t&&t.split("="),2==t.length&&(i.param[t[0]]=t[1]);
});
}
n.prototype={
get:function(t){
return t?this.param[t]:this.param;
},
set:function(t,i){
var a={};
return $.isPlainObject(t)?(a=$.extend(!0,{},this.param,t),new n([this.base,"?",Object.param(a)].join(""))):"string"==typeof t&&i?(a=Object.clone(this.param),
a[t]=i,new n([this.base,"?",Object.param(a)].join(""))):this;
},
toString:function(){
return[this.base,"?",Object.param(this.param)].join("");
}
},a.exports=n;
});