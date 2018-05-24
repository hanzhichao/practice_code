define("shop/myshelf.js",["common/wx/top.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","shop/shelf_cgi.js","common/wx/dialog.js","common/wx/tooltips.js","common/wx/tooltip.js","shop/feedback.js","common/wx/qrcode_download.js","common/qq/jquery.plugin/zclip.js"],function(t){
"use strict";
var o=t("common/wx/top.js"),e=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js"),i=template.render,s=t("common/wx/pagebar.js"),c=t("shop/shelf_cgi.js"),a=(t("common/wx/dialog.js"),
t("common/wx/tooltips.js")),l=t("common/wx/tooltip.js"),f=t("shop/feedback.js"),p=wx.cgiData;
t("common/wx/qrcode_download.js"),t("common/qq/jquery.plugin/zclip.js");
var r={};
!function(){
new o("#topTab",o.DATA.shop).selected(3),f();
}(),function(){
for(var t=p.shelves.length,o=[$("#appmsgList1"),$("#appmsgList2"),$("#appmsgList3")],e=0;t>e;e++){
r[p.shelves[e].id]=p.shelves[e];
var n=$(i("shelf_html",p.shelves[e]));
p.defaultShelfId&&p.shelves[e].id!=p.defaultShelfId&&n.find(".msg_card_default").hide(),
o[e%3].append(n);
}
}(),function(){
function t(){
n++,n>=o&&setTimeout(function(){
new l({
dom:$("#appmsgList").find(".js_tooltip"),
position:{
x:0,
y:10
}
});
},100);
}
var o=p.shelves.length,n=0;
$(".js_tmplWrapper").each(function(){
var o=$(this),n=o.data("shelfid");
e.get({
url:"/merchant/rendershelf?shelf_id="+n,
mask:!1,
error:function(){
t();
}
},function(e){
e.shelf_info&&e.shelf_info.template&&(o.append(e.shelf_info.template.http2https()),
o.find(".shop_modele_mask").remove(),o.find("a").attr("href","javascript:;"),o.find("img").each(function(){
var t=$(this),o=1*t.data("ratio");
o&&t.height(t.width()*o);
})),t();
});
});
}(),function(){
$(".js_copyLink").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
var t=$(this).data("shelfid");
return"http://mp.weixin.qq.com/bizmall/mallshelf?id=&t=mall/list&biz=%s&shelf_id=%s&showwxpaytitle=1#wechat_redirect".sprintf(p.biz,t);
},
afterCopy:function(){
n.suc("复制链接成功");
}
});
}(),function(){
$(".js_delete").each(function(){
var t=this,o=$(t).data("shelfid");
new a({
container:t,
content:"你确定要删除 %s 吗？".sprintf(r[o].name),
position:{
left:-83,
top:1
},
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
c.del(o,function(t){
0==+t.base_resp.ret?(n.suc("货架已删除"),$("#shelf_"+o).slideUp(function(){
$(this).remove(),location.reload();
})):n.err("货架删除失败");
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
});
}(),function(){
new s({
container:"#js_pagination",
perPage:p.count,
initShowPage:Math.ceil(p.offset/p.count)+1,
totalItemsNum:p.totalCount,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var o=t.currentPage;
return(o-1)*p.count!=p.offset&&(location.href=location.href.replace(/([\?&])offset=\d*/,"$1offset="+(o-1)*p.count)),
!1;
}
});
}(),function(){
$(".js_qrcodeDownload").qrcode_download({
title:"下载货架二维码"
});
}();
});