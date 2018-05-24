define("wifi/scan_connect.js",["wifi/top.js","common/wx/pagebar.js"],function(i){
"use strict";
i("wifi/top.js");
var t=i("common/wx/pagebar.js");
$(".js_list").html(template.render("js_list_tpl",{
list:wx.cgiData.list
})),wx.cgiData.shop_cnt>10&&new t({
container:$(".js_page"),
perPage:10,
totalItemsNum:wx.cgiData.shop_cnt,
initShowPage:wx.cgiData.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
location.href=wx.url("/wifi/wificonnmanager?action=get_conn_qrcode_list&page_idx=%s&page_size=10".sprintf(i.currentPage));
}
});
});