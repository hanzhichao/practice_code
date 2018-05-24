define("rumor/result.js",["biz_common/moment.js","common/wx/top.js","rumor/rumor_helper.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/dateRange.js","biz_web/ui/dropdown.js","common/wx/pagebar.js","biz_web/lib/highcharts.js"],function(t){
"use strict";
var e=template.render,a=t("biz_common/moment.js"),i=t("common/wx/top.js"),r=t("rumor/rumor_helper.js"),n=t("common/wx/Cgi.js"),s=(t("common/wx/Tips.js"),
t("biz_web/ui/dateRange.js")),o=t("biz_web/ui/dropdown.js"),l=t("common/wx/pagebar.js");
t("biz_web/lib/highcharts.js");
var c=function(){
function t(){
new i("#topTab",i.DATA.rumor).selected("result");
}
function c(){
var t=$(".js_titles").find("a");
t.on(D,function(){
var t=$(this),e=t.data("id");
e&&($(".js_tbs").hide(),$("#"+e).show(),t.parent().addClass("selected").siblings("li").removeClass("selected"));
}),t.each(function(){
var t=$(this),e=t.data("id"),a=v[e]||0;
t.find("span").text(a);
});
}
function u(t,e){
var a=wx.url("/misc/rumor?action=summarylist");
n.get({
url:a,
data:t,
mask:!1
},function(t){
return t?void("function"==typeof e&&e(t)):void n.handleRet(t,{
id:"64573",
key:"1"
});
});
}
function d(t,i){
for(var r=i||[],n=r.length,s=0;n>s;s++)r[s].rumor_date=r[s].create_time?a.unix(r[s].create_time).format("YYYY-M-D"):"";
$("#js_suc").find(".tbody").html(e("js_suctpl",{
data:r
})),v.js_suc>5&&new l({
container:$("#js_suc").find(".js_pager"),
currentPage:t.currentPage,
perPage:t.perPage,
totalItemsNum:v.js_suc,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
return $("#js_suc").find(".js_loading").show().siblings("tr").hide(),u({
type:3,
page:t.currentPage,
count:t.perPage
},function(e){
var a=e.sucess_list&&e.sucess_list.list?e.sucess_list.list:[];
d({
currentPage:t.currentPage,
perPage:t.perPage
},a);
}),!1;
}
});
}
function g(){
var t=wx.cgiData.sucess_list&&wx.cgiData.sucess_list.list?wx.cgiData.sucess_list.list:[];
d({
currentPage:1,
perPage:5
},t),$(".js_toggleDetail").on("click",function(){
$(this).parent("tr").toggleClass("expand_detail_info"),$(this).parent("tr").next("tr.js_detail_info").toggle(),
$(this).children(".js_arrow_up").toggle(),$(this).children(".js_arrow_down").toggle();
});
}
function _(t,i){
for(var r=i||[],n=r.length,s=0;n>s;s++)r[s].rumor_date=r[s].create_time?a.unix(r[s].create_time).format("YYYY-M-D"):"";
$("#js_audi").find(".tbody").html(e("js_auditpl",{
data:r
})),v.js_audi>5&&new l({
container:$("#js_audi").find(".js_pager"),
currentPage:t.currentPage,
perPage:t.perPage,
totalItemsNum:v.js_audi,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
return $("#js_audi").find(".js_loading").show().siblings("tr").hide(),u({
type:1,
page:t.currentPage,
count:t.perPage
},function(e){
var a=e.wait_list&&e.wait_list.list?e.wait_list.list:[];
_({
currentPage:t.currentPage,
perPage:t.perPage
},a);
}),!1;
}
});
}
function f(){
var t=wx.cgiData.wait_list&&wx.cgiData.wait_list.list?wx.cgiData.wait_list.list:[];
_({
currentPage:1,
perPage:5
},t);
}
function m(t,i){
for(var r=i||[],n=r.length,s=0;n>s;s++)r[s].rumor_date=r[s].create_time?a.unix(r[s].create_time).format("YYYY-M-D"):"";
if($("#js_fail").find(".tbody").html(e("js_failtpl",{
data:r
})),v.js_fail>5){
new l({
container:$("#js_fail").find(".js_pager"),
currentPage:t.currentPage,
perPage:t.perPage,
totalItemsNum:v.js_fail,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
return $("#js_fail").find(".js_loading").show().siblings("tr").hide(),u({
type:2,
page:t.currentPage,
count:t.perPage
},function(e){
var a=e.fail_list&&e.fail_list.list?e.fail_list.list:[];
m({
currentPage:t.currentPage,
perPage:t.perPage
},a);
}),!1;
}
});
}
}
function h(){
var t=wx.cgiData.fail_list&&wx.cgiData.fail_list.list?wx.cgiData.fail_list.list:[];
m({
currentPage:1,
perPage:5
},t);
}
function p(t,i){
for(var r=i||[],n=r.length,s=0;n>s;s++)r[s].rumor_date=r[s].update_time?a.unix(r[s].update_time).format("YYYY-M-D"):"";
if($("#js_truth").find(".tbody").html(e("js_truthtpl",{
data:r
})),v.js_truth>5){
new l({
container:$("#js_truth").find(".js_pager"),
currentPage:t.currentPage,
perPage:t.perPage,
totalItemsNum:v.js_truth,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
return $("#js_truth").find(".js_loading").show().siblings("tr").hide(),u({
type:7,
page:t.currentPage,
count:t.perPage
},function(e){
var a=e.falserumor_list&&e.falserumor_list.list?e.falserumor_list.list:[];
p({
currentPage:t.currentPage,
perPage:t.perPage
},a);
}),!1;
}
});
}
}
function j(){
var t=wx.cgiData.falserumor_list&&wx.cgiData.falserumor_list.list?wx.cgiData.falserumor_list.list:[];
p({
currentPage:1,
perPage:5
},t);
}
function w(t){
if(!(t&&t instanceof Array&&t.length&&t[0].merchant_stat_oneday&&t[0].merchant_stat_oneday.length&&t[0].merchant_stat_oneday[0].stat_date))return $(".js_charts").hide(),
void $(".js_noChartData").show();
for(var e=[],i=["#4A90E2","#44b549"],r={
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
categories:e,
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
}],
series:[],
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
align:"center",
enabled:!0,
backgroundColor:"#FFF",
borderColor:"#FFF",
itemWidth:230,
symbolHeight:12,
symbolWidth:12,
itemStyle:{
color:"#222",
fontSize:"14px",
fontFamily:'"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif'
}
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
},n=0;n<t.length;n++){
for(var s=[],o=0;o<t[n].merchant_stat_oneday.length;o++)0==n&&e.push(t[n].merchant_stat_oneday[o].stat_date),
s.push({
time:t[n].merchant_stat_oneday[o].stat_date,
y:Number(t[n].merchant_stat_oneday[o].y)
});
r.series.push({
data:s,
name:t[n].rumor_line_name,
color:i[n],
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
});
}
r.xAxis[0].categories=e,r.xAxis[0].tickInterval=e.length<=7?1:(e.length-e.length%7)/7,
$(".js_chartsBox").height("400px").highcharts(r);
var l=e[0]?e[0]:a().subtract("days",7).format("YYYY-MM-DD"),c=e[e.length-1]?e[e.length-1]:a().format("YYYY-MM-DD");
C(l,c);
}
function b(){
$(".js_unfold").on(D,function(){
$(this).hide().siblings("span").show();
}),$(".js_fold").on(D,function(){
$(this).hide().siblings("span").show();
}),$(".js_refute").on(D,function(){
var t=$(this).data("id");
location.href="/misc/rumor?action=add_rumor_page&token="+wx.cgiData.token+"&lang="+(wx.cgiData.lang||"zh_CN")+"&rumorurl="+encodeURIComponent(t);
}),$(".js_add").on(D,function(){
var t=$(this).data("id");
r.add({
id:t
},{
suc:function(){
location.reload();
}
});
}),$(".js_chartsTitles a").on("click",function(){
$(this).parents(".js_chartsTitles").find("li").removeClass("selected"),$(this).parent("li").addClass("selected");
var t=$(this).data("type")||"1";
Y(t);
});
}
function x(){
Y();
}
function y(){
g(),f(),h(),j(),b();
}
function P(){
t(),c(),y(),x();
}
var D="click",v={
js_suc:+wx.cgiData.sucess_count||0,
js_audi:+wx.cgiData.wait_count||0,
js_fail:+wx.cgiData.fail_count||0,
js_truth:+wx.cgiData.falserumor_count||0
},Y=function(){
var t="1",e=a().subtract("days",7).format("X"),i=a().subtract("days",1).format("X");
return function(a,r,s){
e=r?r:e,i=s?s:i,t=a?a:t,n.get({
url:"/misc/rumor?action=rumor_stat_info&token="+wx.cgiData.token+"&lang="+(wx.cgiData.lang||"zh_CN"),
mask:!1,
data:{
type:t,
start_time:e,
end_time:i
}
},function(t){
return 0==!t.base_resp.ret?void n.handleRet(t,{
id:"64573",
key:"0"
}):t.rumor_stat_info&&t.rumor_stat_info.length?void w(t.rumor_stat_info):($(".js_charts").hide(),
void $(".js_noChartData").show());
});
};
}(),C=function(){
var t=!0;
return function(e,i){
if(s({
container:"#js_daterange_chart",
isTodayValid:!1,
startDate:e,
endDate:i,
minValidDate:a().subtract("days",60).format("X")>1469923200?a().subtract("days",60).format("X"):1469923200,
maxValidDate:a().subtract("days",1).format("X"),
defaultText:" 至 ",
theme:"ta",
success:function(t){
e=new Date(t.startDate).getTime()/1e3,i=new Date(t.endDate).getTime()/1e3,Y(null,e,i);
}
}),t){
t=!1;
{
new o({
container:"#js_dropdown_chart_daterange",
label:"最近7天",
data:[{
name:"最近7天",
value:"7"
},{
name:"最近15天",
value:"15"
},{
name:"最近30天",
value:"30"
}],
callback:function(t){
var e=a().add("d",-(1*t)).format("X"),i=a().subtract("days",1).format("X");
Y(null,e,i);
}
});
}
}
};
}();
return{
init:P
};
}();
c.init();
});