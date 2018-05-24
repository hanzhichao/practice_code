define("cardticket/store_edit.js",["common/wx/sosomap/map.js","cardticket/searchResult.js","common/wx/sosomap/city_select.js","cardticket/store_marker.js","common/wx/Cgi.js","biz_web/lib/json.js","common/wx/sosomap/util.js","common/wx/isdspeed.js","cardticket/create_shop.js"],function(e){
"use strict";
function t(){
v.hide();
}
function a(e){
if(D){
var t=e.detail;
if(t&&t.addressComponents){
var a=t.addressComponents;
D.update(a.province,a.city,a.district),z&&z.update(a.province,a.city,a.district);
}
}
}
function o(e){
var t=x;
t.map.setCenter(new soso.maps.LatLng(e.lat,e.lng)),t.map.getZoom()<10&&t.map.zoomTo(10);
}
function n(){
b&&b.destroy(),z&&z.destroy();
}
var s=e("common/wx/sosomap/map.js"),i=e("cardticket/searchResult.js"),c=e("common/wx/sosomap/city_select.js"),r=e("cardticket/store_marker.js"),d=e("common/wx/Cgi.js"),p=(e("biz_web/lib/json.js"),
e("common/wx/sosomap/util.js"),wx.cgiData),m=e("common/wx/isdspeed.js"),l={
sosomap_init:"sosomap.inited",
sosomap_tilesloaded:"sosomap_tilesloaded"
};
m.set(l.sosomap_init,window._points&&window._points[0]||+new Date),m.set(l.sosomap_tilesloaded,window._points&&window._points[0]||+new Date);
var u={
heightOfMap:$("#map").height()
},w=($("#province"),$("#district"),$("#map_panel")),h=$("#fullScreen"),f=$("#keyword"),g=$("#fullScreenPanel"),_=($("#search_container"),
$("#searchSubmit")),j=$("#cancelFullScreen"),k=$("#map_panel_container"),v=$("#loading_mask"),y=wx.cgiData.iconpath,x=new s({
container:$("#map")
});
soso.maps.event.addListenerOnce(x.map,"tilesloaded",function(){});
var C=new i({
container:"#map .resultPanel",
pageCapacity:10,
map:x
});
C.hide();
var b=new r({
sosomap:x,
icon:new soso.maps.MarkerImage(y.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72))
});
x.on("sosomap:inited",function(){
v.hide(),p.data&&p.data.id&&(p.data.addressComponents={},b.setData(p.data),setTimeout(function(){
b.openWindow();
},100),b.on("marker:delete",function(e){
C&&C.deleteData(e),b.destroy();
}),x.map.setCenter(p.data.latLng));
});
var D=new c({
container:"#CitySelectContainer"
});
x.on("sosomap:getaddrcomplete",function(e){
a(e);
}),D.on("city:changed",o),x.onidleonce(function(){
function e(){
D.inited===!0?(m.endreport(l.sosomap_init,wx.cgiData.flag2,wx.cgiData.flag3,1),x.getAddress(),
x.onidle(function(){
x.getAddress(this.getCenter());
})):20>t&&(t++,setTimeout(e,500));
}
var t=0;
e();
});
var S=e("cardticket/create_shop.js"),z=null;
C.on("result:create",function(){
C.clearMarker(),z=new S({
container:"#map .resultPanel",
className:"create_shop",
cityData:D.cityData.sub,
area:D.area,
map:x,
onCancel:function(e){
z&&z.destroy(),z=null,e&&C.appendData(e),C.updateResult(),C.scrollToBottom();
}
});
}),_.click(function(){
if(x.inited&&!_.prop("disabled")){
var e=$.trim(f.val());
if(e){
var a=D.area,o=a[a.length-1]?a[a.length-1].data.id:a[a.length-2]&&a[a.length-2].data.id;
v.show(),d.post({
url:"/merchant/entityshop",
data:{
action:"search",
districtid:o,
keyword:e
},
complete:function(){
t();
}
},function(e){
if(0==e.base_resp.ret){
n();
var t=$.parseJSON(e.data);
C.setPageIndex(0),C.setSelectedIndex(0),C.updateResult(t,!0);
var a=t.item&&t.item[0];
a&&x.map.setCenter(new soso.maps.LatLng(a.latitude,a.longitude));
}else d.show(e);
});
}
}
}),f.keydown(function(e){
wx.isHotkey(e,"enter")&&_.click();
}),h.click(function(){
if(x.inited){
w.addClass("screen_map"),j.show(),h.hide(),g.append(w).show();
var e=$("#CitySelectContainer").outerHeight();
u.heightOfMap=$("#map").height(),$("#map").height($(window).height()-e),setTimeout(function(){
x.notifyResize();
},200);
}
}),j.click(function(){
$("#map").height(u.heightOfMap),w.removeClass("screen_map"),k.append(w),j.hide(),
h.show(),g.hide(),x.notifyResize();
});
});