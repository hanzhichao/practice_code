define("common/wx/mpEditor/plugin/emotionButton.js",["widget/emotion_editor.css","widget/emotion_panel.css","common/wx/mpEditor/editor_all_min.js","common/wx/richEditor/emotion.js","tpl/mpEditor/plugin/emotion.html.js"],function(t){
"use strict";
t("widget/emotion_editor.css"),t("widget/emotion_panel.css"),t("common/wx/mpEditor/editor_all_min.js");
var i=t("common/wx/richEditor/emotion.js"),o=t("tpl/mpEditor/plugin/emotion.html.js"),n=window.baidu.editor,e=n.ui,s=n.utils,m=e.UIBase,r=e.Popup,p=e.EmotionPicker=function(t){
this.initOptions(t),this.init();
};
p.prototype={
getHtmlTpl:function(){
return window.wx.T(o,{
edata:i.getEdata()
});
},
init:function(){
this.initUIBase();
},
_onEmotionClick:function(){
this.fireEvent("emotionclick");
}
},s.inherits(p,m);
var c=e.SplitButton,l=e.EmotionButton=function(t){
this.initOptions(t),this.init();
};
l.prototype={
init:function(){
var t=this;
this.popup=new r({
content:new p({
editor:t.editor,
_onEmotionClick:function(i){
var o=i.target||i.srcElement;
o=/^li/i.test(o.nodeName)?$(o):$(o).parents("li.js_emotion_li");
var n=o.data("title"),e=o.data("name");
t._onEmotionSelect({
title:n,
name:e
});
}
}),
contentClass:"emotion_wrp",
editor:t.editor
}),this.initSplitButton();
},
className:"edui-for-mpemotion",
_SplitButton_postRender:c.prototype.postRender,
postRender:function(){
this._SplitButton_postRender();
},
_onButtonClick:function(){
this.showPopup();
},
_onEmotionSelect:function(t){
this.fireEvent("emotionselect",t);
}
},s.inherits(l,c);
});