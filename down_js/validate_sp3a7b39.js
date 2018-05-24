define("user/validate_sp.js",["common/wx/Cgi.js","safe/Scan.js","common/wx/Tips.js"],function(s){
"use strict";
var e=wx.cgiData,a=s("common/wx/Cgi.js"),n=s("safe/Scan.js"),i=s("common/wx/Tips.js");
!function(){
function s(){
$(".js_scan").show(),new n({
container:".js_scan",
type:"check",
source:"splogin",
uuid_type:"splogin",
msgid:e.sp_tkt,
ticket:e.sp_appid,
dom_init:"请使用微信扫描二维码进行登录",
onconfirm:function(){
var s=this.json||{},n=s.key,t=s.pass_ticket,c=s.code;
t&&c?a.post({
url:"/cgi-bin/splogin",
data:{
code:c,
pass_ticket:t,
key:n,
sp_tkt:e.sp_tkt,
sp_appid:e.sp_appid
},
mask:!1
},function(s){
switch(+s.base_resp.ret){
case 0:
location.href=s.redirect_url;
break;

case 154001:
$(".js_scan").hide(),$("#js_warn").show().find(".js_warnmsg").text("登陆已超时，请从服务商系统重新进入");
break;

case 154002:
$(".js_scan").hide(),$("#js_warn").show().find(".js_warnmsg").html("%s已和服务商%s解除绑定关系，请前往服务商系统确认".sprintf(e.app_name,e.sp_name));
break;

case 154003:
i.err("不是代理人");
break;

case 154004:
i.err("解密失败，请稍后再试");
break;

default:
a.handleRet(s,{
id:64462,
key:85,
url:"/cgi-bin/splogin",
msg:"系统繁忙，请稍后再试"
});
}
}):i.err("系统错误，请稍后再试");
}
});
}
switch(+e.ret){
case 0:
s();
break;

case 154001:
$("#js_warn").show().find(".js_warnmsg").text("登陆已超时，请从服务商系统重新进入");
break;

case 154002:
$("#js_warn").show().find(".js_warnmsg").html("%s已和服务商%s解除绑定关系，请前往服务商系统确认".sprintf(e.app_name,e.sp_name));
break;

default:
s();
}
}();
});