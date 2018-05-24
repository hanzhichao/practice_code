define("scan/product_claimlist.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/top.js","common/wx/popup.js","common/wx/pagebar.js","biz_web/lib/json.js","common/qq/queryString.js"],function(i){
"use strict";
function n(i){
$("#js_div_list").find(".js_item").length==i&&wx.cgiData.paging_info.begin>0?location.href=(new h).replace("begin",Math.max(0,wx.cgiData.paging_info.begin-f)).replace("end",wx.cgiData.paging_info.end-f).getUrl():location.reload();
}
function t(i){
o.post({
url:"/merchant/scanproductclaimlist?action=claim",
data:{
claim_product_info:u.stringify2({
list:i
})
}
},function(t){
t&&0==t.base_resp.ret?0==t.claim_ok_num||t.claim_error_num>=i.length?(m.err("认领失败"),
$("#js_btn_claim_all").btn(!0),$("#js_btn_claim_all").enable()):t.claim_ok_num>=i.length&&0==t.claim_error_num?(m.suc("认领成功，已移至商品管理-待发布列表"),
n(t.claim_ok_num)):($("#js_btn_claim_all").btn(!0),$("#js_btn_claim_all").enable(),
$("#tpl_claim_result").popup({
title:"认领结果",
width:600,
data:{
claim_ok_num:t.claim_ok_num,
claim_error_num:t.claim_error_num
},
buttons:[{
text:"确认",
type:"primary",
click:function(){
n(t.claim_ok_num);
}
}],
onHide:function(){
n(t.claim_ok_num);
},
onCancel:function(){
n(t.claim_ok_num);
}
})):(m.err("认领失败，请重试"),$("#js_btn_claim_all").btn(!0),$("#js_btn_claim_all").enable());
});
}
function e(){
var i=$("#js_div_count"),n=$("#js_div_list").find('input[name="claim"]').filter(":checked").length;
0==n?i.hide():i.html("(已选中%s个)".sprintf(n)).show();
}
function a(){}
function l(){
new d("#js_div_toptab",d.DATA.scan).selected(1),$("#js_div_list").html(_("tpl_item_list",{
list:j.item_list
}));
new b({
container:"#js_div_pagebar",
perPage:f,
initShowPage:Math.floor(j.paging_info.begin/f)+1,
totalItemsNum:j.paging_info.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var n=(i.currentPage-1)*f,t=i.currentPage*f-1;
return n!=j.paging_info.begin&&(location.href=(new h).replace("begin",n).replace("end",t).getUrl()),
!1;
}
});
}
function s(){
var i;
$("#js_btn_claim_all").disable(),$("#js_btn_claim_all").on("click",function(){
if($(this).hasClass("btn_disabled"))return!1;
var n=i.values();
if(n.length<=0)return!1;
var e=[];
$("#js_div_list").find(".js_item").each(function(){
$.inArray($(this).data("item")+"",n)>-1&&e.push({
keystr:$(this).data("keystr")+"",
keystandard:1*$(this).data("keystandard")
});
}),$("#js_btn_claim_all").btn(!1),t(e);
}),i=$("#js_div_list").find(".frm_checkbox").checkbox({
onChanged:function(){
var n=i.values();
j.item_list.length<=0||n.length<=0?$("#js_btn_claim_all").disable():$("#js_btn_claim_all").enable(),
e();
}
}),$("#js_input_checkall").checkbox({
onChanged:function(n){
i.values();
"1"==n.checkbox("value")&&$("#js_div_list").find(".js_item").length>0?($("#js_div_list").find(".frm_checkbox").checkbox("checked",!0),
$("#js_btn_claim_all").enable()):($("#js_div_list").find(".frm_checkbox").checkbox("checked",!1),
$("#js_btn_claim_all").disable()),e();
}
}),$("#js_div_list").find(".js_item").each(function(i){
var n=$(this).data("keystr")+"",e=$(this).data("keystandard");
$(this).find(".js_btn_claim").on("click",function(){
return $(this).hasClass("disabled")?!1:($(this).addClass("disabled"),$("#js_btn_claim_all").disable(),
void t([{
keystr:n,
keystandard:e
}]));
}),j.item_list[i]&&j.item_list[i].barcode_url&&new r({
container:$(this).find(".js_btn_showcode"),
content:_("tpl_item_code",{
url:j.item_list[i].barcode_url
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
});
}
function c(){
a(),l(),s();
}
var o=(wx.T,i("common/wx/Cgi.js")),_=(i("biz_web/ui/checkbox.js"),template.render),m=i("common/wx/Tips.js"),r=i("common/wx/tooltips.js"),d=i("common/wx/top.js"),b=(i("common/wx/popup.js"),
i("common/wx/pagebar.js")),u=i("biz_web/lib/json.js"),h=i("common/qq/queryString.js"),j=wx.cgiData,f=20;
c();
});