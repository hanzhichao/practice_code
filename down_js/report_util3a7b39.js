define("common/wx/report_util.js",["common/wx/Tips.js","biz_common/moment.js","biz_web/lib/highcharts.js","biz_web/ui/dropdown.js","biz_web/ui/dateRange.js","common/wx/pagebar.js"],function(e){
"use strict";
function t(e){
var e=$.extend(!0,{
begintime:l().add("d",-7).format("YYYY-MM-DD"),
endtime:u,
dateDom:null,
dropDom:null,
callback:$.noop,
showUnlimit:!1,
minValidDate:"315507600"
},e),t=c({
container:e.dateDom,
isTodayValid:e.isTodayValid||!1,
startDate:e.begintime,
endDate:e.endtime,
minValidDate:e.minValidDate,
defaultText:" 至 ",
theme:"ta",
success:function(o){
var i=o.startDate,n=o.endDate;
if($("#"+t.inputId).html(i+" 至 "+n),e.callback(i,n),a&&(a.value=null),a){
var l=r[n+"_"+i];
l?a.container.find(".jsBtLabel").text(l):e.showUnlimit&&a.container.find(".jsBtLabel").text("不限");
}
e.dateSelect&&e.dateSelect(i,n);
},
beforeSelect:function(t){
return e.beforeSelect?e.beforeSelect(t):void 0;
}
});
$("#"+t.inputId+",#"+t.mOpts.inputTrigger).click(function(){
$(".jsDropdownList").hide();
});
var a;
if(e.dropDom){
var o="最近7天",i="最近15天",n="最近30天",r={};
r[(e.isTodayValid?b:u)+"_"+l().add("d",e.isTodayValid?-29:-30).format("YYYY-MM-DD")]=n,
r[(e.isTodayValid?b:u)+"_"+l().add("d",e.isTodayValid?-14:-15).format("YYYY-MM-DD")]=i,
r[(e.isTodayValid?b:u)+"_"+l().add("d",e.isTodayValid?-6:-7).format("YYYY-MM-DD")]=o;
var s=[{
name:o,
value:7
},{
name:i,
value:15
},{
name:n,
value:30
}];
e.showUnlimit&&s.splice(0,0,{
name:"不限",
value:""
});
var m=r[e.endtime+"_"+e.begintime]||"最近7天",a=new d({
container:e.dropDom,
label:m,
data:s,
callback:function(a){
if(a){
var o=a,i=l().add("d",-o);
e.isTodayValid&&(i=i.add("d",1));
var n=i.format("YYYY-M-D");
i=i.format("YYYY-MM-DD");
var r=l();
e.isTodayValid||r.add("d",-1);
var s=r.format("YYYY-M-D");
r=r.format("YYYY-MM-DD"),$("#"+t.inputId).html(i+" 至 "+r),e.callback(i,r),t.selectDate(n),
t.selectDate(s),e.dropSelect&&e.dropSelect(i,r);
}
}
});
}
return{
dateRange:t,
dateDropdown:a
};
}
function a(e){
if(e=$.extend(!0,{
count:10,
container:"#js_pagebar",
currentPage:1,
total_count:0
},e),e.total_count>e.count){
new m({
container:e.container,
perPage:e.count,
initShowPage:e.currentPage,
totalItemsNum:e.total_count,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var a=t.currentPage;
e.callback&&e.callback(a);
}
});
}else $(e.container).html("");
}
function o(e){
e=$.extend(!0,{
container:".js_rankFlag",
sortkey:0,
sorttype:0,
asc:1,
desc:0
},e);
var t=(e.sorttype,e.sortkey,e.asc),a=e.desc;
$(e.container).on("click",function(){
var o=$(this).attr("sortkey");
e.sortkey==o?e.sorttype=e.sorttype==t?a:t:(e.sortkey=o,e.sorttype=e.desc);
var i=$(e.container).removeClass("single_up").removeClass("single_down"),n=i.filter("[sortkey="+e.sortkey+"]");
n.addClass(e.sorttype==t?"single_up":"single_down"),e.callback&&e.callback(e,e);
});
}
function i(e){
e=$.extend(!0,{
container:".js_rankFlag",
callback:$.noop,
sortkey:0,
sorttype:0,
asc:1,
desc:0,
up_class:"single_up",
down_class:"single_down"
},e);
var t=(e.sorttype,e.sortkey,e.asc),a=e.desc;
$(e.container).on("click",function(){
var o=$(this).attr("sortkey");
e.sortkey==o?e.sorttype=e.sorttype==t?a:t:(e.sortkey=o,e.sorttype=e.desc),e.callback&&e.callback(e,e);
});
var o=$(e.container).removeClass(e.up_class).removeClass(e.down_class),i=o.filter("[sortkey="+e.sortkey+"]");
i.addClass(e.sorttype==t?e.up_class:e.down_class);
}
function n(e){
e=$.extend({
domId:null,
data:[]
},e),new s.Chart({
chart:{
renderTo:e.domId,
zoomType:"xy",
type:"area",
marginLeft:50,
marginRight:50,
backgroundColor:"#FFFFFF",
height:400
},
plotOptions:{
series:{
fillColor:"rgba(135, 179, 212, 0.05)"
}
},
title:{
text:""
},
credits:{
enabled:!1
},
xAxis:[{
labels:{
formatter:function(){
return this.value;
},
style:{
color:"#8D8D8D"
},
step:Math.ceil(e.data.length/($("#"+e.domId).width()/100))
},
title:{
text:"",
style:{
color:"#7eafdd"
}
},
categories:[],
tickmarkPlacement:"on",
lineColor:"#C6C6C6",
lineWidth:2
}],
yAxis:[{
title:{
text:""
},
labels:{
formatter:function(){
return this.value>0?e.isPercent?this.value+"%":this.value:"";
},
style:{
color:"#8D8D8D",
fontFamily:"Microsoft yahei"
}
},
gridLineColor:"#F2F3F4",
allowDecimals:!1,
max:e.max||null
}],
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
pointFormat:'<b style="font-family:Microsoft yahei">{point.y}'+(e.isFee?"元":"")+(e.isPercent?"%":"")+"<br/>{point.date}</b>"
},
series:[{
name:"",
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
},
data:e.data
}],
exporting:{
enabled:!1
}
});
}
function r(e){
e=$.extend({
domId:null,
data:[]
},e),new s.Chart({
chart:{
renderTo:e.domId,
type:"bar",
zoomType:"xy",
height:150,
backgroundColor:"#FFFFFF"
},
title:{
text:"",
style:{
color:"#3E576F",
fontWeight:"bold",
fontFamily:"Microsoft yahei"
}
},
colors:["#EBCB6B","#7FB887","#7FAEDF"],
xAxis:{
categories:[0],
tickmarkPlacement:"on",
lineWidth:1
},
yAxis:{
labels:{
formatter:function(){
return this.value>0?this.value:"";
},
style:{
color:"#3E576F",
fontFamily:"Microsoft yahei"
}
},
min:0,
title:{
text:""
},
gridLineColor:"#F2F3F4",
allowDecimals:!1,
stackLabels:{
enabled:!0,
style:{
fontWeight:"bold",
color:"gray"
}
}
},
legend:{
enabled:!0,
backgroundColor:"#FFFFFF"
},
plotOptions:{
series:{
fillColor:"rgba(135, 179, 212, 0.05)",
stacking:"normal"
}
},
credits:{
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
pointFormat:'<b style="font-family:Microsoft yahei">{series.name}：{point.y}<br/>{point.date}</b>'
},
exporting:{
enabled:!1
},
series:e.data
});
}
var l=(e("common/wx/Tips.js"),e("biz_common/moment.js")),s=e("biz_web/lib/highcharts.js"),d=e("biz_web/ui/dropdown.js"),c=e("biz_web/ui/dateRange.js"),m=e("common/wx/pagebar.js"),u=l().add("d",-1).format("YYYY-MM-DD"),b=l().format("YYYY-MM-DD");
return{
initDateRange:t,
initPager:a,
initRankOnce:o,
initChart:n,
initRank:i,
initBarChart:r
};
});