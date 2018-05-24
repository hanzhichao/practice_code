define("statistics/article/detail/detail/bars.js",[],function(t,e){
"use strict";
function r(){
s("genders"),o?$("#js_genders_bar").html(i):$("#js_genders_bar").createChart(c);
}
function a(){
s("platforms"),o?$("#js_platforms_bar").html(i):$("#js_platforms_bar").createChart(c);
}
function s(t){
var e=n[t]||[],r=[];
if(0===e.length)return o=!0;
o=!1,e.sort(function(t,e){
return e.user_count-t.user_count;
});
for(var a=0,s=e.length;s>a;a++){
var i=e[a];
r.push({
name:i.attr_name||"未知",
data:[{
y:i.user_count
}]
});
}
c.categories=[""],c.series=r;
}
var n=null,e={},o=!1,i='<h4 class="js_no_data">暂无数据</h4>',c={
chartType:"bar",
height:200,
dataFormat:"1",
theme:"wechat",
chartOptions:{
plotOptions:{
series:{
stacking:"normal"
}
},
legend:{
reversed:!0
},
yAxis:{
stackLabels:{
enabled:!0,
style:{
fontWeight:"bold",
color:"gray"
}
}
}
}
};
return e.render=function(t){
n=t.portrait||{
genders:[],
platforms:[]
},r(),a();
},e;
});