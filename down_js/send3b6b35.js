define("message/send.js",["common/qq/emoji.js","common/wx/richEditor/msgSender.js","message/message_cgi.js","message/renderList.js","common/wx/verifycode.js"],function(e){
"use strict";
e("common/qq/emoji.js");
var t=wx.cgiData,i=t.tofakeid,n=(t.to_nick_name,t.msg_items.msg_item),s=e("common/wx/richEditor/msgSender.js"),a=e("message/message_cgi.js");
$("#js_nick_name").html(t.to_nick_name.emoji());
var o=1e3,r=5*o;
!function(){
function t(e){
if(!(e.length<=0)){
var t=e[0];
c=t.fakeid,d=t.id,g=t.date_time,l({
container:"#listContainer",
preAppend:!0,
list:e
});
}
}
function m(e){
return 20*o>e&&(e+=5*o),e;
}
var c,d,g,l=e("message/renderList.js"),_=function(){
a.getNewMsg(i,c,d,g,function(e){
e.each(function(e){
1==e.type&&e.content&&(e.content=e.content.html(!0)),e.remark_name&&(e.remark_name=e.remark_name.html(!0));
}),t(e),r=e.length<=0?m(r):5*o,setTimeout(_,r);
},function(){
r=m(r),setTimeout(_,r);
});
};
t(n),setTimeout(_,r);
{
var f=new s($("#js_msgSender"),{
data:{
type:1
},
acl:wx.acl.single_msg_acl
}),u=null,h=$("#verifycode");
e("common/wx/verifycode.js");
}
$("#js_submit").click(function(){
var e=f.getData();
if(!e.error){
var t=e.data;
if(t.tofakeid=i,t.fileid=t.file_id,t.appmsgid=t.app_id,wx.cgiData.quickReplyId.length>0&&(t.quickReplyId=wx.cgiData.quickReplyId),
null!=u&&u.getCode().trim().length<=0)return Tips.err("请输入验证码"),void u.focus();
t.imgcode=u&&u.getCode().trim();
var n=$(this).btn(!1);
a.sendMsg(t,function(){
n.btn(!0),h.html("").hide(),u=null,f.clear(),f.emotionEditor.insertHTML(),r=3*o,
setTimeout(_,r);
},function(e){
h.html("").hide(),n.btn(!0),e.base_resp&&200008==e.base_resp.ret?(u=h.html("").show().verifycode().data("verifycode"),
u.focus()):e.base_resp&&1530500==e.base_resp.ret?$(".js_warn").text("请勿添加其他公众号的主页链接").show():e.base_resp&&1530507==e.base_resp.ret&&$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();
});
}
});
}(t);
});