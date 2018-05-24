define("mass/timer_list.js",["common/qq/emoji.js","common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/qq/mask.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/time.js","common/wx/media/img.js","common/wx/media/audio.js","common/wx/media/video.js","tpl/media/card_ticket.html.js","tpl/media/word.html.js","cardticket/parse_data.js","common/wx/media/idCard.js","common/wx/media/simpleAppmsg.js","common/wx/media/multipleAppmsg.js","message/message_cgi.js","common/wx/tooltips.js","biz_common/moment.js","tpl/media/simple_videomsg_new.html.js","common/wx/top.js","common/wx/popover.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function t(e){
var t=e.multi_item&&e.multi_item.length>1;
e.multi_item.each(function(s){
s.appmsg_cover=s.cover?s.cover.nogif():wx.url("/cgi-bin/getimgdata")+"&mode=small&source=%s&msgid=%s&fileId=%s".sprintf(e.source,e.id,s.file_id),
1!=t&&(s.seq=null);
}),$(e.container).html(template.render("appMsgTpl",e)).data(e);
}
e("common/qq/emoji.js"),e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var s=e("common/wx/Cgi.js"),i=wx.cgiData,a=(e("common/qq/mask.js"),e("common/wx/pagebar.js")),n=e("common/wx/Tips.js"),o=e("common/wx/time.js"),m=o.timeFormat,c=e("common/wx/media/img.js"),r=e("common/wx/media/audio.js"),d=e("common/wx/media/video.js"),l=e("tpl/media/card_ticket.html.js"),p=e("tpl/media/word.html.js"),_=e("cardticket/parse_data.js"),u=e("common/wx/media/idCard.js"),g=(e("common/wx/media/simpleAppmsg.js"),
e("common/wx/media/multipleAppmsg.js"),e("message/message_cgi.js")),f=e("common/wx/tooltips.js"),h=e("common/wx/Cgi.js"),v=(e("biz_common/moment.js"),
e("tpl/media/simple_videomsg_new.html.js")),w=e("common/wx/top.js"),j={},x=e("common/wx/popover.js");
new w("#topTab",w.DATA.mass).selected("list"),function(){
function e(e){
var t=e.msg_status,s=e.send_stat.progress,i="发送失败";
switch(t){
case 1:
case 101:
case 102:
case 103:
case 104:
i="等候发送";
break;

case 105:
case 106:
i="发送中"+" (%s%) ".sprintf(s);
break;

case 2:
i="发送完毕";
break;

case 5:
i=s>0?"发送完毕":"发送失败";
break;

case 6:
i="审核失败";
break;

case 7:
i="已删除";
break;

case 8:
i="无法查看";
}
return i;
}
function a(){
var t=$(this),s=t.data("id"),i=y[s];
if(i){
i.multi_item&&i.multi_item.each(function(e){
e.is_deleted&&(i.is_deleted=!0);
});
var n=template.render("js_massResult",i);
$(".js_"+s).remove(),new f({
container:this,
content:n,
parentClass:"js_"+s,
position:{
left:-142+t.width()/2,
top:2
},
reposition:!0,
type:"hover"
}),(1==i.msg_status||i.msg_status>=100&&i.msg_status<=106)&&setTimeout(function(){
h.get({
url:"/cgi-bin/masssendpage?action=status",
data:{
msgid:i.id
}
},function(s){
0==s.base_resp.ret?(i.msg_status=s.msg_status,i.send_stat=s.send_stat||i.send_stat,
$("#massItem"+i.id).find(".js_status").html(e(i)+'<i class="icon_arrow_down"></i>'),
a.call(t),2==i.msg_status&&1==i.multi_item.length&&$("#massItem"+i.id).find(".mass_opr").html(wx.T('<a class="js_del" data-id="{id}" data-type="{type}" href="javascript:void(0);">删除</a>',i))):h.handleRet(s,{
id:64462,
key:19,
url:"/cgi-bin/masssendpage?action=status",
showMsg:!1
});
});
},1e4);
}
}
var o=i.list,w=o.length,b={
1:function(e,t){
e.html(template.compile(p)({
content:t.content.emoji()
}));
},
2:function(e,t){
return new c({
container:$("#"+e.attr("id")),
file_id:0,
msgid:t.id,
source:"mass",
fakeid:t.fakeid
});
},
3:function(e,t){
var s=t;
return s.selector="#"+e.attr("id"),s.title="[语音]"+s.title,new r(s);
},
4:function(e,t){
var s=t;
return s.selector="#"+e.attr("id"),new d(s);
},
42:function(e,t){
var s=t;
return s.container="#"+e.attr("id"),new u(s);
},
10:function(e,s){
var i=s;
i.container="#"+e.attr("id"),i.param=wx.data.param,t(i);
},
15:function(e,t){
if(0==t.multi_item[0].is_new_video){
var s=$.extend({},t);
return s.sent=!0,s.selector=e,s.tpl="videomsg",s.id=1e5*Math.random()|0,new d(s);
}
var s=$.extend({},t.multi_item[0]);
s.id=1e5*Math.random()|0,e.append(wx.T(v,s));
},
17:function(e,t){
var s=_.parse_cardticket(t.card);
s&&(s.token=wx.data.t,e.html(template.compile(l)(s)));
}
};
b[16]=b[15],b[62]=b[4],b[9]=b[10],b[11]=b[10];
for(var k,y={},q=0;w>q;q++){
k=o[q];
var I=k.multi_item,C=[];
if(I.length)for(var T=0;T<I.length;T++)C=C.concat(I[T].vote_id);
if(k.voteIds=C,k.original_success=0,k.original_fail=0,k.original_apply=0,I.length)for(var T=0;T<I.length;T++)1==I[T].copyright_type&&k.original_apply++,
11==I[T].copyright_status&&k.original_success++,(12==I[T].copyright_status||13==I[T].copyright_status)&&k.original_fail++;
y[k.id]=k,C.length>0&&(k.hasVote=!0);
}
template.helper("timeFormat",function(e){
return m(e);
}),template.helper("massStatus",e),template.helper("massDesc",function(e){
var t=e.msg_status,s="";
if(6==t){
var i=e.refuse_reason;
switch(i){
case"10001":
s="垃圾广告或骚扰";
break;

case"20001":
s="违反相关法规";
break;

case"20002":
s="色情或性暗示";
break;

case"20004":
s="违反相关规定";
break;

case"20006":
s="涉嫌违法";
break;

case"20008":
s="涉嫌欺诈";
break;

case"20013":
s="涉嫌侵权";
break;

case"21000":
s="违反相关规定";
}
}
return s;
}),o.each(function(e){
var t=e,s=0;
t.multi_item&&t.multi_item.each(function(e){
e.is_deleted&&(t.is_deleted=!0,s++);
}),s>0&&s==t.multi_item.length&&(t.msg_status=7);
});
var S=$("#masslist").html(template.render("t_massList",{
token:wx.data.t,
list:o
}).trim());
$(".js_result",S).each(a),$(".mass_wrp",S).each(function(){
var e=$(this),t=e.data("id"),s=y[t];
if(s){
var i=s.type;
i&&b[i]&&b[i](e,s);
}
}),$(".js_del").each(function(){
var e=$(this).data("idx");
if(e>1){
var t=$(this).parents(".mass_item").find(".title:eq("+(e-1)+")");
t.length>0&&$(this).parent().offset({
top:t.offset().top
});
}
}),S.on("click",".js_open_comment",function(){
var e=$(this),t=e.data("commentid"),i=e.data("msgid"),a=e.data("idx"),o=new x({
dom:this,
content:"确定为文章开启留言？",
place:"bottom",
className:"mass_del_popover",
margin:"right",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
if(j.openCommenting!==!0){
j.openCommenting=!0;
var e=this.$pop.find(".jsPopoverBt").eq(0),o=this;
e.btn(!1),s.post({
url:"/misc/appmsgcomment?action=set_can_comment",
data:{
enabled:1,
comment_id:t,
app_msg_id:i,
app_msg_item_idx:a
}
},{
done:function(t){
j.openCommenting=!1,e.btn(!0),0==t.base_resp.ret?(o.remove(),n.suc("开启留言成功"),window.location.reload()):200007==t.base_resp.ret?n.err("该文章留言因违反相关规定被关闭"):(s.handleRet(t,{
id:64462,
key:24,
url:"/misc/appmsgcomment?action=set_can_comment"
}),n.err(t.base_resp.err_msg));
},
fail:function(){
j.openCommenting=!1,e.btn(!0),s.handleRet({},{
id:64462,
key:24,
url:"/misc/appmsgcomment?action=set_can_comment"
}),n.err("系统错误，请稍后再试");
}
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
o.$pop.css("left",o.$pop.position().left+50+"px");
}),S.on("click",".js_del",function(){
var e=$(this),t=e.data("id"),s=e.data("type");
q=e.data("index");
var a=e.data("idx"),o="删除后用户将无法访问此文章，确定删除该素材？",m=!1;
if("9"!=s&&"17"!=s)o="确定删除？该操作只能删除历史消息中的记录，不能删除已经成功发送的消息。";else{
var c=i.list[q];
m=c&&c.multi_item&&c.multi_item.length>1;
}
var r=new x({
dom:this,
content:o,
place:"bottom",
className:"mass_del_popover",
margin:"right",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
var i="";
void 0!=a&&(i=a),n.suc("正在删除"),g.massdel(t,function(){
if(m)e.hide().siblings(".js_d").show(),e.parents(".mass_opr").siblings("td:eq(0)").find(".appmsgSendedItem:eq("+(a-1)+")").prepend('<div class="icon_has_del"><span class="icon_has_del_bg"></span><em>已删除</em></div>'),
0==e.parents(".mass_opr").find(".js_del:visible").length&&window.location.reload();else{
$("#massItem"+t).find(".js_status").html('已删除<i class="icon_arrow_down"></i>');
var i="<p>该消息已被你删除，你的粉丝在“查看历史消息”中将无法查看该消息</p>";
"17"==s&&(i="<p>该消息已被你删除</p>"),$(".js_"+t).find(".popover_content").html(i),10==s||(3==s?e.parents(".mass_opr").siblings("td:eq(0)").find(".audio_msg").prepend('<div class="icon_has_del"><span class="icon_has_del_bg"></span><em>已删除</em></div>'):e.parents(".mass_opr").siblings("td:eq(0)").find(".appmsgSendedItem").prepend('<div class="icon_has_del"><span class="icon_has_del_bg"></span><em>已删除</em></div>')),
e.closest("td").empty(),$("#massItem"+t).find(".js_desc").html("");
}
},null,i),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
r.$pop.css("left",r.$pop.position().left+21+"px"),$(".delCheck").checkbox();
}),S.on("click",".js_resend",function(){
var e=$(this),t=e.data("id");
new x({
dom:this,
content:"补发时对已成功接收消息的用户自动过滤，不会再次发送，是否补发？",
place:"bottom",
margin:"center",
buttons:[{
text:"补发",
click:function(){
n.suc("正在补发"),g.masssend({
msgid:t
},function(){
location.href=wx.url("/cgi-bin/masssendpage?t=mass/list&action=history&begin=0&count=10");
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
});
for(var z=$(".mass_opr"),q=0;w>q;++q)1==o[q].can_retry_masssend&&5==o[q].msg_status&&1!=o[q].send_fail_reason&&(z.eq(q).find(".js_desc").after('<a class="js_resend" href="javascript:void(0);">补发</a>'),
z.eq(q).find(".js_resend").attr("data-id",o[q].id));
$(".mass_opr[data-status=7]").each(function(e,t){
10==$(t).data("type")||(3==$(t).data("type")?$(t).siblings("td:eq(0)").find(".audio_msg").prepend('<div class="icon_has_del"><span class="icon_has_del_bg"></span><em>已删除</em></div>'):$(t).siblings("td:eq(0)").find(".appmsgSendedItem").prepend('<div class="icon_has_del"><span class="icon_has_del_bg"></span><em>已删除</em></div>'));
}),function(){
var e=1;
$(".js_video").click(function(){
var t=$(this).parent(),s=$(this),i=s.parents(".mass_wrp").data("id"),a=$.extend({},y[i]);
a.multi_item[0].is_new_video?$("<iframe width=600 height=400 src='"+location.protocol+"//v.qq.com/iframe/preview.html?vid="+a.multi_item[0].content+"&auto=0'></iframe>").popup({
title:"视频播放",
className:"play_dialog",
onShow:function(){
var e=this;
setTimeout(function(){
e.resetPosition();
},100);
},
onHide:function(){
this.remove();
}
}):(e++,$("<div id='js_popup_video"+e+"'></div>").popup({
title:t.find("span").html(),
className:"dialog_video",
onShow:function(){
var t=this,s=$.extend({},y[i]);
s.selector=$("#js_popup_video"+e),s.sent=!1,s.tpl="videomsg",s.title="",s.time="",
s.from="",s.digest="",s.id=e,new d(s),setTimeout(function(){
t.resetPosition();
},100);
},
onHide:function(){
this.remove();
}
})),$(".wxVideoScreenshot").click();
});
}();
}();
var b=i.total_count;
!function(e){
{
var t=i.count,s=i.begin,n=s/t+1;
new a({
container:".pageNavigator",
perPage:t,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:e,
callback:function(e){
var s=e.currentPage;
if(s!=n)return s--,location.href=wx.url("/cgi-bin/masssendpage?t=mass/list&action=history&begin=%s&count=%s".sprintf(t*s,t)),
!1;
}
});
}
}(b),function(){
wx.cgiData.new_user_tag&&$(".js_group_label").text("标签");
}();
var k=e("biz_common/utils/wxgspeedsdk.js");
k.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:32
}),k.send();
});