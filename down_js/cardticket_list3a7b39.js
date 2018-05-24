define("wifi/cardticket_list.js",["common/wx/popup.js","wifi/top.js","common/wx/pagebar.js"],function(i){
"use strict";
i("common/wx/popup.js"),i("wifi/top.js");
var t=i("common/wx/pagebar.js"),e=$("#js_list");
e.html(template.render("js_list_tpl",{
list:wx.cgiData.list
})),e.on("click",".js_preview",function(){
var i=$(this).data("preview_url");
$(template.render("js_preview_tpl",{
preview_url:wx.url("/wifi/wifimpcomm?action=get_qr_img&url="+window.encodeURIComponent(i))
})).popup({
title:"预览卡券投放页面",
onShow:function(){
this.resetPosition();
},
onHide:function(){
this.remove();
}
});
}),wx.cgiData.cnt>10&&new t({
container:$(".js_page"),
perPage:10,
totalItemsNum:wx.cgiData.cnt,
initShowPage:wx.cgiData.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
location.href=wx.url("/wifi/wificardmanager?action=get_store_card_list&t=wifi/cardticket_list_tmpl&page_idx=%s&page_size=10".sprintf(i.currentPage));
}
});
});