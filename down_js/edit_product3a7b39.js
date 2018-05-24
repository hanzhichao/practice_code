define("scan/edit_product.js",["biz_web/ui/dropdown.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/top.js","biz_web/lib/json.js","biz_common/utils/monitor.js","common/wx/Step.js","scan/product_model.js","scan/mobile_preview_v2.js","scan/item_tab.js","scan/item_edit_mode.js","scan/item_category.js","scan/item_tag.js","scan/item_preview_image.js","scan/item_product_name.js","scan/item_desc_list.js","scan/item_color.js","scan/item_banner_list.js","scan/item_action_banner.js","scan/item_action_entityshop.js","scan/item_action_shop.js","scan/item_action_desc.js","scan/item_action_cell.js","scan/item_antifake.js","scan/item_action_recommend_product.js","biz_common/utils/string/jsonDeepHtmldecode.js"],function(t){
"use strict";
function e(t,e){
var n={};
n.product_info=b.stringify2(f.getData());
var s="/merchant/scanproductadd?action="+t;
s+="&keystandard="+wx.cgiData.keystandard+"&keystr="+wx.cgiData.keystr,l.post({
url:s,
data:n
},function(t){
if(0!=t.base_resp.ret){
var n=i(t.base_resp.ret);
u.err(n);
}
r.enable(),d.enable(),m.enable(),r.btn(!0),d.btn(!0),m.btn(!0),e&&e(t);
});
}
function i(t){
var e={
"-2":"系统错误，请重试",
"-3":"系统错误，请重试",
394:"该商品条形码已被删除，请核实",
395:"未获得该商品条形码的使用权限，请先核实该条形码号段",
396:"该商品条形码已有商户使用，请核实",
398:"该商品条形码不存在，请核实",
399:4==f.getData().idx_info.keystandard?"你输入的条形码已存在，请核实":"你输入的商品二维码ID已存在，请核实",
400:"你提交的厂商识别代码不包含该条形码，请核对",
401:"请输入经营范围内的商品条形码",
402:"请输入经营范围内的商品条形码",
403:"请选择有效的卡券",
404:"你提交的商品不存在，请核对",
405:"系统错误，请重试",
406:"提交超时，请稍后重试",
407:4==f.getData().idx_info.keystandard?"请输入正确的商品条形码":"请输入正确的商品二维码ID",
411:"商品运营区未填写完，请检查",
414:"商品多媒体展示未填写完，请检查",
30:"商品详情有误，请核对",
31:"商品详情有误，请核对",
32:"自定义服务信息有误，请核对",
14155:"图片保存失败(接口导入)，请稍后再试",
418:"请勿填写其他公众号链接",
419:"链接已失效，请在手机端重新复制链接"
},i=e[t+""];
return i||(i="商品保存失败"),i;
}
function n(t,e,i){
var n=$("#tpl_anti_spam").popup({
title:"save"==t?"保存失败":"提交失败",
width:600,
data:{
action:t,
block_type:e,
block_url:i
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}],
mask:!0,
onHide:function(){
this.remove();
},
onShow:function(){}
});
n.popup("resetPosition");
}
function s(){
var t={
key:{
keystr:wx.cgiData.keystr,
keystandard:wx.cgiData.keystandard
}
};
t=$.extend(!0,t,wx.cgiData.product_info),f.init({
data:t,
onChange:function(){
w.render();
},
onChangeEditMode:function(){
for(var t in g)g[t].triggerEditMode();
w.triggerEditMode();
}
}),window.model=f,h.init(),v.init({
model:f
}),g={
itemCategory:k,
itemTag:y,
itemColor:S,
itemPreviewImage:x,
itemProductName:D,
itemDescList:T,
itemBannerList:A,
itemActionBanner:C,
itemActionEntityShop:z,
itemActionShop:E,
itemActionDesc:M,
itemActionCell:H,
itemAntifake:I,
itemActionRecommendProduct:P
},w.init({
container:"#js_div_mobile_preview",
itemTab:h,
items:g,
model:f,
editable:!0
});
for(var e in g)g[e].init({
model:f,
items:g
}),g[e].triggerEditMode();
r=$("#js_btn_save"),d=$("#js_btn_preview"),m=$("#js_btn_submit");
}
function o(){
new p("#js_div_toptab",p.DATA.scan).selected(1),$("#js_div_status").html(_("tpl_status",{
product:wx.cgiData.product_info
})),h.showTab("basic"),w.render(),void 0==f.getData().context_info.edit_mode&&v.showModeDialog();
}
function a(){
r.on("click",function(t){
return t.preventDefault(),$(this).hasClass("btn_disabled")?!1:0==k.check()?(u.err("请正确选择商品类目"),
j.setSum(29085,22,1).send(),!1):0==y.check()?(u.err("请正确填写品牌名称"),j.setSum(29085,22,1).send(),
!1):0==D.check()?(u.err("请正确填写商品名称"),h.showTab("basic"),h.scrollToTab("basic"),j.setSum(29085,22,1).send(),
!1):(d.disable(),m.disable(),r.btn(!1),void e("edit",function(t){
return 408==t.base_resp.ret?(j.setSum(29085,23,1).send(),n("save",t.block_type,t.block_url),
!1):0!=t.base_resp.ret?(j.setSum(29085,23,1).send(),!1):(j.setSum(29085,21,1).send(),
u.suc("保存成功"),void $(".js_txt_status").html("待发布"));
}));
}),d.on("click",function(t){
return t.preventDefault(),$(this).hasClass("btn_disabled")?!1:0==k.check()?(u.err("请正确选择商品类目"),
!1):0==y.check()?(u.err("请正确填写品牌名称"),!1):0==D.check()?(u.err("请正确填写商品名称"),h.showTab("basic"),
h.scrollToTab("basic"),!1):(r.disable(),m.disable(),d.btn(!1),void e("preview",function(t){
if(0!=t.base_resp.ret)return!1;
var e=$("#tpl_preview_code").popup({
title:"扫码预览",
width:600,
data:{
url:t.barcode_url
},
buttons:[],
mask:!0,
onHide:function(){
this.remove();
},
onShow:function(){}
});
e.popup("resetPosition");
}));
}),m.on("click",function(t){
if(t.preventDefault(),$(this).hasClass("btn_disabled"))return!1;
var i=0,s="",o="";
for(var a in g)0==g[a].check()&&(i++,"function"==typeof g[a].getErrMsg&&""==o&&(o=g[a].getErrMsg()),
""==s&&"itemCategory"!=a&&(s=a));
return i>0?(j.setSum(29085,25,1).send(),1==i&&""!=o?u.err(o):(o="请正确配置商品主页",$.inArray(s,h.basicItems)>-1?(h.showTab("basic"),
h.scrollToTab("basic"),o="请正确配置头部信息"):$.inArray(s,h.detailItems)>-1?(h.showTab("detail"),
h.scrollToTab("detail"),o="请正确配置商品详情"):$.inArray(s,h.advancedItems)>-1&&(h.showTab("advanced"),
h.scrollToTab("advanced"),o="请正确配置商品运营区"),u.err(o)),!1):0==f.getData().action_list.length?(u.err("运营区至少填写一项"),
h.showTab("advanced"),j.setSum(29085,25,1).send(),!1):(r.disable(),d.disable(),m.btn(!1),
void e("editandrelease",function(t){
if(408==t.base_resp.ret)return j.setSum(29085,26,1).send(),n("release",t.block_type,t.block_url),
!1;
if(0!=t.base_resp.ret)return j.setSum(29085,26,1).send(),!1;
j.setSum(29085,24,1).send(),L=!1;
var e=f.getData().idx_info.keystandard,i=f.getData().idx_info.keystr,s="/merchant/scanproductinfo?action=info&keystandard="+e+"&keystr="+i+"&token="+wx.data.t+"&lang=zh_CN",o=$("#tpl_release_ok").popup({
title:"提交成功",
width:600,
data:{
product:wx.cgiData.product_info
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
location.href=s;
}
}],
mask:!0,
onHide:function(){
location.href=s;
},
onShow:function(){}
});
o.popup("resetPosition");
}));
}),/^dev/.test(location.host)||(window.onbeforeunload=function(){
return 1==L?"你正要退出编辑":void 0;
});
}
function c(){
s(),o(),a();
}
var r,d,m,_=template.render,l=(t("biz_web/ui/dropdown.js"),t("common/wx/popup.js"),
t("common/wx/Cgi.js")),u=(t("biz_web/ui/dropdown.js"),t("common/wx/Tips.js")),p=t("common/wx/top.js"),b=t("biz_web/lib/json.js"),j=t("biz_common/utils/monitor.js"),f=(t("common/wx/Step.js"),
t("scan/product_model.js")),w=t("scan/mobile_preview_v2.js"),g={},h=t("scan/item_tab.js"),v=t("scan/item_edit_mode.js"),k=t("scan/item_category.js"),y=t("scan/item_tag.js"),x=t("scan/item_preview_image.js"),D=t("scan/item_product_name.js"),T=t("scan/item_desc_list.js"),S=t("scan/item_color.js"),A=t("scan/item_banner_list.js"),C=t("scan/item_action_banner.js"),z=t("scan/item_action_entityshop.js"),E=t("scan/item_action_shop.js"),M=t("scan/item_action_desc.js"),H=t("scan/item_action_cell.js"),I=t("scan/item_antifake.js"),P=t("scan/item_action_recommend_product.js"),B=t("biz_common/utils/string/jsonDeepHtmldecode.js"),L=!0;
wx.cgiData.product_info&&(wx.cgiData.product_info=B.jsonDeepHtmldecode(wx.cgiData.product_info)),
c();
});