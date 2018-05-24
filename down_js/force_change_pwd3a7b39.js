define("user/force_change_pwd.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(o){
"use strict";
var m=wx.cgiData,c=o("common/wx/Cgi.js"),i=o("common/wx/Tips.js");
!function(){
var o=m.email,a={
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
a[o]||$("#js_loginMail").hide(),$("#js_loginMail").click(function(){
window.open("http://"+a[o]);
}),$("#js_resendEmail").click(function(){
c.post({
url:"/cgi-bin/securechangepwdsmsverify",
data:{
act:"sendmail"
},
mask:!1
},function(o){
switch(+o.base_resp.ret){
case 0:
i.suc("邮件发送成功");
break;

case 200018:
i.err("登录超时，请重新登录");
break;

case-1:
default:
i.err("邮件发送失败，请稍后再试");
}
});
});
}();
});