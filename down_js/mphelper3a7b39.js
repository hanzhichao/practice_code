define("setting/mphelper.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js","common/wx/dialog.js","setting/wxverifycode.js"],function(s){
"use strict";
function e(){
var s=$.trim($("#Js_wxname").val());
return/^[0-9a-zA-Z_-]+$/.test(s)?s:(a.err("帐号格式错误"),$("#Js_wxname").focus(),!1);
}
function t(){
var s=$.trim($("#Js_wxCode").val());
return/^\d{6}$/.test(s)?s:(a.err("请输入正确的微信验证码"),$("#Js_wxCode").focus(),!1);
}
function n(){
var s="/misc/assistant?action=unbind",e=this;
"true"!=e.attr("disable")&&i.post({
url:s,
mask:!1,
beforeSend:function(){
e.attr("disable","true").removeClass("btn_primary").addClass("btn_disabled");
},
complete:function(){
e.attr("disable","false").removeClass("btn_disabled").addClass("btn_primary");
}
},function(s){
if(s&&s.base_resp)switch(+s.base_resp.ret){
case 0:
a.suc("解绑成功"),location.reload();
break;

default:
a.err("解绑失败");
}
});
}
s("common/wx/popup.js");
var a=s("common/wx/Tips.js"),i=s("common/wx/Cgi.js"),o=s("common/wx/top.js"),r=(s("common/wx/dialog.js"),
s("setting/wxverifycode.js"));
new o("#topTab",o.DATA.assistant,{
render:o.RENDER.assistant,
data:wx.cgiData
}).selected(0);
$("#Js_wxname").focus();
var c=r({
url:"/misc/assistant?action=send",
button:"#Js_wxCodeBtn",
input:"#Js_wxname",
click:function(){
$("#Js_wxnameTips").parent().hide();
},
success:function(){
$("#Js_wxCode").removeAttr("disabled").parent().removeClass("disabled"),$("#Js_sent").show();
},
error:function(){
$("#Js_wxnameTips").text("个人微信号不存在").parent().show();
},
complete:function(){
$("#Js_sent").hide(),$("#Js_wxCode").val("");
}
});
$("#Js_bind").click(function(){
if("true"!=$(this).attr("disable")){
$(".Js_tips").hide(),$("#Js_wxCodeDesc").show();
var s,n,o,r="/misc/assistant?action=bind";
(s=e())!==!1&&(n=t())!==!1&&i.post({
url:r,
data:{
wxname:s,
wxcode:n,
imgcode:o
},
mask:!1,
beforeSend:function(){
$("#Js_bind").attr("disable",!0).removeClass("btn_primary").addClass("btn_disabled");
},
complete:function(){
$("#Js_bind").attr("disable",!1).removeClass("btn_disabled").addClass("btn_primary");
}
},function(s){
if(s&&s.base_resp){
switch(+s.base_resp.ret){
case 0:
return a.suc("绑定成功"),void location.reload();

case 1:
return $("#Js_wxCodeTips").text("微信验证码错误").parent().show(),void $("#Js_wxCodeDesc").hide();

case 2:
a.err("个人微信号不存在");
break;

case 4:
case 200004:
a.err("个人微信号已被其他公众号绑定，请先解除绑定");
break;

default:
a.err("绑定失败，请重试");
}
c.clear();
}
});
}
}),$("#Js_unbind").click(function(){
var s=$("#tpl_unbind").popup({
title:"解除绑定",
buttons:[{
text:"确定",
type:"primary",
click:function(){
n.call(this.get().find(".js_btn").eq(0));
}
},{
text:"取消",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
});
s.popup("show");
});
});