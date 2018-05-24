define("forgetpwd/check_email.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/verifycode.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var r=e("common/wx/Cgi.js"),i=e("common/wx/Tips.js"),o=e("common/wx/verifycode.js"),s=(e("biz_common/jquery.validate.js"),
function(){
function e(e){
var o={
action:"send_email",
email:e,
verify_code:n.getCode()
};
r.post({
url:"/acct/resetpwd",
data:o,
success:function(e){
if(e.base_resp){
var o=e.base_resp.ret;
0==o?location.href="/cgi-bin/readtemplate?t=forgetpwd_checkemailsuc_tmpl":200013==o?i.err("你的操作过于频繁，请稍后再试"):200021==o?i.err("您输入的邮箱尚未注册公众号"):200121==o?i.err("该帐号属于微信开放平台"):200027==o?i.err("验证码错误，请重新输入"):r.handleRet(e,{
id:64463,
key:23,
url:"/acct/resetpwd"
});
}else i.err("系统繁忙，请稍后再试");
n.refresh();
},
error:function(){
i.err("系统繁忙，请稍后再试"),n.refresh();
}
});
}
function s(){
$("#js_form").validate(c);
}
var c={
rules:{
email:{
required:!0,
email:!0
},
imgcode:{
required:!0
}
},
messages:{
email:{
required:"请输入邮箱",
email:"请输入正确的邮箱地址"
},
imgcode:{
required:"请填写验证码"
}
},
onfocusout:!1,
onchange:!1,
onkeyup:!1,
submitHandler:function(){
e($("#js_email").val());
}
},n=($("#js_imgVerify"),$("#js_imgVerifyx"),$("#js_verify"),new o("#js_verifycodeImgArea"));
return{
init:s
};
}());
s.init();
});