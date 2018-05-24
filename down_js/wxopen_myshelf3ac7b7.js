define("shop/wxopen_myshelf.js",["common/wx/popup.js","common/wx/top.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js","common/wx/pagebar.js","shop/shelf_cgi.js","biz_common/moment.js","common/wx/dialog.js","common/wx/tooltips.js","common/wx/tooltip.js","shop/feedback.js","common/qq/jquery.plugin/zclip.js"],function(e){
"use strict";
e("common/wx/popup.js");
var t=e("common/wx/top.js"),o=e("common/wx/Cgi.js"),i=e("common/wx/Tips.js"),n=e("common/wx/qrcheck_weapp.js"),s=template.render,a=e("common/wx/pagebar.js"),c=e("shop/shelf_cgi.js"),r=e("biz_common/moment.js"),l=(e("common/wx/dialog.js"),
e("common/wx/popup.js"),e("common/wx/tooltips.js")),f=e("common/wx/tooltip.js"),p=e("shop/feedback.js"),m=wx.cgiData;
e("common/qq/jquery.plugin/zclip.js");
var u={};
!function(){
new t("#topTab",t.DATA.shop).selected(3),p();
}(),function(){
if(m.wxa_pub_info&&m.wxa_pub_info.info){
var e=m.wxa_pub_info.info;
e.pub_time=r(1e3*m.wxa_pub_info.pub_time).format("YYYY年MM月DD日 HH:mm"),e.visit_status=m.wxa_pub_info.visit_status,
e.qrcode=wx.url("/misc/wxaqrcode?action=show&type=2");
var t=$(s("shelf_pub_html",e));
$("#js_shelfPub").html(t);
}
var o=!0;
if(m.audit_info&&m.audit_info.info){
var e=m.audit_info.info;
e.oper_time=r(1e3*m.audit_info.oper_time).format("YYYY年MM月DD日 HH:mm"),e.qrcode=wx.url("/merchant/code_manager?action=get_exp_qrcode&path="+encodeURIComponent("pages/shelf/shelf?shelfid="+e.id));
var i=$(s("shelf_audit_html",e));
$("#js_shelfAudit").html(i),1==e.check_status&&(o=!1);
}
for(var n=m.shelves.length,a=[$("#appmsgList1"),$("#appmsgList2"),$("#appmsgList3")],c=0,l=0;n>l;l++)if(0==m.shelves[l].check_status){
u[m.shelves[l].id]=m.shelves[l],m.shelves[l].showAudit=o;
var f=$(s("shelf_html",m.shelves[l]));
m.defaultShelfId&&m.shelves[l].id!=m.defaultShelfId&&f.find(".msg_card_default").hide(),
a[c%3].append(f),c++;
}
}(),function(){
function e(){
i++,i>=t&&setTimeout(function(){
new f({
dom:$("#appmsgList").find(".js_tooltip"),
position:{
x:0,
y:10
}
});
},100);
}
var t=m.shelves.length,i=0;
$(".js_tmplWrapper").each(function(){
var t=$(this),i=t.data("shelfid");
o.get({
url:"/merchant/rendershelf?shelf_id="+i,
mask:!1,
error:function(){
e();
}
},function(o){
o.shelf_info&&o.shelf_info.template&&(t.append(o.shelf_info.template.http2https()),
t.find(".shop_modele_mask").remove(),t.find("a").attr("href","javascript:;"),t.find(".banner_bg").hide(),
t.find("img").each(function(){
var e=$(this),t=1*e.data("ratio");
t&&e.height(e.width()*t);
})),e();
});
});
}(),function(){
$(".js_copyLink").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
var e=$(this).data("shelfid");
return"http://mp.weixin.qq.com/bizmall/mallshelf?id=&t=mall/list&biz=%s&shelf_id=%s&showwxpaytitle=1#wechat_redirect".sprintf(m.biz,e);
},
afterCopy:function(){
i.suc("复制链接成功");
}
});
}(),function(){
$(".js_audit").click(function(){
var e=$(this),t=e.data("shelfid");
o.post({
url:"/merchant/code_manager?action=submit_check",
data:{
shelf_id:t
},
mask:!1,
error:function(){
i.err("审核提交失败");
}
},function(e){
e.base_resp&&0==e.base_resp.ret?(i.suc("审核提交成功"),location.reload(!0)):(i.err("审核提交失败"),
o.handleRet(e,{
id:64462,
key:95,
url:"/merchant/code_manager?action=submit_check"
}));
});
});
}(),function(){
$(".js_unaudit").click(function(){
var e=$(this),t=e.data("shelfid");
o.post({
url:"/merchant/code_manager?action=undo_check",
data:{
shelf_id:t
},
mask:!1,
error:function(){
i.err("撤销审核失败");
}
},function(e){
e.base_resp&&0==e.base_resp.ret?(i.suc("撤销审核成功"),location.reload(!0)):i.err("提交审核失败");
});
});
}();
var h=function(e,t){
var o=new n.initPopup({
size:165,
data:{
data:"",
extra:"",
typeid:e
},
msgData:{
name:"管理员"
},
showImgInfo:!0,
cgiURI:"/cgi-bin/safeqrcode",
onSuccess:function(e){
o.popup.popup("remove"),t(e);
},
onMsgUpdate:function(){}
});
o.load();
};
!function(){
$(".js_pub").click(function(){
var e=$(this),t=e.data("shelfid");
$("#js_dialog_shelf_operation").popup({
title:"温馨提示",
data:{
title:"确认上架小店小程序吗？",
text:"设置上架后小程序允许被搜索到，用户可在微信内通过名称搜索到小程序帐号。设置将在5分钟内生效。"
},
buttons:[{
text:"确认上架",
click:function(){
this.remove(),h(6,function(e){
o.post({
url:"/merchant/code_manager?action=release",
data:{
shelf_id:t,
ticket:e
},
mask:!1,
error:function(){
i.err("发布失败");
}
},function(e){
e.base_resp&&0==e.base_resp.ret?(i.suc("发布成功"),location.reload(!0)):i.err("发布失败");
});
});
},
type:"primary"
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}],
close:function(){
this.remove();
}
});
});
}(),function(){
$(".js_offline").click(function(){
var e=$(this),t=e.data("shelfid");
$("#js_dialog_shelf_operation").popup({
title:"温馨提示",
data:{
title:"确认下架小店小程序吗？",
text:"设置下架后小程序不允许被搜索到，用户将不可在微信内通过名称搜索到小程序帐号。设置将在5分钟内生效。"
},
buttons:[{
text:"确认下架",
click:function(){
this.remove(),h(7,function(e){
o.post({
url:"/merchant/code_manager?action=offline",
data:{
shelf_id:t,
ticket:e
},
mask:!1,
error:function(){
i.err("下架失败");
}
},function(e){
e.base_resp&&0==e.base_resp.ret?(i.suc("下架成功"),location.reload(!0)):i.err("下架失败");
});
});
},
type:"primary"
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}],
close:function(){
this.remove();
}
});
});
}(),function(){
$(".js_delete").each(function(){
var e=this,t=$(e).data("shelfid");
new l({
container:e,
content:"你确定要删除 %s 吗？".sprintf(u[t].name),
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
c.del(t,function(e){
0==+e.base_resp.ret?(i.suc("货架已删除"),$("#shelf_"+t).slideUp(function(){
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
});
});
}(),function(){
new a({
container:"#js_pagination",
perPage:m.count,
initShowPage:Math.ceil(m.offset/m.count)+1,
totalItemsNum:m.totalCount,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=e.currentPage;
return(t-1)*m.count!=m.offset&&(location.href=location.href.replace(/([\?&])offset=\d*/,"$1offset="+(t-1)*m.count)),
!1;
}
});
}(),function(){
$(".js_qrcodeDownload").click(function(){
{
var e=$(this).data("shelfid");
$(s("js_dialog_exp_version",{
qrcode:wx.url("/merchant/code_manager?action=get_exp_qrcode&path="+encodeURIComponent("pages/shelf/shelf?shelfid="+e))
})).popup({
title:"体验二维码",
width:960,
className:"qrcode_download",
buttons:[{
text:"下载体验码",
click:function(){
this.hide(),window.open(wx.url("/merchant/code_manager?action=down_qrcode&path="+encodeURIComponent("pages/shelf/shelf?shelfid="+e)));
},
type:"primary"
},{
text:"取消体验",
click:function(){
this.hide();
},
type:"default"
}],
onHide:function(){
this.remove();
}
});
}
});
}();
});