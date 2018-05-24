define("wxopen/wxopen_create_step3.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","biz_web/ui/checkbox.js","biz_common/jquery.md5.js","forgetpwd/weakpwd.js","common/wx/verifycode.js","biz_common/jquery.validate.js","common/wx/subjectAppealDialog.js"],function(e,a,i){
"use strict";
function r(e){
for(var a=0,i=f.length;i>a;){
var r=Math.floor((a+i)/2);
if(e==f[r])return!0;
e<f[r]?i=r:a=r+1;
}
return!1;
}
function t(e,a){
var i={},r=w.find('input[name="'+e+'"]');
r.length&&(i[e]=a,""!=a?(i[e]=a,setTimeout(function(){
_.showErrors(i);
},1)):r.valid());
}
function n(e){
h=e.page,w=$(c("tpl_step3",h.data)),w.hide(),$("#js_div_steps").append(w);
var a=w.find("form"),i=w.find('input[name="email"]'),r=w.find('input[name="pw1"]'),n=(w.find('input[name="pw2"]'),
w.find(".js_btn_pre")),o=w.find(".js_btn_next"),l=w.find(".js_check_agree"),p=new m("#js_div_verifycode");
l.checkbox({
onChanged:function(e){
e.is(":checked")?o.enable():o.disable();
}
}),n.on("click",function(){
return h.showStep(2),!1;
}),o.on("click",function(){
return a.submit(),!1;
}),a.on("submit",function(){
if(!a.valid())return!1;
o.btn(!1);
var e=$.md5(r.val().substr(0,16)),n={
email:i.val()||"",
verifycode:p.getCode()||"",
pwd:e,
is_same_admin:h.data.is_same_admin||0,
is_same_wx_verify:h.data.is_same_wx_verify||0,
qrcheck_ticket:h.data.qrcheck_ticket||""
};
return console.log("postData",n),d.post({
url:"/cgi-bin/fastregister?action=send",
data:n
},function(a){
if(o.btn(!0),a&&0==a.base_resp.ret)return h.data.email=i.val(),h.data.md5_pwd=e,
void h.showStep(4);
switch(p.refresh(),a.base_resp.ret){
case 201014:
var r='该邮箱已被占用，请更换其他邮箱。<a href="http://kf.qq.com/faq/120911VrYVrA161215zqaIJr.html" target="_blank">查看详情</a>';
t("email",r),$("input[name=email]").focus();
break;

case 200013:
s.err("操作过于频繁，请稍后再试");
break;

case 200024:
s.err("验证码输入错误"),$("#imgcode").focus();
break;

case 200700:
new u({
reason:a.reason,
canAppeal:!a.ban_appeal,
jumpUrl:wx.url("/cgi-bin/contractorappeal?action=index"),
appealTicket:a.appeal_ticket
});
break;

case 1e3:
s.err("帐号主体已申请5个小程序，请先完成认证后再重新创建小程序");
break;

case 1001:
case 1002:
s.err("帐号主体注册小程序个数已达上限，无法继续注册");
break;

case 8:
s.err("为保障微信公众平台的信息安全，你将不能继续进行注册。");
break;

default:
s.err("系统错误，请重试");
}
}),!1;
}),_=a.validate({
rules:{
email:{
required:!0,
email:!0
},
pw1:{
required:!0,
minlength:8,
checkinvalidch:!0,
checkallnum_or_char:!0,
checkweakpwd:!0
},
pw2:{
required:!0,
equalTo:r
},
imgcode:{
required:!0,
checkverifycode:!0
}
},
messages:{
email:{
required:"请输入正确的邮箱地址",
email:"请输入正确的邮箱地址"
},
pw1:{
required:"请填写密码",
minlength:"密码长度不足8位",
checkinvalidch:"密码中使用了非法字符，请使用a-z、A-Z、0-9和常用英文标点符号",
checkallnum_or_char:"密码必须包含数字、字母，区分大小写",
checkweakpwd:"密码安全系数较低，请重设密码"
},
pw2:{
required:"请再次输入新密码",
equalTo:"两次输入的密码不一致"
},
imgcode:{
required:"验证码错误，请重新输入",
checkverifycode:"验证码错误，请重新输入"
}
},
errorPlacement:function(e,a){
var i=a.parent(),r=i.parent(),t=r.find(".frm_tips");
r.find("p.fail").remove(),t.length?e.insertBefore(t):e.appendTo(r);
}
});
}
function o(){
h.showSteper(),h.setSteper(2),w.show();
}
var c=template.render,s=e("common/wx/Tips.js"),d=e("common/wx/Cgi.js"),l=(e("common/wx/dialog.js"),
e("biz_web/ui/checkbox.js"),e("biz_common/jquery.md5.js"),e("forgetpwd/weakpwd.js")),m=e("common/wx/verifycode.js"),p=e("biz_common/jquery.validate.js"),u=e("common/wx/subjectAppealDialog.js"),f=(p.rules.email,
l.pwdList),h=null,w=null,_=null;
$.validator.addMethod("checkpwd",function(e,a){
return this.optional(a)||/^[\x21-\x7e]{8,}$/.test(e);
}),$.validator.addMethod("checkverifycode",function(e,a){
return this.optional(a)||/^[\w\d]{4,4}$/.test(e);
}),$.validator.addMethod("checkallnum_or_char",function(e,a){
return this.optional(a)||!/^\d*$/.test(e)&&!/^[a-zA-Z]*$/.test(e);
}),$.validator.addMethod("checkinvalidch",function(e,a){
return this.optional(a)||/^[\x21-\xfe]*$/.test(e);
}),$.validator.addMethod("checkweakpwd",function(e,a){
return this.optional(a)||!r(e);
}),i.exports={
init:n,
show:o
};
});