define("register/mod/mod_legal_qrcheck.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js"],function(e,t,n){
"use strict";
function a(e,t){
b=e,M=t,i();
}
function r(e,t){
L=e,O=t,i();
}
function c(){
return $('input[name="register_type_select"]:checked').val();
}
function o(){
return k.val();
}
function i(){
l(),M&&O&&3==c()&&(clearTimeout(T),setTimeout(function(){
v.hide(),h.show();
var e={
container:h,
container_class:"qrcheck_box primary",
cgiURI:"findacct"==g.getData().current_page?"/cgi-bin/basesafeqrcode":"/cgi-bin/mastersafeqrcode",
showImgInfo:!1,
size:120,
typeid:"findacct"==g.getData().current_page?36:26,
msgData:{
name:b,
name_title:"法定代表人"
},
data:{
operator_name:b,
operator_id:L
},
extra:{
operator_name:b,
operator_id:L,
subject:$("input[name=name]").val(),
refill:"true"==g.getData().refill?1:0,
service_type:g.getData().service_type,
is_from_legal_person:1
},
onSuccess:function(e){
k.val(e),D.mods.legal_person.setLegalInfo();
},
onFail:function(e,t){
q.val(t),D.mods.legal_person.setLegalInfo();
},
onMsgUpdate:function(e,t,n){
console.log("onMsgUpdate:",e,t,n);
var a={
name:b,
name_title:"法定代表人"
};
q.val(t),D.mods.legal_person.setLegalInfo();
var r=void 0,c=t;
if(2==t&&(c=t+"_"+n),"0"==t&&4==g.getData().service_type){
var o=$(".js_qrcheck_ret_0").clone().wrap("<div></div>").parent().html();
r=wx.T(o,a);
}else $("#tpl_legal_person_qrcheck_ret_"+c).length>0?r=w("tpl_legal_person_qrcheck_ret_"+c,a):$("#tpl_qrcheck_ret_"+c).length>0&&(r=w("tpl_qrcheck_ret_"+c,a));
return r;
}
};
"findacct"==g.getData().current_page&&(e.data.appid=g.getData().appid);
var t=$.extend(!0,e,I);
y=x.init(t),$.trim(L)&&$.trim(b)&&y.load();
},500));
}
function l(){
clearTimeout(T),y&&y.destroy(),v.show(),h.html("").hide(),k.val(""),q.val("");
}
function s(e){
I=e||{};
}
function _(){
h=f.find("#js_div_legal_qrcheck"),v=f.find("#js_div_legal_qrcheck_none"),k=f.find('input[name="legal_person_ticket"]'),
q=f.find('input[name="legal_person_status"]');
}
function d(){
v.show(),h.hide();
}
function p(){}
function u(){
$.validator.addMethod("legal_qrcheck",function(){
return"1"==q.val()?!0:!1;
}),q.rules("add",{
legal_qrcheck:{
depends:function(){
return 3==c();
}
},
messages:{
legal_qrcheck:"请扫描二维码验证法定代表人身份"
}
}),k.rules("add",{
required:{
depends:function(){
return 3==c();
}
},
messages:{
required:"请完善法定代表人身份信息"
}
});
}
function m(e){
g=e.model,f=$(e.form),D=$.extend(!1,D,e),j=!0,_(),d(),p(),u();
}
var g,f,h,v,k,q,w=template.render,x=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),
e("common/wx/qrcheck_weapp.js")),j=!1,D={},y=null,I={},T=null,b="",L="",M=!1,O=!1;
n.exports={
init:m,
setQrcheckOpt:s,
getTicket:o,
setOperatorIdcard:r,
setOperatorName:a,
initQrcheck:i
};
});