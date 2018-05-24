define("scan/item_basic.js",["common/wx/inputCounter.js","common/wx/Tips.js","biz_web/utils/upload.js","biz_common/jquery.validate.js"],function(e,i,n){
"use strict";
function t(e,i){
return new m(f.find(e),{
maxLength:i,
showCounter:!0
});
}
function r(e,i){
var n=b.uploadCdnFileWithCheck(i);
n({
container:"#"+e,
multi:!1,
type:2,
onComplete:function(i,n,t,r){
var o=r.content||"";
switch(+r.base_resp.ret){
case 0:
a(e,o,t.name),u(),p.suc("上传成功");
break;

case 200034:
p.err("图片尺寸错误");
break;

case 1:
p.err("图片太大");
break;

case 200011:
p.err("请上传合法的图片格式");
break;

default:
p.err("上传失败");
}
}
});
}
function a(e,i,n){
var t=$("#"+e),r=t.parents(".upload_box"),a=r.find(".js_uploaded_msg"),u=r.find(".upload_msg.warn"),o=r.find(".upload_preview"),_=r.find("input.js_input_file");
o.find("img").prop("src",i),o.show(),a.show().html(n?'已上传：{name} <a href="{url}" target="_blank">查看</a>'.format({
name:n,
url:i
}):'已上传 <a href="{url}" target="_blank">查看</a>'.format({
url:i
})),u.hide(),t.html("重新上传"),_.val(i);
}
function u(){
d();
h&&h.refresh&&h.refresh();
}
function o(){
f=$("#js_form_basic");
var e={};
v=h&&h.getData()||e,w=window.gProduct_default_title||"",g=window.gProduct_default_thumb_url||"";
}
function _(){
w&&f.find("input[name=product_name]").val(w),g&&a("js_btn_upload_product_preview",g),
v.base_info&&v.base_info.title&&f.find("input[name=product_name]").val(v.base_info.title.html(!1)),
v.base_info&&v.base_info.sub_title&&f.find("input[name=sub_title]").val(v.base_info.sub_title.html(!1)),
v.base_info&&v.base_info.thumb_url&&a("js_btn_upload_product_preview",v.base_info.thumb_url),
v.base_info.source&&f.find("input[name=product_info]").val(v.base_info.source.html(!1)),
v.base_info.service_title&&f.find("input[name=product_service]").val(v.base_info.service_title.html(!1)),
v.base_info.service_iconurl&&a("js_btn_upload_brand_file",v.base_info.service_iconurl),
v&&u();
}
function s(){
t("input[name=product_name]",16),t("input[name=sub_title]",20),t("input[name=product_info]",12),
t("input[name=product_service]",11),r("js_btn_upload_product_preview",{
width:0,
min_width:0,
height:0,
min_height:0,
size:0,
min_size:0
}),r("js_btn_upload_brand_file",{
width:0,
min_width:0,
height:0,
min_height:0,
size:0,
min_size:0
}),f.on("input","input",u);
}
function l(){
f.validate({
ignore:".js_input_ignore",
rules:{
product_name:{
required:!0,
maxlength:16
},
sub_title:{
required:!1,
maxlength:20
},
product_info:{
required:!0,
maxlength:12
},
product_service:{
required:!0,
maxlength:11
},
product_preview:{
required:!0
},
brand_file:{
required:!0
}
},
messages:{
product_name:{
required:"请填写商品名称",
maxlength:"商品名称过长"
},
sub_title:{
required:"请填写商品名称副标题",
maxlength:"商品名称副标题过长"
},
product_info:{
required:"请填写厂商信息",
maxlength:"厂商信息过长"
},
product_service:{
required:"请填写服务提供",
maxlength:"服务提供过长"
},
product_preview:{
required:"请上传预览图"
},
brand_file:{
required:"请上传商标"
}
},
errorPlacement:function(e,i){
var n=i.parent().parent();
n.find(".js_frm_msg").html(e.html()).show();
}
});
}
function d(){
return v.base_info=v.base_info?v.base_info:{},v.base_info.title=f.find("input[name=product_name]").val()||"",
v.base_info.sub_title=f.find("input[name=sub_title]").val()||"",v.base_info.thumb_url=$("#js_img_product_preview").attr("src")||"",
v.base_info.source=f.find("input[name=product_info]").val()||"",v.base_info.service_iconurl=$("#js_img_brand_file").attr("src")||"",
v.base_info.service_title=f.find("input[name=product_service]").val()||"",v;
}
function c(e){
return e?(h=e,j?!1:(j=!0,o(),_(),s(),void l())):!1;
}
var f,m=(template.render,e("common/wx/inputCounter.js")),p=e("common/wx/Tips.js"),b=e("biz_web/utils/upload.js"),h=(e("biz_common/jquery.validate.js"),
{}),v={},w="",g="",h=null,j=!1;
n.exports={
init:c,
setMobilePreview:function(e){
c(e);
},
check:function(e){
var i=f.valid();
return"function"==typeof e&&e.call(void 0,i),i;
},
getData:d,
setData:function(e){
v=e;
}
};
});