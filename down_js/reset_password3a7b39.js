define("forgetpwd/reset_password.js",["common/wx/Cgi.js","safe/Scan.js","safe/safe_check.js","biz_common/jquery.md5.js","common/wx/Step.js","biz_common/jquery.validate.js","common/wx/verifycode.js","common/wx/Tips.js","forgetpwd/weakpwd.js"],function(e){
"use strict";
var t=wx.cgiData,n=e("common/wx/Cgi.js"),i=e("safe/Scan.js"),r=e("safe/safe_check.js"),o=(e("biz_common/jquery.md5.js"),
e("common/wx/Step.js")),s=(e("biz_common/jquery.validate.js"),e("common/wx/verifycode.js")),c=e("common/wx/Tips.js"),a=e("forgetpwd/weakpwd.js");
a=a.pwdList;
var d,u=function(){
function e(e){
var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=location.search.substr(1).match(t);
return null!=n?unescape(n[2]):null;
}
function i(e){
for(var t=0,n=a.length;n>t;){
var i=Math.floor((t+n)/2);
if(e==a[i])return!0;
e<a[i]?n=i:t=i+1;
}
return!1;
}
function r(){
function i(){
if($("#js_newpwd").blur(),$("#js_repwd").blur(),$("#imgcode").blur(),!f.checkForm())return!1;
var i=$("#js_submit");
i.btn(!1);
var r=$("#js_form").serializeObject(),o={
action:"set_pwd",
pwd:$.md5(r.newpwd.substr(0,16)),
email:e("email"),
verify_key:e("verify_key"),
verify_code:u.getCode(),
code:t.code
};
return n.post({
url:"/acct/resetpwd",
data:o,
mask:!1
},function(e){
if(!e||!e.base_resp)return c.err("系统繁忙，请稍后重试"),i.btn(!0),void _changeVerifyImg();
var t=+e.base_resp.ret;
0==t?(c.suc("密码修改成功"),setTimeout(function(){
location.href="/";
},2e3)):200013==t?c.err("你的操作过于频繁，请稍后再试"):200027==t?c.err("验证码错误，请重新输入"):200230==t?c.err("密码安全系数较低，请重设密码"):n.handleRet(e,{
id:64463,
key:24,
url:"/acct/resetpwd"
}),i.btn(!0),u.refresh();
}),!1;
}
$("#js_changepwd"),$("#js_imgVerify"),$("#js_imgVerifyx"),$("#js_verify");
u=new s("#js_verifycodeImgArea"),f=$("#js_form").validate({
rules:{
newpwd:{
required:!0,
minlength:8,
checkinvalidch:!0,
checkallnum_or_char:!0,
checkweakpwd:!0
},
repwd:{
required:!0,
equalTo:$("#js_newpwd")
},
imgcode:{
required:!0,
checkverifycode:!0
}
},
messages:{
newpwd:{
required:"请填写新密码",
minlength:"密码长度不足8位",
checkinvalidch:"密码中使用了非法字符，请使用a-z、A-Z、0-9和常用英文标点符号",
checkallnum_or_char:"密码必须包含数字、字母，区分大小写",
checkweakpwd:"密码安全系数较低，请重设密码"
},
repwd:{
required:"请再次输入新密码",
equalTo:"两次输入的密码不一致"
},
imgcode:{
required:"请填写验证码",
checkverifycode:"验证码错误，请重新输入"
}
},
errorPlacement:function(e,t){
var n=t.parent(),i=n.parent(),r=i.find(".frm_tips");
i.find("p.fail").remove(),r.length?e.insertBefore(r):e.appendTo(i);
}
}),$("#js_submit").on("click",function(){
$(this).attr("disabled")||i();
});
}
function o(){
$.validator.addMethod("checkallnum_or_char",function(e,t){
return this.optional(t)||!/^\d*$/.test(e)&&!/^[a-zA-Z]*$/.test(e);
}),$.validator.addMethod("checkinvalidch",function(e,t){
return this.optional(t)||/^[\x21-\xfe]*$/.test(e);
}),$.validator.addMethod("checkverifycode",function(e,t){
return this.optional(t)||/^[\w\d]{4}$/.test(e);
}),$.validator.addMethod("checkweakpwd",function(e,t){
return this.optional(t)||!i(e);
});
}
function d(){
o(),r();
}
var u,f;
return{
init:d
};
}(),f=function(){
function e(){
$("#js_scan").show();
new i({
container:"#js_scan",
type:"check",
source:"pwd",
auto_msgid:!0,
wx_name:t.strategy_status.wx_alias,
auth:"ticket",
onconfirm:function(){
var e=this.code;
e?(t.code=e,$("#js_scan").hide(),d.setStep(2),$("#js_changepwd").show(),u.init()):(c.err("系统错误"),
setTimeout(function(){
location.reload();
},200));
}
});
}
function n(){
t.strategy_status.auth="ticket",t.strategy_status.wx_alias?1!=t.strategy_status.wx_protect?$("#js_off_protect").show().find(".js_btn").on("click",function(){
r.bind("bind_login",t.strategy_status,function(){
c.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},200);
},{
title:"开启微信保护"
});
}):e():$("#js_no_helper").show().find(".js_btn").on("click",function(){
r.bind("bind_login",t.strategy_status,function(){
c.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},200);
},{
title:"绑定管理员微信号"
});
});
}
return{
init:n
};
}();
1==+t.strategy_status.realname_status?(d=new o({
container:$(".js_process"),
selected:1,
names:["1 微信验证","2 修改密码"]
}),f.init()):(t.code="",$("#js_scan").hide(),$("#js_changepwd").show(),u.init());
});