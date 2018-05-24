define("statistics/components/misc-date.js",["statistics/components/date-range2.js","biz_common/moment.js","tpl/statistics/misc-date.html.js","statistics/components/event-emitter.js"],function(t){
"use strict";
function e(){
i.call(this);
var t=this.$el=$(s);
this.$dateRange=t.find("div.date-wrapper"),this.$hourRange=t.find("div.hour-wrapper");
}
var a=t("statistics/components/date-range2.js"),n=t("biz_common/moment.js"),s=t("tpl/statistics/misc-date.html.js"),i=t("statistics/components/event-emitter.js"),o="YYYY-MM-DD",r=n().add("d",-1).format(o),d=n().add("d",-30).format(o),h=(n().add("d",-31).format(o),
n().add("d",-60).format(o),e.prototype);
return $.extend(h,i.prototype),h.init=function(){
this.dateRange=new a({
singleContainer:this.$dateRange.find(".js_single"),
compareContainer:this.$dateRange.find(".js_compare"),
compareBtn:this.$dateRange.find(".js_compare_btn"),
needCompare:!0,
startDate:d,
endDate:r
}),this.hourRange=new a({
singleContainer:this.$hourRange.find(".js_single"),
compareContainer:this.$hourRange.find(".js_compare"),
compareBtn:this.$hourRange.find(".js_compare_btn"),
single:!0,
needCompare:!0,
startDate:r,
endDate:r
}),this.$hourRange.find(".js_date_filter_drop").remove();
var t=this;
this.hourRange.on("date-change",function(e){
t.emit("date-change",e);
}),this.dateRange.on("date-change",function(e){
t.emit("date-change",e);
});
},h.reset=function(){
this.dateRange.setDate({
startDate:d,
endDate:r
}),this.hourRange.setDate({
startDate:r,
endDate:r
}),this.dateRange.clearCompare(),this.hourRange.clearCompare();
},h.showDateRange=function(){
this.$hourRange.hide(),this.$dateRange.show();
},h.showHourRange=function(){
this.$hourRange.show(),this.$dateRange.hide();
},e;
});