define("statistics/msg.js",["statistics/tab-bar/msg-tab.js","statistics/msg_top.js","statistics/common.js","statistics/chart/jquery-chart.js","statistics/tooltip.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/report_util.js"],function(e){
"use strict";
function t(e,t,a){
function r(e,r){
if(e=e[t],r=r[t],"string"==typeof e){
var n=e>r?1:e===r?0:-1;
return 1==a?n:-n;
}
return"number"==typeof e?1==a?e-r:r-e:void 0;
}
var n={
0:"date",
2:"user",
3:"count",
4:"per_user",
5:"hour"
};
return t=n[t],e.sort(r);
}
function a(e){
var a=[],r=(J.page-1)*J.pagesize,n=r+J.pagesize;
e=t(e,J.sort_key,J.sort_type);
for(var s=r;n>s&&s<e.length;s++)a.push(e[s]);
return a;
}
function r(){
n(),s(),d(),k.dateEvent.clearCompare();
}
function n(){
k.tabBar.activate(0,!0);
}
function s(){
k.dateEvent.setRangeDate({
startDate:J.begin_date,
endDate:J.end_date,
startCompareDate:J.compare_begin_date,
endCompareDate:J.compare_end_date
});
}
function d(){
k.dateEvent.setSingleDate({
startDate:J.singleDay,
endDate:J.singleDay,
startCompareDate:J.singleCompareDay,
endCompareDate:J.singleCompareDay
});
}
function i(){
J.type===F.type?(a(et),window.st_f._init(et),$("#js_keydata").html(template.render("js_keydata_tpl",{
yesterday:et[0]
})),$("#js_keydata_p").show()):$("#js_keydata_p").hide();
}
function o(e){
for(var t=[],a={},r=0,n=0;n<e.length;n++){
var s=e[n];
a[s.count_interval]?a[s.count_interval]+=s.user:a[s.count_interval]=s.user,r+=s.user;
}
for(var d={
1:"1-5次",
2:"6-10次",
3:"10次以上"
},n=0;3>=n;n++)a[n]&&t.push({
count_str:d[n],
cal_count:a[n],
percent:st_f._tofix(a[n]/r*100,2)
});
return t;
}
function _(){
var e=o(Q);
$("#js_dist").html(template.render("js_dist_tpl",{
data:e
}));
}
function p(e){
var t=J.begin_date,a=J.end_date,r=m(t,a,e);
if("monthly"!==J.type)tt.categories=r.categories;else{
var n=r.categories;
tt.categories=[];
for(var s=0,d=n.length;d>s;s++)tt.categories.push(I(n[s]).format("YYYY年MM月"));
}
tt.isCompareSeries=0,tt.series=[{
name:J.indexText,
yAxis:0,
data:r.seriesData
}],X.createChart(tt);
}
function c(){
if(L&&W){
var e=J.begin_date,t=J.end_date,a=J.compare_begin_date,r=J.compare_end_date,n=m(e,t,L),s=m(a,r,W),d=J.indexText,i=d,o=d,_="MM.DD",p=n.categories.length>=s.categories.length?n.categories:s.categories;
if("hourly"===J.type)i=I(e).format(_)+d,o=I(a).format(_)+d;else if("daily"===J.type||"weekly"===J.type)i=I(e).format(_)+"至"+I(t).format(_)+d,
o=I(a).format(_)+"至"+I(r).format(_)+d;else if("monthly"===J.type){
for(var c="MM月",u=0,l=p.length;l>u;u++)p[u]=I(p[u]).format("YYYY年MM月");
i=I(e).format(c)+"至"+I(t).format(c)+d,o=I(a).format(c)+"至"+I(r).format(c)+d;
}
tt.isCompareSeries=1,tt.categories=p||n.categories,tt.series=[{
name:i,
yAxis:0,
data:n.seriesData
},{
name:o,
yAxis:0,
data:s.seriesData
}],X.createChart(tt);
}
}
function m(e,t,a){
return"daily"===J.type?g(e,t,a):"monthly"===J.type?u(e,t,a):"hourly"===J.type?l(e,t,a):"weekly"===J.type?f(e,t,a):void 0;
}
function u(e,t,a){
for(var r=[],n=[],s=e,d=(I(t).add(1,"days").format("YYYY-MM-DD"),{}),i=0,o=a.length;o>i;i++){
var _=a[i];
d[_.date]=_;
}
var p=I(s);
1!==p.date()&&(p.date(1),p.add(1,"months")),s=p.format(B);
for(var c=parseInt(I(s).format("X")),m=parseInt(I(t).format("X")),u=J.indexType;m>=c;){
if(r.push(s),d[s]){
var l=d[s];
n.push({
name:I(l.date).format("YYYY年MM月"),
y:"average"===u?l.count/l.user:l[u]
}),i++;
}else n.push({
name:I(s).format("YYYY年MM月"),
y:0
});
s=I(s).add(1,"months").format(B),c=parseInt(I(s).format("X"));
}
return{
categories:r,
seriesData:n
};
}
function l(e,t,a){
for(var r=[],n=[],s=0,d=J.indexType,i=0,o=24;o>i;i++){
var _=10>i?"0"+i:""+i,p=_+":00",c=a[s];
r.push(p),c&&c.hour/100==i?(n.push({
name:p,
y:"average"===d?c.count/c.user:c[d]
}),s++):n.push({
name:p,
y:0
});
}
return{
categories:r,
seriesData:n
};
}
function f(e,t,a){
for(var r=[],n=[],s=e,d=(I(t).add(1,"days").format("YYYY-MM-DD"),J.indexType),i={},o=0,_=a.length;_>o;o++){
var p=a[o];
i[p.date]=p;
}
var c=parseInt(I(s).format("d"));
1!==c&&(s=I(s).add(8-c,"days").format(B));
for(var m=parseInt(I(s).format("X")),u=parseInt(I(t).format("X"));u>=m;){
if(r.push(s),i[s]){
var l=i[s];
n.push({
name:l.date,
y:"average"===d?l.count/l.user:l[d]
}),o++;
}else n.push({
name:s,
y:0
});
s=I(s).add(1,"weeks").format(B),m=parseInt(I(s).format("X"));
}
return{
categories:r,
seriesData:n
};
}
function g(e,t,a){
for(var r=[],n=[],s=e,d=I(t).add(1,"days").format("YYYY-MM-DD"),i=J.indexType||"user",o={},_=0,p=a.length;p>_;_++){
var c=a[_];
o[c.date]=c;
}
for(;s!==d;){
r.push(s);
var m=o[s];
n.push(m?{
name:s,
y:"average"===i?m.count/m.user:m[i]
}:{
name:s,
y:0
}),s=I(s).add(1,"days").format("YYYY-MM-DD");
}
return{
categories:r,
seriesData:n
};
}
function y(){
var e=a(et);
window.st_f._init(et),$("#js_detail_table").html(template.render("js_detail_table_tpl",{
data:e,
filter:J
}));
var t=et.length;
O.initRank({
sortkey:J.sort_key,
sorttype:1==J.sort_type?1:0,
down_class:"arrow_up",
up_class:"arrow_down",
callback:function(e){
J.sort_key=e.sortkey,J.sort_type=e.sorttype,J.page=1,y();
}
}),O.initPager({
total_count:t,
container:"#js_pagebar",
count:J.pagesize,
currentPage:J.page,
callback:function(e){
e!=J.page&&(J.page=e,y());
}
});
}
function h(){
var e=I(J.begin_date,B),t=I(J.end_date,B),a=I(J.compare_begin_date,B),r=I(J.compare_end_date,B);
J.is_compare&&("weekly"==J.type?(1!==e.day()&&e.day(8),1!==a.day()&&a.day(8)):"monthly"==J.type&&(1!==e.date()&&(e.add("M",1),
e.date(1)),1!==a.date()&&(a.add("M",1),a.date(1))),e.unix()>t.unix()&&(e=t),a.unix()>r.unix()&&(a=r)),
e=e.format(B),t=t.format(B),a=a.format(B),r=r.format(B);
var n=wx.url("/misc/messageanalysis?begin_date=%s&end_date=%s&type=%s&download=1".sprintf(e,t,J.type));
J.is_compare&&(n+="&compare=1&compare_begin_date=%s&compare_end_date=%s".sprintf(a,r)),
$("#js_download_detail").attr("href",n);
}
function v(e){
if(!Z){
Z=!0,w();
var t="";
("daily"!=J.type||V)&&(t="&begin_date=%s&end_date=%s".sprintf(J.begin_date,J.end_date)),
A("load mssage data"),K.get({
url:wx.url("/misc/messageanalysis?type=%s%s".sprintf(J.type,t)),
success:function(t){
var a=R("load mssage data");
E(S,a,z),V=!1,Z=!1,b(),0==t.base_resp.ret?(et=t.list,Q=t.dist_list,L=$.extend(!0,[],et),
e&&i(),_(),p(L),y(),h()):K.handleRet(t,{
id:"64527",
key:"7"
});
}
});
}
}
function w(){
at.show();
}
function b(){
at.hide();
}
function x(e){
var t={
user:"MSG_TAB_USER_COUNT",
count:"MSG_TAB_MSG_COUNT",
average:"MSG_TAB_AVERAGE_MSG_COUNT"
},a=t[e.type];
T.clickReport(T.reportKeys[a]);
}
function j(){
function e(){
r++,r&&(Z=!1,b());
}
if(!Z){
Z=!0,w();
var t="",a=!1,r=-1;
L=W=null,t="&begin_date=%s&end_date=%s".sprintf(J.begin_date,J.end_date),A("load mssage data compare 1"),
K.get({
url:wx.url("/misc/messageanalysis?type=%s%s".sprintf(J.type,t)),
success:function(t){
var r=R("load mssage data compare 1");
E(S,r,z),0==t.base_resp.ret?(et=t.list,Q=t.dist_list,L=$.extend(!0,[],et),a&&(Y(),
c(),st=D(),M(),h()),a=!0,e()):K.handleRet(t,{
id:"64527",
key:"8"
});
}
}),t="&begin_date=%s&end_date=%s".sprintf(J.compare_begin_date,J.compare_end_date),
A("load mssage data compare 2"),K.get({
url:wx.url("/misc/messageanalysis?type=%s%s".sprintf(J.type,t)),
success:function(t){
var r=R("load mssage data compare 2");
E(S,r,z),0==t.base_resp.ret?(rt=t.list,nt=t.dist_list,W=$.extend(!0,[],rt),a&&(Y(),
c(),st=D(),M(),h()),a=!0,e()):K.handleRet(t,{
id:"64527",
key:"9"
});
}
});
}
}
function D(){
for(var e=[],t={},a={},r=I(J.begin_date,B),n=I(J.end_date,B),s=I(J.compare_begin_date,B),d=1,i="d",o=B,_=I(J.compare_end_date,B),p=0;p<et.length;p++)t[et[p].date+(et[p].hour/100||"")]=et[p];
for(var p=0;p<rt.length;p++)a[rt[p].date+(rt[p].hour/100||"")]=rt[p];
if("weekly"==J.type)1!==r.day()&&r.day(8),1!==s.day()&&s.day(8),d=7;else if("monthly"==J.type)1!==r.date()&&(r.add("M",1),
r.date(1)),1!==s.date()&&(s.add("M",1),s.date(1)),i="M";else if("hourly"==J.type){
for(i="h",n.add("h",23),_.add("h",23),o+="H";r.unix()<=n.unix()&&s.unix()<=_.unix();){
var c=r.format(o),m=s.format(o),u=r.format(B),l=s.format(B),f={
count:"-",
user:"-",
date:u
},g={
count:"-",
user:"-",
date:l
};
f.hour=r.format("HH:SS"),g.hour=f.hour,e.push(a[m]||g),e.push(t[c]||f),s.add(i,d),
r.add(i,d);
}
return e.reverse();
}
for(;r.unix()<=n.unix()&&s.unix()<=_.unix();){
var u=r.format(o),l=s.format(o),f={
count:"-",
user:"-",
date:u
};
e.push(a[l]||{
count:"-",
user:"-",
date:l
}),e.push(t[u]||f),s.add(i,d),r.add(i,d);
}
for(;r.unix()<=n.unix();){
var u=r.format(o);
e.push({
count:"-",
user:"-"
}),e.push(t[u]||{
count:"-",
user:"-",
date:u
}),r.add(i,d);
}
for(;s.unix()<=_.unix();){
var l=s.format(o);
e.push(a[l]||{
count:"-",
user:"-",
date:l
}),e.push({
count:"-",
user:"-"
}),s.add(i,d);
}
return e.reverse(),e;
}
function M(){
var e=[],t=(J.page-1)*J.pagesize,a=t+J.pagesize;
window.st_f._init(st);
for(var r=t;a>r&&r<st.length;r++)e.push(st[r]);
$("#js_detail_table").html(template.render("js_compare_detail_table_tpl",{
data:e,
filter:J
}));
var n=st.length;
O.initPager({
total_count:n,
container:"#js_pagebar",
count:J.pagesize,
currentPage:J.page,
callback:function(e){
e!=J.page&&(J.page=e,M());
}
});
}
function Y(){
for(var e,t=o(Q),a=o(nt),r=[],n=0;n<t.length;n++)e=t[n],r.push(e),e.dist_time=J.begin_date+"至"+J.end_date,
a[n]?(e.rowspan=!0,a[n].hiderow=!0,r.push(a[n]),a[n].dist_time=J.compare_begin_date+"至"+J.compare_end_date):e.rowspan=!1;
for(;n<a.length;n++)a[n].rowspan=!1,a[n].dist_time=J.compare_begin_date+"至"+J.compare_end_date,
r.push(a[n]);
$("#js_dist").html(template.render("js_compare_dist_tpl",{
data:r
}));
}
var k=e("statistics/tab-bar/msg-tab.js"),C=e("statistics/msg_top.js"),T=e("statistics/common.js"),S=T.reportKeys.LOAD_MSG_DATA_AJAX_KEY,E=T.ajaxReport,A=T.time,R=T.timeEnd,z=wx.data.uin;
e("statistics/chart/jquery-chart.js"),e("statistics/tooltip.js"),C.selected("msg_stat");
var G=e("biz_web/ui/dropdown.js"),I=e("biz_common/moment.js"),K=e("common/wx/Cgi.js"),O=e("common/wx/report_util.js"),X=$("#js_msg_chart"),B="YYYY-MM-DD",P=I().add("d",-1).format(B),N=I().add("d",-30).format(B),U=I().add("d",-31).format(B),H=I().add("d",-60).format(B),V=!1,q=window.cgiData;
q.filter.begin_date||delete q.filter.begin_date,q.filter.end_date||delete q.filter.end_date;
var F={
type:"daily",
begin_date:N,
end_date:P,
compare_begin_date:H,
compare_end_date:U,
is_compare:!1,
sort_key:0,
sort_type:2,
page:1,
pagesize:10,
indexText:"消息发送人数",
indexType:"user"
},J=$.extend(!0,{},F,q.filter),L=$.extend(!0,[],q.data.msg_data),W=$.extend(!0,[],q.data.msg_data),Q=q.data.dist_data,Z=!1,et=$.extend(!0,[],q.data.msg_data);
k.init(J),template.helper("$yest",function(e){
var t=window.st_f.first_idx;
return st_f._get_item(t,e);
}),template.helper("day_percent",function(e){
var t=window.st_f.first_idx,a=window.st_f.yest_idx;
return window.st_f._percent(t,a,e);
}),template.helper("week_percent",function(e){
var t=window.st_f.weekago_idx,a=window.st_f.first_idx;
return window.st_f._percent(a,t,e);
}),template.helper("month_percent",function(e){
var t=window.st_f.first_idx,a=window.st_f.monthago_idx;
return window.st_f._percent(t,a,e);
});
new G({
container:"#js_timetype_drop",
label:"日报",
data:[{
name:"小时报",
value:"hourly"
},{
name:"日报",
value:"daily"
},{
name:"周报",
value:"weekly"
},{
name:"月报",
value:"monthly"
}],
callback:function(e){
J=$.extend(!0,{},F,{
type:e
}),r(),"hourly"==e?(J.begin_date=J.end_date=P,k.dateEvent.emit("date-selection:hide")):k.dateEvent.emit("date-selection:show"),
v(!0);
}
});
$(".js_typeSelect").click(function(){
$(".js_typeSelect").each(function(){
$(this).parent().removeClass("selected");
}),$(this).parent().addClass("selected");
var e=$(this).data("value");
J=$.extend(!0,{},F,{
type:e
}),r(),"hourly"==e?(J.begin_date=J.end_date=P,k.dateEvent.emit("date-selection:hide")):k.dateEvent.emit("date-selection:show"),
v(!0);
});
var tt={
autoStep:!0,
chartType:"area",
title:"",
height:300,
isCompareSeries:0,
dataFormat:"1",
labelFormat:0,
enableLegend:!0,
theme:"wechat"
};
y(),_(),p(L),h();
var at=$("div.wrp_overview div.wrp_loading");
k.dateEvent.on("date-change",function(e){
V=!0,J.begin_date=e.startDate,J.end_date=e.endDate,e.startCompareDate&&(J.compare_begin_date=e.startCompareDate),
e.endCompareDate&&(J.compare_end_date=e.endCompareDate),J.is_compare=e.needCompare,
J.is_compare?j():v();
}),k.tabBar.on("tab-selected",function(e,t){
x(t),$("#js_detail_table table td.js_"+J.indexType).removeClass("td_high_light"),
$("#js_detail_table table td.js_"+t.type).addClass("td_high_light"),J.indexType=t.type,
J.indexText=t.text,J.is_compare?c():p(L);
});
var rt=[],nt=[];
template.helper("pageIndex",function(e,t,a){
return parseInt((e*(t-1)+a)/2+1);
});
var st=[];
seajs.use("statistics/report.js",function(e){
e(T.logKeys.MSG_NETWORK_OVERTIME,T.logKeys.MSG_JS_OVERTIME,T.reportKeys.MSG_PAGE);
}),function(){
"0"===window.cgiData.load_done||"0"===window.cgiData.dist_load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}();
});