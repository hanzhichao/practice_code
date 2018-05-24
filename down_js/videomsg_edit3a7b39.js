define("media/videomsg_edit.js",["common/wx/popup.js","common/wx/top.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js","common/wx/media/video.js","common/wx/verifycode.js","biz_web/lib/store.js","media/media_cgi.js","common/wx/dialog.js","common/wx/ban.js","tpl/simplePopup.html.js"],function(e){
"use strict";
function i(e,i){
a.post({
url:"/cgi-bin/uploadimgbyurl",
data:{
url:encodeURIComponent(e)
},
error:function(){
d.err("系统错误，请重试"),i(-1);
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?i(0,e.content):(d.err("系统错误，请重试"),i(-1));
});
}
function t(e,t){
var o=e.match(b),r=t.get().find(".js_btn").eq(0);
o&&o[2]?a.get({
url:"https://open.t.qq.com/api/weishi/show?appid=801451669",
data:{
wid:o[2]
},
dataType:"jsonp",
jsonpCallback:"callback",
beforeSend:function(){
r.btn(!1);
},
error:function(){
d.err("系统错误，请重试"),r.btn(!0);
}
},function(e){
if(0!=e.ret)return d.err("获取视频信息出错，请检查视频网址是否正确"),void r.btn(!0);
var o=e.data.info,l=o.newvideos&&o.newvideos[0]||o.videos[0];
i(l.picurl,function(e,i){
return 0!=e?void r.btn(!0):(u.set("weishi_url"+i,$("#contenturl_input").val()),n(l.realurl,i),
void t.hide());
});
}):d.err("非法的视频网址");
}
function o(){
$("#wxVideoBox").remove(),$("#video_id").val(""),$("#file_id").val(""),$("#content_url").val(""),
$("#upload").text("本地上传");
}
function n(e,i){
o(),$("#content_url").val(e),$("#file_id").val(i),$("#preview").parent().show(),
new p({
selector:"#preview",
tpl:"videomsg",
for_network:!0,
file_id:i,
content_url:e
});
}
function r(e){
g=e[2]||"";
{
var i=e[1];
wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s").sprintf(i);
}
o(),$("#video_id").val(e[0]),$("#file_id").val(e[1]),$("#preview").parent().show(),
new p({
selector:"#preview",
tpl:"videomsg",
for_transfer:!0,
file_id:i,
video_id:e[0]
}),$("#upload").text("重新上传");
}
function l(){
var e=$("#video_id").val().trim(),i=$("#file_id").val().trim(),t=$("#title").val().trim(),o=$("#digest").val().trim(),n=$("#content_url").val().trim();
return""==e&&""==n?(d.err("请上传视频或填写网络视频网址"),!1):""!=n&&0!=n.search(b)?(d.err("请输入正确的视频网址"),
!1):t.length<1||t.length>64?(d.err("请输入1到64个字的标题"),!1):""!=o&&o.length>120?(d.err("简介字数不能超过120字"),
!1):{
type:15,
count:1,
AppMsgId:w.app_id,
title0:t,
content0:e,
fileid0:i,
digest0:o,
contenturl0:n
};
}
e("common/wx/popup.js");
var s=e("common/wx/top.js"),a=e("common/wx/Cgi.js"),d=e("common/wx/Tips.js"),c=e("biz_web/utils/upload.js"),p=e("common/wx/media/video.js"),u=(e("common/wx/verifycode.js"),
e("biz_web/lib/store.js")),m=e("media/media_cgi.js"),v=(e("common/wx/dialog.js"),
e("common/wx/ban.js")),f=e("tpl/simplePopup.html.js"),w=wx.cgiData,_=w.type,b=/^http:\/\/(www\.weishi\.com|weishi\.com|weishi\.qq\.com|weshow\.qq\.com)\/t\/(\d+)/,g="";
new s("#topTab",s.DATA.media).selected("media"+_),function(){
var e=w.app_id,i=w.appmsg_data;
e&&($("#title").val(i.title.html(!1)),$("#digest").val(i.digest.html(!1)),i.content?($("#video_id").val(i.content),
$("#file_id").val(i.file_id),$("#upload").text("重新上传"),g=i.video_url||"",$("#preview").parent().show(),
new p({
selector:"#preview",
tpl:"videomsg",
for_transfer:!0,
hide_transfer:!0,
file_id:i.file_id,
video_url:g,
video_id:i.content,
img_url:i.img_url
})):n(i.content_url,i.file_id));
}(),c.uploadVideoCdnFile({
container:"#upload",
type:_,
onComplete:function(e,i,t,o,n){
if(o.base_resp)switch(+o.base_resp.ret){
case 0:
d.suc("上传成功"),n=o.content.trim().split(" "),r(n);
break;

default:
d.err("上传失败");
}
}
}),$("#js_network").on("click",function(){
return $("#tpl_contenturl").popup({
title:"视频",
className:"simple video_upload",
onOK:function(){
var e=$("#contenturl_input").val();
return""==e?(d.err("请输入视频网址"),!0):(e=/^http:\/\//.test(e)?e:"http://"+e,b.test(e)?t(e,this):d.err(/^http:\/\/(www\.weishi\.com|weishi\.com|weishi\.qq\.com|weshow\.qq\.com)/.test(e)?"请输入单个微视地址":"请输入正确的微视网址"),
!0);
},
onHide:function(){
this.remove();
}
}),$("#contenturl_input").val(u.get("weishi_url"+$("#file_id").val())||""),!1;
}),$("#js_submit").on("click",function(){
function e(){}
var i=$(this),t=l();
t&&(i.hasClass("btn_disabled")||(i.disable().removeClass("btn_primary"),m.appmsg.save(0,_,t,function(){
window.onbeforeunload=null,location.href=wx.url("/cgi-bin/appmsg?begin=0&count=9&t=media/appmsg_list&type=15&action=list");
},function(){
i.enable().addClass("btn_primary");
},e)));
}),$("#js_preview").on("click",function(){
if(v(w.func_ban_info,"preview")){
var e=($(this),l());
if(e){
if($("#preview").find(".loading_tips").length)return void d.err("视频转码中，请稍后预览");
{
var i=null;
$(template.compile(f)({
label:"请输入微信号，此视频消息将发送至该微信号预览。"
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var t=this,o=this.get(),n=o.find(".frm_input"),r=n.val().trim();
if(!/\w{1,20}/.test(r))return d.err("微信号必须为1到20个字符"),n.focus(),!0;
if(null!=i&&i.getCode().trim().length<=0)return d.err("请输入验证码"),i.focus(),!0;
var l=o.find(".js_btn").eq(0).btn(!1);
return e.preusername=r,e.imgcode=i&&i.getCode().trim(),m.appmsg.preview(0,_,e,function(e){
w.app_id=e.appMsgId,l.btn(!0),t.hide();
},function(e){
l.btn(!0),n.focus(),!e||"-6"!=e.ret&&"-8"!=e.ret||(i=o.find(".js_verifycode").html("").removeClass("dn").verifycode().data("verifycode"),
i.focus());
}),!0;
}
});
}
}
}
}),$("#js_remove").on("click",function(){
o(),$("#preview").parent().hide();
}),window.onbeforeunload=function(){
return""!=$("#content_url").val()||""!=$("#video_id").val()||""!=$("#title").val()||""!=$("#digest").val()?"":void 0;
};
});