define("ibeacon/data_summary.js",["biz_web/lib/highcharts.js","common/wx/Cgi.js","biz_web/ui/dateRange.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/Tips.js","common/wx/top.js"],function(e){
"use strict";
e("biz_web/lib/highcharts.js");
var t=e("common/wx/Cgi.js"),a=e("biz_web/ui/dateRange.js"),o=e("biz_web/ui/dropdown.js"),n=e("biz_common/moment.js"),s=e("common/wx/pagebar.js"),i=(e("common/wx/popover.js"),
e("common/wx/Tips.js"),e("common/wx/top.js")),r=$("#js_tbody"),l=$(".js_tbody_loading"),c=$(".pagination_wrp"),d=$("#js_data_chart"),m=$(".js_date"),c=$(".pagination_wrp");
new i("#js_div_toptab",i.DATA.ibeacon).selected("dataReport");
var u=wx.cgiData.records,Y=n().subtract(7,"days").format("YYYYMMDD"),b=n().subtract(1,"days").format("YYYYMMDD"),f={
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
name:"摇周边人数趋势图",
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
},_={
0:"shake_uv",
1:"shake_pv",
2:"click_uv",
3:"click_pv",
4:"focus_uv",
5:"card_rece_uv",
6:"card_rece_pv"
},h=function(){
new o({
container:"#js_dropdown",
label:"摇周边人数趋势图",
data:[{
name:"摇周边人数趋势图",
value:0
},{
name:"摇周边次数趋势图",
value:1
},{
name:"点击人数趋势图",
value:2
},{
name:"点击次数趋势图",
value:3
},{
name:"公众号关注人数趋势图",
value:4
},{
name:"领券人数趋势图",
value:5
},{
name:"领券次数趋势图",
value:6
}],
callback:function(e,t){
f.series[0].name=t.replace("趋势图",""),g(e);
}
});
},p=function(){
a({
container:".js_date_range",
startDate:n(Y,"YYYYMMDD").format("YYYY-MM-DD"),
endDate:n(b,"YYYYMMDD").format("YYYY-MM-DD"),
minValidDate:n().subtract(180,"days").valueOf()/1e3,
stopToday:!0,
theme:"ta",
success:function(e){
console.log(e),$(".js_date.selected").removeClass("selected"),Y=n(e.startDate).format("YYYYMMDD"),
b=n(e.endDate).format("YYYYMMDD"),w({
begin_date:Y,
end_date:b
},function(){
g(0),D(u);
});
}
});
},D=function(e){
c.html(""),r.html(template.render("js_tbody_tpl",{
list:e.slice(0,15)
})),r.show(),l.hide(),e.length>15&&new s({
container:".pagination_wrp",
perPage:15,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:e.length,
callback:function(t){
r.html(template.render("js_tbody_tpl",{
list:e.slice(15*(t.currentPage-1),15*t.currentPage)
}));
}
});
},g=function(e){
f.xAxis[0].categories=[],f.series[0].data=[],f.xAxis[0].labels.step=u.length>10?Math.ceil(u.length/8):1,
u.each(function(t){
f.xAxis[0].categories.unshift(n(t.date,"YYYYMMDD").format("YYYY-MM-DD")),f.series[0].data.unshift({
time:n(t.date,"YYYYMMDD").format("YYYY-MM-DD"),
y:t[_[e]]
});
}),d.highcharts(f);
},w=function(e,a){
l.show(),r.hide(),t.post({
url:wx.url("/merchant/beaconstatsummary?action=list"),
data:{
begin_date:e.begin_date,
end_date:e.end_date
},
success:function(e){
u=JSON.parse(e.records),a();
}
});
},j=function(){
m.on("click",function(){
var e=$(this),t=e.data("val");
e.hasClass("selected")||($(".js_date.selected").removeClass("selected"),e.addClass("selected"),
Y=n().subtract(t,"days").format("YYYYMMDD"),b=n().subtract(1,"days").format("YYYYMMDD"),
w({
begin_date:Y,
end_date:b
},function(){
g(0),D(u);
}));
});
},M=function(){
$("#js_download").on("click",function(){
window.open("/merchant/beaconstatsummary?action=download&begin_date="+Y+"&end_date="+b+"&file_name="+Y+"-"+b+"效果汇总数据.xls&token="+wx.data.t);
});
};
h(),p(),g(0),D(u),j(),M();
});