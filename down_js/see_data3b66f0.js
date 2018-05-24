define("statistics/see_data.js",["biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/popover.js","biz_web/lib/highcharts.js","statistics/article/top.js"],function(e){
"use strict";
function a(e,a,t){
new o({
dom:e,
content:a,
place:"bottom",
margin:"right",
className:t,
isToggle:!0,
hideIfBlur:!0,
defaultOpen:!1
});
}
function t(e,a,t,i){
for(var s=[],n=[],o=0;o<e.length;o++){
var d=e[o].scene;
if(i&&i.length)for(var r=0;r<i.length;r++)if(i[r].scene==e[o].scene){
d=i[r].label;
break;
}
s.push(d||"未知"),n.push(Number(e[o].pv||0));
}
$(a).show().height("400px").width("inherit").highcharts({
chart:{
type:"bar"
},
title:{
text:null
},
subtitle:{
text:null
},
legend:{
enabled:!0,
borderWidth:0
},
exporting:{
enabled:!1
},
xAxis:{
categories:s,
gridLineWidth:0
},
yAxis:{
min:0,
title:{
text:"",
align:"high"
},
labels:{
overflow:"justify"
},
gridLineWidth:0
},
colors:["#1aad19"],
tooltip:{
backgroundColor:"#555556",
borderRadius:0,
borderWidth:0,
shadow:!1,
style:{
color:"#fff"
},
headerFormat:"",
formatter:function(){
var e=this.x+":"+this.y;
return e;
},
shared:!0
},
credits:{
enabled:!1
},
series:[{
name:t,
data:n
}]
});
}
var i=e("biz_web/ui/dateRange.js"),s=e("biz_common/moment.js"),n=e("common/wx/Cgi.js"),o=e("common/wx/popover.js"),d=(e("biz_web/lib/highcharts.js"),
e("statistics/article/top.js"));
d.selected("video_article");
var r={
YM_BOX:$(".js_YM_box"),
YM_DR:$(".js_YM_dateRangeBox"),
YM_RADIOBOX:$(".js_YM_radioBox"),
YM_DATABOX:$(".js_YM_dataBox"),
YM_LOADING:$(".js_YM_loading"),
YM_NODATA:$(".js_YM_noData"),
YM_DOWNLOAD:$(".js_YM_download"),
SP_BOX:$(".js_SP_box"),
SP_DR:$(".js_SP_dateRangeBox"),
SP_RADIOBOX:$(".js_SP_radioBox"),
SP_DATABOX:$(".js_SP_dataBox"),
SP_LOADING:$(".js_SP_loading"),
SP_NODATA:$(".js_SP_noData"),
SP_DOWNLOAD:$(".js_SP_download"),
SC_BOX:$(".js_SC_box"),
SC_DR:$(".js_SC_dateRangeBox"),
SC_DATABOX:$(".js_SC_dataBox"),
SC_LOADING:$(".js_SC_loading"),
SC_NODATA:$(".js_SC_noData"),
SC_DOWNLOAD:$(".js_SC_download"),
QR_BOX:$(".js_QR_box"),
QR_DATABOX:$(".js_QR_dataBox"),
QR_LOADING:$(".js_QR_loading"),
QR_NODATA:$(".js_QR_noData"),
ZH_BOX:$(".js_ZH_box"),
ZH_DR:$(".js_ZH_dateRangeBox"),
ZH_DATABOX:$(".js_ZH_dataBox"),
ZH_LOADING:$(".js_ZH_loading"),
ZH_NODATA:$(".js_ZH_noData"),
ZH_DOWNLOAD:$(".js_ZH_download")
},l={
START:s().subtract(6,"days").format("YYYY-MM-DD"),
END:s().format("YYYY-MM-DD"),
MINTIME:s().subtract(90,"days").format("YYYY-MM-DD"),
MAXTIME:s().format("YYYY-MM-DD")
},_=function(){
h(),A(),m(),g(),D(),c();
},c=function(){
var e=function(){
r.YM_BOX.show(),r.SP_BOX.show(),r.SC_BOX.show(),r.QR_BOX.hide(),r.ZH_BOX.hide();
},t=function(){
r.YM_BOX.hide(),r.SP_BOX.hide(),r.SC_BOX.hide(),r.QR_BOX.show(),r.ZH_BOX.show();
};
$(".js_tab1").on("click",function(){
e(),$(this).addClass("selected"),$(".js_tab2").removeClass("selected");
}),$(".js_tab2").on("click",function(){
t(),$(this).addClass("selected"),$(".js_tab1").removeClass("selected"),a(".js_popover1","<p> <label>群发后七日转化率</label> <span>视频群发后七日内（含群发当天）在公众号会话内转化情况。</span> </p> ","app_detail_overview_popover app_detail_popover"),
a(".js_popover2","<p> <label>看一看转化率</label> <span>视频发布到看一看后，在看一看场景中的转化情况；</span> </p> <p> <label>累计人数</label><span>人数按天去重累计，不同日期的用户不去重。</span> </p>","app_detail_overview_popover app_detail_popover");
}),$("#js_appmsg_title").on("click",function(){
var e="/misc/appmsganalysis?action=video_article";
cgiData.begin_date&&cgiData.end_date&&(e+="&begin_date="+cgiData.begin_date+"&end_date="+cgiData.end_date),
location.href=wx.url(e);
}),e();
},g=function f(e,a,t){
t||(t=99999999),i({
container:r.YM_DR,
isTodayValid:!0,
startDate:e||cgiData.begin_date||l.START,
endDate:a||cgiData.end_date||l.END,
minValidDate:l.MINTIME,
maxValidDate:l.MAXTIME,
needCompare:!1,
defaultText:" 到 ",
theme:"ta",
success:function(e){
f(e.startDate,e.endDate,t);
}
}),r.YM_LOADING.show(),r.YM_DATABOX.hide(),r.YM_NODATA.hide(),r.YM_RADIOBOX.empty(),
r.YM_DOWNLOAD.unbind("click").on("click",function(){
location.href=wx.url("/misc/appmsganalysis?action=get_video_article_view_summary&download=1&begin_date="+(e||cgiData.begin_date||l.START)+"&end_date="+(a||cgiData.end_date||l.END)+"&msgid="+cgiData.msgid+"&idx="+cgiData.idx+"&vid="+cgiData.vid);
}),n.get({
url:"/misc/appmsganalysis?action=get_video_article_view_summary",
data:{
begin_date:e||cgiData.begin_date||l.START,
end_date:a||cgiData.end_date||l.END,
msgid:cgiData.msgid,
idx:cgiData.idx,
vid:cgiData.vid
}
},function(e){
function a(e,i,s){
var n=[],o=["#44b549","#4A90E2"];
s&&(t=s);
for(var d={
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
categories:n,
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
borderWidth:0,
backgroundColor:"#FFF",
borderColor:"#FFF",
itemWidth:250,
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
formatter:function(){
var e="";
return this.points[0]&&(e+=this.points[0].point.category+"-浏览次数: "+this.points[0].y),
this.points[1]&&(e+="<br/>"+this.points[1].point.category+"-浏览人数: "+this.points[1].y),
e;
},
shared:!0
},
exporting:{
enabled:!1
}
},l=[],_=0;_<e.length;_++){
var c=e[_].scene;
if(cgiData.view_scene_table){
var g=JSON.parse(cgiData.view_scene_table);
if(g&&g.list&&g.list.length)for(var D=0;D<g.list.length;D++)if(g.list[D].scene==e[_].scene){
c=g.list[D].label;
break;
}
}
if(e[_].scene==s||e[_].scene==t){
l.push({
text:c,
value:e[_].scene,
selected:!0
});
for(var h=!1,D=0;1>=D;D++){
var A=[];
1==D&&e[_].data.length&&(h=!0);
for(var m=0;m<e[_].data.length;m++){
0==D&&n.push(e[_].data[m].refdate);
var f=Number(0==D?e[_].data[m].pv:e[_].data[m].uv);
A.push({
time:e[_].data[m].refdate,
y:f
});
}
d.series.push({
data:A,
name:0==D?"浏览次数":"浏览人数",
color:o[D],
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
d.xAxis[0].categories=n;
}else l.push({
text:c,
value:e[_].scene,
selected:!1
});
}
h?(r.YM_DATABOX.show(),r.YM_LOADING.hide(),r.YM_NODATA.hide(),i.height("400px").width("inherit").highcharts(d)):(r.YM_LOADING.hide(),
r.YM_DATABOX.hide(),r.YM_NODATA.show(),i.empty()),r.YM_RADIOBOX.html(template.render("js_radio_tpl",{
data:l
})),r.YM_RADIOBOX.find(".js_radio_input").on("click",function(){
a(e,i,$(this).val());
});
}
var i=!1;
if(e&&e.data_info){
var s=JSON.parse(e.data_info);
s&&s.list&&s.list.length&&(a(s.list,r.YM_DATABOX),i=!0);
}
i||(r.YM_DATABOX.hide(),r.YM_LOADING.hide(),r.YM_NODATA.show());
});
},D=function p(e,a,t){
t||(t=99999999),i({
container:r.SP_DR,
isTodayValid:!0,
startDate:e||cgiData.begin_date||l.START,
endDate:a||cgiData.end_date||l.END,
minValidDate:l.MINTIME,
maxValidDate:l.MAXTIME,
needCompare:!1,
defaultText:" 到 ",
theme:"ta",
success:function(e){
p(e.startDate,e.endDate,t);
}
}),r.SP_LOADING.show(),r.SP_DATABOX.hide(),r.SP_NODATA.hide(),r.SP_RADIOBOX.empty(),
r.SP_DOWNLOAD.unbind("click").on("click",function(){
location.href=wx.url("/misc/appmsganalysis?action=get_video_article_play_summary&download=1&begin_date="+(e||cgiData.begin_date||l.START)+"&end_date="+(a||cgiData.end_date||l.END)+"&msgid="+cgiData.msgid+"&idx="+cgiData.idx+"&vid="+cgiData.vid);
}),n.get({
url:"/misc/appmsganalysis?action=get_video_article_play_summary",
data:{
begin_date:e||cgiData.begin_date||l.START,
end_date:a||cgiData.end_date||l.END,
msgid:cgiData.msgid,
idx:cgiData.idx,
vid:cgiData.vid
}
},function(e){
function a(e,i,s){
var n=[],o=["#44b549","#4A90E2"];
s&&(t=s);
for(var d={
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
categories:n,
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
borderWidth:0,
backgroundColor:"#FFF",
borderColor:"#FFF",
itemWidth:250,
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
formatter:function(){
var e="";
return this.points[0]&&(e+=this.points[0].point.category+"-播放次数: "+this.points[0].y),
this.points[1]&&(e+="<br/>"+this.points[1].point.category+"-播放人数: "+this.points[1].y),
e;
},
shared:!0
},
exporting:{
enabled:!1
}
},l=[],_=0;_<e.length;_++){
var c=e[_].scene;
if(cgiData.play_scene_table){
var g=JSON.parse(cgiData.play_scene_table);
if(g&&g.list&&g.list.length)for(var D=0;D<g.list.length;D++)if(g.list[D].scene==e[_].scene){
c=g.list[D].label;
break;
}
}
if(e[_].scene==s||e[_].scene==t){
l.push({
text:c,
value:e[_].scene,
selected:!0
});
for(var h=!1,D=0;1>=D;D++){
var A=[];
1==D&&e[_].data.length&&(h=!0);
for(var m=0;m<e[_].data.length;m++){
0==D&&n.push(e[_].data[m].refdate);
var f=Number(0==D?e[_].data[m].pv:e[_].data[m].uv);
A.push({
time:e[_].data[m].refdate,
y:f
});
}
d.series.push({
data:A,
name:0==D?"浏览次数":"浏览人数",
color:o[D],
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
d.xAxis[0].categories=n;
}else l.push({
text:c,
value:e[_].scene,
selected:!1
});
}
h?(r.SP_DATABOX.show(),r.SP_LOADING.hide(),r.SP_NODATA.hide(),i.height("400px").width("inherit").highcharts(d)):(r.SP_LOADING.hide(),
r.SP_DATABOX.hide(),r.SP_NODATA.show(),i.empty()),r.SP_RADIOBOX.html(template.render("js_radio_tpl",{
data:l
})),r.SP_RADIOBOX.find(".js_radio_input").on("click",function(){
a(e,i,$(this).val());
});
}
var i=!1;
if(e&&e.data_info){
var s=JSON.parse(e.data_info);
s&&s.list&&s.list.length&&(r.SP_DATABOX.show(),r.SP_LOADING.hide(),r.SP_NODATA.hide(),
a(s.list,r.SP_DATABOX),i=!0);
}
i||(r.SP_DATABOX.hide(),r.SP_LOADING.hide(),r.SP_NODATA.show());
});
},h=function u(e,a){
i({
container:r.SC_DR,
isTodayValid:!0,
startDate:e||cgiData.begin_date||l.START,
endDate:a||cgiData.end_date||l.END,
minValidDate:l.MINTIME,
maxValidDate:l.MAXTIME,
needCompare:!1,
defaultText:" 到 ",
theme:"ta",
success:function(e){
u(e.startDate,e.endDate);
}
}),r.SC_LOADING.show(),r.SC_DATABOX.hide(),r.SC_NODATA.hide(),r.SC_DOWNLOAD.unbind("click").on("click",function(){
location.href=wx.url("/misc/appmsganalysis?action=get_video_article_play_time_summary&download=1&begin_date="+(e||cgiData.begin_date||l.START)+"&end_date="+(a||cgiData.end_date||l.END)+"&msgid="+cgiData.msgid+"&idx="+cgiData.idx+"&vid="+cgiData.vid);
}),n.get({
url:"/misc/appmsganalysis?action=get_video_article_play_time_summary",
data:{
msgid:cgiData.msgid,
idx:cgiData.idx,
vid:cgiData.vid,
begin_date:e||cgiData.begin_date||l.START,
end_date:a||cgiData.end_date||l.END
}
},function(e){
function a(e,a){
for(var t=[],i=[],s=0;s<e.length;s++)t.push(e[s].time_slice||"未知"),i.push(Number(e[s].pv||0));
$(a).show().height("400px").width("inherit").highcharts({
chart:{
type:"column"
},
title:{
text:null
},
subtitle:{
text:null
},
legend:{
enabled:!0,
borderWidth:0
},
exporting:{
enabled:!1
},
xAxis:{
categories:t,
gridLineWidth:0
},
yAxis:{
min:0,
title:{
text:"",
align:"high"
},
labels:{
overflow:"justify"
},
gridLineWidth:0
},
colors:["#1aad19"],
tooltip:{
backgroundColor:"#555556",
borderRadius:0,
borderWidth:0,
shadow:!1,
style:{
color:"#fff"
},
headerFormat:"",
formatter:function(){
var e="播放次数:"+this.y;
return e;
},
shared:!0
},
credits:{
enabled:!1
},
series:[{
name:"播放次数",
data:i
}]
});
}
var t=!1;
if(e&&e.data_info){
var i=JSON.parse(e.data_info);
i&&i.list&&i.list.length&&(a(i.list,r.SC_DATABOX),r.SC_LOADING.hide(),r.SC_DATABOX.show(),
r.SC_NODATA.hide(),t=!0);
}
t||(r.SC_DATABOX.hide(),r.SC_LOADING.hide(),r.SC_NODATA.show());
});
},A=function(){
n.get({
url:"/misc/appmsganalysis?action=get_video_article_conv&from=masssend",
data:{
public_date:cgiData.public_date,
msgid:cgiData.msgid,
idx:cgiData.idx,
vid:cgiData.vid
}
},function(e){
var a=!1;
if(e&&e.data_info){
var i=JSON.parse(e.data_info);
if(i&&i.list&&i.list.length){
var s=[];
if(cgiData.masssend_conv_scene_table){
var n=JSON.parse(cgiData.masssend_conv_scene_table);
n&&n.list&&n.list.length&&(s=n.list);
}
t(i.list,r.QR_DATABOX,"按七日内去重后的人数",s),r.QR_LOADING.hide(),a=!0;
}
}
a||(r.QR_DATABOX.hide(),r.QR_LOADING.hide(),r.QR_NODATA.show());
});
},m=function b(e,a){
i({
container:r.ZH_DR,
isTodayValid:!0,
startDate:e||cgiData.begin_date||l.START,
endDate:a||cgiData.end_date||l.END,
minValidDate:l.MINTIME,
maxValidDate:l.MAXTIME,
needCompare:!1,
defaultText:" 到 ",
theme:"ta",
success:function(e){
b(e.startDate,e.endDate);
}
}),r.ZH_LOADING.show(),r.ZH_DATABOX.hide(),r.ZH_NODATA.hide(),r.ZH_DOWNLOAD.unbind("click").on("click",function(){
location.href=wx.url("/misc/appmsganalysis?action=get_video_article_conv&from=kanyikan&download=1&begin_date="+(e||cgiData.begin_date||l.START)+"&end_date="+(a||cgiData.end_date||l.END)+"&msgid="+cgiData.msgid+"&idx="+cgiData.idx+"&vid="+cgiData.vid);
}),n.get({
url:"/misc/appmsganalysis?action=get_video_article_conv&from=kanyikan",
data:{
begin_date:e||cgiData.begin_date||l.START,
end_date:a||cgiData.end_date||l.END,
msgid:cgiData.msgid,
idx:cgiData.idx,
vid:cgiData.vid
}
},function(e){
var a=!1;
if(e&&e.data_info){
var i=JSON.parse(e.data_info);
if(i&&i.list&&i.list.length){
var s=[];
if(cgiData.kyk_conv_scene_table){
var n=JSON.parse(cgiData.kyk_conv_scene_table);
n&&n.list&&n.list.length&&(s=n.list);
}
r.ZH_DATABOX.show(),r.ZH_LOADING.hide(),t(i.list,r.ZH_DATABOX,"累计人数",s),a=!0;
}
}
a||(r.ZH_DATABOX.hide(),r.ZH_LOADING.hide(),r.ZH_NODATA.show());
});
};
_();
});