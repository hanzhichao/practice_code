define("cardticket/store_marker.js",["tpl/cardticket/marker_edit.html.js","tpl/cardticket/marker_show.html.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","cardticket/store_cgi.js","common/wx/sosomap/event.js","common/wx/dialog.js","common/wx/stopMultiRequest.js","cardticket/store_helper.js","common/wx/Tips.js","common/wx/sosomap/util.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{
editInfoTpl:i,
showInfoTpl:o
},t),this.sosomap=t.sosomap,this.initDom(),this.initComponet(this.sosomap),this.bindEvent(),
this.setData(t.data);
}
var i=t("tpl/cardticket/marker_edit.html.js"),o=t("tpl/cardticket/marker_show.html.js"),n=(t("biz_web/ui/dropdown.js"),
t("common/wx/Cgi.js")),s=t("cardticket/store_cgi.js"),a=(soso.maps.drawing.OverlayType.MARKER,
t("common/wx/sosomap/event.js")),r=t("common/wx/dialog.js");
t("common/wx/stopMultiRequest.js");
var d=t("cardticket/store_helper.js"),c=t("common/wx/Tips.js"),l=t("common/wx/sosomap/util.js"),m=new soso.maps.Label({
visible:!1,
content:"可以试试拖拽标注设置地址",
offset:new soso.maps.Size(0,0)
}),h=!0;
return e.prototype=new soso.maps.MVCObject,$.extend(e.prototype,a),$.extend(e.prototype,{
loading:!1,
_editting:!1,
delayOpenWindow:!1,
initDom:function(){
this.$dom=$("<div class='abc'></div>");
},
setData:function(t){
t&&(this.getData()||(this._olddata=$.extend(!0,{},t)),t.latLng=new soso.maps.LatLng(t.latitude,t.longitude),
t&&l.fixaddr(t),t.category=t.category&&t.category.split(/:|;/)[0],this.set("data",t));
},
getData:function(){
return this.get("data");
},
initComponet:function(){
var t=this.sosomap.map;
this.infowindow=new soso.maps.InfoWindow({
map:t,
autopan:!0
});
var e=this;
9==document.documentMode&&soso.maps.event.addListener(this.infowindow,"domready",function(){
setTimeout(function(){
$(e.infowindow.getContent()).parent().parent().css("height","auto");
},10);
}),this.marker=new soso.maps.Marker({
map:t,
raiseOnDrag:!0,
icon:this.opt.icon,
zIndex:this.opt.zIndex||1e3
});
},
bindEvent:function(){
var t=this;
this.addrService=new soso.maps.Geocoder({
complete:function(e){
var i=e.detail,o=t,n=o.getData();
if(n&&o.loading){
if(n.error=null,o.loading=!1,i&&i.addressComponents){
var s=l.formatAddress(i);
$.extend(n,s),$(".js_final_address",t.$dom).val(n.finalAddress);
}
o.setData(n),o.delayOpenWindow&&(o.delayOpenWindow=!1,o.openWindow()),t.trigger("marker:getaddrcomplete",e);
}
},
error:function(t){
var e="store_marker getaddr service error:"+(t&&t.detail&&t.detail.errmsg);
(new Image).src="/misc/jslog?level=error&id=61&content="+e;
}
}),this.locService=new soso.maps.Geocoder({
complete:function(e){
if(parseFloat(e.detail.similarity)>=.99&&0==e.detail.pcd_conflict_flag){
var i=t.getData();
i&&(i.error=null),t.sosomap.setCenter(e.detail.location),t.marker.setPosition(e.detail.location),
t.infowindow.setPosition(t.marker),i.latitude=e.detail.location.getLat(),i.longitude=e.detail.location.getLng(),
t.infowindow.open();
}else c.err("找不到地址, 请重新输入");
},
error:function(){}
}),this._initMarkerEvents();
},
show:function(){
var t=this.getData();
this.marker.setVisible(!0),this.marker.setPosition(t.error?this.sosomap.map.getCenter():t.latLng),
this.showLabel();
},
showLabel:function(){
var t=this.getData();
if(this.marker.getDraggable()&&!t.error){
if(!h)return;
m.setVisible(!0),m.setPosition(t.latLng);
}else m.setVisible(!1);
},
openWindow:function(){
if(!this.nowindow){
var t=this.getData();
if(this._editting){
var e=this.$dom,i=$(".js_city_container",e);
return i.find("span").text(t.province+t.city+t.district),i.find("input[name=province]").val(t.province),
i.find("input[name=city]").val(t.city),i.find("input[name=district]").val(t.district),
this.trigger("marker:openwindow"),void this.infowindow.open();
}
this.$dom.html("");
var o=template.compile(this.opt.showInfoTpl)(t);
this.$dom.html(o);
var a=this,m=a.opt;
this.$dom.find(".js_submitcheck").click(function(){
if("function"==typeof m.submitcheck)return m.submitcheck.call(a);
var t=a.getData(),e=$.extend({},t);
return e.data_supply=2,delete e.latLng,delete e.biz_uin,e.category=e.category&&e.category.split(";")[0],
n.post({
url:"/merchant/entityshop?action=add",
data:e,
btn:this
},function(e){
0==e.base_resp.ret?(t.data_supply=2,t.audit_state=3,t.id=e.id,a.refresh(t),a.trigger("marker:datachanged",t)):n.show(e);
}),!1;
}),this.$dom.find(".js_submitcancel").click(function(){
return"function"==typeof m.submitcancel?m.submitcancel.call(a):!1;
}),this.$dom.find(".js_edit").click(function(){
var t=a.getData(),e=a.$dom;
e.html(template.compile(m.editInfoTpl)(t));
var i=($(".js_final_address",e).change(function(){
var t=$.trim($(this).val());
if(t){
var e=a.getData();
e.finalAddress=t,l.getLocation(a.locService,{
province:e.province,
city:e.city,
district:e.district,
finalAddress:t,
street:t
});
}
}),e.find(".js_edit_form"));
d.initCategory(e,t.category),d.initCreateForm(i,function(t){
function e(t){
n.post({
url:"/merchant/entityshop?action=update",
data:t.data,
btn:t.btn
},function(e){
0==e.base_resp.ret?(c.suc("编辑门店成功并提交审核"),$.extend(s,o),s.audit_state=2,a._editting=!1,
a.refresh(s),a.trigger("marker:datachanged",s),t.success&&t.success(),a._olddata=$.extend(!0,{},s)):n.show(e);
});
}
var o=$(t).serializeObject(),s=a.getData();
if(s.error)return void c.err("找不到地址, 请重新输入");
if(o=$.extend({},s,o),o.address=o.province+o.city+o.district+o.street,s.address=o.address,
s.finalAddress=s.street=o.street,delete o.latLng,3==o.audit_state)var d=r.show({
msg:"该门店信息可能正在使用，请确认是否编辑|由于带有门店信息的卡券正在使用中，编辑门店需要提交审核，审核通过后可更新到用户的卡券信息中。",
buttons:[{
text:"提交编辑",
click:function(){
var t=this;
e({
data:o,
btn:d.dom.find(".js_btn")[0],
success:function(){
t.remove();
}
});
}
},{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
});else 4==o.audit_state&&e({
data:o,
btn:i.find(".js_submitcheck")
});
}),a.infowindow.setContent(e[0]),e.find(".js_cancel_edit").click(function(){
a._editting=!1,a.marker.setDraggable(!1),a.showLabel(),a.openWindow();
var t=a.getData();
(a._olddata&&a._olddata.latitude&&a._olddata.longitude&&a._olddata.latitude!=t.latitude||a._olddata.longitude!=t.longitude)&&(t.latitude=a._olddata.latitude,
t.longitude=a._olddata.longitude,a.setData(t));
}),a.infowindow.open(),a.marker.setDraggable(!0),a.showLabel(),a._editting=!0;
}),this.$dom.find(".js_delete").click(function(){
var t=$(this).data("id"),e=$(this).data("state");
s.deleteWithConfirm({
store_id:t,
state:e,
success:function(){
var t=a.getData();
t.audit_state=null,a.trigger("marker:delete",t);
}
});
}),this.infowindow.setContent(this.$dom[0]),this.infowindow.setPosition(this.marker),
this.trigger("marker:openwindow"),setTimeout(function(){
a.infowindow.open();
});
}
},
delayRefresh:function(t){
this.delayOpenWindow=!0,this.setData(t);
},
refresh:function(t){
this.setData(t),this.openWindow();
},
closeWindow:function(){
this.infowindow.close();
},
getFormData:function(){
return $(".js_edit_form",this.$dom).serializeObject();
},
_initMarkerEvents:function(){
var t=this;
soso.maps.event.addListener(t.marker,"dragstart",function(){
m.setVisible(!1),h=!1,t.dragging=!0,t.closeWindow();
}),soso.maps.event.addListener(t.marker,"dragend",function(){
if(t.marker.getDraggable()&&t.dragging===!0){
t.dragging=!1;
var e=this.getPosition(),i=t.getData();
e&&i.error&&(i.error=null),i.latitude=e.lat,i.longitude=e.lng,t.delayOpenWindow=!0,
t.loading=!0,t.addrService.getAddress(e);
}
}),soso.maps.event.addListener(t.marker,"click",function(){
t.opt.nowindow||t.dragging===!0||t.infowindow.get("visible")||(t.openWindow(),t.trigger("marker:updateidx"));
});
},
hide:function(){
this.infowindow.close(),this.marker.setMap(null);
},
data_changed:function(){
this.redraw();
},
redraw:function(t){
var e=this;
t?(clearTimeout(this._timer),this.draw()):this._timer||(this._timer=window.setTimeout(function(){
e._timer=null,e.draw();
}));
},
draw:function(){
var t=this.getData();
return t.province||t.error?void this.show():(this.loading=!0,void this.addrService.getAddress(t.latLng));
},
updateMarker:function(t){
var e=this;
d.updateMarker(e,t,this.getFormData());
},
destroy:function(){
this.hide(),this.$dom.remove(),this.locService&&(this.locService.setComplete(null),
this.locService.setError(null),this.locService=null),this.addrService&&(this.addrService.setComplete(null),
this.addrService.setError(null),this.addrService=null),this.infowindow.setMap(null),
this.infowindow.setContent(""),this.infowindow.setPosition(null),this.marker&&this.marker.setVisible(!1),
soso.maps.event.clearListeners(this),soso.maps.event.clearListeners(this.marker),
soso.maps.event.clearListeners(this.infowindow),this.marker=null;
}
}),e;
});