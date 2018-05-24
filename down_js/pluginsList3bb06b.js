define("common/wx/mpEditor/pluginsList.js",["common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js"],function(o){
"use strict";
function m(){
return i;
}
var i={
Vote:o("common/wx/mpEditor/plugin/vote.js"),
Card:o("common/wx/mpEditor/plugin/card.js"),
Emotion:o("common/wx/mpEditor/plugin/emotion.js"),
MyLink:o("common/wx/mpEditor/plugin/link.js"),
Unlink:o("common/wx/mpEditor/plugin/unlink.js"),
AudioMusicPlugin:o("common/wx/mpEditor/plugin/audio_music.js"),
WeappPlugin:o("common/wx/mpEditor/plugin/weapp.js"),
Img:o("common/wx/mpEditor/plugin/img.js"),
Ad:o("common/wx/mpEditor/plugin/adv.js"),
Video:o("common/wx/mpEditor/plugin/video.js"),
InsertProduct:o("common/wx/mpEditor/plugin/insert_product.js")
};
return{
getList:m
};
});