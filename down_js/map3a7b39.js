define("common/wx/sosomap/map.js",["common/wx/sosomap/event.js","common/wx/sosomap/searchService.js","common/wx/Tips.js","common/wx/sosomap/util.js"],function(t){
"use strict";
function o(t){
this.container=$(t.container),this.opt=t=$.extend(!0,{
pageCapacity:10,
lat:e.lat,
lng:e.lng
},t),this.initDom(),this.initMap(t.lat,t.lng),this.initComponet(),this.initServer(t),
this.bindEvent(),this.notifyResize(),this.inited=!0;
}
var e={
lat:39.916528,
lng:116.397129
},i=t("common/wx/sosomap/event.js"),n=t("common/wx/sosomap/searchService.js"),s=t("common/wx/Tips.js"),a=t("common/wx/sosomap/util.js");
return o.prototype=new soso.maps.MVCObject,$.extend(o.prototype,i),o.prototype.initDom=function(){
this.$mainDiv=this.container.find(".mainDiv"),this.$result=this.container.find(".resultPanel"),
this.$mapDiv=this.container.find(".map-canvas");
},o.prototype.initMap=function(t,o){
this.map="undefined"==typeof t||"undefined"==typeof o||1*t===0&&1*o===0?new soso.maps.Map(this.$mapDiv[0],{
zoom:13,
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
mapTypeControl:!1
}):new soso.maps.Map(this.$mapDiv[0],{
center:new soso.maps.LatLng(t,o),
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
zoom:13,
mapTypeControl:!1
});
},o.prototype.initComponet=function(){
this.opt;
this.searchService=new n;
},o.prototype.initServer=function(){
{
var t=this;
this.opt;
}
this.geoFirst=!0,this.cityService=new soso.maps.CityService({
complete:function(o){
e.latlng=o.detail.latLng,t.map.setCenter(e.latlng),t.trigger("sosomap:searchLocalCity",o);
},
error:function(){
e.latlng=new soso.maps.latLng(e.lat,e.lng);
}
}),this.geocoderService=new soso.maps.Geocoder({
complete:function(o){
t.geoFirst===!0&&(t.geoFirst=!1,t.inited=!0,e.latlng,setTimeout(function(){
t.trigger("sosomap:inited");
},0)),t.trigger("sosomap:getaddrcomplete",o);
},
error:function(){
s.err("仅支持中国（含港澳台地区）地址，请重新定位具体地址。"),t.map.panTo(e.latlng?e.latlng:new soso.maps.LatLng(e.lat,e.lng));
}
}),this.locationServer=new soso.maps.Geocoder({
complete:function(o){
t.trigger("sosomap:locationcomplete",o);
},
error:function(o){
t.trigger("sosomap:locationerror",o);
}
});
},o.prototype.bindEvent=function(){
var t=this;
this.searchService.on("search:complete",function(o){
var e=o.detail.pois[0];
e&&4==e.type&&t.map&&t.map.panTo(e.latLng),t.trigger("sosomap:searchcomplete",o);
}).on("search:error",function(o){
t.trigger("sosomap:searcherror",o);
}).on("search:searching",function(){
t.trigger("sosomap:searching");
});
},o.prototype.onidleonce=function(t){
soso.maps.event.addListenerOnce(this.map,"idle",t);
},o.prototype.onidle=function(t){
soso.maps.event.addListener(this.map,"idle",t);
},o.prototype.getAddress=function(t){
this.geocoderService.getAddress(t||this.map.getCenter());
},o.prototype.setCenter=function(t){
this.map.setCenter(t);
},o.prototype.panTo=function(t){
this.map.panTo(t);
},o.prototype.callmap=function(t){
var o=[].slice.call(arguments,1);
return"function"==typeof this.map[t]?this.map[t].apply(this.map,o):void 0;
},o.prototype.getLocation=function(t){
if("string"==typeof t)return void this.locationServer.getLocation(t);
var o=t.finalAddress;
o=t.province==t.city?(t.city||"")+(t.district||"")+(o||""):(t.province||"")+(t.city||"")+(t.district||"")+(o||""),
this.locationServer.getLocation(o);
},o.prototype.search=function(t){
t.scope||t.area&&(t.scope=a.area2scope(t.area));
var o=this.opt;
t.pageCapacity||(t.pageCapacity=o.pageCapacity),this.searchService.search(t.keyword,t);
},o.prototype.notifyResize=function(){
var t=this.container.width(),o=this.container.height();
this.$mainDiv.height(o),this.$mainDiv.width(t);
},o.prototype.destory=function(){
this.unbindEvent();
},o.prototype.unbindEvent=function(){
soso.maps.event.clearListeners(this),soso.maps.event.clearListeners(this.map);
},o;
});