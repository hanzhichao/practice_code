define("wxopen/wxopen_create_step4.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js"],function(o,i,e){
"use strict";
function c(o){
s=o.page,l=$(a("tpl_step4",s.data)),l.hide(),$("#js_div_steps").append(l);
}
function m(){
s.hideSteper(),s.setSteper(2),l.show();
var o=l.find(".js_btn_login"),i=s.data.email,e=i.substr(i.indexOf("@")+1);
l.find(".js_txt_email").html(i),r[e]?(o.show(),o.click(function(){
window.open("http://"+r[e]);
})):o.hide(),l.find(".js_btn_pre").click(function(){
return s.showStep(3),!1;
}),l.find(".js_btn_resend").click(function(){
t.post({
url:"/cgi-bin/fastregister?action=resend",
data:{
email:s.data.email,
verifycode:void 0,
pwd:s.data.md5_pwd
},
mask:!1,
error:function(){
n.err("发送失败！请稍后重试");
}
},function(o){
var i=+o.base_resp.ret;
if(0==i)n.suc("发送成功，请登录邮箱激活");else switch(i){
case 210023:
n.err("邮箱已经被注册过，请从公众平台首页直接登录完成信息登记");
break;

case 200013:
n.err("操作过于频繁，请稍后再试");
break;

default:
n.err("发送失败！请稍后重试");
}
});
});
}
var a=template.render,n=o("common/wx/Tips.js"),t=o("common/wx/Cgi.js"),s=(o("biz_web/ui/checkbox.js"),
null),l=null,r={
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
e.exports={
init:c,
show:m
};
});