define("cardticket/add/logo.js",["common/wx/dialog.js","biz_web/ui/checkbox.js","cardticket/select_sub_merchant.js","common/qq/events.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t,e,a){
$("#js_logo_url_preview,#js_logo_url_preview_1").attr("src",e.http2https()),$("#js_logo_url_hidden").val(e.https2http()),
$("#js_brand_name_preview, #js_brand_name_preview_1").text(t),$("#js_brand_name_hidden").val(t),
$("#js_sub_merchant_id").val(a?a:""),window.card_is_sub_merchant=!!a,s.trigger("submit:sub_merchant_change",a);
}
function a(t){
return t.data.logo_url?!0:(n.show({
title:"提示",
type:"warn",
msg:"你的公众号还没有设置商户名称、商户Logo|点击“填写商户信息”进入修改页面。",
buttons:[{
text:"填写商户信息",
click:function(){
location.href=wx.url("/merchant/cardapply?action=listmerchantinfo&t=cardticket/apply_detail");
}
}]
}),!1);
}
function c(t){
$("#js_select_sub_merchant").click(function(){
return new _({
max_card:t.max_card,
is_sns_card:t.data.is_sns_card,
selectComplete:function(t,a){
e(a.BrandName,a.Logo,a.Id,2);
}
}).show(),!1;
});
e(t.data.brand_name,t.data.logo_url,t.data.sub_merchant_id),(t.data._is_global_editting||t.data.sub_merchant_id)&&s.trigger("submit:sub_merchant_change",t.data.sub_merchant_id);
}
var n=t("common/wx/dialog.js");
t("biz_web/ui/checkbox.js");
var _=t("cardticket/select_sub_merchant.js"),r=t("common/qq/events.js"),s=r(!0),o=(t("cardticket/common_template_helper.js"),
{
checkLogo:a,
initLogo:c
});
return o;
});