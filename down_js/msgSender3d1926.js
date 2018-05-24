define("common/wx/richEditor/msgSender.js",["common/wx/popup.js","widget/msg_sender.css","common/qq/jquery.plugin/tab.js","common/wx/richEditor/emotionEditor.js","media/media_dialog.js","common/wx/media/factory.js","common/qq/Class.js","common/wx/Tips.js","common/wx/media/audio.js","common/wx/media/img.js","common/wx/media/video.js","common/wx/media/cardmsg.js","common/wx/tooltip.js","common/wx/media/appmsg.js","biz_web/utils/upload.js"],function(e){
"use strict";
function t(e,t){
for(var i=[],n=0;n<e.length;++n){
var s=e[n];
t&&t[s.acl]&&i.push(s);
}
return i;
}
function i(e){
var t={},i=e.slice();
i.push({
acl:"can_video_msg",
className:"tab_video",
selector:"js_videoArea",
text:"视频",
type:4,
index:3
},{
acl:"can_use_shortvideo",
className:"tab_video",
selector:"js_videoArea",
text:"视频",
type:21,
index:3
});
for(var n=0;n<i.length;++n){
var s=i[n];
s.index=s.index||n,t[s.type]=s;
}
return t;
}
e("common/wx/popup.js"),e("widget/msg_sender.css");
var n=(e("common/qq/jquery.plugin/tab.js"),e("common/wx/richEditor/emotionEditor.js")),s=e("media/media_dialog.js"),o=e("common/wx/media/factory.js"),a=e("common/qq/Class.js"),r=e("common/wx/Tips.js"),d=(e("common/wx/media/audio.js"),
e("common/wx/media/img.js"),e("common/wx/media/video.js"),e("common/wx/media/cardmsg.js")),p=(e("common/wx/tooltip.js"),
e("common/wx/media/appmsg.js"),e("biz_web/utils/upload.js")),c=1,m=[{
text:"图文消息",
acl:"can_app_msg",
className:"tab_appmsg",
selector:"js_appmsgArea",
type:10
},{
text:"文字",
acl:"can_text_msg",
className:"tab_text",
selector:"js_textArea",
innerClassName:"no_extra",
type:1
},{
text:"图片",
acl:"can_image_msg",
className:"tab_img",
selector:"js_imgArea",
type:2
},{
text:"语音",
acl:"can_voice_msg",
className:"tab_audio",
selector:"js_audioArea",
type:3
},{
text:"视频",
acl:"can_video_msg",
className:"tab_video",
selector:"js_videoArea",
type:15
},{
text:"商品消息",
acl:"can_commodity_app_msg",
className:"tab_commondity_appmsg",
selector:"js_commondityAppmsgArea",
type:11
},{
text:"卡券",
acl:"can_card_msg",
className:"tab_cardmsg",
selector:"js_cardmsgArea",
type:16
}],l=o.itemRender,g=a.declare({
select:function(){
this.msgSender.type=this.type;
},
fillData:function(){},
getData:function(){},
click:function(){
this.msgSender.type=this.type;
}
}),h=g.Inherit({
init:function(e){
this.msgSender=e,this.type=1,this.info=e.infos[this.type],this.wordlimit=e.opt.wordlimit,
this.index=this.info&&this.info.index;
},
fillData:function(e){
var t=this.msgSender;
t.type=this.type,t.select(this.index),t.emotionEditor.setContent(e.content);
},
getData:function(){
var e=this.msgSender.emotionEditor.getContent();
return{
type:this.type,
content:e
};
},
clear:function(){
return this.fillData({
content:""
});
},
isValidate:function(e){
var t=e&&1==e.type&&!!(""!=e.content&&e.content.length<=this.wordlimit);
return t||r.err("文字必须为1到%s个字".sprintf(this.wordlimit)),t;
},
click:function(){
var e=this;
this.msgSender.type=this.type,setTimeout(function(){
e.msgSender.emotionEditor.insertHTML();
});
}
}),u=g.Inherit({
init:function(e,t){
this.type=t,this.msgSender=e,this.info=e.infos[t],this.index=this.info&&this.info.index;
},
click:function(){
var e=this,t=this.type;
if(this.msgSender.type=t,3==t&&$("#msgSendAudioUploadBt").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
}),2==t){
var i="msgSendImgUploadBt";
p.uploadImageLibFile({
container:"#"+i,
type:t,
scene:5,
doublewrite:!0,
groupid:1,
pick:{
multiple:!1
},
onComplete:function(i,n,s,o){
if(console.log(o),0==o.base_resp.ret){
var a,r="msgSender_media_%s_%s".sprintf(e.msgSender.gid,t);
a=2==t?{
file_id:o.content,
source:"file"
}:{
file_id:o.content,
source:"file",
name:s.name,
play_length:s.size
},e&&e.info&&$("."+e.info.selector).find(".jsMsgSendTab").hide().after('<div id="%s"></div>'.sprintf(r)),
a.hasRecommend=!1,e&&e.msgSender&&(a.hasRecommend=e.msgSender.opt.isSupportShareMul),
l[t]&&l[t]("#"+r,a),e.msgSender.opt.onSelect&&e.msgSender.opt.onSelect(t,a);
}
},
onAllComplete:function(){
r.suc("上传成功");
}
});
}
if(10!=this.type&&2!=this.type&&3!=this.type&&11!=this.type&&15!=this.type){
var n=null;
return n=10==e.type||11==e.type||15==e.type?s.getAppmsg:3==e.type?s.getVoice:s.getFile,
n({
type:e.type,
scene:e.msgSender.opt.scene,
isSupportShareMul:e.msgSender.opt.isSupportShareMul,
hasAudioLengthLimit:!e.msgSender.opt.isSupportShareMul,
begin:0,
count:10,
onSelect:function(t,i){
var n=e.msgSender;
e.msgSender.type=t,n.select(e.index);
var s="msgSender_media_%s_%s".sprintf(n.gid,t);
$("."+e.info.selector).html('<div id="%s"></div>'.sprintf(s)),i.hasRecommend=e.msgSender.opt.isSupportShareMul,
l[t]&&l[t]("#"+s,i),2!=e.type&&3!=e.type&&15!=e.type&&$("#"+s).append('<a href="javascript:;" class="link_dele jsmsgSenderDelBt" onclick="return false;">删除</a>'),
e.msgSender.opt.onSelect&&e.msgSender.opt.onSelect(t,i);
}
}),!1;
}
},
fillData:function(e){
var t=this.msgSender,i=this.type,n="msgSender_media_%s_%s".sprintf(t.gid,i);
this.info&&$("."+this.info.selector).find(".jsMsgSendTab").hide().after('<div id="%s"></div>'.sprintf(n)),
t.select(this.index),this.msgSender.type=i,e.hasRecommend=this.msgSender.opt.isSupportShareMul,
l[i]&&l[i]("#"+n,e),2!=i&&3!=i&&15!=i&&$("#"+n).append('<a href="javascript:;" class="link_dele jsmsgSenderDelBt" onclick="return false;">删除</a>');
},
clear:function(){
var e=(this.type,$("."+this.info.selector));
return e.find(".jsMsgSendTab").show(),e.find(".jsmsgSenderDelBt").parent().remove(),
e.find(".js_previe_media_box").parent().empty(),e;
},
getData:function(e){
var t=this.type,i="msgSender_media_%s_%s".sprintf(this.msgSender.gid,t),n=$("#"+i).data("opt");
if(console.log("opt",n),n){
if(n.recommendEditor&&(n.recommendWording=n.recommendEditor.getContent()),n.imgWidth||(n.imgWidth=0),
n.imgHeight||(n.imgHeight=0),e){
n.type=t;
var s=n.data||{};
return $.extend(n,s);
}
return 10==t?{
smart_product:1==n.data.smart_product?1:0,
type:t,
app_id:n.data.app_id,
isMulti:(n.data.multi_item&&n.data.multi_item.length)>1?1:0
}:11==t?{
type:t,
app_id:n.data.app_id
}:15==t?{
type:t,
app_id:n.app_id,
vid:n.content,
recommendWording:n.recommendWording
}:2==t?{
type:t,
file_id:n.file_id,
copyright_status:n.copyright_status,
recommendWording:n.recommendWording,
width:n.imgWidth,
height:n.imgHeight
}:{
type:t,
file_id:n.file_id,
recommendWording:n.recommendWording
};
}
return!1;
},
isValidate:function(e){
var t=!!e;
if(e){
var i=e.type;
t=15==i?!(!e.type||!e.app_id&&!e.vid):10==i||11==i?!(!e.type||!e.app_id):!(!e.type||!e.file_id);
}
return t||$(".js_menuSetting").length||r.err("请添加素材"),t;
}
}),f={
wordlimit:600
},_=a.declare({
init:function(e,n){
var s=this,o=0;
e=$(e).show(),s.dom=e,s.gid=c++,s.opt=$.extend(!0,{},f,n);
var a=m,r=n&&n.acl||{};
a=t(a,r),s.infos=i(a),s.op={
1:new h(s),
2:new u(s,2),
3:new u(s,3),
4:new u(s,4),
5:new u(s,5),
6:new u(s,6),
7:new u(s,15),
9:new u(s,21),
10:new u(s,10),
11:new u(s,11),
15:new u(s,15),
16:new d(s),
21:new u(s,21)
},s.tab=e.tab({
index:o,
tabs:a,
select:function(){},
click:function(e,t,i,o){
return n.onClick&&n.onClick(e,t,i,o),s.op[o]&&s.op[o].click();
}
}),s._init(e,n),s.initEvent();
var p=n.data;
p?10==this.opt.data.type?p.data&&s.setData(p):s.setData(p):s.type=a[0]&&a[0].type?a[0].type:10;
},
initEvent:function(){
var e=this;
$(".jsMsgSenderPopBt").click(function(){
var t,i=$(this).data("type"),n=$(this).data("index"),o=$(".jsMsgSendTab[data-index="+n+"]");
t=10==i||11==i||15==i?s.getAppmsg:3==i?s.getVoice:s.getFile,console.log("当前类型：",i),
t({
type:i,
scene:e.opt.scene,
isSupportShareMul:e.opt.isSupportShareMul,
hasAudioLengthLimit:!e.opt.isSupportShareMul,
begin:0,
count:10,
onSelect:function(t,s){
e.type=t,e.select(n);
var a="msgSender_media_%s_%s".sprintf(e.gid,t);
$("#"+a).html("");
var r=2==t?' class="msgSender_media_classFixImg"':"";
o.hide().after('<div id="%s"%s></div>'.sprintf(a,r)),s.hasRecommend=e.opt.isSupportShareMul,
l[t]&&l[t]("#"+a,s),$("#"+a).data("opt",s),console.log("type:",i),console.log("opt:",s),
2!=i&&3!=i&&15!=i&&$("#"+a).append('<a href="javascript:;" class="jsmsgSenderDelBt link_dele" data-type="%s" onclick="return false;">删除</a>'.sprintf(t)),
e.opt.onSelect&&e.opt.onSelect(t,s);
}
});
}),console.log(this.dom),this.dom.on("click",".js_replace_media",function(){
console.log("test");
var t=parseInt($(this).parents(".js_previe_media_box").data("type"));
return $(this).parents(".js_previe_media_box").parent().siblings(".jsMsgSendTab").show(),
$(this).parents(".js_previe_media_box").parent().empty(),e.selectPopDialogByType(t),
!1;
}),this.dom.on("click",".jsmsgSenderDelBt",function(){
$(this).parent().siblings(".jsMsgSendTab").show(),$(this).parent().remove();
var t;
$("#msgSendImgUploadBt").is(":visible")&&0==$("#msgSendImgUploadBt").parent().find("input[type=file]").length?t=2:$("#msgSendAudioUploadBt").is(":visible")&&0==$("#msgSendAudioUploadBt").parent().find("input[type=file]").length&&(t=3),
3==t&&$("#msgSendAudioUploadBt").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
}),2==t&&p.uploadImageLibFile({
container:2==t?"#msgSendImgUploadBt":"#msgSendAudioUploadBt",
type:t,
scene:5,
doublewrite:!0,
groupid:1,
pick:{
multiple:!1
},
onComplete:function(i,n,s,o){
if(0==o.base_resp.ret){
var a,r="msgSender_media_%s_%s".sprintf(e.gid,t);
a=2==t?{
file_id:o.content,
source:"file"
}:{
file_id:o.content,
source:"file",
name:s.name,
play_length:s.size
},$(".jsMsgSendTab[data-type="+t+"]").hide().after('<div id="%s"></div>'.sprintf(r)),
a.hasRecommend=e.opt.isSupportShareMul,l[t]&&l[t]("#"+r,a),e.opt.onSelect&&e.opt.onSelect(t,a);
}
},
onAllComplete:function(){
r.suc("上传成功");
}
});
});
},
setData:function(e){
if(e){
var t=this,i=null,n=e.type||10;
t.type=n,(i=t.op[n])&&i.fillData(e);
}
},
_init:function(e){
this.dom=e,this.emotionEditor=new n($(".js_textArea",e),{
wordlimit:this.opt.wordlimit,
linebreak:!0
});
},
selectPopDialogByType:function(e){
$(".jsMsgSenderPopBt[data-type='"+e+"']").click();
},
getData:function(e){
if(this.type){
var t=this.op[this.type].getData(e);
return{
error:!this.isValidate(),
data:t
};
}
return{
error:!0
};
},
getArea:function(e){
return this.dom.find("."+this.infos[e].selector);
},
getTabs:function(){
return this.tab.getTabs();
},
isValidate:function(){
var e=this.type&&this.op[this.type].getData();
return console.log(this.op),console.log(this.type),console.log(this.op[this.type]),
this.type&&this.op[this.type].isValidate(e);
},
clear:function(){
return this.type&&this.op[this.type].clear();
},
select:function(e){
return this.tab.select(e);
}
});
return _;
});