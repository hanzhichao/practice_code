define("cardticket/marker_mgr.js",["cardticket/store_marker.js"],function(r){
"use strict";
function t(){
this.markers=[];
}
function e(r,t){
return r.lat.toFixed(5)===t.lat.toFixed(5)&&r.lng.toFixed(5)===t.lng.toFixed(5);
}
var n=r("cardticket/store_marker.js");
return t.prototype={
markers:null,
clear:function(){
for(var r=0;r<this.markers.length;r++)this.markers[r].destroy();
return this.markers=[],this;
},
add:function(r){
var t=new n(r),e=this;
return t.on("marker:openwindow",function(){
e.hideAll();
}),this.markers.push(t),t;
},
deleteMarker:function(r,t){
for(var e=0;e<this.markers.length;e++){
var n=this.markers[e],s=n.getData();
if(null!=s&&s.latLng&&s.latLng.equals(new soso.maps.LatLng(r,t)))return n.destroy(),
this.markers.splice(e,1),e;
}
return-1;
},
find:function(r,t){
for(var n=0;n<this.markers.length;n++){
var s=this.markers[n],i=s.getData();
if(null!=i&&i.latLng&&e(i.latLng,new soso.maps.LatLng(r,t)))return s;
}
return null;
},
show:function(r,t){
var e=this.find(r,t);
e&&(this.hideAll(),e.openWindow());
},
hideAll:function(){
for(var r=0;r<this.markers.length;r++)this.markers[r].closeWindow();
},
hideAllMarker:function(){
this.hideAll();
for(var r=0;r<this.markers.length;r++)this.markers[r].marker.setVisible(!1);
},
showAllMarker:function(){
for(var r=0;r<this.markers.length;r++)this.markers[r].marker.setVisible(!0);
},
findByIndex:function(r){
return this.markers[r];
},
indexOf:function(r){
for(var t=0;t<this.markers.length;t++)if(r==this.markers[t])return t;
return-1;
}
},t;
});