define("statistics/user_stat/attr/attr-table.js",["common/wx/report_util.js","statistics/user_stat/attr/attr-state.js","statistics/components/tab-bar.js","statistics/common.js"],function(t,a){
"use strict";
function e(){
_=new f({
name:"属性分布表",
tabs:[{
text:"性别",
index:"genders"
},{
text:"语言",
index:"langs"
},{
text:"省份",
index:"provinces"
},{
text:"城市",
index:"cities"
},{
text:"终端",
index:"endpoints"
},{
text:"机型",
index:"types"
}]
}),_.$el.find("div.sub_menu").remove(),x("#js_table div.tabbar").prepend(_.$el),
n();
}
function n(){
_.on("tab-selected",function(t,a){
var e=p.table;
e.type!==a.index&&(e.type=a.index,e.isDesc=!0,e.currentPage=1,e.text=a.text,d(),
s(),c(),i(),o(a));
});
}
function o(t){
var a="USER_ATTR_DETAIL_"+t.index.toUpperCase();
m.clickReport(m.reportKeys[a]);
}
function s(){
var t=p.table.isDesc,a=p.table.data[p.table.type].data;
a.sort(function(a,e){
return t?e.count-a.count:a.count-e.count;
});
}
function i(){
var t=r(),a=template("js_table_table_tpl",{
data:t,
totalCount:p.table.data[p.table.type].totalCount
});
$("#js_table_type").html(p.table.text),$("#js_table div.table_wrp table tbody").html(a);
}
function r(){
var t=p.table.data[p.table.type],a=p.table.currentPage,e=(a-1)*g,n=e+g;
return t.data.slice(e,n);
}
function c(){
var t=p.table.data[p.table.type];
b.initPager({
total_count:t.data.length,
container:"#js_table_pager",
count:g,
currentPage:p.table.currentPage,
callback:function(t){
t!==p.table.currentPage&&(p.table.currentPage=t,i());
}
});
}
function l(){
u(),s();
}
function u(){
x("#js_table .rank").click(function(){
var t=x(this);
p.table.isDesc=!p.table.isDesc,p.table.isDesc?(t.find("i.arrow_up").hide(),t.find("i.arrow_down").show()):(t.find("i.arrow_up").show(),
t.find("i.arrow_down").hide()),s(),i();
});
}
function d(){
x("#js_table .rank i").show();
}
{
var b=t("common/wx/report_util.js"),p=t("statistics/user_stat/attr/attr-state.js"),a={},f=t("statistics/components/tab-bar.js"),_=null,x=jQuery,m=t("statistics/common.js");
!function(){
for(var t=[],a=0,e=0,n=30;n>e;e++)t.push({
name:"广州",
count:10*e
}),a+=10*e;
return{
totalCount:a,
data:t
};
}();
}
a.initState=function(){
p.table={
type:"genders",
text:"性别",
isDesc:!0,
currentPage:1,
data:{
genders:{
totalCount:p.totalCount,
data:p.rawData.genders
},
langs:{
totalCount:p.totalCount,
data:p.rawData.langs
},
endpoints:{
totalCount:p.totalCount,
data:p.rawData.platforms
},
provinces:{
totalCount:p.totalCount,
data:p.province.data
},
cities:{
totalCount:p.totalCount,
data:p.citiesData
},
types:{
totalCount:p.type.totalCount,
data:p.type.data
}
}
};
},a.draw=function(){
e(),l(),i(),c();
};
var g=10;
return a;
});