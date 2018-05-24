define("scan/item_detail.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/inputCounter.js","biz_web/utils/upload.js","biz_common/jquery.validate.js"],function(e,t,i){
"use strict";
function n(e,t,i,n,r,_){
var d=q.uploadCdnFileWithCheck({
w:n,
h:r,
size:1024*_
});
d({
container:"#"+e,
multi:!1,
type:2,
onComplete:function(d,o,s,u){
var c=u.content||"";
switch(+u.base_resp.ret){
case 0:
a(c,e,t,i),l(),k.suc("上传成功"),h.find('[name="product_image_exist"]').valid();
break;

case 200034:
k.err("尺寸必须为%s*%s像素，大小不能超过%sK。".sprintf(n,r,_));
break;

case 1:
k.err("图片太大");
break;

case 200011:
k.err("请上传合法的图片格式");
break;

default:
k.err("上传失败");
}
}
});
}
function a(e,t,i,n){
var a=$("#"+t),r=a.parents(".multi_uploader_wrp"),_=r.find(".uploader_box"),d=r.find(".js_preview_box"),l=x(n,{
url:e
});
_.before(l),d.find(".js_preview_item").length>=i?_.hide():_.show();
}
function r(e){
return e?(e=e.replace(/<p>\&nbsp\;<\/p>/gi,"<p></p>"),e=e.replace(/<p>/gi,"").replace(/<\/p>/gi,"<br>"),
e=e.replace(/<div><br><\/div>/gi,"<div></div>"),e=e.replace(/<div>/gi,"<br>").replace(/<\/div>/gi,""),
e=e.replace(/<br\/>/gi,"<br>"),e=e.replace(/<br>/gi,"{{br}}"),e=$("<div>").html(e).text(),
e=$("<div>").html(e).text(),e=e.replace(/\{\{br\}\}/gi,"<br>")):"";
}
function _(e,t){
e=e||"",t=t||"";
var i=$(x("tpl_detail_item",{
name:e,
value:t
}));
new y(i.find(".js_input_detail_name"),{
maxLength:6,
showCounter:!0
}),g.append(i),g.find(".js_btn_delete").each(function(e){
4>e?$(this).hide():$(this).show();
});
}
function d(){
var e=$("#js_div_loading_detail_list"),t=C.base_info.category_id_list||[],i=t.length>0&&t[t.length-1]||"";
e.show(),j.hide(),b.hide(),g.html(""),w.get({
url:"/merchant/scanproductattr",
data:{
cate_id:i
},
mask:!1
},function(t){
if(t.base_resp&&0==t.base_resp.ret&&t.product_attr){
for(var i=0;i<t.product_attr.length;i++)_(t.product_attr[i].name,"");
g.show(),b.hide(),j.show(),e.hide(),l();
}else b.show(),e.hide();
});
}
function l(){
var e=p();
D&&D.gData&&(D.gData=e),D&&D.refresh&&D.refresh(D);
}
function o(){
h=$('<form><input name="product_image_exist"><input name="product_detail_exist"><input name="product_detail_empty"><input name="product_detail_valid"></form>'),
v=$("#js_form_detail"),g=$("#js_div_detail_list"),j=$("#js_div_add_detail_item"),
b=$("#js_btn_loading_detail_list");
var e={};
C=D&&D.getData()||e,z=window.gProduct_default_desc_list||[];
}
function s(){
if(C.detail_info&&C.detail_info.banner_list.length>0)for(var e=C.detail_info.banner_list,t=0;t<e.length;t++)""!=e[t].link&&a(e[t].link,"js_btn_upload_banner",6,"tpl_product_banner_image");
if(C.detail_info&&C.detail_info.desc_list&&C.detail_info.desc_list.length>0)for(var e=C.detail_info.desc_list,t=0;t<e.length;t++)_(e[t].title,e[t].desc);else if(z&&z.length>0)for(var t=0;t<z.length;t++)_(z[t].name,"");else _("",""),
_("",""),_("",""),_("","");
var i=0;
if(C.detail_info&&C.detail_info.detail_info&&(i=C.detail_info.desc_list.length),
i>0)for(var t=0;i>t;t++){
var n=$(".js_input_detail_value").eq(t).html().replace(/&lt;br\/&gt;/gi,"<br>");
$(".js_input_detail_value").eq(t).html(n);
}
C&&l();
}
function u(){
n("js_btn_upload_banner",6,"tpl_product_banner_image",0,0,0),$(".js_preview_box").on("click",".js_btn_delete",function(){
var e=$(this).parents(".js_preview_item"),t=e.parents(".uploader_preview").find(".uploader_box");
e.remove(),t.show(),t.find(".upload_file_box").hide(),l(),h.find('[name="product_image_exist"]').valid();
}),b.on("click",function(){
d();
}),j.on("click",".js_btn_add",function(){
_("","");
}),g.on("click",".js_btn_delete",function(){
var e=$(this).parents(".js_detail_item");
e.find(".js_need_remove").remove(),e.remove(),l();
}),v.on("blur",".js_input_detail_value",function(){
$(this).html(r($(this).html())),l();
}),v.on("keyup change","input",l);
}
function c(){
function e(e,t,i){
var n=$(e).parents(".js_input_outer").find(".js_frm_msg");
1==t?n.html(i).show():n.hide();
}
function t(t){
{
var i=$(t).val(),n=6,a="";
$(t).parent().parent().find(".js_frm_msg");
}
return i.length>n&&(a="属性名称不能超过%s个字".sprintf(n)),a?e(t,!0,a):e(t,!1),a?!1:!0;
}
function i(t){
{
var i=$.trim($(t).val()),n="";
$(t).parent().parent().find(".js_frm_msg");
}
return i||(n="请填写属性名称"),n?e(t,!0,n):e(t,!1),n?!1:!0;
}
function n(t){
{
var i=$(t).text(),n=200,a="";
$(t).parents(".grid_item").find(".js_frm_msg");
}
return i.length>n&&(a="属性描述不能超过%s个字".sprintf(n)),a?e(t,!0,a):e(t,!1),a?!1:!0;
}
function a(t){
{
var i=$(t).text(),n="";
$(t).parents(".grid_item").find(".js_frm_msg");
}
return i||(n="请填写属性描述"),n?e(t,!0,n):e(t,!1),n?!1:!0;
}
$.validator.addMethod("product_image_exist",function(){
return 0==v.find(".js_preview_item").length?(e("#js_err_preview_img",!0,"请上传商品主图"),
!1):(e("#js_err_preview_img",!1,""),!0);
}),$.validator.addMethod("product_detail_exist",function(){
return v.find(".js_detail_item").length<4?!1:!0;
}),$.validator.addMethod("product_detail_empty",function(){
var e=v.find(".js_detail_item"),t=!0;
if(0==e.length)return!1;
for(var n=0;n<e.length;n++){
var r=e.eq(n).find(".js_input_detail_name"),_=e.eq(n).find(".js_input_detail_value");
t&=i(r),t&=a(_);
}
return t;
}),$.validator.addMethod("product_detail_valid",function(){
var e=v.find(".js_detail_item"),r=!0;
if(0==e.length)return!1;
for(var _=0;_<e.length;_++){
var d=e.eq(_).find(".js_input_detail_name"),l=e.eq(_).find(".js_input_detail_value");
r&=i(d)&&t(d),r&=a(l)&&n(l);
}
return r;
}),v.on("input",".js_input_detail_name",function(){
var e=i(this)&&t(this);
e&&l();
}).on("input",".js_input_detail_value",function(){
var e=a(this)&&n(this);
e&&l();
}),h.validate({
ignore:".js_input_ignore",
rules:{
product_detail_exist:{
product_detail_exist:!0
},
product_detail_valid:{
product_detail_empty:!0,
product_detail_valid:!0
},
product_image_exist:{
product_image_exist:!0
}
},
messages:{
product_detail_exist:{
product_detail_exist:"商品属性不能少于4项"
},
product_detail_valid:{
product_detail_empty:"请完善商品属性",
product_detail_valid:"商品属性填写有误"
},
product_image_exist:{
product_image_exist:"请上传商品主图"
}
},
errorPlacement:function(e){
k.err(e.html());
}
});
}
function p(){
return C=C||{},C.detail_info=C.detail_info||{},C.detail_info.banner_list=[],C.detail_info.desc_list=[],
$(".js_preview_box").find(".js_preview_item").each(function(){
C.detail_info.banner_list.push({
link:$(this).find('input[name="banner_image[]"]').val()||""
});
}),g.find(".js_detail_item").each(function(){
var e=this,t=r($(e).find(".js_input_detail_value").html());
C.detail_info.desc_list.push({
title:$(e).find(".js_input_detail_name").val()||"",
desc:t
});
}),C;
}
function f(e){
var t=h.valid(),i=!0;
return"function"==typeof e&&e.call(void 0,t&&i),t&&i;
}
function m(e){
return e?(D=e,M?!1:(M=!0,o(),s(),u(),void c())):!1;
}
var v,h,g,j,b,w=e("common/wx/Cgi.js"),x=template.render,k=e("common/wx/Tips.js"),y=e("common/wx/inputCounter.js"),q=e("biz_web/utils/upload.js"),C=(e("biz_common/jquery.validate.js"),
{}),z=[],D=null,M=!1;
i.exports={
init:m,
setMobilePreview:function(e){
m(e);
},
check:f,
getData:p,
setData:function(e){
C=e;
}
};
});