define("statistics/interface/chart.js",["statistics/interface/state.js","biz_common/moment.js","statistics/interface/models.js","statistics/common.js","statistics/chart/jquery-chart.js"],function(e){
"use strict";
function t(){
h.dataFormat="fail_rate"===m.key?3:1,"daily"===m.type?m.dateState.needCompare?r():a():m.dateState.needCompare?n():c();
}
function a(){
var e=m.dateState.beginDate,t=m.dateState.endDate,a=s(e,t,u.list);
h.categories=a.cate,h.isCompareSeries=0,h.series=[{
name:m.keyText,
yAxis:0,
data:a.series
}],f.createChart(h);
}
function s(e,t,a){
var s=[],r=[];
return y.loopDay(e,t,function(e){
s.push(e);
var t=a[e];
r.push({
name:e,
y:+t[m.key]
});
}),{
cate:s,
series:r
};
}
function r(){
var e=m.dateState.beginDate,t=m.dateState.endDate,a=m.dateState.compareBeginDate,r=m.dateState.compareEndDate,n=s(e,t,u.list),c=s(a,r,u.compareList);
n.cate.length>=c.cate.length&&(h.categories=n.cate),h.isCompareSeries=1,h.series=[{
name:i(e,t)+m.keyText,
yAxis:0,
data:n.series
},{
name:i(a,r)+m.keyText,
yAxis:0,
data:c.series
}],f.createChart(h);
}
function i(e,t){
var a=d(e).format("MM.DD"),s=d(t).format("MM.DD");
return a+"至"+s;
}
function n(){
var e=o(u.list),t=o(u.compareList);
h.categories=e.cate,h.isCompareSeries=1,h.series=[{
name:d(m.dateState.beginDate).format("MM.DD")+m.keyText,
yAxis:0,
data:e.series
},{
name:d(m.dateState.compareBeginDate).format("MM.DD")+m.keyText,
yAxis:0,
data:t.series
}],f.createChart(h);
}
function c(){
var e=o(u.list);
h.categories=e.cate,h.isCompareSeries=0,h.series=[{
name:m.keyText,
yAxis:0,
data:e.series
}],f.createChart(h);
}
function o(e){
var t=[],a=[];
return y.loopHour(0,23,function(s){
var r=e[s];
t.push(s),a.push({
name:s,
y:+r[m.key]||0
});
}),{
cate:t,
series:a
};
}
var m=e("statistics/interface/state.js"),d=e("biz_common/moment.js"),u=e("statistics/interface/models.js"),y=e("statistics/common.js"),f=$("#js_msg_chart");
e("statistics/chart/jquery-chart.js");
var h={
autoStep:!0,
chartType:"area",
title:"",
height:300,
isCompareSeries:0,
dataFormat:1,
labelFormat:0,
enableLegend:!0,
theme:"wechat"
};
return{
draw:t
};
});