define("register/mod/form_gov.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","register/mod/mod_form_step4.js","register/mod/mod_file_upload.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js","register/mod/mod_bank.js","register/mod/mod_onecentbank.js"],function(o,e,r){
"use strict";
function m(){
_=$(l("tpl_step4_gov",a.getData())),c=_.find('input[name="name"]');
}
function t(){
$("#js_div_step4_form").html(_);
}
function n(){
c.on("keyup, blur",function(){
p.qrcheck.setContractorName(c.val(),c.valid());
}),""!=c.val()&&c.blur();
}
function s(){
c.rules("add",{
required:!0,
messages:{
required:"请填写政府名称"
}
});
}
function i(){
1==a.getData().is_remit_reg_gray?p.bank_old=null:p.bank=null;
for(var o in p)p[o]&&p[o].init({
model:a,
mods:p,
form:_
});
p.fileUpload.initUpload();
}
function d(o){
a=o.model,u=$.extend(!1,u,o),g=!0,m(),t(),i(),n(),s();
}
var a,_,c,l=template.render,p=(o("common/wx/Cgi.js"),o("common/wx/Tips.js"),o("common/wx/popup.js"),
{
formStep4:o("register/mod/mod_form_step4.js"),
fileUpload:o("register/mod/mod_file_upload.js"),
qrcheck:o("register/mod/mod_qrcheck.js"),
operator:o("register/mod/mod_operator.js"),
bank_old:o("register/mod/mod_bank.js"),
bank:o("register/mod/mod_onecentbank.js")
}),g=!1,u={};
r.exports={
init:d
};
});