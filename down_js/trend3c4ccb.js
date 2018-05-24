define("statistics/article/detail/detail/trend.js",["statistics/article/detail/state.js","biz_common/moment.js","statistics/common.js"],function(t,a){
"use strict";
function e(t,a){
var e=t.publish_date,s=r(e).add("d",7),n=[],u=[],l=[];
return s=s.format("X")>m.format("X")?m.format(c):s.format(c),i.loopDay(e,s,function(e){
n.push(e);
try{
var s=t.summary[e];
}catch(r){
s=null;
}
u.push({
name:e,
y:s?s[a+"_user"]:0
}),l.push({
name:e,
y:s?s[a+"_count"]:0
});
}),d.categories=n,d.series=[{
dataFormat:1,
yAxis:0,
name:"图文总阅读次数",
data:l
},{
dataFormat:1,
yAxis:0,
name:"图文总阅读人数",
data:u
}],o.extend({},d);
}
var a={},s=t("statistics/article/detail/state.js"),r=t("biz_common/moment.js"),i=t("statistics/common.js"),m=r().add("d",-1),n=null,o=jQuery,c="YYYY-MM-DD",d={
autoStep:!0,
chartOptions:{},
chartType:"area",
dataFormat:"1",
height:300,
width:"100%",
isCompareSeries:0,
labelFormat:0,
theme:"wechat"
};
return a.render=function(t,a){
setTimeout(function(){
n=s.summaryData[t.msgid]||{};
var r=e(t,a);
o("#js_trend_chart").createChart(r);
});
},a;
});