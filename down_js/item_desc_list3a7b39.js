define("scan/item_desc_list.js",["common/wx/Tips.js","common/wx/inputCounter.js","biz_common/jquery.validate.js"],function(e,t,n){
"use strict";
function i(e){
return e?(e=e.replace(/<p>\&nbsp\;<\/p>/gi,"<p></p>"),e=e.replace(/<p>/gi,"").replace(/<\/p>/gi,"<br>"),
e=e.replace(/<div><br><\/div>/gi,"<div></div>"),e=e.replace(/<div>/gi,"<br>").replace(/<\/div>/gi,""),
e=e.replace(/<br\/>/gi,"<br>"),e=e.replace(/<br>/gi,"{{br}}"),e=$("<div>").html(e).text(),
e=$("<div>").html(e).text(),e=e.replace(/\{\{br\}\}/gi,"<br>")):"";
}
function r(e,t){
e=e||"",t=t||"";
var n=$(h("tpl_desc_item",{
name:e,
value:t
}));
new g(n.find(".js_input_desc_name"),{
maxLength:6,
showCounter:!0
}),new g(n.find(".js_input_desc_value"),{
maxLength:80,
showCounter:!0
}),v.append(n),f.find(".js_btn_delete").each(function(e){
1>e?$(this).hide():$(this).show();
});
}
function s(){
var e=h("tpl_desc_item_fake",{
name:"商品名称",
value:x.getData().base_info.title
});
v.append(e);
}
function d(){
var e=[];
v.find(".js_desc_item").each(function(){
var t=$(this).find(".js_input_desc_name").val()||"",n=$(this).find(".js_input_desc_value").html()||"";
n=i(n),e.push({
title:t,
desc:n
});
}),x.setData(function(t){
t.detail_info.desc_list=e;
});
}
function _(){
f=$("#js_form_desc_list"),v=$("#js_div_desc_list"),m=$('<form><input name="product_desc_exist"><input name="product_desc_empty"><input name="product_desc_valid"></form>');
}
function c(){
s();
var e=x.getData().detail_info.desc_list;
if(e&&e.length>0)for(var t=0;t<e.length;t++)r(e[t].title,e[t].desc);else r("","");
}
function a(){
f.on("click",".js_btn_add",function(e){
e.preventDefault(),r("",""),d();
}),f.on("click",".js_btn_delete",function(e){
e.preventDefault();
var t=$(this).parents(".js_desc_item");
t.find(".js_need_remove").remove(),t.remove(),d();
}),f.on("blur",".js_input_desc_value",function(){
$(this).html(i($(this).html())),d();
}),f.on("keyup change","input",d);
}
function u(){
function e(e,t,n){
var i=$(e).parents(".js_input_outer").find(".js_frm_msg");
1==t?i.html(n).show():i.hide();
}
function t(t){
{
var n=$(t).val(),i=6,r="";
$(t).parent().parent().find(".js_frm_msg");
}
return n.length>i&&(r="规格参数不能超过%s个字".sprintf(i)),r?e(t,!0,r):e(t,!1),r?!1:!0;
}
function n(t){
{
var n=$.trim($(t).val()),i="";
$(t).parent().parent().find(".js_frm_msg");
}
return n||(i="请填写规格参数"),i?e(t,!0,i):e(t,!1),i?!1:!0;
}
function i(t){
{
var n=$(t).text(),i=80,r="";
$(t).parents(".grid_item").find(".js_frm_msg");
}
return n.length>i&&(r="具体描述不能超过%s个字".sprintf(i)),r?e(t,!0,r):e(t,!1),r?!1:!0;
}
function r(t){
{
var n=$(t).text(),i="";
$(t).parents(".grid_item").find(".js_frm_msg");
}
return n||(i="请填写具体描述"),i?e(t,!0,i):e(t,!1),i?!1:!0;
}
$.validator.addMethod("product_desc_exist",function(){
var e=0;
return f.find(".js_desc_item").each(function(){
var t=$(this).find(".js_input_desc_name").val(),n=$(this).find(".js_input_desc_value").text();
""!=t&&""!=n&&e++;
}),e>=1;
}),$.validator.addMethod("product_desc_empty",function(){
var e=f.find(".js_desc_item"),t=!0;
if(0==e.length)return!1;
for(var i=0;i<e.length;i++){
var s=e.eq(i).find(".js_input_desc_name"),d=e.eq(i).find(".js_input_desc_value");
t&=n(s),t&=r(d);
}
return t;
}),$.validator.addMethod("product_desc_valid",function(){
var e=f.find(".js_desc_item"),s=!0;
if(0==e.length)return!1;
for(var d=0;d<e.length;d++){
var _=e.eq(d).find(".js_input_desc_name"),c=e.eq(d).find(".js_input_desc_value");
s&=n(_)&&t(_),s&=r(c)&&i(c);
}
return s;
}),f.on("input",".js_input_desc_name",function(){
var e=n(this)&&t(this);
e&&d();
}).on("input",".js_input_desc_value",function(){
var e=r(this)&&i(this);
e&&d();
}),m.validate({
ignore:".js_input_ignore",
rules:{
product_desc_exist:{
product_desc_exist:!0
},
product_desc_valid:{
product_desc_empty:!0,
product_desc_valid:!0
}
},
messages:{
product_desc_exist:{
product_desc_exist:"商品属性不能少于1项"
},
product_detail_valid:{
product_desc_empty:"请完善商品属性",
product_desc_valid:"商品属性填写有误"
}
},
errorPlacement:function(e){
j.err(e.html());
}
});
}
function o(){}
function p(e){
var t=m.valid();
return"function"==typeof e&&e.call(void 0,t),t;
}
function l(e){
return e&&e.model&&(x=e.model),b?!1:(b=!0,_(),c(),a(),void u());
}
var f,m,v,h=template.render,j=e("common/wx/Tips.js"),g=e("common/wx/inputCounter.js"),x=(e("biz_common/jquery.validate.js"),
null),b=!1;
n.exports={
init:l,
check:p,
triggerEditMode:o
};
});