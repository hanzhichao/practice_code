define("statistics/article/detail/detail/province.js",["statistics/article/detail/state.js","common/wx/pager.js","biz_web/ui/map.js","statistics/article/detail/click-report.js"],function(t,n){
"use strict";
function o(){
E=0,k=1,y=!0,C=function(){
var t=[];
try{
var n=A.portrait.regions||[];
}catch(o){
n=[];
}
if(0===n.length)return t;
for(var i=0,e=n.length;e>i;i++){
var r=n[i];
if("-1"===r.region.parent_region_id){
var c=r.user_count;
E+=c,0!==c&&(t.push({
name:r.region.region_name,
count:c,
value:r.region.region_id
}),b=0===b||b>c?c:b,w="null"!==r.region.region_id&&c>w?c:w);
}
}
return t;
}();
}
function i(){
w=0,b=0,E=0,k=1,y=!0,C=[],A=[];
}
function e(){
c(),r("#js_chart4provinces"),s();
}
function r(t){
var n=a();
$(t).griMap({
width:400,
height:300,
data:n,
hoverCallback:function(t,n){
{
var o=window.event||n,i=(o.pageX||o.clientX+document.body.scrollLeft+document.documentElement.scrollLeft)+10,e=(o.pageY||o.clientY+document.body.scrollTop+document.documentElement.scrollTop)+10;
!function(){
g("#_tool_tips").length>0&&g("#_tool_tips").remove();
var n=['<div id="_tool_tips" class="tips-small"> ',"<p>"+t.name+":"+(t.value||0)+"</p>","</div>"];
g("body").append(n.join("")),g("#_tool_tips").show().css({
top:e,
left:i
});
}();
}
}
}),$(t).mouseout(function(){
$("#_tool_tips").length>0&&$("#_tool_tips").remove();
});
}
function c(){
return 0===C.length;
}
function a(){
for(var t=C,n=(w-b)/5,o={
6:"#629FE0",
5:"#71A8E3",
4:"#80B1E6",
3:"#8FBAE9",
2:"#9EC3EC",
1:"#ADCDEF",
0:"#ADCDEF"
},i={},e=0,r=t.length;r>e;e++){
var c=t[e];
i[h.en[c.value]]={
value:c.count,
color:o[Math.ceil(c.count/n)]
};
}
return i;
}
function s(){
g("#js_bar4provinces").show(),g("#js_bar4provinces .min").html(b),g("#js_bar4provinces .max").html(w);
}
function l(){
k=1,u();
}
function u(){
var t=p(),n=template("js_provinces_table_tpl",{
data:t,
totalCount:E
});
$("#js_provinces div.table_wrp table tbody").html(n);
}
function p(){
var t=k,n=(t-1)*F,o=n+F;
return C.slice(n,o);
}
function d(){
m.init({
total_count:C.length,
container:"#js_province_pager",
count:F,
currentPage:k,
callback:function(t){
t=Math.round(t),t!==k&&(k=t,u());
}
}),j.pager();
}
function _(){
g("#js_provinces .rank i").show(),v(),y=!0,f();
}
function v(){
D||(g("#js_provinces .rank").click(function(){
var t=g(this);
y=!y,y?(t.find("i.arrow_up").hide(),t.find("i.arrow_down").show(),f()):(t.find("i.arrow_up").show(),
t.find("i.arrow_down").hide(),f()),u();
}),D=!0);
}
function f(){
C.sort(function(t,n){
return y?n.count-t.count:t.count-n.count;
});
}
var h=t("statistics/article/detail/state.js"),m=t("common/wx/pager.js"),g=jQuery;
t("biz_web/ui/map.js");
var j=t("statistics/article/detail/click-report.js"),n={},w=0,b=0,E=0,k=1,y=!0,C=[],A=[],D=!1;
n.render=function(t){
i(),A=t,o(),e(),_(),l(),d();
};
var F=10;
return n;
});