define("cardticket/search_map.js",["common/wx/sosomap/event.js","common/wx/sosomap/city_select.js","common/wx/Cgi.js","common/wx/sosomap/util.js","cardticket/store_helper.js","cardticket/store_marker.js","tpl/cardticket/marker_show_new.html.js"],function(e){
"use strict";
var t=e("common/wx/sosomap/event.js"),a=e("common/wx/sosomap/city_select.js"),r=(e("common/wx/Cgi.js"),
e("common/wx/sosomap/util.js")),s=e("cardticket/store_helper.js"),i=e("cardticket/store_marker.js"),o={
CitySelectContainer:"",
searchInput:"",
map:null,
pageCapacity:10,
iconpath:{},
constants:{
big_size:new soso.maps.Size(26,26),
small_size:new soso.maps.Size(14,14),
big_offset:36,
small_offset:24
}
},n=e("tpl/cardticket/marker_show_new.html.js"),c=function(e){
var e=$.extend(!0,{},o,e);
this.opt=e,this.$cityContainer=$(e.CitySelectContainer),this.$searchInput=$(e.searchInput),
this.map=e.map,this.def_big_icon=new soso.maps.MarkerImage(e.iconpath.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72)),
this.init();
};
return c.prototype=new soso.maps.MVCObject,$.extend(c.prototype,t),$.extend(c.prototype,{
init:function(){
var e=this,t=this.opt;
this.citySelect=new a({
container:this.$cityContainer
}),this.$searchInput.keydown(function(t){
return wx.isHotkey(t,"enter")?(e.search(),!1):void 0;
}).change(function(){
e.search();
}),this.locService=new soso.maps.Geocoder({
complete:function(a){
if(e.is_searched=!0,parseFloat(a.detail.similarity)>=.99&&0==a.detail.pcd_conflict_flag){
var r=e.marker.getData();
r&&(r.error=null);
var s=t.map;
s.map.panTo(a.detail.location),e.updateMarker(a);
}else{
var r=e.marker.getData()||{};
r.error=1,e.marker.setData(r),e.marker.openWindow();
}
},
error:function(){}
});
},
search:function(){
{
var e=this,t=this.opt,a=this.map,s=this.$searchInput;
this.citySelect;
}
if(a.inited){
var o=$.trim(s.val());
if(o){
e.destroyMarker(),this.marker=new i({
sosomap:a,
icon:this.def_big_icon,
showInfoTpl:n,
submitcheck:function(){
e.destroyMarker();
var a=this.getData();
e.data=a,t.submitcheck&&t.submitcheck(a);
},
submitcancel:function(){
e.destroyMarker(),t.submitcancel&&t.submitcancel();
}
}),this.marker.marker.setDraggable(!0),this.marker.on("marker:getaddrcomplete",function(t){
var a=t.detail.addressComponents,r=t.detail.address;
s.val(r.replace(a.country,"").replace(a.province,"").replace(a.city,"").replace(a.district,"")),
e.updateMarker(t);
});
var c=r.area2addr(e.citySelect.area);
c.finalAddress=o,r.getLocation(e.locService,c);
}
}
},
getData:function(){
return this.marker&&this.marker.getData();
},
destroyMarker:function(){
var e=this;
e.marker&&e.marker.destroy(),e.marker=null;
},
updateMarker:function(e){
var t=this.marker;
s.updateMarker(t,e,{});
}
}),c;
});