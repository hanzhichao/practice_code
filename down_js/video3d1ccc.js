define("common/wx/mpEditor/plugin/video.js",["common/wx/popup.js","biz_common/utils/url/parse.js","common/wx/media/videoUtils.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/getVinfo.js","common/wx/media/videoDialog.js","common/wx/Cgi.js","common/wx/mpEditor/plugin/filter.js"],function(t){
"use strict";
function e(t){
var e=27,r=wx.getBanInfo&&wx.getBanInfo(e);
return r&&t&&m.show({
msg:"经用户投诉，你的帐号上传的视频%s，已封禁添加视频能力至%s。".sprintf(r.reason_desc,r.ban_time==r.unlock_time?"永久":i(r.unlock_time)),
buttons:[{
text:"返回",
click:function(){
this.remove();
}
}]
}),r;
}
function i(t){
var e=new Date(1e3*t);
return e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日";
}
function r(t){
if(!t)return f.ratio;
for(var e=[4/3,16/9],i=e[0],r=Math.abs(i-t),o=1,n=e.length;n>o;o++){
var a=Math.abs(e[o]-t);
r>a&&(r=a,i=e[o]);
}
return i;
}
function o(t){
var e=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),r=e.substr(e.indexOf("?")+1).match(i);
return null!=r?r[2]:"";
}
function n(t,e){
var i,r=$(t).find("iframe");
return r.each(function(){
var t=$(this),r=t.attr("src")||t.attr("data-src");
return o("vid",r)==e?(i=t,!1):void 0;
}),i;
}
function a(t,e,i){
return t.find("iframe").each(function(){
var t=$(this),n=d(t),a=t.attr("data-src")||t.attr("src")||"",m=t.attr("data-vidtype");
if(1==n)t.remove();else if(2==n)t.remove();else if(3==n){
var v=o("vid",a);
if(v){
var c=this.attributes;
if(c&&c.length>0){
for(var u=[],h=","+f.attrList.join(",")+",",l=0,w=c.length;w>l;l++)-1==h.indexOf(c[l].name)&&u.push(c[l].name);
for(var l=0,w=u.length;w>l;l++)t.removeAttr(u[l]);
}
t.addClass("video_iframe wx_video_iframe"),t.removeAttr("data-src");
var g=e?s.getPreviewPhoneWidth():i,p=1*t.data("ratio");
p=p?r(p):f.ratio;
var _=Math.round(g/p);
e?t.css({
width:g,
height:_
}):t.removeAttr("style"),e===!0?(t.attr("width",g),t.attr("height","auto"),t.attr("src","https://v.qq.com/iframe/preview.html?vid="+v+"&width="+g+"&height=auto&auto=0")):(t.attr("width",g),
t.attr("height",_),t.attr("src","/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid="+v)),
m||t.attr("data-vidtype","-1");
}else t.remove();
}else t.removeClass("video_iframe");
}),t;
}
function d(t){
var e=$(t),i=e.attr("data-src")||e.attr("src")||"";
return i.indexOf("//mp.weixin.qq.com/mp/getcdnvideourl?")>=0?1:/^http(s)*:\/\/z\.weishi\.com\/weixin\/player\.html/.test(i)?2:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(i)||i.indexOf("/cgi-bin/readtemplate?t=tmpl/video_tmpl")>=0?3:-1;
}
t("common/wx/popup.js");
var s=(t("biz_common/utils/url/parse.js"),t("common/wx/media/videoUtils.js")),m=t("common/wx/dialog.js"),v=t("common/wx/Tips.js"),c=t("common/wx/getVinfo.js"),u=t("common/wx/media/videoDialog.js"),h=(t("common/wx/Cgi.js"),
t("common/wx/mpEditor/plugin/filter.js")),f={
ratio:16/9,
maxLength:3,
attrList:["data-src","class","data-vidtype","allowfullscreen","frameborder","style","height","width","src","data-ratio","data-w","scrolling","data-vh","data-vw"]
},l=(wx.cgiData,function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show());
var e=this;
e.report_vid_type=[],e.can_use_txvideo=t.can_use_txvideo,e.show_share_dialog=t.show_share_dialog;
});
return l.beforeSetContent=function(t){
var e=a($("<div></div>").html(t.html),t.isPreview,t.width);
return e.html();
},l.prototype={
getName:function(){
return"insertvideo";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var i=t.editor,r=this;
if(i){
var o=e(!0);
o||(t.getIframeLen()<f.maxLength?new u({
can_use_txvideo:t.can_use_txvideo,
show_share_dialog:t.show_share_dialog,
scene:"ueditor",
onOK:function(e,o){
return 21==e||(15==e?(o.height=375,o.width=500,o.vid=o.content,o.vidtype=2,o.url="https://v.qq.com/iframe/preview.html?vid="+o.vid+"&width=500&height=375&auto=0",
t.doCommand(r,"insertvideo",o),i.funcPvUvReport("mpvideo")):(0==o.subtype?o.vidtype=1:1==o.subtype?o.vidtype=4:2==o.subtype&&(o.vidtype=5),
t.doCommand(r,"insertvideo",o),i.funcPvUvReport("qqvideo"))),!0;
}
}):v.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频"));
}
};
},
doCommand:function(t,e,i){
console.log("insert video");
var r=t;
i=UE.utils.isArray(i)?i:[i];
for(var o,n=[],a=$(this.editor.getDocument().body).width(),d=Math.round(a/f.ratio),m=0,v=i.length;v>m;m++){
o=i[m];
var c="";
o.vidtype&&(c="data-vidtype='"+o.vidtype+"'"),n.push(s.creatInsertStr({
vid:o.vid,
width:a,
height:d,
attr:c,
editFrame:!0
}));
}
r.execCommand("inserthtml",n.join(""),!0);
},
addListener:function(t){
var i=this;
t.addListener("beforepaste",function(t,r){
var o=i.filterInputData($("<div></div>").html(r.html)),n=o.find("iframe.video_iframe").length;
if(o.find(".img_loading[data-vid]").remove(),n){
var a=e(!0);
if(a)return r.html="",!0;
}
return i.getIframeLen()+n>f.maxLength?(v.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频"),r.html="",
!0):void(r.html=o.html());
}),t.addListener("afterpaste aftersetcontent afterinserthtml",function(e,i,r){
var n=$(r),a=n.filter("iframe.video_iframe").add(n.find("iframe.video_iframe"));
a.each(function(){
var e=$(this);
if(!e.attr("data-ratio")||!e.attr("data-w")){
var i=e.data("src")||e.attr("src")||"";
if(i){
var r=o("vid",i);
r&&!function(t,e){
e.delegateDomAsyn({
dom:t,
timeout:15e3,
requsetFun:function(){
var t=this;
c.getInfoByVid({
vid:r,
onSuccess:function(e){
t.requsetSucFun(e);
},
onError:function(){
t.requsetFailFun();
}
});
},
requsetSucFun:function(t,e){
if(t&&t.newDom){
var i,r;
e&&e.data&&(i=e.data.width||0,r=e.data.height||0),0!=i&&0!=r&&(t.newDom.attr("data-ratio",i/r),
t.newDom.attr("data-w",i));
}
},
requsetFailFun:function(t){
t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w");
}
});
}(e,t,r);
}
}
});
});
},
getIframeLen:function(){
var t=this.editor.getDocument();
return $(t).find("iframe.video_iframe").length;
},
getContainer:function(){
return this.domid;
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),i=e&&"edui-faked-video"==e.className;
return i?1:0;
};
},
initPluginData:function(){
return["video_id","vid_type","shortvideofileid"];
},
getPluginData:function(t){
var e=t.init(this.initPluginData());
if(e.get("content")){
var i=this,r=$("<div></div>"),n=[],a=[],d=[];
return r.html(e.get("content")).find("iframe").each(function(){
var t=$(this),e=i.getTypeByDom(t),r=(t.attr("data-shortvideofileid"),t.attr("src")||t.attr("data-src")||""),d=t.attr("data-vidtype");
if(1==e)t.remove();else if(2==e)t.remove();else if(3==e){
var s=o("vid",r);
s&&(t.attr("data-src","https://v.qq.com/iframe/preview.html?vid="+s+"&width=500&height=375&auto=0"),
t.removeAttr("src"),t.addClass("video_iframe"),t.removeClass("wx_video_iframe"),
t.removeAttr("width"),t.removeAttr("height"),t.removeAttr("data-vh"),t.removeAttr("data-vw"),
h.filterStyleAttr(t,["width","height"]),n.push(s),a.push(d||"-1"));
}else t.removeClass("video_iframe");
}),e.set("content",r.html()),e.set("video_id",n.join(",")),e.set("vid_type",a.join(",")),
e.set("shortvideofileid",d.join("|")),e;
}
},
getTypeByDom:function(t){
return d(t);
},
filterInputData:function(t,e){
var i=$(this.editor.getDocument().body).width();
return a(t,e,i);
},
beforeSetContent:function(t,e){
var i=$(this.editor.getDocument().body).width();
return l.beforeSetContent({
html:t,
isPreview:e,
width:i
});
}
},function(){
top.window.__crossFun||(top.window.__crossFun={});
var t=top.window.__crossFun;
t.__videoFrameClick||(t.__videoFrameClick=function(t){
var e=t.event.target||t.event.srcElement;
if(e){
var i=$(e);
if(i.hasClass("js_play_btn")&&!f.previewVideo){
var o,a;
t.win&&t.win.parent&&t.win.parent.document&&(o=n(t.win.parent.document,t.vid)),o&&o.length>0&&(a=o.attr("data-ratio")),
a=r(a),f.previewVideo=!0,s.showVideoPreviewDialog({
vid:t.vid,
radio:a,
onClose:function(){
f.previewVideo=!1,setTimeout(function(){
window.__editorIframeSelect(t.win);
},0);
}
});
}else!!window.__editorIframeSelect&&window.__editorIframeSelect(t.win);
}
});
}(),l;
});