define("media/article_interface.js",["media/appmsg_article.js","media/share_article.js","media/video_article.js","media/audio_article.js","media/image_article.js"],function(e){
"use strict";
function i(e){
var i=e.data||{},a=(i.share_page_type||0)+"";
1==i.is_share_copyright&&(a="9");
var n=new t[a](e);
return n;
}
function a(e){
var i=(e.type||0)+"";
"function"==typeof t[i].showDialog&&(e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!1),
t[i].showDialog({
can_use_txvideo:e.can_use_txvideo,
onOk:function(i){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onOk&&e.onOk(i);
},
onCancel:function(){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onCancel&&e.onCancel();
}
}));
}
var t={
0:e("media/appmsg_article.js"),
9:e("media/share_article.js"),
5:e("media/video_article.js"),
7:e("media/audio_article.js"),
8:e("media/image_article.js")
};
return{
create:i,
showDialog:a
};
});