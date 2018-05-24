define("register/mod/form_person.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","register/mod/mod_form_step4.js","register/mod/mod_file_upload.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js"],function(e,o,r){
"use strict";
function t(){
p=$(f("tpl_step4_person",a.getData())),c=p.find('input[name="name"]'),l=p.find('input[name="credential"]');
}
function m(){
$("#js_div_step4_form").html(p);
}
function n(){
c.on("keyup, blur",function(){
u.qrcheck.setContractorName(c.val(),c.valid());
}),""!=c.val()&&c.blur();
}
function i(){
c.rules("add",{
required:!0,
rangelength:[1,15],
messages:{
required:"请填写姓名",
rangelength:$.validator.format("姓名为{0}到{1}个中英文")
}
});
}
function s(){
for(var e in u)u[e].init({
model:a,
mods:u,
form:p
});
u.fileUpload.initUpload();
}
function d(e){
a=e.model,g=$.extend(!1,g,e),_=!0,t(),m(),s(),n(),i();
}
var a,p,c,l,f=template.render,u=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),e("common/wx/popup.js"),
{
formStep4:e("register/mod/mod_form_step4.js"),
fileUpload:e("register/mod/mod_file_upload.js"),
qrcheck:e("register/mod/mod_qrcheck.js"),
operator:e("register/mod/mod_operator.js")
}),_=!1,g={};
r.exports={
init:d
};
});