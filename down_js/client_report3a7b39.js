define("ad_system/client_report.js",["biz_web/ui/dropdown.js","biz_common/moment.js","biz_common/underscore.js","biz_web/ui/dateRange.js","common/wx/Cgi.js","common/wx/Excel.js","common/wx/pagebar.js","common/wx/Tips.js","ad_system/helper.js","biz_web/lib/highcharts.js","common/wx/popover.js","common/wx/top.js"],function(t){
"use strict";
function e(){
var t=[];
wx.cgiData.data=w.sortBy(wx.cgiData.data,function(t){
return-1*p(t.start_time,"YYYY-MM-DD hh:mm").unix();
}),wx.cgiData.data.each(function(e){
t.push({
start_time:e.start_time,
show:e.view_count,
click:e.click_count,
care:e.follow_count,
cost:e.cpc,
total:e.cost
});
}),wx.cgiData.data=t;
}
function a(){
C={},T={
x:[],
y:{
show:[],
click:[],
click_per:[],
care:[],
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
cost:(e.cost/100).toFixed(2),
total:(e.total/100).toFixed(2),
care:e.care
};
a.click_per=0==e.show?0:(e.click/e.show*100).toFixed(2),a.time=k?e.start_time.split(" ")[1]:e.start_time.split(" ")[0].slice(-5),
t.push(a),T.x.unshift(a.time),T.y.show.unshift(a.show),T.y.click.unshift(a.click),
T.y.click_per.unshift(a.click_per),T.y.care.unshift(a.care),T.y.cost.unshift(a.cost),
T.y.total.unshift(a.total);
}),wx.cgiData.data=t;
}
function i(t){
"-1"!=t.value&&(Y=t.type||0,M=t.costType||0,F=t.posType||0,$(".jsTypeSelect[data-type="+Y+"]").addClass("selected").siblings().removeClass("selected"),
$(".jsPosSelect[data-type="+F+"]").addClass("selected").siblings().removeClass("selected"));
}
function s(t,e){
var a=[{
value:"-1",
name:"全部广告",
type:0,
costType:0
}];
wx.cgiData.adList.each(function(t){
"-1"!=t.value&&(0==Y||t.type==Y)&&(0==F||t.posType==F)&&a.push(t);
}),console.log(a.length),b=new u({
container:"#adSelect",
label:e||"所有广告",
data:a,
callback:function(t,e,a,c){
$("#adName").html("当前选中广告"+e),i(c),s(t,e),n();
}
}),b.value=t;
}
function c(){
var t="";
wx.cgiData.advert_id&&wx.cgiData.adList.each(function(e){
return e.value==wx.cgiData.advert_id?(t=e.name,$("#adName").html("当前选中广告"+e.name),
i(e),s(),!1):void 0;
}),b=new u({
container:"#adSelect",
label:t||"全部广告",
data:wx.cgiData.adList,
callback:function(t,e,a,c){
$("#adName").html("当前选中广告"+e),i(c),s(t,e),n();
}
}),$(".jsTypeSelect").click(function(){
Y=$(this).data("type"),$(this).addClass("selected").siblings().removeClass("selected"),
s(),n();
}),$(".jsPosSelect").click(function(){
F=$(this).data("type"),$(this).addClass("selected").siblings().removeClass("selected"),
s(),n();
}),_=new u({
container:"#daySelect",
label:"自定义日期",
data:[{
name:"今天",
value:"0"
},{
name:"昨天",
value:"-1"
},{
name:"最近7日",
value:"-6"
},{
name:"最近30日",
value:"29"
}],
callback:function(t){
switch(t){
case"0":
$(".jsDay").get(0).click();
break;

case"-1":
$(".jsDay").get(1).click();
break;

case"-6":
$(".jsDay").get(2).click();
break;

case"29":
$(".jsDay").get(3).click();
}
}
}),$("#daySelect").find("label").text("今天"),j=x({
container:"#dateRange",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:p.unix(wx.data.time).format("YYYY-MM-DD"),
endDate:p.unix(wx.data.time).format("YYYY-MM-DD"),
theme:"ta",
success:function(){
_.reset(),k=j.getCurrentDate().startDate==j.getCurrentDate().endDate?!0:!1,n();
}
});
}
function o(){
$("#downBt").click(function(){
var t={
time:"时间",
show:"曝光量",
click:"点击量",
click_per:"点击率",
total:"总花费(元)"
},e=$.extend(!0,[],wx.cgiData.data);
3==Y||5==Y||6==Y?t.care="商品指标":(0==Y||4==Y)&&e.each(function(t){
delete t.care;
}),t.cost="点击均价(元)",f.doExport("/merchant/ad_client_report?action=download",{
nameMap:t,
dataList:e
});
}),$(".jsDay").click(function(){
$(this).addClass("selected").siblings().removeClass("selected");
var t=$(this).data("start"),e=$(this).data("end");
t=p.unix(wx.data.time).add("days",t).format("YYYY-MM-DD"),e=p.unix(wx.data.time).add("days",e).format("YYYY-MM-DD"),
k=t==e?!0:!1,j=x({
container:"#dateRange",
startDate:t,
endDate:e,
theme:"ta",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
success:function(){
_.reset(),k=j.getCurrentDate().startDate==j.getCurrentDate().endDate?!0:!1,n();
}
}),n();
});
}
function n(){
var t={};
b.value>0&&(t.id=b.value||""),t.type=Y,t.pos_type=F,t.start=p(j.getCurrentDate().startDate,"YYYY-MM-DD").unix(),
t.end=p(j.getCurrentDate().endDate,"YYYY-MM-DD").add("days",1).unix()-1,t.end>wx.data.time?$("#desc").show():$("#desc").hide(),
g.get({
url:"/merchant/ad_client_report?f=json",
mask:!0,
data:t
},function(t){
0==t.base_resp.ret?(wx.cgiData.data=t.cost_list.cost,a(),l()):D.err();
});
}
function l(){
r(),d(),h();
}
function r(){
return 0==wx.cgiData.data.length?($(".jsTotalNo").show().siblings().hide(),void $("#downBt").hide()):($("#downBt").show(),
$(".jsTotalNo").hide().siblings().show(),wx.cgiData.data.each(function(t){
Object.each(t,function(t,e){
"time"!=e&&"cost"!=e&&(void 0==C[e]&&(C[e]=0),C[e]+=Number(t||0));
});
}),3==Y||5==Y||6==Y?$(".jsTotal[data-type=care]").parent().show():(0==Y||4==Y)&&$(".jsTotal[data-type=care]").parent().hide(),
C.cost=C.click>0?(C.total/C.click).toFixed(2):"--",$("#costTitle").html("点击均价"),
$(".jsTotal[data-type=cost]").parent().show(),$("#tList").setClass("data_overview_list grid_line with_"+$("#tList li:visible").length),
C.show&&C.click&&(C.click_per=(C.click/C.show*100).toFixed(2)),Object.each(C,function(t,e){
("click_per"==e||"cost"==e||"total"==e)&&(t=Number(t).toFixed(2)),$(".jsTotal[data-type="+e+"]").text("click_per"==e?t+"%":t);
}),void 0);
}
function d(){
var t=[{
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
name:"总花费"
}],e=$.extend(!0,[],t);
(3==Y||5==Y||6==Y)&&e.splice(3,0,{
value:"care",
name:"商品指标"
}),e.splice(3,0,{
value:"cost",
name:"点击均价"
}),v=new u({
container:"#chartSelect",
label:"曝光量",
data:e,
callback:function(t,e){
m(T.x,T.y[t],e);
}
}),m(T.x,T.y.show,"曝光量");
}
function h(){
$("#detail").html(template.render("tpl",{
data:wx.cgiData.data.slice(0,10)
})),3==Y||5==Y||6==Y?($(".jsThCare").show(),$(".jsTdCare").show()):(4==Y||0==Y)&&($(".jsThCare").hide(),
$(".jsTdCare").hide()),$(".jsThCost").show().html("点击均价"),$(".jsTdCost").show(),
$("#detail tr:odd").find("td").addClass("row_hint"),new y({
container:"#pageBar",
totalItemsNum:wx.cgiData.data.length,
isSimple:!0,
callback:function(t){
$("#detail").html(template.render("tpl",{
data:wx.cgiData.data.slice(10*(t.currentPage-1),10*t.currentPage)
})),3==Y||5==Y||6==Y?($(".jsThCare").show(),$(".jsTdCare").show()):(4==Y||0==Y)&&($(".jsThCare").hide(),
$(".jsTdCare").hide()),$(".jsThCost").show().html("点击均价"),$(".jsTdCost").show(),
$("#detail tr:odd").find("td").addClass("row_hint");
}
});
}
function m(t,e,a){
var i={
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
if(0==t.length||0==e.length)return $("#chartSelect").hide(),void $("#chartContain").html('<p class="empty_tips">暂无数据</p>').height("222px");
$("#chartSelect").show(),t.length>10&&(i.xAxis[0].labels.step=Math.ceil(t.length/10));
var s=[];
$.each(t,function(t,a){
s.push({
time:a,
y:1*e[t]
});
}),i.series[0].data=s,$("#chartContain").height("400px").highcharts(i);
}
{
var u=t("biz_web/ui/dropdown.js"),p=t("biz_common/moment.js"),w=t("biz_common/underscore.js"),x=t("biz_web/ui/dateRange.js"),g=t("common/wx/Cgi.js"),f=t("common/wx/Excel.js"),y=t("common/wx/pagebar.js"),D=t("common/wx/Tips.js");
t("ad_system/helper.js");
}
t("biz_web/lib/highcharts.js");
var b,j,v,_,k=(t("common/wx/popover.js"),!0),C={},T={
x:[],
y:{
show:[],
click:[],
click_per:[],
care:[],
cost:[],
total:[]
}
},Y=0,M=0,F=0,S=t("common/wx/top.js");
new S("#topTab",S.DATA.adClient).selected("adclientreport");
var z=[];
wx.cgiData.adList.each(function(t){
z.push({
value:t.advert_id,
name:t.ad_content,
type:t.type,
costType:t.cost_type,
posType:t.pos_type
});
}),wx.cgiData.adList=z,wx.cgiData.adList.unshift({
value:"-1",
name:"全部广告",
type:0,
costType:0,
posType:0
}),function(){
a(),c(),o(),l();
}();
});