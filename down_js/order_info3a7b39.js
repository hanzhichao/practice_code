define("shop/order_info.js",["common/wx/top.js","biz_web/ui/dropdown.js","shop/order_cgi.js","common/wx/Cgi.js","common/wx/tooltips.js","shop/feedback.js","common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/Tips.js","biz_web/lib/json.js","shop/express.js","biz_common/jquery.validate.js","common/qq/emoji.js","common/qq/jquery.plugin/zclip.js"],function(e){
"use strict";
var o=(wx.T,template.render),r=e("common/wx/top.js"),t=e("biz_web/ui/dropdown.js"),i=e("shop/order_cgi.js"),c=e("common/wx/Cgi.js"),n=e("common/wx/tooltips.js"),s=e("shop/feedback.js"),i=(e("common/wx/popup.js"),
e("biz_web/ui/checkbox.js"),e("shop/order_cgi.js")),d=e("common/wx/Tips.js"),p=e("biz_web/lib/json.js"),a=e("shop/express.js"),l=(e("biz_common/jquery.validate.js"),
e("common/qq/emoji.js"),wx.cgiData);
e("common/qq/jquery.plugin/zclip.js"),$("#js_orderTotalPrice").text((l.order_total_price/100).toFixed(2)),
$("#js_expressPrice").text((l.express_price/100).toFixed(2)),$("#js_buyerNick").html(l.buyer_nick.emoji()),
function(){
!function(){
var e=function(e){
for(var o=e.split(";"),r=0;r<o.length;r++){
for(var t=o[r].split(":"),i=0;i<t.length;i++)t[i]=t[i].replace(/^\$/,"");
o[r]=t.join(":");
}
return o.join(";");
};
if(l.product_sku&&(l.product_sku=e(l.product_sku)),Array.isArray(l.product_list))for(var o=0;o<l.product_list.length;o++){
var r=l.product_list[o];
r.product_sku&&(r.product_sku=e(r.product_sku));
}
}(),0==l.product_list.length&&l.product_list.push({
product_id:l.product_id||"",
product_name:l.product_name||"",
product_img:l.product_img||"",
product_sku:l.product_sku,
product_code:l.product_code||"",
product_price:l.product_price||"",
product_price_float:l.product_price_float,
product_total_price_float:l.product_total_price_float,
product_count:l.product_count||0
});
for(var e=0;e<l.product_list.length;e++){
var r=l.product_list[e];
l.product_list[e].product_sku=l.product_list[e].product_sku,l.product_list[e].product_img=r.product_img.http2https(),
l.product_list[e].product_total_price=(r.product_price*r.product_count/100).toFixed(2),
l.product_list[e].product_price=(r.product_price/100).toFixed(2);
}
$("#js_productDetail").html(o("js_productDetailHtml",{
list:l.product_list
}));
}(),function(){
new r("#topTab",r.DATA.shop).selected(4),s();
}(),function(){
$("#js_copyAddress").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
var e=l.receiver_name.html(!1),o=l.receiver_mobile.html(!1),r=l.receiver_province.html(!1),t=l.receiver_city.html(!1),i=l.receiver_zone.html(!1),c=l.receiver_zip.html(!1),n=l.receiver_address.html(!1);
return e+o+r+t+i+n+c;
},
afterCopy:function(){
d.suc("复制成功");
}
});
}(),function(){
if(2==l.order_status){
var e=o("js_singleDeliveryFormHtml",l),r=l.order_id,c=new n({
container:"#js_delivery",
content:e,
position:{
left:-98,
top:3
},
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary js_confirm",
click:function(){
if(0==+m.values()[0]){
var e={
order_delivery:[{
order_id:r,
is_need_delivery:0,
buyer_uin:l.buyer_uin,
trans_id:l.trans_id
}]
};
i.delivery(p.stringify2(e),function(e){
console.log(e),0==e.base_resp.ret?(d.suc("发货成功"),location.reload(!0)):d.err("发货失败");
});
}else if($("#deliveryForm_"+r).valid()){
var o=$("#deliveryCompany_"+r).data("companyId"),t=-1!=o?$("#deliveryCompany_"+r).data("companyName"):$("#deliveryCompanyName_"+r).val(),c=$("#deliveryExpress_"+r).val(),e={
order_delivery:[{
order_id:r,
is_need_delivery:1,
is_others:-1==o?1:0,
delivery_company:o,
delivery_track_no:c,
delivery_company_name:t,
buyer_uin:l.buyer_uin,
trans_id:l.trans_id
}]
};
i.delivery(p.stringify2(e),function(e){
console.log(e),0==e.base_resp.ret?(d.suc("发货成功"),location.reload(!0)):d.err("发货失败");
});
}
}
},{
text:"取消",
type:"btn_default ",
click:function(){
this.hide();
}
}],
onclose:function(){}
}),s=$("#deliveryForm_"+r),_=s.find(".no_express"),u=s.find(".has_express"),m=s.find(".js_express").on("click",function(){
var e=$(this),o=+e.val();
0==o?(_.show(),u.hide()):(_.hide(),u.show());
}).checkbox({
multi:!1
});
$("#deliveryForm_"+r).find("input[type=text]").on("keydown",function(e){
return 13==e.keyCode?(c.$dom.find(".js_confirm").click(),!1):void 0;
});
for(var v=[],y=0;y<a.length;y++)v.push({
name:a[y].name,
value:a[y].id
});
v.push({
name:"其他物流公司",
value:-1
});
{
new t({
container:"#deliveryCompany_"+r,
data:v,
callback:function(e,o){
-1==e?s.find(".js_companyName").show():s.find(".js_companyName").hide(),$("#deliveryCompany_"+r).data("companyId",e).data("companyName",o),
$("#deliveryCompanyInput_"+r).val(e).parent().parent().find(".fail").remove(),$("#deliveryForm_"+r).valid();
}
});
}
$("#deliveryForm_"+r).validate({
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
errorPlacement:function(e,o){
{
var r=o.parent().parent();
r.find(".frm_tips");
}
r.find(".fail").remove(),r.append(e);
}
}),$("#js_singleDeliveryForm_"+r).closest(".popover").on("click",function(e){
e.stopPropagation();
}),$(document).on("click",function(){
c.hide();
});
}
}(),function(){
var e=new Object;
$("#js_closeAndRefund").on("click",function(){
var o=l.order_id,r="关闭交易后，货款会自动返还给买家，频繁关闭交易将会降低您在微信的信用值。";
"function"==typeof e.remove&&e.remove(),e=$("#js_closeAndRefundFormHtml").popup({
title:"关闭并退款",
data:{
tip:r
},
mask:!1,
buttons:[{
text:"确定",
click:function(){
var e=$("#js_closeReason").val(),r=$("#js_closeExplain").val();
i.closeAndRefund(o,e,r,function(e){
0==e.ret?(d.suc("关闭交易成功"),location.reload(!0)):d.err("关闭交易失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
}),new t({
container:"#js_closeReasonSelect",
data:[{
name:"库存不足",
value:0
},{
name:"其他原因",
value:1
}],
callback:function(e,o){
$("#js_closeReason").val(o);
}
}).selected(0);
});
}(),function(){
""!=l.delivery_id&&c.get({
url:"/merchant/productorder?action=getdelivery&company="+l.delivery_company+"&deliveryid="+l.delivery_id,
mask:!1
},function(e){
console.log("getdelivery:",e),e&&e.base_resp&&0==e.base_resp.ret?(e.data=e.data.replace("callback(","").replace("null(","").replace(/\)$/,""),
e.data=p.parse(e.data),$("#js_expressDetail").html(o("js_expressDetailHtml",e.data))):290010==e.base_resp.ret?d.err("获取物流信息失败"):console.log("getdelivery fail:",e);
});
}();
});