define("scan/step1.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js","biz_web/lib/json.js","biz_web/ui/dropdown.js"],function(e,t,a){
"use strict";
function s(){}
function o(e,t){
var a="#js_select_category_2",s="#js_select_category_3",o="#js_select_category_4",n="#js_select_category_5";
if(e[t]){
var r=new p({
container:a,
label:"请选择",
data:e[t].sub,
callback:function(e){
v[1]=e,g.post({
url:"/merchant/scangetsubcategory?cate_id="+e
},function(t){
if(200003==t.base_resp.ret&&setTimeout(function(){
location.reload();
},0),t.category&&t.category.length>0){
var a=new p({
container:s,
label:"请选择",
data:i(t.category),
callback:function(e){
v[2]=e,g.post({
url:"/merchant/scangetsubcategory?cate_id="+e
},function(t){
if(200003==t.base_resp.ret&&setTimeout(function(){
location.reload();
},0),t.category&&t.category.length>0){
var a=new p({
container:o,
label:"请选择",
data:i(t.category),
callback:function(e){
v[3]=e,g.post({
url:"/merchant/scangetsubcategory?cate_id="+e
},function(t){
if(200003==t.base_resp.ret&&setTimeout(function(){
location.reload();
},0),console.log("_aoJSON5"),console.log(t),console.log(i(t.category)),t.category&&t.category.length>0){
new p({
container:n,
label:"请选择",
data:i(t.category),
callback:function(e){
v[4]=e,d.setData({
base_info:{
category_id_list:v
}
}),d.setData({
idx_info:{
category:e
}
});
}
});
}else v[4]="",$(n).empty(),d.setData({
base_info:{
category_id_list:v
}
}),d.setData({
idx_info:{
category:e
}
});
});
}
});
"undefined"!=typeof d.getData()&&d.getData().base_info&&d.getData().base_info.category_id_list&&d.getData().base_info.category_id_list[3]&&a.selected(d.getData().base_info.category_id_list[3]+"",!0);
}else v[3]="",v[4]="",$(o).empty(),$(n).empty(),d.setData({
base_info:{
category_id_list:v
}
}),d.setData({
idx_info:{
category:e
}
});
});
}
});
"undefined"!=typeof d.getData()&&d.getData().base_info&&d.getData().base_info.category_id_list&&d.getData().base_info.category_id_list[2]&&a.selected(d.getData().base_info.category_id_list[2]+"",!0);
}else v[2]="",v[3]="",v[4]="",$(s).empty(),$(o).empty(),$(n).empty(),d.setData({
base_info:{
category_id_list:v
}
}),d.setData({
idx_info:{
category:e
}
});
});
}
});
"undefined"!=typeof d.getData()&&d.getData().base_info&&d.getData().base_info.category_id_list&&d.getData().base_info.category_id_list[1]?r.selected(d.getData().base_info.category_id_list[1]+"",!0):r.selected(0,!0);
}
}
function i(e){
for(var t=0;t<e.length;t++)e[t].value=e[t].id+"";
return e;
}
function n(){
var e="#js_select_category",t=d.getData();
l||(l=new p({
container:e,
label:"请选择",
data:y,
callback:function(e,t,a){
o(y,a),v[0]=e,v[1]="";
}
})),"undefined"!=typeof t&&t.base_info&&t.base_info.category_id_list&&t.base_info.category_id_list[0]?l.selected(t.base_info.category_id_list[0]+"",!0):l.selected(0,!0),
f=$(".frm_radio").checkbox({
onChanged:function(e){
$("#input_"+e.attr("hidevalue")).val("").attr({
disabled:"disabled"
}),$("#span_"+e.attr("hidevalue")).addClass("disabled"),$("#input_"+e.attr("checkvalue")).val("").removeAttr("disabled"),
$("#span_"+e.attr("checkvalue")).removeClass("disabled"),d.setData({
idx_info:{
keystandard:e.attr("value")
}
});
}
}),"undefined"!=typeof t&&t.idx_info&&t.idx_info.keystandard&&("4"==t.idx_info.keystandard?$("#input_code").val(t.idx_info.keystr):$("#input_no_code").val(t.idx_info.keystr),
f.adjust(t.idx_info.keystandard+"")),f.values()&&0==f.values().length&&f.adjust("4"),
$("#input_code").change(function(){
d.setData({
idx_info:{
keystr:$(this).val()
}
});
}),$("#input_no_code").change(function(){
d.setData({
idx_info:{
keystr:$(this).val()
}
});
});
}
function r(e,t){
1==t?$("#category_err").html(e).show():2==t?$("#input_code_err").html(e).show():3==t&&$("#input_no_code_err").html(e).show();
}
function _(){
$(".js_msg_fail").html("").hide();
}
function c(){
s(),n();
}
var d,l,f,g=(wx.T,wx.cgiData,e("common/wx/Cgi.js")),u=(e("biz_web/ui/checkbox.js"),
e("common/wx/Tips.js")),b=e("biz_web/lib/json.js"),y=wx.cgiData.category,p=e("biz_web/ui/dropdown.js"),v=[];
a.exports={
init:c,
setMobilePreview:function(e){
console.log("step1 setMobilePreivew"),d=e;
},
check:function(e){
_();
var t={};
f.values()&&0==f.values().length?(r("请选择商品条形码类型",1),e(!1)):"4"==f.values()[0]&&""==$("#input_code").val()?(r("请填写商品条形码",2),
e(!1)):"19"==f.values()[0]&&""==$("#input_no_code").val()?(r("请填写商品内部ID",3),e(!1)):d.getData()&&d.getData().idx_info&&d.getData().idx_info.category?(d.setData("4"==f.values()[0]?{
idx_info:{
keystandard:"4",
keystr:$("#input_code").val()
}
}:{
idx_info:{
keystandard:"19",
keystr:$("#input_no_code").val()
}
}),t.product_info=b.stringify2(d.getData()),$("#js_btn_next").addClass("btn_disabled"),
console.log("before check"),g.post({
url:"/merchant/scanproductadd?action=check",
data:t
},function(t){
if($("#js_btn_next").removeClass("btn_disabled"),0==t.base_resp.ret)window.gProduct_default_desc_list=t.product_attr,
window.gProduct_default_vendorid_list=t.vendorid_list,window.gProduct_default_title=t.title,
window.gProduct_default_thumb_url=t.thumb_url,console.log("after setdata"),e(!0);else{
var a="";
200003==t.base_resp.ret&&setTimeout(function(){
location.reload();
},0),a=200002==t.base_resp.ret?"该条形码不在你所在的厂商信息内":394==t.base_resp.ret?"该商品条形码已被删除，请核实":395==t.base_resp.ret?"未获得该商品条形码的使用权限，请先核实该条形码号段":396==t.base_resp.ret?"该商品条形码已有商户使用，请核实":398==t.base_resp.ret?"该商品条形码不存在，请核实":399==t.base_resp.ret?4==d.getData().idx_info.keystandard?"你输入的条形码已存在，请核实":"你输入的商品内部ID已存在，请核实":400==t.base_resp.ret?"你提交的厂商识别代码不包含该条形码，请核对":401==t.base_resp.ret?"请输入经营范围内的商品条形码":402==t.base_resp.ret?"请输入经营范围内的商品条形码":404==t.base_resp.ret?"你提交的商品不存在，请核对":405==t.base_resp.ret?"提交超时，请稍后重试":406==t.base_resp.ret?"提交超时，请稍后重试":407==t.base_resp.ret?4==d.getData().idx_info.keystandard?"请输入正确的商品条形码":"请输入正确的商品内部ID":408==t.base_resp.ret?"提交超时，请稍后重试":409==t.base_resp.ret?"商品商品详情有误，请核对":410==t.base_resp.ret?"商品商品详情有误，请核对":411==t.base_resp.ret?"自定义服务信息有误，请核对":t.base_resp.err_msg,
r(a,"4"==f.values()[0]?2:3),u.err(a),e(!1);
}
})):(r("请选择商品类目",1),e(!1));
}
};
});