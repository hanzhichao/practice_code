define("reward/allreward.js",["common/wx/top.js","biz_common/moment.js","common/wx/richEditor/emotionEditor.js","common/wx/verifycode.js","message/message_cgi.js","common/wx/Tips.js","biz_web/ui/dateRange.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/Cgi.js","common/wx/RichBuddy_tag.js","biz_web/ui/dropdown.js"],function(t){
"use strict";
function e(t){
l.post({
url:"/merchant/reward?action=addrewardblacklist",
data:{
fakeid:t.data("fakeid")
}
}).callback(function(e){
0==e.base_resp.ret?$(".js_icon_del[data-fakeid="+t.data("fakeid")+"]").each(function(t,e){
$(e).parent().html('<span class="tips_global">头像已隐藏</span>');
}):(l.handleRet(e,{
id:64462,
key:28,
url:"/merchant/reward?action=addrewardblacklist"
}),s.err());
});
}
var a=t("common/wx/top.js"),i=t("biz_common/moment.js"),o=t("common/wx/richEditor/emotionEditor.js"),n=(t("common/wx/verifycode.js"),
t("message/message_cgi.js")),s=t("common/wx/Tips.js"),r=t("biz_web/ui/dateRange.js"),c=t("common/wx/pagebar.js"),d=t("common/wx/popover.js"),l=t("common/wx/Cgi.js"),m=t("common/wx/RichBuddy_tag.js"),f=t("biz_web/ui/dropdown.js");
new a("#topTab",a.DATA.reward,{
render:a.RENDER.reward,
data:wx.cgiData
}).selected("list"),$.each(wx.cgiData.list,function(t,e){
e.date=i.unix(e.reward_time).format("YYYY-MM-DD HH:mm"),e.single_url=wx.url("/cgi-bin/singlesendpage?tofakeid=%s&t=message/send&action=index".sprintf(e.fakeid));
}),$("#js_list").html(template.render("tpl_list",wx.cgiData));
var u=new m;
$(".jsAvatar").mouseover(function(){
var t=$(this),e=t.data("fakeid"),a=t.offset(),i=t.width();
u.show({
id:e,
autoRefresh:!0,
position:{
left:a.left+i+2,
top:a.top
},
isUserIndex:!0
});
}).mouseout(function(){
u.hide();
}),r({
container:"#js_day_range",
isTodayValid:!0,
dayRangeMax:90,
monthRangeMax:0,
startDate:wx.cgiData.begin_time||i.unix(wx.data.time).add("days",-6).format("YYYY-MM-DD"),
endDate:wx.cgiData.end_time||i.unix(wx.data.time).format("YYYY-MM-DD"),
theme:"ta",
success:function(t){
var e="/merchant/reward?t=reward/allreward&action=getlist&begin_time=%s&end_time=%s&offset=0&count=20&status=%s";
e=e.sprintf(t.startDate,t.endDate,wx.cgiData.status),wx.cgiData.force_old&&(e+="&force_old=1"),
location.href=wx.url(e);
}
});
var _=$("#js_list"),w=140,g={};
_.find(".js_editor").each(function(){
var t=$(this).attr("data-id");
g[t]=new o($(this),{
wordlimit:w,
isHTML:!0
});
}),_.on("click",".js_reply",function(){
$(this).closest(".js_item").find(".js_reply_box").toggle();
}),_.on("click",".js_icon_del",function(){
var t=$(this);
new d({
dom:$(this),
content:"隐藏后该头像在所有文章的赞赏中都将变成默认头像，操作无法恢复",
margin:"right",
buttons:[{
text:"隐藏",
click:function(){
this.hide(),e(t);
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
}),_.on("click",".js_reply_OK",function(){
var t=$(this),e=t.closest(".js_item"),a=t.attr("data-id"),i=g[a]&&g[a].getContent(),o=t.data("fakeid"),r=null,c=e.find(".verifyCode");
return i.length<=0||i.length>w?void s.err("快捷回复的内容必须为1到140个字符"):null!=r&&r.getCode().trim().length<=0?(s.err("请输入验证码"),
void r.focus()):(s.suc("回复中..."),t.btn(!1),void n.quickReply({
toFakeId:o,
content:i,
imgcode:r&&r.getCode().trim(),
appmsg:t.data("appmsg"),
out_trade_no:a
},function(){
g[a]&&g[a].setContent(""),c.html("").addClass("dn"),r=null,e.find(".js_reply_div").html('<span class="reply_meta tips_global">已回复</span>'),
e.find(".js_reply_box").hide(),t.btn(!0);
},function(e){
t.btn(!0),e&&e.base_resp&&200008==e.base_resp.ret&&(r=c.html("").removeClass("dn").verifycode().data("verifycode"),
r.focus());
}));
}),_.on("click",".js_reply_pickup",function(){
$(this).closest(".js_item").find(".js_reply_box").toggle();
});
{
var p=wx.cgiData,h=p.offset/p.count+1;
new c({
container:"#js_pagebar",
perPage:p.count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:h,
totalItemsNum:p.total_count,
callback:function(t){
var e=t.currentPage;
if(e!=h){
var a=location.href.replace(/&offset=[^&]+/,"&offset="+(e-1)*p.count);
return wx.cgiData.force_old&&(a+="&force_old=1"),location.href=a,!1;
}
}
});
}
document.getElementById("js_status_filter")&&new f({
container:"#js_status_filter",
label:"所有状态",
data:[{
name:"所有状态",
value:0
},{
name:"未到账",
value:1
},{
name:"已到账",
value:2
},{
name:"已退款",
value:4
}],
callback:function(t){
var e=wx.url("/merchant/reward?t=reward/allreward&action=getlist&offset=0&count=20");
t&&(e+="&status="+t),location.href=e;
}
}).selected(wx.cgiData.status||0,!1),$("#js_status_filter_tips").length&&new d({
dom:"#js_status_filter_tips",
content:$("#tpl_status_tips").html(),
isToggle:!0
}).hide();
});