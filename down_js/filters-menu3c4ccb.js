define("statistics/article/detail/filters-menu.js",["statistics/article/detail/state.js","statistics/components/event-emitter.js","biz_web/ui/dropdown.js","statistics/common.js","biz_web/ui/dateRange.js"],function(t){
"use strict";
function e(){
s.call(this),this.initDateRange();
}
var a=jQuery,i=t("statistics/article/detail/state.js"),s=t("statistics/components/event-emitter.js"),n=t("biz_web/ui/dropdown.js"),r=t("statistics/common.js"),o=t("biz_web/ui/dateRange.js"),c=a.extend(e.prototype,s.prototype);
return c.initDateRange=function(){
var t=this;
this.dateRange=o({
container:"#js_single",
stopToday:!0,
isTodayValid:!1,
startDate:r.days.sixDaysAgo,
endDate:r.days.yesterday,
theme:"ta",
dayRangeMax:31,
monthRangeMax:0,
success:function(e){
i.filters.beginDate=e.startDate,i.filters.endDate=e.endDate,t.emit("filter-change");
}
});
},c.initSortKey=function(){
var t=this;
this.sortKeyDrop=new n({
container:"#js_sort_key",
label:"发布时间",
data:[{
name:"发布时间",
value:"1"
},{
name:"送达人数",
value:"2"
},{
name:"图文总阅读人数",
value:"3"
},{
name:"原文页阅读人数",
value:"4"
},{
name:"分享转发人数",
value:"5"
},{
name:"微信收藏人数",
value:"6"
}],
callback:function(e){
i.filters.sortKey=e,t.emit("filter-change");
}
});
},c.initSortType=function(){
var t=this;
this.sortTypeDrop=new n({
container:"#js_sort_type",
label:"逆序",
data:[{
name:"正序",
value:"1"
},{
name:"逆序",
value:"2"
}],
callback:function(e){
i.filters.sortType=e,t.emit("filter-change");
}
});
},c.initSearch=function(){
var t=a("#js_search_title input"),e=a("#js_search_title a.frm_input_append"),s=13,n=this;
t.on("keydown",function(e){
s===e.keyCode&&(i.filters.searchTitle=t.val(),n.emit("filter-change"));
}),e.on("click",function(){
i.filters.searchTitle=t.val(),n.emit("filter-change");
});
},e;
});