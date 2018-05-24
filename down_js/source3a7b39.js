define("business/source.js",["common/wx/dateSelect.js","common/wx/top.js","biz_common/moment.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/underscore.js","biz_web/lib/highcharts.js"],function(e){
"use strict";
var t=e("common/wx/dateSelect.js"),a=e("common/wx/top.js"),n=e("biz_common/moment.js"),o=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),i=e("biz_common/underscore.js");
e("biz_web/lib/highcharts.js");
var l=function(){
function e(){
new a("#topTab",a.DATA.business).selected(1);
var e=wx.data.time,o=[{
name:"昨天",
value:{
start:n.unix(e).add("days",-1).unix(),
end:n.unix(e).add("days",-1).unix()
}
},{
name:"最近7天",
value:{
start:n.unix(e).add("days",-7).unix(),
end:n.unix(e).add("days",-1).unix()
}
},{
name:"最近30天",
value:{
start:n.unix(e).add("days",-30).unix(),
end:n.unix(e).add("days",-1).unix()
}
}],r=n("20130805","YYYYMMDD").unix(),l=new t({
container:"#dateSelectDiv",
callback:function(e,t){
i({
startTime:e,
endTime:t
});
},
label:"快捷日期",
dropdown:o,
range:{
start:r,
end:n.unix(e).add("days",-1).unix()
}
});
l.dropdown.selected(1);
}
function i(e){
var t="/merchant/bizpay?t=wxm-index&f=json&op=dataSrc"+wx.data.param+"&"+$.param(e);
r.get(t,function(e){
0==e.BizBaseRetResp.Ret?u(e.Data):o.err();
});
}
function l(e){
var t=["其它","人工回复","群发","自动回复","自定义菜单"],a=["通过二维码或其它方式发布的商品消息","在公众平台网站上用实时消息回复的商品消息","在公众平台网站上群发的商品消息","通过自动回复下发的商品消息","通过自定义菜单下发的商品消息"];
return $.each(e,function(e,n){
n.name=t[e],n.title=a[e];
}),[e[2],e[3],e[1],e[4],e[0]];
}
function u(e){
if(e=l(e),e.length>0){
var t={};
$.each(["SendNum","Count","Pay","Price"],function(a,n){
for(var a=0;5>a;a++)t[n]=t[n]||[],t[n].push(e[a][n]);
}),s.init(e),d.init(t),c.init(e),$("#pieSelect").show(),$("#rainfallSelect").show(),
$(".pay-table tr:eq(0)").show();
}else $(".pay-table tr:eq(0)").hide(),$("#pieSelect").hide(),$("#rainfallSelect").hide(),
$("#table").html('<tr><td colspan="8" class="no-data">暂无数据</td></tr>'),$("#pieChart").html('<p class="no-data">暂无数据</p>'),
$("#rainfallChart").html('<p class="no-data">暂无数据</p>');
}
return{
init:e
};
}(),s=function(){
function e(e){
for(var t=0;5>t;t++)e[t].per=e[t].Count>0?Math.floor(e[t].Pay/e[t].Count*1e4)/100+"%":"-";
$("#table").html(template.render("tpl",{
data:e
})),$("#table tr:last").addClass("no-extra");
}
return{
init:e
};
}(),d=function(){
function e(e){
a=e,$("#pieSelect").val("SendNum"),t(a.SendNum),$("#pieSelect").unbind("change"),
$("#pieSelect").change(function(){
t(a[$("#pieSelect").val()]);
});
}
function t(e){
if(e){
e[0]=Number(e[0]),e[1]=Number(e[1]),e[2]=Number(e[2]),e[3]=Number(e[3]),e[4]=Number(e[4]);
var t=Number(e[0])+Number(e[1])+Number(e[2])+Number(e[3])+Number(e[4]);
if(0==t)return $("#pieChart").html('<p class="no-data">暂无数据</p>'),void $("#pieDesc").hide();
$("#pieDesc").show();
var a=["blue","orange","green","yellow","purple"],o=[{
name:"群发",
y:e[0],
per:e[0]/t
},{
name:"自动回复",
y:e[1],
per:e[1]/t
},{
name:"人工回复",
y:e[2],
per:e[2]/t
},{
name:"自定义菜单",
y:e[3],
per:e[3]/t
},{
name:"其它",
y:e[4],
per:e[4]/t
}];
o=i.sortBy(o,function(e){
return-1*e.per;
}),$.each(o,function(e,t){
t.className=a[e];
});
var r=80,l=320;
/msie/.test(navigator.userAgent.toLowerCase())&&(r=0,l=240),$("#pieDesc").html(template.compile(n)({
data:o
})),$("#pieDesc li:last").addClass("no-extra"),$("#pieChart").highcharts({
chart:{
plotBackgroundColor:null,
plotBorderWidth:null,
plotShadow:!1,
width:l,
backgroundColor:"#FFFFFF",
marginLeft:r
},
series:[{
type:"pie",
name:"来源对比",
data:o
}],
colors:["#79A7C8","#E9A084","#7ABF90","#E7BF24","#9664B3"],
title:{
text:""
},
credits:{
enabled:!1
},
tooltip:{
percentageDecimals:1,
backgroundColor:"#525253",
borderColor:"#000",
style:{
color:"#fff"
},
formatter:function(){
return this.point.name+" : <b>"+Highcharts.numberFormat(100*this.point.per,2,".")+"%</b>";
}
},
plotOptions:{
pie:{
allowPointSelect:!0,
cursor:"pointer",
dataLabels:{
enabled:!1
},
renderInLegend:!0,
borderWidth:3
}
},
legend:{
enabled:!1
}
});
}
}
var a={},n="{each data as o index}<li class='{o.className}'><strong>{o.name}</strong></li>{/each}";
return{
init:e,
render:t
};
}(),c=function(){
function e(e){
n=e,a(n[0]),$("#rainfallSelect").val(0),$("#rainfallSelect").unbind("change"),$("#rainfallSelect").change(function(){
1==$("#rainfallSelect").val()?t(n[1]):a(n[$("#rainfallSelect").val()]);
});
}
function t(e){
if(e.Pay+e.Count==0)return void $("#rainfallChart").html('<p class="no-data">暂无数据</p>');
var t=0;
/msie/.test(navigator.userAgent.toLowerCase()),$("#rainfallChart").highcharts({
chart:{
backgroundColor:"#FFFFFF",
height:"330",
marginTop:40
},
series:[{
name:"次数",
color:"#79A7C8",
type:"column",
data:[e.Count,e.Pay],
yAxis:0,
tooltip:{
valueSuffix:" ",
pointFormat:"{series.name}: <b>{point.y}</b><br/>"
}
},{
name:"转化率",
color:"green",
type:"spline",
data:[{
y:e.Count/2,
per:0==e.Count?0:100
},{
y:e.Pay/2,
per:0==e.Count?0:Math.floor(e.Pay/e.Count*1e4)/100
}],
tooltip:{
pointFormat:""
}
}],
xAxis:[{
categories:["浏览次数","成交次数"]
}],
credits:{
enabled:!1
},
title:{
text:""
},
yAxis:[{
title:{
enabled:!1
},
offset:t,
min:0
},{
title:{
enabled:!1
},
labels:{
enabled:!1
}
}],
tooltip:{
shared:!0,
backgroundColor:"#525253",
borderColor:"#000",
style:{
color:"#fff"
}
},
legend:{
enabled:!1
}
});
}
function a(e){
if(e.SendNum+e.Pay+e.Count==0)return void $("#rainfallChart").html('<p class="no-data">暂无数据</p>');
var t=0;
/msie/.test(navigator.userAgent.toLowerCase()),$("#rainfallChart").highcharts({
chart:{
backgroundColor:"#FFFFFF",
height:"330",
marginTop:20
},
series:[{
name:"次数",
color:"#79A7C8",
type:"column",
data:[e.SendNum,e.Count,e.Pay],
yAxis:0,
tooltip:{
valueSuffix:" ",
pointFormat:"{series.name}: <b>{point.y}</b><br/>"
}
},{
name:"转化率",
color:"green",
type:"spline",
data:[{
y:e.SendNum/2,
per:0==e.SendNum?0:100
},{
y:e.Count/2,
per:0==e.SendNum?0:Math.floor(e.Count/e.SendNum*1e4)/100
},{
y:e.Pay/2,
per:0==e.SendNum?0:Math.floor(e.Pay/e.SendNum*1e4)/100
}],
tooltip:{
pointFormat:""
}
}],
xAxis:[{
categories:["下发次数","浏览次数","成交次数"]
}],
credits:{
enabled:!1
},
title:{
text:""
},
yAxis:[{
title:{
enabled:!1
},
offset:t,
min:0
},{
title:{
enabled:!1
},
labels:{
enabled:!1
}
}],
tooltip:{
shared:!0,
backgroundColor:"#525253",
borderColor:"#000",
style:{
color:"#fff"
}
},
legend:{
enabled:!1
}
});
}
var n={};
return{
init:e,
render:a
};
}();
l.init();
});