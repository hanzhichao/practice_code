define("common/wx/mpEditor/plugin/weapp.js",["common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/media/weappDialog.js","tpl/mpEditor/plugin/link_popup.html.js","common/wx/mpEditor/plugin/img.js"],function(a){
"use strict";
function t(a,t){
var r={};
for(var i in t)r[i]=encodeURIComponent(t[i]);
return a.replace(/\{(.+?)\}/g,function(a,t){
return r[t]||t;
});
}
function r(a,t){
var r=t;
for(var i in t)r[i]=(t[i]||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
return a.format(r);
}
function i(a){
var r=$("<div>"+a+"</div>");
return r.find("mp-miniprogram,mp-weapp").replaceWith(function(){
var a=$(this),r=a.attr("data-miniprogram-appid")||a.attr("data-weapp-appid")||"",i=a.attr("data-miniprogram-title")||a.attr("data-weapp-title")||"",e=a.attr("data-miniprogram-imageUrl")||a.attr("data-weapp-imageUrl")||"",n=a.attr("data-miniprogram-nickname")||a.attr("data-weapp-nickname")||"",p=a.attr("data-miniprogram-avatar")||a.attr("data-weapp-avatar")||"",m=a.attr("data-miniprogram-path")||a.attr("data-weapp-path")||"";
return $('<iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0">').attr("src",t("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",{
nickname:n,
avatar:p,
title:i,
imageUrl:e
})).attr("data-miniprogram-appid",r).attr("data-miniprogram-path",m).attr("data-miniprogram-nickname",n).attr("data-miniprogram-avatar",p).attr("data-miniprogram-title",i).attr("data-miniprogram-imageUrl",e);
}),r.find("a.weapp_text_link,a.weapp_image_link").each(function(){
$(this).attr("href",""),$(this).attr("_href","");
}),r.find("span.js_weapp_display_element").remove(),r.html();
}
function e(a){
var t=$("<div>"+a+"</div>");
return t.find("iframe.js_editor_weapp").replaceWith(function(){
var a=$(this),t=a.attr("data-miniprogram-appid"),r=a.attr("data-miniprogram-title"),i=a.attr("data-miniprogram-imageUrl"),e=a.attr("data-miniprogram-nickname"),n=a.attr("data-miniprogram-avatar"),p=a.attr("data-miniprogram-path");
return $("<mp-miniprogram>").attr("class","miniprogram_element").attr("data-miniprogram-appid",t).attr("data-miniprogram-path",p).attr("data-miniprogram-nickname",e).attr("data-miniprogram-avatar",n).attr("data-miniprogram-title",r).attr("data-miniprogram-imageUrl",i);
}),t.html();
}
function n(a){
this.__o={
container:""
},this.editor=null,this.__init(a||{}),a&&a.container&&$(a.container).show(),this.can_use_weapp_card=a.can_use_weapp_card||!1;
}
a("common/wx/popup.js"),a("biz_web/ui/checkbox.js"),a("common/wx/popup.js");
var p=a("common/wx/media/weappDialog.js"),m=a("tpl/mpEditor/plugin/link_popup.html.js"),o=a("common/wx/mpEditor/plugin/img.js");
return n.beforeSetContent=function(a){
if(!a.html)return"";
var t=i(a.html);
return t;
},n.prototype={
getName:function(){
return"insertweapp";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var a=this;
return function(t,r){
var i=a.editor.queryCommandValue("insertweapp"),e={};
if(i){
{
i.getAttribute("data-miniprogram-appid");
}
e={
content:i.innerText,
main_page:i.getAttribute("data-miniprogram-path"),
nick_name:i.getAttribute("data-miniprogram-nickname"),
appid:i.getAttribute("data-miniprogram-appid"),
image:$(i).find("img").attr("src"),
step:r||1
};
}
p.show(e,function(t,i,e){
t&&a.__insert(i,e,4==r);
});
};
},
getContainer:function(){
return this.__o.container;
},
getQueryCommandValue:function(){
var a=this;
return function(){
var t=a.editor;
if(t){
var r,i=t.getSelectionRange(),e=t.getDomUtils();
if(!i.collapsed){
i.shrinkBoundary();
var n=3!=i.startContainer.nodeType&&i.startContainer.childNodes[i.startOffset]?i.startContainer.childNodes[i.startOffset]:i.startContainer,p=3==i.endContainer.nodeType||0==i.endOffset?i.endContainer:i.endContainer.childNodes[i.endOffset-1],m=i.getCommonAncestor();
if(r=e.findParentByTagName(m,"a",!0),!r&&1==m.nodeType)for(var o,d,c,g=m.getElementsByTagName("a"),l=0;c=g[l++];)if(o=e.getPosition(c,n),
d=e.getPosition(c,p),(o&e.POSITION_FOLLOWING||o&e.POSITION_CONTAINS)&&(d&e.POSITION_PRECEDING||d&e.POSITION_CONTAINS)){
r=c;
break;
}
return r;
}
return r=i.startContainer,r=1==r.nodeType?r:r.parentNode,r&&(r=e.findParentByTagName(r,"a",!0))&&!e.isInNodeEndBoundary(i,r)?r:void 0;
}
};
},
addListener:function(a){
a.addListener("beforepaste",function(a,t){
t.html=i(t.html);
}),a.addListener("handle_common_popup",function(t,r){
var i=a.queryCommandValue("insertweapp");
if(i&&-1==(i.href||"").indexOf("javascript:")){
if(!i.getAttribute("data-miniprogram-appid"))return;
var e=i.getAttribute("data-miniprogram-nickname")||"";
e.length>30&&(e=e.substring(0,20)+"..."),r.html+=wx.T(m,{
needBreak:r.html?!0:!1,
url:"javascript:;",
txt:e,
isWeapp:!0
}),r.node=i;
}
});
},
beforeSetContent:function(a){
return n.beforeSetContent({
html:a
});
},
getPluginData:function(a){
var t=a.init(),r=t.get("content");
return r?(r=e(r),t.set("content",r),t):void 0;
},
__init:function(a){
var t=this.__o;
for(var r in a)Object.prototype.hasOwnProperty.call(t,r)&&(t[r]=a[r]);
},
__insert:function(a,i,e){
console.log(a,i);
var n=i.type,p="",m={
appid:a.appid,
nickname:a.nick_name,
avatar:a.pic_url,
title:i.title,
imageUrl:i.imageUrl,
path:i.path,
content:i.content
};
if(m.src=t("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",m),
"card"==n)p='<p><iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0" src="{src}" data-miniprogram-appid="{appid}" data-miniprogram-nickname="{nickname}" data-miniprogram-title="{title}" data-miniprogram-imageUrl="{imageUrl}" data-miniprogram-avatar="{avatar}" data-miniprogram-path="{path}"></iframe></p>';else if("text"==n){
if(p='<a class="weapp_text_link" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="">{content}</a>',
e){
var d=this.editor.queryCommandValue("insertweapp");
if(d)return void $(d).replaceWith(function(){
return $(r(p,m));
});
}
}else"image"==n&&(p=o.formatHTML({
src:i.image,
_src:i.image
}).join(""),p=$(p).find("img").get(0).outerHTML,p='<p><a class="weapp_image_link" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="">'+p+"</a></p>");
p=r(p,m);
var c=this.editor,g=c.execCommand("inserthtml",p,!0);
console.log("execCommand",g);
}
},n;
});