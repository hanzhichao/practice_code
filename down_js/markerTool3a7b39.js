define("setting/markerTool.js",["setting/SearchResultPanel.js","setting/MyMarker.js","setting/CitySelectComponent.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
var t=this;
if(this.container=e,this.$mainDiv=$("<div></div>").appendTo(e),this.$resultDiv=$('<div class="resultPanel">').appendTo(this.$mainDiv),
this.$mapDiv=$('<div class="map-canvas"></div>').appendTo(this.$mainDiv),this.$resultDiv.hide(),
currentPoiObj.lat&&currentPoiObj.lng&&currentPoiObj.position){
currentPoiObj.latLng=new soso.maps.LatLng(currentPoiObj.lat,currentPoiObj.lng);
var i=this.map=new soso.maps.Map(this.$mapDiv[0],{
center:currentPoiObj.latLng,
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
mapTypeControl:!1
});
}else var i=this.map=new soso.maps.Map(this.$mapDiv[0],{
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
mapTypeControl:!1
});
var c=new soso.maps.MVCObject;
c.set("selectIndex",-1),this.citySelect=new a("#CitySelectContainer","#province","#city"),
this.searchResultPanel=new n(this.$resultDiv[0]),this.myMarker=new o(this.map,"#myMarker"),
this.searchResultPanel.bindTo("result",c),this.searchResultPanel.bindTo("index",c,"selectIndex"),
soso.maps.event.addListener(this.citySelect,"selectCity",function(e){
l.searchCityByName(e);
});
var p=new soso.maps.Geocoder({
complete:function(e){
var s=e.detail.addressComponents,i=t.map.getZoom(),n=s.province||s.country;
8>=i?t.citySelect.set("city",n):t.citySelect.set("city",s.city||n);
}
}),l=new soso.maps.CityService({
complete:function(e){
i.setCenter(e.detail.latLng),i.setZoom(e.detail.level);
}
});
this.searchService=new soso.maps.SearchService({
complete:function(e){
if(e.type===soso.maps.ServiceResultType.POI_LIST){
s(t,!0),c.set("selectIndex",-1),c.set("result",e);
var i=e.detail.pois[0];
i&&4==i.type&&t.map.panTo(i.latLng);
}else e.type===soso.maps.ServiceResultType.CITY_LIST;
},
error:function(e){
s(t,!1),"NO_RESULTS"===e?r.err("抱歉，在当前城市及全国范围内未找到相关地点，请核对后重新搜索。"):"INVALID_REQUEST"===e?r.err("请求无效"):(r.err("系统错误"),
wx.jslog({
src:"SOSOMap:setting/markerTool.js"
},"",4));
}
}),soso.maps.event.addListener(this.map,"idle",function(){
var e=this.getCenter();
p.getAddress(e);
}),soso.maps.event.addListener(this.searchResultPanel,"clickItem",function(e){
t.map.panTo(e.latLng),t.map.getZoom()<12&&t.map.zoomTo(12),soso.maps.event.addListenerOnce(t.map,"idle",function(){
t.setMyMarker({
address:e.position,
latlng:e.latLng,
name:e.name
},!1);
});
}),soso.maps.event.addListener(this.searchResultPanel,"clickPage",function(e){
e=parseInt(e),t.searchService.setOptions({
pageIndex:e
}),t.searchService.search($.cache.sosoMap.searchKeyWord);
}),soso.maps.event.addListener(this.myMarker,"complete",function(e){
t.map.panTo(e.latlng),t.clearSearchResult(),soso.maps.event.trigger(t,"complete",e);
}),this.notifyResize(),soso.maps.event.trigger(this.citySelect,"selectCity",this.citySelect.value);
}
function s(e,t){
t?e.$resultDiv.show():e.$resultDiv.hide();
}
function i(e,t,s){
t&&(e.searchService.setOptions({
pageIndex:0
}),e.searchService.setLocation(s),e.searchService.search(t));
}
var n=e("setting/SearchResultPanel.js"),o=e("setting/MyMarker.js"),a=e("setting/CitySelectComponent.js"),r=e("common/wx/Tips.js");
return t.prototype=new soso.maps.MVCObject,t.prototype.search=function(e){
if(e){
var t=this.citySelect.get("city"),s=this.map.getZoom();
4>=s?i(this,e,"全国"):i(this,e,t);
}
},t.prototype.clearSearchResult=function(){
this.set("result",null),this.set("selectIndex",-1),s(this,!1);
},t.prototype.notifyResize=function(){
var e=$(this.container).width(),t=$(this.container).height();
this.$mainDiv.height(t),this.$mainDiv.width(e);
},t.prototype.setMyMarker=function(e,t){
this.myMarker.setData(e,t),this.myMarker.openInfowindow();
},t.prototype.destory=function(){},t;
});