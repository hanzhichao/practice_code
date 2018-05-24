define("register/step2.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(o,m,i){
"use strict";
function c(o){
a=o.model,t=!0;
var m=a.getData().email||"",i=$("#js_loginEmail"),c={
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
""!==m?($("#js_confirmEmail").text(m),m=m.substr(m.indexOf("@")+1),c[m]?(i.show(),
i.click(function(){
window.open("http://"+c[m]);
})):i.hide()):i.hide(),$("#js_returnEmail").click(function(){
return a.setStep(1),!1;
}),$("#js_reSendEmail").click(function(){
e.post({
url:"/acct/emailregister",
data:{
email:a.getData().email,
verifycode:void 0,
pwd:$.md5(a.getData().pwd)
},
mask:!1,
error:function(){
l.err("发送失败！请稍后重试");
}
},function(o){
var m=+o.base_resp.ret;
if(0==m)l.suc("发送成功，请登录邮箱激活");else switch(m){
case 210023:
l.err("邮箱已经被注册过，请从公众平台首页直接登录完成信息登记");
break;

case 200013:
l.err("操作过于频繁，请稍后再试");
break;

default:
l.err("发送失败！请稍后重试");
}
});
});
}
var a,e=o("common/wx/Cgi.js"),l=o("common/wx/Tips.js"),t=!1;
i.exports={
init:c
};
});