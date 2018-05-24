define("common/wx/phone_validate.js",["biz_common/jquery.validate.js","tpl/phone_validate.html.js","common/wx/Cgi.js","common/wx/Tips.js"],function(n){
"use strict";
var e=n("biz_common/jquery.validate.js"),i=n("tpl/phone_validate.html.js"),t=n("common/wx/Cgi.js"),o=n("common/wx/Tips.js"),a=e.rules.mobile,r=wx.T,l=function(n){
var e=$(n.container),l=n.timeout||60,s=n.url,d=($(r(i,n)).prependTo(e),e.find(".js_phone_validate_input")),m=e.find(".js_phone_validate_btn");
d.on("keyup input propertychange",function(){
if(!d.attr("readonly")){
var n=d.val().trim();
a(n)?m.enable():m.disable();
}
}).trigger("keyup");
var u,c=l,f=function(){
d.attr("readonly",!0),m.html(l+"秒后重发").disable(),e.find(".frm_input_box").addClass("disabled"),
u=setInterval(function(){
return c--,0>=c?void p():void m.html(c+"秒后重发");
},1e3);
},p=function(){
m.html("获取验证码"),d.attr("readonly",!1),m.enable(),e.find(".frm_input_box").removeClass("disabled"),
clearInterval(u);
};
m.click(function(){
if(!m.hasClass("btn_disabled")){
c=l,f();
var e=d.val().trim();
e="+86"+e.replace("+86",""),t.post({
url:s,
data:{
mobile:e
},
error:function(){
o.err("发送错误，请重新尝试"),p();
}
},function(e){
"function"==typeof n.onfinish&&n.onfinish(e,p);
});
}
});
};
return l;
});