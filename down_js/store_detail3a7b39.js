define("cardticket/store_detail.js",["biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","cardticket/parse_data.js","common/wx/pagebar.js","common/wx/media/imageDialog.js","cardticket/multi_pic_upload.js","cardticket/store_helper.js","cardticket/send_card.js","cardticket/common_template_helper.js","common/wx/stopMultiRequest.js"],function(t){
"use strict";
function e(t){
t.business_name||(t.business_name=t.branch_name,t.branch_name=""),t.pic_url&&(t.pic_url=(t.pic_url+"").http2https()),
t.card_list||(t.card_list=[]),h=p.parse_cardlist(t.card_list),j=h.card_cache,t.card_list=h.card_list;
for(var e=0;e<t.card_list.length;e++)if(t.card_list[e].display){
t.__has_card=!0;
break;
}
return t;
}
function a(t){
var e="string"==typeof t?t:t+"";
return k.test(e)?e:/^https?:\/\/mp\.weixin\.qq\.com\/mp\/redirect/.test(e)?e.replace("http://mp.weixin.qq.com/mp/redirect?url=","https://mp.weixinbridge.com/mp/wapredirect?url="):x.test(e)?e.replace("http://mp.weixinbridge.com/mp/wapredirect?url=","https://mp.weixinbridge.com/mp/wapredirect?url="):"https://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent("string"==typeof t?t:t+"");
}
function i(t){
var e="string"==typeof t?t:t+"";
return x.test(e)?decodeURIComponent(e.replace(x,"")):e;
}
function r(){
q={
begin:0,
count:5,
total:0,
currentPage:1
},z=[],D=[];
for(var t=0;t<h.card_list.length;t++){
var e=h.card_list[t];
e.display&&(D.push(e.id),z.push(e));
}
$("#js_cardlist").on("click",".js_updatepoipic",function(){
var t=$(this);
_({
maxSelect:1,
desc:"建议尺寸：150像素 * 96像素",
onOK:function(e){
t.closest("tr").find(".js_poi_logo_p").html('<img class="card_item_avatar js_poilogo" src="%s"/>'.sprintf(e[0].url));
var a=t.attr("cardid");
a&&j[a]&&(j[a].poi_pic_url=e[0].url),this.destroy();
},
onCancel:function(){
this.destroy();
}
});
}),$("#js_cardlist").on("click",".js_removecard",function(){
for(var t=$(this).attr("cardid"),e=z,a=0;a<e.length;a++)if(e[a].id==t){
e.splice(a,1),(q.currentPage-1)*q.count>=e.length&&q.currentPage>1&&(q.currentPage--,
q.begin=(q.currentPage-1)*q.count);
break;
}
$(this).closest("tr").remove(),c();
});
}
function c(t){
if(t||(t=z),q.total=t.length,z=t,$("#js_cardlist").html(template.render("js_cardlist_tpl",{
select_cards:t,
pageinfo:q
})),q.total>q.count){
new d({
container:$(".js_cardpagebar"),
perPage:q.count,
initShowPage:q.currentPage,
totalItemsNum:q.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
q.currentPage=e,q.begin=(q.currentPage-1)*q.count,c(z);
}
});
}else $(".js_cardpagebar").html("");
D=[];
for(var e=0;e<t.length;e++)D.push(t[e].id);
}
var s=wx.cgiData.data,o=(t("biz_web/utils/upload.js"),t("common/wx/Cgi.js")),n=t("common/wx/Tips.js"),l=t("common/wx/tooltips.js"),p=t("cardticket/parse_data.js"),d=t("common/wx/pagebar.js"),_=t("common/wx/media/imageDialog.js"),m=t("cardticket/multi_pic_upload.js"),u=t("cardticket/store_helper.js");
"undefined"==typeof soso&&jQuery.ajax({
url:"/misc/jslog?1=1"+wx.data.param,
type:"GET",
data:{
content:"soso map is undefined",
id:127,
level:"error"
}
}),template.helper("$addtokeninhref",function(t){
var e=/\?action=detail&id=(\d+)/;
return t.replace(e,wx.url("?action=detail&id=$1"));
});
var h,j,g=t("cardticket/send_card.js");
e(s),t("cardticket/common_template_helper.js"),$("#js_detail_head").html(template.render("js_detailhead_tpl",s)),
$("#js_preview").html(template.render("js_preview_tpl",s));
var w=new soso.maps.MarkerImage(wx.cgiData.iconpath.pin_big,new soso.maps.Size(26,26),new soso.maps.Point(0,72)),f=new soso.maps.LatLng(s.latitude,s.longitude),b=new soso.maps.Map($("#map")[0],{
center:f,
zoom:16,
mapTypeControl:!1,
panControl:!1,
zoomControl:!1,
scrollwheel:!1,
scaleControl:!1,
disableDoubleClickZoom:!0,
draggable:!1
}),v=new soso.maps.Marker({
map:b,
icon:w,
position:f
});
v.setVisible(!0),v.setMap(b),v.setPosition(f);
var x=/^https?:\/\/mp\.weixinbridge\.com\/mp\/wapredirect\?url=/,k=/^http:\/\/mmbiz\.qpic\.cn\/|https:\/\/mmbiz\.qlogo\.cn\//,y=wx.cgiData.data,P=y.pic_urls;
if("[object Array]"==={}.toString.call(P)||(P=P?[P]:[]),P.length){
for(var C=0;C<P.length;C++)P[C]=a(P[C]);
{
new m({
data:P,
container:"#js_pic_url_preview",
type:"preview"
});
}
}else $("#js_pic_url_preview").html("无");
t("common/wx/stopMultiRequest.js");
var q,z,D=[];
$("#js_update").click(function(){
$(".js_preview_container").hide(),$("#js_detail_head").hide(),$("#js_edit_container").show().html(template.render("js_update_tpl",s));
var t=new m({
data:P,
container:"#js_upload_wrp"
}),e=$("#js_store_update");
u.initCreateForm(e,function(){}),e.submit(function(){
return!1;
}),$("#js_update_submit").click(function(){
if(e.valid()){
var a=e.serializeObject();
a=$.extend({},wx.cgiData.data,a);
var r=(t.toObject(a),t.getValues());
a.pic_count=r.length;
for(var c=0;c<r.length;c++)a["pic_url"+c]=i(a["pic_url"+c]);
var s=$("#js_cardlist tr");
a.card_count=s.length,s.each(function(t){
var e=$(this).attr("data-id"),i=$(this).find(".js_poilogo").attr("src");
e&&(a["card_poi_pic"+t]=(i||"").https2http(),a["card_id"+t]=e);
}),a.card_list&&delete a.card_list,a.pic_urls&&delete a.pic_urls,o.post({
url:"/merchant/entityshop?action=update",
data:a,
btn:this
},function(t){
0==t.base_resp.ret?(n.suc("服务信息修改建议已提交审核"),location.reload()):13901==t.base_resp.ret?n.err("最多只能选择10张卡券"):o.show(t);
});
}
return!1;
}),$("#js_cancel_update").click(function(){
$("#js_edit_container").hide(),$(".js_preview_container").show(),$("#js_detail_head").show();
}),$("#js_select_card").click(function(){
var t=h.card_list,e=new g({
multi:!0,
data:t,
hasdata:!0,
defaultValues:D,
selectComplete:function(t){
c(t),e=null;
}
});
e.show();
}),wx.cgiData.can_use_card&&(r(),c()),new l({
container:$(".js_poipic_ask"),
content:"用于商户详情页，请提交与卡券相关图片。建议尺寸：150像素×96像素。图片支持.jpg .jpeg .bmp .png格式，大小不超过5M。",
type:"hover"
}),window.scrollTo(0,0);
}),new l({
container:$(".js_validity_flag"),
content:"优质门店将有机会推荐至附近的人，如何成为优质门店，请查看右上角《公众平台门店信息填写规范》",
type:"hover"
}),4==s.audit_state?$("#js_edit").show():$("#js_edit").hide();
});