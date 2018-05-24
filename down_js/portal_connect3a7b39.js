define("wifi/portal_connect.js",["wifi/top.js","common/wx/pagebar.js"],function(t){
"use strict";
t("wifi/top.js");
var i=t("common/wx/pagebar.js");
$(".js_list").html(template.render("js_list_tpl",{
list:wx.cgiData.list
})),wx.cgiData.shop_cnt>10&&new i({
container:$(".js_page"),
perPage:10,
totalItemsNum:wx.cgiData.shop_cnt,
initShowPage:wx.cgiData.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
location.href=wx.url("/wifi/wificonnmanager?action=get_conn_portal_list&page_idx=%s&page_size=10".sprintf(t.currentPage));
}
});
});