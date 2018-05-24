define("setting/bind-email-status.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(o){
"use strict";
function a(){
for(var o=location.search.substr(1),a=o.split("&"),c={},e=0,i=a.length;i>e;e++){
var m=a[e].split("=");
c[m[0]]=decodeURIComponent(m[1]);
}
return c;
}
var c=o("common/wx/Tips.js"),e=o("common/wx/Cgi.js"),i={
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
};
!function(){
$("#js_email").text(a().email||"");
}(),$("#js_gotoLogin").click(function(){
var o=($(this),a().email||""),c=o.substr(o.indexOf("@")+1),e=i[c];
return e=e||"mail."+c,e&&window.open("http://"+e),!1;
}),$("#js_resendEmail").click(function(){
var o="/acct/updateboundemail?action={action}&token={token}&lang=zh_CN".replace("{token}",wx.data.t);
o=o.replace("{action}",cgiData.action?"resend_auth":"resend");
var a={
ajax:1
};
e.post({
url:o,
data:a,
mask:!1,
beforeSend:function(){
c.suc("处理中…");
}
},function(o){
var a=o&&o.base_resp&&o.base_resp.ret;
switch(+a){
case 0:
c.suc("发送成功，请登录邮箱验证");
break;

case 7:
case 200007:
c.err("邮件发送过于频繁，请稍候再试");
break;

case 8:
case 200008:
c.err("邮箱已经被修改，再次修改请一个月后再试");
break;

case-13:
case 200013:
c.err("操作过于频繁，请稍后再试");
break;

default:
c.err("发送失败，请重试");
}
});
});
});