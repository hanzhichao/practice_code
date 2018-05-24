define("common/wx/media/appmsgDialog.js",["common/wx/popup.js","widget/msg_list.css","media/media_cgi.js","common/wx/pagebar.js","tpl/media/single_appmsg_dialog/layout.html.js","tpl/media/single_appmsg_dialog/item.html.js","media/appmsg_temp_url.js","common/qq/Class.js"],function(i){
"use strict";
i("common/wx/popup.js"),i("widget/msg_list.css");
var t=i("media/media_cgi.js").appmsg,s=i("common/wx/pagebar.js"),a=i("tpl/media/single_appmsg_dialog/layout.html.js"),o=i("tpl/media/single_appmsg_dialog/item.html.js"),e=i("media/appmsg_temp_url.js"),l=i("common/qq/Class.js"),p={
type:10,
begin:0,
count:10
},m=l.declare({
init:function(){},
show:function(i){
this.dialog&&(this.dialog.popup("remove"),this.dialog=null),i=$.extend({},!0,p,i);
var l=i.begin,m=i.count,n=i.type,g=this,c=wx.T(a,{}).trim();
this.dialog=$(c).popup({
title:"选择图文消息",
className:"pop_msg",
width:720
});
var d=this.dialog.popup("get");
t.getSingleList(n,l,m,function(t){
d.find(".js_title").show(),d.find(".js_list").html(wx.T(o,{
list:t.appmsg_desc
})),g.dialog.popup("resetPosition"),d.on("click",".js_choose_appmsg",function(){
var s=$(this),a=s.data("idx"),o=t.appmsg_desc[a];
o.title=o.title.html(!1),o.content_url=o.content_url.html(!1),i.callback&&i.callback(o),
g.dialog.popup("remove"),g.dialog=null;
}),e(d,".msg_info");
var a=l/m+1;
new s({
container:d.find(".pageNavigator"),
perPage:m,
first:!1,
last:!1,
isSimple:!0,
initShowPage:l/m+1,
totalItemsNum:t.total_cnt,
callback:function(t){
var s=t.currentPage;
s!=a&&(i.begin=m*(s-1),g.show(i));
}
});
}),this.dialog.popup("show");
}
});
return m;
});