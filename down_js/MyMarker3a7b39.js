define("setting/MyMarker.js",["common/wx/dialog.js"],function(t){
"use strict";
function s(){}
function e(){}
function n(){}
function i(t){
return function(s){
return s instanceof t;
};
}
function o(t,n){
var i=this;
this.$button=$(n),this.infowindow=new soso.maps.InfoWindow({
map:t
});
var o=this.drawingMgr=new soso.maps.drawing.DrawingManager({
drawingControl:!1,
map:t
}),l=this.myMarker=new soso.maps.Marker({
map:t,
raiseOnDrag:!0,
zIndex:1e3
}),p=new u(this.infowindow);
p.bindTo("status",l),soso.maps.event.addListener(p,"submit",function(){
var t=this.get("status"),s=new e;
s.set("latlng",t.get("latlng")),s.set("address",t.get("address")),s.set("name",t.get("name")),
l.set("status",s),t.reset();
}),soso.maps.event.addListener(l,"status_changed",function(){
o.setDrawingMode(null),r(i,this),a(i,this);
var t=this.get("status");
g(t)&&soso.maps.event.trigger(i,"complete",t.toResultObject());
}),this.$button.click(function(){
o.setDrawingMode(o.getDrawingMode()==f?null:f);
}),soso.maps.event.addListener(o,"drawingmode_changed",function(){
d(i);
}),d(i),soso.maps.event.addListener(o,"markercomplete",function(t){
var e=new s;
e.set("latlng",t.getPosition()),t.setMap(null),l.set("status",e),i.openInfowindow();
});
}
function a(){}
function r(t,s){
var e=s.get("status");
l(s);
var n=s._evts=[];
if(c(e)){
var i=!1;
n.push(soso.maps.event.addListener(s,"dragstart",function(){
i=t.infowindow.get("visible"),i&&t.closeInfowindow();
})),n.push(soso.maps.event.addListener(s,"dragend",function(){
var e=s.get("status");
e&&(e.reset(),e.set("latlng",this.getPosition())),i&&t.openInfowindow();
})),s.setDraggable(!0);
}else g(e)?s.setDraggable(!1):w(e)&&s.setDraggable(!1);
e&&e.get("latlng")?(s.setPosition(e.get("latlng")),n.push(soso.maps.event.addListener(s,"click",function(){
t.openInfowindow();
}))):s.setPosition(null);
}
function d(t){
var s;
s=t.drawingMgr.getDrawingMode()===f,s?(t.$button.addClass("selected"),setTimeout(function(){
$(".smnoprint:eq(1)").addClass("crosspoint"),$(".smnoprint:eq(2)").addClass("crosspoint");
},100)):(t.$button.removeClass("selected"),$(".smnoprint:eq(1)").removeClass("crosspoint"),
$(".smnoprint:eq(2)").removeClass("crosspoint"));
}
function l(t){
t._evts&&($.each(t._evts,function(t,s){
soso.maps.event.removeListener(s);
}),t._evts=null);
}
function u(t){
this.infowindow=t,this.$infowinDiv=$('<div class="map_correct_panel"></div>'),this.$infowinDiv.css("width",200),
t.setContent(this.$infowinDiv[0]),this.listeners=[],this.isEditAddress=!1;
}
var p=t("common/wx/dialog.js");
s.prototype=new soso.maps.MVCObject,s.prototype.redraw=function(t){
var s=this;
t?(clearTimeout(s._timer),s.draw()):s._timer||(s._timer=window.setTimeout(function(){
s._timer=null,s.draw();
}));
},s.prototype.draw=function(){
{
var t=this,s=t.get("latlng"),e=t.get("address");
t.get("name");
}
if(s&&!e){
var n=t._geocoder;
n||(n=t._geocoder=new soso.maps.Geocoder({
complete:function(s){
var e=s.detail,n="未知地点";
e&&e.address&&(n=e.address),t.set("address",n);
},
error:function(){
t.set("address","未知地点");
}
})),n.getAddress(s);
}
soso.maps.event.trigger(this,"update");
},s.prototype.changed=function(){
this.redraw();
},s.prototype.reset=function(){
this.set("name",null),this.set("latlng",null),this.set("address",null);
},e.prototype=new soso.maps.MVCObject,e.prototype.toResultObject=function(){
return{
latlng:this.get("latlng"),
address:this.get("address")||null,
name:this.get("name")
};
},n.prototype=new soso.maps.MVCObject,n.prototype.readOnly=!0,n.prototype.toResultObject=function(){
return{
latlng:this.get("latlng"),
address:this.get("address")||null,
name:this.get("name")
};
};
var c=i(s),g=i(e),w=i(n),f=soso.maps.drawing.OverlayType.MARKER;
return o.prototype=new soso.maps.MVCObject,o.prototype.openInfowindow=function(){
this.infowindow.setPosition(this.myMarker),this.infowindow.open();
},o.prototype.closeInfowindow=function(){
this.infowindow.setPosition(null),this.infowindow.close();
},o.prototype.setData=function(t,i){
if(t&&t.latlng){
var o=i?e:s;
2===i&&(o=n);
var a=new o;
a.set("latlng",t.latlng),a.set("name",t.name),a.set("address",t.address),this.myMarker.set("status",a);
}else this.myMarker.set("status",null);
},u.prototype=new soso.maps.MVCObject,u.prototype.status_changed=function(){
var t=this,s=this.get("status"),e=this.listeners;
t.isEditAddress=!1,this.lastStatus&&($.each(this.listeners,function(t,s){
soso.maps.event.removeListener(s);
}),e.length=0,this.lastStatus=null),s&&(c(s)&&e.push(soso.maps.event.addListener(s,"update",function(){
t.isEditAddress=!1,t.draw();
})),this.lastStatus=s),this.draw();
},u.prototype.draw=function(){
this.clear();
var t=this,s=this.get("status");
if(s){
var e=s.get("name")||"",n=s.get("address")||"",i=(s.get("latlng")||"",this.$infowinDiv),o=[];
if(e&&o.push("<div>"+e+"</div>"),n=n.html(!0),c(s))if(this.isEditAddress)o.push('<div><input type="text" value="'+n+'" qn="newAddress" /><input type="button" class="btn btn_primary btn_correct" value="确定" qn="sureAddress"/></div>');else{
var a=n?'<span qn="editAddress" class="correct_link">更正信息</span>':"";
o.push("<div><span>地址："+(n||"loading...")+"</span>"+a+"</div>"),o.push('<div><input type="button" class="btn btn_primary" value="设为我的位置" qn="submit" /></div>');
}else o.push("<div><span>地址："+n+"</span></div>");
i.html(o.join("")),this.isEditAddress?i.find("*[qn=sureAddress]").click(function(){
t.isEditAddress=!1,s.set("address",i.find("*[qn=newAddress]").val()),t.draw();
}):(i.find("*[qn=editAddress]").click(function(){
t.isEditAddress=!0,t.draw();
}),i.find("*[qn=submit]").click(function(){
p.show({
type:"warn",
title:"提示",
msg:"|确定把以下地址设为你的位置吗？<br /><br /><span class='location_ico'> </span> "+t.lastStatus.address.html(!0),
buttons:[{
text:"确定",
click:function(){
this.remove(),soso.maps.event.trigger(t,"submit");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
})),this.infowindow.setContent(i[0]);
}
},u.prototype.clear=function(){
this.infowindow.setContent(null),this.$infowinDiv.off(),this.$infowinDiv.html("");
},o;
});