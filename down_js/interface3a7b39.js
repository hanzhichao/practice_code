define("statistics/interface/interface.js",["statistics/interface/top.js","statistics/components/tab-bar.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","statistics/components/date-range.js","statistics/common.js","biz_common/moment.js","statistics/interface/state.js","statistics/interface/models.js","statistics/interface/key-index.js","statistics/interface/chart.js","statistics/interface/detail.js"],function(t){
"use strict";
function e(){
P.render(),G.draw(),J.render(),a(),m(),_(),u(),f(),w();
}
function a(){
new S({
container:"#js_timetype_drop",
label:"日报",
data:[{
name:"日报",
value:"daily"
},{
name:"小时报",
value:"hourly"
}],
callback:function(t){
M.type!==t&&(M.type=t,"hourly"===t?P.hide():P.show(),n(),i(),s(),u(),o());
}
});
$(".js_typeSelect").click(function(){
$(".js_typeSelect").each(function(){
$(this).parent().removeClass("selected");
}),$(this).parent().addClass("selected");
var t=$(this).data("value");
M.type!==t&&(M.type=t,"hourly"===t?P.hide():P.show(),n(),i(),s(),u(),o());
});
}
function n(){
"hourly"===M.type?(T.$el.show(),L.$el.hide()):(T.$el.hide(),L.$el.show());
}
function i(){
M.key="callback_count",E.activate(0,!0);
}
function s(){
M.dateState.needCompare=!1,"hourly"===M.type?(L.clearCompare(),L.setDate({
startDate:B,
endDate:F
}),M.dateState.beginDate=F,M.dateState.endDate=F):(T.clearCompare(),T.setDate({
startDate:F,
endDate:F
}),M.dateState.beginDate=B,M.dateState.endDate=F);
}
function o(){
var t={
begin_date:M.dateState.beginDate,
end_date:M.dateState.endDate,
type:"hourly"===M.type?"hour":"daily"
},e=[q(V,t)];
M.dateState.needCompare&&(t.begin_date=M.dateState.compareBeginDate,t.end_date=M.dateState.compareEndDate,
e.push(q(V,t))),g(),k.mGet(e,function(t,e){
if(e=e||{
hour_list:[],
daily_list:[]
},"hourly"===M.type){
var a={
list:t.hour_list,
compareList:e.hour_list
};
r(a);
}else{
var a={
list:t.daily_list,
compareList:e.daily_list
};
c(a);
}
G.draw(),J.render(),b();
},function(t,e,a){
if(0!==a.base_resp.ret)return b(),void x.handleRet(a,{
id:"64527",
key:"6"
});
var n=+new Date-t;
k.ajaxReport(k.reportKeys.LOAD_INTERFACE_AJAX_KEY,n,wx.data.uin);
});
}
function c(t){
var e=t.list,a=t.compareList,n=M.dateState;
O.rawList=e,O.list=h(n.beginDate,n.endDate,e),M.dateState.needCompare?(O.rawCompareList=a,
O.compareList=h(n.compareBeginDate,n.compareEndDate,a)):delete O.compareList;
}
function r(t){
O.rawList=t.list,O.list=d(t.list,M.dateState.beginDate),M.dateState.needCompare?(O.rawCompareList=t.compareList,
O.compareList=d(t.compareList,M.dateState.compareBeginDate)):delete O.compareList;
}
function d(t,e){
var a={};
t.each(function(t){
t.average_time_cost=(t.total_time_cost/t.callback_count).toFixed(2),l(t),t.newHour=k.numberToTime(t.hour/100),
a[t.newHour]=t;
});
var n=0;
return k.loopHour(0,23,function(t){
a[t]||p(a,t,e,n),n++;
}),a;
}
function l(t){
t.fail_rate=1*(t.fail_count/t.callback_count*100).toFixed(2);
}
function p(t,e,a,n){
t[a]||(t[e]={
hour:100*n,
newHour:e,
date:a,
isPatch:!0
});
}
function m(){
E=new v({
name:"关键指标详解",
tabs:[{
text:"调用次数",
type:"callback_count"
},{
text:"失败率",
type:"fail_rate"
},{
text:"平均耗时",
type:"average_time_cost"
},{
text:"最大耗时",
type:"max_time_cost"
}]
}),H.prepend(E.$el);
}
function u(){
var t={
begin_date:M.dateState.beginDate,
end_date:M.dateState.endDate,
type:"hourly"===M.type?"hour":"daily",
download:1
};
M.dateState.needCompare&&(t.compare_begin_date=M.dateState.compareBeginDate,t.compare_end_date=M.dateState.compareEndDate,
t.compare=1);
var e=q(V,t);
$("#js_download_detail").attr("href",e);
}
function _(){
L=new C({
startDate:B,
endDate:F
}),T=new C({
startDate:F,
endDate:F,
single:!0
});
var t=H.find("div.sub_menu").eq(0);
T.$el.hide(),t.html(L.$el),t.append(T.$el);
}
function f(){
function t(t){
M.dateState.beginDate=t.startDate,M.dateState.endDate=t.endDate,M.dateState.compareBeginDate=t.startCompareDate,
M.dateState.compareEndDate=t.endCompareDate,M.dateState.needCompare=t.needCompare,
u(),o();
}
E.on("tab-selected",function(t,e){
M.key=e.type,M.keyText=e.text,y(M.key)&&(M.keyText+="(毫秒)"),G.draw(),J.highlight(e.type);
}),L.on("date-change",t),T.on("date-change",t);
}
function y(t){
return"average_time_cost"===t||"max_time_cost"===t;
}
function h(t,e,a){
for(var n={},i=0,s=a.length;s>i;i++){
var o=a[i];
o.average_time_cost=(o.total_time_cost/o.callback_count).toFixed(2),l(o),n[o.date]=o;
}
var c=0;
return K(t,e,function(t){
c++,D(n,t);
}),n.length=c,n;
}
function D(t,e){
t[e]||(t[e]={
date:e,
callback_count:0,
fail_count:0,
fail_rate:0,
total_time_cost:0,
max_time_cost:0,
average_time_cost:0,
isPatch:!0
});
}
function g(){
Q.show();
}
function b(){
Q.hide();
}
function j(){
k.help("#js_help_icon","#js_help_content");
}
function w(){
"0"===window.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}
t("statistics/interface/top.js");
var v=t("statistics/components/tab-bar.js"),S=t("biz_web/ui/dropdown.js"),x=t("common/wx/Cgi.js"),C=t("statistics/components/date-range.js"),k=t("statistics/common.js"),E=null,L=null,T=null,R="YYYY-MM-DD",A=t("biz_common/moment.js"),F=A().add("d",-1).format(R),B=A().add("d",-30).format(R),I=A().add("d",-31).format(R),K=(A(F).add("d",-1).format(R),
A(F).add("d",-7).format(R),k.loopDay),N=cgiData.list,Y=h(I,F,cgiData.list),z=jQuery,H=z("#js_actions"),M=t("statistics/interface/state.js"),O=t("statistics/interface/models.js"),P=t("statistics/interface/key-index.js"),G=t("statistics/interface/chart.js"),J=t("statistics/interface/detail.js"),V="/misc/interfaceanalysis?",q=k.makeUrl;
$.extend(M,{
type:"daily",
key:"callback_count",
keyText:"调用次数",
dateState:{
needCompare:!1,
beginDate:B,
endDate:F,
compareBeginDate:null,
compareEndDate:null
}
}),$.extend(O,{
list:Y,
rawList:N
});
var Q=$("div.wrp_overview div.wrp_loading");
template.helper("keyPercent",function(t){
return"--"===t?"&nbsp;&nbsp;&nbsp;"+t:t>=0?'<i class="icon_up" title="上升"></i>%s%'.sprintf(t):'<i class="icon_down" title="下降"></i>%s%'.sprintf(-t);
}),seajs.use("statistics/report.js",function(t){
t(k.logKeys.INTERFACE_NETWORK_OVERTIME,k.logKeys.INTERFACE_JS_OVERTIME,k.reportKeys.INTERFACE_PAGE);
}),j(),e();
});