define("scan/item_action_banner.js",["common/wx/Tips.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js","common/wx/inputCounter.js","biz_common/jquery.validate.js","cardticket/send_card.js"],function(e,n,i){
"use strict";
function t(){
var e=y.getEditMode();
return 2==e?!1:!0;
}
function a(e,n){
var i=j.uploadCdnFileWithCheck(n);
i({
container:e,
multi:!1,
type:2,
onComplete:function(n,i,t,a){
var o=a.content||"";
switch(+a.base_resp.ret){
case 0:
r(e,o,t.name),w.suc("上传成功");
break;

case 200034:
w.err("图片尺寸错误");
break;

case 1:
w.err("图片太大");
break;

case 200011:
w.err("请上传合法的图片格式");
break;

default:
w.err("上传失败");
}
}
});
}
function r(e,n,i){
var t=$(e),a=t.parents(".upload_box"),r=(a.find(".js_uploaded_msg"),a.find(".upload_msg.warn")),u=a.find(".js_input_file"),d=a.find(".upload_preview");
d.find("img").prop("src",n),d.show(),u.val(n),r.hide(),t.html("重新上传"),z.extinfo.image=n,
o();
}
function o(){
var e=z?[z]:[];
t()||(e=[]),y.setActionList("banner",e);
}
function u(){
h.html(""),z=null,o();
}
function d(){
h.html(g("tpl_banner_video",z)),a("#js_btn_banner_video_upload",{
width:0,
min_width:0,
height:0,
min_height:0,
size:204800,
min_size:0
}),z.extinfo&&z.extinfo.image&&r("#js_btn_banner_video_upload",z.extinfo.image,""),
o();
}
function l(){
h.html(g("tpl_banner_pic",z)),a("#js_btn_banner_pic_upload",{
width:0,
min_width:0,
height:0,
min_height:0,
size:204800,
min_size:0
}),z.extinfo&&z.extinfo.image&&r("#js_btn_banner_pic_upload",z.extinfo.image,"");
var e={
0:{
name:"不跳转",
value:0
},
1:{
name:"自定义网页",
value:1
},
2:{
name:"关注公众号",
value:2
},
8:{
name:"领取卡券",
value:8
},
13:{
name:"附近的门店",
value:13
}
},n=z.type;
1==z.type&&""==z.extinfo.link&&(n=0),new x({
container:"#js_dropdown_banner_type",
label:e[n].name,
data:[e[1],e[0]],
callback:function(e){
z.name=v.find('input[name="banner_name"]').val()||"",z.type=1*e||1,z.extinfo={
link:v.find('input[name="banner_url"]').val()||"",
image:v.find('input[name="banner_image"]').val()||""
},$("#js_div_action_banner_type").html(g("tpl_action_banner_"+e,z)),0==e&&(z.extinfo.link=""),
2==e&&(z.extinfo.appid=v.find('input[name="appid"]').val()),8==e&&(z.extinfo.cardid=v.find('input[name="coupon_name"]').val()),
o();
}
}),$("#js_div_action_banner_type").html(g("tpl_action_banner_"+n,z)),o();
}
function c(){
v=$("#js_form_action_banner"),h=$("#js_div_action_banner"),z=y.getActionList("banner"),
z=z?z[0]:{
type:0,
name:"",
extinfo:{
image:"",
link:""
},
showtype:1
},template.helper("dateToString",function(e){
var n=new Date(e),i="%s年%s月%s日".sprintf(n.getFullYear(),n.getMonth()+1,n.getDate());
return i;
});
}
function _(){}
function m(){
var e=v.find('input[name="action_banner_type"]');
e.checkbox({
multi:!1,
onChanged:function(e){
var n=e.val();
switch(n){
case"video":
z={
type:12,
name:"视频",
extinfo:{
image:v.find('input[name="banner_image"]').val()||"",
link:v.find('input[name="video_url"]').val()||""
},
showtype:1
},d();
break;

case"pic":
z={
type:1,
name:v.find('input[name="banner_name"]').val()||"",
extinfo:{
image:v.find('input[name="banner_image"]').val()||"",
link:v.find('input[name="banner_url"]').val()||""
},
showtype:1
},l();
break;

default:
u();
}
}
}),z?12==z.type?(e.filter('[value="video"]').checkbox("checked",!0),d()):(e.filter('[value="pic"]').checkbox("checked",!0),
l()):(e.filter('[value="none"]').checkbox("checked",!0),u()),v.on("keyup",'input[name="banner_url"], input[name="video_url"]',function(){
z.extinfo.link=$(this).val(),o();
}),v.on("click",".js_btn_import_coupon",function(e){
e.preventDefault();
var n=new k({
multi:!1,
selectComplete:function(e){
return e?(v.find("input[name='coupon_name']").val(e.id),$("#js_div_action_banner_coupon").html(g("tpl_action_banner_coupon",{
data:e
})),z.extinfo.cardid=e.id,void o()):void w.err("请选择卡券");
},
source:"直接群发卡券"
});
n.show();
});
}
function p(){
$.validator.addMethod("isTencentVideoUrl",function(e){
var n=new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)"),i=new RegExp("(http://)?v\\.qq\\.com/(.*)/(.*)\\.html");
return n.test(e)||i.test(e);
},"请正确填写腾讯视频链接"),v.validate({
ignore:".js_input_ignore",
rules:{
banner_url:{
required:t,
url:t
},
banner_name:{
required:t,
maxlength:function(){
return t()?16:!1;
}
},
banner_image:{
required:t
},
video_url:{
required:t,
url:t,
isTencentVideoUrl:t
},
coupon_name:{
required:t
},
appid:{
required:t
}
},
messages:{
banner_url:{
required:"请填写网址",
url:"请填写正确的网址"
},
banner_name:{
required:"请填写名称",
maxlength:"名称过长"
},
banner_image:{
required:"请上传图片"
},
video_url:{
required:"请填写腾讯视频链接",
url:"请填写腾讯视频链接",
isTencentVideoUrl:"请填写腾讯视频链接"
},
coupon_name:{
required:"请选择卡券"
},
appid:{
required:"请选择公众号"
}
},
errorPlacement:function(e,n){
var i=n.parent().parent();
i.find(".js_frm_msg").html(e.html()).show();
}
});
}
function s(){
t()?v.show():v.hide(),o();
}
function f(e){
var n=!0;
return t()&&(n=v.valid()),"function"==typeof e&&e.call(void 0,n),n;
}
function b(e){
return e&&e.model&&(y=e.model),q?!1:(q=!0,c(),_(),m(),p(),void s());
}
var v,h,g=template.render,w=e("common/wx/Tips.js"),x=e("biz_web/ui/dropdown.js"),j=e("biz_web/utils/upload.js"),k=(e("biz_web/ui/checkbox.js"),
e("common/wx/inputCounter.js"),e("biz_common/jquery.validate.js"),e("cardticket/send_card.js")),y=null,q=!1,z=null;
i.exports={
init:b,
check:f,
triggerEditMode:s
};
});