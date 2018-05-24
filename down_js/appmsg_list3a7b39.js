define("media/appmsg_list.js",["common/wx/media/appmsg.js","common/wx/media/video.js","common/qq/mask.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/top.js","common/wx/dialog.js","biz_web/lib/store.js","common/wx/tooltip.js","common/wx/popover.js","media/media_cgi.js","tpl/media/videocard.html.js","tpl/media/videomsg.html.js","common/wx/time.js","common/qq/jquery.plugin/btn.js","common/wx/popup.js","common/wx/searchInput.js"],function(i){
"use strict";
function t(i){
var t=arguments[1]||window.location.search,e=new RegExp("(^|&)"+i+"=([^&]*)(&|$)"),o=t.substr(t.indexOf("?")+1).match(e);
return null!=o?o[2]:"";
}
function e(){
if(10==wx.cgiData.type||11==wx.cgiData.type){
$("#searchDiv").show();
var t=i("common/wx/searchInput.js");
new t({
id:"#searchDiv",
value:wx.cgiData.key,
placeholder:"标题/作者/摘要",
click:function(i){
window.location=wx.url(i.length>0?"/cgi-bin/appmsg?begin=0&count=9&t=media/appmsg_list&action=list&type="+wx.cgiData.type+"&query="+encodeURIComponent(i):"/cgi-bin/appmsg?begin=0&count=9&t=media/appmsg_list&action=list&type="+wx.cgiData.type);
}
}),wx.cgiData.key&&($(".appmsg_title>a").each(function(i,t){
$(t).text().match(/<script>/g)||$(t).html($(t).html().replace(new RegExp(wx.cgiData.key,"g"),'<span class="highlight">'+wx.cgiData.key+"</span>"));
}),$(".jsCreate").hide()),$("#reload").click(function(){
window.location=wx.url("/cgi-bin/appmsg?begin=0&count=9&t=media/appmsg_list&action=list&type="+wx.cgiData.type);
});
}
}
var o=i("common/wx/media/appmsg.js"),n=i("common/wx/media/video.js"),a=(i("common/qq/mask.js"),
i("common/wx/Tips.js")),s=i("common/wx/pagebar.js"),m=i("common/wx/top.js"),p=i("common/wx/dialog.js"),c=i("biz_web/lib/store.js"),l=i("common/wx/tooltip.js"),d=i("common/wx/popover.js"),r=i("media/media_cgi.js"),u=i("tpl/media/videocard.html.js"),g=(i("tpl/media/videomsg.html.js"),
i("common/wx/time.js"));
i("common/qq/jquery.plugin/btn.js"),i("common/wx/popup.js");
var _=wx.cgiData,v=_.type,h=_.file_cnt,w=$("#query_tips").html(),f=_.item||_.file_item||[],x=1;
if(window.Store=c,new m("#topTab",m.DATA.media).selected("media"+({
21:15
}[v]||v)),$("#openBt").click(function(){
window.open(wx.url("/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isMul=1&isNew=1&type="+wx.cgiData.type),"_blank");
}),15==v||21==v){
var j={
sub:[]
},b=template.compile('<div class="highlight_box"><ul class="links">    		{each sub as item i}            <li class="links_item {if item.selected}selected{/if}"><a href="{item.url}">{item.name}</a></li>        	{/each}</ul></div>');
j.sub.push({
name:"视频",
url:wx.url("/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&action=list_video&type=15"),
selected:15==v
}),j.sub.push({
name:"小视频",
url:wx.url("/cgi-bin/filepage?type=21&begin=0&count=10&t=media/appmsg_list"),
selected:21==v
}),$(".js_main_hd").append(b(j));
}
15==v&&h.video_cnt>0&&!_.is_upload_cdn_ok&&$("#Js_msgBox").show(),function(){
var i=f.length;
if(0>=i)return void(21==v?$(".jsInitEmpty").show():15==v&&$(".js_video_empty").show());
for(var t=$("#appmsgList"),e=[$("#appmsgList1"),$("#appmsgList2"),$("#appmsgList3")],s=0;i>s;++s){
var m=f[s];
if(15==v){
var c=m.app_id||"";
if(e[s%3].append('<div id="appmsg%s"></div>'.sprintf(c)),m.multi_item[0].digest&&m.multi_item[0].digest.length>100&&(m.multi_item[0].digest=m.multi_item[0].digest.substr(0,100)+"……"),
m.multi_item[0].app_id=m.app_id,m.multi_item[0].seq=m.seq,1==m.multi_item[0].is_new_video){
var h=$.extend({
for_operation:1,
is_new_video:1,
before_original_video:m.create_time<1453914e3?1:0,
time:m.create_time?g.timeFormat(m.create_time):"",
video_url:m.video_url,
video_download_url:m.video_download_url,
token:wx.data.t
},m.multi_item[0]),w=wx.T(u,h);
$("#appmsg"+c).append(w);
}else new n($.extend({
selector:"#appmsg"+c,
id:c,
video_id:m.content,
for_operation:!0,
for_transfer:!!m.content,
hide_transfer:!!m.content,
from:m.content?"(来自本地视频)":"(来自网络视频)",
tpl:"videomsg"
},m));
}else if(21==v){
var c=m.file_id||"";
e[s%3].append('<div id="appmsg%s"></div>'.sprintf(c)),new n($.extend({
selector:"#appmsg"+c,
id:c,
video_url:m.video_cdn_url,
source:"file",
for_operation:!0,
tpl:"videomsg"
},m));
}else{
var c=m.app_id||"";
e[s%3].append('<div id="appmsg%s"></div>'.sprintf(c)),new o({
container:"#appmsg"+c,
data:m,
showEdit:!0,
type:v
});
}
}
new l({
dom:t.find(".js_tooltip"),
position:{
x:0,
y:-4
}
}),(15==v||21==v)&&t.on("mouseover",".js_tooltip",function(){
$(this).data("tooltip_pop")||(new l({
dom:this,
position:{
x:0,
y:10
}
}),$(this).mouseenter());
}),$(".js_fail_reason").mousemove(function(){
var i=f[$(this).data("seq")];
new d({
dom:this,
content:i.multi_item[0].fail_reason+"如有异议，可查询<a href='http://kf.qq.com/faq/120911VrYVrA150804IjEfyu.html'>FAQ</a>",
hover:!0
});
}),$(".js_fail_code").mousemove(function(){
new d({
dom:this,
content:"转码失败，请删除本素材，重新创建新的视频素材，如有疑问，可查询<a href='http://kf.qq.com/faq/120911VrYVrA150804IjEfyu.html'>FAQ</a>",
hover:!0
});
}),$(".js_declare_fail").mouseover(function(){
var i=$(this).data("reason"),t=$(this).data("ori"),e=$(this).data("vid"),o=$(this).data("name"),n={
1:"该视频时长不足1分钟，暂时不能申请原创视频。",
3:"经识别，视频转载自其他视频平台，不能申请原创视频。",
5:"该视频的清晰度或音频等质量过低，不能申请原创视频。"
},a="";
2==t?a="经识别，视频被%s声明原创，如有异议可<a href='https://mp.weixin.qq.com/cgi-bin/ori_video?action=get_complain_result&vid=%s&lang=%s&token=%s'>申诉</a>".sprintf(o,e,wx.data.lang,wx.data.t):3==t&&(a=n[i]),
new d({
dom:this,
content:a,
hover:!0
});
}),$("#page_title .ask").on("mouseover",function(){
$(".popover").hide(),new d({
dom:this,
content:"你可以在消息管理中将小视频消息保存为素材",
place:"bottom",
margin:"center"
});
}).on("mouseout",function(){
$(".popover").hide();
}),t.on("click",".js_popedit",function(){
var i=$(this),t=i.data("name").toString().trim(),e=i.data("id");
$(".popover").hide();
var o=new d({
dom:this,
content:$("#js_editHtml").html(),
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
var i=this,t=i.$pop.find("input").val().trim(),o=i.$pop.find(".jsPopoverBt").eq(0).btn(!1);
r.appmsg.edit_sv({
id:e,
name:t
},{
suc:function(){
$("#appmsg"+e).find(".title").text(t),i.remove();
},
fail:function(){
o.btn(!0);
}
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
t&&o.$pop.find("input").val(t);
}),t.on("click",".video_extra_info",function(){
var i=f[$(this).data("seq")];
return i.multi_item[0].is_new_video&&0==i.multi_item[0].status?(a.err("视频审核通过后才可播放"),
!1):i.multi_item[0].is_new_video&&3!=i.multi_item[0].status?(a.err("该视频无法播放"),!1):void(1==i.multi_item[0].is_new_video?$("<iframe width='600' height='400' scrolling='no' frameborder='0' src='"+location.protocol+"//v.qq.com/iframe/preview.html?vid="+i.multi_item[0].content+"&auto=0&width=600&height=400'></iframe>").popup({
title:"视频播放",
className:"play_dialog",
onShow:function(){
var i=this;
setTimeout(function(){
i.resetPosition();
},100);
},
onHide:function(){
this.remove();
}
}):""!=i.video_url?(x++,$("<div id='old_video_dialog_"+x+"'></div>").popup({
title:"视频播放",
className:"play_dialog",
onShow:function(){
var t=this,e=$.extend({},i);
e.selector=$("#old_video_dialog_"+x),e.sent=!1,e.tpl="videomsg",e.title="",e.create_time="",
e.from="",e.digest="",e.id=x,new n(e),$(".video_player").css("height","415px"),setTimeout(function(){
t.resetPosition();
},100);
},
onHide:function(){
this.remove();
}
}),$(".wxVideoScreenshot").click()):window.open(i.multi_item[0].content_url,"微视"));
}),t.on("click",".js_del",function(){
var i=$(this),t=i.data("type"),e=i.data("id"),o=i.parents(".Js_videomsg").data("original");
$(".popover").hide();
var n=wx.T($("#js_deleteHtml").html(),{
isquote:i.data("isquote"),
isOriginal:o
});
new d({
dom:this,
content:n,
place:"bottom",
margin:"center",
buttons:[{
text:"删除",
click:function(){
var i=this,o=i.$pop.find(".jsPopoverBt").eq(0).btn(!1);
"sv"==t?r.appmsg.del_sv(e,{
suc:function(){
$("#appmsg"+e).slideUp(function(){
$(this).remove(),i.remove(),location.reload();
});
},
fail:function(){
o.btn(!0);
}
}):r.appmsg.del(e,function(){
a.suc("删除成功"),_.begin+1==_.file_cnt.video_msg_cnt?location.href=wx.url("/cgi-bin/appmsg?begin=%s&count=9&t=media/appmsg_list&type=15&action=list").sprintf(_.begin-_.count):location.reload();
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
}),t.on("click",".js_download",function(){
p.show("温馨提示|视频正在转码中，还不能下载");
});
}();
var y={
10:"app_msg_cnt",
11:"commondity_msg_cnt",
15:"video_msg_cnt",
21:"short_video_cnt"
},q=0;
wx.cgiData.key?(q=wx.cgiData.search_cnt,0==q&&($("#appmsgList").hide(),$(".jsNoData").show())):q=h[y[v]],
function(i){
if($("#query_tips").html(t("query")?"在所有素材":w),0==i&&21==v?$("#page_title").hide():$("#js_listCount").html(i),
$("#page_title").css("zoom",1).css("zoom",""),i>0){
var e=_.count,o=_.begin,n=o/e+1;
new s({
container:".pageNavigator",
perPage:e,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:i,
callback:function(i){
var t=i.currentPage;
if(t!=n){
t--;
var o=21==+v?"filepage":"appmsg";
return location.href=wx.url(wx.cgiData.key?"/cgi-bin/%s?begin=%s&count=%s&t=media/appmsg_list&type=%s&action=list&query=%s".sprintf(o,e*t,e,v,wx.cgiData.key):"/cgi-bin/%s?begin=%s&count=%s&t=media/appmsg_list&type=%s&action=list".sprintf(o,e*t,e,v)),
!1;
}
}
});
}
}(q),e();
});