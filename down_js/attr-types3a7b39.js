define("statistics/user_stat/attr/attr-types.js",["statistics/chart/jquery-chart.js","statistics/user_stat/attr/attr-state.js","common/wx/report_util.js","statistics/common.js"],function(t,e){
"use strict";
function a(){
l.categories=o.type.chart.cate,l.series=o.type.chart.series,$("#js_types_dist").createChart(l);
}
function s(){
var t=template("js_types_table_tpl",{
data:o.type.data,
totalCount:o.type.totalCount
});
$("#js_types div.table_wrp table tbody").html(t);
}
function n(){
r(),o.type.isDesc=!0,i();
}
function r(){
c("#js_types .rank").click(function(){
var t=c(this);
o.type.isDesc=!o.type.isDesc,o.type.isDesc?(t.find("i.arrow_up").hide(),t.find("i.arrow_down").show()):(t.find("i.arrow_up").show(),
t.find("i.arrow_down").hide()),i(),s();
});
}
function i(){
var t=o.type.isDesc,e=o.type.data;
e&&e.sort(function(e,a){
return t?a.count-e.count:e.count-a.count;
});
}
t("statistics/chart/jquery-chart.js");
var e={},o=t("statistics/user_stat/attr/attr-state.js"),c=(t("common/wx/report_util.js"),
jQuery),u=t("statistics/common.js"),p=[],h={
name:"用户数",
data:[]
},l={
autoStep:!0,
chartType:"pie",
height:500,
isCompareSeries:0,
dataFormat:"1",
labelFormat:0,
theme:"wechat",
enableLegend:!1,
chartOptions:{
chart:{
height:500
},
legend:{
enabled:!1
},
plotOptions:{
pie:{
size:240,
innerSize:0,
cursor:"pointer",
dataLabels:{
enabled:!0,
format:"<b>{point.name}</b>: {point.percentage:.1f} %"
}
}
}
}
},d=u.typesMap;
return e.initState=function(){
for(var t=0,e=[],a=o.rawData.devices.slice(0,10).sort(function(t,e){
return e.count-t.count;
}),s=0,n=a.length;n>s;s++)t+=a[s].count;
for(var s=0,n=a.length;n>s;s++){
var r=a[s],i="0"===r.value?"未知":r.value;
p.push(i);
var c={
name:i,
y:r.count,
count:r.count,
label:r.count/t
};
h.data.push(c),c.convert_name=d[i]||i,c.name=c.convert_name,e.push(c);
}
o.type={
chart:{
cate:p,
series:h
},
data:e
},o.type.totalCount=t;
},e.draw=function(){
a(),n(),s();
},e;
});