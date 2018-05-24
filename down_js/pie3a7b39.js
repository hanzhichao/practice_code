define("statistics/chart/pie.js",["statistics/common.js","biz_web/lib/highcharts-v4.2.1.js"],function(t){
"use strict";
function e(t,e){
var e=e||{},o=new l.Chart($.extend(!0,{
chart:{
fontFamily:"微软雅黑",
plotBackgroundColor:null,
plotBorderWidth:null,
plotShadow:!1,
type:"pie",
marginTop:e.marginTop,
renderTo:$(t).get(0),
style:{
fontFamily:r,
fontWeight:"lighter"
},
events:{
load:function(){
this.adjustY=e.adjustY||0,i.call(this),e.load&&e.load();
},
redraw:function(){
i.call(this),e.redraw&&e.redraw();
}
}
},
title:{
useHTML:!0,
text:'<span class="js_pie_chart_title">'+e.titleText+"</span>",
align:"center",
verticalAlign:"middle",
style:{
textAlign:"center"
},
x:e.x||0,
y:e.y||-10
},
legend:$.extend({
useHTML:!0,
itemStyle:{
fontWeight:"lighter",
fontSize:14
}
},s.lengendItemShape),
tooltip:{
useHTML:!0,
pointFormat:"{series.name}: <b>{point.percentage:.2f}%</b>",
backgroundColor:"rgba(255,255,255,1)",
style:{
fontWeight:"lighter"
}
},
credits:{
enabled:!1
},
plotOptions:{
pie:{
colors:n,
allowPointSelect:!0,
cursor:"pointer",
dataLabels:{
enabled:!0,
format:"{point.percentage:.2f}%",
style:{
fontWeight:"lighter",
fontSize:14
}
},
showInLegend:!0,
size:e.size||100,
innerSize:"70%"
}
},
series:$.extend({
colorByPoint:!0
},e.series)
},e));
return o;
}
function i(){
var t=this.title.textStr||this.titleStr;
this.titleStr=t,this.title&&this.title.destroy();
var e=this.adjustY||0,i=this.renderer,s=this.series[0].center[0]+this.plotLeft,l=this.series[0].center[1]+this.plotTop+e;
this.title=i.label(t,0,0,null,null,null,!0).css({
fontFamily:r
}).hide().add();
var n=this.title.getBBox();
$(this.title.div).css("text-align","center"),this.title.attr({
x:s-n.width/2,
y:l-n.height/2
}).show();
}
var s=t("statistics/common.js"),l=t("biz_web/lib/highcharts-v4.2.1.js"),n=["#60BBEB","#468EE5","#3EA8B6","#3EB642","#2CA830","#2B842E","#D34F4F","#98D34F","#82E8FF","#FFB300","#D09A45","#E4B139","#EE903D","#EB6060","#EB60A3","#9062C0","#C062B4","#FF8282","#8B82FF"],r='"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif';
return e;
});