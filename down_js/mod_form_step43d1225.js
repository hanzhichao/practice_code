define("register/mod/mod_form_step4.js",["common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/overseasList.js","common/wx/subjectAppealDialog.js","common/wx/popup.js"],function(e,a,t){
"use strict";
function r(){
var e=b.serializeObject(),a={};
for(var t in e)a[t]=$.trim(e[t]);
return a.operator_mobile&&(/^\+/.test(a.operator_mobile)||0!=f.getData().is_overseas?a.mobile_country&&1==f.getData().is_overseas&&(a.operator_mobile=q[a.mobile_country]+a.operator_mobile):a.operator_mobile="+86"+a.operator_mobile),
a.bank_acct_num&&a.name&&(a.name=a.name.replace("（","(").replace("）",")")),3!=a.register_type_select&&(delete a.legal_person_name,
delete a.legal_person_idcard,delete a.legal_qrcheck_ticket,delete a.legal_qrcheck_status),
a;
}
function i(e){
var a="";
switch(e.contractor_name_type){
case 1:
a="你的主体为企业类型，请选择正确的主体类型",1==f.getData().contractor_type?void 0!==f.getData().is_individual&&1==f.getData().is_individual?c("is_individual",a):c("is_individual",""):s(a);
break;

case 2:
a="你的主体为个体工商户类型，请选择正确的企业类型",1==f.getData().contractor_type?void 0!==f.getData().is_individual&&1!=f.getData().is_individual?c("is_individual",a):c("is_individual",""):s(a);
break;

default:
s(""),c("is_individual","");
}
if(1==e.is_limited?(1==f.getData().contractor_type&&1==f.getData().is_individual?(a="该主体数量已超上限，在通过审批前不能使用该主体注册新的帐号。请登录该主体的其中一个帐号，在“公众号设置-主体信息”查询主体绑定公众号信息。",
e.can_do_principal_limit_appeal&&(a+='<br>如确需再注册公众号，请填写<a href="%s" target="_blank">申请表</a>提交申请，提交后，经公众平台初审，并报互联网信息内容主管部门审批同意后，将适当放宽帐号注册数量。了解主体注册数量规则，<a href="%s" target="_blank">点击这里</a>'.sprintf("/acct/principallimitappeal?action=index&lang=zh_CN","http://kf.qq.com/faq/120911VrYVrA140428naUJVv.html"))):(a="该主体数量已超上限，在通过审批前不能使用该主体注册新的帐号。请登录该主体的其中一个帐号，在“公众号设置-主体信息”查询主体绑定公众号信息。",
e.can_do_principal_limit_appeal&&(a+='<br>如确需再注册公众号，请填写<a href="%s" target="_blank">申请表</a>提交申请，提交后，经公众平台初审，并报互联网信息内容主管部门审批同意后，将适当放宽帐号注册数量。了解主体注册数量规则，<a href="%s" target="_blank">点击这里</a>'.sprintf("/acct/principallimitappeal?action=index&lang=zh_CN","http://kf.qq.com/faq/120911VrYVrA140428naUJVv.html"))),
c("name",a)):g.valid(),1==f.getData().contractor_type||4==f.getData().contractor_type)switch(T.mods.bank.showSelectType(),
e.allowed_register_type){
case 0:
T.mods.bank.onlyType(-1);
break;

case 1:
T.mods.bank.onlyType(1);
break;

case 2:
T.mods.bank.onlyType(2);

case 3:
T.mods.bank.onlyType(32);
}
}
function n(){
return $('input[name="register_type_select"]:checked').val();
}
function o(e){
var a=e.base_resp.ret,t=n(),r=3==t?50:5;
switch(a){
case-22:
w.err("由于提交多次虚假或违规信息，该身份证号已被禁止注册");
break;

case-34:
w.err("已有%s个帐号登记过该身份证，请使用另外一个身份证完成用户信息登记".sprintf(r));
break;

case-35:
w.err("该手机已经登记过%s次，请使用别的手机号进行用户信息登记".sprintf(r));
break;

case 25:
w.err("未满18周岁，不能申请");
break;

case 200002:
w.err("参数错误，提交失败");
break;

case 200003:
w.err("登录超时，请重新登录。");
break;

case 200024:
w.err("手机验证码错误");
break;

case 201e3:
w.err("二维码身份验证失败，请重新扫描二维码");
break;

case 13001:
w.err("银行户名填写不正确，请重新填写");
break;

case 13002:
w.err("银行账号填写不正确，请重新填写");
break;

case 13010:
w.err("检测到该主体下有其他账号正处于小额打款流程中，请注册完成后再申请新的帐号");
break;

case 217004:
w.err("管理员微信号已绑定了50个公众平台帐号，不可继续绑定，请更换管理员。");
break;

case 217009:
w.err("你的管理员微信尚未绑定手机号，无法注册公众号。如需绑定手机号，请在微信客户端，点击“我”-“设置”-“账号与安全”-“手机号”进行绑定。");
break;

case 218e3:
w.err("您提交的法定代表人信息，验证失败次数太多，请尝试其他验证方式进行注册。");
break;

case 210013:
i(e);
break;

case 200700:
new x({
reason:e.reason,
canAppeal:!e.ban_appeal,
jumpUrl:wx.url("/acct/contractorappeal?action=index"),
appealTicket:e.appeal_ticket
});
break;

case 210009:
w.err("已有%s个帐号登记过该身份证，请使用另外一个身份证完成用户信息登记".sprintf(r));
break;

case 210010:
w.err("该手机已经登记过%s次，请使用别的手机号进行用户信息登记".sprintf(r));
break;

default:
y.handleRet(e,{
id:"64430",
key:"5"
});
}
}
function s(e){
$("#js_err_contractor_type").show().find(".frm_msg_content").html(e);
}
function c(e,a){
var t=b.validate(),r={},i=b.find('input[name="'+e+'"]');
i.length&&(""!=a?(r[e]=a,setTimeout(function(){
t.showErrors(r);
},1)):i.valid());
}
function l(e){
var a=r();
a.bank_acct_num&&a.name&&(a.name=a.name.replace("（","(").replace("）",")")),a.is_remit_reg=f.getData().is_remit_reg,
y.post({
url:"/acct/contractorsubmit",
data:a,
mask:!1
},function(a){
var t=a.base_resp.ret;
if(0==t)if(1==f.getData().refill){
var r="#tpl_refill_result_ok";
0==f.getData().contractor_type&&(r="#tpl_refill_result_pending"),$(r).popup({
title:"信息提交成功",
data:f.getData(),
buttons:[{
text:"前往微信公众平台",
type:"primary",
click:function(){
location.href="/";
}
}],
onHide:function(){
location.href="/";
},
onShow:function(){}
});
}else if(0==f.getData().is_overseas){
var i=T.mods.qrcheck.getTicket();
location.href="/acct/contractorpage?action=showreg&step=5&qrcheck_ticket="+i+"&lang=zh_CN";
}else 1==f.getData().is_overseas&&(location.href="/acct/contractorpage?action=showreg&step=5&lang=zh_CN");else o(a);
e(a);
});
}
function p(){
h=b.find(".js_btn_submit"),g=b.find('input[name="name"]'),k=b.find('input[name="is_individual"]'),
v=b.find('input[name="register_type_select"]');
}
function _(){}
function m(){
b.on("submit",function(){
if(0==b.valid())return!1;
var e=r();
f.setData(function(a){
a=$.extend(!1,a,e);
});
var a="#tpl_step4_submit_normal";
4==f.getData().service_type&&(a="#tpl_step4_submit_enterprise");
$(a).popup({
title:"提示",
width:860,
data:e,
close:function(){
this.remove();
},
buttons:[{
text:"确定",
type:"primary",
click:function(e){
var a=$(e.target),t=this;
a.btn(!1),l(function(e){
e&&0==e.base_resp.ret?1==f.getData().refill&&t.remove():t.remove();
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
this.resetPosition();
}
});
return!1;
}),"register"==f.getData().current_page&&0!=f.getData().contractor_type&&g.on("blur",function(){
var e=$.trim(g.val());
return""==e?void(T.mods.bank&&T.mods.bank.hideSelectType()):(T.mods.bank&&T.mods.bank.showSelectType(),
void y.post({
url:"/acct/contractorsubmit",
data:{
action:"check_principal_name",
contractor_action:b.find('input[name="action"]').val()||"",
is_individual:f.getData().is_individual||0,
name:e
},
mask:!1
},function(e){
console.log("check_principal_name:",e.base_resp.ret);
var a=e.base_resp.ret;
switch(a){
case 210013:
i(e);
break;

case 0:
default:
T.mods.bank&&T.mods.bank.onlyType(-1),T.mods.bank&&T.mods.bank.showSelectType(),
s(""),c("name",""),c("is_individual","");
}
}));
});
}
function d(){
$.validator.addMethod("is_organization_code",function(e){
return 1==/^[\d|A-Z]{8}\-[\d|A-Z]$/.test(e)?!0:1==/^[\d|A-Z]{18}$/.test(e)?!0:!1;
}),$.validator.addMethod("is_ent_code",function(e){
var a=e.length;
return 13!=a&&15!=a&&18!=a?!1:0==/^[0-9a-zA-Z]+$/.test(e)?!1:!0;
}),b.validate({
ignore:"",
rules:{},
messages:{},
errorPlacement:function(e,a){
if(a.hasClass("js_input_tips_on_top"))return void w.err(e[0].innerText);
var t=a.parent().parent(),r=t.find(".frm_tips");
t.find(".fail").remove(),r.length?e.insertBefore(r):t.append(e);
}
});
}
function u(e){
f=e.model,b=$(e.form),T=$.extend(!1,T,e),j=!0,p(),_(),m(),d();
}
var f,b,g,k,v,h,y=(template.render,e("common/wx/Cgi.js")),w=(e("common/wx/dialog.js"),
e("common/wx/Tips.js")),D=e("common/wx/overseasList.js"),x=e("common/wx/subjectAppealDialog.js"),j=(e("common/wx/popup.js"),
!1),T={},q=D.mobilePrefix;
t.exports={
init:u
};
});