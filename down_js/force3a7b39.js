define("safe/force.js",["common/wx/Tips.js","common/wx/Step.js","safe/Scan.js","common/wx/Cgi.js","safe/Mobile.js","safe/safe_cgi.js"],function(o){
"use strict";
var i=(o("common/wx/Tips.js"),o("common/wx/Step.js"),o("safe/Scan.js")),m=(o("common/wx/Cgi.js"),
o("safe/Mobile.js"),o("safe/safe_cgi.js")),c=wx.cgiData||{},a={
email:"",
action:"",
ticket:"",
auth:""
},s=$.extend({},a,c),n=function(){
function o(){
if("mail_get_assistant"==s.action){
var o=$(".js_form_mail");
o.find(".js_mail").text(s.email),o.find(".js_resend").on("click",function(){
m.force_resend(s.auth,$.noop);
});
var c={
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
},a=s.email.split("@");
if(2==a.length){
var n=c[a[1]];
n&&o.find(".js_login").attr("href","http://"+n).show();
}
o.show();
}else{
$(".js_form_wx").show();
{
new i({
container:".js_form_wx",
type:"bind",
source:"force_login",
dom_init:'<div class="status tips"><p>请使用微信扫描二维码进行验证</p></div>',
onconfirm:function(){
$(".js_form_wx").hide(),$(".js_result").show(),setTimeout(function(){
location.href=wx.url("/cgi-bin/home?t=home/index");
},300);
}
});
}
}
}
return{
init:o
};
}();
n.init();
});