define("setting/set-location.js",["setting/markerTool.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var n=e("setting/markerTool.js"),t=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),i=$(window).height(),o=$("#map").height(),a=(document.createElement("a"),
new n(document.getElementById("map"))),c=$("#province"),s=$("#map_panel"),l=$(".loading_mask"),u=$("#fullScreen"),m=$("#currentAddress"),d=$("#keyword"),p=$("#fullScreenPanel"),h=$("#search_container"),g=$("#cancelFullScreen"),f=$("#map_panel_container");
$("#searchSubmit").click(function(){
var e=d.val();
$.cache.sosoMap={
searchKeyWord:e
},a.search(e);
}),$("#keyword").keydown(function(e){
if(wx.isHotkey(e,"enter")){
var n=d.val();
$.cache.sosoMap={
searchKeyWord:n
},a.search(d.val());
}
}),$("#clearBtn").click(function(){
a.clearSearchResult();
}),$("form").submit(function(){
return!1;
}),$("#fullScreen").click(function(){
h.insertBefore(c),s.addClass("screen_map"),p.append(s),g.show(),u.hide(),p.show();
var e=$("#CitySelectContainer").outerHeight();
$("#map").height(i-e),setTimeout(function(){
a.notifyResize();
},200);
}),$("#cancelFullScreen").click(function(){
$("#map").height(o),h.prependTo(f),s.removeClass("screen_map"),f.append(s),g.hide(),
u.show(),p.hide(),a.notifyResize();
}),soso.maps.event.addListener(a,"complete",function(e){
r.post({
url:wx.url("/cgi-bin/setuserinfo?cgi=setuserinfo&t=ajax-response"),
data:{
position:e.address,
latitude:e.latlng.lat.toString(),
longitude:e.latlng.lng.toString()
},
success:function(n){
if(!n||!n.base_resp)return void t.err("设置失败");
var r=n.base_resp.ret;
0===r?(t.suc("设置成功"),m.text(e.address),$(".map_container .page_msg").hide()):t.err("设置失败");
}
});
}),currentPoiObj.lat&&currentPoiObj.lng&&currentPoiObj.position?(soso.maps.event.addListenerOnce(a.map,"idle",function(){
currentPoiObj.latLng=new soso.maps.LatLng(currentPoiObj.lat,currentPoiObj.lng),a.map.panTo(currentPoiObj.latLng),
l.hide(),soso.maps.event.addListenerOnce(a.map,"idle",function(){
l.hide(),a.setMyMarker({
address:currentPoiObj.position.html(!1),
latlng:currentPoiObj.latLng
},2);
});
}),m.html(currentPoiObj.position)):currentPoiObj.provinceName&&currentPoiObj.cityName?(l.hide(),
a.citySelect.selectCityByName(currentPoiObj.provinceName,currentPoiObj.cityName)):(l.hide(),
$(".map_container .page_msg").show());
});