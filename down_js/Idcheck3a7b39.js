define("common/wx/Idcheck.js",["tpl/Idcheck.html.js","common/wx/popup.js","biz_web/ui/checkbox.js","biz_common/cookie.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/Step.js"],function(t,e,i){
"use strict";
var o=t("tpl/Idcheck.html.js"),c=(t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),
t("biz_common/cookie.js")),n=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),a=t("common/wx/Step.js"),r={
mobile:{
number:"",
request_url:"/cgi-bin/contractorverify?action=check_mobile",
get_code_url:"/cgi-bin/contractorverify?action=send_code"
},
idcard:{
request_url:"/cgi-bin/contractorverify?action=check_id"
},
callback:function(){}
},d=function(t){
this.options=$.extend(!0,{},r,t),this.initDom(),this.initEvent();
};
d.prototype={
constructor:d,
initDom:function(){
var t=this;
$("body").append("<script id='idCheckHtml' type='text/html'>"+o+"</script>"),t.dialog=$("#idCheckHtml").popup({
title:"验证身份",
className:"dialog_process",
width:860,
data:t.options,
mask:!0,
autoShow:!1,
onShow:function(){
this.resetPosition();
}
}),t.$dialogWrp=t.dialog,t.step=new a({
container:t.$dialogWrp.find(".js_process"),
selected:1,
names:["1. 选择验证方式","2. 帐号验证"]
}),t.checkboxes=t.$dialogWrp.find(".js_radio").checkbox({
multi:!1
}),t.$dialogWrp.find(".js_mobile_forget").attr("href",wx.url("/misc/rebindverify?action=mail_get&safeaction=mobile_mail_get&t=setting/safe-rebind"));
},
initEvent:function(){
var t=this,e=t.$dialogWrp.find(".js_step1"),i=t.$dialogWrp.find(".js_setp2_mobile"),o=t.$dialogWrp.find(".js_step2_idcard"),a=60;
$(t.options.container).on("click",function(){
t.show();
}),t.$dialogWrp.find(".js_step1_next").on("click",function(){
switch(t.step.setStep(2),e.hide(),+t.checkboxes.values()[0]){
case 0:
o.show();
break;

case 1:
i.show(),t.$dialogWrp.find(".js_oldsend").click();
}
}),t.$dialogWrp.find(".js_step2_prev").on("click",function(){
t.step.setStep(1),i.hide(),o.hide(),e.show();
}),t.$dialogWrp.find(".js_oldsend").on("click",function(){
var e=$(this);
e.attr("disabled")||n.post({
url:t.options.mobile.get_code_url,
mask:!1,
error:function(){
s.err("发送失败");
}
},function(t){
var i=t.base_resp.ret;
if(0==i){
s.suc("发送成功");
var o=null,c=function(){
var t=+e.data("left");
if(1>=t)o&&window.clearInterval(o),e.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default");else{
var i=--t;
e.data("left",i).html(i+"秒后可重发");
}
};
e.data("left",a).html(a+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
o=window.setInterval(c,1e3);
}else s.err("-2341"==i?"操作频率过快，请稍后再试。":"发送失败");
});
}),i.find(".js_step2_mobilecheck").on("click",function(){
var e=$(this),o=i.find(".js_num").val().trim()||"";
return""!=o&&/^\d{6}$/.test(o)?(e.btn(!1),void n.post({
url:t.options.mobile.request_url,
data:{
code:o
},
mask:!1
},function(i){
switch(i.base_resp.ret){
case 0:
s.suc("验证成功"),c.set("contractor_ticket",i.contractor_ticket,1,{
domain:"weixin.qq.com",
path:"/"
}),e.btn(!0),"function"==typeof t.options.callback&&t.options.callback.call(t,i,t.value);
break;

case 1005:
s.err("验证码错误"),e.btn(!0);
break;

default:
s.err("验证失败"),e.btn(!0);
}
})):(s.err("请输入正确的手机验证码"),!1);
}),o.find(".js_step2_idcardcheck").on("click",function(){
var e=o.find(".js_cardname"),i=o.find(".js_cardid"),a=e.val().trim(),r=i.val().trim(),d=$(this);
return a?r?(d.btn(!1),void n.post({
url:t.options.idcard.request_url,
data:{
name:a,
idcard:r
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
s.suc("验证成功"),c.set("contractor_ticket",e.contractor_ticket,1,{
domain:"weixin.qq.com",
path:"/"
}),"function"==typeof t.options.callback&&t.options.callback.call(t,e,t.value);
break;

case 201005:
case-1005:
s.err("姓名或者身份证号码错误"),d.btn(!0);
break;

default:
s.err("验证失败"),d.btn(!0);
}
})):(s.err("请输入身份证号码"),!1):(s.err("请输入身份证姓名"),!1);
});
},
show:function(t){
this.value=t,this.dialog.popup("show");
},
hide:function(){
this.dialog.popup("hide");
},
remove:function(){
this.dialog.popup("remove");
}
},i.exports=d;
});