define("scan/product_detail.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/dialog.js","common/wx/popup.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/top.js","common/wx/qrcode_download.js","scan/biz_category.js","scan/product_model.js","scan/mobile_preview_v2.js","scan/item_action_shop.js","scan/item_color.js","scan/item_action_recommend_product.js"],function(t){
"use strict";
function e(){
var t={
key:{
keytype:0,
keystr:wx.cgiData.keystr,
keystandard:wx.cgiData.keystandard
}
};
t=$.extend(!0,t,wx.cgiData.product_info),u.init({
data:t,
onChange:function(){},
onChangeEditMode:function(){}
}),g={
itemColor:b,
itemActionShop:f,
itemActionRecommendProduct:h
},f.initShopMap();
var e=u.getData().base_info.header_mask||"";
u.setTmpData(function(t){
t.header_mask=e?e:b.emptyColor;
}),!e&&u.getData().base_info.thumb_url&&b.loadColorByURL(u.getData().base_info.thumb_url,function(t){
e=t&&0==t.base_resp.ret?t.color:b.emptyColor,u.setTmpData(function(t){
t.header_mask=e;
}),p.render();
});
var o=u.getActionList("recommend_product");
if(u.setData(function(t){
t.hasRecommendProduct=o.length>0?!0:!1;
}),p.init({
container:"#js_div_mobile_preview",
itemTab:null,
items:g,
model:u,
editable:!1
}),wx.cgiData.chosen_category.value)if(19==wx.cgiData.keystandard)w=[_.getParentCategory(wx.cgiData.chosen_category.value),_.getCategory(wx.cgiData.chosen_category.value)];else for(var a=wx.cgiData.chosen_category.value,n=0;n<wx.cgiData.category.length;n++)for(var c=0;c<wx.cgiData.category[n].sub.length;c++)if(wx.cgiData.category[n].sub[c].value==a){
w=[wx.cgiData.category[n],wx.cgiData.chosen_category];
break;
}
l=$("#js_div_detail_preview");
}
function o(){
new m("#js_div_toptab",m.DATA.scan).selected(1);
var t="";
w.length>1&&w[0]&&w[1]&&(t=w[0].name+"-"+w[1].name),$("#js_div_status").html(c("tpl_status",{
product:wx.cgiData.product_info,
chosen_category:t
}));
var e=$.extend(!0,u.getData(),{
action_list_group:u.getActionList()
});
l.html(c("tpl_detail_preview",e));
for(var o=u.getData().storemgrinfo.vendorid_list,a="",n=0;n<o.length;n++){
var i=f.shopMap[o[n]];
i&&(a+='<div class="group"><label class="label">'+i.title+"</label></div>");
}
$("#js_div_shop").prepend(a);
var s=u.getActionList("recommend_product"),r=[];
s.length>0&&(r=s[0].extinfo.recommend.recommend_key_list),h.loadEmptyProductList(r,function(t,e){
t&&t.title&&t.thumb_url&&($("#js_div_recommend_product").find(".js_item_"+e+" .js_title").html(t.title),
r[e].title=t.title,r[e].thumb_url=t.thumb_url,s[0].extinfo.recommend.recommend_key_list=r,
u.setActionList("recommend_product",s),p.render());
});
}
function a(){
$(".js_qrcodeDownload").qrcode_download({
title:"下载二维码"
}),new d({
container:$("#js_btn_off"),
content:"取消发布后，该商品信息仅白名单用户可见。%s是否取消发布该商品？".sprintf("<br>"),
type:"click",
position:{
top:0,
left:-90
},
onclose:function(){},
buttons:[{
text:"是",
type:"btn_primary",
click:function(){
var t=this.$dom.find(".btn");
t.hasClass("btn_disabled")||(t.eq(0).btn(0),t.eq(1).disable(),i.post({
url:"/merchant/scanproductrelease",
data:{
action:"off",
keystandard:wx.cgiData.keystandard,
keystr:wx.cgiData.keystr
},
mask:!1,
error:function(){
r.err("系统错误，请重试"),t.eq(0).btn(1),t.eq(1).enable();
}
},function(e){
0==e.base_resp.ret?(r.suc("取消发布成功"),location.reload()):(r.err("提交失败，请重试"),t.eq(0).btn(1),
t.eq(1).enable());
}));
}
},{
text:"否",
type:"btn_default",
click:function(){
0==this.$dom.find(".btn").eq(1).hasClass("btn_disabled")&&this.hide();
}
}]
}),$("#js_btn_delete").on("click",function(){
s.show({
type:"warn",
mask:!0,
className:"simple",
msg:"商品删除后将无法回复，是否确定删除？|确认删除该商品后，你编辑的商品信息将会清除。",
buttons:[{
text:"确定",
click:function(){
i.post({
url:"/merchant/scanproductdel",
data:{
keystr:data.product_info.idx_info.keystr,
keystandard:data.product_info.idx_info.keystandard
},
mask:!1,
beforeSend:function(){},
error:function(){
r.err("系统错误，请重试");
}
},function(t){
0==t.base_resp.ret?(r.suc("删除成功"),location.href="/merchant/scanproductlist?action=list&page=1&status=1"+wx.data.param,
this.remove()):r.err("删除失败，请重试");
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
});
}
function n(){
e(),o(),a();
}
var c=(wx.T,template.render),i=t("common/wx/Cgi.js"),s=(t("biz_web/ui/checkbox.js"),
t("common/wx/dialog.js")),r=(t("common/wx/popup.js"),t("common/wx/Tips.js")),d=t("common/wx/tooltips.js"),m=t("common/wx/top.js");
t("common/wx/qrcode_download.js");
var l,_=t("scan/biz_category.js"),u=t("scan/product_model.js"),p=t("scan/mobile_preview_v2.js"),g={},f=t("scan/item_action_shop.js"),b=t("scan/item_color.js"),h=t("scan/item_action_recommend_product.js"),w=[];
n();
});