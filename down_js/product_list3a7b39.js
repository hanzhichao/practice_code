define("scan/product_list.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/top.js","common/wx/popup.js","common/wx/popover.js","common/wx/pagebar.js","biz_web/lib/json.js","common/qq/queryString.js","common/wx/qrcode_download.js"],function(t){
"use strict";
function e(t){
var e=t.tooltips.$dom.find(".btn");
e.hasClass("btn_disabled")||(e.eq(0).btn(0),e.eq(1).disable(),c.post({
url:"/merchant/scanproductrelease",
data:{
action:t.action,
keystandard:t.keystandard,
keystr:t.keystr
},
mask:!1,
error:function(){
l.err("系统错误，请重试"),e.eq(0).btn(1),e.eq(1).enable();
}
},function(a){
if(0==a.base_resp.ret){
var s="on"==t.action?"发布":"取消发布";
l.suc(""+s+"成功"),$("#js_div_list").find(".js_item").length<=1&&wx.cgiData.paging_info.page>1?location.href=(new m).replace("page",wx.cgiData.paging_info.page-1).getUrl():location.reload();
}else l.err("提交失败，请重试"),e.eq(0).btn(1),e.eq(1).enable();
}));
}
function a(t){
var e=t.tooltips.$dom.find(".btn");
e.hasClass("btn_disabled")||(e.eq(0).btn(0),e.eq(1).disable(),c.post({
url:"/merchant/scanproductdel",
data:{
keystandard:t.keystandard,
keystr:t.keystr
},
mask:!1,
error:function(){
l.err("系统错误，请重试"),e.eq(0).btn(1),e.eq(1).enable();
}
},function(t){
0==t.base_resp.ret?(l.suc("删除成功"),$("#js_div_list").find(".js_item").length<=1&&wx.cgiData.paging_info.page>1?location.href=(new m).replace("page",wx.cgiData.paging_info.page-1).getUrl():location.reload()):(l.err("提交失败，请重试"),
e.eq(0).btn(1),e.eq(1).enable());
}));
}
function s(){
for(var t=0;t<h.item_list.length;t++){
var e=new Date(1e3*h.item_list[t].update_time),a=e.getFullYear(),s=e.getMonth()+1,n=e.getDate(),i=e.getHours(),o=e.getMinutes();
s=10>s?"0"+s:s,n=10>n?"0"+n:n,i=10>i?"0"+i:i,o=10>o?"0"+o:o,h.item_list[t].date=a+"-"+s+"-"+n+" "+i+":"+o,
h.item_list[t].status=1*h.item_list[t].status,h.item_list[t].status_txt=g[h.item_list[t].status];
}
}
function n(){
if(new p("#js_div_toptab",p.DATA.scan).selected(1),$("#js_div_list").html(r("tpl_item_list",{
list:h.item_list,
keyword:h.keyword,
status:h.status
})),0!=h.status){
var t="所有";
h.status>1&&(t=g[h.status]),new d({
container:"#js_dropdown_status",
label:t,
data:[{
name:"所有",
value:"1"
},{
name:"待发布",
value:"2"
},{
name:"审核中",
value:"3"
},{
name:"未通过",
value:"4"
}],
callback:function(t){
return location.href=(new m).replace("status",t).getUrl(),!1;
}
});
}
var e=10,a=(new f({
container:"#js_div_pagebar",
perPage:e,
initShowPage:h.paging_info.page,
totalItemsNum:h.paging_info.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
return e!=h.paging_info.page&&(location.href=(new m).replace("page",e).getUrl()),
!0;
}
}),""===h.sort_order?1:1*h.sort_order);
0==a?$(".js_sort_list").find(".js_sort_flag").removeClass("single_down").addClass("single_up"):$(".js_sort_list").find(".js_sort_flag").removeClass("single_up").addClass("single_down"),
$(".js_sort_list").data("sort",a);
}
function i(){
$("#js_btn_reset_search").on("click",function(){
return location.href=(new m).replace("keyword","").replace("action","list").getUrl(),
!1;
}),$("#js_btn_search").on("click",function(){
$("#js_form_search").submit();
}),$("#js_form_search").on("submit",function(t){
t.preventDefault();
var e=$("#js_input_search").val();
return window.location="/merchant/scanproductlist?action=search&status="+h.status+"&keyword="+e+"&token="+wx.data.t+"&lang=zh_CN",
!1;
}),$(".js_qrcodeDownload").qrcode_download({
title:"下载二维码"
}),$("#js_div_list").find(".js_item").each(function(t){
var s=$(this).find(".js_btn_release"),n=$(this).find(".js_btn_delete"),i=$(this).find(".js_btn_cannot_edit"),o=s.data("action"),c=$(this).data("keystandard"),d=$(this).data("keystr"),l="取消发布后，用户无法扫出该商品信息。%s是否取消发布该商品？".sprintf("<br>");
"on"==o&&(l="确认发布后，该商品信息将所有用户可见。%s是否确认发布该商品？".sprintf("<br>")),i.on("click",function(){
var t=$(this).parents(".js_item").data("keystr");
return $("#tpl_cannot_edit").popup({
title:"操作异常",
width:600,
data:{
barcode:t
},
buttons:[{
text:"我知道了",
type:"primary",
click:function(){
this.hide();
}
}]
}),!1;
}),new _({
container:s,
content:l,
type:"click",
position:{
top:-5,
left:-145+s.width()/2
},
onclose:function(){},
buttons:[{
text:"是",
type:"btn_primary",
click:function(){
e({
action:o,
keystandard:c,
keystr:d,
tooltips:this
});
}
},{
text:"否",
type:"btn_default",
click:function(){
0==this.$dom.find(".btn").eq(1).hasClass("btn_disabled")&&this.hide();
}
}]
}),new _({
container:n,
content:"商品删除后将无法恢复，是否确认删除？",
type:"click",
position:{
top:-5,
left:-145+n.width()/2
},
onclose:function(){},
buttons:[{
text:"是",
type:"btn_primary",
click:function(){
a({
keystandard:c,
keystr:d,
tooltips:this
});
}
},{
text:"否",
type:"btn_default",
click:function(){
0==this.$dom.find(".btn").eq(1).hasClass("btn_disabled")&&this.hide();
}
}]
}),h.item_list[t]&&h.item_list[t].barcode_url&&0==h.status&&new _({
container:$(this).find(".js_btn_showcode"),
content:r("tpl_item_code",{
url:h.item_list[t].barcode_url
}),
parentClass:"arrow_left qrcode_preview",
type:"hover",
position:{
top:-35,
left:$(this).find(".js_btn_showcode").width()+5
},
onclose:function(){},
buttons:[]
});
}),$("#js_div_list").find(".js_tips_reason").each(function(){
var t=new u({
dom:$(this),
content:$(this).data("reason"),
isToggle:!0,
onShow:function(){
this.resetPosition();
}
});
t.hide();
}),$(".js_sort_flag").length>0&&$(".js_sort_list").on("click",function(){
var t=1*$(this).data("sort"),e=(t+1)%2;
0==e?$(this).find(".js_sort_flag").removeClass("single_down").addClass("single_up"):$(this).find(".js_sort_flag").removeClass("single_up").addClass("single_down"),
$(this).data("sort",e),location.href=(new m).replace("sort_order",e).getUrl();
});
var t;
if($("body").on("click",".js_btn_add",function(){
$("#tpl_add_product").popup({
title:"输入条码",
width:600,
className:"create_product_dlg",
data:{},
buttons:[{
text:"确认",
click:function(){
var e=$(this.$dialogWrp[0]),a=e.find(".js_btn_p"),s={},n="",i="";
"4"==t.values()[0]?(i="4",n=$("#js_input_code").val()):(i="19",n=$("#js_input_no_code").val()),
s={
product_info:{
idx_info:{
keystandard:i,
keystr:n
}
}
},s.product_info=b.stringify2(s.product_info),a.btn(!1),c.post({
url:"/merchant/scanproductadd?action=check",
data:s
},function(t){
if(0==t.base_resp.ret)location.href="/merchant/scanproductinfo?action=new&keystandard="+t.keystandard+"&keystr="+t.keystr+wx.data.param;else{
a.btn(!0);
var e="系统错误，请重试";
switch(t.base_resp.ret){
case 200003:
e="提交超时，请稍后重试";
break;

case 200002:
e="该条形码不在你所在的厂商信息内";
break;

case 394:
e="该商品条形码已被删除，请核实";
break;

case 395:
e="未获得该商品条形码的使用权限，请先核实该条形码号段";
break;

case 396:
e="你输入的条码已被“%s”认领，可自行联系对方删除，或点此进行".sprintf(t.owner),e+='<a target="_blank" href="%s">'.sprintf(wx.url("/merchant/scanproductadd?action=appeal&keystandard="+i+"&keystr="+n+"&barcode_country_type"+t.barcode_country_type)),
e+="申诉</a>";
break;

case 398:
e="该商品条形码不存在，请核实";
break;

case 399:
e="你输入的条形码已在商品列表中，请%s直接编辑%s".sprintf('<a href="'+wx.url("/merchant/scanproductinfo?action=edit&keystandard="+i+"&keystr="+n)+'" target="_blank">',"</a>");
break;

case 400:
e="你申请的条码号段中不包含该条码权限，点此%s添加号段%s".sprintf('<a href="'+wx.url("/merchant/scanqualification?action=firmcatpage")+'" target="_blank">',"</a>");
break;

case 401:
e="请输入经营范围内的商品条形码";
break;

case 402:
e="请输入经营范围内的商品条形码";
break;

case 404:
e="你提交的商品不存在，请核对";
break;

case 405:
e="提交超时，请稍后重试";
break;

case 406:
e="提交超时，请稍后重试";
break;

case 407:
e="4"==i?"请输入正确的商品条形码":"请输入正确的商品二维码ID";
break;

case 408:
e="提交超时，请稍后重试";
break;

case 421:
e="你输入的条码已在申诉流程中，结果请关注通知中心";
break;

case 30:
case 200030:
e="商品详情有误，请核对";
break;

case 31:
case 200031:
e="商品详情有误，请核对";
break;

case 32:
case 200032:
e="自定义服务信息有误，请核对";
break;

default:
e=t.base_resp.err_msg;
}
"4"==i?$("#js_err_input_code").show().html(e):$("#js_err_no_code").show().html(e);
}
});
},
type:"primary"
}],
mask:!0,
onHide:function(){
$(this.$dialogWrp[0]);
this.remove();
},
onShow:function(){
var e=$(this.$dialogWrp[0]);
t=e.find(".frm_radio").checkbox({
onChanged:function(t){
$("#js_input_"+t.attr("hidevalue")).val("").attr({
disabled:"disabled"
}),$("#js_span_"+t.attr("hidevalue")).addClass("disabled"),$("#js_input_"+t.attr("checkvalue")).val("").removeAttr("disabled"),
$("#js_span_"+t.attr("checkvalue")).removeClass("disabled"),e.find(".js_msg_fail").hide();
}
}),e.find(".js_input_qrcode").on("keyup",function(){
e.find(".js_msg_fail").hide();
}),t.adjust("4");
}
});
}),0!=wx.cgiData.status&&wx.cgiData.claimelist_result_num>0);
}
function o(){
s(),n(),i();
}
var r=(wx.T,template.render),c=t("common/wx/Cgi.js"),d=(t("biz_web/ui/checkbox.js"),
t("biz_web/ui/dropdown.js")),l=t("common/wx/Tips.js"),_=t("common/wx/tooltips.js"),p=t("common/wx/top.js"),u=(t("common/wx/popup.js"),
t("common/wx/popover.js")),f=t("common/wx/pagebar.js"),b=t("biz_web/lib/json.js"),m=t("common/qq/queryString.js"),h=wx.cgiData;
t("common/wx/qrcode_download.js");
var g={
0:"已发布",
1:"待发布",
2:"待发布",
3:"审核中",
4:"未通过"
};
o();
});