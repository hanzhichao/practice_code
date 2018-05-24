define("statistics/tab-bar/tab-keyword-date.js",["tpl/statistics/keyword-date-submenu.html.js","statistics/tab-bar/event-emitter.js","biz_web/ui/dateRange.js","biz_common/moment.js"],function(t){
"use strict";
function e(t,e){
return m=e,d=$(s),t.registerSubmenu("date",d),a(),setTimeout(n),c;
}
function a(){
d.find(".btn_default").on("click",function(){
var t=$(this);
t.addClass("selected").siblings().removeClass("selected");
var e=t.attr("range"),a="YYYY-MM-DD",n=o().subtract(1,"days").format(a),s=o().subtract(parseInt(e),"days").format(a),i={
startDate:s,
endDate:n
};
u.setDate(i),c.emit("date-change",i);
}),d.find("input.js_search").on("keydown",function(t){
t.keyCode===b&&c.emit("search-change",$(this).val());
}),d.find(".frm_input_append").on("click",function(){
c.emit("search-change",d.find("input.js_search").val());
});
}
function n(){
o().subtract(1,"days");
l.dateRange=u=r({
container:"#js_date_range",
stopToday:!0,
isTodayValid:!0,
startDate:m.begin_date,
endDate:m.end_date,
theme:"ta",
compareTrigger:"compareTrigger_0",
success:function(t){
d.find(".btn_default").removeClass("selected"),c.emit("date-change",t);
},
beforeSelect:function(){}
});
}
var s=t("tpl/statistics/keyword-date-submenu.html.js"),i=t("statistics/tab-bar/event-emitter.js"),r=t("biz_web/ui/dateRange.js"),c=window.e=new i,d=null,o=t("biz_common/moment.js"),u=null,m=null,l={},b=13;
return e;
});