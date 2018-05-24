define("wifi/data_info.js",["wifi/top.js","biz_web/lib/highcharts.js","common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","biz_web/ui/dateRange.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/Tips.js"],function(t){
"use strict";
t("wifi/top.js"),t("biz_web/lib/highcharts.js"),t("common/wx/popup.js"),t("biz_web/ui/checkbox.js");
var e=t("common/wx/Cgi.js"),a=t("biz_web/ui/dateRange.js"),i=t("biz_web/ui/dropdown.js"),s=t("biz_common/moment.js"),o=t("common/wx/pagebar.js"),n=t("common/wx/Tips.js"),r=$(".js_tab"),d=$(".js_tbody"),p=$(".js_pagebar"),l=$("#js_data_chart"),c=$(".js_download"),h=$(".js_tbody_loading"),_={
xAxis:[{
labels:{
formatter:function(){
return this.value;
},
style:{
color:"#8D8D8D"
},
step:1
},
title:{
text:"",
style:{
color:"#7eafdd"
}
},
categories:[],
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
}],
series:[{
name:"微信连Wi-Fi人数趋势图",
color:"#44B549",
data:[],
lineWidth:2,
marker:{
radius:5,
lineWidth:3,
lineColor:"#fff"
},
states:{
hover:{
enabled:!0,
lineWidth:2
}
}
}],
chart:{
renderTo:"wxChartsFans",
zoomType:"xy",
type:"area",
marginLeft:50,
marginRight:50,
backgroundColor:"#FFFFFF"
},
title:{
text:""
},
credits:{
enabled:!1
},
yAxis:[{
title:{
text:"",
style:{
color:"#8D8D8D",
fontFamily:"Microsoft yahei"
}
},
allowDecimals:!1,
gridLineColor:"#F2F3F4",
offset:0
}],
plotOptions:{
series:{
fillColor:"rgba(135, 179, 212, 0.05)"
}
},
legend:{
enabled:!1
},
tooltip:{
backgroundColor:"#555556",
borderRadius:0,
borderWidth:0,
shadow:!1,
style:{
color:"#fff"
},
headerFormat:"",
pointFormat:'<b style="font-family:Microsoft yahei"> {series.name} : {point.y}</b><br/>{point.time}'
},
exporting:{
enabled:!1
}
},m={
0:"wx_connect_user",
1:"new_fans",
2:"total_fans",
3:"main_page_uv"
},u={
shopData:wx.cgiData.shop_infos,
statData:wx.cgiData.stat_data,
shopCnt:wx.cgiData.shop_cnt,
shopId:0,
shopName:"全部门店",
startDate:s().subtract(30,"days").format("YYYY-MM-DD"),
endDate:s().subtract(1,"days").format("YYYY-MM-DD"),
type:0
},f={
_shopDropdown:null,
_initShopPopup:function(){
function t(t,i){
a({
loading:!0
}),e.get({
url:"/wifi/wifidevicemanager?action=get_shop_summary_list_json&page_idx=%s&page_size=10".sprintf(t)
},function(t){
if(!t||!t.base_resp)return n.err("系统错误，请稍后重试"),void a({
shops:[]
});
var e=1*t.base_resp.ret;
0!=e?n.err("系统错误，请稍后重试"):(a(t),i&&i(t));
});
}
function a(t){
s.find(".js_shop_list").html(wx.T($("#tpl_shop_items").html(),t)),s.find(".js_shop_list").find('input[type="radio"]').checkbox({
multi:!1
}),s.find(".js_shop_list").find('input[data-id="%s"]'.sprintf(u.shopId)).click(),
s.popup("resetPosition");
}
var i=this,s=$("#tpl_shop_list").popup({
title:"选择门店",
data:{
loading:!0
},
buttons:[{
text:"取消",
click:function(){
this.remove(),i._shopDropdown.reset(),$(".jsBtLabel").text(u.shopName);
}
},{
text:"确定",
click:function(){
this.$dialogWrp.find(".js_btn:eq(1)").btn(!1),u.shopId=this.$dialogWrp.find('input[type="radio"]:checked').val(),
u.shopName=this.$dialogWrp.find('input[type="radio"]:checked').prev().text(),i._shopDropdown.reset(),
$(".jsBtLabel").text(u.shopName),this.remove(),i._getData();
},
type:"primary"
}],
onShow:function(){
this.$dialogWrp.find(".dialog_bd").css("padding","45px 30px");
},
onHide:function(){
this.remove();
}
});
t(1,function(e){
s.popup("resetPosition");
new o({
container:s.find(".js_shop_page"),
perPage:10,
totalItemsNum:e.shop_cnt,
initShowPage:1,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
t(e.currentPage,function(){
s.popup("resetPosition");
});
}
});
}),s.popup("resetPosition");
},
_initShopDropdown:function(){
for(var t=this,e=u.shopData,a=u.shopCnt,s=0;s<e.length;s++)e[s]={
name:e[s].shop_name,
value:e[s].shop_id
};
e.unshift({
name:"全部门店",
value:0
}),a>6&&e.push({
name:"更多...",
value:"__more__"
}),this._shopDropdown=new i({
container:".js_shop_dropdown",
label:"全部门店",
data:e,
callback:function(e,a){
console.log(e),console.log(a),"__more__"==e?t._initShopPopup():(u.shopId=e,u.shopName=a,
t._getData());
}
});
},
_initDateDropdown:function(){
var t=this;
new i({
container:".js_date_dropdown",
label:"最近30天",
data:[{
name:"最近7天",
value:0
},{
name:"最近15天",
value:1
},{
name:"最近30天",
value:2
}],
callback:function(e){
0==e?u.startDate=s().subtract(7,"days").format("YYYY-MM-DD"):1==e?u.startDate=s().subtract(15,"days").format("YYYY-MM-DD"):2==e&&(u.startDate=s().subtract(30,"days").format("YYYY-MM-DD")),
u.endDate=s().subtract(1,"days").format("YYYY-MM-DD"),t.dateRange.setDate({
startDate:u.startDate,
endDate:u.endDate
}),t._getData();
}
});
},
_initDateRange:function(){
var t=this;
t.dateRange=a({
container:".js_date_range",
startDate:u.startDate,
endDate:u.endDate,
minValidDate:s().subtract(180,"days").valueOf()/1e3,
stopToday:!0,
theme:"ta",
success:function(e){
console.log(e),u.startDate=s(e.startDate).format("YYYY-MM-DD"),u.endDate=s(e.endDate).format("YYYY-MM-DD"),
t._getData();
}
});
},
_initTab:function(){
var t=this;
r.on("click",function(){
var e=$(this);
return e.hasClass("selected")?!1:($(".js_tab.selected").removeClass("selected"),
e.addClass("selected"),_.series[0].name=e.children().text().replace("趋势图",""),t._renderChart(e.data("type")),
u.type=e.data("type"),void 0);
});
},
_initPageBar:function(){
var t=this;
p.empty(),u.statData.length>14?(p.show(),new o({
container:".js_pagebar",
perPage:14,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:u.statData.length,
callback:function(e){
t._renderTable(14*(e.currentPage-1),14*e.currentPage);
}
})):p.hide();
},
_initDownLoad:function(){
c.on("click",function(){
window.open(wx.url("/wifi/wifistatmanager?action=get_daily_stat_list_down&shop_id="+u.shopId+"&start_date="+u.startDate+"&end_date="+u.endDate));
});
},
_renderChart:function(t){
var e=u.statData;
_.xAxis[0].categories=[],_.series[0].data=[],_.xAxis[0].labels.step=e.length>10?Math.ceil(e.length/8):1,
e.each(function(e){
_.xAxis[0].categories.push(e.stat_time),_.series[0].data.push({
time:e.stat_time,
y:Number(e[m[t]])
});
}),e.length?l.highcharts(_):l.html('<p class="empty_tips">暂无数据</p>');
},
_renderTable:function(t,e){
void 0==t&&(t=0),void 0==e&&(e=14),d.html(template.render("js_tbody_tpl",{
list:u.statData.slice(t,e)
}));
},
_getData:function(t){
h.show(),d.hide(),l.empty().html('<p class="empty_tips"><i class="icon_loading_small white">暂无门店。请点击屏幕左侧“门店管理”插件入口，并新建门店。</i></p>');
var a=this;
e.get({
url:"/wifi/wifistatmanager?action=get_daily_stat_list_json&shop_id="+u.shopId+"&start_date="+u.startDate+"&end_date="+u.endDate
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(u.statData=e.stats,a._renderChart(u.type),a._renderTable(),
h.hide(),d.show(),a._initPageBar(),t&&t()):n.err("系统错误");
});
},
init:function(){
this._initTab(),this._initDateDropdown(),this._initShopDropdown(),this._initPageBar(),
this._initDateRange(),this._renderTable(0,14),this._renderChart(u.type),this._initDownLoad();
}
};
f.init();
});