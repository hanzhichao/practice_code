define("scan/mobile_preview.js",["common/wx/Cgi.js","tpl/scan/mobile_preview.html.js","biz_web/ui/checkbox.js","common/wx/Tips.js"],function(t,e,i){
"use strict";
function n(){
return window.gProduct_data;
}
function o(t){
_=$.extend(!0,n(),t),window.gProduct_data=_,c(_);
}
function c(){
a&&a.html(d(u,n())),r();
}
function l(t){
console.log("Mobile preview Err,"+t);
}
function r(){
$(".js_div_preview_basic").on("click",function(t){
t.preventDefault(),m&&m("item_basic");
}),$(".js_div_preview_detail").on("click",function(t){
t.preventDefault(),m&&m("item_detail");
}),$(".js_div_preview_service").on("click",function(t){
t.preventDefault(),m&&m("item_service");
}),$(".js_div_preview_channel").on("click",function(t){
t.preventDefault(),m&&m("item_channel");
});
}
function s(){
var t=[],e=wx.cgiData.default_vendorid_list.vendorid_list,i=n(),o=i.storemgrinfo;
i&&o&&o.vendorid_list.length>0&&($.each(e,function(t){
f[e[t].vendorid].price=e[t].price.toFixed(1);
}),$.each(o.vendorid_list,function(e,i){
t.push({
title:f[i].title,
value:i,
price:f[i].price
});
}),o.vendorid_list_name=t);
}
var a,d=wx.T,u=(wx.cgiData,t("common/wx/Cgi.js"),t("tpl/scan/mobile_preview.html.js")),_=(t("biz_web/ui/checkbox.js"),
t("common/wx/Tips.js"),{}),f={
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
},m=null;
i.exports={
init:function(t){
t&&""!=t.dom?(a=t.dom,m=t.onItemChange):l("param err dom emtpy"),s(),c(),t&&"undefined"!=typeof t.readonly&&setTimeout(function(){
$(".section_mask").css({
display:"none"
}),$(".msg_product_section").css({
cursor:"default"
}),$(".lbl_access_after.label_item").css({
cursor:"default"
});
},100);
},
gData:_,
getData:function(){
return window.gProduct_data;
},
refresh:function(t){
c(t);
},
setData:function(t){
o(t);
}
};
});