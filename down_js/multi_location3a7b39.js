define("setting/multi_location.js",["setting/multi_map.js","setting/multiMarker.js","setting/multi_city_select.js","setting/multi_search.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js"],function(e){
"use strict";
function t(){
$("#map").html($("#loading_mask").show()),$("#mapMain").hide(),$("#listMain").show(),
$("#page_msg").addClass("dn").find("h4").html(""),w.show(),y.show(),$("#myMarker").show().find("span").html("标注新门店");
}
function a(){
u.heightOfMap=$("#map").height(),u.inited=!1,u.tool=null;
}
function i(e){
"check"==e.model?(w.hide(),y.hide(),$("#myMarker").hide()):"update"==e.model&&$("#myMarker").find("span").html("重新标注"),
e.markerData&&e.markerData.msg&&$("#page_msg").removeClass("dn").find("h4").html(e.markerData.msg);
}
function n(e,a){
h.show({
type:"warn",
msg:"确定删除该条地理位置信息？",
buttons:[{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
},{
text:"确定",
click:function(){
var i=this.get().find(".js_btn").eq(0);
i.prop("disabled")||(i(!1),u.delTimeoutId=window.setTimeout(function(){
i(!0);
},1e4),m.get({
url:"/misc/setlocation?action=delete&id="+e.markerData.id,
mask:!1
},function(n){
return window.clearTimeout(u.delTimeoutId),i(!0),n.base_resp?1*n.base_resp.ret!==0?void d.err():(d.suc("删除成功"),
a=o(e,a),u.tool.destory(),t(),void $("#listMain").trigger("delInfoSuc",a)):void d.err();
}));
}
}]
});
}
function o(e,t){
return e.markerData&&"undefined"!=typeof e.markerData.dataIndex&&(t.dataIndex=e.markerData.dataIndex,
t.realindex=e.markerData.realindex),e.markerData&&"undefined"!=typeof e.markerData.id&&(t.id=e.markerData.id),
t;
}
var s=e("setting/multi_map.js"),r=e("setting/multiMarker.js"),l=e("setting/multi_city_select.js"),c=e("setting/multi_search.js"),d=e("common/wx/Tips.js"),m=e("common/wx/Cgi.js"),h=e("common/wx/dialog.js"),u={
heightOfMap:$("#map").height(),
inited:!1,
tool:null
},p=($("#province"),$("#district"),$("#map_panel")),f=$("#fullScreen"),g=$("#keyword"),k=$("#fullScreenPanel"),w=$("#search_container"),y=$("#searchSubmit"),M=$("#cancelFullScreen"),_=$("#map_panel_container");
$("#searchSubmit").click(function(){
if(u.inited&&!y.prop("disabled")){
var e=g.val();
$.cache.sosoMap||($.cache.sosoMap={}),$.cache.sosoMap.searchKeyWord=e,u.tool.search(e);
}
}),$("#keyword").keydown(function(e){
if(u.inited&&!y.prop("disabled")&&wx.isHotkey(e,"enter")){
var t=g.val();
$.cache.sosoMap||($.cache.sosoMap={}),$.cache.sosoMap.searchKeyWord=t,u.tool.search(g.val());
}
}),$("#fullScreen").click(function(){
if(u.inited){
p.addClass("screen_map"),M.show(),f.hide(),k.append(p).show();
var e=$("#CitySelectContainer").outerHeight();
u.heightOfMap=$("#map").height(),$("#map").height($(window).height()-e),setTimeout(function(){
u.tool.notifyResize();
},200);
}
}),$("#cancelFullScreen").click(function(){
$("#map").height(u.heightOfMap),p.removeClass("screen_map"),_.append(p),M.hide(),
f.show(),k.hide(),u.tool.notifyResize();
}),$("#back2list").click(function(){
t();
});
var v={
init:function(e){
e=e||{},e.model=e.model||"insert",a(),i(e);
var d=0,m=0;
e.markerData&&"undefined"!=typeof e.markerData.lat&&"undefined"!=typeof e.markerData.lng&&(d=e.markerData.lat,
m=e.markerData.lng),u.tool=new s({
container:$("#map"),
CitySelectComponent:l,
MyMarker:r,
searchComponent:c,
lat:d,
lng:m,
showMarker:e.showMarker===!0?!0:!1,
markerData:e.markerData||null
}),soso.maps.event.addListener(u.tool,"inited",function(){
u.inited=!0,$("#loading_mask").hide();
}),soso.maps.event.addListener(u.tool,"submitInfo",function(a){
a=o(e,a),u.tool.destory(),t(),$("#listMain").trigger("fillForm",a);
}),soso.maps.event.addListener(u.tool,"delInfo",function(t){
n(e,t);
}),soso.maps.event.addListener(u.tool.searchComponent,"searchEnd",function(){
y.btn(!0);
});
}
};
return v;
});