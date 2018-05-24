define("common/wx/media/factory.js",["common/wx/media/img.js","common/wx/media/audio.js","common/wx/media/video.js","common/wx/media/appmsg.js","tpl/media/videocard.html.js","tpl/media/appmsg_edit/video_article_content.html.js","common/wx/richEditor/emotionEditor.js","tpl/media/appmsg_edit/text_editor.html.js","tpl/media/appmsg_edit/text_editor_word_tips.html.js","biz_common/utils/load3rdimg.js","common/wx/media/videoUtils.js","common/qq/emoji.js","widget/text_editor.css","tpl/media/cardmsg.html.js"],function(e,i,o){
"use strict";
var t=e("common/wx/media/img.js"),m=e("common/wx/media/audio.js"),d=e("common/wx/media/video.js"),r=e("common/wx/media/appmsg.js"),n=(e("tpl/media/videocard.html.js"),
e("tpl/media/appmsg_edit/video_article_content.html.js")),l=e("common/wx/richEditor/emotionEditor.js"),s=e("tpl/media/appmsg_edit/text_editor.html.js"),a=e("tpl/media/appmsg_edit/text_editor_word_tips.html.js"),c=e("biz_common/utils/load3rdimg.js"),p=e("common/wx/media/videoUtils.js");
e("common/qq/emoji.js"),e("widget/text_editor.css");
var _=e("tpl/media/cardmsg.html.js"),u={
1:function(e,i){
return $(e).html(i.content.emoji());
},
2:function(e,i){
return i.container=$(e),i.append=!0,i.hasRecommend&&(i.recommendEditor=new l(i.container,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:s,
editorTipsTpl:a,
placeHolder:"从这里输入推荐语，可以不填"
})),new t(i);
},
3:function(e,i){
return i.selector=$(e),i.source="file",i.shareTpl=!0,i.hasRecommend&&(i.recommendEditor=new l(i.selector,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:s,
editorTipsTpl:a,
placeHolder:"从这里输入推荐语，可以不填"
})),console.log(i),new m(i);
},
4:function(e,i){
return i.selector=$(e),i.id=i.file_id,i.source="file",new d(i);
},
10:function(e,i){
return i.container=$(e),i.showMask=!1,new r(i);
},
11:function(e,i){
return i.container=$(e),i.showMask=!1,new r(i);
},
15:function(e,i){
if(i.multi_item&&i.multi_item[0]){
i.title=i.multi_item[0].title,i.digest=i.multi_item[0].digest;
for(var o=0;o<i.multi_item.length;o++)if(i.multi_item[o].cover){
i.cover=i.multi_item[o].cover;
break;
}
}
i.selector=$(e),i.id=1e6*Math.random()|0,i.tpl="videomsg",i.for_selection=!1,i.for_operation=!1,
i.hasRecommend&&(i.recommendEditor=new l(i.selector,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:s,
editorTipsTpl:a,
placeHolder:"从这里输入推荐语，可以不填"
})),i.share_videoinfo=[{
cover:i.cover,
title:i.title,
duration:i.duration
}];
var t=$(e).append('<div data-type="15" class="js_previe_media_box">'+wx.T(n,i)+"</div>");
return $(".js_preview_hd").unbind("click"),$(".js_preview_hd").click(function(){
p.showVideoPreviewDialog({
vid:i.vid,
onClose:function(){}
});
}),{
dom:t,
file_id:i.file_id,
id:i.id,
source:"file",
tpl:"videomsg",
type:"",
video_url:""
};
},
16:function(e,i){
$(e).html(template.compile(_)(i));
var o=$(e).find(".js_logourl");
o.length&&c({
img:o[0]
});
}
};
u[21]=u[15];
var h={
render:function(e,i){
u[i.type]&&$(e).length>0&&u[i.type]($(e).html(""),i);
},
itemRender:u
};
o.exports=h;
});