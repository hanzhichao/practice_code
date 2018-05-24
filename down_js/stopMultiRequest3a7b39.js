define("common/wx/stopMultiRequest.js",[],function(){
"use strict";
var t={},n=function(t){
var n=t.split(/&/);
return n;
},r=function(t){
if(!t)return[];
var n=[];
for(var r in t)n.push(r+"="+t[r]);
return n;
},e=function(t){
var e=t.url.indexOf("?"),u=[],i=t.url;
e>=0&&(u=n(t.url.substr(e+1)),i=i.substr(0,e)),"string"==typeof t.data?u=u.concat(n(t.data)):"object"==typeof t.data&&(u=u.concat(r(t.data)));
var a=i+"?"+u.sort().join("&");
return a.replace(/random=[^&]*/,"");
};
return $.ajaxPrefilter(function(n,r,u){
if(!/^GET$/i.test(n.type)){
var i=function(n,r){
r.pendingRequestKey=n,t[n]=!0;
},a=e(n);
if(t[a])return u.abort(),void(t[a]=!1);
i(a,u),n.btn&&$(n.btn).btn(!1);
var o=n.complete;
n.complete=function(r){
n.btn&&$(n.btn).btn(!0),t[r.pendingRequestKey]=null,$.isFunction(o)&&o.apply(this,arguments);
};
}
}),{};
});