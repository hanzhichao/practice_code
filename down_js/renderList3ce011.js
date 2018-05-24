define("message/renderList.js",["common/qq/emoji.js","common/wx/simplePopup.js","tpl/media/outdate.html.js","common/qq/Class.js","common/wx/media/img.js","common/wx/media/audio.js","common/wx/media/video.js","common/wx/media/idCard.js","tpl/msgListItem.html.js","common/wx/remark.js","common/wx/media/simpleAppmsg.js","common/qq/events.js","message/message_cgi.js","common/wx/time.js","common/wx/Tips.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/preview.js","common/wx/popup.js","biz_web/ui/checkbox.js","tpl/message/video_popup.html.js","common/wx/RichBuddy_tag.js","common/wx/RichBuddy.js","common/wx/richEditor/emotionEditor.js","common/wx/verifycode.js"],function(e){
"use strict";
function t(e,t){
console.log("buddy",wx.cgiData);
var i=new L;
$(".avatar",e).mouseover(function(){
var e=$(this),n=e.attr("data-fakeid"),a=parseInt(e.attr("data-id"),10),o=e.offset(),s=e.width();
if(n!=wx.data.uin){
var r;
r=1==wx.cgiData.new_user_tag?t.refer&&"message"==t.refer?{
id:n,
tmpmsgid:a,
listOpt:t
}:{
id:n
}:{
fakeId:n,
tmpmsgid:a
},r.position={
left:o.left+s+2,
top:o.top
},i.show(r);
}
}).mouseout(function(){
i.hide();
});
}
function i(e){
if("star"==e.action)return!1;
var t={
2:{
className:"img_out_date_context",
type:"img"
},
3:{
className:"audio_out_date_context",
type:"audio"
},
4:{
className:"video_out_date_context",
type:"video"
},
15:{
className:"video_out_date_context",
type:"video"
},
47:{
className:"img_out_date_context",
type:"img"
},
62:{
className:"video_out_date_context",
type:"video"
}
},i=t[e.item.type];
if(!i)return!1;
var n=e.item;
return+new Date-1e3*n.date_time>2592e5?(e.dom&&$(e.dom).html(wx.T(l,{
item:n,
className:i.className||"",
type:i.type||""
})),!0):!1;
}
function n(e){
$(".js_changeRemark",e).unbind("click").click(function(){
var t=$(this),i=(t.closest("li.msgListItem"),t.attr("data-fakeid")),n=$(".nickname[data-fakeid="+i+"]",e),a=$(".remark_name[data-fakeid="+i+"]",e),o=""==$.trim(n.html())?"":a.html();
g.show(i,o);
}),w.on("Remark:changed",function(t,i){
var n,a,o,s;
n=$(".nickname[data-fakeid="+t+"]",e),a=$(".remark_name[data-fakeid="+t+"]",e),o=""==$.trim(n.html())?"":a.html(),
s=""==o?a.html():n.find("strong").html(),""==i&&""!=o?(n.html(""),a.html(s)):""!=i&&""==o?(a.html(i),
n.html("(<strong>{nickName}</strong>)".format({
nickName:s
}))):""!=i&&""!=o&&a.html(i);
});
}
function a(e){
$(e).off("click",".js_save").on("click",".js_save",function(){
var e=$(this),t=e.attr("idx"),i=e.attr("data-type");
if(4==i)$(R).popup({
title:"保存为视频消息",
onOK:function(){
var e=this.get().find(".title").val(),i=this.get().find(".digest").val();
return e.length<1||e.length>64?(k.err("请输入1到64个字的标题"),!0):""!=i&&i.length>120?(k.err("简介字数不能超过120字"),
!0):void b.save(t,e,i,function(){});
},
onCancel:function(){
this.hide();
},
onHide:function(){
this.remove();
}
});else if(3==i){
{
$("#saveTpl").popup({
title:"保存素材",
buttons:[{
text:"确定",
type:"primary",
click:function(){
$(".jsSaveInput").val().length>0?$(".jsTypeInput[checked=checked]").length>0?o(t,$(".jsSaveInput").val(),$(".jsTypeInput[checked=checked]").data("value"),this):k.err("请选择分类"):k.err("标题不能为空");
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}
$(".jsTypeInput").checkbox(),$(".jsSaveInput").placeholder();
}else new m(2==i?{
title:"填写素材名字",
callback:function(e){
b.save(t,e,function(){},"",4);
},
rule:function(e){
var t=$.trim(e);
return""!=t&&t.length<=50&&-1==t.indexOf(" ");
},
msg:"素材名必须为1到50个字符，并且素材名不能包含空格"
}:{
title:"填写素材名字",
callback:function(e){
b.save(t,e,function(){});
},
rule:function(e){
var t=$.trim(e);
return""!=t&&t.length<=50&&-1==t.indexOf(" ");
},
msg:"素材名必须为1到50个字符，并且素材名不能包含空格"
});
});
}
function o(e,t,i,n){
b.saveVoice(e,t,i,function(){
n.remove();
});
}
function s(e){
e.off("click",".js_star").on("click",".js_star",function(){
var e=$(this),t=e.attr("idx"),i=e.attr("action"),n=e.attr("starred");
b.star(t,n,function(){
1==n?(e.removeClass("star_orange").addClass("star_gray"),e.attr("starred",0)):(e.removeClass("star_gray").addClass("star_orange"),
e.attr("starred",1)),e.attr("title",1==n?"收藏消息":"取消收藏"),"star"==i&&1==n&&$("#msgListItem"+t).fadeOut();
});
});
}
function r(e){
var t=!y(wx.cgiData.func_ban_info,"single-send",function(){
$(".js_reply_OK").btn(!1,"btn_disabled"),$("#js_submit").btn(!1,"btn_disabled"),
$(".tab_panel").find(".js_editorArea:visible").removeAttr("contenteditable").parent().parent(".js_editor").addClass("disabled");
});
e.off("click",".js_reply").on("click",".js_reply",function(){
var i=$(this),n=i.data("id"),a=$("#msgListItem"+n).toggleClass("replying");
$("#msgListItem"+n).hasClass("replying")&&I.get({
url:"/cgi-bin/singlesend?action=check",
data:{
tofakeid:$(this).data("tofakeid")
}
}).callback(function(e){
0==e.base_resp.ret||(10700==e.base_resp.ret?k.err("该用户已经取消关注，你无法再给他发送消息。"):10701==e.base_resp.ret?k.err("该用户已被加入黑名单，无法向其发送消息"):10706==e.base_resp.ret&&k.err("由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。")),
0!=e.base_resp.ret||t?($("#msgListItem"+n).find(".js_editorArea:visible").removeAttr("contenteditable").parent().parent(".js_editor").addClass("disabled"),
$("#msgListItem"+n).find(".js_reply_OK").btn(!1,"btn_disabled")):($("#msgListItem"+n).find(".js_editorArea:visible").attr("contenteditable","true").focus().parent().parent(".js_editor").removeClass("disabled"),
$("#msgListItem"+n).find(".js_reply_OK").btn(!0,"btn_disabled"));
}),$(".replying",e).each(function(){
var e=$(this),t=e.data("id");
t!=n&&e.removeClass("replying");
}),a.data("hasClickQuickReply")||(c(a.find(".js_quick_reply_box"),a),a.data("hasClickQuickReply",!0));
});
}
function c(t,i){
var n=600,a=$(".js_editor",t),o=new O(a,{
wordlimit:n,
isHTML:!0
}),s=$(".js_reply_OK",t),r=$(".js_reply_pickup",t);
r.unbind("click").click(function(){
var e=$(this).data("id");
$("#msgListItem"+e).removeClass("replying");
}),t.keydown(function(e){
return wx.isHotkey(e,"enter")?(s.click(),!1):void 0;
});
{
var c=null,d=$(".verifyCode",t);
e("common/wx/verifycode.js");
}
s.unbind("click").click(function(){
var e=$(this),t=e.data("id"),a=e.data("fakeid"),s=o.getContent();
if(!e.find(".js_reply_OK").hasClass("disabled")){
if(s.length<=0||s.length>n)return void k.err("快捷回复的内容必须为1到600个字符");
if(null!=c&&c.getCode().trim().length<=0)return k.err("请输入验证码"),void c.focus();
k.suc("回复中...请稍候"),e.btn(!1),b.quickReply({
toFakeId:a,
content:s,
quickReplyId:t,
imgcode:c&&c.getCode().trim()
},function(){
o.setContent(""),d.html("").addClass("dn"),c=null,i.addClass("replyed"),e.btn(!0);
},function(t){
e.btn(!0),t&&t.base_resp&&200008==t.base_resp.ret?(c=d.html("").removeClass("dn").verifycode().data("verifycode"),
c.focus()):t&&t.base_resp&&1530500==t.base_resp.ret?$(".js_warn").text("请勿添加其他公众号的主页链接").show():t&&t.base_resp&&1530507==t.base_resp.ret&&$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();
});
}
}),$(window).on("keyup",function(){
$(".js_warn").hide();
});
}
function d(e){
e.on("click",".simple_img a",function(){
var t=$(this),i=[],n=0;
return e.find(".simple_img a").each(function(e,a){
a===t[0]&&(n=i.length);
var o=$(a).attr("href")||"";
o&&i.push({
imgsrc:o,
downsrc:$(a).closest(".message_item").find(".download_gray").attr("href")
});
}),i.length>0&&q.show({
imgdata:i,
current:n
}),!1;
});
}
e("common/qq/emoji.js");
var m=e("common/wx/simplePopup.js"),l=e("tpl/media/outdate.html.js"),u=(e("common/qq/Class.js"),
e("common/wx/media/img.js")),f=e("common/wx/media/audio.js"),p=e("common/wx/media/video.js"),_=e("common/wx/media/idCard.js"),v=e("tpl/msgListItem.html.js"),g=e("common/wx/remark.js"),h=e("common/wx/media/simpleAppmsg.js"),j=e("common/qq/events.js"),w=j(!0),b=e("message/message_cgi.js"),x=e("common/wx/time.js"),k=e("common/wx/Tips.js"),y=e("common/wx/ban.js"),C=x.timeFormat,I=e("common/wx/Cgi.js"),q=e("common/wx/preview.js");
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var L,R=e("tpl/message/video_popup.html.js"),T=!1;
L=e(1==wx.cgiData.new_user_tag?"common/wx/RichBuddy_tag.js":"common/wx/RichBuddy.js");
var N={
1:function(e,t){
return e.html(t.content.emoji());
},
2:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
return a===!1?new u({
container:$("#"+e.attr("id")),
file_id:0,
msgid:t.id,
source:t.source,
fakeid:t.fakeid
}):void 0;
},
47:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
return a===!1?new u({
container:$("#"+e.attr("id")),
file_id:0,
msgid:t.id,
source:t.source,
fakeid:t.fakeid
}):void 0;
},
3:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
if(a===!1){
var o=t;
return o.selector="#"+e.attr("id"),o.qqmusictpl=!0,new f(o);
}
},
4:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
if(a===!1){
var o=t;
return o.selector="#"+e.attr("id"),o.ff_must_flash=!0,new p(o);
}
},
42:function(e,t){
var i=t;
return i.container="#"+e.attr("id"),new _(i);
},
10:function(e,t){
var i=t;
return i.container="#"+e.attr("id"),new h(i);
},
15:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
if(a===!1){
var o=t;
return o.selector=e,o.tpl="videomsg",o.id=1e5*Math.random()|0,new p(o);
}
},
62:function(e,t,n){
var a=i({
item:t,
dom:e,
action:n
});
if(a===!1){
var o=t;
return o.selector="#"+e.attr("id"),o.ff_must_flash=!0,"star"==e.closest("li").find(".js_star").attr("action")&&(o.video_url=t.cdn_video_url,
o.video_thumb_url=t.cdn_video_thumb_url),new p(o);
}
}
},O=e("common/wx/richEditor/emotionEditor.js"),A=function(){
console.log("initImg"),$(".avatar img").each(function(){
var e=$(this);
e.data("src")&&(e.attr("src",e.data("src")),e.removeAttr("data-src"));
});
},D=function(e){
if(console.log(e),e.list){
{
var o=e.list,c={};
o.length;
}
template.helper("mediaInit",function(e){
return e.id?(c[e.id]=e,""):"";
}),template.helper("timeFormat",function(e){
return C(e.date_time);
}),template.helper("id2singleURL",function(e){
return wx.url("/cgi-bin/singlesendpage?tofakeid=%s&t=message/send&action=index&quickReplyId=%s".sprintf(e.fakeid,e.id));
});
var m=e.filterData||{};
o.each(function(t){
t.video_url&&(t.type=15),t.type={
5:10,
6:10,
11:10,
16:15
}[t.type]||t.type;
var n={
1:0,
47:11,
2:11,
3:11,
4:1,
10:0,
15:11,
42:11,
62:wx.acl.msg_acl.can_use_shortvideo?10:0
}[t.type];
n="undefined"==typeof n?111:n,t.btnsave=2==(2&n),t.btndown=1==(1&n),t.outdate=i({
item:t,
action:e.action
}),"undefined"!=typeof t.busi_filter_value&&m.isFixed===!0&&(t.busi_filter_value=(t.busi_filter_value/100).toFixed(2)),
m.str&&"undefined"!=typeof t.busi_filter_value&&(t.busi_filter_value_str=m.str.sprintf(t.busi_filter_value));
});
var l=$(e.container),u=$(wx.T(v,{
token:wx.data.t,
list:o,
uin:wx.data.uin,
action:e.action,
filterData:m
}).trim());
e.preAppend?u.prependTo(l):u.appendTo(l),"star"==e.action&&$(".empty_tips").text("暂未收藏消息，已收藏的消息，会被永久保存。"),
T?A():(T=!0,console.log("before bind load"),$(window).on("load",function(){
console.log("window onload"),A();
})),$(".wxMsg",u).each(function(){
var t=$(this),i=t.data("id"),n=c[i];
if(n){
var a=n.type;
a&&N[a]&&N[a](t,n,e.action);
}
}),t(l,e),n(l),a(l),s(l),r(l),d(l);
}
};
return D;
});