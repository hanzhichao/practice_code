define("scan/item_channel.js",["common/wx/inputCounter.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js","biz_common/jquery.validate.js","common/wx/hash.js","biz_common/utils/string/html.js"],function(t,e,i){
"use strict";
function n(){
u=window.gProduct_default_vendorid_list,f=s.getData(),p=f.storemgrinfo,h=f.action_list;
var t=wx.cgiData.default_vendorid_list.vendorid_list;
t&&t.length&&t.length>0&&(u=t);
}
function o(){
var t=[];
u&&u.length>0&&($.each(u,function(e){
t.push({
title:x[u[e].vendorid].title,
value:u[e].vendorid,
price:u[e].price?u[e].price.toFixed(1):0
}),x[u[e].vendorid].price=u[e].price.toFixed(1);
}),gProduct_data.storemgrinfo||(gProduct_data.storemgrinfo={}),gProduct_data.storemgrinfo.mgr_type=1,
$(".channel_list").html(_("tpl_channel_item",{
item:t
})+_("tpl_we_shop",{})));
for(var e=0;e<h.length;e++)9==h[e].type&&h[e].extinfo.link&&($("#productid_container").show(),
$("#productid").val(m.htmlDecode(h[e].extinfo.link)),$("#we_shop").attr("checked",!0),
$("#we_shop").parent().addClass("selected"),d());
}
function r(){
var t=$("#productid").val();
return t?v.getUrlParam("pid",t):null;
}
function c(){
var t=$("#productid").val();
return t?v.getUrlParam("biz",t):null;
}
function l(){
var t=$(".pay_channel").checkbox({
multi:!0,
onChanged:function(){
var t=[];
"undefined"==typeof p&&(p={}),p.vendorid_list=$(this)[0].values(),$.each($(this)[0].values(),function(e,i){
t.push(x[i]);
}),p.vendorid_list_name=t,s.refresh();
}
});
if($("#we_shop").checkbox({
onChanged:function(t){
if(t[0].checked){
var e=!1;
if($("#productid_container").show(),h)for(var i=0;i<h.length;i++)9==h[i].type&&(e=!0,
h[i]={
name:"微信小店",
type:9,
extinfo:{
productid:r,
link:$("#productid").val()
}
});else h=[];
e||h.push({
name:"微信小店",
type:9,
extinfo:{
productid:r(),
link:$("#productid").val()
}
});
}else{
for(var i=0;i<h.length;i++)9==h[i].type&&h.splice(i,1);
$("#productid_container").hide(),$("#productid").val("");
}
s.refresh();
}
}),s&&f&&p&&p.vendorid_list){
var e=[],i=p.vendorid_list;
$.each(i,function(t){
e.push(i[t]+"");
}),t.adjust(e);
}
$("#productid").on("input",function(){
for(var t=0;t<h.length;t++)9==h[t].type&&(h[t].extinfo.productid=r(),h[t].extinfo.link=$("#productid").val());
d();
});
}
function d(){
var t=r(),e=c();
if(t&&e)$("#weshop_err").hide(),$.ajax({
url:wx.url("/merchant/scanproductinfo?action=shop_price&biz="+e+"&productid="+t),
type:"get",
success:function(t){
if(0==t.base_resp.ret){
for(var e=t.ext_info.shop_info.price,i=0;i<h.length;i++)9==h[i].type&&(h[i].extinfo.price=e);
s.refresh();
}
},
error:function(){
s.refresh();
}
});else{
for(var i=0;i<h.length;i++)9==h[i].type&&(h[i].extinfo.price="");
$("#productid").val()&&$("#weshop_err").show(),s.refresh();
}
}
function a(){
return g?!1:(g=!0,n(),o(),void l());
}
var s,u,p,h,f,_=template.render,v=(t("common/wx/inputCounter.js"),t("biz_web/utils/upload.js"),
t("biz_web/ui/checkbox.js"),t("biz_common/jquery.validate.js"),t("common/wx/hash.js")),m=t("biz_common/utils/string/html.js"),g=!1,w={},x={
1:{
title:"QQ网购"
},
2:{
title:"亚马逊"
},
3:{
title:"当当"
},
4:{
title:"京东"
},
5:{
title:"QQ音乐"
},
6:{
title:"豆瓣"
},
7:{
title:"易迅"
},
8:{
title:"搜搜"
},
9:{
title:"1号店"
},
10:{
title:"中信21世纪"
},
11:{
title:"聚美优品"
},
12:{
title:"微购物"
},
14:{
title:"39健康网"
},
15:{
title:"微信电影票"
},
16:{
title:"苏宁"
},
17:{
title:"灵动快拍参考价"
},
18:{
title:"好药师"
},
19:{
title:"酒仙网"
},
20:{
title:"天虹"
},
1e3:{
title:"微信小店"
},
1001:{
title:"微信推荐"
},
1002:{
title:"良品铺子"
}
};
i.exports={
init:a,
getData:function(){
return w;
},
check:function(){
return!$("#we_shop")[0].checked||r()&&c()?($("#weshop_err").hide(),!0):($("#weshop_err").show(),
!1);
},
setMobilePreview:function(t){
s=t;
}
};
});