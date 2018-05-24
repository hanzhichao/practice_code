define("findacct/index.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/Step.js","common/wx/qrcheck_weapp.js","common/wx/pagebar.js","common/wx/popover.js","biz_common/jquery.validate.js","common/wx/dialog.js","biz_common/utils/monitor.js","register/model.js","register/mod/mod_form_step4.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js","register/mod/mod_legal_person.js","register/mod/mod_legal_qrcheck.js","register/mod/mod_onecentbank.js"],function(e){
"use strict";
function t(){
a();
var e=j.init({
container:"#js_div_qrcheck",
container_class:"qrcheck_box",
cgiURI:"/cgi-bin/basesafeqrcode",
showImgInfo:!0,
size:120,
typeid:20,
msgData:{
name:"找回帐号需要身份验证，请用绑定了注册主体个人银行卡的微信扫描二维码。本次验证方式不扣除任何费用。",
name_title:""
},
data:{
appid:D.getData().appid
},
extra:{
appid:D.getData().appid
},
onSuccess:function(e){
$("#js_input_qrcheck_ticket").val(e);
},
onFail:function(e,t){
$("#js_input_qrcheck_status").val(t);
},
onMsgUpdate:function(e,t,a){
console.log("onMsgUpdate:",e,t,a),$("#js_input_qrcheck_status").val(t);
var i=void 0;
return $("#tpl_qrcheck_tips_"+t).length>0&&(i=g("tpl_qrcheck_tips_"+t,{})),console.log(i),
i;
}
});
e.load();
}
function a(){
I&&(I.destroy(),I=null,$("#js_input_qrcheck_ticket").val(""),$("#js_input_qrcheck_status").val(""),
$("#js_div_qrcheck").html(""),$("#js_div_qrcheck_display_tips").find(".js_qrcheck_tpl").hide());
}
function i(e){
var t=9,a=p.find(".js_btn_search"),n=p.find(".js_div_acctlist");
f.post({
url:"/acct/findacct?action=search",
mask:!1,
data:{
begin:(e-1)*t,
count:t,
query:D.getData().accoutn_query,
acct_type:D.getData().acct_type
}
},function(r){
if(console.log(r),a.removeClass("disabled"),0==r.base_resp.ret){
D.setData(function(e){
e.acct_list=r.list;
}),n.html(g("tpl_acctlist",{
list:r.list,
acct_type:D.getData().acct_type
})),p.find(".js_btn_step").eq(2).disable(),1==r.list.length&&$(".js_div_acctlist .js_item").trigger("click");
{
new k({
container:".js_div_pagebar",
perPage:t,
initShowPage:e,
totalItemsNum:r.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var a=t.currentPage;
return a!=e&&i(a),!0;
}
});
}
}else b.err("系统错误，请重试");
});
}
function n(){
u=$(".js_type_checkbox"),u.checkbox({
multi:!1,
onChanged:function(e){
$(".js_input_search").attr("placeholder",0==e.val()?"请输入公众号名称/微信号":"请输入小程序名称/原始ID"),
$("#js_label").text(0==e.val()?"公众号":"小程序"),p.find(".js_div_acctlist").empty(),D.setData(function(t){
t.acct_type=e.val();
});
}
}),p.find(".js_form_search").validate({
ignore:".js_input_ignore",
rules:{
query:{
required:!0
}
},
messages:{
query:{
required:0==D.getData().acct_type?"请输入公众号名称或微信号":"请输入小程序名称或原始ID"
}
},
errorPlacement:function(e,t){
var a=t.parent().parent();
a.find(".js_frm_msg").html(e.html()).show();
}
}),D.getData().appid||p.find(".js_btn_step").eq(2).disable();
}
function r(){
if(0==D.getData().contractor_type)return void t();
var e=$("#js_div_step3").find("form"),a=e.find('input[name="name"]'),i=e.find('input[name="credential"]'),n=e.find('input[name="email"]'),r=e.find('input[name="bank_acct_name"]');
for(var s in w)w[s].init({
model:D,
mods:w,
form:e
});
if(w.qrcheck.setQrcheckOpt({
cgiURI:"/cgi-bin/basesafeqrcode",
typeid:19,
data:{
appid:D.getData().appid
},
extra:{
appid:D.getData().appid
}
}),a.on("keyup, blur",function(){
w.qrcheck.setContractorName(a.val(),a.valid());
}),n.rules("add",{
required:!0,
email:!0,
messages:{
required:"请输入邮箱地址",
email:"请输入正确的邮箱地址"
}
}),1==D.getData().contractor_type?(a.rules("add",{
required:!0,
messages:{
required:"请填写企业名称",
rangelength:$.validator.format("企业名称为{0}到{1}个字符")
}
}),i.rules("add",{
required:!0,
is_ent_code:!0,
messages:{
required:"请输入正确的营业执照注册号",
is_ent_code:$.validator.format("请输入正确的营业执照注册号或统一社会信用代码")
}
})):(a.rules("add",{
required:!0,
messages:{
required:"请填写组织名称",
rangelength:$.validator.format("组织名称为{0}到{1}个字符")
}
}),i.rules("add",{
required:!0,
is_organization_code:!0,
messages:{
required:"请输入组织机构代码",
is_organization_code:"必须为9位或18位代码"
}
})),0!=D.getData().contractor_type){
var c=$(".js_field");
c.eq(0).find("p.frm_tips").text("请填写找回帐号的个人姓名，如果名字包含分隔号“.”,请勿忽略。"),c.eq(1).find("p.frm_tips").text("请填写找回帐号的个人身份证号码。");
}
1==D.getData().contractor_type?(w.bank.showSelectType(),w.bank.multiType([2,3])):(w.bank.showSelectType(),
w.bank.onlyType(2)),r.bind("copy paste",function(e){
e.preventDefault();
});
}
function s(){
d.hide();
var e=D.getData().email;
e=e.substr(e.indexOf("@")+1),x[e]||p.find(".js_btn_go_email").hide();
}
function c(e){
C.setStep(e),d.show();
var t=D.getData().preStep,i=$("#js_div_step"+e),c=$("#js_div_step"+t);
switch(c.hide(),i.show(),e>t?i.html(g("tpl_step"+e,D.getData())):c.html(""),3==t&&0==D.getData().contractor_type&&a(),
e){
case 2:
n();
break;

case 3:
r();
break;

case 4:
s();
}
D.setData(function(t){
t.preStep=e,t.current_page=wx.cgiData.current_page;
});
}
function o(){
d=$("#stepItems"),p=$(".js_div_step"),wx.cgiData.appid&&wx.cgiData.ticket&&(S=!0),
C=new h(S?{
container:"#stepItems",
selected:1,
names:["1 阅读须知","2 填写资料并验证身份"]
}:{
container:"#stepItems",
selected:1,
names:["1 阅读须知","2 填写待找回的帐号","3 填写资料并验证身份"]
}),D.init({
data:{
preStep:0,
step:1,
service_type:0,
acct_type:0,
bank_acct_info:{
bank_acct_name:"",
bank_acct_num:"",
bank_name:"",
bank_province:"",
bank_city:""
},
operator_info:{
operator_name:"",
operator_idcard:"",
operator_mobile:""
},
is_legal_person_reg_gray:0,
has_account:0
},
onStepChange:c
}),S&&D.setData(function(e){
e.appid=wx.cgiData.appid,e.contractor_type=wx.cgiData.realname_type,e.acct_type=0,
e.has_account=1;
});
}
function _(){
D.setStep(1);
}
function l(){
p.on("click",".js_btn_step",function(){
if($(this).hasClass("btn_disabled"))return!1;
if(3==$(this).data("step")){
var e=D.getData();
if(3==e.contractor_type)return location.href="http://kf.qq.com/bills/170922selfsam5892762.html",
!1;
}
D.setStep(1*$(this).data("step"));
}),p.on("click",".js_btn_search",function(){
p.find(".js_form_search").submit();
}),p.on("submit",".js_form_search",function(){
var e=$(this).find(".js_btn_search");
if(e.hasClass("disabled"))return!1;
if(0==$(this).valid())return!1;
var t=$.trim($(this).find(".js_input_search").val());
return D.setData(function(e){
e.accoutn_query=t;
}),e.addClass("disabled"),i(1),!1;
});
var e;
p.on("click",".js_div_acctlist .js_item",function(){
var t=$(this),a=t.data("accttype");
return e&&(e.remove(),e=null),t.hasClass("disabled")?(e=new v({
dom:t,
content:0==a?"暂不支持此公众号找回":"暂不支持此小程序找回",
place:"bottom",
margin:"center",
hideIfBlur:!0,
hover:!1
}),!1):(D.setData(function(e){
e.appid=t.data("appid"),e.contractor_type=1*t.data("contractortype"),e.can_refind=t.data("canrefind");
}),p.find(".js_div_acctlist .js_item").removeClass("selected"),t.addClass("selected"),
void p.find(".js_btn_step").eq(2).enable());
}),p.on("click",".js_btn_submit_form",function(){
var e=$(this),t=p.find(".js_form_step3"),a=p.find(".js_btn_step");
if(e.hasClass("btn_loading"))return!1;
if(0==t.valid())return!1;
a.disable(),e.btn(0);
var i=t.serializeObject();
D.setData(function(e){
for(var t in i)e[t]=i[t];
}),D.setData(function(e){
e.bank_acct_info.bank_acct_name=D.getData().bank_acct_name,e.bank_acct_info.bank_acct_num=D.getData().bank_acct_num,
e.bank_acct_info.bank_name=D.getData().bank_name,e.bank_acct_info.bank_province=D.getData().bank_province,
e.bank_acct_info.bank_city=D.getData().bank_city;
}),i.bank_acct_num&&i.name&&(i.name=i.name.replace(/（/g,"(").replace(/）/g,")"),i.bank_acct_name=i.bank_acct_name.replace(/（/g,"(").replace(/）/g,")")),
2==i.register_type&&(delete i.legal_person_name,delete i.legal_person_idcard,delete i.legal_person_status,
delete i.legal_person_ticket),-1==i.operator_mobile.indexOf("+86")&&(i.operator_mobile="+86"+i.operator_mobile);
for(var n in i)i[n]=$.trim(i[n]);
return f.post({
url:"/acct/findacct?action=preadd",
data:i,
mask:!1
},function(t){
if(a.enable(),e.btn(1),t&&0==t.base_resp.ret)D.setData(function(e){
e.email_index=t.index,e.email_user_id=t.user_id,e.open_id=t.open_id;
}),D.setStep(4);else if(-15==t.base_resp.ret)b.err("填写邮箱已被占用");else if(-16==t.base_resp.ret)b.err("一个微信号只能同时找回一个帐号");else if(-23==t.base_resp.ret)b.err("该主体注册公众号数量已达上限，可在同主体帐号的“公众号设置-主体信息-详情”查询主体注册公众号情况");else if(700==t.base_resp.ret)b.err("为保障帐号安全，暂不支持找回");else if(20002==t.base_resp.ret)b.err("参数错误，请重试");else if(212001==t.base_resp.ret)b.err("当前找回主体与帐号主体不一致，请重新填写");else if(200013==t.base_resp.ret)b.err("操作过于频繁，请稍后再试");else if(200024==t.base_resp.ret)b.err("手机验证码错误");else if(200035==t.base_resp.ret)b.err("二维码已过期");else if(200700==t.base_resp.ret){
var i="该主体信息曾因%s，违反《微信公众平台运营规范》，暂无法使用。".sprintf(t.reason||"涉嫌违规");
q.show({
type:"warn",
msg:"该主体信息暂无法使用|"+i,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}else b.err(5000023==t.base_resp.ret?"该身份证已登记过5次，请使用另一个身份证完成用户信息登记":5000026==t.base_resp.ret?"该手机已经登记过5次，请使用另一个手机号进行用户信息登记":500013==t.base_resp.ret?"该微信号已绑定5个管理员，请使用另一个微信号完成用户信息登记":5000021==t.base_resp.ret?"为保障微信公众平台的信息安全，不可绑定该管理员。":5000022==t.base_resp.ret?"为保障微信公众平台的信息安全，不可绑定该手机号码。":"系统错误，请重试");
}),!1;
}),p.on("click",".js_btn_resend_email",function(){
f.get({
url:"/acct/findacct?action=resend",
data:{
open_id:D.getData().open_id,
user_id:D.getData().email_user_id,
index:D.getData().email_index
},
mask:!1
},function(e){
console.log(e),e&&0==e.base_resp.ret?b.suc("发送成功"):b.err("系统错误，请重试");
});
}),p.on("click",".js_btn_go_email",function(){
var e=D.getData().email;
e=e.substr(e.indexOf("@")+1),x[e]&&window.open("http://"+x[e]);
});
}
function m(){
var e=window.onerror;
window.onerror=function(t,a,i,n,r){
y.setSum(20802,126,1),y.send(),e&&e(t,a,i,n,r);
},o(),_(),l();
}
e("biz_web/ui/checkbox.js");
var d,p,u,f=(wx.T,e("common/wx/Cgi.js")),g=template.render,b=e("common/wx/Tips.js"),h=e("common/wx/Step.js"),j=e("common/wx/qrcheck_weapp.js"),k=e("common/wx/pagebar.js"),v=e("common/wx/popover.js"),q=(e("biz_common/jquery.validate.js"),
e("common/wx/dialog.js")),y=e("biz_common/utils/monitor.js"),D=e("register/model.js"),w={
formStep4:e("register/mod/mod_form_step4.js"),
qrcheck:e("register/mod/mod_qrcheck.js"),
operator:e("register/mod/mod_operator.js"),
legal_person:e("register/mod/mod_legal_person.js"),
legal_qrcheck:e("register/mod/mod_legal_qrcheck.js"),
bank:e("register/mod/mod_onecentbank.js")
},x={
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
},S=!1,C=null,I=null;
m();
});