define("register/step1_tmpl.js",["common/wx/Step.js","common/wx/popover.js","biz_common/jquery.validate.js","wxverify/validateExtend.js","register/model.js","register/step1.js","register/step2.js"],function(e){
"use strict";
function t(e){
a.setStep(e),$("#register").html(r(g[e],m.getData())),j[e].init({
model:m
});
}
function s(){
m.init({
step:wx.cgiData.step,
data:wx.cgiData,
onStepChange:t,
onDataChange:function(){}
}),a=new p({
container:"#stepItems",
selected:wx.cgiData.step,
names:["1 基本信息","2 选择类型","3 信息登记","4 公众号信息"]
});
}
function n(){
m.setStep(wx.cgiData.step);
}
function i(){
var e=new c({
dom:$("#js_tips_help"),
content:"请填写未注册订阅号/服务号/企业号/小程序/open帐号/个人微信号的邮箱",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
});
e.hide();
}
function o(){
s(),n(),i();
}
var a,r=(wx.T,template.render),p=e("common/wx/Step.js"),c=e("common/wx/popover.js"),m=(e("biz_common/jquery.validate.js"),
e("wxverify/validateExtend.js"),e("register/model.js")),j=[null,e("register/step1.js"),e("register/step2.js")],g=["","tpl_step1","tpl_step2"];
o();
});