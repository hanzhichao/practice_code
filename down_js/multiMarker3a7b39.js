define("setting/multiMarker.js",["tpl/setting/multi_infowindow_edit.html.js","tpl/setting/multi_infowindow_check.html.js","biz_web/ui/dropdown.js"],function(t){
"use strict";
function e(t,e,o){
var s=this;
o&&(this.cacheData=o),this.initDom(e),this.initComponet(t),this.bindEvent(),n(s);
}
function o(){}
function s(t,e){
var o=t.get("status");
"undefined"==typeof o.showType&&(o.showType=o.poiStatus),i(e);
var s=e._evts=[];
1*o.showType===-1?(s.push(soso.maps.event.addListener(e,"dragstart",function(){
t.dragging=!0,t.closeInfowindow();
})),s.push(soso.maps.event.addListener(e,"dragend",function(){
var e=t.cacheData||{};
t.set("status",{
latlng:this.getPosition(),
address:null,
userInfo:{
name:e.userInfo?e.userInfo.name:"",
tel:e.userInfo?e.userInfo.tel:""
},
category:{
name:e.category?e.category.name:"",
value:e.category?e.category.value:""
},
showType:-1,
poiStatus:"undefined"==typeof e.poiStatus?-1:e.poiStatus
}),t.openInfowindow(),t.dragging=!1;
})),e.setDraggable(!0)):e.setDraggable(!1),o&&o.latlng?(e.setPosition(o.latlng),
s.push(soso.maps.event.addListener(e,"click",function(){
if(t.dragging!==!0&&!t.infowindow.get("visible")){
var e=t.get("status");
1*e.showType===1*e.poiStatus?t.openInfowindow():(e.showType=e.poiStatus,t.set("status",e));
}
}))):e.setPosition(null);
}
function n(t){
t.drawingMgr.getDrawingMode()===p?(t.$button.addClass("selected"),setTimeout(function(){
$(".smnoprint:eq(1)").addClass("crosspoint"),$(".smnoprint:eq(2)").addClass("crosspoint");
},100)):(t.$button.removeClass("selected"),$(".smnoprint:eq(1)").removeClass("crosspoint"),
$(".smnoprint:eq(2)").removeClass("crosspoint"));
}
function i(t){
t._evts&&($.each(t._evts,function(t,e){
soso.maps.event.removeListener(e);
}),t._evts=null);
}
function a(t,e,o){
this.category&&"function"==typeof this.category.destroy&&this.category.destroy(),
this.category=new c({
container:"#category",
label:e||"请选择",
data:t||[],
callback:function(){}
}),"undefined"!=typeof e&&"undefined"!=typeof o&&(this.category.name=e,this.category.value=o);
}
var r=t("tpl/setting/multi_infowindow_edit.html.js"),d=t("tpl/setting/multi_infowindow_check.html.js"),c=t("biz_web/ui/dropdown.js"),u={
poiStatus:{
"-1":"新增",
0:"未审核",
1:"系统错误",
2:"审核中",
3:"已通过",
4:"不通过"
},
category:$.cache.sosoMap.category
},p=soso.maps.drawing.OverlayType.MARKER;
return e.prototype=new soso.maps.MVCObject,e.prototype.initDom=function(t){
this.$infowinDiv=$('<div class="map_correct_panel"></div>'),this.$button=$(t);
},e.prototype.initComponet=function(t){
this.infowindow=new soso.maps.InfoWindow({
map:t
}),this.drawingMgr=new soso.maps.drawing.DrawingManager({
drawingControl:!1,
map:t
}),this.myMarker=new soso.maps.Marker({
map:t,
raiseOnDrag:!0,
zIndex:1e3
});
},e.prototype.bindEvent=function(){
var t=this;
soso.maps.event.addListenerOnce(this,"showMarker",function(e){
t.set("status",e),t.openInfowindow();
}),soso.maps.event.addListener(this.drawingMgr,"markercomplete",function(e){
var o=t.cacheData||{},s={
latlng:e.getPosition(),
address:null,
userInfo:{
name:o.userInfo?o.userInfo.name:"",
tel:o.userInfo?o.userInfo.tel:""
},
category:{
name:o.category?o.category.name:"",
value:o.category?o.category.value:""
},
showType:-1,
poiStatus:"undefined"==typeof o.poiStatus?-1:o.poiStatus
};
e.setMap(null),t.set("status",s),t.openInfowindow();
}),this.$button.click(function(){
t.drawingMgr.setDrawingMode(t.drawingMgr.getDrawingMode()==p?null:p);
}),soso.maps.event.addListener(this.drawingMgr,"drawingmode_changed",function(){
n(t);
});
},e.prototype.status_changed=function(){
this.drawingMgr.setDrawingMode(null),s(this,this.myMarker),o(this,this.myMarker),
this.redraw();
},e.prototype.redraw=function(t){
var e=this;
t?(clearTimeout(this._timer),this.draw()):this._timer||(this._timer=window.setTimeout(function(){
e._timer=null,e.draw();
}));
},e.prototype.draw=function(){
var t=this,e=this.get("status");
if(e.latlng){
"undefined"==typeof e.showType&&(e.showType=e.poiStatus),1*e.showType!==-1||e.address||this.geoAddress(),
this.clearInfowindow();
var o=this.$infowinDiv;
if(1*e.showType===-1){
o.html(template.compile(r)({
address:e.address||null,
category:e.category||[],
userInfo:e.userInfo||{},
showType:e.showType,
poiStatus:e.poiStatus
})),o.find("*[qn=submit]").click(function(){
t.submitInfo();
}),o.find("*[qn=cancel]").click(function(){
t.cancelInfo();
});
var s=u.category;
soso.maps.event.addListener(this.infowindow,"content_changed",function(){
if($("#category").length>0){
soso.maps.event.clearListeners(t.infowindow,"content_changed");
var o,n;
e.category&&(o=e.category.name,n=e.category.value),a.call(t,s,o,n);
}
}),soso.maps.event.addListener(this.infowindow,"domready",function(){
var t=$(this.getContent());
t.parent().parent().attr("style","overflow:visible !important;position:absolute;");
});
}else o.html(template.compile(d)({
address:e.address||{},
userInfo:e.userInfo||{},
showType:e.showType,
poiStatus:e.poiStatus,
poiStatusName:u.poiStatus
})),o.find("*[qn=edit]").click(function(){
t.editInfo();
}),o.find("*[qn=delete]").click(function(){
t.delInfo();
});
this.infowindow.setContent(o[0]);
}
},e.prototype.geoAddress=function(){
var t=this;
this.geocoder||(this.geocoder=new soso.maps.Geocoder({
complete:function(e){
var o=e.detail,s=t.get("status");
o&&o.addressComponents&&(s.address=t.formateAddress(o)),t.set("status",s);
},
error:function(){
var e=t.get("status");
e.address={},t.set("status",e);
}
})),this.geocoder.getAddress(this.status.latlng);
},e.prototype.formateAddress=function(t){
if(!t||!t.addressComponents)return{};
var e=t.addressComponents,o={
country:e.country||"",
province:e.province||"",
city:e.city||"",
district:e.district||"",
street:""
};
return o.province===o.city&&(o.city=o.district,o.district=""),o.street=t.address.replace(o.country+o.province+o.city+o.district,""),
o.finalAddress=o.street,o;
},e.prototype.clearInfowindow=function(){
this.infowindow.setContent(null),this.$infowinDiv.off(),this.$infowinDiv.html("");
},e.prototype.openInfowindow=function(){
this.infowindow.setPosition(this.myMarker),this.infowindow.open();
},e.prototype.closeInfowindow=function(){
this.infowindow.setPosition(null),this.infowindow.close();
},e.prototype.setData=function(t){
this.set("status",t);
},e.prototype.submitInfo=function(){
var t=this.get("status");
t.lat=t.latlng.getLat(),t.lng=t.latlng.getLng(),t.userInfo.name=$("#poi_name").val().trim()||"",
t.userInfo.tel=$("#poi_tel").val().trim()||"",!t.address&&(t.address={}),t.address.finalAddress=$("#poi_address").val().trim()||"",
t.category={
name:this.category.name||"",
value:this.category.value||""
},soso.maps.event.trigger(this,"submitInfo",t);
},e.prototype.cancelInfo=function(){
var t=this.get("status");
t.showType=t.poiStatus,this.set("status",t);
},e.prototype.delInfo=function(){
soso.maps.event.trigger(this,"delInfo",this.get("status"));
},e.prototype.editInfo=function(){
var t=this.get("status");
t.showType=-1,this.set("status",t);
},e;
});