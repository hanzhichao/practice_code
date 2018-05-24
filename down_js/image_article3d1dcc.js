define("media/image_article.js",["common/wx/media/imageDialog.js","tpl/media/appmsg_edit/image_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js"],function(i){
"use strict";
var t=i("common/wx/media/imageDialog.js"),e=i("tpl/media/appmsg_edit/image_article_content.html.js"),a=i("media/base_article.js"),n=i("biz_common/jquery.validate.js"),r=(n.rules,
a.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var i=this,t=a.prototype.initData.call(this);
return t.set("share_page_type",8),t.get("share_imageinfo")||t.set("share_imageinfo",[]),
this.setTitle(t),this.setShareImageid(t),t.set("author",""),t.set("file_id",""),
setTimeout(function(){
i.getImageWh();
},0),t;
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").show();
},
getEditTipsContent:function(){
return"填写推荐语，上限140个字。不支持插入其他素材。";
},
setTitle:function(i){
i.set("title","分享图片");
},
setShareImageid:function(i){
for(var t=i.get("share_imageinfo")||[],e=[],a=0;a<t.length;a++)e.push(t[a].file_id);
i.set("share_imageid",e.join(","));
},
getImageWh:function(){
var i=this.data.get("share_imageinfo");
if(i&&0!=i.length)for(var t=0;t<i.length;t++){
var e=i[t];
!e.cdn_url||e.height&&e.width||!function(i,t,e){
var a=new window.Image;
a.onload=function(){
var t=this.naturalWidth||this.width||0,e=this.naturalHeight||this.height||0;
i.setImageWh(this.src,t,e);
},a.src=e;
}(this,t,e.cdn_url);
}
},
setImageWh:function(i,t,e){
if(i&&t&&e){
var a=this.data.get("share_imageinfo");
if(a&&a.length>0){
for(var n=0;n<a.length;n++){
var r=a[n];
r.cdn_url===i&&(r.width=t,r.height=e);
}
this.data.set("share_imageinfo",a);
}
}
},
validate:function(i){
var t={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!1
};
return t=this.validateGuideWords(t),this.handleValidateResult(t);
},
validateStrictly:function(i){
var t={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!0
};
return t=this.validateGuideWords(t),this.handleValidateResult(t);
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushCommon(),this;
},
render:function(){
var i=this,t=this._o.ueditor;
a.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.renderSharePreview({
tpl:e
}),t.fireEvent("renderEditorByType",2),setTimeout(function(){
i.getImageWh();
},0);
},
replaceMedia:function(){
var i=this;
r.showDialog({
onCancel:function(){},
onOk:function(t){
var a=t.data;
i.data.set("share_imageinfo",a.share_imageinfo),i.data.set("cdn_url",a.cdn_url),
i.setTitle(i.data),i.setShareImageid(i.data),i.isCurrentArticle()&&i.renderSharePreview({
tpl:e
}),i.coverChange({
url:a.cdn_url,
file_id:"",
oriUrl:a.cdn_url,
oriFormat:"",
coverPic:0
}),i.titleChange({
title:i.data.get("title")
}),i.getImageWh();
}
});
}
}));
return r.showDialog=function(i){
t({
cropImg:!1,
only_cdn:!1,
maxSelect:1,
onOK:function(t){
this.destroy();
var e=[];
if(t&&t.length>0)for(var a=0;a<t.length;a++)e.push({
file_id:t[a].file_id,
cdn_url:t[a].url,
width:"",
height:""
});
i.onOk({
data:{
cdn_url:e[0]?e[0].cdn_url:"",
share_imageinfo:e,
share_page_type:8
}
});
},
onHide:function(){
i.onCancel();
}
});
},r;
});