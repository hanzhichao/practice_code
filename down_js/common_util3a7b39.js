define("statistics/common_util.js",["common/wx/Cgi.js","biz_common/moment.js","common/wx/report_util.js","statistics/common.js","tpl/statistics/keydata.html.js","statistics/tab-bar/index.js","statistics/tab-bar/tab-date.js","statistics/chart/jquery-chart.js"],function(e,t){
"use strict";
function a(e,t){
e=$.extend(!0,{
container:"#js_keydata_p"
},e),"daily"===t.type?$(e.container).show():$(e.container).hide();
}
function r(e,t){
function a(e,t,a){
function r(e,r){
if(e=e[t],r=r[t],"string"==typeof e){
var n=e>r?1:e===r?0:-1;
return 1==a?n:-n;
}
return"number"==typeof e?1==a?e-r:r-e:void 0;
}
return e.sort(r);
}
var r=[],n=(t.page-1)*t.pagesize,i=n+t.pagesize;
e=a(e,t.sort_key,t.sort_type);
for(var o=n;i>o&&o<e.length;o++)r.push(e[o]);
return r;
}
function n(e,t,a){
e=$.extend(!0,{
pageContainer:"#js_pagebar",
data:[],
container:"#js_detail_table",
tpl:"js_detail_table_tpl"
},e);
var i=e.data,o=r(i,t);
$(e.container).html(template.render(e.tpl,{
data:o,
filter:t
}));
var s=i.length;
f.initRank({
sortkey:t.sort_key,
sorttype:1==t.sort_type?1:0,
down_class:"arrow_up",
up_class:"arrow_down",
callback:function(a){
t.sort_key=a.sortkey,t.sort_type=a.sorttype,t.page=1,n(e,t);
}
}),a||f.initPager({
total_count:s,
container:e.pageContainer,
count:t.pagesize,
currentPage:t.page,
callback:function(a){
a=Math.round(a),a!=t.page&&(t.page=a,n(e,t,!0));
}
});
}
function i(e,t,a,r){
return"daily"===r.type?o(e,t,a,r):"hourly"===r.type?s(e,t,a,r):void 0;
}
function o(e,t,a,r){
for(var n=[],i=[],o=e,s=m(t).add(1,"days").format("YYYY-MM-DD"),d=r.indexType,p={},c=0,l=a.length;l>c;c++){
var h=a[c];
p[h.date]=h;
}
$.isArray(d)||(d=[d]);
for(var f=0;f<d.length;f++)i[f]=[];
for(;o!==s;){
n.push(o);
for(var u=p[o],f=0;f<d.length;f++)i[f].push(u?{
name:o,
y:u[d[f]]
}:{
name:o,
y:0
});
o=m(o).add(1,"days").format("YYYY-MM-DD");
}
return{
categories:n,
seriesData:i
};
}
function s(e,t,a,r){
var n=[],i=[],o=0,s=r.indexType;
$.isArray(s)||(s=[s]);
for(var o=0;o<s.length;o++)i[o]=[];
o=0;
for(var d=0,p=24;p>d;d++){
var c=10>d?"0"+d:""+d,l=c+":00",h=a[o];
n.push(l);
for(var m=0;m<s.length;m++)i[m].push(h&&h.hour/100==d?{
name:l,
y:h[s[m]]
}:{
name:l,
y:0
});
h&&h.hour/100==d&&o++;
}
return{
categories:n,
seriesData:i
};
}
function d(e,t){
e=$.extend(!0,{
data:[],
container:"#js_chart",
chartOptions:{
autoStep:!0,
chartType:"area",
title:"",
height:300,
isCompareSeries:0,
dataFormat:"1",
labelFormat:0,
enableLegend:!0,
legend:{
useHTML:!0
},
theme:"wechat"
}
},e);
var a=e.data,r=e.chartOptions,n=t.begin_date,o=t.end_date,s=i(n,o,a,t);
if("monthly"!==t.type)r.categories=s.categories;else{
var d=s.categories;
r.categories=[];
for(var p=0,c=d.length;c>p;p++)r.categories.push(m(d[p]).format("YYYY年MM月"));
}
if(r.isCompareSeries=0,$.isArray(t.indexType)){
for(var l=[],p=0;p<t.indexType.length;p++)l.push({
name:t.indexText[p],
yAxis:0,
data:s.seriesData[p]
});
r.series=l;
}else r.series=[{
name:t.indexText,
yAxis:0,
data:s.seriesData[0]
}];
$(e.container).createChart(r);
}
function p(e,t){
e=$.extend(!0,{
chartData:[],
compareChartData:[],
container:"#js_chart",
chartOptions:{
autoStep:!0,
chartType:"area",
title:"",
height:300,
isCompareSeries:0,
dataFormat:"1",
labelFormat:0,
enableLegend:!0,
theme:"wechat",
lengnd:u.itemLengenShape
}
},e);
var a=e.chartOptions,r=e.chartData,n=e.compareChartData;
if(r&&n){
var o=t.begin_date,s=t.end_date,d=t.compare_begin_date,p=t.compare_end_date,c=i(o,s,r,t),l=i(d,p,n,t),h=t.indexText,f=h,_=h,g="MM.DD",y=c.categories.length>=l.categories.length?c.categories:l.categories;
if("hourly"===t.type)f=m(o).format(g),_=m(d).format(g);else if("daily"===t.type||"weekly"===t.type)f=m(o).format(g)+"至"+m(s).format(g),
_=m(d).format(g)+"至"+m(p).format(g);else if("monthly"===t.type){
for(var x="MM月",b=0,v=y.length;v>b;b++)y[b]=m(y[b]).format("YYYY年MM月");
f=m(o).format(x)+"至"+m(s).format(x),_=m(d).format(x)+"至"+m(p).format(x);
}
if(a.isCompareSeries=1,a.categories=y||c.categories,$.isArray(t.indexType)){
for(var D=[],b=0;b<t.indexType.length;b++)D.push({
name:f+h[b],
yAxis:0,
data:c.seriesData[b]
});
for(var b=0;b<t.indexType.length;b++)D.push({
name:_+h[b],
yAxis:0,
data:l.seriesData[b]
});
a.series=D;
}else a.series=[{
name:f+h,
yAxis:0,
data:c.seriesData[0]
},{
name:_+h,
yAxis:0,
data:l.seriesData[0]
}];
$(e.container).createChart(a);
}
}
function c(e,t){
for(var a=e.tableData,r=e.compareTableData,n=[],i={},o={},s=m(t.begin_date,v),d=m(t.end_date,v),p=m(t.compare_begin_date,v),c=1,l="d",h=v,f=m(t.compare_end_date,v),u=0;u<a.length;u++)i[a[u].date+("hourly"===t.type?a[u].hour/100||"0":"")]=a[u];
for(var u=0;u<r.length;u++)o[r[u].date+("hourly"===t.type?r[u].hour/100||"0":"")]=r[u];
if("weekly"==t.type)1!==s.day()&&s.day(8),1!==p.day()&&p.day(8),c=7;else if("monthly"==t.type)1!==s.date()&&(s.add("M",1),
s.date(1)),1!==p.date()&&(p.add("M",1),p.date(1)),l="M";else if("hourly"==t.type){
for(l="h",d.add("h",23),f.add("h",23),h+="H";s.unix()<=d.unix()&&p.unix()<=f.unix();){
var _=s.format(h),g=p.format(h),y=s.format(v),x=p.format(v),b={
date:y
},D={
date:x
};
b.hour=100*s.hour(),D.hour=b.hour,n.push(o[g]||D),n.push(i[_]||b),p.add(l,c),s.add(l,c);
}
return n.reverse();
}
for(;s.unix()<=d.unix()&&p.unix()<=f.unix();){
var y=s.format(h),x=p.format(h),b={
date:y
};
n.push(o[x]||{
date:x
}),n.push(i[y]||b),p.add(l,c),s.add(l,c);
}
for(;s.unix()<=d.unix();){
var y=s.format(h);
n.push({}),n.push(i[y]||{
date:y
}),s.add(l,c);
}
for(;p.unix()<=f.unix();){
var x=p.format(h);
n.push(o[x]||{
date:x
}),n.push({}),p.add(l,c);
}
return n.reverse(),n;
}
function l(e,t){
e=$.extend(!0,{
tableData:[],
compareTableData:[],
container:"#js_detail_table",
tpl:"js_compare_detail_table_tpl",
pageContainer:"#js_pagebar"
},e);
for(var a=c(e,t),r=[],n=(t.page-1)*t.pagesize,i=n+t.pagesize,o=n;i>o&&o<a.length;o++)r.push(a[o]);
$(e.container).html(template.render(e.tpl,{
data:r,
filter:t
}));
var s=a.length;
f.initPager({
total_count:s,
container:e.pageContainer,
count:t.pagesize,
currentPage:t.page,
callback:function(a){
a!=t.page&&(t.page=a,l(e,t));
}
});
}
function h(e,t){
if(e=$.extend(!0,{
baseCgi:"",
container:"#js_download_detail"
},e),t.is_compare)var a=m(t.begin_date,v),r=m(t.end_date,v);else var a=m(t.tableBeginDate,v),r=m(t.tableEndDate,v);
var n=m(t.compare_begin_date,v),i=m(t.compare_end_date,v);
t.is_compare&&("weekly"==t.type?(1!==a.day()&&a.day(8),1!==n.day()&&n.day(8)):"monthly"==t.type&&(1!==a.date()&&(a.add("M",1),
a.date(1)),1!==n.date()&&(n.add("M",1),n.date(1))),a.unix()>r.unix()&&(a=r),n.unix()>i.unix()&&(n=i)),
a=a.format(v),r=r.format(v),n=n.format(v),i=i.format(v);
var o=wx.url("%sbegin_date=%s&end_date=%s&type=%s&download=1&source=%s".sprintf(e.baseCgi,a,r,t.type,t.source));
t.is_compare&&(o+="&compare=1&compare_begin_date=%s&compare_end_date=%s".sprintf(n,i)),
$(e.container).attr("href",o);
}
var t={},m=(e("common/wx/Cgi.js"),e("biz_common/moment.js")),f=e("common/wx/report_util.js"),u=e("statistics/common.js");
template.helper("$yest",function(e){
var t=window.st_f.first_idx;
return st_f._get_item(t,e);
}),template.helper("$day_percent",function(e){
var t=window.st_f.first_idx,a=window.st_f.yest_idx;
return window.st_f._percent(t,a,e);
}),template.helper("$week_percent",function(e){
var t=window.st_f.weekago_idx,a=window.st_f.first_idx;
return window.st_f._percent(a,t,e);
}),template.helper("$month_percent",function(e){
var t=window.st_f.first_idx,a=window.st_f.monthago_idx;
return window.st_f._percent(t,a,e);
}),template.helper("$showhour",function(e){
if(!e)return"00:00";
for(e+="";e.length<4;)e="0"+e;
var t=new RegExp("([^s]{2})(?=([^s])+$)","ig");
return e.replace(t,"$1:");
}),template.helper("$showifnotempty",function(e){
return"undefined"==typeof e?"-":e;
}),template.helper("pageIndex",function(e,t,a){
return parseInt((e*(t-1)+a)/2+1);
});
var _=template.compile(e("tpl/statistics/keydata.html.js"));
t.initKeyData=function(e){
e=$.extend(!0,{
container:"#js_keydata",
columns:[],
data:[]
},e),st_f._init(e.data),$(e.container).html(_(e));
},t.showKeyData=a;
var g=e("statistics/tab-bar/index.js"),y=e("statistics/tab-bar/tab-date.js"),x=function(e,t){
e=$.extend(!0,{
container:"#js_filter_tab",
tabs:[],
title:"关键指标详解"
},e),this.opt=e,this.filterData=t,this.init();
};
x.prototype.init=function(){
var e=this.opt,t=this.filterData,a=new g({
name:e.title,
tabs:e.tabs
});
a.init(),$(e.container).append(a.$el);
var r=y(a,this.filterData);
a.activate(0),this.dateEvent=r,this.tab=a,this.dateRanger=y.dateRanger,r.on("date-change",function(a){
t.begin_date=a.startDate,t.end_date=a.endDate,a.startCompareDate&&(t.compare_begin_date=a.startCompareDate),
a.endCompareDate&&(t.compare_end_date=a.endCompareDate),t.is_compare=a.needCompare,
e.dateChange&&e.dateChange.call(this);
}),a.on("tab-selected",function(a,r){
r.type!=t.origIndexType&&($("#js_detail_table table td.js_"+t.origIndexType).removeClass("td_high_light"),
$("#js_detail_table table td.js_"+r.type).addClass("td_high_light"),t.indexType=r.type,
t.indexText=r.text,e.tabSelected&&e.tabSelected.call(this,a,r));
});
},x.prototype.reset=function(){
this.tab.activate(0,!0);
var e=this.filterData;
this.dateEvent.setRangeDate({
startDate:e.begin_date,
endDate:e.end_date,
startCompareDate:e.compare_begin_date,
endCompareDate:e.compare_end_date
}),this.dateEvent.setSingleDate({
startDate:e.singleDay,
endDate:e.singleDay,
startCompareDate:e.singleCompareDay,
endCompareDate:e.singleCompareDay
}),this.dateEvent.clearCompare();
},t.TabDateFilter=x;
var b=$("div.wrp_loading:eq(0)");
t.showLoading=function(){
b.show();
},t.hideLoading=function(){
b.hide();
},t.showDetailTable=n,e("statistics/chart/jquery-chart.js"),t.showChart=d,t.showCompareChart=p;
var v="YYYY-MM-DD";
return t.showCompareDetailTable=l,t.initDownload=h,t;
});