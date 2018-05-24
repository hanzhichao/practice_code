define("statistics/interface/key-index.js",["statistics/interface/models.js","statistics/interface/vars.js","statistics/common.js"],function(t){
"use strict";
function e(){
var t=s();
i(t);
}
function s(){
for(var t=c.list,e=t[o.yesterday],s=["callback_count","fail_rate","total_time_cost","max_time_cost","average_time_cost"],i={
isPatch:e.isPatch
},n=0,r=s.length;r>n;n++){
var d=s[n],_=e[d],m=t[o.beforeYesterday][d],u=t[o.aWeekAgo][d],l=t[o.thirtyDaysOneAgo][d];
i[d]={
count:f.transformTailZero(_),
day:a(_,m),
week:a(_,u),
month:a(_,l)
};
}
return i;
}
function a(t,e){
if(0==e)return"--";
var s=(t-e)/e*100;
return s%1==0?s:s.toFixed(1);
}
function i(t){
$("#js_keydata").html(template("js_keydata_tpl",t));
}
function n(){
$("#js_keydata_p").hide();
}
function r(){
$("#js_keydata_p").show();
}
var c=t("statistics/interface/models.js"),o=t("statistics/interface/vars.js"),f=t("statistics/common.js");
return{
render:e,
hide:n,
show:r
};
});