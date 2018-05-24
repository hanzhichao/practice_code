define("reward/list2.js",["common/wx/top.js","biz_web/ui/dropdown.js","biz_web/ui/dateRange.js","biz_common/moment.js","biz_web/lib/highcharts.js","common/wx/Cgi.js"],function(a){
"use strict";
var t=a("common/wx/top.js"),e=a("biz_web/ui/dropdown.js"),r=a("biz_web/ui/dateRange.js"),n=a("biz_common/moment.js");
a("biz_web/lib/highcharts.js"),new t("#topTab",t.DATA.reward).selected("list");
var i=a("common/wx/Cgi.js"),o=function(){
function a(){
s=new e({
container:"#chartTypeSelect",
label:"金额趋势图",
data:[{
value:0,
name:"金额趋势图"
},{
value:1,
name:"人数趋势图"
}],
callback:function(){
t(s.value,s.name);
}
}),new e({
container:"#chartDaySelect",
label:"最近7日",
data:[{
name:"最近7日",
value:-8
},{
name:"最近30日",
value:-31
}],
callback:function(a){
var t=n.unix(wx.data.time).add("days",a).format("YYYY-MM-DD"),e=n.unix(wx.data.time).add("days",-1).format("YYYY-MM-DD");
d=r({
container:"#chartDayRange",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:t,
endDate:e,
theme:"ta",
success:function(){
var a=n(d.getCurrentDate().startDate,"YYYY-MM-DD"),t=n(d.getCurrentDate().endDate,"YYYY-MM-DD");
o(a,t);
}
}),o(t,e);
}
}),d=r({
container:"#chartDayRange",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:n.unix(wx.data.time).add("days",-8).format("YYYY-MM-DD"),
endDate:n.unix(wx.data.time).add("days",-1).format("YYYY-MM-DD"),
theme:"ta",
success:function(){
var a=n(d.getCurrentDate().startDate,"YYYY-MM-DD"),t=n(d.getCurrentDate().endDate,"YYYY-MM-DD");
o(a,t);
}
}),wx.cgiData.chartList.each(function(a){
l.xArray.push(n.unix(a.stat_date).format("MM-DD")),l.yArrayMoney.push(a.reward_money),
l.xArrayCount.push(a.reward_count);
}),t(s.value,s.name);
}
function t(a,t){
0==value?(xArray=l.xArray,yArray=l.yArrayMoney):(xArray=l.xArray,yArray=l.xArrayCount);
var e={
xAxis:[{
labels:{
formatter:function(){
return this.value;
},
style:{
color:"#8D8D8D"
},
step:1
},
title:{
text:"",
style:{
color:"#7eafdd"
}
},
categories:xArray,
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
}],
series:[{
name:t,
color:"#44B549",
lineWidth:2,
marker:{
radius:5,
lineWidth:3,
lineColor:"#fff"
},
states:{
hover:{
enabled:!0,
lineWidth:2
}
}
}],
chart:{
renderTo:"wxChartsFans",
zoomType:"xy",
type:"area",
marginLeft:50,
marginRight:50,
backgroundColor:"#FFFFFF"
},
title:{
text:""
},
credits:{
enabled:!1
},
yAxis:[{
title:{
text:"",
style:{
color:"#8D8D8D",
fontFamily:"Microsoft yahei"
}
},
allowDecimals:!1,
gridLineColor:"#F2F3F4",
offset:0
}],
plotOptions:{
series:{
fillColor:"rgba(135, 179, 212, 0.05)"
}
},
legend:{
enabled:!1
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
pointFormat:'<b style="font-family:Microsoft yahei"> {series.name} : {point.y}</b><br/>{point.time}'
},
exporting:{
enabled:!1
}
};
if(0==xArray.length||0==yArray.length)return $("#chartSelect").hide(),void $("#chartContain").html('<p class="empty_tips">暂无数据</p>').height("222px");
$("#chartSelect").show(),xArray.length>10&&(e.xAxis[0].labels.step=Math.ceil(xArray.length/10));
var r=[];
$.each(xArray,function(a,t){
r.push({
time:t,
y:1*yArray[a]
});
}),e.series[0].data=r,$("#chartContain").height("400px").highcharts(e);
}
function o(a,e){
i.get({
url:"/merchant/rewardstat?action=getstat",
mask:!0,
data:{
begin_time:a,
end_time:e
}
},function(a){
0==a.base_resp.ret?(l={
xArray:[],
yArrayMoney:[],
xArrayCount:[]
},a.recent_stat_info&&a.recent_stat_info.each(function(a){
l.xArray.push(n.unix(a.stat_date).format("MM-DD")),l.yArrayMoney.push(a.reward_money),
l.xArrayCount.push(a.reward_count);
}),t(s.value,s.name)):(i.handleRet(a,{
id:64462,
key:32,
url:"/merchant/rewardstat?action=getstat"
}),Tips.err());
});
}
var s,d,l={
xArray:[],
yArrayMoney:[],
xArrayCount:[]
};
return{
init:a
};
}();
o.init();
var s=function(){
function a(t,e,r,n){
i.get({
url:"/merchant/rewardstat?action=getappmsgstatlist",
mask:!0,
data:{
begin_time:t,
end_time:e,
offset:r||0,
count:s
}
},function(r){
0==r.base_resp.ret?r.recent_appmsg_stat_info.length>0?($("#detail").html(template.render("tpl",{
data:r.recent_appmsg_stat_info
})),1==n&&new Pagebar({
container:"#pageBar",
totalItemsNum:r.recent_appmsg_total_count,
isSimple:!0,
callback:function(r){
a(t,e,(r.currentPage-1)*s,!1);
}
}),$("#detail").show(),$("#pageBar").show(),$("#noData").hide()):($("#detail").hide(),
$("#pageBar").hide(),$("#noData").show()):Tips.err();
});
}
var t,o,s=10;
return t=new e({
container:"#daySelect",
label:"最近7日",
data:[{
name:"最近7日",
value:-8
},{
name:"最近30日",
value:-31
}],
callback:function(t){
var e=n.unix(wx.data.time).add("days",t).format("YYYY-MM-DD"),i=n.unix(wx.data.time).add("days",-1).format("YYYY-MM-DD");
o=r({
container:"#dayRange",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:e,
endDate:i,
theme:"ta",
success:function(){
var t=n(o.getCurrentDate().startDate,"YYYY-MM-DD"),e=n(o.getCurrentDate().endDate,"YYYY-MM-DD");
a(t,e,0,!0);
}
}),a(e,i,0,!0);
}
}),wx.cgiData.detailList.length>0?($("#detail").html(template.render("tpl",{
data:wx.cgiData.detailList
})),new Pagebar({
container:"#pageBar",
totalItemsNum:json.recent_appmsg_total_count,
isSimple:!0,
callback:function(t){
a(start,end,(t.currentPage-1)*s,!1);
}
}),$("#detail").show(),$("#pageBar").show(),$("#noData").hide()):($("#detail").hide(),
$("#pageBar").hide(),$("#noData").show()),o=r({
container:"#dayRange",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:start,
endDate:end,
theme:"ta",
success:function(){
var t=n(o.getCurrentDate().startDate,"YYYY-MM-DD"),e=n(o.getCurrentDate().endDate,"YYYY-MM-DD");
a(t,e,0,!0);
}
}),{
init:init
};
}();
s.init();
});