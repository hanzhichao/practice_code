define("statistics/user_stat/attr/attr-cities.js",["statistics/user_stat/attr/attr-state.js","common/wx/report_util.js","biz_web/ui/dropdown.js","statistics/common.js"],function(t,i){
"use strict";
function c(){
new v({
container:"#js_provinces_dropdown",
label:"全国",
data:d.provincesData,
callback:function(t){
u(t),e(t);
}
});
}
function e(){
w.clickReport(w.reportKeys.USER_ATTR_CITY_DROPDOWN);
}
function n(){
var t=template("js_cities_table_tpl",{
data:[]
});
$("#js_cities div.table_wrp table tbody").html(t);
}
function r(){
var t=d.city.data[d.city.currentProvince];
f.initPager({
total_count:t.cities.length,
container:"#js_cities_pager",
count:g,
currentPage:d.city.currentPage,
callback:function(t){
t!==d.city.currentPage&&(d.city.currentPage=t,s());
}
}),a();
}
function a(){
j("#js_cities_pager a.page_prev").click(function(){
w.clickReport(w.reportKeys.USER_ATTR_CITY_NAV_LEFT);
}),j("#js_cities_pager a.page_next").click(function(){
w.clickReport(w.reportKeys.USER_ATTR_CITY_NAV_RIGHT);
}),j("#js_cities_pager a.page_go").click(function(){
w.clickReport(w.reportKeys.USER_ATTR_CITY_NAV_JUMP);
});
}
function s(){
var t=o(),i=d.city.data[d.city.currentProvince],c=template("js_cities_table_tpl",{
data:t,
totalCount:i.count
});
$("#js_cities div.table_wrp table tbody").html(c);
}
function o(){
var t=d.city.data[d.city.currentProvince],i=d.city.currentPage,c=(i-1)*g,e=c+g;
return t.cities.slice(c,e);
}
function u(t){
d.city.currentProvince=t,d.city.isDesc=!0,d.city.currentPage=1,p(),y(),r(),s();
}
function _(){
l(),d.city.isDesc=!0,y();
}
function l(){
j("#js_cities .rank").click(function(){
var t=j(this);
d.city.isDesc=!d.city.isDesc,d.city.isDesc?(t.find("i.arrow_up").hide(),t.find("i.arrow_down").show()):(t.find("i.arrow_up").show(),
t.find("i.arrow_down").hide()),y(),s();
});
}
function p(){
j("#js_cities .rank i").show();
}
function y(){
var t=d.city.isDesc,i=d.city.data[d.city.currentProvince].cities;
i.sort(function(i,c){
return t?c.count-i.count:i.count-c.count;
});
}
var d=t("statistics/user_stat/attr/attr-state.js"),f=t("common/wx/report_util.js"),j=jQuery,v=t("biz_web/ui/dropdown.js"),w=t("statistics/common.js"),i={};
i.initState=function(){
d.city.currentProvince="all",d.city.currentPage=1,d.city.data=d.provincesMap,d.city.isDesc=!0;
},i.draw=function(){
return d.rawData.regions.length?(_(),c(),r(),void s()):n();
};
var g=10;
return i;
});