define("biztransfer/order.js",["biztransfer/common.js","common/wx/popup.js","biz_common/moment.js"],function(t){
"use strict";
t("biztransfer/common.js"),t("common/wx/popup.js");
var e=(t("biz_common/moment.js"),wx.cgiData.order_list[0]||{
order_detail:{},
audit_detail:{},
origin_confirm_status:{},
target_confirm_status:{},
invoice:{}
});
wx.cgiData.current_order=e,$("#js_top_container").html(template.render("js_top_tpl",{
current_order:e
})),$("#js_main").html(template.render("js_main_tpl",wx.cgiData)).on("click",".js_item",function(){
$("#js_main .js_item_detail").hide().removeClass("item_detail_open"),$(this).next(".js_item_detail").show().addClass("item_detail_open"),
$("#js_main .js_item").removeClass("detail_open"),$(this).addClass("detail_open");
}),$("#js_main").on("click",".js_insertToPackage",function(){
var t=$(this).data("order_id");
$('<div style="text-align: center;"><img class="js_qrcode" width="400" height="400"></div>').popup({
title:"扫码插入卡包",
onShow:function(){
var e=this;
this.get().find(".js_qrcode").onload=function(){
e.resetPosition();
},this.get().find(".js_qrcode").attr("src","/merchant/order?action=get_card_auth_qrcode&order_id="+t+"&token="+wx.data.t);
}
});
});
});