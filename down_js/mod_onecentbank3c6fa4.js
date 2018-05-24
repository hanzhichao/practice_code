define("register/mod/mod_onecentbank.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Tips.js","register/data_bank_city.js"],function(e,n,a){
"use strict";
function t(e){
v.checkbox("disabled",!1),v.filter('[value="'+e+'"]').click();
}
function i(e){
var n=$("#js_div_register_type .frm_controls");
switch(e){
case 1:
t(1),n.removeClass("type_onecent_only").addClass("type_wx_verify_only"),n.find(".js_div_register_type_select_1").show(),
n.find(".js_div_register_type_select_2").hide(),n.find(".js_div_register_type_select_3").hide(),
v.checkbox("disabled",!0);
break;

case 2:
t(2),n.removeClass("type_wx_verify_only").addClass("type_onecent_only"),n.find(".js_div_register_type_select_1").hide(),
n.find(".js_div_register_type_select_3").hide(),n.find(".js_div_register_type_select_2").show(),
v.checkbox("disabled",!0);
break;

default:
n.removeClass("type_wx_verify_only").removeClass("type_onecent_only"),n.find(".js_div_register_type_select").show(),
v.checkbox("disabled",!1);
}
}
function s(e){
var n=$("#js_div_register_type .frm_controls");
n.find(".js_div_register_type_select_1").hide(),n.find(".js_div_register_type_select_2").hide(),
n.find(".js_div_register_type_select_3").hide();
for(var a=0;a<e.length;a++)n.find(".js_div_register_type_select_"+e[a]).show();
t(e[0]),0==e.length?v.checkbox("disabled",!0):v.checkbox("disabled",!1);
}
function r(){
$(".js_div_register_type_none").show(),$(".js_div_register_type_select").hide(),
B.mods&&B.mods.legal_person&&B.mods.legal_person.hide();
}
function d(){
$(".js_div_register_type_none").hide(),$(".js_div_register_type_select").show(),
B.mods&&(3==F?B.mods.legal_person&&B.mods.legal_person.show():B.mods.legal_person&&B.mods.legal_person.hide());
}
function _(){
var e=C.val();
return"2"==e?!0:!1;
}
function o(){
v=b.find('input[name="register_type_select"]'),g=$("#js_div_register_type_2"),f=$("#js_div_register_type_1"),
h=$("#js_div_register_type_1_tips"),y=$("#js_div_register_type_3_tips"),k=$("#js_div_bank_province"),
j=$("#js_div_bank_city"),w=$("#js_div_bank_name"),x=$("#js_btn_bank_guide"),q=b.find('input[name="name"]'),
C=b.find('input[name="register_type"]'),T=b.find('input[name="bank_acct_name"]'),
D=b.find('input[name="bank_acct_num"]'),z=b.find('input[name="bank_acct_num_confirm"]'),
A=b.find('input[name="bank_province"]'),M=b.find('input[name="bank_city"]'),S=b.find('input[name="bank_name"]'),
G=!1;
}
function l(){
var e,n,a=m.getData().bank_acct_info,t=!1;
a.verify_status&&0!=a.verify_status&&(t=!0),v.checkbox({
type:"radio",
onChanged:function(e){
var n=e.val();
$("#js_legal_person_info").hide(),$(".js_legal_person_tips").show(),q.rules("remove","bank_acct_name rangelength ent_name"),
$(".js_register_limit_count").val(5),1==n?(g.hide(),f.show(),y.hide(),h.show(),C.val("1"),
3!=m.getData().contractor_type&&q.rules("add",{
rangelength:[q.data("minlen"),q.data("maxlen")]
})):2==n?(g.show(),f.hide(),y.hide(),h.hide(),C.val("2"),q.rules("add",{
bank_acct_name:!0,
ent_name:!0
})):($("#js_legal_person_info").show(),h.hide(),g.hide(),y.show(),C.val("3"),q.rules("add",{
rangelength:[q.data("minlen"),q.data("maxlen")]
}),$(".js_legal_person_tips").hide(),$(".js_register_limit_count").val(50)),F=n,
B.mods&&B.mods.legal_person&&(3==F?B.mods.legal_person.show():B.mods.legal_person.hide()),
B.mods&&B.mods.legal_qrcheck&&B.mods.legal_qrcheck.initQrcheck(),""!=q.val()&&q.valid();
}
}),z.bind("copy paste",function(e){
e.preventDefault();
}),D.on("blur",function(){
z.valid();
}),setTimeout(function(){
e=new Q({
container:k,
label:a.bank_province?a.bank_province:"省份",
data:E.province,
disabled:t,
callback:function(e){
M.val(""),A.val(e),A.valid(),n&&n.destroy(),n=new Q({
container:j,
label:"城市",
data:E.city[e],
callback:function(e){
M.val(e),M.valid();
},
search:!1
});
},
search:!1
}),a.bank_province&&(n=new Q({
container:j,
label:a.bank_city?a.bank_city:"城市",
data:E.city[a.bank_province],
callback:function(e){
M.val(e),M.valid();
},
search:!1
}));
},100),1==t&&(D.attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),
z.attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),A.attr("disabled","disabled"),
M.attr("disabled","disabled")),x.click(function(){
$("#tpl_bank_guide").popup({
title:"对公账号信息填写指引",
buttons:[{
text:"我知道了",
type:"primary",
click:function(){
this.remove();
}
}],
width:900
});
}),new Q({
container:w,
label:a.bank_province?a.bank_name?a.bank_name:"其他银行":"请选择开户银行",
data:[{
name:"中国工商银行",
value:"中国工商银行"
},{
name:"其他银行",
value:""
}],
callback:function(e){
G=!0,S.val(e),S.valid();
}
}),a.bank_province&&(G=!0);
}
function c(){
T.on("paste",function(e){
e.preventDefault();
}),setTimeout(function(){
3==F&&t(F);
},20);
}
function u(){
$.validator.addMethod("bank_acct_name",function(e){
return 1==/^[\u4e00-\u9fffa-zA-Z0-9\(\)\-\:\,\._·《》（）]+$/.test(e)?!0:!1;
},"名称只能为中文、英文、数字、括号、书名号、半角冒号、点号、横线"),$.validator.addMethod("ent_name",function(e){
for(var n=0,a=0;a<e.length;a++)n+=e.charCodeAt(a)>=0&&e.charCodeAt(a)<=255?1:3;
return n>=12&&90>=n?!0:!1;
},"企业名称为4到30个中文字"),$.validator.addMethod("bank_name",function(e){
return _()?G?!0:e.length>0?!0:!1:!0;
}),C.rules("add",{
required:!0,
messages:{
required:"请选择主体验证方式"
}
}),T.rules("add",{
required:_,
equalTo:{
param:q,
depends:function(){
return _();
}
},
messages:{
required:"请输入户名",
equalTo:"对公账户户名与申请主体不一致，请核实"
}
}),D.rules("add",{
required:_,
number:_,
rangelength:{
param:[2,35],
depends:function(){
return _();
}
},
messages:{
required:"请输入对公账户",
number:"对公账户应为数字",
rangelength:$.validator.format("对公账户为{0}到{1}个数字")
}
}),z.rules("add",{
required:_,
equalTo:{
param:D,
depends:function(){
return _();
}
},
messages:{
required:"请再次输入对公账户",
equalTo:"两次对公账户号码不一致"
}
}),A.rules("add",{
required:_,
messages:{
required:"请选择开户地点"
}
}),M.rules("add",{
required:_,
messages:{
required:"请选择开户地点"
}
}),S.rules("add",{
bank_name:!0,
messages:{
bank_name:"请选择开户银行"
}
}),(2==m.getData().contractor_type||3==m.getData().contractor_type||1==m.getData().is_overseas)&&(v.filter('[value="1"]').click(),
v.checkbox("disabled",!0)),v.checkbox("disabled",!0);
}
function p(e){
m=e.model,b=$(e.form),B=$.extend(!1,B,e),Z=!0,4!=m.getData().service_type&&0!=m.getData().contractor_type&&(o(),
l(),c(),u());
}
var m,b,v,g,f,h,y,k,j,w,x,q,C,T,D,z,A,M,S,Q=(template.render,e("common/wx/Cgi.js"),
e("biz_web/ui/checkbox.js"),e("biz_web/ui/dropdown.js")),Z=(e("common/wx/Tips.js"),
!1),B={},E=e("register/data_bank_city.js"),F=wx.cgiData.register_type,G=!1;
a.exports={
init:p,
selectType:t,
onlyType:i,
multiType:s,
showSelectType:d,
hideSelectType:r
};
});