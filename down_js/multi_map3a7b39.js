define("setting/multi_map.js",[],function(){
"use strict";
function t(t){
t.MyMarker,t.searchComponent,t.CitySelectComponent;
this.container=t.container,this.opt=t,this.initDom(),this.initMap(t.lat,t.lng),this.initComponet(),
this.initServer(t),this.bindEvent(),this.notifyResize();
}
var e={
lat:39.916528,
lng:116.397129
};
return t.prototype=new soso.maps.MVCObject,t.prototype.initDom=function(){
this.$mainDiv=$("<div></div>").appendTo(this.container),this.$result=$('<div class="resultPanel"></div>').appendTo(this.$mainDiv).hide(),
this.$mapDiv=$('<div class="map-canvas"></div>').appendTo(this.$mainDiv);
},t.prototype.initMap=function(t,e){
this.map="undefined"==typeof t||"undefined"==typeof e||1*t===0&&1*e===0?new soso.maps.Map(this.$mapDiv[0],{
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
mapTypeControl:!1
}):new soso.maps.Map(this.$mapDiv[0],{
center:new soso.maps.LatLng(t,e),
navigationControlOptions:{
position:soso.maps.ControlPosition.LEFT_TOP
},
zoom:13,
mapTypeControl:!1
});
},t.prototype.initComponet=function(){
var t=this.opt;
this.myMarker=new t.MyMarker(this.map,"#myMarker",t.markerData),this.citySelect=new t.CitySelectComponent("#CitySelectContainer","#province","#city","#district",this.map),
this.searchComponent=new t.searchComponent(this.$result);
},t.prototype.initServer=function(){
var t=this,o=this.opt;
this.geoFirst=!0,this.geocoderService=new soso.maps.Geocoder({
complete:function(e){
if(t.geoFirst===!0&&(t.geoFirst=!1,setTimeout(function(){
soso.maps.event.trigger(t,"inited");
},0),o.showMarker===!0)){
var i=t.myMarker.formateAddress(e.detail),n=o.markerData;
n.address&&n.address.finalAddress&&(i.finalAddress=n.address.finalAddress),soso.maps.event.trigger(t.myMarker,"showMarker",{
latlng:e.detail.location,
address:i,
category:n.category,
userInfo:n.userInfo,
poiStatus:n.poiStatus
}),t.map.getZoom()<13&&t.map.zoomTo(13);
}
var i=e.detail.addressComponents;
t.citySelect.setAreaDataByName(i.province,i.city,i.district);
},
error:function(){
t.map.panTo(new soso.maps.LatLng(e.lat,e.lng));
}
}),o.markerData&&1*o.markerData.poiStatus>=0&&(1*o.lat===0&&1*o.lng===0||"undefined"==typeof o.lat&&"undefined"==typeof o.lng)&&(this.locationServer=new soso.maps.Geocoder({
complete:function(e){
t.map.panTo(e.detail.location),t.locationServer=null;
},
error:function(){
t.map.panTo(new soso.maps.LatLng(e.lat,e.lng)),t.locationServer=null;
}
}));
},t.prototype.bindEvent=function(){
var t=this;
this.cityDataInited=!1,soso.maps.event.addListenerOnce(this.citySelect,"dataInited",function(){
t.cityDataInited=!0;
}),soso.maps.event.addListenerOnce(this.myMarker,"delInfo",function(e){
soso.maps.event.trigger(t,"delInfo",e);
}),soso.maps.event.addListener(this.myMarker,"submitInfo",function(e){
var o=e.address;
e.area=t.citySelect.getAreaDataByName(o.province||"",o.city||"",o.district||""),
soso.maps.event.trigger(t,"submitInfo",e);
}),soso.maps.event.addListenerOnce(this.map,"idle",function(){
function e(){
if(t.cityDataInited===!0){
if(t.locationServer){
var o=t.opt.markerData.address,i=o.finalAddress;
i=o.province==o.city?o.city+o.district+i:o.province+o.city+o.district+i,t.locationServer.getLocation(i);
}else t.geocoderService.getAddress(t.map.getCenter());
soso.maps.event.addListener(t.map,"idle",function(){
t.geocoderService.getAddress(this.getCenter());
});
}else t.checkDataCount<20&&(t.checkDataCount++,setTimeout(e,500));
}
t.checkDataCount=0,e();
}),soso.maps.event.addListener(this.searchComponent,"clickItem",function(e){
t.map.panTo(e.latLng),t.map.getZoom()<13&&t.map.zoomTo(13),soso.maps.event.addListenerOnce(t.map,"idle",function(){
var o=t.myMarker.get("status")||{},i={
latlng:e.latLng,
address:null,
userInfo:{
name:(e.name||"").replace(/ /g,""),
tel:(e.phone||"").replace(/ /g,"")
},
showType:-1,
poiStatus:"undefined"==typeof o.poiStatus?-1:o.poiStatus
};
t.myMarker.myMarker.setPosition(e.latLng),t.myMarker.set("status",i),t.myMarker.openInfowindow();
});
});
},t.prototype.search=function(t){
if(t){
var e=this.citySelect.area,o="";
e[0]&&e[0].data&&e[0].data.fullname&&(o=e[0].data.fullname,$.cache.sosoMap.maxScope=o),
-1==window.cityData.city.indexOf(","+o+",")&&e[1]&&e[1].data&&e[1].data.fullname&&(o=e[1].data.fullname),
o=o||"全国",$.cache.sosoMap.maxScope=$.cache.sosoMap.maxScope||"全国",this.searchComponent.doSearch(t,o);
}
},t.prototype.notifyResize=function(){
var t=this.container.width(),e=this.container.height();
this.$mainDiv.height(e),this.$mainDiv.width(t);
},t.prototype.destory=function(){
this.unbindEvent();
},t.prototype.unbindEvent=function(){
soso.maps.event.clearListeners(this),soso.maps.event.clearListeners(this.map),soso.maps.event.clearListeners(this.myMarker),
soso.maps.event.clearListeners(this.citySelect),soso.maps.event.clearListeners(this.searchComponent);
},t;
});