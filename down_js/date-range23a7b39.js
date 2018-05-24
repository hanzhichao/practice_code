define("statistics/components/date-range2.js",["statistics/components/event-emitter.js","biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/report_util.js"],function(t){
"use strict";
function e(t){
s.call(this),t=this.settings=$.extend({},D,t),this.dateObj={
needCompare:!1,
startDate:t.startDate,
endDate:t.endDate,
startCompareDate:t.startCompareDate||"",
endCompareDate:t.endCompareDate||""
},this.cid=o++,this.isEmit=!0,this.$single=h(this.settings.singleContainer),this.$compare=h(this.settings.compareContainer),
this.$compareBtn=h(this.settings.compareBtn),this._init();
}
function a(t){
var e=n().subtract(1,"days").format(r),a=n().subtract(parseInt(t),"days").format(r),s={
startDate:a,
endDate:e
};
return s;
}
var s=t("statistics/components/event-emitter.js"),i=t("biz_web/ui/dateRange.js"),n=t("biz_common/moment.js"),r="YYYY-MM-DD",o=0,d="js_date_container",m=t("common/wx/report_util.js"),h=jQuery,D={
needCompare:!0,
minValidDate:"315507600"
},c=$.extend(e.prototype,s.prototype);
return c._init=function(){
this.initSingle(),this.initCompare(),this.initCompareButton();
},c.initSingle=function(){
var t=this;
if(this.settings.single)var e=!0;
this.settings.single?this.dateRange=this.singleRange=i({
container:$(this.settings.singleContainer).find(".js_date_range_drop"),
stopToday:!0,
isTodayValid:!1,
startDate:this.dateObj.startDate||"",
endDate:this.dateObj.endDate||"",
singleCompare:this.settings.single,
autoSubmit:e,
theme:"ta",
success:function(e){
t.dateObj.startDate=e.startDate,t.dateObj.endDate=e.endDate,t.emitDate();
}
}):(this.singleRange=m.initDateRange({
begintime:this.settings.startDate,
endtime:this.settings.endDate,
minValidDate:this.settings.minValidDate,
dropDom:$(this.settings.singleContainer).find(".js_date_filter_drop"),
dateDom:$(this.settings.singleContainer).find(".js_date_range_drop"),
callback:function(e,a){
t.dateObj.startDate=e,t.dateObj.endDate=a,t.emitDate();
}
}),this.dateRange=this.singleRange.dateRange);
},c.initCompare=function(){
var t=this;
if(this.settings.single)var e=!0;
this.range1=i({
container:$(this.settings.compareContainer).find(".js_date_range_drop1"),
stopToday:!0,
isTodayValid:!1,
startDate:this.dateObj.startDate||"",
endDate:this.dateObj.endDate||"",
singleCompare:this.settings.single,
autoSubmit:e,
theme:"ta",
success:function(e){
t.dateObj.startDate=e.startDate,t.dateObj.endDate=e.endDate,t.dateRange.setDate(e),
t.emitDate();
}
}),this.range2=i({
container:$(this.settings.compareContainer).find(".js_date_range_drop2"),
stopToday:!0,
isTodayValid:!1,
startDate:this.dateObj.startDate||"",
endDate:this.dateObj.endDate||"",
singleCompare:this.settings.single,
autoSubmit:e,
theme:"ta",
success:function(e){
t.dateObj.startCompareDate=e.startDate,t.dateObj.endCompareDate=e.endDate,t.emitDate();
}
});
},c.initCompareButton=function(){
var t=this;
this.$compareBtn.on("click",function(){
t.dateObj.needCompare=!t.dateObj.needCompare,t.dateObj.needCompare?t._disableCompareBtn():t._enableCompareBtn(),
t.emitDate();
});
},c.setCompareDateWithDate=function(t){
var e=n(t.startDate),a=n(t.endDate),s=(parseInt(a.format("X"))-parseInt(e.format("X")))/86400,i=n(t.startDate).subtract(1,"days"),o=n(t.startDate).subtract(s+1,"days"),d=e.format(r),m=a.format(r),h=o.format(r),D=i.format(r);
this.range1.setDate({
startDate:d,
endDate:m
}),this.range2.setDate({
startDate:h,
endDate:D
}),this.dateObj.startDate=d,this.dateObj.endDate=m,this.dateObj.startCompareDate=h,
this.dateObj.endCompareDate=D;
},c.emitDate=function(){
this.emit("date-change",this.dateObj);
},c._initTabToDateMap=function(){
var t=this;
this.tabsMap={},this.$el.find(".btn_default").each(function(e,s){
var i=$(s),n=i.attr("range"),r=a(n);
t.tabsMap[r.startDate+r.endDate]=e;
});
},c._initState=c.resetState=function(){
var t={
startDate:this.settings.startDate,
endDate:this.settings.endDate
};
this.setCompareDateWithDate(t),this._selectTabByMyDate(),this.clearCompare(),this.settings.single&&this.$el.find(".btn_default").remove();
},c.setDate=function(t){
this.dateRange.setDate(t),this.setCompareDateWithDate(t);
},c.clearCompare=function(){
this.dateObj.needCompare=!1,this._enableCompareBtn();
},c._enableCompareBtn=function(){
var t=this;
t.$single.show(),t.$compare.hide(),t.$compareBtn.html("按时间对比");
},c._disableCompareBtn=function(){
var t=this;
t.$single.hide(),t.$compare.show(),t.$compareBtn.html("取消对比"),t.setCompareDateWithDate(t.dateObj);
},c._initDateRange=function(){
var t=this,e=d+this.cid,a="js_compare_btn"+this.cid;
if(this.compareBtnId=a,this.$el.find(".td_data_container").eq(0).attr("id",e),this.$el.find(".btn_primary").eq(0).attr("id",a),
this.settings.single)var s=!0;
this.dateRange=i({
container:"#"+e,
stopToday:!0,
isTodayValid:!1,
startDate:this.dateObj.startDate||"",
endDate:this.dateObj.endDate||"",
singleCompare:this.settings.single,
autoSubmit:s,
startCompareDate:this.dateObj.startCompareDate||"",
endCompareDate:this.dateObj.endCompareDate||"",
needCompare:this.settings.needCompare,
theme:"ta",
compareTrigger:"compare_trigger_"+this.cid,
replaceBtn:a,
success:function(e){
e.needCompare=t.dateObj.needCompare,t.dateObj.needCompare||t.setCompareDateWithDate(e),
t.dateObj=e,t.emitDate(),t._selectTabByMyDate();
}
});
},c._selectTabByMyDate=function(){
var t=this._getTabIndexByDate(this.dateObj),e=-1;
t!==e?this._selectTab(t):(this.range=null,this._deselectAll());
},c._selectTab=function(t){
this.$el.find(".btn_default").eq(t).addClass("selected").siblings().removeClass("selected");
},c._deselectAll=function(){
this.$el.find(".btn_default").removeClass("selected");
},c._getTabIndexByDate=function(t){
var e=t.startDate+t.endDate;
for(var a in this.tabsMap)if(a===e)return this.tabsMap[a];
return-1;
},e;
});