define("wifi/homepage_finish_list.js",["wifi/top.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js"],function(i){
"use strict";
i("wifi/top.js"),i("common/wx/popup.js");
var t=i("common/wx/Cgi.js"),e=i("common/wx/pagebar.js"),a=$("#js_list");
a.html(template.render("js_list_tpl",{
list:wx.cgiData.list
})),a.on("click",".js_preview",function(){
var i=($(this).data("shop_id"),$(this).data("shop_name")),t=$(this).data("branch_name"),e=$(this).data("preview_url"),a=i+(t?"（"+t+"）":"");
$(template.render("js_preview_tpl",{
preview_url:e,
name:a
})).popup({
title:"预览配置完成页",
onHide:function(){
this.remove();
}
});
}),a.on("click",".js_clear",function(){
var i=$(this).data("shop_id");
t.post({
url:wx.url("/wifi/wifihomepage?action=clear_finish_page"),
data:{
shop_id:i
}
},function(i){
return i?void location.reload():void Tips.err("系统错误");
});
}),wx.cgiData.cnt>10&&new e({
container:$(".js_page"),
perPage:10,
totalItemsNum:wx.cgiData.cnt,
initShowPage:wx.cgiData.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
location.href=wx.url("/wifi/wifihomepage?action=get_finish_page_list&t=wifi/homepage_finish_list&page_idx=%s&page_size=10".sprintf(i.currentPage));
}
});
});