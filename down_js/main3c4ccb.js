define("statistics/article/analyse/main.js",["statistics/article/top.js","statistics/chart/empty-pie.js","statistics/article/analyse/click-report.js","statistics/components/tab-bar2.js","statistics/components/date-range2.js","statistics/components/table-date.js","statistics/components/misc-date.js","statistics/chart/pie.js","statistics/common.js","statistics/tooltip.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/report_util.js","statistics/common_util.js"],function(e){
"use strict";
function t(e){
it={},nt.isTableDateChange||(M={});
for(var t=X(nt.tableBeginDate).format("X"),s=X(nt.tableEndDate).format("X"),n=0;n<e.length;n++){
var i=e[n],o=i.user_source,r=X(i.ref_date).format("X");
if(!("daily"==nt.type&&t>r||r>s||(it[o]||(it[o]=[]),i.date||(i.date=i.ref_date),
i.hour||(i.hour=i.ref_hour),"hourly"==nt.type&&"undefined"==typeof i.hour&&(i.hour=0),
it[o].push(i),99999999==o||nt.isTableDateChange||!i.int_page_read_count&&!i.int_page_read_user))){
var c=M[o]||{
int_page_read_count:0,
int_page_read_user:0,
y:0,
y2:0,
name:et[o]
};
c.y+=i.int_page_read_count,c.y2+=i.int_page_read_user,M[o]=c;
}
}
nt.isTableDateChange||(ot=$.extend(!0,{},it)),a([0,2],it);
}
function a(e,t){
var a="hourly"==nt.type?"hour":"date",s=[];
e.each(function(e){
var n={},i=t[e]||[];
i.each(function(e){
n[e[a]]=e;
}),s.push(n);
}),t[tt]&&t[tt].each(function(t){
e.each(function(e,n){
var i="source_"+e+"_",o=t[a],r=s[n][o];
r?(t[i+"user"]=r.int_page_read_user,t[i+"count"]=r.int_page_read_count):(t[i+"user"]=0,
t[i+"count"]=0);
});
});
}
function s(){
N=new L,$("#js_date_range").html(N.$el),N.init(),N.on("date-change",function(e){
nt.begin_date=e.startDate,nt.end_date=e.endDate,e.startCompareDate&&(nt.compare_begin_date=e.startCompareDate),
e.endCompareDate&&(nt.compare_end_date=e.endCompareDate),nt.is_compare=e.needCompare,
q=!0,h(),nt.is_compare?(v(),Q.hide()):(x(),Q.show(),Q.setDate(e),d());
});
}
function n(e){
ct=rt={};
for(var t=0;t<e.length;t++){
var s=e[t],n=s.user_source;
ct[n]||(ct[n]=[]),s.date||(s.date=s.ref_date),s.hour||(s.hour=s.ref_hour),"hourly"==nt.type&&"undefined"==typeof s.hour&&(s.hour=0),
ct[n].push(s);
}
rt=$.extend(!0,rt,ct),a([0,2],ct);
}
function i(){
U.initKeyData({
data:it[tt],
columns:[{
title:"图文总阅读次数",
key:"int_page_read_count"
},{
title:"原文阅读次数",
key:"ori_page_read_count"
},{
title:"分享转发次数",
key:"share_count"
},{
title:"微信收藏人数",
key:"add_to_fav_user"
}]
});
}
function o(){
var e=new A({
tabs:[{
text:"日报",
value:"daily"
},{
text:"小时报",
value:"hourly"
}]
});
jQuery("#js_timetype_drop").html(e.$el),r(e);
}
function r(e){
e.on("tab-selected",function(e,t){
var a=t.value;
nt=$.extend(!0,nt,at,{
type:a
}),"hourly"==a?(nt.begin_date=nt.end_date=V,$("#js_keydata_p").hide(),nt.sort_key="hour",
nt.sort_type=1,N.showHourRange(),Q.showHourRange()):($("#js_keydata_p").show(),N.showDateRange(),
Q.showDateRange()),c(),u(),x(),h();
});
}
function c(){
H.activate(0,!0),m(),N.reset(),Q.setDate({
startDate:nt.begin_date,
endDate:nt.end_date
}),d();
}
function d(){
nt.tableBeginDate=nt.begin_date,nt.tableEndDate=nt.end_date;
}
function _(){
H=new A({
tabs:[{
text:"图文总阅读",
submenu:"date",
type:"int_page_read"
},{
text:"原文页阅读",
submenu:"date",
type:"ori_page_read"
},{
text:"分享转发",
submenu:"date",
type:"share"
},{
text:"微信收藏",
submenu:"date",
type:"add_to_fav"
}]
}),jQuery("#js_filter_tab").html(H.$el),H.on("tab-selected",g);
}
function p(){
S=new A({
tabs:[{
text:"全部渠道",
source:"99999999"
},{
text:"公众号会话",
source:"0"
},{
text:"好友转发",
source:"1"
},{
text:"朋友圈",
source:"2"
},{
text:"历史消息",
source:"4"
},{
text:"看一看",
source:"6"
},{
text:"搜一搜",
source:"7"
},{
text:"其它",
source:"5"
}]
}),jQuery("#js_filter_source").html(S.$el),S.on("tab-selected",function(e,t){
nt.source=t.source,nt.is_compare?D():j();
});
}
function l(){
$("#js_filter_source").hide(),S.activate(0),nt.source=tt;
}
function u(){
$("#js_filter_source").find("a").removeClass("selected").filter("[data-source=99999999]").addClass("selected");
}
function m(){
$("#js_filter_source").show(),S.activate(0),nt.source=tt;
}
function g(e,t){
var a=t.text,s=t.type;
nt.origIndexType=s,"add_to_fav"==s?(nt.indexType=[s+"_user"],nt.indexText=[a+"人数"]):(nt.indexType=[s+"_user",s+"_count"],
nt.indexText=[a+"人数",a+"次数"]),"int_page_read"==s?m():l(),h()&&w(),nt.is_compare?D():j();
}
function h(){
return f()?(b(),!1):(y(),!0);
}
function f(){
return nt.is_compare||"int_page_read"!=nt.origIndexType;
}
function y(){
$("#js_chart_pie_content").show();
}
function b(){
$("#js_chart_pie_content").hide();
}
function j(){
nt.pagesize=at.pagesize,nt.page=1,nt.isTableDateChange||U.showChart({
data:ot[nt.source]
},nt),U.showDetailTable({
data:it[tt]
},nt),U.initDownload({
baseCgi:"/misc/appmsganalysis?action=report&"
},nt),E.pager(),$("#js_share_table").show();
}
function D(){
nt.pagesize=st,nt.page=1,U.showCompareChart({
chartData:ot[nt.source],
compareChartData:rt[nt.source]
},nt),U.showCompareDetailTable({
tableData:it[tt],
compareTableData:ct[tt]
},nt),U.initDownload({
baseCgi:"/misc/appmsganalysis?action=report&"
},nt),$("#js_share_table").hide();
}
function x(){
if(!_t){
_t=!0,U.showLoading();
var e="";
if(nt.isTableDateChange)var a=nt.tableBeginDate,s=nt.tableEndDate;else var a=nt.begin_date,s=nt.end_date;
e="&begin_date=%s&end_date=%s".sprintf(a,s),O("load mssage data"),F.get({
url:"/misc/appmsganalysis?action=report&type=%s%s".sprintf(nt.type,e),
success:function(e){
var a=Y("load mssage data");
I(z,a,K),0==e.base_resp.ret?(t(e.item),dt=e.share_item,j(),nt.isTableDateChange||w(),
nt.isTableDateChange=!1):F.handleRet(e,{
id:"64527",
key:"0"
});
},
complete:function(){
_t=!1,U.hideLoading();
}
});
}
}
function v(){
function e(){
s++,s&&(_t=!1,U.hideLoading(),0==i&&D());
}
if(!_t){
_t=!0,U.showLoading();
var a="",s=-1,i=0;
a="&begin_date=%s&end_date=%s".sprintf(nt.begin_date,nt.end_date),O("load mssage data compare 1"),
F.get({
url:"/misc/appmsganalysis?action=report&type=%s%s".sprintf(nt.type,a),
success:function(a){
var s=Y("load mssage data compare 1");
I(z,s,K),0==a.base_resp.ret?(t(a.item),dt=a.share_item):(i++,F.handleRet(a,{
id:"64527",
key:"1"
})),e();
}
}),a="&begin_date=%s&end_date=%s".sprintf(nt.compare_begin_date,nt.compare_end_date),
O("load mssage data compare 2"),F.get({
url:"/misc/appmsganalysis?action=report&type=%s%s".sprintf(nt.type,a),
success:function(t){
var a=Y("load mssage data compare 2");
I(z,a,K),U.hideLoading(),0==t.base_resp.ret?(n(t.item),D()):(i++,F.handleRet(t,{
id:"64527",
key:"2"
})),e();
}
});
}
}
function w(){
var e=[],t=0,a=0;
for(var s in M){
var n=M[s];
e.push(n),a+=n.y,t+=n.y2,5==s&&(n.color=B.OTHER_COLOR);
}
if(e.length>0){
k("#js_chart_empty_pie",{
series:[{
name:"人数",
data:e
}],
legend:{
align:"right",
verticalAlign:"top",
layout:"vertical",
x:-150,
y:0,
itemMarginBottom:25,
labelFormat:"{name}<br/>{y}次，{y2}人"
},
plotOptions:{
pie:{
colors:["#3EB642","#237C30","#74C4F1","#468EE5","#E7EC93","#B3B3B3"],
center:["55%","43%"],
dataLabels:{
useHTML:!0,
format:'<span class="pointer-label"><span class="pointer-label-name">{point.name}</span><br/><span class="pointer-label-count">{point.y}次，{point.y2}人</span></span>'
}
}
},
size:200,
titleText:"<b class='pie-text'>%s次</b><br/><b class='pie-text'>%s人</b><br/><span>阅读总数</span>".sprintf(a,t)
});
}else jQuery("#js_chart_empty_pie").html('<div class="empty_tips">暂无数据</div>');
}
function C(){
Q=new R({
container:"#js_table_date",
startDate:nt.tableBeginDate,
endDate:nt.tableEndDate
}),Q.on("date-change",function(e){
nt.tableBeginDate=e.startDate,nt.tableEndDate=e.endDate,nt.isTableDateChange=!0,
x();
});
}
{
var T=e("statistics/article/top.js");
e("statistics/chart/empty-pie.js");
}
T.selected("article_analyse");
var E=e("statistics/article/analyse/click-report.js"),A=e("statistics/components/tab-bar2.js"),R=(e("statistics/components/date-range2.js"),
e("statistics/components/table-date.js")),L=e("statistics/components/misc-date.js"),k=e("statistics/chart/pie.js"),B=e("statistics/common.js"),z=B.reportKeys.LOAD_ARTICLE_DATA_AJAX_KEY,I=B.ajaxReport,O=B.time,Y=B.timeEnd,K=wx.data.uin,M=null,H=null,N=null,Q=null,S=null;
e("statistics/tooltip.js");
var X=(e("biz_web/ui/dropdown.js"),e("biz_common/moment.js")),F=e("common/wx/Cgi.js"),J=(e("common/wx/report_util.js"),
$("#js_msg_chart"),"YYYY-MM-DD"),V=X().add("d",-1).format(J),G=X().add("d",-30).format(J),P=X().add("d",-31).format(J),W=X().add("d",-60).format(J),q=!1,U=e("statistics/common_util.js"),Z=window.cgiData,et={
0:"会话",
1:"好友转发",
2:"朋友圈",
3:"腾讯微博",
4:"历史消息页",
6:"看一看",
7:"搜一搜",
5:"其它",
99999999:"全部"
},tt=99999999,at={
type:"daily",
begin_date:G,
end_date:V,
compare_begin_date:W,
compare_end_date:P,
is_compare:!1,
sort_key:"date",
sort_type:2,
page:1,
pagesize:10,
indexText:["图文总阅读人数","图文总阅读次数"],
indexType:["int_page_read_user","int_page_read_count"],
origIndexType:"int_page_read",
source:tt,
tableBeginDate:G,
tableEndDate:V,
isTableDateChange:!1
},st=14,nt=$.extend(!0,{},at),it={},ot={},rt=null,ct=null,dt=null,_t=!1,q=!0,pt={
1:"好友转发",
2:"朋友圈",
5:"其它"
};
template.helper("$share_scene",function(e){
return pt[e]||e;
}),t(Z.list),s(),i(),o(),_(),C(),p(),dt=Z.share_list,B.help("#js_ask_icon","#js_pop_items_info"),
w(),j(),E.init(),seajs.use("statistics/report.js",function(e){
e(B.logKeys.ARTICLE_ANALYSE_NETWORK_OVERTIME,B.logKeys.ARTICLE_ANALYSE_JS_OVERTIME,B.reportKeys.ARTICLE_ANALYSE_PAGE);
}),function(){
"0"===window.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}();
});