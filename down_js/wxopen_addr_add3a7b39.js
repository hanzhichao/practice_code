define("wxopen/wxopen_addr_add.js",["biz_web/ui/checkbox.js","common/wx/sosomap/map.js","cardticket/store_marker.js","biz_web/utils/upload.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/jquery.validate.js","common/wx/stopMultiRequest.js"],function(e){
"use strict";
function t(){
return f.filter("input:checked").val();
}
function a(e,t,a,r){
var i='<div class="upload_preview_item">                 <img src="%s" style="width:200px;">                 <a class="file_opr js_delete_preview_file" data-idx="%s" data-key="%s" href="javascript:void(0);">删除</a>             </div>';
if("bizmedia"==r)var s=p.mediaFileUrl(e);else if("preview"==r)var s=p.tmpFileUrl(e);else if("multimedia"==r)var s=p.multimediaFileUrl(e);
return i.sprintf(s,t,a);
}
function r(e){
$(".js_select_file").each(function(){
var t=$(this),r=t.attr("id"),i=t.attr("data-key"),s=t.attr("data-max")||1,n=t.attr("data-type")||2;
l.data[i]||(l.data[i]=[]);
var d=l.data[i];
!function(t,r,i,n){
b[t]=n.length,p.uploadTmpFile({
container:"#"+t,
multi:s>1?!0:!1,
type:r,
onSelect:function(){
b[t]=b[t]+1;
},
onError:function(){
b[t]=b[t]-1;
},
onCancel:function(){
b[t]=b[t]-1;
},
onComplete:function(r,d,o,c){
var _=c.content||"";
if(0==c.base_resp.ret){
var u=$("#"+t+"_preview");
1>=s?(n=l.data[i]=[_],u.html(a(_,n.length,i,"preview",o.name))):(n.push(_),u.append(a(_,n.length,i,"preview",o.name))),
u.parent().find(".fail").remove(),$("#"+t+"_hidden").val(n.join("|")),e&&e(_),h.suc("上传成功");
}
}
});
}(r,n,i,d);
});
}
function i(){
return y.serializeObject();
}
function s(e){
$("#js_related_credential_error").show().find(".frm_msg_content").text(e).show();
}
function n(){
$("#js_location_error").hide();
}
function d(e){
$("#js_location_error").show().find(".frm_msg_content").text(e).show();
}
function o(e){
if($(e).length){
var t=$(e).offset();
window.scrollTo(0,Math.max(0,t.top-10));
}
}
var l=(e("biz_web/ui/checkbox.js"),wx.cgiData),c=e("common/wx/sosomap/map.js"),_=e("cardticket/store_marker.js"),u="<div><h4>确认定位地址：</h4><span>%s</span></div>",p=e("biz_web/utils/upload.js"),m=1,f=$(".js_add_type");
f.checkbox({
onChanged:function(e){
1==$(e).val()?$(".js_add_type2_show").hide():$(".js_add_type2_show").show(),m=$(e).val();
}
}),f.filter("input:checked").click(),$(".js_related_name").text("("+l.data.name+")"),
$("#js_related_address").val(l.qualification_address);
var v,l=wx.cgiData,h=e("common/wx/Tips.js"),j=e("common/wx/Cgi.js"),w=(e("biz_common/jquery.validate.js"),
{});
$("#js_search_pos").click(function(){
var e=$.trim($("#js_related_address").val());
e&&(w={},v&&v.destroy(),v=null,j.post({
url:"/cgi-bin/entityshopv2?action=getaddressgps",
data:{
address:e
},
btn:this
},function(t){
if(0==t.base_resp.ret){
var a=t.longitude,r=t.latitude;
v=new _({
sosomap:k,
icon:g,
showInfoTpl:u.sprintf(e),
data:{
latitude:r,
longitude:a
}
}),k.setCenter(new soso.maps.LatLng(r,a)),v.show(),v.marker.setDraggable(!1),v.openWindow(),
w.latitude=r,w.longitude=a,n();
}else d("无法定位经营资质地址");
}));
}),$("#js_related_address").keyup(function(e){
return wx.isHotkey(e,"enter")?($("#js_search_pos").click(),!1):($(this).val()&&n(),
!1);
}),e("common/wx/stopMultiRequest.js");
var b={};
$(".js_add_store_new").on("click",".js_delete_preview_file",function(){
var e=$(this).attr("data-key"),t=parseInt($(this).attr("data-idx"));
$(this).parent().remove();
var a=l.data[e];
a.splice(t,1),$("#js_"+e+"_hidden").val(a.join("|")),b["js_"+e]=b["js+"+e]-1;
}),r();
var g=new soso.maps.MarkerImage(l.iconpath.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72)),x=(l.data,
{
lat:39.916528,
lng:116.397129
}),k=new c({
container:$("#map")
});
k.callmap("setOptions",{
center:new soso.maps.LatLng(x.lat,x.lng),
zoom:16,
scrollwheel:!1,
scaleControl:!1,
disableDoubleClickZoom:!0,
draggable:!1
}),$.validator.addMethod("related_credential",function(e,t){
return e=$.trim(e),this.optional(t)||/^[-0-9a-zA-Z]{10}$/.test(e)||/^[-0-9a-zA-Z]{15}$/.test(e)||/^[-0-9-zA-Z]{18}$/.test(e)||/^[-0-9-zA-Z]{20}$/.test(e)||(3==l.realname_type||4==l.realname_type)&&"无"==e;
});
var y=$("#js_store_build");
y.validate({
rules:{
related_name:{
required:{
depends:function(){
return 2==t();
}
}
},
related_credential:{
required:!0,
related_credential:!0
},
related_address:{
required:!0
},
related_proof_material:{
required:{
depends:function(){
return 2==t();
}
}
}
},
ignore:[],
messages:{
related_name:{
required:"请填写经营资质名称"
},
related_credential:{
required:"请填写经营资质证件号",
related_credential:"请输入15位营业执照注册号；或9位组织机构代码，如12345678-9；或18位或20位的统一社会信用代码"
},
related_address:{
required:"请填写经营资质地址"
},
related_proof_material:{
required:"请上传证明材料"
}
},
errorPlacement:function(e,t){
var a=t.closest(".frm_controls"),r=a.find(".frm_tips");
r.length?e.insertBefore(r):e.appendTo(a);
},
submitHandler:function(){},
invalidHandler:function(e,t){
var a=$(t.errorList[0].element);
a.focus();
}
}),y.submit(function(){
return!1;
}),$("#js_submit").click(function(){
if(y.valid()){
var e=i();
if(!e)return!1;
if(!w.latitude)return d("请点击“定位”按钮获取位置"),$("#js_related_address").focus(),o("#js_related_address"),
!1;
l.is_edit?e.poi_id=l.poi_id:(1==t()&&(e.related_name=l.data.name,e.related_proof_material=""),
e.related_credential=$.trim(e.related_credential),3!=wx.cgiData.realname_type&&4!=wx.cgiData.realname_type||"无"!=e.related_credential||(e.related_credential="")),
j.post({
url:"/cgi-bin/entityshopv2?action="+(l.is_edit?"edit":"add"),
data:e,
btn:this
},function(e){
0==e.base_resp.ret?($("#js_step_add_suc").show(),$("#js_step_add").hide(),h.suc("提交成功")):240003==e.base_resp.ret?(d("地点已被其它小程序占用"),
o("#js_related_address")):24e4==e.base_resp.ret?(s("该经营资质已添加，请勿重复添加。"),o("#js_related_credential")):240002==e.base_resp.ret?h.err("附近地点添加数量达到上线，无法继续添加"):j.show(e);
});
}
return!1;
});
});