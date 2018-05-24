define("statistics/article/detail/detail/type.js",["statistics/common.js"],function(t,e){
"use strict";
function n(){
l=[],f={
name:"用户数",
data:[]
},h=[],_=0;
}
function a(){
for(var t=v.slice(0,10).sort(function(t,e){
return e.count-t.count;
}),e=0,n=t.length;n>e;e++)_+=t[e].user_count;
for(var e=0,n=t.length;n>e;e++){
var a=t[e],r="0"===a.attr_value?"未知":a.attr_value;
if(r){
l.push(r);
var o={
name:r,
y:a.user_count,
count:a.user_count,
label:a.user_count/_
};
f.data.push(o),o.convert_name=y[r]||r,o.name=o.convert_name,h.push(o);
}
}
}
function r(){
b.categories=l,b.series=f,$("#js_types_dist").createChart(b);
}
function o(){
var t=template("js_types_table_tpl",{
data:h,
totalCount:_
});
$("#js_types div.table_wrp table tbody").html(t);
}
function i(){
c(),s(),m=!0,u();
}
function s(){
var t=p("#js_types .rank");
m=!0,t.find("i.arrow_up").show(),t.find("i.arrow_down").show();
}
function c(){
w||(p("#js_types .rank").click(function(){
var t=p(this);
m=!m,m?(t.find("i.arrow_up").hide(),t.find("i.arrow_down").show()):(t.find("i.arrow_up").show(),
t.find("i.arrow_down").hide()),u(),o();
}),w=!0);
}
function u(){
var t=h;
t&&t.sort(function(t,e){
return m?e.count-t.count:t.count-e.count;
});
}
var e={},p=jQuery,d=t("statistics/common.js"),l=[],f={
name:"用户数",
data:[]
},h=[],_=0,m=!1,v=null,w=!1,b={
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
},y=d.typesMap;
return e.render=function(t){
v=t.portrait?t.portrait.devices:[],n(),a(),r(),i(),o();
},e;
});