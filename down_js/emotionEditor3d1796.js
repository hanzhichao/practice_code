define("common/wx/richEditor/emotionEditor.js",["biz_common/utils/string/html.js","widget/emotion_editor.css","tpl/richEditor/emotionEditor.html.js","common/wx/richEditor/wysiwyg.js","common/wx/richEditor/emotion.js","biz_web/utils/upload.js","common/wx/Tips.js","common/qq/Class.js"],function(t,i,e){
"use strict";
t("biz_common/utils/string/html.js");
var o=wx.T,n=(t("widget/emotion_editor.css"),t("tpl/richEditor/emotionEditor.html.js")),s=t("common/wx/richEditor/wysiwyg.js"),r=t("common/wx/richEditor/emotion.js"),l=t("biz_web/utils/upload.js"),m=t("common/wx/Tips.js"),c=l.uploadCdnFile,d="##__linebreaktag__##",a=new RegExp(d,"g"),h=t("common/qq/Class.js"),p="share-text__input_placeholder",w={
isHTML:!0,
wordlimit:500,
hideUpload:!0,
hideEmotion:!1,
hideOprTips:!1,
editorTpl:n,
editorTipsTpl:"",
placeholder:""
},u=1,g=h.declare({
init:function(t,i){
var e=this;
i=this.opt=$.extend(!0,{},w,i),e.selector$=t,i.gid=u++,e.selector$.html(o(i.editorTpl,i)),
e.emotion=new r(t.find(".js_emotionArea")),e.wysiwyg=new s(t.find(".js_editorArea"),{
init:function(){
t.find(".js_editorTip").html(i.editorTipsTpl?o(i.editorTipsTpl,{
wordlimit:i.wordlimit,
curCount:0
}):"还可以输入<em>{l}</em>字".format({
l:i.wordlimit
}));
},
textFilter:function(t){
return t=e.emotion.getEmotionText(t).replace(/<br.*?>/gi,"\n").replace(/\n/g,d).replace(/<.*?>/g,"").replace(a,"\n"),
t=t.html(!1);
},
nodeFilter:function(t){
var i="";
return"IMG"===t.nodeName.toUpperCase()&&(i=t),i;
},
change:function(){
var n=e.getContent(),s=i.wordlimit-n.length,r=t.find(".js_editorArea"),l=t.find(".js_editorTip");
r.attr("placeholder")&&(n?r.removeClass(p):r.addClass(p)),l.html(i.editorTipsTpl?o(i.editorTipsTpl,{
wordlimit:i.wordlimit,
curCount:n.length
}):0>s?"已超出<em{cls}>{l}</em>字".format({
l:-s,
cls:' class="warn"'
}):"还可以输入<em>{l}</em>字".format({
l:s
}));
}
}),this.opt.hideUpload||(e.upload=c({
container:t.find(".js_upload"),
type:2,
multi:!1,
onComplete:function(t,i,o,n){
if(n&&n.base_resp&&0==n.base_resp.ret){
var s=n.content;
m.suc("上传成功"),e.wysiwyg.insertHTML(s);
}
}
})),e._initEvent(),e.insertHTML(i.text);
},
_initEvent:function(){
var t=$(".js_switch",this.selector$),i=this.emotion,e=this.wysiwyg;
this.opt.hideEmotion||(i.click(function(t){
return e.insertHTML(i.getEmotionHTML(t)),!1;
}),i.hide(),t.click(function(){
$(this).parents(".js_editor").hasClass("disabled")||i.show();
}),$(document).on("click","*",function(t){
var e=$(t.target),o=e.filter(".js_switch"),n=e.filter(".js_emotion_i"),s=e.filter(".emotions_item");
o.length||n.length||s.length||i.hide();
}));
},
setContent:function(t){
t=(t||"").html(!0),t=this.opt.linebreak?t.replace(/\n/g,"<br>"):t,t=r.emoji(t),this.wysiwyg.setContent(t);
},
insertHTML:function(t){
t=t||"",this.wysiwyg.insertHTML(t);
},
getContent:function(){
var t=this.wysiwyg.getContent();
return t="string"==typeof t?t.trim():"";
},
getHTML:function(){
var t=this.wysiwyg.getHTML().html(!1);
return"string"==typeof t?t.trim():"";
},
focus:function(){
this.wysiwyg.focus();
}
});
e.exports=g;
});