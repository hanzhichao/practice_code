define("statistics/user_stat/attr/attr-provinces.js",["statistics/user_stat/attr/attr-state.js","common/wx/report_util.js","statistics/common.js","biz_web/ui/map.js"],function(t,n){
"use strict";
function o(){
r(),e("#js_chart4provinces"),i();
}
function e(t){
var n=c();
$(t).griMap({
width:400,
height:300,
data:n,
hoverCallback:function(t,n){
{
var o=window.event||n,e=(o.pageX||o.clientX+document.body.scrollLeft+document.documentElement.scrollLeft)+10,r=(o.pageY||o.clientY+document.body.scrollTop+document.documentElement.scrollTop)+10;
!function(){
g("#_tool_tips").length>0&&g("#_tool_tips").remove();
var n=['<div id="_tool_tips" class="tips-small"> ',"<p>"+t.name+":"+(t.value||0)+"</p>","</div>"];
g("body").append(n.join("")),g("#_tool_tips").show().css({
top:r,
left:e
});
}();
}
}
}),$(t).mouseout(function(){
$("#_tool_tips").length>0&&$("#_tool_tips").remove();
});
}
function r(){
return 0===d.province.data.length;
}
function c(){
for(var t=d.province.data,n=(j-w)/5,o={
6:"#629FE0",
5:"#71A8E3",
4:"#80B1E6",
3:"#8FBAE9",
2:"#9EC3EC",
1:"#ADCDEF",
0:"#ADCDEF"
},e={},r=0,c=t.length;c>r;r++){
var i=t[r];
e[d.en[i.value]]={
value:i.count,
color:o[Math.ceil(i.count/n)]
};
}
return e;
}
function i(){
g("#js_bar4provinces").show(),g("#js_bar4provinces .min").html(d.province.min),g("#js_bar4provinces .max").html(d.province.max);
}
function a(){
d.province.currentPage=1,s();
}
function s(){
var t=u(),n=template("js_provinces_table_tpl",{
data:t,
totalCount:d.province.totalCount
});
$("#js_provinces div.table_wrp table tbody").html(n);
}
function u(){
var t=d.province.currentPage,n=(t-1)*E,o=n+E;
return d.province.data.slice(n,o);
}
function p(){
m.initPager({
total_count:d.province.data.length,
container:"#js_province_pager",
count:E,
currentPage:d.province.currentPage,
callback:function(t){
t!==d.province.currentPage&&(d.province.currentPage=t,s());
}
}),v();
}
function v(){
g("#js_province_pager a.page_prev").click(function(){
h.clickReport(h.reportKeys.USER_ATTR_PROVINCE_NAV_LEFT);
}),g("#js_province_pager a.page_next").click(function(){
h.clickReport(h.reportKeys.USER_ATTR_PROVINCE_NAV_RIGHT);
}),g("#js_province_pager a.page_go").click(function(){
h.clickReport(h.reportKeys.USER_ATTR_PROVINCE_NAV_JUMP);
});
}
function l(){
_(),d.province.isDesc=!0,f();
}
function _(){
g("#js_provinces .rank").click(function(){
var t=g(this);
d.province.isDesc=!d.province.isDesc,d.province.isDesc?(t.find("i.arrow_up").hide(),
t.find("i.arrow_down").show(),f()):(t.find("i.arrow_up").show(),t.find("i.arrow_down").hide(),
f()),s();
});
}
function f(){
var t=d.province.isDesc;
d.province.data.sort(function(n,o){
return t?o.count-n.count:n.count-o.count;
});
}
var d=t("statistics/user_stat/attr/attr-state.js"),m=t("common/wx/report_util.js"),g=jQuery,h=t("statistics/common.js");
t("biz_web/ui/map.js");
var n={},j=0,w=0;
n.initState=function(){
d.province.currentPage=1,d.province.isDesc=!0,d.province.totalCount=d.totalCount,
d.province.data=function(){
var t=[],n=d.province.data;
if(!n)return t;
for(var o=0,e=n.length;e>o;o++){
var r=n[o];
0!==r.count&&"all"!==r.value&&(t.push(r),w=0===w||w>r.count?r.count:w,j=j<r.count?r.count:j);
}
return t.push(d.unknownRegion),t;
}(),d.province.max=j,d.province.min=w;
},n.draw=function(){
o(),l(),a(),p();
};
var E=10;
return n;
});