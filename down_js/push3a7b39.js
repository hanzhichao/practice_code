define("shop/push.js",["common/wx/Cgi.js","safe/Scan.js","common/wx/top.js","common/wx/Tips.js","common/wx/popover.js","common/wx/popup.js"],function(t){
"use strict";
function s(){
clearInterval(v);
}
function i(t,i){
var e=$("#js_status");
l.post({
url:wx.url("/safe/safeuuid"),
data:{
uuid:t,
action:"json",
type:"json"
},
mask:!1
},function(t){
switch(t.errcode){
case h.UUID_ERROR:
return void n();

case h.UUID_EXPIRED:
return void n();

case h.UUID_SCANED:
e.html(j.scaned);
break;

case h.UUID_CANCELED:
return n(),void e.html(j.cancel);

case h.UUID_CONFIRM:
return e.html(j.ok),p.suc("已确认成功"),location.reload(),void s();

default:
l.handleRet(t,{
id:64462,
key:95,
url:"/safe/safeuuid"
});
}
i();
});
}
function n(){
s(),l.post({
url:wx.url("/misc/safeassistant"),
data:{
action:"get_ticket"
}
},function(t){
return t&&t.base_resp&&0==t.base_resp.ret?void l.get({
url:"/safe/safeqrconnect",
data:{
state:"0",
ticket:t.ticket
},
mask:!1
},function(s){
if(s&&s.uuid){
var n=s.uuid,e="/safe/safeqrcode?ticket=%s&uuid=%s&action=%s".sprintf(t.ticket,n,"merchant_helper");
m.find(".js_qrcode").attr("src",e);
var o=function(){
i(n,function(){});
};
v=setInterval(o,2e3);
}
}):void p.err("系统错误，请稍后重试");
});
}
function e(){
U=wx.cgiData.push_acct,D=wx.cgiData.left_cnt,r=$(".js_btn_add"),u=$("#js_div_list");
}
function o(){
new _("#topTab",_.DATA.shop).selected(0),$("#js_div_list").html(d("tpl_list",{
list:U
})),0>=D&&r.disable();
}
function c(){
$("#js_div_main").on("click",".js_btn_add",function(){
return $(this).hasClass("btn_disabled")?!1:(m=$("#tpl_dialog").popup({
title:"绑定微信号",
className:"dialog_bind_wx",
close:function(){
this.remove(),m=null,s();
},
buttons:[]
}),void n());
});
var t=null;
u.on("click",".js_btn_remove",function(){
var s=$(this).data("wxid");
t&&t.remove(),t=new f({
dom:this,
content:"确定要解除绑定吗？",
buttons:[{
text:"确定",
click:function(){
return this.$pop.find(".jsPopoverBt").eq(0).hasClass("btn_loading")?!1:(this.$pop.find(".jsPopoverBt").eq(0).btn(!1),
this.$pop.find(".jsPopoverBt").eq(1).disable(),void l.post({
url:"/merchant/merchantpush",
data:{
action:"unbind",
wechat_id:s
}
},function(t){
t.base_resp&&0==t.base_resp.ret?(p.suc("已成功解除绑定"),setTimeout(function(){
location.reload();
},300)):p.err("系统错误，请重试");
}));
},
type:"primary"
},{
text:"取消",
click:function(){
return this.$pop.find(".jsPopoverBt").eq(1).hasClass("btn_disabled")?!1:void this.remove();
}
}]
});
});
}
function a(){
e(),o(),c();
}
var r,u,d=template.render,l=t("common/wx/Cgi.js"),_=(t("safe/Scan.js"),t("common/wx/top.js")),p=t("common/wx/Tips.js"),f=t("common/wx/popover.js"),v=(t("common/wx/popup.js"),
null),m=null,h={
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
},j={
scaned:'<div class="status tips_confirm"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>扫描成功</h4><p>请在微信上点击确认即可</p></div></div>',
cancel:'<div class="status tips_cancel"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>你已取消此次操作</h4><p>请重新扫描验证，或关闭窗口</p></div></div>',
ok:'<div class="status tips_succ"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>绑定成功</h4></div></div>'
},U=[],D=0;
a();
});