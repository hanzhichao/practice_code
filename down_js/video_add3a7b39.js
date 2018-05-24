define("media/video_add.js",["biz_common/moment.js","common/wx/dialog.js","common/qq/tvu.uploader.js","biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Tips.js","biz_web/ui/input/lentips.js","media/media_cgi.js","common/wx/popover.js","common/wx/videoChange.js","common/wx/Cgi.js","tpl/media/video_edit.html.js","tpl/media/video_edit_tag.html.js","tpl/media/video_edit_up.html.js","common/wx/verifycode.js","tpl/simplePopup.html.js","common/wx/browserVersion.js","common/wx/ban.js","widget/upload.css","widget/dropdown.css","widget/media/video/edit.css"],function(e){
"use strict";
function t(){
var e=$("#declare_origin_tpl");
1==wx.cgiData.ori_video_mgr&&(x.declare_ori=0,x.sync_txvideo=1,$("input.js_origin_radio[type='radio']").checkbox({
multi:!1,
onChanged:function(){}
}),$("#js_origin").click(function(){
var t=$("#js_not_origin"),i=e.popup({
title:"原创声明",
width:960,
className:"video_original_dialog",
close:function(){
t.trigger("click"),x.declare_ori=0,this.remove();
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
x.declare_ori=1,this.remove();
}
},{
text:"取消",
click:function(){
x.declare_ori=0,t.trigger("click"),this.remove();
}
}]
}),n=i.popup("get");
n.find("#js_copyright_agree").checkbox({
onChanged:function(e){
e.prop("checked")?n.find(".js_btn_p").enable():n.find(".js_btn_p").disable();
}
});
}),$("#js_not_origin").click(function(){
x.declare_ori=0;
}),$("#js_sync").checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
x.sync_txvideo="on"==this.values()[0]?1:0;
}
})),$("#js_aggre").length>0&&$("#js_aggre").checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
b.agree=this.values()[0],b.agree?$("#js_save").removeClass("btn_disabled"):$("#js_save").addClass("btn_disabled");
}
}),$("#js_tag_icon").mousemove(function(){
new _({
dom:"#js_tag_icon",
content:"标签用回车分开，填写与视频内容相关的标签，你的视频会被合理的分类整理",
hover:!0
});
}),$(".js_cover_tips").mousemove(function(){
new _({
dom:".js_cover_tips",
content:"视频转码完成后，进入编辑页面可以选择视频内的画面作为视频封面。如果不作选择，默认封面为视频的第一帧。",
hover:!0
});
}),$(".js_video_format_tips").mousemove(function(){
new _({
dom:".js_video_format_tips",
content:"常见在线流媒体格式：mp4、flv、f4v、webm<br>移动设备格式：m4v、mov、3gp、3g2<br>RealPlayer ：rm、rmvb<br>微软格式 ：wmv、avi、asf<br>MPEG 视频 ：mpg、mpeg、mpe、ts<br>DV格式 ：div、dv、divx<br>其他格式 ：vob、dat、mkv、swf、lavf、cpk、dirac、ram、qt、fli、flc、mod<br>主流音频格式：mp3、aac、ac3、wav、m4a、ogg",
hover:!0,
width:517
});
}),$(".js_video_process_tips").mousemove(function(){
new _({
dom:".js_video_process_tips",
content:"流程：<br>1.上传：将视频上传至服务器，需视频和文案资料完成才能完成上传。<br>2.转码：上传成功后服务器将视频转码成播放器可识别的格式。<br>3.审核：转码完成后视频进入内容审核阶段。<br>4.可用：只有审核通过的视频素材才可以被使用。",
hover:!0,
width:500
});
}),$(".video_sub_category").click(function(){
var e=$(this).attr("title").trim();
$("#js_cat").html(e),b.newsubcat=e,b.newcat=$(this).data("cat").trim(),$("#js_dropdown").hide();
}),$(".dropdown_switch").click(function(){
$("#js_dropdown").show();
}),$(".dropdown_menu").hover(function(){},function(){
$("#js_dropdown").hide();
}),$("#js_tag_box").click(function(){
$("#js_tag_input").focus();
}),$("#js_tag_input").keydown(function(e){
if(13==e.which){
if(""==$("#js_tag_input").val().trim())return;
o("#js_tag_input");
}
if(8==e.which&&""==$("#js_tag_input").val().trim()){
$(this).prev().remove();
var t=[],i=0;
$(".video_tag").each(function(){
t[i]=$(this).attr("title").trim(),i++;
}),b.tag=t.join("|");
}
}),$("#js_tag_input").blur(function(){
""!=$("#js_tag_input").val()&&o("#js_tag_input");
}),wx.cgiData.can_use_comment&&($("#js_enable_comment").checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
var e="on"===this.values()[0]?1:0;
x.need_open_comment0=e,e?$(".js_comment_radio_area").show():$(".js_comment_radio_area").hide();
}
}),$("input.js_comment_radio").checkbox({
multi:!1,
initOnChanged:!0,
onChanged:function(){
x.only_fans_can_comment0=Number(this.values()[0]);
}
})),$("#js_save").click(function(){
function e(){}
return $(this).hasClass("btn_disabled")?!1:n()?($(this).disable().removeClass("btn_primary").addClass("btn_loading"),
void l.appmsg.save(0,15,x,function(){
location.href=wx.url("/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&type=15&action=list_video");
},function(){
$("#js_save").enable().removeClass("btn_loading").addClass("btn_primary");
},e)):!1;
}),$("#js_tag_box").on("click",".icon_tag_del",function(){
$(this).parent().remove();
var e=[],t=0;
$(".video_tag").each(function(){
e[t]=$(this).attr("title").trim(),t++;
}),b.tag=e.join("|");
}),new u({
input:$("#js_title").val(b.title),
tip:$("#js_title_len_tips"),
maxlimit:21,
trim:!0,
className:"txt_hint",
callback:function(e,t){
b.title=t.value,b.title.length>21?$("#js_title").parent().addClass("warn"):$("#js_title").parent().removeClass("warn");
}
}),new u({
input:$("#js_digest").html(b.digest),
tip:$("#js_digest_len_tips"),
maxlimit:120,
trim:!0,
className:"txt_hint",
callback:function(e,t){
b.digest=t.value,b.digest.length>120?$("#js_digest").parent().addClass("warn"):$("#js_digest").parent().removeClass("warn");
}
}),$("#js_preview").on("click",function(){
if(w(wx.cgiData.func_ban_info,"preview")){
{
$(this);
}
if(3!=b.status)return d.err("请等待视频审核转码完成后才能预览"),!1;
if(!n())return!1;
{
var e=null;
$(template.compile(f)({
label:"请输入微信号，此视频消息将发送至该微信号预览。"
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var t=this,i=this.get(),n=i.find(".frm_input"),o=n.val().trim();
if(!/\w{1,20}/.test(o))return d.err("微信号必须为1到20个字符"),n.focus(),!0;
if(null!=e&&e.getCode().trim().length<=0)return d.err("请输入验证码"),e.focus(),!0;
var a=i.find(".js_btn").eq(0).btn(!1);
return x.preusername=o,x.imgcode=e&&e.getCode().trim(),l.appmsg.preview(0,15,x,function(){
a.btn(!0),t.hide();
},function(t){
a.btn(!0),n.focus(),!t||"-6"!=t.ret&&"-8"!=t.ret||(e=i.find(".js_verifycode").html("").removeClass("dn").verifycode().data("verifycode"),
e.focus());
}),!0;
}
});
}
}
});
}
function i(){
function e(e,t){
var i=$.extend({},e);
i.typeText=i.uploadType==tvu.UploadType.HTML5?"HTML5":"FLASH",t();
}
function t(e,t){
var i=e.percent,n=((parseFloat(tvu.getSizeString(e.size))-parseFloat(tvu.getSizeString(e.processedSize)))/(parseFloat(tvu.getSizeString(e.averageSpeed))/1024)).toFixed(1);
0>n||tvu.getSizeString(e.averageSpeed)<=0?n="正在计算":n>3600?n=(n/3600).toFixed(1)+"小时":n>60?n=parseInt(n/60)+"分钟":n+="秒";
var o={
percent:i,
remainTime:n,
instantSpeed:tvu.getSizeString(e.instantSpeed),
processedSize:tvu.getSizeString(e.processedSize),
size:tvu.getSizeString(e.size),
errorMsg:e.errorMsg,
uid:e.uid,
s:t
};
$("#js_up_status").html(wx.T(v,o)),$("#js_up_percent").html(i+"%"),$("#js_up_status_title").html(e.name);
}
var i=$("#js_btn_upload"),n={},o="";
0==wx.cgiData.ori_video_mgr?tvu.hasHtml5()?(o=tvu.UploadType.HTML5,tvu.core.config.html5.maxFileSize=20):(o=tvu.UploadType.FLASH,
tvu.core.config.flash.maxFileSize=20):"Safari"==h.name&&-1!=navigator.userAgent.toLowerCase().indexOf("mac")?(o=tvu.UploadType.FTN_HTML5,
tvu.core.config.ftnhtml5.maxFileSize=500):(o=tvu.UploadType.FLASH,tvu.core.config.flash.maxFileSize=500);
var a={
bid:"weixin_mp",
appid:wx.cgiData.appid,
pluginsession:wx.cgiData.pluginsession,
username:wx.cgiData.username
};
tvu.init({
businessType:tvu.BusinessType.WEIXIN,
businessID:3,
uploadType:o,
useMultiUploadType:!0,
uploadInfo:a,
isReportBoss:!0,
onFileSelect:function(i){
p.post({
url:wx.url("/cgi-bin/video_mgr?action=get_plugin_token&token="+location.href.substring(parseInt(location.href.indexOf("token="))+6))
},function(o){
i&&i.length>0&&!function(i){
e(i,function(){
n[i.uid]=i,0!=i.errorCode?(d.err(i.errorMsg),t(i,3)):(i.pluginsession=o.plugin_login_info.plugin_token,
tvu.addToQueue(i)&&tvu.startQueue());
});
}(i[0]);
});
},
onFileStart:function(e){
i.hide(),$("#js_up_status_wrap").show(),$("#js_up_cancel").show(),$("#js_up_cancel").data("uid",e.uid),
b.vid="上传中";
},
onFileUploadStart:function(e){
t(e,1);
},
onFileUploadProgress:function(e){
t(e,1);
},
onFileScanProgress:function(e){
t(e,0);
},
onFileSuccess:function(e){
$("#js_up_percent").html("100%"),$("#js_up_cancel").hide(),t(e,2),b.vid=e.vid,wx.jslog({
src:"media/video_add.js"
},null,50);
},
onFileError:function(e){
b.vid="上传失败",i.show(),$("#js_up_cancel").hide(),t(e,3),wx.jslog({
src:"media/video_add.js"
},{
message:e.errorMsg
},51);
},
debug:!0
}),tvu.setSelectButton(i,o),$("#js_up_cancel").click(function(){
var e=$(this).data("uid");
new _({
dom:$(this),
content:"你尚未保存视频信息，取消上传将清除已上传的数据，是否确定取消本次上传？",
buttons:[{
text:"确定",
click:function(){
var t=this;
tvu.cancel(n[e])&&($("#js_up_status").html(""),$("#js_up_status_wrap").hide(),t.hide(),
i.show(),b.vid=""),this.remove();
},
type:"primary"
},{
text:"继续上传",
click:function(){
this.remove();
}
}]
});
});
}
function n(){
if(!b.vid)return d.err("请上传视频"),!1;
if("上传中"==b.vid)return d.err("请等待视频上传完成"),!1;
if("上传失败"==b.vid)return d.err("视频上传失败，请重新上传"),!1;
if(""==b.title)return d.err("标题不能为空"),!1;
if(b.title.length>21)return d.err("标题超过字数限制"),!1;
if(""==b.digest)return d.err("简介不能为空"),!1;
if(b.digest.length>120)return d.err("简介字数超过限制"),!1;
if(""==b.newsubcat||"请选择"==b.newsubcat)return d.err("分类不能为空"),!1;
if(""!=$("#js_tag_input").val().trim())return d.err("标签最多5个"),!1;
x.title0=b.title.toString().trim(),x.digest0=b.digest.toString().trim(),x.newsubcat=b.newsubcat,
x.newcat=b.newcat;
var e=[],t=0;
return $(".video_tag").each(function(){
e[t]=$(this).attr("title").trim(),t++;
}),x.tags=e.join("|"),x.content0=b.vid,b.agree?!0:(d.err("请阅读同意《腾讯视频上传服务规则》"),!1);
}
function o(e){
if($(e).val().length>10)return d.err("单个标签最多10个字"),!1;
if($(".video_tag").length>4)return d.err("最多5个标签"),!1;
$(e).before(wx.T(g,{
title:$(e).val()
})),$(e).val("");
var t=[],i=0;
$(".video_tag").each(function(){
t[i]=$(this).attr("title").trim(),i++;
}),b.tag=t.join("|");
}
var a=e("biz_common/moment.js"),s=e("common/wx/dialog.js"),r=28,c=wx.getBanInfo(r);
if(c)return s.show({
msg:"经用户投诉，你的帐号上传的视频%s，已封禁添加视频能力至%s。".sprintf(c.reason_desc,c.ban_time==c.unlock_time?"永久":a.unix(c.unlock_time).format("YYYY年MM月DD日")),
buttons:[{
text:"返回",
click:function(){
this.remove(),location.href=wx.url("/cgi-bin/appmsg?begin=0&count=9&action=list_video&type=15");
}
}]
}),void $(".pop_closed").click(function(){
location.href=wx.url("/cgi-bin/appmsg?begin=0&count=9&action=list_video&type=15");
});
e("common/qq/tvu.uploader.js"),e("biz_web/ui/checkbox.js"),e("common/wx/popup.js");
var d=e("common/wx/Tips.js"),u=e("biz_web/ui/input/lentips.js"),l=e("media/media_cgi.js"),_=e("common/wx/popover.js"),p=(e("common/wx/popup.js"),
e("common/wx/videoChange.js"),e("common/wx/Cgi.js")),m=e("tpl/media/video_edit.html.js"),g=e("tpl/media/video_edit_tag.html.js"),v=e("tpl/media/video_edit_up.html.js"),f=(e("common/wx/verifycode.js"),
e("tpl/simplePopup.html.js")),h=e("common/wx/browserVersion.js"),w=e("common/wx/ban.js");
e("widget/upload.css"),e("widget/dropdown.css"),e("widget/media/video/edit.css");
var j=wx.cgiData.catData.catlist;
document.domain="qq.com";
var b={
title0:"",
digest:"",
newsubcat:"请选择",
newcat:"",
tag:"",
vid:"",
agree:""
},x={
title0:"",
digest0:"",
newsubcat:"",
newcat:"",
tags:"",
type:15,
AppMsgId:"",
need_open_comment0:wx.cgiData.can_use_comment?1:0,
only_fans_can_comment0:0,
content0:"",
contenturl0:"",
count:1,
fileid0:"",
cdn_url0:""
},k=function(e){
e=e||"";
var n=e&&e.dom||$(".form_wrp");
if(n.html(wx.T(m,{
sel_up_type:""==e?1:e.sel_up_type,
can_up:""==e?1:e.can_up,
title:""==e?"":e.title,
newsubcat:""==e?"请选择":""==e.newsubcat?e.cat:e.newsubcat,
catlist:j,
taglist:""==e?[]:""==e.tags||void 0==e.tags?[]:e.tags,
digest:""==e?"":e.digest,
has_rule:""==e?1:e.has_rule,
can_save:""==e?1:e.can_save,
can_preview:""==e?"":e.can_preview,
ori_video_mgr:wx.cgiData.ori_video_mgr,
status:""==e?"":e.status,
video_ori_status:""==e?"":e.video_ori_status,
can_use_comment:wx.cgiData.can_use_comment,
need_open_comment:""==e?1:Number(e.need_open_comment),
only_fans_can_comment:""==e?0:e.only_fans_can_comment?1:0
})),""!=e&&(b.title=e.title,b.digest=e.digest,b.newsubcat=""==e.newsubcat?e.cat:e.newsubcat,
b.newcat=e.newcat,b.tag=e.tags,b.vid=e.content,b.agree=1,b.status=e.status,x.AppMsgId=e.app_id,
$("#js_save").removeClass("btn_disabled"),$("#js_preview").removeClass("btn_disabled"),
3==e.status),t(),0==e.can_up){
var o=wx.cgiData.appmsg_data.content,a=wx.cgiData.appmsg_data.img_url;
x.cdn_url0=a;
var s,r=a;
$(".js_video_pic").css({
"background-image":"url("+a+")"
}),$("#js_set_cover").click(function(){
$(template.render("js_video_dialog",{
url:a
})).popup({
title:"设置封面",
className:"wx_video_thumb_setting_dialog",
width:980,
buttons:[{
text:"确定修改",
type:"primary",
click:function(){
x.cdn_url0=r,$(".js_video_pic").css({
"background-image":"url("+r+")"
}),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
var e=this,t=e.$dialogWrp.eq(0).find(".js_video_pic"),i=e.$dialogWrp.eq(0).find(".js_cover_loading");
i.hide(),s=e.$dialogWrp.eq(0).find(".js_btn").eq(0),s.disable();
var n=new tvp.VideoInfo;
n.setVid(o);
var a=new tvp.Player;
a.create({
width:480,
height:360,
video:n,
vodFlashExtVars:{
searchbar:0,
searchpanel:0,
clientbar:0,
showend:0
},
modId:"js_video_player",
autoplay:!0,
onplaying:function(){
this.pause();
},
onpause:function(){
0!=a.getPlaytime()&&(s.disable(),t.hide(),i.show(),p.post({
url:wx.url("/cgi-bin/video_mgr?action=get_plugin_token&token="+location.href.substring(parseInt(location.href.indexOf("token="))+6))
},function(e){
p.get({
url:"https://ui.video.qq.com/cgi-bin/cropvidcap",
data:{
otype:"json",
jsonp:0,
bid:"weixin_mp",
vid:o,
open_uid:wx.cgiData.plugin_login_info_app_id,
open_token:e.plugin_login_info.plugin_token,
start:a.getPlaytime()
}
},function(e){
"o"==e.s?(t.css({
"background-image":"url("+e.preview_url+")"
}),t.show(),i.hide(),r=e.preview_url):"f"==e.s&&d.err("系统错误，请重试"),s.enable();
});
}));
}
});
},
onHide:function(){
this.remove();
}
});
});
}else i();
};
return{
init:k
};
});