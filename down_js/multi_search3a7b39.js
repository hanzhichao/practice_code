define("setting/multi_search.js",["common/wx/Tips.js","tpl/setting/multi_search_result.html.js"],function(e){
"use strict";
function t(e){
this.container=e,this.lastIndex=-1,this.pageClick=!1,this.initSearchServer();
}
function s(e,t){
e.css("background-color",t?"#EEEEEE":"#FFFFFF");
}
var i=e("common/wx/Tips.js"),n=e("tpl/setting/multi_search_result.html.js"),a={
pageMaxCount:5,
selector_page:"*[pageIndex]",
selectol_item:"li[item]"
};
return t.prototype=new soso.maps.MVCObject,t.prototype.initSearchServer=function(){
var e=this;
this.searchService=new soso.maps.SearchService({
complete:function(t){
if(t.type===soso.maps.ServiceResultType.POI_LIST){
e.setResultPanelDisplay(!0),e.set("selectIndex",-1),e.set("result",t);
var s=t.detail.pois[0];
s&&4==s.type&&e.map.panTo(s.latLng),soso.maps.event.trigger(e,"searchEnd");
}else e.searchService.error.call(this,soso.maps.ServiceErrorType.NO_RESULTS);
},
error:function(t){
e.searchService.getLocation()==$.cache.sosoMap.maxScope?(e.setResultPanelDisplay(!1),
"NO_RESULTS"===t?i.err("抱歉，在当前省市范围内未找到相关门店，请核对后重新搜索。"):"INVALID_REQUEST"===t?i.err("请求无效"):(i.err("系统错误"),
wx.jslog({
src:"SOSOMap:setting/markerTool.js"
},"",4)),soso.maps.event.trigger(e,"searchEnd")):(e.searchService.setLocation("全国"),
e.searchService.search($.cache.sosoMap.searchKeyWord));
}
});
},t.prototype.doSearch=function(e,t){
e&&(this.searchService.setOptions({
pageIndex:0
}),this.searchService.setLocation(t),this.searchService.search(e));
},t.prototype.setResultPanelDisplay=function(e){
e?this.container.show():this.container.hide();
},t.prototype.result_changed=function(){
var e=this.get("result");
e&&(this.unbindEvents(),this.drawPanel(e),this.updateIndex(),this.bindEvents());
},t.prototype.clearSearchResult=function(){
this.set("result",null),this.set("selectIndex",-1),this.setResultPanelDisplay(!1);
},t.prototype.selectIndex_changed=t.prototype.updateIndex=function(){
var e=(this.get("result"),this.get("selectIndex"));
"undefined"==typeof e&&(e=-1);
var t=this.lastIndex;
t>=0&&s(this.container.find("ol li:nth-child("+(t+1)+")"),!1),s(this.container.find("ol li:nth-child("+(e+1)+")"),!0),
this.lastIndex=e;
},t.prototype.bindEvents=function(){
var e=this;
this.container.delegate(a.selector_page,"click",function(){
e.pageClick=!0;
{
var t=1*this.getAttribute("pageIndex")-1;
e.get("result");
}
e.searchService.setOptions({
pageIndex:t
}),e.searchService.search($.cache.sosoMap.searchKeyWord);
}),this.container.delegate(a.selectol_item,"click",function(){
var t=this.getAttribute("item"),s=e.get("result");
e.set("selectIndex",t-1),soso.maps.event.trigger(e,"clickItem",s.detail.pois[t-1]);
});
},t.prototype.drawPanel=function(e){
var t=e.detail,s=t.pageIndex+1,i=Math.ceil(t.totalNum/t.pageCapacity),r=(t.pois,
[]);
if(i>1){
s>i&&(s=i);
var c=a.pageMaxCount;
1!==s&&c--,s!==i&&c--;
var o=1;
if(i>c)for(r.push(s);r.length<c;)s-o>0&&r.unshift(s-o),i>=s+o&&r.push(s+o),o++;else for(;i>=o;)r.push(o++);
}
if(this.container.html(template.compile(n)({
data:t.pois,
page:r,
currentPage:s,
pageIndex:t.pageIndex,
pageCapacity:t.pageCapacity
})),this.pageClick===!0){
this.pageClick=!1;
var l=this;
setTimeout(function(){
var e=l.container.height(),t=l.container.find("ol").height(),s=l.container.find("[class=page]").height();
l.container.scrollTop(t-e+s+20);
},100);
}
},t.prototype.unbindEvents=function(){
this.container.undelegate(a.selector_page,"click"),this.container.undelegate(a.selectol_item,"click");
},t.prototype.destory=function(){
this.set("result",null),this.unbindEvents(),this.container=null;
},t;
});