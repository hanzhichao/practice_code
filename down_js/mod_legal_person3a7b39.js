define("register/mod/mod_legal_person.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
function r(){
u=p.find('input[name="legal_person_name"]'),d=p.find('input[name="legal_person_idcard"]'),
m=p.find('input[name="operator_type"]');
}
function o(){
return $('input[name="register_type_select"]:checked').val();
}
function n(){}
function t(){
3==o()&&2==m.filter("input:checked").val()&&($("#js_operator_section .js_operator_use_legal_person").hide(),
$("#operator_name").val(u.val()),$("#operator_idcard").val(d.val()),$("#js_input_qrcheck_status").val($("#js_input_legal_qrcheck_status").val()),
$("#js_input_qrcheck_ticket").val($("#js_input_legal_qrcheck_ticket").val()));
}
function a(){
u.on("keyup, blur",function(){
f.mods.legal_qrcheck.setOperatorName(u.val(),u.valid()),t();
}),d.on("keyup, blur",function(){
f.mods.legal_qrcheck.setOperatorIdcard(d.val(),d.valid()),t();
}),setTimeout(function(){
""!=u.val()&&u.blur(),""!=d.val()&&d.blur();
}),m.checkbox({
onChanged:function(e){
var r=$(e).val();
1==r?($("#js_operator_section .js_operator_use_legal_person").show(),$("#operator_name").val(""),
$("#operator_idcard").val(""),$("#operator_name").blur()):t(),l.getData().operator_type=r,
setTimeout(function(){
f.mods.qrcheck&&(1==r?f.mods.qrcheck.removeQrcheck():f.mods.qrcheck.initQrcheck());
});
}
}),m.filter("input:checked").click();
}
function s(){
u.length>0&&u.rules("add",{
required:{
depends:function(){
return 3==o();
}
},
rangelength:{
depends:function(){
return 3==o();
},
param:[1,20]
},
messages:{
required:"请填写法定代表人姓名",
rangelength:$.validator.format("法定代表人姓名为{0}到{1}个中英文")
}
}),d.length>0&&d.rules("add",{
idcard:{
depends:function(){
return 3==o();
}
},
messages:{
idcard:"法定代表人身份证格式不正确，或者年龄未满18周岁，请重新填写。"
}
});
}
function i(e){
1!=h&&(l=e.model,p=$(e.form),f=$.extend(!1,f,e),h=!0,r(),n(),a(),s());
}
function c(){
$("#js_legal_person_info").show(),$("#js_operator_type_container").show();
var e=m.filter("input:checked").val();
1==e?$("#js_operator_section .js_operator_use_legal_person").show():$("#js_operator_section .js_operator_use_legal_person").hide();
}
function _(){
$("#js_legal_person_info").hide(),$("#js_operator_type_container").hide();
var e=m.filter("input:checked").val();
2==e&&$("#js_operator_section .js_operator_use_legal_person").show();
}
var l,p,u,d,m,h=(template.render,e("common/wx/Cgi.js"),e("common/wx/Tips.js"),!1),f={};
return{
init:i,
show:c,
hide:_,
setLegalInfo:t
};
});