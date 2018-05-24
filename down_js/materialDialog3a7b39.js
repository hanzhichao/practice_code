define("material/materialDialog.js",["common/wx/popup.js","widget/msg_list.css","material/material_cgi.js","common/wx/pagebar.js","tpl/material/material_dialog/layout.html.js","tpl/material/material_dialog/item.html.js","biz_common/moment.js","common/qq/Class.js"],function(a){
"use strict";
a("common/wx/popup.js"),a("widget/msg_list.css");
var i=a("material/material_cgi.js"),t=a("common/wx/pagebar.js"),l=a("tpl/material/material_dialog/layout.html.js"),e=a("tpl/material/material_dialog/item.html.js"),o=a("biz_common/moment.js"),s=a("common/qq/Class.js"),m={
type:10,
begin:0,
count:10
};
template.helper("material_mtime",function(a){
return""==a||0==a?"-":o.unix(a).format("YYYY.MM.DD HH:mm");
});
var n=s.declare({
init:function(){},
show:function(a){
this.dialog&&(this.dialog.popup("remove"),this.dialog=null),a=$.extend({},!0,m,a);
var o=a.begin,s=a.count,n=a.type,r=this,d=wx.T(l,{
url:wx.url("/merchant/ad_material?t=material/edit&action=edit_material")
}).trim();
this.dialog=$(d).popup({
title:"选择推广页",
className:"pop_msg",
width:720
});
var p=this.dialog.popup("get");
p.addClass("pb_hidden"),i.getSingleList(n,o,s,function(i){
i.material_info_list&&i.material_info_list.length>0?(p.removeClass("pb_hidden"),
p.find(".js_title").show(),p.find(".js_list").html(wx.T(e,{
list:i.material_info_list,
biz:wx.data.uin_base64
}))):(p.find(".js_loading").hide(),p.find(".js_no_data").show(),p.addClass("pb_hidden")),
r.dialog.popup("resetPosition"),p.on("click",".js_choose_appmsg",function(){
var t=$(this),l=t.data("idx"),e=i.material_info_list[l];
a.callback&&a.callback(e),r.dialog.popup("remove"),r.dialog=null;
});
var l=o/s+1;
i.total_num<=s?p.addClass("pb_hidden"):new t({
container:p.find(".pageNavigator"),
perPage:s,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o/s+1,
totalItemsNum:i.total_num,
callback:function(i){
var t=i.currentPage;
t!=l&&(a.begin=s*(t-1),r.show(a));
}
});
}),this.dialog.popup("show");
}
});
return n;
});