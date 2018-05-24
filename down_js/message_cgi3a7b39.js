define("message/message_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","resp_types/base_resp.rt.js"],function(e,s,r){
"use strict";
var t={
masssend:"/cgi-bin/masssend?t=ajax-response",
massTimesend:"/cgi-bin/masssend?action=time_send&t=ajax-response",
massCheckTimer:"/cgi-bin/masssend?action=check_send_time",
massdel:"/cgi-bin/masssendpage?action=delete",
star:"/cgi-bin/setstarmessage?t=ajax-setstarmessage&only_cdn=0",
save:"/cgi-bin/savemsgtofile?t=ajax-response&only_cdn=0",
sendMsg:"/cgi-bin/singlesend?t=ajax-response&f=json",
getNewMsg:"/cgi-bin/singlesendpage?tofakeid=%s&f=json&action=sync&lastmsgfromfakeid=%s&lastmsgid=%s&createtime=%s",
getNewMsgCount:"/cgi-bin/getnewmsgnum?f=json&t=ajax-getmsgnum&lastmsgid=",
pageNav:"/cgi-bin/message?f=json&offset=%s&day=%s&keyword=%s&action=%s&frommsgid=%s&count=%s",
searchMsgByKeyword:"/cgi-bin/getmessage?t=ajax-message&count=10&keyword=",
checkcopyright:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
checkSponsorAd:"/cgi-bin/masssend?action=check_ad"
},n=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),o=e("common/wx/dialog.js"),a=e("resp_types/base_resp.rt.js");
r.exports={
masssend:function(e,s,r){
i.post({
url:wx.url(e.send_time?t.massTimesend:t.masssend),
data:e,
rtDesc:$.extend({},a,{
month_max_count:"number",
month_cur_count:"number",
pub_product_count:"number"
}),
error:function(){
n.err("发送失败"),r&&r();
}
},function(t){
if(!t||!t.base_resp)return n.err("发送失败"),void(r&&r(t));
var i=t.base_resp.ret;
if("0"==i){
var a="";
return a=e.send_time?"定时发送成功":"发送成功",n.suc(a),void(s&&s(t));
}
if("67016"==i){
var c=t.video_title?"视频《%s》".sprintf(t.video_title):"视频";
n.err(c+"还在审核中，若审核失败则将无法播放");
}else if("67015"==i){
var c=t.video_title?"视频《%s》".sprintf(t.video_title):"视频";
n.err(c+"已被下架或删除，无法播放，请重新选择");
}else if("67012"==i)n.err("设置失败，定时时间与已有互选广告订单时间冲突");else if("67013"==i)n.err("设置失败，定时时间超过卡券有效期");else if("200002"==i)n.err("系统错误，请稍后再试");else if("200013"==i)n.err("操作太频繁，请稍后再试");else if("67014"==i)n.err("该时刻定时消息过多，请选择其他时刻");else if("67011"==i)n.err("设置的定时群发时间错误，请重新选择");else if("64004"==i)n.err(e.send_time?"剩余定时群发数量不足":"今天的群发数量已到，无法群发");else if("67008"==i)n.err("消息中可能含有具备安全风险的链接，请检查");else if("200008"==i)n.err("请输入验证码");else if("14002"==i)n.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行卡券投放。");else if("200001"==i)n.err("文章包含的语音已被删除，请重新添加。");else if("14003"==i)n.err("投放用户缺少测试权限，请先设置白名单");else if("67010"==i);else if("155001"==i){
var a=t.month_cur_count>=t.month_max_count?"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你已超过限制数量，不能再发送付费文章":"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你还可以发送"+(t.month_max_count-t.month_cur_count)+"篇付费文章，请重新设置。";
o.show({
type:"warn",
msg:a,
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}else"1530505"!=i||"1530512"!=i||"200043"==i&&o.show({
msg:"图文中包含没有关联的小程序，请删除后再群发。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
r&&r(t);
});
},
massCheckTimer:function(e,s,r){
i.post({
url:wx.url(t.massCheckTimer),
data:e,
rtDesc:$.extend({},a,{
time_now:"number"
}),
error:function(){
n.err("校验定时群发失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("校验定时群发失败"),void(r&&r(e));
var t=e.base_resp.ret;
return"0"==t?void(s&&s(e)):("67018"==t?(e.customerMsg="你已设置过相同时间的定时消息，请到定时列表检查，避免重复操作。",
n.err(e.customerMsg)):n.err("67014"==t?"该时刻定时消息过多，请选择其他时刻":"67012"==t?"设置失败，定时时间与已有互选广告订单时间冲突":"67013"==t?"设置失败，定时时间超过卡券有效期":"200013"==t?"操作频率过高，请明天再试":"64004"==t?"剩余定时群发数量不足":"67011"==t?"设置的定时群发时间错误，请重新选择":"系统繁忙，请稍后再试"),
void(r&&r(e)));
});
},
checkCopyright:function(e,s,r){
return i.post({
url:wx.url(t.checkcopyright),
data:e,
rtDesc:$.extend({},a,{
list:"string"
}),
error:function(e,s){
r&&r(s);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):(i.handleRet(e,{
id:64462,
key:49,
url:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
showMsg:!1
}),void(r&&r(e)));
});
},
checkSponsorAd:function(e,s,r){
return i.post({
url:wx.url(t.checkSponsorAd),
data:e,
error:function(e,s){
s&&s(status);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):void(r&&r(e));
});
},
massdel:function(e,s,r,o){
i.post({
url:wx.url(t.massdel),
data:{
id:e,
idx:o
},
error:function(){
n.err("删除失败");
}
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?(n.suc("删除成功"),void(s&&s(e))):(i.handleRet(e,{
id:64462,
key:50,
url:"/cgi-bin/masssendpage?action=delete",
msg:"删除失败"
}),void(r&&r(e)));
});
},
getNewMsg:function(e,s,r,n,o,a){
i.get({
url:wx.url(t.getNewMsg.sprintf(e,s,r,n)),
mask:!1,
handlerTimeout:!0,
error:a
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.page_info.msg_items.msg_item):i.handleRet(e,{
id:64462,
key:51,
url:"/cgi-bin/singlesendpage?action=sync",
showMsg:!1
});
});
},
saveVoice:function(e,s,r,o){
i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
title:s,
filename:s,
voice_cagtegory:r
},
error:function(){
n.err("保存语音失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存语音失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存语音成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:52,
url:"/cgi-bin/savemsgtofile",
msg:"保存语音失败"
});
});
},
save:function(e,s,r,o,a){
"function"==typeof r&&(o=r,r=""),i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
filename:s,
digest:r,
scene:a
},
error:function(){
n.err("保存素材失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存素材失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存素材成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:53,
url:"/cgi-bin/savemsgtofile",
msg:"保存素材失败"
});
});
},
star:function(e,s,r){
i.post({
mask:!1,
url:wx.url(t.star),
data:{
msgid:e,
value:1==s?0:1
},
error:function(){
n.err(1==s?"取消收藏失败":"收藏消息失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err(1==s?"取消收藏失败":"收藏消息失败");
var t=e.base_resp.ret;
0!=t?i.handleRet(e,{
id:64462,
key:54,
url:"/cgi-bin/setstarmessage",
msg:1==s?"取消收藏失败":"收藏消息失败"
}):(n.suc(1==s?"已取消收藏":"已收藏"),"function"==typeof r&&r(e));
});
},
sendMsg:function(e,s,r){
i.post({
url:wx.url(t.sendMsg),
data:e,
error:function(){
n.err("发送失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("发送失败"),void(r&&r(e));
var t=e.base_resp.ret;
return 0==t?(n.suc("回复成功"),void("function"==typeof s&&s(e))):(10703==t?n.err("对方关闭了接收消息"):10700==t?n.err("该用户已经取消关注，你无法再给他发送消息。"):10701==t?n.err("该用户已被加入黑名单，无法向其发送消息"):62752==t?n.err("消息中可能含有具备安全风险的链接，请检查"):10704==t?n.err("该素材已被删除"):10705==t?n.err("该素材已被删除"):10706==t?n.err("由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。"):200008==t?n.err("请输入验证码"):(1530500!=t||1530507!=t)&&i.handleRet(e,{
id:64462,
key:55,
url:"/cgi-bin/singlesend",
msg:"发送失败"
}),void(r&&r(e)));
});
},
getNewMsgCount:function(e,s,r){
i.post({
mask:!1,
handlerTimeout:!0,
url:wx.url(t.getNewMsgCount+e),
error:r
},function(e){
"function"==typeof s&&s(e),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:56,
url:"/cgi-bin/getnewmsgnum",
showMsg:!1
});
});
},
quickReply:function(e,s,r){
this.sendMsg({
mask:!1,
tofakeid:e.toFakeId,
imgcode:e.imgcode,
type:1,
content:e.content,
out_trade_no:e.out_trade_no,
appmsg:e.appmsg||"",
quickreplyid:e.quickReplyId
},s,r);
},
pageNav:function(e,s,r){
var n=t.pageNav.sprintf((e.page-1)*e.count,e.day||"",e.keyword||"",e.action||"",e.frommsgid||"",e.count||"");
i.post({
dataType:"json",
url:wx.url(n),
mask:!1,
data:{},
error:r
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?"function"==typeof s&&s(e.msg_items.msg_item):i.handleRet(e,{
id:64462,
key:57,
url:"/cgi-bin/message",
showMsg:!1
});
});
},
searchMsgByKeyword:function(e,s,r){
i.post({
dataType:"html",
mask:!1,
url:wx.url(url.searchMsgByKeyword+e),
error:function(){
n.err("系统发生异常，请刷新页面重试"),r&&r({});
}
},function(e){
"function"==typeof s&&s($.parseJSON(e)),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:58,
url:"/cgi-bin/getmessage",
showMsg:!1
});
});
}
};
});