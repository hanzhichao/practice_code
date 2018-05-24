define("statistics/article/detail/detail/pies.js",["statistics/chart/pie.js","statistics/common.js"],function(t,e){
"use strict";
function i(t){
var e=[];
t.portrait&&(e=t.portrait.genders||[]);
var t=[],i=0;
if(e.each(function(e){
t.push({
name:e.attr_name,
y:e.user_count,
color:"0"==e.attr_value?o.OTHER_COLOR:"2"==e.attr_value?o.RED_COLOR:void 0
}),i+=e.user_count;
}),t.length>0){
s("#js_gender_pie",t.length),n("#js_gender_pie",{
size:200,
series:[{
name:"人数",
data:t
}],
titleText:"<b class='pie-title'>%s</b><br>".sprintf(i)+"性别分布（人数）",
plotOptions:{
pie:{
center:u
}
},
legend:{
itemWidth:p,
itemMarginBottom:20,
labelFormat:"{name}{y}人",
width:t.length<=1?100:200
},
y:-80
});
}else jQuery("#js_gender_pie").html(l);
}
function s(t,e){
var i=330,s=35,a=Math.floor(e/2);
e%2>0&&a++,$(t).css({
height:i+s*a
});
}
function a(t){
var e=[];
t.portrait&&(e=t.portrait.devices||[]);
var t=[],i=0;
e.each(function(e){
t.push({
name:"0"==e.attr_value?"其他":c[e.attr_value]||r(e.attr_value),
color:"0"==e.attr_value?o.OTHER_COLOR:void 0,
y:e.user_count
}),i+=e.user_count;
});
var a=[];
t.each(function(t){
t.y/i>=.01&&a.push(t);
}),t=a,t.length>0?(s("#js_types_pie",t.length),n("#js_types_pie",{
size:200,
series:[{
name:"人数",
data:t
}],
legend:{
itemMarginBottom:20,
itemWidth:200,
width:t.length<=1?100:400
},
plotOptions:{
pie:{
center:u
}
},
titleText:"<b class='pie-title'>%s</b><br>".sprintf(i)+"机型分布",
y:-100
})):jQuery("#js_types_pie").html(l);
}
function r(t){
return t=t.replace(/armeabi[\S\s]*?$/,"").replace(/;[\S\s]*?$/,"").replace("-Windows-QQBrowser","").replace(/^(Windows \d{1,2})[\S\s]+/,"$1");
}
var n=t("statistics/chart/pie.js"),o=t("statistics/common.js"),c=t("statistics/common.js").typesMap,l='<div class="empty_tips">暂无数据</div>',p=100,u=["50%",120];
e.render=function(t){
i(t),a(t);
};
});