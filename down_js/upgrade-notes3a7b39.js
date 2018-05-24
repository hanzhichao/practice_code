define("setting/upgrade-notes.js",["common/wx/popup.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
e("common/wx/popup.js");
var s=e("common/wx/dialog.js"),t=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),n=wx.cgiData.realname_status,a=wx.cgiData.realname_type,o=null;
1!=n&&(alert("你的账号还没有通过实名注册，系统将自动跳转"),location.href="/"),$("#Js_upgrade").on("click",function(){
var e=$(".Js_serviceType.selected").data("type");
if(void 0==e)return void s.show("操作错误|选择一种公众号类型后才能继续！");
var n,r;
if(2==e?(r="确认成为服务号？",n=$("#tpl_warning").html().trim()):(r="温馨提示",n=$("#tpl_warning2").html().trim()),
o=$(n).popup({
title:r,
onOK:function(){
return this.get().find(".js_btn").eq(0).hasClass("btn_disabled")?void 0:0==a&&2==e?void(location.href=wx.url("/cgi-bin/frame?t=wxm2_realname_complete_frame")):void i.post({
url:wx.url("/cgi-bin/formbyskey?form=serviceinfoform&f=json"),
data:{
servicetype:e
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void t.err("提交失败！");
var s=1*e.base_resp.ret;
switch(s){
case 0:
t.suc("设置成功"),location.href="/";
break;

case 200003:
t.err("登录超时，请重新登录");
break;

default:
t.err("提交失败！");
}
});
},
onCancel:function(){
this.remove();
},
onHide:function(){
this.remove();
}
}),o.popup("show"),2==e&&o.popup("get").find(".js_btn").eq(0).disable().removeClass("btn_primary"),
1==wx.cgiData.is_wx_verify){
var c=new Date(+new Date+31536e6);
$("#nextYear").text(c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日");
}
}),$(document).on("click","#Js_agree",function(){
var e=$(this),s=$("#Js_timelimit"),t=null,i=function(n){
n>0&&e.is(":checked")?(s.text("("+n+")"),clearTimeout(t),t=setTimeout(function(){
i(n-1);
},1e3)):(clearTimeout(t),s.hide(),e.is(":checked")&&o.popup("get").find(".js_btn").eq(0).enable().addClass("btn_primary"));
};
e.is(":checked")?(e.parent().addClass("selected"),s.empty().show(),i(5)):(clearTimeout(t),
e.parent().removeClass("selected"),s.hide(),o.popup("get").find(".js_btn").eq(0).disable().removeClass("btn_primary"));
});
var r=wx.cgiData.service_type;
0==r&&$(".Js_serviceType").on("click",function(){
$(".Js_serviceType").removeClass("selected").addClass("unselected"),$(this).removeClass("unselected").addClass("selected"),
$(this).find(".Js_status").eq(0).show().next().hide(),$(this).siblings(".Js_serviceType").find(".Js_status").eq(0).hide().next().show();
});
});