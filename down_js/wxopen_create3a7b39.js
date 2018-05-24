define("wxopen/wxopen_create.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/qrcheck.js","biz_common/jquery.validate.js","common/wx/Step.js","wxopen/wxopen_create_step1.js","wxopen/wxopen_create_step2.js","wxopen/wxopen_create_step3.js","wxopen/wxopen_create_step4.js"],function(e){
"use strict";
var n=(e("common/wx/Tips.js"),e("common/wx/Cgi.js"),e("biz_web/ui/checkbox.js"),
e("common/wx/qrcheck.js"),e("biz_common/jquery.validate.js"),e("common/wx/Step.js")),o={
step1:e("wxopen/wxopen_create_step1.js"),
step2:e("wxopen/wxopen_create_step2.js"),
step3:e("wxopen/wxopen_create_step3.js"),
step4:e("wxopen/wxopen_create_step4.js")
},s=null;
wx.cgiData.admin_info.phone&&(wx.cgiData.admin_info.phone=wx.cgiData.admin_info.phone.replace(/\\r|\r$/,""));
var t={
data:{
realname_info:wx.cgiData.realname_info,
admin_info:wx.cgiData.admin_info,
is_overseas:wx.cgiData.is_overseas
},
mod:o,
init:function(){
s=new n({
container:"#js_div_steper",
selected:1,
names:["1 选择复用资质","2 填写小程序帐号信息"]
});
for(var e in o)o[e].init({
page:t
});
t.showStep(1);
},
showStep:function(e){
$(".js_sub_step").hide(),o["step"+e].show();
},
showSteper:function(){
$("#js_div_steper").show();
},
hideSteper:function(){
$("#js_div_steper").hide();
},
setSteper:function(e){
s.setStep(e);
}
};
t.init();
});