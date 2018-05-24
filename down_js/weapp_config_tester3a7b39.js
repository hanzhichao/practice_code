define("shop/weapp_config_tester.js",["common/wx/top.js","user/common_template_helper.js","user/add_user.js","user/unbind_user.js"],function(t){
"use strict";
var e=t("common/wx/top.js");
template.helper("$https",function(t){
return t.replace(/^http:\/\//,"https://");
}),t("user/common_template_helper.js"),template.helper("$https",function(t){
return t.replace(/^http:\/\//,"https://");
}),$("#js_table_container").html(template.render("js_table_tpl",{
data:wx.cgiData.data
})),function(){
var t=e.DATA.shop;
new e("#topTab",t).selected("weapp_shop_weapp_management");
}();
var n=t("user/add_user.js"),a=$("#js_add_user");
a.click(function(){
return $(this).hasClass("btn_disabled")?!1:void new n({
type:4,
left_bind_num:wx.cgiData.limit-wx.cgiData.total
});
}),$(".send_num").text(wx.cgiData.limit-wx.cgiData.total),0==wx.cgiData.left_bind_num&&a.addClass("btn_disabled");
var s=t("user/unbind_user.js");
$("#js_table_container").on("click",".js_unbind_user",function(){
var t=$(this);
new s({
type:4,
openid:t.attr("data-openid")
});
}).on("click",".js_icon_show_op",function(t){
$(this).find(".js_unbind_user_drop").toggle(),t.stopPropagation();
}),$(document).on("click",function(){
$(".js_unbind_user_drop").hide();
});
});