define("cardticket/create_shop.js",["tpl/cardticket/create_shop.html.js","common/wx/sosomap/city_select.js","common/wx/sosomap/util.js","common/wx/sosomap/event.js","cardticket/store_helper.js","common/wx/Tips.js","common/wx/Cgi.js","cardticket/store_marker.js"],function(e){
"use strict";
function t(e){
this.opt=$.extend(!0,{},d,e),this._init();
}
var a=e("tpl/cardticket/create_shop.html.js"),r=e("common/wx/sosomap/city_select.js"),o=template.compile(a),i=e("common/wx/sosomap/util.js"),s=e("common/wx/sosomap/event.js"),n=e("cardticket/store_helper.js"),c=e("common/wx/Tips.js"),m=e("common/wx/Cgi.js"),l=e("cardticket/store_marker.js"),d={
container:null,
className:"",
data:{},
area:null,
map:null,
cityData:null
},p=wx.cgiData.iconpath;
return t.prototype=new soso.maps.MVCObject,$.extend(t.prototype,s),$.extend(t.prototype,{
_init:function(){
var e=this.opt,t=this;
this.$dom=$(e.container),this.$dom.html(o({
className:e.className
})),this.$dom.find(".js_cancel_create").click(function(){
s.off("blur"),e.onCancel&&e.onCancel();
}),this.citySelect=new r({
container:this.$dom.find(".js_city_container"),
cityData:e.cityData,
area:e.area
}),this.updateArea(e.area),this.marker=new l({
sosomap:e.map,
icon:new soso.maps.MarkerImage(p.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72))
}),this.marker.marker.setDraggable(!0),this.marker.on("marker:getaddrcomplete",function(e){
var a=e.detail.addressComponents,r=e.detail.address;
$(".js_final_address",t.$dom).val(r.replace(a.country,"").replace(a.province,"").replace(a.city,"").replace(a.district,"")),
t.updateMarker(e);
}),this.category_menu=n.initCategory(this.$dom);
var a=$(".js_edit_form",this.$dom);
$(".js_submitcheck",this.$dom).click(function(){
a.submit();
});
var s=$(".js_final_address",this.$dom).change(function(){
var e=$.trim($(this).val());
if(e){
var a=i.area2addr(t.citySelect.area);
a.finalAddress=e,i.getLocation(t.locService,a);
}
});
$(".js_branch_name",this.$dom).blur(function(){
var e=t.marker.getData();
e&&(e.branch_name=$.trim($(this).val()),t.marker.setData(e),t.marker.openWindow());
}),$(".js_telephone",this.$dom).blur(function(){
var e=t.marker.getData();
e&&(e.telephone=$.trim($(this).val()),t.marker.setData(e),t.marker.openWindow());
}),this.citySelect.on("city:changed",function(t){
var a=e.map;
a.map.setCenter(new soso.maps.LatLng(t.lat,t.lng)),a.map.getZoom()<10&&a.map.zoomTo(10),
s.blur();
}),this.locService=new soso.maps.Geocoder({
complete:function(a){
if(parseFloat(a.detail.similarity)>=.99&&0==a.detail.pcd_conflict_flag){
var r=t.marker.getData();
r&&(r.error=null);
var o=e.map;
o.map.panTo(a.detail.location),t.updateMarker(a);
}else{
var r=t.marker.getData()||{};
r.error=1,t.marker.setData(r),t.marker.openWindow();
}
},
error:function(){}
}),n.initCreateForm(a,function(a){
var r=$(a).serializeObject(),o=t.marker.getData();
if(!o||o.error)return void c.err("找不到地址, 请重新输入");
r.data_supply=1;
var i=t.citySelect.getSelectedValue();
$.extend(r,i),r.latitude=o.latitude,r.longitude=o.longitude,r.address=o.address,
delete r.latLng,m.post({
url:"/merchant/entityshop?action=add",
data:r,
btn:$(a).find(".js_submitcheck")
},function(a){
0==a.base_resp.ret?(c.suc("创建门店成功并提交审核"),r.audit_state=2,t.marker.destroy(),e.onCancel&&e.onCancel(r)):m.show(a);
});
});
},
getFormData:function(){
return $(".js_edit_form",this.$dom).serializeObject();
},
update:function(e,t,a){
this.citySelect&&this.citySelect.update(e,t,a);
},
updateArea:function(e){
this.citySelect&&this.citySelect.updateSelect(e);
},
getAreaData:function(){
return this.citySelect.getAreaData();
},
updateMarker:function(e){
var t=this.marker;
n.updateMarker(t,e,this.getFormData());
},
destroy:function(){
this.marker.destroy(),this.off();
}
}),t;
});