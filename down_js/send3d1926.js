define("mass/send.js",["widget/media/send_preview.css","common/qq/mask.js","common/wx/Tips.js","common/wx/top.js","common/wx/region.js","biz_web/ui/dropdown.js","safe/safe_check.js","message/message_cgi.js","mass/reprint_status.js","tpl/mass/ad_popup.html.js","biz_web/lib/json.js","common/wx/richEditor/msgSender.js","common/wx/media/factory.js","cardticket/parse_data.js","biz_common/moment.js","common/wx/popover.js","common/wx/popup.js","common/wx/dialog.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","cardticket/clickreport.js","biz_common/utils/wxgspeedsdk.js","media/media_cgi.js","biz_web/lib/store.js","tpl/mass/sendqueue_popup.html.js","common/wx/verifycode.js"],function(t){
"use strict";
t("widget/media/send_preview.css");
var e=wx.cgiData,i=(e.need_verify_code,t("common/qq/mask.js"),t("common/wx/Tips.js")),n=(t("common/wx/top.js"),
t("common/wx/region.js")),s=t("biz_web/ui/dropdown.js"),a=t("safe/safe_check.js"),o=t("message/message_cgi.js"),r=t("mass/reprint_status.js"),d=t("tpl/mass/ad_popup.html.js"),c=t("biz_web/lib/json.js"),_=t("common/wx/richEditor/msgSender.js"),m=t("common/wx/media/factory.js"),u=t("cardticket/parse_data.js"),p=t("biz_common/moment.js"),l=t("common/wx/popover.js"),f=(t("common/wx/popup.js"),
t("common/wx/dialog.js")),g=t("common/wx/Cgi.js"),h=(t("biz_web/ui/checkbox.js"),
t("cardticket/clickreport.js"),{
serviceDiffTime:0,
send_time:0,
timerStartMinDiff:3e5,
hot_time_type:0
}),v=t("biz_common/utils/wxgspeedsdk.js"),b=t("media/media_cgi.js"),w=t("biz_web/lib/store.js"),v=t("biz_common/utils/wxgspeedsdk.js"),y=function(){
function y(){}
function j(i){
function n(t){
var e=t.detail_info;
if(!e)return null;
var i={
9:"10",
11:"10",
16:"15",
17:"16",
62:"4"
};
e.type=i[e.type]||e.type;
var n;
switch(+e.type){
case 10:
n={
data:e,
type:e.type
};
break;

case 15:
if(n=e,e.multi_item&&e.multi_item.length>0){
var s=e.multi_item[0];
for(var a in s)s.hasOwnProperty(a)&&!n[a]&&(n[a]=s[a]);
}
!n.time&&n.create_time&&(n.time=p.unix(n.create_time).format("YYYY年MM月DD日")||"");
break;

case 16:
n=u.parse_cardticket(e.card),n.type=e.type;
break;

default:
n=e;
}
return n.acl=wx.acl.msg_acl,n;
}
function s(t,e){
var i=n(t),s=m.itemRender[i.type];
if(i&&s){
var a=l.find(".js_media"+e);
(1==+i.type||2==+i.type||3==+i.type)&&a.addClass("simple_media"),i.hasRecommend=!0,
s(a,i);
}
}
var a,o={
type:i,
wx_alias:e.strategy_status.wx_alias||""
};
if("polo"==i?(o.count=1*e.auditing_msg_num||0,o.list=e.auditing_msg&&e.auditing_msg.list?e.auditing_msg.list:[],
a="待发送群发消息详情"):"timer"==i&&(o.count=1*e.auditing_timer_msg_num||0,o.list=e.auditing_timer_msg&&e.auditing_timer_msg.list?e.auditing_timer_msg.list:[],
a="待确认定时消息详情"),0!=o.count&&0!=o.list.length){
for(var r=0,d=o.list.length;d>r;r++)o.list[r].apply_time_desc=p.unix(o.list[r].apply_time).format("YYYY.MM.DD HH:mm")||"",
o.list[r].expired_time_desc=p.unix(o.list[r].expired_time).format("YYYY.MM.DD HH:mm")||"",
o.list[r].applyer_headimg=o.list[r].applyer_headimg||"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
for(var c=t("tpl/mass/sendqueue_popup.html.js"),_=$(wx.T(c,o)).eq(0).popup({
title:a,
close:function(){
this.remove();
},
className:"sendqueue_dialog",
width:960,
buttons:[{
text:"知道了",
click:function(){
this.remove();
},
type:"primary"
}]
}),l=_.find(".js_masscontent"),r=0,f=o.list.length;f>r;r++)s(o.list[r],r);
_.popup("resetPosition"),_.find(".js_massitem").on("click",function(){
var t=$(this),e="selected";
if(t.hasClass(e))return!1;
t.siblings(".js_massitem").removeClass(e),t.addClass(e);
var i=$(this).data("index");
l.find(".js_mediaitem").hide(),l.find(".js_media"+i).show(),_.popup("resetPosition");
});
}
}
function k(){
$("#send_btn_main").on("click",".js_submit",function(t){
var e=$(t.target||t.srcElement),n=G.getData().data||{};
if(!e.hasClass("js_show_send_btn_list")){
if(n.recommendWording&&n.recommendWording.length>140)return i.err("推荐语不能超过140字"),
null;
h.send_time=0,x("polo");
}
});
}
function x(t){
$("#x").popup({
title:"添加广告",
width:960
});
var n=!1;
"polo"==t&&e.mass_send_left<=0&&(i.err("剩余群发次数为0"),n=!0),"polo"==t&&1*e.auditing_msg_num>=4&&(i.err("超过4条群发消息待管理员确认"),
n=!0);
var s=G.getData();
if(s.error&&(n=!0),n===!0)return void O();
E(t);
var a=$("#send_btn_main").find(".js_submit"),o="",r="";
if("polo"==t&&1*e.auditing_msg_num>0&&(o='当前有%s条群发消息正在等待管理员审批。<a href="javascript:;" data-type="polo" class="js_viewqueue">查看详情</a><br>是否确认要再次群发消息？'.sprintf(e.auditing_msg_num),
r="群发"),"timer"==t&&1*e.auditing_timer_msg_num>0&&(o='当前有%s条定时群发消息正在等待管理员审批。<a href="javascript:;" data-type="timer" class="js_viewqueue">查看详情</a><br>是否确认要再次设置定时群发消息？'.sprintf(e.auditing_timer_msg_num),
r="定时群发"),o&&r){
var d=new l({
dom:a,
content:o,
buttons:[{
text:r,
type:"primary",
click:function(){
this.hide(),fe.submit.call($("#send_btn_main").find(".js_submit"));
}
},{
text:"取消",
click:function(){
O(),this.hide();
}
}]
});
d.$pop.find(".js_viewqueue").on("click",function(t){
var e=$(t.target||t.srcElement).data("type");
j(e);
});
}else fe.submit.call(a);
}
function D(){
ue.selected(0),re.selected(0),de.selected(0),"true"==e.has_member_card&&me.selected(0),
$("#leftNum").html(e.mass_send_left),$(window).on("keyup",function(){
$(".js_warn").hide();
});
var t=$("#send_btn_main");
t.on("click",".js_show_send_btn_list",function(){
var e=t.find(".js_list_main");
return e.is(":hidden")?e.show():e.hide(),!1;
}),t.on("click",".js_list_main",function(){
if(e.time_send_total_left<=0)return!1;
var n=G.getData();
return n.error?void i.err("请选择群发内容"):1*e.auditing_timer_msg_num>=4?void i.err("超过4条定时群发消息待管理员确认"):(t.find(".js_list_main").hide(),
P(1),void S({
type:"timer",
callback:function(t){
2==t?f.show({
type:"info",
title:"定时群发确认",
msg:"你已对相同内容设置了定时消息，建议前往首页定时列表查看，避免重复操作。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove(),A();
}
}],
close:function(){
return O(),!0;
}
}):A();
}
}));
}),$(document).on("click",function(){
t.find(".js_list_main").hide(),P(1);
}),t.on("mouseover",function(e){
var i=$(e.target||e.srcElement);
if(i.hasClass("js_list_item"))return void P(2);
if(i.hasClass("js_submit"))return void P(1);
for(var n,s=i.parent();s.length>0&&s[0]!==t[0];){
if(s.hasClass("js_list_item")){
n=2;
break;
}
if(s.hasClass("js_submit")){
n=1;
break;
}
s=s.parent();
}
P(n);
});
}
function S(t){
var e=$("#send_btn_main").find(".js_submit");
if(!e.hasClass("btn_loading")){
E(t.type);
var e=$("#send_btn_main").find(".js_submit");
e.btn(!1);
var i=fe.getPostData();
g.post({
url:wx.url("/cgi-bin/masssend?action=check_same_material"),
data:{
msgid:i.appmsgid
},
error:function(){
t.callback(1);
}
},function(e){
return e&&e.base_resp&&67017==e.base_resp.ret?void t.callback(2):void t.callback(1);
});
}
}
function A(){
var t,e=$("#timer_dialog_tpl").html().trim(),n=$(e).popup({
title:"定时群发",
width:726,
className:"timer_send_dialog",
miniTips:{
type:"green",
text:"今天还能定时群发#type_start#%s#type_end#次".sprintf(wx.cgiData.time_send_today_left)
},
buttons:[{
type:"primary",
text:"定时群发",
click:function(){
var e=t.find(".js_btn_p").eq(0);
if(!e.hasClass("btn_loading")&&h.checkingTimer!==!0){
if(2==h.hot_time_type)return void i.err("该时刻定时消息过多，请选择其他时刻");
var n=t.find(".js_day_hidden").val();
if(1==n&&0==wx.cgiData.time_send_today_left)return void i.err("你今天还能定时群发0次消息");
if(2==n&&0==wx.cgiData.time_send_tomorrow_left)return void i.err("你明天还能定时群发0次消息");
if(0==wx.cgiData.time_send_oper_left)return void i.err("操作频率过高，请明天再试");
var s=this,a=C(t),r=+new Date;
if(a-r<=h.timerStartMinDiff-6e4)return i.err("设置的定时群发时间错误，请重新选择"),void q(t);
h.checkingTimer=!0,e.btn(!1),h.send_time=Math.floor(a/1e3);
var d=fe.getPostData(),c=t.find(".js_hottimetips").hide();
o.massCheckTimer({
msgid:d.appmsgid,
send_time:h.send_time,
cardid:d.cardid
},function(){
h.checkingTimer=!1,e.btn(!0),s.remove(),x("timer");
},function(i){
if(e.btn(!0),h.checkingTimer=!1,i&&i.time_now)h.serviceDiffTime=1e3*i.time_now-+new Date,
i.base_resp&&"67011"==i.base_resp.ret&&q(t);else if(i){
var n=i.base_resp.ret;
67018==n&&c.text(i.customerMsg||"").show();
}
});
}
}
},{
text:"取消",
click:function(){
O(),this.remove();
}
}],
onHide:function(){
O(),this.remove();
}
});
t=n.popup("get");
var s="1";
0==wx.cgiData.time_send_today_left&&(s="2"),q(t,s);
}
function C(t){
var e=t.find(".js_day_hidden").val(),i=t.find(".js_hours_hidden").val(),n=t.find(".js_min_hidden").val(),s=+new Date,a=new Date(s+h.serviceDiffTime);
return 2==e&&a.setDate(a.getDate()+1),a.setHours(i),a.setMinutes(n),a.setSeconds(0),
a.getTime();
}
function M(t){
T(t,0);
var e=Math.floor(C(t)/1e3);
g.post({
url:"/cgi-bin/masssend?action=check_hot_time",
data:{
timestamp:e
}
},function(i){
if(i&&i.base_resp&&0==i.base_resp.ret&&i.hot_time_type>0){
var n=C(t);
Math.floor(n/1e3)===1*e&&T(t,i.hot_time_type);
}
});
}
function T(t,e){
var i="",n="hide",s="enable";
1==e?(i="该时刻定时消息过多，你的消息可能延后发送，你可以继续群发或选择其他时刻。",h.hot_time_type=1,n="show",s="enable"):2==e?(i="该时刻定时消息过多，请选择其他时刻。",
h.hot_time_type=2,n="show",s="disable"):(i="",h.hot_time_type=0,n="hide",s="enable");
var a=t.find(".js_hottimetips").text(i);
a[n](),t.find(".js_btn_p").eq(0)[s]();
}
function q(t,e){
var i,n=new Date,a=new Date(n.getTime()+h.serviceDiffTime+h.timerStartMinDiff);
i=n.getDate()==a.getDate()?[{
value:"1",
name:"今天"
},{
value:"2",
name:"明天"
}]:[{
value:"2",
name:"明天"
}];
var o=t.find(".js_day_hidden").val()||"",r=new s({
container:t.find(".js_day_dropdown"),
label:o,
data:i,
callback:function(e){
t.find(".js_mini_tips").html(1==e?"今天还能定时群发%s次".sprintf("<span class='js_mini_tips_type mini_tips success'>"+wx.cgiData.time_send_today_left+"</span>"):"明天还能定时群发%s次".sprintf("<span class='js_mini_tips_type mini_tips success'>"+wx.cgiData.time_send_tomorrow_left+"</span>")),
t.find(".js_day_hidden").val(e),Y(t,e);
}
}),d=0;
"undefined"!=typeof e&&(o=e),$.each(r.opt.data,function(t,e){
return o==e.value?(d=t,!1):void 0;
}),r.selected(d,!0);
}
function Y(t,e){
var i=t.find(".js_hours_hidden").val()||"",n=z(e),a=new s({
container:t.find(".js_hours_dropdown"),
label:i,
data:n,
callback:function(i){
t.find(".js_hours_hidden").val(i),W(t,e,i);
}
}),o=0;
$.each(a.opt.data,function(t,e){
return i==e.value?(o=t,!1):void 0;
}),a.selected(o,!0);
}
function W(t,e,i){
var n=t.find(".js_min_hidden").val()||"",a=F(e,i),o=new s({
container:t.find(".js_min_dropdown"),
label:n,
data:a,
callback:function(e){
t.find(".js_min_hidden").val(e),M(t);
}
}),r=0;
$.each(o.opt.data,function(t,e){
return n==e.value?(r=t,!1):void 0;
}),o.selected(r,!0);
}
function z(t){
var e=+new Date,i=new Date(e+h.serviceDiffTime+h.timerStartMinDiff).getHours(),n=23,s=[];
for(1!=t&&(i=0);n>=i;i++)s.push({
value:i,
name:1==(i+"").length?"0"+i:i+""
});
return s;
}
function F(t,e){
var i=new Date,n=new Date(i.getTime()+h.serviceDiffTime+h.timerStartMinDiff),s=0,a=[];
for(1!=t&&i.getDate()==n.getDate()||n.getHours()!==e||(s=n.getMinutes());59>=s;s++)a.push({
value:s,
name:1==(s+"").length?"0"+s:s+""
});
return a;
}
function P(t){
1===t?($("#timer_tips").hide(),$("#send_tips").show()):2===t&&($("#timer_tips").show(),
$("#send_tips").hide());
}
function H(t){
var e={
acl:wx.acl.msg_acl,
scene:"masssend",
onClick:function(t,e,i,n){
10==n?$("#ifDiscuss").show():$("#ifDiscuss").hide(),2==n||3==n||15==n?$(".js_comment_area").show():$(".js_comment_area").hide();
},
onSelect:function(){}
};
t?(t.isSupportShareMul=!0,G=new _($("#js_msgSender"),$.extend({
isSupportShareMul:!0,
data:t
},e))):G="10"==wx.cgiData.type?new _($("#js_msgSender"),$.extend({
isSupportShareMul:!0,
data:{
type:10,
data:wx.cgiData.info
}
},e)):new _($("#js_msgSender"),$.extend({
isSupportShareMul:!0,
data:{
type:10
}
},e)),$("#appmsgPopBt").click(function(){
G.op[10].pop();
});
}
function N(){
var i=t("cardticket/parse_data.js");
g.get({
url:"/merchant/electroniccardmgr?action=get&card_id="+e.cardid,
error:function(){
H();
}
},function(t){
if(0==t.base_resp.ret){
var n=$.parseJSON(t.card_detail);
n=i.parse_cardticket(n),n.card_type=n.type,n.cardnum=e.cardnum,n.type=16,H(n);
}else H(),g.handleRet(t,{
id:64462,
key:2,
url:"/merchant/electroniccardmgr?action=get",
showMsg:!1
});
});
}
function R(){
var t=wx.url("/cgi-bin/copyrightlib?action=lib_reprint&ori_biz=%s&ori_mid=%s&ori_idx=%s&type=1".sprintf(e.ori_ref.ori_biz,e.ori_ref.ori_mid,e.ori_ref.ori_idx));
g.get({
url:t,
error:function(){
H();
}
},function(t){
if(t.base_resp&&0==t.base_resp.ret&&t.app_msg_info&&t.app_msg_info.item&&t.app_msg_info.item.length>0){
var e={
type:10,
data:t.app_msg_info.item[0]
};
e.data.isreprint=!0,e.data.multi_item&&e.data.multi_item.length>0&&(e.data.multi_item[0].isreprint=!0),
H(e);
}else H();
});
}
function B(){
O();
}
function O(){
$("#send_btn_main").html(template.render("send_btn_list_tpl",{})),P(1);
}
function E(t){
$("#send_btn_main").html(template.render("single_send_btn_tpl",{
type:t
})),P(1);
}
function I(){
var t=e.ori_ref;
t.ori_biz&&t.ori_mid&&t.ori_idx?(e.ori_ref.isRePrint=!0,R()):e.cardid?N():H();
}
function Q(e){
for(var i="",n="",s=0,a=e.length;a>s;s++){
var o=e[s].func_id,r=e[s].unlock_time,d=e[s].ban_time,c=t("biz_common/moment.js");
"2"==o?i=r?r==d?"永久屏蔽原创功能":"屏蔽原创功能至"+c.unix(r).format("YYYY年MM月DD日 HH:mm"):"":"3"==o&&(n=r?r==d?"永久屏蔽赞赏功能":"屏蔽赞赏功能至"+c.unix(r).format("YYYY年MM月DD日 HH:mm"):"");
}
i&&n?oe="经用户举报，你的帐号已%s，已%s，屏蔽期间发出的文章将没有原创及赞赏标识。<br>".sprintf(i,n):i?oe="经用户举报，你的帐号已%s，因为赞赏仅向原创文章开放，因而屏蔽期间赞赏功能也不可使用。本文发出后将没有原创及赞赏标识。<br>".sprintf(i):n&&(oe="经用户举报，你的帐号已%s，屏蔽期间发出的文章将没有赞赏标识。<br>".sprintf(n));
}
function U(){
if(1*e.auditing_msg_num>0){
var t='，其中%s条正在等待管理员审批。<a href="javascript:;" data-type="polo" class="js_viewqueue">查看详情</a>'.sprintf(1*e.auditing_msg_num);
$("#send_tips").find(".js_masssend_tips").append(t);
}
if(1*e.auditing_timer_msg_num>0){
var t='，其中%s条正在等待管理员审批。<a href="javascript:;" data-type="timer" class="js_viewqueue">查看详情</a>'.sprintf(1*e.auditing_timer_msg_num);
$("#timer_tips").find(".js_masssend_tips").append(t);
}
$("#send_tips_main").on("click",".js_viewqueue",function(t){
var e=$(t.target||t.srcElement).data("type");
j(e);
}),k();
}
function J(){
var t=G.getData().data||{};
return t.recommendWording&&t.recommendWording.length>140?(i.err("推荐语不能超过140字"),null):(console.log(t),
1==t.type?t.content.length>0&&t.content.length<=600?{
type:t.type,
content:t.content
}:void 0:2==t.type||3==t.type?{
type:t.type,
fileid:t.file_id,
recommendWording:t.recommendWording,
width:t.width,
height:t.height
}:9==t.type||10==t.type||11==t.type||15==t.type?15!=t.type||t.app_id?{
type:t.type,
appmsgid:t.app_id,
recommendWording:t.recommendWording,
vid:t.vid
}:(i.err("暂不支持预览"),null):16==t.type?(i.err("暂不支持卡券预览"),null):5==t.type||6==t.type||7==t.type?{
type:t.type,
appmsgid:t.app_id
}:(i.err("请选择需要预览的素材"),null));
}
function V(){
$("#js_preview").click(function(){
var t=J();
if(console.log(t),t){
$(".js_can_comment").length&&(t.need_open_comment=X.value()?1:0,t.need_open_comment0=X.value()?1:0),
$(".js_comment_option").length&&(t.only_fans_can_comment=te.value()?0:1,t.only_fans_can_comment0=te.value()?0:1);
var e=[];
if(w.get(wx.data.uin+"previewAccounts"))try{
e=w.get(wx.data.uin+"previewAccounts").split("|");
}catch(n){
e=[];
}
var s=null,a=$(template.render("previewTpl",{
label:"请输入微信号，此图文消息将发送至该微信号预览。",
accounts:e
})).popup({
title:"发送预览",
className:"simple label_block",
onHide:function(){
this.remove();
},
onOK:function(){
var n=this,a=n.get(),o=a.find(".frm_input"),r=a.find(".js_preview_dialog_content"),d=o.val().trim();
if(r.removeClass("with_qrcheck"),a.find(".jsAccountFail").html("").hide(),t.preusername=d,
0==d.length)return a.find(".jsAccountFail").text("请输入预览的账号").show(),!0;
var _=a.find(".btn_primary>.js_btn").btn(!1);
return t.imgcode=s&&s.getCode().trim(),ge&&(t.confirm=1),i.remove(),t.is_preview=1,
2==t.type||3==t.type||15==t.type?(2==t.type?t.share_page_type0=8:3==t.type?t.share_page_type0=7:15==t.type&&(t.share_page_type0=5),
t.count=1,t.share_voice_id0=t.fileid,t.share_video_id0=t.vid,t.guide_words0=t.recommendWording,
2==t.type&&(t.share_imageinfo0=c.stringify({
list:[{
file_id:parseInt(t.fileid),
width:t.width,
height:t.height
}]
}))):t.share_page_type0=0,b.appmsg.preview(!0,t.type,t,function(){
n.remove(),setTimeout(function(){
_.btn(!0);
},500);
var i=[];
e.each(function(e){
e!=t.preusername&&i.push(e);
}),e=i,e.length<3?e.push(t.preusername):(e.shift(),e[2]=t.preusername),w.set(wx.data.uin+"previewAccounts",e.join("|"));
},function(t){
if(a.find(".jsAccountFail").html(t.word).show(),_.btn(!0),o.focus(),t)switch(+t.ret){
case 412:
a.find(".jsAccountFail").text("图文中含非法外链").show();
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
n.remove(),f.show({
type:"warn",
msg:t.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/>                                    <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN' target='_blank'>对应规则</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),ge=!0,_.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case 64503:
r.addClass("with_qrcheck");
}
}),!0;
}
});
a.find(".jsAccount").click(function(){
$(this).hasClass("selected")?($(this).removeClass("selected"),$(".jsAccountInput").val("")):($(this).addClass("selected"),
$(".jsAccountInput").val($(this).data("value")));
}),a.find(".jsAccountInput").keyup(function(t){
$(".jsAccountFail").hide(),$(".jsAccount").removeClass("selected");
var e="which"in t?t.which:t.keyCode;
13==e&&$(this).parents(".dialog").find("button.js_btn:eq(0)").trigger("click");
}).placeholder(),a.find(".jsAccountDel").click(function(){
var t=$(this).data("index");
return e.length>t&&e.splice(t,1),$(this).parent().remove(),w.set(wx.data.uin+"previewAccounts",e.join("|")),
!1;
}),e.length>0&&a.find(".jsAccount").last().click();
}
});
}
function Z(){
B(),D(),I(),U(),y(),Q(wx.cgiData.forbit),V(),v.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:31
}),v.send();
}
var G,K=$("#toTencentNews").checkbox(),L=$("#js_toQQBrowser").checkbox(),X=$(".js_can_comment").checkbox({
onChanged:function(){
$(".js_can_comment").is(":checked")?$(".js_comment_option").show():$(".js_comment_option").hide();
}
}),te=$(".js_comment_everyone").checkbox(),ee=new n({
container:"#js_region",
data:{},
list:{
country:[{
id:-1,
name:"全部"
}],
province:[],
city:[]
}
}),ie=[];
if($(".js_comment_everyone").eq(0).checkbox("checked",!0),1==e.new_user_tag){
for(var ne=0;ne<e.group.length;ne++){
var se,ae=e.group[ne];
ae.group_id>=2&&(2==ae.group_id?se={
name:"星标用户",
value:ae.group_id
}:ie.push({
name:ae.group_name,
value:ae.group_id
}));
}
ie=[se].concat(ie.sort(function(t,e){
return t.name.localeCompare(e.name);
}));
}else for(var ne=0;ne<e.group.length;++ne){
var ae=e.group[ne];
ie.push({
name:ae.name,
value:ae.id
});
}
var oe="",re=new s({
container:"#js_group",
data:ie,
callback:function(){}
}),de=new s({
container:"#js_sex",
data:[{
name:"全部",
value:"0"
},{
name:"男",
value:"1"
},{
name:"女",
value:"2"
}],
callback:function(){}
}),ce=[{
name:"全部用户",
value:"-1"
}];
if("true"==e.has_member_card){
ce=ce.concat([{
name:"按用户标签选择",
value:"group"
},{
name:"按卡券会员选择",
value:"card"
}]);
var _e=[{
name:"全部",
value:"-1"
}];
$.each(e.card_group_list.datas,function(t,e){
0!=e.type||_e.push({
name:e.name,
value:e.id
});
});
var me=new s({
container:"#js_card_group",
data:_e,
callback:function(){
window.report_click&&window.report_click(10002);
}
});
}else ce.push({
name:"按标签选择",
value:"group"
});
var ue=new s({
container:"#js_sendObj",
data:ce,
callback:function(t){
$("#js_group, #js_card_group").hide(),"group"==t?$("#js_group").show():"card"==t&&($("#js_card_group").show(),
window.report_click&&window.report_click(10001));
}
}),pe=(t("common/wx/verifycode.js"),null),le=$("#verifycode"),fe={
_delay:0,
time:0,
postData:null,
ConvertStringToJson:function(t){
if(!t||"string"!=typeof t)return{
list:[]
};
try{
return c.parse(t);
}catch(e){
return{
list:[]
};
}
},
requestUse:function(t){
g.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=apply_auth"),
data:{
list:t,
msgid:fe.postData.appmsgid
}
},function(t){
return t&&t.base_resp&&0==t.base_resp.ret?(i.suc("申请成功"),void setTimeout(function(){
location.href=wx.url("/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0");
},200)):void g.handleRet(t,{
id:64462,
key:1,
url:"/cgi-bin/appmsgcopyright?action=apply_auth"
});
});
},
showCopyRightDetail:function(t){
new r({
data:fe.ConvertStringToJson(t.list),
done:function(e){
var i=fe.postData;
i.reprint_confirm=1,i.list=t.list||"",e&&(i.reprint_info=c.stringify({
item_list:e
})),fe.checkSponsorAd();
},
cancel:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
});
},
showSafeSend:function(t){
function e(e){
a.check(t,function(t){
t&&t.code&&"wx.pass"!=t.code?(fe.postData.code=t.code,fe.send(-1==t.type?!0:!1)):fe.send(!1);
},{
onClose:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O(),e&&"function"==typeof e.remove&&e.remove();
},
checkdom:".js_wxcheck0"
});
}
if(h.send_time&&1!=fe.postData.smart_product)return void e();
var i="";
"card"==ue.value&&(i="将对%s中已关注公众号的会员群发消息。<br>".sprintf(-1==me.value?"全部卡券用户":"卡券分组“%s”".sprintf(me.name)));
var n="";
n=fe.withoutADWoring?"不带广告群发|"+oe+i+fe.withoutADWoring:oe+i+"消息开始群发后无法撤销，是否确认群发？",
n=fe.getSmartProductTips(n),n=fe.getSameMaterialTips(n),f.show({
type:"info",
title:"群发确认",
msg:n,
mask:!0,
buttons:[{
text:h.send_time?"继续定时群发":"继续群发",
click:function(){
var t=this;
$("#send_btn_main").find(".js_submit").btn(!1),e(t);
}
},{
text:"取消",
type:"normal",
click:function(){
O(),this.remove();
}
}],
close:function(){
return O(),!0;
}
});
},
checkCopyrightDone:function(t){
var e=(new Date).getTime()-fe._start;
switch(v.saveSpeeds({
uin:wx&&wx.data&&wx.data.uin||0,
pid:31,
speeds:[{
sid:21,
time:e
}]
}),v.send(),fe.copyrightReset({
btnType:"list"
}),fe.isFirstCheck=!0,fe.checkCopyrightRet){
case 154009:
fe.postData.direct_send=1,fe.checkSponsorAd();
break;

case 154008:
fe.showCopyRightDetail(t);
break;

default:
i.err("系统错误，请稍后重试。");
}
},
copyrightReset:function(t){
fe._delay=0,fe.time=0,fe._start=0,"list"==t.btnType?O():E("timer"),fe.dialog&&fe.dialog.remove(),
window.onbeforeunload=null;
},
checkCopyright:function(){
var t=fe.postData,e={
first_check:+fe.isFirstCheck,
type:t.type,
appmsgid:t.appmsgid
};
fe.isFirstCheck=fe.isFirstCheck&&!1,fe.checkCopyrightRequest=o.checkCopyright(e,function(t){
switch(t&&t.base_resp&&"undefined"!=typeof t.base_resp.ret||(fe.checkCopyrightRet=-1),
fe.checkCopyrightRet=+t.base_resp.ret,+t.base_resp.ret){
case 154008:
case 154009:
fe.checkCopyrightDone(t);
break;

case 154011:
if(0==fe._delay?(fe._delay=10,fe._start=(new Date).getTime(),window.onbeforeunload=function(){
return fe.time>0&&fe.time<6e4?"离开当前页面将会中止群发":"";
}):fe._delay=500,3010==fe.time)fe.dialog=f.show({
title:"原创校验中",
type:"waiting",
msg:"校验预计用时:<span id='cright_time'>57</span>秒|文章正在进行原创校验，请勿关闭浏览器，等待校验完成。",
close:function(){
$("#send_btn_main").find(".js_submit").find("button").html('<i></i>原创校验中(<span id="cright_time">'+(60-Math.floor(fe.time/1e3))+"</span>s)");
},
hideBt:!0
});else if(fe.time>3010&&fe.time<6e4)$("#cright_time").text(60-Math.floor(fe.time/1e3));else if(60010==fe.time)return fe.dialog&&fe.dialog.remove(),
f.show({
title:"原创校验超时",
type:"warn_primary",
msg:"原创校验超时，暂时无法声明原创|你可以选择继续群发，先以非原创的样式发出。原创校验一旦完成，将对已群发并成功声明原创的文章补上原创标志，若文章有设置赞赏则同步恢复文章中的赞赏。",
buttons:[{
text:"继续群发",
type:"primary",
click:function(){
fe.checkSponsorAd(),this.remove();
}
},{
text:"取消群发",
type:"normal",
click:function(){
var t=new Image;
t.src="/mp/jsmonitor?idkey=66960_1_1",this.remove();
}
}]
}),v.saveSpeeds({
uin:wx&&wx.data&&wx.data.uin||0,
pid:31,
speeds:[{
sid:21,
time:6e4
}]
}),v.send(),void fe.copyrightReset({
btnType:"list"
});
fe.checkCopyrightComet=setTimeout(function(){
fe.checkCopyright();
},fe._delay),fe.time=fe.time+fe._delay;
break;

case 200013:
i.err("操作太频繁，请稍后再试"),fe.copyrightReset({
btnType:"list"
});
break;

default:
i.err("系统错误，请稍后重试。"),fe.copyrightReset({
btnType:"list"
});
}
},function(t){
"mass_send_check_copyright_timeout"!=t&&(fe._delay=0==fe._delay?10:500,fe.checkCopyrightComet=setTimeout(function(){
fe.checkCopyright();
},fe._delay),fe.time=fe.time+fe._delay);
});
},
_getAdWordingHead:function(t,e){
var i={
1:"广告主为%s，",
2:"首篇广告主为%s，",
3:"第二篇广告主为%s，"
};
return t||1!=e.idx?t&&1==e.idx?i[2].sprintf(e.ad_buyer_name):2==e.idx?i[3].sprintf(e.ad_buyer_name):void 0:i[1].sprintf(e.ad_buyer_name);
},
_getAdWordingBody:function(t){
var e={
1:"图文内广告已准备完毕。",
2:"图文内插入对应广告后尚未发送给广告主预览，请确认后再群发。",
3:"该广告素材于%s更新，图文内广告已准备完毕。",
4:"%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。",
5:"图文内尚未插入对应广告，群发图文会导致广告违约，请继续编辑素材。",
6:"图文内插入对应广告后，须广告主确认才可群发。"
};
return t.save_aid==t.ad_id&&1==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?e[1]:t.save_aid!=t.ad_id||1!=t.status&&2!=t.status||3!=t.ad_status?t.save_aid==t.ad_id&&2==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?e[3].sprintf(p.unix(t.update_time).format("YYYY-MM-DD")):t.save_aid!=t.ad_id&&t.save_aid||3!=t.status?(t.save_aid||1!=t.status&&2!=t.status)&&t.save_aid==t.ad_id?t.save_aid!=t.ad_id||1!=t.status&&2!=t.status||6==t.ad_status||1!=t.trade_mode?void 0:e[6]:e[5]:e[4].sprintf(p.unix(t.update_time).format("YYYY-MM-DD")):e[2];
},
_getAdWordingFoot:function(t){
var e="消息开始群发后无法撤回，是否群发？";
return t.save_aid==t.ad_id&&1==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?e:t.save_aid==t.ad_id&&2==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?e:t.save_aid!=t.ad_id&&t.save_aid||3!=t.status?"":e;
},
_getFuncName:function(t){
return t.save_aid==t.ad_id&&1==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?"SponsorAdPreview":t.save_aid!=t.ad_id||1!=t.status&&2!=t.status||3!=t.ad_status?t.save_aid==t.ad_id&&2==t.status&&(4==t.ad_status&&0==t.trade_mode||6==t.ad_status&&1==t.trade_mode)?"SponsorAdPreview":t.save_aid!=t.ad_id&&t.save_aid||3!=t.status?(t.save_aid||1!=t.status&&2!=t.status)&&t.save_aid==t.ad_id?t.save_aid!=t.ad_id||1!=t.status&&2!=t.status||6==t.ad_status||1!=t.trade_mode?void 0:"SponsorAdOther":"SponsorAdDefault":"checkAccountStatus":"SponsorAdDefault";
},
checkSponsorAd:function(){
var t=G.getData().data,e="今日图文";
o.checkSponsorAd({
appmsg_id:t.app_id
},function(n){
if(0==n.base_resp.ret){
for(var s=n.check_ad_resp.ad_info,a=n.check_ad_resp.ad_num,o=n.check_ad_resp.article_aid_num,r=n.check_ad_resp.article_aid_list,d=t.isMulti,c="",_=0;_<r.length;_++)for(var m=0;m<s.length;m++)s[m].idx==r[_].idx&&(s[m].save_aid=r[_].aid);
if(d||0!=a||1!=o)if(d&&0==a&&1==o)c=1==r[0].idx?"今日图文首篇文章暂无广告订单，但含有广告卡片，请删除该广告订单后再群发。":"今日图文第二篇文章暂无广告订单，但含有广告卡片，请删除该广告订单后再群发。",
fe.SponsorAdDefault(c,t.app_id,t.isMulti);else if(1==a&&2==o)c=1==s[0].idx?"今日图文第二篇文章暂无广告订单，但含有广告卡片，请删除该广告订单后再群发。":"今日图文首篇文章暂无广告订单，但含有广告卡片，请删除该广告订单后再群发。",
fe.SponsorAdDefault(c,t.app_id,t.isMulti);else if(0==a&&2==o)c="今日图文首篇文章暂无广告订单，但含有广告卡片，第二篇文章暂无广告订单，但含有广告卡片，请删除该广告订单后再群发。",
fe.SponsorAdDefault(c,t.app_id,t.isMulti);else if(0==a&&0==o)fe.checkAccountStatus();else if(1==a)2!=s[0].idx||d?(c=e+fe._getAdWordingHead(d,s[0])+fe._getAdWordingBody(s[0])+fe._getAdWordingFoot(s[0]),
"SponsorAdPreview"==fe._getFuncName(s[0])?fe.SponsorAdPreview(c,s):"SponsorAdDefault"==fe._getFuncName(s[0])?fe.SponsorAdDefault(c,t.app_id,t.isMulti):"checkAccountStatus"==fe._getFuncName(s[0])?(fe.withoutADWoring=c,
fe.checkAccountStatus()):"SponsorAdOther"==fe._getFuncName(s[0])&&fe.SponsorAdOther(c)):(c="今日图文第二篇广告主为%s，群发单图文将会导致广告违约，请继续编辑素材。".sprintf(s[0].ad_buyer_name),
fe.SponsorAdDefault(c,t.app_id,t.isMulti));else if(2==a)if(d){
var u=fe._getAdWordingHead(d,s[0]),p=fe._getAdWordingHead(d,s[1]),l=fe._getAdWordingBody(s[0]),f=fe._getAdWordingBody(s[1]),g=fe._getAdWordingFoot(s[0]),h=fe._getAdWordingFoot(s[1]),v=fe._getFuncName(s[0]),b=fe._getFuncName(s[1]);
c=e+u+l+p+f+(""==g||""==h?"":g),"SponsorAdDefault"==v||"SponsorAdDefault"==b?fe.SponsorAdDefault(c,t.app_id,t.isMulti):"SponsorAdOther"==v||"SponsorAdOther"==b?fe.SponsorAdOther(c):"SponsorAdPreview"==v||"SponsorAdPreview"==b?fe.SponsorAdPreview(c,s):(fe.withoutADWoring=c,
fe.checkAccountStatus());
}else c="今日图文首篇广告主为%s，第二篇广告主为%s，群发单图文将会导致广告违约，请继续编辑素材。".sprintf(s[0].ad_buyer_name,s[1].ad_buyer_name),
fe.SponsorAdDefault(c,t.app_id,t.isMulti);else fe.checkAccountStatus();else c="今日图文暂无广告订单，但含有广告卡片，请删除该广告卡片后再群发。",
fe.SponsorAdDefault(c,t.app_id,t.isMulti);
}else i.err("系统错误");
},function(){});
},
SponsorAdDefault:function(t,e,i){
f.show({
title:"添加广告",
type:"info",
msg:t,
buttons:[{
text:"编辑素材",
click:function(){
location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid="+e+"&isMul="+i);
}
},{
text:"取消",
type:"normal",
click:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O(),this.remove();
}
}],
close:function(){
return $("#send_btn_main").find(".js_submit").btn(!0),O(),!0;
}
});
},
SponsorAdPreview:function(t,e){
for(var i=0;i<e.length;i++)e[i].video_info&&(e[i].ad_img=e[i].video_info.thumbUrl);
$(wx.T(d,{
list:e,
content:t,
nick_name:wx.cgiData.nick_name
})).popup({
title:"添加广告",
width:960,
className:"mpda_send_dialog",
buttons:[{
type:"primary",
text:"群发",
click:function(){
this.remove(),fe.checkAccountStatus();
}
},{
text:"取消",
click:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O(),this.remove();
}
}],
onHide:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
});
},
SponsorAdOther:function(t){
f.show({
type:"info",
title:"添加广告",
msg:t,
buttons:[{
text:"确定",
click:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O(),this.remove();
}
}],
close:function(){
return $("#send_btn_main").find(".js_submit").btn(!0),O(),!0;
}
});
},
checkAccountStatus:function(){
var t=e.strategy_status;
return t?(t.third_status=e.third_status,t.bind_mail=e.bind_mail,void(t.wx_protect&&t.wx_alias?(t.source="msgs",
t.msgid=e.operation_seq,t.distinguish=!0,fe.showSafeSend(t)):t.wx_alias&&"1"==e.gray_status?a.off_protect_tip(function(){
a.bind("bind_masssend",t,function(t){
i.suc("帐号已开启安全保护，可进行群发操作。"),e.strategy_status.wx_alias=t.wx_name,e.strategy_status.wx_protect=1,
e.strategy_status.protect_status=2,$("#send_btn_main").find(".js_submit").btn(!0),
O();
},{
onClose:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
});
},{
onClose:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
}):"1"==e.gray_status?a.no_helper_tip(function(){
a.bind("bind_masssend",t,function(t){
i.suc("帐号已开启安全保护，可进行群发操作。"),e.strategy_status.wx_alias=t.wx_name,e.strategy_status.wx_protect=1,
e.strategy_status.protect_status=2,$("#send_btn_main").find(".js_submit").btn(!0),
O();
},{
onClose:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
});
},{
onClose:function(){
$("#send_btn_main").find(".js_submit").btn(!0),O();
}
}):fe.sendwarn())):void fe.sendwarn();
},
send:function(t){
return console.log(fe.postData),fe.postData.recommend&&fe.postData.recommend.length>140?(i.err("推荐语不能超过140字"),
O(),null):($(".js_warn").hide(),E(fe.postData.send_time?"timer":"polo"),$("#send_btn_main").find(".js_submit").btn(!1),
void o.masssend(fe.postData,function(){
$("#send_btn_main").find(".js_submit").btn(!0),O(),le.html("").hide(),pe=null,t||(location.href=wx.url("/cgi-bin/home?t=home/index"));
},function(e){
if($("#send_btn_main").find(".js_submit").btn(!0),O(),e&&e.base_resp){
var n=e.base_resp.ret;
if("200008"==n)pe=le.html("").show().verifycode().data("verifycode"),pe.focus();else if("67010"==n){
var s="该图文消息部分文章正文为空，无法群发|请选择其他文章或编辑完整后再尝试";
f.show({
type:"warn",
msg:s,
buttons:[{
text:"重新选择",
click:function(){
this.remove(),G.selectPopDialogByType(10);
}
},{
type:"normal",
text:"编辑此图文",
click:function(){
var t=fe.postData.appmsgid;
location.href="/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+t;
}
}]
});
}else if("1530505"==n)$(".js_warn").text("请勿添加其他公众号的主页链接").show();else if("1530512"==n)$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();else if("67019"==n)$(".js_warn").text("推荐语不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑").show();else if("13005"==n)f.show({
type:"info",
title:"添加广告",
msg:"今日有待投放赞助广告，你当前群发的内容不符合条件，此时群发将会导致广告违约，请继续编辑。",
buttons:[{
text:"取消",
click:function(){
this.remove();
}
}]
});else if("153012"==n)f.show({
type:"warn",
msg:"未设置转载类型|文章《%s》已声明原创，但未设置转载类型，请设置后再群发。".sprintf(e.title),
buttons:[{
text:"去设置",
click:function(){
var t=fe.postData.appmsgid;
location.href="/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+t;
}
}]
});else if("230000"==n||"230001"==n||"230003"==n){
if("230003"==n)return void i.err("系统繁忙");
var a="";
"230000"==n?a="正在发送中":"230001"==n&&(a=fe.postData.send_time?"定时发送成功":"发送成功"),f.show({
type:"warn",
msg:"操作确认|你5分钟内已操作发送了一条消息，该条消息%s。是否需要再次群发？".sprintf(a),
buttons:[{
text:"继续发送",
type:"primary",
click:function(){
fe.postData.ack=e.ack,fe.send(t);
}
},{
text:"取消发送",
type:"normal",
click:function(){
this.remove();
}
}]
});
}else"154008"==n||"154009"==n?fe.checkCopyrightDone(resp):"200043"==n&&f.show({
msg:"图文中包含没有关联的小程序，请删除后再群发。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
}));
},
getSmartProductTips:function(t){
if(1!=fe.postData.smart_product)return t;
var e="";
e=h.send_time?"图文中含有个性化推荐商品，我们将在点击率高峰时段分批推送至所有粉丝，请尽可能设置中午12点前的时间群发，以获得较优效果。":"图文中含有个性化推荐商品，我们将在点击率高峰时段分批推送至所有粉丝，请尽可能在中午12点前群发，以获得较优效果。";
var i=t.split("|").length;
return 2==i?t+"<br>"+e:t+"|"+e;
},
getSameMaterialTips:function(t){
if(10==fe.postData.type&&2==h.sameMaterialStatus){
var e=t.split("|").length,i="你已对相同内容设置了定时消息，建议前往首页定时列表查看，避免重复操作。";
return 2==e?t+"<br>"+i:t+"|"+i;
}
return t;
},
sendwarn:function(){
if(h.send_time&&1!=fe.postData.smart_product)return void fe.send(!1);
var t="";
"card"==ue.value&&(t="将对%s中已关注公众号的会员群发消息。<br>".sprintf(-1==me.value?"全部卡券用户":"卡券分组“%s”".sprintf(me.name)));
var e="";
e=fe.withoutADWoring?"不带广告群发|"+oe+t+fe.withoutADWoring:oe+t+"消息开始群发后无法撤销，是否确认群发？",
e=fe.getSmartProductTips(e),e=fe.getSameMaterialTips(e),f.show({
type:"info",
title:"群发确认",
msg:e,
mask:!0,
close:function(){
return $("#send_btn_main").find(".js_submit").btn(!0),O(),!0;
},
buttons:[{
text:h.send_time?"继续定时群发":"继续群发",
click:function(){
$("#send_btn_main").find(".js_submit").btn(!1),fe.send(!1),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
O(),this.remove();
}
}]
});
},
getPostData:function(){
var t=G.getData(),i={};
if(t.error)return null;
t=t.data,i.smart_product=1*t.smart_product,i.type=t.type,i.appmsgid=t.app_id,i.fileid=t.file_id,
i.content=t.content,i.vid=t.vid,i.recommend=t.recommendWording,i.share_page=1,i.width=t.width,
i.height=t.height,i.send_time=h.send_time,i.cardid=t.cardid,i.cardquantity=t.cardnum,
i.cardlimit=0==t.cardnum?0:1,i.sex=de.value,"group"==ue.value?i.groupid=re.value:-1==ue.value?i.groupid=-1:"card"==ue.value&&(i.groupid=0,
i.card_tag_id=me.value,window.report_click&&window.report_click(10003)),i.synctxweibo=0,
$("#toTencentNews").length&&(i.synctxnews=K.value()?1:0),$("#js_toQQBrowser").length&&(i.syncqqbrowser=L.value()?1:0),
2==i.type&&(i.img_copyright_status=t.copyright_status||0),15==i.type&&(i.video_is_new=1),
$(".js_can_comment").length&&(i.need_open_comment=X.value()?1:0),$(".js_comment_option").length&&(i.only_fans_can_comment=te.value()?0:1);
var n=ee.getAll();
return i.country="-1"==n.country||"全部"==n.country?"":n.country,i.province="-1"==n.province?"":n.province,
i.city="-1"==n.city?"":n.city,i.imgcode=pe&&pe.getCode().trim(),i.operation_seq=e.operation_seq,
i.req_id=this._getid(32),i.req_time=(new Date).getTime(),i;
},
_getid:function(t){
for(var e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;t>n;n++)e+=i.charAt(Math.floor(Math.random()*i.length));
return e;
},
submit:function(){
function t(){
e.find("button").text("原创校验中"),e.removeClass("btn_primary").btn(!1),fe.isFirstCheck=!0,
fe.checkCopyright();
}
var e=$(this);
if(!e.hasClass("btn_loading")){
var n=fe.getPostData();
if(null!=n){
if(null!=pe&&pe.getCode().trim().length<=0)return i.err("请输入验证码"),pe.focus(),void e.btn(!0);
fe.postData=n;
var s={
15:1
};
s[n.type]&&(n.share_page=s[n.type]),10==n.type?0==h.send_time?S({
type:"polo",
callback:function(e){
h.sameMaterialStatus=e,t();
}
}):(h.sameMaterialStatus=0,t()):(e.btn(!1),fe.checkAccountStatus());
}
}
}
},ge=!1;
return{
init:Z
};
}();
y.init();
});