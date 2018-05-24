define("home/force_check_fail.js",["home/force_check.js"],function(c){
"use strict";
function e(){
$(this).hasClass("btn_disabled")||(document.cookie="",location.href="/");
}
function o(){
$(".js_force_check_edit_btn").click();
}
var t=c("home/force_check.js"),i=wx.cgiData;
return 1==i.force_check_info.check_status?($(".js_pending").show(),void $(".js_ok").show().text("返回登录页面").click(e)):(t.init($.extend(!0,{},i.force_check_info,{
page:"frozen",
dom:".js_scan",
ticket:i.ticket,
ticket_id:i.ticket_id,
onSuccess:function(){
$(".js_ok").show().text("确定").click(e);
},
onGetMore:function(){
$(".js_ok").show().text("继续验证").click(o);
},
onFail:function(){
$(".js_ok").show().text("返回登录页面").click(e);
}
})),void t.renderPage());
});