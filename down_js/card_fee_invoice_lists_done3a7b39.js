define("cardticket/card_fee_invoice_lists_done.js",["common/qq/queryString.js","biz_common/moment.js","common/wx/popover.js","common/wx/Cgi.js","common/wx/popup.js","cardticket/common_template_helper.js","common/wx/report_util.js"],function(e){
"use strict";
function t(){
m=jQuery(template.render("js_exceed_download_pop",{})).popup({
title:"提示",
autoShow:!1,
buttons:[{
text:"关闭",
type:"primary",
click:function(){
m.popup("hide");
}
}]
});
}
function o(){
var e=window.location.href.replace("get_invoice_info_list","download_invoice_info_list");
jQuery("#js_download").attr("href",e).on("click",function(e){
var t=wx.cgiData.total_invoice_count;
return 0>=t?e.preventDefault():t>100?(m.popup("show"),e.preventDefault()):void 0;
});
}
function n(){
wx.cgiData.data.forEach(function(e){
if(3==e.status){
var t="#js_ask_"+e.id,o=new r({
dom:t,
isToggle:!0,
content:e.refuse_reason||"无"
});
o.hide();
}
});
}
var i=e("common/qq/queryString.js"),a=e("biz_common/moment.js"),r=e("common/wx/popover.js"),c="YYYY-MM-DD",l=a().add("d",-7).unix(),s=a().unix(),u=(e("common/wx/Cgi.js"),
new i);
e("common/wx/popup.js"),e("cardticket/common_template_helper.js"),$(".js_typeSelect").click(function(){
var e=$(this).attr("type");
location.href=u.replace("coin_type",e).getUrl();
}),wx.cgiData.data.filter=wx.cgiData.filter,$("#js_invoices_list").html(template.render("js_invoice_list_item_tpl",{
invoices:wx.cgiData.data
}));
var _=e("common/wx/report_util.js");
wx.cgiData.total_invoice_count>wx.cgiData.page_count&&_.initPager({
currentPage:wx.cgiData.page,
total_count:wx.cgiData.total_invoice_count,
count:wx.cgiData.page_count,
callback:function(e){
var t=wx.cgiData.page_count,o=(e-1)*t;
location.href=u.replaceAll({
page:e,
begin:o
}).getUrl();
}
});
var p=wx.cgiData.filter;
p.lower_time=p.lower_time?p.lower_time:l,p.upper_time=p.upper_time?p.upper_time:s,
_.initDateRange({
begintime:a.unix(p.lower_time).format(c),
endtime:a.unix(p.upper_time).format(c),
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(e,t){
location.href=u.replaceAll({
lower_time:a(e,c).unix(),
upper_time:a(t,c).add("d",1).unix()-1
}).getUrl();
}
}),_.initRankOnce({
container:".js_rankFlag",
sortkey:2,
sorttype:1==p.sort_type?1:0,
callback:function(e){
var t=e.sortkey,o=e.sorttype;
2==t&&(location.href=u.replace("sort_type",1==o?1:2).getUrl());
}
}),1==p.sort_type?jQuery(".js_rankFlag").addClass("single_up"):2==p.sort_type&&jQuery(".js_rankFlag").addClass("single_down"),
jQuery(document).on("mouseover",".js_ask_icon",null,function(){
var e=jQuery(this).parent().find(".js_refuse_reason");
jQuery(".js_refuse_reason").hide(),e.show();
}),jQuery(document).on("mouseleave","tr",null,function(){
jQuery(this).find(".js_refuse_reason").hide();
}),jQuery(document).on("mouseleave",".js_refuse_reason",null,function(){
jQuery(this).hide();
});
var m=null;
t(),o(),n();
});