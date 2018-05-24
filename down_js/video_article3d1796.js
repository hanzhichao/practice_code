define("media/video_article.js",["common/wx/media/videoUtils.js","common/wx/media/videoDialog.js","tpl/media/appmsg_edit/video_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js"],function(i){
"use strict";
var e=i("common/wx/media/videoUtils.js"),t=i("common/wx/media/videoDialog.js"),o=i("tpl/media/appmsg_edit/video_article_content.html.js"),n=i("media/base_article.js"),a=i("biz_common/jquery.validate.js"),d=(a.rules,
n.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var i=n.prototype.initData.call(this);
i.set("share_page_type",5);
var t=i.get("share_videoinfo");
return t=t[0]||{},t.video_id?(t.title=i.get("title"),t.cover=i.get("cover"),t.duration=e.changeTime(t.play_length),
i.set("share_videoinfo",[t]),i.set("share_video_id",t.video_id)):(i.set("share_videoinfo",[]),
i.set("share_video_id","")),i;
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").show();
},
getEditTipsContent:function(){
return"视频消息封面和标题都与视频素材一致，不支持当前修改。填写推荐语，上限140个字。不支持插入其他素材。";
},
validate:function(i){
var e={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!1
};
return e=this.validateGuideWords(e),this.handleValidateResult(e);
},
validateStrictly:function(i){
var e={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!0
};
return e=this.validateGuideWords(e),this.handleValidateResult(e);
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushCommon(),this;
},
render:function(){
var i=this._o.ueditor;
n.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.renderSharePreview({
tpl:o
}),i.fireEvent("renderEditorByType",2);
},
previewVideoPlay:function(){
var i=this.data.get("share_video_id");
i&&e.showVideoPreviewDialog({
vid:i,
onClose:function(){}
});
},
replaceMedia:function(){
var i=this;
d.showDialog({
can_use_txvideo:this._o.cgiData.can_use_txvideo,
onCancel:function(){},
onOk:function(e){
var t=e.data;
i.data.set("share_video_id",t.share_video_id),i.data.set("share_videoinfo",t.share_videoinfo),
i.data.set("cdn_url",t.cdn_url),i.data.set("title",t.title),i.isCurrentArticle()&&i.renderSharePreview({
tpl:o
}),i.coverChange({
url:t.cdn_url,
file_id:"",
oriUrl:t.cdn_url,
oriFormat:"",
coverPic:0
}),i.titleChange({
title:t.title
});
}
});
}
}));
return d.showDialog=function(i){
new t({
can_use_txvideo:i.can_use_txvideo,
scene:"ueditor",
onOK:function(e,t){
return t?(i.onOk({
data:{
share_video_id:t.vid,
share_videoinfo:[{
title:t.title,
cover:t.cover,
video_id:t.vid,
duration:t.duration,
play_length:t.play_length
}],
cdn_url:t.cover,
title:t.title.html(!1),
share_page_type:5
}
}),!0):(i.onCancel(),!0);
},
onHide:function(){
i.onCancel();
}
});
},d;
});