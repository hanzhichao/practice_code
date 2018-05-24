define("statistics/report.js",[],function(){
"use strict";
function n(n,t,i){
var a=e(),c=r();
a>s&&o(n,a),c>s&&o(t,c);
var w=c+a,f=wx.data.uin,d="/misc/fdevreport?id=%s&key=%s&uin=%s&cost_time=%s".sprintf("10001",i,f,w);
u.ajax({
url:wx.url(d),
type:"GET",
success:function(){}
});
}
function t(e,r,o){
i()||(window._points.length>20?n(e,r,o):setTimeout(function(){
t(e,r,o);
},1e3));
}
function i(){
return!(window.performance&&window.performance.timing&&window.performance.timing.navigationStart);
}
function e(){
return window._points[12]-window._points[0];
}
function r(){
return window._points[22]-window._points[12];
}
function o(n,t){
jQuery.ajax({
url:"/misc/jslog?1=1"+wx.data.param,
type:"POST",
data:{
content:"[time=%s,key=%s]".sprintf(t,n),
id:n,
level:"error"
}
});
}
var s=3e3,u=jQuery;
return t;
});