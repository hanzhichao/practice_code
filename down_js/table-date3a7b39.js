define("statistics/components/table-date.js",["statistics/components/event-emitter.js","biz_web/ui/dateRange.js"],function(t){
"use strict";
function e(t){
a.call(this),this.opt=t,this.$el=$(t.container),this.$el.append('<div class="day"></div><div class="hour"></div>'),
this.$dateRange=this.$el.find(".day"),this.$hourRange=this.$el.find(".hour");
var e=this;
this.dateRange=s({
container:this.$dateRange,
stopToday:!0,
isTodayValid:!1,
startDate:t.startDate||"",
endDate:t.endDate||"",
theme:"ta",
success:function(t){
e.emit("date-change",t);
}
}),this.hourRange=s({
container:this.$hourRange,
stopToday:!0,
isTodayValid:!1,
startDate:t.startDate,
endDate:t.startDate,
singleCompare:!0,
autoSubmit:!0,
theme:"ta",
success:function(t){
e.emit("date-change",t);
}
}),this.$hourRange.hide();
}
var a=t("statistics/components/event-emitter.js"),s=t("biz_web/ui/dateRange.js"),i=e.prototype;
return $.extend(i,a.prototype),i.showDateRange=function(){
this.$dateRange.show(),this.$hourRange.hide();
},i.showHourRange=function(){
this.$dateRange.hide(),this.$hourRange.show();
},i.setDate=function(t){
this.dateRange.setDate(t),this.hourRange.setDate(t);
},i.show=function(){
this.$el.show();
},i.hide=function(){
this.$el.hide();
},e;
});