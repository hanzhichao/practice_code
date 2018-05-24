define("common/wx/media/videoDialog.js",["common/wx/popup.js","page/smallvideo/dialog_select_video.css","widget/media/media_dialog.css","common/wx/media/videoUtils.js","common/wx/getVinfo.js","common/wx/top.js","common/wx/Tips.js","common/wx/media/video.js","common/wx/pagebar.js","common/wx/time.js","media/media_cgi.js","common/wx/Cgi.js","common/wx/tooltips.js","tpl/media/dialog/videomsg_layout.html.js","tpl/media/videocard.html.js"],function(e){
"use strict";
function i(e){
return e&&e.substr&&"04"==e.substr(1,2)?!0:!1;
}
function t(e,i,t,o){
e=e.replace(/^\s+|\s+$/g,""),e=e.replace(/^http:/,"https:"),e=e.replace(/^v\.qq\.com/,"https://v.qq.com");
var n=t||{};
-1!=e.indexOf("http://v.qq.com")||-1!=e.indexOf("https://v.qq.com")||-1!=e.indexOf("v.qq.com")?d(e,i,n,o):/mp\.weixin\.qq\.com\/s/.test(e)?s(e,i):/mp\.weixin\.qq\.com\/mp\/video\?/.test(e)&&a(e,i);
}
function o(e,i){
var i=i||document.location.toString(),t=e+"=",o=i.indexOf(t);
if(-1!=o){
var n=i.indexOf("&",o),d=i.indexOf("?",o);
return-1!=d&&(-1==n||n>d)&&(n=d),d=i.indexOf("#",o),-1!=d&&(-1==n||n>d)&&(n=d),-1==n?i.substring(o+t.length):i.substring(o+t.length,n);
}
return"";
}
function n(e){
e=e||window.location.toString();
var i,t=o("vid",e);
return t||(i=e.match(/\/\w{15}\/(\w+)\.html/))&&(t=i[1]),t||((i=e.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/))?t=i[1]:(i=e.match(/\/(page|play)\/+(\w{11})\.html/))?t=i[2]:(i=e.match(/\/(page)\/(\w+)\.html/))&&(t=i[2])),
t||(i=e.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/))&&(t=i[1]),encodeURIComponent(t);
}
function d(e,i,t,o){
var d,s="",a=t.width,r=t.height;
if(d=e.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)")))s=encodeURIComponent(d[2]),
-1!=s.indexOf("_")&&(s=s.split("_")[0]),/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),
t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);else if((d=e.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html")))||(d=e.match(new RegExp("(http://)?v\\.qq\\.com/prev[^/]*/\\w+/([^/]*)\\.html")))||(d=e.match(/\/(\w{15})\.html/))){
if(d.length>=3)var m=encodeURIComponent(d[2]);else var m=encodeURIComponent(d[1]);
var l="https://data.video.qq.com/fcgi-bin/data?tid=554&appid=20001184&appkey=85a707e3a07cc44d&otype=json&idlist="+m,c=document.getElementsByTagName("head")[0],_=document.createElement("script");
_.type="text/javascript",_.src=l,_.async=!0,void 0!==_.onreadystatechange?_.onreadystatechange=function(){
if("loaded"==_.readyState)try{
s=QZOutputJson.results[0].fields.video_ids[0],-1!=s.indexOf("_")&&(s=s.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);
}catch(o){}
}:_.onload=function(){
try{
s=QZOutputJson.results[0].fields.video_ids[0],-1!=s.indexOf("_")&&(s=s.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);
}catch(o){}
},c.appendChild(_);
}else s=n(e),""!=s?(-1!=s.indexOf("_")&&(s=s.split("_")[0]),/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),
t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t)):!!o&&o(-1);
}
function s(e,i){
f.get({
url:"/cgi-bin/video_mgr?action=get_vid_list&url="+window.encodeURIComponent(e),
success:function(e){
i({
vid:e.vid_list
});
}
});
}
function a(e,i){
var t=e.match(/[\?&]vid\=([^&]*)/);
if(null!=t&&t[1]){
var o=t[1];
i({
vid:o
});
}
}
function r(e,i,t,o){
i.hide();
var n=t[o],d=e.eq(o%2),s=$("<div></div>").appendTo(d);
s.html(wx.T(j,n)),n.err_msg&&s.find(".warn").text(n.err_msg).show();
}
e("common/wx/popup.js"),e("page/smallvideo/dialog_select_video.css"),e("widget/media/media_dialog.css");
var m=e("common/wx/media/videoUtils.js"),l=e("common/wx/getVinfo.js"),c=e("common/wx/top.js"),_=e("common/wx/Tips.js"),v=e("common/wx/media/video.js"),p=e("common/wx/pagebar.js"),h=e("common/wx/time.js"),u=e("media/media_cgi.js"),f=e("common/wx/Cgi.js"),g=e("common/wx/tooltips.js"),w=e("tpl/media/dialog/videomsg_layout.html.js"),j=e("tpl/media/videocard.html.js"),x=15,q=21,b=0,y={};
y[x]="video_msg_cnt",y[q]="short_video_cnt";
var O=function(e,i){
var t=$.extend({},i.multi_item?i.multi_item[0]:i);
t.selector=e,t.id=i.app_id,t.app_id=i.app_id,t.tpl="videomsg",t.for_selection=1!=t.is_new_video?!0:3==t.status,
t.for_transfer=!!t.content,t.hide_transfer=!!t.content,t.video_id=t.content,t.vid=t.video_id,
t.play_length=m.durationStr2Sec(t.duration),t.source="file",1==t.is_new_video?(t.time=i.create_time?h.timeFormat(i.create_time):"",
t.before_original_video=i.create_time<1453914e3?1:0,e.html(wx.T(j,t))):(t.create_time=i.create_time,
t.img_url=i.img_url,new v(t)),$("#wxVideoBox"+t.id).data("opt",t);
},T=function(e){
console.log(e),this.scene=e.scene||"default",this.onOK=e.onOK,this.show_share_dialog=e.show_share_dialog,
this.onHide=e.onHide,this.can_use_txvideo=e.can_use_txvideo,this.allowLinks="ueditor"===e.scene||"masssend"===e.scene,
this.create(),new g({
container:$(".js_look_wording"),
parentClass:"",
position:{
left:-52
},
reposition:!0,
content:"插入文章的视频，在图文群发成功后有可能被“微信看一看”功能等推荐。",
type:"hover"
}),console.log("dialog created");
},C={
create:function(){
var e=this,t=$.parseHTML(wx.T(w,{
scene:e.scene,
token:wx.data.t,
showShareDialog:e.show_share_dialog
}));
e.dialog&&e.dialog.popup("remove"),e.dialog=$(t[0]).popup({
title:"选择视频",
className:"dialog_select_video",
width:960,
onOK:function(){
var t=this,o=e.$dom.find(".js_top.selected").data("id"),n=e.$dom.find(".Js_videomsg.selected").data("opt")||e.$dom.find(".Js_videomsg.selected").parent().data("opt"),d=e.$dom.find(".js_video_url").val();
if(o&&n&&1==n.is_new_video&&3!=n.status)return _.err("该视频目前无法被选择，请选择其它视频"),!0;
if(o&&n&&0==n.is_new_video&&(0!=n.is_new_video||!n.content_url))return _.err("该视频转码未完成，请选择其它视频"),
!0;
if(o){
if(!n)return _.err("请选择视频"),!0;
if(e.onOK&&!e.onOK(o,n))return!0;
t.remove(),e.dialog=null;
}else{
if(o=15,!d)return _.err("请输入视频网址"),!0;
if(!/v\.qq\.com/.test(d.replace("http://","").replace("https://",""))&&!/mp\.weixin\.qq\.com\/s/.test(d)&&!/mp\.weixin\.qq\.com\/mp\/video\?/.test(d))return _.err("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
!0;
var s=e.$dom.find(".js_video_search").find(".Js_videomsg.selected"),a=s.data("vid");
if(!a)return _.err("请选择视频"),!0;
if(0==d.indexOf("http://v.qq.com/")||0==d.indexOf("https://v.qq.com/")){
if(i(a))return _.err("该链接为腾讯微博视频网址，此处引用视频只支持已发布的微信公众号链接、视频详情链接或者腾讯视频链接"),!1;
e.onOK&&e.onOK(o,{
align:"none",
height:375,
width:500,
vid:a,
subtype:0,
url:"https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid="+a,
title:s.data("title"),
duration:s.data("duration"),
play_length:m.durationStr2Sec(s.data("duration")),
cover:s.data("cover"),
video_id:a,
content:a
});
}else e.onOK&&e.onOK(o,{
align:"none",
height:375,
width:500,
vid:a,
subtype:/mp\.weixin\.qq\.com\/mp\/video\?/.test(d)?1:2,
url:"https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid="+a,
title:s.data("title"),
duration:s.data("duration"),
play_length:m.durationStr2Sec(s.data("duration")),
cover:s.data("cover"),
video_id:a,
content:a
}),t.remove(),e.dialog=null;
}
},
onCancel:function(){
"function"==typeof e.onHide&&e.onHide(),this.remove(),e.dialog=null;
},
onHide:function(){
"function"==typeof e.onHide&&e.onHide(),this.remove(),e.dialog=null;
}
}),e.$dom=e.dialog.popup("get"),e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
e.init(),e.dialog.popup("resetPosition");
},
init:function(){
var e=this,i=[];
e.allowLinks&&(i.unshift({
name:"视频链接"
}),e.initVideoUrl(),e.$dom.find(".js_video_search").hide()),"ueditor"==e.scene?b=1:(i.unshift({
name:"素材库",
id:x
}),e.getList(x,0,10)),"ueditor"==e.scene&&1==e.can_use_txvideo?(i.unshift({
name:"素材库",
id:x
}),e.getList(x,0,10)):$(".js_video_status").find(".frm_tips").html("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
e.tab=new c(e.$dom.find(".js_videotab"),i),e.tab.selected(0),e.tab.dom.find("a").on("click",function(e){
e.preventDefault();
}),e.$dom.on("click",".js_top",function(){
var i=$(this).data("id");
e.$dom.find(".js_video_status").hide(),e.$dom.find(".js_video_create").hide(),e.$dom.find(".js_pagebar").empty(),
e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),i?(i==x&&e.$dom.find(".js_video_create").show(),
e.getList(i,0,10)):e.$dom.find(".js_video_search").show(),e.tab.selected($(this).data("index"));
}),e.$dom.on("click",".Js_videomsg",function(){
$(this).data("errmsg")?_.err("无法选择该视频"):(e.$dom.find(".Js_videomsg.selected").removeClass("selected"),
e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),$(this).addClass("selected"));
}),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),e.$dom.on("mousewheel","#js_videomsg_list, #js_video_search_list",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll","#js_videomsg_list, #js_video_search_list",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
});
},
initVideoUrl:function(){
var e=this,i=e.$dom.find(".js_video_loading").hide();
e.$dom.find(".js_video_search").show();
var o=null;
e.$dom.find(".js_video_url").on("input propertychange",function(){
i.show(),e.$dom.find(".js_video_url_tip").hide();
var n=$(this).val(),d=e.$dom.find("#js_video_search_list").find(".inner").empty();
n?(clearTimeout(o),o=setTimeout(function(){
return-1==n.indexOf("v.qq.com/")&&!/mp\.weixin\.qq\.com\/s/.test(n)&&!/mp\.weixin\.qq\.com\/mp\/video\?/.test(n)||-1!=n.indexOf("v.qq.com/")&&/(.+)\.v\.qq\.com/.test(n)?(i.hide(),
e.$dom.find(".js_video_url_tip").show(),!0):void clearTimeout(o);
},1e3),i.show(),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),t(n,function(t){
var o=t.vid,n={
title:"",
cover:"",
duration:"",
for_operation:!1,
for_selection:!0,
for_transfer:!0,
hide_transfer:!0,
is_new_video:!0,
video_ori_status:4,
status:3,
source:"file"
};
if("string"==typeof o&&(o=[o]),!o||0==o.length)return _.err("查无视频"),i.hide(),!0;
for(var s=0,a=[],c=0;c<o.length;c++)!function(t){
l.getInfoByVid({
vid:o[t],
onSuccess:function(l){
s++,a.push($.extend({},n,{
id:s,
title:l.data.title,
play_length:l.data.time,
duration:m.changeTime(l.data.time),
cover:l.data.p16_9,
video_id:o[t],
err_msg:l.err_msg
})),80==l.ret_code&&1==l.oriData.exem&&(a[a.length-1].err_msg=""),r(d,i,a,a.length-1),
1===o.length&&d.find(".Js_videomsg").eq(0).trigger("click"),e.dialog.popup("resetPosition");
},
onError:function(){
s++,wx.jslog({
src:"common/wx/media/videoDialog.js"
},null,52),s==o.length&&0==a.length&&(_.err("获取视频失败，请重试"),i.hide());
}
});
}(c);
},null,function(){
i.hide(),_.err("该网址存在错误，请填写正确的腾讯视频网址");
})):(i.hide(),e.$dom.find("#js_video_search_list").find(".inner").empty(),e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"));
});
},
initPagebar:function(e,i,t){
var o=this,n=e/i+1;
return i>=t?void o.$dom.find(".js_pagebar").hide():void new p({
container:o.$dom.find(".js_pagebar").show(),
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:t,
callback:function(t){
var d=t.currentPage,s=o.$dom.find(".js_top.selected").data("id");
d!=n&&s&&(e=i*--d,o.getList(s,e,i));
}
});
},
getList:function(e,i,t){
var o=this,n=e==x?u.appmsg:u;
o.$dom.find(".js_video_content").hide(),o.$dom.find(".js_video_loading").show(),
n.getList(e,i,t,function(n){
if(o.dialog&&e==o.$dom.find(".js_top.selected").data("id")){
var d=n.file_item||n.item,s=o.$dom.find("#js_videomsg_list").find(".inner").empty();
d.length?(d.each(function(e,i){
var t=s.eq(i%2),o=$('<div id="appmsg%s"></div>'.sprintf(e.app_id||e.file_id),t).appendTo(t);
O(o,e);
}),o.$dom.find(".js_video_content").show(),o.dialog.popup("resetPosition")):o.$dom.find(".js_video_none").show().find(".js_empty_tips").html(e==q?"暂无素材<br />（素材来源：通过微信用户上传给公众帐号）":"暂无素材"),
o.$dom.find(".js_video_loading").hide(),o.initPagebar(i,t,n.file_cnt[y[e]]||n.file_cnt.video_cnt);
}
},"",b);
}
};
return $.extend(T.prototype,C),T;
});