define("register/mod/mod_bank.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Tips.js","register/mod/mod_banklist.js","register/data_bank_city.js"],function(e,a,n){
"use strict";
function t(e){
b.checkbox("disabled",!1),b.filter('[value="'+e+'"]').click();
}
function i(){
$("#js_div_register_type").hide();
}
function r(){
var e=q.val();
return"0"===e?!0:!1;
}
function d(){
b=_.find('input[name="register_type_select"]'),m=$("#js_div_register_type_0"),p=$("#js_div_register_type_1"),
f=$("#js_div_register_type_0_tips"),v=$("#js_div_register_type_1_tips"),k=$("#js_div_bank_name"),
g=$("#js_div_bank_province"),h=$("#js_div_bank_city"),y=$("#js_btn_bank_guide"),
j=$("#js_btn_show_bank"),w=_.find('input[name="name"]'),q=_.find('input[name="register_type"]'),
x=_.find('input[name="bank_acct_name"]'),D=_.find('input[name="bank_acct_num"]'),
T=_.find('input[name="bank_acct_num_confirm"]'),C=_.find('input[name="bank_name"]'),
z=_.find('input[name="bank_province"]'),A=_.find('input[name="bank_city"]'),B.init({
onGettingBank:function(e){
k.html(e),C.val(e),C.valid(),j.html("重新选择");
}
});
}
function s(){
var e,a,n=l.getData().bank_acct_info,t=!1;
n.verify_status&&0!=n.verify_status&&(t=!0),b.checkbox({
type:"radio",
onChanged:function(e){
var a=e.val();
w.rules("remove","bank_acct_name rangelength ent_name"),0==a?(m.show(),p.hide(),
f.show(),v.hide(),q.val("0"),w.rules("add",{
bank_acct_name:!0,
ent_name:!0
})):(m.hide(),p.show(),f.hide(),v.show(),q.val("1"),w.rules("add",{
rangelength:[w.data("minlen"),w.data("maxlen")]
})),""!=w.val()&&w.valid();
}
}),T.bind("copy paste",function(e){
e.preventDefault();
}),D.on("blur",function(){
T.valid();
}),j.on("click",function(e){
return e.preventDefault(),1==t?!1:void B.show();
}),setTimeout(function(){
e=new M({
container:g,
label:n.bank_province?n.bank_province:"省份",
data:Z.province,
disabled:t,
callback:function(e){
A.val(""),z.val(e),z.valid(),a&&a.destroy(),a=new M({
container:h,
label:"城市",
data:Z.city[e],
callback:function(e){
A.val(e),A.valid();
},
search:!1
});
},
search:!1
}),n.bank_province&&(a=new M({
container:h,
label:n.bank_city?n.bank_city:"城市",
data:Z.city[n.bank_province],
callback:function(e){
A.val(e),A.valid();
},
search:!1
}));
},100),1==t&&(j.addClass("btn_disabled"),D.attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),
T.attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),C.attr("disabled","disabled"),
z.attr("disabled","disabled"),A.attr("disabled","disabled")),y.click(function(){
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
});
}
function c(){
x.on("paste",function(e){
e.preventDefault();
});
}
function o(){
$.validator.addMethod("bank_acct_name",function(e){
return 1==/^[\u4e00-\u9fffa-zA-Z0-9\(\)\-\:\,\._《》（）]+$/.test(e)?!0:!1;
},"名称只能为中文、英文、数字、括号、书名号、半角冒号、点号、横线"),$.validator.addMethod("ent_name",function(e){
for(var a=0,n=0;n<e.length;n++)a+=e.charCodeAt(n)>=0&&e.charCodeAt(n)<=255?1:3;
return a>=12&&90>=a?!0:!1;
},"企业名称为4到30个中文字"),q.rules("add",{
required:!0,
messages:{
required:"请选择主体验证方式"
}
}),x.rules("add",{
required:r,
equalTo:{
param:w,
depends:function(){
return r();
}
},
messages:{
required:"请输入户名",
equalTo:"对公账户户名与申请主体不一致，请核实"
}
}),D.rules("add",{
required:r,
number:r,
rangelength:{
param:[2,35],
depends:function(){
return r();
}
},
messages:{
required:"请输入对公账户",
number:"对公账户应为数字",
rangelength:$.validator.format("对公账户为{0}到{1}个数字")
}
}),T.rules("add",{
required:r,
equalTo:{
param:D,
depends:function(){
return r();
}
},
messages:{
required:"请再次输入对公账户",
equalTo:"两次对公账户号码不一致"
}
}),C.rules("add",{
required:r,
messages:{
required:"请选择开户银行"
}
}),z.rules("add",{
required:r,
messages:{
required:"请选择开户地点"
}
}),A.rules("add",{
required:r,
messages:{
required:"请选择开户地点"
}
}),(2==l.getData().contractor_type||3==l.getData().contractor_type||1==l.getData().is_overseas)&&(b.filter('[value="1"]').click(),
b.checkbox("disabled",!0));
}
function u(e){
l=e.model,_=$(e.form),S=$.extend(!1,S,e),G=!0,4!=l.getData().service_type&&0!=l.getData().contractor_type&&(d(),
s(),c(),o());
}
var l,_,b,m,p,f,v,k,g,h,y,j,w,q,x,D,T,C,z,A,M=(template.render,e("common/wx/Cgi.js"),
e("biz_web/ui/checkbox.js"),e("biz_web/ui/dropdown.js")),B=(e("common/wx/Tips.js"),
e("register/mod/mod_banklist.js")),G=!1,S={},Z=e("register/data_bank_city.js");
n.exports={
init:u,
selectType:t,
hideSelectType:i
};
});