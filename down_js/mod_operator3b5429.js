define("register/mod/mod_operator.js",["common/wx/Cgi.js","common/wx/region.js","common/wx/overseasList.js","common/wx/Tips.js"],function(e,a,t){
"use strict";
function r(){
var e=(new Date).getTime(),a=Math.floor((e-q)/1e3);
g&&clearTimeout(g),a>=60?(_.prop("readonly",!1),T=!0,h.html("发送验证码").enable()):(_.prop("readonly",!0),
T=!1,h.disable().html("%s秒后可重发".sprintf(60-a)),g=setTimeout(r,1e3));
}
function n(){
return v.val();
}
function i(){
return f.val();
}
function s(e){
for(var a in e){
var t=p.find('input[name="'+a+'"]').parents(".js_field");
"remove"==e[a]?t.remove():"hide"==e[a]&&t.hide();
}
}
function o(){
v=p.find('input[name="operator_name"]'),f=p.find('input[name="operator_idcard"]'),
_=p.find('input[name="operator_mobile"]'),b=p.find('input[name="verify_code"]'),
h=p.find("#js_btn_send_mobile"),0==u.getData().contractor_type&&(v=p.find('input[name="name"]'),
f=p.find('input[name="credential"]'));
}
function d(){
1==u.getData().is_overseas&&new k({
container:"#js_div_location",
data:{
country:"中国大陆"
},
retain:{
country:O,
province:[-1],
city:[-1]
},
is_overseas:!0,
onChange:function(e,a){
$("#js_input_"+e).val(a);
}
});
}
function l(){
u.getData().is_overseas||v.on("keyup, blur",function(){
var e=$("input[name=register_type_select]:checked").val();
(3!=e||2!=u.getData().operator_type)&&x.mods.qrcheck.setOperatorName(v.val(),v.valid());
}),""!=v.val()&&v.blur(),u.getData().is_overseas||f.on("keyup, blur",function(){
var e=$("input[name=register_type_select]:checked").val();
(3!=e||2!=u.getData().operator_type)&&x.mods.qrcheck.setOperatorIdcard($.trim(f.val()),f.valid());
}),""!=f.val()&&f.blur(),_.on("keyup, blur",function(){
_.valid()?h.enable():h.disable();
}),""!=_.val()&&h.enable(),h.on("click",function(){
if(h.hasClass("btn_disabled"))return!1;
if(!_.valid())return h.disable(),!1;
var e="";
1==u.getData().is_overseas?e=C[$("#js_input_country").val()]+$.trim(_.val()):u.getData().is_overseas||(e="+86"+$.trim(_.val())),
q=(new Date).getTime(),r();
var a=$("input[name=register_type_select]:checked").val(),t=3==a?50:5,n={};
"register"==u.getData().current_page?n={
url:u.getData().upgrade?"/cgi-bin/formbyskey":"/acct/formbyticket",
data:{
form:"mobile",
action:"set",
f:"json",
mobile:e,
register_method:a
},
mask:!1
}:"findacct"==u.getData().current_page&&(n={
url:"/acct/findacct",
data:{
action:"send_verifycode",
f:"json",
mobile:e,
appid:u.getData().appid
},
mask:!1
}),y.post(n,function(e){
if(!e||!e.base_resp)return q=0,void y.handleRet(e,{
id:"64430",
key:"4",
msg:"验证码发送失败"
});
var a=+e.base_resp.ret;
if(0==a)D.suc("验证码已经发送");else{
switch(a){
case 200013:
D.err("登录超时，请重新登录");
break;

case 210035:
D.err("该手机已经登记过%s次，请使用别的手机号进行用户信息登记".sprintf(t));
break;

default:
y.handleRet(e,{
id:"64430",
key:"4",
msg:"验证码发送失败"
});
}
q=0;
}
});
});
}
function c(){
v.length>0&&v.rules("add",{
required:!0,
rangelength:[1,20],
messages:{
required:"请填写姓名",
rangelength:$.validator.format("姓名为{0}到{1}个中英文")
}
}),u.getData().is_overseas?1==u.getData().is_overseas&&($.validator.addMethod("overeas_mobile",function(e){
return e=$.trim(e),/^\d+$/.test(e);
},"请输入正确的手机号码"),f.length>0&&f.rules("add",{
required:!0,
messages:{
required:"请输入正确的证件号码"
}
}),_.length>0&&_.rules("add",{
required:!0,
overeas_mobile:!0,
messages:{
required:"请输入正确的手机号码",
overeas_mobile:"请输入正确的手机号码"
}
})):(f.length>0&&f.rules("add",{
idcard:!0,
messages:{
idcard:"身份证格式不正确，或者年龄未满18周岁，请重新填写。"
}
}),_.length>0&&_.rules("add",{
mobile:!0,
messages:{
mobile:"请输入正确的手机号码"
}
}),_.length>0&&_.rules("add",{
mobile:!0,
messages:{
idcard:"请输入正确的手机号码"
}
})),b.length>0&&b.rules("add",{
verifycode:!0,
messages:{
verifycode:"验证码应为6位数字"
}
});
}
function m(e){
u=e.model,p=$(e.form),x=$.extend(!1,x,e),w=!0,o(),d(),l(),c();
}
var u,g,p,v,f,_,b,h,y=(template.render,e("common/wx/Cgi.js")),k=e("common/wx/region.js"),j=e("common/wx/overseasList.js"),D=e("common/wx/Tips.js"),w=!1,x={},q=0,T=!0,C=j.mobilePrefix,O=j.countryCode;
t.exports={
init:m,
setFields:s,
getOperatorName:n,
getOperatorIdcard:i
};
});