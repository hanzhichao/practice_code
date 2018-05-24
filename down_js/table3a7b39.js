define("statistics/article/detail/detail/table.js",["statistics/article/detail/state.js","biz_common/moment.js","statistics/common.js"],function(t,i){
"use strict";
function a(){
var t=template("js_table_tr",{
list:h
});
f("#js_table").html(t),i.highlightCol(j);
}
function n(){
if(!m){
var t=f("th.rank_area");
t.on("click",function(){
var t=f(this),i=t.data("key");
_===i?u=!u:(_=i,f("#js_detail_table_content th.rank_area").find("i.arrow").show(),
u=!1),s(t),o(),a();
}),m=!0;
}
}
function s(t){
u?(t.find("i.arrow_down").show(),t.find("i.arrow_up").hide()):(t.find("i.arrow_down").hide(),
t.find("i.arrow_up").show());
}
function o(){
h.sort(function(t,i){
return u?i[_]-t[_]:t[_]-i[_];
});
}
function e(t){
var i=r.publish_date,a=d(i).add("d",7),n=0;
c.loopDay(i,a,function(i){
n++,t[i]&&h.push(t[i]);
});
}
var i={},r=null,l=t("statistics/article/detail/state.js"),d=t("biz_common/moment.js"),c=t("statistics/common.js"),h=[],u=!1,_=null,f=jQuery,m=!1,j=null;
return i.render=function(t){
h=[];
var i=l.summaryData[t.msgid]||{};
r=t,e(i),n(),a();
},i.highlightCol=function(t){
j=t,f("#js_table td").removeClass("td_high_light"),f("#js_table td."+t).addClass("td_high_light");
},i;
});