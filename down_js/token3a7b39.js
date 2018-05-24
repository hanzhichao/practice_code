define("safe/token.js",["common/wx/Cgi.js","common/wx/popup.js","common/wx/Tips.js"],function(e){
"use strict";
var t=RetData||{},o={
tokenstatus:0,
yixun_code:"",
yixun_url:"",
weixin_verify:0
},i=$.extend({},o,t),n=e("common/wx/Cgi.js"),r=(e("common/wx/popup.js"),e("common/wx/Tips.js"));
$(".extra_info").html(template.render("tpl",{
data:i
})),$("#js_enable").on("click",function(){
$(".rightform").popup({
title:"启用安全令牌",
className:"simple",
close:function(){
this.remove();
},
buttons:[{
text:"确定",
click:function(){
var e=$(".dialog_wrp").find("input").val().trim();
if(""==e||!/^\d{10,12}$/.test(e))return r.err("必须为10-12位数字"),!0;
var t="/cgi-bin/verify_token?action=bind";
n.post({
url:t,
data:{
token_serial_number:e
},
mask:!1,
error:function(){
r.err("绑定失败");
}
},function(e){
var t=e.err_code;
0==t?($(".dialog_wrp").find(".js_error").hide(),r.suc("绑定成功"),location.reload()):$(".dialog_wrp").find(".js_error").html("号码错误").show();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
});
});