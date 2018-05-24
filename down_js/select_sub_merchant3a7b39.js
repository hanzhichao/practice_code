define("cardticket/select_sub_merchant.js",["tpl/cardticket/select_sub_merchant.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","cardticket/select_sub_merchant_table.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js"],function(t){
"use strict";
{
var e=t("tpl/cardticket/select_sub_merchant.html.js"),o=(t("common/wx/popup.js"),
t("common/wx/Cgi.js"),t("common/wx/pagebar.js"),t("cardticket/select_sub_merchant_table.js"));
t("common/wx/Tips.js"),t("biz_web/ui/checkbox.js"),t("cardticket/common_template_helper.js");
}
e=template.compile(e);
var n={
multi:!1,
title:"选择子商户"
},c=function(t){
this.opt=$.extend(!0,{},n,t),this.init();
};
return c.prototype={
init:function(){
var t=this.opt,n=this;
n.$popup=$(e()).popup({
autoShow:!1,
title:t.title,
width:956,
className:"align_edge",
onOK:function(){
var e=n.subMerchantSelector.selectedValue();
return e?void t.selectComplete.call(n,e.Id,e):!0;
},
onCancel:function(){},
onHide:function(){
this.remove(),t.onHide.call(n);
}
}),t.resetPosition=function(){
n.$popup.popup("resetPosition");
},t.getDataComplete=function(t){
var e=n.$popup.popup("get");
t&&t.length?$(e.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(e.find(".js_btn_p")[0]).addClass("btn_disabled");
};
var c=n.$popup.find(".js_sub_merchant_list");
t.container=c,n.subMerchantSelector=new o(t);
},
show:function(){
this.$popup.popup("show");
},
destroy:function(){
this.$popup.popup("remove");
}
},c;
});