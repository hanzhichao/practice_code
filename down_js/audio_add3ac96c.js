define("media/audio_add.js",["biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js","common/wx/media/audio.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(){
(1*x.cgiData.category<1||1*x.cgiData.category>20)&&(x.cgiData.category=0,$("#category_hidden").val(""));
}
function a(){
b(),$("#category_list").find("input[type=radio]").checkbox({
multi:!1,
onChanged:function(e){
e.checkbox().values().length>0?$("#category_hidden").val(1).parent().parent().find(".fail").remove():$("#category_hidden").val("");
}
}),$("#category_div").show(),x.cgiData.category&&$("#category_list").find("input[type=radio][value="+x.cgiData.category+"]").checkbox("checked",!0),
"add"==x.cgiData.type?y.mediaFile({
container:"#upload_btn",
fileNumLimit:1,
type:x.fileType,
onSelect:function(){
x.oldStatus=x.uploadStatus,4===x.uploadStatus?(x.uploadStatus=1,h()):x.uploadStatus=1,
n();
},
onError:function(){
x.uploadStatus=x.oldStatus,$("#upload_btn").parents("span.upload_area").show();
},
onComplete:function(e,t,a,i){
i&&i.base_resp&&0==i.base_resp.ret?(S.suc("上传成功"),x.uploadStatus=2,x.tmpId=i.content,
x.curFileObj=a,d({
title:r()
}),$("#encodeid_hidden").val(1),$("#upload_preview").show(),$("#upload_btn").text("重新上传"),
p()):($("#upload_btn").parents("span.upload_area").show(),S.err("上传失败"),x.uploadStatus=x.oldStatus);
}
}):(d({
title:x.cgiData.title,
play_length:x.cgiData.play_length,
mediaid:x.fileid
}),$("#audio_loading").show()),l();
}
function i(){
var e=x.curFileObj;
x.loop=/mp3/i.test(e.ext)||/amr/i.test(e.ext)?1e3:/wma/i.test(e.ext)?e.size<=3e6?3e3:e.size>3e6&&e.size<=1e7?x.checkTime<=1?5e3:2e3:x.checkTime<=1?1e4:5e3:/wav/i.test(e.ext)?e.size<=5e6?2e3:e.size>5e6&&e.size<=25e6?3e3:x.checkTime<=1?5e3:2e3:3e3;
}
function o(){
$("#submit_btn").click(function(e){
220001==T?S.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):220002==T?S.err("你的图片库已达到存储上限，请进行清理。"):c()===!0&&u(e);
}),$("#form").on("click",".js_retransform",function(){
p();
}),"add"==x.cgiData.type&&($(window).unload(function(){
n();
}),window.onbeforeunload=function(){
return 1===x.uploadStatus?"语音文件上传中":3===x.uploadStatus?"语音文件转码中":"";
});
}
function n(){
!x.updateSuc&&x.fileid&&v.post({
url:"/cgi-bin/operate_voice?oper=delvoice",
async:!1,
data:{
fileid:x.fileid
}
},function(){});
}
function d(e){
$("#upload_preview").html(""),e=e||{};
var t="";
e.mediaid&&(t="https://res.wx.qq.com/voice/getvoice?mediaid="+e.mediaid),x.audio=new k({
id:e.mediaid||"",
selector:"#upload_preview",
title:e.title||"无标题",
play_length:e.play_length||0,
qqmusicurl:t
});
}
function c(){
return x.form.form()?!0:(S.err("请完善表单信息"),!1);
}
function u(e){
if(!x.submitIng){
x.submitIng=!0;
var t=$(e.target||e.srcElement);
t.btn(!1),v.post({
url:"/cgi-bin/operate_voice?oper=update",
data:{
fileid:x.fileid,
category:s(),
title:r(),
check_time:x.checkTime,
check_last_time:x.checkLastTime>2e4*x.checkTime?2e4*x.checkTime:x.checkLastTime
},
complete:function(){
t.btn(!0),x.submitIng=!1;
}
},function(e){
e.base_resp&&0==e.base_resp.ret?(window.onbeforeunload=null,x.updateSuc=!0,S.suc("保存成功"),
window.location=wx.url("/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list")):S.err("保存失败");
});
}
}
function r(){
return $.trim($("#title").val())||"";
}
function s(e){
var t=$("#category_list").find("input[type=radio]").checkbox().values();
return t=t.length>0?t[0]:"undefined"==typeof e?1:e;
}
function l(){
$.validator.addMethod("trans_status",function(e,t){
var a=!!this.optional(t);
return 5===x.uploadStatus?a||!0:a||!1;
},"请重新转码"),$.validator.addMethod("title_len",function(e,t){
var a=!!this.optional(t);
return w($.trim(e))>x.titleMaxLen?a||!1:a||!0;
},"最多"+x.titleMaxLen+"个字符"),x.form=$("#form").validate({
rules:{
title:{
required:!0,
title_len:!0
},
category_hidden:{
required:!0
},
encodeid_hidden:{
required:!0,
trans_status:!0
}
},
messages:{
title:{
required:"请输入标题",
title_len:"最多"+x.titleMaxLen+"个字符"
},
category_hidden:{
required:"请选择分类"
},
encodeid_hidden:{
required:"请上传语音文件",
trans_status:function(){
return 4===x.uploadStatus?'转码失败。请<a href="javascript:void(0)" class="js_retransform">重新转码</a>或选择其他文件重新上传':3===x.uploadStatus?"转码中，请稍候":6===x.uploadStatus?x.maxLenMsg:0===x.uploadStatus?"请上传语音文件":7===x.uploadStatus?'"素材管理"中的存储数量已达到上限，请删除后再操作。':8===x.uploadStatus?"你的图片库已达到存储上限，请进行清理。":"";
}
}
},
ignore:[],
submitHandler:function(){
return!1;
}
});
}
function p(){
$("#audio_loading").show(),x.uploadStatus=3,h(),x.checkTime=0,x.checkStartTime=0,
x.checkLastTime=0,$("#upload_btn").parents("span.upload_area").hide();
var e=x.tmpId;
v.post({
url:"/cgi-bin/operate_voice?oper=create",
data:{
tmpencodeid:e,
category:s(),
title:r()
}
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.encode_file_id?(x.fileid=e.encode_file_id,g(e.title||""),
m()):e.base_resp&&220001==e.base_resp.ret?(S.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'),$("#audio_loading").hide(),
T=220001,x.uploadStatus=7,h()):e.base_resp&&220002==e.base_resp.ret?(S.err("你的图片库已达到存储上限，请进行清理。"),
$("#audio_loading").hide(),T=220002,x.uploadStatus=8,h()):_();
});
}
function m(){
i(),0==x.checkTime&&(x.checkStartTime=+new Date),x.checkTransformStatusId=setTimeout(function(){
5!==x.uploadStatus&&4!==x.uploadStatus&&6!==x.uploadStatus&&(x.checkTime++,v.get({
url:"/cgi-bin/operate_voice?oper=voice_get",
data:{
fileid:x.fileid
},
complete:function(){
m();
}
},function(e){
e.base_resp&&0==e.base_resp.ret&&(1*e.trans_state===1?($("#audio_loading").hide(),
f(),x.uploadStatus=5,S.suc("转码成功"),x.checkLastTime=+new Date-x.checkStartTime,d({
title:r(),
play_length:e.play_length,
mediaid:e.encode_file_id
}),h(),$("#upload_btn").parents("span.upload_area").show()):1*e.trans_state===2?_():1*e.trans_state===3&&_(6));
}));
},x.loop);
}
function _(e){
f(),$("#audio_loading").hide(),x.uploadStatus="undefined"==typeof e?4:e,$("#upload_btn").parents("span.upload_area").show(),
h();
}
function f(){
x.checkTransformStatusId&&clearTimeout(x.checkTransformStatusId);
}
function h(){
x.form.showErrors({
encodeid_hidden:x.form.settings.messages.encodeid_hidden.trans_status
});
}
function g(e){
$("#upload_preview").find(".audio_title").text(e||"无标题");
}
function b(){
var e=$("#title"),t=x.titleMaxLen,a=$("#input_len_tips"),i="warn",o="&nbsp;<em>/</em>&nbsp;",n=function(){
var n=$.trim(e.val()),d=w(n);
a.html(d+o+t),d>t?a.addClass(i):a.removeClass(i),g(n);
};
n(),e.keyup(function(){
n();
});
}
function w(e){
return e?Math.ceil(e.replace(/[^\x00-\xff]/g,"01").length/2):0;
}
e("biz_common/jquery.validate.js");
var v=e("common/wx/Cgi.js"),S=e("common/wx/Tips.js"),y=e("biz_web/utils/upload.js"),k=e("common/wx/media/audio.js"),x=(e("biz_web/ui/checkbox.js"),
template.render,{
fileType:1*window.cgiData.can_use_voice===1?12:3,
maxLenMsg:1*window.cgiData.can_use_voice===1?"语音时长不能超过30分钟":"语音时长不能超过1分钟",
titleMaxLen:14,
trans_state:window.cgiData.trans_state,
cgiData:window.cgiData,
uploadStatus:0,
fileid:window.cgiData.id,
tmpId:"",
checkTime:0,
checkStartTime:0,
checkLastTime:0,
loop:3e3
});
t(),a(),o();
var T=0;
});