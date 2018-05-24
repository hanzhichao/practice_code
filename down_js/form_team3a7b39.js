define("register/mod/form_team.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","register/mod/mod_form_step4.js","register/mod/mod_file_upload.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js"],function(o,e,r){
"use strict";
function t(){
p=$(f("tpl_step4_team",a.getData())),c=p.find('input[name="name"]');
}
function m(){
$("#js_div_step4_form").html(p);
}
function i(){
c.on("keyup, blur",function(){
l.qrcheck.setContractorName(c.val(),c.valid());
});
}
function s(){
c.rules("add",{
required:!0,
rangelength:[2,30],
messages:{
required:"请填写团队名称",
rangelength:$.validator.format("团队名称为{0}到{1}个字符")
}
});
}
function n(){
for(var o in l)l[o].init({
model:a,
mods:l,
form:p
});
l.fileUpload.initUpload();
}
function d(o){
a=o.model,_=$.extend(!1,_,o),u=!0,t(),m(),n(),i(),s();
}
var a,p,c,f=template.render,l=(o("common/wx/Cgi.js"),o("common/wx/Tips.js"),o("common/wx/popup.js"),
{
formStep4:o("register/mod/mod_form_step4.js"),
fileUpload:o("register/mod/mod_file_upload.js"),
qrcheck:o("register/mod/mod_qrcheck.js"),
operator:o("register/mod/mod_operator.js")
}),u=!1,_={};
r.exports={
init:d
};
});