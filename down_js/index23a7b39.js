define("home/index2.js",["home/force_check.js","biz_common/cookie.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/popover.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/tooltips.js","common/wx/pagebar.js","message/message_cgi.js","cardticket/parse_data.js","media/appmsg_temp_url.js","common/wx/time.js","common/qq/emoji.js","widget/emotion_panel.css","biz_common/utils/wxgspeedsdk.js","biz_web/lib/soundmanager2.js"],function(e){
"use strict";
function t(){
var e=w.get("noticeLoginFlag");
seajs.use("biz_web/lib/store.js",function(){
"0"!=e&&e&&x.get({
mask:!1,
url:wx.url("/cgi-bin/sysnotify?f=json&begin=0&count=5")
},function(e){
if(e&&e.base_resp&&0==e.base_resp.ret&&e.Count){
for(var t=[],i=e.List,n=e.Count,s=function(e,t){
var i={
1:"你的群发",
2:"你的开发者申请",
3:"你的头像更改",
4:"你的昵称修改",
5:"你的功能介绍更改",
6:"你的信息登记",
7:"你的信息登记",
8:"你的信息登记",
9:"你的信息登记",
10:"你的信息登记",
11:"你的自定义菜单申请",
12:"你的商户功能权限申请",
14:"微信支付",
15:"微信支付",
16:"微信支付",
18:"微信认证",
19:"微信认证",
22:"商户功能初审",
23:"模版消息申请",
24:"商品购买测试链接",
26:"修改商户功能设置"
},n="";
return 3==t?n="已经通过审核":2==t&&(n="审核不通过"),"undefined"!=typeof i[e]?i[e]+n:"";
},a=0;n>a;++a){
var o=i[a];
t.push({
text:1==o.NotifyMsgType?s(o.CheckType,o.CheckStatus):o.Title,
url:wx.url("/cgi-bin/frame?t=notification/index_frame&selectid="+o.Id),
level:o.Level
});
}
seajs.use("common/wx/noticeBox",function(e){
e&&new e({
container:"#accountArea",
list:t
}),$("#accountArea .jsNoticeClose").click(function(){
w.set("noticeLoginFlag",0,null,{
path:"/"
}),$("#accountArea").unbind("mouseover").removeClass("on").find(".account_message_box").remove();
});
});
}
});
});
}
function i(){
n(),s(),a(),o();
}
function n(){
if(1==k.show_verify_warning){
var e=new Date(1e3*k.verify_deadline),t="%s年%s月%s日".sprintf(e.getFullYear(),e.getMonth()+1,e.getDate()),i="认证提醒|由于未验证主体真实性，暂时无法使用公众平台群发功能和高级功能，请尽快申请微信认证。如果在%s之前未申请微信认证，该公众帐号将被注销。".sprintf(t);
1==wx.cgiData.nickname_invade&&(i+="你申请的公众帐号名称需要进一步提交相应资料，你可在认证流程中完成名称修改。");
{
j.show({
type:"info",
title:"提醒",
msg:i,
buttons:[{
text:"去认证",
click:function(){
location.href=wx.url("/acct/wxverify?action=step&t=wxverify/index&step=proto");
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}
k.exist_appsecret_danger=0;
}
var n=w.get("annual_review_dialog");
if(1==k.wxverify_annual_review&&!n){
w.set("annual_review_dialog",1,1,{
domain:"mp.weixin.qq.com"
});
var i;
1e3*k.wxverify_expired_time>+new Date?(i="微信认证将于%s到期，请尽快进行年审".sprintf("<span class='mini_tips warn'>"+v.unix(k.wxverify_expired_time).format("YYYY年MM月DD日")+"</span>"),
i+="|认证到期后，公众号面板的认证标识不再展示；订阅号不支持在自定义菜单插入外链；服务号支付功能、授权等高级接口将被停用。"):i="微信认证已到期，请尽快进行年审|你的帐号认证已到期。公众号面板的认证标识不再展示；订阅号不支持在自定义菜单插入外链；服务号支付功能、授权等高级接口被停用。";
{
j.show({
type:"info",
title:"微信认证提示",
msg:i,
buttons:[{
text:"去认证",
click:function(){
location.href=wx.url("/acct/wxverify?action=step&t=wxverify/index&step=proto");
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}
k.exist_appsecret_danger=0;
}
}
function s(){
if(k.force_update_material.need_update){
var e=template.render("js_forceupdate_tmpl",{}),t=v.unix(k.force_update_material.expire_time).format("YYYY年MM月DD日");
if(1==k.force_update_material.status||3==k.force_update_material.status){
j.show({
title:"资质审核提醒",
msg:1==k.force_update_material.status?"根据《微信公众平台运营规范》的规定，你的公众号需要在以下期限内向平台提交相应的法定许可证件或牌照等材料，供平台进行审核。逾期未能通过审核的，平台将基于你的公众号涉嫌无照经营而采取帐号封禁等处理措施。|"+e:"你提交的主体资质不符合要求，需在%s之前重新完成提交，逾期无法提交或提交材料不正确的，将按照涉嫌无照经营进行帐号封禁处理。".sprintf(t),
type:"info",
className:"forceupdate_dialog",
buttons:[{
type:"primary",
text:"去提交",
click:function(){
window.open(wx.url("/acct/contractorinfo?action=forceupload")),this.remove();
}
}]
});
}
$(".js_force_update_material").show(),$(".js_force_update_material_func_expired").text(t);
}
}
function a(){
if(k.force_check_info.is_force_check){
if($(".js_force_check").show().find(".js_force_check_date").text(h.toDateStr(k.force_check_info.expire_time)),
1==k.force_check_info.check_status)return void $(".js_force_check").find(".js_force_check_btn").text("审核中").css("color","#aaa").disable();
h.init($.extend(!0,{},k.force_check_info,{
page:"home"
})),$(".js_force_check_btn").click(function(){
h.renderIndexPopup();
});
}
}
function o(){
function e(e){
if(e.force_organization_check_real_person&&3!=e.organization_check_real_person_state){
$(".js_orgrealnamestate").show();
{
var t=e.force_organization_check_deadline_timestamp;
v.unix(t).format("YYYY年MM月DD日");
}
1==e.organization_check_real_person_state&&($(".js_orgrealnamestate_auditing").html("你的帐号正在进行主体身份验证 "+"<a target='_blank' href='%s'>查看验证详情</a>".sprintf(wx.url(1==e.organization_check_real_person_way?"/acct/orgrealname?action=get_remit_verify_page":"/merchant/order?action=index"))),
$(".js_orgrealname_verify").hide());
}
}
"0"!=wx.cgiData.realname_type&&0!=wx.cgiData.realname_type&&x.get({
url:"/acct/checkorgrealnamestate?action=get"
},function(t){
0==t.base_resp.ret?e(t):BJ_REPORT&&BJ_REPORT.monitor(null,JSON.stringify(t),119);
});
}
function r(){
c(),_();
}
function c(){
try{
wx.cgiData.timesend_msg=JSON.parse(wx.cgiData.timesend_msg),wx.cgiData.timesend_msg=wx.cgiData.timesend_msg.sent_list||[];
}catch(e){
wx.cgiData.timesend_msg=[];
}
var t=f(wx.cgiData.timesend_msg);
if(l(t),t&&t.length>0){
var i=$("#timer_send_main");
i.find(".js_send_list").html(tpl.render("timer_send_list_tpl",{
list:t
})),i.show(),t.length>2&&i.find(".js_show_all").show(),setTimeout(function(){
i.find(".js_text_flag").each(function(e,t){
$(t).height()>26&&$(t).siblings(".js_expand_bt").show();
});
},0);
}
}
function _(){
var e=!1,t=$("#timer_send_main");
t.on("click",".js_show_all",function(e){
var i=$(e.target||e.srcElement);
i.hide(),t.find(".js_send_list").find(".js_timer_send_item").show(),setTimeout(function(){
t.find(".js_text_flag").each(function(e,t){
$(t).height()>26&&$(t).siblings(".js_expand_bt").show();
});
},0);
}),t.on("click",".js_unsend",function(i){
var n=$(i.target||i.srcElement),s=n.data("id");
s&&e!==!0&&new y({
dom:this,
content:"确认取消，本条消息将不会被推送给你的粉丝，你的群发条数也会恢复。",
place:"bottom",
margin:"right",
hideIfBlur:!0,
addCls:"media_opr_popover",
buttons:[{
text:"取消群发",
click:function(){
var i=this,a=this.$pop.find(".jsPopoverBt").eq(0),o=n.parents(".js_timer_send_item");
e=!0,a.btn(!1),x.post({
mask:!1,
url:wx.url("/cgi-bin/masssendpage?action=cancel_time_send"),
data:{
id:s
}
},{
done:function(n){
if(e=!1,a.btn(!0),!n||!n.base_resp)return void b.err("系统繁忙，请稍后再试");
var s=1*n.base_resp.ret;
if(0==s){
b.suc("已取消定时发送");
var r=o.siblings(".js_timer_send_item");
0==r.length&&t.hide(),m(o),i.remove();
}else b.err("系统繁忙，请稍后再试");
},
fail:function(){
e=!1,a.btn(!0),b.err("系统繁忙，请稍后再试");
}
});
},
type:"primary"
},{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}),t.find(".js_hot_time_tips").each(function(){
new D({
content:"等待群发消息过多，你的消息可能延后发送，你可以继续等待或取消群发。",
container:$(this),
position:{
left:-138,
top:2
},
reposition:!0,
type:"hover"
});
});
}
function m(e){
e.remove();
var t=$("#timer_send_main"),i=t.find("ul.js_send_list");
i.find("li.js_timer_send_item").eq(1).show(),i.find("li.js_timer_send_item").length<=2&&t.find(".js_show_all").hide();
}
function l(e){
for(var t=0,i=e.length;i>t;t++){
var n=e[t],s="";
9==n.type&&1==n.share_type||16==n.type||4==n.type?s="视频消息":9==n.type||10==n.type||11==n.type?s="图文消息":3==n.type?s="语音消息":1==n.type?s="文字消息":2==n.type?s="图片消息":17==n.type&&n.view&&n.view.card&&(s="卡券消息");
var a=new Date(1e3*n.sent_info.time),o=Y.formatDate(a,"m月d日 hh:ii");
o=a.getDate()===(new Date).getDate()?"今天 "+o:"明天 "+o,n.timerSendInfo={
typeDesc:s,
time:o
};
}
}
function d(e){
x.get({
mask:!1,
url:wx.url("/cgi-bin/newmasssendpage?count=7&begin="+e)
},function(e){
if(e&&e.base_resp&&0==e.base_resp.ret){
var t=f(e.sent_list);
t&&t.length>0?($("#list").html(tpl.render("send_tpl",{
list:t
})),$(".js_text_flag").each(function(e,t){
$(t).height()>26&&$(t).siblings(".js_expand_bt").show();
})):$("#list_container").hide();
}
});
}
function p(){
window.list_ids&&window.list_ids.length>0&&x.get({
url:wx.url("/cgi-bin/appmsgotherinfo?appmsgidlist="+window.list_ids.join(","))
},function(e){
e&&e.base_resp&&0==e.base_resp.ret&&e.sent_list.each(function(e){
e&&e.appmsg_info&&e.appmsg_info.each&&e.appmsg_info.each(function(e,t){
e.i=t,$("#num_"+e.appmsgid+"_"+t).html(tpl.render("num_tpl",e));
});
}),"undefined"!=typeof performance&&performance.timing&&performance.timing.navigationStart&&N.saveSpeeds({
uin:wx.data.uin,
pid:151,
speeds:[{
sid:21,
time:(new Date).getTime()-performance.timing.navigationStart
}]
});
});
}
function u(){
function e(){
"展开"==$(this).text()?($(this).siblings(".js_text_el").removeClass("ellipsis-text"),
$(this).text("收起")):($(this).siblings(".js_text_el").addClass("ellipsis-text"),$(this).text("展开"));
}
var t=f(wx.cgiData.mass_data.sent_list,!0);
t&&t.length>0?($("#list").html(tpl.render("send_tpl",{
list:t
})),p(),new C({
container:"#pagebar",
perPage:7,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:wx.cgiData.mass_data.total_count,
callback:function(e){
$("html, body").animate({
scrollTop:$("#list_container").offset().top
},300),d(7*(e.currentPage-1),7);
}
})):$("#list_container").hide(),$(".js_text_flag").each(function(e,t){
$(t).height()>26&&$(t).siblings(".js_expand_bt").show();
}),$("#timer_send_main").on("click",".js_expand_bt",e),$("#list_container").on("click",".js_expand_bt",e),
g(),$(window).load(function(){
q.init();
});
}
function f(e,t){
return window.list_ids=[],e&&"function"==typeof e.each&&e.each(function(e){
switch(e.view={
is_first:t
},e.sent_info&&(e.view.time=Y.timeFormat(e.sent_info.time)),e.sent_result.msg_status){
case 11:
e.view.status="发送中",e.view.msg="群发图文原创情况检测结果已通过模版消息下发到管理员的微信号，请前往操作确认",e.view.noReadNum=!0;
break;

case 12:
e.view.status="发送失败",e.view.msg="管理员已在群发图文原创情况检测结果确认页取消本条定时消息",e.view.noReadNum=!0;
break;

case 13:
e.view.status="发送失败",e.view.msg="群发图文原创情况检测结果过期未确认，已取消本条定时消息",e.view.noReadNum=!0;
break;

case 1:
case 101:
case 102:
case 103:
case 104:
e.view.status="等候发送";
break;

case 105:
case 106:
e.view.status="发送中";
break;

case 2:
e.view.status="发送完毕";
break;

case 5:
e.view.status=e.sent_status.progress>0?"发送完毕":"发送失败";
break;

case 6:
switch(e.view.noReadNum=!0,e.view.status="审核失败",e.sent_result.refuse_reason){
case"10001":
e.view.msg="垃圾广告或骚扰";
break;

case"20001":
e.view.msg="违反相关法规";
break;

case"20002":
e.view.msg="色情或性暗示";
break;

case"20004":
e.view.msg="违反相关规定";
break;

case"20006":
e.view.msg="涉嫌违法";
break;

case"20008":
e.view.msg="涉嫌欺诈";
break;

case"20013":
e.view.msg="涉嫌侵权";
break;

case"21000":
e.view.msg="违反相关规定";
}
break;

case 7:
e.view.status="已删除";
break;

case 8:
e.view.status="无法查看";
}
if(e.type){
if(e.view.noReadNum||9!=e.type&&10!=e.type&&11!=e.type||e.appmsg_info&&e.appmsg_info.length>0&&(list_ids.push(e.appmsg_info[0].appmsgid),
e.appmsg_info.each(function(e,t){
e.i=t;
})),9==e.type&&1==e.appmsg_info.length&&1==e.appmsg_info[0].share_type||16==e.type||4==e.type||3==e.type){
var i={};
i=16==e.type||4==e.type?e.video_info:3==e.type?e.audio_info:e.appmsg_info[0],i._duration=i.duration,
i.duration=v.unix(i.duration).format("mm:ss");
}
17==e.type&&(e.view.card=P.parse_cardticket(e.card_info));
}
}),e;
}
function g(){
function e(){
var e=$(this).parent(".js_audio");
0==q.is_playing?q.play(e):1==q.is_playing&&(e.hasClass("weui-desktop-mass-list__media-audio__playing")?q.stop(e):(q.reset(),
q.play(e)));
}
$("#list").on("click",".js_del",function(){
var e=$(this).data("type"),t=$(this).data("idx"),i=$(this).data("msgid"),n=($(this).data("len"),
$(this)),s="";
s=9==e||10==e||11==e?"删除后用户将无法访问此文章，确定删除该文章？":"确定删除？该操作只能删除历史消息中的记录，不能删除已经成功发送到用户的消息。",
new y({
dom:this,
content:s,
place:"bottom",
margin:"right",
hideIfBlur:!0,
addCls:"media_opr_popover",
buttons:[{
text:"确定",
click:function(){
b.suc("正在删除"),z.massdel(i,function(){
n.parent().addClass("weui-desktop-mass-list__media__content_del"),n.hide(),"undefined"==typeof t&&(n.parent().parent().find(".js_status_txt").text("已删除"),
n.parent().parent().find(".js_status_info").html('<p class="split_item">该文章已被删除，你的粉丝在“查看历史消息”中将无法查看该文章</p>'));
},null,t),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),$("#list").on("click",".js_resend",function(){
var e=$(this).data("msgid");
new y({
dom:this,
content:"补发时对已成功接收消息的用户自动过滤，不会再次发送，是否补发？",
place:"bottom",
margin:"center",
buttons:[{
text:"补发",
click:function(){
b.suc("正在补发"),z.masssend({
msgid:e
},function(){
location.reload();
}),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),$("#list").on("click",".js_open_comment",function(){
{
var e=$(this),t=e.data("commentid"),i=e.data("msgid"),n=e.data("idx");
new y({
dom:this,
content:"确定开启留言？",
place:"bottom",
addCls:"media_opr_popover",
margin:"center",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
var s=this.$pop.find(".jsPopoverBt").eq(0),a=this;
s.btn(!1),x.post({
url:"/misc/appmsgcomment?action=set_can_comment",
data:{
enabled:1,
comment_id:t,
app_msg_id:i,
app_msg_item_idx:n
}
},{
done:function(t){
s.btn(!0),0==t.base_resp.ret?(a.remove(),b.suc("开启留言成功"),e.hide().siblings("a").show()):200007==t.base_resp.ret&&b.err("该文章留言因违反相关规定被关闭");
},
fail:function(){
s.btn(!0),b.err("系统错误，请稍后再试");
}
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}
}),$("#timer_send_main").on("click",".jsAudioBt",e),$("#list").on("click",".jsAudioBt",e),
$(".js_temp_link").click(function(){
var e=window.open(),t=this;
x.get({
url:"/cgi-bin/appmsg?action=get_temp_url",
data:{
appmsgid:$(t).data("msgid"),
itemidx:$(t).data("idx")
}
},function(t){
t.base_resp&&0==t.base_resp.ret?e&&e.location&&(e.location.href=t.temp_url):(b.err("生成临时链接失败，请重试"),
e.close());
});
});
}
var h=e("home/force_check.js"),w=e("biz_common/cookie.js"),v=e("biz_common/moment.js"),x=e("common/wx/Cgi.js"),y=e("common/wx/popover.js"),b=e("common/wx/Tips.js"),j=e("common/wx/dialog.js"),k=wx.cgiData,D=e("common/wx/tooltips.js"),C=e("common/wx/pagebar.js"),z=e("message/message_cgi.js"),P=e("cardticket/parse_data.js"),Y=(e("media/appmsg_temp_url.js"),
e("common/wx/time.js"));
e("common/qq/emoji.js"),e("widget/emotion_panel.css");
var N=e("biz_common/utils/wxgspeedsdk.js"),T=function(){
function e(){
i(),r(),u(),t(),N.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:151
}),N.send();
}
return{
init:e
};
}();
T.init();
var q={
audioPlayer:null,
playing_dom:null,
playing_timer:null,
playing_duration:0,
is_playing:!1,
init:function(){
this.audioPlayer=e("biz_web/lib/soundmanager2.js"),this.audioPlayer.setup({
url:"/mpres/zh_CN/htmledition/plprecorder/biz_web/",
preferFlash:!1,
debugMode:!1
});
},
play:function(e){
var t=e,i=t.data("duration"),n=t.data("id"),s=t.data("mediaid"),a=this,o="";
o=wx.url(s?"https://res.wx.qq.com/voice/getvoice?mediaid="+s:"/cgi-bin/getvoicedata?source=mass&msgid="+n),
this.audioPlayer.createSound({
id:n,
url:o,
onfinish:function(){
a.reset();
}
}),this.audioPlayer.play(n),this.playing_timer=setInterval(function(){
a.playing_duration++,a.playing_duration<i&&(t.find(".js_audio_time").text(v.unix(a.playing_duration).format("mm:ss")),
t.find(".js_audio_progress").css("width",100*(a.playing_duration/i)+"%"));
},1e3),this.playing_dom=t,this.is_playing=!0,t.addClass("weui-desktop-mass-list__media-audio__playing");
},
stop:function(e){
var t=e,i=(t.data("duration"),t.data("id"));
this.audioPlayer.stop(i),clearInterval(this.playing_timer),this.playing_timer=null,
this.playing_duration=0,this.playing_dom=null,this.is_playing=!1,t.removeClass("weui-desktop-mass-list__media-audio__playing"),
t.find(".js_audio_time").text("00:00"),t.find(".js_audio_progress").css("width","0%");
},
reset:function(){
this.audioPlayer.stop(this.playing_dom.data("id")),clearInterval(this.playing_timer),
this.playing_timer=null,this.playing_duration=0,this.is_playing=!1,this.playing_dom.removeClass("weui-desktop-mass-list__media-audio__playing"),
this.playing_dom.find(".js_audio_time").text("00:00"),this.playing_dom.find(".js_audio_progress").css("width","0%"),
this.playing_dom=null;
}
};
});