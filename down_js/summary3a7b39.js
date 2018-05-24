define("statistics/user_stat/summary/summary.js",["biz_common/moment.js","statistics/components/tab-bar2.js","statistics/components/date-range2.js","statistics/components/date-range.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","common/wx/report_util.js","statistics/user_stat/summary/summary-state.js","statistics/user_stat/summary/summary-chart.js","statistics/user_stat/common.js","statistics/common.js","statistics/user_stat/top.js"],function(e){
"use strict";
function t(){
a(),U(),E(),o(),D(),n(),r(),setTimeout(k),I();
}
function a(){
s(),l(_t,dt),at.draw();
}
function n(){
var e={
download:1,
begin_date:tt.tableBeginDate,
end_date:tt.tableEndDate,
source:"99999999"
};
tt.needCompare&&(e.begin_date=tt.drawBeginDate,e.end_date=tt.drawEndDate,e.compare_begin_date=tt.beginCompareDate,
e.compare_end_date=tt.endCompareDate,e.compare=1);
var t="/misc/useranalysis?";
for(var a in e)t+="&"+a+"="+e[a];
t=wx.url(t),q("#js_download_detail").attr("href",t);
}
function r(){
q("#js_download_detail").on("click",function(){
rt.clickReport(rt.reportKeys.USER_SUM_EXCEL);
});
}
function s(){
var e=i();
u(e);
}
function i(){
for(var e=tt.userStatList,t=e[dt],a=["cancel_user","cumulate_user","netgain_user","new_user"],n={},r=0,s=a.length;s>r;r++){
var i=a[r],o=t[i],u=e[pt][i],l=e[ft][i],d=e[mt][i];
n[i]={
count:o,
day:c(o,u),
week:c(o,l),
month:c(o,d)
};
}
return n;
}
function o(){
jt=new H({
needCompare:!1,
startDate:_t,
endDate:dt
}),jt.$el.find(".btn_default, .time_lable, .setup").remove(),jQuery("#js_table_date").html(jt.$el),
jt.on("date-change",function(e){
tt.tableBeginDate=e.startDate,tt.tableEndDate=e.endDate,wt=!0,A(!0);
});
}
function c(e,t){
if(0==t)return"--";
var a=(e-t)/t*100;
return a%1==0?a:a.toFixed(1);
}
function u(e){
$("#js_keydata").html(template("js_key_data_tpl",e));
}
function l(e,t){
C(),h(),tt.detailData=[];
var a=tt.tableUserStateList||tt.userStatList;
it(e,t,function(e){
tt.detailData.push(a[e]);
},!0),tt.desc=!0,tt.sortKey="date",tt.currentPage=1,tt.pageTotalCount=tt.detailData.length,
gt=14,d(),_(),p(1);
}
function d(){
q("th.rank_area i").show();
}
function _(){
et.initPager({
total_count:tt.pageTotalCount,
container:"#js_pagebar",
count:gt,
currentPage:tt.currentPage,
callback:function(e){
e!=tt.currentPage&&(tt.currentPage=e,tt.needCompare?v(e):p(e));
}
}),m();
}
function m(){
q("#js_pagebar a.page_prev").click(function(){
rt.clickReport(rt.reportKeys.USER_SUM_NAV_LEFT);
}),q("#js_pagebar a.page_next").click(function(){
rt.clickReport(rt.reportKeys.USER_SUM_NAV_RIGHT);
}),q("#js_pagebar a.page_go").click(function(){
rt.clickReport(rt.reportKeys.USER_SUM_NAV_JUMP);
});
}
function p(e){
var t=(e-1)*gt,a=t+gt;
tt.currentDetail=tt.detailData.slice(t,a),f();
}
function f(){
var e=template("js_detail_item",{
data:tt.currentDetail
}),t=q("#js_detail");
t.html(e);
}
function D(){
q(document).on("click","th.rank_area",null,function(){
var e=q(this),t=e.data("type");
t!==tt.sortKey?(g(e),tt.sortKey=t,tt.desc=!1):tt.desc=!tt.desc,b(e,tt.desc),w();
});
}
function g(e){
e.siblings("th").find("i").show();
}
function b(e,t){
t?(e.find("i.arrow_down").show(),e.find("i.arrow_up").hide()):(e.find("i.arrow_down").hide(),
e.find("i.arrow_up").show());
}
function w(){
var e=tt.sortKey,t=tt.desc;
tt.detailData.sort(function(a,n){
var r,s;
return"date"===e?(r=+J(a.date).format("X"),s=+J(n.date).format("X")):(r=a[e],s=n[e]),
t?s-r:r-s;
}),p(tt.currentPage);
}
function j(){
if(S(),y(),tt.compareDetailData=[],tt.compareUserStatList.length>tt.userStatList.length)var e=tt.beginCompareDate,t=tt.endCompareDate,a=!1,n=tt.beginDate,r=tt.compareUserStatList.length;else var e=tt.drawBeginDate,t=tt.drawEndDate,a=!0,n=tt.beginCompareDate,r=tt.userStatList.length;
it(e,t,function(e){
var t,s;
a?(t=tt.userStatList[e],s=tt.compareUserStatList[n]):(t=tt.userStatList[n],s=tt.compareUserStatList[e]);
var i={
i:r,
first:t,
second:s
};
r--,n=J(n).add(1,"days").format(lt),tt.compareDetailData.push(i);
}),tt.compareDetailData.reverse(),tt.currentPage=1,tt.pageTotalCount=tt.compareDetailData.length,
gt=7,_(),v(1);
}
function v(e){
var t=(e-1)*gt,a=t+gt;
tt.currentCompareDetail=tt.compareDetailData.slice(t,a);
var n=template("js_detail_compare_item",{
data:tt.currentCompareDetail
}),r=q("#js_compare_table tbody");
r.html(n);
}
function h(){
q("#js_compare_table").hide();
}
function S(){
q("#js_compare_table").show();
}
function y(){
q("#js_single_table").hide();
}
function C(){
q("#js_single_table").show();
}
function U(){
ct=new F({
name:"关键指标详解",
tabs:[{
text:"新增人数",
index:"new_user"
},{
text:"取消关注人数",
index:"cancel_user"
},{
text:"净增人数",
index:"netgain_user"
},{
text:"累积人数",
index:"cumulate_user"
}]
}),q("#js_tab_bar_wrp").html(ct.$el);
}
function E(){
ut=new Q({
singleContainer:"#js_single",
compareContainer:"#js_compare",
compareBtn:"#js_compare_btn",
needCompare:!0,
startDate:_t,
endDate:dt
});
}
function k(){
ct.on("tab-selected",function(e,t){
L(t),tt.index=t.index,M(),at.draw();
});
var e=[{
name:"全部来源",
value:99999999
},{
name:"公众号搜索",
value:1
},{
name:"扫描二维码",
value:30
},{
name:"图文页右上角菜单",
value:43
},{
name:"图文页内公众号名称",
value:57
},{
name:"名片分享",
value:17
},{
name:"公众号文章广告",
value:75
},{
name:"朋友圈广告",
value:78
},{
name:"支付后关注",
value:51
},{
name:"其他合计",
value:0
}];
ht&&e.splice(6,2),St=new W({
container:"#js_sources",
label:"全部来源",
data:e,
callback:function(e,t){
e=""+e,tt.source!==e&&(x(e),wt=!1,tt.source=e,tt.sourceText=t,tt.needCompare?T():A());
}
}),ut.on("date-change",function(e){
wt=!0,$.extend(tt,e),tt.beginDate=tt.drawBeginDate=e.startDate,tt.drawEndDate=e.endDate,
tt.beginCompareDate=e.startCompareDate,delete tt.startDate,delete tt.startCompareDate,
jt.setDate({
startDate:e.startDate,
endDate:e.endDate
}),tt.needCompare?(q("#js_table_date").hide(),T()):(q("#js_table_date").show(),A());
}),q("#js_compare_btn0").on("click",function(){
R();
});
}
function R(){
rt.clickReport(rt.reportKeys.USER_SUM_COMPARE);
}
function x(e){
var t="USER_SUM_SRC_"+e;
rt.clickReport(rt.reportKeys[t]);
}
function L(e){
var t="USER_SUM_TAB_"+e.index.toUpperCase();
rt.clickReport(rt.reportKeys[t]);
}
function M(){
"new_user"===tt.index?(tt.source="99999999",St.reset(),yt.show()):yt.hide();
}
function K(e,t,a){
var n="/misc/useranalysis?&begin_date=%s&end_date=%s&source=%s",r=n.sprintf(e,t,a);
return r;
}
function A(e){
if(e)var t=tt.tableBeginDate,a=tt.tableEndDate;else var t=tt.beginDate,a=tt.endDate;
var r=wt?tt.source+",99999999":tt.source;
ht&&0==tt.source&&(r=tt.source+",75,78");
var s=K(t,a,r);
X(),st([s],function(r){
var s=r.category_list;
if(wt){
var i=N(s).list,o=s.slice(0,s.length-1);
e?(t=tt.tableBeginDate,a=tt.tableEndDate,tt.tableUserStateList=Y(t,a,i),l(t,a)):(tt.sourceData=V(t,a,o),
tt.userStatList=Y(t,a,i),tt.tableUserStateList=tt.userStatList,at.draw(),l(t,a)),
tt.tableBeginDate=t,tt.tableEndDate=a,n();
}else tt.sourceData=V(t,a,s),at.draw();
G();
},P);
}
function P(e,t,a){
if(0!==a.base_resp.ret)return Z.show(a),void G();
var n=+new Date-e,r=rt.reportKeys.LOAD_USER_SUMMARY_DATA_AJAX_KEY,s=rt.ajaxReport;
s(r,n,wx.data.uin);
}
function T(){
var e=tt.beginDate,t=tt.endDate,a=wt?tt.source+",99999999":tt.source,n=K(e,t,a),r=tt.beginCompareDate,s=tt.endCompareDate,i=K(r,s,a);
X(),st([n,i],function(a,n){
var i=a.category_list,o=n.category_list;
if(wt){
var c=tt.rawList=N(i).list,u=tt.rawCompareList=N(o).list;
tt.userStatList=Y(e,t,c),tt.compareUserStatList=Y(r,s,u);
var l=i.slice(0,i.length-1),d=o.slice(0,o.length-1);
tt.sourceData=V(e,t,l),tt.compareSourceData=V(r,s,d),B();
}else tt.sourceData=V(e,t,i),tt.compareSourceData=V(r,s,o),at.draw();
G();
},P);
}
function B(){
j(),at.draw(),n();
}
function Y(e,t,a){
for(var n={},r=0,s=a.length;s>r;r++){
var i=a[r];
n[i.date]=i;
}
var o=0;
return it(e,t,function(e){
o++,z(n,e);
}),n.length=o,n;
}
function z(e,t){
e[t]||(e[t]={
cancel_user:0,
cumulate_user:0,
date:t,
netgain_user:0,
new_user:0,
isPatch:!0
});
}
function O(e,t){
for(var a=["new_user"],n=0,r=a.length;r>=n;n++){
var s=a[n];
e[s]+=t[s];
}
}
function V(e,t,a){
for(var n=Y(e,t,a[0].list),r=1,s=a.length;s>r;r++)for(var i=a[r].list,o=0,c=i.length;c>o;o++){
var u=i[o];
O(n[u.date],u);
}
return n;
}
function N(e){
return e[e.length-1];
}
function X(){
Ct.show();
}
function G(){
Ct.hide();
}
function I(){
"0"===window.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}
var J=e("biz_common/moment.js"),F=e("statistics/components/tab-bar2.js"),Q=e("statistics/components/date-range2.js"),H=e("statistics/components/date-range.js"),W=e("biz_web/ui/dropdown.js"),q=jQuery,Z=e("common/wx/Cgi.js"),et=e("common/wx/report_util.js"),tt=e("statistics/user_stat/summary/summary-state.js"),at=e("statistics/user_stat/summary/summary-chart.js"),nt=e("statistics/user_stat/common.js"),rt=e("statistics/common.js"),st=(nt.log,
nt.mGet),it=nt.loopDay,ot=e("statistics/user_stat/top.js");
ot.selected("user_stat");
var ct=(q("#js_actions"),null),ut=null,lt="YYYY-MM-DD",dt=J().add("d",-1).format(lt),_t=J().add("d",-30).format(lt),mt=J().add("d",-31).format(lt),pt=J(dt).add("d",-1).format(lt),ft=J(dt).add("d",-7).format(lt),Dt=J(dt).subtract(1,"months").format(lt),gt=14,bt=cgiData.list[0].list,wt=!1,jt=null,vt=Y(mt,dt,bt),ht=!0;
q.extend(tt,{
rawList:bt,
rawCompareList:null,
userStatList:vt,
compareUserStatList:null,
beginDate:Dt,
endDate:dt,
needCompare:!1,
sourceData:vt,
compareSourceData:null,
sourceText:"全部",
pageSize:0,
currentPage:0,
sortKey:"date",
desc:!0,
detailData:null,
currentDetail:null,
compareDetailData:null,
currentCompareDetail:null,
drawBeginDate:_t,
drawEndDate:dt,
tableBeginDate:_t,
tableEndDate:dt,
index:"new_user",
source:"99999999"
}),template.helper("keyPercent",function(e){
return"--"==e?"&nbsp;&nbsp;&nbsp;--":(e=1*e,e>=0?'<i class="icon_up" title="上升"></i>%s%'.sprintf(e):'<i class="icon_down" title="下降"></i>%s%'.sprintf(-e));
}),t();
var St,yt=q("#js_sources"),Ct=$("div.wrp_overview div.wrp_loading");
rt.help("#js_table_ask","#js_table_ask_content"),rt.help("#js_ask_trend","#js_ask_trend_content"),
rt.help("#js_ask_keys","#js_ask_keys_content"),seajs.use("statistics/report.js",function(e){
e(rt.logKeys.USER_SUMMARY_NETWORK_OVERTIME,rt.logKeys.USER_SUMMARY_JS_OVERTIME,rt.reportKeys.USER_SUMMARY_PAGE);
});
});