define("cardticket/store_edit_new.js",["common/wx/sosomap/city_select.js","common/wx/sosomap/map.js","common/wx/sosomap/util.js","tpl/cardticket/marker_show_new.html.js","cardticket/store_marker.js","common/wx/Tips.js","common/wx/Cgi.js","biz_web/lib/store.js","cardticket/multi_pic_upload.js","biz_web/lib/json.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/store_category.js","cardticket/store_helper.js","tpl/simplePopup.html.js","cardticket/simple_search_map.js","tpl/cardticket/marker_drag.html.js","cardticket/common_init.js"],function(e){
"use strict";
function t(){
var e=S.trimdata(T.serializeObject());
if(!e.address)return u.err("请输入详细地址"),$("#searchSubmit").focus(),!1;
if(!e.sosomap_poi_uid){
var t=M.area;
e.province=t[0]&&t[0].data&&t[0].data.fullname||"",e.city=t[1]&&t[1].data&&t[1].data.fullname||"",
e.district=t[2]&&t[2].data&&t[2].data.fullname||"";
}
var a=!1;
if(l.isTerritory(e.province)&&(e.district=e.city,e.city=e.province,e.province="",
a=!0),!e.sosomap_poi_uid){
if(!a&&!e.district&&3==M.area.length)return u.err("请选择省市区再提交"),!1;
if(a&&!e.district)return u.err("请选择省市区再提交"),!1;
}
if(!e.city||!e.latitude||!e.longitude)return u.err("请选择地址或定位"),!1;
var i=(q.toObject(e),q.getValues());
if(e.pic_count=i.length,w){
for(var r=!0,s=["avg_price","desc","open_time","recommend","branch_name","business_name","category","telephone","special","province","city","district","latitude","longitude"],o=0;o<s.length;o++){
var n=s[o];
if(e.hasOwnProperty(n)&&e[n]!=g[n]){
r=!1;
break;
}
}
if(r)for(var o=0;o<e.pic_count;o++){
if(!g.pic_urls){
r=!1;
break;
}
if(g.pic_urls[o]!=e["pic_url"+o]){
r=!1;
break;
}
}
if(r)return u.err("请按照审核意见修改后再次提交"),!1;
}
return e;
}
function a(){}
function i(){
var e=parseFloat($("#js_latitude").val()),t=parseFloat($("#js_longitude").val());
e&&t&&(I.setVisible(!0),I.setPosition(new soso.maps.LatLng(e,t)));
}
function r(){
I&&I.setVisible(!1);
}
function s(){
this.marker_drag_tpl=e("tpl/cardticket/marker_drag.html.js"),this.init();
}
function o(e){
var t=R;
t.map.setCenter(new soso.maps.LatLng(e.lat,e.lng)),t.map.getZoom()<10&&t.map.zoomTo(10);
}
function n(e){
if(M){
var t=e.detail;
if(t&&t.addressComponents){
var a=t.addressComponents;
M.update(a.province,a.city,a.district);
}
}
}
var c=(e("common/wx/sosomap/city_select.js"),e("common/wx/sosomap/map.js")),l=e("common/wx/sosomap/util.js"),p=wx.cgiData,d=e("tpl/cardticket/marker_show_new.html.js"),m=e("cardticket/store_marker.js"),u=e("common/wx/Tips.js"),_=e("common/wx/Cgi.js"),h=e("biz_web/lib/store.js"),v=e("cardticket/multi_pic_upload.js"),j=e("biz_web/lib/json.js"),f="__STORE__business_name_key",b="__STORE__location_key",w=p.data.wx_poi_uid&&4==p.data.audit_state,g=p.data;
"undefined"==typeof soso&&jQuery.ajax({
url:"/misc/jslog?1=1"+wx.data.param,
type:"GET",
data:{
content:"soso map is undefined",
id:127,
level:"error"
}
}),e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js");
var k=e("cardticket/store_category.js"),y=[];
w&&(y=g.category.split(","));
new k({
container:"#js_category_dom .js_category_container",
defaultValues:y,
callback:function(){
var e=this.getNames(),t=e.join(",");
$("#js_category_dom .js_category_value").val(t);
}
});
if(w){
l.isTerritory(g.city)&&!g.province&&(g.province=g.city,g.city=g.district,g.district=""),
$("#js_branch_name").val(g.branch_name),$("#js_wx_poi_uid").val(g.wx_poi_uid),$("#searchSubmit").val(g.address);
for(var x=["avg_price","desc","open_time","recommend","branch_name","wx_poi_uid","business_name","telephone","special","province","city","district","latitude","longitude","id"],C=0;C<x.length;C++)$("#js_"+x[C]).val(g[x[C]]);
}else $("#js_business_name").val(h.get(f));
var S=e("cardticket/store_helper.js"),T=$("#js_store_build");
S.initCreateForm(T,function(){}),T.submit(function(){
return!1;
}),$("#js_submit").click(function(){
if(T.valid()){
var e=t();
if(!e)return!1;
_.post({
url:"/merchant/entityshop?action="+(w?"edit_poi":"add"),
data:e,
btn:this
},function(t){
if(0==t.base_resp.ret){
var a=w?"编辑":"创建";
u.suc(e.sosomap_poi_uid?"新门店"+a+"成功":"新门店"+a+"成功并提交审核"),window.onbeforeunload=null,
h.set(f,e.business_name);
try{
h.set(b,j.stringify(M.area));
}catch(i){}
setTimeout(function(){
location.href=wx.url("/merchant/entityshop?action=list");
},300);
}else 14011==t.base_resp.ret?u.err("请勿添加重复门店"):_.show(t);
});
}
return!1;
});
var O=e("tpl/simplePopup.html.js");
$("#js_preview").click(function(){
if(T.valid()){
var e=t();
if(!e)return!1;
var a=!1,i=h.get("STORE_previewusername"),r=$(template.compile(O)({
label:"请输入微信号，此卡券将发送至该微信号预览。",
value:i
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var t=this.get(),i=t.find(".frm_input"),s=i.val().trim();
return a?!0:s?(a=!0,e.action="preview",e.username=s,_.post({
url:"/merchant/entityshop",
data:e,
complete:function(){
a=!1;
}
},function(e){
if(0==e.base_resp.ret)u.suc("发送预览成功，本预览链接将在12小时后失效，请及时查看"),h.set("STORE_previewusername",s),
r.popup("hide");else switch(e.base_resp.ret){
case 10700:
u.err("你输入的微信号不是你的好友");
break;

case 200021:
u.err("你输入的微信号不存在，请重新输入");
break;

case 10702:
u.err("不能发送此类消息");
break;

case 10701:
u.err("用户已被加入黑名单，无法向其发送消息");
break;

case 200013:
u.err("操作过于频繁，请休息一会，稍后再试");
break;

case 10703:
u.err("对方关闭了接收消息");
break;

default:
_.show(e);
}
}),!0):(u.err("请输入微信号"),i.focus(),!0);
},
onHide:function(){
this.remove();
}
});
r.popup("get").find(".frm_input").focus();
}
return!1;
});
var R;
if(w)R=new c({
container:$("#map"),
lat:g.latitude,
lng:g.longitude
});else var R=new c({
container:$("#map")
});
var z=e("cardticket/simple_search_map.js"),D=[];
try{
w||(D=j.parse(h.get(b)));
}catch(E){
D=[];
}
var V=new soso.maps.MarkerImage(p.iconpath.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72)),P=new z({
CitySelectContainer:"#CitySelectContainer",
searchInput:"#searchSubmit",
map:R,
area:D||[],
onsearch:function(e){
e.length?L&&L.hide():L&&L.show();
},
showInfoTpl:d,
iconpath:p.iconpath,
submitcheck:function(){
var e=this.getData();
$("#js_province").val(e.province),$("#js_city").val(e.city),$("#js_district").val(e.district),
$("#js_latitude").val(e.latitude),$("#js_longitude").val(e.longitude);
var t,a=e.branch_name,r=/^(.+?)\((.+?)\)$/;
return r.test(a)?(t=RegExp.$1,a=RegExp.$2):(t=a,a=""),$("#js_business_name").val(t).prop("readonly",!0).addClass("disabled"),
$("#js_branch_name").val(a).prop("readonly",!0).addClass("disabled"),$("#searchSubmit").val(e.street).prop("readonly",!0).addClass("disabled"),
$("#js_sosomap_poi_uid").val(e.sosomap_poi_uid),e.telephone&&$("#js_telephone").val(e.telephone),
e.imported=!0,P.imported=!0,u.suc("导入门店信息成功"),this.closeWindow(),$("#js_search_pos").hide(),
$("#js_remark").show(),P.clear(),M.update(e.province,e.city,e.district),M.disabled(),
i(),!1;
},
submitcancel:function(){}
});
$("#js_remark").click(function(){
return $("#js_business_name").prop("readonly",!1).removeClass("disabled"),$("#js_branch_name").prop("readonly",!1).removeClass("disabled"),
$("#searchSubmit").prop("readonly",!1).addClass("disabled"),$("#js_latitude").val(""),
$("#js_longitude").val(""),$("#js_sosomap_poi_uid").val(""),$(this).hide(),$("#js_search_pos").show(),
P.imported=!1,M.enable(),r(),!1;
});
var I;
s.prototype={
init:function(){
var e=this,t=new m({
sosomap:R,
icon:V,
showInfoTpl:this.marker_drag_tpl,
submitcheck:function(){
var t=this.getData();
return $("#js_latitude").val(t.latitude),$("#js_longitude").val(t.longitude),P.clear(),
i(),e.hide(),!1;
},
submitcancel:function(){}
});
this.marker=t;
},
show:function(){
{
var e=this.marker;
e.getData();
}
e.setData({
error:1
}),e.marker.setVisible(!0),e.openWindow(),e.marker.setDraggable(!0),r();
for(var t=M.area,a="",i=0;i<t.length;i++)t[i]&&(a+=t[i].data.fullname);
$("#js_dialog_address").text(a+$("#searchSubmit").val());
},
hide:function(){
var e=this.marker;
e.marker.setVisible(!1),e.closeWindow();
}
};
var L=new s;
$("#js_mark_position").delegate("#js_open_mark","click",function(){
return P.searching&&(P.cancel_search=!0),P.clear(),a(!0),L&&L.show(),$("#js_remark").click(),
!1;
}),$("#js_search_pos").click(function(){
return P.search(),L&&L.hide(),$("#js_latitude").val(""),!1;
});
var M=P.citySelect;
M.on("city:changed",o),w&&M.on("city:datainit",function(){
M.update(g.province,g.city,g.district);
}),R.on("sosomap:getaddrcomplete",function(e){
n(e);
}),R.onidleonce(function(){
I=new soso.maps.Marker({
icon:V,
map:R.map
}),w&&i(),setTimeout(function(){
a(!1);
},1e3);
}),window.onbeforeunload=function(){
return"确认不提交门店，离开此页？";
};
var F=wx.cgiData.data,W=F.pic_url;
$.isArray(W)||(W=[W]);
var q=new v({
data:F.pic_urls,
container:"#js_upload_wrp"
});
e("cardticket/common_init.js");
});