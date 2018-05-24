define("message/list.js",["common/wx/top.js","common/qq/mask.js","common/wx/Tips.js","common/wx/pagebar.js","biz_web/ui/dropdown.js","common/wx/popover.js","message/message_cgi.js","message/renderList.js","common/wx/searchInput.js"],function(e){
"use strict";
var s=wx.cgiData,t=s.latest_msg_id,i=s.action,r=s.day,a=s.filterivrmsg||"1",n=s.filterspammsg||"1",o=e("common/wx/top.js"),l=(e("common/qq/mask.js"),
e("common/wx/Tips.js")),c=e("common/wx/pagebar.js"),m=e("biz_web/ui/dropdown.js"),f=e("common/wx/popover.js"),g=e("message/message_cgi.js"),u=$(".js_hide_keyword"),d=$(".js_hide_harass"),p=[{
name:"时间排序",
value:"0"
}],h=0,w={},y="";
!function(){
1!=wx.cgiData.can_use_reward&&1!=wx.cgiData.can_use_comment?(p=[],y="",s.filtertype=0):(wx.cgiData.can_use_reward>0&&(p.push({
name:"赞赏总额排序",
value:"1"
}),w[1]="赞赏%s元"),wx.cgiData.can_use_comment>0&&(p.push({
name:"留言总数排序",
value:"2"
},{
name:"精选留言总数排序",
value:"3"
}),w[2]="留言%s条",w[3]="精选留言%s条"),y=w[s.filtertype]||""),h=p.length;
}(),function(){
function e(e,s){
var t=-1;
return $.each(e,function(e,i){
return i.value==s?(t=e,!1):void 0;
}),t;
}
var t="#topTab",l=new o(t,o.DATA.message,{
render:o.RENDER.message,
data:{
action:i
}
});
$.each($(t).find("a"),function(){
$(this).attr("href",$(this).attr("href")+"&filterivrmsg="+a+"&filterspammsg="+n);
});
var c,g=0,w="",y={
7:["全部消息",0],
0:["今天的消息",1],
1:["昨天的消息",2],
2:["前天的消息",3],
3:["更早",4]
},v=[{
name:"最近五天",
value:"7"
},{
name:"今天",
value:"0"
},{
name:"昨天",
value:"1"
},{
name:"前天",
value:"2"
}],_="#page_title",b="#dayselect",k="#filterTypeSelect",x="/cgi-bin/message?t=message/list&count=20&day=";
if(y[7].push(s.total_count>=1e4&&s.filtertype>0&&h>0?"消息保存5天，多媒体消息3天后无法查看。仅显示最近10000条消息的排序结果":"消息保存5天，多媒体消息3天后无法查看"),
"search"!=i&&"star"!=i){
if(h>0){
new m({
container:k,
label:"时间排序",
data:p,
callback:function(e){
location.href=wx.url(x+s.day+"&filtertype="+e+"&filterivrmsg="+a+"&filterspammsg="+n);
}
}).selected(e(p,s.filtertype),!1);
}else $(k).remove();
{
new m({
container:b,
label:"最近五天",
data:v,
callback:function(e){
location.href=wx.url(x+e+"&filtertype="+s.filtertype+"&filterivrmsg="+a+"&filterspammsg="+n);
}
}).selected(e(v,r),!1);
}
}else $(b).parent().hide(),$("body").addClass("page_favorite");
if("search"==i)w="搜索结果",g=2,$("#searchMore").show();else if("star"==i)w="已收藏的消息",
g=1,c=c||"%s条";else{
var C=y[r];
w=C[0],g=0,c=C[2],c=c||"%s条","0"==a&&u.removeClass("selected"),"0"==n&&d.removeClass("selected"),
u.show(),d.show(),$("#js_tips").mouseover(function(){
new f({
dom:"#js_tips",
content:"公众号可投诉用户的骚扰行为，平台一旦核实，该用户发给公众号的消息则被标记为骚扰消息。",
hover:!0
});
});
}
$(_).html(w+(c?"<span>(%s)</span>".sprintf(c.sprintf(s.total_count)):"")),console.log("selected_menu="+g),
l.selected(g);
}(),function(){
function e(e){
return 6*r>e&&(e+=r),e;
}
var s={},i=function(e,t){
e=e||s.title||"",t=t||s.time||500,s.timer&&clearTimeout(s.timer),s.timer=t,document.title=s.title=e.substring(1,e.length)+e.substring(0,1),
s.timer=setTimeout(i,t);
},r=1e4,a=r,n=0,o=function(){
t&&g.getNewMsgCount(t,function(s){
if(s&&s.base_resp&&0==s.base_resp.ret){
var t=s.newTotalMsgCount;
t>0?(i("收到%s条新消息...".sprintf(t)),$("#newMsgTip").fadeIn(),$("#newMsgNum").html(t),
a=t==n?e(a):r,n=t):(a=e(a),$("#newMsgTip").hide()),setTimeout(o,a);
}
},function(s){
s&&"-20000"==s.ret||(a=e(a),setTimeout(o,a));
});
};
setTimeout(o,a);
}(),function(s){
var t=s.list,r=null,a=e("message/renderList.js");
if(r=s.frommsgid||t[0]&&t[0].id,"search"!=i){
{
var n=s.offset/s.count+1;
new c({
container:".pageNavigator",
perPage:s.count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:s.total_count,
callback:function(e){
var t=e.currentPage;
if(t!=n)return t--,location.href=wx.url("/cgi-bin/message?t=message/list&action=%s&filtertype=%s&keyword=%s&frommsgid=%s&offset=%s&count=%s&day=%s&filterivrmsg=%s&filterspammsg=%s".sprintf(s.action,s.filtertype,encodeURIComponent(s.keyword),r,t*s.count,s.count,s.day,s.filterivrmsg,s.filterspammsg)),
!1;
}
});
}
u.on("click",function(){
var e=$(this),t=e.hasClass("selected")?"0":"1",i=wx.url("/cgi-bin/message?t=message/list&action=%s&filtertype=%s&keyword=%s&count=%s&day=%s&filterivrmsg=%s&filterspammsg=%s".sprintf(s.action,s.filtertype,encodeURIComponent(s.keyword),s.count,s.day,t,s.filterspammsg));
return e.toggleClass("selected"),location.href=i,!1;
}),d.on("click",function(){
var e=$(this),t=e.hasClass("selected")?"0":"1",i=wx.url("/cgi-bin/message?t=message/list&action=%s&filtertype=%s&keyword=%s&count=%s&day=%s&filterivrmsg=%s&filterspammsg=%s".sprintf(s.action,s.filtertype,encodeURIComponent(s.keyword),s.count,s.day,s.filterivrmsg,t));
return e.toggleClass("selected"),location.href=i,!1;
});
}else{
var o=t.length,m=r;
o<s.count&&$("#searchMore").hide(),$("#searchMore").click(function(){
$(this).addClass("show_loading"),g.pageNav({
action:"search",
count:s.count,
keyword:s.keyword,
frommsgid:m
},function(e){
a({
container:"#listContainer",
list:e,
action:i,
refer:"message",
messageCb:function(e){
if(0===e.base_resp.ret){
var t=parseInt(e.msg_cnt/s.count);
if(!d.hasClass("selected"))return!1;
"star"==i?location.reload():location.href=wx.url("/cgi-bin/message?t=message/list&action=%s&filtertype=%s&keyword=%s&frommsgid=%s&offset=%s&count=%s&day=%s&filterivrmsg=%s&filterspammsg=%s".sprintf(s.action,s.filtertype,encodeURIComponent(s.keyword),r,t*s.count,s.count,s.day,s.filterivrmsg,s.filterspammsg));
}else l.err("系统错误，请稍后重试");
}
}),$("#searchMore").removeClass("show_loading"),e.length<s.count?$("#searchMore").hide():m=e[e.length-1].id;
});
});
}
$("#listContainer").html(""),a({
container:"#listContainer",
list:t,
filterData:{
str:y,
value:s.filtertype,
isFixed:1==s.filtertype?!0:!1,
filtertype:s.filtertype,
keyword:s.keyword,
day:s.day,
filterivrmsg:s.filterivrmsg,
filterspammsg:s.filterspammsg,
frommsgid:r
},
action:i,
refer:"message",
messageCb:function(e){
if(0===e.base_resp.ret){
var t=parseInt(e.msg_cnt/s.count);
if(!d.hasClass("selected"))return!1;
"star"==i?location.reload():location.href=wx.url("/cgi-bin/message?t=message/list&action=%s&filtertype=%s&keyword=%s&frommsgid=%s&offset=%s&count=%s&day=%s&filterivrmsg=%s&filterspammsg=%s".sprintf(s.action,s.filtertype,encodeURIComponent(s.keyword),r,t*s.count,s.count,s.day,s.filterivrmsg,s.filterspammsg));
}else l.err("系统错误，请稍后重试");
}
});
}(s),function(){
var t=e("common/wx/searchInput.js");
new t({
id:"#searchBar",
value:s.keyword.html(!1).html(!1),
placeholder:"消息内容",
click:function(e){
e.length>0?location.href=wx.url("/cgi-bin/message?t=message/list&action=search&keyword=%s&count=%s".sprintf(encodeURIComponent(e),s.count)):(l.err("请输入搜索关键词"),
$("#searchBar").find(".searchInput").focus());
}
}),s.keyword&&$(".pageNavigator").hide();
}();
});