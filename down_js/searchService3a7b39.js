define("common/wx/sosomap/searchService.js",["common/wx/sosomap/event.js","common/wx/Tips.js"],function(e){
"use strict";
function s(e){
this.opt=$.extend(!0,{},t,e),this._init();
}
var o=e("common/wx/sosomap/event.js"),r=e("common/wx/Tips.js"),t={
map:null,
searchComplete:$.noop,
searchError:$.noop,
pageCapacity:10
};
return s.prototype=new soso.maps.MVCObject,$.extend(s.prototype,o),$.extend(s.prototype,{
maxScope:"全国",
lastScope:null,
_init:function(){
var e=this,s=this.opt;
this.service=new soso.maps.SearchService({
complete:function(o){
o.type===soso.maps.ServiceResultType.POI_LIST?(e.trigger("search:complete",o),s.searchComplete&&s.searchComplete(o)):e.service.error.call(this,soso.maps.ServiceErrorType.NO_RESULTS);
},
error:function(o){
e.service.getLocation()==e.maxScope?("NO_RESULTS"===o?r.err("抱歉，在当前省市范围内未找到相关门店，请核对后重新搜索。"):"INVALID_REQUEST"===o?r.err("请求无效"):(r.err("系统错误"),
wx.jslog({
src:"SOSOMap:setting/markerTool.js"
},"",4)),e.trigger("search:error",o),s.searchError&&s.searchError(o)):(e.service.setLocation("全国"),
e.service.search(e.keyword));
}
});
},
search:function(e,s){
e||(e=this.keyword),s||(s={});
var o=s.scope||this.lastScope||this.maxScope;
e&&(this.service.setOptions({
pageIndex:s.pageIndex||0,
pageCapacity:s.pageCapacity||this.opt.pageCapacity
}),this.lastScope=o,this.keyword=e,this.service.setLocation(o),this.service.search(e),
this.trigger("search:searching",e,s));
}
}),s;
});