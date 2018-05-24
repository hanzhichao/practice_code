define("statistics/tab-bar/tab-date.js",["tpl/statistics/tab-bar.html.js","tpl/statistics/date-submenu.html.js","statistics/tab-bar/event-emitter.js","biz_web/ui/dateRange.js","biz_common/moment.js"],function(t){
"use strict";
function e(t,e){
return g=e,l=$(o),t.registerSubmenu("date",l),n(),a(),setTimeout(i),m;
}
function a(){
m.on("date-selection:hide",function(){
l.find(".time_label, a.btn_default, #js_begin_time_container, #btn_compare").hide(),
l.find("#js_single_timer_container, #btn_single_compare").show();
}),m.on("date-selection:show",function(){
l.find(".time_label, #js_begin_time_container, #btn_compare").show(),D||l.find("a.btn_default").show(),
l.find("#js_single_timer_container, #btn_single_compare").hide();
});
}
function n(){
l.find(".btn_default").on("click",function(){
var t=$(this);
t.addClass("selected").siblings().removeClass("selected");
var e=t.attr("range"),a="YYYY-MM-DD",n=f().subtract(1,"days").format(a),r=f().subtract(parseInt(e),"days").format(a),i={
startDate:r,
endDate:n
};
s(i),m.emit("date-change",i);
}),l.find("#btn_compare").on("click",function(){
D=!D,D?l.find(".btn_default").hide():l.find(".btn_default").show();
}),l.find("#btn_single_compare").on("click",function(){
p=!p;
});
}
function s(t){
var e=f(t.startDate),a=f(t.endDate),n=(parseInt(a.format("X"))-parseInt(e.format("X")))/86400,s=f(t.startDate).subtract(1,"days"),r=f(t.startDate).subtract(n+1,"days");
_.setDate({
startDate:e.format(C),
endDate:a.format(C),
startCompareDate:r.format(C),
endCompareDate:s.format(C)
});
}
function r(t){
var e=f(t.startDate),a=f(t.startDate).subtract(1,"days");
b.setDate({
startDate:e.format(C),
endDate:e.format(C),
startCompareDate:a.format(C),
endCompareDate:a.format(C)
});
}
function i(){
u.dateRange=_=c({
container:"#js_begin_time_container",
stopToday:!0,
isTodayValid:!1,
startDate:g.begin_date,
endDate:g.end_date,
startCompareDate:g.compare_begin_date,
endCompareDate:g.compare_end_date,
needCompare:1,
theme:"ta",
compareTrigger:"compareTrigger_0",
success:function(t){
D||s(t),t.needCompare=D,m.emit("date-change",t),l.find(".btn_default").removeClass("selected");
},
beforeSelect:function(){}
});
var t=f().subtract(1,"days").format("YYYY-MM-DD"),e=f().subtract(2,"days").format("YYYY-MM-DD");
u.singleRange=b=c({
container:"#js_single_timer_container",
isTodayValid:!1,
autoSubmit:!0,
needCompare:1,
singleCompare:!0,
endDate:t,
startDate:t,
startCompareDate:e,
endCompareDate:e,
theme:"ta",
compareTrigger:"compareTrigger_1",
replaceBtn:"btn_single_compare",
startDateId:"startDate_1",
startCompareDateId:"startCompareDate_1",
endDateId:"endDate_1",
endCompareDateId:"endCompareDate_1",
success:function(t){
b&&(t.needCompare=p,m.emit("date-change",t),l.find(".btn_default").removeClass("selected"),
p||r(t));
},
beforeSelect:function(){}
}),m.emit("date-selection:show");
}
var o=(template.compile(t("tpl/statistics/tab-bar.html.js")),t("tpl/statistics/date-submenu.html.js")),d=t("statistics/tab-bar/event-emitter.js"),c=t("biz_web/ui/dateRange.js"),m=new d,l=null,f=t("biz_common/moment.js"),_=null,b=null,u={},D=!1,p=!1,g=null,C="YYYY-MM-DD";
return m.setRangeDate=function(t){
_.setDate(t);
},m.setSingleDate=function(t){
b.setDate(t);
},m.clearCompare=function(){
D=!1,p=!1,l.find("#btn_single_compare").text("按时间对比"),l.find("#btn_compare").text("按时间对比"),
l.find(".btn_default[range=30]").addClass("selected").siblings().removeClass("selected");
},e.dateRanger=u,e;
});