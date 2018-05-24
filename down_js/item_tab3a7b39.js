define("scan/item_tab.js",[],function(t,e,i){
"use strict";
function s(){
$(".js_btn_tab").on("click",function(t){
t.preventDefault(),a($(this).data("tab"));
});
}
function a(t){
o=t,$(".js_div_tab").hide(),$("#js_div_tab_"+t).show(),$(".js_btn_tab").removeClass("selected"),
$("#js_btn_tab_"+t).addClass("selected"),$(".js_div_tab_target").removeClass("selected"),
$("#js_div_tab_target_"+("detail"==t?"basic":t)).addClass("selected");
}
function n(t){
$("html, body").animate({
scrollTop:$("#js_btn_tab_"+t).offset().top
},500);
}
function c(){
return o;
}
var o="basic",d=["itemPreviewImage","itemProductName","itemColor","itemActionShop"],m=["itemDescList","itemBannerList"],_=["itemActionBanner","itemActionDesc","itemActionCell","itemActionRecommendProduct"];
i.exports={
init:s,
showTab:a,
scrollToTab:n,
getSelectedName:c,
basicItems:d,
detailItems:m,
advancedItems:_
};
});