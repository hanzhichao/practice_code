define("statistics/article/detail/detail/multimedia/renderers.js",["biz_web/lib/highcharts-v4.2.1.js","statistics/article/detail/detail/multimedia/chart-options.js","biz_web/lib/highcharts-more-v4.2.4.js"],function(t){
"use strict";
function e(t){
return function(e){
return"%s %s".sprintf(t,e.x.duration);
};
}
function i(t,e){
var i=h.getTrendOptions(t);
e.createChart(i);
}
function r(t,i){
var r=h.getColumnOptions(t,i.width(),e("播放时长"));
i.createChart(r);
}
function n(t,i){
var r=h.getColumnOptions(t,i.width(),e("观看时间"));
i.createChart(r);
}
function a(t,i){
var r=h.getColumnOptions(t,i.width(),e("拖拽起点"));
i.createChart(r);
}
function s(t,i){
var r=h.getColumnOptions(t,i.width(),e("拖拽终点"));
i.createChart(r);
}
var c=t("biz_web/lib/highcharts-v4.2.1.js"),h=t("statistics/article/detail/detail/multimedia/chart-options.js");
return t("biz_web/lib/highcharts-more-v4.2.4.js")(c),[{
name:"播放数趋势",
render:i
},{
name:"播放时长分布",
render:r
},{
name:"播放时间分布",
render:n,
size:{
width:900
}
},{
name:"拖拽起点分布",
render:a
},{
name:"拖拽终点分布",
render:s
}];
});