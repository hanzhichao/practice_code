define("setting/bind-email.js",["biz_common/jquery.md5.js","common/wx/Tips.js","common/wx/Cgi.js","forgetpwd/weakpwd.js"],function(e){
"use strict";
function r(e){
for(var r=0,s=i.length;s>r;){
var a=Math.floor((r+s)/2);
if(e==i[a])return!0;
e<i[a]?s=a:r=a+1;
}
return!1;
}
function s(e){
return/^\d*$/.test(e)||/^[a-zA-Z]*$/.test(e);
}
function a(e){
return e.substr(0,16);
}
function t(e){
var r=!0,s={
ajax:1,
new_passwd:"",
imgcode:""
};
return $.each(e,function(e,t){
var n="js_"+t,o=c[n],i=$("#"+n),m=i.parent().parent(),d=i.val(),f=o.reg,u=o.msg;
if(o.require&&i.length){
d="password"!=i.attr("type")?d.replace(/^\s+|\s+$/g,""):a(d),i.val(d);
for(var g=0,w=f.length;w>g;g++)if("function"==typeof f[g]&&f[g](d)||f[g].test&&!f[g].test(d)){
m.find(".frm_msg_content").text(u[g]),m.find(".frm_msg").show(),r=!1;
break;
}
r&&o.remote&&(r=o.isRemoteValid),r&&o.name&&(s[o.name]=o.encode?$.md5(d):d);
}
}),r&&s;
}
e("biz_common/jquery.md5.js");
var n=e("common/wx/Tips.js"),o=(e("common/wx/Cgi.js"),e("forgetpwd/weakpwd.js")),i=o.pwdList,c={
js_oldPassword:{
require:!0,
name:"orginal_passwd",
encode:!0,
reg:[/^[\x21-\x7e]+$/],
msg:["请输入正确的密码"]
},
js_verifyCode:{
require:!1,
name:"imgcode",
reg:[/^[\w\d]{4}$/],
msg:["验证码错误，请重新输入"]
},
js_newEmail:{
require:!0,
name:"email",
reg:[/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,/@(?!(yahoo\.com\.cn|yahoo\.cn)$)/,new RegExp("^(?!"+$("#js_oldAccount").val()+"$)")],
msg:["请输入正确的邮箱地址","请不要使用雅虎邮箱作为邮箱帐户","请不要重复设置同一个邮箱帐号"],
isRemoteValid:!0
},
js_newPassword:{
require:!0,
name:"new_passwd",
encode:!0,
reg:[s,/^[\x21-\x7e]*$/,/^[\x21-\x7e]{8,}$/,r],
msg:["密码必须包含数字、字母，区分大小写","密码中使用了非法字符，请使用a-z、A-Z、0-9和常用英文标点符号","密码长度不足8位，或者使用了非法字符","密码安全系数较低，请重设密码"]
},
js_confirmPassword:{
require:!0,
reg:[/.+/,/^$/],
msg:["两次输入的密码不一致","两次输入的密码不一致"]
}
};
$.each(c,function(e,r){
var s=r.reg,t=r.msg,n=$("#"+e),o=$("#"+e).parent().parent();
n.blur(function(){
var e=$(this).val();
e="password"!=$(this).attr("type")?e.replace(/^\s+|\s+$/g,""):a(e);
var n=0,i=s.length;
for(r.require||(n=1);i>n;n++)if("function"==typeof s[n]&&s[n](e)||s[n].test&&!s[n].test(e))return o.find(".frm_msg_content").text(t[n]),
void o.find(".frm_msg").show();
o.find(".frm_msg").hide(),r.remote&&r.remote(e,o);
});
}),$("#js_newPassword").on("blur",function(){
c.js_confirmPassword.reg[1]=new RegExp("^"+a($(this).val())+"$");
}),$("#js_verifyCodeImg,#js_verifyCodeRefresh").click(function(){
$("#js_verifyCodeImg").attr("src","/cgi-bin/verifycode?r="+Math.random());
}),$("form").submit(function(e){
function r(e,r){
$("#"+e).parent().parent().find(".frm_msg_content").text(r),$("#"+e).parent().parent().find(".frm_msg").show();
}
function s(){
$("#js_verifyCodeImg").attr("src","/cgi-bin/verifycode?r="+Math.random()).parent().parent().parent().show(),
c.js_verifyCode.require=!0;
}
e.preventDefault();
var a=$(this).attr("id"),o=cgiData.links,i={
js_checkPwdForm:"check_passwd",
js_upgradeEmailForm:"submit",
js_updateEmailForm:"submit"
},m={
js_checkPwdForm:["oldPassword","verifyCode"],
js_upgradeEmailForm:["newEmail","newPassword","confirmPassword"],
js_updateEmailForm:["newEmail"]
},d=t(m[a]);
d&&$.ajax({
url:o.actionUrl+i[a],
type:"post",
data:d,
dataType:"json",
beforeSend:function(){
n.suc("处理中…");
},
success:function(e){
var t=e&&e.base_resp&&e.base_resp.ret;
switch(+t){
case 0:
location.href="js_checkPwdForm"==a?"qq"==cgiData.type?o.step2Url:o.authUrl+cgiData.account:o.statusUrl+d.email;
break;

case 1:
r("js_oldPassword","请输入正确的密码");
break;

case 2:
n.err("参数错误");
break;

case 3:
r("js_newEmail","该邮箱已被普通微信号绑定，无法绑定到公众帐号");
break;

case 4:
return r("js_verifyCode","请输入验证码"),void s();

case 5:
return r("js_verifyCode","验证输入错误"),void s();

case 6:
r("js_newEmail","该邮箱已被注册");
break;

case 7:
n.err("邮件发送过于频繁，请稍候再试");
break;

case 8:
n.err("邮箱已经被修改，再次修改请一个月后再试");
break;

case 9:
n.err("会话过期，请重新输入密码");
break;

default:
n.err("系统错误");
}
0!=+t&&c.js_verifyCode.require&&$("#js_verifyCodeImg").attr("src","/cgi-bin/verifycode?r="+Math.random());
},
error:function(){
n.err("系统错误");
}
});
});
});