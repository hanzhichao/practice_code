define("media/template_common.js",["media/common.js","common/wx/Cgi.js","common/wx/time.js","tpl/media/appmsg_tmpl.html.js","common/wx/mpEditor/utils.js","common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/plugin/video.js"],function(e){
"use strict";
function t(e,t){
var o=t.canSelect===!1?!1:!0,n=t.canPreview===!1?!1:!0,i=t.showUpdateTime===!1?!1:!0,m=t.showEdit===!1?!1:!0,a=t.showEdit===!0?!0:!1,p=t.token||"";
!p&&window.wx&&window.wx.data&&window.wx.data.t&&(p=window.wx.data.t);
for(var u=0,g=e.length;g>u;u++){
var w=e[u];
w.token=p,w.canSelect=o,w.canPreview=n,w.showUpdateTime=i,w.showEdit=m,w.highLine=a,
w.update_time&&(w.update_time_str=r.timeFormat(w.update_time)),w.title_encode=w.title,
w.title_encode=a?w.title_encode.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__").html(!0).replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>"):w.title_encode.html(!0);
for(var _ in d)d.hasOwnProperty(_)&&("Video"==_?w.content=d[_].beforeSetContent({
isPreview:!1,
html:w.content,
width:l
}):"Ad"==_?w.content=d[_].beforeSetContent({
html:w.content,
can_see_ad:!1
}):"function"==typeof d[_].beforeSetContent&&(w.content=d[_].beforeSetContent({
html:w.content
})));
w.iframeHtml=function(e,t){
return c.createLocalIframe({
$dom:$(document.body),
onIframeReadyFunc:function(o){
o.doc.body.innerHTML=e[t].content;
}
});
}(e,u),w.contentHtml=template.compile(s)(w);
}
return e;
}
function o(e){
var t="";
t="undefined"!=typeof e.postData.appmsgid?"update":"create",p.post({
url:"/cgi-bin/appmsgtemplate?action="+t,
data:e.postData
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)return void e.onSuccess(t);
var o;
if(t&&t.base_resp){
var n=a.articleRetCode(t);
o=n.errmsg||"系统繁忙，请稍后再试";
}else o="系统繁忙，请稍后再试";
e.onError(o,t||{});
},
fail:function(t){
e.onError("系统繁忙，请稍后再试",t||{});
}
});
}
function n(e){
var t=e.page||0,o=e.perPage||6;
p.post({
url:"/cgi-bin/appmsgtemplate?action=list",
data:{
begin:t*o,
count:o
},
mask:!1
},{
done:function(o){
if(o&&o.base_resp&&0==o.base_resp.ret)e.callback({
code:0,
list:o.appmsg_template||[],
total:1*o.total,
page:t
});else{
var n="";
o&&o.base_resp&&200013==o.base_resp.ret&&(n="操作太频繁，请稍后再试"),e.callback({
code:-1,
msg:n
});
}
},
fail:function(){
e.callback({
code:-1
});
}
});
}
function i(e){
p.post({
url:"/cgi-bin/appmsgtemplate?action=delete",
data:{
appmsgid:e.id
},
mask:!1
},{
done:function(t){
t&&t.base_resp&&0==t.base_resp.ret?e.onSuccess():e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
},
fail:function(t){
e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
}
});
}
function m(e){
p.post({
url:"/cgi-bin/appmsgtemplate?action=preview",
data:e.postData,
mask:!1
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)e.onSuccess(t);else{
var o=a.articleRetCode(t);
t.word=o.errmsg,t.antispam=o.index,e.onError(t);
}
},
fail:function(){
e.onError({
word:"系统繁忙，请稍后再试"
});
}
});
}
var a=e("media/common.js"),p=e("common/wx/Cgi.js"),r=e("common/wx/time.js"),s=e("tpl/media/appmsg_tmpl.html.js"),c=e("common/wx/mpEditor/utils.js"),d={
Vote:e("common/wx/mpEditor/plugin/vote.js"),
Card:e("common/wx/mpEditor/plugin/card.js"),
Emotion:e("common/wx/mpEditor/plugin/emotion.js"),
MyLink:e("common/wx/mpEditor/plugin/link.js"),
Unlink:e("common/wx/mpEditor/plugin/unlink.js"),
AudioMusicPlugin:e("common/wx/mpEditor/plugin/audio_music.js"),
WeappPlugin:e("common/wx/mpEditor/plugin/weapp.js"),
Img:e("common/wx/mpEditor/plugin/img.js"),
Ad:e("common/wx/mpEditor/plugin/adv.js"),
Video:e("common/wx/mpEditor/plugin/video.js")
},l=400,u=20;
return{
formatTemplateData:t,
maxTemplateNum:u,
handleTemplate:o,
getTemplateList:n,
delTemplateList:i,
preview:m
};
});