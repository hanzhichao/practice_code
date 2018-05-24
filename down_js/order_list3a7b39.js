define("shop/order_list.js",["common/wx/top.js","biz_web/ui/dropdown.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/tooltips.js","common/wx/dialog.js","shop/feedback.js","common/wx/popup.js","common/lib/datepicker.js","common/qq/queryString.js","biz_web/ui/dateRange.js","common/wx/Tips.js","shop/order_cgi.js","common/wx/time.js","shop/express.js","biz_common/moment.js","biz_web/lib/json.js","common/wx/dateSelect.js","common/qq/emoji.js","biz_common/jquery.validate.js","common/qq/jquery.plugin/zclip.js"],function(e){
"use strict";
var t=(wx.T,template.render),o=e("common/wx/top.js"),r=e("biz_web/ui/dropdown.js"),i=(e("biz_web/ui/checkbox.js"),
e("common/wx/Cgi.js")),n=e("common/wx/pagebar.js"),a=e("common/wx/tooltips.js"),s=e("common/wx/dialog.js"),c=e("shop/feedback.js"),l=(e("common/wx/popup.js"),
e("common/lib/datepicker.js"),e("common/qq/queryString.js")),d=e("biz_web/ui/dateRange.js"),m=e("common/wx/Tips.js"),p=e("shop/order_cgi.js"),u=e("common/wx/time.js"),_=e("shop/express.js"),v=e("biz_common/moment.js"),y=e("biz_web/lib/json.js"),f=(e("common/wx/dateSelect.js"),
e("common/qq/emoji.js"),e("biz_common/jquery.validate.js"),wx.cgiData);
e("common/qq/jquery.plugin/zclip.js");
var h,j,b=new Object,g={},k=f.data.product_order_list.length;
f.last_days&&(f.begintime=v().add("d",-f.last_days+1).format("YYYY-MM-DD"),f.endtime=v().format("YYYY-MM-DD"));
for(var x=0;k>x;x++)j=f.data.product_order_list[x],j.detailLink=wx.url("/merchant/productorder?action=getdetail&t=shop/order_info&orderidstr="+j.order_id),
j.rightsLink=wx.url("/cgi-bin/frame?t=business/index_frame&iframe=%2Fpaymch%2Fshop_rights%3Ft%3Dbusiness%2Frights_list%26action%3Dbatchgetpayfeedback%26flag%3D1&nav=rights&hide=0"),
j.historyLink=wx.url("/merchant/productorder?action=getlist&t=shop/order_list&nick="+j.buyer_nick),
j.create_time=u.getFullTime(j.order_create_time).substring(0,16),""==j.receiver_mobile&&(j.receiver_mobile=j.receiver_phone),
j.buyer_nick=j.buyer_nick.emoji(),g[j.order_id]=j;
for(var w=[],x=0;x<_.length;x++)w.push({
name:_[x].name,
value:_[x].id
});
w.push({
name:"其他物流公司",
value:-1
}),function(){
new o("#topTab",o.DATA.shop).selected(4),c();
}(),function(){
function e(){
var e="";
for(var t in n)n.hasOwnProperty(t)&&""!==n[t]&&(e+="&"+t+"="+encodeURIComponent((n[t]+"").html(!1).html(!1)));
location.href=wx.url("/merchant/productorder?action=getlist&t=shop/order_list"+e);
}
var t=$("#js_orderidstr").val(f.orderidstr.html(!1).html(!1)),o=$("#js_nick").val(f.nick.html(!1).html(!1)),r=$("#js_product").val(f.product.html(!1).html(!1)),n={
status:f.status,
orderidstr:f.orderidstr,
nick:f.nick,
product:f.product,
begintime:f.begintime,
endtime:f.endtime,
last_days:f.last_days,
count:f.count
},a="";
for(var s in n)n.hasOwnProperty(s)&&""!==n[s]&&"count"!==s&&(a+="&"+s+"="+encodeURIComponent((n[s]+"").html(!1).html(!1)));
$("#js_downloadExcel").on("click",function(){
return i.get({
url:"/merchant/productorder?action=check"+a
},function(e){
e&&0==e.base_resp.ret?location.href=wx.url("/merchant/productorder?action=download&t=shop/order_excel"+a):m.err(e&&218001==e.base_resp.ret?"您选择的时间区间过大，建议调小区间重试":"系统错误，请重试");
}),!1;
});
var c=$(".js_statDataRange");
c.on("click",function(){
var t=$(this),o=parseInt(t.attr("range"),10);
n.begintime=v().add("d",-o+1).format("YYYY-MM-DD"),n.endtime=v().format("YYYY-MM-DD"),
n.last_days=o,e();
}),d({
container:"#js_rangeSelect",
isTodayValid:!0,
defaultText:" 至 ",
theme:"ta",
startDate:n.begintime,
endDate:n.endtime,
success:function(t){
n.begintime=t.startDate,n.endtime=t.endDate,n.last_days="",e();
}
}),$("#js_search").on("click",function(){
n.orderidstr=t.val(),n.nick=o.val(),n.product=r.val(),e();
}),$(".js_typeSelect").on("click",function(){
var t=$(this).attr("status");
n.status=-1==t?"":t,e();
}),$("#js_orderidstr, #js_nick, #js_product").on("keyup",function(e){
13==e.keyCode&&$("#js_search").click();
});
}(),function(){
f.data.status=f.status;
for(var e=0;e<f.data.product_order_list.length;e++){
var o=f.data.product_order_list[e];
o.product_list.length>0?console.log("no product_list",e):(o.product_list.push({
product_id:o.product_id||"",
product_name:o.product_name||"",
product_img:o.product_img||"",
product_sku:o.product_sku,
product_code:o.product_code||"",
product_price:o.product_price||"",
product_price_float:o.product_price_float,
product_total_price_float:o.product_total_price_float,
product_count:o.product_count||0
}),f.data.product_order_list[e].product_list=o.product_list);
}
$("#js_orderList").append(t("js_orderListHtml",f.data));
var r=function(){
h.values().length?$("#js_deliveryGroup").removeClass("btn_disabled"):$("#js_deliveryGroup").addClass("btn_disabled");
};
h=$(".js_select").on("click",function(){
r();
}).checkbox(),$("#js_selectAll").click(function(){
var e=$(this).prop("checked");
$(".js_select").each(function(){
$(this).prop("disabled")||$(this).checkbox().checked(e);
}),r();
}).checkbox();
}(),function(){
{
var e=Math.floor(f.offset/f.count)+1;
new n({
container:"#js_pageNavigator",
perPage:f.count,
initShowPage:e,
totalItemsNum:f.total_cnt,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var o=t.currentPage;
return o!=e&&(location.href=l.replace(location.href,"offset",(o-1)*f.count)),!1;
}
});
}
}(),function(){
var e={};
$(".js_delivery").each(function(){
var o=this,i=$(this),n=i.data("order_id"),s=t("js_singleDeliveryFormHtml",g[n]);
e[n]=new a({
container:o,
content:s,
position:{
left:-94,
top:0
},
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary js_confirm",
click:function(){
if(0==+u.values()[0]){
var e={
order_delivery:[{
order_id:n,
is_need_delivery:0,
buyer_uin:g[n].buyer_uin,
trans_id:g[n].trans_id
}]
};
p.delivery(y.stringify2(e),function(e){
0==e.base_resp.ret?(m.suc("发货成功"),location.reload(!0)):m.err("发货失败");
});
}else if($("#deliveryForm_"+n).valid()){
var t=$("#deliveryCompany_"+n).data("companyId"),o=-1!=t?$("#deliveryCompany_"+n).data("companyName"):$("#deliveryCompanyName_"+n).val(),r=$("#deliveryExpress_"+n).val(),e={
order_delivery:[{
order_id:n,
is_need_delivery:1,
is_others:-1==t?1:0,
delivery_company:t,
delivery_track_no:r,
delivery_company_name:o,
buyer_uin:g[n].buyer_uin,
trans_id:g[n].trans_id
}]
};
p.delivery(y.stringify2(e),function(e){
0==e.base_resp.ret?(m.suc("发货成功"),location.reload(!0)):m.err("发货失败");
});
}
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}],
onclose:function(){}
});
var c=$("#deliveryForm_"+n),l=c.find(".no_express"),d=c.find(".has_express"),u=c.find(".js_express").on("click",function(){
var e=$(this),t=+e.val();
0==t?(l.show(),d.hide()):(l.hide(),d.show());
}).checkbox({
multi:!1
});
$("#deliveryForm_"+n).find("input[type=text]").on("keydown",function(t){
return 13==t.keyCode?(e[n].$dom.find(".js_confirm").click(),!1):void 0;
});
new r({
container:"#deliveryCompany_"+n,
data:w,
callback:function(e,t){
-1==e?c.find(".js_companyName").show():c.find(".js_companyName").hide(),$("#deliveryCompany_"+n).data("companyId",e).data("companyName",t),
$("#deliveryCompanyInput_"+n).val(e).parent().parent().find(".fail").remove(),$("#deliveryForm_"+n).valid();
}
});
$("#deliveryForm_"+n).validate({
rules:{
deliveryCompany:"required",
deliveryCompanyName:"expressCompanyName",
deliveryExpress:{
express:!0,
expressCompany:!0
}
},
messages:{
deliveryCompany:"请选择物流公司"
},
ignore:[],
errorPlacement:function(e,t){
{
var o=t.parent().parent();
o.find(".frm_tips");
}
o.find(".fail").remove(),o.append(e);
}
}),$("#js_singleDeliveryForm_"+n).closest(".popover").on("click",function(e){
e.stopPropagation();
}),$(document).on("click",function(){
e[n].hide();
});
}),$(".js_delivery").on("click",function(){
var t=$(this).data("order_id");
$(".popover").hide(),e[t].show();
});
}(),function(){
$("#js_deliveryGroup").on("click",function(){
for(var e,t=h.values(),o=[],i=0;i<t.length;i++)e=t[i],2==g[e].order_status&&o.push(g[e]);
if(0==t.length)m.err("请先选择订单");else if(0==o.length)s.show({
title:"提示",
type:"err",
msg:"您所选的订单均已发货，无法再次发货|请重新选择",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}],
mask:!0
});else{
{
$("#js_multipleDeliveryFormHtml").popup({
title:"批量发货",
width:960,
className:"ad_manage_dialog",
data:{
order_list:o
},
mask:!0,
buttons:[{
text:"确定",
click:function(){
if($("#js_multipleDeliveryForm").valid()){
for(var e,t={
order_delivery:[]
},r=0;r<o.length;r++){
e=o[r].order_id;
var i=$("#multipleDeliveryCompany_"+e).data("companyId");
t.order_delivery.push({
order_id:e,
is_need_delivery:1,
is_others:-1==i?1:0,
delivery_company:i,
delivery_track_no:$("#multipleDeliveryExpress_"+e).val(),
delivery_company_name:$("#multipleDeliveryCompany_"+e).data("companyName"),
buyer_uin:g[e].buyer_uin,
trans_id:g[e].trans_id
});
}
p.delivery(y.stringify2(t),function(e){
0==e.ret?(m.suc("发货成功"),location.reload(!0)):m.err("发货失败");
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}
$("#js_multipleDeliveryForm").find("input[type=text]").on("keydown",function(e){
return 13==e.keyCode?!1:void 0;
});
for(var n={},a={},i=0;i<o.length;i++)n["multipleDeliveryCompany_"+o[i].order_id]="required",
a["multipleDeliveryCompany_"+o[i].order_id]="请选择物流公司",n["multipleDeliveryExpress_"+o[i].order_id]={
multipleExpress:!0,
multipleExpressCompany:!0
},a["multipleDeliveryExpress_"+o[i].order_id]={
required:"请填写运单号"
};
$("#js_multipleDeliveryForm").validate({
rules:n,
messages:a,
ignore:[],
errorPlacement:function(e,t){
{
var o=t.parent().parent();
o.find(".frm_tips");
}
o.find(".fail").remove(),o.append(e);
}
});
for(var i=0;i<o.length;i++)!function(e){
{
var t=o[e].order_id;
new r({
container:"#multipleDeliveryCompany_"+t,
data:w,
callback:function(e,o){
$("#multipleDeliveryCompany_"+t).data("companyId",e),$("#multipleDeliveryCompany_"+t).data("companyName",o),
$("#multipleDeliveryCompanyInput_"+t).val(e).parent().parent().find(".fail").remove(),
$("#js_multipleDeliveryForm").valid();
}
});
}
}(i);
}
});
}(),function(){
$("#js_closeAndRefundGroup").on("click",function(){
var e=h.values();
if(0==e.length)m.err("请先选择订单");else{
var t="您共选择了%s笔订单，其中%s笔关闭并退款。关闭交易后，货款会自动返还给买家，频繁关闭交易将会降低您在微信的信用值。".sprintf(e.length,e.length);
"function"==typeof b.remove&&b.remove(),b=$("#js_closeAndRefundFormHtml").popup({
title:"关闭并退款",
data:{
tip:t
},
mask:!0,
buttons:[{
text:"确定",
click:function(){
var t=$("#js_closeReason").val(),o=$("#js_closeExplain").val();
p.closeAndRefund(e,t,o,function(e){
0==e.ret?(m.suc("关闭交易成功"),location.reload(!0)):m.err("关闭交易失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
}),new r({
container:"#js_closeReasonSelect",
data:[{
name:"库存不足",
value:0
},{
name:"其他原因",
value:1
}],
callback:function(e,t){
$("#js_closeReason").val(t);
}
}).selected(0);
}
});
}(),function(){
$(".js_closeAndRefund").on("click",function(){
var e=$(this),t=e.data("order_id"),o="关闭交易后，货款会自动返还给买家，频繁关闭交易将会降低您在微信的信用值。";
"function"==typeof b.remove&&b.remove(),b=$("#js_closeAndRefundFormHtml").popup({
title:"关闭并退款",
data:{
tip:o
},
mask:!0,
buttons:[{
text:"确定",
click:function(){
var e=$("#js_closeReason").val(),o=$("#js_closeExplain").val();
p.closeAndRefund(t,e,o,function(e){
0==e.ret?(m.suc("关闭交易成功"),location.reload(!0)):m.err("关闭交易失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
}),new r({
container:"#js_closeReasonSelect",
data:[{
name:"库存不足",
value:0
},{
name:"其他原因",
value:1
}],
callback:function(e,t){
$("#js_closeReason").val(t);
}
}).selected(0);
});
}(),function(){
$(".js_customerName").each(function(){
{
var e=this,o=$(this),r=o.data("order_id"),i=t("js_customerInfoHtml",g[r]);
new a({
container:e,
content:i,
position:{
left:-150+o.width()/2,
top:2
},
type:"hover",
reposition:!0,
onshow:function(){
this.show();
var e=this.$dom.find(".js_copyAddress");
0==e.parent().find(".zclip").length&&$(".js_copyAddress").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
var e=$(this),t=e.data("order_id"),o=g[t].receiver_name.html(!1),r=g[t].receiver_mobile.html(!1),i=g[t].receiver_province.html(!1),n=g[t].receiver_city.html(!1),a=g[t].receiver_zone.html(!1),s=g[t].receiver_address.html(!1);
return o+r+i+n+a+s;
},
afterCopy:function(){
m.suc("复制成功");
}
});
}
});
}
});
}();
});