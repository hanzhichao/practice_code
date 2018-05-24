define("statistics/user_stat/summary/summary-chart.js",["statistics/chart/jquery-chart.js","statistics/user_stat/summary/summary-state.js","statistics/user_stat/common.js","biz_common/moment.js"],function(a,e){
"use strict";
function t(){
var a,e=[],t=[];
a="new_user"===m.index&&"99999999"!==m.source?m.sourceData:m.userStatList,d(m.drawBeginDate,m.drawEndDate,function(s){
t.push(s);
var r=i(a,s);
e.push({
name:s,
y:r
});
});
var r=D[m.index];
"new_user"===m.index&&(r=r+"-"+m.sourceText),y.series=[{
name:r,
yAxis:0,
dataFormat:1,
data:e
}],y.categories=t,o.createChart(y),s();
}
function s(){
u("div.nodata h4").html("暂无数据");
}
function r(){
var a,e,t=[],r=[],u=[];
if("new_user"===m.index&&"99999999"!==m.source?(a=m.sourceData,e=m.compareSourceData):(a=m.userStatList,
e=m.compareUserStatList),e.length>a.length)var c=m.beginCompareDate,l=m.endCompareDate,_=!1,g=m.drawBeginDate;else var c=m.drawBeginDate,l=m.drawEndDate,_=!0,g=m.beginCompareDate;
d(c,l,function(s){
t.push(s),_?(r.push({
name:s,
y:i(a,s)
}),u.push({
name:g,
y:i(e,g)
})):(r.push({
name:g,
y:i(a,g)
}),u.push({
name:s,
y:i(e,s)
})),g=h(g).add(1,"days").format(p);
});
var f=D[m.index];
"new_user"===m.index&&(f=f+"-"+m.sourceText),y.series=[{
name:n(m.drawBeginDate,m.drawEndDate)+f,
yAxis:0,
dataFormat:1,
data:r
},{
name:n(m.beginCompareDate,m.endCompareDate)+f,
yAxis:0,
dataFormat:1,
data:u
}],y.categories=t,o.createChart(y),s();
}
function n(a,e){
var t="MM.DD";
return h(a).format(t)+"至"+h(e).format(t);
}
function i(a,e){
var t,s;
return a[e]?(s=a[e],t=s[m.index],s.isPatch&&0===t&&(t=null),t):null;
}
a("statistics/chart/jquery-chart.js");
var u=jQuery,m=a("statistics/user_stat/summary/summary-state.js"),e={},o=u("#js_msg_chart"),c=a("statistics/user_stat/common.js"),d=(c.log,
c.loopDay),h=a("biz_common/moment.js"),p="YYYY-MM-DD",y={
autoStep:!0,
chartType:"area",
title:"",
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
};
e.draw=function(){
m.needCompare?(y.isCompareSeries=1,r()):(y.isCompareSeries=0,t());
};
var D={
new_user:"新关注人数",
cancel_user:"取消关注人数",
netgain_user:"净增关注人数",
cumulate_user:"累积关注人数"
};
return e;
});