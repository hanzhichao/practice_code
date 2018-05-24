define("wifi/homepage_list.js",["wifi/top.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js"],function(i){
"use strict";
i("wifi/top.js"),i("common/wx/popup.js");
var t=(i("common/wx/Cgi.js"),i("common/wx/Tips.js"),i("common/wx/pagebar.js")),e=$("#js_list");
e.html(template.render("js_list_tpl",{
list:wx.cgiData.list
})),e.on("click",".js_preview",function(){
var i=$(this).data("shop_id"),t=$(this).data("shop_name"),e=$(this).data("branch_name"),o=$(this).data("preview_url"),s=t+(e?"（"+e+"）":"");
$(template.render("js_preview_tpl",{
name:s,
preview_url:o
})).popup({
title:"预览主页",
buttons:[{
text:"去配置商家主页",
type:"primary",
click:function(){
location.href=wx.url("/wifi/wifihomepage?action=edit_ori_store_info&t=wifi/hmoepage_edit_tmpl&shop_id=%s".sprintf(i)),
this.remove();
}
}],
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
location.href=wx.url("/wifi/wifihomepage?action=get_ori_store_info_list&t=wifi/homepage_list_tmpl&page_idx=%s&page_size=10".sprintf(i.currentPage));
}
});
});