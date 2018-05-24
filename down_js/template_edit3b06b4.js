define("media/template_edit.js",["biz_web/ui/jquery.scrollbar.js","common/wx/media/previewDialog.js","common/wx/dialog.js","media/common.js","media/template_common.js","tpl/mpEditor/templateLayout.html.js","common/qq/Class.js","common/wx/inputCounter.js","common/wx/Tips.js","common/wx/preview.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/editor.js","tpl/media/appmsg_edit/template_article.html.js","media/report.js","biz_common/utils/wxgspeedsdk.js"],function(t){
"use strict";
t("biz_web/ui/jquery.scrollbar.js");
var i=t("common/wx/media/previewDialog.js"),e=t("common/wx/dialog.js"),n=t("media/common.js"),o=t("media/template_common.js"),a=t("tpl/mpEditor/templateLayout.html.js"),r=t("common/qq/Class.js"),s=t("common/wx/inputCounter.js"),c=t("common/wx/Tips.js"),d=(t("common/wx/preview.js"),
t("common/wx/ban.js")),m=(t("common/wx/Cgi.js"),t("common/wx/mpEditor/plugin/vote.js")),l=t("common/wx/mpEditor/plugin/card.js"),u=t("common/wx/mpEditor/plugin/link.js"),p=t("common/wx/mpEditor/plugin/unlink.js"),h=t("common/wx/mpEditor/plugin/emotion.js"),_=t("common/wx/mpEditor/plugin/audio_music.js"),g=t("common/wx/mpEditor/plugin/weapp.js"),w=t("common/wx/mpEditor/plugin/img.js"),f=t("common/wx/mpEditor/plugin/video.js"),j=t("common/wx/mpEditor/plugin/insert_product.js"),v=t("common/wx/mpEditor/plugin/adv.js"),x=t("common/wx/mpEditor/editor.js"),b=t("tpl/media/appmsg_edit/template_article.html.js"),E=t("media/report.js"),y=wx.cgiData,D=document.referrer;
!function(t){
t.fn.placeholder2=function(){
if(!("placeholder"in document.createElement("input"))){
var i=t(this).siblings(".tips_global");
t(this).on("focus",function(){
i.hide();
}).on("blur",function(){
""===this.value?i.show():i.hide();
}).trigger("blur");
}
},t.extend(t.easing,{
easeOutCubic:function(t,i,e,n,o){
return n*((i=i/o-1)*i*i+1)+e;
}
});
}(jQuery);
var k=(Math.random(),r.declare({
init:function(t){
var i=this;
i.opt=t,this._g={
dom:{}
},$.extend(!0,i,t),i.$editor=$(i.editor_selector).html(wx.T(b,{})),i._initData(),
i._initUEditor(),$(".js_scrollbar").scrollbar({
autoUpdate:!1
});
},
_initData:function(){
this.title=this.title.html(!1),this.content=this.content.html(!1),this.lastData=null;
},
_initDataAfterEditorRender:function(){
this.lastData=this.getData();
},
_initEditArea:function(){
var t=this,i=this._g.dom,e=t.$editor;
e.find(".js_field").each(function(){
{
var t=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
e.find(".js_%s_error".sprintf(t)).hide();
});
}),i.$title=e.find(".js_title"),i.$title.on("keyup",function(){
$.trim($(this).val()).html(!0);
e.find(".js_title_error").hide();
}).on("focus",function(){
t.editor.fireEvent("title_focus"),t.editor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).placeholder2(),i.$title.val(t.title),e.find(".js_counter").each(function(){
$(this).hasClass("js_author")||$(this).hasClass("js_reward_wording")?new s(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):new s(this,{
maxLength:$(this).attr("max-length")
});
});
},
_initUEditor:function(){
var t=this,i=[],e=["undo","redo","|","fontsize","|","blockquote","horizontal","|","removeformat","formatmatch","|","link","unlink","mpemotion"],n=["bold","italic","underline","forecolor","backcolor","|","indent","|","justifyleft","justifycenter","justifyright","justifyjustify","justifyindent","|","rowspacingtop","rowspacingbottom","lineheight","letterspacing","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"];
i.push(new w({
container:"#js_editor_insertimage"
})),i.push(new f({
container:"#js_editor_insertvideo",
can_use_txvideo:wx.cgiData.can_use_txvideo
})),i.push(new m({
container:wx.cgiData.can_use_vote?"#js_editor_insertvote":"",
can_use_vote:wx.cgiData.can_use_vote
})),i.push(new l({
container:wx.cgiData.can_use_card?"#js_editor_insertcard":"",
biz_uin:y.biz_uin,
can_use_card:wx.cgiData.can_use_card
})),i.push(new v({
has_ad:!1,
can_see_ad:!1
})),i.push(new _({
container:wx.cgiData.can_use_voice||wx.cgiData.qqmusic_flag?"#audio_music_plugin_btn":"",
allowAudio:wx.cgiData.can_use_voice,
allowMusic:wx.cgiData.qqmusic_flag
})),i.push(new g({
container:wx.cgiData.can_use_weapp_card?"#js_editor_insertweapp":"",
can_use_weapp_card:wx.cgiData.can_use_weapp_card
})),i.push(new u({
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url
})),i.push(new p),i.push(new h),i.push(new j({
clearProduct:!0
}));
var o=t.editor=new x({
layout:a,
plugins:i,
autoHeightEnabled:!0,
topOffset:53,
toolbars:[e,n]
});
o.render("js_editor"),o.addListener("catchremotesuccess",function(i,e,n,o){
e&&t.updateRemoteImg({
remoteType:"success",
uid:e.uid,
format:o,
img_url:n
}),t.showCatchError();
}),o.addListener("catchremoteerror",function(i,e){
e&&t.updateRemoteImg({
remoteType:"error",
uid:e.uid,
img_url:e.defaultRemoteImg
}),t.showCatchError();
}),o.addListener("scrollIntoView",function(t,i,e){
setTimeout(function(){
$("html, body").animate({
scrollTop:$(i).offset().top-(e||50)
});
},100);
}),o.addListener("showErrMsg",function(t,i,e){
$(i).show().find(".js_msg_content").text(e);
}),o.addListener("hideErrMsg",function(t,i){
$(i).hide().find(".js_msg_content").text("");
}),o.addListener("hideAllErrMsg",function(){
t.$editor.find(".js_error_msg").hide();
}),o.addListener("key aftersetcontent",function(){
t.showCatchError();
}),o.addListener("heightChanged",function(){
$(window).trigger("scroll",!1);
}),o.addListener("focus",function(){
o.enableToolbar();
}),o.ready(function(){
if(t._initEditArea(),t.content)try{
this.setContent(t.content);
}catch(i){}
t._initDataAfterEditorRender(),t._bindEvent();
});
},
updateRemoteImg:function(t){
var i=$(this.editor.getDocument()).find("[data-remoteid="+t.uid+"]");
n.changeRemoteImgUrl({
imgDom:i,
remoteType:t.remoteType,
format:t.format,
img_url:t.img_url,
editor:this.editor
});
},
_preview:function(){
var t=this,e=t.getPostData();
new i({
appmsgid:e.appmsgid,
type:1,
hasConfirmed:!1,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name
});
},
showCatchError:function(){
var t=this.editor,i=$(t.getDocument()).find(".js_catchremoteimageerror").length;
if(0==i)t.fireEvent("hideErrMsg",".js_content_error");else{
var e="有%s张图片粘贴失败".sprintf(i);
t.fireEvent("showErrMsg",".js_content_error",e);
}
},
_updateCurUrl:function(){
var t=this.app_id;
if(t){
var i=0;
wx.cgiData.app_id||(i=1),wx.cgiData.app_id=t;
var e="/cgi-bin/appmsgtemplate?action=edit&appmsgid=%s";
window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url(e.sprintf(t))):1==i&&(location.href=wx.url(e.sprintf(t)));
var n=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=list");
D.match(n)&&window.opener&&opener.location&&(opener.location=D);
}
},
getData:function(){
var t=this._g.dom.$title.val(),i=this.editor.getEditorData();
return{
content:i.content||"",
title:t||""
};
},
getPostData:function(){
this.editor.fireEvent("hideAllErrMsg");
var t,i=this._g.dom,e=!0,o=null,a="",r=$(this.editor.getDocument()).find(".js_catchremoteimageerror").length;
if(r&&(e=!1,o=o||".js_content_error",a=a||"有%s张图片粘贴失败".sprintf(r)),e===!0){
var s=i.$title.val();
t=n.validate({
key:"title",
label:"名称",
content:s,
strict:!0
}),t&&t.msg&&(e=!1,o=o||".js_title_error",a=a||t.msg);
}
if(e===!0){
var c=this.editor.getEditorData();
t=n.validate({
key:"templateContent",
content:c.content,
strict:!1,
editor:this.editor
}),t&&t.msg&&(4==t.errType?e=null:(e=!1,o=o||".js_content_error",a=a||t.msg));
}
if(!e)return o&&(a&&this.editor.fireEvent("showErrMsg",o,a),this.editor.fireEvent("scrollIntoView",o,150)),
null;
var d={
content:c.content,
title:s
};
return this.app_id&&(d.appmsgid=this.app_id),d;
},
saveTemplate:function(t){
var i=this,e=this;
if(!e.submiting){
var a=i.getPostData();
a&&(e.submiting=!0,t.$btn.btn(!1),n.waitAsynAction({
editor:this.editor,
callback:function(){
var n=i.getPostData();
return n?void o.handleTemplate({
postData:n,
onError:function(i){
e.submiting=!1,t.$btn.btn(!0),c.err(i);
},
onSuccess:function(n){
e.submiting=!1,t.$btn.btn(!0),i.app_id||(i.app_id=n.appmsgid),i.update(n.filter_content),
i.lastData=i.getData(),t.callback(n);
}
}):(e.submiting=!1,void t.$btn.btn(!0));
}
}));
}
},
update:function(t){
if(t){
var i=t;
try{
this.editor.setContent(i);
}catch(e){}
}
},
_bindEvent:function(){
var t=this;
t.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),$("#js_submit").on("click",function(){
var i=$(this);
t.saveTemplate({
$btn:i,
callback:function(){
i.btn(!0),c.remove(),$("#js_save_success").show().delay(2e3).fadeOut(300),t._updateCurUrl();
}
});
}),$("#js_preview").on("click",function(){
if(d(y.func_ban_info,"preview")){
var i=$(this);
t.saveTemplate({
$btn:i,
callback:function(){
i.btn(!0),c.remove(),t._updateCurUrl(),t._preview();
}
});
}
}),$("body").on("click","a",function(i){
var o=$(this).attr("href"),a=$(this).attr("target");
if("_blank"!==a&&"string"==typeof o&&0!==o.indexOf("javascript:")&&0!==o.indexOf("#")){
var r=t.getData();
if(!n.eq(r,t.lastData)){
i.preventDefault();
var s=t.app_id?"是否保存此次修改？":"是否保存当前图文模版内容？";
e.show({
type:"info",
msg:s,
buttons:[{
text:"保存",
click:function(){
t.saveTemplate({
$btn:$("#js_submit"),
callback:function(){
window.onbeforeunload=null,c.remove(),$("#js_save_success").show(),location.href=o;
}
}),this.remove();
}
},{
text:"不保存",
type:"normal",
click:function(){
window.onbeforeunload=null,location.href=o,this.remove();
}
}]
});
}
}
}),window.onbeforeunload=function(i){
var e=t.getData(),o="--------------------------------------------\n如果离开此页面，当前页面数据将丢失！\n--------------------------------------------";
if(!n.eq(e,t.lastData)){
try{
i.returnValue=o;
}catch(i){}
return o;
}
};
var i,o,a=$(".js_main_bd"),r=$(".js_aside"),s=$(".tool_area"),m=$(".js_main_title").offset().top,l=$(".js_main_title").height(),u=$("body"),p="edit_fixed";
$(window).on("scroll",function(){
o&&(clearTimeout(o),o=null);
var e=$(window).scrollTop(),n=a.offset().top,c=a.height(),d=$(window).height(),h=Math.min(c-e+n-l,d-l);
e>m?(u.addClass(p),r.height(h).find(".js_scrollbar").css("max-height",h)):(u.removeClass(p),
r.height(c)),d-h-l<=s.height()?$("body").removeClass("toolbar_unfixed"):$("body").addClass("toolbar_unfixed"),
arguments[1]!==!1&&(!!i&&window.clearTimeout(i),i=window.setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:"hidden"
}),setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:""
});
},0);
},200)),o=setTimeout(function(){
t.editor&&t.editor.fireEvent("toolbar_fixed_change");
},100),setTimeout(function(){
$(".js_scrollbar").scrollbar.updateScrollbars(!0);
});
}).trigger("scroll",!1),$.support.leadingWhitespace&&setInterval(function(){
$(window).trigger("scroll",!1);
},1e3);
var h=$(window).width();
1200>h&&$("#body").width(h).css("margin-left","0"),$(window).on("resize",function(){
var t=$(window).width();
1200>t?$("#body").width(t).css({
"margin-left":"0",
"margin-right":"0"
}).find(".js_main_title").width(t-2):$("#body").width(1200).css({
"margin-left":"auto",
"margin-right":"auto"
}).find(".js_main_title").width(1198),$(window).trigger("scroll",!1);
}),$(window).on("unload",function(){
E.setData(1),E.send(1);
});
}
})),C=(new k({
title:y.title,
content:$("#content_tpl").html(),
app_id:y.app_id,
editor_selector:"#js_appmsg_editor"
}),t("biz_common/utils/wxgspeedsdk.js"));
C.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:34
}),C.send();
});