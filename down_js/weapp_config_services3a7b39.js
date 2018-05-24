define("shop/weapp_config_services.js",["common/wx/top.js","user/common_template_helper.js","user/add_user.js","user/unbind_user.js"],function(e){
"use strict";
var t=e("common/wx/top.js");
e("user/common_template_helper.js"),template.helper("$https",function(e){
return e.replace(/^http:\/\//,"https://");
}),function(){
var e=t.DATA.shop;
new t("#topTab",e).selected("weapp_shop_weapp_management");
}(),$("#js_table_container").html(template.render("js_table_tpl",{
data:cgiData.list
}));
var n=e("user/add_user.js"),s=$("#js_add_user");
s.click(function(){
return $(this).hasClass("btn_disabled")?!1:void new n({
type:5,
left_bind_num:cgiData.left_bind_num
});
}),0==cgiData.left_bind_num&&s.addClass("btn_disabled");
var a=e("user/unbind_user.js");
$("#js_table_container").on("click",".js_unbind_user",function(){
var e=$(this);
new a({
openid:e.attr("data-openid"),
type:5,
nick_name:e.attr("data-nickname"),
workid:e.attr("data-workid")
});
}).on("click",".js_icon_show_op",function(e){
$(this).find(".js_unbind_user_drop").toggle(),e.stopPropagation();
}),$(document).on("click",function(){
$(".js_unbind_user_drop").hide();
});
});