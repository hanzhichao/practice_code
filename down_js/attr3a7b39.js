define("statistics/user_stat/attr/attr.js",["statistics/user_stat/top.js","statistics/user_stat/attr/attr-state.js","statistics/user_stat/attr/attr-bars.js","statistics/user_stat/attr/attr-provinces.js","statistics/user_stat/attr/attr-cities.js","statistics/user_stat/attr/attr-types.js","statistics/user_stat/attr/attr-table.js","statistics/user_stat/common.js","statistics/common.js"],function(t){
"use strict";
function s(){
i(),l.draw(),d.draw(),g.draw(),j.draw(),v.draw(),a();
}
function a(){
"0"===window.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}
function i(){
_.rawData=window.cgiData.list[T]||{
devices:[],
genders:[],
langs:[],
platforms:[],
regions:[]
},e(),d.initState(),g.initState(),j.initState(),v.initState();
}
function e(){
var t=window.cgiData.list[T];
if(!t)return void r();
for(var s=t.regions,a=0,i=s.length;i>a;a++){
var e=s[a].region,o=s[a].count;
E+=o,e.region_id.startsWith("gw")||("-1"===e.parent_region_id?n(e,o):c(e,o));
}
R.all.cities=h,R.all.count=E,m.sort(function(t,s){
if("all"===t.value)var a=0;else var a=+t.value;
if("all"===s.value)var i=0;else var i=+s.value;
return a-i;
}),_.province.data=m,_.provincesData=m,_.citiesData=h,_.totalCount=E;
}
function r(){
w("#no_data_prompt").show();
}
function n(t,s){
var a=R[t.region_id]||{
count:0,
cities:[]
};
return a.count+=s,a.name=t.region_name,a.value=t.region_id,R[t.region_id]=a,+a.value<=15&&o(a,s),
"null"===t.region_id?(h.push(a),_.unknownRegion=a):void m.push(a);
}
function o(t,s){
0!==s&&(t.cities.push({
name:t.name,
count:s
}),h.push(t));
}
function c(t,s){
if(t.region_id){
var a=t.parent_region_id,i=null;
i=R[a]?R[a]:R[a]={
count:0,
cities:[]
},i.count+=s;
var e={
name:t.region_name,
count:s
};
i.cities.push(e),h.push(e);
}
}
var u=t("statistics/user_stat/top.js"),_=t("statistics/user_stat/attr/attr-state.js"),l=t("statistics/user_stat/attr/attr-bars.js"),d=t("statistics/user_stat/attr/attr-provinces.js"),g=t("statistics/user_stat/attr/attr-cities.js"),j=t("statistics/user_stat/attr/attr-types.js"),v=t("statistics/user_stat/attr/attr-table.js"),p=t("statistics/user_stat/common.js"),f=t("statistics/common.js"),w=jQuery,m=[],h=[],R=_.provincesMap={},E=0,T=cgiData.list?window.cgiData.list.length-1:0;
u.selected("user_attr"),s(),p.help("#js_ask i.ask","#js_ask div.help_content"),seajs.use("statistics/report.js",function(t){
t(f.logKeys.USER_ATTR_NETWORK_OVERTIME,f.logKeys.USER_ATTR_JS_OVERTIME,f.reportKeys.USER_ATTR_PAGE);
});
});