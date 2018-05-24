define("media/share_article.js",["media/common.js","common/wx/media/shareCopyrightDialog.js","tpl/media/appmsg_edit/share_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var i=(e("media/common.js"),e("common/wx/media/shareCopyrightDialog.js")),t=e("tpl/media/appmsg_edit/share_article_content.html.js"),r=e("media/base_article.js"),a=e("biz_common/jquery.validate.js"),s=(a.rules,
r.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var e=r.prototype.initData.call(this);
e.set("guide_words",e.get("guide_words")||"分享一篇文章。"),e.set("author",""),e.set("file_id",""),
e.set("is_share_copyright",1),e.set("share_page_type",9);
var i=e.get("content").html(!1).replace(/<img[^>]*>/g,"<p>[图片]</p>").replace(/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi,"<p>[卡券]</p>").replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<p>[语音]</p>").replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<p>[音乐]</p>").replace(/<mpgongyi([^>]*?)js_editor_gy([^>]*?)><\/mpgongyi>/g,"<p>[公益]</p>").replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<p>[小店]</p>").replace(/<iframe([^>]*?)class=[\'\"][^\'\"]*video_iframe([^>]*?)><\/iframe>/g,"<p>[视频]</p>").replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,"<p>[投票]</p>").replace(/<mp-weapp([^>]*?)weapp_element([^>]*?)><\/mp-weapp>/g,"<p>[小程序]</p>"),t=document.createElement("div");
return t.innerHTML=i,i=t.innerText.trim().substr(0,140),i=i.split("\n").map(function(e){
return"<p>"+e+"</p>";
}),e.set("content",i.join("")),e;
},
getDigestFromContent:function(){
var e=this.data;
return $.trim(e.get("guide_words").substr(0,120));
},
flush:function(){
{
var e=this.data;
this._o.$infoContainer;
}
return this.flushField(),this.flushGuidWords(),this.setDigest(),e.set("guide_words",e.get("guide_words")||"分享一篇文章。"),
e.set("file_id",""),e.set("author",""),this.flushCommon(),this;
},
validate:function(e){
var i={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!1
};
return i=this.validateGuideWords(i),this.handleValidateResult(i);
},
validateStrictly:function(e){
var i={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateGuideWords(i),this.handleValidateResult(i);
},
render:function(){
var e=this._o.ueditor;
r.prototype.render.call(this);
var i=this._o.$infoContainer;
this.renderGuidWords(),i.find(".js_cover_tip").html("分享图文不可设置封面").show(),this.renderSharePreview({
tpl:t
}),e.fireEvent("renderEditorByType",2);
}
}));
return s.showDialog=function(e){
new i({
onOK:function(i){
e.onOk({
data:{
title:i.title,
cover:i.cover_url,
cdn_url:i.cover_url,
content:i.content,
copyright_headimg:i.head_img_url,
copyright_nickname:i.nickname,
is_share_copyright:1,
share_page_type:9,
share_copyright_url:i.url
}
});
},
onCancel:function(){
e.onCancel();
}
});
},s;
});