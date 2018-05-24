define("shop/weapp_config_tester_new.js",["common/wx/top.js","user/common_template_helper.js","user/add_user.js","user/unbind_user.js"],function(e){
"use strict";
var t=e("common/wx/top.js");
template.helper("$https",function(e){
return e.replace(/^http:\/\//,"https://");
}),e("user/common_template_helper.js"),template.helper("$https",function(e){
return e.replace(/^http:\/\//,"https://");
}),$("#js_table_container").html(template.render("js_table_tpl",{
data:wx.cgiData.data
})),function(){
var e=t.DATA.shop;
new t("#topTab",e).selected("weapp_shop_weapp_management");
}();
var n=e("user/add_user.js"),a=$("#js_add_user");
a.click(function(){
return $(this).hasClass("btn_disabled")?!1:void new n({
type:4,
left_bind_num:wx.cgiData.left_bind_num
});
}),0==wx.cgiData.left_bind_num&&a.addClass("btn_disabled");
var s=e("user/unbind_user.js");
$("#js_table_container").on("click",".js_unbind_user",function(){
var e=$(this);
new s({
openid:e.attr("data-openid"),
type:e.attr("data-type"),
nick_name:e.attr("data-nickname")
});
}).on("click",".js_icon_show_op",function(e){
$(this).find(".js_unbind_user_drop").toggle(),e.stopPropagation();
}),$(document).on("click",function(){
$(".js_unbind_user_drop").hide();
});
});