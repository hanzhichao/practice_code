define("safe/phone_modify.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js"],function(e){
"use strict";
var t=RetData||{},n={
verify_mobile_num:""
},s=$.extend({},n,t),i=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),a=e("common/wx/Step.js"),o={
init:function(){
var e="click",t=$("#js_step1"),n=$("#js_step2"),r=new a({
container:"#container",
selected:1,
names:["1. 确认原手机号码","2. 确认新手机号码"]
});
$(".page_nav").find("a").attr("href",wx.url("/cgi-bin/verifyuksmsinfo?action=view&t=setting/safe-phone")),
t.find(".js_old").html(s.verify_mobile_num),t.find(".btn_vcode").on(e,o.oldsendsms),
t.find(".js_submit").on(e,function(){
var e=$("#js_step1").find(".js_num").val().trim()||"";
return""!=e&&/^\d{6}$/.test(e)?void o.oldPhone(e,function(){
$("#js_step1").hide(),$("#js_step2").show(),r.setStep(2);
}):(i.err("请输入正确的手机验证码"),!0);
}),n.find(".btn_vcode").on(e,function(){
var e=$("#js_step2").find(".js_num").val().trim()||"";
""!=e&&/^\d{11}$/.test(e)?o.sendsms(e):i.err("请输入正确的手机号");
}),n.find(".js_finish").on(e,function(){
var e=$("#js_step2").find(".js_token").val().trim()||"",t=$("#js_step1").find(".js_num").val().trim()||"",n=$("#js_step2").find(".js_num").val().trim()||"";
""!=n&&/^\d{11}$/.test(n)?""!=e&&/^\d{6}$/.test(e)?o.submit(t,n,e):i.err("请输入正确的手机验证码"):i.err("请输入正确的手机号");
}),setTimeout(function(){
t.find(".btn_vcode").click();
},300);
},
oldsendsms:function(){
if(!$(this).attr("disabled")){
var e="/cgi-bin/mmbizverifysms?action=get_code_default";
r.post({
url:e,
mask:!1,
error:function(){
i.err("发送失败");
}
},function(e){
var t=e.err_code;
0==t?(i.suc("发送成功"),o.recheck()):i.err("-2341"==t?"操作频率过快，请稍后再试。":"发送失败");
});
}
},
recheck:function(){
var e="60",t=null,n=function(){
var e=$("#js_step1").find(".btn_vcode"),n=+e.data("left");
if(1>=n)t&&window.clearInterval(t),e.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default");else{
var s=--n;
e.data("left",s).html(s+"秒后可重发");
}
};
$("#js_step1").find(".btn_vcode").data("left",e).html(e+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
t=window.setInterval(n,1e3);
},
oldPhone:function(e,t){
var n="/cgi-bin/mmbizverifysms?action=check_code_default";
r.post({
url:n,
data:{
code_num:e
},
mask:!1,
error:function(){
i.err("验证失败");
}
},function(e){
var n=e.err_code;
0==n?"function"==typeof t&&t():i.err("验证失败");
});
},
sendsms:function(e){
var t="/cgi-bin/mmbizverifysms?action=get_code_new";
r.post({
url:t,
data:{
mobile_num:e
},
mask:!1,
error:function(){
i.err("发送失败");
}
},function(e){
var t=e.err_code;
0==t?(i.suc("发送成功"),o.start()):i.err("-2341"==t?"操作频率过快，请稍后再试。":"发送失败");
});
},
start:function(){
var e="60",t=null,n=$("#js_step2").find(".js_num"),s=n.parent().siblings("a"),i=function(){
var e=$("#js_step2").find(".btn_vcode"),n=+e.data("left");
if(1>=n)t&&window.clearInterval(t),e.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default"),
$("#js_step2").find(".js_num").removeAttr("disabled");else{
var s=--n;
e.data("left",s).html(s+"秒后可重发");
}
};
s.data("left",e).html(e+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
n.attr("disabled","true"),t=window.setInterval(i,1e3);
},
submit:function(e,t,n){
var s="/cgi-bin/mmbizverifysms?action=check_code_new";
r.post({
url:s,
data:{
old_code_num:e,
mobile_num:t,
code_num:n
},
mask:!1,
error:function(){
i.err("验证失败");
}
},function(e){
var t=e.err_code;
0==t?(i.suc("修改成功"),location.href=wx.url("/cgi-bin/safecenterstatus?action=view&t=setting/safe-index")):i.err("-2345"==t?"换绑的手机号不能与原手机号一样，请输入别的手机号。":"-2343"==t?"该手机号已经绑定过2个公众号，请使用别的手机号进行绑定。":"验证失败");
});
}
};
o.init();
});