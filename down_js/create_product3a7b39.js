define("scan/create_product.js",["biz_web/ui/dropdown.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/top.js","biz_web/lib/json.js","common/wx/Step.js","scan/mobile_preview.js","scan/item_category.js","scan/item_basic.js","scan/item_detail.js","scan/item_service.js","scan/item_channel.js"],function(e){
"use strict";
function t(){
window.gProduct_data="undefined"!=typeof wx.cgiData.product_info&&"undefined"!=typeof wx.cgiData.product_info.base_info&&wx.cgiData.product_info||{
key:{
keytype:0,
keystandard:0,
keystr:""
},
appuin:"",
base_info:{
thumb_url:"",
title:"",
source:"",
use_local_ext_info:"",
service_title:"",
service_iconurl:"",
category_id_list:[]
},
detail_info:{
banner_list:[],
desc_list:[]
},
action_list:[{
type:0,
name:"自定义服务一(选填)"
},{
type:0,
name:"自定义服务二(选填)"
},{
type:0,
name:"自定义服务三(选填)"
}],
del_flag:0,
status:0,
qrcode_pic_url:"",
qrcode_url:"",
update_time:0,
create_time:0,
storemgrinfo:{
mgr_type:0,
vendorid_list:[],
vendorid_checklist:[],
vendorid_list_name:[]
}
},g=$("#stepItems").length>0?new p({
container:"#stepItems",
selected:1,
names:["1 选择商品类目","2 填写商品信息","3 预览并提交"]
}):null,u.init({
dom:$("#product_preview"),
onItemChange:function(e){
i(e);
}
}),m.init(u);
for(var e in j)j[e].setMobilePreview(u),j[e].init();
y=$("#js_btn_save"),k=$("#js_btn_preview"),x=$("#js_btn_submit"),1*u.getData().idx_info.status==0&&y.hide();
}
function i(e){
if($("#js_div_step1").hide(),$("#js_div_step2").show(),$("."+e).show(),$("."+e).siblings(".portable_editor").hide(),
"item_code"==e);else if("item_basic"==e)$(".js_editor_basic").css({
"margin-top":$(".js_div_preview_basic").height()/2
}),g&&g.setStep(2);else if("item_detail"==e)$(".js_editor_detail").css({
"margin-top":$(".js_div_preview_detail").position().top+5
}),g&&g.setStep(2);else if("item_service"==e){
var t=$(".js_div_preview_service").length-1;
$(".js_editor_service").css({
"margin-top":$(".js_div_preview_service").eq(t).position().top+5
}),g&&g.setStep(2);
}else"item_channel"==e&&($(".js_editor_channel").css({
"margin-top":$(".js_div_preview_channel").position().top+5
}),g&&g.setStep(2));
}
function n(){
var e=!0;
for(var t in j)0==j[t].check()&&(1==e&&i(t),e=!1);
return 0==m.check()&&(e=!1),e;
}
function s(){
var e=!0;
return $('input[name="product_name"]').valid()||(e=!1,i("item_basic")),0==m.check()&&(e=!1),
e;
}
function a(e){
var t={
"-2":"系统错误，请重试",
"-3":"系统错误，请重试",
394:"该商品条形码已被删除，请核实",
395:"未获得该商品条形码的使用权限，请先核实该条形码号段",
396:"该商品条形码已有商户使用，请核实",
398:"该商品条形码不存在，请核实",
399:4==u.getData().idx_info.keystandard?"你输入的条形码已存在，请核实":"你输入的商品二维码ID已存在，请核实",
400:"你提交的厂商识别代码不包含该条形码，请核对",
401:"请输入经营范围内的商品条形码",
402:"请输入经营范围内的商品条形码",
403:"请选择有效的卡券",
404:"你提交的商品不存在，请核对",
405:"系统错误，请重试",
406:"提交超时，请稍后重试",
407:4==u.getData().idx_info.keystandard?"请输入正确的商品条形码":"请输入正确的商品二维码ID",
408:"提交超时，请稍后重试",
30:"商品详情有误，请核对",
31:"商品详情有误，请核对",
32:"自定义服务信息有误，请核对",
418:"请勿填写其他公众号链接",
419:"链接已失效，请在手机端重新复制链接"
},i=t[e+""];
return i||(i="商品入库失败"),i;
}
function o(e,t){
var i={};
i.product_info=l.stringify2(u.getData());
var n="/merchant/scanproductadd?action="+e;
n+="&keystandard="+wx.cgiData.keystandard+"&keystr="+wx.cgiData.keystr,c.post({
url:n,
data:i
},function(e){
if(0!=e.base_resp.ret){
var i=a(e.base_resp.ret);
_.err(i);
}
y.enable(),k.enable(),x.enable(),y.btn(!0),k.btn(!0),x.btn(!0),t&&t(e);
});
}
function r(){
new d("#js_div_toptab",d.DATA.scan).selected(1),y.on("click",function(e){
return e.preventDefault(),$(this).hasClass("btn_disabled")?!1:0==s()?(_.err("请完善商品名称和商品类目"),
!1):(k.disable(),x.disable(),y.btn(!1),void o("edit",function(e){
return 0!=e.base_resp.ret?!1:void _.suc("保存成功");
}));
}),k.on("click",function(e){
return e.preventDefault(),$(this).hasClass("btn_disabled")?!1:0==s()?(_.err("请完善商品名称和商品类目"),
!1):(y.disable(),x.disable(),k.btn(!1),void o("preview",function(e){
if(0!=e.base_resp.ret)return!1;
var t=$("#tpl_preview_code").popup({
title:"扫码预览",
width:600,
data:{
url:e.barcode_url
},
buttons:[],
mask:!0,
onHide:function(){
this.remove();
},
onShow:function(){}
});
t.popup("resetPosition");
}));
}),x.on("click",function(e){
return e.preventDefault(),$(this).hasClass("btn_disabled")?!1:0==n()?(_.err("请完善商品信息"),
!1):(y.disable(),k.disable(),x.btn(!1),void o("editandrelease",function(e){
if(0!=e.base_resp.ret)return!1;
_.suc("保存并发布成功"),h=!1;
var t=("new"==wx.cgiData.action?"0":"1",u.getData().idx_info.keystandard),i=u.getData().idx_info.keystr;
location.href="/merchant/scanproductinfo?action=info&keystandard="+t+"&keystr="+i+"&token="+wx.data.t+"&lang=zh_CN";
}));
}),window.onbeforeunload=function(){
return 1==h?"提示":void 0;
};
}
var c=(e("biz_web/ui/dropdown.js"),e("common/wx/popup.js"),e("common/wx/Cgi.js")),_=(e("biz_web/ui/dropdown.js"),
e("common/wx/Tips.js")),d=e("common/wx/top.js"),l=e("biz_web/lib/json.js"),p=e("common/wx/Step.js"),u=e("scan/mobile_preview.js"),m=e("scan/item_category.js"),b=e("scan/item_basic.js"),f=e("scan/item_detail.js"),v=e("scan/item_service.js"),w=e("scan/item_channel.js"),j={
item_basic:b,
item_detail:f,
item_service:v,
item_channel:w
},h=!0,g=null,y=null,k=null,x=null;
!function(){
t(),i("item_basic"),r();
}();
});