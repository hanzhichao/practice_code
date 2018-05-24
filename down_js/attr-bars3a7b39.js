define("statistics/user_stat/attr/attr-bars.js",["statistics/chart/jquery-chart.js","biz_common/moment.js","statistics/user_stat/attr/attr-state.js"],function(t,a){
"use strict";
function r(t){
var a="<h4 class='js_no_data'>暂无数据</h4>";
u(t).html(a),u(t).parent().addClass("nodata");
}
function s(){
return c.rawData.genders.length?(o("genders"),void $("#js_sex_bar").createChart(l)):r("#js_sex_bar");
}
function e(){
return c.rawData.langs.length?(o("langs"),void $("#js_language_bar").createChart(l)):r("#js_language_bar");
}
function n(){
return c.rawData.platforms.length?(o("platforms"),void $("#js_endpoint_bar").createChart(l)):r("#js_endpoint_bar");
}
function o(t){
var a=c.rawData[t],r=[];
a.sort(function(t,a){
return a.count-t.count;
});
for(var s=0,e=a.length;e>s;s++){
var n=a[s];
r.push({
name:n.name,
data:[{
name:h,
y:n.count
}]
});
}
l.categories=d,l.series=r;
}
t("statistics/chart/jquery-chart.js");
var i=t("biz_common/moment.js"),c=t("statistics/user_stat/attr/attr-state.js"),a={},u=jQuery,l={
chartType:"bar",
height:200,
dataFormat:"1",
theme:"wechat",
chartOptions:{
plotOptions:{
series:{
stacking:"normal"
}
},
legend:{
reversed:!0
},
yAxis:{
stackLabels:{
enabled:!0,
style:{
fontWeight:"bold",
color:"gray"
}
}
}
}
},h=null,d=null;
return a.draw=function(){
h=i(c.rawData.date).format("MM-DD"),d=[h],s(),e(),n();
},a;
});