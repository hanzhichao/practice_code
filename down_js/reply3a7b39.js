define("common/wx/reply.js",["tpl/reply.html.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/replyContent.html.js","common/wx/richEditor/emotionEditor.js","biz_common/moment.js","common/wx/popover.js","common/qq/emoji.js","biz_common/xss.js"],function(e,t,o){
"use strict";
function n(e){
function t(e){
return e=e||"",e.emoji();
}
var o={};
if(this.$dom=o,this.opt=e,!($(e.appendTo).find(".jsReplyBox").length>0)){
if(e.replyList&&1==e.replyList.length){
var n=e.replyList[0].content;
e.replyList[0].content=t(h(n));
}
o.container=$(e.appendTo).append(template.compile(r)({
label:e.label,
replyList:e.replyList,
img:wx.url("/misc/getheadimg?fakeid="+wx.data.fakeid)
}));
var i=e.wordlimit||140,c=e.comment_id,u=e.content_id;
o.box=o.container.find(".jsReplyBox"),o.editor=o.container.find(".jsReplyEditor"),
o.send=o.container.find(".jsReplySend"),o.cancel=o.container.find(".jsReplyCancel"),
o.del=o.container.find(".jsPageReplyDel"),o.clickBt=$(e.clickBt);
var y=new p(o.editor,{
wordlimit:i,
isHTML:!0
});
this.editor=y,o.box.keyup(function(e){
return wx.isHotkey(e,"enter")?(o.send.click(),!1):void 0;
}),o.container.on("click",".jsReplyDel",function(){
var e=$(this),t=new a({
dom:$(this),
content:$("<p>确认删除该条回复？</p>").html(),
place:"bottom",
margin:"center",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
m.post({
url:wx.url("/misc/appmsgcomment?action=delete_reply"),
data:{
reply_id:e.data("replyid"),
comment_id:c,
content_id:u
}
},function(n){
0==n.base_resp.ret?(s.suc("删除成功"),$(e).closest(".jsReplyBackBox").remove(),o.clickBt.show()):s.err("系统错误，请稍后再试"),
t.hide();
},function(){
s.err("系统错误，请稍后再试"),t.hide();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
}),o.send.click(function(){
var e=y.getContent();
if(e.length<=0||e.length>i)return void s.err("快捷回复的内容必须为1到"+i+"个字符");
s.suc("回复中...请稍候");
var n=$(this).btn(!1);
m.post({
url:wx.url("/misc/appmsgcomment?action=reply_comment"),
data:{
comment_id:c,
content_id:u,
content:e
}
},function(i){
0==i.base_resp.ret?(s.suc("回复成功"),o.box.hide(),o.clickBt.hide(),o.container.append(template.compile(l)({
content:h(t(e)),
time:d.unix(+new Date/1e3).format("YYYY-MM-DD HH:mm:ss"),
comment_id:c,
content_id:u,
reply_id:i.reply_id
}))):s.err(15901==i.base_resp.ret?"您已经回复过该留言":15902==i.base_resp.ret?"只有精选留言才能回复":15903==i.base_resp.ret?"作者回复不能超过140个字":"系统错误，请稍后再试"),
n.btn(!0);
},function(){
n.btn(!0);
});
}),o.cancel.click(function(){
o.box.hide();
});
}
}
function i(){
this.$dom.box.show(),this.editor.focus();
}
function c(){
this.$dom.box.hide();
}
var r=e("tpl/reply.html.js"),s=e("common/wx/Tips.js"),m=e("common/wx/Cgi.js"),l=e("tpl/replyContent.html.js"),p=e("common/wx/richEditor/emotionEditor.js"),d=e("biz_common/moment.js"),a=e("common/wx/popover.js");
e("common/qq/emoji.js");
var h=e("biz_common/xss.js");
window.Xss=h,o.exports=n,n.prototype.show=i,n.prototype.hide=c;
});