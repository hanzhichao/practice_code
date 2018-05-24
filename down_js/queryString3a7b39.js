define("common/qq/queryString.js",[],function(t,r,e){
"use strict";
function n(t){
this.url=t||location.href;
}
n.prototype={
constructor:n,
add:function(t,r){
if("undefined"==typeof r)return this;
var e,n=this.url.indexOf("?"),i=this.url.indexOf("#"),u=this.url,s="";
return e=(n>=0?"&":"?")+t+"="+r,i>=0&&(u=this.url.substring(0,i),s=this.url.substring(i)),
this.url=u+e+s,this;
},
replace:function(t,r){
return"undefined"==typeof r?this:(this.remove(t),this.add(t,r),this);
},
replaceAll:function(t){
if("object"!=typeof t||null==t)return this;
for(var r in t)t.hasOwnProperty(r)&&this.replace(r,encodeURIComponent(t[r]));
return this;
},
remove:function(t){
var r=new RegExp("([?&])"+t+"=[^&#]*([&#])?");
return this.url=this.url.replace(r,function(t,r,e){
return"?"===r?r:e||"";
}),this;
},
getUrl:function(){
return this.url;
}
},n.replace=function(t,r,e){
var i=new n(t);
return i.replace(r,e),i.getUrl();
},e.exports=n;
});