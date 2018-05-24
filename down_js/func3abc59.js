define("device/func.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","common/qq/jquery.plugin/zclip.js"],function(e){
"use strict";
var s=(wx.T,template.render,e("common/wx/Tips.js")),a=e("common/wx/Cgi.js"),c=e("common/wx/dialog.js"),i=wx.cgiData||{},t={
status:"",
device_flag:"",
can_apply:"",
switch_reason:""
},o=$.extend({},t,i);
e("common/qq/jquery.plugin/zclip.js"),function(){
var e=wx.url("/acct/wxverifyorder?action=index"),i=function(){
"1"==o.can_apply?a.post({
url:wx.url("/device/device_func_apply?action=switch_major_acct"),
mask:!1
},function(e){
if(!e||!e.base_resp)return void s.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
s.suc("已提交申请"),setTimeout(function(){
location.reload();
},300);
break;

default:
s.err("系统错误，请重试");
}
}):c.show({
title:"提示",
type:"warn",
msg:"正式号仅限已认证服务号申请|你需要先获得微信认证后才可申请设备功能",
mask:!0,
buttons:[{
text:"去认证",
click:function(){
location.href=wx.url("/acct/wxverifyorder?action=index");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
},t=0,n=0,r=0;
switch(+o.status){
case 1:
t=1,n=0,r=0;
break;

case 2:
t=2,n=0,r=0;
break;

case 3:
t=3,n=1,r=0;
break;

case 7:
t=3,n=2,r=0;
break;

case 8:
t=3,n=3,r=3;
break;

case 9:
t=3,n=4,r=0;
break;

case 4:
t=3,n=3,r=4;
break;

case 5:
t=3,n=3,r=5;
break;

case 6:
t=3,n=3,r=6;
break;

default:
t=0,n=0,r=0;
}
switch(t){
case 1:
$(".js_auditing").show().find("a").attr("href",wx.url("/device/device_func_apply?action=submit_base_info&t=device/base_apply&view=view"));
break;

case 2:
"2"==o.service_type?$(".js_fail").show().find("a").attr("href",wx.url("/device/device_func_apply?action=submit_base_info&t=device/base_apply")):$(".js_fail").show().find("a").on("click",function(){
c.show({
title:"提示",
type:"warn",
msg:"微信互联设备功能仅限已认证服务号申请|<p>若你的账号是服务号，请<a href='%s'>点此进行认证</a>并通过认证后即可申请微信互联设备功能</p><p>若你的账号是订阅号，抱歉你的账号无法申请微信互联设备功能</p>".sprintf(e),
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
});
break;

case 3:
$(".js_passed").show().find("a").attr("href",wx.url("/device/device_func_apply?action=submit_base_info&t=device/base_apply"));
break;

default:
$(".js_apply").show().find("a").on("click",function(){
"2"==o.service_type?location.href=wx.url("/device/device_func_apply?action=submit_base_info&t=device/base_apply"):c.show({
title:"提示",
type:"warn",
msg:"微信互联设备功能仅限已认证服务号申请|<p>若你的账号是服务号，请<a href='%s'>点此进行认证</a>并通过认证后即可申请微信互联设备功能</p><p>若你的账号是订阅号，抱歉你的账号无法申请微信互联设备功能</p>".sprintf(e),
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
});
}
switch(n){
case 1:
$(".js_switch_ca").show().find("a").on("click",function(){
i();
});
break;

case 2:
$(".js_switch_ing").show();
break;

case 3:
$(".js_switch_pass").show();
break;

case 4:
$(".js_switch_fail").show().find("a").on("click",function(){
i();
});
break;

default:
$(".js_switch_cn").show();
}
switch(r){
case 3:
$(".js_step4_3").show();
break;

case 4:
$(".js_step4_4").show();
break;

case 5:
$(".js_step4_5").show();
break;

case 6:
$(".js_step4_6").show();
break;

default:
$(".js_step4_0").show();
}
$(".js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return"wxthings@foxmail.com";
},
afterCopy:function(){
s.suc("复制成功");
}
}),$("#js_status").text("1"==o.device_flag?"已开通":"未开通");
}();
});