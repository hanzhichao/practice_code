define("setting/multi_city_select.js",["setting/multi_citydata.js","biz_web/ui/dropdown.js"],function(t){
"use strict";
function a(t,a,n,i,r){
var o=this;
this.map=r,this.container=$(t),this.menuDomId=[a,n,i],this.area=new Array(3);
for(var s=0,u=this.menuDomId.length;u>s;s++)$(this.menuDomId[s]).html("");
e.loadData(function(){
soso.maps.event.trigger(o,"dataInited"),setTimeout(function(){
o.createMenu(window.cityData.sub,0);
},0);
}),this.initCityService();
}
var e=t("setting/multi_citydata.js"),n=t("biz_web/ui/dropdown.js");
return a.prototype=new soso.maps.MVCObject,a.prototype.initCityService=function(){
var t=this;
this.cityService=new soso.maps.CityService({
complete:function(a){
t.map.setCenter(a.detail.latLng),t.map.setZoom(a.detail.level);
}
});
},a.prototype.loadData=function(t){
e.loadData(t);
},a.prototype.setAreaDataByName=function(t,a,n){
var i=this.area[0]&&this.area[0].data?this.area[0].data.name:"",r=this.area[1]&&this.area[1].data?this.area[1].data.name:"",o=this.area[2]&&this.area[2].data?this.area[2].data.name:"";
(i!=t||r!=a||o!=n)&&(this.area=e.getCurDataByName(t,a,n),this.updateSelect(this.area));
},a.prototype.getAreaDataByName=function(t,a,n){
return e.getCurDataByName(t,a,n);
},a.prototype.createMenu=function(t,a,i){
var r,o=this,s=o.menuDomId[a];
o.area[a]&&o.area[a].data&&(r=o.area[a].data.fullname),o[s]&&"function"==typeof o[s].destroy&&o[s].destroy(),
t?(o[s]=new n({
container:s,
label:r||"请选择",
data:t||[],
disabled:t?!1:!0,
callback:function(t,n,r){
for(var s=a+1,u=o.menuDomId.length;u>s;s++){
var d=o.menuDomId[s];
o[d]&&"function"==typeof o[d].destroy&&o[d].destroy(),o.area[s]=null;
}
o.area[a]={
index:r
},o.area=e.getCurDataByIndex(o.area,0,window.cityData),a!=o.menuDomId.length-1&&e.getNextData(o.area,0,window.cityData,function(t){
o.createMenu(t,a+1);
});
var c=o.area[a].data.location;
o.cityService.searchCityByLatLng(new soso.maps.LatLng(c.lat,c.lng)),"function"==typeof i&&i.call(o,a);
}
}),o.area[a]&&o.area[a].data&&(o[s].value=o[s].name=o.area[a].data.fullname)):o[s]=null;
},a.prototype.updateSelect=function(t){
var a=this;
if(!window.cityData.sub||0==window.cityData.sub.length)return void e.loadData(function(){
a.updateSelect(t);
});
for(var n=window.cityData,i=0,r=a.menuDomId.length;r>i;i++)n.end!==!0&&n.sub&&n.sub.length>0?(this.createMenu(n.sub,i),
n=t[i]?n.sub[t[i].index]:{}):(this.createMenu(null,i),n={});
},a;
});