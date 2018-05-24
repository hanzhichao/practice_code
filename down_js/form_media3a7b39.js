define("register/mod/form_media.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","register/mod/mod_form_step4.js","register/mod/mod_file_upload.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js","register/mod/mod_bank.js","register/mod/mod_onecentbank.js"],function(e,o,r){
"use strict";
function i(){
_=$(p("tpl_step4_media",a.getData())),l=_.find('input[name="name"]'),c=_.find('input[name="credential"]');
}
function n(){
$("#js_div_step4_form").html(_);
}
function m(){
l.on("keyup, blur",function(){
u.qrcheck.setContractorName(l.val(),l.valid());
}),""!=l.val()&&l.blur();
}
function t(){
l.rules("add",{
required:!0,
messages:{
required:"请填写组织名称",
rangelength:$.validator.format("组织名称为{0}到{1}个字符")
}
}),c.rules("add",{
required:!0,
is_organization_code:!0,
messages:{
required:"请输入组织机构代码",
is_organization_code:"必须为9位或18位代码"
}
});
}
function d(){
1==a.getData().is_remit_reg_gray?u.bank_old=null:u.bank=null;
for(var e in u)u[e]&&u[e].init({
model:a,
mods:u,
form:_
});
u.fileUpload.initUpload();
}
function s(e){
a=e.model,f=$.extend(!1,f,e),g=!0,i(),n(),d(),m(),t();
}
var a,_,l,c,p=template.render,u=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),e("common/wx/popup.js"),
{
formStep4:e("register/mod/mod_form_step4.js"),
fileUpload:e("register/mod/mod_file_upload.js"),
qrcheck:e("register/mod/mod_qrcheck.js"),
operator:e("register/mod/mod_operator.js"),
bank_old:e("register/mod/mod_bank.js"),
bank:e("register/mod/mod_onecentbank.js")
}),g=!1,f={};
r.exports={
init:s
};
});