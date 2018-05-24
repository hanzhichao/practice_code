define("ad_system/host_report.js",["biz_web/ui/dropdown.js","biz_common/moment.js","biz_web/ui/dateRange.js","common/wx/Cgi.js","common/wx/Excel.js","common/wx/pagebar.js","ad_system/helper.js","biz_web/lib/highcharts.js","biz_common/underscore.js","common/wx/top.js"],function(t){
"use strict";
function e(){
var t=[];
wx.cgiData.data=_.sortBy(wx.cgiData.data,function(t){
return-1*m(t.start_time,"YYYY-MM-DD hh:mm").unix();
}),wx.cgiData.data.each(function(e){
t.push({
start_time:e.start_time,
show:e.view_count,
click:e.click_count,
total:e.cost
});
}),wx.cgiData.data=t;
}
function a(){
k={},Y={
x:[],
y:{
show:[],
click:[],
click_per:[],
cost:[],
total:[]
}
},e();
var t=[];
wx.cgiData.data.each(function(e){
var a={
time:0,
show:e.show,
click:e.click,
click_per:0,
total:(e.total/100).toFixed(2)
};
a.click_per=0==e.show?0:(e.click/e.show*100).toFixed(2),a.time=e.start_time,t.push(a),
Y.x.unshift(e.start_time.slice(-5)),Y.y.show.unshift(a.show),Y.y.click.unshift(a.click),
Y.y.click_per.unshift(a.click_per),Y.y.total.unshift(a.total);
}),wx.cgiData.data=t;
}
function o(){
$("#posDr").length>0&&(x=new h({
container:"#posDr",
label:name||"全部广告位",
data:[{
name:"全部广告位",
value:"0"
},{
name:"公众号正文顶部",
value:"2"
},{
name:"公众号正文底部",
value:"1"
}],
callback:function(t){
v=t,n();
}
}),x.value="0"),$("#costDr").length>0&&(b=new h({
container:"#costDr",
label:name||"全部计费方式",
data:[{
name:"全部计费方式",
value:"0"
},{
name:"按点击计费",
value:"1"
},{
name:"按曝光计费",
value:"2"
}],
callback:function(t){
j=t,n();
}
}),b.value="0"),g=u({
container:"#dateRange",
startDate:m().add("days",-7).format("YYYY-MM-DD"),
endDate:m().add("days",-1).format("YYYY-MM-DD"),
theme:"ta",
isTodayValid:!0,
success:function(){
$(".jsDay").removeClass("selected"),n();
}
});
}
function i(){
$("#downBt").click(function(){
var t={
time:"时间",
show:"曝光量",
click:"点击量",
click_per:"点击率",
total:"总收入(元)"
};
f.doExport("/merchant/ad_host_report?action=download",{
nameMap:t,
dataList:wx.cgiData.data
});
}),$(".jsDay").click(function(){
$(this).addClass("selected").siblings().removeClass("selected");
var t=$(this).data("start"),e=$(this).data("end");
t=m().add("days",t).add("days",-1).format("YYYY-MM-DD"),e=m().add("days",e).add("days",-1).format("YYYY-MM-DD"),
y=t==e?!0:!1,g=u({
container:"#dateRange",
startDate:t,
endDate:e,
theme:"ta",
isTodayValid:!0,
success:function(){
$(".jsDay").removeClass("selected"),n(),y=g.getCurrentDate().startDate==g.getCurrentDate().endDate?!0:!1;
}
}),n();
});
}
function n(){
var t={};
t.start=m(g.getCurrentDate().startDate,"YYYY-MM-DD").unix(),t.end=m(g.getCurrentDate().endDate,"YYYY-MM-DD").add("days",1).unix()-1,
t.pos_type=v,t.cost_type=j,t.end>wx.data.time?$("#desc").show():$("#desc").hide(),
console.log(t),w.get({
url:"/merchant/ad_host_report?f=json",
mask:!0,
data:t
},function(t){
0==t.base_resp.ret?(wx.cgiData.data=t.cost_list.cost,a(),c()):Tips.err();
});
}
function c(){
s(),l(),r();
}
function s(){
return 0==wx.cgiData.data.length?($(".jsTotalNo").show().siblings().hide(),void $("#downBt").hide()):($("#downBt").show(),
$(".jsTotalNo").hide().siblings().show(),wx.cgiData.data.each(function(t){
Object.each(t,function(t,e){
"time"!=e&&(void 0==k[e]&&(k[e]=0),k[e]+=Number(t||0));
});
}),k.show&&k.click&&(k.click_per=(k.click/k.show*100).toFixed(2)),Object.each(k,function(t,e){
("click_per"==e||"cost"==e||"total"==e)&&(t=Number(t).toFixed(2)),$(".jsTotal[data-type="+e+"]").text("click_per"==e?t+"%":t);
}),void 0);
}
function l(){
D=new h({
container:"#chartSelect",
label:"曝光量",
data:[{
value:"show",
name:"曝光量"
},{
value:"click",
name:"点击量"
},{
value:"click_per",
name:"点击率"
},{
value:"total",
name:"总收入"
}],
callback:function(t,e){
d(Y.x,Y.y[t],e);
}
}),d(Y.x,Y.y.show,"曝光量");
}
function r(){
$("#detail").html(template.render("tpl",{
data:wx.cgiData.data.slice(0,10)
})),$("#detail tr:odd").find("td").addClass("row_hint"),new p({
container:"#pageBar",
totalItemsNum:wx.cgiData.data.length,
isSimple:!0,
callback:function(t){
$("#detail").html(template.render("tpl",{
data:wx.cgiData.data.slice(10*(t.currentPage-1),10*t.currentPage)
})),$("#detail tr:odd").find("td").addClass("row_hint");
}
});
}
function d(t,e,a){
var o={
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
categories:t,
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
}],
series:[{
name:a,
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
if(0==t.length||0==e.length)return $("#chartSelect").hide(),void $("#chartContain").html('<p class="no_data">暂无数据</p>').height("169px");
$("#chartSelect").show(),t.length>10&&(o.xAxis[0].labels.step=Math.ceil(t.length/10));
var i=[];
$.each(t,function(t,a){
i.push({
time:a,
y:1*e[t]
});
}),o.series[0].data=i,$("#chartContain").height("400px").highcharts(o);
}
{
var h=t("biz_web/ui/dropdown.js"),m=t("biz_common/moment.js"),u=t("biz_web/ui/dateRange.js"),w=t("common/wx/Cgi.js"),f=t("common/wx/Excel.js"),p=t("common/wx/pagebar.js");
t("ad_system/helper.js");
}
t("biz_web/lib/highcharts.js");
var g,D,x,b,_=t("biz_common/underscore.js"),y=!0,k={},v=0,j=0,Y={
x:[],
y:{
show:[],
click:[],
click_per:[],
cost:[],
total:[]
}
},C=t("common/wx/top.js");
new C("#topTab",C.DATA.adHost).selected("adhostreport"),function(){
a(),o(),i(),c();
}();
});