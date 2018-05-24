define("cardticket/card_fee_invoice_orders_list.js",["common/qq/queryString.js","biz_common/moment.js","common/wx/dialog.js","common/wx/Cgi.js","cardticket/card_fee_order_detail.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/popup.js","cardticket/common_validate.js","cardticket/common_template_helper.js","common/wx/report_util.js"],function(e){
"use strict";
function t(){
var e=[];
s()&&wx.cgiData.data.each(function(t){
e.push(t.id);
}),i(e);
}
function n(){
wx.cgiData.data.each(function(e){
rt[e.id]=e;
});
}
function i(e){
it=e,p();
}
function o(e){
it.push(e),p();
}
function c(e){
for(var t=0,n=it.length;n>t;t++){
var i=it[t];
if(i===e){
it.splice(t,1);
break;
}
}
p();
}
function r(){
return jQuery.extend([],it);
}
function a(e){
var t=B(1e3*e);
return t.year()==B().year()&&t.month()==B().month();
}
function p(){
it.length?(ht||u(),it.length===wx.cgiData.data.length?jQuery("#js_check_all").checkbox("checked",!0):jQuery("#js_check_all").checkbox("checked",!1)):(jQuery("#js_check_all").checkbox("checked",!1),
_()),jQuery("input.js_order_checkbox").checkbox("checked",!1),ot=0,it.each(function(e){
var t=jQuery("#js_order_"+e);
if(!a(t.data("time"))){
t.checkbox("checked",!0);
var n=+t.attr("data-money");
n&&(ot+=n);
}
}),ut&&ut.find(".js_money").html((ot/100).toFixed(2));
}
function u(){
at=!0,s()&&jQuery("#js_make_invoice").removeClass("btn_disabled");
}
function _(){
at=!1,jQuery("#js_make_invoice").addClass("btn_disabled");
}
function s(){
var e=(new Date).getDate();
return 7>=e;
}
function l(){
jQuery("input[type=checkbox]").checkbox(),d(),f(),m(),D(),q(),I();
}
function d(){
var e=jQuery("#js_check_all");
e.checkbox({
onChanged:function(e){
e.prop("checked")?t():i([]);
}
});
}
function f(){
jQuery("input.js_order_checkbox").checkbox({
onChanged:function(e){
var t=e.attr("data-id");
e.prop("checked")?o(t):c(t);
}
});
s()||(jQuery("input.js_order_checkbox").checkbox("disabled","disabled"),jQuery("#js_check_all").checkbox("disabled","disabled")),
$("input.js_order_checkbox").each(function(){
a($(this).data("time"))&&$(this).checkbox("disabled","disabled");
}),0===$("input.js_order_checkbox:enabled").length&&($("#js_check_all").checkbox("checked",!1),
$("#js_check_all").checkbox("disabled","disabled"));
}
function m(){
h(),y(),C();
}
function h(){
pt=jQuery(template.render("js_processing_pop",{})).popup({
title:"确认开票",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:b
},{
text:"取消",
click:b
}]
});
}
function j(){
function e(){
var e=v();
ut.form=e.form,ut.popup("get").find("div.dialog_bd").html(e);
}
var t=!1,n=v();
ut=jQuery(n).popup({
title:"确认开票",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
return t?alert("请完成信息填写，并确定"):void(dt||Y());
}
},{
text:"取消",
click:Q
}]
}),ut.on("click","a.js_change_info",null,function(e){
e.preventDefault(),t=!0,ut.find("div.js_send_info").hide(),ut.find("div.js_send_info_form").show();
}),ut.on("click","a.js_change_cancel",null,function(n){
n.preventDefault(),dt||(t=!1,e());
}),ut.on("click","a.js_change_sure",null,function(n){
n.preventDefault();
var i=ut.find("form").serialize(),o=w(i);
ut.form.valid()&&g(o,function(){
t=!1,jQuery.extend(lt,o),e();
},function(){});
}),e();
}
function g(e,t,n){
dt||(dt=!0,e=jQuery.extend({},e),e.recipient_phone=e.recipient_tel,delete e.recipient_tel,
x(),L.post({
url:wx.url("/merchant/cardmoneyinvoicemgr?action=update_recipient_info"),
data:e,
success:function(e){
0!=e.base_resp.ret?(L.show(e),n(e)):t(e);
},
complete:function(){
dt=!1,x();
}
}));
}
function x(){
dt?ut.find(".js_change_sure").text("保存中...").addClass("btn_disabled"):ut.find(".js_change_sure").text("确认").removeClass("btn_disabled");
}
function y(){
_t=jQuery(template.render("js_success_pop",{})).popup({
title:"确认开票",
autoShow:!1,
buttons:[{
text:"关闭",
type:"primary",
click:function(){
k();
}
}]
});
}
function k(){
_t.popup("hide");
var e=wx.cgiData.total_order_count-it.length,t=wx.cgiData.page_count,n=parseInt(e/t);
e%t!==0&&n++;
var i=wx.cgiData.page;
i>n&&(i=n);
var o=(i-1)*t;
location.href=Z.replaceAll({
page:i,
begin:o,
count:t
}).getUrl();
}
function w(e){
var t=e.split("&"),n={};
return t.each(function(e){
var e=e.split("=");
n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);
}),n;
}
function v(){
var e=jQuery.extend({
total_money:(ot/100).toFixed(2),
signature:ct
},lt),t=jQuery(template.render("js_valid_pop",e)),n=t.find("form");
return t.form=n,n.validate({
rules:{
recipient_name:"required",
recipient_address:"required",
recipient_post_code:{
required:!0,
posnum:!0
},
recipient_tel:{
required:!0,
service_phone:!0
}
},
messages:{
recipient_name:"姓名不能为空",
recipient_address:"地址不能为空",
recipient_tel:"请输入11位手机号或带区号座机号",
recipient_post_code:"请输入正确的邮编"
}
}),t;
}
function b(){
pt.popup("hide");
}
function Q(){
ut.popup("hide");
}
function D(){
$("#js_make_invoice").on("click",S);
}
function C(){
st=jQuery(template.render("js_exceed_download_pop",{})).popup({
title:"提示",
autoShow:!1,
buttons:[{
text:"关闭",
type:"primary",
click:function(){
st.popup("hide");
}
}]
});
}
function q(){
var e=window.location.href.replace("get_order_info_list","download_order_info_list");
jQuery("#js_download").attr("href",e).on("click",function(e){
var t=wx.cgiData.total_order_count;
return 0>=t?e.preventDefault():t>100?(st.popup("show"),e.preventDefault()):void 0;
});
}
function S(){
var e=r();
if(0!==e.length&&s())return wx.cgiData.is_invoice_tmpl_complete?mt?(R(),ft=!0):void(U()?ut.popup("show"):pt.popup("show")):(K.show({
msg:"发票信息不全请补充",
buttons:[{
text:"去补充",
type:"primary",
click:function(){
location.href=wx.url("/merchant/cardmoneyinvoicemgr?action=get_invoice_tmpl_detail_info");
}
}]
}),!1);
}
function U(){
return lt&&lt.receipt_type;
}
function z(){
mt=!0,L.get(wx.url("/merchant/cardmoneyinvoicemgr?action=get_invoice_tmpl_detail_info&f=json"),function(e){
if(mt=!1,0!==e.base_resp.ret)return L.show(e);
if(e.receipt_info_json){
if(e=jQuery.parseJSON(e.receipt_info_json),!e.recipient_info)return;
lt={
receipt_type:e.receipt_type,
recipient_name:e.recipient_info.name,
recipient_tel:e.recipient_info.tel,
recipient_post_code:e.recipient_info.post_code,
recipient_address:e.recipient_info.address
},ct=T(e),j();
}else lt={};
ft&&(F(),S());
});
}
function F(){
ht=!1,jQuery("#js_make_invoice").text("申请开票"),u();
}
function R(){
ht=!0,jQuery("#js_make_invoice").text("加载中..."),_();
}
function T(e){
var t="无抬头";
return 1==e.receipt_type?e.vat_invoice_info.enterprise_name||t:1==e.commodity_type?e.personal_comm_invoice_info.personal_name||t:e.enterprise_comm_invoice_info.enterprise_name||t;
}
function Y(){
if(!jt){
jt=!0;
var e=r().join("|");
L.post({
url:wx.url("/merchant/cardmoneyinvoicemgr?action=submit_invoice"),
data:{
order_id_list:e
}
}).callback(function(e){
jt=!1,640101==e.base_resp.ret?X.err("订单id非法"):640102==e.base_resp.ret?X.err("仅可开具本月之前的充值订单"):0!==e.base_resp.ret?L.show(e):(Q(),
A());
});
}
}
function A(){
_t.popup("show");
}
function I(){
jQuery(".js_order_detail").on("click",function(e){
e.preventDefault();
var t=jQuery(this),n=t.attr("data-id");
M(rt[n]);
});
}
function M(e){
nt=new W({
container:"#js_order_detail",
data:O(e)
}),J(),nt.show(),$(window).scrollTop(0);
}
function O(e){
var t=e.order_info_detail||{};
return t.__page=1,t;
}
function P(){
jQuery("#js_main_content").show(),jQuery("#js_orders_list_container").show();
}
function J(){
jQuery("#js_main_content").hide(),jQuery("#js_orders_list_container").hide();
}
function N(e){
1===e?(pt&&pt.popup("show"),ut&&ut.popup("hide"),_t&&_t.popup("hide")):2===e?(pt&&pt.popup("hide"),
ut&&ut.popup("show"),_t&&_t.popup("hide")):3===e&&(pt&&pt.popup("hide"),ut&&ut.popup("hide"),
_t&&_t.popup("show"));
}
var V=e("common/qq/queryString.js"),B=e("biz_common/moment.js"),E="YYYY-MM-DD",G=B().add("d",-7).unix(),H=B().unix(),K=e("common/wx/dialog.js"),L=e("common/wx/Cgi.js"),W=e("cardticket/card_fee_order_detail.js"),X=e("common/wx/Tips.js"),Z=new V;
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js"),e("cardticket/common_validate.js"),
e("cardticket/common_template_helper.js"),$(".js_typeSelect").click(function(){
var e=$(this).attr("type");
location.href=Z.replace("coin_type",e).getUrl();
}),wx.cgiData.data.filter=wx.cgiData.filter,$("#js_orders_list").html(template.render("js_order_list_item_tpl",{
orders:wx.cgiData.data
}));
var et=e("common/wx/report_util.js");
wx.cgiData.total_order_count>wx.cgiData.page_count&&et.initPager({
currentPage:wx.cgiData.page,
total_count:wx.cgiData.total_order_count,
count:wx.cgiData.page_count,
callback:function(e){
var t=wx.cgiData.page_count,n=(e-1)*t;
location.href=Z.replaceAll({
page:e,
begin:n
}).getUrl();
}
});
var tt=wx.cgiData.filter;
tt.lower_time=tt.lower_time?tt.lower_time:G,tt.upper_time=tt.upper_time?tt.upper_time:H,
et.initDateRange({
isTodayValid:!0,
begintime:B.unix(tt.lower_time).format(E),
endtime:B.unix(tt.upper_time).format(E),
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(e,t){
location.href=Z.replaceAll({
lower_time:B(e,E).unix(),
upper_time:B(t,E).add("d",1).unix()-1
}).getUrl();
}
}),et.initRankOnce({
container:".js_rankFlag",
sortkey:2,
sorttype:1==tt.sort_type?1:0,
callback:function(e){
var t=e.sortkey,n=e.sorttype;
2==t&&(location.href=Z.replace("sort_type",1==n?1:2).getUrl());
}
}),1==tt.sort_type?jQuery(".js_rankFlag").addClass("single_up"):2==tt.sort_type&&jQuery(".js_rankFlag").addClass("single_down");
var nt,it=[],ot=0,ct="抬头",rt={},at=!1,pt=null,ut=null,_t=null,st=null,lt=null,dt=!1,ft=!1,mt=!1,ht=!1,jt=!1;
jQuery("body").on("click",".js_show_feelist",null,function(){
P(),nt&&nt.hide();
}),l(),t(),n(),z(),window.pop=N;
});