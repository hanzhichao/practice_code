define("safe/change_pwd.js",["common/wx/Cgi.js","safe/Scan.js","biz_common/jquery.md5.js","biz_common/jquery.validate.js","common/wx/verifycode.js","common/wx/Tips.js","forgetpwd/weakpwd.js"],function(e){
"use strict";
var r=wx.cgiData,n=e("common/wx/Cgi.js"),i=e("safe/Scan.js"),t=(e("biz_common/jquery.md5.js"),
e("biz_common/jquery.validate.js"),e("common/wx/verifycode.js")),o=e("common/wx/Tips.js"),c=e("forgetpwd/weakpwd.js");
c=c.pwdList;
var a=function(){
function e(e){
for(var r=0,n=c.length;n>r;){
var i=Math.floor((r+n)/2);
if(e==c[i])return!0;
e<c[i]?n=i:r=i+1;
}
return!1;
}
function i(){
function e(e,r){
var n={};
n[e]=r,u&&u.showErrors(n);
}
function i(){
if($("#js_oldpwd").blur(),$("#js_newpwd").blur(),$("#js_repwd").blur(),$("#imgcode").blur(),
!u.checkForm())return!1;
var i=$("#js_submit");
i.btn(!1);
var t=$("#js_form").serializeObject(),c={
action:"submit",
oldpwd:$.md5(t.oldpwd.substr(0,16)),
newpwd:$.md5(t.newpwd.substr(0,16)),
imgcode:t.imgcode,
code:r.code
};
return n.post({
url:"/cgi-bin/safecenterchangepwd",
data:c,
mask:!1
},function(r){
if(!r||!r.base_resp)return o.err("系统错误，请稍后重试"),i.btn(!0),void d.refresh();
var t=+r.base_resp.ret;
switch(t){
case 0:
o.suc("修改成功"),location.href="/";
break;

case 200020:
e("newpwd","密码长度应最短6位，或者使用了非法字符");
break;

case 200027:
e("imgcode","验证码错误，请重新输入");
break;

case 200023:
e("oldpwd","原密码错误，请重新输入");
break;

case 200007:
o.err("用户访问受限，请验证后重试");
break;

case 200008:
e("imgcode","验证码错误，请重新输入");
break;

case 200021:
o.err("用户不存在");
break;

case 200028:
o.err("新密码和原密码相同，请重新输入");
break;

case 200013:
o.err("你的操作过于频繁，请稍后再试");
break;

case-35:
case 200035:
o.err("扫码认证状态异常，请稍后重试");
break;

default:
n.handleRet(r,{
id:64463,
key:22,
url:"/cgi-bin/safecenterchangepwd"
});
}
0!=t&&(i.btn(!0),d.refresh());
}),!1;
}
{
var c=$("#js_change");
$("#js_imgVerify"),$("#js_imgVerifyx"),$("#js_verify");
}
c.show(),d=new t("#js_verifycodeImgArea"),$("#js_return").on("click",function(){
location.reload();
}),u=$("#js_form").validate({
rules:{
oldpwd:{
required:!0
},
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
oldpwd:{
required:"请填写原密码"
},
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
errorPlacement:function(e,r){
var n=r.parent(),i=n.parent(),t=i.find(".frm_tips");
i.find("p.fail").remove(),t.length?e.insertBefore(t):e.appendTo(i);
}
}),$("#js_submit").on("click",function(){
$(this).attr("disabled")||i();
});
}
function a(){
$.validator.addMethod("checkallnum_or_char",function(e,r){
return this.optional(r)||!/^\d*$/.test(e)&&!/^[a-zA-Z]*$/.test(e);
}),$.validator.addMethod("checkinvalidch",function(e,r){
return this.optional(r)||/^[\x21-\xfe]*$/.test(e);
}),$.validator.addMethod("checkverifycode",function(e,r){
return this.optional(r)||/^[\w\d]{4}$/.test(e);
}),$.validator.addMethod("checkweakpwd",function(r,n){
return this.optional(n)||!e(r);
});
}
function s(){
a(),i();
}
var d,u;
return{
init:s
};
}(),s=function(){
function e(){
$(".js_scan").show();
new i({
container:".js_scan",
type:"check",
source:"pwd",
wx_name:r.strategy_status.wx_alias,
onconfirm:function(){
var e=this.code;
e?($(".js_scan").hide(),r.code=e,a.init()):(o.err("系统错误"),setTimeout(function(){
location.reload();
},200));
}
});
}
function n(){
return r.strategy_status.wx_alias?r.strategy_status.wx_protect?void e():($("#js_noprotect").show(),
!1):($("#js_noadmin").show(),!1);
}
return{
init:n
};
}(),d=function(){
function e(){
s.init();
}
return{
init:e
};
}();
d.init();
});