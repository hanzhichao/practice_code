define("common/wx/media/templateDialog.js",["common/wx/popup.js","common/wx/inputCounter.js","media/common.js","media/template_common.js","common/wx/Tips.js","tpl/media/templateDialog.html.js","tpl/mpEditor/templateDialogLayout.html.js","common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/editor.js"],function(t){
"use strict";
function e(t){
this._o={
token:"",
formatContent:!0,
can_use_txvideo:!1,
can_use_hyperlink:!1,
can_use_appmsg_outer_url:!1,
can_use_vote:!1,
can_use_card:!1,
biz_uin:"",
can_use_voice:!1,
qqmusic_flag:!1,
can_use_weapp_card:!1,
content:"",
onSuccess:function(){}
},this._g={
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var o=t("common/wx/inputCounter.js"),i=t("media/common.js"),n=t("media/template_common.js"),s=t("common/wx/Tips.js"),a=t("tpl/media/templateDialog.html.js"),r=t("tpl/mpEditor/templateDialogLayout.html.js"),c=t("common/wx/mpEditor/plugin/vote.js"),m=t("common/wx/mpEditor/plugin/card.js"),l=t("common/wx/mpEditor/plugin/emotion.js"),d=t("common/wx/mpEditor/plugin/link.js"),u=t("common/wx/mpEditor/plugin/unlink.js"),_=t("common/wx/mpEditor/plugin/audio_music.js"),p=t("common/wx/mpEditor/plugin/weapp.js"),g=t("common/wx/mpEditor/plugin/img.js"),h=t("common/wx/mpEditor/plugin/video.js"),f=t("common/wx/mpEditor/plugin/insert_product.js"),w=t("common/wx/mpEditor/plugin/adv.js"),j=t("common/wx/mpEditor/editor.js");
return e.prototype={
_extend:function(t){
for(var e in t)this._o[e]=t[e];
},
initDialog:function(){
var t=this,e=this._o,o=this._g,i=o.dom;
document.body.style.overflow=document.documentElement.style.overflow="hidden",i.$dialog=$(wx.T(a,{
token:e.token||""
})).popup({
width:865,
title:"添加图文模版",
autoShow:!0,
className:"align_edge appmsg_tmpl_edit_dialog",
buttons:[{
text:"保存",
type:"primary",
classWrap:"js_save_btn",
click:function(){
var o=this;
t.saveTemplate({
callback:function(){
"function"==typeof e.onSuccess&&e.onSuccess(),t.destory(o);
}
});
}
},{
text:"取消",
type:"default",
classWrap:"js_cancel_btn",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),i.$js_editor=i.$dialog.find(".js_editor"),i.$js_title_fail=i.$dialog.find(".js_title_fail"),
i.$js_content_fail=i.$dialog.find(".js_content_fail"),i.$title=i.$dialog.find(".js_title"),
i.$saveBtn=i.$dialog.find(".js_save_btn"),i.$cancelBtn=i.$dialog.find(".js_cancel_btn"),
this.initTitle(),this.createEditor();
},
initTitle:function(){
new o(this._g.dom.$title,{
maxLength:64
});
},
getPostData:function(){
this.hideAllErrMsg();
var t=this._g.dom,e=$(this.editor.getDocument()).find(".js_catchremoteimageerror").length;
if(e)return this.showCatchError(),null;
var o=this._g.dom.$title.val(),n=i.validate({
key:"title",
label:"名称",
content:o,
strict:!0
});
if(n&&n.msg)return t.$js_title_fail.text(n.msg).show(),null;
var s=this.editor.getEditorData();
if(n=i.validate({
key:"templateContent",
content:s.content,
strict:!1,
editor:this.editor
}),n&&n.msg)return 4==n.errType||t.$js_content_fail.text(n.msg).show(),null;
var a={
content:s.content,
title:o
};
return a;
},
saveTemplate:function(t){
var e=this,o=this,a=this._g.dom;
if(!o.submiting){
var r=e.getPostData();
r&&(o.submiting=!0,a.$saveBtn.btn(!1),i.waitAsynAction({
editor:this.editor,
callback:function(){
if(e.checkDialogAlive()){
var i=e.getPostData();
return i?void n.handleTemplate({
action:"create",
postData:i,
onError:function(t){
e.checkDialogAlive()&&(o.submiting=!1,a.$saveBtn.btn(!0),s.err(t));
},
onSuccess:function(){
e.checkDialogAlive()&&(o.submiting=!1,a.$saveBtn.btn(!0),s.suc("保存成功"),t.callback());
}
}):(o.submiting=!1,void a.$saveBtn.btn(!0));
}
}
}));
}
},
checkDialogAlive:function(){
var t=this._g.dom;
return t&&t.$dialog?!0:!1;
},
createEditor:function(){
var t=this,e=this._o,o=this._g.dom,i=[new g,new h({
can_use_txvideo:e.can_use_txvideo
}),new d({
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
}),new u,new l,new c({
can_use_vote:e.can_use_vote
}),new m({
biz_uin:e.biz_uin,
can_use_card:e.can_use_card
}),new w({
can_see_ad:!1,
has_ad:0
}),new _({
allowAudio:e.can_use_voice,
allowMusic:e.qqmusic_flag
}),new p({
can_use_weapp_card:e.can_use_weapp_card
}),new f({
clearProduct:!0
})],n=t.editor=new j({
needPopup:!1,
imgScale:!1,
canChangeIframeHeight:!1,
scaleimgWheelScroll:!0,
cropimgWheelScroll:!0,
iframeCssUrl:wx.EditorRes.template_iframe,
layout:r,
plugins:i,
autoHeightEnabled:!0,
autoFloatEnabled:!1,
toolbars:[],
focus:!0
});
n.render(o.$js_editor[0]),n.addListener("catchremotesuccess",function(e,o,i,n){
o&&t.updateRemoteImg({
remoteType:"success",
uid:o.uid,
format:n,
img_url:i
}),t.showCatchError();
}),n.addListener("catchremoteerror",function(e,i,n){
i&&t.updateRemoteImg({
remoteType:"error",
uid:i.uid,
img_url:i.defaultRemoteImg
}),n?o.$js_content_fail.text(n).show():t.showCatchError();
}),n.addListener("hideAllErrMsg",function(){
t.hideAllErrMsg();
}),n.addListener("aftersetcontent",function(){
t.showCatchError();
}),n.addListener("keyup",function(){
o.$js_content_fail.hide();
}),n.addListener("before_show_img_replace_dialog",function(){
n.hasDestory||(n.fireEvent("handleWinScroll",!1),o.$saveBtn.hide(),o.$cancelBtn.hide());
}),n.addListener("after_close_show_img_replace_dialog",function(){
n.hasDestory||(n.fireEvent("handleWinScroll",!1),o.$saveBtn.show(),o.$cancelBtn.show());
}),n.ready(function(){
try{
e.formatContent?this.setContent(e.content):this.setContent(e.content,!1,!0);
}catch(t){}
});
},
hideAllErrMsg:function(){
var t=this._g.dom;
t.$js_content_fail.hide(),t.$js_title_fail.hide();
},
showCatchError:function(){
if(this.checkDialogAlive()){
var t=this._g.dom,e=this.editor,o=$(e.getDocument()).find(".js_catchremoteimageerror").length;
0==o?t.$js_content_fail.hide():t.$js_content_fail.text("有%s张图片粘贴失败".sprintf(o)).show();
}
},
updateRemoteImg:function(t){
if(this.checkDialogAlive()){
var e=$(this.editor.getDocument()).find("[data-remoteid="+t.uid+"]");
i.changeRemoteImgUrl({
imgDom:e,
remoteType:t.remoteType,
format:t.format,
img_url:t.img_url,
editor:this.editor
});
}
},
destory:function(t){
t&&t.remove(),this.editor.fireEvent("handleWinScroll",!0),this.editor.destory(),
this.editor=null,this._g.dom=null;
}
},e;
});