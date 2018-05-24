define("common/wx/mpEditor/text_editor.js",["widget/text_editor.css","common/wx/richEditor/emotionEditor.js","tpl/media/appmsg_edit/text_editor.html.js","tpl/media/appmsg_edit/text_editor_word_tips.html.js"],function(t){
"use strict";
function i(t){
return n.hasInit?!0:void(n.$dom=t.$dom);
}
function o(){
return n.myEditor||d(),n.myEditor;
}
function d(){
n.myEditor=new e(n.$dom,{
wordlimit:n.wordlimit,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:r,
editorTipsTpl:m
});
}
t("widget/text_editor.css");
var e=t("common/wx/richEditor/emotionEditor.js"),r=t("tpl/media/appmsg_edit/text_editor.html.js"),m=t("tpl/media/appmsg_edit/text_editor_word_tips.html.js"),n={
hasInit:!1,
$dom:null,
myEditor:null,
wordlimit:140
};
return{
initEnv:i,
getEditor:o
};
});