define("enterprise/login_enterprise_frame.js",["common/wx/Cgi.js","biz_common/jquery.md5.js","common/wx/Tips.js"],function(e){
"use strict";
function r(){
$("#btn_confirm").on("click",function(){
n()?c.post({
url:"/cgi-bin/verifyqyskip?action=checkpwd&lang=zh_CN",
data:{
email:$("#txt_email").val(),
orderid:$("#orderid").val(),
redirecttype:$("#redirecttype").val(),
pwd:t(),
imgcode:$("#txt_verifycode").val()||""
},
mask:!1
},function(e){
var r=e.base_resp.ret;
0==r&&""!=e.redirect_url?window.location.href=e.redirect_url:200008==r?($("#area_verifycode").show(),
$("#txt_verifycode").val(""),$("#img_verifycode").attr("src","/cgi-bin/verifycode?username="+$("#txt_email").val()+"&r="+Math.random())):i(200007==r?"您登录尝试次数过多，请稍后再试。":200027==r?"您输入的验证码不正确，请重新输入。":200023==r?"您输入的密码不正确，请重新输入。":200021==r?"用户不存在，请重新输入。":"系统错误，请稍后再试");
}):i("你还没有输入密码！");
}),o();
}
function i(e){
console.log("err"),console.log(e),$("#area_errmsg").html(e).show();
}
function o(){
$("#changeimg_link").on("click",function(){
$("#img_verifycode").attr("src","/cgi-bin/verifycode?username="+$("#txt_email").val()+"&r="+Math.random());
});
}
function n(){
return""!=$("#txt_pwd").val();
}
function t(){
return n()?$.md5($("#txt_pwd").val().substr(0,16)):"";
}
{
var c=e("common/wx/Cgi.js");
e("biz_common/jquery.md5.js"),e("common/wx/Tips.js");
}
r();
});