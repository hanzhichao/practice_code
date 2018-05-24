define("register/mod/form_ent.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/popup.js","register/mod/mod_form_step4.js","register/mod/mod_onecentbank.js","register/mod/mod_bank.js","register/mod/mod_file_upload.js","register/mod/mod_legal_person.js","register/mod/mod_legal_qrcheck.js","register/mod/mod_qrcheck.js","register/mod/mod_operator.js"],function(e,r,o){
"use strict";
function i(){
l=$(p("tpl_step4_ent",m.getData())),_=l.find('input[name="name"]'),c=l.find('input[name="credential"]'),
g=l.find('input[name="registername"]'),u=l.find('input[name="is_individual"]');
}
function s(){
$("#js_div_step4_form").html(l);
}
function t(){
0==m.getData().is_overseas&&_.on("keyup, blur",function(){
f.qrcheck.setContractorName(_.val(),_.valid());
}),""!=_.val()&&_.blur(),4!=m.getData().service_type&&(u.checkbox({
type:"radio",
onChanged:function(e){
var r=1*e.val(),o=$("#js_txt_ent_type");
m.setData(function(e){
e.is_individual=r;
}),u.valid(),_.val()&&_.blur(),o.html(1==r?"个体工商户最多只能注册5个帐号":"企业包括：企业、分支机构、企业相关品牌等");
}
}),void 0!==m.getData().is_individual&&u.filter('[value="'+m.getData().is_individual+'"]').click());
}
function a(){
_.rules("add",{
required:!0,
messages:{
required:"请填写企业名称",
rangelength:$.validator.format("企业名称为{0}到{1}个字符")
}
}),0==m.getData().is_overseas?c.rules("add",{
required:!0,
is_ent_code:!0,
messages:{
required:"请输入正确的营业执照注册号",
is_ent_code:$.validator.format("请输入正确的营业执照注册号或统一社会信用代码")
}
}):1==m.getData().is_overseas&&c.rules("add",{
required:!0,
messages:{
required:"请输入正确的营业执照注册号"
}
}),4!=m.getData().service_type&&u.rules("add",{
required:!0,
messages:{
required:"请选择企业类型"
}
});
}
function d(){
1==m.getData().is_overseas&&(f.qrcheck=null,f.legal_qrcheck=null,f.legal_person=null),
1==m.getData().is_remit_reg_gray?f.bank_old=null:f.bank=null;
for(var e in f)f[e]&&f[e].init({
model:m,
mods:f,
form:l
});
f.fileUpload.initUpload();
}
function n(e){
m=e.model,v=$.extend(!1,v,e),j=!0,i(),s(),d(),t(),a();
}
var m,l,_,c,g,u,p=template.render,f=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js"),{
formStep4:e("register/mod/mod_form_step4.js"),
bank:e("register/mod/mod_onecentbank.js"),
bank_old:e("register/mod/mod_bank.js"),
fileUpload:e("register/mod/mod_file_upload.js"),
legal_person:e("register/mod/mod_legal_person.js"),
legal_qrcheck:e("register/mod/mod_legal_qrcheck.js"),
qrcheck:e("register/mod/mod_qrcheck.js"),
operator:e("register/mod/mod_operator.js")
}),j=!1,v={};
o.exports={
init:n
};
});