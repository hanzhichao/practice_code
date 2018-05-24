define("scan/item_service.js",["common/wx/inputCounter.js","biz_web/utils/upload.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_common/jquery.validate.js","biz_web/lib/json.js","cardticket/send_card.js"],function(e,t,n){
"use strict";
function a(e,t){
for(var n=0;n<x.length;n++)x[n].flag=!0;
k[e]=t,$(".item_service .jsBtLabel").each(function(e){
for(var t=$(this).html(),n=0;n<x.length;n++)x[n].name==t&&(k[e]=n,3!==x[n].value&&4!==x[n].value&&(x[n].flag=!1));
}),i();
}
function i(){
for(var e=["#js_select_service1","#js_select_service2","#js_select_service3","#js_select_service4"],t=[".service1",".service2",".service3",".service4"],n=0;n<e.length;n++){
for(var i=[],o=0;o<x.length;o++)n>0&&"video"==x[o].type||1==x[o].flag&&i.push(x[o]);
!function(n){
var o=null!==k[n]?x[k[n]].name:"未选择";
null!==k[n]&&3!==k[n]&&4!==k[n]&&m(o),new w({
container:e[n],
label:o,
data:i,
callback:function(i,o){
var l=["tpl_video","tpl_public","tpl_coupon","tpl_custom","tpl_none"],s=0==n?!0:!1;
$(".item_service .jsBtLabel").eq(n).html(o),$(e[n]).parents(t[n]).find(".js_select_service").html(template.render(l[i],{
data:{},
showUpload:s
})),r(),a(n,i),p();
},
search:!1
});
}(n);
}
}
function r(){
function e(e,t){
e.find(".js_upload_btn").hide(),e.find(".js_preview_item").show().find("img").attr("src",t),
e.find("input[name=img_name]").val(t);
}
function t(e){
e.find(".js_upload_btn").show(),e.find(".js_preview_item").hide(),e.find("input[name=img_name]").val("");
}
for(var n=["#js_appmsg_upload_cover","#js_public_upload_cover","#js_coupon_upload_cover","#js_custom_upload_cover"],a=0;a<n.length;a++)0!=$(n[a]).length&&!function(a){
var i=$(n[a]).parents(".upload_box");
""!=i.find("input[name=img_name]").val()?e(i,i.find("input[name=img_name]").val()):t(i),
i.find(".js_btn_delete").on("click",function(){
t(i);
}),g({
multi:!1,
type:2,
container:n[a],
onComplete:function(t,n,a,r){
switch(+r.base_resp.ret){
case 0:
var o=r.content;
e(i,o),b.suc("上传成功"),p();
break;

case 200034:
b.err("尺寸必须为580*320像素，大小不能超过120K。");
break;

case 1:
b.err("图片太大");
break;

case 200011:
b.err("请上传合法的图片格式");
break;

default:
b.err("上传图片失败");
}
}
});
}(a);
$("input[name=public_tips_name]").length>0&&l("input[name=public_tips_name]",12),
$("input[name=coupon_tips_name]").length>0&&l("input[name=coupon_tips_name]",43),
$("input[name=custom_name]").length>0&&l("input[name=custom_name]",20),$("#importCoupon").click(function(e){
e.preventDefault();
var t=new y({
multi:!1,
selectComplete:function(e){
return e?(localStorage.setItem("scan_cardInfo",j.stringify2(e)),$("input[name='coupon_name']").val(e.id),
$("#coupon_show").html(template.render("tpl_coupon_show",{
data:e
})),void p()):void b.err("请选择卡券");
},
source:"直接群发卡券"
});
t.show();
});
}
function o(){
v.validate({
ignore:".js_input_ignore",
rules:{
url_name:{
required:!0,
url:!0,
isTencentVideoUrl:!0
},
img_name:{
required:!0
},
public_name:{
required:!0,
maxlength:20
},
public_tips_name:{
required:!0,
maxlength:12
},
coupon_name:{
required:!0
},
coupon_tips_name:{
required:!0,
maxlength:43
},
custom_name:{
required:!0,
maxlength:20
},
custom_url_name:{
required:!0,
url:!0
}
},
messages:{
url_name:{
required:"请填写腾讯视频链接",
url:"请填写腾讯视频链接",
isTencentVideoUrl:"请填写腾讯视频链接"
},
img_name:{
required:"请上传视频封面图片"
},
public_name:{
required:"请填写公众号名称",
maxlength:"公众号名称过长"
},
public_tips_name:{
required:"请填写公众号描述信息",
maxlength:"公众号描述信息过长"
},
coupon_name:{
required:"请选择卡券"
},
coupon_tips_name:{
required:"请填写领取卡券提示",
maxlength:"领取卡券提示名称过长"
},
custom_name:{
required:"请填写自定义名称",
maxlength:"自定义名称过长"
},
custom_url_name:{
required:"请填写自定义链接",
url:"请填写正确格式的链接"
}
},
errorPlacement:function(e,t){
var n=t.parent().parent();
n.find(".js_frm_msg").html(e.html()).show();
}
});
}
function l(e,t){
return new f(v.find(e),{
maxLength:t,
showCounter:!0
});
}
function s(){
if(!(U.length<=0)){
U.sort(function(e,t){
return 12==e.type?-1:12==t.type?1:e.extinfo&&e.extinfo.image?-1:t.extinfo&&t.extinfo.image?1:0;
});
for(var e=0;e<U.length;e++)1==U[e].type?k[e]=3:2==U[e].type?(m("查看公众号"),k[e]=1):12==U[e].type?(m("视频"),
k[e]=0):8==U[e].type&&(m("领取优惠券"),k[e]=2);
}
}
function u(){
if(U.length>0)for(var e={
12:"tpl_video",
2:"tpl_public",
8:"tpl_coupon",
1:"tpl_custom",
0:"tpl_none"
},t=0;t<U.length;t++){
var n=0==t?!0:!1;
if(1==U[t].type)$(".item_service .jsBtLabel").eq(t).html("自定义页面"),$(".js_select_service").eq(t).html(template.render(e[U[t].type],{
data:U[t],
showUpload:n
}));else if(2==U[t].type)$(".item_service .jsBtLabel").eq(t).html("查看公众号"),$(".js_select_service").eq(t).html(template.render(e[U[t].type],{
data:U[t],
showUpload:n
}));else if(12==U[t].type)$(".item_service .jsBtLabel").eq(t).html("视频"),$(".js_select_service").eq(t).html(template.render(e[U[t].type],{
data:U[t],
showUpload:n
}));else if(8==U[t].type){
$(".item_service .jsBtLabel").eq(t).html("领取优惠券"),$(".js_select_service").eq(t).html(template.render(e[U[t].type],{
data:U[t],
showUpload:n
}));
var a=localStorage.getItem("scan_cardInfo");
if(a){
var i=j.parse(a);
$("input[name='coupon_name']").val(i.id),$("#coupon_show").html(template.render("tpl_coupon_show",{
data:i
}));
}
}
}
p();
}
function m(e){
for(var t=0;t<x.length;t++)x[t].name==e&&(x[t].flag=!1);
}
function c(){
var e=[{},{},{},{}];
return $(".item_service .jsBtLabel").each(function(t){
var n=$(this).html(),a=($(this).parents(".custom_service_wrp").find(".upload_box"),
$(this).parents(".custom_service_wrp").find(".upload_box input[name=img_name]").val()||"");
"视频"==n?e[t]={
type:12,
showtype:""==a?0:1,
name:"视频",
extinfo:{
image:a,
link:_($("input[name='url_name']").val())
}
}:"查看公众号"==n?e[t]={
type:2,
showtype:""==a?0:1,
name:$("input[name='public_tips_name']").val(),
extinfo:{
image:a,
appid:$("input[name='public_name']").val()
}
}:"领取优惠券"==n?e[t]={
type:8,
showtype:""==a?0:1,
name:$("input[name='coupon_tips_name']").val(),
extinfo:{
image:a,
cardid:$("input[name='coupon_name']").val()
}
}:"自定义页面"==n?e[t]={
type:1,
showtype:""==a?0:1,
name:$(".service"+(1+t)).find("input[name='custom_name']").val(),
extinfo:{
image:a,
link:$(".service"+(t+1)).find("input[name='custom_url_name']").val()
}
}:"不填写"==n&&(e[t]={
type:"",
showtype:0,
name:""
});
}),{
action_list:e
};
}
function p(){
var e=c();
"[{},{},{},{}]"==j.stringify2(e.action_list)&&(e.action_list=[{
type:0,
name:"视频或其他（选填）"
},{
type:0,
name:"自定义服务一（选填）"
},{
type:0,
name:"自定义服务二（选填）"
},{
type:0,
name:"自定义服务三（选填）"
}]),U=e.action_list,C&&C.setData(e);
}
function _(e){
var t,n,a="";
return(t=e.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)")))?(a=encodeURIComponent(t[2]),
n="https://v.qq.com/iframe/preview.html?vid="+a+"&tiny=0&auto=1"):(t=e.match(new RegExp("(https://)?v\\.qq\\.com/(.*)/(.*)\\.html")))&&(a=encodeURIComponent(t[3]),
n="https://v.qq.com/iframe/preview.html?vid="+a+"&tiny=0&auto=1"),n;
}
function d(){
if(q)return!1;
q=!0,v=$("#js_form_service");
var e={},t=C&&C.getData()||e;
U=t.action_list?t.action_list:[],s(),i(),u(),r(),o(),v.on("input keyup","input",p);
}
var v,f=(template.render,e("common/wx/inputCounter.js")),h=e("biz_web/utils/upload.js"),g=h.uploadCdnFileFromAd({
w:580,
h:320,
size:512e3
}),w=e("biz_web/ui/dropdown.js"),b=e("common/wx/Tips.js"),j=(e("biz_common/jquery.validate.js"),
e("biz_web/lib/json.js")),y=e("cardticket/send_card.js"),q=!1,x=[{
name:"视频",
type:"video",
value:0,
flag:!0
},{
name:"查看公众号",
type:"public",
value:1,
flag:!0
},{
name:"领取优惠券",
type:"coupon",
value:2,
flag:!0
},{
name:"自定义页面",
type:"custom",
value:3,
flag:!0
},{
name:"不填写",
type:"none",
value:4,
flag:!0
}],k=[null,null,null,null],U=[],C=null;
if(jQuery.validator.addMethod("isTencentVideoUrl",function(e){
var t=new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)"),n=new RegExp("(https://)?v\\.qq\\.com/(.*)/(.*)\\.html");
return t.test(e)||n.test(e);
},"请正确填写腾讯视频链接"),0==wx.cgiData.canUseCard)for(var z=0;z<x.length;z++)2==x[z].value&&x.splice(2,1);
template.helper("datestring",function(e){
var t=new Date(e),n="%s年%s月%s日".sprintf(t.getFullYear(),t.getMonth()+1,t.getDate());
return n;
}),n.exports={
init:d,
getData:function(){
var e=c();
return e;
},
setData:function(){
wx.cgiData;
u();
},
check:function(e){
var t=v.valid();
return"function"==typeof e&&e(t),t;
},
setMobilePreview:function(e){
C=e;
}
};
});