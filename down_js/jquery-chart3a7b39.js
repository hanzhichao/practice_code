define("statistics/chart/jquery-chart.js",["biz_web/lib/highcharts.js"],function(t){
"use strict";
var e=t("biz_web/lib/highcharts.js");
$.fn.multiChart=function(t){
var e=t,a=$(this).attr("id"),r="#"+a,i=t.chartType||"";
if($(r).empty(),e.hasOwnProperty("isMultiChart")){
var o=1;
for(var s in e.data){
var l=e.data[s],n=l.width||"100%",h=a+o++;
$(r).append("<div id='"+h+"' style='float:left;width:"+n+"'></div>"),$("#"+h).createChart({
chartType:i,
dataFormat:1,
categories:l.data.categories,
series:l.data.series,
chartOptions:l.data.chartOptions
});
}
}else $(r).createChart(e);
},$.fn.createChart=function(t){
function e(t){
var e={
title:{
margin:20,
y:20,
style:{
fontSize:"16px"
}
},
colors:["#5D9CEC","#62C87F","#F15755","#FC863F","#7053B6","#FFCE55","#6ED5E6","#F57BC1","#DCB186","#647C9D"],
lang:{
months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
shortMonths:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
weekdays:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],
resetZoom:"查看全图",
resetZoomTitle:"查看全图",
downloadPNG:"下载PNG",
downloadJPEG:"下载JPEG",
downloadPDF:"下载PDF",
downloadSVG:"下载SVG",
exportButtonTitle:"导出成图片",
printButtonTitle:"打印图表",
loading:"数据加载中，请稍候..."
},
chart:{
borderWidth:0,
selectionMarkerFill:"rgba(122, 201, 67, 0.25)",
style:{
fontFamily:'Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
},
resetZoomButton:{
theme:{
fill:"white",
stroke:"silver",
r:0,
states:{
hover:{
fill:"#41739D",
style:{
color:"white"
}
}
}
}
}
},
xAxis:{
startOnTick:!1,
lineColor:"#6a7791",
lineWidth:1,
tickPixelInterval:150,
tickmarkPlacement:"on",
staggerLines:1,
showLastLabel:!0,
endOnTick:!0
},
yAxis:{
title:{
text:""
},
min:0,
gridLineColor:"#eae9e9",
showFirstLabel:!1
},
plotOptions:{
pie:{
allowPointSelect:!0,
innerSize:"45%",
cursor:"pointer",
dataLabels:{
enabled:!1,
color:"#000000",
connectorColor:"#000000"
}
},
series:{
pointPalcement:"on",
fillOpacity:.1,
shadow:!1,
dataLabels:{
enabled:!0
},
marker:{
enabled:!0,
radius:4,
fillColor:null,
lineWidth:1,
lineColor:"#FFFFFF",
states:{
hover:{
enabled:!0
}
}
}
}
},
legend:{
borderWidth:0,
itemStyle:{
color:"#000000",
fontFamily:"Microsoft YaHei",
fontSize:"14px",
fontWeight:"normal"
},
verticalAlign:"bottom",
maxHeight:57,
symbolWidth:12,
symbolHeight:12
},
tooltip:{
borderColor:"#666",
borderWidth:1,
borderRadius:2,
backgroundColor:"rgba(255, 255, 255, 0.7)",
useHTML:!0,
crosshairs:{
color:"#7ac943",
dashStyle:"shortdot"
},
shared:!0
},
credits:{
enabled:!1,
href:"http://ta.qq.com",
text:"ta.qq.com",
position:{
align:"right",
x:-10,
verticalAlign:"bottom",
y:0
}
}
};
if("wechat"==t){
var a={
colors:["#44B549","#4A90E2","#EBCB6B","#BB7FB2","#DA7D2A"],
chart:{
backgroundColor:"#fff"
},
plotOptions:{
series:{
fillColor:"rgba(135, 179, 212, 0.05)"
},
legend:{
enabled:!1
}
},
title:{
text:""
},
xAxis:{
labels:{
formatter:function(){
return this.value;
},
style:{
color:"#8D8D8D"
},
step:Math.ceil(length/7)
},
title:{
style:{
color:"#7eafdd"
}
},
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
},
yAxis:{
labels:{
formatter:function(){
return this.value>0?this.value:"";
},
style:{
color:"#8D8D8D",
fontFamily:"Microsoft yahei"
}
},
gridLineColor:"#F2F3F4",
allowDecimals:!1
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
pointFormat:'<b style="font-family:Microsoft yahei">{point.y}<br/>{point.date}</b>'
},
series:{
color:"#44B549",
lineWidth:2,
marker:{
enabled:!0,
radius:5,
lineWidth:3,
lineColor:"#fff"
}
},
exporting:{
enabled:!1
}
};
e=$.extend(!0,e,a);
}
if("qyh"==t){
var r={
colors:["#4A90E2","#7FB887","#EBCB6B","#BB7FB2","#DA7D2A"],
chart:{
backgroundColor:"#fff"
},
plotOptions:{
series:{
fillOpacity:.1
}
},
xAxis:{
lineColor:"#8D8988",
lineWidth:2
},
yAxis:{
gridLineColor:"#D1D1D1"
},
tooltip:{
borderColor:"#3C3C3C",
backgroundColor:"#525254",
style:{
color:"#FFFFFF"
},
crosshairs:{
color:"#4A90E2",
dashStyle:"shortdot"
}
},
legend:{
symbolWidth:12
}
};
e=$.extend(!0,e,r);
}
Highcharts.setOptions(e);
}
function a(e,a){
e.dataFormat=e.dataFormat||t.dataFormat,null!=t.yMin&&null!=t.yMax&&(e.min=t.yMin,
e.max=t.yMax),3==e.dataFormat&&x[a]&&x[a]>95&&(e.max=100),5==e.dataFormat&&x[a]&&x[a]>.95&&(e.max=1),
0==m&&(e.max=100),e.labels=e.labels||{},v.tooltip.valueSuffix&&(e.labels.formatter=function(){
var t=5==e.dataFormat?Highcharts.numberFormat(100*this.value,0):this.value;
return t+v.tooltip.valueSuffix;
}),4==e.dataFormat&&(e.labels.formatter=function(){
return r(e.dataFormat,this.value);
}),(5==e.dataFormat||3==e.dataFormat)&&(e.labels.formatter=function(){
var t=5==e.dataFormat?Highcharts.numberFormat(100*this.value,0):this.value;
return t+"%";
});
}
function r(t,e){
switch(t=parseInt(t)){
case 1:
e=Highcharts.numberFormat(e,0);
break;

case 2:
e=Highcharts.numberFormat(e,2);
break;

case 3:
e=Highcharts.numberFormat(e,2)+"%";
break;

case 4:
var a=function(t){
var e=parseInt(t/3600),a="00"+parseInt(t%3600/60),r="00"+parseInt(t%3600%60);
return a=a.substr(a.length-2,2),r=r.substr(r.length-2,2),e+":"+a+":"+r;
};
e=a(e);
break;

case 5:
e=Highcharts.numberFormat(100*e,2)+"%";
break;

case 7:
e=e>=1||-1>=e?Highcharts.numberFormat(e,0):Highcharts.numberFormat(e,2);
}
return e;
}
function i(){
return;
}
function o(){
return"pie"!==v.chart.type;
}
function s(t){
var e=t.replace(/(^\s+|\s+$)/g,"");
if(""==e)return!1;
var a=e.replace(/[\d]{4,4}[\-\/]{1}[\d]{1,2}[\-\/]{1}[\d]{1,2}/g,"");
if(""==a){
var r=new Date(e.replace(/\-/g,"/")),i=e.split(/[-\/:]/);
if(i[0]==r.getFullYear()&&i[1]==r.getMonth()+1&&i[2]==r.getDate())return!0;
}
return!1;
}
function l(t){
var e=t.replace(/(^\s+|\s+$)/g,"");
if(""==e)return null;
var a=e.replace(/[\d]{4,4}[\-\/]{1}[\d]{1,2}[\-\/]{1}[\d]{1,2}/g,"");
if(""==a){
var r=new Date(e.replace(/\-/g,"/")),i=e.split(/[-\/:]/);
if(i[0]==r.getFullYear()&&i[1]==r.getMonth()+1&&i[2]==r.getDate())return r;
}
return null;
}
function n(t){
var e=new Date(t),a=isNaN(e)?t:e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();
return a;
}
function h(t){
for(var e=[],a=0,r=t.length;r>a;a++)e.push(t[a]);
return e;
}
function d(t){
var e,a=[];
if($.isArray(t))for(var r=0,i=t.length;i>r;r++){
var o=t[r];
e=p(o),a.push(e),c(e);
}else e=p(t),c(e),a.push(e);
return a;
}
function c(t){
return delete t.data.clone,delete t.data.each,delete t.data.last,t;
}
function p(e){
if(!e)return{
name:" ",
data:[]
};
var a={
name:e.name||"",
data:[]
};
a=$.extend(!0,a,e),a.data=[];
for(var r=e.data||[],i=[],s=0,l=0,n=a.yAxis||0,h=0,d=r.length;d>h;h++){
var c,p=r[h];
c=p,"wechat"!=t.theme&&o()&&(c.marker=c.marker||{},"undefined"==typeof c.marker.enabled&&(c.marker.enabled=!1));
var u=c.y;
null!=u&&(g=!0,s++,m=m>u?m:u,l+=c.y,x[n]=x[n]>u?x[n]:u),i.push(c);
}
for(var f in i){
var p=i[f];
null!=p.y&&("wechat"!=t.theme&&o()&&(p.marker.enabled=7>=s),p.percentage=Math.round(parseFloat(1e4*p.y)/l)/100);
}
return a.data=i,a.showInLegend=a.showInLegend===!1?!1:v.legend.enabled,a;
}
function u(){
b>=m||(midY=(m-b)/2,H.plotLines=[{
dashStyle:"longdashdot",
color:"red",
width:1,
value:midY,
label:{
text:"中位线"
}
}]);
}
var m,f={
title:"",
width:"100%",
height:300,
showLabel:!0,
showMarker:!0,
chartType:"area",
dataFormat:1,
labelFormat:0,
categories:[],
series:[],
yMin:null,
yMax:null,
xAxisLabelStep:0,
xAxisTickInterval:0,
enableZoom:!0,
autoStep:!0,
showPlotLine:!1,
enableLegend:!0,
autoYAxisInterval:!0,
maxYAxisIntervalCount:3,
theme:"",
cssNoData:"nodata",
isCompareSeries:!1,
autoxAxisDataType:!1,
chartOptions:{
chart:{},
title:{},
xAxis:{
categories:"",
labels:{
staggerLines:1
}
},
yAxis:{
min:0
},
plotOptions:{
pie:{},
series:{
dataLabels:{}
}
},
legend:{},
tooltip:{}
}
},b=m=0,g=!1,x=[],y=1;
t=$.extend(!0,f,t),e(t.theme),$(this).css("height",t.height);
var v=t.chartOptions,F={
area:"area",
line:"line",
pie:"pie",
bar:"bar",
spline:"spline",
column:"column"
}[t.chartType]||"area";
if(v.chart.type=v.chart.type||F,"object"==typeof t.title?v.title=t.title:v.title.text=t.title,
v.legend.enabled=t.enableLegend,$.isArray(v.yAxis)){
y=v.yAxis.length;
for(var A=0;y>A;A++)x[A]=0;
}
if(v.series=d(t.series),!g)return $(this).addClass(t.cssNoData),void $(this).html("<H4>"+v.title.text+"</H4>");
if($(this).removeClass(t.cssNoData),!t.categories&&(v.chart.type="pie"),t.categories&&"pie"!=v.chart.type){
for(var C=!1,w=0,k=0,A=0,D=t.categories.length;D>A;A++){
var L=t.categories[A].toString();
if(w<L.length&&(w=L.length),0==k){
var M=t.categories[A].toString();
C=s(M),k++;
}
}
if(t.autoxAxisDataType&&C&&(v.xAxis.type="datetime"),"datetime"!==v.xAxis.type){
v.xAxis.categories=h(t.categories);
var O=6*w+50;
if(t.autoStep){
var S=v.xAxis.tickInterval||1;
v.xAxis.labels.step=Math.ceil(v.xAxis.categories.length/($(this).css("width").replace(/[^\d\.]/g,"")/O)/S);
}
}else{
var B=864e5;
v.plotOptions.series.pointStart=startDate,v.plotOptions.series.pointInterval=B,v.xAxis.maxZoom=7*B,
v.xAxis.labels=v.xAxis.labels||{},v.xAxis.labels.formatter=v.xAxis.labels.formatter||function(){
var t=new Date(this.value),e=isNaN(t)?this.value:t.getMonth()+1+"-"+t.getDate();
return e;
},v.xAxis.tickInterval=B;
var O=60;
v.xAxis.labels.step=Math.ceil(t.categories.length/($(this).css("width").replace(/[^\d\.]/g,"")/O));
}
t.xAxisLabelStep>0&&(v.xAxis.labels.step=t.xAxisLabelStep);
}
null!=t.yMin&&null!=t.yMax&&(b=t.yMin,m=t.yMax);
var H="";
if($.isArray(v.yAxis)){
H=v.yAxis[0];
for(var A in v.yAxis)a(v.yAxis[A],A);
}else H=v.yAxis,a(v.yAxis,0);
switch(t.labelFormat){
case 0:
v.plotOptions.series.dataLabels.enabled=!1;
break;

case 1:
v.plotOptions.series.dataLabels.enabled=!0,v.plotOptions.series.dataLabels.formatter=v.plotOptions.series.dataLabels.formatter||function(){
var t=this.point.series,e=t.dataFormat||t.yAxis.userOptions.dataFormat||H.dataFormat;
return r(e,this.y);
};
break;

case 2:
v.plotOptions.series.dataLabels.enabled=!0,v.plotOptions.series.dataLabels.formatter=v.plotOptions.series.dataLabels.formatter||function(){
return Highcharts.numberFormat(this.percentage,2)+"%";
};
break;

default:
v.plotOptions.series.dataLabels.enabled=!1;
}
if(t.showPlotLine&&u(),t.autoYAxisInterval&&i(),v.tooltip=v.tooltip||{},"pie"!=v.chart.type){
if(v.tooltip.formatter=v.tooltip.formatter||function(){
var e=H.name?" ("+H.name+")":"",a=C?n(this.x):this.x;
a=v.tooltip.title?v.tooltip.title(this):a;
var i='<div style="padding:5px;"><b>'+a+e+'</b></div><table style="border-collapse: collapse;width: 150px">';
return $.each(this.points,function(e,a){
var o=a.series.dataFormat||a.series.yAxis.userOptions.dataFormat||H.dataFormat,n=r(o,a.y),h=v.tooltip.valueSuffix||"",d=a.series.name;
if(t.isCompareSeries){
var c=a.key;
if(s(a.key)){
var p=l(a.key);
c=p.getMonth()+1+"-"+p.getDate();
}
d+=" ("+c+")";
}
i+='<tr><td style="padding: 2px 5px" >'+d+' </td><td style="text-align: right;padding-left:15px">'+n+h+" </td></tr>";
}),i+="</table>";
},"bar"==v.chart.type){
var T=$(this);
v.tooltip.positioner=function(t,e){
var a={
x:T.width()-t-100,
y:(T.height()-e-50)/2
};
return{
x:a.x>0?a.x:0,
y:a.y>0?a.y:0
};
};
}
}else v.tooltip.shared=!1,v.tooltip.useHTML=!1,v.tooltip.formatter=v.tooltip.formatter||function(){
return"<b>"+this.point.name+"</b>: "+Math.round(100*this.percentage)/100+" %";
};
if(v.chart.renderTo=$(this).attr("id"),v.plotOptions.column)try{
v.xAxis.labels.step=1;
}catch(I){}
var P=new Highcharts.Chart(v);
return P;
},window.HighCharts=e;
});