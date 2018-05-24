define("safe/rebind.js",["common/wx/Tips.js","common/wx/Step.js","safe/Scan.js","common/wx/Cgi.js","safe/Mobile.js","common/wx/overseasList.js","common/wx/region.js","safe/safe_cgi.js"],function(e){
"use strict";
var i=e("common/wx/Tips.js"),a=e("common/wx/Step.js"),o=e("safe/Scan.js"),t=e("common/wx/Cgi.js"),n=e("safe/Mobile.js"),s=e("common/wx/overseasList.js"),r=e("common/wx/region.js"),c=e("safe/safe_cgi.js"),m=wx.cgiData||{},_={
email:"",
action:"",
safeaction:"",
ticket:"",
noneed_checkwx:"",
redirect:"",
auth:""
},l=$.extend({},_,m),d=s.mobilePrefix,f=s.countryCode,u=function(){
function e(){
var e=$(".js_form_wx1"),a={
alias:e.find(".js_alias").val().trim(),
card_name:e.find(".js_cardname").val().trim(),
card_id:e.find(".js_cardid").val().trim()
};
return"1"==l.noneed_checkwx&&(a.alias="noneed"),a.alias?a.card_name?a.card_id?(l.auth&&(a.auth=l.auth),
l.verify_key?(a.verify_key=l.verify_key,a.action="check_wx2"):a.action="check_wx",
l.email_get&&(a.email=l.email_get),$("#js_btn_wx1").html("验证中，请稍候<i></i>").addClass("btn_loading"),
void t.post({
url:wx.url("/misc/rebindverify"),
data:a,
mask:!1
},function(e){
if(!e||!e.base_resp)return i.err("系统错误，请重试"),void $("#js_btn_wx1").html("验证").removeClass("btn_loading");
switch(+e.base_resp.ret){
case 0:
e.code?(i.suc("验证成功"),l.code=e.code,s()):(i.err("验证失败，请重试"),$("#js_btn_wx1").html("验证").removeClass("btn_loading"));
break;

case 200099:
i.suc("链接失效，请重新获取重置链接"),$("#js_btn_wx1").html("验证").removeClass("btn_loading");
break;

default:
i.err("验证失败，请重试"),$("#js_btn_wx1").html("验证").removeClass("btn_loading");
}
})):void i.err("请填写身份证号码"):void i.err("请填写身份证姓名"):void i.err("请填写原微信号");
}
function s(){
b&&b.setStep(2),$(".js_form_wx1").hide(),$(".js_form_wx2").show();
new o({
container:".js_form_wx2",
type:"rebindverify",
code:l.code,
auth:l.auth,
dom_init:'<div class="status tips"><p>请使用微信扫描二维码进行验证</p></div>',
onconfirm:function(){
i.suc("已成功绑定"),$(".js_form_wx2").hide();
var e=""==l.redirect?wx.url("/cgi-bin/safecenterstatus?action=view&t=setting/safe-index"):l.redirect;
e="ticket"==l.auth?"/":e,$(".js_result_wx").find("a").attr("href",e),$(".js_result_wx").show(),
setTimeout(function(){
location.href=e;
},1300);
}
});
}
function m(){
var e=$(".js_form_mobile1"),a={
mobile_num:e.find(".js_alias").val().trim(),
card_name:e.find(".js_cardname").val().trim(),
card_id:e.find(".js_cardid").val().trim()
};
return a.mobile_num?a.card_name?a.card_id?(l.auth&&(a.auth=l.auth),1==wx.cgiData.is_overseas&&(a.mobile_num=d[$("#js_old_country").val()]+a.mobile_num),
l.verify_key&&(a.verify_key=l.verify_key),l.email_get&&(a.email=l.email_get),$("#js_btn_mobile1").html("验证中，请稍候<i></i>").addClass("btn_loading"),
void t.post({
url:wx.url("/misc/rebindverify?action=check_mobile"),
data:a,
mask:!1
},function(e){
if(!e||!e.base_resp)return i.err("系统错误，请重试"),void $("#js_btn_mobile1").html("验证").removeClass("btn_loading");
switch(+e.base_resp.ret){
case 0:
e.code?(i.suc("验证成功"),l.code=e.code,_()):(i.err("验证失败，请重试"),$("#js_btn_mobile1").html("验证").removeClass("btn_loading"));
break;

case 200099:
i.suc("链接失效，请重新获取重置链接"),$("#js_btn_mobile1").html("验证").removeClass("btn_loading");
break;

default:
i.err("验证失败，请重试"),$("#js_btn_mobile1").html("验证").removeClass("btn_loading");
}
})):void i.err("请填写身份证号码"):void i.err("请填写身份证姓名"):void i.err("请填写原手机号");
}
function _(){
b&&b.setStep(2),$(".js_form_mobile1").hide(),$(".js_form_mobile2").show(),new n({
container:".js_form_mobile2",
old_submit:"#js_btn_mobile2",
check_code_new:"/misc/rebindverify?action=rebind_mobile",
auth:l.auth,
is_overseas:wx.cgiData.is_overseas,
mobile_country:"#js_new_country",
old_callback:function(e){
if(!e||!e.base_resp)return void i.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
i.suc("修改成功"),$(".js_form_mobile2").hide();
var a=""==l.redirect?wx.url("/cgi-bin/safecenterstatus?action=view&t=setting/safe-index"):l.redirect;
a="ticket"==l.auth?"/":a,$(".js_result_mobile").find("a").attr("href",a),$(".js_result_mobile").show(),
setTimeout(function(){
location.href=a;
},1300);
break;

case 200099:
i.err("链接失效，请重新获取重置链接");
break;

case-2345:
case 202345:
i.err("换绑的手机号不能与原手机号一样，请输入别的手机号。");
break;

case-2343:
case 202343:
i.err("该手机号已经绑定过2个公众号，请使用别的手机号进行绑定。");
break;

default:
i.err("验证失败，请重试");
}
},
old_checkparam:function(e,i){
var a={
mobile_num:e,
mob_code:i,
code:l.code
};
return l.verify_key&&(a.verify_key=l.verify_key),l.email_get&&(a.email=l.email_get),
l.auth&&(a.auth=l.auth),a;
}
});
}
function u(){
if(l.email){
var o=$(".js_form_mail");
o.find(".js_mail").text(l.email),o.find(".js_resend").on("click",function(){
"wx_mail_get"==l.safeaction&&"mail_get"==l.action||"wx_mail_get"==l.action?c.resend("wx_mail_get",l.auth,$.noop):"mobile_mail_get"==l.safeaction&&"mail_get"==l.action||"mobile_mail_get"==l.action?c.resend("mobile_mail_get",l.auth,$.noop):i.err("参数异常");
}),"wx_mail_get"==l.safeaction&&"mail_get"==l.action||"wx_mail_get"==l.action?o.find(".js_typetxt").text("管理员微信号"):("mobile_mail_get"==l.safeaction&&"mail_get"==l.action||"mobile_mail_get"==l.action)&&o.find(".js_typetxt").text("安全手机号");
var t={
"foxmail.com":"mail.foxmail.com",
"qq.com":"mail.qq.com",
"vip.qq.com":"mail.qq.com",
"gmail.com":"mail.google.com",
"163.com":"mail.163.com",
"126.com":"mail.126.com",
"188.com":"mail.188.com",
"sina.com":"mail.sina.com",
"sohu.com":"mail.sohu.com",
"yahoo.cn":"mail.cn.yahoo.com",
"yahoo.com.cn":"mail.cn.yahoo.com",
"hotmail.com":"mail.hotmail.com",
"live.com":"mail.live.com"
},n=l.email.split("@");
if(2==n.length){
var s=t[n[1]];
s&&o.find(".js_login").attr("href","http://"+s).show();
}
o.show();
}else if("wx_mail_get"==l.safeaction&&"mail_get"==l.action||"wx_mail_get"==l.action||"wx_mail_get2"==l.action){
var _=$(".js_form_wx1");
_.show(),"1"==l.noneed_checkwx&&_.find(".js_noneed").hide(),b=new a({
container:".js_process",
selected:1,
names:["1. 验证身份","2. 绑定新号码"]
}),$("#js_btn_wx1").on("click",e);
}else if("mobile_mail_get"==l.safeaction&&"mail_get"==l.action||"mobile_mail_get"==l.action||"mobile_mail_get2"==l.action){
1==wx.cgiData.is_overseas&&(new r({
container:"#js_old_location",
data:{
country:"中国大陆"
},
retain:{
country:f,
province:[-1],
city:[-1]
},
is_overseas:!0,
onChange:function(e,i){
$("#js_old_"+e).val(i);
}
}),new r({
container:"#js_new_location",
data:{
country:"中国大陆"
},
retain:{
country:f,
province:[-1],
city:[-1]
},
is_overseas:!0,
onChange:function(e,i){
$("#js_new_"+e).val(i);
}
}));
var _=$(".js_form_mobile1");
_.show(),b=new a({
container:".js_process",
selected:1,
names:["1. 验证身份","2. 绑定新号码"]
}),$("#js_btn_mobile1").on("click",m);
}
}
var b;
return{
init:u
};
}();
u.init();
});