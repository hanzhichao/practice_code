define("statistics/interface/detail.js",["statistics/interface/state.js","statistics/interface/models.js","statistics/common.js","common/wx/report_util.js","biz_common/moment.js"],function(t){
"use strict";
function e(){
n(),a(),l();
}
function a(t){
m.dateState.needCompare?d(t):o(t);
}
function n(){
v.isDesc=!0,v.currentPage=1,v.allList=r(),v.pageTotalCount=v.allList.length,m.dateState.needCompare||s();
}
function r(){
if(m.dateState.needCompare){
var t=f.list,e=f.compareList,a=[];
if("daily"===m.type)for(var t=i(m.dateState.beginDate,m.dateState.endDate,f.list),e=i(m.dateState.compareBeginDate,m.dateState.compareEndDate,f.compareList),n=t.length>e.length?t.length:e.length,r=0;n>r;r++){
var s=e[r]?e[r]:{},o=t[r]?t[r]:{};
o.index=n-r,s.index=n-r,a.push(s),a.push(o);
}else{
var n=24,r=0;
h.loopHour(0,23,function(t){
var e=f.list[t],i=f.compareList[t];
e.index=n-r,i.index=n-r,a.push(i),a.push(e),r++;
});
}
return a.reverse(),a;
}
return f.rawList;
}
function i(t,e,a){
var n=[];
return h.loopDay(t,e,function(t){
n.push(a[t]);
}),n;
}
function s(){
v.allList.sort(function(t,e){
var a,n;
return"date"===v.sortType?(a=g(t.date).format("X"),n=g(e.date).format("X")):(a=t[v.sortType],
n=e[v.sortType]),v.isDesc?n-a:a-n;
});
}
function o(t){
var e=template("js_detail_table_tpl",{
type:m.type,
data:c()
});
if(t){
var e=jQuery(e),a=e.find("th.js_sort_"+v.sortType);
v.isDesc?a.find("i.arrow_up").hide():a.find("i.arrow_down").hide();
}
jQuery("#js_detail_table").html(e),p(m.key);
}
function c(){
var t=(v.currentPage-1)*y,e=t+y;
return v.allList.slice(t,e);
}
function l(){
_.initPager({
total_count:v.pageTotalCount,
container:"#js_pagebar",
count:y,
currentPage:v.currentPage,
callback:function(t){
t!=v.currentPage&&(v.currentPage=t,m.dateState.needCompare?d(!0):o(!0));
}
});
}
function u(){
jQuery(document.body).on("click",".js_rankFlag",null,function(){
var t=$(this).data("sort");
t===v.sortType?v.isDesc=!v.isDesc:(v.sortType=t,v.isDesc=!1),s(),a(!0);
});
}
function d(){
var t=template("js_compare_detail_table_tpl",{
type:m.type,
data:c()
});
jQuery("#js_detail_table").html(t),p(m.key);
}
function p(t){
j("td.td_high_light").removeClass("td_high_light"),j("td.js_high_light, td.js_"+t).addClass("td_high_light");
}
var m=t("statistics/interface/state.js"),f=t("statistics/interface/models.js"),h=t("statistics/common.js"),_=t("common/wx/report_util.js"),g=t("biz_common/moment.js"),j=jQuery,y=14,v={
currentPage:1,
sortType:"date",
isDesc:!0,
currentDetail:null,
allList:null,
pageTotalCount:null
};
return u(),template.helper("processCount",function(t,e){
return 0===e.callback_count?"-":void 0===t?"-":t;
}),template.helper("processRate",function(t){
if(!t)return"0%";
var t=t.toFixed(2);
return h.transformTailZero(t)+"%";
}),{
highlight:p,
render:e
};
});