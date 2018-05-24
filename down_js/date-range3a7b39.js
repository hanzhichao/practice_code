define("statistics/components/date-range.js",["tpl/statistics/date-range.html.js","statistics/components/event-emitter.js","biz_web/ui/dateRange.js","biz_common/moment.js"],function(t){
"use strict";
function e(t){
i.call(this),t=this.settings=$.extend({},h,t),this.dateObj={
needCompare:!1,
startDate:t.startDate,
endDate:t.endDate,
startCompareDate:t.startCompareDate||"",
endCompareDate:t.endCompareDate||""
},this.cid=d++,this.isEmit=!0,this.el=s(),this.$el=$(this.el),this._initTabToDateMap(),
this._listenActions();
var e=this;
setTimeout(function(){
e._initDateRange(),e._initState();
});
}
function a(t){
var e=r().subtract(1,"days").format(o),a=r().subtract(parseInt(t),"days").format(o),s={
startDate:a,
endDate:e
};
return s;
}
var s=template.compile(t("tpl/statistics/date-range.html.js")),i=t("statistics/components/event-emitter.js"),n=t("biz_web/ui/dateRange.js"),r=t("biz_common/moment.js"),o="YYYY-MM-DD",d=0,c="js_date_container",h={
needCompare:!0
},m=$.extend(e.prototype,i.prototype);
return m._initTabToDateMap=function(){
var t=this;
this.tabsMap={},this.$el.find(".btn_default").each(function(e,s){
var i=$(s),n=i.attr("range"),r=a(n);
t.tabsMap[r.startDate+r.endDate]=e;
});
},m._initState=m.resetState=function(){
var t={
startDate:this.settings.startDate,
endDate:this.settings.endDate
};
this.setCompareDateWithDate(t),this._selectTabByMyDate(),this.clearCompare(),this.settings.single&&this.$el.find(".btn_default").remove();
},m.setDate=function(t){
this.setCompareDateWithDate(t),this._selectTabByMyDate();
},m.setCompareDateWithDate=function(t){
this.dateObj=t;
var e=r(t.startDate),a=r(t.endDate),s=(parseInt(a.format("X"))-parseInt(e.format("X")))/86400,i=r(t.startDate).subtract(1,"days"),n=r(t.startDate).subtract(s+1,"days");
this.dateRange.setDate({
startDate:e.format(o),
endDate:a.format(o),
startCompareDate:n.format(o),
endCompareDate:i.format(o)
});
},m.emitDate=function(){
this.emit("date-change",this.dateObj);
},m.clearCompare=function(){
this._showSelection(),this.dateObj.needCompare=!1,this._enableCompareBtn();
},m._showSelection=function(){
this.$el.find(".btn_default").show();
},m._hideSelection=function(){
this.$el.find(".btn_default").hide();
},m._enableCompareBtn=function(){
this.$el.find("#"+this.compareBtnId).text("按时间对比");
},m._disableCompareBtn=function(){
this.$el.find("#"+this.compareBtnId).text("取消对比");
},m._listenActions=function(){
var t=this;
this.$el.find(".btn_default").on("click",function(){
var e=$(this),s=e.attr("range");
if(t.range!==s){
t.range=s;
var i=a(s);
t.setCompareDateWithDate(i),t.emitDate(),e.addClass("selected").siblings().removeClass("selected");
}
}),this.$el.find("#btn_compare").on("click",function(){
t.dateObj.needCompare=!t.dateObj.needCompare,t.dateObj.needCompare?t._hideSelection():t._showSelection();
});
},m._initDateRange=function(){
var t=this,e=c+this.cid,a="js_compare_btn"+this.cid;
if(this.compareBtnId=a,this.$el.find(".td_data_container").eq(0).attr("id",e),this.$el.find(".btn_primary").eq(0).attr("id",a),
this.settings.single)var s=!0;
this.dateRange=n({
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
},m._selectTabByMyDate=function(){
var t=this._getTabIndexByDate(this.dateObj),e=-1;
t!==e?this._selectTab(t):(this.range=null,this._deselectAll());
},m._selectTab=function(t){
this.$el.find(".btn_default").eq(t).addClass("selected").siblings().removeClass("selected");
},m._deselectAll=function(){
this.$el.find(".btn_default").removeClass("selected");
},m._getTabIndexByDate=function(t){
var e=t.startDate+t.endDate;
for(var a in this.tabsMap)if(a===e)return this.tabsMap[a];
return-1;
},e;
});