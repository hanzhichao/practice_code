define("home/wxopen_invite.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/popup.js","biz_common/jquery.validate.js","biz_common/jquery.md5.js","common/qq/prototype.js","forgetpwd/weakpwd.js"],function(e){
"use strict";
function n(e){
for(var n=0,t=w.length;t>n;){
var i=Math.floor((n+t)/2);
if(e==w[i])return!0;
e<w[i]?t=i:n=i+1;
}
return!1;
}
function t(){
return s.length>0&&!s.is(":checked")?!1:l.valid()?(m.btn(!1),void d.post({
url:"/acct/applywxopen",
data:{
action:"confirm",
email:l.find('input[name="email"]').val(),
pwd:$.md5(l.find('input[name="pw1"]').val().substr(0,16)),
phone:l.find('input[name="phone"]').val()
},
complete:function(){
m.btn(!0);
},
mask:!1,
error:function(){
p.err("提交失败"),m.btn(!0);
}
},function(e){
m.btn(!0);
var n=e.base_resp.ret;
switch(n){
case 0:
a(l.find('input[name="email"]').val());
break;

case 201014:
p.err("该邮箱已被占用，请更换其他邮箱"),l.find('input[name="email"]').focus();
break;

default:
p.err("系统错误，请重试");
}
})):!1;
}
function i(){
c.html(u("tpl_welcome",{})),$("#js_btn_showform").on("click",function(){
return o(),!1;
});
}
function o(){
c.html(u("tpl_form",{})),l=$("#js_form"),s=$("#js_check_agree"),m=$("#js_btn_submit"),
s.length>0&&(m.disable(),s.checkbox(),s.click(function(){
s.is(":checked")?m.enable():m.disable();
})),l.on("click",".js_btn_doc",function(){
console.log("click");
var e=$("#tpl_doc").popup({
title:"微信小程序平台服务条款",
width:960,
height:null,
className:"wxopen_agreement_dialog",
buttons:[{
text:"同意",
click:function(){
this.remove();
},
type:"primary"
}],
mask:!0,
autoShow:!0,
onHide:function(){
this.remove();
}
});
e.popup("show");
}),m.on("click",function(){
return $(this).hasClass("btn_disabled")||$(this).hasClass("btn_loading")?!1:(l.submit(),
!1);
}),$.validator.addMethod("checkpwd",function(e,n){
return this.optional(n)||/^[\x21-\x7e]{8,}$/.test(e);
}),$.validator.addMethod("checkallnum_or_char",function(e,n){
return this.optional(n)||!/^\d*$/.test(e)&&!/^[a-zA-Z]*$/.test(e);
}),$.validator.addMethod("checkinvalidch",function(e,n){
return this.optional(n)||/^[\x21-\xfe]*$/.test(e);
}),$.validator.addMethod("checkweakpwd",function(e,t){
return this.optional(t)||!n(e);
}),l.validate({
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
equalTo:l.find('input[name="pw1"]')
},
phone:{
required:!0
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
phone:{
required:"请输入联系方式"
}
},
errorPlacement:function(e,n){
var t=n.parent(),i=t.parent(),o=i.find(".frm_tips");
i.find("p.fail").remove(),o.length?e.insertBefore(o):e.appendTo(i);
},
submitHandler:function(){
return t(),!1;
}
});
}
function a(e){
c.html(u("tpl_result",{
email:e
}));
}
function r(){
c=$("#js_div_page"),wx.cgiData.email?a(wx.cgiData.email):i();
}
var c,l,s,m,u=template.render,d=e("common/wx/Cgi.js"),p=e("common/wx/Tips.js"),h=(e("biz_web/ui/checkbox.js"),
e("common/wx/popup.js"),e("biz_common/jquery.validate.js")),f=(e("biz_common/jquery.md5.js"),
h.rules.email,e("common/qq/prototype.js"),e("forgetpwd/weakpwd.js")),w=f.pwdList;
r();
});