define("cardticket/myshelf.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/dialog.js","common/wx/tooltips.js","common/wx/tooltip.js","common/wx/qrcode_download.js","common/qq/jquery.plugin/zclip.js","cardticket/topmenu.js","biz_common/utils/load3rdimg.js","cardticket/common_init.js"],function(t){
"use strict";
var e=template.render,o=t("common/wx/Cgi.js"),i=t("common/wx/Tips.js"),n=t("common/wx/pagebar.js"),s=(t("common/wx/dialog.js"),
t("common/wx/tooltips.js")),c=t("common/wx/tooltip.js"),a=wx.cgiData;
t("common/wx/qrcode_download.js"),t("common/qq/jquery.plugin/zclip.js");
var r={};
!function(){
t("cardticket/topmenu.js").selected("cardtools");
}();
var l=t("biz_common/utils/load3rdimg.js");
!function(){
for(var t=a.shelves.length,o=[$("#appmsgList1"),$("#appmsgList2"),$("#appmsgList3")],i=0;t>i;i++){
r[a.shelves[i].id]=a.shelves[i];
var n=$(e("shelf_html",a.shelves[i]));
o[i%3].append(n);
}
(t=0)&&$(".empty_shelf").show();
}(),function(){
function t(){
i++,i>=e&&setTimeout(function(){
new c({
dom:$("#appmsgList").find(".js_tooltip"),
position:{
x:0,
y:0
}
});
},100);
}
var e=a.shelves.length,i=0;
$(".js_tmplWrapper").each(function(){
var e=$(this),i=e.data("shelfid");
o.get({
url:"/merchant/cardshelf?action=render&shelf_id="+i,
mask:!1,
error:function(){
t();
}
},function(o){
o.shelf_info&&o.shelf_info.template&&(e.append(o.shelf_info.template.http2https()),
e.find(".shop_modele_mask").remove(),e.find("a").attr("href","javascript:;"),$(".js_norefer_img",e).each(function(){
var t=this,e=t.getAttribute("data-src")||"";
l({
img:t,
imgurl:e.replace(/^\s|\s$/,"")
});
})),t();
});
});
}(),function(){
$(".js_copyLink").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
var t=$(this).data("shelfid");
return"http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=%s&showwxpaytitle=1&biz=%s&t=cardticket/shelf_list&scene=1000007#wechat_redirect".sprintf(t,a.biz);
},
afterCopy:function(){
i.suc("复制链接成功");
}
});
}(),function(){
$(".js_delete").each(function(){
var t=this,e=$(t).data("shelfid");
new s({
container:t,
content:"你确定要删除 %s 吗？".sprintf(r[e].name),
position:{
left:-109,
top:-13
},
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
o.post({
url:"/merchant/cardshelf?action=del",
data:{
shelf_id:e
},
mask:!1
},function(t){
0==+t.base_resp.ret?(i.suc("货架已删除"),$("#shelf_"+e).slideUp(function(){
$(this).remove();
})):i.err("货架删除失败");
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
}),$(this).click(function(){
window.report_click_ele&&window.report_click_ele(this);
});
});
}(),function(){
new n({
container:"#js_pagination",
perPage:a.count,
initShowPage:Math.ceil(a.offset/a.count)+1,
totalItemsNum:a.totalCount,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
return(e-1)*a.count!=a.offset&&(location.href=location.href.replace(/([\?&])offset=\d*/,"$1offset="+(e-1)*a.count)),
!1;
}
});
}(),function(){
$(".js_qrcodeDownload").qrcode_download({
title:"下载货架二维码"
});
}(),t("cardticket/common_init.js");
});