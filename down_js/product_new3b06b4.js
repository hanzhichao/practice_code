define("media/product_new.js",["common/wx/dialog.js","biz_common/jquery.validate.js","common/wx/inputCounter.js","common/wx/Cgi.js","media/productCategory.js","biz_web/utils/upload.js","common/wx/media/weappDialogSelect.js","common/wx/Tips.js"],function(e){
"use strict";
function i(){
var e=window.cgiData;
e.pid&&(e.pid=e.pid.html(!1),e.title=e.title.html(!1),e.img_url=e.img_url.html(!1),
e.wxa_appid=e.wxa_appid.html(!1),e.url=e.url.html(!1),e.min_price=e.min_price.html(!1),
e.min_ori_price=e.min_ori_price.html(!1),e.sub_title=e.sub_title.html(!1),e.category_name1=e.category_name1.html(!1),
e.category_name2=e.category_name2.html(!1),e.category_name3=e.category_name3.html(!1),
e.category_name4=e.category_name4.html(!1),e.category_name5=e.category_name5.html(!1),
b.pid=e.pid,e.wxa_appid&&p(e.wxa_appid));
}
function r(){
cgiData.pid&&($("#product_id").val(cgiData.pid),$("#product_name").val(cgiData.title),
$("#sub_title").val(cgiData.sub_title),$("#imgurl_hidden").val(cgiData.img_url),
$("#price").val(cgiData.min_price),cgiData.min_ori_price>0&&$("#ori_price").val(cgiData.min_ori_price),
$("#wxa_appid_hidden").val(cgiData.wxa_appid),$("#wxa_path").val(cgiData.url));
}
function t(){
var e=$("#product_name");
new l(e,{
maxLength:e.attr("max-length")
}),m();
var i=$("#sub_title");
new l(i,{
maxLength:i.attr("max-length")
}),$("#select_weapp").click(function(){
var e=$(this);
f.show({},function(i,r){
if(i&&r){
u(r),e.text("重新选择小程序");
var t=$("#wxa_appid_hidden").val(i);
b.form.element(t);
}
});
}),o(),a(),$("#submitBtn").click(function(){
n()===!0&&d($(this));
});
}
function a(){
b.categoryObj=new s.myconstructor({
container:$("#category_main"),
category_loading_img:window.cgiData.category_loading_img,
defaultLabel:"请选择",
initCategoryName:[cgiData.category_name1||"",cgiData.category_name2||"",cgiData.category_name3||"",cgiData.category_name4||"",cgiData.category_name5||""],
formObj:b.form,
search:!0,
canadd:!0
});
}
function n(){
return b.form.form()?!0:(w.err("请完善商品信息"),!1);
}
function o(){
_.addMethod("productid",function(e,i){
return this.optional(i)||/^[a-zA-Z0-9~!@#$%&*()_+-=.?;]+$/.test(e);
},"只能为数字、字母及一些常用字符（英文状态）组合"),_.addMethod("minNumber",function(e){
var i=!0,r=(e+"").split(".");
return 2==r.length&&r[1].length>2?(i=!1,!1):i;
},"小数点后最多为两位"),_.addMethod("oriPriceCompare",function(e){
var i=1*$("#price").val();
return i&&e&&i>e?!1:($("#price").parent().parent().find(".frm_msg").hide(),!0);
},"商品原价必须大于等于商品现价"),_.addMethod("priceCompare",function(e){
var i=1*$("#ori_price").val();
return i&&e&&e>i?!1:($("#ori_price").parent().parent().find(".frm_msg").hide(),!0);
},"商品现价必须小于等于商品原价"),_.addMethod("positiveNumber",function(e){
return e&&0>e?!1:!0;
},"价格必须大于0"),_.addMethod("customerNumber",function(e){
return"-"===e?!1:!0;
},"请输入合法价格");
var e={
product_id:{
required:!0,
productid:!0
},
product_name:{
required:!0,
maxlength:30
},
imgurl_hidden:{
required:!0
},
price:{
required:!0,
number:!0,
minNumber:!0,
range:[0,1e8],
priceCompare:!0,
customerNumber:!0
},
ori_price:{
number:!0,
minNumber:!0,
range:[0,1e8],
oriPriceCompare:!0,
customerNumber:!0
},
sub_title:{
maxlength:30
},
wxa_appid_hidden:{
required:!0
},
wxa_path:{
required:!0
},
category_1_hidden:{
required:!0
}
},i={
product_id:{
required:"请输入商品ID",
productid:"只能为数字、字母及一些常用字符（英文状态）组合"
},
product_name:{
required:"请输入商品名称",
maxlength:"不能超过30个字符"
},
imgurl_hidden:{
required:"请上传商品图片"
},
price:{
required:"请输入商品价格",
number:"请输入合法价格",
minNumber:"小数点后最多为两位",
customerNumber:"请输入合法价格",
priceCompare:"商品现价必须小于等于商品原价",
range:"价格必须大于0且小于1亿"
},
ori_price:{
number:"请输入合法价格",
minNumber:"小数点后最多为两位",
oriPriceCompare:"商品原价必须大于等于商品现价",
customerNumber:"请输入合法价格",
range:"价格必须大于0且小于1亿"
},
sub_title:{
maxlength:"不能超过30个字符"
},
wxa_appid_hidden:{
required:"请选择小程序"
},
wxa_path:{
required:"请输入小程序路径"
},
category_1_hidden:{
required:"请选择商品类目"
}
};
b.form=$("#myform").validate({
rules:e,
messages:i,
ignore:[]
});
}
function m(){
h.uploadCdnFile({
container:"#uploadBtn",
multi:!1,
type:2,
imageSize:!1,
onComplete:function(e,i,r,t){
var a=1*t.base_resp.ret;
switch(a){
case 0:
w.suc("上传成功");
var n=t.content,o=$("#uploadBox");
o.find(".js_preview").show().find("img").attr("src",n);
var m=$("#imgurl_hidden").val(n);
$("#uploadBtn").text("重新上传"),b.form.element(m);
}
}
});
}
function c(){
var e={
product_id:$("#product_id").val().trim(),
product_name:$("#product_name").val().trim(),
img_url:$("#imgurl_hidden").val().trim(),
price:$("#price").val().trim(),
wxa_appid:$("#wxa_appid_hidden").val().trim(),
wxa_path:$("#wxa_path").val().trim(),
ori_price:"",
sub_title:""
},i=$("#ori_price").val().trim(),r=$("#sub_title").val().trim();
i&&(e.ori_price=i),r&&(e.sub_title=r);
var t=b.categoryObj.getData();
for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a]);
return b.pid?(e.product_id=b.pid,e.action="modify_single_product"):e.action="upload_single_product",
e;
}
function d(e){
b.submiting!==!0&&(b.submiting=!0,e.btn(!1),g.post({
url:"/cgi-bin/productmaterial?",
data:c(),
mask:!1
},{
done:function(i){
if(b.submiting=!1,e.btn(!0),!i||!i.base_resp)return void w.err("系统错误，请稍后再试");
var r=1*i.base_resp.ret;
if(0===r){
var t="添加商品成功";
b.pid&&(t="修改商品信息成功"),w.suc(t),setTimeout(function(){
window.location.href=wx.url("/cgi-bin/productmaterial?action=product_list");
},1e3);
}else{
var t="";
t=341005===r?"小程序未关联该公众号":341006===r?"小程序路径不存在":"系统错误，请稍后再试",w.err(t);
}
},
fail:function(){
b.submiting=!1,e.btn(!0),w.err("系统繁忙，请稍后再试");
}
}));
}
function u(e){
$("#weapp_card").html(template.render("weapp_tpl",e));
}
function p(e){
e&&f.getInfo(function(i){
if(i)for(var r=0;r<i.length;r++)i[r].appid==e&&u(i[r]);
});
}
var _=(e("common/wx/dialog.js"),e("biz_common/jquery.validate.js")),l=e("common/wx/inputCounter.js"),g=e("common/wx/Cgi.js"),s=e("media/productCategory.js"),h=e("biz_web/utils/upload.js"),f=e("common/wx/media/weappDialogSelect.js"),w=e("common/wx/Tips.js"),b={
pid:""
};
i(),r(),t();
});