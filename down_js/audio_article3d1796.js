define("media/audio_article.js",["common/wx/media/audio.js","common/wx/media/videoUtils.js","common/wx/media/audioMusicDialog.js","tpl/media/appmsg_edit/voice_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js"],function(i){
"use strict";
var e=i("common/wx/media/audio.js"),t=i("common/wx/media/videoUtils.js"),o=i("common/wx/media/audioMusicDialog.js"),a=(i("tpl/media/appmsg_edit/voice_article_content.html.js"),
i("media/base_article.js")),n=i("biz_common/jquery.validate.js"),s=(n.rules,a.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var i=a.prototype.initData.call(this);
i.set("share_page_type",7);
var e=i.get("share_voiceinfo");
return e=e[0]||{},e.file_id?(e.title=i.get("title"),e.duration=t.changeTime(e.play_length),
i.set("share_voiceinfo",[e]),i.set("share_voice_id",e.file_id)):(i.set("share_voiceinfo",[]),
i.set("share_voice_id","")),i;
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").show();
},
getEditTipsContent:function(){
return"语音消息标题与语音素材一致，不支持当前修改。填写推荐语，上限140个字。不支持插入其他素材。";
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
a.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.renderVoiceCard(),i.fireEvent("renderEditorByType",2);
},
renderVoiceCard:function(){
var i=$("#reprint_article_main").html("").show(),t=this.data.get("share_voiceinfo")[0];
this._g.player=new e({
selector:i,
shareTpl:!0,
file_id:t.file_id,
title:t.title,
play_length:1e3*t.play_length,
qqmusicurl:t.play_url
});
},
replaceMedia:function(){
var i=this;
s.showDialog({
onCancel:function(){},
onOk:function(e){
var t=e.data;
i.data.set("share_voice_id",t.share_voice_id),i.data.set("share_voiceinfo",t.share_voiceinfo),
i.data.set("title",t.title),i.isCurrentArticle()&&(i.stopPlay(),i.renderVoiceCard()),
i.titleChange({
title:t.title
});
}
});
},
stopPlay:function(){
this._g.player&&"function"==typeof this._g.player.stop&&this._g.player.stop();
},
destroy:function(){
this.stopPlay();
}
}));
return s.showDialog=function(i){
o.show({
allowAudio:!0,
allowMusic:!1,
audioDisabled:!1,
onOK:function(e){
return e?void i.onOk({
data:{
share_voice_id:e.file_id+"",
share_voiceinfo:[{
file_id:e.file_id+"",
duration:e.duration,
title:e.title,
play_length:parseInt(e.play_length/1e3),
play_url:"https://res.wx.qq.com/voice/getvoice?mediaid="+e.voice_encode_fileid
}],
title:e.title,
share_page_type:7
}
}):void i.onCancel();
},
onCancel:function(){
i.onCancel();
}
});
},s;
});