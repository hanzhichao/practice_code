define("statistics/article/detail/detail/multimedia/chart-options.js",["statistics/common.js","tpl/statistics/bubble-tips.html.js"],function(t){
"use strict";
function e(t){
return $.extend({
autoStep:!0,
chartType:"area",
height:300,
isCompareSeries:0,
dataFormat:"1",
labelFormat:0,
enableLegend:!0,
theme:"wechat",
chartOptions:{
yAxis:{
min:null
}
}
},t||{});
}
function n(t,n,i,r,a){
a=a||"";
var s=n/(1.09*t.length);
return s=s>100?100:s,$.extend(e({
chartType:"column",
categories:u(t),
series:c(t,a+"次数"),
enableLegend:!1,
chartOptions:{
plotOptions:{
column:{
pointWidth:s,
states:{
hover:{
color:"#459ae9"
}
}
}
},
title:{
text:""
},
tooltip:{
title:i
},
xAxis:{
tickWidth:0,
labels:{
useHTML:!0,
formatter:o(s,t.length),
step:1
}
},
yAxis:{
gridLineWidth:0,
labels:{}
}
}
}),r||{});
}
function i(t,e,n,i){
var o=20;
return{
chart:{
fontFamily:"微软雅黑",
type:"bubble",
renderTo:i
},
credits:{
enabled:!1
},
legend:{
enabled:!1
},
enableLegend:!1,
tooltip:{
backgroundColor:"#555556",
borderRadius:0,
borderWidth:0,
shadow:!1,
style:{
color:"#fff"
},
headerFormat:"",
useHTML:!0,
shared:!0,
formatter:function(){
return m(this);
}
},
plotOptions:{
bubble:{
minSize:o,
maxSize:o,
marker:{
lineWidth:0,
fillColor:"#9bc6ed",
states:{
hover:{
lineWidth:0,
fillColor:"#459AE9"
}
}
}
}
},
xAxis:{
gridLineWidth:1,
startOnTick:!1,
endOnTick:!1,
title:{
text:e,
align:"high",
style:r()
}
},
yAxis:{
startOnTick:!1,
endOnTick:!1,
title:{
text:n,
align:"high",
style:r(),
rotation:0,
y:5
}
},
title:{
text:""
},
series:f(t)
};
}
function r(){
return{
fontFamily:"微软雅黑",
fontSize:"15px"
};
}
function o(t,e){
return function(){
return a(this.value,t,e);
};
}
function a(t,e){
var n=$("<div />");
return n.append(s(t.from,-e/2)),t.last?n.append(s(t.to,e/2,"absolute")):void 0,n.html();
}
function s(t,e,n){
n=n||"relative";
var i=$("<span />");
return i.css($.extend({
display:"inline-block",
position:n,
left:"%spx".sprintf(e)
},l(.8))).html(t),i;
}
function l(t){
var e="scale(%s)".sprintf(t);
return{
transform:e,
webKitTransform:e,
mozTransform:e,
msTransform:e,
oTransform:e
};
}
function u(t){
return g.map(t,function(e,n){
return e?{
from:e.current,
to:e.next,
duration:e.duration,
last:n===t.length-1
}:void 0;
});
}
function c(t,e){
return[{
name:e,
data:g.map(t,function(t){
return t?{
y:t.pv
}:void 0;
}),
color:"#95D2F3",
shadow:!1
}];
}
function d(t){
return g.map(t,function(t){
return t.date;
});
}
function p(t){
return[b("播放次数",g.map(t,h("pv"))),b("播放人数",g.map(t,h("uv")))];
}
function m(t){
var e=t.point.options.xy[0],n=t.point.options.xy[1];
return v({
time:"从 %s 秒拖拽到 %s 秒".sprintf(e,n),
userCount:t.point.z
});
}
function f(t){
return[{
data:t
}];
}
function h(t){
return function(e){
return{
name:e.date,
y:e[t]
};
};
}
function b(t,e){
return{
name:t,
yAxis:0,
dataFormat:1,
data:e
};
}
function x(t){
return e({
categories:d(t),
series:p(t)
});
}
var g=t("statistics/common.js"),v=template.compile(t("tpl/statistics/bubble-tips.html.js"));
return{
getTrendOptions:x,
getColumnOptions:n,
getBubbleOptions:i
};
});