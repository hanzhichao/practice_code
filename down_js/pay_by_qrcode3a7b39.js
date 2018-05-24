define("common/wx/pay_by_qrcode.js",["common/wx/Cgi.js","common/wx/Tips.js","tpl/pay_by_qrcode.html.js","biz_web/lib/json.js","common/wx/time.js"],function(o,t,e){
"use strict";
function r(o){
this.orderId=o.orderId,this.container=$(o.container),this.onfinish=o.onfinish,this.pollingFlag=null,
this.init();
}
var i=wx.T,n=o("common/wx/Cgi.js"),a=(o("common/wx/Tips.js"),o("tpl/pay_by_qrcode.html.js")),s=o("biz_web/lib/json.js"),c=o("common/wx/time.js"),l=2e3;
r.prototype={
init:function(){
var o=this;
n.get({
url:"/acct/realnameorder",
data:{
order_id:o.orderId,
action:"detail"
},
mask:!1
},function(t){
if(0==+t.base_resp.ret){
var e=s.parse(t.order);
e.qrcode=wx.url("/acct/realnameorder?action=get_qrcode&order_id="+o.orderId+"&t="+Math.random()),
e.create_time=c.getFullTime(e.create_time),o.container.html(i(a,e)),o.keepPolling();
}
});
},
keepPolling:function(){
var o=this;
o.poll();
},
stopPolling:function(){
var o=this;
clearTimeout(o.pollingFlag);
},
poll:function(){
var o=this;
n.get({
url:"/acct/realnameorder",
data:{
action:"query",
order_id:o.orderId
},
mask:!1,
error:function(){
o.pollingFlag=setTimeout(o.poll,l);
}
},function(t){
0!=t.base_resp.ret||1!=t.order_info.status&&3!=t.order_info.status&&6!=t.order_info.status?o.pollingFlag=setTimeout(function(){
o.poll();
},l):(wx.cgiData.status=t.order_info.status,$("#js_qrcodeBd").addClass("pay_succ"),
"function"==typeof o.onfinish&&o.onfinish(t));
});
},
refresh:function(){
$("#js_qrcode").attr("src","/acct/realnameorder?action=get_qrcode&order_id="+this.orderId+"&t="+Math.random());
}
},e.exports=r;
});