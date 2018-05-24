define("setting/wxverifycode.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e,t,a){
"use strict";
function n(){
clearInterval(C),$(u).text("获取验证码").attr("disable",!1).parent().removeClass("btn_disabled").addClass("btn_default"),
$(l).removeAttr("disabled").parent().removeClass("disabled"),m();
}
function s(){
var e=1e3,t=60,a=$(u).text(""+t+"秒后可重发");
C=setInterval(function(){
t--,a.text(""+t+"秒后可重发"),0>=t&&n();
},e);
}
function r(){
var e=$.trim($(l).val());
return/^[0-9a-zA-Z_-]+$/.test(e)?e:(_.err("帐号格式错误"),$(l).focus(),!1);
}
function i(){
w.post({
url:p,
data:{
wxname:x
},
mask:!1,
beforeSend:function(){
$(l).attr("disabled","disabled").parent().addClass("disabled"),$(u).attr("disable","true").parent().removeClass("btn_default").addClass("btn_disabled");
}
},function(e){
if(e&&e.base_resp){
var t=+e.base_resp.ret;
switch(t){
case 0:
return _.suc("发送成功"),f(),void s();

case 1:
b(t);
break;

case 2:
_.err("验证号发送过于频繁，请稍候重试");
break;

case 3:
case 200003:
_.err("获取验证码次数过多，请明天再试");
break;

default:
_.err("发送失败，请重试");
}
n();
}
});
}
function c(){
"true"!=$(this).attr("disable")&&0!=(x=r())&&(v.call(this),i());
}
function o(){
$(document).on("click",u,c);
}
function d(e){
return u=e.button,l=e.input,p=e.url,v=e.click||function(){},b=e.error||function(){},
f=e.success||function(){},m=e.complete||function(){},o(),{
clear:n
};
}
var u,l,f,b,m,v,p,x,C,w=e("common/wx/Cgi.js"),_=e("common/wx/Tips.js");
a.exports=d;
});