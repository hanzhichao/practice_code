define("ad_system/host_push.js",["common/wx/popover.js","common/wx/popup.js","safe/Scan.js","common/wx/Tips.js","ad_system/helper.js","common/wx/Cgi.js","common/wx/top.js"],function(s){
"use strict";
function t(s,t){
var o=$("#js_status");
n.post({
url:wx.url("/safe/safeuuid"),
data:{
uuid:s,
action:"json",
type:"json"
},
mask:!1
},function(s){
switch(s.errcode){
case r.UUID_ERROR:
return void e();

case r.UUID_EXPIRED:
return void e();

case r.UUID_SCANED:
o.html(u.scaned);
break;

case r.UUID_CANCELED:
return e(),void o.html(u.cancel);

case r.UUID_CONFIRM:
return o.html(u.ok),c.suc("已确认成功"),void(location.href=location.href);
}
t();
});
}
function e(){
n.post({
url:wx.url("/misc/safeassistant"),
data:{
action:"get_ticket"
}
},function(s){
return s&&s.base_resp&&0==s.base_resp.ret?void n.post({
url:wx.url("/safe/safeqrconnect"),
data:{
state:"0",
login_type:"safe_center",
f:"json",
type:"json",
ticket:s.ticket
},
mask:!1
},function(e){
if(e&&e.uuid){
var o=e.uuid,c="/safe/safeqrcode?ticket=%s&uuid=%s&action=%s".sprintf(s.ticket,o,"list"==a?"ad_helper":"ad_host_helper");
l.find(".js_qrcode").attr("src",c);
var n=function(){
t(o,function(){
d=setTimeout(n,1e3);
});
};
d=setTimeout(n,1e3);
}
}):void c.err("系统错误，请稍后重试");
});
}
var o=s("common/wx/popover.js"),c=(s("common/wx/popup.js"),s("safe/Scan.js"),s("common/wx/Tips.js")),n=(s("ad_system/helper.js"),
s("common/wx/Cgi.js")),i=s("common/wx/top.js"),a=wx.cgiData.action;
"list"==a?new i("#topTab",i.DATA.adClient).selected("adclientreport"):new i("#topTab",i.DATA.adHost).selected("adhostreport");
var r={
OK:0,
ERR_SYS:-1,
ERR_ARGS:-2,
ERR_APP_BLOCK:-10,
UUID_SCANNING:401,
UUID_EXPIRED:402,
UUID_CANCELED:403,
UUID_SCANED:404,
UUID_CONFIRM:405,
UUID_INIT:406,
UUID_REQUEST:407,
UUID_ERROR:500
},u={
scaned:'<div class="status tips_confirm"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>扫描成功</h4><p>请在微信上点击确认即可</p></div></div>',
cancel:'<div class="status tips_cancel"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>你已取消此次操作</h4><p>你可以重新扫描验证，或关闭窗口</p></div></div>',
ok:'<div class="status tips_succ"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>绑定成功</h4></div></div>'
},l=null,d=null;
$(".js_bind").click(function(){
wx.cgiData.bound_num>4||(l=$("#tpl_dialog").popup({
title:"绑定微信号",
className:"dialog_bind_wx",
close:function(){
this.remove(),l=null;
},
buttons:[]
}),clearTimeout(d),e());
});
var _=null;
$("#js_list").on("click",".js_unbind",function(){
var s=$(this).next().find(".js_unbindBtn").data("alias");
_&&_.remove(),_=new o({
dom:this,
content:"确定解除绑定吗？",
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
n.post({
url:"/merchant/ad_host_push",
data:{
action:"unbind",
alias:s,
type:"list"==a?"client":"host"
}
},function(s){
console.log(s),s.base_resp&&0==s.base_resp.ret?(c.suc("已成功解除绑定"),setTimeout(function(){
location.reload();
},300)):c.err("系统错误，请重试");
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
});