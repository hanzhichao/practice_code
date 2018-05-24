define("statistics/chart/empty-pie.js",["biz_web/lib/highcharts-v4.2.1.js"],function(e){
"use strict";
function t(e,t,o){
var a=i(t),o=o||{},o=$.extend(!0,{
pie:{
colors:r,
allowPointSelect:!0,
cursor:"pointer",
dataLabels:{
enabled:!1
},
showInLegend:!1
}
},o),s=new n.Chart({
chart:{
plotBackgroundColor:null,
plotBorderWidth:null,
plotShadow:!1,
type:"pie",
marginTop:o.marginTop,
renderTo:$(e).get(0)
},
title:{
useHTML:!0,
text:a.titleText,
x:0,
margin:0
},
minSize:200,
tooltip:{
pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"
},
credits:{
enabled:!1
},
plotOptions:o,
series:[{
name:"阅读总数",
colorByPoint:!0,
innerSize:o.innerSize||"60%",
data:a.list
}]
});
return s;
}
function i(e){
var t=$.extend(!0,[],e),i=0,n=0;
t.each(function(e,t){
i+=e.y,n+=e.y2,e._color_index=t;
});
var r='<span class="js_empty_pie_center_text">阅读总数<br><br>'+i+"次，"+n+"人</span>";
return{
titleText:r,
list:t
};
}
var n=e("biz_web/lib/highcharts-v4.2.1.js"),r=["#09bb07","#576b95","#459ae9","#ffbe00","#ff8a00"];
return t;
});