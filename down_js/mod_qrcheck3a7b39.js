define("register/mod/mod_qrcheck.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js"],function(e,t,n){
"use strict";
function r(e,t){
C=e,Q=t,s();
}
function c(e,t){
M=e,U=t,s();
}
function i(e,t){
O=e,N=t,s();
}
function o(){
return $('input[name="register_type_select"]:checked').val();
}
function a(){
return q.val();
}
function s(){
u(),Q&&U&&N&&(clearTimeout(b),setTimeout(function(){
k.hide(),g.show();
var e={
container:g,
container_class:"qrcheck_box primary",
cgiURI:"/cgi-bin/mastersafeqrcode",
showImgInfo:!1,
size:120,
typeid:22,
msgData:{
name:C,
name_title:"管理员"
},
data:{
operator_name:C,
operator_id:M
},
extra:{
operator_name:C,
operator_id:M,
subject:O,
refill:"true"==h.getData().refill?1:0,
service_type:h.getData().service_type,
is_legal_person_auth:3==o()?1:0
},
onSuccess:function(e){
q.val(e);
},
onFail:function(e,t){
w.val(t),$(".js_register_limit_count").text(3==o()?50:5);
},
onMsgUpdate:function(e,t,n){
console.log("onMsgUpdate:",e,t,n);
var r={
name:C,
name_title:"管理员"
};
w.val(t);
var c=void 0,i=t;
if(2==t&&(i=t+"_"+n),"0"==t&&4==h.getData().service_type){
var o=$(".js_qrcheck_ret_0").clone().wrap("<div></div>").parent().html();
c=wx.T(o,r);
}else $("#tpl_qrcheck_ret_"+i).length>0&&(c=x("tpl_qrcheck_ret_"+i,r));
return c;
}
},t=$.extend(!0,e,I);
D=j.init(t),$.trim(M)&&$.trim(C)&&D.load();
},500));
}
function u(){
clearTimeout(b),D&&D.destroy(),k.show(),g.html("").hide(),q.val(""),w.val("");
}
function m(e){
I=e||{};
}
function d(){
g=v.find("#js_div_qrcheck"),k=v.find("#js_div_qrcheck_none"),q=v.find('input[name="qrcheck_ticket"]'),
w=v.find('input[name="qrcheck_status"]');
}
function l(){
k.show(),g.hide();
}
function _(){}
function p(){
$.validator.addMethod("qrcheck",function(){
return 3==o()&&2==h.getData().operator_type?!0:"1"==w.val()?!0:!1;
}),w.rules("add",{
qrcheck:!0,
messages:{
qrcheck:"请扫描二维码验证管理员身份"
}
}),q.rules("add",{
required:function(){
return 3!=o()||2!=h.getData().operator_type;
},
messages:{
required:"请完善管理员身份信息"
}
});
}
function f(e){
h=e.model,v=$(e.form),T=$.extend(!1,T,e),y=!0,d(),l(),_(),p();
}
var h,v,g,k,q,w,x=template.render,j=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),
e("common/wx/qrcheck_weapp.js")),y=!1,T={},D=null,I={},b=null,C="",M="",O="",Q=!1,U=!1,N=!1;
n.exports={
init:f,
setQrcheckOpt:m,
getTicket:a,
setOperatorIdcard:c,
setOperatorName:r,
setContractorName:i,
removeQrcheck:u,
initQrcheck:s
};
});