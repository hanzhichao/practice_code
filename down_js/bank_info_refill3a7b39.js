define("register/bank_info_refill.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/popup.js","biz_common/jquery.validate.js","register/banklist.js","register/data_bank_city.js"],function(n){
"use strict";
function t(n){
var t="",e=null;
return n&&n.base_resp&&(e=n.base_resp.ret),t=91==e?"你已经成功验证过打款的备注码，请勿重复验证":72==e?"你已成功验证过打款备注码，请勿重复验证":73==e?"该帐号已经无法进行此操作":63==e?"您已经用完3次填写机会，帐号将被冻结":62==e?"您已经多次重填失败，无法再次提交对公帐号信息，帐号将被冻结":61==e?"已经过期，无法提交对公帐号信息，帐号将被冻结":60==e?"你提交的注册申请过于频繁，请稍后再试":"系统错误，请重试";
}
function e(){
k=wx.cgiData.bankInfo,s=$("#js_div_main");
}
function a(){
s.html(o("tpl_refill",{
bank:k,
can_register_again:wx.cgiData.can_register_again
}));
}
function i(){
var n=new Date(1e3*wx.cgiData.bank_deadline);
k.bank_deadline=n.getMonth()+1+"月"+n.getDate()+"日",s.html(o("tpl_verify",{
bank:k,
can_register_again:wx.cgiData.can_register_again,
can_remit_again:wx.cgiData.can_remit_again
}));
var t=$(".js_txt_remit_code_prefix"),e=wx.cgiData.remit_code_prefix.split("");
if(0==e.length)t.remove();else for(var a=0;a<e.length;a++)t.eq(a).html(e[a]);
}
function r(){
var n,e,a=$("#js_form_refill"),i=$("#js_btn_submit"),r=$("#js_btn_register_again");
$("#js_btn_show_bank").on("click",function(){
$(".dialog_wrp").length?p.show():p.init({
onGettingBank:function(n){
$("#js_div_bank_name").html(n),$("#js_input_bank_name").val(n),$("#js_btn_show_bank").html("重新选择");
}
});
}),r.on("click",function(){
$("#tpl_register_again").popup({
title:"修改资料确认",
buttons:[{
text:"确认",
type:"primary",
click:function(){
location.href="/acct/skeyregisteragain?"+wx.data.param;
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
});
}),setTimeout(function(){
n=new u({
container:"#js_div_bank_province",
label:k.bank_province?k.bank_province:"省份",
data:d.province,
callback:function(n){
$("#js_input_bank_city").val(""),$("#js_input_bank_province").val(n),$("#js_input_bank_province").valid(),
e&&e.destroy(),e=new u({
container:"#js_div_bank_city",
label:"城市",
data:d.city[n],
callback:function(n){
$("#js_input_bank_city").val(n),$("#js_input_bank_city").valid();
},
search:!1
});
},
search:!1
}),k.bank_province&&(e=new u({
container:"#js_div_bank_city",
label:k.bank_city?k.bank_city:"城市",
data:d.city[k.bank_province],
callback:function(n){
$("#js_input_bank_city").val(n),$("#js_input_bank_city").valid();
},
search:!1
}));
},100);
var c=function(){
return 0==a.valid()?(console.log("no valid"),!1):(i.btn(!1),l.post({
url:"/acct/bankacctinfo",
data:{
action:"set",
bank_acct_num:$("#js_input_bank_acct_num").val(),
bank_name:$("#js_input_bank_name").val(),
bank_province:$("#js_input_bank_province").val(),
bank_city:$("#js_input_bank_city").val()
},
mask:!1
},function(n){
if(i.btn(!0),0==n.base_resp.ret){
var e=new Date(1e3*n.bank_deadline),a=e.getMonth()+1+"月"+e.getDate()+"日";
s.html(o("tpl_result_ok",{
bank_deadline_str:a
}));
}else b.err(t(ret));
}),!1);
};
a.on("subimt",c),i.on("click",c),a.validate({
ignore:".js_input_ignore",
rules:{
bank_acct_num:{
required:!0,
number:!0,
rangelength:[2,35]
},
bank_name:{
required:!0
},
bank_province:{
required:!0
},
bank_city:{
required:!0
}
},
messages:{
bank_acct_num:{
required:"请输入对公账户",
number:"对公账户为2到35个数字",
rangelength:"对公账户为2到35个数字"
},
bank_name:{
required:"请选择开户银行"
},
bank_province:{
required:"请选择开户地点"
},
bank_city:{
required:"请选择开户地点"
}
},
errorPlacement:function(n,t){
var e=t.parent().parent(),a=e.find(".frm_tips");
e.find(".fail").remove(),a.length?n.insertBefore(a):e.append(n);
}
});
}
function c(){
var n=$("#js_form_verify"),e=$("#js_btn_submit"),a=$("#js_btn_resend"),i=$("#js_btn_register_again"),r=$(".js_input_remit_code"),c=$("#js_div_err"),_=function(n){
c.show().find("span").html(n);
},s=function(){
c.hide();
},o=function(){
var n="";
return r.each(function(){
n+=$(this).val();
}),""==n?(_("请输入验证码"),!1):0==/\d{6}/.test(n)?(_("验证码为6位数字"),!1):(e.btn(!1),l.post({
url:"/acct/bankacctinfo",
data:{
action:"verify",
code:n
},
mask:!1
},function(n){
e.btn(!0),0==n.base_resp.ret?1==n.success?(b.suc("验证成功，可正常使用公众平台"),window.location.href=wx.url("/cgi-bin/home?t=home/index")):b.err("验证码输入错误，你还有%s次机会填写，3次错误帐号将被冻结".sprintf(n.left_times)):b.err(91==n.base_resp.ret?"你已经成功验证过打款的备注码，请勿重复验证":72==n.base_resp.ret?"你已成功验证过打款备注码，请勿重复验证":63==n.base_resp.ret?"您已经用完3次填写机会，帐号将被冻结":62==n.base_resp.ret?"您已经多次重填失败，无法再次提交对公帐号信息，帐号将被冻结":61==n.base_resp.ret?"已经过期，无法提交对公帐号信息，帐号将被冻结":"系统错误，请重试");
}),!1);
};
n.on("submit",o),e.on("click",o);
var u=r.length;
r.each(function(n){
$(this).data("index",n).data("oldvalue",""),$(this).on("keyup",function(n){
var t=$(this).val(),e=$(this).data("oldvalue"),a=1*$(this).data("index");
s(),8==n.keyCode&&""==e&&""==t?a>0&&r.eq(a-1).focus().select():""!=t&&u-1>a&&r.eq(a+1).focus(),
$(this).data("oldvalue",t);
});
}),r.on("focus",function(){
$(this).select();
}),a.on("click",function(){
$("#tpl_resend_code").popup({
title:"重新打款确认",
buttons:[{
text:"重新打款",
type:"primary",
click:function(){
l.post({
url:"/acct/bankacctinfo?action=remit_again"
},function(n){
n&&0==n.base_resp.ret?(b.suc("重新打款成功"),location.reload()):b.err(t(n));
});
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
});
}),i.on("click",function(){
$("#tpl_register_again").popup({
title:"修改资料确认",
buttons:[{
text:"确认",
type:"primary",
click:function(){
location.href="/acct/skeyregisteragain?"+wx.data.param;
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
});
});
}
function _(){
e(),2==wx.cgiData.bank_verify_status?(i(),c()):(a(),r());
}
var s,o=template.render,l=n("common/wx/Cgi.js"),u=n("biz_web/ui/dropdown.js"),b=n("common/wx/Tips.js"),p=(n("common/wx/popup.js"),
n("biz_common/jquery.validate.js"),n("register/banklist.js")),d=n("register/data_bank_city.js"),k={};
_();
});