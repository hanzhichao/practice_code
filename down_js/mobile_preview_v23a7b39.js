define("scan/mobile_preview_v2.js",["tpl/scan/mobile_preview_v2.html.js"],function(t,e,i){
"use strict";
function o(){
var t=_.getEditMode();
s.find(".js_editmode").hide(),s.find(".js_editmode_"+t).show();
}
function a(){
var t={
show_mask:c.editable?!0:!1,
selectedTabName:l?l.getSelectedName():""
};
t=$.extend(!0,t,_.getData()),t.tmp_data={},t.tmp_data=$.extend(!0,t.tmp_data,_.getTmpData()),
t.tmp_data.header_mask&&(t.tmp_data.header_mask=_.isIE()?d.itemColor.spliteColorAlpha(t.tmp_data.header_mask).color:d.itemColor.getRGBA(t.tmp_data.header_mask).color),
t.action_list={
banner:[],
cell:[],
product_desc:[],
shop:[],
recommend_product:[],
entityshop:[]
};
for(var e in t.action_list){
var i=_.getActionList(e).slice();
i=$.extend(!0,{},{
list:i
}).list,t.action_list[e]=i;
}
if(0==c.editable?t.action_list.product_desc.length>0&&""==t.action_list.product_desc[0].extinfo.text&&(t.action_list.product_desc=[]):0==t.action_list.product_desc.length&&(t.action_list.product_desc=[{
extinfo:{
text:""
}
}]),c.editable){
var a=3;
2==_.getEditMode()&&(a=2);
for(var n=t.action_list.cell.length;a>n;n++)t.action_list.cell.push({
name:"未填写"
});
}
for(var r=[],n=0;n<t.action_list.shop.length;n++)r.push(14==t.action_list.shop[n].type?{
title:t.action_list.shop[n].name,
price:1*t.action_list.shop[n].desc,
weight:1
}:{
title:"微信小店",
price:1*t.action_list.shop[n].extinfo.price,
weight:1
});
for(var n=0;n<t.storemgrinfo.vendorid_list.length;n++){
var h=t.storemgrinfo.vendorid_list[n];
d.itemActionShop.shopMap[h]&&r.push({
title:d.itemActionShop.shopMap[h].title,
price:1*d.itemActionShop.shopMap[h].price,
weight:2
});
}
if(""!==t.base_info.retail_price&&r.push({
title:"建议零售价",
price:1*t.base_info.retail_price,
type:"recommend_price",
weight:0
}),r.sort(function(t,e){
return t.weight==e.weight?t.price-e.price:t.weight-e.weight;
}),t.tmp_data.show_shop_entry=!1,r.length>0){
var f=new Number(r[0].price);
t.tmp_data.show_shop_entry=!0,t.tmp_data.shop_title=r[0].title,t.tmp_data.shop_price=f.toFixed(2),
t.tmp_data.shop_arrow=!0,"recommend_price"==r[0].type&&1==r.length&&(t.tmp_data.shop_arrow=!1),
r.length>1&&(t.tmp_data.shop_title="立即购买");
}
if(c.editable){
0==t.action_list.recommend_product.length&&t.action_list.recommend_product.push({
extinfo:{
recommend:{
recommend_key_list:[]
}
}
});
for(var n=t.action_list.recommend_product[0].extinfo.recommend.recommend_key_list.length;3>n;n++)t.action_list.recommend_product[0].extinfo.recommend.recommend_key_list.push({
title:"相关商品",
thumb_url:""
});
}
t.storemgrinfo||(t.storemgrinfo={
vendorid_list:[]
});
var g=p(m,t);
s.html(g),o();
}
function n(){
c.editable?s.on("click",".js_btn_showtab",function(t){
t.preventDefault(),l.showTab($(this).data("tab"));
}):s.find(".js_div_mask").hide();
}
function r(t){
c=t,_=t.model,d=t.items,l=t.itemTab,s=$(t.container),a(),n();
}
var s,c,_,d,l,p=wx.T,m=t("tpl/scan/mobile_preview_v2.html.js");
i.exports={
init:r,
render:a,
triggerEditMode:o
};
});