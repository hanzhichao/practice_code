define("user/validate_phone.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var s=wx.cgiData,r=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),t=(e("biz_common/jquery.validate.js"),
""===s.type?"securesmsverify":"securechangepwdsmsverify");
!function(){
function e(r){
s&&clearTimeout(s);
var a=(new Date).getTime(),t=Math.floor((a-r)/1e3);
t>=60?i.html("发送验证码").attr("disabled",!1).removeClass("btn_disabled"):(i.attr("disabled",!0).addClass("btn_disabled").html("%s秒后可重发".sprintf(60-t)),
s=setTimeout(function(){
e(r);
},1e3));
}
var s,i=$("#js_sendMobile"),n=$("#js_submit");
i.click(function(){
"disabled"!==i.attr("disabled")&&(e((new Date).getTime()),r.post({
url:"/cgi-bin/"+t,
data:{
act:"sendsmscode"
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
a.suc("验证码已经发送"),n.attr("disabled",!1).parent().removeClass("btn_disabled");
break;

case 11001:
a.err("操作频率过快，请稍后再试");
break;

case 200018:
a.err("登录超时，请重新登录");
break;

case-1:
default:
r.handleRet(e,{
id:64462,
key:"securesmsverify"===t?83:84,
url:"/cgi-bin/"+t,
msg:"获取验证码失败，请稍后再试"
});
}
}));
}),setTimeout(function(){
i.click();
},300);
}(),function(){
$.validator.addMethod("verifycode",function(e){
return e=$.trim(e),/^\d{6}$/.test(e);
},"验证码应为6位数字"),$("#js_mobileVerify").validate({
rules:{
verifycode:{
verifycode:!0
}
},
errorPlacement:function(e,s){
var r=s.parent().parent();
r.find(".fail").remove(),e.insertAfter(r);
},
submitHandler:function(){
var e=$("#js_verifycode").val();
return r.post({
url:"/cgi-bin/"+t,
data:{
act:"verifysmscode",
login_sms_code:$.trim(e),
type:s.type
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
location.href=e.base_resp.err_msg;
break;

case 11002:
a.err("验证码错误");
break;

case 11003:
a.err("验证码过期，请重新获取验证码");
break;

case 200018:
a.err("登录超时，请重新登录");
break;

case-1:
default:
r.handleRet(e,{
id:64462,
key:"securesmsverify"===t?83:84,
url:"/cgi-bin/"+t,
msg:"系统繁忙，请稍后再试"
});
}
}),!1;
}
});
}();
});