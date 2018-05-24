define("wifi/homemanager_list.js",["common/wx/pagebar.js","common/wx/Cgi.js","common/wx/popup.js","wifi/top.js"],function(i){
"use strict";
{
var t=i("common/wx/pagebar.js"),o=i("common/wx/Cgi.js");
i("common/wx/popup.js");
}
i("wifi/top.js");
var n=function(i){
function n(){
i.is_first&&!localStorage.getItem("__wifi_do_not_show_tip")?($(".js_list").hide(),
$(".js_intro").show(),$(".js_intro_go").click(function(){
o.get({
url:"/wifi/wifihomemanager?pluginuin=10034&action=confirm_list_tip"
},$.noop),localStorage.setItem("__wifi_do_not_show_tip",1),setTimeout(function(){
location.reload();
},200);
})):($(".js_list").show(),$(".js_intro").hide()),$(".js_modify").click(function(){
location.href=wx.url("/wifi/wifihomemanager?pluginuin=10034&action=modify&poi_key=%s".sprintf($(this).data("key")));
}),$(".js_view").click(function(){
{
var i=$(this).parent().parent().find(".js_poi_name").text(),t=$(this).data("key");
$("#tpl_view").popup({
title:"预览主页",
data:{
name:i
},
buttons:[{
text:"去配置商家主页",
type:"primary",
click:function(){
this.$dialogWrp.find(".js_btn:eq(0)").btn(!1),location.href=wx.url("/wifi/wifihomemanager?pluginuin=10034&action=modify&poi_key=%s".sprintf(t));
}
},{
text:"关闭",
click:function(){
this.hide();
}
}],
onShow:function(){
var i=this.$dialogWrp.find(".js_view_qrcode"),o=200;
i.attr("src",wx.url("/wifi/wifihomemanager?pluginuin=10034&action=barpage_qrimg&poi_key=%s&width=%s".sprintf(t,o)));
}
});
}
});
new t({
container:".js_page",
perPage:10,
totalItemsNum:i.total,
initShowPage:i.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
location.href=location.href.replace(/([\?&])page_idx=\d*/,"$1page_idx="+i.currentPage);
}
});
}
return{
init:n
};
}(wx.cgiData);
n.init();
});